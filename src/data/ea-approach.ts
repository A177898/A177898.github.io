/**
 * Personal Enterprise Architecture approach — positioning and explanatory model.
 * Conceptual synthesis only; not an employer framework, certification claim,
 * or inventory of delivered engagements.
 *
 * Hierarchy: EA is the parent discipline. BIDAT domains sit inside EA.
 * Business Architecture establishes business direction that informs
 * Technology Architecture — it does not sit outside EA.
 */

export const eaApproach = {
  title: 'My Enterprise Architecture Approach',
  subtitle: 'From business intent to coordinated change.',
  plainLanguage:
    'Enterprise Architecture brings together Business, Information, Data, Application and Technology architectures to align business strategy and execution.',
  principle:
    'Within EA, Business Architecture establishes the business direction that informs Technology Architecture.',
  synthesisNote:
    'A personal synthesis informed by TOGAF and Zachman. BIDAT is used here as a clear domain framing for this approach — not as a claim that every EA standard uses identical domain labels.',
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
    bidat: {
      label: 'BIDAT (conceptual)',
      href: 'https://www.realirm.com/what-is-ea',
      summary:
        'Business, Information, Data, Application and Technology architectures as connected EA domains — used here as an explanatory framing, not an employer standard.',
    },
  },
  businessIntent: {
    label: 'Business strategy and intended outcomes',
    items: [
      'Strategy',
      'Customer and stakeholder outcomes',
      'Business priorities',
    ] as const,
  },
  eaBoundary: {
    label: 'Enterprise Architecture',
    role: 'Overarching discipline',
  },
  businessArchitecture: {
    label: 'Business Architecture',
    role: 'Business foundation within EA',
    items: [
      'Outcomes',
      'Capabilities',
      'Value streams',
      'Processes',
      'Operating model',
    ] as const,
    directionNote: 'Business direction',
    explanation:
      'Business Architecture provides the business foundation within EA: clarifying outcomes, capabilities and value streams so information, data, application and technology architecture decisions follow business priorities — domains still iterate and feed back.',
  },
  bidatDomains: [
    {
      id: 'information',
      title: 'Information Architecture',
      short: 'Information',
      description: 'Business meaning, information needs and information flows.',
    },
    {
      id: 'data',
      title: 'Data Architecture',
      short: 'Data',
      description: 'Data structures, ownership, quality and lifecycle.',
    },
    {
      id: 'application',
      title: 'Application Architecture',
      short: 'Application',
      description: 'Application responsibilities, services and interactions.',
    },
    {
      id: 'technology',
      title: 'Technology Architecture',
      short: 'Technology Architecture',
      description: 'Infrastructure, runtime environments and technical platforms.',
    },
  ] as const,
  crossDomain: {
    label: 'Cross-domain alignment',
    note:
      'People, process and technology concerns cut across the BIDAT domains — they do not replace those domains.',
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
        id: 'technology-concern',
        title: 'Technology (alignment)',
        description:
          'How technology choices support people and process — distinct from the Technology Architecture domain.',
      },
    ] as const,
  },
  spanning: {
    label: 'Spanning concerns',
    items: ['Governance', 'Principles', 'Security', 'Risk'] as const,
  },
  transition: {
    label: 'Making change achievable',
    steps: [
      'Target states',
      'Transition roadmaps',
      'Delivery alignment',
    ] as const,
  },
  outcomes: {
    label: 'Business outcomes and feedback',
    framing: 'Intended outcomes — not claims of measured results.',
    items: [
      'Customer value',
      'Operational effectiveness',
      'Resilience',
      'Adaptability',
    ] as const,
    feedback:
      'Outcomes inform business direction, and the BIDAT domains iterate — the approach is cyclical, not a one-way waterfall.',
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
      question: 'Where does Business Architecture fit?',
      answer:
        'Inside Enterprise Architecture as a critical BIDAT domain. It provides the business foundation within EA and establishes direction that informs Technology Architecture — not a discipline outside EA.',
    },
    {
      question: 'How do the BIDAT domains connect?',
      answer:
        'Business Architecture sets business direction; Information, Data, Application and Technology architectures then align around that direction, iterating together rather than finishing in a strict sequence.',
    },
    {
      question: 'How do people, process and technology relate?',
      answer:
        'As cross-domain alignment concerns that complement the five BIDAT domains — they do not replace Business, Information, Data, Application or Technology Architecture.',
    },
    {
      question: 'How does this translate into practical change?',
      answer:
        'Through target states, transition roadmaps and delivery alignment — with feedback from outcomes back to business direction.',
    },
  ] as const,
} as const;
