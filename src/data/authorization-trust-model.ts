/**
 * Attribute trust / provenance model — RA01 presentation aid.
 * Logical trust reasoning, not a physical processing pipeline or payload schema.
 */

export type TrustChainStep = {
  id: string;
  title: string;
  text: string;
};

export const authorizationTrustModel = {
  id: 'authorization-trust-model',
  title: 'Attribute trust and provenance',
  lead:
    'Authorization context is not a bag of claims. An attribute influences a decision only when its value, provenance, source authority, freshness and integrity satisfy the trust requirements of the policy evaluating it.',
  framing:
    'Logical trust model — not eight mandatory services, network hops or a prescribed payload schema.',
  claimTitle: 'Caller-supplied claim ≠ trusted authorization attribute',
  claimText:
    'A request may carry useful context without that context automatically being trusted. Callers cannot simply assert trust. Authenticated subject context is not automatically authoritative authorization context.',
  steps: [
    {
      id: 'attribute',
      title: 'Attribute',
      text: 'The decision-relevant characteristic under consideration.',
    },
    {
      id: 'value',
      title: 'Value',
      text: 'The asserted or observed value for that attribute.',
    },
    {
      id: 'provenance',
      title: 'Provenance',
      text: 'What establishes how the value was obtained and who asserted it.',
    },
    {
      id: 'source',
      title: 'Authoritative source',
      text: 'Whether the asserting domain is authoritative for this attribute — ownership remains with the domain.',
    },
    {
      id: 'freshness',
      title: 'Freshness',
      text: 'Whether the value is current enough for the correctness window of this decision.',
    },
    {
      id: 'integrity',
      title: 'Integrity evidence',
      text: 'Whether the value can be relied on against tampering or silent mutation.',
    },
    {
      id: 'determination',
      title: 'Trust determination',
      text: 'Whether the attribute is usable for this evaluation under the policy’s trust requirements.',
    },
    {
      id: 'context',
      title: 'Authorization context',
      text: 'Trusted decision-relevant information available to the PDP for this evaluation — not a system of record.',
    },
  ] satisfies readonly TrustChainStep[],
  questionsTitle: 'Trust questions (illustrative)',
  questions: [
    'Who asserted this value?',
    'Is that source authoritative for this attribute?',
    'Is the value fresh enough for this decision?',
    'Can integrity be established?',
    'Is the attribute sufficiently correct for the protected action?',
  ],
  relateCorrectness:
    'Complements the correctness classes (Request-bound, Immediate revocation, Bounded stale, Versioned reference). Classification guides acquisition and caching choices; it does not replace provenance or trust determination.',
  relateAcquisition:
    'Distinct from acquisition patterns. Acquisition answers how information was obtained (lookup, trusted request context, projection, hybrid). Trust answers why the PDP may use it.',
  caption:
    'Domain authorities remain authoritative for their attributes. Authorization context consumes trusted decision information; it does not become the system of record for customer, account or domain data.',
} as const;
