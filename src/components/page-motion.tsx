"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const transition = { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const };

export function PageMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return <AnimatePresence mode="wait" initial={false}>
    <motion.div
      className="page-motion"
      key={pathname}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  </AnimatePresence>;
}
