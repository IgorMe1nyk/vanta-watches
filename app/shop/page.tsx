import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Browse all twelve VANTA timepieces — dress, dive, chronograph and sport. A fictional concept store by Daycraft Studio.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-[160vh]" aria-hidden />}>
      <ShopClient />
    </Suspense>
  );
}
