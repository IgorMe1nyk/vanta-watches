"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductImage } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function Gallery({
  images,
  name,
}: {
  images: ProductImage[];
  name: string;
}) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  return (
    <div>
      <div
        className="group/zoom relative aspect-[4/5] overflow-hidden bg-vanta-900"
        data-cursor-label={zoom ? "Close" : "Zoom"}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(
            `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`,
          );
        }}
        onClick={() => setZoom((z) => !z)}
        onPointerLeave={() => setZoom(false)}
        role="button"
        tabIndex={0}
        aria-label={`${zoom ? "Close zoom on" : "Zoom into"} product image`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setZoom((z) => !z);
          }
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-500 ease-luxe"
              style={{
                transformOrigin: origin,
                transform: zoom ? "scale(2.1)" : "scale(1)",
              }}
            />
          </motion.div>
        </AnimatePresence>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vanta-950/30 to-transparent"
        />
        <p
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-luxe text-ivory-faint opacity-0 transition-opacity duration-300 group-hover/zoom:opacity-100"
        >
          Click to {zoom ? "close" : "magnify"}
        </p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3" role="tablist" aria-label={`${name} gallery`}>
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`View image ${i + 1} of ${images.length}`}
            onClick={() => setIndex(i)}
            className={cn(
              "relative aspect-[4/3] cursor-pointer overflow-hidden border transition-colors duration-300",
              i === index
                ? "border-gold"
                : "border-transparent opacity-60 hover:opacity-100",
            )}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="180px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
