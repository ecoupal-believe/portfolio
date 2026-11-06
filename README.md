# Portfolio

Static, bilingual portfolio built with [Astro](https://astro.build). French is served at `/`, English at `/en/`.

## Run it

```sh
npm install
npm run dev       # http://localhost:4321/portfolio/
npm run build     # type-checks, then writes the static site to dist/
npm run preview   # serves dist/
```

## Edit the content

| What | Where |
| --- | --- |
| Name, email, optional LinkedIn/GitHub links, CV files, years of experience | `src/data/profile.ts` |
| Featured missions + architecture diagrams (public: generic component types only) | `src/data/missions.ts` |
| Projects (problem → what you did → outcome) | `src/data/projects.ts` |
| Tech stack | `src/data/stack.ts` |
| Experience / education | `src/data/timeline.ts` |
| All other page text (FR / EN) | `src/i18n/fr.json`, `src/i18n/en.json` |
| CV PDFs | `public/cv-fr.pdf`, `public/cv-en.pdf` |

- Text that differs per language is written as `{ fr: '…', en: '…' }`.
- `fr.json` is the reference. If `en.json` is missing a key, `npm run build` fails.
- Tech names: a [simple-icons](https://simpleicons.org) slug (e.g. `kubernetes`) shows the logo; any other text (e.g. `Java`) shows as plain text.
- Colours and fonts live in `src/styles/global.css` (`:root` tokens, with light and dark variants).
- Link preview images (LinkedIn, Slack…): `public/og-fr.png` and `public/og-en.png`, 1200×630. They show your name, title and a few technologies, so re-render them if your title changes.
- `sitemap-index.xml` and `robots.txt` are generated at build time from `site` and `base` in `astro.config.mjs`.

## Add a language

1. Add the locale to `i18n.locales` in `astro.config.mjs`.
2. Add it to `languages` in `src/i18n/utils.ts` and create `src/i18n/<lang>.json`.
3. Add the `<lang>` field to every `{ fr, en }` text in `src/data/`. TypeScript lists each missing one.
4. Create `src/pages/<lang>/index.astro` (copy `src/pages/en/index.astro`).

## Deploy

Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
This needs a one-time setting: **Settings → Pages → Source: GitHub Actions**.

For a custom domain, add `public/CNAME`, set `site` to the domain in `astro.config.mjs`, and remove `base`.
