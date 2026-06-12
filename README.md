# VANTA — Fine Timepieces

A **concept luxury watch e-commerce store** designed and built by [Daycraft Studio](https://daycraftstudio.com) to demonstrate high-end online retail design. **VANTA is a fictional brand** — the watches, calibres, prices and heritage are invented, no real orders are taken, and the checkout is a non-functional demo (no payment processing of any kind).

**Live:** [vanta.daycraftstudio.com](https://vanta.daycraftstudio.com)

## What's inside

- **Home** — procedural 3D hero watch (react-three-fiber, no external models), collections strip, movement storytelling, heritage editorial, featured pieces
- **Shop** — filter by collection / style / material / price, sort, live search
- **Product pages** — gallery, storytelling copy, spec tables, related pieces
- **Bag** — drawer + full page, persisted in `localStorage`
- **Checkout** — demo-only form with a clear disclaimer, order confirmation
- **About** — fictional maison story with an honest "this is a concept" disclosure

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · react-three-fiber / drei · Lenis smooth scroll

## Quality

- Lighthouse (desktop, prod build): home 85 / 100 / 100 / 100, shop 99 / 100 / 100 / 100, product page 100 across the board
- axe-core WCAG 2.2 AA: zero violations on all audited pages
- `prefers-reduced-motion` respected (3D and heavy motion disabled)

## Imagery

All photography from Unsplash under the Unsplash License — see [CREDITS.md](CREDITS.md). No AI-generated imagery.

```bash
npm install
npm run dev
```
