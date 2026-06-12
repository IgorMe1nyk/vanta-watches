"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroWatch from "@/components/three/HeroWatch";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const anim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: EASE },
        };

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* 3D watch layer */}
      <HeroWatch />

      {/* vignette so type stays legible over the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,transparent_40%,rgba(11,10,9,0.85)_100%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-28 pt-36 md:px-10">
        <motion.p className="eyebrow" {...anim(0.1)}>
          Vanta — Fine Timepieces
        </motion.p>
        <motion.h1
          className="mt-6 max-w-4xl font-display text-[13vw] font-light leading-[0.98] tracking-tight text-ivory sm:text-7xl md:text-8xl"
          {...anim(0.25)}
        >
          Darkness,
          <br />
          <span className="text-metal animate-shimmer">measured finely.</span>
        </motion.h1>
        <motion.p
          className="mt-8 max-w-md text-[15px] leading-relaxed text-ivory-muted md:text-base"
          {...anim(0.45)}
        >
          Mechanical instruments for people who notice — twelve calibres,
          one obsession, no shortcuts.
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap gap-4" {...anim(0.6)}>
          <Link href="/shop" className="btn-gold">
            Explore the collection
            <ArrowRight size={14} aria-hidden />
          </Link>
          <Link href="/about" className="btn-ghost">
            The maison
          </Link>
        </motion.div>
      </div>

      {/* bottom strip */}
      <motion.div
        className="relative z-10 border-t border-gold/10"
        {...anim(0.85)}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-5 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
            Calibre VNT-01 — 70h reserve
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-luxe text-ivory-faint sm:block">
            Assembled by one pair of hands
          </p>
          <p className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
            Scroll <span aria-hidden>↓</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
