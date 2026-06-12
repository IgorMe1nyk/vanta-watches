"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {
  COLLECTIONS,
  MATERIALS,
  STYLES,
  products,
  type WatchMaterial,
  type WatchStyle,
} from "@/lib/products";
import { cn } from "@/lib/utils";

const PRICE_BUCKETS = [
  { id: "under-5k", label: "Under $5,000", min: 0, max: 4999 },
  { id: "5k-10k", label: "$5,000 – $10,000", min: 5000, max: 10000 },
  { id: "10k-25k", label: "$10,000 – $25,000", min: 10001, max: 25000 },
  { id: "over-25k", label: "Above $25,000", min: 25001, max: Infinity },
] as const;

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "name", label: "Name, A–Z" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-gold/10 pt-5">
      <legend className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
        {title}
      </legend>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "cursor-pointer border px-3.5 py-2 font-mono text-[11px] uppercase tracking-wide2 transition-colors duration-300",
        active
          ? "border-gold bg-gold text-vanta-950"
          : "border-ivory/15 text-ivory-muted hover:border-gold/50 hover:text-ivory",
      )}
    >
      {children}
    </button>
  );
}

export default function ShopClient() {
  const params = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [collections, setCollections] = useState<string[]>(() => {
    const c = params.get("collection");
    return c && (COLLECTIONS as readonly string[]).includes(c) ? [c] : [];
  });
  const [styles, setStyles] = useState<WatchStyle[]>([]);
  const [materials, setMaterials] = useState<WatchMaterial[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [sort, setSort] = useState<SortId>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (params.get("focus") === "search") searchRef.current?.focus();
  }, [params]);

  const toggle = <T,>(list: T[], setList: (v: T[]) => void, value: T) =>
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (
        q &&
        ![p.name, p.collection, p.style, p.tagline]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
        return false;
      if (collections.length && !collections.includes(p.collection)) return false;
      if (styles.length && !styles.includes(p.style)) return false;
      if (materials.length && !materials.includes(p.material)) return false;
      if (prices.length) {
        const inBucket = prices.some((id) => {
          const b = PRICE_BUCKETS.find((x) => x.id === id)!;
          return p.price >= b.min && p.price <= b.max;
        });
        if (!inBucket) return false;
      }
      return true;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
        );
    }
    return list;
  }, [query, collections, styles, materials, prices, sort]);

  const activeCount =
    collections.length + styles.length + materials.length + prices.length;

  const clearAll = () => {
    setCollections([]);
    setStyles([]);
    setMaterials([]);
    setPrices([]);
    setQuery("");
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-32 md:px-10 md:pt-40">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">The collection</p>
          <h1 className="mt-4 font-display text-5xl font-light text-ivory md:text-6xl">
            Twelve ways
            <br />
            to keep time.
          </h1>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-luxe text-ivory-faint">
          {results.length} of {products.length} timepieces
        </p>
      </div>

      {/* search + sort row */}
      <div className="mt-12 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ivory-faint"
          />
          <label htmlFor="shop-search" className="sr-only">
            Search timepieces
          </label>
          <input
            id="shop-search"
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or collection…"
            className="input-luxe pl-11"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className={cn(
              "flex cursor-pointer items-center gap-2 border px-5 py-3.5 font-mono text-[11px] uppercase tracking-wide2 transition-colors duration-300 md:hidden",
              filtersOpen || activeCount
                ? "border-gold text-gold"
                : "border-ivory/15 text-ivory-muted",
            )}
          >
            <SlidersHorizontal size={14} aria-hidden />
            Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
          <label htmlFor="shop-sort" className="sr-only">
            Sort
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            className="input-luxe w-auto cursor-pointer appearance-none pr-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23a39b8b' stroke-width='1.5'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
            }}
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[260px_1fr]">
        {/* filters */}
        <aside
          className={cn("space-y-6", filtersOpen ? "block" : "hidden lg:block")}
          aria-label="Filters"
        >
          <FilterGroup title="Collection">
            {COLLECTIONS.map((c) => (
              <Chip
                key={c}
                active={collections.includes(c)}
                onClick={() => toggle(collections, setCollections, c)}
              >
                {c}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup title="Style">
            {STYLES.map((s) => (
              <Chip
                key={s}
                active={styles.includes(s)}
                onClick={() => toggle(styles, setStyles, s)}
              >
                {s}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup title="Material">
            {MATERIALS.map((m) => (
              <Chip
                key={m}
                active={materials.includes(m)}
                onClick={() => toggle(materials, setMaterials, m)}
              >
                {m}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup title="Price">
            {PRICE_BUCKETS.map((b) => (
              <Chip
                key={b.id}
                active={prices.includes(b.id)}
                onClick={() => toggle(prices, setPrices, b.id)}
              >
                {b.label}
              </Chip>
            ))}
          </FilterGroup>
          {(activeCount > 0 || query) && (
            <button
              type="button"
              onClick={clearAll}
              className="flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-luxe text-gold transition-colors hover:text-gold-bright"
            >
              <X size={12} aria-hidden />
              Clear all
            </button>
          )}
        </aside>

        {/* grid */}
        <div>
          <h2 className="sr-only">Results</h2>
          {results.length === 0 ? (
            <div className="flex flex-col items-start gap-5 border border-gold/15 px-8 py-16">
              <p className="font-display text-3xl font-light text-ivory">
                Nothing matches — yet.
              </p>
              <p className="max-w-sm text-[14px] leading-relaxed text-ivory-muted">
                Try removing a filter, or search for a collection like
                “Helios” or “Abyss”.
              </p>
              <button type="button" onClick={clearAll} className="btn-ghost">
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} priority={i < 3} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
