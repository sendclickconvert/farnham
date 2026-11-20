import type { APIRoute } from 'astro';
import { BUSINESS, IS_PUBLISH } from '../data/site';

// Demo (preview) builds tell every crawler to stay out; the launch build (PUBLISH=1) opens the site.
export const GET: APIRoute = () => {
  const body = IS_PUBLISH
    ? `User-agent: *\nAllow: /\nDisallow: /thank-you\nDisallow: /api/\n\nSitemap: ${BUSINESS.url}/sitemap-index.xml\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
