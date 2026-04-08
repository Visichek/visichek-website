"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  useEffect(() => {
    // Wait for fonts + initial paint, then hold for a minimum time
    const minDelay = new Promise((r) => setTimeout(r, 1800));
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.all([minDelay, fontsReady]).then(() => {
      setPhase("exiting");
      // Let the exit animation play, then unmount
      setTimeout(() => setPhase("done"), 700);
    });

    // Lock scroll while loading
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{
        opacity: phase === "exiting" ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Logo + checkmark animation */}
      <div
        className="mb-6"
        style={{
          opacity: phase === "exiting" ? 0 : 1,
          transform: phase === "exiting" ? "scale(0.95) translateY(-8px)" : "scale(1) translateY(0)",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 28 28"
          fill="none"
          className="loading-logo"
        >
          <circle
            cx="14"
            cy="14"
            r="13"
            stroke="#3A9615"
            strokeWidth="2"
            className="loading-circle"
          />
          <path
            d="M8 14L12 18L20 10"
            stroke="#3A9615"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="loading-check"
          />
        </svg>
      </div>

      {/* Brand name */}
      <div
        style={{
          opacity: phase === "exiting" ? 0 : 1,
          transform: phase === "exiting" ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s",
        }}
      >
        <span className="text-[22px] font-semibold tracking-tight text-[#1a1a1a]">
          VisiChek
        </span>
      </div>

      {/* Loading bar */}
      <div
        className="mt-8 h-[3px] w-[140px] overflow-hidden rounded-full bg-gray-100"
        style={{
          opacity: phase === "exiting" ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <div className="loading-bar h-full rounded-full bg-[#3A9615]" />
      </div>

      <style>{`
        .loading-circle {
          stroke-dasharray: 82;
          stroke-dashoffset: 82;
          animation: loading-draw-circle 0.8s cubic-bezier(0.65,0,0.35,1) 0.2s forwards;
        }
        .loading-check {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: loading-draw-check 0.5s cubic-bezier(0.65,0,0.35,1) 0.7s forwards;
        }
        .loading-bar {
          width: 0%;
          animation: loading-progress 1.6s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
        }
        @keyframes loading-draw-circle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes loading-draw-check {
          to { stroke-dashoffset: 0; }
        }
        @keyframes loading-progress {
          0%   { width: 0%; }
          60%  { width: 85%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
