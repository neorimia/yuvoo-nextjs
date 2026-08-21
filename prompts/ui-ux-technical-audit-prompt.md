# UI/UX & Technical Audit Prompt (Full Application)

**Created**: August 2026  
**Based on**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)  
**Target**: All application pages (~89 routes) — audit only, no code changes  
**Output**: Single Markdown report in `audit/YYYY-MM-DD-ui-ux-technical-audit.md`

---

## TASK RESTATEMENT

**Task**: Run a comprehensive **technical + UI/UX audit** of all pages in the Yuvoo Next.js application. Evaluate visual hierarchy, design-system consistency, UX flows, accessibility, UI performance patterns, Romanian copy quality, and conversion UX (where applicable). Produce **one scannable Markdown report** with prioritized, actionable findings.

**Scope**:

- All routes defined in `src/lib/routes.ts` and all `src/app/**/page.tsx` files (~89 pages)
- Layout and UI components directly used by those pages (header, footer, forms, cards, modals, dashboards)
- Cross-cutting patterns: navigation, design tokens, empty/loading/error states, mobile responsiveness

**Mode**: **Audit only** — analyze and report. **Do NOT** modify source code, SCSS, routes, memory-bank, or docs.

**Output**: Create `audit/` at repo root (if missing) and write exactly one file:

```
audit/YYYY-MM-DD-ui-ux-technical-audit.md
```

Use today's date from the session (format `YYYY-MM-DD`).

---

## CONTEXT

### Product

**Yuvoo** is an AI-powered platform for Romanian parents (ages 4–14) to discover sports activities. Three core value props: AI Coach Quiz, Verified Clubs Directory, Pediatric Specialists Network.

- **Market**: Romania (Bucharest first)
- **Language**: All user-facing content MUST be Romanian
- **Stack**: Next.js 16 (App Router, Cache Components), React 19, TypeScript, Bootstrap 5.3.3 + SCSS, Stack Auth
- **Design**: Adapted from Kindedo template — turcoaz `#00BBAE`, portocaliu `#FF9B24`, font Gabarito

### Architecture references

| Resource                        | Path                          | Use for                                   |
| ------------------------------- | ----------------------------- | ----------------------------------------- |
| Routes (single source of truth) | `src/lib/routes.ts`           | Route inventory, hardcoded path detection |
| Design tokens                   | `docs/DESIGN_TOKENS.md`       | Color, spacing, typography compliance     |
| Brand guidelines                | `docs/BRAND_GUIDELINES.md`    | Visual identity, tone                     |
| Components guide                | `docs/COMPONENTS_GUIDE.md`    | Bootstrap patterns, component structure   |
| Copy library                    | `docs/COPY_LIBRARY.md`        | Romanian CTAs, error messages             |
| Copywriting guide               | `docs/COPYWRITING_GUIDE.md`   | Brand voice (warm + expert)               |
| Wireframes                      | `docs/WIREFRAMES.md`          | Expected layout patterns                  |
| Design system (memory)          | `memory-bank/designSystem.md` | Kindedo adaptation notes                  |
| Menu data                       | `src/data/menu-data.ts`       | Navigation structure                      |

### Page inventory (clusters)

Group all `src/app/**/page.tsx` files into these 12 clusters. Do not write 89 separate essays — audit by cluster, then synthesize.

| #   | Cluster ID            | Representative routes                                                                                                                                                                                 | Depth                                                                               |
| --- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---- |
| 1   | `marketing-public`    | `/`, `/despre-noi`, `/contact`, `/intrebari-frecvente`, `/ajutor`, `/parteneri`                                                                                                                       | Deep                                                                                |
| 2   | `discovery`           | `/cluburi`, `/cluburi/[slug]`, `/cluburi/locatie/[location]`, `/sporturi`, `/sporturi/[slug]`, `/doctori`, `/doctori/[slug]`, `/ghiduri`, `/ghiduri/[slug]`, `/cautare`                               | Deep                                                                                |
| 3   | `quiz-funnel`         | `/chestionar`, `/chestionar/container`, `/chestionar/email/[quizId]`, `/chestionar/teaser/[quizId]`, `/chestionar/paywall/[quizId]`, `/chestionar/payment/success                                     | failure/[quizId]`, `/chestionar/rezultate/[id]`, `/chestionar/raport/[accessToken]` | Deep |
| 4   | `clubs-acquisition`   | `/pentru-cluburi`, `/pentru-cluburi/cum-functioneaza`, `/pentru-cluburi/povesti-de-succes`, `/pentru-cluburi/calculator-roi`, `/pentru-cluburi/ajutor`, `/pentru-cluburi/abonare-premium`             | Deep                                                                                |
| 5   | `doctors-acquisition` | `/pentru-doctori`                                                                                                                                                                                     | Medium                                                                              |
| 6   | `auth`                | `/login`, `/register`, `/forgot-password`, `/reset-password`, `/email-confirmation`, `/verify-email`, `/verification-pending`, `/choose-role`                                                         | Deep                                                                                |
| 7   | `onboarding`          | `/onboarding/parent/*`, `/onboarding/club/*`, `/onboarding/doctor/*`                                                                                                                                  | Deep                                                                                |
| 8   | `parent-portal`       | `/parent/dashboard`, `/parent/children/*`, `/parent/bookings/*`, `/parent/favorites`, `/parent/saved`, `/parent/profile`, `/parent/settings`, `/parent/settings/privacy`, `/parent/email-preferences` | Deep                                                                                |
| 9   | `club-portal`         | `/club/dashboard`, `/club/dashboard/leaduri/*`, `/club/dashboard/premium`, `/club/bookings`, `/club/profile`, `/club/settings`                                                                        | Medium                                                                              |
| 10  | `doctor-portal`       | `/doctor/dashboard`, `/doctor/bookings`, `/doctor/availability`, `/doctor/profile`, `/doctor/settings`                                                                                                | Medium                                                                              |
| 11  | `guest-payments`      | `/cereri/[leadId]/plata-guest`, `/cereri/[leadId]/plata-guest/success`                                                                                                                                | Medium                                                                              |
| 12  | `legal-admin`         | `/confidentialitate`, `/termeni`, `/cookies`, `/gdpr-parinti`, `/dezabonare`, `/admin/verifications`                                                                                                  | Light                                                                               |

**Note**: `src/modules/audit/` is backend audit logging — **not** the output folder. Output goes to repo-root `audit/`.

---

## REQUIRED SKILLS (read before exploration)

Read each skill's `SKILL.md` **before** browsing code. Apply its framework during analysis; cite which skill informed each finding category.

### UI quality (with Yuvoo brand guardrails)

| Skill                          | Path                                                     | Apply for                                                                                       |
| ------------------------------ | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `web-design-guidelines`        | `~/.claude/skills/web-design-guidelines/SKILL.md`        | Fetch latest Vercel Web Interface Guidelines; interface compliance                              |
| `design-taste-frontend`        | `~/.claude/skills/design-taste-frontend/SKILL.md`        | Audit-first, anti-slop; **do not** recommend Awwwards restyling                                 |
| `high-end-visual-design`       | `~/.claude/skills/high-end-visual-design/SKILL.md`       | Spacing, contrast, hierarchy bar only — **never** replace Bootstrap/Gabarito/palette            |
| `gpt-taste`                    | `~/.claude/skills/gpt-taste/SKILL.md`                    | Anti-default patterns (narrow heroes, cramped sections) — adapt to Bootstrap, not Tailwind/GSAP |
| `emil-design-eng`              | `~/.claude/skills/emil-design-eng/SKILL.md`              | Polish, micro-interactions, restraint                                                           |
| `find-animation-opportunities` | `~/.claude/skills/find-animation-opportunities/SKILL.md` | Max **5–7** motion suggestions for entire app; motion only where it reduces confusion           |

### Technical / a11y / performance

| Skill                         | Path                                                    | Apply for                                                                      |
| ----------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `vercel-react-best-practices` | `~/.claude/skills/vercel-react-best-practices/SKILL.md` | Waterfalls, bundle size, Server vs Client Components                           |
| `vercel-composition-patterns` | `~/.claude/skills/vercel-composition-patterns/SKILL.md` | Boolean prop proliferation, component architecture                             |
| `a11y-debugging`              | `~/.cursor/skills/a11y-debugging/SKILL.md`              | Lighthouse a11y, accessibility tree, keyboard nav                              |
| AccessLint MCP                | MCP server `user-accesslint`                            | `audit_html` on key templates; `audit_live` only if dev server already running |
| `debug-optimize-lcp`          | `~/.cursor/skills/debug-optimize-lcp/SKILL.md`          | LCP on homepage + public listings — **only if live session available**         |

### Conversion / copy (cluster-dependent)

| Skill          | Path                                     | Apply for clusters                                                  |
| -------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| `cro`          | `~/.claude/skills/cro/SKILL.md`          | 1, 4, 5, contact                                                    |
| `copywriting`  | `~/.claude/skills/copywriting/SKILL.md`  | Headlines/CTAs — reference COPY_LIBRARY, do not invent from scratch |
| `copy-editing` | `~/.claude/skills/copy-editing/SKILL.md` | Polish existing copy, flag weak/EN strings                          |
| `signup`       | `~/.claude/skills/signup/SKILL.md`       | 6 (auth)                                                            |
| `onboarding`   | `~/.claude/skills/onboarding/SKILL.md`   | 7                                                                   |
| `paywalls`     | `~/.claude/skills/paywalls/SKILL.md`     | 3 (teaser, paywall), 9 (premium)                                    |

### Codebase navigation

| Tool     | Command                        | When                                                                     |
| -------- | ------------------------------ | ------------------------------------------------------------------------ |
| graphify | `graphify query "<question>"`  | **Mandatory** before Read/Grep/Glob — routes, layouts, UI component deps |
| graphify | `graphify explain "<concept>"` | Focused concept (e.g. "Header", "QuizContainer")                         |

---

## METHODOLOGY

Execute in order. Do not skip steps.

```
Step 0  → Read all REQUIRED SKILLS listed above
Step 1  → graphify query: routes, layouts, shared UI components
Step 2  → Read design docs: DESIGN_TOKENS, BRAND_GUIDELINES, COMPONENTS_GUIDE, COPY_LIBRARY, WIREFRAMES, designSystem.md
Step 3  → Build page inventory from src/app/**/page.tsx + src/lib/routes.ts; map each page to a cluster
Step 4  → Dispatch parallel subagents (one per cluster) — see SUBAGENT TEMPLATE below
Step 5  → Optional live audit IF localhost:3000 already running (see LIVE AUDIT section)
Step 6  → Synthesize single Markdown report → audit/YYYY-MM-DD-ui-ux-technical-audit.md
```

### Subagent rules

- Launch **one subagent per cluster** in a **single message** (parallel).
- Subagent type: `generalPurpose` or `explore` (read-only is fine — audit does not write code).
- Each subagent returns: cluster scores (0–5), findings table rows, cross-cutting notes.
- Include graphify rule in every subagent prompt: run `graphify query` scoped to cluster routes before reading files.

### Live audit (optional)

**Only if** `http://localhost:3000` is already reachable (check terminals or curl — do **not** start `npm run dev` just for this audit):

| Tool                         | Pages                                               | Purpose                                       |
| ---------------------------- | --------------------------------------------------- | --------------------------------------------- |
| AccessLint `audit_live`      | `/`, `/cluburi`, `/chestionar`, `/login`            | Live DOM a11y                                 |
| Chrome DevTools / Lighthouse | Same + `/parent/dashboard` if auth cookie available | a11y score, console issues                    |
| LCP trace                    | `/`, `/cluburi`                                     | Core Web Vitals (debug-optimize-lcp workflow) |

If live audit is not possible, document under **Limitări** in the report: `metoda: static-only`.

---

## EVALUATION RUBRIC

Score each cluster **0–5** on every dimension below. A finding must cite **evidence** (`path/to/file.tsx:line` or live audit rule ID).

| Dimension                     | Key checks                                                                                                                   |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Visual hierarchy & layout** | Above-the-fold clarity, primary vs secondary CTA, whitespace, Bootstrap grid consistency, mobile stacking                    |
| **Design system**             | `#00BBAE` / `#FF9B24` / CSS vars vs hardcoded hex; Gabarito; Kindedo drift (`classes`, `teachers`, English leftovers)        |
| **UX / flow**                 | Empty, loading, error, success states; friction points; dead CTAs; hardcoded paths vs `@/lib/routes`                         |
| **Accessibility**             | WCAG 2.2 AA: contrast, 44px touch targets, focus visible, landmarks, heading order (no skips), form labels, modal focus trap |
| **UI performance**            | Unnecessary `'use client'`, raw `<img>` vs `next/image`, missing `sizes`/`priority` on LCP, layout shift risk                |
| **Romanian copy**             | All user-facing text in RO; tone vs COPYWRITING_GUIDE; CTAs vs COPY_LIBRARY; any English = finding                           |
| **Conversion UX**             | Clusters 1, 3, 4, 5, 6, 11 only: 5-second clarity, value prop, trust signals, CTA prominence                                 |

**Out of scope** (do not audit unless blocking visible UI):

- SEO meta tags, structured data, sitemap
- Security, auth backend, database schema
- Legal copy rewrite (flag UX/a11y issues only)
- Product/pricing/quiz question changes

### Yuvoo-specific patterns to hunt

Explicitly search for these issue classes:

1. **Kindedo leftovers**: routes `/classes`, `/teachers`, `/programs`; English UI strings; unadapted Class/Teacher components
2. **Token drift**: random hex colors, inline styles bypassing `--yuvoo-primary` / `--yuvoo-secondary` / Bootstrap utilities
3. **Navigation**: hardcoded `href="/..."` instead of `routes.*`; broken or placeholder menu items in `menu-data.ts`
4. **CTA hierarchy**: multiple competing primaries; ghost buttons for main actions; invisible/low-contrast button text
5. **Forms**: missing `label`/`htmlFor`, no `autocomplete`, validation errors not in Romanian, no loading state on submit
6. **Quiz funnel**: progress indicator, back navigation, abandon recovery, trust on paywall/teaser, consistency teaser → full report
7. **Portals**: empty states without next action; dense tables on mobile; primary actions buried in dropdowns
8. **Images**: `via.placeholder.com`, missing alt text, LCP image without `priority`
9. **Header/footer**: inconsistency between public pages vs dashboard shells
10. **Modals**: Bootstrap modal without focus management; `data-bs-toggle` on broken targets

### Finding quality bar

Every finding MUST include:

- **Severity**: `P0` (blocks task / a11y violation / broken flow), `P1` (significant friction or inconsistency), `P2` (polish)
- **Page/route** affected
- **Evidence**: `file:line` or live audit reference
- **Recommendation**: concrete change (what file, what element, what to do) — not vague "improve hierarchy"
- **Effort**: `S` (≤1h), `M` (half day), `L` (multi-day)

**Caps per cluster** (keep report scannable):

- P0: unlimited
- P1: max 8
- P2: max 5

**Motion cap (entire app)**: max 5–7 animation opportunities total (per `find-animation-opportunities`).

---

## CONSTRAINTS

### Do

- Analyze only; write **only** `audit/YYYY-MM-DD-ui-ux-technical-audit.md`
- Create `audit/` directory at repo root if it does not exist
- Use graphify before broad code exploration
- Write the report in **Romanian** (technical paths and code identifiers stay in English)
- Note gaps explicitly (missing page, TODO route, unauditable cluster)
- Respect Yuvoo brand: Bootstrap 5.3.3 + SCSS + existing tokens — recommendations must work within this stack

### Do NOT

- Modify any source files, SCSS, configs, routes, memory-bank, or docs
- Start dev server, install packages, or run `graphify update`
- Recommend replacing Bootstrap with Tailwind/shadcn, replacing Gabarito/Font Awesome, or full redesign
- Recommend GSAP or new font families as system replacement
- Invent API keys, legal copy, or product changes (pricing tiers, quiz questions)
- Include backend/schema findings unless they cause a visible broken/empty UI state
- Split output across multiple audit files

---

## OUTPUT FORMAT

Write **one Markdown file** with this exact structure:

```markdown
# Audit UI/UX & Tehnic — Yuvoo

## 1. Meta

- **Data**: YYYY-MM-DD
- **Metodă**: static | static+live
- **Pagini inventariate**: N (din ~89)
- **Cluster-uri acoperite**: [listă]
- **Skill-uri aplicate**: [listă]
- **Scor global**: 0–100 (media ponderată; P0 clusters weight 2x)

## 2. Rezumat executiv

(max 200 cuvinte — cele 3–5 probleme transversale + direcția prioritara)

## 3. Scoruri pe cluster

| Cluster          | Ierarhie | Design system | UX  | A11y | Perf UI | Copy RO | Conversie | Medie |
| ---------------- | -------- | ------------- | --- | ---- | ------- | ------- | --------- | ----- |
| marketing-public | 0–5      | ...           | ... | ...  | ...     | ...     | ...       | X.X   |
| ...              |          |               |     |      |         |         |           |       |

## 4. Findings transversale

### 4.1 Design system & Kindedo drift

### 4.2 Navigare & rute

### 4.3 Accesibilitate

### 4.4 Performanță UI

### 4.5 Copy & ton (RO)

### 4.6 Oportunități motion (max 5–7, cu justificare)

## 5. Findings pe cluster

Pentru fiecare cluster:

### Cluster: {id} — {nume}

| Severity | Pagină   | Finding | Evidență          | Recomandare | Efort |
| -------- | -------- | ------- | ----------------- | ----------- | ----- |
| P0       | /cluburi | ...     | `ClubList.tsx:42` | ...         | S     |

## 6. Backlog prioritar (Top 15)

Sortat: impact × (1/efort). Format:

1. **[P0] Titlu scurt** — cluster, pagini, efort S/M/L, recomandare one-liner

## 7. Quick wins (≤1h fiecare)

- [ ] Item concret cu file:line

## 8. Limitări & ce nu s-a verificat

- Live audit: da/nu
- Pagini sărite și motiv
- Presupuneri
```

### Report rules

- All narrative text in **Romanian**
- Code paths, component names, severity IDs in **English** as in codebase
- Tables must be GitHub-flavored Markdown (pipe tables)
- Backlog items must be implementable without product decisions
- If a cluster has zero P0/P1 findings, state that explicitly with brief positive notes

---

## SUBAGENT TEMPLATE (copy per cluster)

Dispatch one subagent per cluster with this prompt (substitute `{CLUSTER_ID}`, `{ROUTES}`, `{DEPTH}`):

```
You are auditing cluster "{CLUSTER_ID}" for the Yuvoo UI/UX audit.
Depth: {DEPTH}. Audit only — do NOT modify any files.

MANDATORY: Before Read/Grep, run:
  graphify query "pages routes and UI components for {CLUSTER_ID} cluster: {ROUTES}"

Read these skills first (paths from ui-ux-technical-audit-prompt.md REQUIRED SKILLS section).

Pages in scope:
{ROUTES — list page.tsx paths}

Evaluate on all 7 rubric dimensions. Hunt Yuvoo-specific patterns (Kindedo drift, token drift, hardcoded routes, RO copy, a11y, quiz funnel issues if applicable).

Return JSON:
{
  "clusterId": "{CLUSTER_ID}",
  "pagesAudited": ["string"],
  "pagesSkipped": [{ "route": "string", "reason": "string" }],
  "scores": {
    "visualHierarchy": 0-5,
    "designSystem": 0-5,
    "uxFlow": 0-5,
    "accessibility": 0-5,
    "uiPerformance": 0-5,
    "copyRo": 0-5,
    "conversionUx": 0-5 | null
  },
  "findings": [
    {
      "severity": "P0" | "P1" | "P2",
      "page": "string (route)",
      "finding": "string (Romanian, max 80 words)",
      "evidence": "string (file:line or audit rule)",
      "recommendation": "string (Romanian, actionable)",
      "effort": "S" | "M" | "L",
      "skillSource": "string (which skill informed this)"
    }
  ],
  "crossCuttingNotes": ["string"],
  "animationOpportunities": [{ "page": "string", "element": "string", "why": "string" }] // max 2 for this cluster
}

Respect caps: P1 max 8, P2 max 5 per cluster.
```

---

## SYNTHESIS STEP (orchestrator)

After all subagents return:

1. Merge JSON findings; deduplicate cross-cluster issues (e.g. header a11y → one transversal finding)
2. Compute cluster averages and global score (P0 clusters: marketing, discovery, quiz-funnel, auth, onboarding, parent-portal — weight 2x)
3. Rank top 15 backlog by: P0 first, then P1, sort by effort S > M > L within same severity
4. Select quick wins: P0/P1 with effort S only
5. Write final Markdown to `audit/YYYY-MM-DD-ui-ux-technical-audit.md`
6. Confirm: no source files were modified

---

## PROMPT LINT CHECKLIST

- [x] Verbosity controlled: report structure, caps on P1/P2, motion cap
- [x] Scope bounded: audit-only, ~89 pages, 12 clusters, no code changes
- [x] Output structured: single Markdown file with defined sections
- [x] Constraints explicit: DO NOT modify code, DO NOT start server, DO NOT recommend stack replacement
- [x] Skills listed with paths and cluster mapping
- [x] Yuvoo brand guardrails: Bootstrap + tokens preserved
- [x] Evidence required: file:line on every finding
- [x] Language: Romanian report, English code refs

---

## HOW TO USE THIS PROMPT

**Claude Code — full audit**:

```
Execute the full UI/UX & technical audit per prompts/ui-ux-technical-audit-prompt.md.
Output only the Markdown report in audit/ — do not modify any other files.
```

**Claude Code — single cluster (debug)**:

```
Audit cluster "quiz-funnel" only per prompts/ui-ux-technical-audit-prompt.md.
Append findings to audit/YYYY-MM-DD-ui-ux-technical-audit-quiz-funnel.md for review.
```

**After audit — implementation (separate session)**:

Use backlog section P0/P1 items as input for focused implementation prompts. Do not re-run this audit prompt for implementation.

---

**Last Updated**: August 2026  
**Status**: Ready for use  
**Next Action**: Run full audit; review `audit/YYYY-MM-DD-ui-ux-technical-audit.md`; prioritize P0 quick wins for a follow-up implementation session.
