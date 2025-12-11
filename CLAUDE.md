# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Yuvoo** is an AI-powered platform helping Romanian parents discover suitable sports activities for their children (ages 4-14). The platform connects three core value propositions:

1. **AI Coach Quiz** - Personalized sport recommendations based on child profiles
2. **Verified Clubs Directory** - Curated list of verified sports clubs for children
3. **Pediatric Specialists Network** - Access to sport-relevant medical professionals

**Target Market**: Romania (starting with Bucharest)
**Phase**: MVP Development (16-week cycle)
**Language Requirement**: All user-facing content MUST be in Romanian

## Development Commands

### Essential Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm start                # Run production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes

# Database (Drizzle ORM + Neon Postgres)
npm run db:generate      # Generate migrations from schema
npm run db:push          # Push schema changes to database
npm run db:migrate       # Run pending migrations
npm run db:studio        # Open Drizzle Studio (GUI)
npm run db:seed          # Seed database with initial data

# Utilities
npm run clean            # Remove node_modules and lock files
npm run buildCommand     # Rebuild sharp + production build (Vercel)
```

## Architecture & Key Patterns

### Framework Stack

- **Next.js 16.0.8** with App Router and **Cache Components** enabled
- **React 19.2.1** with TypeScript 5.x
- **Drizzle ORM** with Neon serverless Postgres
- **Stack Auth** for authentication (fully integrated)
- **Tailwind CSS v4** (new components) + Bootstrap 5.3.3 (existing Kindedo theme)

### Next.js 16 Cache Components Pattern

**Critical**: Next.js 16 uses **dynamic-by-default** with opt-in caching via `"use cache"` directive.

**Legacy patterns removed**:

- ❌ `export const dynamic = "force-dynamic"` → Use dynamic APIs instead
- ❌ `export const revalidate` → Use `cacheLife()` instead
- ❌ `unstable_noStore()` → Dynamic by default

**Caching patterns**:

```typescript
// Public cache (same for all users)
"use cache"
import { cacheLife, cacheTag } from "next/cache"

async function getData() {
  cacheLife("hours") // Time-based revalidation
  cacheTag("resource-name") // Tag-based revalidation
  return await fetchData()
}

// Private cache (user-specific, prefetchable)
"use cache: private"
async function getUserData() {
  const user = await getUser()
  return user.data
}

// Dynamic content (default)
import { cookies, headers } from "next/headers"
async function DynamicPage() {
  const session = await cookies() // Dynamic APIs = no caching
  return <div>...</div>
}
```

**Dynamic routes MUST have `generateStaticParams()`** returning at least one value for Cache Components compatibility.

### Directory Structure

```
yuvoo-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Protected routes (parents)
│   │   │   ├── layout.tsx     # Auth check + layout
│   │   │   └── dashboard/     # Parent dashboard
│   │   ├── (public)/          # Public routes (no auth)
│   │   │   ├── quiz/          # AI Coach Quiz flow
│   │   │   ├── clubs/         # Club discovery
│   │   │   └── doctors/       # Doctor profiles
│   │   ├── (legal)/           # Legal pages (privacy, terms, cookies)
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login/         # Sign in
│   │   │   ├── register/      # Sign up
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   └── email-confirmation/
│   │   ├── actions/           # Server Actions (main backend)
│   │   ├── api/               # API routes (webhooks, cron)
│   │   └── layout.tsx         # Root layout with providers
│   │
│   ├── components/
│   │   ├── features/          # Feature-specific components
│   │   │   └── clubs/         # Club components (created)
│   │   ├── layout/            # Header, Footer, Sidebar
│   │   ├── ui/                # shadcn/ui components (planned)
│   │   └── shared/            # Common reusable components
│   │
│   ├── lib/
│   │   ├── auth/              # Stack Auth config & session
│   │   │   ├── stack.ts       # Stack Auth setup
│   │   │   ├── session.ts     # Session helpers (getSession, requireAuth)
│   │   │   └── errors.ts      # Romanian error messages
│   │   ├── db/                # Drizzle ORM
│   │   │   ├── schema.ts      # Database schema
│   │   │   ├── index.ts       # DB client
│   │   │   └── migrations/    # Migration files
│   │   ├── routes.ts          # **Single source of truth for all routes**
│   │   ├── validations/       # Zod schemas
│   │   └── integrations/      # External services (OpenAI, Cloudinary, Brevo)
│   │
│   ├── modules/               # Backend business logic (service layer)
│   │   ├── auth/
│   │   ├── quiz/
│   │   ├── clubs/
│   │   ├── doctors/
│   │   └── bookings/
│   │
│   ├── providers/             # React providers
│   │   └── StackAuthProvider.tsx  # Stack Auth wrapper
│   │
│   └── types/                 # Global TypeScript types
│
├── docs/                      # Comprehensive documentation
│   ├── ARCHITECTURE_OVERVIEW.md
│   ├── BRAND_GUIDELINES.md
│   ├── COMPONENTS_GUIDE.md
│   ├── COPY_LIBRARY.md
│   ├── COPYWRITING_GUIDE.md
│   ├── DATA_MODELS.md
│   ├── DESIGN_TOKENS.md
│   ├── SEO_GUIDELINES.md
│   ├── SITE_MAP.md
│   ├── WIREFRAMES.md
│   └── AUTH_INTEGRATION_PLAN.md
│
└── memory-bank/               # Project memory
    ├── systemPatterns.md      # Architecture patterns
    ├── techContext.md         # Tech stack details
    ├── productContext.md      # Product requirements
    └── progress.md            # Development tracking
```

### Routing Strategy

**Location**: `lib/routes.ts` - **Always import routes from here, never hardcode paths**

**SEO Strategy**:

- **Public routes** (Romanian for SEO): `/sporturi`, `/cluburi`, `/doctori`, `/chestionar`, `/despre-noi`
- **Internal routes** (English): `/auth/login`, `/parent/dashboard`, `/club/dashboard`

**Usage**:

```typescript
import { routes } from "@/lib/routes"

<Link href={routes.clubs.list}>Cluburi</Link>
<Link href={routes.clubs.detail("club-slug")}>Detalii Club</Link>
<Link href={routes.auth.login}>Login</Link>
```

### Server vs Client Components

**Default**: Server Components (all pages default to Server Components)

**Use Client Components (`'use client'`)** only when you need:

1. **Interactivity**: `onClick`, `onChange`, event handlers
2. **React Hooks**: `useState`, `useEffect`, `useContext`
3. **Browser APIs**: `localStorage`, `window`, `document`
4. **Third-party client libraries**: Swiper, React Hook Form, Redux
5. **Stack Auth client hooks**: `useStackApp()`, `useUser()`

**Pattern**: Server Components for data fetching, Client Components for interactivity

### Authentication Flow (Stack Auth)

**Integrated and Complete**: All authentication pages use Stack Auth client methods

**Client-side authentication**:

```typescript
"use client";
import { useStackApp } from "@stackframe/stack";

const stackApp = useStackApp();
await stackApp.signInWithCredential({ email, password });
await stackApp.signUpWithCredential({ email, password });
await stackApp.sendForgotPasswordEmail(email);
await stackApp.resetPasswordWithToken(code, password);
```

**Server-side session**:

```typescript
import { getSession, requireAuth } from "@/lib/auth/session";

// Optional auth check
const session = await getSession();

// Required auth (throws if not authenticated)
const session = await requireAuth();
```

**Error handling**:

```typescript
import { getErrorMessage } from "@/lib/auth/errors";

const errorMessage = getErrorMessage(error); // Returns Romanian message
```

**Redirect flow**:

- Login success → `/parent/dashboard`
- Signup success → `/parent/dashboard`
- Password reset → `/auth/login`

### Service Layer Pattern

**Location**: `modules/` directory

Each feature module contains:

- `*.service.ts` - Business logic
- `*.repository.ts` - Data access layer (Drizzle queries)
- `*.types.ts` - TypeScript interfaces

**Flow**: `Client Component → Server Action → Service → Repository → Database`

### Database Architecture

**ORM**: Drizzle ORM with Neon serverless Postgres

**Schema**: `lib/db/schema.ts`

**Core tables**:

- `users` - All user types (parent, club_admin, doctor, admin)
- `children` - Child profiles (linked to parents)
- `quizzes` - Quiz answers and AI recommendations
- `clubs` - Sports club information
- `doctors` - Pediatric specialist profiles
- `bookings` - Club trials and doctor consultations
- `favorites` - Saved clubs/doctors
- `reviews` - Moderated reviews

**Key relationships**:

```
users (1) → (many) children
children (1) → (many) quizzes
children (1) → (many) bookings
```

### TypeScript Path Aliases

**Configuration**: `tsconfig.json` uses `@/*` for `./src/*`

**Usage**:

```typescript
import { routes } from "@/lib/routes";
import ClubCard from "@/components/features/clubs/ClubCard";
import { getClubBySlug } from "@/modules/clubs/clubs.service";
```

## Critical Development Rules

### Language Requirements

**CRITICAL**: All user-facing content MUST be in Romanian:

- UI text, labels, buttons, messages
- Quiz questions and explanations
- Sport recommendations and reasoning (AI-generated)
- Club and doctor descriptions
- Email notifications and templates
- Error messages and validation text
- Onboarding flows and instructions

**Exception**: Technical documentation, code comments, and internal dev notes can be in English.

**AI Integration**: When using OpenAI, system prompts MUST explicitly instruct AI to generate ALL content in Romanian language only.

### Code Quality Standards

1. **Never hardcode routes** - Always use `@/lib/routes`
2. **Server Components first** - Only add `'use client'` when necessary
3. **Cache Components** - Use `"use cache"` directive for cacheable content, avoid legacy patterns
4. **Type safety** - Use TypeScript strict mode, validate with Zod schemas
5. **Authentication** - Use `requireAuth()` in Server Actions, Stack Auth hooks in client components
6. **Error handling** - Use centralized error messages from `@/lib/auth/errors`
7. **Import patterns** - Use `@/*` path alias consistently

### Migration Strategy

**Styling**: Gradual migration from Bootstrap (existing Kindedo theme) to Tailwind CSS (new components)

- Keep Bootstrap for existing components
- Use Tailwind for all new components
- Import order: `globals.scss` (Bootstrap) then `globals.css` (Tailwind)

**State Management**: Transition from Redux to Server Actions + React Context for new features

## Documentation Structure

### Comprehensive Docs (`docs/`)

Before implementing features, review these docs:

1. **ARCHITECTURE_OVERVIEW.md** - System architecture and patterns
2. **BRAND_GUIDELINES.md** - Visual identity, tone of voice, UX principles
3. **COMPONENTS_GUIDE.md** - Component patterns and styling rules
4. **COPY_LIBRARY.md** - All user-facing Romanian text and CTAs
5. **COPYWRITING_GUIDE.md** - Brand voice and writing standards
6. **DATA_MODELS.md** - Data structures and database schemas
7. **DESIGN_TOKENS.md** - Colors, typography, spacing, shadows
8. **SEO_GUIDELINES.md** - SEO strategy, meta tags, slug generation
9. **SITE_MAP.md** - Complete route structure and user flows
10. **WIREFRAMES.md** - Page layouts and component placement
11. **AUTH_INTEGRATION_PLAN.md** - Stack Auth integration details

### Memory Bank (`memory-bank/`)

Current project context:

- **systemPatterns.md** - Architecture patterns and design decisions
- **techContext.md** - Technology stack details and configuration
- **productContext.md** - Product requirements and business logic
- **progress.md** - Development progress tracking

## External Services

### Required Environment Variables

Create `.env.local` with:

```bash
# Database
DATABASE_URL="postgresql://..."

# Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID="..."
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="..."
STACK_SECRET_SERVER_KEY="..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Brevo (Email)
BREVO_API_KEY="..."
BREVO_SENDER_EMAIL="noreply@yuvoo.com"
BREVO_SENDER_NAME="Yuvoo"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Service Integrations

- **Stack Auth** - Managed authentication service (fully integrated)
- **Neon** - Serverless Postgres database
- **OpenAI** - GPT-4 Turbo for AI recommendations (Romanian language)
- **Cloudinary** - Image storage and CDN
- **Brevo** - Transactional email service

## Component Adaptation (Kindedo Theme)

The project started from the Kindedo educational template. Key adaptations:

**Completed**:

- `Class → Club` components (`components/features/clubs/`)
- Authentication pages with Stack Auth integration
- Legal pages (privacy, terms, cookies, GDPR)
- SEO-friendly Romanian routes

**Planned**:

- `Teacher → Doctor` profiles
- `Program → Sport` recommendations
- AI Coach Quiz implementation

**Reusable** (no changes needed):

- Header, Footer, Banner components
- Testimonials, Gallery, FAQ, Contact
- Animation patterns (WOW.js, Swiper)

## Development Workflow

1. Review relevant documentation in `docs/` before starting
2. Check `memory-bank/progress.md` for current status
3. Use `@/lib/routes` for all navigation
4. Server Components by default, Client Components when needed
5. Stack Auth for authentication, `requireAuth()` in Server Actions
6. All user-facing text in Romanian
7. Test locally with `npm run dev`
8. Lint and format before committing
9. Database changes via Drizzle migrations

## Performance & Security

**Performance**:

- Cache Components with `"use cache"` for cacheable content
- Server Components reduce client bundle size
- Cloudinary CDN for images
- Strategic database indexes
- Dynamic routes with `generateStaticParams()`

**Security**:

- Stack Auth for authentication
- Zod validation for all inputs
- Drizzle ORM (parameterized queries)
- Role-based authorization in Server Actions
- Environment variables never committed

## Deployment

**Platform**: Vercel
**Region**: fra1 (Frankfurt, Europe)
**Build**: Automatic on push to main branch
**Environment**: Configure variables in Vercel dashboard

---

**Project Status**: MVP Phase - Core pages and authentication complete, transitioning to feature development (Quiz, Clubs, Doctors)
