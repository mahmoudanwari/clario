/**
 * The site's motion layer: scroll progress, hero parallax, line-by-line
 * headline reveals, counting statistics and the header's scroll behaviour.
 *
 * Rules this module follows, in order of importance:
 *
 * 1. Nothing here is required to read the site. Every effect is additive and
 *    only arms when `<html>` carries `.js-motion`, which the pre-paint script
 *    in BaseLayout sets from the stored preference or `prefers-reduced-motion`.
 * 2. One rAF-throttled scroll listener drives everything, rather than each
 *    effect adding its own.
 * 3. Phones get the cheap effects only — no parallax, no oversized transforms.
 * 4. Scroll is never hijacked, and no effect can trap or delay input.
 */

const prefersCoarse = () => window.matchMedia('(pointer: coarse)').matches;
const isNarrow = () => window.innerWidth < 900;
const motionOn = () => document.documentElement.classList.contains('js-motion');

/* ------------------------------------------------------------------ *
 * Headlines: wrap each rendered line so it can rise out of the baseline.
 * Done after layout so it follows the real line breaks at any width.
 * ------------------------------------------------------------------ */
function splitLines(el: HTMLElement) {
  if (el.dataset.split === 'done') return;

  // Walk text nodes and wrap every word, so we can group them by their
  // vertical offset — that is what tells us where the browser broke lines.
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.textContent && node.textContent.trim()) texts.push(node as Text);
  }
  if (!texts.length) return;

  const words: HTMLElement[] = [];
  for (const text of texts) {
    const frag = document.createDocumentFragment();
    const parts = text.textContent!.split(/(\s+)/);
    for (const part of parts) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.append(part);
      } else {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = part;
        frag.append(span);
        words.push(span);
      }
    }
    text.replaceWith(frag);
  }

  // Group words by their top offset → one group per visual line.
  const lines: HTMLElement[][] = [];
  let lastTop: number | null = null;
  for (const word of words) {
    const top = Math.round(word.getBoundingClientRect().top);
    if (lastTop === null || Math.abs(top - lastTop) > 4) {
      lines.push([word]);
      lastTop = top;
    } else {
      lines[lines.length - 1]!.push(word);
    }
  }

  // Rebuild each line as .line > .line__inner, preserving inline markup
  // (the <em> accents in the headlines) by moving nodes rather than text.
  lines.forEach((lineWords, i) => {
    const first = lineWords[0]!;
    const last = lineWords[lineWords.length - 1]!;
    const line = document.createElement('span');
    line.className = 'line';
    const inner = document.createElement('span');
    inner.className = 'line__inner';
    inner.style.setProperty('--line-delay', `${i * 110}ms`);
    line.append(inner);

    // Collect every node from the first word of the line to the last.
    const range = document.createRange();
    range.setStartBefore(first);
    range.setEndAfter(last);
    const contents = range.extractContents();
    inner.append(contents);
    range.insertNode(line);
  });

  // Each .line is now block-level, so any <br> that forced the original break
  // would add a second, empty line. Drop them.
  el.querySelectorAll('br').forEach((br) => br.remove());

  el.dataset.split = 'done';
}

function initSplitHeadlines() {
  if (!motionOn()) return;
  document.querySelectorAll<HTMLElement>('[data-split-lines]').forEach((el) => {
    try {
      splitLines(el);
    } catch {
      // If anything about the DOM surprises us, leave the heading as it is:
      // a non-animated headline is a perfectly good headline.
    }
  });
}

/* ------------------------------------------------------------------ *
 * Counting statistics
 * ------------------------------------------------------------------ */
function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const suffix = el.dataset.countSuffix ?? '';
  const duration = 1400;
  const start = performance.now();
  el.classList.add('counting');

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    // easeOutExpo, matching the CSS easing used elsewhere.
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ------------------------------------------------------------------ *
 * Main setup
 * ------------------------------------------------------------------ */
export function initMotion() {
  const root = document.documentElement;

  // --- Scroll progress bar -----------------------------------------
  const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');

  // --- Parallax targets (desktop, fine pointer only) ---------------
  const parallaxEls = motionOn() && !isNarrow() && !prefersCoarse()
    ? Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    : [];

  // --- Header behaviour --------------------------------------------
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  let lastY = window.scrollY;

  // --- Counters -----------------------------------------------------
  const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  const countersDone = new WeakSet<HTMLElement>();
  if (!motionOn()) {
    // No animation: show the final values immediately.
    counters.forEach((el) => {
      const target = Number(el.dataset.count);
      if (Number.isFinite(target)) el.textContent = target.toLocaleString() + (el.dataset.countSuffix ?? '');
      countersDone.add(el);
    });
  }

  let queued = false;
  const update = () => {
    queued = false;
    const y = window.scrollY;

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--scroll-progress', String(max > 0 ? Math.min(1, y / max) : 0));
    }

    for (const el of parallaxEls) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue;
      // Centre of the element relative to the centre of the viewport, scaled
      // down hard: this is a hint of depth, not a slide.
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.06;
      el.style.setProperty('--parallax', `${offset.toFixed(1)}px`);
    }

    if (header) {
      header.classList.toggle('is-scrolled', y > 8);
      // Tuck the bar away when scrolling down past the hero, bring it back
      // the moment the user scrolls up — never while a menu is open.
      const menuOpen = header.querySelector('[aria-expanded="true"]');
      if (!menuOpen && motionOn()) {
        header.classList.toggle('is-tucked', y > 600 && y > lastY);
      } else {
        header.classList.remove('is-tucked');
      }
    }

    if (motionOn()) {
      for (const el of counters) {
        if (countersDone.has(el)) continue;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          countersDone.add(el);
          countUp(el);
        }
      }
    }

    lastY = y;
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  // Re-split headlines when the width changes enough to change line breaks.
  let lastWidth = window.innerWidth;
  window.addEventListener(
    'resize',
    () => {
      if (Math.abs(window.innerWidth - lastWidth) < 80) return;
      lastWidth = window.innerWidth;
      document.querySelectorAll<HTMLElement>('[data-split-lines]').forEach((el) => {
        // Leave already-revealed headings alone: re-splitting them would make
        // finished text jump. Only unrevealed ones are worth redoing.
        if (el.classList.contains('is-in') || el.closest('.is-in')) return;
        delete el.dataset.split;
        el.querySelectorAll('.line').forEach((line) => {
          const inner = line.querySelector('.line__inner');
          if (inner) line.replaceWith(...Array.from(inner.childNodes));
        });
        try {
          splitLines(el);
        } catch {
          /* leave as-is */
        }
      });
    },
    { passive: true }
  );

  initSplitHeadlines();
}

function setup() {
  initMotion();
}

setup();
document.addEventListener('astro:page-load', setup);

export {};
