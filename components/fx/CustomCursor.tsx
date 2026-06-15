"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Refined dot + trailing ring cursor. Grows over interactive elements,
 * shows a label over elements with data-cursor-label. Pointer-fine only;
 * disabled for touch and reduced-motion users.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let hot = false;
    let label = "";
    let raf = 0;

    const isInteractive = (el: Element | null): { hot: boolean; label: string } => {
      if (!el) return { hot: false, label: "" };
      const labelled = (el as HTMLElement).closest?.("[data-cursor-label]") as HTMLElement | null;
      if (labelled) return { hot: true, label: labelled.dataset.cursorLabel || "" };
      const inter = (el as HTMLElement).closest?.(
        "a, button, [role=button], input, select, textarea, label, [data-cursor]",
      );
      return { hot: !!inter, label: "" };
    };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const probe = isInteractive(document.elementFromPoint(e.clientX, e.clientY));
      hot = probe.hot;
      label = probe.label;
    };

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = label ? "0" : "1";
      }
      if (ringRef.current) {
        const s = label ? 2.6 : hot ? 1.7 : 1;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${s})`;
        ringRef.current.style.borderColor = hot
          ? "rgba(230,205,150,0.9)"
          : "rgba(200,168,107,0.45)";
        ringRef.current.style.backgroundColor = label
          ? "rgba(200,168,107,0.92)"
          : "transparent";
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
        labelRef.current.style.opacity = label ? "1" : "0";
        if (label) labelRef.current.textContent = label;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("custom-cursor");
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border transition-[border-color] duration-200"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold-bright"
      />
      <div
        ref={labelRef}
        className="absolute left-0 top-0 flex items-center justify-center font-mono text-[8px] uppercase tracking-[0.2em] text-vanta-950 opacity-0 transition-opacity duration-200"
        style={{ width: 90, height: 90 }}
      />
    </div>
  );
}
