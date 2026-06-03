# Farnham Senior Health Advisors

## Overview
Static marketing website for Farnham Senior Health Advisors, a Medicare insurance
advisory business serving the Hudson Valley region of New York. Built with Astro
and Tailwind CSS. The site is fully static (no backend, no database).

## Tech Stack
- **Astro 4** (static output) — page framework / static site generator
- **Tailwind CSS 3** with the `@tailwindcss/typography` plugin
- **@astrojs/sitemap** — generates `sitemap-index.xml` at build
- **sharp** — image optimization
- All content/config lives in `src/data/site.ts` (single source of truth for
  business info, services, service-area counties, etc.)

## Project Structure
- `src/pages/` — routes (`.astro` files). Includes dynamic
  `service-areas/[county].astro` driven by the counties list in `site.ts`.
- `src/components/` — reusable UI components
- `src/layouts/` — page layouts (`BaseLayout.astro`)
- `src/data/site.ts` — business data, services, counties, SEO metadata
- `public/` — static assets served as-is

## Development
- Dev server: `npm run dev` (configured for host `0.0.0.0`, port `5000`)
- Production build: `npm run build` → outputs to `dist/`
- Preview build: `npm run preview`
- The "Start application" workflow runs `npm run dev` on port 5000.

## Deployment
- Configured as a **static** deployment.
- Build command: `npm run build`
- Public directory: `dist`

## Notes
- Some images are intentional placeholders for the client to supply, e.g.
  `/public/images/jim-farnham.jpg` (headshot) and `/public/images/farnham-og.jpg`
  (social share image). These produce expected 404s until provided.
- Several `⚠️ CONFIRM` placeholders exist in `src/data/site.ts` for the client
  to verify (business details, etc.). These are client-data items, left as-is.

## User Preferences
- None recorded yet.
