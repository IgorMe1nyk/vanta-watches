"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { lines, subtotal, drawerOpen, closeDrawer, setQty, removeItem } =
    useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // lock scroll + escape to close
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close bag"
            className="fixed inset-0 z-[60] cursor-pointer bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            tabIndex={-1}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-[440px] flex-col border-l border-gold/15 bg-vanta-900 focus:outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-gold/10 px-6 py-5">
              <p className="font-mono text-[11px] uppercase tracking-luxe text-ivory">
                Your bag
              </p>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close bag"
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-ivory-muted transition-colors hover:text-gold-bright"
              >
                <X size={18} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
                <p className="font-display text-2xl text-ivory">
                  Your bag is empty.
                </p>
                <p className="text-[14px] text-ivory-muted">
                  Time waits — the collection doesn&apos;t.
                </p>
                <Link href="/shop" onClick={closeDrawer} className="btn-ghost">
                  Browse the collection
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-gold/10 overflow-y-auto px-6">
                  {lines.map((l, i) => (
                    <motion.li
                      key={`${l.slug}-${l.strap}`}
                      layout
                      initial={{ opacity: 0, x: 32 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 32 }}
                      transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="flex gap-4 py-5"
                    >
                      <Link
                        href={`/watch/${l.slug}`}
                        onClick={closeDrawer}
                        className="relative h-24 w-20 shrink-0 overflow-hidden bg-vanta-850"
                      >
                        <Image
                          src={l.product.images[0].src}
                          alt={l.product.images[0].alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link
                              href={`/watch/${l.slug}`}
                              onClick={closeDrawer}
                              className="font-display text-[17px] text-ivory transition-colors hover:text-gold-bright"
                            >
                              {l.product.name}
                            </Link>
                            <p className="mt-0.5 text-[12px] text-ivory-faint">
                              {l.strap}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(l.slug, l.strap)}
                            aria-label={`Remove ${l.product.name}`}
                            className="cursor-pointer p-1 text-ivory-faint transition-colors hover:text-gold-bright"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-ivory/15">
                            <button
                              type="button"
                              onClick={() => setQty(l.slug, l.strap, l.qty - 1)}
                              aria-label="Decrease quantity"
                              className="flex h-8 w-8 cursor-pointer items-center justify-center text-ivory-muted transition-colors hover:text-gold-bright"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center font-mono text-[13px] text-ivory">
                              {l.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(l.slug, l.strap, l.qty + 1)}
                              aria-label="Increase quantity"
                              className="flex h-8 w-8 cursor-pointer items-center justify-center text-ivory-muted transition-colors hover:text-gold-bright"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="font-mono text-[14px] text-gold">
                            {formatPrice(l.product.price * l.qty)}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <div className="border-t border-gold/10 px-6 py-6">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] uppercase tracking-luxe text-ivory-muted">
                      Subtotal
                    </p>
                    <p className="font-display text-2xl text-ivory">
                      {formatPrice(subtotal)}
                    </p>
                  </div>
                  <p className="mt-2 text-[12px] text-ivory-faint">
                    Complimentary insured shipping &amp; returns.
                  </p>
                  <div className="mt-5 grid gap-3">
                    <Link
                      href="/checkout"
                      onClick={closeDrawer}
                      className="btn-gold w-full"
                    >
                      Proceed to checkout
                    </Link>
                    <Link
                      href="/bag"
                      onClick={closeDrawer}
                      className="btn-ghost w-full"
                    >
                      View bag
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
