import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// TODO: CONFIRM final production domain with client, then update here + in src/data/site.ts
export default defineConfig({
  site: 'https://farnhamseniorhealth.com',
  output: 'static',
  trailingSlash: 'never',
  vite: { server: { allowedHosts: true } },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
});
