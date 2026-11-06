/** Prefixes a file in public/ with the site base path (e.g. /portfolio/). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
