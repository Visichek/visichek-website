"use client";

import { useEffect, useRef } from "react";

/*
  Each dot travels along a path (circle or line) at its own speed.
  We compute the position every frame with requestAnimationFrame.
*/

interface OrbitDot {
  type: "circle";
  cx: number;
  cy: number;
  r: number;
  speed: number;     // radians per second
  offset: number;    // starting angle
  fill: string;
  dotR: number;
}

interface LineDot {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  speed: number;     // 0..1 progress per second
  offset: number;    // starting progress 0..1
  fill: string;
  dotR: number;
}

type Dot = OrbitDot | LineDot;

const dots: Dot[] = [
  // Orbiting the concentric circles
  { type: "circle", cx: 900, cy: 180, r: 100, speed: 0.3,  offset: 0,          fill: "#D1D5DB", dotR: 4.5 },
  { type: "circle", cx: 900, cy: 180, r: 220, speed: -0.18, offset: Math.PI / 3, fill: "#D8B4E2", dotR: 4.5 },
  { type: "circle", cx: 900, cy: 180, r: 350, speed: 0.12, offset: Math.PI,     fill: "#BAE6FD", dotR: 5 },
  { type: "circle", cx: 900, cy: 180, r: 500, speed: -0.08, offset: Math.PI / 2, fill: "#D8B4E2", dotR: 4 },
  // Traveling along the lines
  { type: "line", x1: 100, y1: 180, x2: 1400, y2: 180, speed: 0.06, offset: 0.1,  fill: "#D1D5DB", dotR: 4.5 },
  { type: "line", x1: 100, y1: 180, x2: 1400, y2: 180, speed: 0.04, offset: 0.65, fill: "#BAE6FD", dotR: 3.5 },
  { type: "line", x1: 900, y1: -200, x2: 900, y2: 600, speed: 0.07, offset: 0.3,  fill: "#D8B4E2", dotR: 4 },
  { type: "line", x1: 617, y1: -103, x2: 1183, y2: 463, speed: 0.05, offset: 0,   fill: "#D1D5DB", dotR: 4.5 },
  { type: "line", x1: 617, y1: 463, x2: 1183, y2: -103, speed: 0.05, offset: 0.5, fill: "#BAE6FD", dotR: 4 },
];

export function AnimatedGeometricBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    let raf: number;
    let t0: number | null = null;

    const tick = (timestamp: number) => {
      if (t0 === null) t0 = timestamp;
      const elapsed = (timestamp - t0) / 1000; // seconds

      dots.forEach((dot, i) => {
        const el = dotRefs.current[i];
        if (!el) return;

        if (dot.type === "circle") {
          const angle = dot.offset + elapsed * dot.speed;
          const x = dot.cx + dot.r * Math.cos(angle);
          const y = dot.cy + dot.r * Math.sin(angle);
          el.setAttribute("cx", x.toString());
          el.setAttribute("cy", y.toString());
        } else {
          // Ping-pong along the line
          const raw = (dot.offset + elapsed * dot.speed) % 2;
          const progress = raw > 1 ? 2 - raw : raw;
          const x = dot.x1 + (dot.x2 - dot.x1) * progress;
          const y = dot.y1 + (dot.y2 - dot.y1) * progress;
          el.setAttribute("cx", x.toString());
          el.setAttribute("cy", y.toString());
        }
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute top-0 right-0 w-full h-[600px] pointer-events-none z-0 hidden md:block"
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Static grid lines and circles */}
      <g stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 6">
        <circle cx="900" cy="180" r="100" />
        <circle cx="900" cy="180" r="220" />
        <circle cx="900" cy="180" r="350" />
        <circle cx="900" cy="180" r="500" />
        <line x1="100" y1="180" x2="1400" y2="180" />
        <line x1="900" y1="-200" x2="900" y2="600" />
        <line x1="617" y1="-103" x2="1183" y2="463" />
        <line x1="617" y1="463" x2="1183" y2="-103" />
      </g>

      {/* Center dot (static) */}
      <circle cx="900" cy="180" r="5" fill="#D1D5DB" opacity="0.6" />

      {/* Animated dots */}
      {dots.map((dot, i) => (
        <circle
          key={i}
          ref={(el) => { dotRefs.current[i] = el; }}
          r={dot.dotR}
          fill={dot.fill}
          opacity="0.85"
        />
      ))}
    </svg>
  );
}
