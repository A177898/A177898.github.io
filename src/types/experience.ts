export type ExperienceDensity = 'detailed' | 'moderate' | 'concise';

/**
 * Concise Experience presentation model:
 * - Role
 * - Organisation
 * - Period
 * - Professional narrative (`summary`)
 * - Focus areas (capability themes — not technologies)
 *
 * `responsibilities` remain supported for existing draft content until
 * revised wording is approved separately.
 */
export type TimelineItem = {
  id: string;
  organisation: string;
  role: string;
  periodLabel: string;
  /** Professional narrative */
  summary: string;
  responsibilities: string[];
  focusAreas: string[];
  density: ExperienceDensity;
  narrativeGroup?: string;
  /** True only when draft indicators are allowed (local review). */
  showDraftIndicator: boolean;
  /** Future appointment not yet effective — DEV review cue. */
  pendingAppointment?: boolean;
};
