/**
 * Quote wizard behaviour.
 *
 * Privacy: every value lives in the DOM and in local variables for the
 * lifetime of the page view. There is no fetch(), no storage write, no
 * logging, and no navigation carrying parameters. "Submitting" only swaps
 * the visible panel.
 */

interface ServiceMeta {
  id: string;
  name: string;
  short: string;
  rate: number;
  basis: 'floor' | 'glass';
  min: number;
  max: number;
  frequencies: string[];
}

interface WizardConfig {
  locale: string;
  services: ServiceMeta[];
  frequencies: Record<string, number | null>;
  labels: {
    frequency: Record<string, string>;
    business: Record<string, string>;
    timing: Record<string, string>;
    basis: { floor: string; glass: string };
  };
  review: {
    service: string; business: string; area: string; frequency: string; timing: string;
    perVisit: string; perMonth: string; oneOff: string; calc: string;
  };
  errors: Record<string, string>;
  errorSummary: string;
  progress: string;
  stepNames: string[];
}

const TOTAL_STEPS = 6;

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? `{${k}}`));
}

export function initQuoteWizard() {
  const found = document.querySelector<HTMLElement>('[data-wizard]');
  if (!found || found.dataset.wired) return;
  found.dataset.wired = 'true';
  // Re-bind to a non-nullable const so the narrowing survives into the
  // hoisted helper functions declared below.
  const root: HTMLElement = found;

  const config: WizardConfig = JSON.parse(root.dataset.config!);
  const form = root.querySelector<HTMLFormElement>('[data-wizard-form]')!;
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
  const pips = Array.from(root.querySelectorAll<HTMLElement>('[data-pip]'));
  const progressText = root.querySelector<HTMLElement>('[data-progress-text]')!;
  const backBtn = root.querySelector<HTMLButtonElement>('[data-back]')!;
  const nextBtn = root.querySelector<HTMLButtonElement>('[data-next]')!;
  const submitBtn = root.querySelector<HTMLButtonElement>('[data-submit]')!;
  const nav = root.querySelector<HTMLElement>('[data-nav]')!;
  const done = root.querySelector<HTMLElement>('[data-done]')!;
  const summaryError = root.querySelector<HTMLElement>('[data-summary-error]')!;
  const areaInput = root.querySelector<HTMLInputElement>('#area-input')!;
  const areaLabel = root.querySelector<HTMLElement>('[data-area-label]')!;
  const areaLegend = root.querySelector<HTMLElement>('[data-area-legend]')!;
  const areaHint = root.querySelector<HTMLElement>('[data-area-hint]')!;
  const restartBtn = root.querySelector<HTMLButtonElement>('[data-restart]')!;

  // Labels for the area step, read from the server-rendered markup so no
  // translated string has to be duplicated in JS.
  const areaTexts = {
    floorLabel: areaLabel.textContent ?? '',
    floorHint: areaHint.textContent ?? '',
    glassLabel: areaLabel.dataset.glassLabel ?? '',
    glassHint: areaHint.dataset.glassHint ?? '',
  };

  let step = 1;

  const getRadio = (name: string) => form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
  const currentService = () => config.services.find((s) => s.id === getRadio('service')?.value) ?? config.services[0]!;

  const money = (n: number, decimals = 2) =>
    new Intl.NumberFormat(config.locale, { style: 'currency', currency: 'EUR', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

  function setError(field: string, message: string) {
    const el = root.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
    if (el) el.textContent = message;
    const input = form.querySelector<HTMLElement>(`[name="${field}"]`);
    if (input && message) input.setAttribute('aria-invalid', 'true');
    else input?.removeAttribute('aria-invalid');
  }

  function clearErrors() {
    root.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => (el.textContent = ''));
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    summaryError.textContent = '';
  }

  function validateStep(n: number): boolean {
    clearErrors();
    if (n === 1 && !getRadio('service')) { setError('service', config.errors.chooseOne!); return false; }
    if (n === 2 && !getRadio('business')) { setError('business', config.errors.chooseOne!); return false; }
    if (n === 3) {
      const svc = currentService();
      const raw = areaInput.value.trim();
      const value = Number(raw);
      if (!raw || Number.isNaN(value)) { setError('area', config.errors.number!); return false; }
      if (value < svc.min) { setError('area', fill(config.errors.min!, { min: svc.min })); return false; }
      if (value > svc.max) { setError('area', fill(config.errors.max!, { max: svc.max })); return false; }
    }
    if (n === 4 && !getRadio('frequency')) { setError('frequency', config.errors.chooseOne!); return false; }
    if (n === 5 && !getRadio('timing')) { setError('timing', config.errors.chooseOne!); return false; }
    return true;
  }

  /** Show only the frequencies that make sense for the chosen service. */
  function syncFrequencies() {
    const svc = currentService();
    let firstVisible: HTMLInputElement | null = null;
    root.querySelectorAll<HTMLElement>('[data-frequency-option]').forEach((label) => {
      const id = label.dataset.frequencyOption!;
      const allowed = svc.frequencies.includes(id);
      label.hidden = !allowed;
      const input = label.querySelector<HTMLInputElement>('input')!;
      if (!allowed && input.checked) input.checked = false;
      if (allowed && !firstVisible) firstVisible = input;
    });
    if (!getRadio('frequency') && firstVisible) (firstVisible as HTMLInputElement).checked = true;
  }

  function syncAreaBasis() {
    const svc = currentService();
    const glass = svc.basis === 'glass';
    areaLabel.textContent = glass ? areaTexts.glassLabel : areaTexts.floorLabel;
    areaLegend.textContent = areaLabel.textContent;
    areaHint.textContent = glass ? areaTexts.glassHint : areaTexts.floorHint;
    areaInput.min = String(svc.min);
    areaInput.max = String(svc.max);
    if (Number(areaInput.value) > svc.max) areaInput.value = String(svc.max);
    if (Number(areaInput.value) < svc.min) areaInput.value = String(svc.min);
  }

  function buildSummary(target: HTMLElement) {
    const svc = currentService();
    const area = Number(areaInput.value);
    const freq = getRadio('frequency')?.value ?? '';
    const basisLabel = svc.basis === 'glass' ? config.labels.basis.glass : config.labels.basis.floor;
    const rows: [string, string][] = [
      [config.review.service, svc.name],
      [config.review.business, config.labels.business[getRadio('business')?.value ?? ''] ?? '—'],
      [`${config.review.area} (${basisLabel})`, `${area.toLocaleString(config.locale)} m²`],
      [config.review.frequency, config.labels.frequency[freq] ?? '—'],
      [config.review.timing, config.labels.timing[getRadio('timing')?.value ?? ''] ?? '—'],
    ];
    target.innerHTML = '';
    rows.forEach(([dt, dd]) => {
      const wrap = document.createElement('div');
      const dtEl = document.createElement('dt');
      dtEl.textContent = dt;
      const ddEl = document.createElement('dd');
      ddEl.textContent = dd;
      wrap.append(dtEl, ddEl);
      target.append(wrap);
    });
  }

  function updateReview() {
    buildSummary(root.querySelector<HTMLElement>('[data-summary]')!);

    const svc = currentService();
    const area = Number(areaInput.value);
    const freq = getRadio('frequency')?.value ?? '';
    const perVisit = Math.round(area * svc.rate * 100) / 100;
    const visits = config.frequencies[freq];

    root.querySelector<HTMLElement>('[data-estimate-visit]')!.textContent = money(perVisit);
    const monthRow = root.querySelector<HTMLElement>('[data-estimate-month-row]')!;
    if (visits === null || visits === undefined) {
      monthRow.hidden = true;
    } else {
      monthRow.hidden = false;
      root.querySelector<HTMLElement>('[data-estimate-month]')!.textContent = money(Math.round(perVisit * visits), 0);
    }
    root.querySelector<HTMLElement>('[data-estimate-calc]')!.textContent = fill(config.review.calc, {
      area: area.toLocaleString(config.locale),
      rate: money(svc.rate),
    });
  }

  function render() {
    panels.forEach((panel) => {
      panel.hidden = Number(panel.dataset.step) !== step;
    });
    pips.forEach((pip) => {
      const n = Number(pip.dataset.pip);
      pip.classList.toggle('is-current', n === step);
      pip.classList.toggle('is-done', n < step);
    });
    progressText.textContent = `${fill(config.progress, { n: step, total: TOTAL_STEPS })} · ${config.stepNames[step - 1]}`;
    backBtn.hidden = step === 1;
    nextBtn.hidden = step === TOTAL_STEPS;
    submitBtn.hidden = step !== TOTAL_STEPS;
    if (step === TOTAL_STEPS) updateReview();
  }

  nextBtn.addEventListener('click', () => {
    if (!validateStep(step)) {
      summaryError.textContent = config.errorSummary;
      root.querySelector<HTMLElement>('[aria-invalid="true"], .field-error:not(:empty)')?.scrollIntoView({ block: 'center' });
      return;
    }
    if (step === 1) { syncAreaBasis(); syncFrequencies(); }
    step = Math.min(TOTAL_STEPS, step + 1);
    render();
    root.querySelector<HTMLElement>(`[data-step="${step}"] legend`)?.scrollIntoView({ block: 'nearest' });
  });

  backBtn.addEventListener('click', () => {
    clearErrors();
    step = Math.max(1, step - 1);
    render();
  });

  submitBtn.addEventListener('click', () => {
    if (!validateStep(TOTAL_STEPS)) return;
    buildSummary(root.querySelector<HTMLElement>('[data-done-summary]')!);
    panels.forEach((p) => (p.hidden = true));
    nav.hidden = true;
    root.querySelector<HTMLElement>('.wizard__progress')!.hidden = true;
    done.hidden = false;
    done.focus();
  });

  restartBtn.addEventListener('click', () => {
    done.hidden = true;
    nav.hidden = false;
    root.querySelector<HTMLElement>('.wizard__progress')!.hidden = false;
    step = 1;
    clearErrors();
    render();
  });

  // A form submit (e.g. Enter in the number field) must never navigate.
  form.addEventListener('submit', (e) => e.preventDefault());

  form.querySelectorAll<HTMLInputElement>('input[name="service"]').forEach((input) =>
    input.addEventListener('change', () => { syncAreaBasis(); syncFrequencies(); })
  );

  root.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach((btn) =>
    btn.addEventListener('click', () => {
      areaInput.value = btn.dataset.preset!;
      areaInput.dispatchEvent(new Event('input'));
      clearErrors();
    })
  );

  syncAreaBasis();
  syncFrequencies();
  render();
}
