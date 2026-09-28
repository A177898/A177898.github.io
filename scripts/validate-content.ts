#!/usr/bin/env node
/**
 * Production content validation.
 * Fails the build when publication rules are violated.
 *
 * Automated scanning does not guarantee confidentiality.
 * Human publication review remains mandatory.
 *
 * Build order: this script runs before prune-unpublished-routes.ts so
 * malformed publication metadata fails validation before dist mutation.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PLACEHOLDER_TOKEN,
  findSuspiciousMatches,
  isPublished,
  parsePublishableFrontmatter,
  type PublishableFields,
} from '../src/utils/publication';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentRoot = path.join(root, 'src/content');
const isProduction = process.argv.includes('--production');

type Issue = { file: string; message: string };

async function walk(dir: string): Promise<string[]> {
  try {
    await stat(dir);
  } catch {
    return [];
  }
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

/** Focused combination checks used by production validation and helper tests. */
export function publicationCombinationIssues(
  fields: PublishableFields,
  options: { architectureVersion?: string } = {},
): string[] {
  const issues: string[] = [];
  const { status, classification, approvedForPublication } = fields;

  if (status === 'published' && approvedForPublication !== true) {
    issues.push(
      `Published ${classification} content requires approvedForPublication: true (explicit false or missing approval is not eligible)`,
    );
  }

  if (status === 'draft' && approvedForPublication === true) {
    if (isPublished(fields)) {
      issues.push(
        'Draft content must not be treated as published even when approvedForPublication is true',
      );
    }
  }

  if (options.architectureVersion) {
    if (isPublished({ ...fields, status: 'draft' })) {
      issues.push('architectureVersion must not change publication eligibility');
    }
  }

  return issues;
}

async function validateFile(file: string, issues: Issue[]): Promise<void> {
  const raw = await readFile(file, 'utf8');
  const rel = path.relative(root, file);
  const parsed = parsePublishableFrontmatter(raw);

  if (!parsed.ok) {
    issues.push({ file: rel, message: parsed.error });
    return;
  }

  const { fields, data, body } = parsed;
  const combined = `${JSON.stringify(data)}\n${body}`;

  if ((data.classification as string) === 'red') {
    issues.push({
      file: rel,
      message: 'RED content must never enter this repository',
    });
  }

  for (const message of publicationCombinationIssues(fields, {
    architectureVersion:
      typeof data.architectureVersion === 'string' ? data.architectureVersion : undefined,
  })) {
    issues.push({ file: rel, message });
  }

  if (fields.status === 'published') {
    if (combined.includes(PLACEHOLDER_TOKEN)) {
      issues.push({
        file: rel,
        message: `Published content must not contain ${PLACEHOLDER_TOKEN}`,
      });
    }

    const description = data.description ?? data.summary;
    if (typeof description !== 'string' || description.trim().length === 0) {
      issues.push({
        file: rel,
        message: 'Published content requires SEO description / summary metadata',
      });
    }

    const suspicious = findSuspiciousMatches(combined);
    for (const hit of suspicious) {
      issues.push({
        file: rel,
        message: `Suspicious pattern detected (manual review required): ${hit}`,
      });
    }
  }
}

async function main(): Promise<void> {
  const files = await walk(contentRoot);
  const issues: Issue[] = [];

  for (const file of files) {
    await validateFile(file, issues);
  }

  if (issues.length > 0) {
    console.error('\nContent validation failed:\n');
    for (const issue of issues) {
      console.error(`  • ${issue.file}: ${issue.message}`);
    }
    console.error(
      '\nAutomated scanning does not guarantee confidentiality. Human publication review remains mandatory.\n',
    );
    process.exit(1);
  }

  console.log(
    `Content validation passed (${files.length} file(s) scanned${isProduction ? ', production mode' : ''}).`,
  );
}

const isDirectRun =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isDirectRun) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
