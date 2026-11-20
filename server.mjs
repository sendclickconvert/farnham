// Production server for the Replit deployment: serves dist/ and handles the contact form.
// No dependencies (node:http only). Replaces `serve`, which could not set per-page CSP,
// verify Turnstile or forward leads.
//
// Environment (set in Replit Secrets, never in the repo):
//   PORT                  listen port (Replit sets it; default 5000)
//   GHL_WEBHOOK_URL       GoHighLevel inbound webhook that creates the contact. Required for leads.
//   TURNSTILE_SECRET_KEY  Cloudflare Turnstile secret, checked server-side on every lead.
//   PUBLISH=1             launch mode: Turnstile becomes mandatory (missing secret = fail closed).
//   CSP_ENFORCE=1         enforce the Content-Security-Policy (default is Report-Only).
//   CSP_SCRIPT_UNSAFE_INLINE=1  escape hatch if a hash ever fails: allow inline scripts.
//   SITE_HOST             canonical host (default farnhamseniorhealth.com); www.* redirects to it.
//   LEAD_DRY_RUN=1        accept leads and log a redaction-only line instead of forwarding (tests only).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { pathToFileURL } from 'node:url';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.woff2': 'font/woff2',
};
const COMPRESSIBLE = /^(text\/|application\/(json|xml)|image\/svg)/;

export function createApp({ distDir = path.resolve('dist'), env = process.env, fetchImpl = fetch, now = () => Date.now() } = {}) {
  const publish = env.PUBLISH === '1';
  const siteHost = (env.SITE_HOST || 'farnhamseniorhealth.com').toLowerCase();
  const log = (...a) => console.log('[server]', ...a);

  // ---- per-page CSP: hash every inline script found in the built HTML ----
  const pageHashes = new Map();
  const scanHashes = (dir) => {
    for (const e of fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : []) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) scanHashes(p);
      else if (e.name.endsWith('.html')) {
        const html = fs.readFileSync(p, 'utf8');
        const hashes = [];
        for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
          if (/\bsrc=/.test(m[1]) || /application\/(ld\+json|json)/.test(m[1]) || !m[2].trim()) continue;
          hashes.push(`'sha256-${crypto.createHash('sha256').update(m[2]).digest('base64')}'`);
        }
        pageHashes.set(p, [...new Set(hashes)]);
      }
    }
  };
  scanHashes(distDir);

  const securityHeaders = (res, htmlFile) => {
    const scriptSrc = ["'self'", 'https://challenges.cloudflare.com'];
    if (env.CSP_SCRIPT_UNSAFE_INLINE === '1') scriptSrc.push("'unsafe-inline'");
    else if (htmlFile) scriptSrc.push(...(pageHashes.get(htmlFile) || []));
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "img-src 'self' data:",
      "media-src 'self'",
      "font-src 'self' https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      `script-src ${scriptSrc.join(' ')}`,
      "connect-src 'self' https://challenges.cloudflare.com",
      'frame-src https://challenges.cloudflare.com https://maps.google.com https://www.google.com',
      // Ignored (and logged as an error) in a report-only policy, so only add it once enforced.
      ...(env.CSP_ENFORCE === '1' ? ['upgrade-insecure-requests'] : []),
    ].join('; ');
    // No HSTS here: Replit's edge already sets it.
    res.setHeader(env.CSP_ENFORCE === '1' ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only', csp);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  };

  const send = (res, status, body, headers = {}) => {
    res.writeHead(status, { 'Content-Length': Buffer.byteLength(body), ...headers });
    res.end(body);
  };

  // ---- static files ----
  const resolveFile = (pathname) => {
    let rel;
    try { rel = decodeURIComponent(pathname); } catch { return null; }
    if (rel.includes('\0')) return null;
    const base = path.join(distDir, path.normalize(rel));
    if (base !== distDir && !base.startsWith(distDir + path.sep)) return null;
    const candidates = [base, base + '.html', path.join(base, 'index.html')];
    return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) || null;
  };

  const serveFile = (req, res, file, status = 200) => {
    const ext = path.extname(file).toLowerCase();
    const type = TYPES[ext] || 'application/octet-stream';
    const stat = fs.statSync(file);
    const isHtml = ext === '.html';
    securityHeaders(res, isHtml ? file : null);
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    const cache = isHtml || ext === '.xml' || rel === 'robots.txt' || rel === 'js/lead-form.js'
      ? 'public, max-age=0, must-revalidate'
      : rel.startsWith('_astro/') ? 'public, max-age=31536000, immutable' : 'public, max-age=86400';
    const base = { 'Content-Type': type, 'Cache-Control': cache, 'Accept-Ranges': 'bytes', Vary: 'Accept-Encoding' };

    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (range && status === 200) {
      let start = range[1] === '' ? stat.size - Number(range[2]) : Number(range[1]);
      let end = range[1] === '' || range[2] === '' ? stat.size - 1 : Math.min(Number(range[2]), stat.size - 1);
      if (!(start >= 0 && start <= end && start < stat.size)) {
        res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
        return res.end();
      }
      res.writeHead(206, { ...base, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': end - start + 1 });
      return req.method === 'HEAD' ? res.end() : fs.createReadStream(file, { start, end }).pipe(res);
    }

    const wantsGzip = COMPRESSIBLE.test(type) && /\bgzip\b/.test(req.headers['accept-encoding'] || '');
    if (wantsGzip) {
      const body = zlib.gzipSync(fs.readFileSync(file));
      res.writeHead(status, { ...base, 'Content-Encoding': 'gzip', 'Content-Length': body.length });
      return res.end(req.method === 'HEAD' ? undefined : body);
    }
    res.writeHead(status, { ...base, 'Content-Length': stat.size });
    return req.method === 'HEAD' ? res.end() : fs.createReadStream(file).pipe(res);
  };

  // ---- lead form ----
  const hits = new Map(); // ip -> [timestamps]
  const RATE_LIMIT = 5;
  const RATE_WINDOW_MS = 60 * 60 * 1000;
  const MIN_ELAPSED_MS = 3000;

  const MAX_TRACKED = 5000;
  // The left-most X-Forwarded-For entry is client-controlled, so count in from the right: the proxy in front
  // of us (Replit) appends the address it saw. TRUSTED_PROXY_HOPS = proxies between the visitor and this server
  // (default 1). Verify after the first deploy that the logged bucket is the visitor, not the proxy.
  const hops = Math.max(1, Number(env.TRUSTED_PROXY_HOPS) || 1);
  const clientIp = (req) => {
    const parts = String(req.headers['x-forwarded-for'] || '').split(',').map((x) => x.trim()).filter(Boolean);
    return parts[parts.length - hops] || req.socket.remoteAddress || '';
  };
  // IPv6 visitors can rotate through a whole /64, so bucket them by it.
  const bucket = (ip) => {
    if (!ip.includes(':') || ip.includes('.')) return ip;
    const [head, tail = ''] = ip.split('::');
    const a = head ? head.split(':') : [];
    const b = tail ? tail.split(':') : [];
    const groups = ip.includes('::') ? [...a, ...Array(Math.max(0, 8 - a.length - b.length)).fill('0'), ...b] : a;
    return groups.slice(0, 4).map((g) => g.toLowerCase().replace(/^0+(?=.)/, '')).join(':') + '::/64';
  };
  const allowed = (rawIp) => {
    const t = now();
    const ip = bucket(rawIp);
    const recent = (hits.get(ip) || []).filter((x) => t - x < RATE_WINDOW_MS);
    if (recent.length >= RATE_LIMIT) { hits.set(ip, recent); return false; }
    recent.push(t);
    hits.delete(ip); // re-insert so the Map's insertion order stays least-recently-used first
    hits.set(ip, recent);
    // Over the cap: drop expired entries, then the least recently used. Never wipe everyone's counts.
    if (hits.size > MAX_TRACKED) {
      for (const [k, v] of hits) if (t - v[v.length - 1] >= RATE_WINDOW_MS) hits.delete(k);
      while (hits.size > MAX_TRACKED) hits.delete(hits.keys().next().value);
    }
    return true;
  };

  const readBody = (req) =>
    new Promise((resolve, reject) => {
      const chunks = [];
      let size = 0;
      req.on('data', (c) => {
        size += c.length;
        if (size > 20_000) { reject(new Error('too large')); req.destroy(); } else chunks.push(c);
      });
      req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      req.on('error', reject);
    });

  const parseBody = (raw, contentType) => {
    if (/json/.test(contentType)) { const j = JSON.parse(raw); return j && typeof j === 'object' ? j : {}; }
    return Object.fromEntries(new URLSearchParams(raw));
  };

  const wantsJson = (req) => /application\/json/.test(req.headers.accept || '');
  const respond = (req, res, status, ok, message) => {
    securityHeaders(res, null);
    if (wantsJson(req)) {
      return send(res, status, JSON.stringify(ok ? { ok: true } : { ok: false, error: message }), { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    }
    if (ok) { res.writeHead(303, { Location: '/thank-you', 'Cache-Control': 'no-store' }); return res.end(); }
    const html = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>We could not send your request</title><body style="font-family:system-ui,sans-serif;max-width:34rem;margin:4rem auto;padding:0 1rem;line-height:1.5"><h1>We could not send your request</h1><p>${message}</p><p>Please call or text <a href="tel:8453992719">(845) 399-2719</a> and Jim will help right away.</p><p><a href="/contact">Back to the contact page</a></p>`;
    return send(res, status, html, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
  };

  const verifyTurnstile = async (token, ip) => {
    try {
      const r = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: token, remoteip: ip || undefined }),
      });
      const j = await r.json();
      return j && j.success === true;
    } catch {
      return false;
    }
  };

  const handleLead = async (req, res) => {
    const ip = clientIp(req);
    const fail = (status, reason, message) => { log(`lead rejected: ${reason}`); return respond(req, res, status, false, message); };

    // Same-origin only.
    const origin = req.headers.origin;
    if (origin) {
      let oh = '';
      try { oh = new URL(origin).host; } catch {}
      if (oh !== req.headers.host) return fail(403, 'cross-origin', 'Your request could not be verified.');
    }
    if (!allowed(ip)) return fail(429, 'rate limit', 'Too many requests from your connection. Please try again later.');

    let body;
    try { body = parseBody(await readBody(req), req.headers['content-type'] || ''); } catch { return fail(400, 'bad body', 'Your request could not be read.'); }
    const str = (k, max) => (typeof body[k] === 'string' ? body[k].trim().slice(0, max) : '');

    // 1. Honeypot: pretend success, send nothing.
    if (str('website', 200)) { log('lead dropped: honeypot'); return respond(req, res, 200, true); }

    // 2. Required fields and validation, before Turnstile or the CRM are touched.
    const name = str('name', 100);
    const phone = str('phone', 40);
    const email = str('email', 120);
    const zip = str('zip', 10);
    const message = str('message', 1000);
    const digits = phone.replace(/\D/g, '');
    const consent = ['on', 'true', '1', 'yes'].includes(str('consent', 10).toLowerCase());
    if (!name || digits.length < 10 || digits.length > 15 || !consent) return fail(400, 'validation', 'Please enter your name and phone number and tick the consent box.');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail(400, 'validation: email', 'Please check your email address.');
    if (zip && !/^\d{5}$/.test(zip)) return fail(400, 'validation: zip', 'Please check your ZIP code.');

    // 3. Time check: a form posted within seconds of loading is a bot.
    // The page script stamps `t` at load time; a missing, future-dated or stale value is refused too.
    const loadedAt = Number(str('t', 20));
    const age = now() - loadedAt;
    if (!Number.isFinite(loadedAt) || !loadedAt) return fail(400, 'no timestamp', 'Please turn on JavaScript for this form, or call us.');
    if (age < MIN_ELAPSED_MS || age > 7 * 24 * 3600 * 1000) return fail(400, 'bad timing', 'Please reload the page and try again.');

    // 4. Turnstile, verified here. Launch mode fails closed if the secret is missing.
    if (env.TURNSTILE_SECRET_KEY) {
      const token = str('cf-turnstile-response', 4096);
      if (!token || !(await verifyTurnstile(token, ip))) return fail(400, 'turnstile', 'The security check did not pass. Please try again.');
    } else if (publish) {
      log('CONFIG ERROR: PUBLISH=1 but TURNSTILE_SECRET_KEY is not set; refusing leads');
      return fail(503, 'turnstile secret missing', 'The form is temporarily unavailable.');
    }

    // 5. Forward to GHL. A lead is never reported as sent unless the CRM accepted it.
    const [firstName, ...rest] = name.split(/\s+/);
    const payload = {
      first_name: firstName, last_name: rest.join(' '), name, phone, email, zip, message,
      consent: true, consent_text: str('consent_text', 1500), consent_at: new Date(now()).toISOString(),
      source: 'Farnham website contact form', page: '/contact', ip,
    };
    if (env.LEAD_DRY_RUN === '1') { log('lead accepted (dry run, not forwarded)'); return respond(req, res, 200, true); }
    if (!env.GHL_WEBHOOK_URL) { log('CONFIG ERROR: GHL_WEBHOOK_URL is not set; lead not delivered'); return fail(503, 'no webhook configured', 'The form is temporarily unavailable.'); }
    try {
      const r = await fetchImpl(env.GHL_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
    } catch (e) {
      log(`lead NOT delivered: ${e.message}`);
      return fail(502, 'crm error', 'Your request could not be delivered.');
    }
    log('lead forwarded to CRM');
    return respond(req, res, 200, true);
  };

  // ---- request router ----
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const host = (req.headers.host || '').toLowerCase().replace(/:\d+$/, '');

      if (host === `www.${siteHost}`) {
        res.writeHead(301, { Location: `https://${siteHost}${url.pathname}${url.search}` });
        return res.end();
      }
      if (url.pathname === '/api/lead') {
        if (req.method !== 'POST') { securityHeaders(res, null); return send(res, 405, 'Method Not Allowed', { Allow: 'POST' }); }
        return await handleLead(req, res);
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') { securityHeaders(res, null); return send(res, 405, 'Method Not Allowed', { Allow: 'GET, HEAD, POST' }); }
      if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
        // Same-origin path only: collapse leading slashes so this can never become a protocol-relative URL.
        let target = url.pathname.replace(/\/+$/, '').replace(/^\/+/, '/');
        if (!target.startsWith('/') || target.startsWith('//') || target.startsWith('/\\')) target = '/';
        res.writeHead(301, { Location: target + url.search });
        return res.end();
      }
      const file = resolveFile(url.pathname);
      if (file) return serveFile(req, res, file);
      const nf = path.join(distDir, '404.html');
      if (fs.existsSync(nf)) return serveFile(req, res, nf, 404);
      securityHeaders(res, null);
      return send(res, 404, 'Not found', { 'Content-Type': 'text/plain' });
    } catch (e) {
      log('error', e.message);
      securityHeaders(res, null);
      if (!res.headersSent) send(res, 500, 'Server error', { 'Content-Type': 'text/plain' });
      else res.end();
    }
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const port = Number(process.env.PORT) || 5000;
  createApp().listen(port, '0.0.0.0', () => console.log(`[server] listening on ${port} (${process.env.PUBLISH === '1' ? 'PUBLISH' : 'demo'} mode, CSP ${process.env.CSP_ENFORCE === '1' ? 'enforced' : 'report-only'})`));
}
