"use client";

import { useState } from "react";
import { Check, ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function AddToBag({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [strap, setStrap] = useState(product.straps[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product.slug, strap);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="mt-10">
      <fieldset>
        <legend className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
          Strap
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.straps.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStrap(s)}
              aria-pressed={s === strap}
              className={cn(
                "cursor-pointer border px-4 py-2.5 font-mono text-[11px] uppercase tracking-wide2 transition-colors duration-300",
                s === strap
                  ? "border-gold bg-gold/10 text-gold-bright"
                  : "border-ivory/15 text-ivory-muted hover:border-gold/50 hover:text-ivory",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={handleAdd}
        className={cn("btn-gold mt-8 w-full sm:w-auto sm:min-w-[280px]", added && "bg-gold-bright")}
      >
        {added ? (
          <>
            <Check size={14} aria-hidden /> Added to bag
          </>
        ) : (
          "Add to bag"
        )}
      </button>

      <ul className="mt-8 space-y-3 border-t border-gold/10 pt-6">
        {[
          { icon: Truck, text: "Free insured shipping, signature on delivery" },
          { icon: ShieldCheck, text: "2-year international warranty" },
          { icon: BadgeCheck, text: "Authenticity guaranteed — numbered case back" },
        ].map((t) => (
          <li key={t.text} className="flex items-center gap-3 text-[13px] text-ivory-muted">
            <t.icon size={15} className="shrink-0 text-gold" aria-hidden />
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
