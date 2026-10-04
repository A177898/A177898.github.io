/**
 * Vendor-neutral illustrative pseudo-policy for Perspective 03.
 * Expresses decision intent only — not an executable policy language.
 */

export const authorizationPseudoPolicy = {
  id: 'authorization-pseudo-policy',
  title: 'Illustrative authorization decision',
  lead:
    'A generic approval scenario showing how assigned authority, organisation scope, amount limits, mandate rules, separation of duties and context combine into one decision — not a permission lookup.',
  disclaimer:
    'Illustrative pseudo-policy only — this expresses decision intent, not an executable policy language or product implementation.',
  lines: [
    'IF',
    '  SUBJECT has PAYMENT_APPROVE authority',
    '  AND RESOURCE belongs to an authorised organisation for that SUBJECT',
    '  AND AMOUNT is within the SUBJECT\'s effective approval limit',
    '  AND MANDATE requirements are satisfied',
    '  AND SUBJECT did not initiate the transaction',
    'THEN',
    '  ALLOW',
    '',
    'OTHERWISE evaluate the unmet condition:',
    '  Authority missing or organisation out of scope',
    '    → DENY',
    '  Amount above personal limit, but approvable through workflow',
    '    → REQUIRE_APPROVAL',
    '  Authentication assurance too weak for the action',
    '    → STEP_UP_REQUIRED',
    '  Mandate or separation-of-duties not satisfied',
    '    → DENY',
  ],
  caption:
    'Different unmet conditions can produce different outcomes. REQUIRE_APPROVAL and STEP_UP_REQUIRED are obligations that constrain how an action may proceed — they are not the same as DENY.',
} as const;
