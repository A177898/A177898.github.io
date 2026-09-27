#!/usr/bin/env node
/**
 * Focused publication helper + production-output simulation tests.
 *
 * Helper tests use disposable in-memory / temp fixtures only.
 * Production-output simulation uses a temporary dist tree — not real historical
 * content entries and not the live dist/ directory.
 *
 * Distinguishes:
 * - Helper tests: parsePublishableFrontmatter / isPublished combinations
 * - Production-output verification: pruneDistForEntries keeps approved published
 *   fixtures and removes draft/unapproved fixtures
 */
import { mkdir, mkdtemp, rm, writeFile, readFile, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  contentEntryIdFromPath,
  isPublished,
  parsePublishableFrontmatter,
  type PublishableFields,
} from '../src/utils/publication';
import { publicationCombinationIssues } from './validate-content';
import {
  pruneDistForEntries,
  type ContentEntryMeta,
} from './prune-unpublished-routes';

type Check = { name: string; pass: boolean; detail?: string };

const checks: Check[] = [];

function assert(name: string, condition: boolean, detail?: string): void {
  checks.push({ name, pass: condition, detail });
}

function doc(frontmatter: string, body = 'Body.\n'): string {
  return `---\n${frontmatter}\n---\n${body}`;
}

function expectFields(
  name: string,
  raw: string,
  expected: Partial<PublishableFields> & { published?: boolean },
): void {
  const result = parsePublishableFrontmatter(raw);
  if (!result.ok) {
    assert(name, false, result.error);
    return;
  }
  const { fields } = result;
  const published = isPublished(fields);
  const statusOk = expected.status === undefined || fields.status === expected.status;
  const classOk =
    expected.classification === undefined ||
    fields.classification === expected.classification;
  const approvalOk =
    expected.approvedForPublication === undefined ||
    fields.approvedForPublication === expected.approvedForPublication;
  const publishedOk =
    expected.published === undefined || published === expected.published;
  assert(
    name,
    statusOk && classOk && approvalOk && publishedOk,
    JSON.stringify({ fields, published }),
  );
}

function expectParseError(name: string, raw: string, includes?: string): void {
  const result = parsePublishableFrontmatter(raw);
  assert(
    name,
    !result.ok && (includes ? result.error.includes(includes) : true),
    result.ok ? 'expected failure' : result.error,
  );
}

/** ---- Experience period helpers ---- */
async function runExperiencePeriodTests(): Promise<void> {
  const { formatExperiencePeriod } = await import('../src/utils/experience');
  assert(
    'pending appointment never uses Present',
    formatExperiencePeriod({ start: 'Oct 2026' }, { pendingAppointment: true }) ===
      'Effective Oct 2026',
  );
  assert(
    'ended role uses start — end',
    formatExperiencePeriod({ start: 'Jan 2020', end: 'Sep 2026' }) === 'Jan 2020 — Sep 2026',
  );
  assert(
    'ongoing role without pending uses Present',
    formatExperiencePeriod({ start: 'Jan 2020' }) === 'Jan 2020 — Present',
  );
}

/** ---- Helper tests ---- */
function runHelperTests(): void {
  const combos: { fields: PublishableFields; published: boolean }[] = [
    { fields: { status: 'published', classification: 'green', approvedForPublication: true }, published: true },
    { fields: { status: 'published', classification: 'amber', approvedForPublication: true }, published: true },
    { fields: { status: 'published', classification: 'green', approvedForPublication: false }, published: false },
    { fields: { status: 'published', classification: 'amber', approvedForPublication: false }, published: false },
    { fields: { status: 'published', classification: 'green' }, published: false },
    { fields: { status: 'draft', classification: 'green', approvedForPublication: true }, published: false },
    { fields: { status: 'draft', classification: 'green', approvedForPublication: false }, published: false },
    { fields: { status: 'placeholder', classification: 'green', approvedForPublication: true }, published: false },
  ];
  for (const combo of combos) {
    assert(
      `combo ${JSON.stringify(combo.fields)}`,
      isPublished(combo.fields) === combo.published,
    );
    const issues = publicationCombinationIssues(combo.fields, {
      architectureVersion: '0.2',
    });
    if (combo.fields.status === 'published' && combo.fields.approvedForPublication !== true) {
      assert(`combo issues for unapproved published`, issues.length > 0);
    }
  }

  assert(
    'architectureVersion does not publish drafts',
    !isPublished({
      status: 'draft',
      classification: 'green',
      approvedForPublication: true,
    }),
  );

  expectFields(
    'unquoted status/classification',
    doc('status: published\nclassification: green\napprovedForPublication: true'),
    { status: 'published', classification: 'green', approvedForPublication: true, published: true },
  );
  expectFields(
    'double-quoted status',
    doc('status: "published"\nclassification: "green"\napprovedForPublication: true'),
    { status: 'published', classification: 'green', approvedForPublication: true, published: true },
  );
  expectFields(
    'single-quoted status',
    doc("status: 'published'\nclassification: 'amber'\napprovedForPublication: true"),
    { status: 'published', classification: 'amber', approvedForPublication: true, published: true },
  );

  expectFields(
    'inline YAML comments',
    doc(
      'status: published # live\nclassification: green # safe\napprovedForPublication: false # hold',
    ),
    { status: 'published', classification: 'green', approvedForPublication: false, published: false },
  );

  expectFields(
    'CRLF frontmatter',
    '---\r\nstatus: draft\r\nclassification: green\r\napprovedForPublication: false\r\n---\r\nBody\r\n',
    { status: 'draft', classification: 'green', approvedForPublication: false, published: false },
  );

  expectFields(
    'missing approval on published',
    doc('status: published\nclassification: green'),
    { status: 'published', classification: 'green', published: false },
  );

  expectFields(
    'YAML boolean false',
    doc('status: published\nclassification: green\napprovedForPublication: false'),
    { approvedForPublication: false, published: false },
  );
  expectParseError(
    'string "false" rejected',
    doc('status: published\nclassification: green\napprovedForPublication: "false"'),
    'boolean',
  );

  expectParseError('malformed YAML', '---\nstatus: [published\nclassification: green\n---\n', 'Malformed');
  expectParseError(
    'invalid status',
    doc('status: live\nclassification: green'),
    'Invalid or missing status',
  );
  expectParseError(
    'invalid classification',
    doc('status: draft\nclassification: red'),
    'Invalid or missing classification',
  );
  expectParseError('missing frontmatter', 'No fence\n', 'Missing YAML frontmatter');

  const collectionRoot = '/repo/src/content/architectures';
  assert(
    'flat content id',
    contentEntryIdFromPath(
      `${collectionRoot}/enterprise-authorization.mdx`,
      collectionRoot,
    ) === 'enterprise-authorization',
  );
  assert(
    'nested content id',
    contentEntryIdFromPath(
      `${collectionRoot}/domain/payments.mdx`,
      collectionRoot,
    ) === 'domain/payments',
  );
}

async function runProductionOutputSimulation(): Promise<void> {
  const tmp = await mkdtemp(path.join(os.tmpdir(), 'portfolio-pub-'));
  const distRoot = path.join(tmp, 'dist');

  const approved: ContentEntryMeta = {
    id: 'approved-fixture',
    file: path.join(tmp, 'approved-fixture.mdx'),
    fields: {
      status: 'published',
      classification: 'green',
      approvedForPublication: true,
    },
    published: true,
  };
  const draft: ContentEntryMeta = {
    id: 'draft-fixture',
    file: path.join(tmp, 'draft-fixture.mdx'),
    fields: {
      status: 'draft',
      classification: 'green',
      approvedForPublication: false,
    },
    published: false,
  };
  const unapprovedPublished: ContentEntryMeta = {
    id: 'unapproved-published-fixture',
    file: path.join(tmp, 'unapproved-published-fixture.mdx'),
    fields: {
      status: 'published',
      classification: 'green',
      approvedForPublication: false,
    },
    published: false,
  };

  const nestedDraft: ContentEntryMeta = {
    id: 'nested/draft-child',
    file: path.join(tmp, 'nested-draft.mdx'),
    fields: {
      status: 'draft',
      classification: 'green',
      approvedForPublication: true,
    },
    published: false,
  };

  await mkdir(path.join(distRoot, 'architecture', 'reference', approved.id), {
    recursive: true,
  });
  await writeFile(
    path.join(distRoot, 'architecture', 'reference', approved.id, 'index.html'),
    '<html>approved</html>',
  );
  await mkdir(path.join(distRoot, 'architecture', 'reference', draft.id), {
    recursive: true,
  });
  await writeFile(
    path.join(distRoot, 'architecture', 'reference', draft.id, 'index.html'),
    '<html>draft</html>',
  );
  await mkdir(
    path.join(distRoot, 'architecture', 'reference', unapprovedPublished.id),
    { recursive: true },
  );
  await writeFile(
    path.join(
      distRoot,
      'architecture',
      'reference',
      unapprovedPublished.id,
      'index.html',
    ),
    '<html>unapproved</html>',
  );
  await mkdir(path.join(distRoot, 'research', nestedDraft.id), { recursive: true });
  await writeFile(
    path.join(distRoot, 'research', nestedDraft.id, 'index.html'),
    '<html>nested draft</html>',
  );
  await mkdir(path.join(distRoot, 'architecture', 'radar'), { recursive: true });
  await mkdir(path.join(distRoot, 'experience'), { recursive: true });
  await writeFile(
    path.join(distRoot, 'experience', 'index.html'),
    '<html>experience index</html>',
  );
  await writeFile(
    path.join(distRoot, 'robots.txt'),
    'User-agent: *\nAllow: /\n\nSitemap: /sitemap-index.xml\n',
  );
  await writeFile(
    path.join(distRoot, 'sitemap-0.xml'),
    [
      '<?xml version="1.0" encoding="UTF-8"?><urlset>',
      '<url><loc>https://fixture.test/experience/</loc></url>',
      '<url><loc>https://fixture.test/architecture/reference/approved-fixture/</loc></url>',
      '<url><loc>https://fixture.test/architecture/reference/draft-fixture/</loc></url>',
      '<url><loc>https://fixture.test/architecture/reference/unapproved-published-fixture/</loc></url>',
      '<url><loc>https://fixture.test/research/nested/draft-child/</loc></url>',
      '<url><loc>https://fixture.test/architecture/radar/</loc></url>',
      '</urlset>',
    ].join(''),
  );

  await pruneDistForEntries({
    distRoot,
    experience: [],
    perspectives: [nestedDraft],
    architectures: [approved, draft, unapprovedPublished],
    radarPublished: false,
    siteOrigin: 'https://fixture.test',
  });

  async function exists(p: string): Promise<boolean> {
    try {
      await stat(p);
      return true;
    } catch {
      return false;
    }
  }

  assert(
    'approved published fixture remains in generated output',
    await exists(
      path.join(distRoot, 'architecture', 'reference', approved.id, 'index.html'),
    ),
  );
  assert(
    'draft fixture excluded from generated output',
    !(await exists(path.join(distRoot, 'architecture', 'reference', draft.id))),
  );
  assert(
    'unapproved published fixture excluded',
    !(await exists(
      path.join(distRoot, 'architecture', 'reference', unapprovedPublished.id),
    )),
  );
  assert(
    'nested draft fixture excluded',
    !(await exists(path.join(distRoot, 'research', nestedDraft.id))),
  );
  assert(
    'empty experience section pruned when no published experience',
    !(await exists(path.join(distRoot, 'experience'))),
  );
  assert(
    'empty research section pruned when no published perspectives',
    !(await exists(path.join(distRoot, 'research'))),
  );
  assert(
    'radar pruned when unpublished',
    !(await exists(path.join(distRoot, 'architecture', 'radar'))),
  );

  const sitemap = await readFile(path.join(distRoot, 'sitemap-0.xml'), 'utf8');
  assert('sitemap retains approved fixture', sitemap.includes('approved-fixture'));
  assert('sitemap drops draft fixture', !sitemap.includes('draft-fixture'));
  assert(
    'sitemap drops unapproved published fixture',
    !sitemap.includes('unapproved-published-fixture'),
  );
  assert('sitemap drops nested draft', !sitemap.includes('nested/draft-child'));
  assert('sitemap drops radar', !sitemap.includes('/architecture/radar'));
  assert('sitemap drops experience when empty', !sitemap.includes('/experience'));

  const robots = await readFile(path.join(distRoot, 'robots.txt'), 'utf8');
  assert(
    'robots.txt uses configured site origin',
    robots.includes('Sitemap: https://fixture.test/sitemap-index.xml'),
  );
  assert('robots.txt has no example.com', !robots.includes('example.com'));

  const badPath = path.join(tmp, 'bad.mdx');
  await writeFile(badPath, '---\nstatus: [broken\n---\n');
  let threw = false;
  try {
    const parsed = parsePublishableFrontmatter(await readFile(badPath, 'utf8'));
    if (!parsed.ok) threw = true;
  } catch {
    threw = true;
  }
  assert('malformed fixture surfaces parse failure (not silent unpublished)', threw);

  await rm(tmp, { recursive: true, force: true });
}

async function main(): Promise<void> {
  console.log('Running publication helper tests…');
  runHelperTests();
  console.log('Running experience period helper tests…');
  await runExperiencePeriodTests();
  console.log('Running production-output simulation tests…');
  await runProductionOutputSimulation();

  const failed = checks.filter((check) => !check.pass);
  for (const check of checks) {
    const mark = check.pass ? 'PASS' : 'FAIL';
    console.log(`  [${mark}] ${check.name}${check.detail && !check.pass ? ` — ${check.detail}` : ''}`);
  }

  if (failed.length > 0) {
    console.error(`\n${failed.length} publication test(s) failed.`);
    process.exit(1);
  }

  console.log(`\nPublication tests passed (${checks.length} checks).`);
  console.log(
    'Note: helper tests ≠ live dist verification. Run npm run build separately for real production exclusion.',
  );
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
