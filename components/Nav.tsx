"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/shop", label: "Collection" },
  { href: "/about", label: "Maison" },
];

export default function Nav() {
  const { count, openDrawer } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || mobileOpen
          ? "border-b border-gold/10 bg-vanta-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-vanta-950"
      >
        Skip to content
      </a>
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-10"
        aria-label="Main"
      >
        {/* left links (desktop) */}
        <div className="hidden flex-1 items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "font-mono text-[11px] uppercase tracking-luxe transition-colors duration-300 hover:text-gold-bright",
                pathname.startsWith(l.href) ? "text-gold" : "text-ivory-muted",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* mobile menu button */}
        <button
          type="button"
          className="flex h-11 w-11 cursor-pointer items-center justify-center text-ivory md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* wordmark */}
        <Link href="/" className="group flex flex-col items-center">
          <span className="font-display text-[26px] font-medium tracking-[0.42em] text-ivory transition-colors duration-300 group-hover:text-gold-bright md:text-[28px]">
            VANTA
          </span>
          <span className="-mt-1 hidden font-mono text-[8px] uppercase tracking-[0.5em] text-gold sm:block">
            Fine Timepieces
          </span>
        </Link>

        {/* right actions */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-5">
          <Link
            href="/shop?focus=search"
            className="hidden h-11 w-11 cursor-pointer items-center justify-center text-ivory-muted transition-colors duration-300 hover:text-gold-bright md:flex"
            aria-label="Search the collection"
          >
            <Search size={18} />
          </Link>
          <button
            type="button"
            onClick={openDrawer}
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center text-ivory transition-colors duration-300 hover:text-gold-bright"
            aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span
                aria-hidden
                className="absolute right-0.5 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 font-mono text-[10px] font-medium text-vanta-950"
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gold/10 bg-vanta-950/95 px-5 py-6 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1">
            {[{ href: "/", label: "Home" }, ...LINKS, { href: "/bag", label: "Bag" }].map(
              (l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="py-3 font-mono text-[12px] uppercase tracking-luxe text-ivory-muted transition-colors hover:text-gold-bright"
                >
                  {l.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
