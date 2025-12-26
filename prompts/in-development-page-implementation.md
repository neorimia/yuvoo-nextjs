# Pre-Launch Access Control & In Development Page Implementation Prompt

━━━━━━━━━━━━━━━━━━━━
TASK
━━━━━━━━━━━━━━━━━━━━

Implement a comprehensive pre-launch access control system with a polished "In Development" experience that:

1. **Feature Flag System**: Create a single config switch to enable/disable route restrictions (default: enabled until Jan 2026)
2. **Route Restrictions**: Restrict access to quiz routes, authentication routes, and all dashboard routes
3. **Public Access**: Keep public pages accessible (home, marketing pages, SEO pages)
4. **Pre-Launch Experience**: Replace restricted access with polished pre-launch pages/modals (not errors or blank screens)
5. **Waitlist Capture**: Add email capture forms on pre-launch pages/modals
6. **Main Landing Page**: Display information sections for three user types (Parents, Clubs, Doctors) with early access modals

━━━━━━━━━━━━━━━━━━━━
CONTEXT
━━━━━━━━━━━━━━━━━━━━

**Current State**:

- File: `src/app/(public)/page.tsx` - Currently shows simple placeholder text
- Route: `/` (homepage) - SEO-friendly route
- Framework: Next.js 16 with App Router and Cache Components
- Styling: Bootstrap 5.3.3 + SCSS (import from `@/styles/globals.scss`)

**Existing Components**:

- Modal pattern: `src/components/Popup/ProductModal.tsx` - Uses Bootstrap 5.3.3 modal with `data-bs-toggle="modal"` and `data-bs-target`
- Form pattern: `src/components/Form/ContactForm.tsx` - Uses React Hook Form with validation
- Email validation: Existing pattern in `SignInForm.tsx` and `ForgotForm.tsx` with Zod/React Hook Form

**Brand Guidelines** (`docs/BRAND_GUIDELINES.md`):

- Primary Color: `#00BBAE` (Turcoaz) - for primary buttons
- Secondary Color: `#FF9B24` (Portocaliu) - for CTAs and highlights
- Typography: `'Gabarito', sans-serif` - primary font
- Tone: 70% Warm & Supportive, 30% Expert & Confident
- All content MUST be in Romanian

**Copy Library** (`docs/COPY_LIBRARY.md`):

- CTAs: "Creează cont", "Autentifică-te", "Rezervă o probă gratuită"
- Form labels: "Email", "Nume complet"
- Success messages: "Mulțumim! Te vom contacta în curând."

**Related Routes** (`src/lib/routes.ts`):

- Home route: `routes.home = "/"`
- Club landing: `routes.clubs.landing = "/pentru-cluburi"`
- Doctor routes: `routes.doctors.list = "/doctori"`

━━━━━━━━━━━━━━━━━━━━
CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━

**Content Constraints**:

- All user-facing text MUST be in Romanian language
- Follow brand voice: 70% Warm & Supportive, 30% Expert & Confident
- Use existing copy patterns from `docs/COPY_LIBRARY.md`
- Each section (Parents, Clubs, Doctors) should have:
  - Clear heading (H2)
  - 2-3 paragraphs describing benefits/value proposition
  - Call-to-action button with Romanian text

**Technical Constraints**:

- Use Server Component by default (no `'use client'` unless needed for interactivity)
- Modal components MUST be Client Components (`'use client'`)
- Use Bootstrap 5.3.3 modal pattern (not custom modal)
- Use React Hook Form for email collection forms
- Email validation: Use existing Zod schema pattern from `SignInForm.tsx`
- Do NOT create new Server Actions - use placeholder/console.log for now (backend integration later)
- Do NOT modify existing components unless explicitly required
- Do NOT change routing structure
- Preserve existing page structure and SEO metadata

**Styling Constraints**:

- Use Bootstrap 5.3.3 utility classes
- Follow existing SCSS patterns from `public/assets/scss/`
- Use brand colors: Primary `#00BBAE`, Secondary `#FF9B24`
- Use Gabarito font family
- Responsive design: Mobile-first approach
- Maintain consistency with existing landing pages (e.g., `pentru-cluburi`)

**Scope Boundaries**:

- Create feature flag/config system in `src/lib/config/pre-launch.ts`
- Create pre-launch page component for restricted routes
- Update route layouts to check feature flag and redirect/block restricted routes
- Create waitlist Server Action for email storage
- Do NOT modify existing public pages (home, marketing, SEO pages)
- Do NOT modify navigation or header/footer
- Do NOT add PostHog tracking (can be added later)
- Do NOT create separate pages for each user type

━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━

**File Structure**:

```
src/lib/config/
  └── pre-launch.ts                         # Feature flag config (default: enabled until Jan 2026)

src/app/(public)/page.tsx                   # Main landing page (Server Component)

src/components/features/early-access/       # New directory
  ├── EarlyAccessModal.tsx                  # Reusable modal component (Client Component)
  ├── EarlyAccessForm.tsx                   # Email form component (Client Component)
  └── PreLaunchPage.tsx                     # Pre-launch page for restricted routes (Server Component)

src/app/actions/
  └── waitlist.ts                           # Waitlist Server Actions (email storage)

src/app/(public)/chestionar/                # Quiz routes - add layout.tsx to check restrictions
src/app/(auth)/                             # Auth routes - add layout.tsx to check restrictions
src/app/(parent)/                           # Parent dashboard - add layout.tsx to check restrictions
src/app/(club-portal)/                      # Club dashboard - add layout.tsx to check restrictions
src/app/(doctor-portal)/                    # Doctor dashboard - add layout.tsx to check restrictions
```

**Code Format**:

- Use `search_replace` tool for modifying existing `page.tsx`
- Use `write` tool for creating new components
- Show complete component code with TypeScript types
- Include proper imports and exports
- Add JSDoc comments for components

**Implementation Steps**:

1. Create `pre-launch.ts` config - Feature flag with date-based default (enabled until Jan 2026)
2. Create `PreLaunchPage.tsx` - Reusable pre-launch page component for restricted routes
3. Create `waitlist.ts` Server Actions - Email storage for waitlist signups
4. Create `EarlyAccessForm.tsx` - Email form with React Hook Form + validation
5. Create `EarlyAccessModal.tsx` - Bootstrap modal wrapper with form
6. Update `page.tsx` - Add three sections with buttons and modals
7. Add layout checks to restricted route groups - Quiz, Auth, Dashboards

━━━━━━━━━━━━━━━━━━━━
DETAILED REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━

### Feature Flag Configuration

**File**: `src/lib/config/pre-launch.ts`

**Requirements**:

- Single boolean flag: `PRE_LAUNCH_RESTRICTIONS_ENABLED`
- Default value: `true` (enabled)
- Auto-disable date: January 1, 2026 (configurable)
- Environment variable override: `NEXT_PUBLIC_PRE_LAUNCH_RESTRICTIONS_ENABLED`
- Type-safe export with TypeScript

**Implementation**:

```typescript
// Check if restrictions should be enabled
// Default: enabled until Jan 1, 2026
// Can be overridden via environment variable
export const PRE_LAUNCH_RESTRICTIONS_ENABLED =
  process.env.NEXT_PUBLIC_PRE_LAUNCH_RESTRICTIONS_ENABLED === "false"
    ? false
    : new Date() < new Date("2026-01-01");
```

### Route Restrictions

**Restricted Routes** (when flag is enabled):

1. **Quiz Routes** (`/chestionar/*`):
   - `/chestionar` (intro)
   - `/chestionar/container`
   - `/chestionar/previzualizare`
   - `/chestionar/rezultate/*`

2. **Authentication Routes** (`/auth/*` or `/login`, `/register`, etc.):
   - `/login`
   - `/register`
   - `/forgot-password`
   - `/reset-password`
   - `/verify-email`
   - `/email-confirmation`
   - `/choose-role`
   - `/auth/redirect`

3. **Dashboard Routes**:
   - `/parent/*` (all parent dashboard routes)
   - `/club/*` (all club portal routes)
   - `/doctor/*` (all doctor portal routes)
   - `/admin/*` (all admin routes, if exists)

**Public Routes** (always accessible):

- `/` (home)
- `/pentru-cluburi` (clubs landing)
- `/cluburi` (clubs listing)
- `/cluburi/*` (club detail pages)
- `/doctori` (doctors listing)
- `/doctori/*` (doctor detail pages)
- `/sporturi` (sports listing)
- `/sporturi/*` (sport detail pages)
- `/despre-noi`, `/contact`, `/faq`, `/ajutor` (info pages)
- `/confidentialitate`, `/termeni`, `/cookies`, `/gdpr-parinti` (legal pages)

### Pre-Launch Page Component

**File**: `src/components/features/early-access/PreLaunchPage.tsx`

**Requirements**:

- Server Component (default)
- Displays polished "În dezvoltare" message
- Shows context-specific content based on route type (quiz, auth, dashboard)
- Includes waitlist email capture form
- Uses existing `EarlyAccessForm` component
- Follows Yuvoo brand guidelines
- All content in Romanian

**Content Variations**:

- **Quiz routes**: "Quiz-ul AI este în dezvoltare. Completează formularul pentru acces prioritar."
- **Auth routes**: "Platforma este în dezvoltare. Completează formularul pentru a fi notificat când va fi disponibilă."
- **Dashboard routes**: "Panoul de control este în dezvoltare. Completează formularul pentru acces prioritar."

### Waitlist Server Actions

**File**: `src/app/actions/waitlist.ts`

**Requirements**:

- `submitWaitlistAction(email: string, userType?: string, source?: string)` - Save email to database
- Create `waitlist_emails` table if needed (or use existing table)
- Store: email, userType (parent/club/doctor), source (route path), createdAt
- Return success/error response
- Validation: Email format, required fields
- Error messages in Romanian

### Section 1: For Parents (Pentru Părinți)

**Content** (Romanian):

- Heading: "Pentru Părinți"
- Description: Explain how Yuvoo helps parents find the right sports for their children
- Benefits: AI-powered recommendations, verified clubs, pediatric specialists
- CTA Button: "Obține acces prioritar" (Get Priority Access)
- Modal Title: "Obține acces prioritar ca părinte"
- Modal Description: "Fii printre primii care descoperă sportul potrivit pentru copilul tău"

### Section 2: For Clubs (Pentru Cluburi)

**Content** (Romanian):

- Heading: "Pentru Cluburi Sportive"
- Description: Explain how clubs can join Yuvoo platform
- Benefits: Reach more parents, verified listing, booking system
- CTA Button: "Devino Club Fondator" (Become Founding Club)
- Modal Title: "Devino Club Fondator"
- Modal Description: "Alătură-te platformei Yuvoo și ajută părinții să găsească sportul potrivit"

### Section 3: For Doctors (Pentru Doctori)

**Content** (Romanian):

- Heading: "Pentru Doctori Specialiști"
- Description: Explain how pediatric specialists can join the network
- Benefits: Connect with parents, showcase expertise, consultation bookings
- CTA Button: "Alătură-te rețelei" (Join the Network)
- Modal Title: "Alătură-te rețelei de specialiști"
- Modal Description: "Conectează-te cu părinții care caută consiliere medicală pentru copiii lor"

### Modal Requirements

**Structure**:

- Bootstrap 5.3.3 modal with `data-bs-toggle="modal"` and `data-bs-target`
- Unique modal IDs: `#parentEarlyAccessModal`, `#clubEarlyAccessModal`, `#doctorEarlyAccessModal`
- Close button (X) in header
- Form in modal body
- Submit button in modal footer

**Form Fields**:

- Email input (required, validated)
- Optional: Name field (for better personalization)
- Submit button: "Trimite" (Send)
- Success message: "Mulțumim! Te vom contacta în curând." (Thank you! We'll contact you soon.)

**Validation**:

- Email format validation (use existing pattern)
- Required field validation
- Error messages in Romanian
- Success state after submission

**Styling**:

- Use Bootstrap modal classes
- Primary button color: `#00BBAE` (Turcoaz)
- Responsive design
- Accessible (ARIA labels, keyboard navigation)

━━━━━━━━━━━━━━━━━━━━
CODE CHANGE RULES
━━━━━━━━━━━━━━━━━━━━

- Use minimal diffs: only modify `page.tsx` and create new components
- Preserve existing code style and patterns
- Do NOT refactor unrelated code
- Do NOT change imports unless required
- Do NOT modify comments unless they're incorrect
- Follow existing TypeScript/React patterns in the codebase
- Use existing utility functions when available
- Maintain backward compatibility
- Add type safety: use existing types, create new types only if needed
- Error handling: follow existing error handling patterns
- Use existing form validation patterns (React Hook Form + Zod)

━━━━━━━━━━━━━━━━━━━━
ACCEPTANCE CRITERIA
━━━━━━━━━━━━━━━━━━━━

### Functional Requirements

**Feature Flag**:

- ✅ Feature flag defaults to enabled until Jan 1, 2026
- ✅ Can be disabled via environment variable
- ✅ Type-safe configuration export

**Route Restrictions**:

- ✅ Quiz routes show pre-launch page when flag is enabled
- ✅ Auth routes show pre-launch page when flag is enabled
- ✅ Dashboard routes show pre-launch page when flag is enabled
- ✅ Public pages remain accessible regardless of flag state
- ✅ Marketing pages remain accessible regardless of flag state
- ✅ SEO pages remain accessible regardless of flag state

**Pre-Launch Experience**:

- ✅ Restricted routes show polished pre-launch page (not errors)
- ✅ Pre-launch page displays context-appropriate message
- ✅ Pre-launch page includes waitlist email capture form
- ✅ Form validates email format
- ✅ Form saves email to database via Server Action
- ✅ Form shows success message after submission
- ✅ Form shows error messages for invalid input
- ✅ All text is in Romanian language

**Main Landing Page**:

- ✅ Page displays three distinct sections (Parents, Clubs, Doctors)
- ✅ Each section has descriptive content in Romanian
- ✅ Each section has a CTA button
- ✅ Clicking button opens Bootstrap modal
- ✅ Modal displays email collection form
- ✅ Modal can be closed via X button or backdrop click

### Non-Functional Requirements

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessible (WCAG AA minimum)
- ✅ Fast page load (Server Component)
- ✅ SEO-friendly (proper heading structure)
- ✅ Consistent with brand guidelines

### Quality Requirements

- ✅ TypeScript strict mode compliance
- ✅ No console errors or warnings
- ✅ Follows existing code patterns
- ✅ Proper component structure (Server/Client separation)
- ✅ Reusable modal and pre-launch components
- ✅ Feature flag can be toggled without code changes (env var)
- ✅ Database schema for waitlist emails (if new table needed)

━━━━━━━━━━━━━━━━━━━━
EXAMPLES
━━━━━━━━━━━━━━━━━━━━

### Feature Flag Configuration

```typescript
// src/lib/config/pre-launch.ts
/**
 * Pre-Launch Access Control Configuration
 *
 * Controls whether route restrictions are enabled.
 * Default: Enabled until January 1, 2026
 * Override: Set NEXT_PUBLIC_PRE_LAUNCH_RESTRICTIONS_ENABLED=false in .env.local
 */
export const PRE_LAUNCH_RESTRICTIONS_ENABLED =
  process.env.NEXT_PUBLIC_PRE_LAUNCH_RESTRICTIONS_ENABLED === "false"
    ? false
    : new Date() < new Date("2026-01-01");

export const PRE_LAUNCH_DISABLE_DATE = new Date("2026-01-01");
```

### Route Layout Check Pattern

```typescript
// src/app/(public)/chestionar/layout.tsx
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";
import { redirect } from "next/navigation";

export default async function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="quiz" />;
  }

  return <>{children}</>;
}
```

### Pre-Launch Page Component

```typescript
// src/components/features/early-access/PreLaunchPage.tsx
import EarlyAccessForm from "./EarlyAccessForm";

interface PreLaunchPageProps {
  routeType: "quiz" | "auth" | "dashboard";
}

export default function PreLaunchPage({ routeType }: PreLaunchPageProps) {
  const messages = {
    quiz: {
      title: "Quiz-ul AI este în dezvoltare",
      description: "Completează formularul pentru acces prioritar când quiz-ul va fi disponibil.",
    },
    auth: {
      title: "Platforma este în dezvoltare",
      description: "Completează formularul pentru a fi notificat când platforma va fi disponibilă.",
    },
    dashboard: {
      title: "Panoul de control este în dezvoltare",
      description: "Completează formularul pentru acces prioritar când panoul va fi disponibil.",
    },
  };

  const message = messages[routeType];
  const userType = routeType === "quiz" ? "parent" : routeType === "auth" ? "parent" : "parent";

  return (
    <div className="container py-120">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1>{message.title}</h1>
          <p>{message.description}</p>
          <EarlyAccessForm userType={userType} />
        </div>
      </div>
    </div>
  );
}
```

### Waitlist Server Action

```typescript
// src/app/actions/waitlist.ts
"use server";

import { db } from "@/lib/db";
import { waitlistEmails } from "@/lib/db/schema";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().email("Email invalid"),
  userType: z.enum(["parent", "club", "doctor"]).optional(),
  source: z.string().optional(),
});

export async function submitWaitlistAction(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    userType: formData.get("userType") as string | undefined,
    source: formData.get("source") as string | undefined,
  };

  const validated = waitlistSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Date invalide",
    };
  }

  try {
    await db.insert(waitlistEmails).values({
      email: validated.data.email,
      userType: validated.data.userType || null,
      source: validated.data.source || null,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Mulțumim! Te vom contacta în curând.",
    };
  } catch (error) {
    return {
      success: false,
      error: "A apărut o eroare. Te rugăm să încerci din nou.",
    };
  }
}
```

### Modal Pattern (Bootstrap 5.3.3)

```tsx
// Button to trigger modal
<button
  type="button"
  className="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#parentEarlyAccessModal"
>
  Obține acces prioritar
</button>

// Modal structure
<div
  className="modal fade"
  id="parentEarlyAccessModal"
  tabIndex={-1}
  aria-labelledby="parentModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="parentModalLabel">
          Obține acces prioritar ca părinte
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <EarlyAccessForm userType="parent" />
      </div>
    </div>
  </div>
</div>
```

### Form Pattern (React Hook Form)

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Email invalid").min(1, "Email este obligatoriu"),
  name: z.string().optional(),
});

type FormData = z.infer<typeof emailSchema>;

export function EarlyAccessForm({ userType }: { userType: "parent" | "club" | "doctor" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Placeholder: console.log for now, Server Action later
    console.log("Early access signup:", { ...data, userType });
    // TODO: Call Server Action to save email
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* Form fields */}</form>;
}
```

━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━

**Feature Flag**:

- Default enabled until Jan 1, 2026 (configurable date)
- Can be disabled via `NEXT_PUBLIC_PRE_LAUNCH_RESTRICTIONS_ENABLED=false` in `.env.local`
- Check flag in route layouts, not in middleware (simpler implementation)
- Flag should be checked server-side only

**Route Restrictions**:

- Add layout.tsx files to route groups that need restrictions
- Check flag at layout level, return PreLaunchPage if enabled
- Keep public routes accessible (home, marketing, SEO pages)
- Use route helper functions from `lib/routes.ts` to identify route types

**Database**:

- Create `waitlist_emails` table if it doesn't exist
- Fields: id, email, userType (parent/club/doctor), source (route path), createdAt
- Use Drizzle ORM for database operations
- Add migration for new table if needed

**Pre-Launch Experience**:

- Use polished, branded pre-launch pages (not error pages)
- Include context-specific messaging based on route type
- Always include waitlist email capture form
- Follow Yuvoo brand guidelines (colors, typography, tone)
- All content in Romanian

**Modal IDs**:

- Must be unique for each user type
- Follow pattern: `#parentEarlyAccessModal`, `#clubEarlyAccessModal`, `#doctorEarlyAccessModal`
- Success message should auto-close modal after 2-3 seconds
- Follow existing Bootstrap modal styling from `public/assets/scss/components/_modal.scss`

━━━━━━━━━━━━━━━━━━━━
NEXT STEPS
━━━━━━━━━━━━━━━━━━━━

**Phase 1: Configuration & Core Components**

1. Create `pre-launch.ts` config file with feature flag
2. Create `PreLaunchPage.tsx` component for restricted routes
3. Create `waitlist.ts` Server Actions for email storage
4. Create database migration for `waitlist_emails` table (if needed)

**Phase 2: Form Components** 5. Create `EarlyAccessForm.tsx` component with React Hook Form + Zod validation 6. Create `EarlyAccessModal.tsx` component with Bootstrap modal structure 7. Update `EarlyAccessForm` to use `submitWaitlistAction`

**Phase 3: Route Restrictions** 8. Add layout.tsx to `(public)/chestionar/` route group 9. Add layout.tsx to `(auth)/` route group 10. Add layout.tsx to `(parent)/` route group 11. Add layout.tsx to `(club-portal)/` route group 12. Add layout.tsx to `(doctor-portal)/` route group

**Phase 4: Main Landing Page** 13. Update `page.tsx` with three sections and modal triggers 14. Connect modals to waitlist Server Action

**Phase 5: Testing** 15. Test feature flag toggle (env var) 16. Test route restrictions (quiz, auth, dashboards) 17. Test public route accessibility (home, marketing, SEO) 18. Test modal functionality (open, close, form submission) 19. Test waitlist email storage 20. Verify Romanian text and brand consistency 21. Test responsive design on mobile/tablet/desktop 22. Verify accessibility (keyboard navigation, screen readers)

---

**Last Updated**: January 2025
**Status**: Ready for Implementation
**Following**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)

---

## Goals (Must Match Exactly)

1. **Keep public pages accessible** (home, marketing pages, SEO pages)
2. **Restrict**:
   - Quiz entry + quiz routes (`/chestionar/*`)
   - Authentication routes (`/login`, `/register`, `/forgot-password`, etc.)
   - Any dashboard routes (club dashboard, doctor dashboard, parent dashboard, admin if exists)
3. **Replace restricted access** with a polished pre-launch experience, not errors or blank screens
4. **Add a waitlist email capture** (simple form) on the pre-launch page/modal
5. **Implement a single feature flag / config switch** to enable/disable restrictions (default enabled until Jan 2026)
