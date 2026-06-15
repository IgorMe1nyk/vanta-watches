"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/products";
import type { WatchFinish } from "@/components/three/WatchModel";
import { cn } from "@/lib/utils";

const ConfiguratorScene = dynamic(
  () => import("@/components/three/ConfiguratorScene"),
  { ssr: false, loading: () => null },
);

const CASES = [
  { id: "Champagne gold", swatch: "#c9a86d", caseColor: "#c9a86d", caseDeep: "#9a7c46", accent: "#e6cd96" },
  { id: "Steel", swatch: "#b9bdc4", caseColor: "#c6cad1", caseDeep: "#8d9197", accent: "#e3e6ea" },
  { id: "Titanium", swatch: "#8d8a83", caseColor: "#a09c93", caseDeep: "#6e6a62", accent: "#cfcabe" },
];

const DIALS = [
  { id: "Onyx", swatch: "#0c0a08", dialColor: "#0c0a08" },
  { id: "Abyss blue", swatch: "#12233c", dialColor: "#101e33" },
  { id: "Ivory", swatch: "#e6dfd1", dialColor: "#ddd5c4" },
];

const STRAPS = [
  { id: "Leather — Noir", swatch: "#16110d", strapColor: "#16110d" },
  { id: "Leather — Cognac", swatch: "#5a3a22", strapColor: "#52351f" },
  { id: "Bracelet — Steel", swatch: "#9ba0a8", strapColor: "#878c94" },
];

function SwatchRow<T extends { id: string; swatch: string }>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
        {label}
      </legend>
      <div className="mt-3 flex flex-wrap gap-3">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={o.id === value}
            className={cn(
              "group flex cursor-pointer items-center gap-2.5 border px-3 py-2 transition-colors duration-300",
              o.id === value
                ? "border-gold bg-gold/10"
                : "border-ivory/15 hover:border-gold/50",
            )}
          >
            <span
              aria-hidden
              className="h-4 w-4 rounded-full border border-white/20"
              style={{ backgroundColor: o.swatch }}
            />
            <span
              className={cn(
                "font-mono text-[10.5px] uppercase tracking-wide2",
                o.id === value ? "text-gold-bright" : "text-ivory-muted group-hover:text-ivory",
              )}
            >
              {o.id}
            </span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * "Build your own" — live 3D material configurator. Adds a bespoke
 * configuration of this model to the bag.
 */
export default function Configurator({ product }: { product: Product }) {
  const { addItem } = useCart();
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [allowed, setAllowed] = useState(true);
  const [caseId, setCaseId] = useState(CASES[0].id);
  const [dialId, setDialId] = useState(DIALS[0].id);
  const [strapId, setStrapId] = useState(STRAPS[0].id);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAllowed(false);
      return;
    }
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const c = CASES.find((x) => x.id === caseId)!;
  const d = DIALS.find((x) => x.id === dialId)!;
  const s = STRAPS.find((x) => x.id === strapId)!;
  const finish: WatchFinish = {
    caseColor: c.caseColor,
    caseDeep: c.caseDeep,
    accent: c.accent,
    dialColor: d.dialColor,
    strapColor: s.strapColor,
  };

  const handleAdd = () => {
    addItem(product.slug, `Bespoke — ${caseId} · ${dialId} dial · ${strapId}`);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <section
      ref={hostRef}
      aria-labelledby="configurator-heading"
      className="mt-28 border-t border-gold/10 pt-16"
    >
      <p className="eyebrow">The atelier desk</p>
      <h2
        id="configurator-heading"
        className="mt-4 font-display text-3xl font-light text-ivory md:text-4xl"
      >
        Build your {product.name.split(" ")[0]}.
      </h2>
      <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-ivory-muted">
        Case, dial, strap — configured live. (A demo of the kind of bespoke
        commission work the maison takes on.)
      </p>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative h-[380px] overflow-hidden border border-gold/10 bg-vanta-900/60 md:h-[460px]">
          {allowed && visible ? (
            <ConfiguratorScene finish={finish} />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(200,168,107,0.14), transparent 70%)",
              }}
            />
          )}
          <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-luxe text-ivory-faint">
            Live render — procedural model
          </p>
        </div>

        <div className="space-y-8">
          <SwatchRow label="Case material" options={CASES} value={caseId} onChange={setCaseId} />
          <SwatchRow label="Dial" options={DIALS} value={dialId} onChange={setDialId} />
          <SwatchRow label="Strap" options={STRAPS} value={strapId} onChange={setStrapId} />
          <button
            type="button"
            onClick={handleAdd}
            className={cn("btn-gold w-full sm:w-auto sm:min-w-[280px]", added && "bg-gold-bright")}
          >
            {added ? (
              <>
                <Check size={14} aria-hidden /> Configuration added
              </>
            ) : (
              "Add this configuration"
            )}
          </button>
          <p className="text-[12px] leading-relaxed text-ivory-faint">
            Bespoke commissions are priced as the standard reference in this
            demo.
          </p>
        </div>
      </div>
    </section>
  );
}
