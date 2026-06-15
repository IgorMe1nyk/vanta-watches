import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import ClipReveal from "@/components/fx/ClipReveal";
import Magnetic from "@/components/fx/Magnetic";

const TIMELINE = [
  { year: "MMXVIII", title: "A bench in the dark" },
  { year: "MMXX", title: "Calibre VNT-01" },
  { year: "MMXXII", title: "The Abyss line" },
  { year: "MMXXIV", title: "The flying tourbillon" },
  { year: "MMXXVI", title: "Still fewer than two thousand" },
];

export default function HeritageSection() {
  return (
    <section className="overflow-hidden py-24 md:py-36">
      {/* oversized editorial opener */}
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">The maison</p>
          <h2 className="mt-6 font-display text-[12.5vw] font-light leading-[0.95] text-ivory md:text-[7.5vw]">
            Built slowly,
            <br />
            <span className="italic text-gold-bright">on purpose.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl items-start gap-12 px-5 md:mt-24 md:grid-cols-12 md:px-10 lg:gap-8">
        {/* copy — sticky beside the imagery */}
        <div className="md:col-span-5 md:sticky md:top-32">
          <Reveal>
            <p className="max-w-md text-[15px] leading-relaxed text-ivory-muted">
              VANTA makes fewer than two thousand watches a year — not because
              we can&apos;t make more, but because every one passes through the
              same four benches and the same eight hands. A watch leaves the
              atelier when it&apos;s finished, not when it&apos;s due.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory-muted">
              No marketing department named our calibres. No focus group chose
              our dials. If that sounds stubborn, you understand us perfectly.
            </p>
            <Magnetic>
              <Link href="/about" className="btn-ghost mt-10" data-cursor-label="Read">
                Read the full story
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        {/* offset editorial images with cinematic unmasking */}
        <div className="grid gap-6 md:col-span-7 md:grid-cols-2">
          <ClipReveal className="md:mt-20">
            <ParallaxImage
              src="/images/craft-microscope.jpg"
              alt="Watchmaker inspecting a movement through a microscope"
              className="aspect-[3/4] w-full"
              strength={40}
            />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
              Regulation, bench № 2
            </p>
          </ClipReveal>
          <ClipReveal delay={0.15}>
            <ParallaxImage
              src="/images/craft-details.jpg"
              alt="Close work on fine watch components"
              className="aspect-[3/4] w-full"
              strength={60}
            />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
              Anglage, by hand
            </p>
          </ClipReveal>
        </div>
      </div>

      {/* horizontal timeline of the maison */}
      <div className="mt-24 border-y border-gold/10 md:mt-32">
        <div
          className="overflow-x-auto focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-gold"
          tabIndex={0}
          role="group"
          aria-label="Maison timeline — scroll horizontally to view all five chapters"
        >
          <ol className="mx-auto flex min-w-[760px] max-w-7xl items-stretch px-5 md:px-10">
            {TIMELINE.map((t, i) => (
              <Reveal
                as="li"
                key={t.year}
                delay={i * 0.07}
                className="group relative flex-1 border-l border-gold/15 px-5 py-10 transition-colors duration-500 first:border-l-0 hover:bg-gold/5 md:px-7 md:py-14"
              >
                <span aria-hidden className="absolute -left-px top-0 h-0 w-px bg-gold transition-all duration-500 group-hover:h-full" />
                <p className="font-mono text-[11px] uppercase tracking-luxe text-gold">
                  {t.year}
                </p>
                <p className="mt-3 font-display text-lg leading-snug text-ivory md:text-xl">
                  {t.title}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
