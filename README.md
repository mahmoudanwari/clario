# Clario Cleaning

A multilingual (EN / NL / FR) website for **Clario Cleaning**, a *fictional* commercial
cleaning brand for the Belgian market. Built as a portfolio demonstration by
[Mahmoud Anwari](https://mahmoudanwari.com).

> **Clario Cleaning does not exist.** No cleaning services are offered, all prices are
> illustrative sample values, testimonials and statistics are labelled fictional content,
> and the quote wizard, booking calendar and contact form are browser-only simulations
> that never submit, store, log or transmit anything.

Intended production URL: `https://clario.mahmoudanwari.com`

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:4321> (it redirects to `/en/`).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server on port 4321 |
| `npm run build` | Type-check (`astro check`) and build to `dist/` |
| `npm run build:fast` | Build without the type-check |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type-check only |
| `npm run verify` | Static QA pass over `dist/` (privacy, SEO, a11y, translations) |
| `npm run manifest` | Regenerate `docs/image-assets.md` from the image registry |

**Build output directory:** `dist/` · **Framework preset for Cloudflare Pages:** Astro

## Documentation

| Document | Contents |
| --- | --- |
| [docs/architecture.md](docs/architecture.md) | Folder structure, routing, i18n, data flow, interactive islands |
| [docs/image-assets.md](docs/image-assets.md) | Every image slot, its art direction and what is still needed (generated) |
| [docs/deployment.md](docs/deployment.md) | GitHub → Cloudflare Pages → custom domain, step by step |
| [docs/testing-report.md](docs/testing-report.md) | What was tested, how, results, and what was *not* tested |

## Adding the remaining photography

Name the file exactly as listed in [docs/image-assets.md](docs/image-assets.md), drop it in
`src/assets/clario/`, and rebuild. The `<Media>` component picks it up automatically and
generates responsive WebP; placeholders already reserve the final aspect ratio, so nothing
shifts. See the manifest for the full workflow.

## Tech stack

- **Astro 5** — static site generation, zero framework runtime
- **TypeScript** (strict) — typed content dictionaries, services, pricing and image registry
- **Tailwind CSS 4** — via `@tailwindcss/vite`, with a custom token layer in `src/styles/global.css`
- **Vanilla TS islands** — quote wizard, booking calendar, comparison slider, menu, cookie panel
- **Self-hosted fonts** — Fraunces + Manrope via `@fontsource-variable` (no third-party requests)

No analytics, no tag manager, no advertising pixels, no third-party embeds.

## Changing the slogan or prices

- **Slogan:** `src/data/site.ts` → `site.slogan` (alternatives are kept alongside it).
- **Prices:** `src/data/pricing.ts` → one rate per service. Every page, card and the quote
  wizard read from there.
- **Fictional contact details and cities:** `src/data/site.ts`.

## Licence / reuse

The design, code and content are the author's portfolio work. The Clario name, wordmark and
story are fictional and created for this project. Please don't reuse the assets without
permission. The demo legal pages are illustrative and are not legal advice.
