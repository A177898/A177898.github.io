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
   * Homepage hero credibility line — career progression signal, not a second headline.
   * Distinct from Experience/About leads: domains spanned, not role/scope rails.
   * No tenure metrics or comparative claims.
   */
  careerCredibility:
    'From software engineering to enterprise architecture — experience spanning transactional systems, digital engineering, technical leadership, solution architecture and enterprise technology strategy.',
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
  /**
   * About page narrative — synthesises approved Experience history into stages.
   * Not a chronology of every role; no invented achievements or metrics.
   * Distinct from homepage BIDAT positioning and Experience timeline detail.
   */
  aboutOpening:
    'I am an Enterprise Architect whose perspective was shaped through progressively broader levels of responsibility — from building enterprise systems to shaping technology direction across solutions, platforms and the enterprise.',
  aboutStory: [
    {
      title: 'Engineering foundations',
      text: 'Enterprise software engineering in transactional environments established discipline in structured development, systems thinking, integration and the practical consequences of change in large technology estates.',
    },
    {
      title: 'Broader digital delivery',
      text: 'Full-stack digital engineering and DevOps work expanded that view across user-facing applications, backend services, integrations and operational concerns — showing how delivery realities shape complete digital solutions.',
    },
    {
      title: 'Technical leadership',
      text: 'Technical leadership shifted the question from how to implement a component toward how a solution should be designed, governed and delivered coherently across engineers and solution parts.',
    },
    {
      title: 'Architecture and innovation',
      text: 'Architecture and innovation work widened the lens from individual applications toward technology patterns, emerging capabilities and the enterprise context in which those choices must be evaluated.',
    },
    {
      title: 'Solution architecture',
      text: 'Solution architecture broadened responsibility across interconnected capabilities and platforms — integrating cloud, identity, security and target-state direction so decisions were made in context rather than in isolation.',
    },
    {
      title: 'Enterprise architecture',
      text: 'Enterprise architecture extends that scope toward strategy, capabilities, target states, transition architectures, roadmaps and governance — translating strategic intent into coherent and executable technology direction.',
    },
  ] as const,
  aboutClosing:
    'That progression — from systems through solutions and platforms to enterprise — is what informs how I connect business strategy, people, process and technology today.',
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
