# Project Overview
O'zbekiston Davlat Filarmoniyasi is a modern website for the Uzbekistan State Philharmonic, built using Next.js 16 (App Router) and React 19. The project embraces a specific design system named "Aetheric Resonance," characterized by a futuristic-formal aesthetic with light surfaces and dark heroes.

## Architecture & Technologies
- **Framework**: Next.js 16 (App Router). Note that this version has breaking changes. Always consult `node_modules/next/dist/docs/` if unsure about the API.
- **Library**: React 19.
- **Language**: JavaScript (JSX). **Do not use TypeScript.**
- **Styling**: Strictly **CSS Modules** (`.module.css`). **Never use Tailwind CSS classes** in components, despite its presence in devDependencies.
- **External Libraries**: Swiper.js for sliders.
- **Assets**: Google Fonts (Space Grotesk, Manrope) and Material Symbols Outlined are loaded via `<link>` tags in `src/app/layout.js`. Images live in `public/images/`.

## Building and Running
The following commands are defined in `package.json`:

- **Start Development Server**: `npm run dev`
- **Create Production Build**: `npm run build`
- **Serve Production Build**: `npm run start`
- **Run Linter**: `npm run lint`

*Note: No test runner is currently configured.*

## Development Conventions & Design Rules
- **CSS Variables**: All colors must come from CSS variables defined in `src/app/globals.css` (e.g., `--primary`, `--surface-container-low`). **Never hardcode hex values.**
- **Sharp Edges**: Apply `border-radius: 0` strictly across the UI. There are no rounded corners.
- **Sectioning**: Do not use 1px solid borders for sectioning. Use tonal surface shifts (e.g., a `--surface-container-lowest` card resting on a `--surface-container-low` background).
- **Client Components**: Ensure you use the `'use client'` directive at the top of any component that relies on React state, effects, or browser APIs (e.g., when implementing Swiper.js components).
- **Localization**: The application content is in Uzbek (`lang="uz"`). Preserve all Latin-script Uzbek strings verbatim.
- **Import Aliases**: Use `@/` to reference the `src/` directory.
