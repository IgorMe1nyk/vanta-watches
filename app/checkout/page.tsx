"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Info, Lock } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { cn, formatPrice } from "@/lib/utils";

const SHIPPING_METHODS = [
  {
    id: "courier",
    label: "Insured courier",
    detail: "2–4 business days, signature required",
    price: 0,
  },
  {
    id: "concierge",
    label: "Concierge hand delivery",
    detail: "Delivered and sized in person",
    price: 0,
  },
] as const;

function Field({
  id,
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] uppercase tracking-wide2 text-ivory-faint"
      >
        {label}
      </label>
      <input id={id} className="input-luxe" {...props} />
    </div>
  );
}

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();
  const [shipping, setShipping] = useState<string>(SHIPPING_METHODS[0].id);
  const [placing, setPlacing] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lines.length === 0 || placing) return;
    setPlacing(true);
    // demo only — nothing is sent or stored anywhere
    const order = {
      number: `VA-${String(Math.floor(100000 + Math.random() * 900000))}`,
      total: subtotal,
      items: lines.map((l) => ({ name: l.product.name, qty: l.qty })),
    };
    try {
      window.sessionStorage.setItem("vanta-last-order", JSON.stringify(order));
    } catch {}
    window.setTimeout(() => {
      clear();
      router.push("/checkout/confirmation");
    }, 900);
  };

  if (lines.length === 0 && !placing) {
    return (
      <div className="mx-auto max-w-3xl px-5 pb-28 pt-40 text-center md:px-10">
        <h1 className="font-display text-5xl font-light text-ivory">
          Nothing to check out.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] text-ivory-muted">
          Your bag is empty — the collection, however, is not.
        </p>
        <Link href="/shop" className="btn-gold mt-10">
          Browse timepieces
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-32 md:px-10 md:pt-40">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-4 font-display text-5xl font-light text-ivory md:text-6xl">
        Almost yours.
      </h1>

      {/* stepped progress */}
      <ol className="mt-10 flex max-w-3xl items-center gap-0" aria-label="Checkout steps">
        {["Contact", "Shipping", "Delivery", "Payment"].map((step, i) => (
          <li key={step} className="flex flex-1 items-center">
            <span className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gold/50 font-mono text-[10px] text-gold">
                {i + 1}
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-wide2 text-ivory-muted sm:block">
                {step}
              </span>
            </span>
            {i < 3 && <span aria-hidden className="mx-3 h-px flex-1 bg-gold/20" />}
          </li>
        ))}
      </ol>

      {/* demo disclaimer */}
      <div
        className="mt-8 flex max-w-3xl items-start gap-3 border border-gold/30 bg-gold/5 px-5 py-4"
        role="note"
      >
        <Info size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />
        <p className="text-[13px] leading-relaxed text-ivory-muted">
          <strong className="text-gold-bright">Demo checkout.</strong> This is
          a design concept — no real payment is taken, and nothing you enter
          is sent or stored anywhere. Please don&apos;t enter real card
          details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-12 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-14">
          {/* contact */}
          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="flex items-baseline gap-3 font-display text-2xl text-ivory">
              <span className="font-mono text-[11px] text-gold">01</span> Contact
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field id="email" label="Email" type="email" required placeholder="you@example.com" autoComplete="email" />
              <Field id="phone" label="Phone (optional)" type="tel" placeholder="+1 …" autoComplete="tel" />
            </div>
          </section>

          {/* shipping address */}
          <section aria-labelledby="shipping-heading">
            <h2 id="shipping-heading" className="flex items-baseline gap-3 font-display text-2xl text-ivory">
              <span className="font-mono text-[11px] text-gold">02</span> Shipping address
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field id="first-name" label="First name" required autoComplete="given-name" />
              <Field id="last-name" label="Last name" required autoComplete="family-name" />
              <Field id="address" label="Street address" required className="sm:col-span-2" autoComplete="street-address" />
              <Field id="city" label="City" required autoComplete="address-level2" />
              <div className="grid grid-cols-2 gap-5">
                <Field id="state" label="State / Region" required autoComplete="address-level1" />
                <Field id="zip" label="ZIP" required autoComplete="postal-code" />
              </div>
              <Field id="country" label="Country" required defaultValue="United States" className="sm:col-span-2" autoComplete="country-name" />
            </div>
          </section>

          {/* shipping method */}
          <section aria-labelledby="method-heading">
            <h2 id="method-heading" className="flex items-baseline gap-3 font-display text-2xl text-ivory">
              <span className="font-mono text-[11px] text-gold">03</span> Delivery
            </h2>
            <div className="mt-6 grid gap-3">
              {SHIPPING_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-4 border px-5 py-4 transition-colors duration-300",
                    shipping === m.id
                      ? "border-gold bg-gold/5"
                      : "border-ivory/15 hover:border-gold/40",
                  )}
                >
                  <span className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="shipping"
                      value={m.id}
                      checked={shipping === m.id}
                      onChange={() => setShipping(m.id)}
                      className="h-4 w-4 accent-[#c8a86b]"
                    />
                    <span>
                      <span className="block text-[14px] text-ivory">{m.label}</span>
                      <span className="block text-[12px] text-ivory-faint">{m.detail}</span>
                    </span>
                  </span>
                  <span className="font-mono text-[12px] text-gold">
                    {m.price === 0 ? "Included" : formatPrice(m.price)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* payment */}
          <section aria-labelledby="payment-heading">
            <h2 id="payment-heading" className="flex items-baseline gap-3 font-display text-2xl text-ivory">
              <span className="font-mono text-[11px] text-gold">04</span> Payment
              <Lock size={14} className="text-ivory-faint" aria-hidden />
            </h2>
            <p className="mt-2 text-[12px] text-ivory-faint">
              Demo form — use any made-up numbers.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field id="card-name" label="Name on card" required className="sm:col-span-2" autoComplete="off" />
              <Field
                id="card-number"
                label="Card number"
                required
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                pattern="[0-9 ]{12,23}"
                className="sm:col-span-2"
                autoComplete="off"
              />
              <Field id="card-expiry" label="Expiry (MM/YY)" required placeholder="MM/YY" pattern="\d{2}/\d{2}" autoComplete="off" />
              <Field id="card-cvc" label="CVC" required inputMode="numeric" placeholder="123" pattern="\d{3,4}" autoComplete="off" />
            </div>
          </section>
        </div>

        {/* order summary */}
        <aside className="h-fit border border-gold/15 p-8 lg:sticky lg:top-32">
          <h2 className="font-mono text-[11px] uppercase tracking-luxe text-ivory">
            Order summary
          </h2>
          <ul className="mt-6 space-y-5">
            {lines.map((l) => (
              <li key={`${l.slug}-${l.strap}`} className="flex items-center gap-4">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-vanta-850">
                  <Image
                    src={l.product.images[0].src}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-display text-[15px] text-ivory">
                    {l.product.name}
                  </p>
                  <p className="text-[11px] text-ivory-faint">
                    {l.strap} × {l.qty}
                  </p>
                </div>
                <p className="font-mono text-[13px] text-ivory-muted">
                  {formatPrice(l.product.price * l.qty)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="mt-8 space-y-3 border-t border-gold/10 pt-5 text-[14px]">
            <div className="flex justify-between text-ivory-muted">
              <dt>Subtotal</dt>
              <dd className="font-mono">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-ivory-muted">
              <dt>Shipping</dt>
              <dd className="font-mono text-gold">Included</dd>
            </div>
            <div className="flex justify-between border-t border-gold/10 pt-4 text-ivory">
              <dt className="font-mono text-[11px] uppercase tracking-luxe">Total</dt>
              <dd className="font-display text-2xl">{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={placing}
            className={cn("btn-gold mt-8 w-full", placing && "cursor-wait opacity-70")}
          >
            {placing ? "Placing order…" : "Place order (demo)"}
          </button>
          <p className="mt-4 text-center text-[11px] leading-relaxed text-ivory-faint">
            No payment is processed. This is a portfolio concept by Daycraft
            Studio.
          </p>
        </aside>
      </form>
    </div>
  );
}
