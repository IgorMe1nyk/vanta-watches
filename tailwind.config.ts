import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // canvas
        vanta: {
          950: "#0B0A09",
          900: "#121110",
          850: "#171514",
          800: "#1C1A18",
          700: "#2A2724",
        },
        // metals
        gold: {
          DEFAULT: "#C8A86B",
          bright: "#E6CD96",
          dim: "#8F7A50",
          faint: "#574A33",
        },
        platinum: "#C8CBD0",
        // type
        ivory: {
          DEFAULT: "#EDE8DF",
          muted: "#A39B8B",
          // 4.9:1 on the near-black canvas — keeps WCAG AA at small sizes
          faint: "#8B8275",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        luxe: "0.28em",
        wide2: "0.18em",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
