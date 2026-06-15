"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const COLLECTIONS = [
  {
    name: "Meridian",
    blurb: "Dress watches that whisper",
    image: "/images/editorial-silver-shadow.jpg",
    alt: "Steel dress watch resting in soft shadow",
    no: "01",
  },
  {
    name: "Helios",
    blurb: "Gold, in its element",
    image: "/images/detail-gold-fabric.jpg",
    alt: "Gold watch resting on dark fabric",
    no: "02",
  },
  {
    name: "Abyss",
    blurb: "Instruments for the deep",
    image: "/images/product-abyss-dive.jpg",
    alt: "Dive watch on a black table",
    no: "03",
  },
  {
    name: "Vector",
    blurb: "Speed, kept honest",
    image: "/images/detail-leather-chrono.jpg",
    alt: "Chronograph watch with black leather strap",
    no: "04",
  },
];

function Panel({
  c,
  index,
  progress,
}: {
  c: (typeof COLLECTIONS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // each panel's imagery drifts slightly against the track for depth
  const parallax = useTransform(progress, [0, 1], ["-6%", "6%"]);

  return (
    <div className="relative flex h-full w-screen shrink-0 items-end overflow-hidden">
      <motion.div className="absolute -inset-x-[8%] inset-y-0" style={{ x: parallax }}>
        <Image
          src={c.image}
          alt={c.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority={index === 0}
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-vanta-950 via-vanta-950/30 to-vanta-950/60"
      />
      {/* oversized house numeral */}
      <span
        aria-hidden
        className="absolute right-[4%] top-[10%] font-display text-[28vh] font-light leading-none text-gold/10"
      >
        {c.no}
      </span>
      <div className="relative z-10 w-full px-6 pb-[14vh] md:px-[8vw]">
        <p className="eyebrow">House {c.no} of 04</p>
        <h3 className="mt-4 font-display text-[16vw] font-light leading-[0.95] text-ivory md:text-[9vw]">
          {c.name}
        </h3>
        <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
          <p className="text-[16px] text-ivory-muted md:text-lg">{c.blurb}</p>
          <Link
            href={`/shop?collection=${c.name}`}
            className="group inline-flex items-center gap-2 border-b border-gold/40 pb-1 font-mono text-[11px] uppercase tracking-luxe text-gold transition-colors hover:border-gold hover:text-gold-bright"
            data-cursor-label="View"
          >
            Explore {c.name}
            <ArrowUpRight size={13} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CollectionsStrip() {
  const trackRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef });
  const x = useTransform(scrollYProgress, [0.02, 0.98], ["0vw", "-300vw"]);

  // reduced motion: calm vertical stack, no pinning
  if (reduced) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10">
        <p className="eyebrow">Four houses of one maison</p>
        <h2 className="mt-4 font-display text-4xl font-light text-ivory md:text-5xl">
          The collections
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.name}
              href={`/shop?collection=${c.name}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-vanta-900"
            >
              <Image src={c.image} alt={c.alt} fill sizes="50vw" className="object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-vanta-950/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-ivory">{c.name}</h3>
                <p className="mt-1 text-[13px] text-ivory-muted">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={trackRef} aria-label="The collections" className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* header overlays the pinned stage */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 w-full px-6 pt-24 md:px-[8vw] md:pt-28">
          <p className="eyebrow">Four houses of one maison</p>
          <h2 className="mt-3 font-display text-3xl font-light text-ivory md:text-4xl">
            The collections
          </h2>
        </div>
        <motion.div style={{ x }} className="flex h-full">
          {COLLECTIONS.map((c, i) => (
            <Panel key={c.name} c={c} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>
        {/* progress ticks */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {COLLECTIONS.map((c, i) => (
            <Tick key={c.name} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Tick({ index, progress }: { index: number; progress: MotionValue<number> }) {
  // keep input range within [0,1] — out-of-range offsets break the native
  // ScrollTimeline handoff in framer-motion 12
  const start = index / 4;
  const end = (index + 1) / 4;
  const a = Math.max(0, start - 0.06);
  const b = Math.min(1, end + 0.06);
  const opacity = useTransform(progress, [a, start, end, b], [0.25, 1, 1, 0.25]);
  return <motion.span style={{ opacity }} className="h-px w-10 bg-gold" />;
}
