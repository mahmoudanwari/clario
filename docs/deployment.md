# Deployment guide — GitHub Pages at `clario.mahmoudanwari.com`

The same setup as `barber.mahmoudanwari.com` and `restaurant.mahmoudanwari.com`: a public
GitHub repository, built and published by GitHub Actions, served at a subdomain that points
at GitHub Pages through a Cloudflare DNS record.

> Steps marked **[you]** need your GitHub or Cloudflare account and are yours to perform.
> Nothing in this guide is executed automatically.

## 0. What is already prepared

| Item | State |
| --- | --- |
| `.github/workflows/deploy.yml` | Actions workflow: checkout@v4 → setup-node@v4 (Node 22, npm cache) → `npm ci` → `npm run build` (includes `astro check`) → `npm run verify` → upload-pages-artifact@v3 → deploy-pages@v4 |
| `public/CNAME` | Contains `clario.mahmoudanwari.com`, so the custom domain survives every Actions deploy |
| `astro.config.mjs` | `site: 'https://clario.mahmoudanwari.com'` — canonical URLs, `hreflang` and the sitemap all use it |
| Base path | None. The site is served at the domain root, so no `base` is configured |
| Git identity | Set **locally for this repo only**: `Mahmood Anwari <mahmoudanwari@users.noreply.github.com>`. Your global identity is untouched |

## 1. Create the repository **[you / approved by you]**

Public, under the `mahmoudanwari` account, named `clario`. Nothing is created without your
go-ahead, and your existing repositories (`mahmoudanwari.github.io`, `la-belle-belgique`) are
never touched.

```bash
gh repo create mahmoudanwari/clario --public --source=. --remote=origin --push
```

## 2. Turn on Pages **[you]**

Repository → **Settings** → **Pages** → **Build and deployment** → **Source: GitHub Actions**.

Do this *before* or right after the first push. The workflow run will fail at the deploy step
with "Pages is not enabled" until it is set.

## 3. Watch the first run

Repository → **Actions** → the "Build and deploy to GitHub Pages" run. Roughly 1–2 minutes:
most of it is `npm ci` and image optimisation. When it is green, the site is live at
`https://mahmoudanwari.github.io/clario/` — note that **this URL will show a broken-looking
page**, because the build is configured for the domain root, not a `/clario/` sub-path. That
is expected and resolves itself once the custom domain is attached.

## 4. Add the DNS record at Cloudflare **[you]**

Cloudflare dashboard → the `mahmoudanwari.com` zone → **DNS** → **Records** → **Add record**:

| Field | Value |
| --- | --- |
| Type | `CNAME` |
| Name | `clario` |
| Target | `mahmoudanwari.github.io` |
| Proxy status | **DNS only** (grey cloud — *not* the orange proxied cloud) |
| TTL | Auto |

**The grey cloud matters.** Proxying would put Cloudflare in front of GitHub Pages and break
its certificate issuance, which is why your other two sites are DNS-only too.

Add **one** record. Do not edit or delete anything else in the zone — `barber` and
`restaurant` have their own records and must keep working.

Check it from here once saved:

```bash
nslookup clario.mahmoudanwari.com
```

## 5. Attach the custom domain **[you]**

Repository → **Settings** → **Pages** → **Custom domain** → `clario.mahmoudanwari.com` → Save.

GitHub runs a DNS check (usually seconds, occasionally a few minutes). When it passes, the
**Enforce HTTPS** checkbox becomes available — tick it. The certificate is issued by GitHub
automatically; if the box is greyed out, the DNS has not propagated yet, so wait and reload.

## 6. Verify

- [ ] `https://clario.mahmoudanwari.com/` loads over HTTPS with no certificate warning
- [ ] It redirects to `/en/`, `/nl/` or `/fr/` based on browser language
- [ ] All three homepages render with images
- [ ] Language switcher keeps the page: `/en/services/office-cleaning/` → NL → FR
- [ ] A wrong URL such as `/en/nope/` shows the custom 404
- [ ] `/robots.txt` and `/sitemap-index.xml` load, and the sitemap URLs use the custom domain
- [ ] Quote wizard, booking calendar and contact form all reach their "nothing was sent" states
- [ ] DevTools → Network shows **zero** requests when those forms are submitted
- [ ] Open Graph preview works when the link is pasted into a chat app
- [ ] `barber.mahmoudanwari.com` and `restaurant.mahmoudanwari.com` still load

## 7. Updating the site afterwards

```bash
git add -A && git commit -m "Describe the change" && git push
```

That is the whole deploy. Pushing to `main` rebuilds and republishes. The workflow runs
`astro check` and `npm run verify` first, so a type error, a missing translation key, or a
regression that introduces a tracker or a live `mailto:` link fails the deploy instead of
shipping.

To re-run a deploy without a code change: **Actions** → the workflow → **Run workflow**.

## 8. Rollback

GitHub Pages keeps previous deployments. Repository → **Settings** → **Pages** →
**Deployments**, or revert the commit and push:

```bash
git revert HEAD && git push
```

There is no database and no server state, so a revert is a complete rollback.

## 9. If the demo ever gains real functionality

A working contact form, analytics or real bookings would make these inaccurate, and all of
them must be updated in the same change:

- `src/content/legal.ts` — all four documents describe current behaviour literally, including
  the hosting paragraph in the privacy policy.
- `src/content/pages.ts` → `demo` — the "About This Demo" list.
- `src/components/CookiePreferences.astro` — it currently states nothing is installed.
- `scripts/verify-build.mjs` — its privacy assertions will correctly fail until updated.
