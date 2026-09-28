# Implementation Plan — Yusuf Kader Enterprise Architecture Portfolio

**Status:** Approved with amendments (2026-09-26)  
**Active branch for Phases 3–6:** `feature/portfolio-foundation`  
**Public deploy:** only from `main` after explicit publication approval

---

## 1. Phase 1 — Repository Assessment

Inspection was limited to this portfolio repository only. No parent directories, sibling repositories, employer projects, or unrelated local content were inspected.

### Findings

| Item | Result |
|------|--------|
| Branch | `main` (tracking `origin/main`) |
| Working tree | Clean at assessment |
| Existing commits | 1 — `Initialize project` |
| Existing files | Seeded `README.md` only |
| Framework | None |
| TypeScript / Astro / Tailwind | Not present |
| CI / GitHub Actions | Not present |
| Content / credentials | None present |

### Conclusion

Greenfield repository. Scaffolding proceeds on `feature/portfolio-foundation` after plan approval.

---

## 2. Approved Stack

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Framework | **Astro** (latest stable) | Static-first, minimal JS, MDX support |
| Language | **TypeScript** (strict) | Type-safe content schemas and components |
| Styling | **Tailwind CSS** (via Astro integration) | Design tokens; no heavy UI kit |
| Content | **Astro Content Collections** + Markdown/MDX | Schema-validated; separate from presentation |
| Diagrams | **Mermaid → SVG at build time** | Source-controlled; no large Mermaid client runtime |
| Theme | CSS custom properties + class-based light/dark | Accessible; no large theme library |
| Deployment | **GitHub Actions → GitHub Pages from `main` only** | Zero runtime infra |

### Explicit non-goals

- Databases, backend APIs, serverless, auth, containers/K8s
- Analytics/tracking without approval
- Heavy animation libraries; skill bars; junior-portfolio patterns
- Deploying feature branches publicly

---

## 3. Site Architecture & Publication Boundary

```
feature/portfolio-foundation
    ↓
development (Phases 3–5)
    ↓
quality validation
    ↓
content / IP review
    ↓
docs/PRE-PUBLICATION-REVIEW.md
    ↓
STOP — explicit approval
    ↓
merge to main
    ↓
GitHub Actions (main only)
    ↓
GitHub Pages
    ↓
Public HTTPS site
```

**Rules**

- Phases 3–6 occur on `feature/portfolio-foundation`
- No workflow deploys the feature branch
- GitHub Pages deploys only approved content merged into `main`
- No merge to `main` until explicit publication approval
- Future custom domain: configure `site` + optional `CNAME`; no architectural change

### Astro configuration

- `output: 'static'`
- `site`: configurable placeholder until production URL approved
- `base`: `/` for custom-domain readiness (adjustable for project Pages path if needed)

---

## 4. Information Architecture

### Primary navigation (public)

| Label | Path | Notes |
|-------|------|-------|
| About | `/about` | Profile + leadership/contributions when published |
| Experience | `/experience` | Career progression timeline |
| Architecture | `/architecture` | Parent hub (see below) |
| Research | `/research` | Architecture Perspectives |
| Resume | `/resume` | Printable page + future PDF download |
| Contact | `/contact` | LinkedIn / GitHub; email only if approved |

### Architecture (parent conceptual area)

| Sub-area | Path |
|----------|------|
| Architecture Practice | `/architecture/practice` |
| Reference Architectures | `/architecture/reference` |
| Technology Radar | `/architecture/radar` |

Detail routes (only when published content exists):

- Perspective: `/research/[slug]`
- Reference architecture: `/architecture/reference/[slug]`

### Navigation & empty-section policy

- Primary nav and indexes show **only** sections that have approved **published** content (or always-on shell pages that are intentionally public: About, Experience, Architecture Practice centrepiece, Resume, Contact).
- Research, Reference Architectures, and Technology Radar **capabilities are built**, but **empty sections are not exposed** in navigation or indexes until published content exists.
- Leadership & Contributions is **not** a primary nav item; content lives under About and/or Experience when approved.

---

## 5. Directory Structure

```
/
├── .github/workflows/
│   └── deploy.yml                 # main only — added near publication, not for feature branch
├── docs/
│   ├── IMPLEMENTATION-PLAN.md
│   ├── PUBLICATION-GUIDELINES.md
│   ├── CONTENT-CHECKLIST.md
│   └── PRE-PUBLICATION-REVIEW.md
├── public/
│   ├── resume/                    # formal PDF when supplied
│   ├── images/
│   ├── favicon.svg
│   └── robots.txt
├── scripts/
│   └── validate-content.ts        # production content validation
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── content/
│   │   ├── config.ts
│   │   ├── experience/            # renamed from career
│   │   ├── perspectives/          # Research & Perspectives
│   │   ├── architectures/
│   │   └── leadership/            # surfaced via About / Experience
│   ├── data/
│   │   ├── profile.ts
│   │   ├── capabilities.ts        # Architecture Practice centrepiece
│   │   ├── technologies.ts        # radar framework; empty until approved
│   │   ├── navigation.ts          # dynamic; hides empty sections
│   │   ├── seo.ts
│   │   └── social.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── print.css              # resume print stylesheet
│   └── utils/
│       ├── publication.ts         # published-only filters
│       ├── readingTime.ts
│       └── diagrams.ts            # build-time Mermaid → SVG helpers
├── astro.config.mjs
├── package.json
└── README.md
```

---

## 6. Component Model (foundation)

| Component | Role |
|-----------|------|
| `BaseLayout` | Document shell, SEO, skip link, theme |
| `Header` / `Navigation` | Simplified primary nav; Architecture sub-nav |
| `Footer` | Secondary links; unobtrusive independence note |
| `ThemeToggle` | Light / dark; respects `prefers-color-scheme` |
| `Hero` | Home positioning |
| `Breadcrumb` | Section context |
| `CapabilityCard` | Architecture Practice |
| `PerspectiveCard` | Research & Perspectives cards |
| `ArchitectureCard` | Reference architecture cards |
| `TechnologyRadar` | Framework UI; empty until classifications approved |
| `RadarDisclaimer` | Independent assessment disclaimer |
| `ResearchDisclaimer` | Independent Architecture Perspective disclaimer |
| `CareerTimeline` | Experience timeline |
| `DownloadResume` | Formal PDF when available |
| `SocialLinks` | LinkedIn / GitHub; email gated |
| `Tag` | Restrained tags |

Resume print: dedicated print stylesheet — hide nav/decorative UI, margins, avoid awkward breaks, readable type, expose meaningful URLs.

---

## 7. Content Model & Classification

### Classification (repository-level)

| Class | Repository rule |
|-------|-----------------|
| **GREEN** | May enter the repository |
| **AMBER** | May enter only while undergoing explicit review |
| **RED** | **Never enters the repository** — not stored, staged, committed, copied, or represented |

**Do not** implement a schema enum that admits RED and then blocks publish. RED is out of scope for this repo entirely.

Schemas use: `classification: 'green' | 'amber'` only.

### Publication status

| Status | Local / feature branch | Production build |
|--------|------------------------|------------------|
| `placeholder` | Allowed for scaffolding | **Must not render or generate routes** |
| `draft` | Allowed | **Must not render or generate routes** |
| `published` | Allowed | **Only** status that appears in indexes, nav, feeds, sitemap, generated pages |

`[CONTENT REQUIRED]` may exist in local/draft/placeholder content. **Production must fail** if published content contains it.

### AMBER publication gate

AMBER may be marked `published` only with `approvedForPublication: true`. Otherwise production build fails.

### Current amendment — shared publication approval (GREEN and AMBER)

**Amendment date context:** introduced during Architecture v1.0 verification corrections. This does **not** rewrite historical approval records as though the shared rule always existed.

| Topic | Prior documented intent | Current shared rule |
|-------|-------------------------|---------------------|
| GREEN published | `status: published` sufficient for production visibility | Requires `approvedForPublication: true` as well |
| AMBER published | Required `approvedForPublication: true` | Unchanged — still required |
| Draft / placeholder | Excluded from production | Unchanged — still excluded even if approval is true |
| `architectureVersion` | Not a publication gate | Explicitly must never affect eligibility |
| Scope | Emphasised for AMBER | Applies to experience, perspectives, architectures, leadership |
| Radar | Separate `approvedForPublication` on radar entries | Unchanged separate mechanism |

Production visibility helper (`isPublished`):

```text
status === 'published' && approvedForPublication === true
```

Frontmatter parsing for validate/prune uses a YAML parser so quoted values and comments agree with Astro content loading. Parser failures fail validation and must not be treated as ordinary unpublished entries. Validate runs before prune mutates `dist/`.

**Migration note:** inventory current repository content before approving any mass metadata change. Do not mass-approve entries. If a previously public GREEN item lacked `approvedForPublication: true`, it would become production-invisible under the current rule and would need a separately approved migration.

### Claim → Evidence model (metadata, not hardcoded)

Capability areas may reference independently published material via content metadata:

- `relatedCapabilities`
- `relatedResearch` (perspectives)
- `relatedArchitectures`

Conceptual chain:

```
Capability
  → Architecture Perspective
    → Reference Architecture
      → Decision Framework / Analysis
```

Example: Identity & Security → Enterprise Authorization → Authorization Reference Architecture.

**Do not** create content merely to populate relationships. Broken references in published content fail the build.

### Collections (schemas in Phase 3; content in later phases)

- **experience** — organisation, role, period, summary, responsibilities, capabilities, technologies, achievements (no invented quant claims)
- **perspectives** — Independent Architecture Perspectives (title, description, date, category, tags, status, classification, related* metadata)
- **architectures** — vendor-neutral reference architectures; generic terminology only
- **leadership** — optional; surfaced under About / Experience when published

### Architecture Practice centrepiece (generic capabilities)

**Enterprise Architecture** — Capability Architecture; Target-State Architecture; Transition Architecture; Technology Strategy; Roadmapping; Architecture Governance  

**Platform Architecture** — Platform Strategy; Shared Platform Capabilities; Developer Platforms; Distributed Systems; Platform Operating Models  

**Cloud Architecture** — Cloud-Native Architecture; Hybrid Cloud; Containers; Resilience; Cloud Governance  

**Integration Architecture** — API Architecture; Event-Driven Architecture; Enterprise Integration; Service Boundaries  

**Identity & Security** — IAM; Authentication; Authorization; OAuth2/OIDC; Zero Trust; RBAC; ABAC; Policy-Based Authorization  

**AI & Emerging Technology** — Enterprise AI Adoption; Generative AI; AI Architecture; AI Governance; Emerging Technology Assessment  

Keep descriptions generic. Do not connect to employer-specific implementations.

### Terminology & disclaimers

- Prefer **Research & Perspectives** / **Independent Architecture Perspective** unless material genuinely constitutes research.
- Perspective disclaimer (or concise equivalent):

  > This material was independently developed for professional knowledge sharing. It presents general architectural patterns and perspectives and does not describe the systems, architecture, strategy, configuration, or intellectual property of any current or former employer.

- Technology Radar (when published): classifications represent Yusuf Kader’s **independent professional assessment** and must not imply any employer’s standards or decisions. **Do not populate classifications until explicitly provided/approved.**

### Mermaid

- Prefer **build-time** Mermaid → SVG
- No large Mermaid client runtime for static diagrams
- Diagrams: source-controlled, generic terminology, independently authored, accessible, light/dark where practical

### Contact privacy

- Initially: LinkedIn, GitHub (when URLs approved)
- Email: configurable but **disabled** until explicitly approved
- Never: telephone, physical address, unnecessary PII

---

## 8. Production Content Validation

Build-time validation (`scripts/validate-content.ts` and/or Astro integration) **fails the production build** if:

1. Any content is `published` without `approvedForPublication: true` (green or amber — current shared rule)
2. Published content contains `[CONTENT REQUIRED]`
3. Required SEO metadata is missing on published pages/entries
4. A published entry references a missing related item
5. (Best-effort) published content matches obvious secret or internal URL patterns
6. Publication frontmatter is malformed or uses invalid status/classification/approval types

Automated scanning does **not** guarantee confidentiality. Human publication review remains mandatory.

### Sitemap / routes / indexes

Drafts, placeholders, and content lacking explicit publication approval are excluded from:

- generated public routes (where practical)
- indexes
- navigation
- sitemap
- future RSS/feeds (not implemented in the current site)

---

## 9. SEO, Accessibility, Performance

Unchanged in intent from the original plan:

- Semantic HTML, titles, descriptions, Open Graph, canonicals, sitemap, robots.txt
- Person JSON-LD with **verified fields only**
- WCAG 2.1 AA principles; keyboard nav; contrast; focus; reduced motion
- Minimal JS; excellent Lighthouse target

---

## 10. Pre-Publication Review Inventory

`docs/PRE-PUBLICATION-REVIEW.md` must inventory:

- Public pages
- Professional claims
- Organisation names
- Role titles
- Technologies
- Architecture terminology
- Research / perspective articles
- Reference architectures
- Diagrams
- Downloadable files
- External URLs
- Personal / contact information
- AMBER content and approval state

Plus section **Potential IP / Confidentiality Concerns**. If none identified:

> No concerns identified during automated/manual repository review.

This is a publication checkpoint, not a legal determination.

---

## 11. Phased Delivery

| Phase | Scope | Gate |
|-------|-------|------|
| **3 — Foundation** | Astro, TS, styling, layout, typography, theme, a11y foundations, simplified nav, content schemas, publication controls. **Do not overbuild content.** | Review → approve commit |
| **4 — Content system** | Collections wiring, page shells, filters, radar framework, governance docs — still minimal invented copy | Review |
| **5 — Quality** | Build, tsc, lint, a11y/link checks, content security review | Fix |
| **6 — Publication review** | `PRE-PUBLICATION-REVIEW.md` | **STOP — explicit approval** |
| **7 — Publish** | Merge to `main` → Actions → Pages | Only after approval |

### Phase 3 explicit non-goals

- Large volumes of professional content
- Placeholder articles/architecture pages exposed publicly
- Radar classifications
- Email exposure
- Deploy workflows that publish the feature branch
- Commits without review approval

---

## 12. Git Workflow

- Branch: `feature/portfolio-foundation` for Phases 3–6
- Meaningful commits after explicit approval of each phase result
- Before each major commit: show files/diff for review
- No force push; no merge to `main` until publication approval
- No public deploy from feature branch

---

## 13. Approval Log

| Decision | Status |
|----------|--------|
| Stack & architecture | Approved |
| RED never enters repository | Approved amendment |
| Production publication filtering (`status: published` only) | Approved amendment |
| Feature branch workflow | Approved amendment |
| Simplified primary navigation | Approved amendment |
| Experience (`/experience`) naming | Approved amendment |
| Hide empty Research / Reference / Radar sections | Approved amendment |
| Architecture Practice as centrepiece | Approved amendment |
| Claim → Evidence metadata model | Approved amendment |
| Architecture Perspectives terminology & disclaimer | Approved amendment |
| Radar independent-assessment disclaimer | Approved amendment |
| Build-time Mermaid → SVG | Approved amendment |
| Resume print stylesheet | Approved amendment |
| Contact privacy (no email until approved) | Approved amendment |
| Production content validation | Approved amendment |
| Sitemap/route exclusion of unpublished | Approved amendment |
| Pages deploy only from `main` | Approved amendment |
| Pre-publication inventory requirements | Approved amendment |
| Phase 3 scope restraint | Approved amendment |
| Shared publication approval for GREEN and AMBER (`approvedForPublication: true` required for any published entry) | Current amendment (Architecture v1.0 verification) |
