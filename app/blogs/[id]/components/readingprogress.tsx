"use client";

import { useEffect, useState } from "react";

interface IReadingProgressProps {
  targetId: string;
}

const ReadingProgress: React.FC<IReadingProgressProps> = ({ targetId }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const computeProgress = () => {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) {
        setProgress(rect.bottom <= viewportHeight ? 100 : 0);
        return;
      }

      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        totalScrollable,
      );
      const pct = (scrolled / totalScrollable) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    computeProgress();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          computeProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-[72px] z-40 h-[2px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#3A9615] via-[#4aa81f] to-[#3A9615] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
