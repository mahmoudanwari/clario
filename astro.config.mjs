// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Public URL of the deployed site, used for canonical URLs, hreflang alternates,
// Open Graph and the sitemap. On GitHub Pages the workflow in
// .github/workflows/deploy.yml sets it to https://clario.mahmoudanwari.com.
// The site is served from the domain root, so it must not live in a sub-path.
const SITE_URL = process.env.SITE_URL ?? 'https://clario.mahmoudanwari.com';

// Fully static build — published to GitHub Pages (output: dist/).
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Exclude the root language-redirect page and the 404 page.
      filter: (page) => new URL(page).pathname !== '/' && !page.endsWith('/404/'),
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
