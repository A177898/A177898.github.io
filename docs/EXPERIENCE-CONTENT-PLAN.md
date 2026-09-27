# Phase 4A — Experience Content Planning

**Status:** Awaiting your factual input and approval before any Experience content is written or committed  
**Branch:** `feature/portfolio-foundation`  
**Scope:** Planning only — no Experience markdown entries, no employer research, no inference from other repositories or local files

---

## 1. Purpose

Define the Experience content model and the **exact factual information required from you** before any public career entries are authored.

This document intentionally contains **no career history**. Organisation names, role titles, dates, technologies, achievements and responsibilities will only be added when you supply them for publication and classify them appropriately.

---

## 2. Proposed content model

### 2.1 Storage

| Item | Proposal |
|------|----------|
| Collection | `experience` (`src/content/experience/`) |
| Format | One Markdown/MDX file per role (or per distinct role tenure) |
| Filename | `{order}-{short-slug}.md` e.g. `01-enterprise-architect-org.md` — slug chosen **after** you name the role; no slug invented now |
| Sort order | Explicit `order` field (ascending = earliest → latest, or reverse — confirm preference below) |
| Publication | Only `status: published` entries render on `/experience` and Resume |

### 2.2 Schema fields (aligned with foundation; refinements marked)

| Field | Type | Required for publish? | Classification notes |
|-------|------|----------------------|----------------------|
| `organisation` | string | Yes | **AMBER** until you approve naming the organisation publicly |
| `organisationDisplay` | string (optional) | No | Alternative public label if legal name must stay private (e.g. “Global financial services organisation”) — only if you provide it |
| `role` | string | Yes | Public job title as you want it stated |
| `period.start` | string | Yes | Prefer `YYYY-MM` or `YYYY`; confirm format |
| `period.end` | string \| omit | No | Omit or `"Present"` for current role — confirm wording |
| `summary` | string (1–3 sentences) | Yes | High-level; no internal systems, metrics, or customer detail |
| `responsibilities` | string[] | Optional | High-level duties; **AMBER** |
| `capabilitiesDeveloped` | string[] | Optional | Prefer mapping to Architecture Practice capability ids/names where useful |
| `technologies` | string[] | Optional | **AMBER** — do not list until you approve each item |
| `achievements` | string[] | Optional | **AMBER** — no quantitative claims unless you supply and verify them |
| `status` | `placeholder` \| `draft` \| `published` | Yes | Production shows `published` only |
| `classification` | `green` \| `amber` | Yes | **RED never enters the repo** |
| `approvedForPublication` | boolean | Required if amber + published | Explicit gate |
| `seo.description` | string | Yes for published | Meta description |
| `relatedCapabilities` | string[] | Optional | Claim → Evidence links to capability ids |
| `relatedResearch` | string[] | Optional | Only after perspectives exist |
| `relatedArchitectures` | string[] | Optional | Only after reference architectures exist |
| `order` | number | Yes | Timeline sort key |
| `location` | string | Optional | City/region only if you approve — **no street address** |
| `employmentType` | string | Optional | e.g. full-time — only if you want it shown |

### 2.3 What must never appear in Experience entries

- Internal system / project / code names  
- Internal architecture diagrams or reconstructed estates  
- Customer names, confidential metrics, costs, roadmaps  
- Security configurations, schemas, APIs, account structures  
- Credentials or internal URLs  
- Quantitative claims you have not verified for public use  
- Content classified **RED**

### 2.4 Display behaviour (already in foundation)

- Empty Experience collection → page shell only; no placeholder prose  
- Timeline renders published entries only  
- Resume Experience section appears only when published entries exist  

### 2.5 Proposed public presentation (per role)

```
[Period]
Role title
Organisation (or approved display name)

Summary (short)

Optional sections when you supply content:
- Focus / responsibilities (bullets)
- Capabilities developed (tags or short list)
- Technologies (only approved)
```

No skill bars, logos, or employer branding assets unless you later supply approved assets.

---

## 3. Decisions required from you (before drafting)

Please confirm:

1. **Timeline order:** oldest → newest, or newest → oldest?  
2. **Date format:** `YYYY`, `YYYY-MM`, or prose (e.g. “Jan 2020”)?  
3. **Organisation names:** may legal employer names appear publicly, or do you prefer anonymised display labels for some/all roles?  
4. **How many distinct role entries** should the public Experience page include? (List count only — or list roles in the templates below.)  
5. **Current role:** use end date omitted, `Present`, or other wording?  
6. **Technologies:** omit entirely for v1, or include only an approved allow-list per role?  
7. **Achievements:** omit for v1, or include only non-quantitative, approved bullets?  
8. **Location:** show anything geographic?

---

## 4. Factual information required — per role

**Do not leave me to guess.** For each role you want published, please complete a copy of the template below (Role A, Role B, …).

If a field is intentionally omitted from public publication, write `OMIT` or `NOT FOR PUBLICATION`.  
If unknown / undecided, write `UNDECIDED`.  
Do **not** paste internal documents; write only what you approve for a public GitHub-backed site.

### Template — Role __

```text
PUBLICATION INTENT
- Include on public Experience page?: Yes / No
- Include on Resume page?: Yes / No
- Classification: green / amber
- If amber, approve for publication now?: Yes / No / Later

IDENTITY
- Organisation legal name (if public): 
- Organisation public display name (if different / anonymised): 
- Role title (exact public wording): 
- Location (if any): 
- Employment type (if any): 

PERIOD
- Start (preferred format): 
- End (or Present): 

NARRATIVE
- Summary (1–3 public sentences): 
- Responsibilities (bullets; high-level only): 
  - 
  - 
- Capabilities developed (optional; map to Architecture Practice if useful): 
  - 
- Technologies (optional; each must be approved): 
  - 
- Achievements (optional; no invented metrics): 
  - 

CLAIM → EVIDENCE (optional)
- relatedCapabilities (ids/names): 
- Notes on what must stay out of this entry: 

SEO
- Meta description (or “draft for me from summary”): 
```

### Role slots to complete

Provide as many as you need. Suggested labels only — **not** an assertion that these roles exist:

| Slot | Your label for this tenure | Status |
|------|----------------------------|--------|
| Role A | _awaiting your label_ | Not provided |
| Role B | _awaiting your label_ | Not provided |
| Role C | _awaiting your label_ | Not provided |
| Role D | _awaiting your label_ | Not provided |
| Role E+ | Add rows as required | Not provided |

---

## 5. Writing rules (once you supply facts)

When you approve moving from planning → drafting:

1. Use **only** text you provided in the templates (or later explicit corrections).  
2. Prefer high-level wording that cannot reconstruct an employer architecture.  
3. Treat technologies, achievements, and detailed responsibilities as **AMBER** until `approvedForPublication: true`.  
4. If uncertain whether a phrase is safe → **stop and ask**.  
5. No mining of LinkedIn, CV PDFs, other repos, Confluence, or local employer materials unless you paste approved excerpts into this process.

---

## 6. Out of scope for Phase 4A

- Writing or committing Experience markdown files  
- Inferring career history from this machine or other repositories  
- Research / Reference Architecture / Technology Radar content  
- Merge to `main` or public deployment  

---

## 7. Approval gate

Please reply with:

1. Answers to **§3 Decisions**  
2. Completed **§4 Role templates** for every tenure you want considered  
3. Explicit statement: whether I may proceed to **Phase 4B — draft Experience entries (unpublished / draft status)** from that material  

Until then: **no Experience content will be invented or implemented.**
