# Farnham Senior Health Advisors — Website

Astro + Tailwind site for **Farnham Senior Health Advisors, Inc.** (Jim Farnham),
specializing in High-Deductible Medicare Supplement Insurance for New York & Connecticut.

Built as a **storefront** business (public address + map pin + `InsuranceAgency` schema).
Can be switched to a service-area business later by hiding the address and using `areaServed`.

---

## Quick start

```bash
npm install
npm run dev        # local dev at http://localhost:4321
npm run build      # production build -> ./dist
npm run preview    # preview the build
```

Node 18+ required. Adapter: `@astrojs/node` (middleware). Output: `hybrid`
(all pages currently prerender to static; the node adapter keeps server-render
available if a form endpoint is added later).

---

## ⚠️ CONFIRM BEFORE LAUNCH — items to get from Jim

All of these live in **`src/data/site.ts`** unless noted. Search the codebase for
`⚠️ CONFIRM` to jump to each one.

1. **Storefront address** — the real, in-area office with permanent signage,
   staffed during posted hours, where clients can be received. (A P.O. Box or
   unstaffed home will get a Google Business Profile suspended.) Update
   `BUSINESS.address` **and** `BUSINESS.geo` (drop a pin in Google Maps for exact lat/lng).
2. **TPMO org/product counts** — Jim's own docs conflict ("8 organizations / 15
   products" vs "eight / ten"). This is a compliance figure and cannot be guessed.
   Fill the `[NUMBER]` placeholders in `DISCLAIMERS.tpmo` (site.ts) and on
   `src/pages/disclosures.astro` ("Scope of Offerings").
3. **Final domain** — placeholder is `farnhamseniorhealth.com`. Update in
   `astro.config.mjs` (`site`) and `BUSINESS.url` / `BUSINESS.domain`.
4. **Domain email** — currently the personal Gmail (`BUSINESS.email`). Swap for a
   branded address once the domain is live.
5. **CRM webhook** — paste the lead-capture URL into `FORMS.webhookUrl`. The
   contact form currently POSTs to that URL (falls back to `#` if blank).
6. **Webinar registration link** — `FORMS.webinarRegistrationUrl`, and replace the
   placeholder class dates in `src/pages/events.astro`.
7. **Licensed states** — confirm the active list in `AGENT.licensedStates`.

---

## Assets to add (drop into `public/images/`)

These are referenced by the site; missing files won't break the build, but add them before launch:

- `jim-farnham.jpg` — Jim's headshot (home hero + about page; has a graceful fallback if absent)
- `farnham-logo.png` — logo (header/footer currently use a styled text wordmark as fallback)
- `farnham-og.jpg` — social share image (1200×630)
- `favicon-32.png`, `favicon-192.png` — favicons

---

## Compliance notes (important — this is a YMYL / TPMO site)

- The **CMS/TPMO disclaimer**, **no-government-affiliation** notice, and
  **"solicitation for insurance"** line render site-wide in the footer.
- A reusable `<Disclaimer />` component (`src/components/Disclaimer.astro`) adds the
  numbered TPMO disclaimer on plan pages.
- The contact form collects **no health information** by design and tells users not
  to submit any. The Privacy Policy reflects this (no HIPAA notice needed for a
  no-PHI agent site — but have Jim's E&O carrier / attorney confirm; this is not legal advice).
- No fabricated reviews, ratings, or guarantees anywhere. All 2026 figures
  ($2,950 HD deductible, $283 Part B deductible) trace to CMS / Medicare.gov and
  live in `MEDICARE_2026` (update annually).

---

## Architecture

- `src/data/site.ts` — single source of truth (business, agent, services, areas, disclaimers).
- `src/layouts/BaseLayout.astro` — `InsuranceAgency` + `Person` schema; per-page schema via `schema` prop.
- `src/components/` — Header, Footer, Hero, PageHero, CTASection, ServiceCard, AuthorByline, Disclaimer.
- `src/pages/` — home, plan pages, service areas, about, basics, FAQ, events, contact, legal.
- `src/content/` — topical content pillars (defined, ready for articles). Wire an
  article route + byline when the content system is ready.
