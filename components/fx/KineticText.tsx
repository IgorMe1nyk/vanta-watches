"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Masked line reveal with per-word stagger — the kinetic headline
 * treatment. Each line rises out of an overflow mask.
 */
export default function KineticText({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h1",
}: {
  lines: { text: string; className?: string }[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const reduced = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, li) => (
        <span key={li} className={`block overflow-hidden ${lineClassName ?? ""}`}>
          <span className="sr-only">{line.text}</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.28em]">
            {line.text.split(" ").map((word, wi) => (
              <span key={wi} className="overflow-hidden">
                <motion.span
                  className={`inline-block ${line.className ?? ""}`}
                  initial={reduced ? false : { y: "115%", rotate: 2.5 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    duration: 1.1,
                    delay: delay + li * 0.16 + wi * 0.05,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </span>
      ))}
    </Tag>
  );
}
