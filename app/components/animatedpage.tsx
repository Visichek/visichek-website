"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export function AnimatedPage({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={{
          opacity: 0,
          y: -8,
          filter: "blur(6px)",
          transition: {
            duration: 0.28,
            ease: [0.4, 0, 0.6, 1],
          },
        }}
        style={{
          width: "100%",
          minHeight: "100vh",
          willChange: "opacity, transform, filter",
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
