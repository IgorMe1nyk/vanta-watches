"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import CountUp from "@/components/fx/CountUp";

const MovementScene = dynamic(() => import("@/components/three/MovementScene"), {
  ssr: false,
  loading: () => null,
});

const STATS = [
  { value: 214, suffix: "", label: "Components per calibre" },
  { value: 70, suffix: "h", label: "Power reserve" },
  { value: 28800, suffix: "", label: "Beats per hour" },
  { value: 4, suffix: "", label: "Months on the bench" },
];

// label, and the explode range over which it is "current"
const PARTS = [
  { label: "Sapphire crystal", at: 0.15 },
  { label: "Polished bezel", at: 0.32 },
  { label: "Hands, heat-blued", at: 0.48 },
  { label: "Sandblasted dial", at: 0.62 },
  { label: "Calibre VNT-01 — 214 parts", at: 0.78 },
  { label: "Numbered caseback", at: 0.92 },
];

function PartLabel({
  label,
  at,
  progress,
}: {
  label: string;
  at: number;
  progress: MotionValue<number>;
}) {
  // input ranges must stay inside [0,1] for motion's ScrollTimeline handoff
  const from = Math.max(0, at - 0.12);
  const hold = Math.min(1, at + 0.3);
  const opacity = useTransform(progress, [from, at, hold], [0, 1, 1]);
  const x = useTransform(progress, [from, at], [-14, 0]);
  return (
    <motion.li style={{ opacity, x }} className="flex items-center gap-3">
      <span aria-hidden className="h-px w-8 shrink-0 bg-gold/60" />
      <span className="font-mono text-[10.5px] uppercase tracking-wide2 text-ivory-muted">
        {label}
      </span>
    </motion.li>
  );
}

export default function MovementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const explodeRef = useRef(0);
  const [sceneOn, setSceneOn] = useState(false);
  const [statsPlay, setStatsPlay] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // scrub: assembled at the top, fully exploded by the time the pin ends
  const explode = useTransform(scrollYProgress, [0.25, 0.75], [0, 1]);
  useMotionValueEvent(explode, "change", (v) => {
    explodeRef.current = Math.max(0, Math.min(1, v));
  });
  // counts run once the disassembly is underway — synced to the scroll,
  // independent of whether each clipped stat row is itself on-screen
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.28 && v < 0.97) setStatsPlay(true);
  });

  // mount the canvas only when the section approaches
  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSceneOn(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // reduced motion: previous calm editorial layout, stats static
  if (reduced) {
    return (
      <section className="relative border-y border-gold/10 bg-vanta-900/40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32 lg:gap-20">
          <ParallaxImage
            src="/images/macro-movement-1.jpg"
            alt="Macro photograph of an intricate mechanical watch movement"
            className="aspect-[4/5] w-full"
          />
          <div>
            <p className="eyebrow">The movement</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ivory md:text-5xl">
              214 parts.
              <br />
              <span className="text-gold-bright">Zero spare ones.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory-muted">
              Every VANTA calibre is designed, decorated and regulated in a
              single atelier. Bridges are bevelled by hand under 10×
              magnification; screws are heat-blued one at a time over an open
              flame. None of it is necessary. All of it is the point.
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
              {STATS.map((s) => (
                <div key={s.label} className="border-t border-gold/15 pt-4">
                  <dt className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display text-4xl font-light text-metal md:text-5xl">
                    {s.value.toLocaleString("en-US")}
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="The movement — anatomy of the calibre"
      className="relative h-[320vh] border-y border-gold/10 bg-vanta-900/40"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-start overflow-hidden md:grid md:grid-cols-2 md:items-center">
        {/* 3D exploded watch + part callouts */}
        <div className="relative h-[38vh] shrink-0 md:h-screen">
          {sceneOn && <MovementScene explodeRef={explodeRef} />}
          <ul
            className="absolute left-5 top-1/2 z-10 -translate-y-1/2 space-y-3 md:left-[6%] md:space-y-4"
            aria-label="Watch components"
          >
            {PARTS.map((p) => (
              <PartLabel key={p.label} label={p.label} at={p.at} progress={explode} />
            ))}
          </ul>
        </div>

        {/* copy + stats */}
        <div className="px-5 pb-8 md:px-12 md:pb-0 lg:pr-[8vw]">
          <Reveal>
            <p className="eyebrow">The movement — scroll to disassemble</p>
            <h2 className="mt-3 font-display text-3xl font-light leading-tight text-ivory md:mt-4 md:text-5xl">
              214 parts.
              <br />
              <span className="text-gold-bright">Zero spare ones.</span>
            </h2>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-ivory-muted md:mt-6 md:text-[15px]">
              Every VANTA calibre is designed, decorated and regulated in a
              single atelier. Bridges are bevelled by hand under 10×
              magnification; screws are heat-blued one at a time over an open
              flame. None of it is necessary. All of it is the point.
            </p>
          </Reveal>
          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 md:mt-14 md:gap-y-10">
            {STATS.map((s) => (
              <div key={s.label} className="border-t border-gold/15 pt-3 md:pt-4">
                <dt className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
                  {s.label}
                </dt>
                <dd className="mt-1.5 font-display text-3xl font-light text-metal md:mt-2 md:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} play={statsPlay} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
