"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Minimal, low-latency cursor: a small hollow ring that tracks the pointer
 * with no lag (transform set directly on pointermove — no easing loop), plus
 * a tiny centre dot. Gently enlarges over interactive elements. No blend
 * modes, no trails, no labels. Pointer-fine + motion-OK only; otherwise the
 * native cursor is used.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    let hot = false;

    const onMove = (e: PointerEvent) => {
      // direct positioning — zero perceptible lag
      const x = e.clientX;
      const y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${hot ? 1.55 : 1})`;
      if (ring.style.opacity !== "1") {
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };

    const refreshHot = (target: EventTarget | null) => {
      const el = target as Element | null;
      hot = !!el?.closest?.("a, button, [role=button], input, select, textarea, label, [data-cursor]");
      ring.dataset.hot = hot ? "1" : "0";
    };

    const onOver = (e: PointerEvent) => refreshHot(e.target);
    const onDown = () => {
      ring.style.setProperty("--press", "0.85");
    };
    const onUp = () => {
      ring.style.setProperty("--press", "1");
    };
    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.documentElement.classList.add("custom-cursor");

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      {/* centre dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-gold-bright opacity-0"
      />
      {/* hollow ring — border brightens on interactive, scale handled in JS */}
      <div
        ref={ringRef}
        data-hot="0"
        className="absolute left-0 top-0 h-7 w-7 rounded-full border border-gold/45 opacity-0 transition-[border-color,width,height] duration-200 ease-out data-[hot=1]:border-gold-bright/80"
      />
    </div>
  );
}
