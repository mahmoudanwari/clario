// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Fully static build — deployable to Cloudflare Pages (output: dist/).
export default defineConfig({
  site: 'https://clario.mahmoudanwari.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/') && page !== 'https://clario.mahmoudanwari.com/',
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', nl: 'nl-BE', fr: 'fr-BE' },
      },
    }),
  ],
  vite: {
    // Cast: @tailwindcss/vite ships types for a slightly newer Vite than the
    // one Astro 5 bundles. Runtime behaviour is unaffected.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
