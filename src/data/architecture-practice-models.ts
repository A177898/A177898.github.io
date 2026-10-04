/**
 * Practice-page conceptual models (governance + engagement).
 * Organisation-neutral professional framing — not employer process.
 */

export type ArchitectureSequenceStage = {
  id: string;
  title: string;
  text: string;
};

export type ArchitectureSequenceModel = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  stages: readonly ArchitectureSequenceStage[];
  /** Accessible label for the stage list. */
  sequenceLabel: string;
  /** Optional iteration / feedback note shown below the sequence. */
  feedback?: {
    cue: string;
    text: string;
  };
};

export const architectureGovernanceModel: ArchitectureSequenceModel = {
  id: 'architecture-governance',
  eyebrow: 'Governance model',
  title: 'Architecture governance',
  intro:
    'Governance should create coherent direction without becoming a bottleneck. Principles and guardrails enable decisions and delivery autonomy; evidence keeps the model honest.',
  sequenceLabel: 'Architecture governance sequence',
  stages: [
    {
      id: 'principles',
      title: 'Principles',
      text: 'Establish architectural intent — the working stance that guides choices.',
    },
    {
      id: 'guardrails',
      title: 'Guardrails',
      text: 'Define acceptable boundaries so change stays coherent without centralising every decision.',
    },
    {
      id: 'decisions',
      title: 'Architecture decisions',
      text: 'Make trade-offs explicit where direction, constraint or reuse requires a clear choice.',
    },
    {
      id: 'delivery-autonomy',
      title: 'Delivery autonomy',
      text: 'Teams deliver within those boundaries — architecture clarifies ownership, it does not replace it.',
    },
    {
      id: 'evidence',
      title: 'Evidence / feedback',
      text: 'Implementation and outcome evidence inform whether principles and guardrails still hold.',
    },
  ],
  feedback: {
    cue: 'Evidence / feedback',
    text: 'refines principles and guardrails over time — governance is iterative, not a one-pass approval chain.',
  },
} as const;

export const architectureEngagementModel: ArchitectureSequenceModel = {
  id: 'architecture-engagement',
  eyebrow: 'Engagement lifecycle',
  title: 'Architecture engagement',
  intro:
    'Architecture work is iterative. The sequence below is a working rhythm — not a one-time waterfall from first conversation to final design.',
  sequenceLabel: 'Architecture engagement lifecycle',
  stages: [
    {
      id: 'understand',
      title: 'Understand',
      text: 'Clarify the business capability, problem, context and constraints.',
    },
    {
      id: 'frame',
      title: 'Frame',
      text: 'Establish architecture scope, boundaries, principles and decision context.',
    },
    {
      id: 'decide',
      title: 'Decide',
      text: 'Make trade-offs explicit and define target architectural direction.',
    },
    {
      id: 'transition',
      title: 'Transition',
      text: 'Translate target intent into achievable intermediate states and dependencies.',
    },
    {
      id: 'govern',
      title: 'Govern',
      text: 'Maintain coherence through guardrails, decisions and delivery feedback.',
    },
    {
      id: 'learn',
      title: 'Learn',
      text: 'Use evidence from implementation and outcomes to refine architecture.',
    },
  ],
  feedback: {
    cue: 'Learn',
    text: 'returns into Understand and Frame — engagement repeats as context, evidence and priorities change.',
  },
} as const;
