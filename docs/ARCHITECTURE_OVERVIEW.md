# Yuvoo - Architecture Overview

## Executive Summary

Yuvoo is built as a **Next.js 16 monolithic application** using the **App Router** with **Cache Components** enabled. The architecture follows a **modular backend pattern** with a clear separation between presentation (App Router), business logic (Service Layer), and data access (Repository Pattern).

**Key Technologies**:

- **Framework**: Next.js 16.0.8 with Cache Components
- **Runtime**: React 19.2.1 (Server Components by default)
- **Database**: Neon (Serverless Postgres) with Drizzle ORM
- **Authentication**: Stack Auth
- **Deployment**: Vercel (Frontend) + Neon (Database) + Cloudinary (Media)

---

## Core Architecture Principles

### 1. Monolithic Next.js App

- Single codebase using Next.js App Router
- All routes, components, and business logic in one repository
- Simplified deployment and development workflow

### 2. Server Actions First

- Primary backend logic via Next.js Server Actions
- No separate API layer for most operations
- Direct database access from Server Actions
- Type-safe with TypeScript and Zod validation

### 3. Service Layer Pattern

- Business logic separated from routes in `modules/` directory
- Each feature has its own service, repository, and types
- Reusable business logic across different entry points

### 4. Type Safety

- Full TypeScript throughout the codebase
- Zod schemas for runtime validation
- Type inference from schemas
- No `any` types policy

### 5. Component Modularity

- Feature-based component organization
- Server Components by default
- Client Components only when needed (interactivity, hooks)

---

## Technology Stack

### Core Framework

- **Next.js**: 16.0.8 with Cache Components enabled
- **React**: 19.2.1
- **TypeScript**: 5.x (strict mode)
- **Node.js**: 20+ required

### Database & ORM

- **Database**: Neon (Serverless Postgres)
- **ORM**: Drizzle ORM 0.36.4
- **Migrations**: Drizzle Kit 0.28.1

### Authentication

- **Stack Auth**: 2.5.40+
- Handles user authentication, sessions, OAuth
- Syncs with local database for extended user data

### Styling

- **Bootstrap**: 5.3.3 (existing components)
- **Tailwind CSS**: 4.1.17 (new components)
- **SCSS**: 1.75.0 (custom styles)
- **Migration Strategy**: Gradual migration from Bootstrap to Tailwind

### Validation

- **Zod**: 3.22.4
- All user input validated
- Type inference from schemas

### External Services

- **OpenAI**: 4.72.0+ (AI recommendations)
- **Cloudinary**: 2.5.1+ (Media storage & CDN)
- **Brevo**: 2.2.0+ (Email service)

---

## Next.js 16 Cache Components

### Paradigm Shift

**Before (Next.js 15)**: Routes were static by default, you opted into dynamic rendering  
**After (Next.js 16)**: Routes are dynamic by default, you opt into caching with `"use cache"`

### Key Features

1. **Dynamic by Default**
   - All routes execute at request time by default
   - No need to opt-out of static rendering
   - Use `"use cache"` to opt-in to caching

2. **Explicit Caching**
   - `"use cache"` - Public cache for build-time prerendering
   - `"use cache: private"` - Private cache for runtime prefetching
   - `"use cache: remote"` - Persistent cache for serverless environments

3. **Runtime Prefetching**
   - Prefetch routes with actual runtime values (cookies, params, searchParams)
   - Instant client navigations without loading states
   - Cache snapshots of components in static shells

### Caching Patterns

**Public Cache** (`"use cache"`):

```typescript
"use cache";
// import { cacheLife } from "next/cache";

export default async function CachedComponent() {
  // cacheLife('hours') - configure as needed
  return <div>Cached content</div>;
}
```

**Dynamic Content** (default):

```typescript
export default async function DynamicPage() {
  await cookies(); // Makes route dynamic
  const data = await fetchData();
  return <div>{data}</div>;
}
```

**Suspense Boundaries**:

```typescript
export default function Page() {
  return (
    <div>
      <CachedHeader />
      <Suspense fallback={<Loading />}>
        <DynamicContent />
      </Suspense>
    </div>
  );
}
```

### Removed Patterns

❌ **DO NOT USE**:

- `export const dynamic = "force-dynamic"` - Removed, use dynamic APIs instead
- `export const revalidate` - Removed, use `cacheLife()` instead
- `export const fetchCache` - Removed, use `"use cache"` instead
- `unstable_noStore()` - Removed, dynamic by default

✅ **USE INSTEAD**:

- `"use cache"` for cacheable content (must be async functions)
- `<Suspense>` boundaries for dynamic content
- `cacheLife()` for time-based revalidation
- `cacheTag()` for on-demand revalidation

---

## Directory Structure

```
yuvoo-nextjs/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Public marketing pages
│   ├── (public)/                # Public app pages (no auth)
│   │   ├── quiz/                # AI Coach Quiz flow
│   │   ├── cluburi/             # Club discovery (Romanian SEO routes)
│   │   ├── doctori/             # Doctor profiles (Romanian SEO routes)
│   │   └── sporturi/            # Sports directory (Romanian SEO routes)
│   ├── parent/                  # Protected parent routes
│   │   ├── dashboard/
│   │   ├── children/
│   │   ├── bookings/
│   │   └── settings/
│   ├── club/                    # Club admin portal
│   ├── doctor/                  # Doctor portal
│   ├── admin/                   # Admin dashboard
│   ├── api/                     # API routes (webhooks, cron)
│   └── actions/                 # Server Actions (main backend)
│
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Header, Footer, Sidebar
│   ├── features/                # Feature-specific components
│   │   └── clubs/               # Club components
│   ├── forms/                   # Reusable form components
│   └── shared/                  # Common components
│
├── lib/
│   ├── auth/                    # Stack Auth configuration
│   ├── db/                      # Drizzle ORM setup & schema
│   ├── validations/             # Zod schemas
│   ├── integrations/            # External services (OpenAI, Cloudinary, Brevo)
│   ├── utils/                   # Utility functions
│   └── routes.ts               # Single source of truth for all routes
│
├── modules/                     # Backend Business Logic (Service Layer)
│   ├── auth/
│   ├── children/
│   ├── quiz/
│   ├── clubs/
│   ├── doctors/
│   ├── bookings/
│   └── favorites/
│
├── types/                       # Global TypeScript types
├── public/                      # Static assets
└── docs/                        # Documentation
```

---

## Data Flow Patterns

### Server Actions Flow

```
Client Component
    ↓ (form submission)
Server Action (app/actions/*.ts)
    ↓ (validation with Zod)
Service Layer (modules/*/*.service.ts)
    ↓ (business logic)
Repository (modules/*/*.repository.ts)
    ↓ (data access)
Database (Neon Postgres via Drizzle ORM)
    ↓ (response)
Service Layer
    ↓ (data transformation)
Server Action
    ↓ (cache revalidation)
Client Component (updated UI)
```

### Data Fetching Flow

```
Page Component (Server Component)
    ↓ (direct call)
Service Layer (modules/*/*.service.ts)
    ↓ (business logic)
Repository (modules/*/*.repository.ts)
    ↓ (data access)
Database
    ↓ (response)
Service Layer
    ↓ (data transformation)
Page Component (rendered HTML)
```

---

## Key Design Patterns

### 1. Server Actions Pattern

**Location**: `app/actions/`

Server Actions handle:

- Authentication checks (`requireAuth()`)
- Input validation (Zod schemas)
- Service layer calls
- Database operations
- Cache revalidation (`revalidatePath()`, `updateTag()`)
- Error handling

**Example**:

```typescript
"use server";

import { z } from "zod";
import { requireAuth } from "@/lib/auth/session";
import { createClub } from "@/modules/clubs/clubs.service";

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

export async function createClubAction(input: z.infer<typeof schema>) {
  const session = await requireAuth();
  const validated = schema.parse(input);
  const club = await createClub(validated, session.dbUser.id);
  return { success: true, data: club };
}
```

### 2. Service Layer Pattern

**Location**: `modules/`

Each feature module contains:

- `*.service.ts` - Business logic
- `*.repository.ts` - Data access
- `*.types.ts` - TypeScript types
- Optional: `*.search.ts`, `*.analyzer.ts`, `*.notifications.ts`

**Benefits**:

- Reusable business logic
- Testable in isolation
- Clear separation of concerns
- Type-safe operations

### 3. Repository Pattern

**Location**: `modules/*/*.repository.ts`

Repositories handle:

- Database queries (Drizzle ORM)
- Data transformation
- Query optimization
- Type-safe database operations

### 4. Component Patterns

**Server Components** (default):

- No `"use client"` directive
- Can directly call Server Actions
- Can access database/services
- Rendered on server

**Client Components** (when needed):

- `"use client"` directive required
- For interactivity, hooks, browser APIs
- Form handling, animations, user input

**Cached Components** (Cache Components):

- `"use cache"` directive (must be async)
- For content same for all users
- Configure with `cacheLife()` or `cacheTag()`

---

## Routing & SEO Strategy

### Route Organization

**Public SEO Routes** (Romanian for SEO):

- `/sporturi` - Sports directory
- `/cluburi` - Clubs directory
- `/doctori` - Doctors directory
- `/chestionar` - Quiz
- `/despre-noi` - About
- `/intrebari-frecvente` - FAQ

**Internal Routes** (English, not SEO-sensitive):

- `/auth/login` - Authentication
- `/parent/dashboard` - Parent dashboard
- `/club/dashboard` - Club portal
- `/admin/dashboard` - Admin panel

**Route Groups**:

- `(marketing)` - Marketing pages
- `(public)` - Public app pages
- Route groups don't appear in URL

### Dynamic Routes

All dynamic routes MUST have `generateStaticParams()`:

```typescript
export async function generateStaticParams() {
  // TODO: Replace with real data fetching
  return [{ slug: "example" }];
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params; // Always await in Next.js 16
  return <div>{slug}</div>;
}
```

### Route Management

**Single Source of Truth**: `lib/routes.ts`

- Type-safe route definitions
- Helper functions (`isProtectedRoute`, `buildUrl`)
- Never hardcode paths - always use `@/lib/routes`

---

## Caching Strategy

### Cache Components (Next.js 16)

**Public Cache** (`"use cache"`):

- For content same for all users
- Use `cacheLife('hours')` for time-based revalidation
- Use `cacheTag('resource')` for on-demand revalidation
- Example: Footer components, static pages

**Private Cache** (`"use cache: private"`):

- For user-specific prefetchable content
- Can access cookies/params at runtime
- Prefetched with actual runtime values

**Dynamic Content** (default):

- Use `<Suspense>` boundaries for dynamic content
- Access `cookies()`, `headers()`, `params` for dynamic rendering
- Example: Protected pages, user dashboards

### Revalidation

**Time-based**:

```typescript
"use cache";
import { cacheLife } from "next/cache";

export default async function Page() {
  cacheLife("hours"); // Revalidate every hour
  // ...
}
```

**Tag-based**:

```typescript
"use cache";
import { cacheTag } from "next/cache";

export default async function Page() {
  cacheTag("clubs"); // Tag for on-demand revalidation
  // ...
}

// Later, in Server Action:
import { updateTag } from "next/cache";
await updateTag("clubs"); // Immediate revalidation
```

**Path-based**:

```typescript
import { revalidatePath } from "next/cache";
await revalidatePath("/cluburi"); // Revalidate specific path
```

---

## Authentication & Authorization

### Stack Auth Integration

**Configuration**: `lib/auth/stack.ts`

- Stack Auth handles authentication
- Syncs with local database for extended user data
- Session management via cookies

**Session Flow**:

1. User authenticates via Stack Auth
2. Server gets Stack Auth user
3. Syncs with local `users` table
4. Returns combined session

**Protected Routes**: `proxy.ts` (formerly middleware.ts)

- Checks authentication for protected routes
- Redirects to login if not authenticated
- Role-based access control

### Authorization Patterns

**Server Actions**:

```typescript
export async function protectedAction() {
  const session = await requireAuth(); // Throws if not authenticated
  // ... action logic
}
```

**Role-based**:

```typescript
export async function adminAction() {
  const session = await requireRole("admin"); // Throws if not admin
  // ... admin logic
}
```

---

## State Management

### Server State

- **Server Components**: Direct data fetching
- **Server Actions**: Mutations and updates
- **Cache Revalidation**: Keep data fresh

### Client State

- **React State**: `useState` for local component state
- **Redux Toolkit**: Legacy state management (being phased out)
- **Form State**: `react-hook-form` for form management

**Migration Strategy**: Gradually replace Redux with Server Actions + React state

---

## Error Handling

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
4. Client displays user-friendly message (Romanian)

### Validation Errors

**Zod Validation**:

- All user input validated with Zod
- Type-safe parsing
- Clear error messages (Romanian)
- Client-side and server-side validation

### Error Pages

- `error.tsx` - Route-level error boundaries
- `not-found.tsx` - 404 pages
- Romanian error messages

---

## Performance Optimizations

### Next.js Optimizations

- **Server Components**: Default (reduces client bundle)
- **Cache Components**: Explicit caching with `"use cache"`
- **Image Optimization**: Next.js Image component + Cloudinary
- **Code Splitting**: Automatic route-based splitting
- **Static Shells**: Cached components create static shells

### Database Optimizations

- **Indexes**: Strategic indexes on search fields
- **Connection Pooling**: Neon handles automatically
- **Query Optimization**: Drizzle ORM efficient queries

### Caching

- **Next.js Cache**: Cache Components for explicit caching
- **Revalidation**: Time-based and tag-based strategies
- **Static Assets**: Cloudinary CDN

---

## Security Considerations

1. **Authentication**: Stack Auth (managed service)
2. **Authorization**: Role-based checks in Server Actions
3. **Input Validation**: Zod schemas for all inputs
4. **SQL Injection**: Drizzle ORM parameterized queries
5. **XSS**: React automatic escaping
6. **CSRF**: Next.js built-in protection
7. **File Uploads**: Cloudinary (validated, secure storage)
8. **Environment Variables**: Never commit to git
9. **API Keys**: Store in environment variables only

---

## Deployment

### Vercel Configuration

**Platform**: Vercel  
**Region**: `fra1` (Frankfurt, Europe)  
**Framework**: Next.js (auto-detected)

**Build Process**:

1. Install dependencies
2. Run `npm run build`
3. Deploy `.next` output directory
4. Environment variables from Vercel dashboard

### Environment Variables

**Required**:

- Database URL (Neon)
- Stack Auth keys
- OpenAI API key
- Cloudinary credentials
- Brevo API key
- App URL

**Configuration**: Set in Vercel dashboard, referenced in `vercel.json`

---

## Development Workflow

### Code Generation Rules

**Reference**: `docs/ PROMPTING_RULES_FOR_CODEGEN.md`

Key principles:

- Next.js 16 Cache Components patterns
- Server Components by default
- Type safety with TypeScript and Zod
- Romanian language for user-facing content
- File naming conventions
- Error handling patterns

### Code Quality

- **ESLint**: Next.js recommended rules
- **Prettier**: Code formatting
- **TypeScript**: Strict mode enabled
- **Git Hooks**: Pre-commit formatting and linting

---

## Key Architectural Decisions

### 1. Monolithic vs Microservices

**Decision**: Monolithic Next.js app  
**Rationale**: Simpler deployment, easier development, sufficient for MVP scale

### 2. Server Actions vs API Routes

**Decision**: Server Actions first  
**Rationale**: Type-safe, simpler, better developer experience

### 3. Service Layer Pattern

**Decision**: Business logic in `modules/` directory  
**Rationale**: Reusable, testable, clear separation of concerns

### 4. Cache Components

**Decision**: Enabled Cache Components mode  
**Rationale**: Better caching control, explicit opt-in, improved performance

### 5. Hybrid Styling

**Decision**: Bootstrap for existing, Tailwind for new  
**Rationale**: Gradual migration, minimize disruption, leverage existing components

---

## Future Enhancements

- **Testing**: Unit, integration, E2E tests
- **CI/CD**: GitHub Actions
- **Monitoring**: Error tracking, analytics
- **Advanced Caching**: Redis for complex caching scenarios
- **Search**: Full-text search (Postgres or Algolia)
- **Real-time**: WebSockets for notifications
- **Mobile App**: React Native (future phase)

---

## References

- **Code Generation Rules**: `docs/ PROMPTING_RULES_FOR_CODEGEN.md`
- **System Patterns**: `memory-bank/systemPatterns.md`
- **Technical Context**: `memory-bank/techContext.md`
- **Product Context**: `memory-bank/productContext.md`
- **Progress Tracking**: `memory-bank/progress.md`

---

## Summary

Yuvoo follows a **modern Next.js 16 architecture** with:

- ✅ **Cache Components** for explicit caching control
- ✅ **Server Actions** for backend logic
- ✅ **Service Layer** for business logic separation
- ✅ **Type Safety** throughout (TypeScript + Zod)
- ✅ **Modular Structure** for maintainability
- ✅ **SEO-Optimized** Romanian routes
- ✅ **Scalable** foundation for future growth

This architecture provides a solid foundation for the MVP while remaining flexible for future enhancements.
