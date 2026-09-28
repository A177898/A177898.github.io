/**
 * Site-wide SEO helpers.
 * Document title convention: "Page Title | Yusuf Kader"
 * Homepage default: "Yusuf Kader | Enterprise Architect"
 */

export const siteMeta = {
  siteName: 'Yusuf Kader',
  defaultTitle: 'Yusuf Kader | Enterprise Architect',
  titleTemplate: '%s | Yusuf Kader',
  defaultDescription:
    'Enterprise Architect connecting business strategy, platforms and technology transformation.',
  locale: 'en_GB',
  /** Static social card — 1200×630 PNG in /public */
  ogImagePath: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Yusuf Kader — Enterprise Architect. Strategy · Architecture · Platforms · Technology',
} as const;

const TITLE_SUFFIX = ` | ${siteMeta.siteName}`;
const LEGACY_SUFFIXES = [
  /\s*[·•]\s*Yusuf Kader\s*$/i,
  /\s*—\s*Yusuf Kader\s*$/i,
  /\s*–\s*Yusuf Kader\s*$/i,
  /\s*\|\s*Yusuf Kader\s*$/i,
];

/** Strip any existing site-name suffix so titles are not doubled. */
export function stripSiteTitleSuffix(title: string): string {
  let value = title.trim();
  for (const pattern of LEGACY_SUFFIXES) {
    value = value.replace(pattern, '').trim();
  }
  return value;
}

/**
 * Build a document title.
 * - No section → homepage default
 * - Section already ending with the site name → normalised to `|` convention
 * - Otherwise → `Section | Yusuf Kader`
 */
export function pageTitle(section?: string): string {
  if (!section) return siteMeta.defaultTitle;
  const base = stripSiteTitleSuffix(section);
  if (!base || base === siteMeta.siteName) return siteMeta.defaultTitle;
  if (base === 'Enterprise Architect') return siteMeta.defaultTitle;
  return `${base}${TITLE_SUFFIX}`;
}

/** Normalise a content-provided SEO title to the shared `|` convention. */
export function normalizeSeoTitle(title: string): string {
  const base = stripSiteTitleSuffix(title);
  if (!base) return siteMeta.defaultTitle;
  if (base === siteMeta.siteName || base === 'Enterprise Architect') {
    return siteMeta.defaultTitle;
  }
  // Homepage-style already correct after strip: "Yusuf Kader | Enterprise Architect" handled above
  return `${base}${TITLE_SUFFIX}`;
}
