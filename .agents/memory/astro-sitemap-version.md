---
name: Astro 4 + @astrojs/sitemap version pin
description: Why @astrojs/sitemap must be pinned to 3.2.x on Astro 4 projects
---

# @astrojs/sitemap must be pinned for Astro 4

On an Astro **4.x** project, a fresh `npm install` of `@astrojs/sitemap` resolves
to a 3.7+ release that crashes the build with:
`Cannot read properties of undefined (reading 'reduce')` at
`astro:build:done` (sitemap `dist/index.js`).

**Why:** sitemap 3.3+ populates its internal route list from the
`astro:routes:resolved` integration hook, which only exists in **Astro 5**. On
Astro 4 that hook never fires, so `_routes` stays `undefined` and `.reduce`
throws. The page generation itself succeeds — only the sitemap step fails.

**How to apply:** Pin `@astrojs/sitemap` to `3.2.1` (last release that worked
on Astro 4) when the project is on Astro 4. If you upgrade to Astro 5 later,
the newer sitemap is fine.
