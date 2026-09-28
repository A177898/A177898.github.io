import { parse as parseYaml } from 'yaml';

export type PublicationStatus = 'placeholder' | 'draft' | 'published';
export type PublicationClassification = 'green' | 'amber';

/** RED content must never enter this repository — not represented in types or schemas. */

export type PublishableFields = {
  status: PublicationStatus;
  classification: PublicationClassification;
  /**
   * Explicit publication approval.
   * Required as `true` for any content with status: published (green or amber).
   * An explicit `false` is never ignored. Drafts remain non-production even when true.
   * architectureVersion (and similar metadata) never affects publication eligibility.
   *
   * Current shared rule (applies to experience, perspectives, architectures, leadership):
   * production visibility requires status === 'published' && approvedForPublication === true.
   * GREEN classification alone is not publication approval.
   * Radar entries use a separate existing approval mechanism in src/data/technologies.ts.
   */
  approvedForPublication?: boolean;
};

export const PUBLICATION_STATUSES = ['placeholder', 'draft', 'published'] as const;
export const PUBLICATION_CLASSIFICATIONS = ['green', 'amber'] as const;

/**
 * Production visibility gate shared by routes, indexes, navigation and sitemap helpers.
 *
 * Scope: all publishable collections (experience, perspectives, architectures, leadership).
 * Current rule: published status AND explicit approvedForPublication: true (green and amber).
 * Drafts and placeholders remain excluded regardless of approval.
 * architectureVersion never affects publication eligibility.
 */
export function isPublished<T extends PublishableFields>(entry: T): boolean {
  if (entry.status !== 'published') return false;
  if (entry.approvedForPublication !== true) return false;
  return true;
}

/**
 * Draft entries may be shown in local development for review only.
 * Production builds never include drafts via this helper.
 * Approval alone does not make a draft production-visible.
 */
export function isVisibleForReview<T extends PublishableFields>(
  entry: T,
  options: { allowDrafts: boolean },
): boolean {
  if (isPublished(entry)) return true;
  if (options.allowDrafts && entry.status === 'draft') return true;
  return false;
}

export const PLACEHOLDER_TOKEN = '[CONTENT REQUIRED]';

export function containsPlaceholderToken(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.includes(PLACEHOLDER_TOKEN);
  }
  if (Array.isArray(value)) {
    return value.some(containsPlaceholderToken);
  }
  if (value && typeof value === 'object') {
    return Object.values(value).some(containsPlaceholderToken);
  }
  return false;
}

/** Best-effort patterns — does not guarantee confidentiality. */
export const suspiciousPatterns: RegExp[] = [
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bghp_[A-Za-z0-9]{36}\b/,
  /\bsk-[A-Za-z0-9]{20,}\b/,
  /\b(xox[baprs]-)[0-9A-Za-z-]{10,}\b/,
  /-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----/,
  /\b(internal|intranet|corp)\.[a-z0-9.-]+\b/i,
  /\b[a-z0-9-]+\.(local|internal|corp)\b/i,
];

export function findSuspiciousMatches(text: string): string[] {
  const hits: string[] = [];
  for (const pattern of suspiciousPatterns) {
    const match = text.match(pattern);
    if (match) hits.push(match[0]);
  }
  return hits;
}

export type FrontmatterParseSuccess = {
  ok: true;
  fields: PublishableFields;
  data: Record<string, unknown>;
  body: string;
};

export type FrontmatterParseFailure = {
  ok: false;
  error: string;
};

export type FrontmatterParseResult = FrontmatterParseSuccess | FrontmatterParseFailure;

/**
 * Extract YAML frontmatter between leading --- delimiters.
 * Supports LF and CRLF. Returns null when no frontmatter fence is present.
 */
export function extractFrontmatterBlock(raw: string): { yaml: string; body: string } | null {
  const normalized = raw.replace(/^\uFEFF/, '');
  if (!normalized.startsWith('---')) return null;
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  return { yaml: match[1], body: normalized.slice(match[0].length) };
}

function isPublicationStatus(value: unknown): value is PublicationStatus {
  return typeof value === 'string' && (PUBLICATION_STATUSES as readonly string[]).includes(value);
}

function isPublicationClassification(value: unknown): value is PublicationClassification {
  return (
    typeof value === 'string' &&
    (PUBLICATION_CLASSIFICATIONS as readonly string[]).includes(value)
  );
}

/**
 * Parse markdown/MDX frontmatter with a real YAML parser so quoted values,
 * comments and CRLF agree with Astro content loading.
 *
 * Parser / schema failures return `{ ok: false, error }` — callers must not
 * silently treat failure as an ordinary unpublished entry.
 */
export function parsePublishableFrontmatter(raw: string): FrontmatterParseResult {
  const block = extractFrontmatterBlock(raw);
  if (!block) {
    return { ok: false, error: 'Missing YAML frontmatter delimited by ---' };
  }

  let parsed: unknown;
  try {
    parsed = parseYaml(block.yaml);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: `Malformed YAML frontmatter: ${message}` };
  }

  if (parsed === null || parsed === undefined) {
    return { ok: false, error: 'Frontmatter YAML is empty' };
  }
  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ok: false, error: 'Frontmatter YAML must be a mapping of fields' };
  }

  const data = parsed as Record<string, unknown>;
  const { status, classification, approvedForPublication } = data;

  if (!isPublicationStatus(status)) {
    return {
      ok: false,
      error: `Invalid or missing status (expected one of: ${PUBLICATION_STATUSES.join(', ')})`,
    };
  }
  if (!isPublicationClassification(classification)) {
    return {
      ok: false,
      error: `Invalid or missing classification (expected one of: ${PUBLICATION_CLASSIFICATIONS.join(', ')})`,
    };
  }
  if (approvedForPublication !== undefined && typeof approvedForPublication !== 'boolean') {
    return {
      ok: false,
      error: 'approvedForPublication must be a YAML boolean (true/false), not a string',
    };
  }

  const fields: PublishableFields = { status, classification };
  if (typeof approvedForPublication === 'boolean') {
    fields.approvedForPublication = approvedForPublication;
  }

  return { ok: true, fields, data, body: block.body };
}

/** Astro content collection id: path relative to collection root, without extension. */
export function contentEntryIdFromPath(filePath: string, collectionRoot: string): string {
  const relative = filePath.startsWith(collectionRoot)
    ? filePath.slice(collectionRoot.length).replace(/^[/\\]/, '')
    : filePath;
  return relative.replace(/\.(md|mdx)$/i, '').split(/[/\\]/).join('/');
}
