export const locales = ['en', 'nl', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeMeta: Record<Locale, { name: string; short: string; htmlLang: string; intl: string; og: string }> = {
  en: { name: 'English', short: 'EN', htmlLang: 'en', intl: 'en-GB', og: 'en_GB' },
  nl: { name: 'Nederlands', short: 'NL', htmlLang: 'nl-BE', intl: 'nl-BE', og: 'nl_BE' },
  fr: { name: 'Français', short: 'FR', htmlLang: 'fr-BE', intl: 'fr-BE', og: 'fr_BE' },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** getStaticPaths helper for every `[lang]` page. */
export function localeStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

/**
 * Route registry. Slugs are shared across languages on purpose: it keeps the
 * language switcher, hreflang and sitemap 1:1 and reliable.
 */
export const routes = {
  home: '/',
  services: '/services/',
  office: '/services/office-cleaning/',
  deep: '/services/deep-cleaning/',
  window: '/services/window-cleaning/',
  sanitation: '/services/workplace-sanitation/',
  sustainability: '/sustainability/',
  about: '/about/',
  quote: '/request-a-quote/',
  book: '/book-an-assessment/',
  contact: '/contact/',
  demo: '/about-this-demo/',
  privacy: '/legal/privacy/',
  cookies: '/legal/cookies/',
  terms: '/legal/terms/',
  notice: '/legal/legal-notice/',
} as const;
export type RouteKey = keyof typeof routes;

export function href(lang: Locale, route: RouteKey | string, hash = ''): string {
  const path = route in routes ? routes[route as RouteKey] : route;
  return `/${lang}${path}${hash}`;
}

/** Swap the locale segment of a pathname, preserving the equivalent page. */
export function swapLocale(pathname: string, lang: Locale): string {
  const parts = pathname.split('/');
  if (isLocale(parts[1])) {
    parts[1] = lang;
    return parts.join('/');
  }
  return `/${lang}/`;
}
