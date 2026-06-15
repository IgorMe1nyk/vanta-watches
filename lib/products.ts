export type WatchStyle = "dress" | "dive" | "chronograph" | "sport";
export type WatchMaterial = "steel" | "gold" | "titanium";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSpecs {
  movement: string;
  caliber: string;
  caseSize: string;
  caseMaterial: string;
  waterResistance: string;
  crystal: string;
  strap: string;
  reference: string;
}

export interface Product {
  slug: string;
  name: string;
  collection: "Meridian" | "Helios" | "Abyss" | "Vector";
  style: WatchStyle;
  material: WatchMaterial;
  price: number;
  tagline: string;
  story: string;
  specs: ProductSpecs;
  images: ProductImage[];
  straps: string[];
  featured?: boolean;
}

export const COLLECTIONS = ["Meridian", "Helios", "Abyss", "Vector"] as const;
export const STYLES: WatchStyle[] = ["dress", "dive", "chronograph", "sport"];
export const MATERIALS: WatchMaterial[] = ["steel", "gold", "titanium"];

export const products: Product[] = [
  {
    slug: "aeon-meridian-38",
    name: "Aeon Meridian 38",
    collection: "Meridian",
    style: "dress",
    material: "steel",
    price: 6400,
    tagline: "The hour, distilled.",
    story:
      "The Aeon Meridian began as a question: how much can be removed before time itself disappears? Its silvered dial is brushed in a single radial pass, its indices are applied by hand under magnification, and its case sits a mere 8.4 millimetres off the wrist. It is the watch our designers reach for when nothing should speak louder than the moment.",
    specs: {
      movement: "Automatic, in-house",
      caliber: "VNT-01",
      caseSize: "38 mm",
      caseMaterial: "904L stainless steel",
      waterResistance: "50 m",
      crystal: "Domed sapphire, double AR coating",
      strap: "Calfskin leather, midnight",
      reference: "VA-3801-SL",
    },
    images: [
      { src: "/images/skeleton-noir.jpg", alt: "Openworked watch with a darkened skeleton dial" },
      { src: "/images/macro-movement-1.jpg", alt: "Macro of an intricate mechanical movement" },
      { src: "/images/watch-shadow.jpg", alt: "Watch emerging from deep shadow" },
    ],
    straps: ["Calfskin — Midnight", "Calfskin — Cognac", "Steel bracelet"],
    featured: true,
  },
  {
    slug: "meridian-noir",
    name: "Meridian Noir",
    collection: "Meridian",
    style: "dress",
    material: "steel",
    price: 4900,
    tagline: "Black on black, read by light.",
    story:
      "The Noir is legible only to its owner. Its sandblasted black dial swallows light until the polished hands catch it back — a private conversation between watch and wearer. We built it for evenings that begin after midnight.",
    specs: {
      movement: "Automatic, in-house",
      caliber: "VNT-01N",
      caseSize: "40 mm",
      caseMaterial: "DLC-coated stainless steel",
      waterResistance: "50 m",
      crystal: "Flat sapphire, AR coating",
      strap: "Calfskin leather, noir",
      reference: "VA-4002-NR",
    },
    images: [
      { src: "/images/watch-shadow.jpg", alt: "Black watch barely emerging from darkness" },
      { src: "/images/editorial-motion.jpg", alt: "Watch in motion blur on a dark surface" },
      { src: "/images/skeleton-noir.jpg", alt: "Openworked watch with a darkened skeleton dial" },
    ],
    straps: ["Calfskin — Noir", "Rubber — Stealth", "Steel bracelet, DLC"],
  },
  {
    slug: "atelier-reserve",
    name: "Atelier Réserve",
    collection: "Meridian",
    style: "dress",
    material: "gold",
    price: 12800,
    tagline: "Eight days of stillness.",
    story:
      "Wind it on Sunday and forget it exists. The Réserve carries an eight-day power reserve in a champagne-gold case thin enough to vanish beneath a cuff. Its movement is finished with Geneva stripes that no one will ever see — which is precisely the point.",
    specs: {
      movement: "Hand-wound, 8-day power reserve",
      caliber: "VNT-08",
      caseSize: "39 mm",
      caseMaterial: "18k champagne gold",
      waterResistance: "30 m",
      crystal: "Domed sapphire, double AR coating",
      strap: "Alligator-grain calfskin, espresso",
      reference: "VA-3903-AU",
    },
    images: [
      { src: "/images/movement-jewels.jpg", alt: "Macro of a jewelled watch movement" },
      { src: "/images/movement-gold.jpg", alt: "Exposed golden watch movement, gears and bridges" },
      { src: "/images/macro-movement-1.jpg", alt: "Macro of an intricate mechanical movement" },
    ],
    straps: ["Alligator-grain — Espresso", "Calfskin — Midnight"],
    featured: true,
  },
  {
    slug: "helios-sovereign",
    name: "Helios Sovereign",
    collection: "Helios",
    style: "dress",
    material: "gold",
    price: 24000,
    tagline: "Gold, answering to no one.",
    story:
      "The Sovereign is cast from a single pour of 18k yellow gold — case, crown and clasp from the same crucible, so the metal ages as one. Under the dial, a micro-rotor keeps the profile low and the presence high. It is not a watch that asks for attention. It assumes it.",
    specs: {
      movement: "Automatic, micro-rotor",
      caliber: "VNT-MR2",
      caseSize: "41 mm",
      caseMaterial: "18k yellow gold and steel",
      waterResistance: "50 m",
      crystal: "Domed sapphire, double AR coating",
      strap: "18k gold bracelet",
      reference: "VA-4104-SV",
    },
    images: [
      { src: "/images/editorial-motion.jpg", alt: "Golden watch caught in motion blur" },
      { src: "/images/movement-gold.jpg", alt: "Exposed golden watch movement, gears and bridges" },
      { src: "/images/macro-movement-1.jpg", alt: "Macro of an intricate mechanical movement" },
    ],
    straps: ["18k gold bracelet", "Alligator-grain — Noir"],
    featured: true,
  },
  {
    slug: "helios-eclipse",
    name: "Helios Eclipse",
    collection: "Helios",
    style: "chronograph",
    material: "gold",
    price: 18500,
    tagline: "Darkness, rimmed in fire.",
    story:
      "A total eclipse lasts minutes; this one is permanent. Black ceramic dial, gold chronograph scales, and hands that flare like a corona when the light grazes them. The Eclipse measures elapsed time the way the sky does — dramatically.",
    specs: {
      movement: "Automatic chronograph, column wheel",
      caliber: "VNT-C9",
      caseSize: "42 mm",
      caseMaterial: "18k gold, ceramic bezel",
      waterResistance: "100 m",
      crystal: "Flat sapphire, AR coating",
      strap: "Rubber, noir with gold pin buckle",
      reference: "VA-4205-EC",
    },
    images: [
      { src: "/images/skeleton-roman.jpg", alt: "Skeleton watch with roman numerals in low light" },
      { src: "/images/movement-gold.jpg", alt: "Exposed golden watch movement, gears and bridges" },
      { src: "/images/macro-gears.jpg", alt: "Macro of brass watch gears" },
    ],
    straps: ["Rubber — Noir", "Calfskin — Noir", "Gold bracelet"],
  },
  {
    slug: "helios-aurum-tourbillon",
    name: "Helios Aurum Tourbillon",
    collection: "Helios",
    style: "dress",
    material: "gold",
    price: 48000,
    tagline: "Gravity, politely declined.",
    story:
      "Our atelier's flagship. A flying tourbillon rotates once a minute in a rose-gold case, correcting for gravity the way the first marine chronometers corrected for the sea. Each example takes four months to finish and is numbered by the watchmaker who built it — one pair of hands, start to finish.",
    specs: {
      movement: "Hand-wound, flying tourbillon",
      caliber: "VNT-T1",
      caseSize: "40 mm",
      caseMaterial: "18k rose gold",
      waterResistance: "30 m",
      crystal: "Domed sapphire, exhibition case back",
      strap: "Alligator-grain calfskin, oxblood",
      reference: "VA-4006-TB",
    },
    images: [
      { src: "/images/movement-gold.jpg", alt: "Exposed golden tourbillon movement, gears and bridges" },
      { src: "/images/macro-movement-2.jpg", alt: "Macro of an exposed mechanical movement" },
      { src: "/images/movement-jewels.jpg", alt: "Macro of a jewelled watch movement" },
    ],
    straps: ["Alligator-grain — Oxblood", "Alligator-grain — Noir"],
    featured: true,
  },
  {
    slug: "abyss-600",
    name: "Abyss 600",
    collection: "Abyss",
    style: "dive",
    material: "steel",
    price: 5200,
    tagline: "Built for the part of the map that's still blue.",
    story:
      "Rated to 600 metres — five hundred and seventy more than you will ever need, and exactly as many as we wanted. The Abyss carries a helium escape valve, a lume so bright it borders on rude, and a bezel that clicks like a bank vault. Overbuilt is the brief.",
    specs: {
      movement: "Automatic, in-house",
      caliber: "VNT-D6",
      caseSize: "42 mm",
      caseMaterial: "904L stainless steel",
      waterResistance: "600 m",
      crystal: "4.5 mm flat sapphire",
      strap: "Steel bracelet, diver extension",
      reference: "VA-4207-AB",
    },
    images: [
      { src: "/images/skeleton-azure.jpg", alt: "Skeleton watch with a blue-tinted openworked dial" },
      { src: "/images/watch-teal.jpg", alt: "Watch with a deep teal dial, softly lit" },
      { src: "/images/macro-skeleton-case.jpg", alt: "Openworked watch resting in a presentation case" },
    ],
    straps: ["Steel bracelet", "Rubber — Abyss blue", "NATO — Slate"],
    featured: true,
  },
  {
    slug: "abyss-obsidian",
    name: "Abyss Obsidian",
    collection: "Abyss",
    style: "dive",
    material: "titanium",
    price: 6800,
    tagline: "The deep, in matte black.",
    story:
      "Grade-5 titanium, micro-blasted to the texture of volcanic glass. The Obsidian weighs less than its own warranty card and disappears on the wrist until the lume comes on — then it's the brightest thing in the water.",
    specs: {
      movement: "Automatic, in-house",
      caliber: "VNT-D6",
      caseSize: "43 mm",
      caseMaterial: "Grade-5 titanium, DLC",
      waterResistance: "600 m",
      crystal: "4.5 mm flat sapphire",
      strap: "Rubber, noir",
      reference: "VA-4308-OB",
    },
    images: [
      { src: "/images/watch-noir-closeup.jpg", alt: "Matte black watch in near-darkness" },
      { src: "/images/macro-skeleton-case.jpg", alt: "Openworked watch resting in a presentation case" },
      { src: "/images/watch-shadow.jpg", alt: "Watch emerging from deep shadow" },
    ],
    straps: ["Rubber — Noir", "Titanium bracelet", "NATO — Slate"],
  },
  {
    slug: "vector-azure-gmt",
    name: "Vector Azure GMT",
    collection: "Vector",
    style: "sport",
    material: "steel",
    price: 7400,
    tagline: "Two time zones. Zero jet lag excuses.",
    story:
      "Built for people whose calendars have two columns. The Azure tracks a second time zone on a cobalt dial deep enough to swim in, with a 24-hour hand that arcs across it like a flight path. Antimagnetic to 15,000 gauss, because cockpits and server rooms don't care about your escapement.",
    specs: {
      movement: "Automatic GMT, in-house",
      caliber: "VNT-G2",
      caseSize: "40 mm",
      caseMaterial: "904L stainless steel",
      waterResistance: "150 m",
      crystal: "Flat sapphire, AR coating",
      strap: "Steel bracelet",
      reference: "VA-4009-AZ",
    },
    images: [
      { src: "/images/watch-teal.jpg", alt: "Watch with a deep cobalt-teal dial, softly lit" },
      { src: "/images/skeleton-azure.jpg", alt: "Skeleton watch with a blue-tinted openworked dial" },
      { src: "/images/macro-gears.jpg", alt: "Macro of brass watch gears" },
    ],
    straps: ["Steel bracelet", "Rubber — Azure", "Calfskin — Cognac"],
  },
  {
    slug: "vector-chronograph",
    name: "Vector Chronograph",
    collection: "Vector",
    style: "chronograph",
    material: "steel",
    price: 9200,
    tagline: "Time, taken apart.",
    story:
      "A column-wheel chronograph with the start-stop feel of a rifle bolt. The Vector's dial is an instrument panel: tachymeter, three registers, and a central seconds hand balanced to a fraction of a milligram. It was designed in our studio's wind tunnel week — and it shows.",
    specs: {
      movement: "Automatic chronograph, column wheel",
      caliber: "VNT-C9",
      caseSize: "41 mm",
      caseMaterial: "904L stainless steel",
      waterResistance: "100 m",
      crystal: "Domed sapphire, double AR coating",
      strap: "Perforated calfskin, racing black",
      reference: "VA-4110-VC",
    },
    images: [
      { src: "/images/macro-gears.jpg", alt: "Macro of a chronograph's brass gear train" },
      { src: "/images/movement-cogs.jpg", alt: "Macro of watch cogs and wheels" },
      { src: "/images/skeleton-roman.jpg", alt: "Skeleton watch with roman numerals in low light" },
    ],
    straps: ["Perforated calfskin — Racing", "Steel bracelet", "Rubber — Stealth"],
    featured: true,
  },
  {
    slug: "vesper-squelette",
    name: "Vesper Squelette",
    collection: "Meridian",
    style: "dress",
    material: "titanium",
    price: 15600,
    tagline: "Nothing to hide. Literally.",
    story:
      "We removed the dial entirely. The Vesper's openworked movement hangs in a titanium frame like a bridge at dusk — every wheel, every jewel, every beat on display. It is the most honest watch we make, and the hardest one to stop looking at.",
    specs: {
      movement: "Hand-wound, openworked",
      caliber: "VNT-SQ1",
      caseSize: "39 mm",
      caseMaterial: "Grade-5 titanium",
      waterResistance: "30 m",
      crystal: "Box sapphire, exhibition case back",
      strap: "Calfskin leather, graphite",
      reference: "VA-3911-VS",
    },
    images: [
      { src: "/images/macro-skeleton-case.jpg", alt: "Vesper Squelette openworked watch presented in a case" },
      { src: "/images/skeleton-noir.jpg", alt: "Openworked watch with a darkened skeleton dial" },
      { src: "/images/movement-mech.jpg", alt: "Close macro of watch gears and mechanisms" },
    ],
    straps: ["Calfskin — Graphite", "Titanium bracelet"],
  },
  {
    slug: "titan-sport",
    name: "Titan Sport",
    collection: "Vector",
    style: "sport",
    material: "titanium",
    price: 1850,
    tagline: "The first VANTA. Not the last.",
    story:
      "Every collection needs a door. The Titan is ours: a grade-2 titanium sports watch with our in-house automatic, a 70-hour reserve, and the same finishing standards as watches eight times its price. We lose money on it. We don't care.",
    specs: {
      movement: "Automatic, in-house",
      caliber: "VNT-01S",
      caseSize: "39 mm",
      caseMaterial: "Grade-2 titanium",
      waterResistance: "100 m",
      crystal: "Flat sapphire",
      strap: "Rubber, graphite",
      reference: "VA-3912-TS",
    },
    images: [
      { src: "/images/movement-cogs.jpg", alt: "Macro of titanium-toned watch cogs and wheels" },
      { src: "/images/editorial-motion.jpg", alt: "Watch in motion blur on a dark surface" },
      { src: "/images/watch-noir-closeup.jpg", alt: "Matte watch in near-darkness" },
    ],
    straps: ["Rubber — Graphite", "NATO — Slate", "Titanium bracelet"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.collection === product.collection ? 2 : 0) +
        (p.style === product.style ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, count);
}
