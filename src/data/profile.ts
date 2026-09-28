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
    'My approach starts with business architecture: clarifying outcomes, capabilities and value streams, then aligning people, processes, information and technology through coherent target states and practical transition roadmaps.',
  /**
   * Plain-language explanation of enterprise architecture.
   * Prefer on About / practice; avoid repeating verbatim beside the proposition.
   */
  eaPlainLanguage:
    'Enterprise architecture connects strategy to execution by aligning people, processes, information and technology around business outcomes.',
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
    'Enterprise architecture, in this framing, connects strategy to execution by aligning people, processes, information and technology around business outcomes — with business architecture as the foundation.',
    'His work spans business and enterprise architecture, solution architecture, technology strategy, platform and cloud architecture, integration, identity and security, and the responsible adoption of emerging technology — with an emphasis on architectural thinking, governance, and clear communication.',
  ] as const,
} as const;

/**
 * Compact lifecycle labels for residual ArchitectureModel UI.
 * Primary model: src/data/ea-approach.ts.
 */
export const architectureLifecycle = [
  'Strategy',
  'Business Architecture',
  'People · Process · Technology',
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
    title: 'Establish business architecture',
    description:
      'Clarify capabilities, value streams, processes and operating model.',
  },
  {
    step: '03',
    title: 'Align people, process and technology',
    description:
      'Treat the three dimensions equally, with information and data as a shared concern.',
  },
  {
    step: '04',
    title: 'Define the target state',
    description:
      'Establish coherent direction across information, applications, platforms and technology.',
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
