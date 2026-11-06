// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://ecoupal-believe.github.io/portfolio/
// With a custom domain (public/CNAME), set `site` to that domain and remove `base`.
export default defineConfig({
  site: 'https://ecoupal-believe.github.io',
  base: '/portfolio',
  trailingSlash: 'ignore',
  // Astro's dev-only toolbar (audits, component inspector). Never shipped to the live site; off to keep `npm run dev` clean.
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-US' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false }, // FR at /, EN at /en/
  },
});
