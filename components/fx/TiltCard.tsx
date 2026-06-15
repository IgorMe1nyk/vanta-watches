"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/** Perspective tilt-on-hover with a travelling sheen — makes a card feel like an object. */
export default function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 22 });
  const sy = useSpring(py, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const sheenX = useTransform(sx, [0, 1], ["-30%", "130%"]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
        onPointerMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
        {/* travelling sheen */}
        <motion.div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 w-1/3 opacity-0",
            "bg-gradient-to-r from-transparent via-gold-bright/10 to-transparent",
            "[div:hover>&]:opacity-100 transition-opacity duration-500",
          )}
          style={{ left: sheenX }}
        />
      </motion.div>
    </div>
  );
}
