import Link from "next/link";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";

export default function HeritageSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="grid items-start gap-12 md:grid-cols-12 lg:gap-8">
        {/* copy */}
        <div className="md:col-span-5 md:sticky md:top-32">
          <Reveal>
            <p className="eyebrow">The maison</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ivory md:text-5xl">
              Built slowly,
              <br />
              on purpose.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory-muted">
              VANTA makes fewer than two thousand watches a year — not because
              we can&apos;t make more, but because every one passes through the
              same four benches and the same eight hands. A watch leaves the
              atelier when it&apos;s finished, not when it&apos;s due.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory-muted">
              No marketing department named our calibres. No focus group chose
              our dials. If that sounds stubborn, you understand us perfectly.
            </p>
            <Link href="/about" className="btn-ghost mt-10">
              Read the full story
            </Link>
          </Reveal>
        </div>
        {/* offset editorial images */}
        <div className="grid gap-6 md:col-span-7 md:grid-cols-2">
          <Reveal className="md:mt-16">
            <ParallaxImage
              src="/images/craft-microscope.jpg"
              alt="Watchmaker inspecting a movement through a microscope"
              className="aspect-[3/4] w-full"
              strength={40}
            />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
              Regulation, bench № 2
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <ParallaxImage
              src="/images/craft-details.jpg"
              alt="Close work on fine watch components"
              className="aspect-[3/4] w-full"
              strength={60}
            />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
              Anglage, by hand
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
