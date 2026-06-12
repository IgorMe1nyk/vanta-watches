"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";

export default function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/watch/${product.slug}`}
      className={cn(
        "group relative block cursor-pointer overflow-hidden border border-transparent bg-vanta-900 transition-colors duration-500 hover:border-gold/25",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-[1.045]"
        />
        {/* hover veil + secondary image */}
        {product.images[1] && (
          <Image
            src={product.images[1].src}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-vanta-950/70 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center border border-gold/40 bg-vanta-950/60 text-gold opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={15} aria-hidden />
        </span>
      </div>
      <div className="flex items-end justify-between gap-3 px-5 py-5">
        <div>
          <p className="font-mono text-[9.5px] uppercase tracking-luxe text-gold">
            {product.collection}
          </p>
          <h3 className="mt-1.5 font-display text-[19px] leading-tight text-ivory transition-colors duration-300 group-hover:text-gold-bright">
            {product.name}
          </h3>
        </div>
        <p className="shrink-0 font-mono text-[13px] text-ivory-muted">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
