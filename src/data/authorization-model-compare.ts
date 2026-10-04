/**
 * Authorization model comparison — Perspective 03.
 * Complementary framing: models and mechanisms solve different responsibilities.
 * Not a maturity scorecard or mutually exclusive choice matrix.
 */

export type AuthorizationModelKind =
  | 'access-control-model'
  | 'decision-logic'
  | 'domain-authority';

export type AuthorizationModelRow = {
  id: string;
  model: string;
  shortName: string;
  kind: AuthorizationModelKind;
  kindLabel: string;
  expresses: string;
  strength: string;
  limitation: string;
  bestUse: string;
};

export const authorizationModelCompare = {
  id: 'authorization-model-compare',
  title: 'Authorization model comparison',
  lead:
    'These approaches are complementary. Each expresses a different form of authority or context; none is a universal replacement for the others.',
  complementary:
    'Effective enterprise authorization commonly combines RBAC, ABAC, relationships, mandates / limits, policy and context into one authorization decision.',
  policyNote:
    'Policy-based authorization is the decision logic that evaluates how assigned authority, attributes, relationships, domain constraints and context combine — not merely another entitlement source.',
  domainNote:
    'Mandates / limits are domain-specific authority mechanisms. They capture business constraints such as approval thresholds and signing rules, and should not become a generic enterprise entitlement store.',
  columns: {
    model: 'Model',
    expresses: 'What it expresses',
    strength: 'Strength',
    limitation: 'Limitation',
    bestUse: 'Best use',
  },
  rows: [
    {
      id: 'rbac',
      model: 'RBAC',
      shortName: 'Role-Based Access Control',
      kind: 'access-control-model',
      kindLabel: 'Assigned authority',
      expresses: 'Broad organisational or functional responsibility mapped to subjects.',
      strength:
        'Clear, understandable entitlement assignment for stable responsibility sets and coarse-grained authority.',
      limitation:
        'Role explosion and a poor fit for dynamic, contextual or resource-specific decisions when used alone.',
      bestUse: 'Expressing durable responsibility without encoding every contextual rule into role names.',
    },
    {
      id: 'abac',
      model: 'ABAC',
      shortName: 'Attribute-Based Access Control',
      kind: 'access-control-model',
      kindLabel: 'Context',
      expresses:
        'Subject, resource, environmental and contextual attributes that refine whether authority applies.',
      strength: 'Granular, contextual conditions and dynamic constraints beyond static role membership.',
      limitation:
        'Attribute quality, provenance, consistency and governance can become complex to operate.',
      bestUse: 'Adding contextual criteria that roles alone cannot express cleanly.',
    },
    {
      id: 'rebac',
      model: 'ReBAC',
      shortName: 'Relationship-Based Access Control',
      kind: 'access-control-model',
      kindLabel: 'Relationships',
      expresses:
        'Relationships between subject, resource, organisation, account, owner, delegate and similar structures.',
      strength:
        'Natural fit for ownership, delegation, organisational hierarchy and resource relationships.',
      limitation:
        'Relationship graphs and semantics can become complex to govern, synchronise and evaluate.',
      bestUse: 'Determining authority derived from how the subject relates to the resource or organisation.',
    },
    {
      id: 'policy',
      model: 'Policy-based authorization',
      shortName: 'Combines multiple authority sources',
      kind: 'decision-logic',
      kindLabel: 'Decision logic',
      expresses:
        'Decision rules that combine roles, attributes, relationships, domain authority and context.',
      strength:
        'Enterprise-consistent evaluation, combination of multiple authority sources, and decision obligations.',
      limitation:
        'Requires strong policy lifecycle, explainability, versioning, governance and testing discipline.',
      bestUse:
        'Evaluating whether assigned authority applies now — combining the other inputs into a decision.',
    },
    {
      id: 'mandates-limits',
      model: 'Mandates / Limits',
      shortName: 'Domain authority mechanism',
      kind: 'domain-authority',
      kindLabel: 'Business authority',
      expresses:
        'Business-specific authority such as approval limits, mandates, signing rules and thresholds.',
      strength:
        'Captures transactional and regulated constraints that generic entitlement models do not own well.',
      limitation:
        'Domain-specific by nature; should not become a generic enterprise entitlement store.',
      bestUse:
        'Financial, regulated or transactional authority owned by the business domain that defines it.',
    },
  ] satisfies readonly AuthorizationModelRow[],
} as const;
