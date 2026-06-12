"use client";

import { useState } from "react";
import { ShieldCheck, Truck, BadgeCheck, RotateCcw } from "lucide-react";
import Reveal from "@/components/Reveal";

const TRUST = [
  { icon: Truck, label: "Free insured shipping" },
  { icon: ShieldCheck, label: "2-year international warranty" },
  { icon: BadgeCheck, label: "Authenticity guaranteed" },
  { icon: RotateCcw, label: "30-day returns" },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="border-t border-gold/10">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-28">
        <Reveal>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="eyebrow">The waiting list</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ivory md:text-5xl">
                New calibres,
                <br />
                announced quietly.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory-muted">
                One email when something leaves the bench. Never two.
              </p>
            </div>
            <div>
              {done ? (
                <p
                  className="border border-gold/30 px-6 py-5 text-[15px] text-gold-bright"
                  role="status"
                >
                  Noted. You&apos;ll hear from us when it matters. (Demo — no
                  email was stored.)
                </p>
              ) : (
                <form
                  className="flex flex-col gap-3 sm:flex-row"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.includes("@")) setDone(true);
                  }}
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input-luxe flex-1"
                  />
                  <button type="submit" className="btn-gold shrink-0">
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-gold/10 pt-10 lg:grid-cols-4">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-3">
                <t.icon size={18} className="shrink-0 text-gold" aria-hidden />
                <span className="font-mono text-[10.5px] uppercase tracking-wide2 text-ivory-muted">
                  {t.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
