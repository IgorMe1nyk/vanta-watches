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

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-vanta-900">
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
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vanta-950/30 to-transparent"
        />
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
