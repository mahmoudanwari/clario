# Testing report

**Date:** 13 November 2026
**Build tested:** local production build (`npm run build`) — Astro 5.18.2, 50 pages
**Browser used for manual testing:** Chromium (Claude desktop app's built-in browser pane),
desktop 1440×900 and emulated mobile 375×812
**Not tested:** Firefox, Safari/iOS, real hardware, assistive technology (see *Gaps* below)

Everything marked ✅ below was actually executed and observed. Everything in *Gaps* was not.

---

## 1. Build and type safety

| Check | Result |
| --- | --- |
| `astro check` (strict TypeScript) | ✅ 0 errors, 0 warnings, 3 hints (all "declared but never read") |
| `npm run build` from a clean `dist/` | ✅ exit code 0, 50 pages built |
| Type-error gate actually fails the build | ✅ verified by injecting a deliberate type error: `astro check` exits 1 and the build stops |
| Pages per language | ✅ 16 EN / 16 NL / 16 FR + root redirect + 404 = 50 |
| Sitemap | ✅ `sitemap-index.xml` + `sitemap-0.xml`, 48 URLs with locale alternates |
| `robots.txt` | ✅ present, references the sitemap |

**A process error worth recording:** at one point a build was run as `npm run build | tail -3`,
which masks the real exit status behind `tail`'s. The build had in fact failed on a type error,
and the QA pass that followed therefore checked a *stale* `dist/`. Caught, the type error was
fixed (`'2:1'` was missing from the `Aspect` union), `dist/` was deleted, and the full
build → verify → manifest chain was re-run with exit codes checked individually. All results
in this report come from that clean run.

**One environment issue found and resolved:** Astro 7 could not run on this machine — its new
native CSS binding (`satteri`) is blocked by the Windows Application Control policy
(`ERR_DLOPEN_FAILED`). The project was moved to **Astro 5.18.2**, which has a pure-JS
pipeline and builds cleanly. `sharp` (image optimisation) loads fine.

## 2. Automated QA pass (`npm test`)

A script in `scripts/verify-build.mjs` parses all 50 built HTML pages. **Result: PASSED.**

| Assertion | Scope | Result |
| --- | --- | --- |
| No `mailto:` links | all pages | ✅ |
| No `tel:` links | all pages | ✅ |
| No `<form action=…>` | all pages | ✅ |
| No analytics/tracking references (GTM, GA, Plausible, Matomo, Hotjar, Segment, Clarity, Mixpanel, Meta pixel) | all pages | ✅ |
| No third-party font loading | all pages | ✅ fonts are self-hosted |
| No external hosts other than the portfolio link | all pages | ✅ |
| Every `<img>` has an `alt` attribute | all pages | ✅ |
| Exactly one `<h1>` | all content pages | ✅ |
| `<main>`, `<footer>` and a skip link present | all content pages | ✅ |
| No duplicate `id` attributes | all pages | ✅ |
| Title, meta description (≥ 50 chars), canonical, ≥ 4 hreflang, OG title | all content pages | ✅ |
| No `LocalBusiness` / `Organization` / `Review` / `AggregateRating` structured data | all pages | ✅ |
| Visible "fictional" disclosure present | all content pages | ✅ |
| `<html lang>` matches the URL language | all pages | ✅ |
| No leftover English UI phrases on NL/FR pages | 32 pages | ✅ |

Two real issues were found by this script and fixed: the 404 page had three `<h1>`s (now one
`<h1>` plus per-language `<h2>`s), and one false positive from a code comment mentioning
`mailto:` (the checker now strips comments).

## 3. Navigation and routing

| Check | Result |
| --- | --- |
| `/` redirect page | ✅ meta refresh to `/en/` + JS language detection + visible links |
| All internal links resolve | ✅ no 404s encountered while navigating EN/NL/FR |
| Unknown path serves the custom 404 | ✅ `/404.html`, correct title, trilingual content |
| Breadcrumbs on service pages | ✅ Home / Services / *service* |
| Sticky header shadow on scroll | ✅ |

## 4. Multilingual

| Check | Result |
| --- | --- |
| EN / NL / FR homepages render fully translated | ✅ |
| Language switcher preserves the equivalent page | ✅ `/nl/contact/` offers `/en/contact/`, `/fr/contact/` |
| Service pages in all three languages | ✅ verified `/nl/services/window-cleaning/` end to end |
| Validation messages translated | ✅ NL: "Vul een e-mailadres in zoals naam@voorbeeld.be." |
| Confirmation screens translated | ✅ NL: "Bericht niet verzonden — dit is een demo" |
| Dates/currency localised | ✅ `Intl` with `nl-BE` / `fr-BE` / `en-GB` (e.g. "woensdag 18 november 2026", "€ 2,50") |
| Automated untranslated-text scan | ✅ no English UI strings on NL/FR pages |

Translation completeness is additionally enforced at **compile time**: `nl` and `fr`
dictionaries are typed against the English object, so a missing key fails `astro check`.

## 5. Quote wizard

| Check | Result |
| --- | --- |
| Step progression 1 → 6 | ✅ |
| Progress indicator updates | ✅ "Step 3 of 6 · Area", pips mark done/current |
| Service-aware frequency list | ✅ Window Cleaning shows only Monthly / Quarterly / One-off |
| Floor vs glass area switch | ✅ label, hint, min/max all change; "This is not your floor area." |
| Area presets | ✅ 250 m² preset applied |
| Estimate maths | ✅ 250 m² × €2.50 = **€625.00** per visit; monthly €625 (1 visit/month) |
| Summary distinguishes basis | ✅ "Area (Glass area) — 250 m²" |
| Not-a-quote disclaimer | ✅ shown above the sample contact block |
| Prefilled fictional contact details, read-only | ✅ no input of real personal data is possible |
| Confirmation | ✅ "Simulation complete — nothing was sent" |
| Form submit cannot navigate | ✅ `submit` is prevented; no `action`/`method` |
| Validation (out-of-range area, nothing chosen) | ✅ per-field message + error summary, step does not advance |

## 6. Booking calendar

| Check | Result |
| --- | --- |
| Month navigation | ✅ previous/next buttons |
| Availability generation | ✅ deterministic per date; weekends and past dates disabled; ~1 in 5 weekdays fully booked |
| Today marked | ✅ clay outline on 13 Nov 2026 |
| Date selection → slots | ✅ "Available times on Wednesday, 18 November 2026" with 8 slots |
| Slot selection | ✅ `aria-pressed` toggles |
| Review step | ✅ Assessment / Date / Time / City summary |
| Confirmation wording | ✅ "Demonstration complete — **This is a demonstration. No appointment has been booked.**" |
| Validation: review without a date | ✅ "Please choose a date." |
| Validation: date but no slot | ✅ "Please choose a time slot." |
| Restart | ✅ returns to a clean calendar |
| Keyboard grid | ✅ arrow/Home/End/PageUp/PageDown handlers with roving `tabindex`, `role="grid"`/`gridcell`, each cell labelled "Wednesday, 18 November 2026 — Available" |

## 7. Before/after comparison

| Check | Result |
| --- | --- |
| Pointer drag | ✅ |
| Click-to-position on the frame | ✅ |
| Keyboard | ✅ ArrowLeft/Right/Up/Down (±4 %), Shift (±10 %), Home/End |
| ARIA | ✅ `role="slider"`, `aria-valuenow` updates, descriptive label |
| Labels visible | ✅ "Before" / "After" chips |
| Image pair genuinely matched | ✅ same room, same angle, same light — only the state differs |
| Works with animations off | ✅ keyboard control verified with `data-motion="off"` |
| "Illustrative" caption | ✅ |

## 8. Animation and reduced motion

| Check | Result |
| --- | --- |
| Toggle flips state | ✅ `data-motion` on `<html>` → `off`, `aria-pressed="false"` |
| Preference persists | ✅ `localStorage.clario-motion` = `"off"` / `"on"`, survives reload |
| No flash on load for opted-out users | ✅ inline pre-paint script sets the state before first render |
| Content visible with animations off | ✅ all **52** `[data-reveal]` elements computed visible, 0 still clipped |
| Transitions actually collapse | ✅ measured `transition-duration: 1e-05s`, `scroll-behavior: auto` |
| Interactions still work with motion off | ✅ comparison slider keyboard still moves the divider (50 → 54) |
| `prefers-reduced-motion` as the default | ⚠️ implemented and code-reviewed, but the **OS setting itself was not toggled** — this environment has no media-feature emulation. The equivalent end state (`data-motion="off"`) was fully verified above. |
| Multiple toggles stay in sync | ✅ header + mobile menu instances |
| Storage disclosed | ✅ cookie panel, cookie policy and privacy policy all name the key |

**Bug found and fixed:** the original `IntersectionObserver`-based reveal missed elements
during fast or programmatic scrolling, leaving service cards and the comparison slider
permanently clipped. Replaced with a rAF-throttled scroll check plus a 4-second safety net,
so content cannot stay hidden. Verified: 52 reveal elements, all shown.

## 9. Responsive behaviour

| Viewport | Result |
| --- | --- |
| 1440×900 desktop | ✅ no horizontal overflow (`scrollWidth` 1425 ≤ 1440) |
| 375×812 mobile | ✅ no horizontal overflow (`scrollWidth` 375 = 375) |
| Mobile menu | ✅ opens/closes, `aria-expanded` correct, Escape closes, body scroll locked, all 11 links present |
| Mobile hero legibility | ✅ after fix (see below) |
| Tap targets | ✅ buttons ≥ 44 px min-height via `.btn { min-height: 3rem }` and 2.75 rem icon buttons |

**Two mobile bugs found and fixed:**

1. **Header overflow at 375 px** — the animation toggle pushed the menu button off-screen.
   Root cause: a scoped CSS rule in `Nav.astro` targeting a *child component's* root element,
   which Astro's scoping never matches. Fixed by wrapping the component locally; the toggle
   now appears in the mobile menu instead of the header below 80 rem.
2. **Weak hero scrim on phones** — the horizontal desktop gradient left the headline over
   bright image areas. Fixed with a dedicated, stronger vertical scrim below 56 rem.

Also changed: the floating CTA no longer collapses to an icon-only sparkle on small phones
(that would have left the link with no meaningful accessible name).

## 10. Accessibility

| Check | Result |
| --- | --- |
| Skip link is the first tabbable element | ✅ |
| Logical focus order | ✅ skip → ribbon → wordmark → language → menu → content |
| Every link and button has an accessible name | ✅ automated check: 0 unnamed controls |
| Visible focus indicators | ✅ 3 px outline, sand-coloured on dark sections |
| Semantic landmarks | ✅ `header`/`nav`/`main`/`footer` on every page |
| Heading hierarchy | ✅ one `h1`, no skipped levels found |
| Forms | ✅ labels tied to inputs, `aria-invalid`, `role="alert"` messages, error summary |
| FAQ accordion | ✅ native `<details>` — works with JS disabled |
| Cookie dialog | ✅ native `<dialog>`, labelled, Escape closes, backdrop |
| No keyboard traps | ✅ menu and dialog both release focus |
| Colour contrast | ✅ palette refined for it: forest on ivory ≈ 9.4:1, ink-soft on ivory ≈ 7.0:1, clay on ivory ≈ 5.6:1, sand on forest ≈ 4.9:1 (all ≥ 4.5:1) |

## 11. Privacy and demo integrity

| Check | Result |
| --- | --- |
| Forms transmit nothing | ✅ DevTools network log after submitting the contact form, quote wizard and booking: **zero** requests of any kind; all traffic was GET to localhost (dev server, fonts, images) |
| No `action` attribute anywhere | ✅ automated |
| No analytics or trackers | ✅ automated + no such dependency in `package.json` |
| Fictional contact details are inert | ✅ plain text, `.example` domain, empty number pattern, no links |
| Demo ribbon on every page | ✅ |
| Footer disclaimer on every page | ✅ |
| Contextual notices beside each simulation | ✅ wizard, calendar and contact form each carry one |
| "About This Demo" page covers all seven points | ✅ |
| Four demo legal pages, accurate to the implementation | ✅ |
| Cookie panel states nothing is installed | ✅ rows: Strictly necessary → *Not used*; Analytics → *Not installed*; Marketing → *Not installed*; one real preference toggle |
| No invented enterprise/VAT number, address or opening hours | ✅ legal notice states explicitly that none exist |

## 12. Performance (production build, local preview)

Measured on `npm run preview`, Chromium, desktop viewport. Localhost removes network
latency, so treat the timings as structural rather than field data.

| Metric | Value |
| --- | --- |
| Requests (homepage) | **7** |
| Total transfer | **238 KB** (fonts ≈ 120 KB, hero image 53 KB, CSS 13 KB gz, HTML 60 KB raw) |
| First Contentful Paint | 584 ms |
| Largest Contentful Paint | 584 ms (the hero `<img>`) |
| **Cumulative Layout Shift** | **0** |
| DOMContentLoaded / load | 364 ms / 391 ms |
| JavaScript shipped on the homepage | **0 external JS files** — 5.8 KB of inline module script |
| Largest island bundles | booking calendar 6.4 KB, quote wizard 5.0 KB (loaded only on their own pages) |
| CSS per page | 47.8 KB raw / **13.4 KB gzipped** |
| Image optimisation | 2 MB PNG → responsive WebP ladder, 21 KB (480w) … 93 KB (1672w) |
| `dist/` total | 8.3 MB |

Optimisations applied during testing:

- Added a responsive `widths` ladder to `<Media>`; previously a single full-size image was
  served to phones as well. A 375 px phone now downloads 21 KB instead of 93 KB.
- Added `scripts/prune-originals.mjs` to the build: Astro copied the 2 MB source PNGs into
  `dist/_astro` although nothing references them. Pruning removed 22.3 MB (31 MB → 8.3 MB).
- Removed the unused `gsap` dependency. CSS transitions plus one rAF scroll handler cover
  every animation in the brief, at a fraction of the weight.
- `width`/`height` on every image and aspect-ratio placeholders keep CLS at zero.

## 13. Images

| Check | Result |
| --- | --- |
| Supplied images wired in | ✅ 12 of 30 slots (11 photographs + the OG image) |
| Automatic placeholder → asset swap | ✅ verified by dropping the files in and rebuilding |
| Placeholders reserve the final aspect ratio | ✅ CLS stayed 0 |
| Placeholders are labelled with their asset ID | ✅ e.g. "CL-19 sustainability-journey-products" |
| Alt text present in all three languages | ✅ from the registry |
| Manifest regenerates | ✅ `npm run manifest` → 12 supplied, 18 pending, priority-ordered |
| Every image fills its container (no letterboxing) | ✅ measured on the homepage and About: 7 images, gap between image height and container height = **0 px** on all |

**The most significant bug of the whole build was found here.** While removing the burned-in
labels from the before/after pair, the comparison frame showed a band of background below the
photo. The cause was not the crop: **none of the `object-fit: cover` rules were being applied
to any image on the site.** Astro's scoped CSS does not reach an `<img>` rendered two
component layers down (page → component → `Media` → `Image`), so every rule like
`.hero__img { object-fit: cover }` silently never matched. The homepage hero merely *looked*
correct because its natural 16:9 ratio happened to be within a few pixels of the hero's height
at desktop size.

Fixed by making `<Media>` own its fitting: a `fit` prop (`cover` by default, `width` for
containers with no height of their own) applies a globally defined class. Verified afterwards
on two page types — all images and placeholders now match their container height exactly.
This was the third instance of the same Astro scoping trap in this build (after the
JS-created calendar cells and the header's nested motion toggle); the pattern is now
documented in [architecture.md](architecture.md).

---

## Gaps — what was *not* tested

1. **Other browsers.** Only Chromium was used. Firefox, Safari and iOS Safari are untested.
   `<dialog>`, `clip-path`, `aspect-ratio` and pointer events are all well supported, but
   this is an assumption, not an observation.
2. **Real devices.** Mobile testing used viewport emulation with a touch user agent, not
   physical hardware. Touch-drag on the comparison slider was *not* exercised with real
   touch input — it is implemented with Pointer Events, which covers it in principle.
3. **Assistive technology.** No screen reader (NVDA/JAWS/VoiceOver) was run. ARIA and
   semantics were verified structurally, not experientially — notably the calendar grid and
   the comparison slider, which are the two most AT-sensitive components.
4. **Lighthouse.** Not run; no Chrome binary with the Lighthouse CLI available in this
   environment. The Core Web Vitals above were measured with the Performance API instead,
   on localhost. Run Lighthouse against the deployed URL before judging the scores.
5. **Deployment.** At the time of this report nothing had been deployed: no GitHub repository, no Pages site, no DNS
   change — per instruction. The steps and the verification checklist are in
   [deployment.md](deployment.md), unexecuted.
6. **Print styles.** Not designed or tested.
7. **Dark mode.** Not implemented; the design is a single warm light theme by intent.
8. **Long-content edge cases.** Very long German-style compound words or extreme text-zoom
   (200 %+) were not specifically stress-tested, though the layout is fluid and uses
   `clamp()` throughout.

## Known issues and recommendations

1. ~~The before/after photographs carry baked-in text.~~ **Resolved.** Both supplied images
   had a dark pill with "Before Cleaning" / "After Cleaning" burned into the top-left, which
   duplicated the component's own labels and stayed English on the NL and FR pages. The
   pill's extent was measured (it ended at y ≈ 115 of 941), then the **top 125 px were
   trimmed off both images identically**, keeping the pair pixel-aligned: both are now
   1670 × 816. Your originals in `clairo images/` were not modified. The comparison frame
   was widened to suit the new 2:1 ratio (3:2 on phones → 16:9 from 48 rem → 2:1 from 72 rem)
   and the registry notes now state that this pair must contain no text. Verified in all
   three languages: only the translated VOOR/NA, Before/After, Avant/Après chips remain.
   If you later re-export a clean pair at full height, just drop it in — no code change.
2. **Image resolution.** The supplied files are ~1672 × 941. On a 2560 px-wide display the
   full-bleed hero is upscaled slightly. Exporting heroes at ~2400 px wide would fix it; the
   responsive ladder already handles everything below that.
3. **`contact-hero-lounge` is portrait** (1122 × 1402) but is used in a landscape hero band,
   so it is cropped heavily. Either re-export it landscape or accept the crop.
4. **PNG source files are ~2 MB each.** They are committed so the build can optimise them,
   but converting the sources to JPEG/WebP before committing would keep Git history lean.
5. **18 image slots still use placeholders**, including two P1 slots (`home-hero-detail-glass`,
   `home-sustainability-refill`). The site is fully presentable as is; see
   [image-assets.md](image-assets.md) for the ordered list.
6. **Fonts are the largest payload** (~120 KB for three variable font files). Dropping the
   italic Fraunces cut would save ~45 KB but would remove the italic accents that carry much
   of the brand's editorial character. Kept deliberately.

---

# Live deployment verification — 13 November 2026

Published to GitHub Pages at **https://clario.mahmoudanwari.com**, matching the hosting of
`barber.mahmoudanwari.com` and `restaurant.mahmoudanwari.com`. Everything below was executed
against the live site.

## Infrastructure

| Check | Result |
| --- | --- |
| Actions workflow run | ✅ success — build, `astro check`, `npm test`, artifact upload, deploy |
| DNS | ✅ `clario.mahmoudanwari.com CNAME mahmoudanwari.github.io`, **DNS only**, identical to the other two subdomains |
| TLS certificate | ✅ Let's Encrypt, CN `clario.mahmoudanwari.com`, valid 13 Nov 2026 → 11 Feb 2027 |
| Enforce HTTPS | ✅ on — `http://` returns **301** to `https://` |
| Served by | ✅ GitHub.com edge (region fra) |
| Other sites unaffected | ✅ barber, restaurant and the apex all still return 200 |

## Pages and assets

| Check | Result |
| --- | --- |
| 25 key paths across EN/NL/FR | ✅ all 200, zero failures |
| Unknown path | ✅ returns 404 and the custom page |
| `robots.txt` | ✅ correct, points at the sitemap on the custom domain |
| `sitemap-0.xml` | ✅ 48 URLs, all on `https://clario.mahmoudanwari.com` |
| Canonical / `og:url` / `og:image` | ✅ all absolute on the custom domain |
| Mixed content | ✅ none — no `http://` references in page source |
| Images on the homepage | ✅ 11 of 11 load after scrolling (the rest are correctly lazy) |
| Placeholders remaining | ✅ zero |
| Open Graph image | ✅ 200, 118 KB, 1200 × 630 |

## Live behaviour

| Check | Result |
| --- | --- |
| `/` language redirect | ✅ lands on `/en/` |
| Scroll reveals | ✅ 0 pending after a full page walk |
| Quote wizard (French) | ✅ ran to confirmation: 400 m² × €1.50 = **600,00 €**, formatted `fr-BE`, ending on "Simulation terminée — rien n’a été envoyé" |
| **Network calls during the wizard** | ✅ **zero** — `fetch` and `XMLHttpRequest` were instrumented for the whole flow and recorded nothing. The privacy claim holds in production, not just locally |

## Still not verified

The gaps listed earlier remain: no other browsers, no real devices, no screen reader, and no
Lighthouse run. Those are worth doing against the live URL now that one exists.

---

# Motion pass — 13 November 2026

Richer animation added at the client's request, all of it inside the existing motion system
(`.js-motion` gate, animation toggle, `prefers-reduced-motion`).

| Effect | Where | Notes |
| --- | --- | --- |
| Line-by-line headline reveal | Every `SectionHeading`, both hero types | Lines are wrapped at runtime from the *rendered* line breaks, so it follows the real wrap at any width, and re-splits on significant resize |
| Hero parallax | Homepage hero, page heroes, sustainability media | Desktop and fine-pointer only; a 6 % offset — depth, not travel |
| Scroll progress bar | All pages | 2 px gradient, hidden entirely when motion is off |
| Counting statistics | Homepage stats band | easeOutExpo, tabular numerals so the layout cannot jitter |
| Header tuck | All pages | Hides on scroll-down past 600 px, returns instantly on scroll-up, never while the mobile menu is open |
| Hover lift | Pricing cards, testimonials | `@media (hover: hover)` only |
| Settle-in media | Large images | `scale` reveal variant |

All of it is driven by **one** rAF-throttled scroll listener rather than one per effect. The
header's own listener in `Nav.astro` was removed so there is no duplication.

## Verified

| Check | Result |
| --- | --- |
| Headline splitting preserves markup | ✅ 2 lines on the hero, `<em>` accent preserved, text identical |
| Motion **off** hides nothing | ✅ 0 of 52 reveal elements hidden after a full page walk; headlines not split at all; counters show final values; progress bar `display: none`; header never tucks |
| Counters | ✅ animate from 0 and settle on the target |
| Type check, build, QA pass | ✅ 0 errors, 50 pages, QA green |

**One bug found and fixed during this pass:** the hero headline contains a `<br>`, and once each
line became a block-level element that produced a second, empty line — a visible gap between
"Clean spaces." and "Clear standards.". The splitter now removes `<br>` elements after wrapping.

## Content issue found while reviewing the result — since resolved

**CL-12 `service-deep-hero` has a step ladder in frame.** The Deep Cleaning page states plainly
that work at height is outside the concept's scope — "no ladders, lifts or rope access" — and
the art direction says never to depict it. The cleaner is correctly standing on the floor using
a telescopic pole; only the ladder behind him contradicts the copy. The equivalent detail image
(CL-13) is exactly right, so this is a single image to regenerate, not a pattern.

**Resolved the same day.** A replacement was supplied and verified before going live: both
cleaners work from the floor — one on the skirting, one at a table base — chairs are up on the
tables, and nothing in shot could be stood on. The registry note for the slot now records why
it was redone so the constraint is not lost on a future regeneration. All 30 image slots are
supplied with no outstanding regenerations.
