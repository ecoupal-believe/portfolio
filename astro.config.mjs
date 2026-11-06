// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://ecoupal-believe.github.io/portfolio/
// With a custom domain (public/CNAME), set `site` to that domain and remove `base`.
export default defineConfig({
  site: 'https://ecoupal-believe.github.io',
  base: '/portfolio',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false }, // FR at /, EN at /en/
  },
});
