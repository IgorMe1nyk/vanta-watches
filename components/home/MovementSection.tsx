import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";

const STATS = [
  { value: "214", label: "Components per calibre" },
  { value: "70h", label: "Power reserve" },
  { value: "28,800", label: "Beats per hour" },
  { value: "4", label: "Months on the bench" },
];

export default function MovementSection() {
  return (
    <section className="relative border-y border-gold/10 bg-vanta-900/40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-32 lg:gap-20">
        <Reveal>
          <ParallaxImage
            src="/images/macro-movement-1.jpg"
            alt="Macro photograph of an intricate mechanical watch movement"
            className="aspect-[4/5] w-full"
            strength={50}
          />
        </Reveal>
        <div>
          <Reveal>
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
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
              {STATS.map((s) => (
                <div key={s.label} className="border-t border-gold/15 pt-4">
                  <dt className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display text-4xl font-light text-metal md:text-5xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
