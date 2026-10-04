/**
 * Personal architecture principles and practice boundaries.
 * Professional framing for how Yusuf practises architecture — not universal laws,
 * employer policy, or a reproduced industry framework.
 */

export const architectureBeliefs = {
  title: 'Architecture principles',
  intro:
    'I treat architecture as a disciplined way of making direction executable. These are professional working principles — not universal laws.',
  principles: [
    {
      id: 'capability-before-technology',
      title: 'Capability before technology',
      statement:
        'Technology should follow capability and problem definition, not the other way around.',
    },
    {
      id: 'explicit-trade-offs',
      title: 'Make trade-offs explicit',
      statement:
        'Architecture should surface the choices, costs and consequences that decision-makers need to see.',
    },
    {
      id: 'design-the-transition',
      title: 'Design the transition, not only the target',
      statement:
        'Transition architecture is as important as target-state architecture — direction without a path remains difficult to execute.',
    },
    {
      id: 'guardrails-over-gatekeeping',
      title: 'Guardrails over gatekeeping',
      statement:
        'Governance should create clear guardrails that keep change coherent, not bottlenecks that slow every decision.',
    },
    {
      id: 'enable-autonomy',
      title: 'Enable autonomy through clear boundaries',
      statement:
        'Architecture should increase delivery autonomy by clarifying boundaries, rather than centralising every decision.',
    },
  ] as const,
  boundaries: {
    title: 'Architecture boundaries',
    intro: 'I also keep a short view of what architecture should not become in practice.',
    items: [
      'Architecture is not a substitute for delivery ownership.',
      'Governance should not become centralised gatekeeping.',
      'Technology selection should not define the problem.',
      'Architecture should not centralise decisions that belong with capable domains or delivery teams.',
    ] as const,
  },
} as const;
