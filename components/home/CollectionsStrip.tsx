import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const COLLECTIONS = [
  {
    name: "Meridian",
    blurb: "Dress watches that whisper",
    image: "/images/editorial-silver-shadow.jpg",
    alt: "Steel dress watch resting in soft shadow",
  },
  {
    name: "Helios",
    blurb: "Gold, in its element",
    image: "/images/detail-gold-fabric.jpg",
    alt: "Gold watch resting on dark fabric",
  },
  {
    name: "Abyss",
    blurb: "Instruments for the deep",
    image: "/images/product-abyss-dive.jpg",
    alt: "Dive watch on a black table",
  },
  {
    name: "Vector",
    blurb: "Speed, kept honest",
    image: "/images/detail-leather-chrono.jpg",
    alt: "Chronograph watch with black leather strap",
  },
];

export default function CollectionsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Four houses of one maison</p>
            <h2 className="mt-4 font-display text-4xl font-light text-ivory md:text-5xl">
              The collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="font-mono text-[11px] uppercase tracking-luxe text-gold transition-colors duration-300 hover:text-gold-bright"
          >
            View all twelve →
          </Link>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COLLECTIONS.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08}>
            <Link
              href={`/shop?collection=${c.name}`}
              className="group relative block aspect-[3/4] cursor-pointer overflow-hidden bg-vanta-900"
            >
              <Image
                src={c.image}
                alt={c.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover opacity-80 transition-all duration-700 ease-luxe group-hover:scale-[1.05] group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vanta-950/90 via-vanta-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-ivory transition-colors duration-300 group-hover:text-gold-bright">
                  {c.name}
                </h3>
                <p className="mt-1 text-[13px] text-ivory-muted">{c.blurb}</p>
              </div>
              <div className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-luxe group-hover:scale-x-100" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
