# Yusuf Kader — Enterprise Architecture Portfolio

Professional online portfolio for **Yusuf Kader**, positioned for Enterprise Architect /
Senior Enterprise Architect opportunities.

This is an executive technology and architecture portfolio — not a conventional developer
portfolio or a HTML CV.

## Status

Foundation in progress on `feature/portfolio-foundation`.

Public deployment occurs **only** from `main` after explicit publication approval.
The feature branch is not deployed to GitHub Pages.

## Stack

- Astro (static site generation)
- TypeScript
- Tailwind CSS
- Markdown / MDX content collections
- GitHub Pages (zero recurring hosting cost)

## Local development

```bash
npm install
npm run dev
```

```bash
# Production builds require a real public Pages URL (not example.com):
PUBLIC_SITE_URL=https://your-username.github.io npm run build
# or project site:
PUBLIC_SITE_URL=https://your-username.github.io/your-repo npm run build
npm run preview
```

```bash
npm run validate
npm run test:publication
npm run check
```

Document titles use `Page Title | Yusuf Kader`. First-visit theme defaults to
**dark**; the theme toggle persists a visitor preference in `localStorage`.

## Hosting Model

```
GitHub repository
  → GitHub Actions (on main)
  → Astro static build (HTML / CSS / JS / images)
  → GitHub Pages
```

Zero recurring hosting infrastructure cost. No Vercel, Netlify, Cloudflare Pages,
AWS, Azure, GCP, containers, backends, databases, or paid CDN.

### Required GitHub configuration

Configure these in the GitHub repository **before** enabling deployment from `main`:

1. **Pages source:** Settings → Pages → Build and deployment → Source: **GitHub Actions**
   - Do **not** use “Deploy from a branch”. That runs `actions/jekyll-build-pages`, which
     fails on Astro `---` front matter (e.g. `Invalid YAML front matter in …/SocialLinks.astro`).
   - A root `_config.yml` excludes Astro sources as a safety net only; Actions must remain
     the publishing source.
2. **Repository variable `PUBLIC_SITE_URL`** (Settings → Secrets and variables → Actions → Variables):
   - User / organisation site: `https://<username>.github.io`
   - Project site: `https://<username>.github.io/<repository-name>`
3. **Optional repository variable `PUBLIC_BASE_PATH`** — only if you set `PUBLIC_SITE_URL`
   to the origin alone for a project site, e.g. `PUBLIC_BASE_PATH=/<repository-name>`
4. Deploy branch: **`main`** only (workflow does not deploy feature branches)

Do not invent username or repository values — use your actual GitHub Pages URL.

### Deployment flow

```
feature branch → review → merge to main → GitHub Actions → GitHub Pages
```

Manual re-run is available via **workflow_dispatch** on the Deploy GitHub Pages workflow.

### Publication controls

**Deploying the site does not publish draft content.**

Production visibility still requires:

```text
status === 'published' && approvedForPublication: true
```

Until entries are explicitly approved, Experience, Perspectives, Reference Architectures
and Radar remain excluded from nav, routes, sitemap and related links.

### Site URL / base path

| Variable | Purpose |
|----------|---------|
| `PUBLIC_SITE_URL` | Canonical public URL (preferred). Fail-fast if missing or `example.com`. |
| `PUBLIC_BASE_PATH` | Optional Astro `base` for project sites when not included in `PUBLIC_SITE_URL`. |
| `SITE_URL` | Fallback alias for `PUBLIC_SITE_URL`. |

Canonical URLs, Open Graph image URLs, sitemap and `robots.txt` are derived from these values.

Custom domains are optional and out of scope for v1 (may introduce external cost).
The default is the free `*.github.io` host.

## Architecture

No databases, backends, containers, or authentication.

## Content & confidentiality

Only GREEN content, or AMBER content undergoing explicit review, may enter this repository.
RED (confidential / employer IP) content must never be stored here.

### Current publication rule (shared)

Production visibility for experience, perspectives, architectures and leadership requires:

```text
status === 'published' && approvedForPublication === true
```

- GREEN classification alone is **not** publication approval.
- Drafts and placeholders remain non-production even when `approvedForPublication` is true.
- Changing `architectureVersion` (or similar metadata) does **not** grant publication eligibility.
- Technology Radar entries use a separate existing approval field in `src/data/technologies.ts`.

Production builds must not expose unpublished content in indexes, navigation, sitemap, or
generated public routes.

See `docs/IMPLEMENTATION-PLAN.md` for the plan, historical approval log, and the current
publication-gate amendment.

## Contact privacy

LinkedIn and GitHub may be enabled when URLs are approved. Email remains disabled until
explicitly approved. Telephone numbers and physical addresses are not published.
