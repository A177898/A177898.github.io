/**
 * Platform Capability Canvas — independently developed architectural aid.
 * Not an external industry standard, TOGAF artefact, or vendor framework.
 */

export type CanvasDimension = {
  id: string;
  title: string;
  prompt: string;
};

export type CanvasGroup = {
  id: string;
  title: string;
  dimensions: readonly CanvasDimension[];
};

export const platformCapabilityCanvas = {
  title: 'Platform Capability Canvas',
  framing:
    'An independently developed architectural aid for evaluating whether a shared capability behaves as an enterprise platform. It is not an external industry standard, a TOGAF artefact, or a vendor framework.',
  purpose:
    'Use it as a framing aid — not a scorecard, maturity model, or pass/fail test. The guiding question remains: where does a shared capability create greater enterprise leverage than the dependency it introduces?',
  groups: [
    {
      id: 'value',
      title: 'Value',
      dimensions: [
        {
          id: 'capability',
          title: 'Capability',
          prompt: 'What reusable capability does the platform provide?',
        },
        {
          id: 'value',
          title: 'Value',
          prompt: 'What enterprise leverage does the shared capability create?',
        },
        {
          id: 'economics',
          title: 'Economics',
          prompt:
            'Does reuse create more leverage than the dependency and coordination cost it introduces?',
        },
      ],
    },
    {
      id: 'consumption',
      title: 'Consumption',
      dimensions: [
        {
          id: 'consumers',
          title: 'Consumers',
          prompt: 'Who consumes it independently, and are there genuinely multiple consumers?',
        },
        {
          id: 'consumer-experience',
          title: 'Consumer Experience',
          prompt:
            'How do teams discover, onboard, integrate, version and get support for the capability?',
        },
        {
          id: 'contract',
          title: 'Contract',
          prompt:
            'What functional, interface, information and behavioural promises can consumers rely on?',
        },
      ],
    },
    {
      id: 'boundary-control',
      title: 'Boundary & Control',
      dimensions: [
        {
          id: 'boundary',
          title: 'Boundary',
          prompt: 'What does the platform own, and what explicitly remains outside it?',
        },
        {
          id: 'governance',
          title: 'Governance',
          prompt:
            'What guardrails preserve consistency without centralising every consumer decision?',
        },
        {
          id: 'ownership',
          title: 'Ownership',
          prompt:
            'Who is accountable for product direction, operation, consumer experience and evolution?',
        },
      ],
    },
    {
      id: 'run-evolve',
      title: 'Run & Evolve',
      dimensions: [
        {
          id: 'reliability',
          title: 'Reliability',
          prompt:
            'What availability, performance, support and operational expectations exist when the capability becomes critical?',
        },
        {
          id: 'evolution',
          title: 'Evolution',
          prompt:
            'How are versioning, compatibility, deprecation and future change managed without repeatedly disrupting consumers?',
        },
      ],
    },
  ] as const satisfies readonly CanvasGroup[],
} as const;
