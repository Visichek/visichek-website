"use client";

/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Shader: animated organic glass blobs with chromatic distortion ─── */

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

varying vec2 vUv;
uniform float uTime;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform float uSpeed;
uniform float uNoiseScale;
uniform float uDistortion;
uniform float uOpacity;

/* simplex-ish noise */
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 perm(vec4 x){ return mod289(((x*34.0)+1.0)*x); }

float noise(vec3 p){
  vec3 a = floor(p);
  vec3 d = p - a;
  d = d * d * (3.0 - 2.0 * d);

  vec4 b = a.xxyy + vec4(0.0,1.0,0.0,1.0);
  vec4 k1 = perm(b.xyxy);
  vec4 k2 = perm(k1.xyxy + b.zzww);

  vec4 c = k2 + a.zzzz;
  vec4 k3 = perm(c);
  vec4 k4 = perm(c + 1.0);

  vec4 o1 = fract(k3 * (1.0/41.0));
  vec4 o2 = fract(k4 * (1.0/41.0));
  vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
  return o4.y * d.y + o4.x * (1.0 - d.y);
}

/* fractional brownian motion */
float fbm(vec3 p) {
  float f = 0.0;
  float amp = 0.5;
  for(int i = 0; i < 4; i++) {
    f += amp * noise(p);
    p *= 2.01;
    amp *= 0.5;
  }
  return f;
}

void main() {
  float t = uTime * uSpeed;
  vec2 uv = vUv;

  /* organic warped noise */
  float n1 = fbm(vec3(uv * uNoiseScale, t * 0.3));
  float n2 = fbm(vec3(uv * uNoiseScale * 1.4 + 3.7, t * 0.25 + 10.0));
  float n3 = fbm(vec3(uv * uNoiseScale * 0.8 + n1 * uDistortion, t * 0.2 + 5.0));

  /* blend two colors with noise */
  float blend = smoothstep(0.3, 0.7, n3);
  vec3 col = mix(uColor1, uColor2, blend);

  /* Add subtle bright highlights */
  float highlight = smoothstep(0.55, 0.7, n1 * n2) * 0.4;
  col += highlight;

  /* chromatic shift */
  float rShift = fbm(vec3(uv * uNoiseScale + 0.1, t * 0.15)) * 0.03;
  float bShift = fbm(vec3(uv * uNoiseScale - 0.1, t * 0.18)) * 0.03;
  col.r += rShift;
  col.b += bShift;

  /* vignette from edges */
  float vig = 1.0 - length((uv - 0.5) * 1.2);
  vig = smoothstep(0.0, 0.8, vig);
  col *= 0.92 + 0.08 * vig;

  gl_FragColor = vec4(col, uOpacity);
}
`;

/* ─── Three.js plane that fills the canvas ─── */

interface GlassPlaneProps {
  color1: string;
  color2: string;
  speed: number;
  noiseScale: number;
  distortion: number;
  opacity: number;
}

function hexToVec3(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

function GlassPlane({ color1, color2, speed, noiseScale, distortion, opacity }: GlassPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: hexToVec3(color1) },
      uColor2: { value: hexToVec3(color2) },
      uSpeed: { value: speed },
      uNoiseScale: { value: noiseScale },
      uDistortion: { value: distortion },
      uOpacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value += delta;
      mat.uniforms.uColor1.value.set(color1);
      mat.uniforms.uColor2.value.set(color2);
      mat.uniforms.uSpeed.value = speed;
      mat.uniforms.uNoiseScale.value = noiseScale;
      mat.uniforms.uDistortion.value = distortion;
      mat.uniforms.uOpacity.value = opacity;

      meshRef.current.scale.set(viewport.width, viewport.height, 1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
}

/* ─── Public component ─── */

export interface FluidGlassBgProps {
  color1?: string;
  color2?: string;
  speed?: number;
  noiseScale?: number;
  distortion?: number;
  opacity?: number;
  className?: string;
}

const FluidGlassBg: React.FC<FluidGlassBgProps> = ({
  color1 = "#e8f5e2",
  color2 = "#d4edda",
  speed = 0.4,
  noiseScale = 3.0,
  distortion = 1.5,
  opacity = 1.0,
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 1] }}
      >
        <GlassPlane
          color1={color1}
          color2={color2}
          speed={speed}
          noiseScale={noiseScale}
          distortion={distortion}
          opacity={opacity}
        />
      </Canvas>
    </div>
  );
};

export default FluidGlassBg;
