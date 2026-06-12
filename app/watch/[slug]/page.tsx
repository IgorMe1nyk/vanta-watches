import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/product/Gallery";
import AddToBag from "@/components/product/AddToBag";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getProduct, getRelated, products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.tagline} — ${product.name}, ${formatPrice(product.price)}. A fictional timepiece from the VANTA concept store by Daycraft Studio.`,
  };
}

const SPEC_LABELS: Record<string, string> = {
  movement: "Movement",
  caliber: "Calibre",
  caseSize: "Case size",
  caseMaterial: "Case material",
  waterResistance: "Water resistance",
  crystal: "Crystal",
  strap: "Strap",
  reference: "Reference",
};

export default function WatchPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-28 md:px-10 md:pt-36">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
          <li>
            <Link href="/shop" className="transition-colors hover:text-gold-bright">
              Collection
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href={`/shop?collection=${product.collection}`}
              className="transition-colors hover:text-gold-bright"
            >
              {product.collection}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ivory-muted">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Gallery images={product.images} name={product.name} />

        <div>
          <p className="eyebrow">{product.collection} collection</p>
          <h1 className="mt-4 font-display text-5xl font-light leading-[1.05] text-ivory md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-xl italic text-gold-bright">
            {product.tagline}
          </p>
          <p className="mt-6 font-mono text-2xl text-ivory">
            {formatPrice(product.price)}
          </p>

          <AddToBag product={product} />

          <div className="mt-12">
            <h2 className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
              The story
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ivory-muted">
              {product.story}
            </p>
          </div>

          <div className="mt-12">
            <h2 className="font-mono text-[10px] uppercase tracking-luxe text-ivory-faint">
              Specifications
            </h2>
            <table className="mt-4 w-full border-t border-gold/10 text-left">
              <tbody>
                {Object.entries(product.specs).map(([key, value]) => (
                  <tr key={key} className="border-b border-gold/10">
                    <th
                      scope="row"
                      className="w-2/5 py-3.5 pr-4 align-top font-mono text-[10.5px] font-normal uppercase tracking-wide2 text-ivory-faint"
                    >
                      {SPEC_LABELS[key] ?? key}
                    </th>
                    <td className="py-3.5 text-[14px] text-ivory">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* related */}
      <section className="mt-28 border-t border-gold/10 pt-16" aria-label="You may also like">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-light text-ivory md:text-4xl">
              You may also like
            </h2>
            <Link
              href="/shop"
              className="font-mono text-[11px] uppercase tracking-luxe text-gold transition-colors hover:text-gold-bright"
            >
              All timepieces →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
