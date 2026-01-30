# Yuvoo - System Patterns & Architecture

## Architecture Overview

**Pattern**: Next.js 16 Monolithic App with Cache Components and Modular Backend Pattern
**Deployment**: Vercel (Frontend) + Neon (Database) + Cloudinary (Media)
**Timeline**: 16-week MVP development cycle
**Next.js Version**: 16.0.8 with Cache Components enabled ✅

## Core Architecture Principles

1. **Monolithic Next.js App**: Single codebase using Next.js App Router
2. **Server Actions First**: Primary backend logic via Next.js Server Actions
3. **Service Layer Pattern**: Business logic in `modules/` directory, separated from routes
4. **Type Safety**: Full TypeScript with Zod validation
5. **Component Modularity**: Feature-based component organization

## Directory Structure

```
yuvoo-nextjs/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Public marketing pages
│   ├── (public)/                # Public app pages (no auth)
│   │   ├── quiz/                # AI Coach Quiz flow
│   │   ├── clubs/               # Club discovery
│   │   └── doctors/             # Doctor profiles
│   ├── (auth)/                  # Protected parent routes
│   │   ├── dashboard/
│   │   ├── children/
│   │   ├── bookings/
│   │   └── settings/
│   ├── (club-portal)/           # Club admin portal
│   ├── (doctor-portal)/         # Doctor portal
│   ├── api/                     # API routes (webhooks, cron)
│   └── actions/                 # Server Actions (main backend)
│
├── components/
│   ├── ui/                      # Bootstrap wrapper components
│   ├── layout/                  # Header, Footer, Sidebar
│   ├── features/                # Feature-specific components
│   │   ├── clubs/               # Club components (✅ created)
│   │   └── doctors/             # Doctor components (✅ created)
│   ├── forms/                   # Reusable form components
│   └── shared/                  # Common components
│
├── lib/
│   ├── auth/                    # Stack Auth configuration
│   ├── db/                      # Drizzle ORM setup & schema
│   ├── validations/             # Zod schemas
│   ├── integrations/            # External services (OpenAI, Cloudinary, Brevo)
│   ├── utils/                    # Utility functions
│   └── routes.ts                # Single source of truth for all routes (SEO-friendly Romanian paths)
│
├── modules/                      # Backend Business Logic (Service Layer)
│   ├── auth/
│   ├── children/
│   ├── quiz/                     # AI Coach Quiz logic
│   │   ├── quiz.service.ts       # Quiz orchestration
│   │   ├── quiz.repository.ts    # Data access layer
│   │   ├── quiz.analyzer.ts      # AI analysis orchestration + risk detection + sport exclusion
│   │   ├── ai-recommendations.service.ts  # OpenAI integration (medical safety rules in prompt)
│   │   ├── ai-recommendations-cache.service.ts  # Response caching
│   │   ├── risk-signal-detection.service.ts  # Programmatic risk detection (cardiac, concussion, orthopedist, etc.)
│   │   ├── sport-exclusion.service.ts  # Sport exclusion by medical contraindications
│   │   ├── doctor-specialist-mapping.service.ts  # Specialist recommendations
│   │   ├── sport-club-mapping.service.ts  # Club recommendations
│   │   └── quiz.types.ts         # TypeScript types
│   ├── clubs/
│   ├── doctors/                     # Doctor directory logic
│   │   ├── doctors.service.ts      # Service layer (orchestration)
│   │   ├── doctors.repository.ts   # Data access layer (Drizzle queries)
│   │   ├── doctors.search.ts       # Search and filtering logic
│   │   ├── doctors.types.ts        # TypeScript types
│   │   └── README.md               # Module documentation
│   ├── bookings/
│   └── favorites/
│
├── types/                        # Global TypeScript types
└── styles/                       # Global styles (Bootstrap + SCSS)
```

## Reusable Component Patterns

### Sports Components (January 2025)

**Location**: `components/features/sports/`

**Components**:

- `SportsMain.tsx` - Main listing with category filtering (echipa, individual, combat, artistic, altul)
- `SportCard.tsx` - Card component with category badges, icon display, metadata (age range, club count)
- `SportDetailsMain.tsx` - Detail page with enhanced info display and CTA buttons
- `SportContentExpanded.tsx` - Expanded content component displaying comprehensive sport information (introduction, benefits, age recommendations, equipment guide, FAQ, internal links)

**Data Structure**:

- `src/data/sport-expanded-content.ts` - Comprehensive expanded content for top 10 sports
  - Interface: `SportExpandedContent` with introduction, benefits, ageRecommendations, equipmentGuide, faq, internalLinks
  - Helper functions: `getExpandedContentBySportId()`, `getExpandedContentBySlug()`
  - All 10 sports completed: Fotbal, Înot, Tenis, Baschet, Gimnastică artistică, Karate, Dans, Volei, Handbal, Judo
  - Each sport: 800-1200 words total, all content in Romanian for SEO

**Styling**:

- SCSS files: `_sports-main.scss`, `_sport-card.scss`, `_sport-details.scss`, `_sports-intro.scss`, `_sports-faq.scss`
- Expanded content styling in `_sport-details.scss`:
  - Benefits grid (2 columns on desktop, 1 on mobile)
  - Age recommendations section with gradient background
  - Equipment guide with essential/optional badges
  - FAQ accordion section
  - Internal links CTA section
- Category badges with color coding (echipa=blue, individual=green, combat=red, artistic=purple, altul=orange)
- Gradient backgrounds for icon areas (theme-2-light to theme-1)
- Hover effects with smooth transitions
- Responsive breakpoints for all screen sizes

**Features**:

- Category filtering with icons for each category
- Enhanced empty state with CTA button
- Results count with category context
- Expanded content automatically displays when available for a sport
- Memoized components for performance
- All content in Romanian, SEO-optimized
- Internal linking to clubs filtered by sport
- Systematic internal linking throughout all pages with contextual links

## Reusable Component Patterns

### Shared UI Components

**Location**: `src/components/shared/`

**Home Page Components** (Created January 2025):

- `SectionTitle.tsx` - Reusable section title component with title and optional subtitle
  - Used in: All home page sections (FeaturedSports, FeaturedClubs, FeaturedDoctors, HowItWorks, HomeTestimonial, HomeFaq), listing pages, detail pages
  - Features: Consistent styling, WOW.js animations, customizable classes, supports React.ReactNode for subtitle (enables internal linking)
- `ViewAllLink.tsx` - Reusable "View All" link component
  - Used in: Featured sections (clubs, doctors, sports)
  - Features: Consistent styling, hover effects, arrow icon
- `DistanceBadge.tsx` - Reusable distance/location badge component
  - Used in: Club cards, featured sections
  - Features: Dark/light variants, responsive sizing
- `StarRating.tsx` - Reusable star rating component
  - Used in: Testimonials, reviews, ratings
  - Features: Size variants (sm, md, lg), optional rating number display
- `AvatarInitials.tsx` - Reusable avatar with initials component
  - Used in: Testimonials, user profiles, comments
  - Features: Size variants (sm, md, lg), customizable colors
- `FaqAccordionItem.tsx` - Reusable FAQ accordion item component
  - Used in: FAQ sections, help pages, sports FAQ sections
  - Features: Bootstrap accordion integration, customizable open state, supports React.ReactNode for answers (enables internal linking)

**Dashboard Portal Components** (Created January 2025 - Phase 1, 2 & 3 Complete):

**Phase 1 Components** (High Priority):

- `DashboardHeader.tsx` - Reusable dashboard header component with title, subtitle, entity name, and verification badge
  - Used in: Club dashboard, doctor dashboard (planned)
  - Features: Variant support (club/doctor), configurable title/subtitle, verification badge integration
  - Wrapper: `ClubDashboardHeader.tsx` uses shared component
- `ProfileCompletenessIndicator.tsx` - Reusable profile completeness display component
  - Used in: Club dashboard, doctor dashboard (planned)
  - Features: Progress bar, missing fields list, configurable edit route, profile type support (club/doctor)
  - Moved from `src/components/features/clubs/` to shared location
- `StatisticsCards.tsx` - Generic statistics cards component
  - Used in: Club dashboard (booking statistics), doctor dashboard (consultation statistics - planned)
  - Features: Generic stats array, optional "View All" button, customizable CSS class prefix
  - Wrapper: `BookingStatistics.tsx` uses shared component
- `BookingCard.tsx` - Reusable booking/consultation card component
  - Used in: Club bookings list, doctor consultations list (planned)
  - Features: Supports both `club_trial` and `doctor_consultation` types, action buttons (confirm, cancel, complete, view details), status badges, date formatting
  - Wrapper: `ClubBookingCard.tsx` uses shared component
- `BookingDetailModal.tsx` - Reusable booking/consultation detail modal component
  - Used in: Club bookings list, doctor consultations list (planned)
  - Features: Bootstrap modal integration, optional child/parent information, action buttons, comprehensive booking details display
  - Wrapper: `ClubBookingDetailModal.tsx` uses shared component
- `DashboardPageLayout.tsx` - Reusable dashboard page layout wrapper
  - Used in: All club dashboard pages (profile, bookings, settings), all doctor dashboard pages (planned)
  - Features: Consistent header structure (icon, title, subtitle), content wrapper, variant-specific CSS classes
  - Updated all club dashboard pages to use shared layout

**Phase 2 Components & Patterns** (Medium Priority):

- `RecentActivityFeed.tsx` - Generic activity feed component with render props pattern
  - Used in: Club dashboard (recent bookings), doctor dashboard (recent consultations - planned)
  - Features: Custom item rendering via renderItem prop, automatic date sorting, empty states, optional "View All" button
  - Moved from `src/components/features/clubs/` to shared location
- `AccountSettingsForm.tsx` - Generic form component for account settings and email notifications
  - Used in: Club settings, doctor settings (planned)
  - Features: Configurable notification preferences via props, custom update handlers, loading callbacks, React Hook Form integration
  - `ClubSettingsForm` uses shared component as wrapper
- `useEntityFilters` hook (`src/hooks/useEntityFilters.ts`) - Generic filtering hook
  - Used in: Club booking list, doctor consultation list (planned)
  - Features: Status and date filtering, status counts for filter UI, optimized with useMemo
  - Updated `ClubBookingList` to use the hook

**Phase 3 Utilities** (Low Priority):

- `status-badges.ts` (`src/lib/utils/status-badges.ts`) - Status badge configuration utility
  - Used in: All booking/consultation components
  - Features: Centralized badge config (label, class, icon), supports Bootstrap and custom styles, Romanian labels
  - Functions: `getStatusBadgeConfig(status, style)` returns badge configuration
- `date-formatting.ts` (`src/lib/utils/date-formatting.ts`) - Date formatting utilities
  - Used in: All components displaying dates/times
  - Features: Romanian locale formatting, multiple format options (date, time, datetime, activity feed, date only)
  - Functions: `formatDate()`, `formatTime()`, `formatDateTime()`, `formatDateForActivityFeed()`, `formatDateOnly()`

**Component Extraction Pattern**: When implementing similar features across different portals (club vs doctor), extract shared components to:

- Avoid code duplication
- Ensure UI/UX consistency
- Reduce maintenance burden
- Enable faster feature development

**Status**: ✅ Phase 1 Complete (6 of 6 components), ✅ Phase 2 Complete (3 components/hooks), ✅ Phase 3.1 Complete (2 utilities) - All ready for doctor portal implementation

### Onboarding Form Components

**Location**: `src/components/features/onboarding/components/`

**Shared Components**:

- `FormField.tsx` - Reusable form field with label, input, error display
- `ServerErrorAlert.tsx` - Server-side error message display
- `InfoBox.tsx` - Information box with icon and variant support
- `FormSection.tsx` - Section wrapper for form groups

**File Upload Components** (Created from pattern recognition):

- `FileUploadArea.tsx` - Reusable file upload area with drag-and-drop styling
  - Used for: logo uploads, photo uploads, document uploads
  - Features: loading states, file type hints, max files tracking, Bootstrap styling
- `ImagePreview.tsx` - Reusable image preview with remove button
  - Used for: logo previews, photo previews, gallery image previews
  - Features: Next.js Image optimization, responsive sizing, remove functionality
- `DocumentPreview.tsx` - Reusable document preview with file icons
  - Used for: verification document previews
  - Features: file type icons (PDF, DOC, images), filename display, remove functionality

**Form Field Components** (Created from component extraction - December 2024):

- `CharacterCounterTextarea.tsx` - Textarea with character counter and min/max validation
  - Used for: bio fields, description fields with character limits
  - Features: real-time character count, validation feedback, Bootstrap styling
- `MultiSelectCheckboxField.tsx` - Multi-select with checkbox grid layout
  - Used for: age groups, experience levels, specialties, languages
  - Features: responsive grid layout, React Hook Form integration, error handling
- `TagInputField.tsx` - Tag input with quick-add buttons and custom input
  - Used for: credentials, languages, custom tags
  - Features: quick-add options, custom tag input, remove functionality, validation
- `SingleImageUploadField.tsx` - Single image upload with preview and delete
  - Used for: logo uploads, profile photo uploads
  - Features: Cloudinary integration, image preview, delete functionality, loading states
- `GalleryUploadField.tsx` - Multiple image uploads with grid preview
  - Used for: club gallery uploads, multiple photo uploads
  - Features: grid preview, sequential upload, min/max image limits, remove functionality
- `DocumentUploadField.tsx` - Document upload with file icons and preview
  - Used for: verification documents, file uploads
  - Features: file type icons, filename display, min/max document limits, remove functionality
- `RadioButtonGroupField.tsx` - Visual radio button group with icons/emojis
  - Used for: gender selection, single-choice options with visual feedback
  - Features: icon/emoji support, Bootstrap styling, React Hook Form integration
- `DatePickerWithAgeField.tsx` - Date picker with automatic age calculation
  - Used for: date of birth inputs with age display
  - Features: age calculation, age validation (4-14 years), Bootstrap date input styling

**Pattern Recognition Principle**: When the same UI pattern appears in multiple components, extract it into a reusable component to avoid duplication and ensure consistency. All extracted components follow consistent patterns:

- React Hook Form integration (register, control, setValue)
- Bootstrap 5.3.3 styling
- Romanian language labels and error messages
- Loading states and error handling
- TypeScript type safety with generics
- Accessibility (ARIA attributes, semantic HTML)

## Key Design Patterns

### 1. Server Actions Pattern

**Location**: `app/actions/`

Server Actions handle:

- Authentication checks
- Input validation (Zod)
- Service layer calls
- Database operations
- Cache revalidation
- Error handling

**Example Flow**:

```
Client Component → Server Action → Service → Repository → Database
                                      ↓
                                  Response → Client
```

### 2. Service Layer Pattern

**Location**: `modules/`

Each feature module contains:

- `*.service.ts` - Business logic
- `*.repository.ts` - Data access
- `*.types.ts` - TypeScript types
- Optional: `*.search.ts`, `*.analyzer.ts`, `*.notifications.ts`

**Benefits**:

- Separation of concerns
- Testability
- Reusability
- Clear business logic boundaries

### 3. Route Groups Pattern

Next.js route groups `(group-name)/` organize routes without affecting URL structure:

- `(marketing)/` - Public marketing pages
- `(public)/` - Public app features (quiz, clubs, doctors)
- `(auth)/` - Protected parent routes
- `(club-portal)/` - Club admin routes
- `(doctor-portal)/` - Doctor admin routes

### 3.1. SEO-Friendly Routing Strategy

**Location**: `lib/routes.ts` - Single source of truth for all routes

**Key Principle**: Public routes use Romanian language for SEO optimization, internal routes use English.

**Public SEO Routes** (Romanian, indexed by search engines):

- Sports: `/sporturi`, `/sporturi/:slug`
- Clubs: `/cluburi`, `/cluburi/:slug`, `/cluburi/categorie/:category`, `/cluburi/:slug/recenzii`, `/cluburi/locatie/:location` (location-specific landing pages)
- Doctors: `/doctori`, `/doctori/:slug`
- Quiz: `/chestionar`, `/chestionar/container`, `/chestionar/previzualizare`, `/chestionar/rezultate`
- Info: `/despre-noi`, `/parteneri`, `/intrebari-frecvente`, `/contact`, `/ajutor`
- Legal: `/confidentialitate`, `/termeni`, `/cookies`, `/gdpr-parinti`
- Search: `/cautare`

**Internal Routes** (English, not SEO-sensitive):

- Authentication: `/auth/login`, `/auth/register`, etc.
- Parent Dashboard: `/parent/dashboard`, `/parent/children`, etc.
- Club Portal: `/club/dashboard`, `/club/profile`, etc.
- Doctor Portal: `/doctor/dashboard`, `/doctor/profile`, etc.
- Admin: `/admin/dashboard`, etc.

**Legacy Routes**: Organized in `routes.legacy.*` for redirect mapping from old Kindedo routes.

**Usage**:

```tsx
import { routes } from "@/lib/routes";
<Link href={routes.clubs.list}>Cluburi</Link>
<Link href={routes.clubs.detail("fotbal-club-bucuresti")}>Detalii Club</Link>
```

**Helper Functions**:

- `buildUrl(path, params)` - Build URLs with query parameters
- `isProtectedRoute(path)` - Check if route requires authentication
- `getRouteGroup(path)` - Get route group (public, auth, club, doctor, admin, api)
- `isPublicSeoRoute(path)` - Check if route is a public SEO route

### 4. Component Organization

**Feature-Based Components**: `components/features/`

- Organized by feature (quiz, clubs, doctors, children, bookings)
- Self-contained with related sub-components
- Reusable across different pages

**Current Status**:

- ✅ `components/features/clubs/` - Club components created (ClubsMain, ClubDetailsMain, HomeClubArea, ClubCard, VerificationBadge, ClubSearchFilters, ClubDetailsWidget, ClubGallery, ClubMap, ClubSchedule, BookingForm, ClubContentExpanded, ClubDashboardHeader, ProfileCompletenessIndicator, BookingStatistics, RecentActivityFeed, ClubBookingList, ClubBookingCard, ClubBookingDetailModal, ClubNotFoundState, ClubProfileEditForm, ClubSettingsForm)
- ✅ `components/features/doctors/` - Doctor components created (DoctorsMain, DoctorCard, DoctorDetailsMain, DoctorSearchFilters, DoctorAppointmentForm, DoctorAppointmentFormSection, DoctorInfo, DoctorSpecialties, HomeDoctorArea, HomeTwoDoctorArea, DoctorAvailability, DoctorContentExpanded)
- ✅ `components/features/sports/` - Sport components complete (January 2025)
  - ✅ `SportsMain.tsx` - Main listing component with category filtering, enhanced empty state, and results display
  - ✅ `SportCard.tsx` - Redesigned card component with category badges, icon display, and hover effects
  - ✅ `SportDetailsMain.tsx` - Enhanced detail page component with improved info display and CTA buttons
  - ✅ SCSS files: `_sports-main.scss`, `_sport-card.scss`, `_sport-details.scss`, `_sports-intro.scss`, `_sports-faq.scss`
  - ✅ All components follow design system patterns with consistent styling, hover effects, and responsive breakpoints
- ✅ `components/features/quiz/` - Quiz components complete (QuizContainer, QuizProgress, QuizNavigation, QuizContext, QuestionWrapper, 6 question components, ResultsActions, SportRecommendationCard, QuizHistory)
- ✅ `components/features/home/` - Home page components complete (January 2025)
  - ✅ `HomeTrustSignals.tsx` - Trust signals section with 6 badges (verified clubs, GDPR, verified doctors, secure platform, free for parents, AI recommendations)
  - ✅ `HomeStats.tsx` - Statistics section with animated counters (families, clubs, doctors, sports)
  - ✅ `HowItWorks.tsx` - 3-step process explanation with Flaticon icons
  - ✅ `FeaturedSports.tsx` - Featured sports display with images, club counts, and descriptions
  - ✅ `FeaturedClubs.tsx` - Featured clubs display with verification badges, distance, and descriptions
  - ✅ `FeaturedDoctors.tsx` - Featured doctors display with verification badges and specialties
  - ✅ `HomeTestimonial.tsx` - Testimonial section with star ratings and avatar initials
  - ✅ `HomeFaq.tsx` - FAQ section with accordion items (shows top 6, links to full FAQ page)

**Layout Components**: `components/layout/`

- Header, Footer, Sidebar
- Shared across multiple route groups
- **Dashboard Shell System** ✅ (January 2025)
  - `DashboardShell.tsx` - Server component for dashboard layout with authentication and role verification
  - `DashboardShellClient.tsx` - Client component managing mobile menu state and interactivity
  - `DashboardSidebar.tsx` - Responsive sidebar navigation with role-specific items
  - `DashboardHeader.tsx` - Header with user profile dropdown and mobile hamburger button
    - Uses `useUser()` hook to check session before signOut (prevents TypeError)
    - Graceful error handling for sign out operations
  - `lib/dashboard-navigation.ts` - Centralized navigation configuration for all roles
  - Responsive design: Mobile menu with overlay, desktop sidebar, proper overflow control
  - All dashboard layouts (parent, club, doctor, admin) use DashboardShell
  - SCSS styling in `_dashboard.scss` with comprehensive responsive breakpoints

**UI Components**: `components/ui/`

- shadcn/ui base components
- Design system foundation

## Database Architecture

### ORM: Drizzle ORM

**Schema Location**: `lib/db/schema.ts`

### Core Tables

1. **users** - Parent, club admin, doctor, admin roles
2. **children** - Child profiles linked to parents
3. **quizzes** - Quiz answers and AI recommendations
4. **clubs** - Sports club information
5. **doctors** - Pediatric specialist profiles
6. **bookings** - Club trials and doctor consultations
7. **favorites** - Saved clubs and doctors
8. **reviews** - Club and doctor reviews (moderated)

### Key Relationships

```
users (1) ──→ (many) children
children (1) ──→ (many) quizzes
children (1) ──→ (many) bookings
clubs (1) ──→ (many) bookings
doctors (1) ──→ (many) bookings
users (1) ──→ (many) favorites (clubs/doctors)
```

### Indexing Strategy

- Email lookups: `users.email`
- Stack Auth ID: `users.stack_user_id`
- Club search: `clubs.sport_type + clubs.city`
- Location search: `clubs.latitude + clubs.longitude`
- Verification status: `clubs.verified`, `doctors.verified`
- Booking queries: `bookings.parent_id`, `bookings.scheduled_at`, `bookings.status`

## Authentication Pattern

### Stack Auth Integration ✅ COMPLETE - Server-Side Only

**Configuration**: `lib/auth/stack.ts` (server-side only)
**Session Management**: `lib/auth/session.ts`
**Server Actions**: `app/actions/auth.ts` (all authentication operations)
**Error Handling**: `lib/auth/errors.ts` (Romanian error messages)

**Server-Side Architecture**:

- **No Client Provider**: Removed StackProvider - authentication is fully server-side
- **Server Actions**: All authentication operations use Server Actions
  - `signInAction()` - Sign in with email/password
  - `signUpAction()` - Sign up with email/password
  - `forgotPasswordAction()` - Send password reset email
  - `resetPasswordAction()` - Reset password with token
  - `verifyEmailAction()` - Verify email with token
- **Forms**: Client components call Server Actions via `useTransition`
- **Email Confirmation**: Server component that calls Server Action directly

**Authentication Flow**:

1. User submits form → Client component calls Server Action
2. Server Action authenticates via Stack Auth (server-side)
3. Stack Auth manages session (server-side)
4. Server Actions check Stack Auth session via `lib/auth/session.ts`
5. Syncs with local `users` table (creates if needed)
6. Returns local user record

**Session Helper**:

```typescript
getSession() → { user: DBUser, stackUser: StackUser }
requireAuth() → throws if not authenticated
```

**Route Protection**:

- Layout-level: `app/(auth)/layout.tsx` checks session
- Server Actions: Use `requireAuth()` helper
- Middleware: Optional for additional protection

**Authentication Pages** (All completed with Romanian localization, using Server Actions):

- `/auth/login` - Sign in page
- `/auth/register` - Sign up page
- `/auth/forgot-password` - Password reset request
- `/auth/reset-password` - Password reset with token
- `/auth/email-confirmation` - Email verification
- `/auth/redirect` - Authentication redirect proxy (role-based redirects) ✅ (January 2025)
- `/handler/email-verification` - Email verification handler route (Stack Auth callbacks) ✅ (January 2025)

**Error Handling**:

- Centralized error message mapping in `lib/auth/errors.ts`
- All error messages in Romanian
- `getErrorMessage()` utility function extracts user-friendly messages from Stack Auth errors
- Forms display errors with consistent styling
- Server Actions return `{ success: boolean, error?: string, redirect?: string }` format
- Form inputs use Yuvoo-branded styling (checkboxes and radio buttons styled with Yuvoo primary color)
  - Checkboxes: `.yuvoo-checkbox-wrapper` and `.yuvoo-checkbox` classes override Bootstrap defaults
  - Radio buttons: `.yuvoo-radio-group`, `.yuvoo-radio-wrapper`, and `.yuvoo-radio` classes for card-style layout
  - All form inputs use Yuvoo primary turquoise (`#00BBAE`) instead of Bootstrap default blue

**Redirects** (handled by Server Actions and form components):

- **Role-Based Login Redirects** ✅ (January 2025)
  - Authentication redirect proxy (`/auth/redirect`) handles post-authentication redirects
  - **Helper Function**: `getRoleBasedRedirect()` in `src/lib/auth/redirects.ts` (centralized, reusable)
  - `signInAction` and redirect proxy use `getRoleBasedRedirect()` helper function
  - **Sign-In Flow**: Uses API route (`/api/auth/signin`) instead of client-side Stack Auth
    - Properly handles NEXT_REDIRECT errors (re-throws to let Next.js handle)
    - Returns 303 redirect to `/auth/redirect` on success
    - SignInForm detects redirects and navigates accordingly
  - Redirects based on user role and onboarding status:
    - Parent users → `/parent/dashboard` (or `/onboarding/parent/welcome` if incomplete)
    - Club admins → `/club/dashboard` (or `/onboarding/club/welcome` if incomplete)
    - Doctor users → `/doctor/dashboard` (or `/onboarding/doctor/welcome` if incomplete)
    - Admin users → `/admin/dashboard` (no onboarding required)
  - Stack Auth `afterSignIn` configured to use `/auth/redirect` proxy
  - Parent layout includes role-based protection (redirects non-parent users)
- Successful signup → Role-based redirect (via redirect proxy)
- Successful password reset → `/auth/login`
- Successful email verification → `/auth/login` (via email verification handler at `/handler/email-verification`)

**Benefits of Server-Side Architecture**:

- ✅ Better security (no client-side auth logic)
- ✅ Smaller client bundle (no Stack Auth client code)
- ✅ Better SEO (server-side rendering)
- ✅ Simpler architecture (Server Actions pattern)
- ✅ Better error handling (server-side validation)

## Onboarding Pattern

### Onboarding System Architecture

**Status**: ✅ Foundation Complete, ✅ Parent Onboarding Complete, ✅ Club Admin Onboarding Complete, ✅ Doctor Onboarding Complete (All 8 steps complete, pattern-aligned with club onboarding)

**localStorage Progress Saving** ✅ (January 2025):

- **Status**: ✅ **COMPLETE** - localStorage-based progress saving implemented for all onboarding flows
- **Implementation**:
  - ✅ `useOnboardingLocalStorage` hook created with save/get/clear functions
  - ✅ `useOnboardingForm` hook updated to accept role/stepNumber and clear localStorage on success
  - ✅ All 13 onboarding form components updated with localStorage integration
    - Doctor forms (7 steps): BasicInfo, BioExperience, LocationContact, Photo, Verification, Availability
    - Club admin forms (5 steps): BasicInfo, ContactSchedule, PricingAges, Photos, Verification
    - Parent forms (1 step): AddChild
  - ✅ Features: Debounced saves (500ms), automatic restore on mount, automatic clear on submission
  - ✅ Error handling: Graceful degradation (works even if localStorage disabled)
  - ✅ Storage key format: `yuvoo_onboarding_{role}_{stepNumber}`
- **Benefits**: Users can now refresh pages during onboarding without losing form data

**Location**:

- Server Actions: `app/actions/onboarding.ts`
- Validation: `lib/validations/onboarding.ts`, `lib/validations/child.ts`, `lib/validations/club.ts`, `lib/validations/doctor.ts`
- Database: `lib/db/schema.ts` (onboarding_progress table)

**Pattern**:

1. **Cross-Session State Management**: `onboarding_progress` table tracks user onboarding state across sessions
2. **Role-Based Flows**: Separate onboarding flows for parent (5 steps), club_admin (7 steps), doctor (8 steps)
3. **Progress Tracking**: Step-by-step progress with `completedSteps` array and `stepData` JSONB field
4. **Resume Functionality**: Automatic progress retrieval on page load
5. **Server Actions**: All onboarding operations via Server Actions with proper TypeScript types

**Onboarding Hooks**:

- `useOnboardingLocalStorage` (`src/components/features/onboarding/hooks/useOnboardingLocalStorage.ts`)
  - `saveFormData(role, stepNumber, data)` - Save form data to localStorage (debounced in components)
  - `getFormData<T>(role, stepNumber)` - Retrieve typed form data from localStorage
  - `clearFormData(role, stepNumber)` - Clear form data for a specific step
  - `clearAllOnboardingData(role)` - Clear all onboarding data for a role
  - Features: Error handling, browser compatibility checks, type-safe with TypeScript generics
- `useOnboardingForm<T>` (`src/components/features/onboarding/hooks/useOnboardingForm.ts`)
  - Shared hook for form submission logic
  - Accepts `role` and `stepNumber` parameters for localStorage integration
  - Automatically clears localStorage on successful submission
  - Returns: `handleSubmit`, `isLoading`, `serverError`, `setServerError`

**Key Server Actions**:

- `startOnboarding(role)` - Initialize onboarding flow
- `getOnboardingProgress()` - Retrieve current progress
- `updateOnboardingStep(stepNumber, stepData)` - Update current step
- `markStepComplete(stepNumber)` - Mark step as completed
- `saveStepData(key, value)` - Save step-specific data (JSONB)
- Role-specific actions: `addChildOnboarding()`, `createClubOnboarding()`, `createDoctorOnboarding()`

**Validation Strategy**:

- Zod schemas for each onboarding step
- Romanian error messages via `zodRomanianErrors`
- Type-safe input validation
- Separate schemas for child, club, and doctor profiles

**Database Schema**:

```typescript
onboarding_progress {
  id: string (UUID)
  userId: string (FK to users)
  role: "parent" | "club_admin" | "doctor"
  currentStep: number
  totalSteps: number
  completedSteps: number[] (array of completed step numbers)
  stepData: JSONB (flexible step-specific data)
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
}
```

**Implementation Status**:

- ✅ Middleware and routing (onboarding protection, route structure) - Complete
- ✅ Base UI components (OnboardingLayout, OnboardingProgress, OnboardingNavigation) - Complete
- ✅ Parent onboarding UI (welcome, add child, platform tour, quiz CTA) - Complete
- ✅ Club admin onboarding UI - Complete
  - ✅ Welcome, Basic Info, Contact & Schedule, Pricing & Ages, Photo Upload, Verification, Completion
- ✅ Doctor onboarding UI - Complete
  - ✅ Welcome, Basic Info, Bio & Experience, Location & Contact, Photo Upload, Verification, Availability, Completion (All 8 steps complete)
  - ✅ Pattern Alignment Complete (January 2025): All pages updated to match club onboarding structural pattern
    - ✅ Consistent CSS classes (`bd-onboarding-page`, `bd-onboarding-page-header`, `bd-onboarding-page-content`)
    - ✅ Bootstrap utility classes instead of inline styles
    - ✅ Welcome page uses `bd-onboarding-welcome-benefits` and `bd-onboarding-welcome-time` classes
    - ✅ Upload pages use `bd-onboarding-page-wide` for wider layout
    - ✅ Complete page uses `bd-onboarding-complete` wrapper
    - ✅ Layout includes production build check to prevent prerender errors
- ✅ localStorage Progress Saving Complete (January 2025)
  - ✅ All onboarding forms persist user input across page refreshes
  - ✅ Automatic save on form changes (debounced 500ms)
  - ✅ Automatic restore on component mount
  - ✅ Automatic clear on successful submission
  - ✅ Error handling with graceful degradation

## AI Integration Pattern

### OpenAI Integration

**Location**: `modules/quiz/ai-recommendations.service.ts` (AI service), `modules/quiz/quiz.analyzer.ts` (orchestration)

**Pattern**:

1. Collect quiz answers
2. Build structured prompt (Romanian)
3. Call OpenAI with system prompt (pediatric sports specialist persona)
4. Parse JSON response
5. Validate and normalize recommendations
6. Store recommendations in database
7. Fallback to generic recommendations if AI fails

**AI Model**: GPT-4 Turbo (Phase 1)
**Response Format**: Structured JSON with recommendations array
**Language Requirement**: System prompts must explicitly instruct AI to generate all content (recommendations, explanations, reasoning) in Romanian language only.

**Error Handling**:

- Retry logic with timeout (30 seconds)
- Fallback to age-based generic recommendations
- Romanian error messages for all failure scenarios

**Service Flow**:

```
Quiz Submission → quiz.service.ts → quiz.analyzer.ts → ai-recommendations.service.ts → OpenAI API
                                                                                        ↓
                                                                              Fallback (if error)
```

**Specialist Recommendations**:

The AI also detects risk signals and recommends pediatric specialists when needed:

- **Orthopedist**: Physical limitations, coordination issues, posture problems
- **Nutritionist**: Weight concerns, dietary needs, performance nutrition
- **Psychologist**: Social anxiety, motivation issues, behavioral concerns
- **General Pediatrician**: General health concerns, energy level issues

**Specialist Recommendation Flow**:

```
Quiz Answers → AI Analysis → Risk Signal Detection → Specialist Recommendation
                                                                      ↓
                                                          doctor-specialist-mapping.service.ts
                                                                      ↓
                                                          Find matching doctors by specialty
```

**Storage**: Specialist recommendations are stored alongside sport recommendations in the quiz results JSONB field.

**Risk Signal Detection**:

The system includes programmatic risk signal detection (`risk-signal-detection.service.ts`) that analyzes quiz answers independently of AI to identify risk signals:

- **Cardiac Risks** (highest priority): Critical health screening (cardiac symptoms, family history), cardiac keywords in physical considerations → cardiologist
- **Concussion/Neurologist Risks**: Critical health screening (recent/multiple concussion), injury details (concussion + timing), concussion keywords → neurologist
- **Orthopedist Risks**: Coordination challenges, joint pain severity, physical considerations (pain, joints, posture), injury details (growth-plate, fracture, etc.), orthopedic health conditions
- **Pulmonologist Risks**: Asthma severity (severe/moderate)
- **Nutritionist Risks**: Weight-related conditions, nutrition-related health conditions, dietary restrictions
- **Psychologist Risks**: Anxiety-related personality traits, psychological reasons for stopping sports, mental health conditions
- **General Pediatrician Risks**: Very low energy, multiple health conditions, young age with concerns

**Medical Safety (Phase 1)** – See `docs/MEDICAL_SAFETY.md`: Critical health screening (step 5), sport exclusion service (`sport-exclusion.service.ts`), severity levels (asthma, joint pain), injury follow-up, AI prompt absolute contraindications and age minimums. Programmatic exclusions filter AI recommendations before display; fallback (e.g. Înot) when all excluded.

**Detection Flow**:

```
Quiz Answers → detectRiskSignals() → Risk Signals → riskSignalsToSpecialistRecommendation()
                                                                      ↓
                                                          Specialist Recommendation
```

**Integration**: Programmatic risk detection runs first and takes precedence over AI-generated specialist recommendations for reliability and consistency. Sport exclusion runs after AI recommendations and filters out contraindicated sports.

**Future**: ML models for improved matching

## Quiz Integration Pattern

### Quiz-Club Integration

**Location**: `modules/quiz/sport-club-mapping.service.ts`

**Pattern**:

1. Extract sport IDs from quiz recommendations
2. Filter clubs by recommended sports
3. Optionally filter by location (parent's city)
4. Rank clubs by recommendation match score
5. Display with recommended badges

### Quiz-Doctor Integration

**Location**: `modules/quiz/doctor-specialist-mapping.service.ts`

**Pattern**:

1. Extract specialist recommendation from quiz results
2. Search doctors by specialty using `searchDoctors()`
3. Prioritize verified doctors and those accepting new patients
4. Optionally filter by city for location-based recommendations
5. Return top N recommended doctors (default: 5)

**Functions**:

- `getRecommendedDoctors()` - Finds doctors matching specialist recommendation
- `getSpecialtyDisplayName()` - Romanian display names for specialties
- `getPriorityDisplayName()` - Romanian display names for priority levels

**Service Functions**:

- `getClubsForRecommendations()` - Main filtering function
- `getRecommendedSportIds()` - Extract sport IDs
- `isClubRecommended()` - Check club match
- `rankClubsByRecommendations()` - Sort by match score

**Club Listing Integration**:

- Query params: `?sport={sportId}&quiz=true&city={city}`
- Banner: Shows quiz context when `quiz=true`
- Badges: "Recomandat" badge on matching clubs
- Filtering: Pre-filters clubs by recommended sport

**Usage Flow**:

```
Quiz Results → "Vezi cluburi" button → /cluburi?sport={sportId}&quiz=true
                                                      ↓
                                    Club Page filters by sport
                                                      ↓
                                    Shows recommended badge
```

**Quiz report – LocalClubsSection** (`components/features/quiz/report/LocalClubsSection.tsx`): "Caută cluburi" links include location filters. For Bucharest, sector is extracted from location (e.g. "Sector 1, București" → `sectorId` via `getSectorIdByName`); `countyId` from `quizResult.countyId` or `getCountyIdByCityId(cityId)` (`lib/db/location-helpers.ts`). Link params: `countyId`, `cityId`, `sectorId` when available.

**Club detail – ClubClaimProfile** (`components/features/clubs/ClubClaimProfile.tsx`): In-flow section at bottom of club detail (not sticky/fixed). Single responsive card (max-width 420px); "Revendică profilul" CTA. Renders only for unverified clubs.

### Quiz History Pattern

**Location**: `components/features/quiz/QuizHistory.tsx`

**Pattern**:

1. Display list of completed quizzes
2. Show date, recommended sports, match scores
3. Link to view full results
4. Option to retake quiz
5. Empty state with CTA

**Integration Points**:

- Parent Dashboard: Shows recent quiz activity
- Child Profile: Shows all quizzes for specific child
- Quick Stats: Quiz count, recommendations count

**Data Flow**:

```
Parent Dashboard → getQuizHistoryAction(childId) → Quiz Repository
                                                          ↓
                                                    Quiz History Component
```

### Quiz Authentication Pattern

**Location**: `app/actions/quiz.ts`, `modules/quiz/quiz.service.ts`

**Pattern**:

1. Quiz submission works for both authenticated and unauthenticated users
2. For unauthenticated users: Creates temporary child record with anonymous parent
3. For authenticated users: Uses selected child or creates temporary if needed
4. Placeholder child IDs are handled before validation

**Temporary Child Creation**:

- Uses quiz answers (age, gender) to populate basic info
- Creates or reuses anonymous system user (`anonymous@yuvoo.local`)
- Generic child name: "Copil Temporar"
- Date of birth calculated from age (January 1st of birth year)

**Quiz results email – child display**: Emails avoid showing "Copil Temporar"; prefer `childDisplayName` from quiz answers (user-typed name); fallback "copilul tău". `quiz.email.ts` fetches quiz answers and passes `childDisplayName` to Brevo; `QuizResultsEmail` accepts optional `childDisplayName` and treats "Copil Temporar" as placeholder.

**Payment already completed**: When user opens paywall for an already-paid quiz, `createPaymentAction` returns `reportAccessToken` (from existing payment's report access); client redirects to `routes.quiz.report(accessToken)`. Fallback: `redirectToResults` + `quizId` → `routes.quiz.paymentSuccess(quizId)`. See `app/actions/payments.ts`, `PaymentFormWrapper.tsx`, `PaymentForm.tsx`.

**Validation Flow**:

1. Check if childId is placeholder (`"placeholder-child-id"` or empty)
2. Validate answers separately (without childId UUID requirement)
3. Create temporary child if placeholder detected
4. Validate childId as UUID only if not a placeholder
5. Submit quiz with real childId

**Rate Limiting**:

- Location: `lib/rate-limit.ts`
- In-memory rate limiting (MVP-ready, can migrate to Redis for production)
- Per-user (authenticated) or per-IP (anonymous) limiting
- Default: 3 quiz submissions per hour
- Prevents abuse and controls OpenAI API costs

### Quiz UX/UI Patterns

**Location**: `components/features/quiz/`

**Key Patterns**:

1. **Progress Indicator**:
   - Badge showing "Pasul X din 6" with contextual encouragement
   - Animated Bootstrap progress bar (progress-bar-striped, progress-bar-animated)
   - Progress percentage displayed prominently
   - Mobile-responsive design

2. **Question Wrapper Pattern**:
   - Consistent layout for all questions
   - Title with required indicator (\*)
   - Description box with left border accent (alert-light border-primary)
   - Help text with info icon (shown after error if present)
   - **Error Display Pattern**:
     - Errors positioned immediately after question content (before help text) for maximum visibility
     - Enhanced styling: 5px solid left border (var(--bd-danger)), light red background (#fff5f5)
     - Larger warning icon (fs-3) with text-danger color
     - FadeIn animation (0.3s ease-in) with translateY(-10px) for smooth appearance
     - Improved text hierarchy: fs-6 for error title, explicit text-danger classes
     - Stronger shadows (shadow-sm for question errors, shadow-lg for submit errors)
     - Consistent alert-danger styling with flex layout for icon and message

3. **Validation Pattern**:
   - Step-specific validation in QuizContext
   - Inline error messages in Romanian
   - Errors clear automatically when user corrects input
   - Validation runs before allowing next step
   - Specific, actionable error messages
   - **Error Visibility & Positioning**:
     - Smart scroll behavior: scrolls to error message when validation fails
     - Prioritizes scrolling to error alert if visible, then question content
     - 150ms delay for smooth animation
     - Errors appear with fadeIn animation for better user attention
     - Inline validation feedback: AgeQuestion uses invalid-feedback with icon
     - PreferencesQuestion uses alert-danger styling for inline validation errors
     - Submit errors use same enhanced styling for consistency

4. **Navigation Pattern**:
   - Back button (disabled on first step)
   - Continue button with keyboard hint "(Enter)" on desktop
   - Submit button: "Vezi recomandările" (not "Finalizează")
   - Loading states with spinners
   - Disabled states during submission

5. **Keyboard Navigation**:
   - Enter key to proceed to next step or submit
   - Smart handling: doesn't interfere with custom input fields
   - Auto-focus first input when moving to next question
   - 100ms delay to ensure DOM is ready

6. **Input Validation Pattern**:
   - Age input: Prevents invalid values (negative, decimals, out-of-range)
   - Clears invalid input on blur
   - aria-invalid attribute for accessibility
   - Step attribute set to 1 to prevent decimals

7. **Mobile-First Design**:
   - Responsive button sizes (btn-lg)
   - Better touch targets
   - Improved spacing on small screens
   - Progress indicator adapts to screen size
   - Navigation buttons stack properly on mobile

**Question Components**:

- All 6 question components use React.memo for performance
- Consistent styling with Bootstrap utilities
- Parent-friendly Romanian language throughout
- Contextual explanations for why each question matters
- Visual feedback for selections (check icons, color changes)

### Authentication Redirect Pattern

**Location**: `app/(auth)/login/page.tsx`, `app/actions/auth.ts`

**Pattern**:

1. Login page reads `redirect` or `returnUrl` query parameter
2. Passes redirect URL through component chain (page → LoginMain → SignInForm → signInAction)
3. Validates redirect URL (must start with `/`) to prevent open redirect vulnerabilities
4. Redirects to provided URL after successful login, or defaults to dashboard

**Security**:

- Only allows relative URLs (starting with `/`)
- Prevents open redirect attacks
- Validates URL format before redirect

### Server-Side Authentication Pattern (Public Routes)

**Location**: `app/(public)/chestionar/rezultate/[id]/page.tsx`, `components/features/quiz/ResultsActions.tsx`

**Pattern**:

1. Public routes don't have StackProvider context
2. Authentication check performed server-side using `getSession()`
3. Auth status passed as prop to client components
4. Avoids StackProvider dependency issues

**Implementation**:

- Server Component: Checks auth using `getSession()` (server-side only)
- Client Component: Receives `isAuthenticated` prop (no hooks needed)
- Follows server-first authentication pattern

## Payment Flow Patterns

### Guest Payment Flow (No Authentication Required)

**Location**: `app/(public)/cereri/[leadId]/plata-guest/`, `app/actions/guest-lead-payments.ts`, `modules/payments/lead-payment.service.ts`

**Pattern**: Public payment flow for clubs without user accounts to pay for lead access

**Flow**:

1. **Public Page** (`/cereri/[leadId]/plata-guest`)
   - Server Component with public cache (`"use cache"`)
   - No authentication required
   - Fetches lead and club information
   - Checks for expired/paid leads (shows appropriate messages)
   - Renders `GuestLeadPayment` component

2. **Email Collection** (Client Component)
   - Guest enters email address (required)
   - Server Action validates email (Zod schema)
   - Rate limiting: 5 attempts per hour per IP/email
   - Creates Stripe Payment Intent with guest metadata
   - Returns client secret for Stripe Elements

3. **Payment Form** (Client Component with Stripe Elements)
   - Conditional StripeProvider rendering (only when clientSecret available)
   - Stripe Elements integration for secure payment
   - Payment submission via Stripe Elements
   - Redirects to success page on completion

4. **Success Page** (`/cereri/[leadId]/plata-guest/success`)
   - Validates payment intent ID from URL params
   - Fetches parent contact information via Server Action
   - Displays parent contact details
   - Email also sent (dual delivery)

5. **Webhook Processing** (`/api/payments/webhook`)
   - Detects guest payments via `isGuestPayment` metadata
   - Routes to `processGuestLeadPayment()` for guest payments
   - Sends email with parent information
   - Unlocks lead (accepts lead with payment info)
   - Tracks completion in PostHog

**Security Measures**:

- Rate limiting: 5 attempts per hour per IP/email combination
- IP address tracking for fraud prevention
- Email validation (Zod schema)
- Lead expiration check
- Duplicate payment prevention
- Payment token/session validation for success page

**Database Schema**:

- `lead_payments` table includes:
  - `isGuestPayment` boolean (default false)
  - `guestEmail` text (nullable, only for guest payments)

**Key Components**:

- `GuestLeadPayment.tsx` - Payment form component
- `createGuestLeadPaymentAction()` - Server Action for payment intent creation
- `getGuestPaymentSuccessData()` - Server Action for success page data
- `createGuestLeadPaymentIntent()` - Service function for Stripe integration
- `processGuestLeadPayment()` - Service function for webhook processing
- `sendGuestPaymentSuccessEmail()` - Email service function

**PostHog Tracking**:

- `LEAD_PAYMENT_INITIATED` with `isGuestPayment: true`, `clientIp`, `rateLimitRemaining`
- `LEAD_PAYMENT_COMPLETED` with `isGuestPayment` flag
- `PAYMENT_FAILED` with guest payment context

**Error Handling**:

- All error messages in Romanian
- Expired lead: Checked before payment intent creation
- Duplicate payment: Checked before payment intent creation
- Invalid email: Zod validation with Romanian error messages
- Rate limiting: Romanian error message with reset time
- Payment failure: Webhook handles and updates status
- Invalid payment intent: Success page validates before displaying data

## Search & Filtering Pattern

### Club Search

**Location**: `modules/clubs/clubs.search.ts`

**Filter Types**:

- Sport type (exact match)
- City (exact match)
- Age range (min/max)
- Verification status (boolean)
- Trial availability (boolean)
- Location radius (PostGIS geography)
- Text search (name, description - ILIKE)

**Ordering**:

1. Featured clubs first
2. Rating (descending)
3. Verification status

### Doctor Search

**Location**: `modules/doctors/doctors.search.ts`

**Filter Types**:

- Specialty (exact match: orthopedist, nutritionist, psychologist, general)
- City (exact match)
- District (exact match, optional)
- Verified status (boolean)
- Accepting new patients (boolean)
- Online consultations (boolean)
- Text search (name, bio, credentials)

**Ordering**:

1. Verified doctors first
2. Accepting new patients
3. Name (alphabetical)

**Component Integration**:

- `DoctorSearchFilters.tsx` - Filter UI with URL state management
- `DoctorsMain.tsx` - Displays search results with empty state
- `DoctorCard.tsx` - Shows verification badge, specialty, location, credentials
- `DoctorDetailsMain.tsx` - Full profile with specialties, info, availability
- `DoctorAvailability.tsx` - Schedule display with availability indicators

**Filter Features**:

- Specialty dropdown with Romanian labels
- City dropdown (20 major Romanian cities)
- District/Sector text input
- Verified checkbox filter
- Accepting new patients checkbox
- Online consultations checkbox
- Sort dropdown (name, specialty, verified)
- URL query parameter synchronization
- Active filter count and clear all functionality

## File Upload Pattern

### Cloudinary Integration

**Status**: ✅ Implemented

**Location**: `lib/integrations/cloudinary/`

**Implementation**:

- Client configuration (`client.ts`) - Cloudinary SDK setup
- Upload utilities (`upload.ts`) - File validation, base64 conversion, upload, deletion
- Server Actions (`app/actions/uploads.ts`) - `uploadImageAction`, `deleteImageAction`

**Use Cases**:

- Club logos and photos (✅ implemented in Club Admin Onboarding)
- Club verification documents (✅ implemented - PDF, DOC, DOCX, JPG, PNG)
- Doctor profile photos
- Child avatars

**Features**:

- Image uploads: File validation (JPG, PNG, WebP, max 5MB)
- Document uploads: File validation (PDF, DOC, DOCX, JPG, PNG, max 10MB)
- Base64 conversion for server-side upload
- Folder organization (`yuvoo/clubs/logos`, `yuvoo/clubs/gallery`, `yuvoo/clubs/verification`, `yuvoo/clubs/documents`)
- Resource type handling (images vs raw files)
- Image/document deletion with public ID extraction (handles both resource types)
- Romanian error messages
- Authentication checks in server actions

**Flow**:

1. Client component handles file selection and preview
2. File uploaded via `uploadImageAction` or `uploadDocumentAction` Server Action
3. Server Action validates file (type, size)
4. Server Action converts to base64 and uploads to Cloudinary
5. Cloudinary returns secure URL
6. URL saved to database (club.logoUrl, club.galleryUrls, club.verificationDocuments)
7. Files can be deleted via `deleteImageAction` or `deleteDocumentAction` Server Action

**Pattern**:

```typescript
// Upload
const formData = new FormData();
formData.append("file", file);
formData.append("folder", "yuvoo/clubs/logos");
const result = await uploadImageAction(formData);

// Delete
await deleteImageAction(imageUrl);
```

**Flow**:

1. Client uploads to Server Action
2. Server Action uploads to Cloudinary
3. Returns Cloudinary URL
4. Store URL in database

## Email Notification Pattern

### Brevo Integration

**Location**: `lib/integrations/brevo/`

**Status**: ✅ Email Templates Complete - Production Ready

**Email Types** (All Implemented):

- ✅ Booking confirmations - Sent automatically on booking creation
- ✅ Booking cancellations - Sent automatically on booking cancellation
- ✅ Booking reminders - Ready for cron job integration (24h before scheduled time)
- ✅ Quiz results - Sent automatically after quiz submission
- ✅ Welcome emails - Ready for registration flow integration
- ✅ Club verification status - Ready for admin workflow integration
- ✅ Doctor verification status - Ready for admin workflow integration

**Templates**: `lib/integrations/brevo/templates.ts`

**Template Features**:

- Responsive HTML design (mobile-friendly)
- Bootstrap-based styling (consistent with platform)
- Yuvoo branding (gradient header, brand colors)
- Romanian language content throughout
- Plain text fallback versions
- Personalized greetings (user's first name)
- Clear call-to-action buttons
- Footer with contact info

**Email Service**: `lib/integrations/brevo/email.service.ts`

- High-level functions for each email type
- Email validation before sending
- Non-blocking error handling (failures don't affect core operations)
- Retry logic with exponential backoff

**Integration Points**:

- Booking emails: Automatically sent in `bookings.service.ts`
- Quiz emails: Automatically sent in `app/actions/quiz.ts`
- Welcome emails: Ready for `signUpAction` integration
- Verification emails: Ready for admin verification workflow

### React Email Integration (Phase 1 Complete - January 2025)

**Location**: `emails/` directory

**Status**: ✅ Phase 1 Complete - Infrastructure ready, base components created, unsubscribe system implemented

**Purpose**: Component-based email templates using React Email library for better maintainability and developer experience.

**Architecture**:

1. **Base Email Components** (`emails/components/`):
   - `EmailLayout.tsx` - Base email wrapper with Yuvoo branding
   - `EmailHeader.tsx` - Yuvoo-branded header (primary color #00BBAE)
   - `EmailFooter.tsx` - Footer with GDPR info, unsubscribe links (token-based)
   - `EmailSection.tsx` - Reusable section wrapper
   - All components follow Yuvoo brand guidelines (colors, typography)
   - All content in Romanian

2. **Email Utilities** (`emails/utils/`):
   - `render-email.ts` - Functions to render React Email components to HTML/text strings
   - `email-types.ts` - TypeScript types and brand color constants
   - Ready for integration with Brevo service

3. **Email Unsubscription System**:
   - Unsubscribe page (`/dezabonare`) with form-based unsubscription
   - Token-based unsubscription (secure, one-click from emails)
   - Email token utilities (`src/lib/utils/email-tokens.ts`)
   - PostHog tracking for unsubscribe events

4. **Email Preferences Management**:
   - Preferences page (`/parent/email-preferences`)
   - Granular control over email types (quiz results, club updates, newsletter, etc.)
   - PostHog tracking for preference updates

**Preview Server**:

- Configured on port 3001
- Command: `npm run email:dev`
- Enables live preview of email templates during development

**Integration Pattern**:

- React Email components render to HTML strings
- HTML strings passed to Brevo service for sending
- Maintains existing Brevo integration (no breaking changes)

**Next Steps**:

- Phase 2: Create quiz results email template
- Phase 3: Integrate React Email with Brevo service
- Phase 4: Create reusable email components (SportCard, ClubPreview, etc.)

## Caching Strategy

### Next.js 16 Cache Components ✅ COMPLETE

**Migration Status**: ✅ **COMPLETE** (January 2025 - P0-4)

- **All Legacy Patterns Removed**: All `export const dynamic`, `export const revalidate`, `unstable_noStore()` removed from codebase
- **Public Cache Pages Migrated**: Home page (`/`), sports listing (`/sporturi`), club detail (`/cluburi/[slug]`), doctor detail (`/doctori/[slug]`)
  - All use `"use cache"` directive with `cacheLife("hours")` for 1-hour cache
  - All use `cacheTag()` for tag-based revalidation
- **Private Cache Pages Migrated**: Parent dashboard (`/parent/dashboard`)
  - Uses `"use cache: private"` with `cacheLife("minutes")` for 5-minute cache
  - User-specific cache tags for per-user invalidation
- **Server Actions Updated**: All Server Actions updated to use `revalidateTag(tag, "max")` for cache invalidation
  - Clubs actions: Invalidates `club-{id}`, `club-slug-{slug}`, `clubs-list`, `home-featured-clubs`
  - Doctors actions: Invalidates `doctor-{id}`, `doctor-slug-{slug}`, `doctors-list`, `home-featured-doctors`
  - Children/Settings/Quiz actions: Invalidates `user-{userId}`, `parent-dashboard-{userId}`
- **Cache Tags System**: Comprehensive tag system implemented
  - Entity-specific: `club-{id}`, `doctor-{id}`, `user-{id}`
  - Slug-based: `club-slug-{slug}`, `doctor-slug-{slug}`
  - List-based: `clubs-list`, `doctors-list`, `sports-list`
  - Home page sections: `home-featured-clubs`, `home-featured-doctors`, `home-featured-sports`
  - User-specific: `user-{userId}`, `parent-dashboard-{userId}`
- **Documentation**: `docs/CACHING_STRATEGY.md` created with complete caching strategy, patterns, and best practices

**Paradigm Shift**: Dynamic by default, opt-in to caching with `"use cache"`

**Caching Patterns**:

1. **Public Cache** (`"use cache"`):
   - For content same for all users
   - Use `cacheLife()` for time-based revalidation (e.g., `cacheLife("hours")` for 1-hour cache)
   - Use `cacheTag()` for on-demand revalidation
   - Example: Home page, sports listing, club/doctor detail pages

2. **Private Cache** (`"use cache: private"`):
   - For user-specific prefetchable content
   - Can access cookies/params at runtime
   - Prefetched with actual runtime values
   - Use `cacheLife("minutes")` for shorter cache duration (e.g., 5 minutes)
   - Example: Parent dashboard

3. **Dynamic Content** (default):
   - Use `<Suspense>` boundaries for dynamic content
   - Access `cookies()`, `headers()`, `params` for dynamic rendering
   - Example: Protected pages, pages with searchParams (clubs/doctors listing)

**Route Segment Config** (Removed):

- ❌ `export const dynamic` - Removed, use dynamic APIs or `"use cache"`
- ❌ `export const revalidate` - Removed, use `cacheLife()` instead
- ❌ `export const fetchCache` - Removed, use `"use cache"` instead

**Dynamic Routes**:

- All dynamic routes MUST have `generateStaticParams()` returning at least one value
- Required for Cache Components compatibility
- All 8 dynamic routes have `generateStaticParams()` implemented ✅

**Revalidation Strategy**:

- **Time-based**: `cacheLife("hours")` for public pages, `cacheLife("minutes")` for private pages
- **Tag-based**: `revalidateTag(tag, "max")` in Server Actions for on-demand invalidation
  - After quiz submission: `revalidateTag("user-{userId}", "max")` and `revalidateTag("parent-dashboard-{userId}", "max")`
  - After booking creation/cancellation: `revalidatePath()` (still supported)
  - After profile updates: `revalidateTag("user-{userId}", "max")` and `revalidateTag("parent-dashboard-{userId}", "max")`
  - After favorite toggles: `revalidatePath()` (still supported)
  - After club/doctor updates: `revalidateTag("club-{id}", "max")`, `revalidateTag("clubs-list", "max")`, `revalidateTag("home-featured-clubs", "max")`

## Error Handling Pattern

### Server Actions

**Standard Response Format**:

```typescript
{
  success: boolean,
  data?: T,
  error?: string
}
```

**Error Flow**:

1. Try-catch in Server Action
2. Log error
3. Return error response
4. Client displays user-friendly message

### Validation

**Zod Schemas**: `lib/validations/`

- All user input validated
- Type-safe parsing
- Clear error messages

## Existing Components (Kindedo Theme)

### Component Adaptation Strategy

**Starting Point**: Kindedo template provides rich component library that can be adapted for Yuvoo.

**Key Adaptations**:

1. **Class → Club**:
   - Location: `src/components/Class/` → `src/components/features/clubs/`
   - Status: ✅ Core components created
   - Components created:
     - `ClubsMain.tsx` - Club listing page (adapted from `Class/ClassesMain.tsx`)
     - `ClubDetailsMain.tsx` - Club detail page (adapted from `Class/ClassDetailsMain.tsx`)
     - `HomeClubArea.tsx` - Homepage club section (adapted from `Class/HomeClassArea.tsx`)
     - `ClubCard.tsx` - Reusable club card component
     - `ClubSearchFilters.tsx` - Search and filter UI
     - `ClubDetailsWidget.tsx`, `ClubDetailsWidgetTwo.tsx` - Sidebar widgets
     - `ClubGallery.tsx` - Photo gallery
     - `ClubMap.tsx` - Location map
     - `ClubSchedule.tsx` - Training schedule
     - `BookingForm.tsx`, `BookingFormSection.tsx` - Booking forms
     - `VerificationBadge.tsx` - Multi-status verification badge

**Doctor Components** (✅ Created - January 2025): - `DoctorsMain.tsx` - Doctor listing page (adapted from `Teacher/TeachersMain.tsx`) - `DoctorDetailsMain.tsx` - Doctor detail page (adapted from `Teacher/TeacherDetailsMain.tsx`) - `DoctorCard.tsx` - Reusable doctor card component with variants (listing, default, compact, featured) - `DoctorSearchFilters.tsx` - Search and filter UI component (new component, follows ClubSearchFilters pattern) - `DoctorInfo.tsx` - Professional information display (adapted from `Teacher/TeacherInfo.tsx`) - `DoctorSpecialties.tsx` - Medical specialties display (adapted from `Teacher/TeacherSkills.tsx`) - `HomeDoctorArea.tsx` - Homepage doctor section with Swiper slider (adapted from `Teacher/HomeTeacherArea.tsx`) - `HomeTwoDoctorArea.tsx` - Alternative homepage section (adapted from `Teacher/HomeTwoTeacherArea.tsx`) - `DoctorAvailability.tsx` - Availability calendar (adapted from `Teacher/TeacherTimeTable.tsx`)

- Features added:
  - ✅ Verification badge display
  - ✅ Medical specialty information (orthopedist, nutritionist, psychologist, general)
  - ✅ Professional credentials display
  - ✅ Location display (city, district, address)
  - ✅ Contact information (email, phone, website)
  - ✅ Availability calendar with schedule display
  - ✅ Online consultations indicator
  - ✅ Accepting new patients indicator
  - ✅ Search and filtering (specialty, city, district, verified, accepting new patients, online consultations)
  - ✅ URL-based filter state (filters persist in URL query params)
  - ✅ SEO-friendly routes (`/doctori`, `/doctori/:slug`)
- SCSS Styling: All doctor component classes added to `_teacher.scss`
  - `bd-doctor-card` with variants (default, compact, featured, listing)
  - `bd-doctor-thumb`, `bd-doctor-badge`, `bd-doctor-content`
  - `bd-doctor-title`, `bd-doctor-specialty`, `bd-doctor-description`, `bd-doctor-meta`
  - `bd-doctor-filters-*` classes for search filters component
  - `bd-featured-doctor-*` classes for featured doctor cards
  - Extended `bd-teacher-credentials` and `bd-teacher-location` classes
- Type Updates: Added `acceptingNewPatients` and `onlineConsultations` fields to Doctor interface
- Data: `teacher-data.ts` → `doctor-data.ts` (📋 Planned - using database schema instead)

2. **Teacher → Doctor**:
   - Location: `src/components/Teacher/` → `src/components/features/doctors/`
   - Status: ✅ Core components created
   - Components created:
     - `DoctorsMain.tsx` - Doctor listing page (adapted from `Teacher/TeachersMain.tsx`)
     - `DoctorDetailsMain.tsx` - Doctor detail page (adapted from `Teacher/TeacherDetailsMain.tsx`)
     - `DoctorCard.tsx` - Reusable doctor card component with variants
     - `DoctorInfo.tsx` - Professional information display (adapted from `Teacher/TeacherInfo.tsx`)
     - `DoctorSpecialties.tsx` - Medical specialties display (adapted from `Teacher/TeacherSkills.tsx`)
     - `HomeDoctorArea.tsx` - Homepage doctor section with Swiper (adapted from `Teacher/HomeTeacherArea.tsx`)
     - `HomeTwoDoctorArea.tsx` - Alternative homepage section (adapted from `Teacher/HomeTwoTeacherArea.tsx`)
     - `DoctorAvailability.tsx` - Availability calendar (adapted from `Teacher/TeacherTimeTable.tsx`)
   - Features added:
     - ✅ Verification badge display
     - ✅ Medical specialty information (orthopedist, nutritionist, psychologist, general)
     - ✅ Professional credentials display
     - ✅ Location display (city, district, address)
     - ✅ Contact information (email, phone, website)
     - ✅ Availability calendar with schedule display
     - ✅ Online consultations indicator
     - ✅ Accepting new patients indicator
     - ✅ Specialty translation to Romanian
     - ✅ SEO-friendly routes (`/doctori`, `/doctori/:slug`)
   - SCSS Styling: All doctor component classes added to `_teacher.scss`
     - `bd-doctor-card` with variants (default, compact, featured, listing)
     - `bd-doctor-thumb`, `bd-doctor-badge`, `bd-doctor-content`
     - `bd-doctor-title`, `bd-doctor-specialty`, `bd-doctor-description`, `bd-doctor-meta`
     - `bd-featured-doctor-*` classes for featured doctor cards
     - Extended `bd-teacher-credentials` and `bd-teacher-location` classes
   - Type Updates: Added `acceptingNewPatients` and `onlineConsultations` fields to Doctor interface
   - Data: `teacher-data.ts` → `doctor-data.ts` (📋 Planned - using database schema instead)

3. **About Page Components** (✅ Complete - January 2025):
   - Location: `src/components/features/about/`
   - Status: ✅ All components created and styled
   - Components created:
     - `AboutMain.tsx` - Main About page component with mission, value propositions, how it works, and CTA sections
     - `AboutTeam.tsx` - Team members display component (4 team members)
     - `AboutPartners.tsx` - Partners display component organized by category (6 partners)
   - Features:
     - ✅ Trust signals section (reuses `HomeTrustSignals` component)
     - ✅ Statistics section (reuses `HomeStats` component)
     - ✅ Team section with 4 members (Founder & CEO, Co-founder & CTO, Medical Advisor, Head of Partnerships)
     - ✅ Partners section with 6 partners organized by category (Medical, Sports, Technology, Education)
     - ✅ Value propositions cards (AI Coach Quiz, Cluburi Verificate, Rețea de Specialiști)
     - ✅ How It Works section with 3 steps (styled step numbers with primary brand color)
     - ✅ CTA section with Yuvoo button structure
     - ✅ All sections follow Yuvoo design system
   - Data files:
     - ✅ `src/data/team-data.ts` - Team member data (name, role, bio, credentials, social links)
     - ✅ `src/data/partners-data.ts` - Partner data (name, type, category, description, logo, website)
   - SCSS Styling: `layout/_about.scss` - Comprehensive styling for all About page components
     - `bd-about-*` classes for hero, mission, value propositions, how it works, CTA sections
     - `bd-about-team-*` classes for team cards, thumbnails, social links
     - `bd-about-partners-*` classes for partner cards, categories, logos
     - `bd-about-step-*` classes for how it works steps with numbered badges
     - All styles responsive with proper breakpoints
     - Hover effects and animations following Yuvoo patterns
   - Design System Compliance:
     - ✅ Uses `SectionTitle` component for section headers
     - ✅ Uses Yuvoo button structure (`bd-btn`, `bd-btn-inner`, etc.)
     - ✅ Uses Font Awesome icons (`fa-solid`) instead of Bootstrap icons
     - ✅ Uses theme background utilities (`theme-bg-6`, `theme-bg-7`)
     - ✅ Uses primary brand color (`var(--bd-theme-1)`) for step numbers
     - ✅ All content in Romanian, SEO-optimized

4. **Program → Sport**:
   - Location: `src/components/Program/`
   - Adapt: Program listings → Sport recommendations
   - Add: AI recommendation display, match scores
   - Data: `program-data.ts` → `sport-data.ts`

**Reusable Components** (no adaptation needed):

- `HeroArea/` - Landing page heroes
- `Banner/` - Promotional banners
- `Testimonial/` - Parent feedback
- `Gallery/` - Photo galleries
- `FAQ/` - Frequently asked questions
- `Contact/` - Contact forms
- `Auth/` - Login, Register, Forgot Password
- `Common/` - Breadcrumb, Pagination, Preloader, etc. `PaginationData` shows max 4 visible page buttons (sliding window around current page; `MAX_VISIBLE_PAGES = 4`).

**Layout Components** (adapt branding only):

- `Header/` - Multiple variants (HeaderOne-Four)
- `Footer/` - Multiple variants (FooterOne-Three)
- `Wrapper/` - Page wrapper

**Components to Remove** (Phase 1):

- `Shop/` - Not needed in Phase 1
- `News/` - Optional, can be repurposed for blog

### Styling Pattern (Current)

**Bootstrap + SCSS**:

- Bootstrap 5.3.3 grid and utilities
- SCSS for custom styling
- Component-specific SCSS files
- Global styles in `globals.scss`

**Animation Pattern**:

```tsx
className="wow fadeInUp"
data-wow-duration="1s"
data-wow-delay=".3s"
```

**Button Pattern**:

```tsx
<Link href="/" className="bd-btn">
  <span className="bd-btn-inner">
    <span className="bd-btn-normal">Text</span>
    <span className="bd-btn-hover">Text</span>
  </span>
</Link>
```

**Styling Strategy**: All components use Bootstrap 5.3.3 with custom Yuvoo-branded utilities.

### Yuvoo Brand Color Utilities

**Bootstrap Utility Classes**: Use Yuvoo-specific color utilities via Bootstrap Utility API:

✅ **Available Utilities**:

- `bg-yuvoo-primary`, `text-yuvoo-primary`, `border-yuvoo-primary`
- `bg-yuvoo-secondary`, `text-yuvoo-secondary`, `border-yuvoo-secondary`
- `bg-yuvoo-accent`, `text-yuvoo-accent`, `border-yuvoo-accent`
- `bg-yuvoo-primary-light`, `bg-yuvoo-secondary-light`
- Hover states: `bg-yuvoo-primary-hover`, `text-yuvoo-primary-hover`
- Focus states: `focus-yuvoo-primary`, `focus-yuvoo-secondary`

**Location**: `public/assets/scss/utils/_yuvoo-utilities.scss`

**Rationale**:

- Directly maps to existing CSS variables (`--bd-theme-1`, `--bd-theme-2`, etc.)
- Consistent with Bootstrap utility naming conventions
- Better semantic meaning in code
- Easier to identify brand-specific styling

## Component Patterns

### Server Components vs Client Components

**Default Rule**: Server Components by default, Client Components only when needed.

**All App Router pages** (`app/**/page.tsx`) are Server Components by default - no `'use client'` directive needed.

### When to Use Client Components (`'use client'`)

Use Client Components when you need:

1. **Interactivity & Event Handlers**
   - `onClick`, `onChange`, `onSubmit` handlers
   - User interactions (buttons, forms, modals)
   - Example: `ThemeChanger.tsx` (theme toggle button)

2. **React Hooks**
   - `useState`, `useEffect`, `useRef`, `useContext`
   - Custom hooks that use browser APIs
   - Example: `TypedText.tsx` (uses useEffect for Typed.js)

3. **Browser APIs**
   - `localStorage`, `sessionStorage`
   - `window`, `document` objects
   - `navigator`, `location`
   - Example: `ThemeChanger.tsx` (localStorage for theme)

4. **Third-Party Client Libraries**
   - Swiper (carousels/sliders)
   - Typed.js (typing animations)
   - React Hook Form (form validation)
   - Example: `HomeClassArea.tsx` (Swiper carousel)

5. **State Management**
   - Redux (`useSelector`, `useDispatch`)
   - Context API (`useContext`)
   - Example: `CartMain.tsx` (Redux for cart state)

6. **Context Providers**
   - Custom context providers
   - Example: `GlobalVideoModal.tsx` (VideoProvider context)

### When to Use Server Components (Default)

Use Server Components for:

1. **Data Fetching**
   - Direct database queries
   - API calls (no client-side exposure)
   - Example: Club listing page fetching from database

2. **Static Content**
   - Content that doesn't change
   - SEO-important text
   - Example: About page content

3. **Server-Only Code**
   - File system access
   - Environment variables (server-side)
   - Example: Reading config files

### Current Pattern (Kindedo Theme)

**Analysis of 35 Client Components**:

- ✅ **Forms** (8 components): `ContactForm`, `SignInForm`, `SignUpForm`, `ForgotForm` - Need `react-hook-form` and form state
- ✅ **Shop/Cart** (5 components): `CartMain`, `ShopMain`, `CheckoutMain`, `WishlistMain`, `ShopDetailsMain` - Need Redux state
- ✅ **Sliders/Carousels** (10+ components): `HomeClassArea`, `ProgramSlider`, `HomeBlogArea` - Need Swiper library
- ✅ **Interactive UI** (5 components): `ThemeChanger`, `TypedText`, `GlobalVideoModal`, `CountdownSection` - Need browser APIs/hooks
- ✅ **Gallery** (2 components): `GalleryMain`, `HomeTwoGalleryArea` - Need photo viewer interactions
- ✅ **Blog/News** (5 components): `BlogMain`, `BlogDetailsMain` - May use Swiper or interactive features

**Conclusion**: All current Client Components are correctly marked - they all require client-side interactivity.

### Future Pattern (Yuvoo)

**Migration Strategy**:

1. **New Components**: Start as Server Components, add `'use client'` only when needed
2. **Data Fetching**: Use Server Actions + Server Components (no Redux for data)
3. **Forms**: Keep as Client Components (React Hook Form) but submit to Server Actions
4. **State**:
   - Server state → Server Components + Server Actions
   - Client state → Client Components with `useState` or Context
   - Global state → Consider removing Redux, use Server Actions + React Context

**Pattern Decision Tree**:

```
Does component need interactivity?
  → Yes → Client Component
  → No → Does it fetch data?
    → Yes → Server Component
    → No → Server Component (default)
```

### Best Practices

1. **Minimize Client Components**: Only mark as `'use client'` when absolutely necessary
2. **Composition**: Use Server Components as containers, Client Components for interactive parts
3. **Bundle Size**: Client Components increase JavaScript bundle - keep them small
4. **Hydration**: Client Components hydrate on client - minimize to improve performance
5. **Props**: Server Components can pass data to Client Components (serializable props only)

### Form Handling

**Pattern**: React Hook Form + Server Actions

1. Client: React Hook Form for validation
2. Submit: Server Action handles server-side validation
3. Response: Success/error feedback

## Testing Strategy (Future)

**Unit Tests**: `tests/unit/modules/`

- Service layer logic
- Utility functions

**Integration Tests**: `tests/integration/actions/`

- Server Action flows
- Database operations

**E2E Tests**: `tests/e2e/flows/`

- Complete user journeys
- Quiz flow
- Booking flow

## Deployment Pattern

### Vercel Deployment

**Configuration**: `vercel.json`

- Build command
- Environment variables
- Region: `fra1` (Frankfurt)

**Environment Variables**:

- Database URL (Neon)
- Stack Auth keys
- OpenAI API key
- Cloudinary credentials
- Brevo API key

### Database Migrations

**Tool**: Drizzle Kit
**Commands**:

- `db:generate` - Generate migration
- `db:push` - Push schema changes
- `db:migrate` - Run migrations
- `db:studio` - Open Drizzle Studio

## Security Patterns

1. **Authentication**: Stack Auth handles all auth (server-side only, no client-side provider)
   - Standardized pattern: Use `requireAuth()` and `requireRole()` from `@/modules/auth/auth.service`
   - `AuthUser` type includes: `id`, `email`, `name`, `firstName`, `lastName`, `phone`, `role`, `emailVerified`, `createdAt`, `updatedAt`
   - Optional auth: Use `getSession()` from `@/lib/auth/session` when authentication is optional
   - Edge cases: Expired tokens return `null` gracefully, concurrent sessions supported, invalid tokens rejected
   - Token management: Stack Auth handles token lifecycle automatically (creation, validation, expiration, refresh)

2. **Authorization**: Role-based (parent, club_admin, doctor, admin)
   - **UserRoleEnum**: Single source of truth for all user roles (`src/modules/auth/auth.types.ts`) ✅ (January 2025)
     - Enum values: `PARENT`, `CLUB_ADMIN`, `DOCTOR`, `ADMIN`
     - All role comparisons and switch statements use `UserRoleEnum` for type safety
     - Backward compatible with `UserRole` type
   - All mutation actions require authentication
   - Role checks via `requireRole(role)` for admin actions
   - Resource ownership verification in service layer before allowing updates/deletes
   - Club/Doctor management: Actions require correct role and ownership verification

3. **Input Validation**: Zod schemas for all inputs (server-side validation in Server Actions)
   - Location: `src/lib/validations/`
   - All error messages in Romanian
   - Centralized schemas for consistency
   - All Server Actions use Zod validation

4. **SQL Injection Prevention**: Drizzle ORM parameterized queries
   - All queries use Drizzle ORM with automatic parameterization
   - No raw SQL queries or string concatenation
   - Fixed vulnerability in `saveStepData` function (key validation added)
   - Audit report: `docs/SQL_INJECTION_PREVENTION_AUDIT.md`

5. **CSRF Protection**: Next.js built-in protection + explicit middleware
   - Server Actions: Automatic CSRF protection (POST-only, origin validation, SameSite cookies)
   - All 13 Server Actions have `"use server"` directive
   - Middleware: HTTP-to-HTTPS redirects in production (`src/proxy.ts`)
   - API routes: CORS utility created for future cross-origin needs (`src/lib/security/cors.ts`)
   - Audit report: `docs/CSRF_PROTECTION_AUDIT.md`

6. **Environment Variable Security**: No hardcoded secrets
   - All API keys, tokens, credentials use environment variables
   - Proper .gitignore configuration (all `.env*` files excluded)
   - Cloudinary validation added
   - Audit report: `docs/ENVIRONMENT_VARIABLE_SECURITY_AUDIT.md`

7. **HTTPS Enforcement**: Vercel automatic + explicit middleware
   - Vercel automatically enforces HTTPS (SSL certificates, HTTP redirects, HSTS headers)
   - Middleware: Explicit HTTP-to-HTTPS redirects in production
   - All external resources use HTTPS (Cloudinary, PostHog, APIs, Database)
   - HTTP only allowed for localhost development
   - Audit report: `docs/HTTPS_ENFORCEMENT_AUDIT.md`

8. **CORS Configuration**: Same-origin by default
   - All API routes are same-origin only (most secure)
   - CORS utility created for future API routes that need cross-origin access
   - Proper origin validation, method/header restrictions, preflight handling
   - Audit report: `docs/CORS_CONFIGURATION_AUDIT.md`

9. **Cookie Security**: Secure by default
   - Stack Auth cookies: `httpOnly: true`, `secure: true` (production), `sameSite: 'lax'`
   - Custom consent cookies: Enhanced with `secure` flag for production, `sameSite: 'lax'`
   - All cookies use `SameSite=Lax` for CSRF protection
   - Audit report: `docs/COOKIE_SECURITY_AUDIT.md`

10. **XSS Protection**: React automatic escaping
    - React automatically escapes user input
    - No manual escaping needed in React components

11. **File Uploads**: Cloudinary handles storage and CDN
    - Validated file types and sizes
    - Secure storage and CDN delivery

12. **Server Actions**: All authentication operations are server-side only
    - Better security (no client-side auth logic)
    - Smaller client bundle

13. **Rate Limiting**: In-memory rate limiting for abuse prevention
    - Location: `src/lib/rate-limit.ts`
    - Applied to: auth actions (sign in, sign up, password reset), uploads, bookings, search actions
    - Configurable limits per action type (e.g., 5 sign-in attempts per 15 minutes)

14. **Ownership Verification**: Service layer verifies resource ownership
    - Children: `child.parentId === userId`
    - Clubs: `club.adminUserId === userId`
    - Doctors: `doctor.userId === userId`
    - Uploads: `upload.userId === userId` (via uploads tracking table)
    - Service functions: `verifyClubOwnership()`, `verifyDoctorOwnership()`, etc.

15. **Audit Logging**: Complete audit trail for admin actions
    - Table: `audit_logs` tracks all admin verification actions
    - Tracks: userId, action, entityType, entityId, oldValue, newValue, metadata, IP address, user agent, timestamp
    - Service: `modules/audit/audit.service.ts` with `logVerificationStatusChange()` and `logAdminAction()`
    - Non-blocking: Audit logging failures don't affect main operations

16. **Authentication Edge Cases**: Properly handled
    - Expired tokens: Return `null` gracefully, redirect to login
    - Concurrent sessions: Supported securely (Stack Auth feature)
    - Invalid tokens: Rejected properly with appropriate error messages
    - Token refresh: Automatic (Stack Auth handles)
    - Comprehensive error handling with Romanian messages
    - Audit report: `docs/AUTHENTICATION_EDGE_CASES_AUDIT.md`

## Performance Patterns

1. **Cache Components**: Explicit caching with `"use cache"` for cacheable content
2. **Static Shells**: Cached components create static shells for instant loading
3. **Server Components**: Default (reduces client bundle)
4. **Image Optimization**: Cloudinary + Next.js Image (see Image Optimization Pattern above)
5. **Database Indexing**: Comprehensive indexes on all tables for common query patterns (see Performance Optimization Pattern above)
6. **Query Result Caching**: In-memory cache with TTL for database queries (see Performance Optimization Pattern above)
7. **React Component Optimization**: Memoization utilities and patterns (see Performance Optimization Pattern above)
8. **Caching**: Cache Components with time-based and tag-based revalidation
9. **Code Splitting**: Automatic via Next.js

## Admin Verification Pattern

**Location**: `src/app/admin/verifications/`, `src/app/actions/verifications.ts`, `src/components/features/admin/VerificationRequestCard.tsx`

**Purpose**: Admin workflow for reviewing and approving/rejecting club and doctor verification requests.

**Status**: ✅ **COMPLETE** - Full admin verification workflow implemented

**Architecture**:

1. **Admin Page** (`/admin/verifications`):
   - Server Component with admin role check
   - Fetches pending and in-review verification requests
   - Displays statistics dashboard
   - Lists clubs and doctors separately

2. **Verification Request Cards**:
   - Client Component for interactive actions
   - Displays entity information (name, location, sport/specialty)
   - Shows verification documents with download links
   - Action buttons: Approve, Reject (with reason), Set in Review
   - Loading states and error handling

3. **Server Actions**:
   - `updateClubVerificationStatusAction()` - Update club verification
   - `updateDoctorVerificationStatusAction()` - Update doctor verification
   - Admin role required (enforced via `requireRole("admin")`)
   - Zod validation for input
   - Email notifications on status changes
   - Cache revalidation

4. **Repository Functions**:
   - `getClubsByVerificationStatus(status)` - Get clubs by status
   - `getClubsPendingVerification()` - Get pending/in_review clubs
   - `getDoctorsByVerificationStatus(status)` - Get doctors by status
   - `getDoctorsPendingVerification()` - Get pending/in_review doctors

**Verification Workflow**:

1. Club/Doctor submits documents during onboarding
2. Status set to "in_review" automatically
3. Admin views requests at `/admin/verifications`
4. Admin reviews documents and entity information
5. Admin approves/rejects with optional reason
6. Email notification sent to club admin/doctor
7. Status updated in database
8. Cache revalidated

**Status Values**:

- `pending` - Initial state, no documents submitted
- `in_review` - Documents submitted, admin reviewing
- `approved` - Verified and approved
- `rejected` - Rejected, needs resubmission

**Email Notifications**:

- Sent automatically on status changes
- Includes status update and optional rejection reason
- Uses existing Brevo email templates
- Non-blocking (failures don't affect verification updates)

**Security**:

- Admin role required (enforced server-side)
- Input validation with Zod
- Type-safe operations
- Error handling with Romanian messages

**Files**:

- `src/app/admin/verifications/page.tsx` - Admin verification page
- `src/app/actions/verifications.ts` - Verification server actions

## Quiz Referral Flow Pattern

**Purpose**: Display recommended doctors and clubs directly from quiz results, enabling seamless discovery and booking.

**Architecture**:

```
Quiz Results Page
  ↓
SpecialistRecommendationCard (if specialist recommendation exists)
  ↓
getRecommendedDoctorsAction() → doctorsSearch.search()
  ↓
DoctorCard (compact variant)
  ↓
Doctor Directory (pre-filtered by specialty)

Quiz Results Page
  ↓
SportRecommendationCard (for each sport recommendation)
  ↓
getRecommendedClubsAction() → clubsSearch.search()
  ↓
ClubCard (compact variant)
  ↓
Club Directory (pre-filtered by sport)
```

**Components**:

- `SpecialistRecommendationCard` - Displays specialist recommendation with interactive doctor discovery
- `SportRecommendationCard` - Enhanced with interactive club discovery
- `DoctorCard` - Reusable doctor card (compact variant for recommendations)
- `ClubCard` - Reusable club card (compact variant for recommendations)

**Server Actions**:

- `getRecommendedDoctorsAction(specialty, city?, limit?)` - Get recommended doctors by specialty
- `getRecommendedClubsAction(sportId, city?, limit?)` - Get recommended clubs by sport

**Features**:

- **On-Demand Loading**: Recommendations load only when user clicks "View Recommended" button
- **Filtering**: Only verified entities, accepting new patients (doctors), prioritized results
- **Limit**: Maximum 5 recommendations per entity type
- **Navigation**: Links to full directories with pre-applied filters
- **Empty States**: Graceful handling when no recommendations found
- **Loading States**: Spinner and disabled state during data fetching

## Contact Form Pattern

**Location**: `src/components/features/contact/ContactForm.tsx`, `src/app/actions/contact.ts`, `src/lib/validations/contact.ts`, `src/lib/integrations/brevo/email.service.ts`, `src/lib/integrations/brevo/templates.ts`

**Purpose**: Contact form submission with dual email notifications (team notification + user confirmation).

**Status**: ✅ **COMPLETE** - Full contact form system implemented with email notifications

**Architecture**:

1. **Client Component** (`ContactForm.tsx`):
   - React Hook Form for form state management
   - Romanian validation messages
   - Loading states during submission
   - Success/error message display
   - Form reset on successful submission
   - Disabled submit button during submission

2. **Server Action** (`app/actions/contact.ts`):
   - Zod validation using `contactFormSchema`
   - Sends dual emails non-blocking (team notification + user confirmation)
   - Error handling with Romanian error messages
   - Returns success/error response

3. **Validation Schema** (`lib/validations/contact.ts`):
   - `contactFormSchema` with Romanian validation messages
   - Validates: firstName (2-100 chars), email (valid email format), phone (Romanian format: +40XXXXXXXXX or 0XXXXXXXXX), subject (3-200 chars), message (10-2000 chars), privacy (required checkbox)

4. **Email Templates** (`lib/integrations/brevo/templates.ts`):
   - `contactFormTemplate()` - Email sent to Yuvoo team with user's message
     - Includes all contact details (name, email, phone, subject, message)
     - Reply-to set to user's email for direct replies
     - Responsive HTML design with Yuvoo branding
   - `contactFormConfirmationTemplate()` - Confirmation email sent to user
     - Confirms message was received
     - Sets expectation (24-48 hour response time)
     - Includes contact information for urgent inquiries

5. **Email Service Functions** (`lib/integrations/brevo/email.service.ts`):
   - `sendContactFormSubmission()` - Sends email to Yuvoo team
     - Uses `CONTACT_EMAIL` env var or falls back to `BREVO_SENDER_EMAIL`
     - Sets reply-to to user's email
     - Non-blocking (errors logged but don't fail form submission)
   - `sendContactFormConfirmation()` - Sends confirmation to user
     - Sent to user's email address
     - Non-blocking (errors logged but don't fail form submission)

**Key Features**:

- ✅ Dual email notifications (team receives message, user receives confirmation)
- ✅ Non-blocking email sending (failures logged but don't block form submission)
- ✅ Loading states and user feedback (success/error messages)
- ✅ Form reset on successful submission
- ✅ Romanian validation messages throughout
- ✅ Email templates with Yuvoo branding
- ✅ Reply-to set to user's email for team notification

**Files**:

- `src/components/features/contact/ContactForm.tsx` - Contact form component
- `src/app/actions/contact.ts` - Contact form server action
- `src/lib/validations/contact.ts` - Contact form validation schema
- `src/lib/integrations/brevo/templates.ts` - Email templates (contact form templates)
- `src/lib/integrations/brevo/email.service.ts` - Email service functions

### Internal Linking Pattern (January 2025)

**Purpose**: Systematic internal linking across all pages for improved SEO, user navigation, and site structure.

**Location**: Implemented throughout all public pages and components.

**Components Supporting Internal Linking**:

- `SectionTitle.tsx` - Enhanced to support `React.ReactNode` for subtitle prop (enables linking in subtitles)
  - Handles both string and React.ReactNode types for subtitle
  - Used in: Home page sections, listing pages, detail pages, About page, Contact page
- `FaqAccordionItem.tsx` - Enhanced to support `React.ReactNode` for answer prop (enables linking in FAQ answers)
  - Handles both string and React.ReactNode types for answer
  - Used in: FAQ page, Home FAQ, Sports FAQ
- `FAQPageSchema.tsx` - Enhanced to extract plain text from React.ReactNode answers for schema compatibility
  - Includes `extractTextFromNode()` helper function to convert React nodes to plain text
  - Ensures FAQPage schema works correctly with React.ReactNode answers

**Data Files with Internal Links**:

- `src/data/faq-data.tsx` - FAQ data with React.ReactNode answers containing internal links
  - All 26 FAQ items enhanced with contextual links to relevant pages
  - Links to: quiz intro, clubs list, doctors list, sports list, register, privacy, GDPR, contact, help
- `src/data/sports-faq-data.tsx` - Sports-specific FAQ data with React.ReactNode answers
  - 6 sports FAQ items enhanced with contextual links
  - Links to: quiz intro, clubs list, sports list

**Implementation Strategy**:

1. **Contextual Links in Content**: Links are placed contextually in content text where relevant pages are mentioned
   - Example: "Folosește [chestionarul AI](/chestionar) pentru recomandări personalizate"
   - Links use descriptive anchor text (not generic "click here")

2. **Intro Sections on Listing Pages**: Added intro sections to Sports, Clubs, and Doctors listing pages
   - Provide context and include relevant internal links
   - Link to related services (quiz, other listing pages)

3. **Home Page Component Subtitles**: Enhanced subtitles in FeaturedSports, FeaturedClubs, FeaturedDoctors, HowItWorks
   - Include internal links to related pages for better navigation

4. **Related Links Sections**: Added "Related Links" sections where appropriate
   - Contact page includes section linking to FAQ, Help, and About pages

5. **Route Consistency**: All links use routes from `@/lib/routes` for consistency
   - Ensures single source of truth for URLs
   - Makes refactoring easier

**SEO Benefits**:

- Improved crawlability: Search engines can discover and index all pages
- Better site structure: Clear hierarchy and relationships between pages
- Enhanced user experience: Users can easily navigate to related content
- Keyword relevance: Anchor text reinforces keyword associations
- Page authority distribution: Internal links help distribute page authority

**Files Modified**:

- `src/components/shared/SectionTitle.tsx` - Added React.ReactNode support
- `src/components/shared/FaqAccordionItem.tsx` - Added React.ReactNode support
- `src/components/SEO/FAQPageSchema.tsx` - Added text extraction from React nodes
- `src/components/SEO/ItemListSchema.tsx` - ItemList schema component for listing pages (supports Club, Doctor, Sport types)
- `src/data/faq-data.tsx` - Enhanced with internal links (renamed from .ts to .tsx)
- `src/data/sports-faq-data.tsx` - Enhanced with internal links (renamed from .ts to .tsx)
- `src/lib/utils/location.ts` - Location utilities (slug generation, parsing, display names)
- `src/app/(public)/cluburi/locatie/[location]/page.tsx` - Location-specific landing pages for clubs
- `src/components/features/about/AboutMain.tsx` - Added internal links
- `src/app/(public)/contact/page.tsx` - Added related links section
- `src/components/Contact/ContactFormMain.tsx` - Added links in subtitle
- `src/app/(public)/ajutor/page.tsx` - Enhanced with internal links
- `src/app/(public)/sporturi/page.tsx` - Added intro section with links
- `src/app/(public)/cluburi/page.tsx` - Added intro section with links
- `src/app/(public)/doctori/page.tsx` - Added intro section with links
- `src/components/features/home/FeaturedSports.tsx` - Enhanced subtitle with links
- `src/components/features/home/FeaturedClubs.tsx` - Enhanced subtitle with links
- `src/components/features/home/FeaturedDoctors.tsx` - Enhanced subtitle with links
- `src/components/features/home/HowItWorks.tsx` - Enhanced with internal links
- `src/components/features/quiz/QuizIntroContent.tsx` - Added links to benefits section
- `public/assets/scss/layout/_contact.scss` - Added styles for related links section

**Key Features**:

- ✅ All links use descriptive anchor text in Romanian
- ✅ Links are contextually placed in content where relevant
- ✅ All links use routes from `@/lib/routes` for consistency
- ✅ Components support React.ReactNode for flexible linking
- ✅ FAQPageSchema extracts plain text for schema compatibility
- ✅ Comprehensive coverage across all public pages
- ✅ SEO-optimized with proper anchor text and context

**User Flow**:

1. User completes quiz and views results
2. If specialist recommendation exists, user can click "View Recommended Doctors"
3. System loads and displays up to 5 verified doctors matching specialty
4. For each sport recommendation, user can click "View Recommended Clubs"
5. System loads and displays up to 5 verified clubs for that sport
6. User can view entity details or browse full directory with filters applied

**Files**:

- `src/components/features/quiz/SpecialistRecommendationCard.tsx` - Specialist recommendation display
- `src/components/features/quiz/SportRecommendationCard.tsx` - Sport recommendation with club discovery
- `src/app/actions/doctors.ts` - Doctor recommendation server action
- `src/app/actions/clubs.ts` - Club recommendation server action
- `src/components/features/admin/VerificationRequestCard.tsx` - Verification request card component
- `src/modules/clubs/clubs.repository.ts` - Club verification queries
- `src/modules/doctors/doctors.repository.ts` - Doctor verification queries

## SEO Structured Data Patterns

### ItemList Schema (January 2025 - ✅ Implemented)

**Location**: `src/components/SEO/ItemListSchema.tsx`

**Purpose**: Generates Schema.org ItemList structured data for listing pages to help search engines understand list structure.

**Usage**: Added to clubs, doctors, and sports listing pages.

**Features**:

- Supports multiple entity types (Club, Doctor, Sport)
- Includes type-specific properties in ListItem elements (address, image, sport, specialty, pricing, etc.)
- Proper Schema.org ItemList structure with position numbers
- Improves search engine understanding for better rich snippets

**Example**:

```tsx
<ItemListSchema items={clubs} type="Club" listName="Cluburi Sportive Verificate" />
```

## Location-Specific Landing Pages Pattern (January 2025 - ✅ Implemented)

**Location**: `src/app/(public)/cluburi/locatie/[location]/page.tsx`, `src/lib/utils/location.ts`

**Purpose**: Dynamic location-based landing pages for local SEO optimization.

**Route Structure**: `/cluburi/locatie/[location]`

**Examples**:

- `/cluburi/locatie/bucuresti` - All clubs in Bucharest
- `/cluburi/locatie/bucuresti-sector-1` - Clubs in Sector 1, Bucharest

**Implementation**:

- **Location Utilities** (`src/lib/utils/location.ts`):
  - `generateLocationSlug(city, district?)` - Creates SEO-friendly slugs
  - `parseLocationSlug(locationSlug)` - Parses slugs back to city/district
  - `getLocationDisplayName(city, district?)` - Formats display names

- **Repository Function**:
  - `getUniqueLocations()` - Gets all unique city/district combinations from clubs database

- **Page Features**:
  - `generateStaticParams()` - Generates pages for all unique locations
  - SEO-optimized metadata with location-specific titles, descriptions, keywords
  - ItemListSchema for location-filtered clubs
  - Cache optimization with cache tags
  - Sitemap integration

**Benefits**:

- Local SEO optimization for long-tail keywords
- Better search visibility for location-based queries
- Automatic page generation for all locations in database
- Improved user experience for location-based searches

## Documentation References

- **Claude Guide**: `CLAUDE.md` - Comprehensive project guide for Claude Code with quick start, development commands, architecture patterns, troubleshooting, and quick reference
- **Architecture Overview**: `docs/ARCHITECTURE_OVERVIEW.md` - Complete architecture documentation
- **Code Generation Rules**: `docs/ PROMPTING_RULES_FOR_CODEGEN.md` - Code generation guidelines
- **Brand Guidelines**: `docs/BRAND_GUIDELINES.md` - Visual identity, tone of voice, UX principles, and brand consistency guidelines
- **Components Guide**: `docs/COMPONENTS_GUIDE.md` - Component patterns, styling rules, and UI development guidelines
- **Copy Library**: `docs/COPY_LIBRARY.md` - All user-facing text, CTAs, messages, and Romanian language copy
- **Copywriting Guide**: `docs/COPYWRITING_GUIDE.md` - Copywriting principles, brand voice guidelines, writing templates, and best practices
- **Data Models**: `docs/DATA_MODELS.md` - All data structures, TypeScript interfaces, database schemas, and model relationships
- **Design Tokens**: `docs/DESIGN_TOKENS.md` - Comprehensive design tokens reference (colors, typography, spacing, shadows, border radius, animations, breakpoints)
- **SEO Guidelines**: `docs/SEO_GUIDELINES.md` - SEO strategy, slug generation, meta tags templates, Open Graph templates, and SEO best practices
- **SEO Improvement Plan**: `docs/SEO_IMPROVEMENT_PLAN.md` - Comprehensive SEO analysis and implementation roadmap (Week 1-3 technical foundation complete, club/doctor content expansion complete, internal linking complete)
- **Sport Metadata Helper**: `src/lib/seo/sport-metadata.ts` - Enhanced SEO metadata generator for sport detail pages (top 5 sports with rich descriptions, keywords, and OpenGraph tags)
  - Includes sport-specific OG image support via `getSportOGImagePath()` helper function
  - Path format: `/assets/img/og/sports/{sport-slug}.jpg` (1200x630px recommended)
  - Fallback to default OG image available via `getDefaultOGImagePath()`
- **Site Map**: `docs/SITE_MAP.md` - Complete application structure, all routes, user flows, and navigation patterns
- **Wireframes**: `docs/WIREFRAMES.md` - Detailed page structures, component placement, and layout specifications for all major pages
- **Legal Pages Plan**: `docs/LEGAL_PAGES_DEVELOPMENT_PLAN.md` - Comprehensive legal pages development plan, content templates, SEO guidelines, and implementation checklist
- **Legal Pages Analysis & Implementation**: `docs/LEGAL_ANALYSIS_REPORT.md` (structured analysis, GDPR/product alignment), `docs/LEGAL_PAGES_IMPLEMENTATION_PLAN.md` (5-phase implementation; Phases 1-5 completed January 2026: baza legală, Stripe, date plăți, rezervări/încetare/indemnizare, cookie-uri, listă terți, consistență transversală)
- **Authentication Integration Plan**: `docs/AUTH_INTEGRATION_PLAN.md` - Complete authentication system integration details, Stack Auth setup, Romanian localization, and implementation checklist
- **Stack Auth Server Migration**: `docs/STACK_AUTH_SERVER_MIGRATION_PLAN.md` - Migration plan and implementation details for server-side authentication
- **Security Audit Reports**: Comprehensive security audit covering all security measures:
  - `docs/SECURITY_AUDIT_REPORT.md` - Main security audit report
  - `docs/SQL_INJECTION_PREVENTION_AUDIT.md` - SQL injection prevention audit
  - `docs/CSRF_PROTECTION_AUDIT.md` - CSRF protection audit
  - `docs/ENVIRONMENT_VARIABLE_SECURITY_AUDIT.md` - Environment variable security audit
  - `docs/HTTPS_ENFORCEMENT_AUDIT.md` - HTTPS enforcement audit
  - `docs/CORS_CONFIGURATION_AUDIT.md` - CORS configuration audit
  - `docs/COOKIE_SECURITY_AUDIT.md` - Cookie security audit
  - `docs/AUTHENTICATION_EDGE_CASES_AUDIT.md` - Authentication edge cases audit
- **Tailwind Removal Plan**: `docs/TAILWIND_REMOVAL_PLAN.md` - Comprehensive migration strategy to remove Tailwind CSS and shadcn/ui, keep only Bootstrap 5.3.3 and SCSS
- **Reusable Components List**: `docs/REUSABLE_COMPONENTS_LIST.md` - Complete inventory of ~80+ reusable Bootstrap components with Bootstrap 5.3 documentation references
- **System Patterns**: `memory-bank/systemPatterns.md` - This file
- **Technical Context**: `memory-bank/techContext.md` - Technology stack details
- **Product Context**: `memory-bank/productContext.md` - Product requirements
- **Progress Tracking**: `memory-bank/progress.md` - Development progress
- **Prompting System**: `memory-bank/promptingSystem.md` - Yuvoo Prompting Standard (templates, constraints, examples)
  - **Prompt File Management**: Implementation prompts are saved as separate files in `prompts/` folder (kebab-case naming: `feature-name-implementation-plan.md`)
  - **Example Prompts**: `prompts/guest-club-payment-flow-implementation-plan.md`, `prompts/parent-feature-implementation-plan.md`, `prompts/doctor-portal-implementation-plan.md`
