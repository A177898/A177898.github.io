/**
 * Contact / social links.
 * Enable channels only with owner-approved destinations.
 */
export type SocialLink = {
  id: 'linkedin' | 'github' | 'email';
  label: string;
  href: string | null;
  enabled: boolean;
  placeholderReason?: string;
};

export const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yusuf-يوسف-kader-عبد-القدر-1209b858',
    enabled: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: null,
    enabled: false,
    placeholderReason: 'GitHub profile URL required before enabling',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:ykader7867@gmail.com',
    enabled: true,
  },
];

export function getEnabledSocialLinks(): SocialLink[] {
  return socialLinks.filter((link) => link.enabled && Boolean(link.href));
}
