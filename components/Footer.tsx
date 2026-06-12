import Link from "next/link";

const SHOP_LINKS = [
  { href: "/shop", label: "All timepieces" },
  { href: "/shop?collection=Meridian", label: "Meridian" },
  { href: "/shop?collection=Helios", label: "Helios" },
  { href: "/shop?collection=Abyss", label: "Abyss" },
  { href: "/shop?collection=Vector", label: "Vector" },
];

const MAISON_LINKS = [
  { href: "/about", label: "Heritage" },
  { href: "/about#craft", label: "Craftsmanship" },
  { href: "/bag", label: "Your bag" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-vanta-950">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-display text-[28px] tracking-[0.42em] text-ivory">
              VANTA
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.5em] text-gold">
              Fine Timepieces
            </p>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-ivory-muted">
              Instruments for people who notice. Designed in the dark, finished
              in the light.
            </p>
          </div>
          <nav aria-label="Shop">
            <p className="eyebrow">Collection</p>
            <ul className="mt-5 space-y-3">
              {SHOP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-ivory-muted transition-colors duration-300 hover:text-gold-bright"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Maison">
            <p className="eyebrow">Maison</p>
            <ul className="mt-5 space-y-3">
              {MAISON_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-ivory-muted transition-colors duration-300 hover:text-gold-bright"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 border-t border-gold/10 pt-8">
          <p className="text-[13px] leading-relaxed text-ivory-faint">
            A concept store by{" "}
            <a
              href="https://daycraftstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline decoration-gold/50 underline-offset-4 transition-colors duration-300 hover:text-gold-bright"
            >
              Daycraft Studio
            </a>{" "}
            — design demo, not a real company. VANTA, its watches and prices
            are fictional. Photography via Unsplash (see CREDITS.md). No real
            orders are taken.
          </p>
        </div>
      </div>
    </footer>
  );
}
