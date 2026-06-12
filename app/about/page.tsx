import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";

export const metadata: Metadata = {
  title: "The Maison",
  description:
    "The story of VANTA — a fictional watch house imagined for this concept store by Daycraft Studio.",
};

const TIMELINE = [
  {
    year: "MMXVIII",
    title: "A bench in the dark",
    text: "VANTA begins as one watchmaker, one bench, and a refusal to backlight anything. The first prototype dial is sandblasted so deep it reads as a void — the name follows naturally.",
  },
  {
    year: "MMXX",
    title: "Calibre VNT-01",
    text: "The first in-house movement: 214 components, a 70-hour reserve, and bridges bevelled by hand. It takes two years longer than planned. Nobody apologises.",
  },
  {
    year: "MMXXII",
    title: "The Abyss line",
    text: "A dive watch rated to 600 metres, tested in a pressure tank we built ourselves because renting one felt like a compromise.",
  },
  {
    year: "MMXXIV",
    title: "The flying tourbillon",
    text: "Calibre VNT-T1 — our answer to gravity, four months of finishing per example, numbered by the watchmaker who built it.",
  },
  {
    year: "MMXXVI",
    title: "Still fewer than two thousand",
    text: "Production stays capped. The waiting list grows. We consider this a feature, not a problem.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-28 pt-32 md:pt-40">
      {/* intro */}
      <section className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">The maison</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            We make dark
            <br />
            <span className="text-metal">objects of light.</span>
          </h1>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ivory-muted md:text-base">
            VANTA is a small watch house with a narrow obsession: mechanical
            timekeeping, finished beyond reason, on dials the colour of a
            closed eye. We make fewer than two thousand watches a year across
            four collections — Meridian, Helios, Abyss and Vector — and every
            one passes through the same eight hands.
          </p>
        </Reveal>
      </section>

      {/* full-bleed editorial */}
      <section className="mt-20 md:mt-28">
        <Reveal>
          <ParallaxImage
            src="/images/life-suit.jpg"
            alt="A man in a dark suit, photographed in low light"
            className="h-[55vh] w-full md:h-[75vh]"
            sizes="100vw"
            strength={80}
          />
        </Reveal>
      </section>

      {/* craft */}
      <section
        id="craft"
        className="mx-auto mt-24 grid max-w-7xl items-center gap-12 px-5 md:mt-32 md:grid-cols-2 md:px-10 lg:gap-20"
      >
        <div className="order-2 md:order-1">
          <Reveal>
            <p className="eyebrow">Craftsmanship</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ivory md:text-5xl">
              Slow is a
              <br />
              technical spec.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory-muted">
              Anglage by hand. Screws blued over a flame, one at a time.
              Regulation in five positions across fifteen days. None of this
              shows up in a spec table, and all of it shows up on the wrist —
              in the way a crown threads closed, in the silence of a rotor, in
              a seconds hand that lands exactly where it should.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory-muted">
              We publish our service manuals, hold parts for every calibre for
              fifty years, and engrave the watchmaker&apos;s initials inside
              every case back. Accountability, in 18 karats.
            </p>
          </Reveal>
        </div>
        <Reveal className="order-1 md:order-2">
          <ParallaxImage
            src="/images/macro-movement-2.jpg"
            alt="Macro photograph of exposed mechanical watch gears"
            className="aspect-[4/5] w-full"
            strength={50}
          />
        </Reveal>
      </section>

      {/* timeline */}
      <section className="mx-auto mt-28 max-w-4xl px-5 md:mt-36 md:px-10">
        <Reveal>
          <p className="eyebrow">The chronology</p>
          <h2 className="mt-4 font-display text-4xl font-light text-ivory md:text-5xl">
            Eight years, five chapters
          </h2>
        </Reveal>
        <ol className="mt-14 border-l border-gold/20">
          {TIMELINE.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 0.05} className="relative pb-12 pl-10 last:pb-0">
              <span
                aria-hidden
                className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full border border-gold bg-vanta-950"
              />
              <p className="font-mono text-[11px] uppercase tracking-luxe text-gold">
                {t.year}
              </p>
              <h3 className="mt-2 font-display text-2xl text-ivory">{t.title}</h3>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ivory-muted">
                {t.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* honesty + CTA */}
      <section className="mx-auto mt-28 max-w-7xl px-5 md:mt-36 md:px-10">
        <Reveal>
          <div className="border border-gold/15 px-8 py-14 text-center md:px-16 md:py-20">
            <p className="eyebrow">Full disclosure</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-light leading-snug text-ivory md:text-4xl">
              VANTA is fictional. The craft of building this store is not.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-ivory-muted">
              This entire brand — watches, calibres, chronology — was invented
              by Daycraft Studio as a concept piece to show what a luxury
              e-commerce experience can feel like. If you&apos;d like a store
              that feels like this for a real brand, that part we can do.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/shop" className="btn-gold">
                Explore the collection
              </Link>
              <a
                href="https://daycraftstudio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Daycraft Studio
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
