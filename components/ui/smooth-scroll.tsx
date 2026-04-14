"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Lenis adds jank and input latency on mobile. Native scroll is smoother
    // on touch devices, so only enable smooth-scroll on desktop.
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      lenis?.destroy();
      lenis = null;
    };

    const sync = () =>
      mq.matches && !reduceMotion.matches ? start() : stop();
    sync();
    mq.addEventListener("change", sync);
    reduceMotion.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      reduceMotion.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
