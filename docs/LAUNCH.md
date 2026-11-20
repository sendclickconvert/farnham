# Farnham Senior Health Advisors: launch runbook

Status as of 20 Nov 2026: **preview only, not launched.** Nothing below happens until Jim Farnham and his
reviewers have each replied "Approved" in writing. The preview is
https://farnham-bryancollinsonl.replit.app (noindex; see "Demo vs launch").

## Demo vs launch (one switch)

| | Demo / preview (default) | Launch (`PUBLISH=1`) |
|---|---|---|
| Search engines | `noindex` on every page, `robots.txt` = `Disallow: /` | indexable, `robots.txt` allows and names the sitemap |
| Pending facts (`<!--PENDING:` markers) | warns, build still passes | **build fails** |
| Turnstile | optional (the form works without it) | **mandatory**; server refuses leads if the secret is missing |
| CSP | Report-Only | flip to enforced with `CSP_ENFORCE=1` after the live tests |

`npm run build` runs `astro build` and then `scripts/guard.mjs`. `npm run audit` runs the pre-launch checks
(`scripts/audit.mjs`). `npm test` runs the form/security tests (`scripts/server.test.mjs`).

## Facts still pending (all block `PUBLISH=1`)

1. **Domain.** `farnhamseniorhealth.com` is a placeholder. Checked 20 Nov 2026: not registered (RDAP 404, NXDOMAIN).
   Set `BUSINESS.domainConfirmed = true` only after it is registered and the same name is in `astro.config.mjs`.
2. **Office / verification address.** Site shows "Serving New York and Connecticut by phone and Zoom"; schema has city and
   state only, no street, no geo. Set `BUSINESS.addressConfirmed = true` with the address Jim supplies for Google verification.
3. **Licensed-states list.** Eight states appear on About, Where and How I Work, Resources and the FAQ. Jim must reconfirm
   the list (set `AGENT.licensedStatesConfirmed = true`; remove the markers on those four pages).
4. **Turnstile site key** (`PUBLIC_TURNSTILE_SITEKEY`) must exist in the build environment.

Compliance wording (TPMO disclosure, TCPA consent, "A non-government health insurance agent") is Jim's and is not edited here.
The contact-form consent paragraph moved to `DISCLAIMERS.tcpaConsent` byte for byte; it is also sent with every lead.

## Replit secrets (never in the repo)

`GHL_WEBHOOK_URL`, `TURNSTILE_SECRET_KEY`, `PUBLIC_TURNSTILE_SITEKEY`, later `PUBLISH=1` and `CSP_ENFORCE=1`.
The deployment is `autoscale` running `npm run start` = `node server.mjs` (no dependencies; replaces `serve`).

## Form: layers and end-to-end test (into GHL)

Layers in `server.mjs` (`POST /api/lead`): same-origin check, rate limit (5 per IP per hour), honeypot field `website`
(silent success, nothing sent), validation before anything else (name, 10+ digit phone, optional email and ZIP, consent
ticked), time check (under 3 seconds = bot), Turnstile verified server-side, then the CRM. A lead is never reported as
sent unless the CRM accepted it; otherwise the visitor sees the phone number.

Needs from the team: a GHL inbound-webhook workflow in Jim's sub-account that creates/updates the contact from
`first_name, last_name, phone, email, zip, message, consent_text, consent_at, source, ip`, tags it, and notifies Jim.

Test plan (team-run, per the house rule: every form, lead in GHL, workflows fire, then alerts to Jim's phone):
1. Preview (no Turnstile): submit with real-looking test data; confirm the contact appears in GHL with all fields and the
   consent text and time; confirm the workflow notification fires. Repeat with a blank name, a short phone, no consent:
   each must be refused and create nothing.
2. Honeypot and speed: submit in under 3 seconds (refused); a scripted POST that fills `website` creates nothing.
3. Live domain, after `PUBLISH=1` and Turnstile are on: a human submits once (an automated browser cannot pass Turnstile),
   finds the lead in GHL, then points the alert at Jim's phone and email.
4. Chat/other widgets: none on this site. Play the hero video, open the Zoom/registration links on `/events`.
5. Console: no "Content Security Policy" errors on home, contact, events, one article page. Then enforce and repeat.
6. Grade: securityheaders.com A+ and Mozilla Observatory 100+. Record "Launch security: headers A+ / 100, form lead verified <date>".

## Security headers

Set in `server.mjs` on every response: CSP (Report-Only until enforced), `X-Content-Type-Options`, `X-Frame-Options: DENY`,
`Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`. No HSTS in the app (Replit's edge sets it; verified
on the preview). Inline script hashes are computed from the built HTML at server start, so they cannot go stale; if one
ever fails, `CSP_SCRIPT_UNSAFE_INLINE=1` is the escape hatch. Outside services allowed: Google Fonts, Google Maps embed
(`/new-york-medicare-supplement`), Cloudflare Turnstile.

## Domain, DNS and mail (do this BEFORE any flip)

1. **Who holds it:** nobody; the name is unregistered. Jim approves the exact name first. Register it at GoDaddy owned by
   Jim's business (Farnham Senior Health Advisors, Inc.), with delegate access to Bryan's CRST login, and write the holder on
   the project page. SMS codes go to the account owner.
2. **Mail today:** Jim uses `jimfarnham1000@gmail.com` (the site's public email). There are no domain records to capture.
   If Jim wants a branded mailbox, create it and its MX/SPF records in the same GoDaddy zone before the site flip.
   Never use GHL's Add Domain wizard on a domain that carries mail (it deletes MX records).
3. **Replit:** Domains > connect, **Connect a different way > Set up manually** (never "Continue with GoDaddy"). Add `A @` and
   `TXT @` (`replit-verify=`), plus `A www` and `TXT www`. Keep the Entri modal open in its own tab; confirm the hostname is
   listed afterwards. Verify every write at the authoritative nameserver, not in the UI. `server.mjs` redirects `www` to the apex.
4. Then `PUBLISH=1`, rebuild, Republish, verify from outside, and submit the sitemap in Search Console.

## Replit routine after a push (only when Bryan says go)

Tools > Git > Pull in Replit (never `git pull` in the Shell), `npm run build` in the Shell, Republish, verify from outside
(page, `/robots.txt`, `/events`, headers with `curl -I`). Replit adds an empty "Published your App" commit on each publish,
so the next pull there is a merge, not a fast-forward; never `reset --hard` the Replit side.

## Google Business Profile plan (after the domain is live)

Service-area business, address hidden, phone (845) 399-2719, hours "by appointment", website = the live domain. Jim must
supply the verification address and see the profile before it goes public. Open questions for Jim: business name with or
without "Inc." (his round-3 note says the legal name; Google generally wants the everyday name), categories, service areas
(NY and CT counties). Create it once and freeze it: edits to name, phone, address or categories can restart verification.
No reviews are solicited or shown until Jim decides how to ask real clients.

## Webinar dates

`src/data/events.ts` lists nine sessions; passed ones drop only at build time. Last dates: Wed 9 Dec and Sat 12 Dec 2026.
After 12 Dec the page shows "No sessions are scheduled" until Jim sends new dates (edit the file, push, pull, build, Republish).
