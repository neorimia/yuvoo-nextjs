# Quiz Results Page & AI Transparency Disclaimer – Design Analysis Prompt

**Created**: February 2026  
**Based on**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)  
**Target**: Quiz results page and `AITransparencyDisclaimer` (and related blocks on the results page)

---

## TASK RESTATEMENT

**Task**: Analyze the quiz results page and the AI transparency disclaimer block (including the separate Human Review card) to:

1. Align visual design and tone with **Yuvoo branding** (colors, typography, tone of voice).
2. Propose **UX improvements** so the post-quiz experience does **not increase churn** (drop-off): keep users engaged, reduce perceived friction, and avoid making the results feel heavy or discouraging, while preserving GDPR Art. 22 and EU AI Act compliance.

**Scope**:

- **Page**: `src/app/(public)/chestionar/rezultate/[id]/page.tsx`
- **Components**:
  - `AITransparencyDisclaimer` – `src/components/features/quiz/AITransparencyDisclaimer.tsx`
  - `HumanReviewRequestButton` and the Human Review card block on the results page (lines ~182–204)
  - `ResultsActions` – above-the-fold actions
  - Header, breadcrumb, and the “Cum folosesc” / “Repetă chestionar” section at the bottom

**Constraints**:

- All user-facing text MUST remain or be improved in **Romanian**.
- Use **Bootstrap 5.3.3** + existing SCSS patterns; no new design systems.
- **Do NOT** remove or weaken legally required disclosures (AI transparency, medical disclaimer, human review access). Compliance must be preserved.
- **Do NOT** change access control, quiz ID handling, or Server Action contracts beyond what design/UX requires.
- Follow **`@/lib/routes`** for all links; use **`docs/COPY_LIBRARY.md`** and **`docs/COPYWRITING_GUIDE.md`** for tone and CTAs.
- Use **`docs/BRAND_GUIDELINES.md`** and **`docs/DESIGN_TOKENS.md`** for colors, typography, spacing.

**Output format**: Two phases.

1. **Phase 1 – Analysis**: Structured output (see schema below).
2. **Phase 2 – Implementation**: Apply design and UX changes per the analysis; use minimal diffs, preserve existing patterns and compliance.

---

## CONTEXT

### Current architecture

- **Route**: `/chestionar/rezultate/[id]` – public, no auth required to view.
- **Page** fetches quiz result via `getQuizResultAction(id)`, shows breadcrumb, title, then:
  - **AITransparencyDisclaimer** with `showMedicalDisclaimer={true}`, `showHumanReviewCTA={false}` (Human Review is a separate card below).
  - **ResultsActions** (e.g. save, share).
  - Specialist recommendation (if any).
  - Sport recommendations list.
  - **Human Review card** (authenticated users only): GDPR Art. 22 copy + `HumanReviewRequestButton`.
  - Bottom section: “Cum folosesc aceste recomandări?” and “Repetă Chestionarul”.

**AITransparencyDisclaimer** currently:

- Main card: `border-info bg-info bg-opacity-10` – blue/info palette (not Yuvoo primary).
- Medical disclaimer card: `border-warning bg-warning bg-opacity-10`.
- Optional Human Review CTA card: `border-secondary bg-secondary bg-opacity-5` (disabled on results page; Human Review is in-page card).
- Expandable “Află mai multe despre cum funcționează” with detailed bullets (data processing, limitations).
- Footer: small text with links to Privacy, GDPR, Terms.

**Churn / drop-off concern**: After completing the quiz, users should feel **rewarded and guided**, not overwhelmed by legal/technical blocks. Too much disclaimer weight or cold/institutional styling can increase bounce and reduce next steps (e.g. exploring clubs, repeating quiz).

### Relevant docs

- **BRAND_GUIDELINES.md**: Primary `#00BBAE`, Secondary `#FF9B24`, Accent `#7C81FF`; Gabarito; “Profesional, dar cald. Inteligent, dar uman.”; 70% Expert/Clar, 30% Cald/Prietenos.
- **DESIGN_TOKENS.md**: Color tokens, typography scale, spacing, borders.
- **COPY_LIBRARY.md** / **COPYWRITING_GUIDE.md**: Romanian CTAs, tone.
- **COMPONENTS_GUIDE.md**: Bootstrap and Yuvoo component patterns.

---

## CONSTRAINTS

- Analyze **only** the quiz results page, `AITransparencyDisclaimer`, the in-page Human Review card, and the immediate surrounding layout (header, ResultsActions, bottom section). Do not refactor quiz intro, paywall, or other chestionar routes.
- **Design** means: Yuvoo color palette and typography, visual hierarchy, card styling, icon usage, spacing, and tone (warm + expert). **Churn** means: reducing friction and “legal wall” feeling without hiding or shortening legally required information (e.g. keep AI disclosure, medical disclaimer, human review access intact in substance).
- When proposing copy changes, **do not** hallucinate; align with COPY_LIBRARY or propose concrete Romanian strings for review.
- Use **minimal diffs**: only change what’s needed for branding and UX. Preserve existing structure, naming, and imports unless necessary.

---

## OUTPUT FORMAT

### Phase 1 – Analysis

Produce a structured analysis matching this schema:

```json
{
  "summary": "string (2–4 sentences: overall assessment of branding alignment and churn/UX risks and main improvement areas)",
  "brandingAlignment": {
    "issues": ["string (specific: e.g. info/warning palette vs Yuvoo primary/secondary/accent)"],
    "improvements": ["string (specific, actionable: colors, typography, icons)"]
  },
  "aiTransparencyDisclaimer": {
    "issues": ["string (layout, hierarchy, tone, perceived heaviness)"],
    "improvements": ["string (e.g. collapse default, card styling, CTA placement)"]
  },
  "humanReviewBlock": {
    "issues": ["string (placement, styling, consistency with disclaimer)"],
    "improvements": ["string"]
  },
  "resultsPageLayout": {
    "issues": ["string (order of blocks, prominence of disclaimers vs recommendations)"],
    "improvements": ["string (e.g. order, spacing, visual weight)"]
  },
  "churnAndFriction": {
    "risks": ["string (what could make users leave or feel discouraged)"],
    "improvements": ["string (how to keep engagement without removing compliance)"]
  },
  "accessibility": {
    "issues": ["string (a11y: contrast, focus, semantics, ARIA)"],
    "improvements": ["string"]
  },
  "priority": {
    "high": ["string (must-fix for brand and churn)"],
    "medium": ["string (should-fix)"],
    "low": ["string (nice-to-have)"]
  }
}
```

### Phase 2 – Implementation

- Apply changes per the analysis.
- **Code change rules**:
  - Use minimal diffs; only change what’s necessary for design and UX.
  - Preserve existing code style and patterns.
  - Do NOT refactor unrelated code or change imports unless required.
  - Follow existing TypeScript/React and Bootstrap patterns.
  - Keep all legally required content; you may rephrase for tone or reorder for hierarchy, but do not remove or obscure mandatory disclosures.

---

## EXAMPLES OF DIRECTION (DO NOT LIMIT TO THESE)

- **Branding**: Replace `border-info` / `bg-info` with Yuvoo primary or accent variants; use `text-yuvoo-primary`, `btn-yuvoo-outline-primary`, or light backgrounds from DESIGN_TOKENS.
- **Churn**: Consider collapsed-by-default for “Află mai multe” so the first view is shorter; ensure the first CTA or next step (e.g. ResultsActions, sport cards) is visually dominant over disclaimer blocks.
- **Tone**: Shorten or soften disclaimer wording where legally safe (e.g. “Recomandări generate cu AI” + one short sentence), and keep full text in expandable or footer.
- **Layout**: Evaluate order (e.g. slim disclaimer → results → Human Review at bottom) so value (recommendations) is above the fold and disclaimers support rather than dominate.

---

## REFERENCES

- **Prompting Standard**: `memory-bank/promptingSystem.md` (Senior Prompt template, constraints, code change rules).
- **Brand**: `docs/BRAND_GUIDELINES.md`, `docs/DESIGN_TOKENS.md`.
- **Copy**: `docs/COPY_LIBRARY.md`, `docs/COPYWRITING_GUIDE.md`.
- **Page**: `src/app/(public)/chestionar/rezultate/[id]/page.tsx` (lines 126–131: `AITransparencyDisclaimer` usage; 182–204: Human Review card).
- **Component**: `src/components/features/quiz/AITransparencyDisclaimer.tsx`.
