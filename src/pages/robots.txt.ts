import type { APIRoute } from 'astro';
import { BUSINESS, IS_PUBLISH } from '../data/site';

// Demo (preview) builds tell every crawler to stay out; the launch build (PUBLISH=1) opens the site.
// TEMPORARY (27 Nov 2026, Bryan's OK): the preview's robots.txt is open so Leizl can run a full Round 6
// crawl. Every page still carries noindex, nofollow, so search engines will not list it. To put the
// block back, set TEMP_CRAWL_OPEN to false (or `git revert` the commit that added it), push, pull, build, Republish.
const TEMP_CRAWL_OPEN = true;
export const GET: APIRoute = () => {
  const body = IS_PUBLISH
    ? `User-agent: *\nAllow: /\nDisallow: /thank-you\nDisallow: /api/\n\nSitemap: ${BUSINESS.url}/sitemap-index.xml\n`
    : TEMP_CRAWL_OPEN
      ? `User-agent: *\nAllow: /\nDisallow: /thank-you\nDisallow: /api/\n`
      : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
