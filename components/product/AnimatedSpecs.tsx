"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProductSpecs } from "@/lib/products";

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

/** Spec table whose rows draw in one by one as it scrolls into view. */
export default function AnimatedSpecs({ specs }: { specs: ProductSpecs }) {
  const reduced = useReducedMotion();

  return (
    <table className="mt-4 w-full border-t border-gold/10 text-left">
      <tbody>
        {Object.entries(specs).map(([key, value], i) => (
          <motion.tr
            key={key}
            className="border-b border-gold/10"
            initial={reduced ? false : { opacity: 0, x: -12 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <th
              scope="row"
              className="w-2/5 py-3.5 pr-4 align-top font-mono text-[10.5px] font-normal uppercase tracking-wide2 text-ivory-faint"
            >
              {SPEC_LABELS[key] ?? key}
            </th>
            <td className="py-3.5 text-[14px] text-ivory">{value}</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}
