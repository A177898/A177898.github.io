/**
 * Public profile fields — only information explicitly approved for publication.
 * Do not invent quantitative claims or employer-specific detail.
 */
export const profile = {
  fullName: 'Yusuf Kader',
  headline: 'Enterprise Architect',
  /**
   * Primary homepage proposition — strategic scope, not seniority assertion.
   */
  proposition:
    'Connecting business strategy, people, process and technology.',
  /**
   * Supporting homepage copy — architectural practice scope.
   */
  propositionSupport:
    'My enterprise architecture approach starts with Business Architecture: clarifying outcomes, capabilities and value streams before shaping information, data, application and technology architectures. This keeps technology decisions aligned with business priorities and translates direction into practical transition roadmaps.',
  /**
   * Plain-language explanation of enterprise architecture (BIDAT framing).
   * Prefer on About / practice; avoid repeating verbatim beside the proposition.
   */
  eaPlainLanguage:
    'Enterprise Architecture brings together Business, Information, Data, Application and Technology architectures to align business strategy and execution.',
  /** Kept for SEO / legacy references; prefer proposition on the homepage. */
  positioningStatement:
    'Connecting business strategy, people, process and technology.',
  careerArc: [
    'Software Engineering',
    'Technical Leadership',
    'Solution Architecture',
    'Enterprise Architecture',
  ] as const,
  /**
   * Parallel scope dimension for About — increasing architectural horizon.
   * Not a claim of specific job titles beyond the career arc.
   */
  scopeArc: ['Systems', 'Solutions', 'Platforms', 'Enterprise'] as const,
  aboutSummary: [
    'Yusuf Kader is an Enterprise Architect whose career has progressed from building systems, through designing solutions and platforms, to shaping enterprise technology direction.',
    'Enterprise Architecture brings together Business, Information, Data, Application and Technology architectures. Within EA, Business Architecture provides the business foundation — establishing direction that informs technology architecture decisions while domains iterate together.',
    'His work spans enterprise architecture — including Business Architecture as a critical EA domain — alongside solution architecture, technology strategy, platform and cloud architecture, integration, identity and security, and the responsible adoption of emerging technology, with an emphasis on architectural thinking, governance and clear communication.',
  ] as const,
} as const;

/**
 * Compact lifecycle labels for residual ArchitectureModel UI.
 * Primary model: src/data/ea-approach.ts.
 */
export const architectureLifecycle = [
  'Strategy',
  'Business Architecture (within EA)',
  'Information · Data · Application · Technology',
  'Target Architecture',
  'Transition Architecture',
  'Governance',
] as const;

/**
 * Compact supporting steps for residual UI.
 * Primary model: src/data/ea-approach.ts.
 */
export const architectureApproach = [
  {
    step: '01',
    title: 'Clarify business intent',
    description:
      'Start with strategy, outcomes and priorities before selecting technology.',
  },
  {
    step: '02',
    title: 'Establish business architecture within EA',
    description:
      'Clarify capabilities, value streams, processes and operating model as the business foundation of enterprise architecture.',
  },
  {
    step: '03',
    title: 'Align the BIDAT domains',
    description:
      'Connect Business, Information, Data, Application and Technology architectures, with people and process as cross-domain concerns.',
  },
  {
    step: '04',
    title: 'Define the target state',
    description:
      'Establish coherent direction across the EA domains without treating the work as a one-way waterfall.',
  },
  {
    step: '05',
    title: 'Plan the transition',
    description:
      'Sequence current-state assessment, target state, roadmap and delivery alignment.',
  },
  {
    step: '06',
    title: 'Govern and learn',
    description:
      'Use principles, security, risk and outcome feedback to keep architecture coherent.',
  },
] as const;
