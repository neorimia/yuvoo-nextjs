━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━

Analyze the existing "pentru-cluburi" landing page (`src/app/(public)/pentru-cluburi/page.tsx`) and its components, identify shared/reusable patterns, then create similar components for the "pentru-doctori" landing page following the strategic brief (`briefs/FOR_DOCTORS_LANDING_PAGE.md`).

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━

**Existing Implementation**:

- Landing page: `src/app/(public)/pentru-cluburi/page.tsx`
- Components location: `src/components/features/clubs/`
- Components used:
  - `ClubsLandingHero.tsx` - Hero section with CTA
  - `ClubsLandingProblem.tsx` - Problem statement section
  - `ClubsLandingSolution.tsx` - Solution explanation
  - `ClubsLandingBenefits.tsx` - Benefits listing
  - `ClubsLandingTestimonials.tsx` - Testimonials section
  - `ClubsLandingFAQ.tsx` - FAQ accordion section
  - `ClubsLandingFinalCTA.tsx` - Final call-to-action
  - `ClubsLandingTrust.tsx` - Trust indicators
  - `ClubsLandingFooter.tsx` - Footer microcopy
  - `ClubsContactModal.tsx` - Contact modal component

**New Requirements**:

- Landing page: `src/app/(public)/pentru-doctori/page.tsx` (to be created)
- Components location: `src/components/features/doctors/` (to be created or existing)
- Strategic brief: `briefs/FOR_DOCTORS_LANDING_PAGE.md`
- Key differences from clubs landing:
  - Focus on credibility, ethics, professional positioning (not commercial conversion)
  - Tone: professional, calm, non-aggressive, non-promotional
  - No urgency tactics, no pricing, no lead selling promises
  - Emphasis on GDPR, medical ethics, professional control
  - Content in Romanian language only

**Technical Context**:

- Framework: Next.js 16 with Cache Components pattern
- Styling: Bootstrap 5.3.3 + SCSS
- TypeScript: Strict mode
- Routes: Defined in `src/lib/routes.ts`
- All user-facing content MUST be in Romanian

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

**Analysis Phase**:

- Analyze ALL clubs landing components to understand structure and patterns
- Identify components that can be:
  1. Reused directly (with minor prop changes)
  2. Extracted as shared components (used by both clubs and doctors)
  3. Adapted for doctors (similar structure, different content)
  4. Created new for doctors (unique requirements)

**Implementation Phase**:

- Create doctors landing components following the same structure as clubs landing
- All user-facing content MUST be in Romanian (from brief)
- Use Bootstrap 5.3.3 utility classes and SCSS
- Follow Next.js 16 Cache Components pattern (`"use cache"` for page, client components where needed)
- Use routes from `@/lib/routes.ts` (add doctors.landing route if needed)
- Do NOT copy/paste code - adapt structure and patterns
- Do NOT modify existing clubs landing components
- Do NOT add commercial/urgency language
- Do NOT add pricing or lead selling content

**Component Structure**:

- Keep same section order as clubs landing for consistency
- Adapt content to match brief sections:
  1. Hero Section - Credibility & Mission
  2. Problem Section - Real problem from doctor's perspective
  3. What Yuvoo Is/Is Not Section - Clear positioning
  4. Doctor's Role Section - Expert, not commercial provider
  5. How Collaboration Works - Transparent process
  6. Ethics, GDPR & Professional Control - Critical section
  7. Why Doctors Choose Yuvoo - Proof logic (not testimonials)
  8. Target Audience Section - Who it's for/not for
  9. FAQ Section - Adapted for doctors
  10. Final CTA Section - Low-pressure
  11. Footer Microcopy - Professional disclaimer

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━

**Phase 1: Analysis Output**

Provide JSON analysis:

```json
{
  "analysis": {
    "reusableComponents": [
      {
        "componentName": "string",
        "location": "string",
        "canBeReused": boolean,
        "changesNeeded": "string[] | null",
        "reasoning": "string"
      }
    ],
    "extractableSharedComponents": [
      {
        "componentName": "string",
        "currentLocation": "string",
        "proposedSharedLocation": "string",
        "abstraction": "string",
        "props": "object"
      }
    ],
    "adaptableComponents": [
      {
        "originalComponent": "string",
        "newComponentName": "string",
        "adaptations": "string[]",
        "contentChanges": "string[]"
      }
    ],
    "newComponents": [
      {
        "componentName": "string",
        "reason": "string",
        "structure": "string",
        "relatedBriefSection": "string"
      }
    ]
  },
  "sharedPatterns": {
    "stylingPatterns": "string[]",
    "structurePatterns": "string[]",
    "animationPatterns": "string[]",
    "modalPatterns": "string[]"
  },
  "recommendations": {
    "sharedComponentLocation": "string",
    "namingConvention": "string",
    "extractionPriority": "string[]"
  }
}
```

**Phase 2: Implementation Plan**

Provide step-by-step implementation plan:

1. **Create shared components** (if any identified)
2. **Create doctors landing components** (in order of sections)
3. **Create doctors landing page** (orchestrates all components)
4. **Add routes** (update `src/lib/routes.ts`)
5. **Add FAQ data** (create `src/data/doctors-faq-data.ts` if needed)
6. **Add modal utilities** (create `src/lib/doctors-landing-modal.ts` if needed)

For each component creation, specify:

- Component file path
- Props interface
- Key content (Romanian text from brief)
- Styling approach
- Any shared components used

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━

- Use minimal diffs: only change what's necessary
- Preserve existing code style and patterns from clubs landing
- Do NOT refactor existing clubs landing components
- Do NOT change imports in clubs landing components
- Follow existing TypeScript/React patterns in the codebase
- Use existing utility functions when available (SectionTitle, FaqAccordionItem, etc.)
- Maintain backward compatibility
- Add type safety: use existing types, create new types only if needed
- Error handling: follow existing error handling patterns
- Use Bootstrap 5.3.3 utility classes consistently
- Follow SCSS organization patterns

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━

**Example 1: Component Naming Pattern**

- Clubs: `ClubsLandingHero` → Doctors: `DoctorsLandingHero`
- Clubs: `ClubsLandingFAQ` → Doctors: `DoctorsLandingFAQ`
- Location: `src/components/features/doctors/DoctorsLandingHero.tsx`

**Example 2: Shared Component Extraction**

If FAQ accordion structure is identical, extract to:

- `src/components/shared/LandingFAQ.tsx`
- Props: `{ title: string, faqItems: FaqItem[], routeToFullFaq?: string }`

**Example 3: Content Adaptation**

Clubs Hero:

- Headline: "Crești numărul de copii înscriși, fără lead-uri inutile"
- Subheadline: "Yuvoo conectează cluburi sportive pentru copii..."

Doctors Hero:

- Headline: "Ajută părinții să aleagă sportul potrivit pentru copii, în siguranță medicală"
- Subheadline: "Yuvoo este o platformă de ghidare pentru părinți..."

━━━━━━━━━━━━━━━━━━━━
TASK RESTATEMENT
━━━━━━━━━━━━━━━━━━━━

**Task**: Analyze existing clubs landing page components, identify reusable/shared patterns, extract shared components where beneficial, and create doctors landing page components following the same structure but adapted for the doctors brief (professional, ethical, non-commercial tone).

**Constraints**:

- All content in Romanian
- Non-commercial, professional tone
- Follow existing component patterns
- Do not modify clubs landing components
- Use Bootstrap 5.3.3 + SCSS
- Follow Next.js 16 Cache Components pattern

**Output Format**:

1. JSON analysis of component reuse/extraction opportunities
2. Step-by-step implementation plan with component specifications

━━━━━━━━━━━━━━━━━━━━
SPECIFIC REQUIREMENTS FROM BRIEF
━━━━━━━━━━━━━━━━━━━━

**Hero Section**:

- Headline: "Ajută părinții să aleagă sportul potrivit pentru copii, în siguranță medicală"
- Subheadline: "Yuvoo este o platformă de ghidare pentru părinți care combină recomandări AI cu validare medicală pediatrică."
- Trust cues: "Nu suntem marketplace medical", "Fără promovare agresivă", "Control editorial complet"
- CTA: "Devino Expert Pediatric Verificat" (primary), "Programează un call de 15 minute" (secondary)
- NO urgency, NO countdown, NO "limited spots"

**Problem Section**:

- Focus on doctor's perspective: "Părinții aleg sporturi nepotrivite... Medicul vede consecințele prea târziu"
- NOT commercial problem, but medical/educational problem

**What Is/Is Not Section**:

- Must clearly state what Yuvoo IS and IS NOT
- Emphasize: NOT marketplace, NOT commercial platform, NOT lead selling

**Doctor's Role Section**:

- Headline: "Rolul tău: expert, nu furnizor de servicii"
- Emphasize: Expert verification, educational contribution, NO obligation to accept consultations
- "Fără obligația de a oferi consultații. Fără presiune comercială."

**Collaboration Process**:

- Step-by-step process (5 steps)
- Emphasize: "Niciun profil nu este afișat public fără verificare"

**Ethics/GDPR Section** (CRITICAL):

- GDPR compliance
- No sensitive medical data storage
- No online diagnosis
- No individual medical recommendations
- Full control over profile
- Can edit/withdraw profile anytime

**Why Choose Yuvoo**:

- NOT commercial testimonials
- Focus on: Responsible association, educational impact, professional visibility (not advertising)

**FAQ**:

- Questions adapted for doctors (see brief for full list)
- Answers must be clear, short, ethical

**Final CTA**:

- Low-pressure: "Aplică pentru rolul de Expert Pediatric Verificat"
- Secondary: "Programează un call de clarificare (15 min)"
- NO urgency tactics

**Footer**:

- "Yuvoo nu înlocuiește actul medical."
- "Yuvoo ajută părinții să ajungă la decizii mai bune, mai devreme."
