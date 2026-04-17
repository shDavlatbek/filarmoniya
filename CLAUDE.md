# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

**O'zbekiston Davlat Filarmoniyasi** — Next.js 16 (App Router) website for the Uzbekistan State Philharmonic. Design system: **"Aetheric Resonance"** — futuristic-formal, light surfaces, dark hero.

## Stack

- **Next.js 16** (App Router) with `src/` directory — see `AGENTS.md`: this version has breaking changes from older Next.js, consult `node_modules/next/dist/docs/` before writing code
- **React 19**, JavaScript (JSX), no TypeScript
- **Styling**: CSS Modules (`.module.css`) only — **never use Tailwind classes in components** despite `tailwindcss` being a dev dependency
- **Swiper.js** for sliders (requires `'use client'`)
- **Google Fonts** (Space Grotesk, Manrope) + Material Symbols Outlined loaded via `<link>` tags in [src/app/layout.js](src/app/layout.js)

## Commands

```bash
npm run dev      # Dev server (default http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (next/core-web-vitals)
```

No test runner is configured.

## Design System

**Always consult [ref/DESIGN.md](ref/DESIGN.md) before visual changes.** Hard rules:

- **`border-radius: 0` on everything** — no rounded corners, ever
- **No 1px solid borders** for sectioning — use tonal surface shifts (e.g. `surface-container-lowest` card on `surface-container-low` background)
- All colors come from CSS variables in [src/app/globals.css](src/app/globals.css) (`--primary`, `--secondary`, `--surface-*`, `--on-surface-*`) — **never hardcode hex values**
- Typography: Space Grotesk (display/headlines), Manrope (body/labels)
- Sticky nav uses `backdrop-filter: blur(20px)` glassmorphism
- Purple `--secondary` brush-stroke blurs for artistic overlays

[ref/code.html](ref/code.html) is a Tailwind-based HTML prototype used as a visual reference — **do not port its Tailwind classes**, translate the design into CSS Modules.

## Architecture

Home page composes three client-heavy components: [src/app/page.js](src/app/page.js) → `Header`, `HeroSlider`, `NewsSection`. Each component lives in its own folder under [src/components/](src/components/) with a co-located `.module.css`.

### Header — two-element pattern (non-obvious)

[src/components/Header/Header.jsx](src/components/Header/Header.jsx) renders **two separate DOM elements** sharing one `<HeaderBar>` sub-component:

1. `<header>` — `position: absolute`, transparent, sits on top of the hero and scrolls away with content
2. `<div className={stickyHeader}>` — `position: fixed`, initially off-screen at `translateY(-100%)`; slides down when `scrollY > 200`, slides back up on return to top

When the full-screen menu overlay opens, all header elements except the close button are hidden via a `.hiddenWhenOpen` class.

Navigation uses **progressive disclosure**: inline nav items appear/disappear at 768 / 1024 / 1280 / 1440px breakpoints. The hamburger is always visible and opens a full-screen dark overlay; some nav items declare a `children[]` array that expands/collapses inside that overlay.

### HeroSlider

Swiper with `EffectFade` + `Autoplay`. Background images animate `scale(1.15) → scale(1)` on `.swiper-slide-active`. Must be `'use client'`.

## Conventions

- `'use client'` on any component with state, effects, or browser APIs
- Material Symbols icons: `<span className="material-symbols-outlined">icon_name</span>`
- Import alias: `@/` → `src/` (see [jsconfig.json](jsconfig.json))
- Images live in [public/images/](public/images/)
- HTML `lang="uz"` — content is Uzbek; preserve Latin-script Uzbek strings verbatim
