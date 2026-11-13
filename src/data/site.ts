import type { Locale } from '../i18n/config.ts';

/**
 * Global brand settings. Change the slogan here and it updates everywhere
 * (hero, metadata, footer, OG tags).
 */
export const site = {
  name: 'Clario Cleaning',
  wordmark: 'CLARIO',
  descriptor: 'CLEANING',
  url: 'https://clario.mahmoudanwari.com',
  creator: {
    name: 'Mahmoud Anwari',
    url: 'https://mahmoudanwari.com',
  },
  slogan: {
    en: 'Clean Spaces. Clear Standards.',
    nl: 'Schone ruimtes. Heldere normen.',
    fr: 'Espaces nets. Standards clairs.',
  } satisfies Record<Locale, string>,
  /** Retained alternatives (documentation only — not rendered). */
  sloganAlternatives: {
    en: ['Better Spaces. Brighter Workdays.', 'Thoughtful Cleaning. Lasting Impressions.'],
    nl: ['Betere ruimtes. Stralende werkdagen.', 'Zorgvuldig gepoetst. Blijvende indruk.'],
    fr: ['De meilleurs espaces. Des journées plus lumineuses.', 'Un nettoyage réfléchi. Une impression durable.'],
  },
  /**
   * Deliberately non-functional placeholders. Rendered as plain text — never
   * as mailto:/tel: links. `.example` is a reserved, non-routable TLD.
   */
  contact: {
    email: 'hello@clario-demo.example',
    phone: '+32 (0)00 00 00 00',
  },
  /** Fictional service coverage — not real branches. */
  cities: [
    { id: 'brussels', en: 'Brussels', nl: 'Brussel', fr: 'Bruxelles', x: 52, y: 54 },
    { id: 'antwerp', en: 'Antwerp', nl: 'Antwerpen', fr: 'Anvers', x: 53, y: 22 },
    { id: 'ghent', en: 'Ghent', nl: 'Gent', fr: 'Gand', x: 33, y: 33 },
    { id: 'bruges', en: 'Bruges', nl: 'Brugge', fr: 'Bruges', x: 16, y: 25 },
    { id: 'leuven', en: 'Leuven', nl: 'Leuven', fr: 'Louvain', x: 64, y: 50 },
    { id: 'mechelen', en: 'Mechelen', nl: 'Mechelen', fr: 'Malines', x: 56, y: 36 },
    { id: 'liege', en: 'Liège', nl: 'Luik', fr: 'Liège', x: 84, y: 64 },
    { id: 'namur', en: 'Namur', nl: 'Namen', fr: 'Namur', x: 61, y: 75 },
    { id: 'charleroi', en: 'Charleroi', nl: 'Charleroi', fr: 'Charleroi', x: 46, y: 76 },
  ] as const,
};

export type CityId = (typeof site.cities)[number]['id'];
