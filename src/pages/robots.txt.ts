import type { APIRoute } from 'astro';

// Built from `site` + `base`, so it stays correct after a move to a custom domain.
// Note: crawlers only read robots.txt at a domain root, so it takes effect once the site has its own domain.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
