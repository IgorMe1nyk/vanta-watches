"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Hairline gold progress bar along the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[110] h-[2px] origin-left bg-gradient-to-r from-gold-dim via-gold to-gold-bright"
      style={{ scaleX }}
    />
  );
}
