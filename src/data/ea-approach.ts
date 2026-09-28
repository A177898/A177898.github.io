/**
 * Personal Enterprise Architecture approach — positioning and explanatory model.
 * Conceptual synthesis only; not an employer framework, certification claim,
 * or inventory of delivered engagements.
 */

export const eaApproach = {
  title: 'My Enterprise Architecture Approach',
  subtitle: 'From business intent to coordinated change.',
  plainLanguage:
    'Enterprise architecture connects strategy to execution by aligning people, processes, information and technology around business outcomes.',
  synthesisNote: 'A personal synthesis informed by TOGAF and Zachman.',
  frameworks: {
    togaf: {
      label: 'TOGAF',
      href: 'https://www.opengroup.org/togaf',
      summary:
        'Referenced for architecture development, business/data/application/technology alignment, transition planning and governance — not as a reproduced ADM diagram.',
    },
    zachman: {
      label: 'Zachman',
      href: 'https://zachman-feac.com/zachman/about-the-zachman-framework/',
      summary:
        'Referenced for complementary perspectives and the questions Why, What, How, Who, Where and When — not as a delivery lifecycle or reproduced matrix.',
    },
  },
  businessIntent: {
    label: 'Business intent',
    items: [
      'Strategy',
      'Customer and stakeholder outcomes',
      'Business priorities',
    ] as const,
  },
  foundation: {
    label: 'Business architecture',
    role: 'Foundation',
    items: ['Capabilities', 'Value streams', 'Operating model'] as const,
    explanation:
      'Business architecture clarifies outcomes, capabilities and value streams so information, application, platform and technology choices follow business intent rather than precede it.',
  },
  dimensions: {
    label: 'Connected dimensions',
    items: [
      {
        id: 'people',
        title: 'People',
        description:
          'Roles, skills, ownership, decision rights and adoption.',
      },
      {
        id: 'process',
        title: 'Process',
        description:
          'Value delivery, workflows, controls and operational improvement.',
      },
      {
        id: 'technology',
        title: 'Technology',
        description:
          'Applications, platforms, integration and infrastructure.',
      },
    ] as const,
  },
  information: {
    label: 'Information and data',
    description:
      'A shared concern connecting people, process and technology — not buried inside infrastructure alone.',
  },
  spanning: {
    label: 'Spanning concerns',
    items: ['Governance', 'Principles', 'Security', 'Risk'] as const,
  },
  transition: {
    label: 'Making change achievable',
    steps: [
      'Current-state assessment',
      'Target state',
      'Prioritised roadmap',
      'Delivery alignment',
    ] as const,
  },
  outcomes: {
    label: 'Value and feedback',
    framing: 'Intended outcomes — not claims of measured results.',
    items: [
      'Customer value',
      'Operational effectiveness',
      'Resilience',
      'Adaptability',
    ] as const,
    feedback:
      'Outcomes inform strategy so the approach remains cyclical rather than a one-way waterfall.',
  },
  typicalOutputs: {
    title: 'Typical outputs',
    framing:
      'Illustrative architectural outputs of this approach — presented as the kinds of artefacts that support decisions, not as a portfolio of completed client deliverables.',
    items: [
      'Capability maps',
      'Value-stream views',
      'Target-state models',
      'Architecture decisions',
      'Transition roadmaps',
    ] as const,
  },
  supportsDecisions: [
    {
      question: 'Where does business architecture fit?',
      answer:
        'As the foundation: it clarifies outcomes, capabilities, value streams and operating model before technology specialisms are fixed.',
    },
    {
      question: 'How do people, process and technology connect?',
      answer:
        'As three equal dimensions, joined by information and data, with governance, principles, security and risk spanning the whole.',
    },
    {
      question: 'How does this translate into practical change?',
      answer:
        'Through current-state assessment, target state, a prioritised roadmap and delivery alignment — with feedback from outcomes back to strategy.',
    },
    {
      question: 'What architectural outputs support decisions?',
      answer:
        'Capability maps, value-stream views, target-state models, architecture decisions and transition roadmaps.',
    },
  ] as const,
} as const;
