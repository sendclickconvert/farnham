import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';

// Pages that do not belong in the sitemap (legal and utility pages).
const LEFT_OUT = new Set(['/privacy', '/terms', '/disclosures', '/contact', '/thank-you', '/404']);
// Last-changed dates per page, written by scripts/lastmod.mjs from the git history (committed, so it
// also works on a build machine without git history).
let LASTMOD = {};
try { LASTMOD = JSON.parse(fs.readFileSync(new URL('./src/data/lastmod.json', import.meta.url), 'utf8')); } catch {}

// TODO: CONFIRM final production domain with client, then update here + in src/data/site.ts
export default defineConfig({
  site: 'https://farnhamseniorhealth.com',
  output: 'static',
  trailingSlash: 'never',
  vite: { server: { allowedHosts: true } },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !LEFT_OUT.has(new URL(page).pathname.replace(/\/$/, '') || '/'),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        if (LASTMOD[path]) item.lastmod = LASTMOD[path];
        return item;
      },
    }),
  ],
});
