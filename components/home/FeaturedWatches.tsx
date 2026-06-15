"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/fx/TiltCard";
import { products, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

function FeaturedCard({
  product,
  aspect = "aspect-[4/5]",
  priority = false,
}: {
  product: Product;
  aspect?: string;
  priority?: boolean;
}) {
  return (
    <TiltCard className="h-full" max={5}>
      <Link
        href={`/watch/${product.slug}`}
        className="group relative block overflow-hidden border border-transparent bg-vanta-900 transition-colors duration-500 hover:border-gold/30"
        data-cursor
      >
        <div className={`relative ${aspect} overflow-hidden`}>
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.05]"
          />
          {/* soft gold glow on hover */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(200,168,107,0.14), transparent 70%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vanta-950/85 via-vanta-950/10 to-transparent" />

          {/* info bar — always fully readable */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <p className="font-mono text-[9.5px] uppercase tracking-luxe text-gold">
              {product.collection} — {product.style}
            </p>
            <h3 className="mt-1.5 font-display text-[20px] leading-tight text-ivory transition-colors duration-300 group-hover:text-gold-bright md:text-[22px]">
              {product.name}
            </h3>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="font-mono text-[12.5px] text-ivory-muted">
                {formatPrice(product.price)}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-luxe text-ivory-faint opacity-0 transition-all duration-300 group-hover:text-gold-bright group-hover:opacity-100">
                View
                <ArrowUpRight size={12} aria-hidden />
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
  // split into three editorial columns; the middle one is offset downward
  const cols = [
    [featured[0], featured[3]],
    [featured[1], featured[4]],
    [featured[2], featured[5]],
  ];

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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {cols.map((col, ci) => (
            <div
              key={ci}
              className={`flex flex-col gap-5 md:gap-6 ${ci === 1 ? "md:mt-16" : ci === 2 ? "md:mt-8" : ""}`}
            >
              {col.filter(Boolean).map((p, ri) => (
                <Reveal key={p.slug} delay={ri * 0.08}>
                  <FeaturedCard
                    product={p}
                    aspect={ci === 0 && ri === 0 ? "aspect-[4/5.4]" : "aspect-[4/5]"}
                    priority={ci === 0 && ri === 0}
                  />
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
