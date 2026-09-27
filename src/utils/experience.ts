/**
 * Experience presentation helpers.
 * Period labels never invent employment facts. Publication is never date-inferred.
 */

export type ExperiencePeriod = {
  start: string;
  end?: string;
};

/**
 * Format an experience period for display.
 * - pendingAppointment: "Effective {start}" (future appointment; never "Present")
 * - ended role: "{start} — {end}"
 * - ongoing role (explicit end Present or omitted without pending): "{start} — Present"
 */
export function formatExperiencePeriod(
  period: ExperiencePeriod,
  options: { pendingAppointment?: boolean } = {},
): string {
  if (options.pendingAppointment) {
    return `Effective ${period.start}`;
  }
  if (period.end && period.end !== 'Present') {
    return `${period.start} — ${period.end}`;
  }
  return `${period.start} — Present`;
}

/** Resume split: concise density = earlier career; otherwise professional experience. */
export function isEarlierCareer(density: string): boolean {
  return density === 'concise';
}
