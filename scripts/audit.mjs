// Pre-launch audit of the built site (dist/). Run: npm run build && node scripts/audit.mjs
// Checks: title/meta length and uniqueness, one H1, canonical, schema JSON,
// internal links and images resolve, img alt, noindex state, sitemap, pending markers.
// Exit code 1 on any hard failure. No dependencies.
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const ORIGIN = 'https://farnhamseniorhealth.com';
const PUBLISH = process.env.PUBLISH === '1';

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
  );

const files = walk(DIST);
const pages = files.filter((f) => f.endsWith('.html'));
const rel = (f) => path.relative(DIST, f).replace(/\\/g, '/');
const urlOf = (f) => {
  const r = rel(f);
  if (r === 'index.html') return '/';
  return '/' + r.replace(/\/index\.html$/, '').replace(/\.html$/, '');
};
const exists = (u) => {
  const clean = u.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return true;
  const p = path.join(DIST, clean);
  return (
    fs.existsSync(p + '.html') ||
    fs.existsSync(path.join(p, 'index.html')) ||
    (fs.existsSync(p) && fs.statSync(p).isFile())
  );
};

const fail = [];
const warn = [];
const titles = new Map();
const descs = new Map();
const inbound = new Map(pages.map((f) => [urlOf(f), 0]));
const rows = [];
const pendingAll = new Set();

for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  const u = urlOf(f);
  const is404 = u === '/404';
  const dec = (x) => x.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  const title = dec((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const desc = dec((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter((w) => /\w/.test(w)).length;

  if (!title) fail.push(`${u}: no <title>`);
  else if (title.length > 60) warn.push(`${u}: title ${title.length} chars (>60)`);
  if (!desc) fail.push(`${u}: no meta description`);
  else if (desc.length > 160) warn.push(`${u}: description ${desc.length} chars (>160)`);
  if (h1s !== 1) fail.push(`${u}: ${h1s} H1 tags`);
  if (!is404) {
    if (!canonical) fail.push(`${u}: no canonical`);
    else if (canonical !== ORIGIN + (u === '/' ? '/' : u) && canonical !== ORIGIN + u)
      warn.push(`${u}: canonical is ${canonical}`);
  }
  titles.set(title, [...(titles.get(title) || []), u]);
  descs.set(desc, [...(descs.get(desc) || []), u]);

  if (PUBLISH && noindex && u !== '/thank-you' && !is404) fail.push(`${u}: noindex on a PUBLISH build`);
  if (!PUBLISH && !noindex) fail.push(`${u}: demo build is indexable (no noindex)`);

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      fail.push(`${u}: invalid JSON-LD`);
    }
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(m[0])) fail.push(`${u}: <img> without alt: ${m[0].slice(0, 70)}`);
  }
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
    const target = m[1];
    if (!exists(target)) fail.push(`${u}: broken link/asset ${target}`);
    else if (inbound.has(target.replace(/\/$/, '') || '/') && m[0].startsWith('href'))
      inbound.set(target.replace(/\/$/, '') || '/', inbound.get(target.replace(/\/$/, '') || '/') + 1);
  }
  if (/<!--PENDING:/.test(html)) {
    const labels = [...html.matchAll(/<!--PENDING:([^>]*?)-->/g)].map((x) => x[1].trim());
    labels.forEach((l) => pendingAll.add(l));
  }
  if (/PLACEHOLDER|000 PLACEHOLDER/.test(html)) fail.push(`${u}: PLACEHOLDER text rendered`);
  rows.push({ u, title: title.length, desc: desc.length, h1: h1s, words, noindex });
}

for (const l of pendingAll) (PUBLISH ? fail : warn).push(`pending fact: ${l}`);
for (const [t, us] of titles) if (us.length > 1) fail.push(`duplicate title "${t}": ${us.join(', ')}`);
for (const [d, us] of descs) if (us.length > 1) warn.push(`duplicate description on: ${us.join(', ')}`);

// sitemap
const smIdx = path.join(DIST, 'sitemap-index.xml');
const sm0 = path.join(DIST, 'sitemap-0.xml');
if (!fs.existsSync(smIdx) || !fs.existsSync(sm0)) fail.push('sitemap files missing');
else {
  const locs = [...fs.readFileSync(sm0, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const l of locs) {
    const p = l.replace(ORIGIN, '') || '/';
    if (!exists(p)) fail.push(`sitemap lists missing page ${l}`);
    if (/thank-you|\/404|\/privacy|\/terms|\/disclosures|\/contact/.test(l)) fail.push(`sitemap lists ${l}`);
  }
  const unlisted = pages
    .map(urlOf)
    .filter((u) => !['/thank-you', '/404', '/privacy', '/terms', '/disclosures', '/contact'].includes(u) && !locs.includes(ORIGIN + (u === '/' ? '' : u)));
  if (unlisted.length) warn.push(`pages not in sitemap: ${unlisted.join(', ')}`);
}

const orphans = [...inbound].filter(([u, n]) => n === 0 && !['/', '/404', '/thank-you'].includes(u));
if (orphans.length) warn.push(`pages with no inbound internal link: ${orphans.map(([u]) => u).join(', ')}`);

console.log(`Audited ${pages.length} pages (${PUBLISH ? 'PUBLISH' : 'DEMO'} build)`);
if (process.argv.includes('--table')) console.table(rows);
for (const w of warn) console.log('WARN ', w);
for (const x of fail) console.log('FAIL ', x);
console.log(`${fail.length} failure(s), ${warn.length} warning(s)`);
process.exit(fail.length ? 1 : 0);
