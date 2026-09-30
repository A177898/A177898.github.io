/**
 * Architecture Practice capability model — generic and capability-oriented.
 *
 * Enterprise Architecture is the parent discipline. Within EA, five BIDAT
 * domains connect Business, Information, Data, Application and Technology
 * architecture. Platform, cloud, integration, identity/security and emerging
 * technology remain supporting specialisms — not BIDAT domains.
 *
 * Descriptions emphasise principles and decision-making, not glossary definitions.
 * Do not invent personal delivery experience or imply equal specialist depth
 * in every domain.
 *
 * Optional relatedPerspectives / relatedArchitectures use content collection IDs.
 * Production surfaces honour publication eligibility when rendering those links.
 */

export type CapabilityItem = {
  name: string;
  description: string;
};

export type CapabilityDomain = {
  id: string;
  title: string;
  summary: string;
  capabilities: CapabilityItem[];
  /** Perspective content IDs (route remains /research/:id). */
  relatedPerspectives?: string[];
  /** Reference architecture content IDs. */
  relatedArchitectures?: string[];
  /** Nested BIDAT domains when this entry is the EA parent. */
  bidatDomains?: CapabilityDomain[];
};

const bidatDomains: CapabilityDomain[] = [
  {
    id: 'business-architecture',
    title: 'Business Architecture',
    summary:
      'Critical EA domain: outcomes, capabilities, value streams, processes and operating model — establishing business direction that informs technology architecture decisions.',
    relatedPerspectives: ['from-target-state-to-transition-architecture'],
    capabilities: [
      {
        name: 'Strategic Outcomes & Priorities',
        description:
          'Anchor architecture in the outcomes and priorities the enterprise must achieve, not the systems it already operates.',
      },
      {
        name: 'Business Capabilities',
        description:
          'Describe what the organisation needs to be able to do — the stable structure for investment and design decisions.',
      },
      {
        name: 'Value Streams',
        description:
          'Show how value reaches customers and stakeholders, revealing where architecture should reduce friction or strengthen flow.',
      },
      {
        name: 'Processes',
        description:
          'Clarify how work is performed so technology and organisation design support the way value is actually created.',
      },
      {
        name: 'Operating Models',
        description:
          'Align people, accountability and ways of working with the capabilities and value streams the enterprise depends on.',
      },
      {
        name: 'Capability Gaps & Investment Priorities',
        description:
          'Make gaps and sequencing visible so investment strengthens the capabilities that matter most.',
      },
    ],
  },
  {
    id: 'information-architecture',
    title: 'Information Architecture',
    summary:
      'EA domain focused on business meaning, information needs and information flows that connect people, process and systems.',
    capabilities: [
      {
        name: 'Business Meaning',
        description:
          'Clarify the concepts and language the enterprise uses so architecture decisions rest on shared meaning.',
      },
      {
        name: 'Information Needs',
        description:
          'Identify what information stakeholders require to operate, decide and assure outcomes.',
      },
      {
        name: 'Information Flows',
        description:
          'Describe how information moves across capabilities and boundaries without collapsing into a data-store catalogue.',
      },
    ],
  },
  {
    id: 'data-architecture',
    title: 'Data Architecture',
    summary:
      'EA domain focused on data structures, ownership, quality and lifecycle — distinct from business information meaning.',
    capabilities: [
      {
        name: 'Data Structures',
        description:
          'Shape how data is organised so it can support applications, analytics and operational use coherently.',
      },
      {
        name: 'Ownership & Accountability',
        description:
          'Make clear who is accountable for data products, definitions and fitness for purpose.',
      },
      {
        name: 'Quality & Lifecycle',
        description:
          'Treat quality, retention and change as architectural concerns, not only operational tasks.',
      },
    ],
  },
  {
    id: 'application-architecture',
    title: 'Application Architecture',
    summary:
      'EA domain focused on application responsibilities, services and interactions that realise capabilities.',
    capabilities: [
      {
        name: 'Application Responsibilities',
        description:
          'Assign clear ownership of capability support so applications do not compete for the same outcomes.',
      },
      {
        name: 'Services & Interfaces',
        description:
          'Define how applications expose and consume services in line with enterprise boundaries.',
      },
      {
        name: 'Application Interactions',
        description:
          'Make dependencies and integration paths explicit so change remains governable.',
      },
    ],
  },
  {
    id: 'technology-architecture',
    title: 'Technology Architecture',
    summary:
      'EA domain focused on infrastructure, runtime environments and technical platforms — informed by business direction, not preceding it.',
    capabilities: [
      {
        name: 'Infrastructure & Runtime',
        description:
          'Shape environments that host applications with deliberate attention to resilience and operability.',
      },
      {
        name: 'Technical Platforms',
        description:
          'Identify shared technical platforms that enable delivery without dictating business design.',
      },
      {
        name: 'Technology Standards',
        description:
          'Set durable technical direction that remains subordinate to business and capability priorities.',
      },
    ],
  },
];

/** Parent EA discipline containing BIDAT domains. */
export const enterpriseArchitecturePractice: CapabilityDomain = {
  id: 'enterprise-architecture',
  title: 'Enterprise Architecture',
  summary:
    'The overarching discipline that brings together Business, Information, Data, Application and Technology architectures to align business strategy and execution. Strategy alignment, target states, transition planning, roadmaps and governance span these domains.',
  relatedPerspectives: ['from-target-state-to-transition-architecture'],
  bidatDomains,
  capabilities: [
    {
      name: 'Strategy-to-Execution Alignment',
      description:
        'Translate business intent into architectural direction that delivery programmes can act on across the BIDAT domains.',
    },
    {
      name: 'Target-State Architecture',
      description:
        'Establish a coherent future state across EA domains while keeping the transition path realistic and governable.',
    },
    {
      name: 'Transition Architecture',
      description:
        'Sequence change through intermediate states that protect continuity and make dependencies explicit.',
    },
    {
      name: 'Roadmapping',
      description:
        'Order lasting change across capabilities, platforms, products and programmes so ambition stays deliverable.',
    },
    {
      name: 'Architecture Governance',
      description:
        'Sustain integrity through principles, decision rights and review practices that scale beyond individual projects.',
    },
  ],
};

/** Supporting technology specialisms — not the BIDAT domain set. */
export const supportingSpecialisms: CapabilityDomain[] = [
  {
    id: 'platform-architecture',
    title: 'Platform Architecture',
    summary:
      'Design shared capabilities and operating models that accelerate product teams without creating a central bottleneck — in service of broader enterprise outcomes.',
    relatedPerspectives: ['designing-platforms-as-enterprise-capabilities'],
    capabilities: [
      {
        name: 'Platform Strategy',
        description:
          'Clarify what the platform should own, what it should enable, and how adoption creates durable value.',
      },
      {
        name: 'Shared Platform Capabilities',
        description:
          'Identify cross-cutting capabilities worth centralising — and resist centralising what should stay local.',
      },
      {
        name: 'Developer Platforms',
        description:
          'Provide paved paths and self-service so teams move faster within clear architectural guardrails.',
      },
      {
        name: 'Distributed Systems',
        description:
          'Shape service topologies and boundaries for reliability, autonomy and operational clarity.',
      },
      {
        name: 'Platform Operating Models',
        description:
          'Align ownership, funding and ways of working with the platform’s intended role in the enterprise.',
      },
    ],
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture',
    summary:
      'Apply cloud-native and hybrid patterns with deliberate attention to resilience, governance and operational reality.',
    capabilities: [
      {
        name: 'Cloud-Native Architecture',
        description:
          'Design for elasticity and evolutionary change while keeping architectural intent visible through the noise of services.',
      },
      {
        name: 'Hybrid Cloud',
        description:
          'Integrate estates with clear boundaries so hybrid is a design choice, not an accidental compromise.',
      },
      {
        name: 'Containers',
        description:
          'Use packaging and orchestration where they improve portability and control — not as an end in themselves.',
      },
      {
        name: 'Resilience',
        description:
          'Plan for failure domains, recovery and continuity as first-order architectural concerns.',
      },
      {
        name: 'Cloud Governance',
        description:
          'Set guardrails for cost, security, compliance and fitness that enable speed rather than merely constrain it.',
      },
    ],
  },
  {
    id: 'integration-architecture',
    title: 'Integration Architecture',
    summary:
      'Connect domains through deliberate interface choices — APIs, events and boundaries that protect autonomy.',
    capabilities: [
      {
        name: 'API Architecture',
        description:
          'Design interfaces that are purposeful, stable and aligned to the capabilities they expose.',
      },
      {
        name: 'Event-Driven Architecture',
        description:
          'Use events where decoupling improves resilience and evolution — and avoid them where coupling is clearer.',
      },
      {
        name: 'Enterprise Integration',
        description:
          'Select integration styles that match latency, consistency and ownership realities.',
      },
      {
        name: 'Service Boundaries',
        description:
          'Define contracts and ownership so autonomy remains intentional rather than accidental.',
      },
    ],
  },
  {
    id: 'identity-security',
    title: 'Identity & Security',
    summary:
      'Treat identity as a foundational control plane — establishing trust, separating authentication from authorization, and enforcing consistent policy without collapsing domain autonomy.',
    relatedPerspectives: ['enterprise-authorization-beyond-rbac'],
    relatedArchitectures: ['enterprise-authorization'],
    capabilities: [
      {
        name: 'Trust & Identity Context',
        description:
          'Establish who or what is acting, with assurance matched to risk — so downstream decisions inherit a clear identity context rather than reconstructing trust ad hoc.',
      },
      {
        name: 'Authentication vs Authorization',
        description:
          'Keep verification of identity separate from entitlement decisions. Authentication answers “who”; authorization answers “what is permitted”, and the two must not be conflated.',
      },
      {
        name: 'Least Privilege & Policy Enforcement',
        description:
          'Default to deny, grant the minimum necessary, and enforce policy consistently at the point of use so control remains reviewable rather than scattered through application logic.',
      },
      {
        name: 'Secure-by-Design Controls',
        description:
          'Bake security into interfaces, platforms and runtime paths — reusable controls that teams adopt because they are clear, not because they are bolted on after delivery.',
      },
      {
        name: 'Consistency with Domain Autonomy',
        description:
          'Centralise the decision consistency that must be shared; leave domain-specific entitlement meaning where ownership and accountability belong.',
      },
    ],
  },
  {
    id: 'ai-emerging',
    title: 'AI & Emerging Technology',
    summary:
      'Adopt emerging technology — including generative AI — with architectural clarity, governance and a clear view of value.',
    capabilities: [
      {
        name: 'Enterprise AI Adoption',
        description:
          'Distinguish durable enterprise value from experimentation that should remain bounded.',
      },
      {
        name: 'Generative AI',
        description:
          'Integrate generative capabilities into platforms with deliberate controls for quality, risk and reuse.',
      },
      {
        name: 'AI Architecture',
        description:
          'Structure data, models, orchestration and operations so AI capabilities remain coherent and operable.',
      },
      {
        name: 'AI Governance',
        description:
          'Establish accountability, quality and risk practices before scale obscures ownership.',
      },
      {
        name: 'Emerging Technology Assessment',
        description:
          'Evaluate new technologies against strategy, architectural fit and the cost of commitment.',
      },
    ],
  },
];

/**
 * Flat lookup list for related-content resolution.
 * Includes the EA parent, nested BIDAT domains, and supporting specialisms.
 */
export const capabilityDomains: CapabilityDomain[] = [
  enterpriseArchitecturePractice,
  ...bidatDomains,
  ...supportingSpecialisms,
];

/** Top-level practice sections for homepage / practice page rendering. */
export const practiceTopLevel: CapabilityDomain[] = [
  enterpriseArchitecturePractice,
  ...supportingSpecialisms,
];
