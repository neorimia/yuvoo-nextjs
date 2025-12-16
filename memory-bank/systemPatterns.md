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
│   │   ├── quiz.analyzer.ts      # AI analysis orchestration + risk detection
│   │   ├── ai-recommendations.service.ts  # OpenAI integration
│   │   ├── ai-recommendations-cache.service.ts  # Response caching
│   │   ├── risk-signal-detection.service.ts  # Programmatic risk detection
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
- Clubs: `/cluburi`, `/cluburi/:slug`, `/cluburi/categorie/:category`, `/cluburi/:slug/recenzii`
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

- ✅ `components/features/clubs/` - Club components created (ClubsMain, ClubDetailsMain, HomeClubArea, ClubCard, VerificationBadge, ClubSearchFilters, ClubDetailsWidget, ClubGallery, ClubMap, ClubSchedule, BookingForm)
- ✅ `components/features/doctors/` - Doctor components created (DoctorsMain, DoctorCard, DoctorDetailsMain, DoctorSearchFilters, DoctorAppointmentForm, DoctorAppointmentFormSection, DoctorInfo, DoctorSpecialties, HomeDoctorArea, HomeTwoDoctorArea, DoctorAvailability)
- 📋 `components/features/sports/` - Sport components (planned)
- ✅ `components/features/quiz/` - Quiz components complete (QuizContainer, QuizProgress, QuizNavigation, QuizContext, QuestionWrapper, 6 question components, ResultsActions, SportRecommendationCard, QuizHistory)

**Layout Components**: `components/layout/`

- Header, Footer, Sidebar
- Shared across multiple route groups

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

**Error Handling**:

- Centralized error message mapping in `lib/auth/errors.ts`
- All error messages in Romanian
- `getErrorMessage()` utility function extracts user-friendly messages from Stack Auth errors
- Forms display errors with consistent styling
- Server Actions return `{ success: boolean, error?: string, redirect?: string }` format

**Redirects** (handled by Server Actions and form components):

- Successful login → `/parent/dashboard`
- Successful signup → `/parent/dashboard`
- Successful password reset → `/auth/login`
- Successful email verification → `/auth/login`

**Benefits of Server-Side Architecture**:

- ✅ Better security (no client-side auth logic)
- ✅ Smaller client bundle (no Stack Auth client code)
- ✅ Better SEO (server-side rendering)
- ✅ Simpler architecture (Server Actions pattern)
- ✅ Better error handling (server-side validation)

## Onboarding Pattern

### Onboarding System Architecture

**Status**: ✅ Foundation Complete, ✅ Parent Onboarding Complete, ✅ Club Admin Onboarding Complete, 🚧 Doctor Onboarding In Progress

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

- **Orthopedist Risks**: Coordination challenges, physical considerations (pain, joints, posture), orthopedic health conditions
- **Nutritionist Risks**: Weight-related conditions, nutrition-related health conditions, dietary restrictions
- **Psychologist Risks**: Anxiety-related personality traits, psychological reasons for stopping sports, mental health conditions
- **General Pediatrician Risks**: Very low energy, multiple health conditions, young age with concerns

**Detection Flow**:

```
Quiz Answers → detectRiskSignals() → Risk Signals → riskSignalsToSpecialistRecommendation()
                                                                      ↓
                                                          Specialist Recommendation
```

**Integration**: Programmatic risk detection runs first and takes precedence over AI-generated specialist recommendations for reliability and consistency.

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

## Caching Strategy

### Next.js 16 Cache Components

**Paradigm Shift**: Dynamic by default, opt-in to caching with `"use cache"`

**Caching Patterns**:

1. **Public Cache** (`"use cache"`):
   - For content same for all users
   - Use `cacheLife()` for time-based revalidation
   - Use `cacheTag()` for on-demand revalidation
   - Example: Footer components, static pages

2. **Private Cache** (`"use cache: private"`):
   - For user-specific prefetchable content
   - Can access cookies/params at runtime
   - Prefetched with actual runtime values

3. **Dynamic Content** (default):
   - Use `<Suspense>` boundaries for dynamic content
   - Access `cookies()`, `headers()`, `params` for dynamic rendering
   - Example: Protected pages, user dashboards

**Route Segment Config** (Removed):

- ❌ `export const dynamic` - Removed, use dynamic APIs or `"use cache"`
- ❌ `export const revalidate` - Removed, use `cacheLife()` instead
- ❌ `export const fetchCache` - Removed, use `"use cache"` instead

**Dynamic Routes**:

- All dynamic routes MUST have `generateStaticParams()` returning at least one value
- Required for Cache Components compatibility

**Revalidation Triggers**:

- After quiz submission: `revalidatePath()` or `updateTag()`
- After booking creation/cancellation: `revalidatePath()` or `updateTag()`
- After profile updates: `revalidatePath()` or `updateTag()`
- After favorite toggles: `revalidatePath()` or `updateTag()`

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

3. **Program → Sport**:
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
- `Common/` - Breadcrumb, Pagination, Preloader, etc.

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
2. **Authorization**: Role-based (parent, club_admin, doctor, admin)
3. **Input Validation**: Zod schemas for all inputs (server-side validation in Server Actions)
4. **SQL Injection**: Drizzle ORM parameterized queries
5. **XSS**: React automatic escaping
6. **CSRF**: Next.js built-in protection (Server Actions are CSRF-protected)
7. **File Uploads**: Cloudinary handles storage and CDN
8. **Server Actions**: All authentication operations are server-side only

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
- **Site Map**: `docs/SITE_MAP.md` - Complete application structure, all routes, user flows, and navigation patterns
- **Wireframes**: `docs/WIREFRAMES.md` - Detailed page structures, component placement, and layout specifications for all major pages
- **Legal Pages Plan**: `docs/LEGAL_PAGES_DEVELOPMENT_PLAN.md` - Comprehensive legal pages development plan, content templates, SEO guidelines, and implementation checklist
- **Authentication Integration Plan**: `docs/AUTH_INTEGRATION_PLAN.md` - Complete authentication system integration details, Stack Auth setup, Romanian localization, and implementation checklist
- **Stack Auth Server Migration**: `docs/STACK_AUTH_SERVER_MIGRATION_PLAN.md` - Migration plan and implementation details for server-side authentication
- **Tailwind Removal Plan**: `docs/TAILWIND_REMOVAL_PLAN.md` - Comprehensive migration strategy to remove Tailwind CSS and shadcn/ui, keep only Bootstrap 5.3.3 and SCSS
- **Reusable Components List**: `docs/REUSABLE_COMPONENTS_LIST.md` - Complete inventory of ~80+ reusable Bootstrap components with Bootstrap 5.3 documentation references
- **System Patterns**: `memory-bank/systemPatterns.md` - This file
- **Technical Context**: `memory-bank/techContext.md` - Technology stack details
- **Product Context**: `memory-bank/productContext.md` - Product requirements
- **Progress Tracking**: `memory-bank/progress.md` - Development progress
