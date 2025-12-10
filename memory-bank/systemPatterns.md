# Yuvoo - System Patterns & Architecture

## Architecture Overview

**Pattern**: Next.js 15 Monolithic App with Modular Backend Pattern
**Deployment**: Vercel (Frontend) + Neon (Database) + Cloudinary (Media)
**Timeline**: 16-week MVP development cycle

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
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Header, Footer, Sidebar
│   ├── features/                # Feature-specific components
│   ├── forms/                   # Reusable form components
│   └── shared/                  # Common components
│
├── lib/
│   ├── auth/                    # Stack Auth configuration
│   ├── db/                      # Drizzle ORM setup & schema
│   ├── validations/             # Zod schemas
│   ├── integrations/            # External services (OpenAI, Cloudinary, Brevo)
│   └── utils/                    # Utility functions
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

### 4. Component Organization

**Feature-Based Components**: `components/features/`

- Organized by feature (quiz, clubs, doctors, children, bookings)
- Self-contained with related sub-components
- Reusable across different pages

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

### Stack Auth Integration

**Configuration**: `lib/auth/stack.ts`
**Session Management**: `lib/auth/session.ts`

**Flow**:

1. User authenticates via Stack Auth
2. Server Action checks Stack Auth session
3. Syncs with local `users` table (creates if needed)
4. Returns local user record

**Session Helper**:

```typescript
getSession() → { user: DBUser, stackUser: StackUser }
requireAuth() → throws if not authenticated
```

**Route Protection**:

- Layout-level: `app/(auth)/layout.tsx` checks session
- Server Actions: Use `requireAuth()` helper
- Middleware: Optional for additional protection

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

### Next.js Cache

**Server Actions**: Use `revalidatePath()` after mutations
**Static Generation**: Club and doctor detail pages (SSG)
**Dynamic Routes**: Quiz results, user dashboards (SSR)

**Revalidation Triggers**:

- After quiz submission
- After booking creation/cancellation
- After profile updates
- After favorite toggles

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

   - Location: `src/components/Class/`
   - Adapt: Class cards → Club cards
   - Add: Verification badge, sport filters, location map
   - Data: `class-data.ts` → `club-data.ts`

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

### Client Components

**When to Use**:

- Interactive elements (forms, buttons)
- State management (useState, useEffect)
- Browser APIs (localStorage, window)

**Marking**: `'use client'` directive

**Current Pattern** (Kindedo):

- Most components are Client Components
- Uses Redux for global state
- Uses custom hooks (`useContext`, `useStickyHeader`, etc.)

**Future Pattern**:

- Server Components by default
- Client Components only when needed
- Server Actions instead of Redux for data

### Server Components

**When to Use**:

- Data fetching
- Static content
- SEO-important pages

**Default**: All components are Server Components unless marked `'use client'`

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

1. **Static Generation**: Club/doctor detail pages
2. **Server Components**: Reduce client bundle
3. **Image Optimization**: Cloudinary + Next.js Image
4. **Database Indexing**: Strategic indexes on search fields
5. **Caching**: Next.js cache + revalidation
6. **Code Splitting**: Automatic via Next.js
