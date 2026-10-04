/**
 * Deployment pattern comparison — RA01 presentation aid.
 * Qualitative trade-offs only. No universal winner. Not a scorecard.
 */

export type DeploymentPatternRow = {
  id: string;
  pattern: string;
  shortName: string;
  framing: string;
  latency: string;
  consistency: string;
  blastRadius: string;
  resilience: string;
  operationalComplexity: string;
};

export const deploymentPatternCompare = {
  id: 'deployment-pattern-compare',
  title: 'Deployment pattern comparison',
  lead:
    'These patterns are implementation-neutral ways to place evaluation. None is universally preferred. Logical responsibilities stay the same; deployment changes where evaluation runs and how policy and decision information are distributed.',
  neutrality:
    'The appropriate pattern depends on the required balance of latency, consistency, resilience, blast radius and operational complexity.',
  logicalNote:
    'Logical responsibilities — PEP, PDP, PIP, PAP, entitlements, authorization context and domain authorities — remain the same across patterns. Deployment changes where evaluation runs and how decision information and policy are distributed.',
  columns: {
    pattern: 'Pattern',
    latency: 'Latency',
    consistency: 'Consistency',
    blastRadius: 'Blast radius',
    resilience: 'Resilience',
    operationalComplexity: 'Operational complexity',
  },
  rows: [
    {
      id: 'central',
      pattern: 'Central decision service',
      shortName: 'Shared evaluation capability',
      framing: 'Centralised control',
      latency: 'Greater runtime distance to shared evaluation.',
      consistency: 'Stronger potential for policy and version consistency.',
      blastRadius: 'Shared decision-plane failure can affect many consumers.',
      resilience: 'Concentrated dependency on shared evaluation availability.',
      operationalComplexity: 'Simpler evaluation footprint; shared platform criticality rises with adoption.',
    },
    {
      id: 'distributed',
      pattern: 'Distributed decision nodes',
      shortName: 'Multiple evaluation nodes',
      framing: 'Locality and isolation',
      latency: 'Evaluation can sit closer to consumers.',
      consistency: 'Policy and context synchronisation introduce consistency windows.',
      blastRadius: 'Better failure isolation across nodes.',
      resilience: 'Reduced dependence on a single shared runtime evaluation path.',
      operationalComplexity: 'Broader operational footprint; propagation and support complexity increase.',
    },
    {
      id: 'embedded',
      pattern: 'Embedded evaluation',
      shortName: 'Evaluation near consumer runtime',
      framing: 'Local autonomy',
      latency: 'Very low local decision latency.',
      consistency: 'Higher risk of drift and version inconsistency without strong distribution discipline.',
      blastRadius: 'Impact tends to be localised to the consumer runtime.',
      resilience: 'Local evaluation can continue when shared services are degraded, subject to freshness and validity rules.',
      operationalComplexity: 'Distribution, lifecycle, governance and observability burden is more widely shared.',
    },
    {
      id: 'hybrid',
      pattern: 'Hybrid',
      shortName: 'Mixed placement by authorization class',
      framing: 'Balanced mix',
      latency: 'Can place evaluation according to authorization class and locality needs.',
      consistency: 'Requires explicit versioning and synchronisation across the mixed pattern.',
      blastRadius: 'Depends on the mix; classes can be isolated if designed carefully.',
      resilience: 'Can combine shared control with distributed or embedded resilience characteristics.',
      operationalComplexity: 'Highest design and operational complexity of the four patterns.',
    },
  ] satisfies readonly DeploymentPatternRow[],
  caption:
    'Technology selection comes after architecture requirements. Pattern choice is contextual — not a maturity ranking.',
} as const;
