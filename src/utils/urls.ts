/**
 * Base-path-aware URL helpers for GitHub Pages root and project sites.
 * Astro sets import.meta.env.BASE_URL (always trailing slash, e.g. "/" or "/repo/").
 */

/** Join a site-root path with the configured Astro base. */
export function withBase(path: string): string {
  if (!path) return import.meta.env.BASE_URL || '/';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const pathOnly = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const clean = pathOnly.startsWith('/') ? pathOnly.slice(1) : pathOnly;
  if (!clean) return `${base.replace(/\/$/, '') || ''}/${hash}`.replace(/\/\/+/, '/') || base;
  return `${base}${clean}${hash}`;
}

/**
 * Build an absolute URL for metadata (canonical, OG) using Astro.site + base.
 * `pathname` may already include base (e.g. Astro.url.pathname) or be a site-root
 * path like "/about" or "/og-image.png".
 */
export function absoluteSiteUrl(
  siteOrigin: string | URL | undefined,
  pathname: string,
): URL {
  const origin = siteOrigin ? String(siteOrigin) : 'http://127.0.0.1:4321';
  const base = import.meta.env.BASE_URL || '/';
  const baseNormalized = base.replace(/\/$/, '');

  let path = pathname || '/';
  if (
    baseNormalized &&
    !path.startsWith(`${baseNormalized}/`) &&
    path !== baseNormalized
  ) {
    const clean = path.startsWith('/') ? path : `/${path}`;
    path = `${baseNormalized}${clean}`;
  }

  return new URL(path, origin.endsWith('/') ? origin : `${origin}/`);
}
