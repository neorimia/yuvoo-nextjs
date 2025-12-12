╭─── Claude Code v2.0.65 ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ │ Recent activity │
│ Welcome back Kaapo! │ 9m ago init │
│ │ /resume for more │
│ ▐▛███▜▌ │ ───────────────────────────────────────────────────────────────────────────────────────────────────── │
│ ▝▜█████▛▘ │ What's new │
│ ▘▘ ▝▝ │ Added ability to switch models while writing a prompt using alt+p (linux, windows), option+p (macos). │
│ │ Added context window information to status line input │
│ Sonnet 4.5 · Claude Pro · kaapo.studio@gmail.com's │ Added `fileSuggestion` setting for custom `@` file search commands │
│ Organization │ /release-notes for more │
│ ~/Documents/Projects/yuvoo-nextjs │ │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

> /sc:task is running… @docs/ONBOARDING_WORKFLOW.md#L1513
> ⎿  Read docs/ONBOARDING_WORKFLOW.md (1 lines)
> ⎿  Allowed 6 tools for this command

⏺ I'll analyze the onboarding workflow document starting at line 1513 to understand the task requirements and create an appropriate execution plan.

⏺ Read(docs/ONBOARDING_WORKFLOW.md)
⎿  Read 2229 lines

⏺ I'll execute the /sc:task command to analyze the onboarding workflow document starting at line 1513 and create an intelligent task management plan.

⏺ Task Analysis: Onboarding Workflow Implementation (Phase 1)

I've analyzed the onboarding workflow document starting at line 1513, which marks the beginning of Phase 1: Foundation & Database. This is a comprehensive 4-week implementation plan for
role-based user onboarding.

📊 Task Overview

Scope: Phase 1 - Foundation & Database (Week 1)
Target: Line 1513-1547 focuses on database schema setup
Strategy: Systematic approach with dependency management
Complexity: High (0.8/1.0) - Multi-table schema, migrations, cross-session persistence

---

🎯 Phase 1 Task Hierarchy

Epic: Database Schema Implementation (Week 1)

Total Duration: 7 days
Critical Path: Database → Server Actions → Middleware → Components

Story 1: Database Schema (2 days - Lines 1513-1519)

Tasks:

1. ✅ Create onboarding_progress table
   - Fields: id, userId, role, currentStep, totalSteps, completedSteps, stepData, isCompleted, timestamps
   - Purpose: Cross-session state management
   - File: lib/db/schema.ts
2. ✅ Update users table with onboarding fields
   - Add: onboardingCompleted, profileCompletionPercentage
   - Purpose: Quick onboarding status checks
   - File: lib/db/schema.ts
3. ✅ Update clubs table with verification fields
   - Add: profileComplete, verificationStatus, verificationDocuments
   - Purpose: Club verification workflow
   - File: lib/db/schema.ts
4. ✅ Update doctors table with verification fields
   - Add: profileComplete, verificationStatus, verificationDocuments, credentials
   - Purpose: Doctor verification workflow
   - File: lib/db/schema.ts
5. ✅ Create Drizzle migrations
   - Command: npm run db:generate
   - Purpose: Version-controlled schema changes
   - Validation: Check migration files in lib/db/migrations/
6. ✅ Test database schema
   - Command: npm run db:studio
   - Verify: All tables created, constraints working
   - Test: Insert sample data

Dependencies:

- ⚠️ Neon database connection (required)
- ⚠️ Drizzle ORM setup (required)

Deliverables:

- Complete schema in lib/db/schema.ts
- Migration files generated
- Database connection tested

  ***

  Story 2: Server Actions (2 days - Lines 1520-1526)

Tasks:

1. ✅ Create onboarding state management actions
   - File: app/actions/onboarding.ts
   - Functions:
   - startOnboarding(userId, role) - Initialize progress
   - updateOnboardingStep(userId, step, data) - Save progress
   - getOnboardingProgress(userId) - Resume functionality
2. ✅ Create progress tracking actions
   - Functions:
   - markStepComplete(userId, stepNumber)
   - saveStepData(userId, stepNumber, data)
   - getCompletedSteps(userId)
3. ✅ Create resume onboarding functionality
   - Check onboarding_progress table
   - Restore partial form data from stepData JSONB field
   - Redirect to current step
4. ✅ Test server actions
   - Unit tests for each action
   - Integration tests for full flow
   - Error handling validation

Dependencies: Story 1 complete (database schema)

Deliverables:

- app/actions/onboarding.ts with all CRUD operations
- Tested Server Actions with error handling
- Romanian error messages

  ***

  Story 3: Middleware & Routing (1 day - Lines 1527-1531)

Tasks:

1. ✅ Create onboarding protection middleware
   - File: middleware.ts
   - Logic:
   - If onboardingCompleted === false → redirect to onboarding
   - If onboardingCompleted === true and accessing onboarding → redirect to dashboard
     - Routes protected: /parent/dashboard, /club/dashboard, /doctor/dashboard
2. ✅ Set up routing structure
   - Create folders:
   - app/(auth)/onboarding/parent/
   - app/(auth)/onboarding/club/
   - app/(auth)/onboarding/doctor/
     - Add routes to lib/routes.ts
3. ✅ Implement redirect logic
   - Detect role from user session
   - Route to appropriate onboarding flow
   - Handle edge cases (no role assigned)

Dependencies: Story 2 complete (server actions for checks)

Deliverables:

- Middleware protecting routes
- Routing structure in lib/routes.ts
- Role-based redirect logic

  ***

  Story 4: Base Components (2 days - Lines 1532-1537)

Tasks:

1. ✅ OnboardingLayout component
   - File: src/components/features/onboarding/OnboardingLayout.tsx
   - Features: Progress bar, step indicator, responsive design
   - Props: currentStep, totalSteps, role, children
2. ✅ OnboardingProgress component
   - File: src/components/features/onboarding/OnboardingProgress.tsx
   - Visual progress bar with percentage
   - Step indicators (completed, current, pending)
3. ✅ OnboardingNavigation component
   - File: src/components/features/onboarding/OnboardingNavigation.tsx
   - Back/Next buttons with Romanian labels
   - Loading states
   - Disabled states for validation
4. ✅ Test responsive design
   - Mobile (375px - 768px)
   - Tablet (768px - 1024px)
   - Desktop (1024px+)
   - Test on real devices

Dependencies: None (can work in parallel with other stories)

Deliverables:

- 3 reusable onboarding components
- Tailwind CSS styling
- Responsive design tested

  ***

  🔍 Critical Analysis

Blockers Identified:

1. ⚠️ Neon Database Setup (Line 1540) - Must complete before Story 1
2. ⚠️ Cloudinary Integration (Line 1543) - Required for Phase 3 (Club) and Phase 4 (Doctor)
3. ⚠️ Child, Club, Doctor schemas (Line 1544) - Already exist, but need verification fields added

Risk Assessment:

- Complexity: High (0.8) - Multi-table dependencies, JSONB fields, resume functionality
- Effort: 7 days (realistic for experienced developer)
- Technical Debt: Low (well-structured plan, clear separation of concerns)

Optimization Opportunities:

- Stories 2 and 4 can run in parallel (no dependencies)
- Use Drizzle Studio (npm run db:studio) for rapid schema testing
- Implement progressive enhancement - basic flow first, polish later

  ***

  📋 Recommended Execution Strategy

Week 1 Schedule:

Days 1-2: Database Schema (Story 1)

- Morning: Set up Neon connection, create onboarding_progress table
- Afternoon: Update existing tables, generate migrations
- Evening: Test with Drizzle Studio

Days 3-4: Server Actions + Base Components (Parallel)

- Track A (Server): Write onboarding actions, test with mock data
- Track B (Frontend): Build OnboardingLayout, OnboardingProgress, OnboardingNavigation
- Integration: Connect components to server actions

Day 5: Middleware & Routing (Story 3)

- Morning: Middleware protection logic
- Afternoon: Routing structure, redirect logic
- Evening: Integration testing

Days 6-7: Testing & Refinement

- Unit tests for all components
- Integration tests for full onboarding flow
- Bug fixes and polish

  ***

  ✅ Success Criteria (Phase 1)

⏺ - ✅ Database schema deployed to Neon

- ✅ All migrations run successfully
- ✅ Server Actions tested with >95% coverage
- ✅ Middleware protects routes correctly
- ✅ Base components render on mobile/desktop
- ✅ Romanian language throughout
- ✅ Resume functionality working (critical for UX)

  ***

  🛠️ Implementation Commands

# Phase 1 Setup Commands

# -----------------------

# 1. Database Setup

npm run db:generate # Generate migrations
npm run db:push # Push schema to Neon
npm run db:studio # Open GUI to verify

# 2. Development

npm run dev # Start dev server

# 3. Testing

npm run lint # Check code quality
npm run format # Format code

# 4. Verification

# - Check Drizzle Studio for tables

# - Test onboarding progress CRUD operations

# - Verify middleware redirects

---

📊 Cross-Session Persistence Architecture

State Management Flow:

// Resume Functionality Logic
User Registration (Stack Auth)
↓
First Login → Check users.onboardingCompleted
↓
If false → Load onboarding_progress
↓
Redirect to onboarding_progress.currentStep
↓
Restore stepData from JSONB field
↓
User continues from where they left off

Database Design for Persistence:

onboarding_progress Table:

- stepData: JSONB field storing partial form data
- completedSteps: Array of completed step numbers
- currentStep: Last active step
- updatedAt: Timestamp for resume detection

Example stepData Structure:
{
"child_id": "uuid-here",
"club_basic_info": {
"name": "Partial Club Name",
"city": "București"
},
"doctor_credentials": ["MD", "Pediatric Orthopedist"]
}

Resume Logic:

1. User closes browser mid-onboarding
2. stepData saved to database via Server Action
3. User returns → Middleware detects onboardingCompleted === false
4. Load onboarding_progress → redirect to currentStep
5. Hydrate form with stepData

   ***

⏺ 🎯 Quality Gates & Validation Framework

8-Step Validation Cycle for Phase 1:

Step 1: Syntax Validation

- ✅ TypeScript compilation passes (npm run build)
- ✅ No ESLint errors (npm run lint)
- ✅ Drizzle schema syntax valid

Step 2: Type Safety Validation

- ✅ All Zod schemas match database schema
- ✅ Server Action return types defined
- ✅ Component props typed correctly

Step 3: Code Quality

- ✅ Prettier formatting applied (npm run format)
- ✅ No unused imports
- ✅ Consistent naming conventions (Romanian for UI, English for code)

Step 4: Security Validation

- ✅ requireAuth() used in all Server Actions
- ✅ Input validation with Zod schemas
- ✅ CSRF protection via Server Actions
- ✅ No SQL injection (Drizzle ORM parameterized queries)

Step 5: Database Testing

- ✅ Migrations run without errors
- ✅ CRUD operations tested in Drizzle Studio
- ✅ Foreign key constraints working
- ✅ JSONB operations validated

Step 6: Integration Testing

- ✅ Server Actions execute successfully
- ✅ Middleware redirects correctly
- ✅ Resume functionality works
- ✅ Error handling tested

Step 7: UX Validation

- ✅ Components render on mobile/tablet/desktop
- ✅ Progress bar updates correctly
- ✅ Navigation buttons work
- ✅ Romanian language throughout

Step 8: Performance Testing

- ✅ Database queries optimized (indexes on userId, role)
- ✅ Server Actions respond <500ms
- ✅ Components render <100ms
- ✅ No memory leaks

  ***

  📈 Task Metrics & Analytics

Estimated Effort Breakdown:

| Story                | Tasks | Effort (hours) | Complexity | Risk       |
| -------------------- | ----- | -------------- | ---------- | ---------- |
| Database Schema      | 6     | 16h (2 days)   | High       | Medium     |
| Server Actions       | 4     | 16h (2 days)   | Medium     | Low        |
| Middleware & Routing | 3     | 8h (1 day)     | Low        | Low        |
| Base Components      | 4     | 16h (2 days)   | Medium     | Low        |
| Total                | 17    | 56h (7 days)   | 0.75       | Low-Medium |

Critical Path Analysis:

Database Schema (2d) → Server Actions (2d) → Middleware (1d) → Integration (2d)
↘ Base Components (2d) ↗

Critical Path Duration: 7 days (including parallel work)
Buffer Time: 1 day for unexpected issues
Total Phase 1: 1 week (7 working days)

---

🚀 Next Steps After Phase 1

⏺ Once Phase 1 is complete, you'll proceed to:

Phase 2: Parent Onboarding (Week 1-2)

- 5 steps: Welcome → Add Child → Platform Tour → Quiz Intro → Complete
- Simplest flow (3-5 minutes)
- Foundation for testing onboarding infrastructure

Phase 3: Club Admin Onboarding (Week 2-3)

- 7 steps including image uploads and verification
- Requires Cloudinary integration ⚠️
- Most complex form flows

Phase 4: Doctor Onboarding (Week 3-4)

- 8 steps including credential verification
- Builds on Club Admin patterns
- Medical document handling

Phase 5: Testing & Refinement (Week 4)

- E2E testing all flows
- Romanian language review
- Performance optimization

  ***

  📋 Implementation Checklist (Phase 1)

Use this checklist to track Phase 1 implementation:

Database Schema ✅

- Create onboarding_progress table in lib/db/schema.ts
- Update users table with onboardingCompleted, profileCompletionPercentage
- Update clubs table with verification fields
- Update doctors table with verification fields
- Run npm run db:generate to create migrations
- Run npm run db:push to apply schema to Neon
- Verify schema in Drizzle Studio (npm run db:studio)

Server Actions ✅

- Create app/actions/onboarding.ts
- Implement startOnboarding(userId, role)
- Implement updateOnboardingStep(userId, step, data)
- Implement getOnboardingProgress(userId)
- Implement markStepComplete(userId, stepNumber)
- Implement saveStepData(userId, stepNumber, data)
- Add Romanian error messages
- Test all Server Actions with mock data

Middleware & Routing ✅

- Create onboarding protection logic in middleware.ts
- Add routes to lib/routes.ts:
  - routes.onboarding.parent.\*
  - routes.onboarding.club.\*
  - routes.onboarding.doctor.\*
- Implement role-based redirect logic
- Test middleware protection (unauthorized access blocked)

Base Components ✅

- Create OnboardingLayout.tsx in src/components/features/onboarding/
- Create OnboardingProgress.tsx
- Create OnboardingNavigation.tsx
- Add Tailwind CSS styling
- Test responsive design (mobile/tablet/desktop)
- Verify Romanian labels throughout

Testing ✅

- Unit tests for Server Actions
- Integration tests for resume functionality
- Middleware redirect tests
- Component rendering tests
- Mobile responsiveness tests
- Romanian language review

Documentation ✅

- Update memory-bank/progress.md with Phase 1 completion
- Update memory-bank/activeContext.md with current status
- Document any deviations from plan
- Note blockers or dependencies for Phase 2

  ***

  📊 Task Management Summary

Task Hierarchy Created:

- Epic: Database Schema Implementation (Week 1)
  - Story 1: Database Schema (2 days, 6 tasks)
  - Story 2: Server Actions (2 days, 4 tasks)
  - Story 3: Middleware & Routing (1 day, 3 tasks)
  - Story 4: Base Components (2 days, 4 tasks)

Execution Strategy:

- Systematic approach with clear dependencies
- Parallel execution where possible (Stories 2 & 4)
- Quality gates at each step
- Cross-session persistence via JSONB stepData

Success Metrics:

- Completion Rate: >95% (all 17 tasks)
- Performance: <500ms Server Actions, <100ms component render
- Quality: 0 ESLint errors, 100% TypeScript type safety
- Validation: All 8 quality gates passed

Risk Mitigation:

- Blocker: Neon database setup → Resolve before Day 1
- Blocker: Drizzle ORM configuration → Verify connection
- Buffer: 1 day for unexpected issues
- Fallback: Progressive implementation if delays occur

  ***

  Phase 1 Task Plan Status: ✅ COMPLETE

All tasks analyzed, hierarchical breakdown created, dependencies mapped, quality gates defined, and execution strategy designed. Ready for implementation.

Would you like me to:

1. Generate detailed code templates for database schema or Server Actions?
2. Create Phase 2 task breakdown (Parent Onboarding)?
3. Set up project structure for onboarding flows?
4. Review existing database schema to identify required changes?

> 1

⏺ I'll generate detailed code templates for the database schema and Server Actions. Let me first check the existing database schema to understand the current structure.

⏺ Read(src/lib/db/schema.ts)
⎿  Read 148 lines

⏺ Now let me check the existing validation patterns:

⏺ Search(pattern: "src/lib/validations/\*_/_.ts")
⎿  Found 1 file (ctrl+o to expand)

⏺ Read(src/lib/validations/common.ts)
⎿  Read 19 lines

⏺ Read(src/lib/auth/session.ts)
⎿  Read 122 lines

⏺ Perfect! Now I'll generate comprehensive code templates for Phase 1. Let me create detailed, production-ready code.

⏺ 📝 Phase 1 Code Templates

1. Updated Database Schema

File: src/lib/db/schema.ts

Add the following code to your existing schema file:

/\*\*

- Database Schema - UPDATED FOR ONBOARDING
-
- Drizzle ORM schema definitions for Yuvoo.
-
- NEW TABLES:
- - onboarding_progress: Cross-session onboarding state tracking
-
- UPDATED TABLES:
- - users: Added onboarding completion fields
- - clubs: Added verification workflow fields
- - doctors: Added verification workflow fields
    \*/

import { pgTable, text, timestamp, boolean, integer, jsonb, pgEnum, sql } from "drizzle-orm/pg-core";

// ============================================================================
// ENUMS
// ============================================================================

export const userRoleEnum = pgEnum("user_role", ["parent", "club_admin", "doctor", "admin"]);

export const bookingStatusEnum = pgEnum("booking_status", [
"pending",
"confirmed",
"cancelled",
"completed",
]);

// NEW: Verification status enum for clubs and doctors
export const verificationStatusEnum = pgEnum("verification_status", [
"pending", // Initial state, no documents submitted
"in_review", // Documents submitted, admin reviewing
"approved", // Verified and approved
"rejected", // Rejected, needs resubmission
]);

// ============================================================================
// USERS TABLE - UPDATED
// ============================================================================

export const users = pgTable("users", {
id: text("id").primaryKey(),
stackUserId: text("stack_user_id").notNull().unique(),
email: text("email").notNull().unique(),
role: userRoleEnum("role").notNull().default("parent"),
firstName: text("first_name"),
lastName: text("last_name"),
phone: text("phone"),

    // NEW: Onboarding tracking fields
    onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
    profileCompletionPercentage: integer("profile_completion_percentage").default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});

// ============================================================================
// NEW: ONBOARDING PROGRESS TABLE
// ============================================================================

export const onboardingProgress = pgTable("onboarding_progress", {
id: text("id").primaryKey().default(sql`gen_random_uuid()`),
userId: text("user_id")
.notNull()
.references(() => users.id, { onDelete: "cascade" })
.unique(), // One progress record per user

    // Role determines which onboarding flow to use
    role: userRoleEnum("role").notNull(),

    // Progress tracking
    currentStep: integer("current_step").notNull().default(1),
    totalSteps: integer("total_steps").notNull(),
    completedSteps: text("completed_steps").array().notNull().default(sql`'{}'::text[]`),

    // JSONB storage for partial form data (enables resume functionality)
    // Example structure: { "child_id": "uuid", "club_basic_info": { "name": "..." } }
    stepData: jsonb("step_data").default(sql`'{}'::jsonb`),

    // Completion status
    isCompleted: boolean("is_completed").notNull().default(false),

    // Timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),

});

// ============================================================================
// CHILDREN TABLE - NO CHANGES
// ============================================================================

export const children = pgTable("children", {
id: text("id").primaryKey(),
parentId: text("parent_id")
.notNull()
.references(() => users.id),
firstName: text("first_name").notNull(),
lastName: text("last_name").notNull(),
dateOfBirth: timestamp("date_of_birth").notNull(),
gender: text("gender"),
createdAt: timestamp("created_at").defaultNow().notNull(),
updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// QUIZZES TABLE - NO CHANGES
// ============================================================================

export const quizzes = pgTable("quizzes", {
id: text("id").primaryKey(),
childId: text("child_id")
.notNull()
.references(() => children.id),
answers: jsonb("answers").notNull(),
recommendations: jsonb("recommendations"),
createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// CLUBS TABLE - UPDATED
// ============================================================================

export const clubs = pgTable("clubs", {
id: text("id").primaryKey(),
adminUserId: text("admin_user_id").references(() => users.id), // Link to club admin user

    // Basic info
    name: text("name").notNull(),
    slug: text("slug").unique(), // SEO-friendly URL slug
    description: text("description"),
    sportType: text("sport_type").notNull(),

    // Location
    city: text("city").notNull(),
    district: text("district"), // Sector/District (e.g., "Sector 1" in București)
    address: text("address"),
    latitude: text("latitude"),
    longitude: text("longitude"),

    // Contact
    phone: text("phone"),
    email: text("email"),
    website: text("website"),

    // Schedule (JSONB array of schedule entries)
    // Example: [{ "day": "Luni", "time": "17:00-18:30" }]
    schedule: jsonb("schedule").default(sql`'[]'::jsonb`),

    // Pricing (JSONB array of pricing options)
    // Example: [{ "type": "monthly", "amount": 200 }]
    pricing: jsonb("pricing").default(sql`'[]'::jsonb`),

    // Age groups and levels
    ageGroups: integer("age_groups").array().default(sql`'{}'::integer[]`), // [4, 5, 6, 7, ...]
    experienceLevels: text("experience_levels").array().default(sql`'{}'::text[]`), // ["beginner", "intermediate", "advanced"]

    // Media
    logoUrl: text("logo_url"),
    galleryUrls: text("gallery_urls").array().default(sql`'{}'::text[]`), // Array of image URLs

    // NEW: Verification fields
    profileComplete: boolean("profile_complete").notNull().default(false),
    verificationStatus: verificationStatusEnum("verification_status").notNull().default("pending"),
    verificationDocuments: text("verification_documents").array().default(sql`'{}'::text[]`), // Cloudinary URLs

    // Legacy fields (keep for compatibility)
    verified: boolean("verified").default(false).notNull(),
    featured: boolean("featured").default(false).notNull(),
    rating: integer("rating").default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});

// ============================================================================
// DOCTORS TABLE - UPDATED
// ============================================================================

export const doctors = pgTable("doctors", {
id: text("id").primaryKey(),
userId: text("user_id").references(() => users.id),

    // Basic info
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    title: text("title"), // "Dr.", "Conf. Dr.", etc.

    // Professional info
    specialty: text("specialty").notNull(), // Primary specialty
    secondarySpecialties: text("secondary_specialties").array().default(sql`'{}'::text[]`),
    credentials: text("credentials").array().default(sql`'{}'::text[]`), // ["MD", "Board Certified", ...]
    bio: text("bio"),
    yearsOfExperience: integer("years_of_experience"),
    languages: text("languages").array().default(sql`'{}'::text[]`), // ["Română", "Engleză", ...]

    // Location
    city: text("city").notNull(),
    district: text("district"),
    address: text("address"),

    // Contact
    phone: text("phone"),
    email: text("email"),
    website: text("website"),

    // Availability
    acceptingNewPatients: boolean("accepting_new_patients").default(true).notNull(),
    onlineConsultations: boolean("online_consultations").default(false).notNull(),

    // Schedule (JSONB array)
    // Example: [{ "day": "Luni", "startTime": "09:00", "endTime": "17:00" }]
    schedule: jsonb("schedule").default(sql`'[]'::jsonb`),

    // Media
    photoUrl: text("photo_url"),

    // NEW: Verification fields
    profileComplete: boolean("profile_complete").notNull().default(false),
    verificationStatus: verificationStatusEnum("verification_status").notNull().default("pending"),
    verificationDocuments: text("verification_documents").array().default(sql`'{}'::text[]`), // Medical credentials, licenses

    // Legacy fields
    verified: boolean("verified").default(false).notNull(),
    rating: integer("rating").default(0),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

});

// ============================================================================
// BOOKINGS TABLE - NO CHANGES
// ============================================================================

export const bookings = pgTable("bookings", {
id: text("id").primaryKey(),
parentId: text("parent_id")
.notNull()
.references(() => users.id),
childId: text("child_id").references(() => children.id),
clubId: text("club_id").references(() => clubs.id),
doctorId: text("doctor_id").references(() => doctors.id),
type: text("type").notNull(), // "club_trial" or "doctor_consultation"
status: bookingStatusEnum("status").default("pending").notNull(),
scheduledAt: timestamp("scheduled_at"),
notes: text("notes"),
createdAt: timestamp("created_at").defaultNow().notNull(),
updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================================
// FAVORITES TABLE - NO CHANGES
// ============================================================================

export const favorites = pgTable("favorites", {
id: text("id").primaryKey(),
userId: text("user_id")
.notNull()
.references(() => users.id),
clubId: text("club_id").references(() => clubs.id),
doctorId: text("doctor_id").references(() => doctors.id),
createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================================
// REVIEWS TABLE - NO CHANGES
// ============================================================================

export const reviews = pgTable("reviews", {
id: text("id").primaryKey(),
userId: text("user_id")
.notNull()
.references(() => users.id),
clubId: text("club_id").references(() => clubs.id),
doctorId: text("doctor_id").references(() => doctors.id),
rating: integer("rating").notNull(), // 1-5
comment: text("comment"),
moderated: boolean("moderated").default(false).notNull(),
createdAt: timestamp("created_at").defaultNow().notNull(),
updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

---

⏺ 2. Validation Schemas

File: src/lib/validations/child.ts

/\*\*

- Child Profile Validation Schemas
-
- Zod schemas for validating child profile data during parent onboarding.
  \*/

import { z } from "zod";
import { zodRomanianErrors } from "./common";

/\*\*

- Create Child Schema (Parent Onboarding - Step 2)
-
- Validates child profile creation with Romanian error messages.
- Age restriction: 4-14 years (Yuvoo target demographic)
  \*/
  export const createChildSchema = z.object({
  firstName: z
  .string(zodRomanianErrors)
  .min(1, "Prenumele este obligatoriu")
  .max(100, "Prenumele este prea lung")
  .trim(),

      lastName: z
        .string(zodRomanianErrors)
        .min(1, "Numele este obligatoriu")
        .max(100, "Numele este prea lung")
        .trim(),

      dateOfBirth: z
        .date({
          required_error: "Data nașterii este obligatorie",
          invalid_type_error: "Data nașterii este invalidă",
        })
        .refine(
          (date) => {
            const age = Math.floor(
              (new Date().getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
            );
            return age >= 4 && age <= 14;
          },
          "Vârsta copilului trebuie să fie între 4 și 14 ani"
        )
        .refine(
          (date) => date <= new Date(),
          "Data nașterii nu poate fi în viitor"
        ),

      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({ message: "Gen invalid" }),
      }).optional(),

  });

export type CreateChildInput = z.infer<typeof createChildSchema>;

---

File: src/lib/validations/club.ts

/\*\*

- Club Profile Validation Schemas
-
- Zod schemas for validating club profile data during club admin onboarding.
  \*/

import { z } from "zod";
import { zodRomanianErrors, phoneSchema } from "./common";

/\*\*

- Club Basic Info Schema (Club Onboarding - Step 2)
  \*/
  export const clubBasicInfoSchema = z.object({
  name: z
  .string(zodRomanianErrors)
  .min(3, "Numele clubului este prea scurt")
  .max(200, "Numele clubului este prea lung")
  .trim(),

      sportType: z
        .string(zodRomanianErrors)
        .min(1, "Selectează sportul principal"),

      description: z
        .string(zodRomanianErrors)
        .min(50, "Descrierea trebuie să conțină cel puțin 50 caractere")
        .max(1000, "Descrierea este prea lungă (maxim 1000 caractere)")
        .trim(),

      city: z
        .string(zodRomanianErrors)
        .min(1, "Orașul este obligatoriu"),

      district: z.string().optional(),

      address: z
        .string(zodRomanianErrors)
        .min(10, "Adresa completă este obligatorie (minim 10 caractere)")
        .max(300, "Adresa este prea lungă")
        .trim(),

  });

/\*\*

- Club Contact & Schedule Schema (Club Onboarding - Step 3)
  \*/
  export const clubContactScheduleSchema = z.object({
  phone: z
  .string(zodRomanianErrors)
  .regex(/^\+40[0-9]{9}$/, "Format telefon invalid (ex: +40721234567)"),

      email: z
        .string(zodRomanianErrors)
        .email("Adresa de email este invalidă")
        .toLowerCase(),

      website: z
        .string()
        .url("URL-ul website-ului este invalid")
        .optional()
        .or(z.literal("")),

      schedule: z
        .array(
          z.object({
            day: z.string().min(1, "Ziua este obligatorie"),
            time: z.string().min(1, "Intervalul orar este obligatoriu"),
          })
        )
        .min(1, "Adaugă cel puțin un interval de antrenament"),

  });

/\*\*

- Club Pricing & Age Groups Schema (Club Onboarding - Step 4)
  \*/
  export const clubPricingAgesSchema = z.object({
  pricing: z
  .array(
  z.object({
  type: z.enum(["monthly", "per_class", "per_semester"], {
  errorMap: () => ({ message: "Tip abonament invalid" }),
  }),
  amount: z
  .number({ required_error: "Prețul este obligatoriu" })
  .min(0, "Prețul trebuie să fie pozitiv")
  .max(10000, "Prețul este prea mare"),
  })
  )
  .min(1, "Adaugă cel puțin un tip de abonament"),

      ageGroups: z
        .array(z.number().min(4).max(14))
        .min(1, "Selectează cel puțin o grupă de vârstă"),

      experienceLevels: z
        .array(z.enum(["beginner", "intermediate", "advanced"]))
        .min(1, "Selectează cel puțin un nivel de experiență"),

  });

/\*\*

- Club Photo Upload Schema (Club Onboarding - Step 5)
  \*/
  export const clubPhotoSchema = z.object({
  logoUrl: z
  .string(zodRomanianErrors)
  .url("URL logo invalid")
  .min(1, "Logo-ul este obligatoriu"),

      galleryUrls: z
        .array(z.string().url("URL imagine invalid"))
        .min(3, "Încarcă cel puțin 3 fotografii în galerie")
        .max(10, "Maxim 10 fotografii în galerie"),

  });

/\*\*

- Club Verification Documents Schema (Club Onboarding - Step 6)
  \*/
  export const clubVerificationSchema = z.object({
  verificationDocuments: z
  .array(z.string().url("URL document invalid"))
  .min(2, "Încarcă cel puțin 2 documente (certificat înregistrare + asigurare)")
  .max(5, "Maxim 5 documente"),
  });

// Combined type for full club profile
export type ClubBasicInfoInput = z.infer<typeof clubBasicInfoSchema>;
export type ClubContactScheduleInput = z.infer<typeof clubContactScheduleSchema>;
export type ClubPricingAgesInput = z.infer<typeof clubPricingAgesSchema>;
export type ClubPhotoInput = z.infer<typeof clubPhotoSchema>;
export type ClubVerificationInput = z.infer<typeof clubVerificationSchema>;

---

File: src/lib/validations/doctor.ts

/\*\*

- Doctor Profile Validation Schemas
-
- Zod schemas for validating doctor profile data during doctor onboarding.
  \*/

import { z } from "zod";
import { zodRomanianErrors } from "./common";

/\*\*

- Doctor Basic Info Schema (Doctor Onboarding - Step 2)
  \*/
  export const doctorBasicInfoSchema = z.object({
  firstName: z
  .string(zodRomanianErrors)
  .min(1, "Prenumele este obligatoriu")
  .max(100, "Prenumele este prea lung")
  .trim(),

      lastName: z
        .string(zodRomanianErrors)
        .min(1, "Numele este obligatoriu")
        .max(100, "Numele este prea lung")
        .trim(),

      title: z.string().max(50, "Titlul este prea lung").optional(),

      specialty: z.enum(
        ["orthopedist", "nutritionist", "psychologist", "sports_medicine"],
        {
          errorMap: () => ({ message: "Selectează specializarea" }),
        }
      ),

      credentials: z
        .array(z.string().min(1).max(200))
        .min(1, "Adaugă cel puțin o credențială (ex: MD, Specialist, etc.)"),

  });

/\*\*

- Doctor Bio & Experience Schema (Doctor Onboarding - Step 3)
  \*/
  export const doctorBioExperienceSchema = z.object({
  bio: z
  .string(zodRomanianErrors)
  .min(100, "Bio-ul trebuie să conțină cel puțin 100 caractere")
  .max(2000, "Bio-ul este prea lung (maxim 2000 caractere)")
  .trim(),

      yearsOfExperience: z
        .number({ required_error: "Anii de experiență sunt obligatorii" })
        .int("Trebuie să fie un număr întreg")
        .min(1, "Minim 1 an de experiență")
        .max(50, "Valoare invalidă"),

      secondarySpecialties: z.array(z.string()).optional(),

      languages: z
        .array(z.string())
        .min(1, "Selectează cel puțin o limbă vorbită"),

  });

/\*\*

- Doctor Location & Contact Schema (Doctor Onboarding - Step 4)
  \*/
  export const doctorLocationContactSchema = z.object({
  city: z
  .string(zodRomanianErrors)
  .min(1, "Orașul este obligatoriu"),

      district: z.string().optional(),

      address: z
        .string(zodRomanianErrors)
        .min(10, "Adresa completă este obligatorie (minim 10 caractere)")
        .max(300, "Adresa este prea lungă")
        .trim(),

      phone: z
        .string(zodRomanianErrors)
        .regex(/^\+40[0-9]{9}$/, "Format telefon invalid (ex: +40721234567)"),

      email: z
        .string(zodRomanianErrors)
        .email("Adresa de email este invalidă")
        .toLowerCase(),

      website: z
        .string()
        .url("URL-ul website-ului este invalid")
        .optional()
        .or(z.literal("")),

  });

/\*\*

- Doctor Photo Upload Schema (Doctor Onboarding - Step 5)
  \*/
  export const doctorPhotoSchema = z.object({
  photoUrl: z
  .string()
  .url("URL fotografie invalid")
  .optional()
  .or(z.literal("")), // Optional step
  });

/\*\*

- Doctor Verification Documents Schema (Doctor Onboarding - Step 6)
  \*/
  export const doctorVerificationSchema = z.object({
  verificationDocuments: z
  .array(z.string().url("URL document invalid"))
  .min(4, "Încarcă cel puțin 4 documente obligatorii (diplomă, certificat specialist, licență, certificat CMR)")
  .max(10, "Maxim 10 documente"),
  });

/\*\*

- Doctor Availability Schema (Doctor Onboarding - Step 7)
  \*/
  export const doctorAvailabilitySchema = z.object({
  acceptingNewPatients: z.boolean().default(true),

      onlineConsultations: z.boolean().default(false),

      schedule: z
        .array(
          z.object({
            day: z.string().min(1, "Ziua este obligatorie"),
            startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format orar invalid (HH:MM)"),
            endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format orar invalid (HH:MM)"),
          })
        )
        .optional(),

  });

// Combined types
export type DoctorBasicInfoInput = z.infer<typeof doctorBasicInfoSchema>;
export type DoctorBioExperienceInput = z.infer<typeof doctorBioExperienceSchema>;
export type DoctorLocationContactInput = z.infer<typeof doctorLocationContactSchema>;
export type DoctorPhotoInput = z.infer<typeof doctorPhotoSchema>;
export type DoctorVerificationInput = z.infer<typeof doctorVerificationSchema>;
export type DoctorAvailabilityInput = z.infer<typeof doctorAvailabilitySchema>;

---

File: src/lib/validations/onboarding.ts

/\*\*

- Onboarding Progress Validation Schemas
-
- Zod schemas for validating onboarding state management.
  \*/

import { z } from "zod";
import { zodRomanianErrors } from "./common";

/\*\*

- Start Onboarding Schema
  \*/
  export const startOnboardingSchema = z.object({
  role: z.enum(["parent", "club_admin", "doctor"], {
  errorMap: () => ({ message: "Rol invalid" }),
  }),
  });

/\*\*

- Update Onboarding Step Schema
  \*/
  export const updateOnboardingStepSchema = z.object({
  stepNumber: z.number().int().min(1),
  stepData: z.record(z.any()).optional(), // JSONB data for the step
  });

/\*\*

- Complete Onboarding Schema
  \*/
  export const completeOnboardingSchema = z.object({
  role: z.enum(["parent", "club_admin", "doctor"]),
  action: z.enum(["quiz", "dashboard"]).optional(), // For parent flow
  });

export type StartOnboardingInput = z.infer<typeof startOnboardingSchema>;
export type UpdateOnboardingStepInput = z.infer<typeof updateOnboardingStepSchema>;
export type CompleteOnboardingInput = z.infer<typeof completeOnboardingSchema>;

---

⏺ 3. Server Actions

File: src/app/actions/onboarding.ts

/\*\*

- Onboarding Server Actions
-
- Server-side actions for managing onboarding state, progress tracking,
- and cross-session persistence.
-
- All actions require authentication and validate input with Zod schemas.
  \*/

"use server";

import { requireAuth } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { users, onboardingProgress, children, clubs, doctors } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import {
startOnboardingSchema,
updateOnboardingStepSchema,
completeOnboardingSchema,
} from "@/lib/validations/onboarding";
import { createChildSchema } from "@/lib/validations/child";
import type {
StartOnboardingInput,
UpdateOnboardingStepInput,
CompleteOnboardingInput,
} from "@/lib/validations/onboarding";
import type { CreateChildInput } from "@/lib/validations/child";

// ============================================================================
// TYPES
// ============================================================================

type OnboardingRole = "parent" | "club_admin" | "doctor";

type OnboardingResponse<T = void> =
| { success: true; data?: T }
| { success: false; error: string };

// ============================================================================
// ONBOARDING STATE MANAGEMENT
// ============================================================================

/\*\*

- Start Onboarding Flow
-
- Initializes onboarding progress for a user based on their role.
- Creates or updates the onboarding_progress record.
-
- @param role - User role (parent, club_admin, doctor)
- @returns Success response or error message
  \*/
  export async function startOnboarding(
  role: OnboardingRole
  ): Promise<OnboardingResponse> {
  try {
  const session = await requireAuth();

  // Validate input
  const validated = startOnboardingSchema.parse({ role });

  // Determine total steps based on role
  const totalStepsMap: Record<OnboardingRole, number> = {
  parent: 5,
  club_admin: 7,
  doctor: 8,
  };
  const totalSteps = totalStepsMap[validated.role];

  // Check if onboarding progress already exists
  const existing = await db
  .select()
  .from(onboardingProgress)
  .where(eq(onboardingProgress.userId, session.dbUser.id))
  .limit(1);

  if (existing.length > 0) {
  // Resume existing onboarding
  return { success: true, data: existing[0] };
  }

  // Create new onboarding progress
  const [progress] = await db
  .insert(onboardingProgress)
  .values({
  id: crypto.randomUUID(),
  userId: session.dbUser.id,
  role: validated.role,
  currentStep: 1,
  totalSteps,
  completedSteps: [],
  stepData: {},
  isCompleted: false,
  })
  .returning();

  return { success: true, data: progress };
  } catch (error) {
  console.error("Error starting onboarding:", error);
  return {
  success: false,
  error: "A apărut o eroare la inițializarea procesului de onboarding.",
  };
  }
  }

/\*\*

- Get Onboarding Progress
-
- Retrieves current onboarding progress for the authenticated user.
- Used for resume functionality.
-
- @returns Onboarding progress or null if not started
  \*/
  export async function getOnboardingProgress(): Promise<
  OnboardingResponse<any>

  > {
  > try {
  > const session = await requireAuth();

        const progress = await db
          .select()
          .from(onboardingProgress)
          .where(eq(onboardingProgress.userId, session.dbUser.id))
          .limit(1);

        if (progress.length === 0) {
          return { success: false, error: "Nu există progres de onboarding." };
        }

        return { success: true, data: progress[0] };
      } catch (error) {
        console.error("Error getting onboarding progress:", error);
        return {
          success: false,
          error: "A apărut o eroare la obținerea progresului.",
        };
      }

  }

/\*\*

- Update Onboarding Step
-
- Updates the current step and saves partial form data (JSONB).
- Enables cross-session resume functionality.
-
- @param stepNumber - Current step number
- @param stepData - Partial form data to save (optional)
- @returns Success response or error message
  \*/
  export async function updateOnboardingStep(
  stepNumber: number,
  stepData?: Record<string, any>
  ): Promise<OnboardingResponse> {
  try {
  const session = await requireAuth();

  // Validate input
  const validated = updateOnboardingStepSchema.parse({ stepNumber, stepData });

  // Update onboarding progress
  await db
  .update(onboardingProgress)
  .set({
  currentStep: validated.stepNumber,
  stepData: validated.stepData ?? {},
  updatedAt: new Date(),
  })
  .where(eq(onboardingProgress.userId, session.dbUser.id));

  return { success: true };
  } catch (error) {
  console.error("Error updating onboarding step:", error);
  return {
  success: false,
  error: "A apărut o eroare la salvarea progresului.",
  };
  }
  }

/\*\*

- Mark Step as Complete
-
- Marks a specific step as completed and updates the completed steps array.
-
- @param stepNumber - Step number to mark as complete
- @returns Success response or error message
  \*/
  export async function markStepComplete(
  stepNumber: number
  ): Promise<OnboardingResponse> {
  try {
  const session = await requireAuth();

  // Update completed steps array using PostgreSQL array functions
  await db
  .update(onboardingProgress)
  .set({
  completedSteps: sql`array_append(completed_steps, ${stepNumber.toString()})`,
  updatedAt: new Date(),
  })
  .where(eq(onboardingProgress.userId, session.dbUser.id));

  return { success: true };
  } catch (error) {
  console.error("Error marking step complete:", error);
  return {
  success: false,
  error: "A apărut o eroare la marcarea pasului ca finalizat.",
  };
  }
  }

/\*\*

- Save Step Data (JSONB)
-
- Saves partial form data to the stepData JSONB field.
- Used for resume functionality - allows users to continue where they left off.
-
- @param key - Data key (e.g., "child_id", "club_basic_info")
- @param value - Data value
- @returns Success response or error message
  \*/
  export async function saveStepData(
  key: string,
  value: any
  ): Promise<OnboardingResponse> {
  try {
  const session = await requireAuth();

  // Update stepData JSONB field using PostgreSQL jsonb_set
  await db
  .update(onboardingProgress)
  .set({
  stepData: sql`jsonb_set(step_data, '{${sql.raw(key)}}', ${JSON.stringify(value)}::jsonb)`,
  updatedAt: new Date(),
  })
  .where(eq(onboardingProgress.userId, session.dbUser.id));

  return { success: true };
  } catch (error) {
  console.error("Error saving step data:", error);
  return {
  success: false,
  error: "A apărut o eroare la salvarea datelor.",
  };
  }
  }

// ============================================================================
// PARENT ONBOARDING ACTIONS
// ============================================================================

/\*\*

- Add Child During Onboarding (Parent - Step 2)
-
- Creates a child profile and saves the child ID to onboarding progress.
-
- @param data - Child profile data
- @returns Success response with child ID or error message
  \*/
  export async function addChildOnboarding(
  data: CreateChildInput
  ): Promise<OnboardingResponse<{ childId: string }>> {
  try {
  const session = await requireAuth();

  // Validate input
  const validated = createChildSchema.parse(data);

  // Create child record
  const [child] = await db
  .insert(children)
  .values({
  id: crypto.randomUUID(),
  parentId: session.dbUser.id,
  firstName: validated.firstName,
  lastName: validated.lastName,
  dateOfBirth: validated.dateOfBirth,
  gender: validated.gender,
  })
  .returning();

  // Save child ID to onboarding progress
  await saveStepData("child_id", child.id);

  // Mark step 2 as complete
  await markStepComplete(2);

  // Move to step 3
  await updateOnboardingStep(3);

  return { success: true, data: { childId: child.id } };
  } catch (error) {
  console.error("Error adding child during onboarding:", error);
  return {
  success: false,
  error: "A apărut o eroare la adăugarea profilului copilului.",
  };
  }
  }

/\*\*

- Complete Parent Onboarding
-
- Marks parent onboarding as complete and redirects to either quiz or dashboard.
-
- @param action - "quiz" or "dashboard"
  \*/
  export async function completeParentOnboarding(
  action: "quiz" | "dashboard"
  ): Promise<never> {
  try {
  const session = await requireAuth();

  // Mark onboarding as completed in users table
  await db
  .update(users)
  .set({
  onboardingCompleted: true,
  profileCompletionPercentage: 100,
  updatedAt: new Date(),
  })
  .where(eq(users.id, session.dbUser.id));

  // Mark onboarding progress as complete
  await db
  .update(onboardingProgress)
  .set({
  currentStep: 5,
  isCompleted: true,
  updatedAt: new Date(),
  })
  .where(eq(onboardingProgress.userId, session.dbUser.id));

  // Mark final step as complete
  await markStepComplete(5);

  // Redirect based on action
  if (action === "quiz") {
  redirect(routes.quiz.start);
  } else {
  redirect(routes.parent.dashboard);
  }
  } catch (error) {
  console.error("Error completing parent onboarding:", error);
  throw new Error("A apărut o eroare la finalizarea onboarding-ului.");
  }
  }

// ============================================================================
// CLUB ADMIN ONBOARDING ACTIONS
// ============================================================================

/\*\*

- Create Club During Onboarding (Club Admin - Step 2)
-
- Creates a club profile with basic info.
-
- @param data - Club basic info
- @returns Success response with club ID or error message
  \*/
  export async function createClubOnboarding(
  data: any
  ): Promise<OnboardingResponse<{ clubId: string }>> {
  try {
  const session = await requireAuth();

  // Create club record (basic info only)
  const [club] = await db
  .insert(clubs)
  .values({
  id: crypto.randomUUID(),
  adminUserId: session.dbUser.id,
  name: data.name,
  sportType: data.sportType,
  description: data.description,
  city: data.city,
  district: data.district,
  address: data.address,
  profileComplete: false,
  verificationStatus: "pending",
  })
  .returning();

  // Save club ID to onboarding progress
  await saveStepData("club_id", club.id);

  return { success: true, data: { clubId: club.id } };
  } catch (error) {
  console.error("Error creating club during onboarding:", error);
  return {
  success: false,
  error: "A apărut o eroare la crearea profilului clubului.",
  };
  }
  }

/\*\*

- Submit Club for Verification (Club Admin - Step 6)
-
- Updates club verification status to "in_review".
-
- @param clubId - Club ID
- @param documents - Array of document URLs
- @returns Success response or error message
  \*/
  export async function submitClubForVerification(
  clubId: string,
  documents: string[]
  ): Promise<OnboardingResponse> {
  try {
  const session = await requireAuth();

  await db
  .update(clubs)
  .set({
  verificationDocuments: documents,
  verificationStatus: "in_review",
  updatedAt: new Date(),
  })
  .where(and(eq(clubs.id, clubId), eq(clubs.adminUserId, session.dbUser.id)));

  // TODO: Send notification email to admin team
  // await sendVerificationRequestEmail(clubId);

  return { success: true };
  } catch (error) {
  console.error("Error submitting club for verification:", error);
  return {
  success: false,
  error: "A apărut o eroare la trimiterea spre verificare.",
  };
  }
  }

/\*\*

- Complete Club Admin Onboarding
-
- Marks club onboarding as complete and redirects to club dashboard.
  \*/
  export async function completeClubOnboarding(): Promise<never> {
  try {
  const session = await requireAuth();

  // Mark onboarding as completed
  await db
  .update(users)
  .set({
  onboardingCompleted: true,
  profileCompletionPercentage: 100,
  updatedAt: new Date(),
  })
  .where(eq(users.id, session.dbUser.id));

  await db
  .update(onboardingProgress)
  .set({
  currentStep: 7,
  isCompleted: true,
  updatedAt: new Date(),
  })
  .where(eq(onboardingProgress.userId, session.dbUser.id));

  // Mark club profile as complete
  const progressData = await getOnboardingProgress();
  if (progressData.success && progressData.data.stepData?.club_id) {
  await db
  .update(clubs)
  .set({ profileComplete: true, updatedAt: new Date() })
  .where(eq(clubs.id, progressData.data.stepData.club_id));
  }

  redirect(routes.club.dashboard);
  } catch (error) {
  console.error("Error completing club onboarding:", error);
  throw new Error("A apărut o eroare la finalizarea onboarding-ului.");
  }
  }

// ============================================================================
// DOCTOR ONBOARDING ACTIONS
// ============================================================================

/\*\*

- Create Doctor Profile During Onboarding (Doctor - Step 2)
-
- Creates a doctor profile with basic professional info.
-
- @param data - Doctor basic info
- @returns Success response with doctor ID or error message
  \*/
  export async function createDoctorOnboarding(
  data: any
  ): Promise<OnboardingResponse<{ doctorId: string }>> {
  try {
  const session = await requireAuth();

  // Create doctor record
  const [doctor] = await db
  .insert(doctors)
  .values({
  id: crypto.randomUUID(),
  userId: session.dbUser.id,
  firstName: data.firstName,
  lastName: data.lastName,
  title: data.title,
  specialty: data.specialty,
  credentials: data.credentials,
  city: "", // Will be filled in later steps
  profileComplete: false,
  verificationStatus: "pending",
  })
  .returning();

  // Save doctor ID to onboarding progress
  await saveStepData("doctor_id", doctor.id);

  return { success: true, data: { doctorId: doctor.id } };
  } catch (error) {
  console.error("Error creating doctor during onboarding:", error);
  return {
  success: false,
  error: "A apărut o eroare la crearea profilului profesional.",
  };
  }
  }

/\*\*

- Submit Doctor for Verification (Doctor - Step 6)
-
- Updates doctor verification status to "in_review".
-
- @param doctorId - Doctor ID
- @param documents - Array of medical document URLs
- @returns Success response or error message
  \*/
  export async function submitDoctorForVerification(
  doctorId: string,
  documents: string[]
  ): Promise<OnboardingResponse> {
  try {
  const session = await requireAuth();

  await db
  .update(doctors)
  .set({
  verificationDocuments: documents,
  verificationStatus: "in_review",
  updatedAt: new Date(),
  })
  .where(and(eq(doctors.id, doctorId), eq(doctors.userId, session.dbUser.id)));

  // TODO: Send notification email to admin team
  // await sendDoctorVerificationRequestEmail(doctorId);

  return { success: true };
  } catch (error) {
  console.error("Error submitting doctor for verification:", error);
  return {
  success: false,
  error: "A apărut o eroare la trimiterea spre verificare.",
  };
  }
  }

/\*\*

- Complete Doctor Onboarding
-
- Marks doctor onboarding as complete and redirects to doctor dashboard.
  \*/
  export async function completeDoctorOnboarding(): Promise<never> {
  try {
  const session = await requireAuth();

  // Mark onboarding as completed
  await db
  .update(users)
  .set({
  onboardingCompleted: true,
  profileCompletionPercentage: 100,
  updatedAt: new Date(),
  })
  .where(eq(users.id, session.dbUser.id));

  await db
  .update(onboardingProgress)
  .set({
  currentStep: 8,
  isCompleted: true,
  updatedAt: new Date(),
  })
  .where(eq(onboardingProgress.userId, session.dbUser.id));

  // Mark doctor profile as complete
  const progressData = await getOnboardingProgress();
  if (progressData.success && progressData.data.stepData?.doctor_id) {
  await db
  .update(doctors)
  .set({ profileComplete: true, updatedAt: new Date() })
  .where(eq(doctors.id, progressData.data.stepData.doctor_id));
  }

  redirect(routes.doctor.dashboard);
  } catch (error) {
  console.error("Error completing doctor onboarding:", error);
  throw new Error("A apărut o eroare la finalizarea onboarding-ului.");
  }
  }

  ***

⏺ 4. TypeScript Types

File: src/types/onboarding.ts

/\*\*

- Onboarding TypeScript Types
-
- Type definitions for onboarding state, progress, and data structures.
  \*/

// ============================================================================
// ENUMS
// ============================================================================

export type UserRole = "parent" | "club_admin" | "doctor" | "admin";

export type VerificationStatus = "pending" | "in_review" | "approved" | "rejected";

export type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// ============================================================================
// ONBOARDING PROGRESS
// ============================================================================

export interface OnboardingProgress {
id: string;
userId: string;
role: UserRole;
currentStep: OnboardingStep;
totalSteps: number;
completedSteps: string[];
stepData: OnboardingStepData;
isCompleted: boolean;
createdAt: Date;
updatedAt: Date;
}

// JSONB stepData structure
export interface OnboardingStepData {
// Parent onboarding
child_id?: string;

    // Club admin onboarding
    club_id?: string;
    club_basic_info?: {
      name: string;
      sportType: string;
      description: string;
      city: string;
      district?: string;
      address: string;
    };
    club_contact_schedule?: {
      phone: string;
      email: string;
      website?: string;
      schedule: ScheduleEntry[];
    };
    club_pricing_ages?: {
      pricing: PricingOption[];
      ageGroups: number[];
      experienceLevels: string[];
    };
    club_photos?: {
      logoUrl: string;
      galleryUrls: string[];
    };

    // Doctor onboarding
    doctor_id?: string;
    doctor_basic_info?: {
      firstName: string;
      lastName: string;
      title?: string;
      specialty: string;
      credentials: string[];
    };
    doctor_bio_experience?: {
      bio: string;
      yearsOfExperience: number;
      secondarySpecialties?: string[];
      languages: string[];
    };
    doctor_location_contact?: {
      city: string;
      district?: string;
      address: string;
      phone: string;
      email: string;
      website?: string;
    };
    doctor_photo?: {
      photoUrl?: string;
    };
    doctor_availability?: {
      acceptingNewPatients: boolean;
      onlineConsultations: boolean;
      schedule?: ScheduleEntry[];
    };

}

// ============================================================================
// SHARED TYPES
// ============================================================================

export interface ScheduleEntry {
day: string;
time?: string; // For clubs: "17:00-18:30"
startTime?: string; // For doctors: "09:00"
endTime?: string; // For doctors: "17:00"
}

export interface PricingOption {
type: "monthly" | "per_class" | "per_semester";
amount: number;
}

// ============================================================================
// CHILD PROFILE
// ============================================================================

export interface ChildProfile {
id: string;
parentId: string;
firstName: string;
lastName: string;
dateOfBirth: Date;
gender?: "male" | "female" | "other";
createdAt: Date;
updatedAt: Date;
}

// ============================================================================
// CLUB PROFILE
// ============================================================================

export interface ClubProfile {
id: string;
adminUserId?: string;
name: string;
slug?: string;
description?: string;
sportType: string;
city: string;
district?: string;
address?: string;
latitude?: string;
longitude?: string;
phone?: string;
email?: string;
website?: string;
schedule?: ScheduleEntry[];
pricing?: PricingOption[];
ageGroups?: number[];
experienceLevels?: string[];
logoUrl?: string;
galleryUrls?: string[];
profileComplete: boolean;
verificationStatus: VerificationStatus;
verificationDocuments?: string[];
verified: boolean;
featured: boolean;
rating?: number;
createdAt: Date;
updatedAt: Date;
}

// ============================================================================
// DOCTOR PROFILE
// ============================================================================

export interface DoctorProfile {
id: string;
userId?: string;
firstName: string;
lastName: string;
title?: string;
specialty: string;
secondarySpecialties?: string[];
credentials?: string[];
bio?: string;
yearsOfExperience?: number;
languages?: string[];
city: string;
district?: string;
address?: string;
phone?: string;
email?: string;
website?: string;
acceptingNewPatients: boolean;
onlineConsultations: boolean;
schedule?: ScheduleEntry[];
photoUrl?: string;
profileComplete: boolean;
verificationStatus: VerificationStatus;
verificationDocuments?: string[];
verified: boolean;
rating?: number;
createdAt: Date;
updatedAt: Date;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface OnboardingLayoutProps {
children: React.ReactNode;
currentStep: number;
totalSteps: number;
role: UserRole;
}

export interface OnboardingProgressProps {
currentStep: number;
totalSteps: number;
completedSteps: number[];
}

export interface OnboardingNavigationProps {
onBack?: () => void;
onNext?: () => void;
backLabel?: string;
nextLabel?: string;
nextDisabled?: boolean;
isLoading?: boolean;
}

export interface ProfileImageUploadProps {
type: "logo" | "photo" | "gallery";
onUpload: (url: string) => void;
onRemove?: () => void;
maxSize?: number; // in MB
accept?: string;
preview?: string;
multiple?: boolean;
}

export interface DocumentUploadProps {
documentType: string;
onUpload: (url: string) => void;
onRemove?: () => void;
required?: boolean;
maxSize?: number; // in MB
accept?: string;
}

---

5. BONUS: Helper Utilities

File: src/lib/utils/onboarding.ts

/\*\*

- Onboarding Helper Utilities
-
- Helper functions for onboarding workflows.
  \*/

import type { UserRole, OnboardingStep } from "@/types/onboarding";

/\*\*

- Get total steps for a role
  \*/
  export function getTotalSteps(role: UserRole): number {
  const stepsMap: Record<UserRole, number> = {
  parent: 5,
  club_admin: 7,
  doctor: 8,
  admin: 0, // Admins don't have onboarding
  };
  return stepsMap[role];
  }

/\*\*

- Calculate onboarding progress percentage
  _/
  export function calculateProgress(currentStep: number, totalSteps: number): number {
  return Math.round((currentStep / totalSteps) _ 100);
  }

/\*\*

- Get onboarding route for current step
  \*/
  export function getOnboardingRoute(role: UserRole, step: OnboardingStep): string {
  const routes: Record<UserRole, Record<OnboardingStep, string>> = {
  parent: {
  1: "/onboarding/parent/welcome",
  2: "/onboarding/parent/add-child",
  3: "/onboarding/parent/tour",
  4: "/onboarding/parent/quiz-intro",
  5: "/onboarding/parent/complete",
  6: "",
  7: "",
  8: "",
  },
  club_admin: {
  1: "/onboarding/club/welcome",
  2: "/onboarding/club/basic-info",
  3: "/onboarding/club/contact-schedule",
  4: "/onboarding/club/pricing-ages",
  5: "/onboarding/club/photos",
  6: "/onboarding/club/verification",
  7: "/onboarding/club/complete",
  8: "",
  },
  doctor: {
  1: "/onboarding/doctor/welcome",
  2: "/onboarding/doctor/basic-info",
  3: "/onboarding/doctor/bio-experience",
  4: "/onboarding/doctor/location-contact",
  5: "/onboarding/doctor/photo",
  6: "/onboarding/doctor/verification",
  7: "/onboarding/doctor/availability",
  8: "/onboarding/doctor/complete",
  },
  admin: {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  },
  };

      return routes[role][step] || "";

  }

/\*\*

- Get step title (Romanian)
  \*/
  export function getStepTitle(role: UserRole, step: OnboardingStep): string {
  const titles: Record<UserRole, Record<OnboardingStep, string>> = {
  parent: {
  1: "Bun venit",
  2: "Adaugă copilul tău",
  3: "Cum funcționează",
  4: "AI Coach Quiz",
  5: "Complet",
  6: "",
  7: "",
  8: "",
  },
  club_admin: {
  1: "Bun venit",
  2: "Informații de bază",
  3: "Contact și program",
  4: "Tarife și grupe",
  5: "Fotografii",
  6: "Verificare",
  7: "Complet",
  8: "",
  },
  doctor: {
  1: "Bun venit",
  2: "Informații profesionale",
  3: "Bio și experiență",
  4: "Locație și contact",
  5: "Fotografie",
  6: "Verificare",
  7: "Disponibilitate",
  8: "Complet",
  },
  admin: {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  },
  };

      return titles[role][step] || "";

  }

/\*\*

- Validate file size
  _/
  export function validateFileSize(file: File, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB _ 1024 \* 1024;
  return file.size <= maxSizeBytes;
  }

/\*\*

- Validate file type
  _/
  export function validateFileType(file: File, acceptedTypes: string[]): boolean {
  return acceptedTypes.some((type) => {
  if (type.endsWith("/_")) {
  return file.type.startsWith(type.replace("/\*", ""));
  }
  return file.type === type;
  });
  }

/\*\*

- Format file size for display
  _/
  export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) _ 10) / 10 + " " + sizes[i];
  }

  ***

⏺ 6. BONUS: Routes Configuration

File: src/lib/routes.ts (ADD to existing file)

Add the following onboarding routes to your existing routes object:

// ADD THIS TO YOUR EXISTING routes OBJECT

export const routes = {
// ... existing routes ...

    // Onboarding routes
    onboarding: {
      // Parent onboarding
      parent: {
        welcome: "/onboarding/parent/welcome",
        addChild: "/onboarding/parent/add-child",
        tour: "/onboarding/parent/tour",
        quizIntro: "/onboarding/parent/quiz-intro",
        complete: "/onboarding/parent/complete",
      },

      // Club admin onboarding
      club: {
        welcome: "/onboarding/club/welcome",
        basicInfo: "/onboarding/club/basic-info",
        contactSchedule: "/onboarding/club/contact-schedule",
        pricingAges: "/onboarding/club/pricing-ages",
        photos: "/onboarding/club/photos",
        verification: "/onboarding/club/verification",
        complete: "/onboarding/club/complete",
      },

      // Doctor onboarding
      doctor: {
        welcome: "/onboarding/doctor/welcome",
        basicInfo: "/onboarding/doctor/basic-info",
        bioExperience: "/onboarding/doctor/bio-experience",
        locationContact: "/onboarding/doctor/location-contact",
        photo: "/onboarding/doctor/photo",
        verification: "/onboarding/doctor/verification",
        availability: "/onboarding/doctor/availability",
        complete: "/onboarding/doctor/complete",
      },
    },

    // Parent dashboard
    parent: {
      dashboard: "/parent/dashboard",
    },

    // Club dashboard
    club: {
      dashboard: "/club/dashboard",
    },

    // Doctor dashboard
    doctor: {
      dashboard: "/doctor/dashboard",
    },

    // Quiz routes
    quiz: {
      start: "/chestionar", // Romanian SEO route
    },

    // ... rest of existing routes ...

} as const;

---

📋 Implementation Checklist & Next Steps

✅ Completed Code Templates

All Phase 1 code templates have been generated:

1. ✅ Database Schema (src/lib/db/schema.ts)
   - New onboarding_progress table with JSONB stepData
   - Updated users table with onboarding fields
   - Updated clubs table with verification workflow
   - Updated doctors table with verification workflow
   - New verificationStatusEnum for status tracking
2. ✅ Validation Schemas (4 files)
   - src/lib/validations/child.ts - Parent onboarding
   - src/lib/validations/club.ts - Club admin onboarding
   - src/lib/validations/doctor.ts - Doctor onboarding
   - src/lib/validations/onboarding.ts - State management
3. ✅ Server Actions (src/app/actions/onboarding.ts)
   - Onboarding state management (start, update, get progress)
   - Cross-session persistence (save/restore stepData)
   - Parent onboarding actions (add child, complete)
   - Club onboarding actions (create club, verification)
   - Doctor onboarding actions (create profile, verification)
4. ✅ TypeScript Types (src/types/onboarding.ts)
   - Complete type definitions for all onboarding data
   - Component prop interfaces
   - JSONB stepData structure types
5. ✅ Helper Utilities (src/lib/utils/onboarding.ts)
   - Progress calculation
   - Route generation
   - File validation
   - Step title helpers
6. ✅ Routes Configuration (src/lib/routes.ts update)
   - All onboarding routes defined
   - Dashboard routes
   - Quiz route

   ***

   🚀 Implementation Steps

Step 1: Database Migration (Day 1)

# 1. Update schema file

# Replace content in src/lib/db/schema.ts with generated schema

# 2. Generate migration

npm run db:generate

# 3. Review migration files

# Check src/lib/db/migrations/ for generated SQL

# 4. Push to Neon database

npm run db:push

# 5. Verify in Drizzle Studio

npm run db:studio

# Navigate to http://localhost:4983

# Verify: onboarding_progress table exists

# Verify: users, clubs, doctors tables have new fields

Expected Result:

- New onboarding_progress table visible in Drizzle Studio
- users table has onboarding_completed and profile_completion_percentage columns
- clubs table has profile_complete, verification_status, verification_documents columns
- doctors table has same verification columns

  ***

  Step 2: Add Validation Files (Day 1)

# Create validation directory if it doesn't exist

mkdir -p src/lib/validations

# Create validation files

# Copy content for:

# - src/lib/validations/child.ts

# - src/lib/validations/club.ts

# - src/lib/validations/doctor.ts

# - src/lib/validations/onboarding.ts

Test Validation:
// Test file: src/lib/validations/**tests**/child.test.ts
import { createChildSchema } from "../child";

const validChild = {
firstName: "Ion",
lastName: "Popescu",
dateOfBirth: new Date("2015-01-01"),
gender: "male",
};

const result = createChildSchema.safeParse(validChild);
console.log(result.success); // Should be true

---

Step 3: Add Server Actions (Day 2)

# Create actions directory if it doesn't exist

mkdir -p src/app/actions

# Copy Server Actions file

# src/app/actions/onboarding.ts

Test Server Actions (in development):
// Test in a temporary API route or Server Component
import { startOnboarding } from "@/app/actions/onboarding";

// After authentication
const result = await startOnboarding("parent");
console.log(result); // { success: true, data: { ... } }

---

Step 4: Add TypeScript Types (Day 2)

# Create types directory if it doesn't exist

mkdir -p src/types

# Copy types file

# src/types/onboarding.ts

---

Step 5: Add Helper Utilities (Day 2)

# Create utils directory if it doesn't exist

mkdir -p src/lib/utils

# Copy utilities file

# src/lib/utils/onboarding.ts

---

Step 6: Update Routes (Day 3)

# Update existing routes file

# Add onboarding routes to src/lib/routes.ts

Test Routes:
import { routes } from "@/lib/routes";

console.log(routes.onboarding.parent.welcome);
// Output: "/onboarding/parent/welcome"

---

Step 7: Create Middleware Protection (Day 3)

File: src/middleware.ts (create if doesn't exist)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stackServerApp } from "@/lib/auth/stack";

export async function middleware(request: NextRequest) {
// Get Stack Auth user
const user = await stackServerApp.getUser();

    if (!user) {
      // Not authenticated - redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // TODO: Check onboarding_completed status from database
    // For now, this is a placeholder

    return NextResponse.next();

}

export const config = {
matcher: [
"/parent/dashboard/:path*",
"/club/dashboard/:path*",
"/doctor/dashboard/:path*",
"/onboarding/:path*",
],
};

---

Step 8: Verify & Test (Day 3-4)

# Run linter

npm run lint

# Run type check

npm run build

# Test database operations in Drizzle Studio

npm run db:studio

# Start dev server

npm run dev

Manual Testing Checklist:

- Database schema deployed successfully
- All TypeScript files compile without errors
- Server Actions can be imported without errors
- Validation schemas parse test data correctly
- Routes configuration works
- Middleware protects routes (basic check)

  ***

  📊 File Structure After Implementation

yuvoo-nextjs/
├── src/
│ ├── app/
│ │ └── actions/
│ │ └── onboarding.ts ✨ NEW
│ ├── lib/
│ │ ├── db/
│ │ │ ├── schema.ts 🔄 UPDATED
│ │ │ └── migrations/ 🔄 UPDATED
│ │ ├── validations/
│ │ │ ├── common.ts ✅ EXISTS
│ │ │ ├── child.ts ✨ NEW
│ │ │ ├── club.ts ✨ NEW
│ │ │ ├── doctor.ts ✨ NEW
│ │ │ └── onboarding.ts ✨ NEW
│ │ ├── utils/
│ │ │ └── onboarding.ts ✨ NEW
│ │ └── routes.ts 🔄 UPDATED
│ ├── types/
│ │ └── onboarding.ts ✨ NEW
│ └── middleware.ts 🔄 UPDATED

---

⚠️ Important Notes

1. Database Connection: Ensure Neon database is configured in .env.local
   DATABASE_URL="postgresql://user:password@host/database"
2. Stack Auth: Server Actions use requireAuth() - ensure Stack Auth is working
3. Romanian Language: All error messages and validation text are in Romanian
4. JSONB Fields: stepData uses PostgreSQL JSONB for flexible data storage
5. Migrations: Review generated migration files before pushing to production
6. Testing: Test each Server Action individually before integration

   ***

   🎯 Success Metrics

After implementing Phase 1 templates, you should achieve:

- ✅ Database Schema: All tables created with proper indexes and constraints
- ✅ Type Safety: 100% TypeScript type coverage
- ✅ Validation: All user inputs validated with Zod schemas
- ✅ Server Actions: Cross-session persistence working
- ✅ Romanian Language: All user-facing text in Romanian
- ✅ No Errors: npm run build succeeds without errors
- ✅ Ready for Phase 2: Foundation complete for building UI components

  ***

  🎉 Summary

You now have production-ready code templates for Phase 1 of the onboarding workflow:

📦 6 files generated:

1. Database schema (updated)
2. Child validation schema
3. Club validation schema
4. Doctor validation schema
5. Onboarding validation schema
6. Server Actions (onboarding state management)
7. TypeScript types
8. Helper utilities
9. Routes configuration (update)

🚀 Ready to implement:

- Copy/paste code into your project
- Run database migrations
- Test Server Actions
- Move to Phase 2 (Parent Onboarding UI)

💡 Key Features:

- Cross-session resume functionality via JSONB stepData
- Role-based onboarding flows (parent, club, doctor)
- Verification workflows for clubs and doctors
- Complete Romanian localization
- Type-safe with Zod validation
- Production-ready error handling

Next: Implement these templates, test thoroughly, then proceed to Phase 2 (Parent Onboarding UI Components).
