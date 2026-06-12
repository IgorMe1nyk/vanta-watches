import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function FeaturedWatches() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="border-t border-gold/10 bg-vanta-900/40">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected works</p>
              <h2 className="mt-4 font-display text-4xl font-light text-ivory md:text-5xl">
                Featured timepieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-mono text-[11px] uppercase tracking-luxe text-gold transition-colors duration-300 hover:text-gold-bright"
            >
              Shop everything →
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
