"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface DemoOrder {
  number: string;
  total: number;
  items: { name: string; qty: number }[];
}

export default function ConfirmationPage() {
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem("vanta-last-order");
      if (stored) setOrder(JSON.parse(stored));
    } catch {}
    setChecked(true);
  }, []);

  const reduced = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl px-5 pb-28 pt-40 md:px-10">
      <motion.div
        className="border border-gold/20 px-8 py-14 text-center md:px-14"
        initial={reduced ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="inline-block"
          initial={reduced ? false : { scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <CircleCheck size={40} className="mx-auto text-gold" aria-hidden />
        </motion.span>
        <p className="eyebrow mt-8">Order confirmed — demo</p>
        <h1 className="mt-4 font-display text-4xl font-light leading-tight text-ivory md:text-5xl">
          Patience. It&apos;s already
          <br />
          on its way to you.
        </h1>

        {checked && order ? (
          <div className="mx-auto mt-10 max-w-sm border-t border-gold/10 pt-8 text-left">
            <dl className="space-y-3 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-ivory-faint">Order number</dt>
                <dd className="font-mono text-gold">{order.number}</dd>
              </div>
              {order.items.map((it) => (
                <div key={it.name} className="flex justify-between text-ivory-muted">
                  <dt>{it.name}</dt>
                  <dd className="font-mono">× {it.qty}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-gold/10 pt-3 text-ivory">
                <dt className="font-mono text-[11px] uppercase tracking-luxe">Total</dt>
                <dd className="font-display text-xl">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </div>
        ) : checked ? (
          <p className="mt-8 text-[14px] text-ivory-muted">
            No recent demo order found — but the collection is still open.
          </p>
        ) : null}

        <p className="mx-auto mt-10 max-w-md text-[13px] leading-relaxed text-ivory-faint">
          This is a design concept by Daycraft Studio. No order was placed, no
          payment was taken, and nothing was stored beyond your browser
          session.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="btn-gold">
            Keep browsing
          </Link>
          <Link href="/" className="btn-ghost">
            Back to start
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
