/**
 * Demonstration booking calendar.
 *
 * Availability is derived deterministically from the date string, so the same
 * date always shows the same slots for every visitor and no backend is needed.
 * No appointment is created, no email sent, nothing stored or transmitted.
 */

interface BookingConfig {
  locale: string;
  labels: {
    available: string; unavailable: string; selected: string; today: string;
    slotsFor: string; noSlots: string; pickDateFirst: string;
    types: Record<string, string>;
    type: string; date: string; time: string; city: string;
  };
  errors: Record<string, string>;
}

const ALL_SLOTS = ['08:30', '09:30', '10:30', '11:30', '13:30', '14:30', '15:30', '16:30'];

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? `{${k}}`));
}

/** Small deterministic hash → stable pseudo-randomness per date. */
function hashDate(iso: string): number {
  let h = 2166136261;
  for (let i = 0; i < iso.length; i++) {
    h ^= iso.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Weekdays only, from tomorrow up to 90 days out; ~1 in 5 weekdays fully booked. */
function slotsFor(date: Date): string[] {
  const today = startOfToday();
  const diffDays = Math.round((date.getTime() - today.getTime()) / 86400000);
  if (diffDays < 1 || diffDays > 90) return [];
  const dow = date.getDay();
  if (dow === 0 || dow === 6) return [];

  const h = hashDate(toISO(date));
  if (h % 5 === 0) return []; // fully booked day
  return ALL_SLOTS.filter((_, i) => (h >> i) % 3 !== 0);
}

export function initBookingCalendar() {
  const found = document.querySelector<HTMLElement>('[data-booking]');
  if (!found || found.dataset.wired) return;
  found.dataset.wired = 'true';
  // Re-bind to a non-nullable const so the narrowing survives into the
  // hoisted helper functions declared below.
  const root: HTMLElement = found;

  const config: BookingConfig = JSON.parse(root.dataset.config!);
  const form = root.querySelector<HTMLFormElement>('[data-booking-form]')!;
  const grid = root.querySelector<HTMLElement>('[data-cal-grid]')!;
  const weekdaysEl = root.querySelector<HTMLElement>('[data-weekdays]')!;
  const monthLabel = root.querySelector<HTMLElement>('[data-month-label]')!;
  const slotsEl = root.querySelector<HTMLElement>('[data-slots]')!;
  const slotsTitle = root.querySelector<HTMLElement>('[data-slots-title]')!;
  const review = root.querySelector<HTMLElement>('[data-review]')!;
  const reviewSummary = root.querySelector<HTMLElement>('[data-review-summary]')!;
  const reviewBtn = root.querySelector<HTMLButtonElement>('[data-review-btn]')!;
  const confirmBtn = root.querySelector<HTMLButtonElement>('[data-confirm]')!;
  const changeBtn = root.querySelector<HTMLButtonElement>('[data-change]')!;
  const actions = root.querySelector<HTMLElement>('[data-actions]')!;
  const done = root.querySelector<HTMLElement>('[data-done]')!;
  const restartBtn = root.querySelector<HTMLButtonElement>('[data-restart]')!;
  const summaryError = root.querySelector<HTMLElement>('[data-summary-error]')!;
  const citySelect = root.querySelector<HTMLSelectElement>('#booking-city')!;

  const today = startOfToday();
  let viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let selectedDate: Date | null = null;
  let selectedSlot: string | null = null;
  /** Day the roving-tabindex focus currently sits on. */
  let focusDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const dateFmtLong = new Intl.DateTimeFormat(config.locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const monthFmt = new Intl.DateTimeFormat(config.locale, { month: 'long', year: 'numeric' });

  // Monday-first weekday initials in the active locale.
  const weekdayFmt = new Intl.DateTimeFormat(config.locale, { weekday: 'short' });
  weekdaysEl.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(2024, 0, 1 + i); // 2024-01-01 is a Monday
    const span = document.createElement('span');
    span.textContent = weekdayFmt.format(d).slice(0, 2);
    weekdaysEl.append(span);
  }

  function setError(field: string, message: string) {
    const el = root.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
    if (el) el.textContent = message;
  }
  function clearErrors() {
    root.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => (el.textContent = ''));
    summaryError.textContent = '';
  }

  function sameDay(a: Date | null, b: Date | null) {
    return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function renderMonth() {
    monthLabel.textContent = monthFmt.format(viewMonth);
    grid.innerHTML = '';

    const first = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const leading = (first.getDay() + 6) % 7; // Monday-first offset

    for (let i = 0; i < leading; i++) {
      const filler = document.createElement('div');
      filler.className = 'cal__day is-empty';
      filler.setAttribute('role', 'presentation');
      grid.append(filler);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
      const slots = slotsFor(date);
      const available = slots.length > 0;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal__day';
      btn.dataset.date = toISO(date);
      btn.disabled = !available;
      btn.setAttribute('role', 'gridcell');
      btn.setAttribute('aria-selected', String(sameDay(date, selectedDate)));
      btn.tabIndex = sameDay(date, focusDate) ? 0 : -1;
      if (sameDay(date, today)) btn.classList.add('is-today');

      const num = document.createElement('span');
      num.textContent = String(day);
      btn.append(num);

      if (available) {
        const dot = document.createElement('span');
        dot.className = 'cal__day-dot';
        dot.setAttribute('aria-hidden', 'true');
        btn.append(dot);
      }

      const state = available ? config.labels.available : config.labels.unavailable;
      btn.setAttribute('aria-label', `${dateFmtLong.format(date)} — ${state}`);

      btn.addEventListener('click', () => selectDate(date));
      grid.append(btn);
    }

    // Keep a focusable cell in view even if `focusDate` is in another month.
    if (!grid.querySelector('[tabindex="0"]')) {
      const firstEnabled = grid.querySelector<HTMLButtonElement>('.cal__day:not(:disabled):not(.is-empty)');
      if (firstEnabled) firstEnabled.tabIndex = 0;
    }
  }

  function selectDate(date: Date) {
    selectedDate = date;
    selectedSlot = null;
    focusDate = date;
    clearErrors();
    renderMonth();
    renderSlots();
    resetReview();
  }

  function renderSlots() {
    slotsEl.innerHTML = '';
    if (!selectedDate) {
      slotsTitle.textContent = slotsTitle.dataset.defaultTitle ?? slotsTitle.textContent;
      const p = document.createElement('p');
      p.className = 'slots__empty';
      p.textContent = config.labels.pickDateFirst;
      slotsEl.append(p);
      return;
    }

    slotsTitle.textContent = fill(config.labels.slotsFor, { date: dateFmtLong.format(selectedDate) });
    const slots = slotsFor(selectedDate);
    if (!slots.length) {
      const p = document.createElement('p');
      p.className = 'slots__empty';
      p.textContent = config.labels.noSlots;
      slotsEl.append(p);
      return;
    }

    slots.forEach((slot) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot';
      btn.textContent = slot;
      btn.setAttribute('aria-pressed', String(selectedSlot === slot));
      btn.addEventListener('click', () => {
        selectedSlot = slot;
        clearErrors();
        renderSlots();
        resetReview();
      });
      slotsEl.append(btn);
    });
  }

  function currentSummary(): [string, string][] {
    const type = form.querySelector<HTMLInputElement>('input[name="assessment"]:checked')?.value ?? '';
    return [
      [config.labels.type, config.labels.types[type] ?? '—'],
      [config.labels.date, selectedDate ? dateFmtLong.format(selectedDate) : '—'],
      [config.labels.time, selectedSlot ?? '—'],
      [config.labels.city, citySelect.options[citySelect.selectedIndex]?.text ?? '—'],
    ];
  }

  function fillSummary(target: HTMLElement) {
    target.innerHTML = '';
    currentSummary().forEach(([dt, dd]) => {
      const wrap = document.createElement('div');
      const dtEl = document.createElement('dt');
      dtEl.textContent = dt;
      const ddEl = document.createElement('dd');
      ddEl.textContent = dd;
      wrap.append(dtEl, ddEl);
      target.append(wrap);
    });
  }

  function resetReview() {
    review.hidden = true;
    confirmBtn.hidden = true;
    changeBtn.hidden = true;
    reviewBtn.hidden = false;
  }

  reviewBtn.addEventListener('click', () => {
    clearErrors();
    if (!selectedDate) {
      setError('date', config.errors.date!);
      summaryError.textContent = config.errors.date!;
      return;
    }
    if (!selectedSlot) {
      setError('slot', config.errors.slot!);
      summaryError.textContent = config.errors.slot!;
      return;
    }
    fillSummary(reviewSummary);
    review.hidden = false;
    reviewBtn.hidden = true;
    confirmBtn.hidden = false;
    changeBtn.hidden = false;
    review.scrollIntoView({ block: 'nearest' });
  });

  changeBtn.addEventListener('click', resetReview);

  confirmBtn.addEventListener('click', () => {
    fillSummary(root.querySelector<HTMLElement>('[data-done-summary]')!);
    form.querySelectorAll<HTMLElement>('fieldset, .booking__cols, .booking__review').forEach((el) => (el.hidden = true));
    actions.hidden = true;
    root.querySelector<HTMLElement>('.booking__notice')!.hidden = true;
    done.hidden = false;
    done.focus();
  });

  restartBtn.addEventListener('click', () => {
    done.hidden = true;
    actions.hidden = false;
    form.querySelectorAll<HTMLElement>('fieldset, .booking__cols').forEach((el) => (el.hidden = false));
    root.querySelector<HTMLElement>('.booking__notice')!.hidden = false;
    selectedDate = null;
    selectedSlot = null;
    clearErrors();
    resetReview();
    renderMonth();
    renderSlots();
  });

  // Month navigation
  root.querySelector<HTMLButtonElement>('[data-prev-month]')!.addEventListener('click', () => {
    viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1);
    renderMonth();
  });
  root.querySelector<HTMLButtonElement>('[data-next-month]')!.addEventListener('click', () => {
    viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
    renderMonth();
  });

  // Keyboard grid navigation (roving tabindex)
  grid.addEventListener('keydown', (e) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();

    const next = new Date(focusDate);
    if (e.key === 'ArrowLeft') next.setDate(next.getDate() - 1);
    else if (e.key === 'ArrowRight') next.setDate(next.getDate() + 1);
    else if (e.key === 'ArrowUp') next.setDate(next.getDate() - 7);
    else if (e.key === 'ArrowDown') next.setDate(next.getDate() + 7);
    else if (e.key === 'Home') next.setDate(1);
    else if (e.key === 'End') next.setDate(new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate());
    else if (e.key === 'PageUp') next.setMonth(next.getMonth() - 1);
    else if (e.key === 'PageDown') next.setMonth(next.getMonth() + 1);

    focusDate = next;
    if (next.getMonth() !== viewMonth.getMonth() || next.getFullYear() !== viewMonth.getFullYear()) {
      viewMonth = new Date(next.getFullYear(), next.getMonth(), 1);
    }
    renderMonth();
    grid.querySelector<HTMLElement>(`[data-date="${toISO(next)}"]`)?.focus();
  });

  form.addEventListener('submit', (e) => e.preventDefault());
  form.querySelectorAll<HTMLInputElement>('input[name="assessment"]').forEach((i) => i.addEventListener('change', resetReview));
  citySelect.addEventListener('change', resetReview);

  slotsTitle.dataset.defaultTitle = slotsTitle.textContent ?? '';
  renderMonth();
  renderSlots();
}
