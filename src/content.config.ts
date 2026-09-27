import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Classification is green | amber only.
 * RED content must never enter this repository.
 *
 * Publication eligibility (shared across collections): production visibility
 * requires status: published AND approvedForPublication: true.
 * GREEN classification alone is not publication approval.
 * architectureVersion never affects eligibility.
 * Radar uses a separate approval mechanism in src/data/technologies.ts.
 */
const classificationSchema = z.enum(['green', 'amber']);
const statusSchema = z.enum(['placeholder', 'draft', 'published']);

const relationSchema = z.array(z.string()).default([]);

const seoSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    organisation: z.string().min(1),
    role: z.string().min(1),
    period: z.object({
      start: z.string().min(1),
      end: z.string().optional(),
    }),
    /**
     * When true, period.start is an appointment effective date that has not yet begun.
     * Display as "Effective {start}" — never as Present. Does not affect publication eligibility.
     */
    pendingAppointment: z.boolean().optional(),
    /**
     * Professional narrative (public-safe).
     * May be empty while a draft awaits approved description.
     */
    summary: z.string().default(''),
    /**
     * Legacy/optional responsibility bullets — retained for existing draft content.
     * Prefer professional narrative + focusAreas for future concise presentation.
     */
    responsibilities: z.array(z.string()).default([]),
    /**
     * Broad professional capability focus — NOT technologies.
     * Populate only when explicitly supplied.
     */
    focusAreas: z.array(z.string()).default([]),
    capabilitiesDeveloped: z.array(z.string()).default([]),
    /** Excluded from V1 Experience entries — keep empty. */
    technologies: z.array(z.string()).default([]),
    achievements: z.array(z.string()).default([]),
    /** Lower number = newer (strict reverse-chronological sort). */
    order: z.number().int().positive(),
    /**
     * Progressive information density for presentation.
     * detailed = recent architecture roles; moderate = engineering leadership;
     * concise = earliest roles.
     */
    density: z.enum(['detailed', 'moderate', 'concise']).default('moderate'),
    /**
     * Subtle career-era label — NOT a job title; does not reorder chronology.
     */
    narrativeGroup: z.string().optional(),
    status: statusSchema,
    classification: classificationSchema,
    approvedForPublication: z.boolean().optional(),
    seo: z
      .object({
        title: z.string().min(1).optional(),
        description: z.string().default(''),
      })
      .default({ description: '' }),
    relatedCapabilities: relationSchema,
    relatedResearch: relationSchema,
    relatedArchitectures: relationSchema,
  }),
});

const perspectives = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/perspectives' }),
  schema: z.object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    description: z.string().min(1),
    author: z.string().default('Yusuf Kader'),
    readingTime: z.string().optional(),
    /** Optional — do not display until explicitly supplied for publication. */
    pubDate: z.coerce.date().optional(),
    category: z.enum([
      'Enterprise Architecture',
      'Platform Architecture',
      'Identity & Security',
      'Identity & Security Architecture',
      'Cloud & Integration',
      'AI & Emerging Technology',
      'Architecture Leadership',
    ]),
    tags: z.array(z.string()).default([]),
    status: statusSchema,
    classification: classificationSchema,
    approvedForPublication: z.boolean().optional(),
    showDisclaimer: z.boolean().default(true),
    publicationNote: z.string().optional(),
    seo: seoSchema,
    relatedCapabilities: relationSchema,
    relatedResearch: relationSchema,
    relatedArchitectures: relationSchema,
  }),
});

const architectures = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/architectures' }),
  schema: z.object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    description: z.string().min(1),
    author: z.string().default('Yusuf Kader'),
    architectureType: z.string().optional(),
    architectureVersion: z.string().optional(),
    posture: z.string().optional(),
    domains: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    status: statusSchema,
    classification: classificationSchema,
    approvedForPublication: z.boolean().optional(),
    showDisclaimer: z.boolean().default(true),
    seo: seoSchema,
    relatedCapabilities: relationSchema,
    relatedResearch: relationSchema,
    relatedArchitectures: relationSchema,
  }),
});

const leadership = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/leadership' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    period: z.string().optional(),
    status: statusSchema,
    classification: classificationSchema,
    approvedForPublication: z.boolean().optional(),
    seo: seoSchema,
    relatedCapabilities: relationSchema,
    relatedResearch: relationSchema,
    relatedArchitectures: relationSchema,
  }),
});

export const collections = {
  experience,
  perspectives,
  architectures,
  leadership,
};
