# Yuvoo - Technical Context

## Technology Stack

### Core Framework

**Current Installed Versions**:

- **Next.js**: `16.0.8` (installed) - React framework with App Router and Cache Components ✅
- **React**: `19.2.1` (installed) - UI library ✅
- **React DOM**: `19.2.1` (installed) - React rendering ✅
- **TypeScript**: `5.9.3` (installed) - Type safety ✅

**Package.json Versions**:

- **Next.js**: `^16.0.8` (package.json) - upgraded from 15.3.1 ✅
- **React**: `^19.2.1` (package.json) - upgraded from 19.0.0 ✅
- **TypeScript**: `^5` (package.json) - will install latest 5.x

**Cache Components**: Enabled (`cacheComponents: true` in next.config.ts) ✅

**Note**: Upgraded to Next.js 16.0.8 with Cache Components mode enabled. All routes migrated and verified.

### Database & ORM

- **Drizzle ORM**: `^0.36.4` - Type-safe ORM
- **Neon Database**: `@neondatabase/serverless ^0.10.3` - Serverless Postgres
- **Postgres**: `^3.4.5` - Database driver
- **Drizzle Kit**: `^0.28.1` (dev) - Migration tool

### Authentication

- **Stack Auth**: `@stackframe/stack ^2.5.40` - Authentication service (Server-Side Only)
  - Handles user authentication (server-side only)
  - Email/password authentication
  - Session management (server-side)
  - User management
  - **Architecture**: All authentication operations use Server Actions
  - **No Client Provider**: Removed StackProvider - authentication is fully server-side
  - **Server Actions**: `signInAction`, `signUpAction`, `forgotPasswordAction`, `resetPasswordAction`, `verifyEmailAction`

### UI & Styling

**Current (Starting Theme - Kindedo)**:

- **Bootstrap**: `5.3.3` - CSS framework (actual)
- **SCSS**: `^1.75.0` - CSS preprocessor (actual)
- **Animate.css** - Animation library (actual)
- **WOW.js**: `^1.2.2` - Scroll animations (actual)
- **Font Awesome Pro** - Icon library (actual)
- **Flaticon Kindedo** - Custom icons (actual)
- **Nice Select** - Styled dropdowns (actual)
- **Gabarito** (Google Fonts) - Primary font, child-friendly (actual)

**Current Setup**:

- **Bootstrap**: `5.3.3` ✅ - CSS framework for all components
- **SCSS/Sass**: `^1.75.0` ✅ - CSS preprocessor for custom styles
- **PostCSS**: `8.5.6` (installed) ✅ - CSS processing (minimal config, no Tailwind plugin)
- **Lucide React**: `^0.560.0` ✅ - Icon library
- **clsx**: `^2.1.1` ✅ - Conditional classnames utility

**Styling Architecture**:

- **All components use Bootstrap 5.3.3** utility classes
- **Custom Yuvoo-branded utilities** via Bootstrap Utility API (see `public/assets/scss/utils/_yuvoo-utilities.scss`)
- **SCSS** for custom styles and component-specific styling
- **Bootstrap wrapper components** in `src/components/UI/` (BootstrapButton, BootstrapInput, etc.)
- **Documentation**: See `docs/TAILWIND_REMOVAL_PLAN.md` for migration history
- **Components**: See `docs/REUSABLE_COMPONENTS_LIST.md` for inventory of reusable Bootstrap components

### Validation

- **Zod**: `^3.22.4` - Schema validation
  - Server-side validation
  - Type inference
  - Error messages

### AI & External Services

- **OpenAI**: `^4.72.0` - AI recommendations
  - Model: GPT-4 Turbo
  - JSON mode for structured responses
- **Cloudinary**: `^2.5.1` - Media storage & CDN
  - Image uploads
  - Image transformations
  - CDN delivery
- **Brevo** (formerly Sendinblue): `@getbrevo/brevo ^2.2.0` - Email service
  - Transactional emails
  - Email templates
- **React Email**: `@react-email/components ^1.0.2`, `react-email` (dev), `@react-email/render ^2.0.0` - Email template library
  - Component-based email templates
  - Preview server for development (`npm run email:dev` on port 3001)
  - Type-safe email components
  - Renders to HTML strings for Brevo integration
- **PostHog**: `posthog-js@^1.309.1`, `posthog-node@^5.17.4` - Analytics & product analytics
  - User analytics and event tracking
  - Session recordings (privacy-first configuration)
  - Error tracking
  - Feature flags support (for future use)
  - GDPR-compliant (cookie consent integration)

### Utility Functions

- **Slug Generation**: `generateSlug()` in `src/lib/utils.ts` ✅
  - Handles Romanian diacritics (normalize NFD, remove diacritics)
  - Converts text to SEO-friendly URL slugs
  - Replaces special characters with hyphens
  - Limits length to 100 characters
  - Used for club and doctor slug generation

### Development Tools

- **ESLint**: `^8.57.0` - Code linting
- **ESLint Config Next**: `^15.0.3` - Next.js ESLint config
- **Prettier**: `^3.7.4` - Code formatting
- **TypeScript Types**:
  - `@types/node ^20.11.20`
  - `@types/react ^19.0.0`
  - `@types/react-dom ^19.0.0`

## Routing & SEO Strategy

### Routes Configuration

**Location**: `lib/routes.ts` - Single source of truth for all application routes

**SEO Strategy**:

- **Public Routes**: Romanian language paths for SEO optimization (indexed by search engines)
  - Examples: `/sporturi`, `/cluburi`, `/doctori`, `/chestionar`, `/despre-noi`, `/intrebari-frecvente`
- **Internal Routes**: English paths (not SEO-sensitive, not indexed)
  - Examples: `/auth/login`, `/parent/dashboard`, `/club/dashboard`, `/admin/dashboard`

**Key Features**:

- Type-safe route definitions with TypeScript
- Helper functions for route checking (`isProtectedRoute`, `getRouteGroup`, `isPublicSeoRoute`)
- Query parameter builder (`buildUrl`)
- Legacy route mapping for redirects (Kindedo → Yuvoo)
- External links and asset paths centralized
- Organized structure: `routes.*`, `externalLinks.*`, `assets.*`

**Usage Pattern**:

```tsx
import { routes, externalLinks, assets } from "@/lib/routes";
<Link href={routes.clubs.list}>Cluburi</Link>
<Link href={routes.clubs.detail("fotbal-club-bucuresti")}>Detalii</Link>
<Image src={assets.logo} alt="Yuvoo" />
```

**Important**: Always use `@/lib/routes` for navigation - never hardcode paths. This ensures consistency and makes SEO updates easier.

## Development Environment

### Prerequisites

- **Node.js**: v20+ recommended
- **Package Manager**: npm, yarn, or pnpm
- **Git**: Version control
- **Code Editor**: VS Code recommended

### Setup Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint

# Database commands
npm run db:generate  # Generate migration
npm run db:push      # Push schema changes
npm run db:migrate    # Run migrations
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed database
```

### Environment Variables

**Required Variables** (`.env.local`):

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/yuvoo?sslmode=require"

# Authentication (Stack Auth)
NEXT_PUBLIC_STACK_PROJECT_ID="your-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-publishable-key"
STACK_SECRET_SERVER_KEY="your-secret-key"

# OpenAI
OPENAI_API_KEY="sk-..."

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (Brevo)
BREVO_API_KEY="your-brevo-key"
BREVO_SENDER_EMAIL="noreply@yuvoo.com"
BREVO_SENDER_NAME="Yuvoo"

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY="your-posthog-key"
NEXT_PUBLIC_POSTHOG_HOST="https://eu.i.posthog.com"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Database Configuration

### Database Provider: Neon

**Why Neon**:

- Serverless Postgres
- Auto-scaling
- Branching for development
- Vercel integration

**Connection**:

- Connection string in `DATABASE_URL`
- Serverless driver: `@neondatabase/serverless`

### Drizzle ORM Setup

**Configuration**: `drizzle.config.ts`

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

**Schema Location**: `lib/db/schema.ts`
**Migrations**: `lib/db/migrations/`

### Database Features Used

- **UUID Primary Keys**: All tables use UUID
- **JSONB Columns**: Flexible data (personality traits, interests, schedules)
- **PostGIS**: Location-based search (clubs)
- **Enums**: Type-safe enums (user roles, booking status, etc.)
- **Indexes**: Strategic indexing for performance
- **Relations**: Drizzle relations for type-safe joins

## Authentication Setup ✅ COMPLETE

### Stack Auth Configuration

**Why Stack Auth**:

- Managed authentication service
- Built-in user management
- OAuth support
- Session handling
- Email verification

**Setup Status**: ✅ Complete

**Configuration Files**:

- `lib/auth/stack.ts` - Server-side Stack Auth configuration
- `src/providers/StackAuthProvider.tsx` - Client-side provider wrapper (removed - server-side only)
- `lib/auth/errors.ts` - Error message mappings (Romanian)
- `lib/auth/session.ts` - Session management helpers
- `lib/auth/redirects.ts` - Role-based redirect helper functions ✅ (January 2025)
- `modules/auth/auth.types.ts` - UserRoleEnum (single source of truth for roles) ✅ (January 2025)

**Setup Steps** (Completed):

1. ✅ Created Stack Auth project configuration
2. ✅ Configured project ID and keys in environment variables
3. ✅ Configured in `lib/auth/stack.ts` with all required URLs
4. ✅ Set up redirect URLs (password reset, email verification)
5. ✅ Created client provider wrapper for Next.js App Router
6. ✅ Integrated provider in root layout
7. ✅ Created error handling utility with Romanian messages
8. ✅ Integrated Stack Auth into all authentication forms

**Client-Side Integration**:

- **Provider**: `StackAuthProvider` wraps app in `src/app/layout.tsx`
- **Hooks**: `useStackApp()` used in all authentication forms
- **Methods Used**:
  - `signInWithCredential()` - Sign in
  - `signUpWithCredential()` - Sign up
  - `sendForgotPasswordEmail()` - Password reset request
  - `resetPasswordWithToken()` - Password reset
  - `verifyEmail()` - Email verification

**Session Flow**:

1. User authenticates via Stack Auth (client-side)
2. Stack Auth manages session
3. Server Actions can check Stack Auth session via `lib/auth/session.ts`
4. Syncs with local `users` table (creates if needed)
5. Returns combined session

**Authentication Pages** (All completed):

- `/auth/login` - Sign in (✅ Stack Auth integrated, Romanian localized)
- `/auth/register` - Sign up (✅ Stack Auth integrated, Romanian localized)
- `/auth/forgot-password` - Password reset request (✅ Stack Auth integrated, Romanian localized)
- `/auth/reset-password` - Password reset with token (✅ Stack Auth integrated, Romanian localized)
- `/auth/email-confirmation` - Email verification (✅ Stack Auth integrated, Romanian localized)
- `/auth/redirect` - Authentication redirect proxy (✅ Role-based redirects, January 2025)
- `/handler/email-verification` - Email verification handler (✅ Stack Auth callbacks, January 2025)

**Error Handling**:

- Centralized error messages in `lib/auth/errors.ts`
- All error messages in Romanian
- `getErrorMessage()` utility extracts user-friendly messages
- Consistent error display across all forms

## Deployment ✅ COMPLETE

**Status**: ✅ Complete - Comprehensive deployment guides created

**Documentation**:

- `docs/VERCEL_DEPLOYMENT_GUIDE.md` - Complete Vercel deployment guide
- `docs/DATABASE_DEPLOYMENT_GUIDE.md` - Complete Neon database deployment guide
- `docs/MONITORING_SETUP_GUIDE.md` - Complete monitoring setup guide

### Vercel Configuration ✅

**Platform**: Vercel
**Region**: `fra1` (Frankfurt, Europe)
**Framework**: Next.js (auto-detected)

**Configuration File**: `vercel.json` ✅ Created

**Configuration Details**:

- ✅ Build command: `npm run buildCommand` (includes sharp rebuild)
- ✅ Output directory: `.next`
- ✅ Framework: Next.js (auto-detected)
- ✅ Region: `fra1` (Frankfurt, Europe)
- ✅ Function timeouts: 30 seconds for API routes and Server Actions
- ✅ Security headers configured (XSS protection, content type options, frame options, referrer policy)
- ✅ Rewrites for sitemap.xml and robots.txt
- ✅ `.vercelignore` file created to optimize deployment size

**Deployment Guide**: See `docs/VERCEL_DEPLOYMENT_GUIDE.md` for:

- Step-by-step deployment instructions
- Environment variable configuration
- Domain setup (custom domain, DNS, SSL)
- Build configuration and optimization
- Troubleshooting guide

### Database Deployment ✅

**Platform**: Neon (Serverless Postgres)
**Region**: Frankfurt (eu-central-1) recommended for Romanian users

**Deployment Guide**: See `docs/DATABASE_DEPLOYMENT_GUIDE.md` for:

- Neon database creation instructions
- Connection setup (local and Vercel)
- Migration deployment methods (Drizzle Kit, Neon Console, Vercel build)
- Seed data deployment process
- Connection pooling (pooled vs. direct connections)
- Backup and recovery strategies
- Performance optimization
- Security best practices

### Environment Variables in Vercel ✅

**Documentation**: Complete environment variable reference in `docs/VERCEL_DEPLOYMENT_GUIDE.md`

**Required Variables**:

- Database: `DATABASE_URL` (pooled connection for production)
- Stack Auth: `NEXT_PUBLIC_STACK_PROJECT_ID`, `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`, `STACK_SECRET_SERVER_KEY`
- OpenAI: `OPENAI_API_KEY`
- Cloudinary: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Brevo: `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`
- PostHog: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` (optional)
- App URLs: `NEXT_PUBLIC_APP_URL`

**Configuration**:

- Set in Vercel dashboard (Project Settings → Environment Variables)
- Different values for production/preview/development
- Public vs. private variable distinction documented
- Security best practices documented

## External Service Integrations

### OpenAI Integration

**Purpose**: AI-powered sport recommendations

**Setup**:

1. Create OpenAI account
2. Get API key
3. Add to environment variables
4. Configure in `modules/quiz/quiz.service.ts`

**Model**: `gpt-4-turbo-preview`
**Response Format**: JSON mode
**Temperature**: 0.7 (balanced creativity/consistency)
**Language Requirement**: All AI-generated content (recommendations, explanations, reasoning) must be in Romanian language. System prompts must explicitly instruct the AI to respond in Romanian.

**Cost Considerations**:

- Monitor token usage
- Cache recommendations when possible
- Consider rate limiting

### Cloudinary Integration

**Purpose**: Image storage and CDN

**Status**: ✅ Implemented and Integrated

**Setup**:

1. Create Cloudinary account
2. Get cloud name, API key, API secret
3. Configure in `lib/integrations/cloudinary/client.ts`
4. Environment variables: `CLOUDINARY_CLOUD_NAME` (or `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`), `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

**Implementation**:

- ✅ Client configuration (`src/lib/integrations/cloudinary/client.ts`)
- ✅ Upload utilities (`src/lib/integrations/cloudinary/upload.ts`)
  - Image file validation (type and size checks)
  - Document file validation (PDF, DOC, DOCX, JPG, PNG, max 10MB)
  - Base64 conversion and upload
  - Image/document deletion (handles both resource types)
  - Public ID extraction from URLs
  - Resource type handling (images vs raw files)
- ✅ Upload server actions (`src/app/actions/uploads.ts`)
  - `uploadImageAction` - Upload images with validation
  - `uploadDocumentAction` - Upload documents with validation
  - `deleteImageAction` - Delete images from Cloudinary
  - `deleteDocumentAction` - Delete documents from Cloudinary
- ✅ Used in Club Admin Onboarding (Photo Upload step, Verification Documents step)

**Features Used**:

- Image uploads (logo and gallery photos)
  - File validation (JPG, PNG, WebP, max 5MB)
  - Folder: `yuvoo/clubs/logos`, `yuvoo/clubs/gallery`
- Document uploads (verification documents)
  - File validation (PDF, DOC, DOCX, JPG, PNG, max 10MB)
  - Folder: `yuvoo/clubs/verification`, `yuvoo/clubs/documents`
  - Resource type: `raw` for PDF/DOC files, `image` for image files
- Automatic optimization via Cloudinary CDN (for images)
- CDN delivery
- Image transformations (resize, crop, etc. - via Cloudinary, for images only)

**Usage Pattern**:

```typescript
// Upload image
const formData = new FormData();
formData.append("file", file);
formData.append("folder", "yuvoo/clubs/logos");
const result = await uploadImageAction(formData);

// Delete image
await deleteImageAction(imageUrl);
```

### Brevo Integration

**Purpose**: Transactional emails

**Status**: ✅ Email Templates Complete - Production Ready

**Setup**:

1. Create Brevo account at [brevo.com](https://www.brevo.com)
2. Get API key from [Brevo API Settings](https://app.brevo.com/settings/keys/api)
3. Verify sender email in [Brevo Senders](https://app.brevo.com/settings/senders)
4. Add to `.env.local`:
   ```bash
   BREVO_API_KEY="your-api-key"
   BREVO_SENDER_EMAIL="noreply@yuvoo.ro"
   BREVO_SENDER_NAME="Yuvoo"
   ```
5. Test configuration: `npx tsx src/lib/integrations/brevo/test-brevo.ts`

**Implementation**:

- ✅ Enhanced Brevo client (`src/lib/integrations/brevo/client.ts`) with error handling, retry logic, and type-safe email sending ✅
- ✅ Email templates module (`src/lib/integrations/brevo/templates.ts`) with 7 HTML templates ✅
- ✅ Email service (`src/lib/integrations/brevo/email.service.ts`) with high-level functions ✅
- ✅ Type definitions (`src/lib/integrations/brevo/types.ts`) for email parameters and results ✅
- ✅ Test script (`src/lib/integrations/brevo/test-brevo.ts`) for configuration verification ✅
- ✅ Comprehensive documentation (`src/lib/integrations/brevo/README.md`) ✅

**React Email Integration** (Phase 1 Complete - January 2025):

- ✅ React Email infrastructure (`emails/` directory) ✅
  - Base components: `EmailLayout`, `EmailHeader`, `EmailFooter`, `EmailSection`
  - Utilities: `render-email.ts`, `email-types.ts`
  - Preview server configured (port 3001)
- ✅ Email unsubscription system ✅
  - Unsubscribe page (`/dezabonare`)
  - Token-based unsubscription (secure, one-click from emails)
  - Form-based unsubscription (manual email entry)
  - Email token utilities (`src/lib/utils/email-tokens.ts`)
- ✅ Email preferences management ✅
  - Preferences page (`/parent/email-preferences`)
  - Granular control over email types
  - PostHog tracking for unsubscribe and preference updates
- [ ] Phase 2: Quiz results email template (pending)
- [ ] Phase 3: Brevo integration with React Email (pending)

**Email Templates** (All Complete):

- ✅ Booking confirmation - Sent when booking is created
- ✅ Booking cancellation - Sent when booking is cancelled
- ✅ Booking reminder - Sent 24 hours before scheduled booking
- ✅ Quiz results - Sent after quiz completion with top 3 recommendations
- ✅ Welcome email - Sent to new users after registration
- ✅ Club verification status - Sent when club verification status changes
- ✅ Doctor verification status - Sent when doctor verification status changes

**Template Features**:

- Responsive HTML design (mobile-friendly) ✅
- Bootstrap-based styling (consistent with platform) ✅
- Yuvoo branding (gradient header, brand colors) ✅
- Romanian language content throughout ✅
- Plain text fallback versions for all templates ✅
- Personalized greetings (user's first name) ✅
- Clear call-to-action buttons ✅
- Footer with contact info and unsubscribe link ✅

**Email Service Functions**:

- `sendBookingConfirmation()` - Booking confirmation email ✅
- `sendBookingCancellation()` - Booking cancellation email ✅
- `sendBookingReminder()` - Booking reminder email ✅
- `sendQuizResults()` - Quiz results email ✅
- `sendWelcomeEmail()` - Welcome email for new users ✅
- `sendClubVerificationStatus()` - Club verification status updates ✅
- `sendDoctorVerificationStatus()` - Doctor verification status updates ✅

**Integration Status**:

- ✅ Booking emails: Integrated in `bookings.service.ts` (automatic on booking creation/cancellation)
- ✅ Quiz emails: Integrated in `app/actions/quiz.ts` (automatic after quiz submission)
- 📋 Welcome emails: Ready for integration in user registration flow
- 📋 Verification emails: Ready for integration in admin verification workflow

**Error Handling**:

- All email functions are non-blocking (failures don't affect core operations) ✅

---

## Performance Optimization

**Status**: ✅ **COMPLETE** - All performance optimizations implemented and documented

**Purpose**: Optimize application performance through database indexing, React component memoization, and query result caching.

**Implementation**:

- ✅ Database query optimization (`src/lib/db/schema.ts`)
  - Comprehensive indexes added to all tables for common query patterns ✅
  - Single-column indexes: slug, email, city, sport_type, specialty, status, etc. ✅
  - Composite indexes: sport_city, verified_featured, parent_status, scheduled_status, etc. ✅
  - Unique indexes: slug lookups (O(1) performance) ✅
  - Total: 40+ indexes across all tables ✅
- ✅ React component optimization (`src/lib/performance/react-optimization.ts`)
  - Memoization utilities: `memoizeComponent()`, `useStableCallback()`, `useStableValue()` ✅
  - Shallow comparison utilities: `shallowEqual()`, `memoizeWithShallow()` ✅
  - Lazy loading utility: `createLazyComponent()` ✅
  - Components memoized: ClubCard, DoctorCard ✅
- ✅ Query result caching (`src/lib/performance/optimization.ts`)
  - `SimpleCache` class with TTL support ✅
  - `cachedQuery()` function for database query caching ✅
  - `debounce()` and `throttle()` utilities ✅
  - `performanceMonitor` for performance measurement ✅
  - Cache instances: `queryCache`, `searchCache` ✅
  - Automatic cache cleanup utility ✅

**Performance Improvements**:

- **Database**: All common query patterns now have indexes, significantly improving query speed ✅
- **React**: Reduced unnecessary re-renders through component memoization ✅
- **Caching**: Reduced database load through query result caching ✅

**Documentation**:

- ✅ `docs/PERFORMANCE_OPTIMIZATION_GUIDE.md` - Comprehensive performance optimization guide ✅
- ✅ `src/lib/performance/README.md` - Usage examples and API documentation ✅

**Files**:

- `src/lib/performance/optimization.ts` - General performance utilities (caching, debouncing, monitoring) ✅
- `src/lib/performance/react-optimization.ts` - React-specific optimization utilities ✅
- `src/lib/db/schema.ts` - Database indexes (updated) ✅

---

## Admin Verification System

**Status**: ✅ **COMPLETE** - Full admin verification workflow implemented

**Purpose**: Admin dashboard for reviewing and approving/rejecting club and doctor verification requests.

**Implementation**:

- ✅ Admin verification page (`src/app/admin/verifications/page.tsx`)
  - Admin-only access with role check ✅
  - Statistics dashboard (pending, in review, approved, rejected) ✅
  - Lists pending and in-review verification requests ✅
  - Server Component with data fetching ✅
- ✅ Verification server actions (`src/app/actions/verifications.ts`)
  - `updateClubVerificationStatusAction()` - Update club verification status ✅
  - `updateDoctorVerificationStatusAction()` - Update doctor verification status ✅
  - Admin role required (enforced) ✅
  - Zod validation for input ✅
  - Email notifications on status changes ✅
  - Cache revalidation after updates ✅
- ✅ Verification request card component (`src/components/features/admin/VerificationRequestCard.tsx`)
  - Displays club/doctor information ✅
  - Shows verification documents with download links ✅
  - Action buttons: Approve, Reject (with reason), Set in Review ✅
  - Loading states and error handling ✅
  - Auto-refresh after status updates ✅
- ✅ Repository functions
  - `getClubsByVerificationStatus()` - Get clubs by status ✅
  - `getClubsPendingVerification()` - Get pending/in_review clubs ✅
  - `getDoctorsByVerificationStatus()` - Get doctors by status ✅
  - `getDoctorsPendingVerification()` - Get pending/in_review doctors ✅
- ✅ Type updates
  - Added `verificationStatus` and `verificationDocuments` to Club type ✅
  - Added `verificationStatus` and `verificationDocuments` to Doctor type ✅
  - Updated repository mappers to include verification fields ✅

**Verification Workflow**:

1. Club/Doctor submits documents during onboarding ✅
2. Status automatically set to "in_review" ✅
3. Admin views requests at `/admin/verifications` ✅
4. Admin reviews documents and entity information ✅
5. Admin approves/rejects with optional reason ✅
6. Email notification sent automatically ✅
7. Status updated in database ✅
8. Cache revalidated ✅

**Status Values**:

- `pending` - Initial state, no documents submitted
- `in_review` - Documents submitted, admin reviewing
- `approved` - Verified and approved
- `rejected` - Rejected, needs resubmission

**Email Integration**:

- Uses existing `sendClubVerificationStatus()` function ✅
- Uses existing `sendDoctorVerificationStatus()` function ✅

## Quiz Referral Flows

**Purpose**: Enable users to discover recommended doctors and clubs directly from quiz results, creating a seamless path from recommendations to action.

**Implementation**:

- **Specialist Referral Flow** ✅
  - `SpecialistRecommendationCard` component displays specialist recommendations
  - `getRecommendedDoctorsAction()` server action fetches recommended doctors
  - Filters: verified doctors, accepting new patients, by specialty
  - Returns up to 5 doctors matching the recommendation
  - Integrated into quiz results page

- **Club Referral Flow** ✅
  - Enhanced `SportRecommendationCard` component with club discovery
  - `getRecommendedClubsAction()` server action fetches recommended clubs
  - Filters: verified clubs, by sport ID
  - Returns up to 5 clubs matching the sport recommendation
  - Integrated into each sport recommendation card

**Server Actions**:

- `getRecommendedDoctorsAction(specialty, city?, limit?)` - Get recommended doctors by specialty
- `getRecommendedClubsAction(sportId, city?, limit?)` - Get recommended clubs by sport

**Components**:

- `src/components/features/quiz/SpecialistRecommendationCard.tsx` - Specialist recommendation display
- `src/components/features/quiz/SportRecommendationCard.tsx` - Sport recommendation with club discovery

**Features**:

- On-demand loading (better performance)
- Only verified entities shown
- Maximum 5 recommendations per entity type
- Links to full directories with pre-applied filters
- Empty states when no recommendations found
- Loading states during data fetching
- All text in Romanian
- Automatic notifications on status changes ✅
- Non-blocking email sending ✅

**Files**:

- `src/app/admin/verifications/page.tsx` - Admin verification page ✅
- `src/app/actions/verifications.ts` - Verification server actions ✅
- `src/components/features/admin/VerificationRequestCard.tsx` - Verification request card ✅
- `src/modules/clubs/clubs.repository.ts` - Club verification queries (updated) ✅
- `src/modules/doctors/doctors.repository.ts` - Doctor verification queries (updated) ✅
- `src/modules/clubs/clubs.types.ts` - Club types (updated with verification fields) ✅
- `src/modules/doctors/doctors.types.ts` - Doctor types (updated with verification fields) ✅
- Retry logic with exponential backoff (up to 3 retries) ✅
- Comprehensive error logging for debugging ✅
- Email validation before sending ✅

## TypeScript Configuration

### tsconfig.json

**Key Settings**:

- Strict mode enabled
- Path aliases (`@/` for `src/`)
- Next.js types
- React types

**Path Aliases**:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Configuration Status**: ✅ Configured and documented

- Single `@/*` alias pattern (standard Next.js convention)
- Maps to `./src/*` directory
- Works for all imports: `@/lib/*`, `@/components/*`, `@/modules/*`, `@/app/*`
- No additional aliases needed (keeps configuration simple and consistent)
- Documentation: `TYPESCRIPT_PATHS.md` created with usage examples and best practices

**Usage Examples**:

```typescript
import { routes } from "@/lib/routes";
import ClubCard from "@/components/features/clubs/ClubCard";
import { getClubBySlug } from "@/modules/clubs/clubs.service";
```

## Code Quality Tools

### ESLint

**Configuration**: `eslint.config.mjs`
**Preset**: `eslint-config-next`
**Rules**: Next.js recommended + custom

### Prettier

**Configuration**: `.prettierrc`
**Plugin**: `prettier-plugin-tailwindcss` (sorts Tailwind classes)

**Format on Save**: Recommended in VS Code

## Performance Considerations

### Next.js Optimizations

- **Server Components**: Default (reduces client bundle)
- **Static Generation**: Club/doctor detail pages
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting

### Database Optimizations

- **Indexes**: Strategic indexes on search fields
- **Connection Pooling**: Neon handles automatically
- **Query Optimization**: Drizzle ORM efficient queries

### Caching Strategy ✅ COMPLETE

**Cache Components (Next.js 16)** - Migration Complete (January 2025):

- **Status**: ✅ **COMPLETE** - All pages migrated, Server Actions updated, documentation created
- **Dynamic by Default**: All routes are dynamic unless using `"use cache"`
- **Opt-in Caching**: Use `"use cache"` directive for cacheable content (must be async functions)
- **Private Cache**: Use `"use cache: private"` for user-specific prefetchable content
- **Cache Life**: Configure with `cacheLife()` for time-based revalidation
  - Public pages: `cacheLife("hours")` for 1-hour cache
  - Private pages: `cacheLife("minutes")` for 5-minute cache
- **Cache Tags**: Use `cacheTag()` for on-demand revalidation
  - Comprehensive tag system: entity-specific, slug-based, list-based, home sections, user-specific
- **Static Shells**: Cached components create static shells for instant loading
- **Suspense Boundaries**: Use `<Suspense>` for dynamic content within cached routes

**Legacy Patterns (Removed)**:

- ❌ `export const dynamic = "force-dynamic"` - Removed, use dynamic APIs instead ✅ All removed
- ❌ `export const revalidate` - Removed, use `cacheLife()` instead ✅ All removed
- ❌ `unstable_noStore()` - Removed, dynamic by default ✅ All removed

**Revalidation**:

- **Time-based**: `cacheLife("hours")` for public pages, `cacheLife("minutes")` for private pages
- **Tag-based**: `revalidateTag(tag, "max")` in Server Actions for on-demand invalidation
  - All Server Actions updated: clubs, doctors, children, settings, quiz
  - Uses `"max"` profile for stale-while-revalidate semantics
- **Path-based**: `revalidatePath()` after mutations (still supported, used alongside tag-based)

**Migrated Pages**:

- ✅ Home page (`/`) - Public cache with 1-hour cache life
- ✅ Sports listing (`/sporturi`) - Public cache with 1-hour cache life
- ✅ Club detail (`/cluburi/[slug]`) - Public cache with 1-hour cache life
- ✅ Doctor detail (`/doctori/[slug]`) - Public cache with 1-hour cache life
- ✅ Parent dashboard (`/parent/dashboard`) - Private cache with 5-minute cache life
- ⚠️ Clubs/Doctors listing (`/cluburi`, `/doctori`) - Remain dynamic (use `searchParams`)

**Documentation**: `docs/CACHING_STRATEGY.md` - Complete caching strategy documentation

**Static Assets**: Cloudinary CDN

## Security Considerations

1. **Authentication**: Stack Auth (managed service)
   - Automatic token management (creation, validation, expiration, refresh)
   - Secure cookie storage (httpOnly, secure, sameSite)
   - Edge cases handled (expired tokens, concurrent sessions, invalid tokens)
   - Comprehensive error handling with Romanian messages

2. **Authorization**: Role-based checks in Server Actions
   - Standardized pattern: `requireAuth()` and `requireRole()` from `@/modules/auth/auth.service`
   - Ownership verification in service layer (clubs, doctors, children, uploads)
   - Club/Doctor management actions with role checks and ownership verification

3. **Input Validation**: Zod schemas
   - All Server Actions use Zod validation
   - Romanian error messages
   - Centralized schemas in `src/lib/validations/`

4. **SQL Injection Prevention**: Drizzle ORM parameterized queries
   - All queries use Drizzle ORM with automatic parameterization
   - No raw SQL queries or string concatenation
   - Fixed vulnerability in `saveStepData` function (key validation added)
   - Comprehensive audit: `docs/SQL_INJECTION_PREVENTION_AUDIT.md`

5. **CSRF Protection**: Next.js built-in protection + explicit middleware
   - Server Actions: Automatic CSRF protection (POST-only, origin validation, SameSite cookies)
   - Middleware: HTTP-to-HTTPS redirects in production (`src/proxy.ts`)
   - CORS utility: Created for future API routes (`src/lib/security/cors.ts`)
   - Comprehensive audit: `docs/CSRF_PROTECTION_AUDIT.md`

6. **XSS Protection**: React automatic escaping
   - React automatically escapes user input
   - No manual escaping needed

7. **File Uploads**: Cloudinary (validated, secure storage)
   - Validated file types and sizes
   - Secure storage and CDN delivery

8. **Environment Variables**: Never commit to git
   - All secrets use environment variables
   - Proper .gitignore configuration
   - Comprehensive audit: `docs/ENVIRONMENT_VARIABLE_SECURITY_AUDIT.md`

9. **HTTPS Enforcement**: Vercel automatic + explicit middleware
   - Vercel automatically enforces HTTPS (SSL certificates, HTTP redirects, HSTS headers)
   - Middleware: Explicit HTTP-to-HTTPS redirects in production
   - All external resources use HTTPS
   - Comprehensive audit: `docs/HTTPS_ENFORCEMENT_AUDIT.md`

10. **CORS Configuration**: Same-origin by default
    - All API routes are same-origin only (most secure)
    - CORS utility created for future cross-origin needs
    - Comprehensive audit: `docs/CORS_CONFIGURATION_AUDIT.md`

11. **Cookie Security**: Secure by default
    - Stack Auth cookies: httpOnly, secure, sameSite configured automatically
    - Custom cookies: Enhanced with secure flag for production
    - All cookies use SameSite=Lax for CSRF protection
    - Comprehensive audit: `docs/COOKIE_SECURITY_AUDIT.md`

12. **Rate Limiting**: In-memory rate limiting for abuse prevention
    - Applied to: auth actions, uploads, bookings, search actions
    - Configurable limits per action type
    - Location: `src/lib/rate-limit.ts`

13. **Audit Logging**: Complete audit trail for admin actions
    - Tracks: userId, action, entityType, entityId, oldValue, newValue, metadata, IP, user agent
    - Service: `modules/audit/audit.service.ts`
    - Non-blocking: Failures don't affect main operations

14. **Authentication Edge Cases**: Properly handled
    - Expired tokens: Graceful handling, redirect to login
    - Concurrent sessions: Supported securely (Stack Auth feature)
    - Invalid tokens: Rejected properly
    - Token refresh: Automatic (Stack Auth handles)
    - Comprehensive audit: `docs/AUTHENTICATION_EDGE_CASES_AUDIT.md`

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## Accessibility

- **ARIA Labels**: Bootstrap components include ARIA attributes
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Semantic HTML
- **Color Contrast**: WCAG AA compliance
- **Focus Management**: Visible focus indicators

## Monitoring & Analytics ✅ COMPLETE

**Status**: ✅ Complete - PostHog Phase 1 & 2 Complete, Person Properties Complete, Sentry Error Tracking Complete

**PostHog Analytics** (Phase 1 & 2 Complete ✅):

- ✅ PostHog packages installed (`posthog-js@^1.309.1`, `posthog-node@^5.17.4`)
- ✅ Next.js rewrites configured for PostHog ingestion (`/ingest` routes)
- ✅ Client-side PostHog setup (`src/lib/analytics/posthog.tsx`)
  - GDPR-compliant initialization (only after analytics cookie consent)
  - Privacy-first configuration (masked inputs, session recording)
  - Automatic pageview tracking
  - Error tracking enabled
- ✅ Server-side PostHog client (`src/lib/analytics/posthog-server.ts`)
  - Singleton pattern for server-side tracking
  - Graceful shutdown support
  - `distinctId` properly extracted from properties (no duplication)
- ✅ Event tracking infrastructure
  - Event names constants (`src/lib/analytics/events.ts`) - UPPERCASE_WITH_UNDERSCORES
  - Property names constants - camelCase
  - Type-safe TypeScript definitions
  - Client-side tracking utilities (`src/lib/analytics/tracking.ts`)
  - Server-side tracking utilities (`src/lib/analytics/tracking-server.ts`)
- ✅ Cookie consent integration
  - PostHog only initializes after user accepts analytics cookies
  - Cookie consent banner triggers PostHog initialization
  - Hook for watching consent changes (`usePostHogConsent`)
- ✅ Integration in root layout (`PostHogProviderWrapper`)
- ✅ Event tracking implementation (Phase 2 - Complete ✅)
  - ✅ Authentication events (signup, login, password reset, email verification)
  - ✅ Quiz events (started, step completed, completed)
  - ✅ Booking events (created, cancelled for clubs and doctors)
  - ✅ Discovery events (searches, favorites for clubs and doctors)
- ✅ User identification implementation ✅
  - ✅ `PostHogUserIdentification` component (`src/components/analytics/PostHogUserIdentification.tsx`)
  - ✅ Integrated into protected route layouts (parent, club, doctor)
  - ✅ Connects anonymous sessions with authenticated users
  - ✅ Uses person properties (`$set` for updatable, `$set_once` for immutable)
- ✅ Person properties optimization ✅ **COMPLETE** (January 2025)
  - ✅ `identifyUser()` supports `$set` and `$set_once` properties
  - ✅ User metadata stored as person properties (not sent with every event)
  - ✅ More efficient and follows PostHog best practices
  - ✅ Enhanced person properties implementation ✅
    - ✅ Signup: `email`, `role`, `name`, `signupDate` (via `user_signed_up` event)
    - ✅ Email verification: `emailVerified`, `emailVerifiedDate` (via `email_verified` event)
    - ✅ Login: `lastLoginDate` (via `user_logged_in` event)
    - ✅ Onboarding: `onboardingCompleted`, `onboardingCompletedDate`, `onboardingRole` (via `onboarding_completed` event)
    - ✅ Automatic sync: All properties updated on every protected page visit via `PostHogUserIdentification` component
    - ✅ TypeScript support: `PostHogEventProperties` type updated to support `$set` and `$set_once`
    - ✅ Documentation: `docs/POSTHOG_PERSON_PROPERTIES_IMPLEMENTATION.md` created

**Documentation**: `docs/POSTHOG_IMPLEMENTATION_PLAN.md`, `docs/MONITORING_SETUP_GUIDE.md`

**Error Tracking**:

- ✅ Sentry integration complete ✅ (January 2025)
  - ✅ Sentry SDK installed (`@sentry/nextjs@^10.31.0`)
  - ✅ Configuration files updated (server, edge, client)
    - ✅ Environment variables (NEXT_PUBLIC_SENTRY_DSN, SENTRY_DSN)
    - ✅ Production-optimized sampling rates (1.0 dev, 0.1 production)
    - ✅ Privacy-first replay settings (maskAllText, blockAllMedia)
    - ✅ Error filtering (browser extensions, network errors)
    - ✅ Debug logging disabled to reduce console noise
  - ✅ Next.js config integration (`withSentryConfig` in `next.config.ts`)
  - ✅ ErrorBoundary component (`src/components/shared/ErrorBoundary.tsx`)
    - ✅ Catches React errors and sends to Sentry
    - ✅ Romanian fallback UI
    - ✅ Integrated into root layout
  - ✅ User context tracking
    - ✅ `SentryUserContext` component (`src/components/shared/SentryUserContext.tsx`)
    - ✅ Sentry context utilities (`src/lib/monitoring/sentry-context.ts`)
    - ✅ Integrated into protected route layouts (parent, club, doctor)
    - ✅ Tracks user ID, email, role, name with errors
  - ✅ Environment variables documented in `.env.local.example`
  - ✅ Integration guide documentation (`docs/MONITORING_SETUP_GUIDE.md`)
- ✅ Vercel Logs documentation (built-in alternative)
  - Automatic log collection, dashboard access

**Analytics**:

- ✅ Vercel Analytics (built-in, recommended)
  - Zero-configuration setup, Web Vitals tracking
  - Real User Monitoring (RUM), performance insights
- ✅ Google Analytics setup (optional)
  - Property creation, Next.js integration with `next/script`
  - Custom event tracking examples
- ✅ Privacy-first analytics alternatives documented

**Performance Monitoring**:

- ✅ Web Vitals tracking implementation (January 2025)
  - ✅ Custom Web Vitals reporting utility (`src/lib/monitoring/web-vitals.ts`)
  - ✅ Integration with PostHog (`$web_vitals` events) and Sentry (distribution metrics)
  - ✅ Core Web Vitals tracking: LCP, INP (replaces FID), CLS, FCP, TTFB
  - ✅ WebVitalsReporter component (`src/components/monitoring/WebVitalsReporter.tsx`)
  - ✅ Integrated into root layout (`src/app/layout.tsx`)
  - ✅ `web-vitals` package installed (v5.1.0)
- ✅ API performance monitoring utilities (January 2025)
  - ✅ `trackApiPerformance()` - Track API route performance with Sentry
  - ✅ `trackApiHandler()` - Wrap API handlers with performance tracking
  - ✅ `trackServerActionPerformance()` - Track Server Action performance
  - ✅ `trackServerAction()` - Wrap Server Actions with performance tracking
  - ✅ Implementation location: `src/lib/monitoring/api-performance.ts`
- ✅ Structured logging utility
  - Log levels (debug, info, warn, error)
  - Structured JSON logging
  - Sentry integration for errors

**Additional Features**:

- ✅ Monitoring dashboard documentation
  - ✅ `docs/MONITORING_DASHBOARDS_SETUP.md` - Complete dashboard setup guide (PostHog + Sentry)
  - ✅ `docs/POSTHOG_DASHBOARD_SETUP.md` - PostHog-specific dashboard configuration
  - ✅ Dashboard layouts, best practices, and visualization recommendations
- ✅ Alerting setup
  - ✅ `docs/SENTRY_ALERTING_SETUP.md` - Complete Sentry alerting configuration guide
  - ✅ Error rate alerts (>5% error rate)
  - ✅ Slow page load alerts (>3s page load)
  - ✅ New issue alerts
  - ✅ Performance degradation alerts
  - ✅ Email notification configuration steps
- ✅ GDPR compliance considerations (cookie consent, data privacy)
- ✅ Implementation checklist, best practices, troubleshooting guide

## Development Workflow

1. **Feature Branch**: Create branch from main
2. **Development**: Implement feature
3. **Testing**: Manual testing + (future: automated tests)
4. **Code Review**: PR review
5. **Merge**: Merge to main
6. **Deploy**: Automatic Vercel deployment

## Known Constraints

1. **Phase 1 Scope**: Limited to sports, Bucharest, basic features
2. **AI Costs**: OpenAI API usage needs monitoring
3. **Database Limits**: Neon free tier limits (upgrade as needed)
4. **File Storage**: Cloudinary free tier limits
5. **Email Limits**: Brevo free tier limits
6. **Analytics**: PostHog free tier limits (1M events/month)

## Future Technical Enhancements

- **Testing**: Unit, integration, E2E tests
- **CI/CD**: GitHub Actions
- **Monitoring**: ✅ Error tracking (Sentry complete), analytics (PostHog complete, Vercel Analytics ready)
- **Caching**: Redis for advanced caching
- **Search**: Full-text search (Postgres or Algolia)
- **Real-time**: WebSockets for notifications
- **Mobile App**: React Native (future phase)

## Documentation References

- **Claude Guide**: `CLAUDE.md` - Comprehensive project guide for Claude Code with quick start, development commands, architecture patterns, troubleshooting, and quick reference
- **Architecture Overview**: `docs/ARCHITECTURE_OVERVIEW.md` - Complete architecture documentation with patterns, data flows, and design decisions
- **Code Generation Rules**: `docs/ PROMPTING_RULES_FOR_CODEGEN.md` - Comprehensive code generation guidelines
- **Brand Guidelines**: `docs/BRAND_GUIDELINES.md` - Visual identity, tone of voice, UX principles, and brand consistency guidelines
- **Components Guide**: `docs/COMPONENTS_GUIDE.md` - Component patterns, styling rules, and UI development guidelines
- **Copy Library**: `docs/COPY_LIBRARY.md` - All user-facing text, CTAs, messages, and Romanian language copy
- **Copywriting Guide**: `docs/COPYWRITING_GUIDE.md` - Copywriting principles, brand voice guidelines, writing templates, and best practices
- **Data Models**: `docs/DATA_MODELS.md` - All data structures, TypeScript interfaces, database schemas, and model relationships
- **Design Tokens**: `docs/DESIGN_TOKENS.md` - Comprehensive design tokens reference (colors, typography, spacing, shadows, border radius, animations, breakpoints)
- **SEO Guidelines**: `docs/SEO_GUIDELINES.md` - SEO strategy, slug generation, meta tags templates, Open Graph templates, and SEO best practices
- **SEO Improvement Plan**: `docs/SEO_IMPROVEMENT_PLAN.md` - Comprehensive SEO analysis of all public pages, critical issues, page-level recommendations, technical implementation plan, content expansion templates, and 30-60-90 day roadmap
- **SEO Components**:
  - `src/components/SEO/OrganizationSchema.tsx` - Organization JSON-LD structured data (root layout)
  - `src/components/SEO/BreadcrumbSchema.tsx` - BreadcrumbList JSON-LD structured data (all pages via BreadcrumbOne)
  - `src/components/SEO/FAQPageSchema.tsx` - FAQPage JSON-LD structured data (FAQ page)
  - `src/components/SEO/LocalBusinessSchema.tsx` - LocalBusiness (SportsActivityLocation) JSON-LD structured data (club detail pages)
  - `src/components/SEO/MedicalBusinessSchema.tsx` - MedicalBusiness (Physician) JSON-LD structured data (doctor detail pages)
  - `src/components/SEO/PersonSchema.tsx` - Person (Physician) JSON-LD structured data (doctor detail pages)
    - Includes comprehensive Person schema properties (credentials, professional affiliation, expertise areas, service catalog)
    - Complements MedicalBusiness schema for complete doctor structured data
  - `src/components/SEO/ArticleSchema.tsx` - Article JSON-LD structured data (sport detail pages)
    - Includes comprehensive Article schema properties for better SEO and rich snippets
    - Uses sport-specific OG images and expanded content when available
  - `src/lib/content/club-expanded-content.ts` - Dynamic content generator for club detail pages (600-900 words)
    - Generates comprehensive Romanian content dynamically from club data
    - Includes sport-specific benefits and contextual content
  - `src/lib/content/doctor-expanded-content.ts` - Dynamic content generator for doctor detail pages (600-900 words)
    - Generates comprehensive Romanian content dynamically from doctor data
    - Includes specialty-specific services and contextual content
  - `src/lib/seo/club-metadata.ts` - Enhanced metadata generator for club pages
    - Location-optimized titles, descriptions, keywords (city, district, sport, age groups)
    - Enhanced Open Graph and Twitter card metadata with location context
  - `src/lib/seo/doctor-metadata.ts` - Enhanced metadata generator for doctor pages
    - Location-optimized titles, descriptions, keywords (city, district, specialty, services)
    - Enhanced Open Graph and Twitter card metadata with location context
- **About Page Components**:
  - `src/components/features/about/AboutMain.tsx` - Main About page component with mission, value propositions, how it works, CTA sections
  - `src/components/features/about/AboutTeam.tsx` - Team members display component (4 members with bios, credentials, social links)
  - `src/components/features/about/AboutPartners.tsx` - Partners display component (6 partners organized by category)
  - `src/data/team-data.ts` - Team member data source with Romanian content
  - `src/data/partners-data.ts` - Partner data source with Romanian content
  - `public/assets/scss/layout/_about.scss` - Comprehensive SCSS styling for all About page components
    - Styles for hero, mission, value propositions, team, partners, how it works, and CTA sections
    - Responsive breakpoints, hover effects, animations following Yuvoo design patterns
    - Uses primary brand color (`var(--bd-theme-1)`) for step numbers and accents
- **Site Map**: `docs/SITE_MAP.md` - Complete application structure, all routes, user flows, and navigation patterns
- **Wireframes**: `docs/WIREFRAMES.md` - Detailed page structures, component placement, and layout specifications for all major pages
- **Authentication Integration Plan**: `docs/AUTH_INTEGRATION_PLAN.md` - Complete authentication system integration details, Stack Auth setup, Romanian localization, and implementation checklist
- **Vercel Deployment Guide**: `docs/VERCEL_DEPLOYMENT_GUIDE.md` - Complete Vercel deployment guide with step-by-step instructions, environment variables, domain setup, and troubleshooting
- **Database Deployment Guide**: `docs/DATABASE_DEPLOYMENT_GUIDE.md` - Complete Neon database deployment guide with connection setup, migrations, seed data, and best practices
- **Monitoring Setup Guide**: `docs/MONITORING_SETUP_GUIDE.md` - Complete monitoring setup guide with error tracking (Sentry), analytics (Vercel Analytics, Google Analytics), performance monitoring, and GDPR compliance
- **Performance Monitoring Setup**: `docs/PERFORMANCE_MONITORING_SETUP.md` - Complete performance monitoring implementation guide with Web Vitals tracking (LCP, INP, CLS, FCP, TTFB) and API performance monitoring utilities
- **Sentry Alerting Setup**: `docs/SENTRY_ALERTING_SETUP.md` - Complete Sentry alerting configuration guide with error rate alerts, performance alerts, and email notification setup
- **Monitoring Dashboards Setup**: `docs/MONITORING_DASHBOARDS_SETUP.md` - Complete dashboard setup guide for PostHog and Sentry with user flows, error rates, performance metrics, and dashboard best practices
- **System Patterns**: `memory-bank/systemPatterns.md` - Architecture patterns and design decisions
- **Active Context**: `memory-bank/activeContext.md` - Current work focus and recent changes
- **Progress Tracking**: `memory-bank/progress.md` - Development progress and completed items
