# Prompt: Create Doctor Onboarding from Club Onboarding Pattern

━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━

Analyze the existing club onboarding implementation at `src/app/onboarding/club/` and create/complete the doctor onboarding pages at `src/app/onboarding/doctor/` by:

1. **Scanning** all club onboarding pages and components
2. **Identifying** reusable patterns, components, and structure
3. **Adapting** club-specific components for doctor onboarding
4. **Creating** missing doctor onboarding pages that follow the same architectural patterns

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━

**Club Onboarding Structure** (reference implementation):

- Location: `src/app/onboarding/club/`
- Steps: 7 steps (welcome, basic-info, contact-schedule, pricing-ages, photos, verification, complete)
- Layout: `layout.tsx` with `requireRole("club_admin")` check
- Shared Components: `OnboardingLayout`, `OnboardingProgress`, `OnboardingNavigation`
- Form Components: `ClubBasicInfoForm`, `ClubContactScheduleForm`, `ClubPricingAgesForm`, `ClubPhotosForm`, `ClubVerificationForm`
- Completion: `ClubCompletionContent`

**Doctor Onboarding Current State**:

- Location: `src/app/onboarding/doctor/`
- Steps: 8 steps (welcome ✅, basic-info, bio-experience, location-contact, photo, verification, availability, complete)
- Layout: `layout.tsx` exists with `requireRole("doctor")` check
- Welcome page: Already implemented (reference `src/app/onboarding/doctor/welcome/page.tsx`)
- Form Components: Some exist (`DoctorBasicInfoForm`, `DoctorBioExperienceForm`, `DoctorLocationContactForm`, `DoctorPhotoForm`, `DoctorVerificationForm`, `DoctorAvailabilityForm`)
- Completion: `DoctorCompletionContent` exists

**Shared Components Location**:

- `src/components/features/onboarding/components/` - Reusable form components (FormField, FormSection, InfoBox, FileUploadArea, etc.)
- `src/components/features/onboarding/` - Onboarding-specific components (OnboardingLayout, OnboardingProgress, OnboardingNavigation)

**Key Patterns to Follow**:

- Each step is a Server Component page with `requireRole("doctor")` check
- Use `OnboardingLayout` wrapper for consistent styling
- Use `OnboardingProgress` with step definitions matching `DOCTOR_STEPS` array
- Use `OnboardingNavigation` for back/next buttons
- Form components are Client Components ("use client") with server actions
- All user-facing text must be in Romanian
- Follow Bootstrap 5.3.3 utility classes + SCSS patterns
- Use existing form field components from `components/features/onboarding/components/`

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

**Scope**:

- Only create/complete doctor onboarding pages
- Reuse existing doctor form components where they exist
- Adapt patterns from club onboarding, don't copy verbatim
- Maintain consistency with existing doctor onboarding welcome page style

**DO NOT**:

- Do NOT modify club onboarding files
- Do NOT create duplicate shared components (use existing ones)
- Do NOT change the database schema
- Do NOT modify authentication logic (layout.tsx is complete)
- Do NOT create new server actions unless form components require them
- Do NOT change routing structure (routes already defined)
- Do NOT modify shared onboarding components (OnboardingLayout, OnboardingProgress, etc.)
- Do NOT add features beyond what exists in club onboarding pattern

**Reuse Requirements**:

- Must use existing `OnboardingLayout`, `OnboardingProgress`, `OnboardingNavigation` components
- Must use existing form field components from `components/features/onboarding/components/`
- Must follow the same step structure pattern as club onboarding
- Must use existing doctor form components if they exist

**Language & Content**:

- All UI text, labels, buttons, messages MUST be in Romanian
- Error messages must be in Romanian
- Form placeholders and help text in Romanian
- Follow the tone and style from club onboarding (professional, friendly, clear)

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━

**Step 1: Analysis Output** (before creating code):
JSON schema:

```json
{
  "clubOnboardingAnalysis": {
    "pages": [
      {
        "route": "string (e.g., 'welcome', 'basic-info')",
        "file": "string (relative path)",
        "structure": "string (description of page structure)",
        "componentsUsed": ["array of component names"],
        "patterns": ["array of identified patterns"],
        "adaptableForDoctor": "boolean",
        "adaptationNotes": "string | null"
      }
    ],
    "reusableComponents": [
      {
        "name": "string",
        "location": "string",
        "canReuse": "boolean",
        "adaptationRequired": "string | null"
      }
    ],
    "doctorOnboardingStatus": {
      "existingPages": ["array of existing page routes"],
      "missingPages": ["array of missing page routes"],
      "existingFormComponents": ["array of existing form component names"],
      "formComponentsToCreate": ["array of form components that need creation"]
    }
  }
}
```

**Step 2: Implementation Plan**:
JSON schema:

```json
{
  "implementationPlan": {
    "pagesToCreate": [
      {
        "route": "string",
        "priority": "high" | "medium" | "low",
        "similarClubPage": "string (club page to reference)",
        "formComponent": "string | null (existing or null if needs creation)",
        "estimatedComplexity": "low" | "medium" | "high",
        "notes": "string | null"
      }
    ],
    "componentsToAdapt": [
      {
        "sourceComponent": "string (club component)",
        "targetComponent": "string (doctor component, may already exist)",
        "changesRequired": ["array of required changes"],
        "reuseLevel": "direct" | "adapted" | "inspired"
      }
    ],
    "orderOfImplementation": ["array of page routes in implementation order"]
  }
}
```

**Step 3: Code Implementation**:

- Create missing page files following the exact structure pattern
- Use `search_replace` or `write` tools for code changes
- Show code for each new page created
- Document which club page was used as inspiration

**Format for each page**:

```typescript
// File: src/app/onboarding/doctor/{step}/page.tsx
// Inspired by: src/app/onboarding/club/{similar-step}/page.tsx
// [Code implementation]
```

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━

**Example 1: Page Structure Pattern**

Club onboarding page structure:

```typescript
// src/app/onboarding/club/basic-info/page.tsx
import { requireRole } from "@/lib/auth/session";
import { OnboardingLayout, OnboardingProgress, type OnboardingStep } from "@/components/features/onboarding";
import { ClubBasicInfoForm } from "@/components/features/onboarding/ClubBasicInfoForm";

const CLUB_STEPS: OnboardingStep[] = [ /* ... */ ];

export default async function ClubBasicInfoPage() {
  const _session = await requireRole("club_admin");
  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={2} steps={CLUB_STEPS} className="mb-8" />
      <div className="bd-onboarding-page mx-auto">
        <div className="bd-onboarding-page-header">
          <h1 className="display-4 fw-bold text-body mb-4">Title</h1>
          <p className="h5 text-body">Description</p>
        </div>
        <div className="bd-onboarding-page-content">
          <ClubBasicInfoForm />
        </div>
      </div>
    </OnboardingLayout>
  );
}
```

Doctor onboarding should follow similar structure:

```typescript
// src/app/onboarding/doctor/basic-info/page.tsx
import { requireRole } from "@/lib/auth/session";
import { OnboardingLayout, OnboardingProgress, type OnboardingStep } from "@/components/features/onboarding";
import { DoctorBasicInfoForm } from "@/components/features/onboarding/DoctorBasicInfoForm";

const DOCTOR_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Informații profesionale", description: "Profil de bază" },
  // ... rest of steps
];

export default async function DoctorBasicInfoPage() {
  const _session = await requireRole("doctor");
  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={2} steps={DOCTOR_STEPS} className="mb-8" />
      {/* Similar structure, adapted for doctor context */}
    </OnboardingLayout>
  );
}
```

**Example 2: Component Reuse**

If `DoctorBasicInfoForm` already exists, use it directly. If not, check if `ClubBasicInfoForm` patterns can inspire creation, but adapt for doctor-specific fields (e.g., specialization instead of club name, credentials instead of club description).

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━

- Use minimal diffs: only create new files, don't modify existing doctor onboarding files unless necessary
- Preserve existing code style and patterns from club onboarding
- Do NOT refactor unrelated code
- Do NOT change imports in existing files unless required
- Follow existing TypeScript/React patterns (Server Components by default, Client Components for forms)
- Use existing utility functions and components when available
- Maintain backward compatibility
- Add type safety: use existing types, create new types only if needed
- Error handling: follow existing error handling patterns
- Use `@/lib/routes` for navigation (never hardcode paths)
- Follow Next.js 16 Cache Components patterns (no legacy caching patterns)

━━━━━━━━━━━━━━━━━━━━
EXECUTION STEPS
━━━━━━━━━━━━━━━━━━━━

1. **Scan Phase**: Read all club onboarding page files and analyze structure
2. **Analysis Phase**: Generate analysis JSON showing reusable components and patterns
3. **Planning Phase**: Generate implementation plan JSON with prioritized list
4. **Implementation Phase**: Create missing doctor onboarding pages following identified patterns
5. **Verification Phase**: Ensure all pages follow the same structure and use shared components correctly

━━━━━━━━━━━━━━━━━━━━
SUCCESS CRITERIA
━━━━━━━━━━━━━━━━━━━━

✅ All 8 doctor onboarding steps have complete page implementations
✅ All pages follow the same structural pattern as club onboarding
✅ All pages use shared components (OnboardingLayout, OnboardingProgress, OnboardingNavigation)
✅ All pages properly integrate with existing doctor form components
✅ All user-facing text is in Romanian
✅ All pages pass TypeScript type checking
✅ All pages follow Next.js 16 Server Component patterns
✅ Code style matches existing codebase
✅ Navigation flows correctly between steps
✅ Progress indicator shows correct step numbers

━━━━━━━━━━━━━━━━━━━━

**Usage Instructions**:

1. Execute this prompt in Cursor/Claude Code
2. The AI will first perform analysis and show JSON outputs
3. Review the analysis and implementation plan
4. The AI will then create the missing pages
5. Verify the implementation matches the patterns

**Related Files to Reference**:

- `src/app/onboarding/club/*` - All club onboarding pages (reference)
- `src/app/onboarding/doctor/welcome/page.tsx` - Existing doctor welcome page (reference for style)
- `src/components/features/onboarding/index.ts` - Available components
- `src/components/features/onboarding/components/index.ts` - Available form field components
- `src/lib/routes.ts` - Route definitions for navigation
