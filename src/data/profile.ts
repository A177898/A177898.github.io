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
    'Connecting business strategy, platforms and technology transformation.',
  /**
   * Supporting homepage copy — architectural practice scope.
   */
  propositionSupport:
    'Architecture practice that translates strategic objectives into target-state architectures, transition roadmaps and reusable technology capabilities.',
  /** Kept for SEO / legacy references; prefer proposition on the homepage. */
  positioningStatement:
    'Connecting business strategy, platforms and technology transformation.',
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
    'His work spans enterprise architecture, solution architecture, technology strategy, platform and cloud architecture, integration, identity and security, and the responsible adoption of emerging technology — with an emphasis on architectural thinking, governance, and clear communication.',
  ] as const,
} as const;

/** Conceptual architecture lifecycle — homepage demonstration of scope. */
export const architectureLifecycle = [
  'Strategy',
  'Business Capabilities',
  'Target Architecture',
  'Transition Architecture',
  'Platforms & Solutions',
  'Governance',
] as const;

/** Architectural approach — independent methodology framing. */
export const architectureApproach = [
  {
    step: '01',
    title: 'Understand the business capability',
    description:
      'Start with outcomes, stakeholders, constraints and capabilities rather than technology.',
  },
  {
    step: '02',
    title: 'Establish architectural context',
    description:
      'Understand current state, dependencies, boundaries and strategic direction.',
  },
  {
    step: '03',
    title: 'Define the target state',
    description:
      'Establish principles, capabilities, information flows and technology direction.',
  },
  {
    step: '04',
    title: 'Make trade-offs explicit',
    description:
      'Evaluate alternatives across value, complexity, risk, cost, security and operability.',
  },
  {
    step: '05',
    title: 'Define the transition',
    description:
      'Translate target architecture into realistic transition states, dependencies and roadmaps.',
  },
  {
    step: '06',
    title: 'Govern the evolution',
    description:
      'Use decisions, standards, principles and feedback to maintain architectural integrity.',
  },
] as const;
