// Run: npm test   (needs a fresh `npm run build` so dist/ exists)
import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server.mjs';

const start = async (env = {}, extra = {}) => {
  const calls = [];
  const fetchImpl = extra.fetchImpl || (async (url, opts) => { calls.push({ url, opts }); return { ok: true, json: async () => ({ success: true }) }; });
  const srv = createApp({ env: { ...env }, fetchImpl, now: extra.now });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${srv.address().port}`;
  return { srv, base, calls, close: () => new Promise((r) => srv.close(r)) };
};
const good = () => ({ name: 'Pat Example', phone: '(845) 555-0123', email: 'pat@example.com', zip: '12561', message: 'Hi', consent: 'on', consent_text: 'By completing this form...', t: String(Date.now() - 10000) });
const post = (base, fields, headers = {}) =>
  fetch(base + '/api/lead', { method: 'POST', redirect: 'manual', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json', ...headers }, body: new URLSearchParams(fields) });
const HOOK = { GHL_WEBHOOK_URL: 'https://example.test/hook' };

test('security headers and report-only CSP with page hashes', async () => {
  const s = await start();
  const r = await fetch(s.base + '/');
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(r.headers.get('x-frame-options'), 'DENY');
  const csp = r.headers.get('content-security-policy-report-only');
  assert.ok(csp && /script-src 'self' https:\/\/challenges\.cloudflare\.com 'sha256-/.test(csp), csp);
  assert.equal(r.headers.get('content-security-policy'), null);
  await s.close();
});

test('CSP_ENFORCE switches to an enforced header', async () => {
  const s = await start({ CSP_ENFORCE: '1' });
  const r = await fetch(s.base + '/contact');
  assert.ok(r.headers.get('content-security-policy'));
  await s.close();
});

test('404 page, trailing slash and www redirects', async () => {
  const s = await start();
  const nf = await fetch(s.base + '/nope');
  assert.equal(nf.status, 404);
  assert.match(await nf.text(), /That Page Could Not Be Found/);
  const tr = await fetch(s.base + '/about/', { redirect: 'manual' });
  assert.equal(tr.status, 301);
  assert.equal(tr.headers.get('location'), '/about');
  assert.equal((await fetch(s.base + '/..%2fpackage.json')).status, 404);
  await s.close();
});

test('video range requests', async () => {
  const s = await start();
  const r = await fetch(s.base + '/video/farnham-intro.mp4', { headers: { Range: 'bytes=0-99' } });
  assert.equal(r.status, 206);
  assert.equal((await r.arrayBuffer()).byteLength, 100);
  await s.close();
});

test('valid lead is forwarded to the CRM with consent record', async () => {
  const s = await start(HOOK);
  const r = await post(s.base, good());
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true });
  assert.equal(s.calls.length, 1);
  const sent = JSON.parse(s.calls[0].opts.body);
  assert.equal(sent.first_name, 'Pat');
  assert.equal(sent.consent, true);
  assert.ok(sent.consent_text && sent.consent_at);
  await s.close();
});

test('no-JS post redirects to thank-you', async () => {
  const s = await start(HOOK);
  const r = await post(s.base, good(), { Accept: 'text/html' });
  assert.equal(r.status, 303);
  assert.equal(r.headers.get('location'), '/thank-you');
  await s.close();
});

test('honeypot is silent and sends nothing', async () => {
  const s = await start(HOOK);
  const r = await post(s.base, { ...good(), website: 'http://spam.example' });
  assert.equal(r.status, 200);
  assert.equal(s.calls.length, 0);
  await s.close();
});

test('validation rejects before the CRM is touched', async () => {
  const s = await start(HOOK);
  for (const bad of [{ ...good(), name: '' }, { ...good(), phone: '123' }, { ...good(), consent: '' }, { ...good(), email: 'nope' }, { ...good(), zip: '1' }]) {
    assert.equal((await post(s.base, bad)).status, 400);
  }
  assert.equal(s.calls.length, 0);
  await s.close();
});

test('missing, future or stale timestamps are refused', async () => {
  const s = await start(HOOK);
  const { t, ...noT } = good();
  assert.equal((await post(s.base, noT)).status, 400);
  assert.equal((await post(s.base, { ...good(), t: String(Date.now() + 60000) })).status, 400);
  assert.equal((await post(s.base, { ...good(), t: String(Date.now() - 8 * 24 * 3600 * 1000) })).status, 400);
  assert.equal(s.calls.length, 0);
  await s.close();
});

test('rate limit keys on the proxy-added address, not a spoofed first entry', async () => {
  const s = await start(HOOK);
  for (let i = 0; i < 5; i++) assert.equal((await post(s.base, good(), { 'X-Forwarded-For': `spoof${i}, 7.7.7.7` })).status, 200);
  assert.equal((await post(s.base, good(), { 'X-Forwarded-For': 'spoof9, 7.7.7.7' })).status, 429);
  await s.close();
});

test('trailing-slash redirect can never leave the site', async () => {
  const s = await start();
  for (const p of ['///evil.com/', '/\\evil.com/', '//evil.com//', '/a//']) {
    const r = await fetch(s.base + p, { redirect: 'manual' });
    const loc = r.headers.get('location') || '';
    assert.ok(!loc || (loc.startsWith('/') && !loc.startsWith('//')), `${p} -> ${loc}`);
  }
  await s.close();
});

test('time check rejects an instant submit', async () => {
  const s = await start(HOOK);
  assert.equal((await post(s.base, { ...good(), t: String(Date.now()) })).status, 400);
  assert.equal(s.calls.length, 0);
  await s.close();
});

test('rate limit: the sixth post in an hour is refused', async () => {
  const s = await start(HOOK);
  for (let i = 0; i < 5; i++) assert.equal((await post(s.base, good(), { 'X-Forwarded-For': '9.9.9.9' })).status, 200);
  assert.equal((await post(s.base, good(), { 'X-Forwarded-For': '9.9.9.9' })).status, 429);
  assert.equal((await post(s.base, good(), { 'X-Forwarded-For': '8.8.8.8' })).status, 200);
  await s.close();
});

test('cross-origin post is refused', async () => {
  const s = await start(HOOK);
  assert.equal((await post(s.base, good(), { Origin: 'https://evil.example' })).status, 403);
  await s.close();
});

test('turnstile is verified server-side when a secret is set', async () => {
  const seen = [];
  const fetchImpl = async (url, opts) => {
    seen.push(String(url));
    if (String(url).includes('siteverify')) return { ok: true, json: async () => ({ success: JSON.parse(opts.body).response === 'good-token' }) };
    return { ok: true, json: async () => ({}) };
  };
  const s = await start({ ...HOOK, TURNSTILE_SECRET_KEY: 'x' }, { fetchImpl });
  assert.equal((await post(s.base, good())).status, 400); // no token
  assert.equal((await post(s.base, { ...good(), 'cf-turnstile-response': 'bad' })).status, 400);
  assert.equal((await post(s.base, { ...good(), 'cf-turnstile-response': 'good-token' })).status, 200);
  assert.equal(seen.filter((u) => u === HOOK.GHL_WEBHOOK_URL).length, 1);
  await s.close();
});

test('PUBLISH mode without a Turnstile secret fails closed', async () => {
  const s = await start({ ...HOOK, PUBLISH: '1' });
  assert.equal((await post(s.base, good())).status, 503);
  assert.equal(s.calls.length, 0);
  await s.close();
});

test('a lead is never reported as sent when the CRM is missing or rejects it', async () => {
  const none = await start();
  assert.equal((await post(none.base, good())).status, 503);
  await none.close();
  const down = await start(HOOK, { fetchImpl: async () => ({ ok: false, json: async () => ({}) }) });
  assert.equal((await post(down.base, good())).status, 502);
  await down.close();
});
