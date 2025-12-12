# Yuvoo - Active Context

## Current Status

**Phase**: Foundation Setup & Onboarding Development
**Date**: December 2024
**Focus**: Onboarding system implementation, documentation improvements, Next.js 16 upgrade, Cache Components migration, and code generation standards

## Current Work Focus

### Immediate Priorities

1. **Authentication System Integration** ✅ (Completed - Migrated to Server-Side)
   - Stack Auth fully integrated using Server Actions pattern (no client-side provider)
   - All authentication operations handled server-side for better security
   - All components localized to Romanian
   - Complete authentication flow (sign up, sign in, password reset, email verification)
   - Forms use Server Actions instead of client-side hooks
   - Ready for end-to-end testing

2. **Legal Pages Development** ✅ (Completed)
   - Created all 4 legal pages with comprehensive Romanian content
   - Added footer legal links integration
   - Completed styling and SEO optimization

3. **Homepage Development** ✅ (Completed)
   - All homepage components created and integrated
   - Romanian language content throughout
   - Complete homepage experience with 9 sections

4. **Onboarding System Development** 🚧 (In Progress)
   - Database schema complete (onboarding_progress table, updated users/clubs/doctors tables) ✅
   - Server Actions implemented (state management, progress tracking, resume functionality) ✅
   - Validation schemas created (onboarding, child, club, doctor) ✅
   - Drizzle migrations created ✅
   - **Parent Onboarding (Phase 2)**: ✅ **COMPLETE**
     - Welcome page ✅
     - Add child profile form ✅
     - Platform tour ✅
     - Quiz introduction CTA ✅
     - Testing & Polish ✅
   - **Club Admin Onboarding (Phase 3)**: 🚧 **IN PROGRESS**
     - Welcome page ✅
     - Basic info form ✅
     - Pending: Contact & Schedule, Pricing & Ages, Photo Upload, Verification, Completion

5. **Component Development**
   - Creating feature-specific components as needed
   - Adapting existing components to Yuvoo branding
   - Ensuring SEO optimization

## Recent Changes

### Stack Auth Server-Side Migration ✅ (December 2024)

- **Migrated**: Stack Auth from client-side to server-side architecture
  - Removed `StackProvider` and `StackAuthProvider` client components
  - Created Server Actions for all authentication operations (`signInAction`, `signUpAction`, `forgotPasswordAction`, `resetPasswordAction`, `verifyEmailAction`)
  - Updated all authentication forms to use Server Actions instead of `useStackApp` hooks
  - Converted `EmailConfirmationForm` from client component to server component
  - Benefits: Better security, smaller client bundle, better SEO, simpler architecture
  - Status: ✅ Complete - All authentication operations are now server-side only
  - Documentation: See `docs/STACK_AUTH_SERVER_MIGRATION_PLAN.md` for details

### Authentication System Integration ✅

- **Created**: Authentication integration plan (`docs/AUTH_INTEGRATION_PLAN.md`) ✅
  - Comprehensive plan covering Stack Auth integration and Romanian localization
  - All phases documented with implementation details
  - Status: ✅ Complete - Serves as reference for authentication system

- **Migrated**: Stack Auth to server-side only ✅
  - Removed StackProvider and StackAuthProvider (client-side components)
  - All authentication operations now use Server Actions
  - Forms updated to use Server Actions instead of useStackApp hooks
  - Status: ✅ Complete - Fully server-side authentication

- **Created**: Error message utility (`src/lib/auth/errors.ts`) ✅
  - Centralized error message mapping for Stack Auth errors
  - All error messages in Romanian
  - `getErrorMessage()` utility function for consistent error handling
  - Status: ✅ Complete - Used across all authentication forms

- **Created**: Authentication Server Actions (`src/app/actions/auth.ts`) ✅
  - `signInAction` - Sign in with email/password (server-side)
  - `signUpAction` - Sign up with email/password (server-side)
  - `forgotPasswordAction` - Send password reset email (server-side)
  - `resetPasswordAction` - Reset password with token (server-side)
  - `verifyEmailAction` - Verify email with token (server-side)
  - All actions return success/error responses with Romanian error messages
  - Status: ✅ Complete - All authentication operations server-side

- **Updated**: SignInForm component (`src/components/Form/SignInForm.tsx`) ✅
  - Migrated from `useStackApp` hook to `signInAction` Server Action
  - Uses `useTransition` for loading states
  - Added loading states and error handling
  - All text translated to Romanian (placeholders, validation, buttons)
  - Redirects to dashboard on successful login
  - Status: ✅ Complete - Fully functional with Server Actions

- **Updated**: SignUpMain component (`src/components/Form/SignUpMain.tsx`) ✅
  - Migrated from `useStackApp` hook to `signUpAction` Server Action
  - Uses `useTransition` for loading states
  - Added password confirmation validation
  - Added loading states and error handling
  - All text translated to Romanian
  - Redirects to dashboard on successful signup
  - Status: ✅ Complete - Fully functional with Server Actions

- **Updated**: ForgotForm component (`src/components/Form/ForgotForm.tsx`) ✅
  - Migrated from `useStackApp` hook to `forgotPasswordAction` Server Action
  - Uses `useTransition` for loading states
  - Added success message display
  - Added loading states and error handling
  - All text translated to Romanian
  - Status: ✅ Complete - Fully functional with Server Actions

- **Updated**: ResetPasswordForm component (`src/components/Form/ResetPasswordForm.tsx`) ✅
  - Migrated from `useStackApp` hook to `resetPasswordAction` Server Action
  - Uses `useTransition` for loading states
  - Extracts token from URL search params
  - Password confirmation validation
  - Auto-redirects to login after successful reset
  - All text translated to Romanian
  - Status: ✅ Complete - Fully functional with Server Actions

- **Created**: ResetPasswordMain component (`src/components/Auth/ResetPasswordMain.tsx`) ✅
  - Wrapper component for reset password page
  - Romanian text throughout
  - Status: ✅ Complete

- **Created**: Reset password page (`src/app/(auth)/reset-password/page.tsx`) ✅
  - New page with SEO metadata (Romanian)
  - Wrapped ResetPasswordMain in Suspense (for useSearchParams)
  - Status: ✅ Complete

- **Migrated**: EmailConfirmationForm component (`src/components/Form/EmailConfirmationForm.tsx`) ✅
  - Converted from client component to server component
  - Uses `verifyEmailAction` Server Action
  - Receives token as prop from page component
  - Automatic verification on page load (server-side)
  - Error and success states handled server-side
  - Auto-redirects to login after successful verification
  - All text translated to Romanian
  - Status: ✅ Complete - Fully functional as server component

- **Created**: EmailConfirmationMain component (`src/components/Auth/EmailConfirmationMain.tsx`) ✅
  - Wrapper component for email confirmation page
  - Romanian text throughout
  - Status: ✅ Complete

- **Created**: Email confirmation page (`src/app/(auth)/email-confirmation/page.tsx`) ✅
  - New page with SEO metadata (Romanian)
  - Wrapped EmailConfirmationMain in Suspense (for useSearchParams)
  - Status: ✅ Complete

- **Updated**: All auth page wrapper components (LoginMain, RegisterMain, ForgotPasswordMain) ✅
  - All hardcoded English text translated to Romanian
  - Links updated to use `routes` helper
  - Status: ✅ Complete - All localized

- **Updated**: All auth page metadata (login, register, forgot-password, reset-password, email-confirmation) ✅
  - Comprehensive Romanian SEO metadata (title, description, keywords)
  - Open Graph tags for social sharing
  - Twitter Card tags
  - Canonical URLs
  - Status: ✅ Complete - All pages optimized for SEO

- **Updated**: Stack Auth configuration (`src/lib/auth/stack.ts`) ✅
  - Server-side only initialization (no client-side provider needed)
  - Added `passwordReset` URL configuration
  - Added `emailVerification` URL configuration
  - Proxy pattern for lazy initialization
  - Status: ✅ Complete - Stack Auth configured for server-side only usage

- **Updated**: Routes configuration (`src/lib/routes.ts`) ✅
  - Added `emailConfirmation` route
  - Status: ✅ Complete - All auth routes defined

**Authentication Flow Status**: ✅ **COMPLETE - Server-Side Migration**

- **Architecture**: All authentication operations use Server Actions (no client-side provider)
- Registration: User signs up → Email verification sent → User verifies email → Can login ✅
- Login: User signs in → Redirected to dashboard ✅
- Password Reset: User requests reset → Email sent → User resets password → Can login ✅
- Email Verification: User clicks email link → Email verified automatically → Redirected to login ✅

**Migration Completed**:

- ✅ Removed StackProvider and StackAuthProvider
- ✅ Created Server Actions for all authentication operations
- ✅ Updated all forms to use Server Actions
- ✅ Converted EmailConfirmationForm to server component
- ✅ Updated documentation

**Next Step**: End-to-end testing of complete authentication flow

### Legal Pages Development ✅

- **Created**: Legal pages development plan (`docs/LEGAL_PAGES_DEVELOPMENT_PLAN.md`) ✅
  - Comprehensive plan covering all 4 legal pages
  - Content templates, technical requirements, SEO guidelines
  - Development phases and testing checklist
  - Status: ✅ Complete - Serves as reference for legal pages

- **Created**: All 4 legal pages with complete Romanian content ✅
  - **Privacy Policy** (`/confidentialitate`): 9 sections covering data collection, usage, sharing, rights, retention, security
  - **Terms of Service** (`/termeni`): 9 sections covering platform usage, user responsibilities, liability, disputes
  - **Cookie Policy** (`/cookies`): 7 sections explaining cookie types, usage, management
  - **GDPR for Parents** (`/gdpr-parinti`): 11 sections covering children's data protection, parental consent, rights
  - All pages include SEO metadata (Open Graph, Twitter Cards, canonical URLs)
  - All content in Romanian language, GDPR compliant structure
  - Status: ✅ Complete - Ready for legal review

- **Created**: Legal pages SCSS styling (`public/assets/scss/layout/_legal.scss`) ✅
  - Responsive typography (H1: 48px, H2: 28px, H3: 20px)
  - Link styling with hover effects
  - List styling (ul, ol)
  - Proper spacing and layout
  - Added to main.scss imports
  - Status: ✅ Complete

- **Updated**: Footer components with legal links ✅
  - Added legal links to `CopyrightText` component
  - Added legal links to `CopyrightTextTwo` component
  - Added footer legal links styling in `_footer.scss`
  - Links use `routes` helper for consistency
  - Status: ✅ Complete - Legal pages accessible from footer

### Homepage Components Development

- **Created**: `src/components/features/home/FeaturedDoctors.tsx` ✅
  - Displays 4 featured pediatric specialists with verification badges
  - Circular professional photos, specialties, and profile links
  - Secondary CTA: "Vezi toți doctorii →"
  - Romanian language content throughout
  - Status: ✅ Complete and integrated into homepage

- **Created**: `src/components/features/home/HomeFaq.tsx` ✅
  - Bootstrap accordion with 4 FAQ items
  - Questions: Free service, club verification, data safety, quiz repetition
  - First item expanded by default
  - Romanian language content
  - Fixed visibility issues with proper className construction
  - Status: ✅ Complete and integrated into homepage

- **Updated**: `src/app/(public)/page.tsx` SEO metadata ✅
  - Enhanced meta description with keywords, benefits, and CTA
  - Expanded keywords list (primary and long-tail keywords)
  - Added Open Graph tags for social sharing
  - Added Twitter Card tags
  - Added canonical URL
  - Status: ✅ Complete - Follows SEO guidelines

### Homepage Component Order

Current homepage structure (`src/app/(public)/page.tsx`):

1. `<HeroYuvoo />` - Main hero section
2. `<HowItWorks />` - 3-step process explanation
3. `<HomePromotionArea />` - Promotional section with quiz CTA
4. `<HomeThreeFeatureArea />` - Key features/benefits
5. `<FeaturedSports />` - Popular sports showcase
6. `<FeaturedClubs />` - Verified clubs showcase
7. `<FeaturedDoctors />` - Pediatric specialists showcase
8. `<HomeTestimonial />` - Parent testimonial
9. `<HomeFaq />` - Frequently asked questions

### Project Initialization

- Memory bank structure created
- Project briefs analyzed and documented
- Architecture patterns documented
- Technical context established

### Routes & SEO Configuration

- **Created**: `lib/routes.ts` - Single source of truth for all routes and paths
- **SEO Strategy**: Public routes use Romanian language for SEO optimization
  - Public routes: `/sporturi`, `/cluburi`, `/doctori`, `/chestionar`, `/despre-noi`, etc.
  - Internal routes: `/auth/login`, `/parent/dashboard`, `/club/dashboard`, etc.
- **Features**: Type-safe routes, helper functions, legacy route mapping
- **Status**: ✅ Complete - All routes defined and organized

### Component Adaptation - Class → Club

- **Created**: Club components in `components/features/clubs/`
  - `ClubsMain.tsx` - Club listing page component
  - `ClubDetailsMain.tsx` - Club detail page component
  - `HomeClubArea.tsx` - Homepage club section component
  - `ClubCard.tsx` - Reusable club card component
  - `VerificationBadge.tsx` - Club verification badge component
- **Features**: Verification badges, sport info, location, age groups, pricing, SEO routes
- **Status**: ✅ Core components created - Ready for integration

### TypeScript Configuration

- **Path Aliases**: Configured `@/*` → `./src/*` (standard Next.js pattern)
- **Documentation**: Created `TYPESCRIPT_PATHS.md` with usage examples
- **Decision**: Keep single alias pattern (no additional aliases needed)
- **Status**: ✅ Configured and documented

### Onboarding System Development ✅ (Phase 2 Complete, Phase 3 In Progress)

- **Created**: Onboarding database schema (`src/lib/db/schema.ts`) ✅
  - `onboarding_progress` table for cross-session state tracking
  - Updated `users` table with `onboardingCompleted` and `profileCompletionPercentage` fields
  - Updated `clubs` and `doctors` tables with verification fields
  - Status: ✅ Complete - Schema defined and migration created

- **Created**: Onboarding Server Actions (`src/app/actions/onboarding.ts`) ✅
  - State management: `startOnboarding()`, `getOnboardingProgress()`, `updateOnboardingStep()`
  - Progress tracking: `markStepComplete()`, `saveStepData()`
  - Resume functionality: Automatic progress retrieval
  - Parent onboarding: `addChildOnboarding()`, `completeParentOnboarding()` ✅
  - Club admin onboarding: `createClubOnboarding()` ✅, `submitClubForVerification()`, `completeClubOnboarding()`
  - Doctor onboarding: `createDoctorOnboarding()`, `submitDoctorForVerification()`, `completeDoctorOnboarding()`
  - Status: ✅ Complete - All Server Actions implemented with proper TypeScript types

- **Created**: Onboarding validation schemas ✅
  - `src/lib/validations/onboarding.ts` - Onboarding state management schemas
  - `src/lib/validations/child.ts` - Child profile validation
  - `src/lib/validations/club.ts` - Club profile validation (basic info, contact, pricing, photos, verification)
  - `src/lib/validations/doctor.ts` - Doctor profile validation (basic info, bio, location, photos, verification, availability)
  - Status: ✅ Complete - All validation schemas with Romanian error messages

- **Created**: Drizzle migration (`drizzle/0000_clever_tyger_tiger.sql`) ✅
  - Migration for onboarding_progress table
  - Status: ✅ Complete - Ready for database push

- **Created**: Onboarding base components ✅
  - `OnboardingLayout` - Shared UI wrapper with Yuvoo branding
  - `OnboardingProgress` - Visual progress indicator (mobile/desktop responsive)
  - `OnboardingNavigation` - Navigation buttons (back/next/skip/finish)
  - Status: ✅ Complete - All base components created and tested

- **Created**: Onboarding routing structure ✅
  - Parent onboarding routes: `/onboarding/parent/*` (5 steps) ✅
  - Club admin onboarding routes: `/onboarding/club/*` (7 steps) 🚧
  - Doctor onboarding routes: `/onboarding/doctor/*` (8 steps) ⏳
  - Status: ✅ Parent routes complete, Club routes in progress

- **Parent Onboarding (Phase 2)**: ✅ **COMPLETE**
  - Step 1: Welcome page (`/onboarding/parent/welcome`) ✅
  - Step 2: Add child profile (`/onboarding/parent/add-child`) ✅
    - `AddChildForm` component with React Hook Form + Zod validation
    - Date picker with age calculation (4-14 years)
    - Gender selection (optional)
  - Step 3: Platform tour (`/onboarding/parent/tour`) ✅
    - 3-step process visualization (AI Coach Quiz, Găsești Cluburi, Rezervi & Probă)
  - Step 4: Quiz introduction (`/onboarding/parent/quiz-intro`) ✅
    - Personalized child name display
    - Primary CTA: "Începe Chestionarul Acum"
    - Secondary CTA: "Mai târziu, mergi la dashboard"
  - Step 5: Complete (redirects automatically) ✅
  - Testing & Polish: ✅ **COMPLETE**
    - End-to-end testing completed
    - Romanian language review completed
    - Form validation tested
    - Navigation flow verified
    - UX refinement completed
    - Testing report created (`docs/ONBOARDING_TESTING_REPORT.md`)

- **Club Admin Onboarding (Phase 3)**: 🚧 **IN PROGRESS**
  - Step 1: Welcome page (`/onboarding/club/welcome`) ✅
    - Personalized greeting with admin name
    - 7-step progress indicator
    - Romanian copy with benefits list
  - Step 2: Basic info (`/onboarding/club/basic-info`) ✅
    - `ClubBasicInfoForm` component with all required fields
    - Sport type dropdown (from SPORT_TYPES constant)
    - City dropdown (30 major Romanian cities)
    - Description textarea with character counter
    - Slug generation utility (`generateSlug` in `src/lib/utils.ts`)
    - Server action creates club and tracks progress
  - Pending: Contact & Schedule, Pricing & Ages, Photo Upload, Verification, Completion

- **Utility Functions Created**:
  - `generateSlug()` in `src/lib/utils.ts` ✅
    - Handles Romanian diacritics
    - Converts to SEO-friendly URL slugs
    - Used for club slug generation

### Documentation Updates

- **Created**: `CLAUDE.md` - Comprehensive project guide for Claude Code ✅
  - **Content**: Project overview, quick start, development commands, architecture patterns, critical development rules, documentation structure, external services, component adaptation, development workflow, testing guidelines, troubleshooting, quick reference
  - **Features**: Table of contents, expanded examples, code snippets, testing checklists, troubleshooting section, quick reference patterns
  - **Status**: ✅ Complete - Comprehensive guide for working with the codebase

- **Created**: `docs/ PROMPTING_RULES_FOR_CODEGEN.md` - Comprehensive code generation guidelines
  - **Content**: Next.js 16 patterns, Cache Components rules, file naming, error handling, TypeScript patterns, Romanian language requirements
  - **Status**: ✅ Complete - Serves as reference for all code generation

- **Created**: `docs/ARCHITECTURE_OVERVIEW.md` - Complete architecture documentation
  - **Content**: Executive summary, technology stack, Next.js 16 Cache Components, directory structure, data flow patterns, design patterns, routing strategy, caching strategy, authentication, error handling, performance, security, deployment, and architectural decisions
  - **Status**: ✅ Complete - Comprehensive reference for project architecture

- **Created**: `docs/BRAND_GUIDELINES.md` - Comprehensive brand guidelines
  - **Content**: Visual identity (colors, typography, spacing, shadows, icons), tone of voice (warm & supportive 70%, expert & confident 30%), UX principles, writing guidelines, microcopy examples, brand messages, content pillars, logo requirements, and implementation checklist
  - **Status**: ✅ Complete - Complete reference for brand consistency across all touchpoints

- **Created**: `docs/COMPONENTS_GUIDE.md` - Comprehensive components guide
  - **Content**: Component organization, styling approach (Bootstrap + Tailwind), button patterns, input patterns, card types (club, doctor, sport), modal & toast guidelines, layout components, naming conventions, component patterns (Server/Client Components), best practices, and usage examples
  - **Status**: ✅ Complete - Complete reference for creating consistent UI components

- **Created**: `docs/COPY_LIBRARY.md` - Comprehensive copy library
  - **Content**: Single source of truth for all user-facing text including CTAs, form microcopy, error messages, success messages, empty states, loading states, modal messages, toast notifications, quiz copy, club/doctor copy, navigation labels, trust messages, onboarding copy, search & filters, booking copy, profile & settings, help & support, legal & compliance, email templates, and usage guidelines
  - **Status**: ✅ Complete - Complete reference for all Romanian language copy across the platform

- **Updated**: `docs/COPYWRITING_GUIDE.md` - Comprehensive copywriting guide
  - **Content**: Brand essence, brand voice (70% warm & supportive, 30% expert & confident), writing principles (clarity, empathy, microcopy, trust building, positivity), language & style guidelines, writing structure, content types (UI, marketing, email, help, errors), writing templates, common mistakes, content checklist, and quick reference
  - **Status**: ✅ Complete - Complete reference for copywriting principles and best practices

- **Created**: `docs/DATA_MODELS.md` - Comprehensive data models documentation
  - **Content**: Core models (User, Child, Club, Doctor, Quiz, Booking, Favorite, Review), TypeScript interfaces, database schema mappings, relationships, enums, field conventions, usage examples, common patterns, and database vs TypeScript differences
  - **Status**: ✅ Complete - Complete reference for all data structures and models used in the platform

- **Created**: `docs/ONBOARDING_WORKFLOW.md` - Comprehensive onboarding workflow documentation ✅
  - **Content**: Complete onboarding system design, user flows for parent/club/doctor onboarding, step-by-step implementation guide, component specifications, validation schemas, Server Actions, database schema, UI/UX guidelines, and implementation phases
  - **Status**: ✅ Complete - Comprehensive reference for onboarding system implementation

- **Created**: `docs/ONBOARDING_PHASE_1.md` - Parent onboarding phase 1 documentation ✅
  - **Content**: Detailed specifications for parent onboarding flow (5 steps), component requirements, validation rules, Romanian copy, and implementation checklist
  - **Status**: ✅ Complete - Reference for parent onboarding implementation

### Next.js 16 Upgrade & Cache Components Migration ✅

**Completed**: December 2024

- **Upgraded**: Next.js 15.3.1 → 16.0.8
- **Upgraded**: React 19.0.0 → 19.2.1
- **Enabled**: Cache Components mode (`cacheComponents: true` in next.config.ts)
- **Migrated**: All Route Segment Config exports removed (incompatible with Cache Components)
- **Fixed**: All dynamic routes with `generateStaticParams()` (8 routes)
- **Fixed**: Parent routes to explicitly access `cookies()` for dynamic rendering
- **Added**: `"use cache"` directives to Footer components and static pages
- **Fixed**: `new Date()` usage in cached components
- **Status**: ✅ Build successful - All 68 routes building correctly

**Key Changes**:

- Removed `export const dynamic = "force-dynamic"` from 5 parent pages
- Added `generateStaticParams()` to all dynamic routes (cluburi, doctori, sporturi, theme routes)
- Made Footer components async for `"use cache"` compatibility
- Updated `next.config.ts` to remove ESLint config (moved to ESLint config files)
- Renamed `middleware.ts` → `proxy.ts` (Next.js 16 middleware-to-proxy migration)
- All routes verified and working with Cache Components

### Current Codebase State

**Starting Theme**: Kindedo - Kindergarten & School Next.js Template

**Observation**: The current codebase is a complete template (`kindedo-nextjs`) with:

- ✅ **Next.js 16.0.8** with Cache Components enabled
- ✅ **React 19.2.1**
- ✅ **Bootstrap 5.3.3** + SCSS styling
- ✅ **Redux Toolkit** for state management
- ✅ **Rich component library** (Class, Teacher, Program, etc.)
- ✅ **Multiple layout variants** (HeaderOne-Four, FooterOne-Three)
- ✅ **Animation libraries** (WOW.js, Animate.css)
- ✅ **Font Awesome Pro** + Flaticon icons
- ✅ **Gabarito font** (child-friendly)
- ✅ **Complete page structure** (home, about, contact, etc.)

**Decision Made**: ✅ **Hybrid Approach** - Reuse and adapt existing components

**Action Plan**:

- Adapt existing components (Class→Club, Teacher→Doctor, Program→Sport)
- Keep Bootstrap for existing components initially
- Use Tailwind for new components (Quiz, Dashboard)
- Gradual migration strategy
- See `designSystem.md` for detailed adaptation plan

## Active Decisions & Considerations

### Architecture Decision

**Planned Architecture** (from MVP_STARTER_BRIEF.md):

- Next.js 16 with App Router and Cache Components ✅
- Server Actions pattern
- Drizzle ORM
- Stack Auth
- Tailwind CSS + shadcn/ui
- Modular service layer

**Current Codebase**:

- Next.js 16.0.8 with Cache Components ✅ (upgraded and migrated)
- Bootstrap styling (different, gradual migration planned)
- Redux (different, gradual replacement planned)
- Existing component structure (being adapted)

**Status**: ✅ Next.js 16 upgrade complete, Cache Components enabled and working

### Technology Stack Alignment

**Current Stack** (Kindedo Theme):

- ✅ Next.js 16.0.8 with Cache Components (upgraded from 15.3.1) ✅
- ✅ React 19.2.1 (upgraded from 19.0.0) ✅
- ✅ TypeScript 5.x (matches requirements)
- ✅ Bootstrap 5.3.3 + SCSS (actual, to be gradually migrated)
- ✅ Redux Toolkit (actual, to be gradually replaced with Server Actions)

**To Setup**:

- [ ] Database setup (Neon + Drizzle)
- [ ] Authentication setup (Stack Auth)
- [x] Tailwind CSS setup (for new components) ✅ - Completed and upgraded to v4.1.17
- [ ] shadcn/ui installation (for new components)

**Migration Strategy**:

- Keep Bootstrap/SCSS for existing adapted components
- Use Tailwind for new components (Quiz, Dashboard, etc.)
- Gradually migrate as components are refactored
- See `designSystem.md` for component adaptation plan

### Development Environment

**Setup Required**:

- [ ] Environment variables configuration
- [ ] Database connection (Neon)
- [ ] Stack Auth project creation
- [ ] OpenAI API key
- [ ] Cloudinary account
- [ ] Brevo account

## Next Steps

### Week 1-2: Foundation Setup

1. **Project Setup**
   - [x] Verify/upgrade Next.js to latest version ✅ (Upgraded to 16.0.8)
   - [x] Enable Cache Components ✅ (Migrated to Cache Components mode)
   - [x] Install required dependencies ✅
   - [x] Set up Tailwind CSS ✅ (v4.1.17 installed)
   - [x] Install shadcn/ui components ✅ (Initialized)
   - [ ] Remove/replace Bootstrap if needed (gradual migration planned)

2. **Database Setup**
   - [ ] Create Neon database
   - [ ] Install Drizzle ORM
   - [ ] Create database schema
   - [ ] Set up migrations
   - [ ] Seed initial data (sports, sample clubs)

3. **Authentication Setup**
   - [ ] Create Stack Auth project
   - [ ] Configure Stack Auth
   - [ ] Set up session management
   - [ ] Create auth middleware
   - [ ] Test authentication flow

4. **Basic Layout**
   - [ ] Create root layout
   - [ ] Set up Header component
   - [ ] Set up Footer component
   - [ ] Create Sidebar for auth routes
   - [ ] Set up routing structure

### Week 3-4: Core Pages

1. **Landing Page**
   - [ ] Design and implement homepage
   - [ ] Value proposition section
   - [ ] 3-step process explanation
   - [ ] Sign-up CTA
   - [ ] Trust indicators

2. **Authentication Pages**
   - [ ] Sign up page
   - [ ] Sign in page
   - [ ] Password reset flow
   - [ ] Email verification

3. **Dashboard**
   - [ ] Parent dashboard layout
   - [ ] Overview stats
   - [ ] Recent activity
   - [ ] Quick actions

4. **Child Management**
   - [ ] Children list page
   - [ ] Add child form
   - [ ] Edit child form
   - [ ] Child profile view

### Week 5-8: Quiz System

1. **Quiz UI**
   - [ ] Quiz flow component
   - [ ] Question components (age, energy, personality, interests, etc.)
   - [ ] Progress indicator
   - [ ] Navigation (next/back)

2. **Quiz Backend**
   - [ ] Server Actions for quiz submission
   - [ ] Quiz validation schemas
   - [ ] Quiz service layer
   - [ ] Quiz repository

3. **AI Integration**
   - [ ] OpenAI client setup
   - [ ] Prompt engineering
   - [ ] Response parsing
   - [ ] Error handling

4. **Results Display**
   - [ ] Results page
   - [ ] Sport recommendations display
   - [ ] Reasoning display
   - [ ] Next steps (view clubs, consult specialist)

### Week 9-12: Club Discovery

1. **Club Directory**
   - [ ] Club listing page
   - [ ] Search and filters
   - [ ] Club card component
   - [ ] Club grid layout

2. **Club Details**
   - [ ] Club detail page (SSG)
   - [ ] Club information display
   - [ ] Photo gallery
   - [ ] Map integration
   - [ ] Schedule display

3. **Club Search**
   - [ ] Search service
   - [ ] Filter logic
   - [ ] Location-based search
   - [ ] Sorting

4. **Booking Flow** (Basic)
   - [ ] Booking form
   - [ ] Booking creation
   - [ ] Confirmation email

### Week 13-14: Doctor Profiles

1. **Doctor Directory**
   - [ ] Doctor listing page
   - [ ] Search and filters
   - [ ] Doctor card component

2. **Doctor Details**
   - [ ] Doctor profile page (SSG)
   - [ ] Professional information
   - [ ] Availability calendar
   - [ ] Booking form

3. **Specialist Integration**
   - [ ] AI Coach → Specialist recommendation
   - [ ] Risk signal detection
   - [ ] Specialist referral flow

### Week 15-16: Polish & Deploy

1. **Email Notifications**
   - [ ] Brevo integration
   - [ ] Email templates
   - [ ] Booking confirmations
   - [ ] Quiz result summaries

2. **Testing**
   - [ ] Manual testing
   - [ ] User flow testing
   - [ ] Bug fixes

3. **Performance**
   - [ ] Image optimization
   - [ ] Code splitting
   - [ ] Database query optimization
   - [ ] Caching strategy

4. **Deployment**
   - [ ] Vercel configuration
   - [ ] Environment variables
   - [ ] Database migrations
   - [ ] Production deployment
   - [ ] Monitoring setup

## Active Questions

1. **Migration Strategy**: How to handle existing codebase?
2. **Component Reuse**: Can any existing components be reused?
3. **Data Migration**: Is there existing data to migrate?
4. **Design System**: Should we create a design system first?
5. **Testing Strategy**: When to introduce automated testing?

## Blockers & Risks

### Current Blockers

- None identified yet (early stage)

### Potential Risks

1. **Scope Creep**: Phase 1 features may expand
2. **AI Costs**: OpenAI API usage may exceed budget
3. **Third-party Services**: Dependencies on external services
4. **Timeline**: 16-week timeline may be aggressive
5. **Data Quality**: Club and doctor data collection

## Communication Notes

- Project briefs are in Romanian (PROJECT_DESCRIPTION.md) and English (MVP_STARTER_BRIEF.md)
- Architecture is well-documented in MVP_STARTER_BRIEF.md
- Focus is on Phase 1 MVP (3 months / 16 weeks)
- Target market: Romania, starting with Bucharest

## Key Reminders

- **Next.js 16 Cache Components**: Dynamic by default, use `"use cache"` for cacheable content (must be async functions)
- **Dynamic Routes**: All dynamic routes MUST have `generateStaticParams()` returning at least one value
- **Route Segment Config**: DO NOT use `export const dynamic`, `export const revalidate` - removed in Cache Components
- **Async Params**: Always await params: `const { slug } = await params;` (Next.js 16)
- **Dynamic APIs**: Access `cookies()` or `headers()` at top of page components that need dynamic rendering
- **Language Requirement**: All user-facing content must be in Romanian
- **SEO Strategy**: Public routes use Romanian paths (`/cluburi`, `/doctori`, `/chestionar`) for SEO optimization
- **Routes**: Use `@/lib/routes` as single source of truth - never hardcode paths
- **TypeScript Imports**: Always use `@/` prefix for imports from `src/` directory
- **Component Organization**: Club components created in `components/features/clubs/` following adaptation strategy
- **Code Generation**: See `docs/ PROMPTING_RULES_FOR_CODEGEN.md` for comprehensive code generation guidelines
- **Architecture Reference**: See `docs/ARCHITECTURE_OVERVIEW.md` for complete architecture documentation
- **Brand Guidelines**: See `docs/BRAND_GUIDELINES.md` for visual identity, tone of voice, UX principles, and brand consistency guidelines
- **Components Guide**: See `docs/COMPONENTS_GUIDE.md` for component patterns, styling rules, and UI development guidelines
- **Copy Library**: See `docs/COPY_LIBRARY.md` for all user-facing text, CTAs, messages, and Romanian language copy
- **Copywriting Guide**: See `docs/COPYWRITING_GUIDE.md` for copywriting principles, brand voice guidelines, writing templates, and best practices
- **Design Tokens**: See `docs/DESIGN_TOKENS.md` for comprehensive design tokens reference (colors, typography, spacing, shadows, border radius, animations, breakpoints)
- **SEO Guidelines**: See `docs/SEO_GUIDELINES.md` for SEO strategy, slug generation, meta tags templates, Open Graph templates, and SEO best practices
- **Site Map**: See `docs/SITE_MAP.md` for complete application structure, all routes, user flows, and navigation patterns
- **Wireframes**: See `docs/WIREFRAMES.md` for detailed page structures, component placement, and layout specifications for all major pages
- **Legal Pages Plan**: See `docs/LEGAL_PAGES_DEVELOPMENT_PLAN.md` for comprehensive legal pages development plan, content templates, and implementation guidelines
- **Authentication Integration Plan**: See `docs/AUTH_INTEGRATION_PLAN.md` for complete authentication system integration details, Stack Auth setup, and Romanian localization guidelines
- **Stack Auth Server Migration**: See `docs/STACK_AUTH_SERVER_MIGRATION_PLAN.md` for migration plan and implementation details
- **Claude Guide**: See `CLAUDE.md` for comprehensive project guide, quick start, development commands, architecture patterns, troubleshooting, and quick reference
- **Phase 1 Focus**: Sports only, ages 4-14, Bucharest
- **No Payments**: Payment-enabled bookings in Phase 2
- **No Calendar**: Family calendar in Phase 2
- **Rule-based AI**: ML models in later phases
- **Verification Important**: Club verification builds trust
- **Medical Integration**: Specialists are key differentiator
- **Language Requirement**: ALL user-facing content must be in Romanian language only
- **Legal Pages**: All 4 legal pages complete (`/confidentialitate`, `/termeni`, `/cookies`, `/gdpr-parinti`) - Ready for legal review
