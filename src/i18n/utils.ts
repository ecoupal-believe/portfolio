import fr from './fr.json';
import en from './en.json';

export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

// fr.json is the reference: if en.json is missing a key (or has the wrong shape),
// `astro check` fails on this line.
type Dictionary = typeof fr;
const dictionaries: Record<Lang, Dictionary> = { fr, en };

export function getLang(currentLocale: string | undefined): Lang {
  return currentLocale && currentLocale in languages ? (currentLocale as Lang) : defaultLang;
}

export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** A piece of text written in every supported language. */
export type Localized = Record<Lang, string>;

export function pick(lang: Lang, text: Localized): string {
  return text[lang];
}
