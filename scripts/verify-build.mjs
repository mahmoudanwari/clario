#!/usr/bin/env node
/**
 * Static QA pass over dist/. Checks the promises this demo makes:
 * no trackers, no live contact links, no form submission targets, plus
 * baseline SEO and accessibility hygiene on every generated page.
 *
 * Usage: npm run verify   (after npm run build)
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const problems = [];
const warnings = [];
let pageCount = 0;

/** Hosts that would mean third-party requests at runtime. */
const ALLOWED_EXTERNAL = ['https://mahmoudanwari.com', 'https://clario.mahmoudanwari.com'];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function check(cond, page, message) {
  if (!cond) problems.push(`${page}: ${message}`);
}

const htmlFiles = await walk(DIST);
if (!htmlFiles.length) {
  console.error('No HTML found in dist/. Run `npm run build` first.');
  process.exit(1);
}

for (const file of htmlFiles) {
  const page = '/' + relative(DIST, file).split(sep).join('/');
  // Strip HTML comments first: source comments may legitimately *mention*
  // things we forbid in the markup itself (e.g. "not a mailto: link").
  const html = (await readFile(file, 'utf8')).replace(/<!--[\s\S]*?-->/g, '');
  const isRedirect = page === '/index.html';
  const is404 = page === '/404.html';
  pageCount++;

  // ---- Privacy / demo integrity (every page, no exceptions) ----
  check(!/\bmailto:/i.test(html), page, 'contains a mailto: link (fictional contact details must not be clickable)');
  check(!/["'\s]tel:/i.test(html), page, 'contains a tel: link (fictional contact details must not be clickable)');
  check(!/<form[^>]+action=/i.test(html), page, 'has a form with an action attribute (nothing may be submitted)');
  check(!/googletagmanager|google-analytics|gtag\(|fbq\(|hotjar|plausible|matomo|segment\.com|clarity\.ms|mixpanel/i.test(html), page, 'references an analytics or tracking service');
  check(!/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(html), page, 'loads fonts from a third party (fonts must be self-hosted)');

  // Any absolute URL must be to an allowed host.
  for (const match of html.matchAll(/(?:src|href)=["'](https?:\/\/[^"']+)["']/gi)) {
    const url = match[1];
    if (!ALLOWED_EXTERNAL.some((ok) => url.startsWith(ok))) {
      problems.push(`${page}: links to unexpected external host → ${url}`);
    }
  }

  // ---- Images ----
  for (const img of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt=/i.test(img[0])) problems.push(`${page}: <img> without an alt attribute`);
    else if (/\balt=["']\s*["']/i.test(img[0]) && !/role=["']presentation["']/i.test(img[0])) {
      warnings.push(`${page}: <img> with an empty alt (fine only if decorative)`);
    }
  }

  // ---- Headings & landmarks ----
  const h1s = html.match(/<h1\b/gi) ?? [];
  if (!isRedirect) {
    check(h1s.length === 1, page, `expected exactly one <h1>, found ${h1s.length}`);
  }
  if (!isRedirect && !is404) {
    check(/<main\b/i.test(html), page, 'has no <main> landmark');
    check(/<footer\b/i.test(html), page, 'has no <footer>');
    check(/class="[^"]*skip-link/.test(html), page, 'has no skip link');
  }

  // ---- Duplicate ids ----
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  check(dupes.length === 0, page, `duplicate id attribute(s): ${[...new Set(dupes)].join(', ')}`);

  // ---- SEO ----
  if (!is404 && !isRedirect) {
    check(/<title>[^<]{10,}<\/title>/i.test(html), page, 'missing or very short <title>');
    const desc = html.match(/<meta name="description" content="([^"]*)"/i);
    check(!!desc && desc[1].length >= 50, page, 'missing or very short meta description');
    check(/<link rel="canonical"/i.test(html), page, 'missing canonical link');
    const hreflangs = html.match(/hreflang=/gi) ?? [];
    check(hreflangs.length >= 4, page, `expected 3 hreflang alternates + x-default, found ${hreflangs.length}`);
    check(/property="og:title"/i.test(html), page, 'missing Open Graph title');

    // Must not claim to be a verified local business.
    check(!/"@type"\s*:\s*"(LocalBusiness|Organization|Service|AggregateRating|Review)"/i.test(html), page,
      'contains structured data presenting the fictional brand as a real business');

    // Demo disclosure must be present on content pages.
    check(/fictional|fictief|fictive/i.test(html), page, 'no visible demo/fictional disclosure found');
  }

  // ---- Language ----
  const lang = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
  check(!!lang, page, 'missing lang attribute on <html>');
  if (lang && page.startsWith('/nl/')) check(lang[1].startsWith('nl'), page, `lang is "${lang[1]}" on a Dutch page`);
  if (lang && page.startsWith('/fr/')) check(lang[1].startsWith('fr'), page, `lang is "${lang[1]}" on a French page`);
  if (lang && page.startsWith('/en/')) check(lang[1].startsWith('en'), page, `lang is "${lang[1]}" on an English page`);
}

// ---- Untranslated-content heuristic: NL/FR pages must not repeat the
// English navigation labels, which would signal a missed translation. ----
const englishOnly = ['Sustainability', 'Request a Quote', 'Book an Assessment', 'About This Demo'];
for (const file of htmlFiles) {
  const page = '/' + relative(DIST, file).split(sep).join('/');
  if (!page.startsWith('/nl/') && !page.startsWith('/fr/')) continue;
  const html = (await readFile(file, 'utf8')).replace(/<!--[\s\S]*?-->/g, '');
  // Strip the hreflang/alternate block and attributes, then look at text only.
  const text = html.replace(/<[^>]+>/g, ' ');
  for (const phrase of englishOnly) {
    if (text.includes(phrase)) problems.push(`${page}: untranslated English UI text found → "${phrase}"`);
  }
}

console.log(`\nChecked ${pageCount} HTML pages in ${DIST}/\n`);
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of [...new Set(warnings)].slice(0, 20)) console.log('  • ' + w);
  console.log('');
}
if (problems.length) {
  console.log(`FAILED — ${problems.length} problem(s):`);
  for (const p of [...new Set(problems)].slice(0, 60)) console.log('  ✗ ' + p);
  process.exit(1);
}
console.log('PASSED — no problems found.');
