# Meta Recommendations Enhancement Programme

Planning document for the approved Meta Recommendations Enhancement Programme.

## Programme Status

| Field | Value |
| --- | --- |
| Branch | `meta-recommendations` |
| Branched from | `main` @ `13111dd` (`Change pendingAppointment status to False`) |
| Working tree at planning | Clean (product files unchanged) |
| Planning date | 2026-10-04 |
| Plan review | **Approved** (2026-10-04) with process clarifications below |
| Implementation | One task at a time after plan approval; human approval after every task |

### Baseline quality checks (recorded 2026-10-04)

| Command | Result |
| --- | --- |
| `npm run validate` | **PASS** — Content validation passed (12 file(s) scanned) |
| `npm run test:publication` | **PASS** — 45 checks |
| `npm run check` | **PASS** — 0 errors, 0 warnings, 0 hints (73 files) |
| `PUBLIC_SITE_URL=https://A177898.github.io npm run build` | **PASS** — 15 pages built; radar pruned; sitemap/robots rewritten |

Build notes (non-blocking):

- Node engine warning: package requires `>=22.19.0`, environment had `v22.14.0` (build still succeeded).
- Vite module-level directive warnings on MDX `"use astro:head-inject"` (existing Astro/MDX behaviour).
- Empty `leadership` collection warning during content sync.

### Baseline performance snapshot (production `dist/`)

| Metric | Baseline |
| --- | --- |
| Total `dist/` size | ~873 KiB (1008K on disk) / **894,279 bytes** |
| CSS | **1 file**, **117,041 bytes** (~114.3 KiB) — `dist/_astro/PageLayout.*.css` |
| External JS files | **0** |
| Inline `<script>` payload (sum across HTML) | **~46.9 KiB** across **50** script blocks |
| HTML pages after prune | **14** (radar route pruned) |
| Fonts (`.woff2`) | **13 files**, ~326 KiB |
| Runtime dependencies | **10** (`astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/markdown-satteri`, Tailwind/fonts, `yaml`, `zod`) |
| Dev dependencies | **3** (`@astrojs/check`, `tsx`, `typescript`) |
| Client script sources | Theme boot (`BaseLayout`), `ThemeToggle`, `Header` (nav), `RevealInit`, `ReadingProgress`, `TableOfContents` |
| Lighthouse | Not run (no tooling added solely for scoring) |

Largest HTML artefacts:

- RA01 `enterprise-authorization` ~104 KiB HTML
- Perspective 03 (authorization) ~63 KiB HTML
- Homepage ~27 KiB HTML

### Baseline UX inspection summary

Viewports sampled: **1440 / 1280 / 1024 / 768 / 390**. Themes: **dark (default)** and **light** (Home, Experience, Practice, RA01).

| Surface | Baseline observation |
| --- | --- |
| Home | Strong brand-first hero; proposition + BIDAT explanation are textual in first viewport. Existing `EnterpriseArchitectureApproach` visual sits **below the fold** and already communicates Strategy → BA → BIDAT → transition/outcomes. |
| About | Restates proposition + EA framing; career progression rails exist; limited narrative of how each stage broadened perspective. |
| Experience | Timeline is clear; EA role already shows **`Oct 2026 — Present`**. Role blocks share similar structure; progression is stated in lead copy more than visually differentiated between entries. |
| Architecture Hub | Evidence journey exists (Practice → Perspectives → Reference). Feels like a quiet index; no published counts; cards repeat copy. Radar correctly hidden when empty. |
| Architecture Practice | Content-rich; reuses homepage EA model (`variant="full"`). Capability domains are text-heavy; governance “no central bottleneck” idea is present but thin. |
| Resume | Print/Save as PDF via `window.print()` + `print.css`. No shipped PDF. `DownloadResume` exists but unused / `available=false`. |
| Contact | Simple channels only — keep that constraint. |
| Perspectives index | Clean list of 3 published perspectives. |
| P01 / P02 / P03 | Already use `ArchitectureFlow` and related components; still opportunity for higher-value thesis diagrams (canvas, model comparison, pseudo-policy). |
| RA index / RA01 | Strong prose + existing logical/runtime visuals; deployment/trust/context still partly ASCII/prose. |
| 404 | Generic “Page not found”; single Return home CTA. |
| Responsive | Mobile collapses nav; hero stacks cleanly. Dense EA diagram / BIDAT columns will need careful treatment in visual tasks. |

### Critical date baseline note (TASK-01)

As of commit `13111dd`, experience content already has:

```yaml
period:
  start: Oct 2026
pendingAppointment: False
```

Rendered Experience and Resume already show **`Oct 2026 — Present`**, not `Effective Oct 2026`.  
**TASK-01 remains first** as a verification + residual cleanup task. Do not manufacture a product-file change if production UX already satisfies the acceptance criteria.

### Approved process clarifications (2026-10-04)

1. **TASK-01 may complete with verification only.** If Experience and Resume already render `Oct 2026 — Present` and no inappropriate pending/future treatment remains in production UX, do not manufacture a code change. No empty implementation commit.
2. **TASK-10 prefers existing Print / Save as PDF** unless a build-time PDF option can be shown to add negligible dependency, CI and maintenance cost. Do not add heavyweight browser/PDF tooling merely to create a downloadable file.
3. **TASK-15 remains assess-first.** Do not add an additional RA01 context diagram unless it materially improves orientation beyond the existing `AuthorizationLogicalModel`.

---

## Rules

- One task at a time
- Human approval after every task
- No automatic continuation to the next task
- One logical commit per approved task (commit only when explicitly instructed after approval)
- Verification-only task outcomes are valid when acceptance criteria already hold — no empty commits
- No employer IP
- No invented metrics, adoption claims, certifications, or education
- Zero-cost static architecture retained: GitHub → Actions → Astro static build → GitHub Pages
- No backend, databases, serverless, paid hosting/analytics/CMS, runtime APIs
- Prefer Astro / HTML / CSS / minimal vanilla JS / static SVG / build-time generation
- Do not add React/Vue/Svelte, GSAP, Three.js, or particle engines unless already present and clearly justified
- Status values only: `NOT STARTED` · `IN PROGRESS` · `READY FOR REVIEW` · `APPROVED` · `BLOCKED`
- Only the human reviewer may mark a task `APPROVED`
- Empty / unpublished sections remain hidden (no “Coming Soon” Radar)

### Implementation protocol (after plan approval)

1. Mark task `IN PROGRESS`
2. Re-read acceptance criteria
3. Implement **only** that task — or, for verification tasks, confirm no product change is required
4. Run task-specific validation
5. Run repository checks where appropriate
6. Mark task `READY FOR REVIEW`
7. Report files changed (or none), before/after / evidence, a11y/perf impact, suggested commit message (or “no implementation commit”)
8. **STOP**

---

## Out of scope (explicitly rejected)

Do **not** implement:

- Calendly / response-time promises
- Complex contact form or backend contact processing
- OPA/Rego samples; Cedar samples; proprietary policy languages
- OpenAPI implementation of RA01 decision contract
- “Adopted” badge; anonymous “used by X squads/journeys” claims
- Invented metrics
- Technology Radar “coming soon”
- Mandatory one-page résumé
- Vendor/product endorsements
- C4 Container diagrams purely for the sake of using C4
- Additional Perspectives
- Additional Reference Architectures
- Paid PDF services / backend PDF generation / runtime PDF APIs

---

## Dependency overview

```
TASK-01 (date transition / residual cleanup)
    ↓
TASK-03 (homepage credibility) ──┐
TASK-02 (homepage visual model) ─┼─→ may share styling tokens with TASK-08
TASK-04 (About story)           ─┤
TASK-05 (beliefs/boundaries)    ─┤
TASK-06 (Experience structure)  ─┘
    ↓
TASK-07 (Architecture Hub)
TASK-08 (Practice visual models) ← coordinate with TASK-02 reuse
TASK-09 (operating boundaries)   ← after/with TASK-05 principles language
    ↓
TASK-10 (Resume download) — can proceed after TASK-01; mostly independent
    ↓
TASK-11 (P01 visuals)
TASK-12 (P02 canvas)
TASK-13 (P03 comparison) → TASK-14 (pseudo-policy) depends on comparison framing
    ↓
TASK-15 → TASK-16 → TASK-17 → TASK-18 (RA01 visual suite; shared diagram styling)
    ↓
TASK-19 (404) — independent polish; may run earlier if desired
    ↓
TASK-20 (final portfolio-wide review) — depends on TASK-01…19
```

Shared component opportunities (do not over-engineer):

| Opportunity | Likely consumers | Notes |
| --- | --- | --- |
| Enhance `ArchitectureFlow` / new `ArchitectureSequence` | TASK-11, TASK-16, possibly TASK-02 | Keep presentation-only; labels supplied by content |
| Enhance `ArchitectureCompare` / new comparison matrix | TASK-13, TASK-18 | Prefer table+figure hybrid for multi-dimension compare |
| EA approach diagram primitives (`.ea-*`) | TASK-02, TASK-08 | Extend existing `EnterpriseArchitectureApproach` rather than duplicating |
| Principle / boundary callout pattern | TASK-05, TASK-09 | Reuse `PrincipleCallout` carefully; avoid article-only tone on Practice/About |
| Diagram CSS tokens in `global.css` | TASK-02, 08, 11–18 | One visual language; avoid dashboard cards |

---

## Recommended implementation order

Numeric order is **mostly** sound. Recommended sequence with rationale:

1. **TASK-01** — date residual cleanup / verification (P0; unblocks factual baseline)
2. **TASK-03** — homepage credibility line (small, low risk; clarifies hero before visual work)
3. **TASK-02** — homepage visual architecture model (extends existing EA diagram)
4. **TASK-04** — About career story
5. **TASK-05** — architecture beliefs / boundaries
6. **TASK-06** — Experience differentiation
7. **TASK-07** — Architecture Hub
8. **TASK-08** — Practice visual models (reuse TASK-02 primitives where useful)
9. **TASK-09** — Practice operating boundaries (after beliefs language exists)
10. **TASK-10** — Resume download recommendation + implement chosen path
11. **TASK-11** — Perspective 01 visuals
12. **TASK-12** — Perspective 02 platform canvas
13. **TASK-13** — Perspective 03 model comparison
14. **TASK-14** — Perspective 03 vendor-neutral pseudo-policy
15. **TASK-15 → 16 → 17 → 18** — RA01 visual suite in that order
16. **TASK-19** — on-brand 404 (may be interleaved earlier after TASK-01 if desired)
17. **TASK-20** — final review only

Do **not** merge tasks merely because they touch the same file. Keep individually reviewable outcomes.

---

## Tasks

### TASK-01 — Enterprise Architect Date Transition

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P0 |
| Dependencies | None |
| Human review required | Yes — before any subsequent task |

**Outcome:** **NO PRODUCT CHANGE REQUIRED** (verification-only). **Approved 2026-10-04** — no implementation commit.

**Baseline finding:** Display already uses `Oct 2026 — Present` on Experience and Resume because `pendingAppointment: False` on `01-enterprise-architect-standard-bank.md`. Residual pending-appointment plumbing still exists for genuinely future-dated roles and must be retained.

**Objective:** Ensure the Enterprise Architect appointment is consistently represented as a current role (`Oct 2026 — Present`) across all published portfolio surfaces, with no pending/future appointment treatment for this role in production UX, while preserving title, employer, start date, and published state.

**Valid outcomes:**

- Product-file changes only if residual incorrect pending/future treatment remains for this role.
- **Verification-only completion** if Experience and Resume already render `Oct 2026 — Present` and production UX has no inappropriate pending treatment. In that case: record evidence, make no product-file changes, and create **no empty implementation commit**.

**Do not:**

- Manufacture a code change for its own sake
- Change unrelated career content
- Remove generic `pendingAppointment` support that remains useful for future-dated roles

**Files likely affected (only if cleanup needed):**

- `src/content/experience/01-enterprise-architect-standard-bank.md`
- `src/pages/experience.astro`
- `src/pages/resume.astro`
- `src/components/CareerTimeline.astro`
- `src/utils/experience.ts` (keep helper behaviour for true pending cases)
- `src/content.config.ts` / `src/types/experience.ts` (comments only if clarifying)
- `scripts/test-publication.ts` (retain pending helper tests)

**Acceptance criteria:**

- [x] Published Experience shows `Oct 2026 — Present` for Enterprise Architect
- [x] Published Resume shows the same period label
- [x] No production surface shows `Effective Oct 2026`
- [x] No production surface shows `Pending effective date`
- [x] Title remains Enterprise Architect
- [x] Employer remains Standard Bank Group
- [x] Start remains Oct 2026
- [x] Publication metadata unchanged
- [x] Other career entries untouched
- [x] Generic support for genuinely future appointments is retained

**Validation:**

- `npm run validate` — PASS
- `npm run test:publication` — PASS (45 checks; pending helper tests retained)
- `npm run check` — PASS
- `PUBLIC_SITE_URL=https://A177898.github.io npm run build` — PASS
- Inspect `dist/experience/index.html` and `dist/resume/index.html` — both associate Enterprise Architect / Standard Bank Group with `Oct 2026 — Present`
- Dist-wide search: `Effective Oct 2026` = 0; `Pending effective date` = 0

**Verification notes (2026-10-04):**

- Frontmatter (`01-enterprise-architect-standard-bank.md`): `role: Enterprise Architect`, `organisation: Standard Bank Group`, `period.start: Oct 2026`, `pendingAppointment: False`, `status: published`, `classification: amber`, `approvedForPublication: true`
- Experience timeline periods remain: Oct 2026 — Present; Jun 2024 — Sep 2026; May 2023 — Jun 2024; Apr 2022 — May 2023; Mar 2019 — Apr 2022; Jul 2015 — Feb 2019; Mar 2014 — Jun 2015; Jan 2010 — Feb 2014
- “Pending effective date” UI remains DEV-only gated (`showDraftIndicators && pendingAppointment === true`) and does not render for this role
- Generic `formatExperiencePeriod(..., { pendingAppointment: true }) → Effective {start}` retained for future-dated roles
- Product files modified for TASK-01: **None**
- Implementation commit: **None** (no empty commit)

---

### TASK-02 — Homepage Visual Architecture Model

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: TASK-03 optional before/after; coordinate reuse with TASK-08 |
| Human review required | Yes |

**Outcome:** **IMPLEMENTED** — enhanced existing `EnterpriseArchitectureApproach` (homepage focused variant + shared lifecycle clarity); no second competing model; no new JS dependencies.

**Baseline finding:** `EnterpriseArchitectureApproach` already provided Strategy → BA → BIDAT → transition bundle → outcomes. Lifecycle Target / Transition / Delivery was compressed; definitions and feedback cue needed strengthening for homepage scanability.

**Objective:** Transform homepage EA/BIDAT positioning into a stronger visual architecture model that communicates architecture (not decoration), while preserving BIDAT as Yusuf’s framing (not an industry standard claim — see `eaApproach.synthesisNote`).

**Files modified:**

- `src/components/EnterpriseArchitectureApproach.astro` — homepage-focused layered model; shared Target→Transition→Delivery journey; focusable layers; compact cross-domain on homepage; fuller Practice variant retained
- `src/data/ea-approach.ts` — definitions, `changeStages`, BA summary, feedback cue; BIDAT framing preserved
- `src/styles/global.css` — `.ea-layer*`, `.ea-journey`, `.ea-cross-compact`, focus/hover, reduced-motion
- `docs/META-RECOMMENDATIONS-TASKS.md` — status notes

**Acceptance criteria:**

- [x] Visual communicates approximately: Strategy → Business Architecture / capability → Information/Data/Application/Technology → cross-domain People·Process·Technology → Target → Transition/Roadmap → Delivery → Outcomes/Feedback
- [x] BIDAT not presented as an industry standard (`synthesisNote` retained)
- [x] Responsive structured HTML/CSS; semantic labels / figcaption / text equivalent
- [x] Lightweight interaction only (CSS hover/focus); keyboard accessible; reduced-motion safe
- [x] No heavy JS libraries; dependencies added = 0
- [x] Practice continues with richer `full` variant; homepage uses focused variant
- [x] Executive tone preserved; not dashboard-like

**Validation:**

- Responsive 1440/1280/1024/768/390 dark+light — no horizontal overflow
- Keyboard focus across 11 `[data-ea-layer]` regions
- `prefers-reduced-motion` disables layer transitions
- `npm run validate` / `test:publication` / `check` / production build — PASS
- Performance vs immediate pre-change: CSS **+4.3 KiB**, JS **0**, homepage HTML **+3.7 KiB**, total dist **+12.8 KiB**

**Commit:** not created yet — awaiting human approval.

---

### TASK-03 — Homepage Career Credibility Line

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: before or immediately after TASK-02; inspect duplication with About/Experience leads |
| Human review required | Yes |

**Objective:** Add a restrained professional progression/proof statement near the hero without comparative claims or invented tenure metrics.

**Preferred concept (adapt after duplication check):**  
“From software engineering to enterprise architecture — experience spanning transactional systems, digital engineering, technical leadership, solution architecture and enterprise technology strategy.”

**Existing overlap to avoid duplicating verbatim:**

- Experience page lead already: “Progression from software engineering through technical leadership…”
- `profile.careerArc` / About summary already cover the arc

**Files modified:**

- `src/data/profile.ts` — added `careerCredibility`
- `src/components/Hero.astro` — optional `credibility` prop; rendered after lead, before actions
- `src/pages/index.astro` — passes `profile.careerCredibility`
- `src/styles/global.css` — `.hero-block__credibility` (muted, smaller, subtle top rule)

**Acceptance criteria:**

- [x] Credibility line appears near hero, restrained
- [x] No “14 years…” or comparative South Africa claims
- [x] No material duplication with adjacent homepage copy
- [x] Does not overpower brand/name hierarchy

**Final wording:**  
`From software engineering to enterprise architecture — experience spanning transactional systems, digital engineering, technical leadership, solution architecture and enterprise technology strategy.`

**Duplication approach:** Homepage line emphasises domains spanned (transactional systems, digital engineering, … strategy). Experience lead keeps role→scope rails. About keeps systems→platforms→enterprise narrative. Resume still uses `careerArc` arrow string. About/Experience content untouched.

**Validation:**

- `npm run validate` — PASS
- `npm run test:publication` — PASS
- `npm run check` — PASS
- `PUBLIC_SITE_URL=https://A177898.github.io npm run build` — PASS
- Responsive review 1440/1280/1024/768/390 dark+light — no horizontal overflow; name/role/proposition remain dominant
- Performance vs immediate pre-change build: CSS **+635 B**, JS **0**, total dist **+874 B**

**Commit:** not created yet — awaiting human approval.

---

### TASK-04 — About Page: Tell the Career Story

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: after TASK-03 to keep Home/About differentiation |
| Human review required | Yes |

**Outcome:** **IMPLEMENTED** — About now synthesises a six-stage career story; BIDAT restatement removed; dual Role/Scope progression retained and clarified.

**Objective:** Strengthen About so it narrates progression (how each stage broadened perspective) rather than repeating Home’s EA proposition.

**Story arc (supported history only):**  
COBOL / enterprise engineering → full-stack digital engineering → technical leadership → architecture & innovation → solution architecture → enterprise architecture

**Preserve dual progression:**

- Role: Software Engineering → Technical Leadership → Solution Architecture → Enterprise Architecture
- Scope: Systems → Solutions → Platforms → Enterprise

**Files modified:**

- `src/pages/about.astro` — opening, career story stages, progression, closing; links to Experience / Home approach / Practice
- `src/data/profile.ts` — replaced `aboutSummary` with `aboutOpening`, `aboutStory`, `aboutClosing`
- `src/components/CareerProgression.astro` — Scope label clarified; text equivalents for Role/Scope rails
- `src/styles/global.css` — `.about-story*` / `.about-opening` / `.about-closing`

**Acceptance criteria:**

- [x] About tells progression story without autobiography length
- [x] Uses only supported career history already in experience content
- [x] Dual role/scope progression preserved
- [x] Distinct from Home (BIDAT paragraph removed; career narrative added)
- [x] No invented achievements/metrics

**Validation:**

- `npm run validate` / `test:publication` / `check` / production build — PASS
- Responsive 1440–390 dark+light — no overflow
- Performance vs true pre-change: CSS **+1,551 B**, JS **0**, About HTML **+3,362 B**, total dist **+4,913 B**
- Experience entries / publication metadata untouched

**Commit:** not created yet — awaiting human approval.

---

### TASK-05 — Architecture Beliefs / Boundaries

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: before TASK-09 (shared language); decide page home (About and/or Practice) |
| Human review required | Yes |

**Outcome:** **IMPLEMENTED** — placed on Architecture Practice only (not About), after the EA approach model and before capability domains.

**Placement decision:** Architecture Practice is the primary home (how Yusuf practises architecture). About remains career narrative. No duplication across pages.

**Objective:** Add a concise professional-principles section (beliefs, not universal truths), plus a small “What architecture is not” / boundaries set.

**Files modified:**

- `src/data/architecture-beliefs.ts` — principles + boundaries copy
- `src/components/ArchitectureBeliefs.astro` — section component
- `src/pages/architecture/practice.astro` — insert after EA approach
- `src/styles/global.css` — `.beliefs-*` styles
- `docs/META-RECOMMENDATIONS-TASKS.md` — status notes

**Acceptance criteria:**

- [x] Framed as professional principles / personal practice, not universal laws
- [x] Includes concise boundaries (“architecture is not…”)
- [x] No employer-specific governance claims
- [x] Concise; executive tone; not a manifesto wall

**Validation:**

- `npm run validate` / `test:publication` / `check` / production build — PASS
- Responsive 1440–390 dark+light — no overflow
- Performance vs true pre-change: CSS **+2,753 B**, JS **0**, Practice HTML **+3,397 B**, total dist **+6,150 B**
- About unchanged; Experience / Perspectives / RA untouched

**Commit:** not created yet — awaiting human approval.

---

### TASK-06 — Experience Differentiation

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: after TASK-01; may align language with TASK-04 |
| Human review required | Yes |

**Outcome:** **IMPLEMENTED** — presentation-led differentiation on Experience only. Existing `density` + `narrativeGroup` drive visual weight and scope markers. No invented achievements; titles/dates/employers/publication metadata unchanged. Architecture & Innovation density adjusted `detailed` → `moderate` to match preferred recent-vs-earlier weighting. Review correction: Solutions Architect `narrativeGroup` `Platforms → Enterprise` → `Solutions → Platforms` so Enterprise is first reached at Enterprise Architect.

**Objective:** Improve Experience so role descriptions do not blur together structurally/visually. Make Systems → Solutions → Platforms → Enterprise progression visibly apparent. Recent roles may receive more visual weight (already partly via `density`).

**Files modified:**

- `src/pages/experience.astro` — chronology-focused lead; scope rail
- `src/components/CareerTimeline.astro` — Scope label + active arc stages; Contribution/Perspective split for non-concise multi-paragraph roles; Current marker
- `src/components/CareerProgression.astro` — rail variant clarification (scope progression)
- `src/content/experience/02-solutions-architect-standard-bank.md` — `narrativeGroup` only (`Platforms → Enterprise` → `Solutions → Platforms`)
- `src/content/experience/03-developer-ea-innovation-standard-bank.md` — density only (`detailed` → `moderate`)
- `src/styles/global.css` — rail, timeline density, scope/block styles
- `docs/META-RECOMMENDATIONS-TASKS.md` — status notes

**Acceptance criteria:**

- [x] Roles are more distinguishable by structure/weight
- [x] Progression Systems → Solutions → Platforms → Enterprise is visually apparent
- [x] Factual chronology unchanged
- [x] No invented metrics/achievements
- [x] Concise density still used for earlier roles

**Validation:**

- `npm run validate` / `test:publication` / `check` / production build — PASS
- Responsive 1440–390 dark+light — no horizontal overflow
- Performance vs true pre-change: CSS **+5,510 B**, JS **0**, Experience HTML **+8,732 B**, total dist **+14,242 B**
- No new dependencies

**Commit:** `feat: differentiate Experience roles by architectural scope`

---

### TASK-07 — Architecture Hub Enhancement

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | None hard; benefits from Practice/Perspectives/RA already published |
| Human review required | Yes |

**Outcome:** **IMPLEMENTED** — Architecture Hub rewritten as an editorial evidence entry point: intro, Practice → Perspectives → Reference journey, foundational Practice entry, Perspectives/RA entries with production-derived counts (3 / 1), relationship cue. Radar remains absent (no published entries). No publication metadata changes.

**Objective:** Transform Architecture Hub from a quiet index into a stronger architecture entry point while preserving Practice → Perspectives → Reference evidence journey.

**Files modified:**

- `src/pages/architecture/index.astro` — hub IA, journey, differentiated entries, dynamic published counts
- `src/styles/global.css` — `.arch-hub-*` editorial hierarchy styles
- `docs/META-RECOMMENDATIONS-TASKS.md` — status notes

**Acceptance criteria:**

- [x] Stronger visual hierarchy as architecture entry point
- [x] Published counts: Perspectives **3**, Reference Architectures **1** (derived via `isPublished`)
- [x] Short explanation of each evidence type
- [x] Clearer connection to Architecture Practice
- [x] No Technology Radar “Coming Soon”
- [x] Empty sections remain hidden
- [x] Avoid dashboard aesthetics

**Validation:**

- `npm run validate` / `test:publication` / `check` / production build — PASS
- Hub links resolve; radar route pruned (404); no radar card on hub
- Responsive 1440–390 dark+light — no overflow
- Performance vs pre-change: CSS **+6,159 B**, JS **0**, Hub HTML **+1,068 B**, total dist **+7,227 B**
- No new dependencies

**Commit:** `feat: strengthen Architecture Hub as evidence entry point`

---

### TASK-08 — Architecture Practice Visual Models

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: after TASK-02 (reuse EA diagram primitives); inspect existing diagrams first |
| Human review required | Yes |

**Outcome:** **IMPLEMENTED** — Gap analysis confirmed EA/BIDAT already covers operating model + BA/IDAT + domain relationships. Added two models only: Architecture Governance and Architecture Engagement Lifecycle. No MODEL C (BIDAT duplicate). No TASK-09 operating-boundary prose.

**Gap analysis:**

- Strategy→…→feedback / BA vs IDAT / capability domains — already covered by `EnterpriseArchitectureApproach` + capability section
- Governance flow and engagement lifecycle — were prose/principle-only; added as visual sequences

**Files modified:**

- `src/data/architecture-practice-models.ts` — model copy
- `src/components/ArchitectureSequence.astro` — shared sequence component (2 models; reusable later)
- `src/pages/architecture/practice.astro` — place models after Principles, before capability domains
- `src/styles/global.css` — `.arch-sequence-*` (extends beliefs/ea-feedback patterns)
- `docs/META-RECOMMENDATIONS-TASKS.md` — status notes

**Acceptance criteria:**

- [x] Only high-value models added; no diagram spam
- [x] No unnecessary duplication of existing EA approach diagram
- [x] Models are conceptual, vendor-neutral, non-employer-specific
- [x] Accessible labels; responsive; reduced-motion safe

**Validation:**

- `npm run validate` / `test:publication` / `check` / production build — PASS
- Responsive 1440–390 dark+light — no overflow
- Performance vs true pre-change: CSS **+3,001 B**, JS **0**, Practice HTML **+5,873 B**, total dist **+8,874 B**
- No new dependencies

**Commit:** `feat: add governance and engagement models to Practice`

---

### TASK-09 — Architecture Practice: Operating Boundaries

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: after TASK-05; can share section with TASK-08 model C |
| Human review required | Yes |

**Outcome:** **IMPLEMENTED** — Operating boundaries section on Practice after Governance model and before Engagement lifecycle. Covers Guardrails vs Gatekeeping (with formal-governance nuance) and Architecture authority / Shared decision space / Delivery ownership. No employer-specific process; distinct from TASK-05 principles and TASK-08 sequences.

**Placement:** EA → Principles → Governance → **Operating boundaries** → Engagement → Capability domains.

**Files modified:**

- `src/data/architecture-operating-boundaries.ts` — copy
- `src/components/ArchitectureOperatingBoundaries.astro` — section component
- `src/pages/architecture/practice.astro` — insert + reorder relative to Engagement
- `src/styles/global.css` — `.operating-boundaries-*`
- `docs/META-RECOMMENDATIONS-TASKS.md` — status notes

**Acceptance criteria:**

- [x] Clear Guardrails vs Gatekeeping distinction
- [x] Clear Architecture authority vs Delivery ownership distinction
- [x] No employer-specific governance claims
- [x] Concise operating-model tone

**Validation:**

- `npm run validate` / `test:publication` / `check` / production build — PASS
- Responsive 1440–390 dark+light — no overflow
- Performance vs true pre-change: CSS **+4,341 B**, JS **0**, Practice HTML **+5,209 B**, total dist **+9,550 B**
- No new dependencies

**Commit:** `feat: clarify architecture operating boundaries on Practice`

---

### TASK-10 — Resume Download Experience

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: after TASK-01 so period labels are final |
| Human review required | Yes — **implementation recommendation required before coding if new dependencies are proposed** |

**Outcome:** **IMPLEMENTED** — Recommendation **OPTION B** (Print / Save as PDF). Option A rejected: no existing PDF toolchain; would require browser binaries / CI complexity / duplicate artefact sync. Web résumé remains authoritative.

**UX:** `ResumeActions` utility — Print / Save as PDF (`window.print()`), View Experience, authoritative-source hint. Misleading unused `DownloadResume.astro` removed (no PDF file exists).

**Print:** A4, ~14/12mm margins, white/light forced, nav/footer/actions hidden, role break-inside avoid. Measured print PDF ≈ **2 pages**.

**Files modified:**

- `src/components/ResumeActions.astro` — new utility actions
- `src/components/DownloadResume.astro` — removed (unused / misleading)
- `src/pages/resume.astro` — wire ResumeActions; role header markup for print grouping
- `src/styles/print.css` — resume print polish
- `src/styles/global.css` — resume utility screen styles
- `docs/META-RECOMMENDATIONS-TASKS.md` — status notes

**Acceptance criteria:**

- [x] Explicit recommendation recorded (OPTION B)
- [x] Print resume remains authoritative
- [x] No paid/backend/runtime PDF services
- [x] No heavyweight browser/PDF tooling added
- [x] Target 2 pages ideally, 3 max where required — not forced to 1 page
- [x] Zero-cost static architecture preserved

**Validation:**

- `npm run validate` / `test:publication` / `check` / production build — PASS
- Responsive 1440–390 dark+light — no overflow
- Print PDF (A4 via existing env browser tooling) ≈ **2 pages**
- Performance vs true pre-change: CSS **+1,083 B**, JS **0**, Resume HTML **+548 B**, total dist **+1,631 B**
- Dependencies added: **0** (`package.json` unchanged)

**Commit:** `feat: polish resume Print / Save as PDF experience`

---

### TASK-11 — Perspective 01 Visual Models

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: diagram component enhancements may help TASK-16 |
| Human review required | Yes |

**Outcome:** **IMPLEMENTED** — Gap analysis: current→target, transition sequence and governance cycle already present; missing coexistence and dependency visuals; traceability incomplete (no outcome/feedback). Added coexistence + dependency figures; enhanced traceability chain; consolidated duplicate CURRENT→TARGET in §6; labelled transition states as illustrative (`… n`).

**Files modified:**

- `src/content/perspectives/from-target-state-to-transition-architecture.mdx`
- `src/components/ArchitectureCoexistence.astro` — new
- `src/components/ArchitectureDependency.astro` — new
- `src/styles/global.css` — `.arch-coexist-*` / `.arch-depend-*`
- `docs/META-RECOMMENDATIONS-TASKS.md` — status notes

**Acceptance criteria:**

- [x] Diagrams reinforce existing approved content
- [x] No employer-specific examples
- [x] Article thesis unchanged
- [x] Accessible labels; responsive

**Validation:**

- `npm run validate` / `test:publication` / `check` / production build — PASS
- Responsive 1440–390 dark+light — no overflow
- Performance vs true pre-change: CSS **+5,558 B**, JS **0**, P01 HTML **+4,096 B**, total dist **+9,654 B**
- Dependencies added: **0**

**Commit:** `feat: add transition visuals to Perspective 01`

---

### TASK-12 — Perspective 02 Platform Capability Canvas

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: may introduce reusable canvas component |
| Human review required | Yes |

**Outcome:** **IMPLEMENTED** — Platform Capability Canvas added after §5 Boundaries. Independently developed aid disclaimer included. Dimensions grouped: Value / Consumption / Boundary & Control / Run & Evolve. Optional “Should this be a platform?” decision model **not added** — existing §2 trade-off principle + §14 `PerspectiveChecklist` already cover decision judgement without a simplistic algorithm.

**Files modified:**

- `src/data/platform-capability-canvas.ts` — canvas copy
- `src/components/PlatformCapabilityCanvas.astro` — canvas component
- `src/content/perspectives/designing-platforms-as-enterprise-capabilities.mdx` — placement after boundaries
- `src/styles/global.css` — `.platform-canvas-*`
- `docs/META-RECOMMENDATIONS-TASKS.md` — status notes

**Acceptance criteria:**

- [x] Canvas helps evaluate platform behaviour
- [x] Clearly presented as independently developed architectural aid
- [x] Optional decision model remains concise (omitted; checklist retained)
- [x] No invented adoption metrics
- [x] Responsive + accessible

**Validation:**

- `npm run validate` / `test:publication` / `check` / production build — PASS
- Responsive 1440–390 dark+light — no overflow
- Performance vs true pre-change: CSS **+4,235 B**, JS **0**, P02 HTML **+5,398 B**, total dist **+9,633 B**
- Dependencies added: **0**

**Commit:** `feat: add Platform Capability Canvas to Perspective 02`

---

### TASK-13 — Perspective 03 Authorization Model Comparison

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: precedes TASK-14; may share compare component with TASK-18 |
| Human review required | Yes |

**Perspective:** `src/content/perspectives/enterprise-authorization-beyond-rbac.mdx`

**Outcome:** **IMPLEMENTED** — Complementary authorization model comparison added in §5 after narrative model blurbs and before the existing combined `ArchitectureFlow`. Covers RBAC, ABAC, ReBAC, Policy-based authorization, and Mandates / Limits across What it expresses / Strength / Limitation / Best use. Policy framed as decision logic; Mandates / Limits as domain authority. Optional second composition model **not added** — existing combined flow already covers that. No pseudo-policy (TASK-14). **Approved 2026-10-04** — commit: `feat: add complementary authorization model comparison to Perspective 03`.

**Files modified:**

- `src/data/authorization-model-compare.ts` — comparison copy
- `src/components/AuthorizationModelCompare.astro` — semantic table + stacked mobile
- `src/content/perspectives/enterprise-authorization-beyond-rbac.mdx` — placement in §5
- `src/styles/global.css` — `.authz-compare*` styles

**Acceptance criteria:**

- [x] Comparison covers listed models and dimensions
- [x] Does not claim one model universally replaces another
- [x] Complements existing thesis; no vendor endorsement
- [x] Readable on mobile (table strategy considered)

**Validation:** Perspective review; a11y for table/figure; check/build.

---

### TASK-14 — Perspective 03 Vendor-Neutral Pseudo-Policy

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | **After TASK-13** (or immediately paired only if separable in review) |
| Human review required | Yes |

**Outcome:** **IMPLEMENTED** — Vendor-neutral illustrative pseudo-policy added at end of §9 (after complementary models in §5 and richer ALLOW/DENY/obligation semantics). Generic approval scenario combining RBAC authority, organisation scope, amount limit, mandate, separation of duties; OTHERWISE maps to DENY / REQUIRE_APPROVAL / STEP_UP_REQUIRED. Explicit non-executable disclaimer. Separate optional breakdown **not added** — OTHERWISE branch already maps condition → impact. **Approved 2026-10-04** — commit: `feat: add vendor-neutral pseudo-policy example to Perspective 03`.

**Files modified:**

- `src/data/authorization-pseudo-policy.ts` — example copy
- `src/components/AuthorizationPseudoPolicy.astro` — editorial block
- `src/content/perspectives/enterprise-authorization-beyond-rbac.mdx` — placement after §9 principle
- `src/styles/global.css` — `.authz-pseudo*` styles

**Acceptance criteria:**

- [x] Example follows SUBJECT/RESOURCE/AMOUNT/MANDATE/initiation-style logic from brief
- [x] Vendor-neutral pseudo syntax only
- [x] Reinforces “decision, not permission lookup”
- [x] No OpenAPI/contract implementation

**Validation:** Content review; build; ensure no accidental vendor syntax.

---

### TASK-15 — RA01 Enterprise Context Visual

| Field | Value |
| --- | --- |
| Status | APPROVED |
| Priority | P1 |
| Dependencies | Soft: start of RA01 visual suite; shares styling with TASK-16–18 |
| Human review required | Yes |

**RA01:** `src/content/architectures/enterprise-authorization.mdx`

**Outcome:** **NO PRODUCT CHANGE REQUIRED** (assess-first). Existing `AuthorizationLogicalModel` already provides enterprise orientation: Consumers → PEP → PDP → PEP enforcement → Domain authorization + invariants → Protected action, plus decision-information dependencies (Entitlements, Authorization Context, Published policy, Domain authorities) and PAP control plane. A separate higher-level context diagram would largely repeat those layers without adding a distinct abstraction. Enterprise vs domain boundary is reinforced by the logical model, Architecture Position boundaries, and the dedicated “Enterprise vs domain authorization” section. **Approved 2026-10-04** — planning-status commit only (`docs: mark TASK-15 approved`).

**Assessment (eight orientation questions):** answered by existing logical model + surrounding RA01 sections — see task report. No new diagram.

**Acceptance criteria:**

- [x] Explicit assess-then-implement (or assess-then-skip) decision documented in task notes when READY FOR REVIEW
- [x] No additional diagram unless it materially improves orientation beyond `AuthorizationLogicalModel`
- [x] If added: logical architecture view only — N/A (not added)

**Validation:** Assessment-only; no product-file delta; no empty implementation commit.

---

### TASK-16 — RA01 Runtime Decision Sequence

| Field | Value |
| --- | --- |
| Status | IN PROGRESS |
| Priority | P1 |
| Dependencies | Soft: after TASK-15 for shared styling; baseline `AuthorizationRuntimeFlow` already exists |
| Human review required | Yes |

**Objective:** Add or improve sequence-style visual: Consumer → PEP → PDP → decision information/policy → decision → obligation → re-evaluation → domain authorization → domain invariant → protected action; **DENY terminal**; vendor-neutral.

**Files likely affected:**

- `src/content/architectures/enterprise-authorization.mdx`
- `src/components/AuthorizationRuntimeFlow.astro`
- `src/styles/global.css`

**Acceptance criteria:**

- [ ] Sequence covers the listed responsibilities
- [ ] DENY is terminal
- [ ] Vendor-neutral; no deployment topology claim
- [ ] Complements rather than contradicts ADRs

**Validation:** RA01 section review; a11y; check/build.

---

### TASK-17 — RA01 Trust / Provenance Visual

| Field | Value |
| --- | --- |
| Status | NOT STARTED |
| Priority | P1 |
| Dependencies | Soft: after TASK-15/16 styling conventions |
| Human review required | Yes |

**Objective:** Create or refine trust model: Attribute → Value → Provenance → Authoritative Source → Freshness → Integrity Evidence → Trust Determination → Authorization Context. Reinforce: caller-supplied claim ≠ trusted authorization attribute.

**Baseline:** RA01 already has provenance prose/ASCII — elevate to clear visual without changing principles.

**Files likely affected:**

- `src/content/architectures/enterprise-authorization.mdx`
- New or extended diagram component
- `src/styles/global.css`

**Acceptance criteria:**

- [ ] Trust/provenance chain is visually clear
- [ ] Reinforces non-equivalence of caller claims and trusted attributes
- [ ] Vendor-neutral; conceptual not payload-schema-prescriptive

**Validation:** RA01 review; check/build.

---

### TASK-18 — RA01 Deployment Pattern Comparison

| Field | Value |
| --- | --- |
| Status | NOT STARTED |
| Priority | P1 |
| Dependencies | Soft: after TASK-13 compare patterns / shared matrix component; must not change ADRs |
| Human review required | Yes |

**Objective:** Visually compare Central decision service, Distributed decision nodes, Embedded evaluation, Hybrid across latency, consistency, blast radius, resilience, operational complexity. No universal winner.

**Baseline:** Section already exists as prose/ASCII under “Deployment patterns”.

**Files likely affected:**

- `src/content/architectures/enterprise-authorization.mdx`
- Comparison component / styles
- `src/styles/global.css`

**Acceptance criteria:**

- [ ] Visual comparison of four patterns and dimensions
- [ ] No ranked universal winner
- [ ] ADR decisions unchanged
- [ ] Vendor-neutral

**Validation:** RA01 review; ensure ADR tables untouched in meaning; build.

---

### TASK-19 — On-Brand 404

| Field | Value |
| --- | --- |
| Status | NOT STARTED |
| Priority | P2 |
| Dependencies | None (may be scheduled late or after TASK-01) |
| Human review required | Yes |

**Objective:** Enhance 404 with restrained architecture language and useful CTAs.

**Candidate copy:**

- “This transition state could not be found.”
- Support: “A target state without a transition path is difficult to reach. This page is no exception.”
- Actions: Return Home · Explore Architecture

**Files likely affected:**

- `src/pages/404.astro`
- Minimal styles if needed in `src/styles/global.css`

**Acceptance criteria:**

- [ ] On-brand, restrained, not overly humorous
- [ ] CTAs: Home + Architecture
- [ ] Works in dark/light and mobile

**Validation:** Visit unknown path in preview; visual check.

---

### TASK-20 — Final Visual / Discoverability Review

| Field | Value |
| --- | --- |
| Status | NOT STARTED |
| Priority | P1 |
| Dependencies | **All of TASK-01 through TASK-19** |
| Human review required | Yes |

**Objective:** Portfolio-wide UX review and refinement only after earlier tasks complete.

**Validate achievement of:**

- Stronger visual architecture communication
- Better scanability
- Stronger career differentiation
- Better editorial reading
- Stronger architecture credibility
- No developer-portfolio drift
- No excessive animation
- No content duplication
- No reduced accessibility
- No material performance regression vs baseline in this document

**Files likely affected:** Potentially small refinement touches across previously modified files only — no new programme scope.

**Acceptance criteria:**

- [ ] Review notes recorded against each success criterion
- [ ] Performance compared to baseline table above
- [ ] Only refinement fixes; no new backlog items silently expanded
- [ ] Final validate / test:publication / check / build pass

**Validation:** Full page matrix (Home→404), dark/light, key breakpoints; performance deltas; quality scripts.

---

## File ↔ task map (quick reference)

| Area | Primary files | Tasks |
| --- | --- | --- |
| EA date / experience period | `src/content/experience/01-*.md`, `experience.astro`, `resume.astro`, `CareerTimeline.astro`, `utils/experience.ts` | 01 |
| Homepage | `index.astro`, `Hero.astro`, `EnterpriseArchitectureApproach.astro`, `profile.ts`, `ea-approach.ts` | 02, 03 |
| About | `about.astro`, `profile.ts`, `CareerProgression.astro` | 04, 05* |
| Experience UX | `experience.astro`, `CareerTimeline.astro`, `CareerProgression.astro` | 06 |
| Architecture Hub | `architecture/index.astro` | 07 |
| Architecture Practice | `architecture/practice.astro`, `capabilities.ts`, EA approach components | 05*, 08, 09 |
| Resume download | `resume.astro`, `DownloadResume.astro`, `print.css`, possibly build scripts | 10 |
| Perspective 01 | `perspectives/from-target-state-to-transition-architecture.mdx` | 11 |
| Perspective 02 | `perspectives/designing-platforms-as-enterprise-capabilities.mdx` | 12 |
| Perspective 03 | `perspectives/enterprise-authorization-beyond-rbac.mdx` | 13, 14 |
| RA01 | `architectures/enterprise-authorization.mdx`, authz diagram components | 15–18 |
| 404 | `404.astro` | 19 |
| Shared diagram CSS | `src/styles/global.css` | 02, 08, 11–18 |
| Final review | cross-cutting | 20 |

\*TASK-05 placement to be confirmed (About and/or Practice) at implementation time.

---

## Risks

| Risk type | Risk | Mitigation |
| --- | --- | --- |
| UX | Over-diagramming turns editorial site into a documentation portal / dashboard | Cap diagrams per page; reuse components; TASK-20 gate |
| UX | Homepage hero becomes crowded if credibility line + visual model compete | Keep brand/name dominant; one short credibility line; visual below or carefully integrated |
| Performance | Diagram CSS + large RA/Perspective HTML already dominate size | Prefer CSS/HTML reuse; avoid image-heavy assets; measure vs baseline |
| Performance | Build-time PDF tooling could bloat deps / CI | Prefer print polish (B) unless A is clearly lightweight and approved |
| Content | Accidentally inventing metrics/achievements while “differentiating” Experience | Structure presentation; do not add factual claims |
| Content | Duplicating Home / About / Practice BIDAT explanations | Explicit differentiation goals in TASK-02/04/08 |
| Architecture/IP | Employer-specific governance or authorization examples | Keep vendor-neutral and personal-practice framing; no internal programmes |
| Architecture/IP | Presenting BIDAT or Platform Canvas as industry standards | Keep existing “personal framing / independently developed aid” disclaimers |
| Responsive | BIDAT columns, comparison matrices, canvases break at 390px | Design mobile stacking first for each new visual; test 390/768 |
| Accessibility | Hover-only diagram definitions | Keyboard focus + accessible names; reduced-motion safe |
| Process | Auto-continuing tasks or committing without approval | Hard stop protocol; statuses never self-APPROVED |

---

## Recommended first task

**TASK-01 — Enterprise Architect Date Transition (verification + residual cleanup)**

Correct P0 first task after plan approval: confirm published consistency for `Oct 2026 — Present`, remove residual pending treatment for this role only if found, retain generic future-appointment support, and lock the factual baseline before UX enhancement work. Verification-only completion is valid.

---

## Planning deliverable checklist

- [x] Branch `meta-recommendations` created from reviewed baseline
- [x] Baseline quality checks recorded
- [x] Baseline UX inspected across key pages, breakpoints, themes
- [x] Task file created at `docs/META-RECOMMENDATIONS-TASKS.md`
- [x] Tasks mapped to files/components
- [x] Dependencies and recommended order documented
- [x] Out-of-scope list recorded
- [x] Performance baseline recorded
- [x] **Human review of this plan — approved** (with process clarifications)
- [ ] Implementation proceeds one task at a time after each human approval
