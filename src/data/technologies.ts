/**
 * Technology Radar framework — rings and domains only.
 * Do not populate technology classifications until explicitly provided/approved.
 */

export const radarRings = ['Adopt', 'Trial', 'Assess', 'Hold'] as const;
export type RadarRing = (typeof radarRings)[number];

export const radarDomains = [
  'Languages & Frameworks',
  'Cloud & Infrastructure',
  'Integration',
  'Security & Identity',
  'Data',
  'AI',
  'Developer Experience',
  'Architecture Practices',
] as const;
export type RadarDomain = (typeof radarDomains)[number];

export type RadarEntry = {
  id: string;
  name: string;
  ring: RadarRing;
  domain: RadarDomain;
  blurb?: string;
  /** Must remain false until Yusuf explicitly provides/approves classifications. */
  approvedForPublication: boolean;
};

/** Empty until classifications are explicitly provided. */
export const radarEntries: RadarEntry[] = [];

export function hasPublishedRadarEntries(): boolean {
  return radarEntries.some((entry) => entry.approvedForPublication);
}

export const radarDisclaimer =
  'Classifications on this Technology Radar represent Yusuf Kader’s independent professional assessment. They do not imply the technology standards, adoption status, architecture decisions, or position of any current or former employer.';
