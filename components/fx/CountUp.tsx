"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Number that counts up when scrolled into view. Uses a self-contained
 * rAF loop so it always lands on the exact target value (no animation-driver
 * quirks, no rows stuck at zero).
 */
export default function CountUp({
  value,
  suffix = "",
  className,
  duration = 1.8,
  play,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
  /** Force the count to run (e.g. when its scroll section is engaged).
   *  Falls back to the element's own in-view state when omitted. */
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const started = play ?? inView;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) => Math.round(n).toLocaleString("en-US") + suffix;

    if (reduced) {
      el.textContent = fmt(value);
      return;
    }
    if (!started) {
      el.textContent = fmt(0);
      return;
    }

    let raf = 0;
    let start = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / (duration * 1000));
      el.textContent = fmt(value * ease(t));
      if (t < 1) raf = requestAnimationFrame(step);
      else el.textContent = fmt(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, value, suffix, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
