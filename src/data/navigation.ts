import { hasPublishedRadarEntries } from '../data/technologies';

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type NavVisibility = {
  hasPublishedExperience: boolean;
  hasPublishedPerspectives: boolean;
  hasPublishedArchitectures: boolean;
  hasPublishedRadar: boolean;
};

/**
 * Primary navigation — Experience / Perspectives / Reference / Radar appear only when
 * publishable content exists (or DEV review drafts). Architecture Practice remains
 * the centrepiece. Perspectives sit under Architecture (route remains /research).
 */
export function buildPrimaryNavigation(visibility: NavVisibility): NavItem[] {
  const architectureChildren: NavItem[] = [
    { label: 'Architecture Practice', href: '/architecture/practice' },
  ];

  if (visibility.hasPublishedPerspectives) {
    architectureChildren.push({
      label: 'Perspectives',
      href: '/research',
    });
  }

  if (visibility.hasPublishedArchitectures) {
    architectureChildren.push({
      label: 'Reference Architectures',
      href: '/architecture/reference',
    });
  }

  if (visibility.hasPublishedRadar) {
    architectureChildren.push({
      label: 'Technology Radar',
      href: '/architecture/radar',
    });
  }

  const items: NavItem[] = [{ label: 'About', href: '/about' }];

  if (visibility.hasPublishedExperience) {
    items.push({ label: 'Experience', href: '/experience' });
  }

  items.push({
    label: 'Architecture',
    href: '/architecture',
    children: architectureChildren,
  });

  items.push({ label: 'Resume', href: '/resume' }, { label: 'Contact', href: '/contact' });

  return items;
}

/** Default visibility for foundation (no published collection content yet). */
export function defaultNavVisibility(): NavVisibility {
  return {
    hasPublishedExperience: false,
    hasPublishedPerspectives: false,
    hasPublishedArchitectures: false,
    hasPublishedRadar: hasPublishedRadarEntries(),
  };
}
