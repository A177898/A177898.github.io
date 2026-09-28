// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Production site URL must be supplied via PUBLIC_SITE_URL (preferred) or SITE_URL.
 * Optional PUBLIC_BASE_PATH supports GitHub project Pages (/<repo>/).
 *
 * Models:
 * - User/org site: PUBLIC_SITE_URL=https://<user>.github.io  (base /)
 * - Project site:  PUBLIC_SITE_URL=https://<user>.github.io/<repo>
 *                  or PUBLIC_SITE_URL=https://<user>.github.io + PUBLIC_BASE_PATH=/<repo>
 *
 * Do not hardcode a username or repository name.
 */
const configuredSite =
  process.env.PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || '';
const configuredBase = process.env.PUBLIC_BASE_PATH?.trim() || '';
const isBuildCommand = process.argv.includes('build');
const PLACEHOLDER_HOST = 'example.com';

/** @param {string} value */
function isUsableProductionSite(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    if (url.hostname === PLACEHOLDER_HOST || url.hostname.endsWith(`.${PLACEHOLDER_HOST}`)) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {string} value
 * @returns {string} Astro base with leading and trailing slash, or "/"
 */
function normalizeBasePath(value) {
  if (!value || value === '/') return '/';
  const withLeading = value.startsWith('/') ? value : `/${value}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/**
 * Resolve Astro `site` (origin) and `base` from env.
 * @returns {{ site: string, base: string }}
 */
function resolveSiteAndBase() {
  if (!isUsableProductionSite(configuredSite)) {
    return {
      site: configuredSite || 'http://127.0.0.1:4321',
      base: normalizeBasePath(configuredBase || '/'),
    };
  }

  const url = new URL(configuredSite);
  const pathFromUrl = url.pathname.replace(/\/$/, '');
  const explicitBase = configuredBase ? normalizeBasePath(configuredBase) : '';
  const inferredBase =
    pathFromUrl && pathFromUrl !== '' ? normalizeBasePath(pathFromUrl) : '/';

  return {
    site: url.origin,
    base: explicitBase || inferredBase,
  };
}

if (isBuildCommand && !isUsableProductionSite(configuredSite)) {
  throw new Error(
    [
      'Production site URL is missing or still set to a placeholder (example.com).',
      'Set PUBLIC_SITE_URL (preferred) or SITE_URL to the real public GitHub Pages origin before building.',
      'User site example: PUBLIC_SITE_URL=https://your-username.github.io',
      'Project site example: PUBLIC_SITE_URL=https://your-username.github.io/your-repo',
      'Or set PUBLIC_SITE_URL to the origin and PUBLIC_BASE_PATH=/your-repo',
    ].join(' '),
  );
}

const { site, base } = resolveSiteAndBase();
const basePathNoSlash = base.replace(/\/$/, '') || '';

/**
 * Count published content entries for sitemap filtering (same eligibility as isPublished).
 * Lightweight sync read — build-time only.
 */
/** @param {string} collectionDir */
function countPublished(collectionDir) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
  const dir = path.join(root, 'src/content', collectionDir);
  try {
    statSync(dir);
  } catch {
    return 0;
  }

  /** @param {string} current */
  function walk(current) {
    let count = 0;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) count += walk(full);
      else if (/\.(md|mdx)$/.test(entry.name)) {
        const raw = readFileSync(full, 'utf8');
        const status = /^status:\s*["']?published["']?\s*$/m.test(raw);
        const approved = /^approvedForPublication:\s*true\s*$/m.test(raw);
        if (status && approved) count += 1;
      }
    }
    return count;
  }

  return walk(dir);
}

/** Strip configured base path so sitemap filters use site-root paths. */
/** @param {string} pathname */
function siteRootPath(pathname) {
  let pathOnly = pathname.replace(/\/$/, '') || '/';
  if (basePathNoSlash && (pathOnly === basePathNoSlash || pathOnly.startsWith(`${basePathNoSlash}/`))) {
    pathOnly = pathOnly.slice(basePathNoSlash.length) || '/';
  }
  return pathOnly;
}

const publishedExperience = countPublished('experience');
const publishedPerspectives = countPublished('perspectives');
const publishedArchitectures = countPublished('architectures');

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const blocked = ['/draft/', '/placeholder/'];
        if (blocked.some((segment) => page.includes(segment))) return false;

        const pathOnly = siteRootPath(new URL(page).pathname);
        if (publishedExperience === 0 && (pathOnly === '/experience' || pathOnly.startsWith('/experience/'))) {
          return false;
        }
        if (publishedPerspectives === 0 && (pathOnly === '/research' || pathOnly.startsWith('/research/'))) {
          return false;
        }
        if (
          publishedArchitectures === 0 &&
          (pathOnly === '/architecture/reference' || pathOnly.startsWith('/architecture/reference/'))
        ) {
          return false;
        }
        return true;
      },
    }),
  ],
});
