# Raport Quality Analysis & Improvement Prompt

**Created**: January 2026  
**Based on**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)  
**Target**: Quiz report page and all report components

---

## TASK RESTATEMENT

**Task**: Analyze `src/app/(public)/chestionar/raport/[accessToken]/page.tsx` and all components it uses (directly or transitively). Produce a structured analysis, then implement improvements to raise the **quality of the raport** across UX, content, accessibility, code, and PDF output.

**Scope**:

- **Page**: `src/app/(public)/chestionar/raport/[accessToken]/page.tsx`
- **Report components** (all under `src/components/features/quiz/report/`):
  - `ReportContent.tsx`
  - `ReportHeader.tsx`
  - `SportRecommendationsSection.tsx`
  - `SportExplanationsSection.tsx`
  - `SportBenefitsSection.tsx`
  - `SportsToAvoidSection.tsx`
  - `AgeGuidanceSection.tsx`
  - `NextStepsSection.tsx`
  - `LocalClubsSection.tsx`
  - `ReportDownloadButton.tsx`
  - `ClientRedirect.tsx`
- **Server Action**: `src/app/actions/quiz/get-report.ts`
- **Styles**: `src/styles/report-pdf.scss`
- **Supporting**: `BreadcrumbOne`, `routes` from `@/lib/routes`

**Constraints**:

- All user-facing text MUST remain or be improved in **Romanian**.
- Use **Bootstrap 5.3.3** + existing SCSS patterns; no new design systems.
- **Do NOT** change access-control logic, token verification, or payment checks.
- **Do NOT** modify `getReportAction` contract (success, redirectTo, quizResult, etc.) beyond fixes for correctness.
- **Do NOT** refactor unrelated quiz/teaser/paywall flows.
- Preserve **Server vs Client** split: `ReportContent` and section components stay Server Components; `ReportDownloadButton` and `ClientRedirect` remain Client Components.
- Follow **`@/lib/routes`** for all links; use **`docs/COPY_LIBRARY.md`** and **`docs/COPYWRITING_GUIDE.md`** for tone and CTAs.
- Use **`docs/DESIGN_TOKENS.md`** for colors, spacing, typography (e.g. `#00BBAE`, `--yuvoo-primary`).

**Output format**: Two phases.

1. **Phase 1 – Analysis**: Structured output (see schema below).
2. **Phase 2 – Implementation**: Apply changes per the analysis; use minimal diffs, preserve existing patterns.

---

## CONTEXT

### Current architecture

- **Route**: `/chestionar/raport/[accessToken]` — access via token after payment.
- **Page** fetches report with `getReportAction(accessToken)`, then either redirects (via `ClientRedirect`) or renders `ReportContent` with `quizResult`, `quizAnswers`, `accessToken`, `isPdfMode`.
- **ReportContent** is a Server Component. It sorts recommendations by `matchScore`, takes top 2–3, and renders 7 sections + footer note.
- **Sections**: (1) Top sport recommendations, (2) Why these sports fit, (3) Benefits per sport, (4) Sports to avoid, (5) Age guidance, (6) Next steps, (7) Local clubs. PDF download button is above the sections, hidden in PDF mode.
- **Data types**: `QuizResult` (id, childId, recommendations, specialistRecommendation?, location?, createdAt), `SportRecommendation` (sportId, sportName, matchScore, reasoning, benefits, considerations), `QuizAnswers` (age, energyLevel, personality, interests, etc.).

### Relevant docs

- **COPY_LIBRARY.md**: Romanian CTAs, error messages, consistency.
- **COPYWRITING_GUIDE.md**: Brand voice (warm + expert), tone.
- **DESIGN_TOKENS.md**: Colors, typography, spacing.
- **BRAND_GUIDELINES.md**: Visual identity, UX principles.
- **ARCHITECTURE_OVERVIEW.md** / **COMPONENTS_GUIDE.md**: Patterns, structure.

### Technical notes

- Next.js 16 Cache Components: dynamic route uses `generateStaticParams` with placeholder; `connection`, `cookies`, `headers` accessed early for dynamic behavior.
- **Report** uses `report-pdf.scss` for `@media print` and `.report-section.pdf-mode`.

---

## CONSTRAINTS

- Analyze **only** the raport page, report components, `get-report` action, and `report-pdf.scss`. Do not analyze quiz intro, paywall, teaser, or other chestionar routes.
- **Quality** means: UX clarity, scannability, Romanian copy, accessibility (a11y), consistency with COPY_LIBRARY/DESIGN_TOKENS, PDF readability, and maintainable code. Do not expand scope to new features (e.g. new sections or new APIs) unless they are small, clearly justified improvements.
- When improving copy, **do not** hallucinate CTAs or messages; align with COPY_LIBRARY or propose concrete new strings in Romanian for review.
- Use **minimal diffs**: only change what’s needed for the improvements. Preserve existing structure, naming, and imports unless necessary.

---

## OUTPUT FORMAT

### Phase 1 – Analysis

Produce a structured analysis matching this schema:

```json
{
  "summary": "string (2–4 sentences: overall assessment of raport quality and main improvement areas)",
  "page": {
    "issues": ["string (specific issue per item)"],
    "improvements": ["string (specific, actionable improvement)"]
  },
  "sections": {
    "ReportHeader": { "issues": ["string"], "improvements": ["string"] },
    "SportRecommendationsSection": { "issues": ["string"], "improvements": ["string"] },
    "SportExplanationsSection": { "issues": ["string"], "improvements": ["string"] },
    "SportBenefitsSection": { "issues": ["string"], "improvements": ["string"] },
    "SportsToAvoidSection": { "issues": ["string"], "improvements": ["string"] },
    "AgeGuidanceSection": { "issues": ["string"], "improvements": ["string"] },
    "NextStepsSection": { "issues": ["string"], "improvements": ["string"] },
    "LocalClubsSection": { "issues": ["string"], "improvements": ["string"] },
    "ReportDownloadButton": { "issues": ["string"], "improvements": ["string"] },
    "ClientRedirect": { "issues": ["string"], "improvements": ["string"] }
  },
  "footerNote": { "issues": ["string"], "improvements": ["string"] },
  "reportPdfStyles": { "issues": ["string"], "improvements": ["string"] },
  "accessibility": {
    "issues": ["string (a11y gaps: ARIA, semantics, focus, contrast, etc.)"],
    "improvements": ["string"]
  },
  "uxAndContent": {
    "issues": ["string (clarity, scannability, redundancy, CTA placement)"],
    "improvements": ["string"]
  },
  "codeQuality": {
    "issues": ["string (DRY, types, error handling, performance)"],
    "improvements": ["string"]
  },
  "priorityOrder": ["string (ordered list of improvement IDs or short names for implementation)"]
}
```

**Rules**:

- Use `null` for missing optional fields; use empty arrays `[]` where no issues or improvements.
- Each issue and improvement: concise, actionable, max ~120 words per item.
- **priorityOrder**: ordered list of improvement identifiers (e.g. `"ReportHeader.personalization"`, `"a11y.sectionHeadings"`) so Phase 2 can be implemented in that order.

### Phase 2 – Implementation

- Implement improvements following **priorityOrder**.
- Use **minimal diffs** (search_replace or equivalent). Do not refactor unrelated code.
- Preserve Server/Client boundaries, route usage, and action contracts.
- If a change adds or modifies user-facing strings, keep them in Romanian and consistent with COPY_LIBRARY/COPYWRITING_GUIDE.

---

## CODE CHANGE RULES

- Use minimal diffs: only change what’s necessary for the analysis-backed improvements.
- Preserve existing code style, Bootstrap usage, and file structure.
- Do not refactor unrelated code or alter imports unless required.
- Follow existing TypeScript/React patterns (e.g. `QuizResult`, `SportRecommendation` types).
- Keep error handling consistent with current patterns (e.g. `ReportDownloadButton` error states).
- Use design tokens (e.g. `#00BBAE`, `btn-yuvoo-primary`) rather than new ad‑hoc values.
- Ensure `report-pdf.scss` remains the single place for print-specific overrides; avoid inline print styles in components.

---

## EXAMPLES (Optional Reference)

- **Issue**: “ReportHeader does not show child name or any personalization; header feels generic.”
- **Improvement**: “Add child name to ReportHeader when available from `quizResult` or `quizAnswers` (e.g. from a future `childName` field), and use a personalized subtitle.”

- **Issue**: “Sports to avoid section uses first `consideration` only; reasoning can be more informative.”
- **Improvement**: “When showing ‘sports to avoid’, prefer concatenating multiple `considerations` (or `reasoning`) up to a reasonable length, with fallback to existing generic copy.”

- **Issue**: “Section headings use only icons + text; no `aria-label` or `id` for in-page navigation.”
- **Improvement**: “Add `id` to each `<section>` and use `aria-labelledby` linking to the section heading; ensure heading hierarchy (h1 → h2 → h3) is consistent.”

---

## PROMPT LINT CHECKLIST

- [x] Verbosity controlled: analysis schema + implementation scope defined.
- [x] Scope bounded: only raport page, report components, get-report, report-pdf.scss.
- [x] Output structured: Phase 1 JSON schema, Phase 2 implementation rules.
- [x] Constraints explicit: Romanian, Bootstrap, no access-control changes, Server/Client preserved.
- [x] Code change rules: minimal diffs, existing patterns, design tokens.

---

## HOW TO USE THIS PROMPT

1. **Run Phase 1**: “Analyze the raport page and all report components per `prompts/raport-quality-analysis-and-improvement-prompt.md`. Output only the Phase 1 structured analysis (JSON).”
2. **Review**: Check the analysis with stakeholders; adjust `priorityOrder` or scope if needed.
3. **Run Phase 2**: “Implement the improvements from the raport quality analysis in `priorityOrder`, following the CODE CHANGE RULES in `prompts/raport-quality-analysis-and-improvement-prompt.md`.”

You can also run both phases in one go: “Execute the full raport quality analysis and improvement per `prompts/raport-quality-analysis-and-improvement-prompt.md` (Phase 1 + Phase 2).”

---

**Last Updated**: January 2026  
**Status**: Ready for use  
**Next Action**: Run Phase 1 analysis, then Phase 2 implementation.
