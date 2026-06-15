"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;
const LETTERS = "VANTA".split("");

/**
 * Cinematic intro: the mark assembles over the dark, a gold rule draws,
 * then the curtain lifts. Plays once per browser session; skipped
 * entirely for reduced-motion users.
 */
export default function IntroOverlay() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (window.sessionStorage.getItem("vanta-intro-seen")) return;
      window.sessionStorage.setItem("vanta-intro-seen", "1");
    } catch {
      return;
    }
    setShow(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = prev;
    }, 2300);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-vanta-950"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden
        >
          <div className="flex overflow-hidden">
            {LETTERS.map((l, i) => (
              <motion.span
                key={i}
                className="font-display text-[16vw] font-light leading-none tracking-[0.18em] text-ivory sm:text-8xl"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease: EASE }}
              >
                {l}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="mt-6 h-px bg-gold"
            initial={{ width: 0 }}
            animate={{ width: 180 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          />
          <motion.p
            className="mt-5 font-mono text-[9px] uppercase tracking-[0.5em] text-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Fine Timepieces
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
