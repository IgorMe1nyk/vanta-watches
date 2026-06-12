"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Scroll-triggered fade-up reveal. Renders static when reduced motion is on. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const tags = {
    div: motion.div,
    section: motion.section,
    li: motion.li,
    span: motion.span,
  } as const;
  const Tag = tags[as ?? "div"] as typeof motion.div;

  return (
    <Tag
      className={cn(className)}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
