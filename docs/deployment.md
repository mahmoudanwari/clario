# Deployment guide — GitHub → Cloudflare Pages → `clario.mahmoudanwari.com`

> **Nothing in this guide has been executed.** No repository was created, no deployment was
> made, no DNS record was touched. These are the steps to run when you approve deployment.

## 0. Prerequisites

- The repo builds locally: `npm run build` finishes and `npm run verify` passes.
- You have a GitHub account and a Cloudflare account with `mahmoudanwari.com` already on it
  (the apex domain's nameservers pointing at Cloudflare).

## 1. Build settings reference

| Setting | Value |
| --- | --- |
| Framework preset | **Astro** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(leave empty)* |
| Node version | 20 or newer (set `NODE_VERSION=20` as an env var if the default is older) |
| Install command | `npm ci` (Cloudflare's default; needs `package-lock.json` committed) |

No environment variables, secrets, bindings or functions are required — the output is pure
static files.

## 2. Create the Git repository

```bash
git init -b main
```

```bash
git add . && git commit -m "Clario Cleaning: initial portfolio demo build"
```

Create an empty repository on GitHub (no README, no .gitignore — this project has both),
then:

```bash
git remote add origin git@github.com:<your-username>/clario-cleaning.git
```

```bash
git push -u origin main
```

**Check before pushing:** `node_modules/`, `dist/` and `.astro/` are already in
`.gitignore`. The photography in `src/assets/clario/` **is** committed on purpose — the
build needs it. If you prefer to keep large PNGs out of Git history, convert them to JPEG or
WebP first (they are ~2 MB each as PNG).

## 3. Connect Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorise GitHub and pick the `clario-cleaning` repository.
3. Set the build settings from the table in step 1.
4. **Save and Deploy.** The first build takes a few minutes (install + image optimisation).
5. You get a `*.pages.dev` URL. **Verify the site there before touching DNS** — see step 5.

Every push to `main` then rebuilds production; pull requests get preview URLs automatically.

## 4. Custom domain and DNS

1. In the Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter `clario.mahmoudanwari.com`.
3. Because `mahmoudanwari.com` is already in the same Cloudflare account, Cloudflare offers
   to create the record for you. Accept it. It adds:

   | Type | Name | Target | Proxy |
   | --- | --- | --- | --- |
   | CNAME | `clario` | `<project>.pages.dev` | Proxied (orange cloud) |

4. Wait for the domain to show **Active** (usually a minute or two; DNS propagation can take
   longer on some resolvers).
5. TLS is issued automatically by Cloudflare — no action needed.

**Do not** change any existing record for the apex `mahmoudanwari.com` or `www`. Only the
new `clario` subdomain record is involved.

### `site` must match the final URL

`astro.config.mjs` sets `site: 'https://clario.mahmoudanwari.com'`. This drives canonical
URLs, `hreflang` and the sitemap. If you deploy somewhere else, change it there and rebuild,
otherwise the canonicals will point at the wrong host.

## 5. Post-deployment verification

Run through this on the live URL (the `.pages.dev` one first, then the custom domain):

- [ ] `/` redirects to `/en/`, `/nl/` or `/fr/` based on browser language.
- [ ] All three homepages render with images: `/en/`, `/nl/`, `/fr/`.
- [ ] Language switcher keeps the page: `/en/services/office-cleaning/` → NL → FR.
- [ ] A deliberately wrong URL (e.g. `/en/nope/`) shows the custom 404, not Cloudflare's.
- [ ] `https://clario.mahmoudanwari.com/robots.txt` is reachable and lists the sitemap.
- [ ] `https://clario.mahmoudanwari.com/sitemap-index.xml` loads and the URLs use the custom
      domain, not `.pages.dev`.
- [ ] Share the URL in a Slack/WhatsApp/LinkedIn message box and confirm the Open Graph
      preview shows the image and title (requires `public/images/clario/og-default.png`).
- [ ] Quote wizard completes and ends on "nothing was sent".
- [ ] Booking calendar completes and ends on "No appointment has been booked".
- [ ] Contact form validates, then shows "Message not sent — this is a demo".
- [ ] Open DevTools → Network, submit each form, confirm **zero** requests are made.
- [ ] Animation toggle works and survives a reload.
- [ ] Lighthouse on `/en/` (mobile) — see `docs/testing-report.md` for local baselines.

## 6. Rollback

Cloudflare Pages keeps every deployment. Project → **Deployments** → pick a previous one →
**Rollback to this deployment**. Nothing else is needed; there is no database or state.

## 7. Keeping the demo honest after launch

If the demo is ever extended with real functionality (a working contact form, analytics,
bookings), the following must be updated in the same change:

- `src/content/legal.ts` — all four documents describe current behaviour literally.
- `src/content/pages.ts` → `demo` — the "About This Demo" list.
- `src/components/CookiePreferences.astro` — it currently states that nothing is installed.
- `scripts/verify-build.mjs` — the privacy assertions will (correctly) fail until updated.
