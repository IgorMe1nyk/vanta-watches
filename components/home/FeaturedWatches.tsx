"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/fx/TiltCard";
import { products, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

/* asymmetric editorial arrangement: span + vertical offset per slot */
const SLOTS = [
  "md:col-span-5 md:row-span-2",
  "md:col-span-4 md:mt-20",
  "md:col-span-3 md:mt-40",
  "md:col-span-4 md:-mt-16",
  "md:col-span-4 md:mt-10",
  "md:col-span-4 md:-mt-6",
];

function FeaturedCard({ product, tall }: { product: Product; tall: boolean }) {
  return (
    <TiltCard className="h-full">
      <Link
        href={`/watch/${product.slug}`}
        className="group relative block h-full overflow-hidden border border-transparent bg-vanta-900 transition-colors duration-500 hover:border-gold/30"
        data-cursor-label="View"
      >
        <div className={`relative ${tall ? "aspect-[3/4] md:aspect-[3/4.6]" : "aspect-[4/5]"} overflow-hidden`}>
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.05]"
          />
          {/* soft gold glow on hover */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(200,168,107,0.16), transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vanta-950/80 via-transparent to-transparent" />
          {/* view chip */}
          <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center border border-gold/40 bg-vanta-950/70 text-gold opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={15} aria-hidden />
          </span>
          {/* bottom info bar */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <p className="font-mono text-[9.5px] uppercase tracking-luxe text-gold">
              {product.collection} — {product.style}
            </p>
            <div className="mt-1.5 flex items-end justify-between gap-3">
              <h3 className="font-display text-[21px] leading-tight text-ivory transition-colors duration-300 group-hover:text-gold-bright md:text-2xl">
                {product.name}
              </h3>
              {/* price rises in on hover */}
              <span className="relative shrink-0 overflow-hidden font-mono text-[13px] text-ivory-muted">
                <motion.span className="block transition-transform duration-500 ease-luxe group-hover:-translate-y-full">
                  {formatPrice(product.price)}
                </motion.span>
                <span
                  aria-hidden
                  className="absolute left-0 top-full block text-gold-bright transition-transform duration-500 ease-luxe group-hover:-translate-y-full"
                >
                  {formatPrice(product.price)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

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
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08} className={SLOTS[i] ?? "md:col-span-4"}>
              <FeaturedCard product={p} tall={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
