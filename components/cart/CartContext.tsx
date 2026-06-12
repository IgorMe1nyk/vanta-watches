"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct, type Product } from "@/lib/products";

export interface CartLine {
  slug: string;
  strap: string;
  qty: number;
}

export interface CartLineDetailed extends CartLine {
  product: Product;
}

interface CartContextValue {
  lines: CartLineDetailed[];
  count: number;
  subtotal: number;
  addItem: (slug: string, strap: string, qty?: number) => void;
  removeItem: (slug: string, strap: string) => void;
  setQty: (slug: string, strap: string, qty: number) => void;
  clear: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "vanta-bag-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CartLine[] = JSON.parse(stored);
        setRaw(parsed.filter((l) => getProduct(l.slug) && l.qty > 0));
      }
    } catch {
      // corrupted storage — start fresh
    }
    setHydrated(true);
  }, []);

  // never write before the hydration state has actually been applied,
  // otherwise the initial empty render clobbers the stored bag
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      // storage unavailable (private mode) — cart still works in memory
    }
  }, [raw, hydrated]);

  const addItem = useCallback((slug: string, strap: string, qty = 1) => {
    setRaw((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.strap === strap);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug && l.strap === strap
            ? { ...l, qty: Math.min(l.qty + qty, 5) }
            : l,
        );
      }
      return [...prev, { slug, strap, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, strap: string) => {
    setRaw((prev) => prev.filter((l) => !(l.slug === slug && l.strap === strap)));
  }, []);

  const setQty = useCallback((slug: string, strap: string, qty: number) => {
    setRaw((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.strap === strap))
        : prev.map((l) =>
            l.slug === slug && l.strap === strap
              ? { ...l, qty: Math.min(qty, 5) }
              : l,
          ),
    );
  }, []);

  const clear = useCallback(() => setRaw([]), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = raw
      .map((l) => ({ ...l, product: getProduct(l.slug)! }))
      .filter((l) => l.product);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      addItem,
      removeItem,
      setQty,
      clear,
      drawerOpen,
      openDrawer,
      closeDrawer,
    };
  }, [raw, drawerOpen, addItem, removeItem, setQty, clear, openDrawer, closeDrawer]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
