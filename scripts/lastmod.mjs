// Writes src/data/lastmod.json: the date each page's source file last changed in git.
// Run automatically before the build when git history is available; the result is committed so a
// build machine without history still has dates. Pages never touched get no date.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PAGES = 'src/pages';
const out = {};
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));

try {
  execFileSync('git', ['rev-parse', '--git-dir'], { stdio: 'ignore' });
} catch {
  console.log('lastmod: no git history here, keeping the committed src/data/lastmod.json');
  process.exit(0);
}

for (const f of walk(PAGES).filter((f) => f.endsWith('.astro'))) {
  const rel = path.relative(PAGES, f).replace(/\\/g, '/').replace(/\.astro$/, '');
  const url = rel === 'index' ? '/' : '/' + rel.replace(/\/index$/, '');
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cI', '--', f], { encoding: 'utf8' }).trim();
    if (d) out[url] = d.slice(0, 10);
  } catch { /* skip */ }
}
fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/lastmod.json', JSON.stringify(out, null, 2) + '\n');
console.log(`lastmod: ${Object.keys(out).length} pages dated`);
