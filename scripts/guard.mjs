// Build guard (demo-safe pending-facts pattern). Runs after `astro build`.
// Greps dist for <!--PENDING: markers and leftover placeholder text.
// Demo build: prints a warning and exits 0, so the preview can be republished.
// PUBLISH=1 build: exits 1, so an unconfirmed fact can never ship.
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const PUBLISH = process.env.PUBLISH === '1';
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
  );

const pending = new Map();
const placeholders = [];
for (const f of walk(DIST).filter((f) => f.endsWith('.html'))) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<!--PENDING:([^>]*?)-->/g)) {
    const label = m[1].trim();
    pending.set(label, (pending.get(label) || 0) + 1);
  }
  if (/PLACEHOLDER/.test(html)) placeholders.push(path.relative(DIST, f));
}

if (PUBLISH) {
  const turnstileKey = process.env.PUBLIC_TURNSTILE_SITEKEY;
  if (!turnstileKey) pending.set('PUBLIC_TURNSTILE_SITEKEY is not set: the contact form would ship without Turnstile', 1);
}

if (pending.size === 0 && placeholders.length === 0) {
  console.log(`guard: no pending facts (${PUBLISH ? 'PUBLISH' : 'demo'} build)`);
  process.exit(0);
}
console.log(`guard: ${pending.size} pending fact(s)${placeholders.length ? `, placeholder text in ${placeholders.length} page(s)` : ''}:`);
for (const [label, n] of pending) console.log(`  - ${label}${n > 1 ? ` (x${n})` : ''}`);
if (PUBLISH) {
  console.error('guard: PUBLISH=1 build blocked until every pending fact is confirmed and replaced.');
  process.exit(1);
}
console.log('guard: demo build allowed. Set PUBLISH=1 for the launch build; it will fail until these are resolved.');
