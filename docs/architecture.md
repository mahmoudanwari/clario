# Architecture

## Principles

1. **Content is data, not markup.** Every translatable string lives in a typed dictionary.
   Pages read from those dictionaries, so no page implementation is duplicated per language.
2. **One source of truth per concern.** Prices in one file, services in one file, images in
   one registry, brand facts in one file.
3. **Static first.** Nothing requires a server. Interactivity is small vanilla-TS islands
   attached to server-rendered markup.
4. **Nothing leaves the browser.** No endpoint, no fetch, no storage beyond one optional
   animation preference.

## Folder structure

```
src/
  assets/clario/        Final photography (git-tracked; optimised at build time)
  components/           Reusable UI
    Media.astro           Image slot: real asset if present, else styled placeholder
    Seo.astro             Title, description, canonical, hreflang, Open Graph
    Nav.astro             Sticky header, mobile menu, language switcher, motion toggle
    Footer.astro          Brand, nav, legal links, demo disclaimer, portfolio credit
    PageHero.astro        Shared hero for inner pages
    SectionHeading.astro  Eyebrow + display heading + lede slot
    ServiceCard.astro     Service card with image, copy and starting price
    BeforeAfterSlider.astro  Draggable + keyboard-accessible comparison
    FaqAccordion.astro    <details>-based accordion (works without JS)
    AreasMap.astro        Stylised coverage panel + accessible city list
    QuoteWizard.astro     6-step estimate simulation (markup + styles)
    BookingCalendar.astro Month grid + slots simulation (markup + styles)
    ContactForm.astro     Validating demo form
    CookiePreferences.astro  <dialog> storage/consent demonstration
    MotionToggle.astro    Animation on/off control (multiple instances stay in sync)
    FloatingQuote.astro   Floating CTA, hides over the footer
    DemoRibbon.astro      Site-wide "this is fictional" ribbon
  content/              Page copy, one object per language
    home.ts  pages.ts  interactive.ts  legal.ts
  data/                 Non-copy data
    site.ts     Brand, slogan (+ alternatives), fictional contacts, cities
    pricing.ts  Rates per m², frequency maths, currency formatting
    services.ts The four services: routes, images, related links, full copy ×3
    images.ts   The image registry (drives <Media> and the manifest)
  i18n/
    config.ts   Locales, route table, href()/swapLocale() helpers
    ui.ts       Shared interface strings, typed so a missing key fails the build
  layouts/BaseLayout.astro   <html>, head, pre-paint motion script, chrome, slots
  pages/
    index.astro              Root language redirect (JS + meta refresh + links)
    404.astro                Trilingual 404
    [lang]/
      index.astro            Home
      services/index.astro   Services overview
      services/[service].astro  The four service pages
      sustainability.astro  about.astro  about-this-demo.astro
      request-a-quote.astro  book-an-assessment.astro  contact.astro
      legal/[doc].astro      Privacy, cookies, terms, legal notice
  scripts/              Island behaviour
    reveal.ts  quote-wizard.ts  booking-calendar.ts
  styles/global.css     Design tokens, primitives, motion system, runtime-node styles
scripts/                Build-time tooling (Node)
  generate-image-manifest.mjs   docs/image-assets.md generator
  verify-build.mjs              Static QA pass over dist/
```

## Routing and i18n

Routes are generated from `src/i18n/config.ts`:

```ts
routes = { home: '/', services: '/services/', office: '/services/office-cleaning/', … }
href(lang, 'office')   // → /nl/services/office-cleaning/
swapLocale(path, 'fr') // → swaps only the locale segment
```

**Slugs are identical across languages by design.** It keeps the language switcher,
`hreflang` and the sitemap a reliable 1:1 mapping, and means `swapLocale()` can never land
on a 404. Translated slugs would require a per-language route table and a reverse lookup for
every page — the brief allows shared slugs where they are more reliable, so that is the
choice made here.

Every `[lang]` page exports `getStaticPaths()` from `localeStaticPaths()`. The dynamic
service and legal pages multiply locales × documents in a single `getStaticPaths()`.

### Translation safety

`src/i18n/ui.ts` declares the English object first, derives `type UIStrings = typeof en`,
then annotates `nl` and `fr` with that type. A missing or misspelled key is a **build
error**, not a silent English fallback. The same pattern is used for `home.ts`, `pages.ts`,
`interactive.ts` and `legal.ts`. `npm run verify` additionally scans built NL/FR pages for
leftover English UI phrases.

## The image system

`src/data/images.ts` holds one record per image slot: id, filename, page, section, subject,
composition, camera, aspect ratio, size, lighting, grade, people, uniform, background,
trilingual alt text, priority and optional crop focus.

`<Media file="…" lang={lang} />` then:

1. Globs `src/assets/clario/*.{jpg,jpeg,png,webp,avif}` at build time.
2. If a file matching the slot's `file` name exists → renders Astro's `<Image>`, which emits
   optimised, responsive WebP (the supplied 2 MB PNGs come out around 80–180 KB).
3. If not → renders an aspect-correct, tone-tinted placeholder labelled with the asset ID,
   with the real alt text already attached as `aria-label`.

Because the placeholder reserves the exact aspect ratio, dropping in the final photo causes
**no layout shift and no code change**. `npm run manifest` regenerates the manifest and
prints what is still missing, in priority order.

## Interactive islands

Each island is server-rendered markup plus one small script. Configuration (translated
labels, rates, limits) is serialised into a `data-config` JSON attribute, so the scripts
contain no hard-coded copy.

| Island | Behaviour | Privacy |
| --- | --- | --- |
| Quote wizard | 6 steps, per-step validation, service-aware frequency list, floor-vs-glass area switch, live estimate | State in local variables only; `submit` is prevented; no action/method |
| Booking calendar | Month navigation, deterministic availability (hash of the ISO date), slot selection, review, confirmation | No reservation, no email, nothing stored |
| Contact form | Required/email/min-length validation, error summary, simulated confirmation | Validated then discarded; no action attribute |
| Comparison slider | Pointer drag, click-to-position, arrow/Home/End keys, `role="slider"` with live `aria-valuenow` | — |
| Cookie panel | `<dialog>`, explains that no cookies exist, can save or clear the one local value | Discloses exactly what it stores |
| Motion toggle | Writes `data-motion` on `<html>`, persists to `localStorage` | Discloses storage in the cookie panel and privacy page |

### Motion architecture

- Content is **visible by default**; the reveal transition is only armed when `<html>` has
  `.js-motion`.
- An inline script in `<head>` sets `data-motion` **before first paint** from the stored
  preference, falling back to `prefers-reduced-motion`. No flash either way.
- `html[data-motion="off"]` reduces every animation and transition to ~0 ms globally.
- `src/scripts/reveal.ts` uses a rAF-throttled scroll check rather than
  `IntersectionObserver` alone, because an observer can miss elements during fast or
  programmatic scrolling — which would leave content clipped. A 4-second safety timer
  reveals anything still pending.
- Mobile gets lighter motion: no parallax, no layered inset, shorter distances.

### A note on scoped CSS — read this before adding styles

Astro scopes component CSS by adding an attribute to elements **in that component's own
template**. This bit the build three separate times, so the rules are worth stating:

1. **Elements created by JavaScript** never carry the scope attribute. The calendar cells,
   time slots and summary rows are therefore styled in the runtime section of `global.css`.
2. **A child component's root element** cannot be reliably restyled from the parent. Wrap the
   child in a local element and style that instead — see `.site-header__motion` in `Nav.astro`.
3. **An element two component layers down is unreachable.** `page → component → Media →
   Image` means a page-level `.foo__img { object-fit: cover }` silently does nothing. This is
   why `<Media>` owns its own fitting through the `fit` prop and the global
   `.media-fit-cover` / `.media-fit-width` classes, rather than trusting the caller's class.

The symptom is always the same and always silent: the rule is in the stylesheet, the class is
on the element, and the style does not apply. When a layout looks subtly wrong, check the
computed style before changing the CSS.

## SEO

`Seo.astro` emits per-page title, meta description, canonical, three `hreflang` alternates
plus `x-default`, Open Graph and Twitter card tags. `@astrojs/sitemap` generates
`sitemap-index.xml` with locale annotations; `robots.txt` points at it.

**No `LocalBusiness`, `Organization`, `Service`, `Review` or `AggregateRating` structured
data is emitted**, deliberately: that markup would assert to search engines that a fictional
company is a real, verified business. `npm run verify` fails the build if any appears.

## Extending to a real business later

The simulations are isolated behind their own scripts. Making any of them real means adding
a submit handler in one place:

- **Quote wizard** — `src/scripts/quote-wizard.ts`, the `submitBtn` click handler.
- **Contact form** — `ContactForm.astro`'s submit listener.
- **Booking** — `src/scripts/booking-calendar.ts`, `slotsFor()` for availability and the
  `confirmBtn` handler for creating a booking.

Each would need a server endpoint (Astro's server output, or a small serverless function), consent
handling, and a rewrite of the demo legal pages by a qualified professional.
