"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";

export default function BagPage() {
  const { lines, subtotal, count, setQty, removeItem } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-5 pb-28 pt-32 md:px-10 md:pt-40">
      <p className="eyebrow">Your bag</p>
      <h1 className="mt-4 font-display text-5xl font-light text-ivory md:text-6xl">
        {count > 0 ? `${count} timepiece${count === 1 ? "" : "s"}.` : "Empty, for now."}
      </h1>

      {lines.length === 0 ? (
        <div className="mt-14 flex flex-col items-start gap-6 border border-gold/15 px-8 py-16">
          <p className="max-w-md text-[15px] leading-relaxed text-ivory-muted">
            Your bag is waiting for its first complication. Twelve calibres
            are ready when you are.
          </p>
          <Link href="/shop" className="btn-gold">
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <ul className="divide-y divide-gold/10 border-t border-gold/10">
            {lines.map((l) => (
              <li key={`${l.slug}-${l.strap}`} className="flex gap-5 py-7 sm:gap-7">
                <Link
                  href={`/watch/${l.slug}`}
                  className="relative h-32 w-28 shrink-0 overflow-hidden bg-vanta-900 sm:h-40 sm:w-32"
                >
                  <Image
                    src={l.product.images[0].src}
                    alt={l.product.images[0].alt}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9.5px] uppercase tracking-luxe text-gold">
                        {l.product.collection}
                      </p>
                      <Link
                        href={`/watch/${l.slug}`}
                        className="mt-1 block font-display text-2xl text-ivory transition-colors hover:text-gold-bright"
                      >
                        {l.product.name}
                      </Link>
                      <p className="mt-1 text-[13px] text-ivory-faint">{l.strap}</p>
                      <p className="mt-1 font-mono text-[11px] text-ivory-faint">
                        Ref. {l.product.specs.reference}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(l.slug, l.strap)}
                      aria-label={`Remove ${l.product.name}`}
                      className="cursor-pointer p-2 text-ivory-faint transition-colors hover:text-gold-bright"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-ivory/15">
                      <button
                        type="button"
                        onClick={() => setQty(l.slug, l.strap, l.qty - 1)}
                        aria-label="Decrease quantity"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center text-ivory-muted transition-colors hover:text-gold-bright"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-10 text-center font-mono text-[14px] text-ivory">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(l.slug, l.strap, l.qty + 1)}
                        aria-label="Increase quantity"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center text-ivory-muted transition-colors hover:text-gold-bright"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="font-mono text-[15px] text-gold">
                      {formatPrice(l.product.price * l.qty)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-gold/15 p-8 lg:sticky lg:top-32">
            <h2 className="font-mono text-[11px] uppercase tracking-luxe text-ivory">
              Order summary
            </h2>
            <dl className="mt-6 space-y-3 text-[14px]">
              <div className="flex justify-between text-ivory-muted">
                <dt>Subtotal</dt>
                <dd className="font-mono">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-ivory-muted">
                <dt>Insured shipping</dt>
                <dd className="font-mono text-gold">Complimentary</dd>
              </div>
              <div className="flex justify-between border-t border-gold/10 pt-4 text-ivory">
                <dt className="font-mono text-[11px] uppercase tracking-luxe">
                  Total
                </dt>
                <dd className="font-display text-2xl">{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <Link href="/checkout" className="btn-gold mt-8 w-full">
              Proceed to checkout
            </Link>
            <Link href="/shop" className="btn-ghost mt-3 w-full">
              Continue browsing
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
