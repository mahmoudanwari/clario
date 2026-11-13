/**
 * Generic scroll-reveal for any element with `data-reveal`.
 *
 * Content is visible by default; the entrance transition in global.css is only
 * armed once `<html>` carries `.js-motion`. A rAF-throttled scroll check
 * (rather than IntersectionObserver alone) is used deliberately: it cannot
 * "miss" an element during fast or programmatic scrolling, so content can
 * never be left clipped or invisible.
 */
function initReveal() {
  const all = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!all.length) return;

  // Motion off → show everything immediately, no transitions.
  if (!document.documentElement.classList.contains('js-motion')) {
    all.forEach((el) => el.classList.add('is-in'));
    return;
  }

  // Stagger siblings inside a [data-reveal-group].
  all.forEach((el) => {
    const group = el.closest('[data-reveal-group]');
    if (!group) return;
    const siblings = Array.from(group.querySelectorAll<HTMLElement>('[data-reveal]'));
    el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 6) * 90}ms`);
  });

  let pending = new Set(all);
  let queued = false;

  const check = () => {
    queued = false;
    const trigger = window.innerHeight * 0.9;
    pending.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Reveal once the element's top edge enters the trigger line, and also
      // whenever it already sits above the viewport (e.g. restored scroll
      // position, in-page anchor, or a jump past it).
      if (rect.top < trigger) {
        el.classList.add('is-in');
        pending.delete(el);
      }
    });
    if (!pending.size) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(check);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  check();

  // Safety net: if anything is still hidden a few seconds in (unexpected
  // layout, a browser quirk, a hidden background tab), show it anyway.
  window.setTimeout(() => {
    pending.forEach((el) => el.classList.add('is-in'));
    pending = new Set();
  }, 4000);
}

function setup() {
  initReveal();
}

setup();
document.addEventListener('astro:page-load', setup);

export {};
