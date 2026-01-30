# Quiz Child Selection Design Specification

## Overview

**Problem**: The quiz container page (`/chestionar/container`) currently uses a placeholder child ID, requiring a proper child selection flow before the quiz begins.

**Location**: `src/app/(public)/chestionar/container/page.tsx:29-31`

```typescript
// TODO: Get child ID from user session or child selection
// For now, using a placeholder ID
const childId = "placeholder-child-id";
```

**Goal**: Design a user-friendly child selection system that handles both authenticated and unauthenticated users.

---

## User Flow Analysis

### Current State

```
User clicks "Start Quiz"
    ↓
/chestionar/container (placeholder childId)
    ↓
Complete 7 questions
    ↓
submitQuiz() detects placeholder
    ↓
createTemporaryChildForQuiz() ← Creates child from answers
    ↓
Quiz saved with temp child
```

### Proposed State

```
User clicks "Start Quiz"
    ↓
/chestionar/container
    ↓
[Child Selection Flow]
    ├─ Authenticated user: Select existing child OR create new
    └─ Unauthenticated user: Enter basic child info (inline form)
    ↓
QuizContainer receives valid childId
    ↓
Complete 7 questions
    ↓
Quiz saved with real child record
```

---

## Design Alternatives

### Option A: Pre-Quiz Step (Recommended) ✅

Add a dedicated step before the quiz that collects child information.

**Architecture**:

- New route: `/chestionar/copil` (child selection step)
- Redirect pattern: `/chestionar/copil` → `/chestionar/container?childId=xxx`
- `QuizContainer` receives `childId` from URL params

**Pros**:

- Clean separation of concerns
- SEO-friendly (dedicated page for child selection)
- Easy to track analytics for each step
- Natural back/forward browser navigation
- Supports deep linking to quiz with pre-selected child

**Cons**:

- Additional page/route
- Slightly longer user journey

### Option B: Modal Overlay

Show child selection in a modal before quiz questions appear.

**Architecture**:

- Modal component on `/chestionar/container`
- State management in parent component
- Quiz hidden until child selected

**Pros**:

- Single page experience
- Faster perceived load time

**Cons**:

- More complex state management
- Modal accessibility concerns
- Can't bookmark/share child selection step
- Browser back button issues

### Option C: Integrated First Question

Make child information part of the quiz (Question 0).

**Architecture**:

- Modify `QuizContainer` to have a "pre-step"
- Child info collected as part of quiz flow
- Create child record before Question 1

**Pros**:

- Seamless user experience
- No additional routes
- Consistent with quiz UI

**Cons**:

- Mixes concerns (child management + quiz)
- Harder to reuse child data
- Authenticated users still need selection

---

## Recommended Solution: Option A (Pre-Quiz Step)

### Route Structure

```
/chestionar                    → Quiz intro/landing
/chestionar/copil              → Child selection (NEW)
/chestionar/container          → Quiz questions (modified)
/chestionar/email/[quizId]     → Email gate
/chestionar/teaser/[quizId]    → Teaser preview
/chestionar/paywall/[quizId]   → Payment
/chestionar/rezultate/[id]     → Results
```

### Component Architecture

```
QuizChildSelectionPage (Server Component)
├─ if authenticated:
│   └─ ChildSelectionPanel (Client Component)
│       ├─ ExistingChildList
│       │   └─ ChildSelectionCard (for each child)
│       └─ AddNewChildSection
│           └─ QuickAddChildForm
└─ if unauthenticated:
    └─ GuestChildInfoForm (Client Component)
        ├─ ChildNameInput (optional)
        ├─ ChildAgeInput (4-14, required)
        ├─ ChildGenderSelect (optional)
        └─ ContinueToQuizButton
```

---

## Detailed Design

### 1. New Route: `/chestionar/copil`

**File**: `src/app/(public)/chestionar/copil/page.tsx`

```typescript
// Server Component
import { getSession } from "@/lib/auth/session";
import { getChildrenByParentId } from "@/modules/children/children.service";
import { AuthenticatedChildSelection } from "@/components/features/quiz/AuthenticatedChildSelection";
import { GuestChildInfoForm } from "@/components/features/quiz/GuestChildInfoForm";

export const metadata = {
  title: "Selectează Copilul | Chestionar Yuvoo",
  description: "Selectează copilul pentru care dorești să completezi chestionarul.",
  robots: { index: false, follow: true },
};

export default async function QuizChildSelectionPage() {
  const session = await getSession();

  if (session) {
    // Authenticated: fetch existing children
    const children = await getChildrenByParentId(session.dbUser.id);
    return <AuthenticatedChildSelection children={children} />;
  }

  // Guest: show simple info form
  return <GuestChildInfoForm />;
}
```

### 2. Authenticated User Component

**File**: `src/components/features/quiz/AuthenticatedChildSelection.tsx`

```typescript
"use client";

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string | null;
}

interface Props {
  children: Child[];
}

export function AuthenticatedChildSelection({ children }: Props) {
  // States:
  // - hasChildren && !showAddForm → show selection list
  // - hasChildren && showAddForm → show add form below list
  // - !hasChildren → show add form only

  return (
    <div className="quiz-child-selection">
      <h1>Pentru cine este chestionarul?</h1>
      <p>Selectează copilul sau adaugă unul nou</p>

      {children.length > 0 && (
        <ChildSelectionList
          children={children}
          onSelect={handleChildSelect}
        />
      )}

      <AddChildSection>
        {children.length > 0 ? (
          <button onClick={() => setShowAddForm(true)}>
            + Adaugă un copil nou
          </button>
        ) : (
          <QuickAddChildForm onChildCreated={handleChildCreated} />
        )}
      </AddChildSection>
    </div>
  );
}
```

**Child Selection Card**:

- Shows: Name, Age (calculated from DOB), Gender icon
- Click → redirect to `/chestionar/container?childId=xxx`
- Highlight on hover
- Shows quiz count badge if child has previous quizzes

### 3. Guest User Component

**File**: `src/components/features/quiz/GuestChildInfoForm.tsx`

```typescript
"use client";

export function GuestChildInfoForm() {
  // Collects minimal info, creates temp child, redirects

  return (
    <div className="guest-child-form">
      <h1>Spune-ne despre copilul tău</h1>
      <p>Aceste informații ne ajută să personalizăm recomandările</p>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Numele copilului (opțional)"
          name="childName"
          placeholder="ex: Maria"
        />

        <FormField
          label="Vârsta copilului *"
          name="age"
          type="number"
          min={4}
          max={14}
          required
        />

        <GenderSelect
          label="Gen (opțional)"
          name="gender"
          options={[
            { value: "male", label: "Băiat" },
            { value: "female", label: "Fată" },
            { value: "other", label: "Alt gen" },
          ]}
        />

        <button type="submit">
          Continuă la Chestionar →
        </button>
      </form>
    </div>
  );
}
```

### 4. Server Actions

**File**: `src/app/actions/quiz-child.ts`

```typescript
"use server";

import { getSession } from "@/lib/auth/session";
import { createChild } from "@/modules/children/children.service";
import { createTemporaryChildForQuiz } from "@/modules/quiz/quiz.service";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

/**
 * Create child for authenticated user and redirect to quiz
 */
export async function createChildForQuizAction(formData: FormData) {
  const session = await getSession();
  if (!session) {
    throw new Error("Autentificare necesară");
  }

  const child = await createChild({
    parentId: session.dbUser.id,
    firstName: formData.get("firstName") as string,
    lastName: (formData.get("lastName") as string) || "Copil",
    dateOfBirth: calculateDOBFromAge(Number(formData.get("age"))),
    gender: formData.get("gender") as string | undefined,
  });

  redirect(`${routes.quiz.container}?childId=${child.id}`);
}

/**
 * Create temporary child for guest and redirect to quiz
 */
export async function createGuestChildForQuizAction(formData: FormData) {
  const age = Number(formData.get("age"));
  const name = formData.get("childName") as string | null;
  const gender = formData.get("gender") as string | null;

  // Validate age
  if (age < 4 || age > 14) {
    return { error: "Vârsta trebuie să fie între 4 și 14 ani" };
  }

  const childId = await createTemporaryChildForQuiz(
    { age, gender: gender || undefined, childName: name || undefined },
    null // No parent for guest
  );

  redirect(`${routes.quiz.container}?childId=${childId}`);
}
```

### 5. Modified Quiz Container Page

**File**: `src/app/(public)/chestionar/container/page.tsx`

```typescript
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import QuizContainer from "@/components/features/quiz/QuizContainer";
import { validateChildAccess } from "@/modules/children/children.service";

export default async function QuizContainerPage({
  searchParams,
}: {
  searchParams: Promise<{ childId?: string }>;
}) {
  const params = await searchParams;
  const childId = params.childId;

  // No childId → redirect to child selection
  if (!childId) {
    redirect(routes.quiz.childSelection); // New route: /chestionar/copil
  }

  // Validate childId exists (optional: validate ownership for auth users)
  const isValid = await validateChildAccess(childId);
  if (!isValid) {
    redirect(routes.quiz.childSelection);
  }

  return (
    <div className="quiz-container-page">
      <QuizContainer childId={childId} />
    </div>
  );
}
```

### 6. Route Updates

**File**: `src/lib/routes.ts`

```typescript
quiz: {
  intro: "/chestionar",
  childSelection: "/chestionar/copil", // NEW
  container: "/chestionar/container",
  // ... existing routes
},
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        QUIZ CHILD SELECTION FLOW                     │
└─────────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │   /chestionar │
                              │    (intro)    │
                              └──────┬───────┘
                                     │
                                     ▼
                           ┌─────────────────────┐
                           │  /chestionar/copil   │
                           │  (child selection)   │
                           └──────────┬──────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
         ┌──────────────────┐              ┌──────────────────┐
         │   Authenticated   │              │      Guest        │
         │   User Flow       │              │      Flow         │
         └────────┬─────────┘              └────────┬─────────┘
                  │                                  │
         ┌────────┴────────┐                        │
         │                 │                        │
         ▼                 ▼                        ▼
┌─────────────┐   ┌─────────────┐         ┌─────────────────┐
│  Select     │   │  Create     │         │  Enter Child    │
│  Existing   │   │  New Child  │         │  Info (minimal) │
│  Child      │   │             │         │                 │
└──────┬──────┘   └──────┬──────┘         └────────┬────────┘
       │                 │                         │
       │    Server Action│           Server Action │
       │    (createChild)│    (createTempChild)    │
       │                 │                         │
       └────────┬────────┴─────────────────────────┘
                │
                ▼
   ┌────────────────────────────┐
   │  /chestionar/container      │
   │  ?childId={valid-uuid}      │
   └─────────────┬──────────────┘
                 │
                 ▼
   ┌────────────────────────────┐
   │  QuizContainer (7 steps)    │
   │  - childId prop received    │
   │  - No more placeholder!     │
   └─────────────┬──────────────┘
                 │
                 ▼
   ┌────────────────────────────┐
   │  submitQuiz(childId, ...)   │
   │  - Uses real childId        │
   │  - No temp child creation   │
   └────────────────────────────┘
```

---

## UI/UX Specifications

### Authenticated User View

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     🧒 Pentru cine este chestionarul?                       │
│     Selectează copilul sau adaugă unul nou                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  👦 Andrei       │  │  👧 Maria        │                  │
│  │  8 ani           │  │  6 ani           │                  │
│  │  2 chestionare   │  │  0 chestionare   │                  │
│  │  [Selectează]    │  │  [Selectează]    │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  + Adaugă un copil nou                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Guest User View

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     🧒 Spune-ne despre copilul tău                          │
│     Aceste informații ne ajută să personalizăm              │
│     recomandările                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Numele copilului (opțional)                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ex: Maria                                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Vârsta copilului *                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  7                                             ▼    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Gen (opțional)                                             │
│  ○ Băiat    ○ Fată    ○ Alt gen                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │        Continuă la Chestionar →                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ────────────────────────────────────────────────────────  │
│                                                             │
│  Ai deja un cont?  [Conectează-te] pentru a salva          │
│  rezultatele și a accesa istoricul chestionarelor          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Validation Rules

### Child Age

- **Minimum**: 4 years (mandatory sports age start in Romania)
- **Maximum**: 14 years (target demographic)
- **Validation**: `4 <= age <= 14`
- **Error message**: "Vârsta copilului trebuie să fie între 4 și 14 ani"

### Child Name

- **Required**: No (optional for guests)
- **Min length**: 1 character (if provided)
- **Max length**: 50 characters
- **Pattern**: Letters, hyphens, spaces only

### Gender

- **Required**: No (optional)
- **Values**: "male" | "female" | "other"
- **Default**: null (not specified)

---

## Security Considerations

### Child Access Validation

For authenticated users selecting existing children:

```typescript
async function validateChildAccess(childId: string, userId?: string): Promise<boolean> {
  if (!userId) {
    // Guest users: childId must be a temp child (no owner validation)
    return await childExists(childId);
  }

  // Authenticated: verify child belongs to user
  const child = await getChildById(childId);
  return child?.parentId === userId;
}
```

### Rate Limiting

- Guest child creation: 10 per IP per hour
- Authenticated child creation: 20 per user per day

### Data Privacy

- Temporary children created for guests are not linked to any user account
- If guest later registers, option to claim temp child records (future enhancement)

---

## Implementation Checklist

### Phase 1: Core Components (Priority: High)

- [ ] Create `/chestionar/copil/page.tsx` (server component)
- [ ] Create `AuthenticatedChildSelection.tsx` (client component)
- [ ] Create `GuestChildInfoForm.tsx` (client component)
- [ ] Create `ChildSelectionCard.tsx` (presentational)
- [ ] Add Server Actions in `/app/actions/quiz-child.ts`
- [ ] Add `childSelection` route to `routes.ts`
- [ ] Modify `/chestionar/container/page.tsx` to read `childId` from URL

### Phase 2: Service Layer Updates

- [ ] Add `validateChildAccess()` to children service
- [ ] Update `createTemporaryChildForQuiz()` to accept `childName`
- [ ] Add rate limiting to child creation actions

### Phase 3: UI Polish

- [ ] Add loading states during child creation
- [ ] Add error boundaries for form submissions
- [ ] Implement keyboard navigation
- [ ] Add analytics events for child selection

### Phase 4: Integration Testing

- [ ] Test authenticated user with 0 children
- [ ] Test authenticated user with 1+ children
- [ ] Test guest user flow
- [ ] Test invalid childId redirect
- [ ] Test back/forward navigation

---

## Related Files

| File                                             | Purpose                       |
| ------------------------------------------------ | ----------------------------- |
| `src/app/(public)/chestionar/container/page.tsx` | Quiz container (modify)       |
| `src/components/features/quiz/QuizContainer.tsx` | Quiz orchestrator (unchanged) |
| `src/modules/children/children.service.ts`       | Child CRUD (extend)           |
| `src/modules/quiz/quiz.service.ts`               | Quiz submission (unchanged)   |
| `src/lib/routes.ts`                              | Route definitions (add new)   |
| `src/lib/validations/child.ts`                   | Validation schemas (reuse)    |

---

## Appendix: Romanian Copy

### Page Titles

- "Selectează Copilul | Chestionar Yuvoo"
- "Spune-ne despre copilul tău | Chestionar Yuvoo"

### Headings

- "Pentru cine este chestionarul?" (authenticated)
- "Spune-ne despre copilul tău" (guest)

### Subheadings

- "Selectează copilul sau adaugă unul nou"
- "Aceste informații ne ajută să personalizăm recomandările"

### Buttons

- "Selectează" (select existing child)
- "Adaugă un copil nou" (add new)
- "Continuă la Chestionar →" (continue)

### Labels

- "Numele copilului (opțional)"
- "Vârsta copilului \*"
- "Gen (opțional)"
- "Băiat" / "Fată" / "Alt gen"

### Validation Errors

- "Vârsta copilului trebuie să fie între 4 și 14 ani"
- "Numele trebuie să aibă cel puțin un caracter"
- "A apărut o eroare. Te rugăm să încerci din nou."

### Info Text

- "Ai deja un cont? Conectează-te pentru a salva rezultatele și a accesa istoricul chestionarelor"
- "{N} chestionare completate" (on child card)

---

_Document Version: 1.0_
_Created: January 2024_
_Author: System Design_
