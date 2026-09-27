import { hasPublishedRadarEntries } from '../data/technologies';

/**
 * Routes that must not appear in production when their content collections
 * (or radar entries) have no published items.
 *
 * Used by sitemap filtering and the post-build prune step.
 */
export const conditionalPublicRoutes = [
  '/experience',
  '/research',
  '/architecture/reference',
  '/architecture/radar',
] as const;

export type RouteVisibility = {
  experience: boolean;
  research: boolean;
  reference: boolean;
  radar: boolean;
};

export function routeVisibilityFromCounts(counts: {
  experience: number;
  perspectives: number;
  architectures: number;
}): RouteVisibility {
  return {
    experience: counts.experience > 0,
    research: counts.perspectives > 0,
    reference: counts.architectures > 0,
    radar: hasPublishedRadarEntries(),
  };
}

export function isConditionalRouteAllowed(
  pathname: string,
  visibility: RouteVisibility,
): boolean {
  const normalized = pathname.replace(/\/$/, '') || '/';
  if (normalized === '/experience' || normalized.startsWith('/experience/')) {
    return visibility.experience;
  }
  if (normalized === '/research' || normalized.startsWith('/research/')) {
    return visibility.research;
  }
  if (
    normalized === '/architecture/reference' ||
    normalized.startsWith('/architecture/reference/')
  ) {
    return visibility.reference;
  }
  if (normalized === '/architecture/radar') {
    return visibility.radar;
  }
  return true;
}
