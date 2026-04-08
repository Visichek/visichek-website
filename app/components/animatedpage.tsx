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
        initial={{ opacity: 0.2, filter: "blur(4px)", scale: 0.98 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0.2, filter: "blur(4px)", scale: 1.01 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
