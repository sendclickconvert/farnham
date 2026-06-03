---
name: Warm Editorial theme tokens
description: How the site is themed and the misleading "navy" token name
---

# Warm Editorial palette is driven by semantic tokens

The whole ~25-page Astro site re-themes through tokens in `tailwind.config.mjs`
+ a few base rules in `src/styles/global.css`. The approved design direction is
**Warm Editorial** (cream `#FDFBF7`, sand `#EAE5D9`, teal `#1A5F6A`, terracotta
`#E8A38B`/deep `#AC5532`, ink `#1A1A1A`; Playfair Display display + DM Sans body).

**Why:** lets a single token edit re-skin every page + shared Header/Footer
without touching each page.

**Gotcha — `navy.*` is NOT blue.** The `navy` color scale (and `crst.*`,
`accent.*`) were intentionally remapped to a warm stone/ink ramp for backwards
compatibility with existing pages that still use `text-navy-800`, `bg-navy-50`,
`border-navy-100`, etc. So `navy-800` ≈ warm near-black ink, `navy-50` ≈ warm
cream. Prefer the explicit brand tokens (`cream`, `sand`, `ink`, `teal`,
`terracotta`) for new work; treat `navy-*`/`crst-*` as legacy aliases.

**How to apply:** to adjust the palette globally, edit the token values, not
individual pages. Watch CTA contrast: white text needs a deep-enough terracotta
(`terracotta.deep` = `#AC5532` ≈ 5:1 on white; the lighter `#C0653F` failed AA).
