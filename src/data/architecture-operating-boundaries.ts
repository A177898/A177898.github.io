/**
 * Practice-level operating boundaries.
 * Explains decision rights — distinct from TASK-05 principles and TASK-08 sequences.
 * Organisation-neutral professional judgement, not employer process.
 */

export const architectureOperatingBoundaries = {
  id: 'operating-boundaries',
  eyebrow: 'Operating boundaries',
  title: 'Control without becoming a bottleneck',
  intro:
    'In my practice, architecture creates enough structure for coherent change without owning every delivery decision. The useful question is not whether governance exists — it is where decision rights should sit.',
  closing:
    'I use architecture to hold what needs enterprise consistency, and to leave open what can safely remain with domains and delivery teams.',
  guardrailsVsGatekeeping: {
    title: 'Guardrails and gatekeeping',
    intro:
      'Governance should create safe decision space. Formal review remains appropriate for material risk — but it should not become the default path for every implementation choice.',
    guardrails: {
      title: 'Guardrails',
      lead: 'Architecture establishes the conditions within which teams can decide.',
      items: [
        'Principles and decision criteria',
        'Standards and reusable patterns',
        'Boundaries and constraints',
        'Clear escalation paths for material exceptions',
      ],
      outcome:
        'Many delivery decisions can then be made independently inside those boundaries.',
    },
    gatekeeping: {
      title: 'Gatekeeping',
      lead: 'Architecture becomes a bottleneck when control replaces clarity.',
      items: [
        'Every implementation choice waits on central approval',
        'Decision authority is unclear or constantly renegotiated',
        'Standards are applied as process rather than intent',
        'Architects become substitute delivery owners',
      ],
      outcome:
        'Progress slows, ownership blurs, and architecture absorbs work that belongs with delivery.',
    },
    formalGovernance: {
      title: 'Where stronger governance remains appropriate',
      intro:
        'Guardrails are not a refusal of formal review. Stronger central attention is warranted where the decision is hard to reverse or has enterprise-wide consequence, for example:',
      items: [
        'Enterprise-wide standards',
        'Material security risk',
        'Regulatory or compliance constraints',
        'Cross-domain impacts',
        'Major irreversible decisions',
        'Significant exceptions to agreed boundaries',
      ],
    },
  },
  authorityVsOwnership: {
    title: 'Architecture authority and delivery ownership',
    intro:
      'A useful boundary is to separate the architectural decisions that shape direction from the delivery ownership that makes change real.',
    architecture: {
      title: 'Architecture authority',
      lead: 'Shapes and holds:',
      items: [
        'Architectural direction and target-state intent',
        'Principles and guardrails',
        'Transition constraints and cross-domain coherence',
        'Significant architectural decisions',
        'Escalation of material trade-offs',
      ],
    },
    shared: {
      title: 'Shared decision space',
      lead: 'Architecture and delivery collaborate on:',
      items: [
        'Trade-offs and exceptions',
        'Emerging constraints',
        'Changes to assumptions',
        'Evidence from implementation',
      ],
      note: 'This is collaboration, not an architecture-versus-engineering contest.',
    },
    delivery: {
      title: 'Delivery ownership',
      lead: 'Owns:',
      items: [
        'Implementation and detailed engineering choices within guardrails',
        'Delivery planning',
        'Quality of implementation',
        'Operational readiness',
        'Local optimisation within agreed boundaries',
      ],
    },
  },
} as const;
