#!/usr/bin/env node
/**
 * Remove production HTML for empty conditional sections, unpublished detail
 * routes, and rewrite sitemap using the same eligibility rules as `isPublished`.
 *
 * Complements page-level guards; human publication review remains mandatory.
 * Must run only after validate-content.ts succeeds — parser failures are fatal
 * and must not be treated as ordinary unpublished entries.
 */
import { readdir, readFile, rm, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hasPublishedRadarEntries } from '../src/data/technologies';
import {
  contentEntryIdFromPath,
  isPublished,
  parsePublishableFrontmatter,
  type PublishableFields,
} from '../src/utils/publication';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const contentRoot = path.join(root, 'src/content');

export type ContentEntryMeta = {
  id: string;
  file: string;
  fields: PublishableFields;
  published: boolean;
};

/** List entries under a collection root using Astro-compatible content IDs. */
export async function listCollectionEntries(
  collectionRoot: string,
): Promise<ContentEntryMeta[]> {
  try {
    await stat(collectionRoot);
  } catch {
    return [];
  }

  async function walk(dir: string): Promise<ContentEntryMeta[]> {
    const entries = await readdir(dir, { withFileTypes: true });
    const result: ContentEntryMeta[] = [];
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        result.push(...(await walk(full)));
      } else if (/\.(md|mdx)$/.test(entry.name)) {
        const raw = await readFile(full, 'utf8');
        const parsed = parsePublishableFrontmatter(raw);
        if (!parsed.ok) {
          throw new Error(`${path.relative(root, full)}: ${parsed.error}`);
        }
        result.push({
          id: contentEntryIdFromPath(full, collectionRoot),
          file: full,
          fields: parsed.fields,
          published: isPublished(parsed.fields),
        });
      }
    }
    return result;
  }

  return walk(collectionRoot);
}

/** Exported for focused production-output simulation tests (disposable fixtures). */
export async function pruneDistForEntries(options: {
  distRoot: string;
  experience?: ContentEntryMeta[];
  perspectives: ContentEntryMeta[];
  architectures: ContentEntryMeta[];
  radarPublished: boolean;
  siteOrigin?: string;
  /** Astro base path, e.g. "/" or "/repo/" — used for robots sitemap URL. */
  siteBasePath?: string;
}): Promise<string[]> {
  const {
    distRoot,
    experience = [],
    perspectives,
    architectures,
    radarPublished,
    siteOrigin,
  } = options;
  const publishedExperience = experience.filter((entry) => entry.published);
  const publishedPerspectives = perspectives.filter((entry) => entry.published);
  const publishedArchitectures = architectures.filter((entry) => entry.published);
  const removals: string[] = [];

  async function pathExists(p: string): Promise<boolean> {
    try {
      await stat(p);
      return true;
    } catch {
      return false;
    }
  }

  async function removePath(target: string): Promise<void> {
    if (await pathExists(target)) {
      await rm(target, { recursive: true, force: true });
      removals.push(path.relative(distRoot, target));
    }
  }

  for (const entry of perspectives.filter((item) => !item.published)) {
    await removePath(path.join(distRoot, 'research', entry.id));
  }
  for (const entry of architectures.filter((item) => !item.published)) {
    await removePath(path.join(distRoot, 'architecture', 'reference', entry.id));
  }

  if (publishedExperience.length === 0) {
    await removePath(path.join(distRoot, 'experience'));
  }
  if (publishedPerspectives.length === 0) {
    await removePath(path.join(distRoot, 'research'));
  }
  if (publishedArchitectures.length === 0) {
    await removePath(path.join(distRoot, 'architecture', 'reference'));
  }
  if (!radarPublished) {
    await removePath(path.join(distRoot, 'architecture', 'radar'));
  }

  const sitemapPath = path.join(distRoot, 'sitemap-0.xml');
  if (await pathExists(sitemapPath)) {
    let xml = await readFile(sitemapPath, 'utf8');
    const blocked: RegExp[] = [];

    for (const entry of perspectives.filter((item) => !item.published)) {
      blocked.push(
        new RegExp(`<url><loc>[^<]*/research/${escapeRegExp(entry.id)}/?</loc>.*?</url>`, 'g'),
      );
    }
    for (const entry of architectures.filter((item) => !item.published)) {
      blocked.push(
        new RegExp(
          `<url><loc>[^<]*/architecture/reference/${escapeRegExp(entry.id)}/?</loc>.*?</url>`,
          'g',
        ),
      );
    }

    if (publishedExperience.length === 0) {
      blocked.push(/<url><loc>[^<]*\/experience\/?<\/loc>.*?<\/url>/g);
      blocked.push(/<url><loc>[^<]*\/experience\/[^<]+<\/loc>.*?<\/url>/g);
    }
    if (publishedPerspectives.length === 0) {
      blocked.push(/<url><loc>[^<]*\/research\/?<\/loc>.*?<\/url>/g);
      blocked.push(/<url><loc>[^<]*\/research\/[^<]+<\/loc>.*?<\/url>/g);
    }
    if (publishedArchitectures.length === 0) {
      blocked.push(/<url><loc>[^<]*\/architecture\/reference\/?<\/loc>.*?<\/url>/g);
      blocked.push(/<url><loc>[^<]*\/architecture\/reference\/[^<]+<\/loc>.*?<\/url>/g);
    }
    if (!radarPublished) {
      blocked.push(/<url><loc>[^<]*\/architecture\/radar\/?<\/loc>.*?<\/url>/g);
    }
    for (const pattern of blocked) {
      xml = xml.replace(pattern, '');
    }
    await writeFile(sitemapPath, xml);
  }

  const robotsPath = path.join(distRoot, 'robots.txt');
  if (await pathExists(robotsPath)) {
    const origin = siteOrigin?.replace(/\/$/, '');
    const basePath = (options.siteBasePath ?? '/').replace(/\/$/, '');
    const sitemapPathSuffix = basePath ? `${basePath}/sitemap-index.xml` : '/sitemap-index.xml';
    const sitemapLine = origin
      ? `Sitemap: ${origin}${sitemapPathSuffix.startsWith('/') ? '' : '/'}${sitemapPathSuffix}`
      : `Sitemap: ${sitemapPathSuffix}`;
    await writeFile(
      robotsPath,
      ['User-agent: *', 'Allow: /', '', sitemapLine, ''].join('\n'),
    );
  }

  return removals;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolveSiteOrigin(): string | undefined {
  const configured =
    process.env.PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || '';
  if (!configured) return undefined;
  try {
    const url = new URL(configured);
    if (url.hostname === 'example.com' || url.hostname.endsWith('.example.com')) {
      return undefined;
    }
    return url.origin;
  } catch {
    return undefined;
  }
}

function resolveSiteBasePath(): string {
  const explicit = process.env.PUBLIC_BASE_PATH?.trim();
  if (explicit) {
    const withLeading = explicit.startsWith('/') ? explicit : `/${explicit}`;
    return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
  }
  const configured =
    process.env.PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || '';
  if (!configured) return '/';
  try {
    const url = new URL(configured);
    const pathPart = url.pathname.replace(/\/$/, '');
    if (pathPart) return `${pathPart}/`;
  } catch {
    /* ignore */
  }
  return '/';
}

async function main(): Promise<void> {
  try {
    await stat(dist);
  } catch {
    console.log('No dist/ directory — skipping route prune.');
    return;
  }

  const experience = await listCollectionEntries(path.join(contentRoot, 'experience'));
  const perspectives = await listCollectionEntries(path.join(contentRoot, 'perspectives'));
  const architectures = await listCollectionEntries(path.join(contentRoot, 'architectures'));
  const radar = hasPublishedRadarEntries();
  const siteOrigin = resolveSiteOrigin();
  const siteBasePath = resolveSiteBasePath();

  const removals = await pruneDistForEntries({
    distRoot: dist,
    experience,
    perspectives,
    architectures,
    radarPublished: radar,
    siteOrigin,
    siteBasePath,
  });

  for (const rel of removals) {
    console.log(`Pruned unpublished route output: ${path.join('dist', rel)}`);
  }

  if (await pathExists(path.join(dist, 'sitemap-0.xml'))) {
    console.log('Sitemap rewritten to exclude unpublished conditional routes.');
  }
  if (siteOrigin) {
    const base = siteBasePath.replace(/\/$/, '');
    const sitemapLoc = `${siteOrigin}${base}/sitemap-index.xml`;
    console.log(`robots.txt sitemap origin set to ${sitemapLoc}`);
  }

  console.log(
    `Route prune complete (published experience: ${experience.filter((e) => e.published).length}, perspectives: ${perspectives.filter((e) => e.published).length}, architectures: ${architectures.filter((e) => e.published).length}).`,
  );
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
