"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** Image that drifts subtly slower than the scroll — quiet depth, no gimmick. */
export default function ParallaxImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  strength = 60,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute -inset-y-[12%] inset-x-0"
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
