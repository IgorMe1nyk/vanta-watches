"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroWatch from "@/components/three/HeroWatch";
import KineticText from "@/components/fx/KineticText";
import Magnetic from "@/components/fx/Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);

  // scroll through the hero flips the watch over to its caseback
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollProgress.current = v;
  });

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.0, delay, ease: EASE },
        };

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroWatch scrollRef={scrollProgress} />

      {/* vignette so type stays legible over the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,transparent_40%,rgba(11,10,9,0.85)_100%)]"
      />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-28 pt-36 md:px-10">
        <motion.p className="eyebrow pointer-events-auto" {...fade(0.9)}>
          Vanta — Fine Timepieces
        </motion.p>
        <div className="pointer-events-auto mt-6">
          <KineticText
            as="h1"
            delay={1.0}
            className="max-w-4xl font-display text-[13vw] font-light leading-[0.98] tracking-tight text-ivory sm:text-7xl md:text-8xl"
            lines={[
              { text: "Darkness," },
              { text: "measured finely.", className: "text-metal animate-shimmer" },
            ]}
          />
        </div>
        <motion.p
          className="pointer-events-auto mt-8 max-w-md text-[15px] leading-relaxed text-ivory-muted md:text-base"
          {...fade(1.5)}
        >
          Mechanical instruments for people who notice — twelve calibres,
          one obsession, no shortcuts.
        </motion.p>
        <motion.div className="pointer-events-auto mt-10 flex flex-wrap gap-4" {...fade(1.65)}>
          <Magnetic>
            <Link href="/shop" className="btn-gold">
              Explore the collection
              <ArrowRight size={14} aria-hidden />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/about" className="btn-ghost">
              The maison
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      {/* bottom strip */}
      <motion.div className="relative z-10 border-t border-gold/10" {...fade(1.9)}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-5 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
            Calibre VNT-01 — 70h reserve
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-luxe text-ivory-faint sm:block">
            Drag the watch · scroll to turn it over
          </p>
          <p className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
            Scroll <span aria-hidden>↓</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
