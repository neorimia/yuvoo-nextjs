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
│   ├── ui/                      # shadcn/ui components (planned)
│   ├── layout/                  # Header, Footer, Sidebar
│   ├── features/                # Feature-specific components
│   │   └── clubs/               # Club components (✅ created)
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
│   ├── quiz/
│   ├── clubs/
│   ├── doctors/
│   ├── bookings/
│   └── favorites/
│
├── types/                        # Global TypeScript types
└── styles/                       # Global styles + Tailwind
```

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

- ✅ `components/features/clubs/` - Club components created (ClubsMain, ClubDetailsMain, HomeClubArea, ClubCard, VerificationBadge)
- 📋 `components/features/doctors/` - Doctor components (planned)
- 📋 `components/features/sports/` - Sport components (planned)
- 📋 `components/features/quiz/` - Quiz components (planned)

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

### Stack Auth Integration ✅ COMPLETE

**Configuration**: `lib/auth/stack.ts`
**Session Management**: `lib/auth/session.ts`
**Client Provider**: `src/providers/StackAuthProvider.tsx` (wraps StackProvider and StackTheme)
**Error Handling**: `lib/auth/errors.ts` (Romanian error messages)

**Client-Side Integration**:

- **Provider Setup**: `StackAuthProvider` wraps entire app in root layout
- **Hooks Used**: `useStackApp()` for authentication methods
- **Forms**: All authentication forms are client components using Stack Auth methods
  - `signInWithCredential()` - Sign in
  - `signUpWithCredential()` - Sign up
  - `sendForgotPasswordEmail()` - Password reset request
  - `resetPasswordWithToken()` - Password reset with token
  - `verifyEmail()` - Email verification

**Authentication Flow**:

1. User authenticates via Stack Auth (client-side)
2. Stack Auth manages session
3. Server Actions can check Stack Auth session via `lib/auth/session.ts`
4. Syncs with local `users` table (creates if needed)
5. Returns local user record

**Session Helper**:

```typescript
getSession() → { user: DBUser, stackUser: StackUser }
requireAuth() → throws if not authenticated
```

**Route Protection**:

- Layout-level: `app/(auth)/layout.tsx` checks session
- Server Actions: Use `requireAuth()` helper
- Middleware: Optional for additional protection

**Authentication Pages** (All completed with Romanian localization):

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

**Redirects**:

- Successful login → `/parent/dashboard`
- Successful signup → `/parent/dashboard`
- Successful password reset → `/auth/login`
- Successful email verification → `/auth/login`

## AI Integration Pattern

### OpenAI Integration

**Location**: `modules/quiz/quiz.service.ts`

**Pattern**:

1. Collect quiz answers
2. Build structured prompt
3. Call OpenAI with system prompt (pediatric sports specialist persona)
4. Parse JSON response
5. Store recommendations in database

**AI Model**: GPT-4 Turbo (Phase 1)
**Response Format**: Structured JSON with recommendations array
**Language Requirement**: System prompts must explicitly instruct AI to generate all content (recommendations, explanations, reasoning) in Romanian language only.

**Future**: ML models for improved matching

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

- Specialty (exact match)
- City (exact match)
- Verified status
- Accepting new patients
- Text search (name, bio)

## File Upload Pattern

### Cloudinary Integration

**Location**: `lib/integrations/cloudinary/`

**Use Cases**:

- Club logos and photos
- Doctor profile photos
- Child avatars
- User avatars

**Flow**:

1. Client uploads to Server Action
2. Server Action uploads to Cloudinary
3. Returns Cloudinary URL
4. Store URL in database

## Email Notification Pattern

### Brevo Integration

**Location**: `lib/integrations/brevo/`

**Use Cases**:

- Booking confirmations
- Quiz result summaries
- Verification status updates
- Reminder emails

**Templates**: `lib/integrations/brevo/templates.ts`

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
     - `VerificationBadge.tsx` - Club verification badge component
   - Features added:
     - ✅ Verification badge display
     - ✅ Sport information display
     - ✅ Location display (city, district, address)
     - ✅ Age groups display
     - ✅ Pricing information (RON, monthly/per_class/per_semester)
     - ✅ SEO-friendly routes (`/cluburi`, `/cluburi/:slug`)
   - Data: `class-data.ts` → `club-data.ts` (📋 Planned)

2. **Teacher → Doctor**:
   - Location: `src/components/Teacher/`
   - Adapt: Teacher profiles → Doctor profiles
   - Add: Medical specialties, availability calendar
   - Data: `teacher-data.ts` → `doctor-data.ts`

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

**Migration Strategy**: See `designSystem.md` for detailed migration plan from Bootstrap to Tailwind.

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

1. **Authentication**: Stack Auth handles all auth
2. **Authorization**: Role-based (parent, club_admin, doctor, admin)
3. **Input Validation**: Zod schemas for all inputs
4. **SQL Injection**: Drizzle ORM parameterized queries
5. **XSS**: React automatic escaping
6. **CSRF**: Next.js built-in protection
7. **File Uploads**: Cloudinary handles storage and CDN

## Performance Patterns

1. **Cache Components**: Explicit caching with `"use cache"` for cacheable content
2. **Static Shells**: Cached components create static shells for instant loading
3. **Server Components**: Default (reduces client bundle)
4. **Image Optimization**: Cloudinary + Next.js Image
5. **Database Indexing**: Strategic indexes on search fields
6. **Caching**: Cache Components with time-based and tag-based revalidation
7. **Code Splitting**: Automatic via Next.js

## Documentation References

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
- **System Patterns**: `memory-bank/systemPatterns.md` - This file
- **Technical Context**: `memory-bank/techContext.md` - Technology stack details
- **Product Context**: `memory-bank/productContext.md` - Product requirements
- **Progress Tracking**: `memory-bank/progress.md` - Development progress
