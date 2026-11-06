import * as simpleIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

// Build-time only: this module runs in Astro frontmatter, so no icon data ships to the browser.
const bySlug = new Map<string, SimpleIcon>();
for (const icon of Object.values(simpleIcons)) {
  if (icon && typeof icon === 'object' && 'slug' in icon) bySlug.set(icon.slug, icon as SimpleIcon);
}

/** Returns the icon for a simple-icons slug, or undefined for plain names (e.g. 'Java', 'AWS'). */
export function getIcon(name: string): SimpleIcon | undefined {
  return bySlug.get(name.toLowerCase());
}

/** Display label: the icon's official title, or the plain name as written. */
export function techLabel(name: string): string {
  return getIcon(name)?.title ?? name;
}
