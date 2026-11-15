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

/* ------------------------------------------------------------------ *
 * Pointer-driven motion.
 *
 * Only on devices with a real pointer. Every handler is rAF-throttled and
 * writes CSS custom properties rather than touching layout, so the browser
 * can keep all of it on the compositor.
 * ------------------------------------------------------------------ */
function initPointer() {
  if (!motionOn()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  // --- Spotlight: a soft light that tracks the cursor across a card ---
  document.querySelectorAll<HTMLElement>('.spotlight').forEach((card) => {
    if (card.dataset.spotWired) return;
    card.dataset.spotWired = 'true';
    let frame = 0;
    card.addEventListener(
      'pointermove',
      (e) => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
          card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
        });
      },
      { passive: true }
    );
  });

  // --- Magnetic buttons: lean toward the cursor, spring back on leave ---
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    if (el.dataset.magWired) return;
    el.dataset.magWired = 'true';
    const strength = Number(el.dataset.magnetic) || 0.22;
    let frame = 0;

    el.addEventListener(
      'pointermove',
      (e) => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          // Capped so the control never wanders far from where it is drawn —
          // it must stay easy to click, and keyboard users see none of this.
          const cap = 10;
          el.style.setProperty('--magnet-x', `${Math.max(-cap, Math.min(cap, dx * strength)).toFixed(1)}px`);
          el.style.setProperty('--magnet-y', `${Math.max(-cap, Math.min(cap, dy * strength)).toFixed(1)}px`);
        });
      },
      { passive: true }
    );

    const release = () => {
      el.style.setProperty('--magnet-x', '0px');
      el.style.setProperty('--magnet-y', '0px');
    };
    el.addEventListener('pointerleave', release, { passive: true });
    el.addEventListener('blur', release);
  });

  // --- Hero depth: layers drift a few pixels with the pointer ---
  const depthEls = Array.from(document.querySelectorAll<HTMLElement>('[data-pointer-depth]'));
  if (depthEls.length) {
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // -1 … 1 across the viewport, inverted so layers move *against* the
        // cursor, which is what reads as depth rather than as sliding.
        const x = -((e.clientX / window.innerWidth) * 2 - 1);
        const y = -((e.clientY / window.innerHeight) * 2 - 1);
        for (const el of depthEls) {
          el.style.setProperty('--pointer-x', x.toFixed(3));
          el.style.setProperty('--pointer-y', y.toFixed(3));
        }
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
  }
}

/* ------------------------------------------------------------------ *
 * Scroll velocity: a small skew on media while scrolling fast, and the
 * drift of the marquee strips.
 * ------------------------------------------------------------------ */
function initVelocity() {
  const skewEls = Array.from(document.querySelectorAll<HTMLElement>('[data-velocity]'));
  const marquees = Array.from(document.querySelectorAll<HTMLElement>('[data-marquee]'));
  if (!skewEls.length && !marquees.length) return;

  if (!motionOn()) {
    skewEls.forEach((el) => el.style.setProperty('--skew', '0deg'));
    return;
  }

  const allowSkew = !isNarrow() && !prefersCoarse();
  let lastY = window.scrollY;
  let velocity = 0;
  // Marquees always drift; scrolling just pushes them along a little.
  const offsets = marquees.map(() => 0);
  let running = true;

  const tick = () => {
    if (!running) return;
    const y = window.scrollY;
    const delta = y - lastY;
    lastY = y;

    // Ease toward the current delta, then decay — this is what makes it
    // settle instead of snapping.
    velocity += (delta - velocity) * 0.18;
    velocity *= 0.92;
    if (Math.abs(velocity) < 0.01) velocity = 0;

    if (allowSkew) {
      const skew = Math.max(-1.4, Math.min(1.4, velocity * 0.06));
      for (const el of skewEls) el.style.setProperty('--skew', `${skew.toFixed(2)}deg`);
    }

    marquees.forEach((m, i) => {
      const track = m.querySelector<HTMLElement>('.marquee__track');
      if (!track) return;
      const dir = Number(m.dataset.marquee) || 1;
      // A slow constant drift, nudged by how fast the page is moving.
      offsets[i] = (offsets[i] ?? 0) - dir * (0.35 + Math.abs(velocity) * 0.06);
      const width = track.scrollWidth / 2 || 1;
      if (offsets[i]! <= -width) offsets[i] = (offsets[i] ?? 0) + width;
      if (offsets[i]! >= 0 && dir < 0) offsets[i] = (offsets[i] ?? 0) - width;
      track.style.setProperty('--marquee-x', `${offsets[i]!.toFixed(1)}px`);
    });

    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // Stop the loop when the tab is hidden so it costs nothing in the background.
  //
  // Zero the skew on the way out. Browsers throttle requestAnimationFrame in a
  // hidden tab, so without this the decay never finishes and whatever skew was
  // applied at the moment of hiding stays frozen on the element — the page
  // would be visibly tilted when the viewer came back.
  const resetSkew = () => skewEls.forEach((el) => el.style.setProperty('--skew', '0deg'));

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      velocity = 0;
      resetSkew();
    } else if (!running) {
      running = true;
      velocity = 0;
      lastY = window.scrollY;
      resetSkew();
      requestAnimationFrame(tick);
    }
  });

  // Same reasoning for a page being restored from the back/forward cache.
  window.addEventListener('pageshow', () => {
    velocity = 0;
    lastY = window.scrollY;
    resetSkew();
  });
}

function setup() {
  initMotion();
  initPointer();
  initVelocity();
}

setup();
document.addEventListener('astro:page-load', setup);

export {};
