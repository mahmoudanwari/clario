/**
 * ILLUSTRATIVE DEMO PRICING — single source of truth.
 * These figures are fictional UI values, not Belgian market quotations.
 * Change an amount here and every page, card and the quote wizard update.
 */
export type ServiceId = 'office' | 'deep' | 'window' | 'sanitation';
export type AreaBasis = 'floor' | 'glass';

export interface PriceRule {
  /** Starting rate in EUR per m² for one visit. */
  ratePerM2: number;
  /** Floor area or glass area. */
  basis: AreaBasis;
  /** Sensible limits used by the quote wizard validation. */
  minArea: number;
  maxArea: number;
  /** Frequencies that make sense for this service (ids from `frequencies`). */
  frequencies: FrequencyId[];
}

export type FrequencyId = 'daily' | 'thrice' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'once';

/** Average visits per month used for the illustrative monthly figure. */
export const frequencies: Record<FrequencyId, { visitsPerMonth: number | null }> = {
  daily: { visitsPerMonth: 21.7 }, // working days
  thrice: { visitsPerMonth: 13 },
  weekly: { visitsPerMonth: 4.33 },
  biweekly: { visitsPerMonth: 2.17 },
  monthly: { visitsPerMonth: 1 },
  quarterly: { visitsPerMonth: 1 / 3 },
  once: { visitsPerMonth: null },
};

export const pricing: Record<ServiceId, PriceRule> = {
  office: { ratePerM2: 1.5, basis: 'floor', minArea: 20, maxArea: 20000, frequencies: ['daily', 'thrice', 'weekly', 'biweekly'] },
  deep: { ratePerM2: 4.5, basis: 'floor', minArea: 20, maxArea: 10000, frequencies: ['once', 'quarterly', 'monthly'] },
  window: { ratePerM2: 2.5, basis: 'glass', minArea: 5, maxArea: 5000, frequencies: ['once', 'monthly', 'quarterly'] },
  sanitation: { ratePerM2: 2.0, basis: 'floor', minArea: 20, maxArea: 15000, frequencies: ['daily', 'weekly', 'monthly'] },
};

export const currency = 'EUR';

export function formatPrice(amount: number, intlLocale: string, decimals = 2): string {
  return new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export interface Estimate {
  perVisit: number;
  perMonth: number | null;
}

/** Illustrative only — never a binding quote. */
export function estimate(service: ServiceId, area: number, frequency: FrequencyId): Estimate {
  const rule = pricing[service];
  const perVisit = Math.round(area * rule.ratePerM2 * 100) / 100;
  const visits = frequencies[frequency].visitsPerMonth;
  const perMonth = visits === null ? null : Math.round(perVisit * visits);
  return { perVisit, perMonth };
}
