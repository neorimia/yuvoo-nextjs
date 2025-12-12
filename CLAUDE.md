# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Table of Contents

- [Project Overview](#project-overview)
- [Quick Start](#quick-start)
- [Development Commands](#development-commands)
- [Architecture & Key Patterns](#architecture--key-patterns)
- [Critical Development Rules](#critical-development-rules)
- [Documentation Structure](#documentation-structure)
- [External Services](#external-services)
- [Component Adaptation](#component-adaptation-kindedo-theme)
- [Development Workflow](#development-workflow)
- [Testing Guidelines](#testing-guidelines)
- [Troubleshooting](#troubleshooting)
- [Quick Reference](#quick-reference)

---

## Project Overview

**Yuvoo** is an AI-powered platform helping Romanian parents discover suitable sports activities for their children (ages 4-14). The platform connects three core value propositions:

1. **AI Coach Quiz** - Personalized sport recommendations based on child profiles
2. **Verified Clubs Directory** - Curated list of verified sports clubs for children
3. **Pediatric Specialists Network** - Access to sport-relevant medical professionals

**Target Market**: Romania (starting with Bucharest)  
**Phase**: MVP Development (16-week cycle)  
**Language Requirement**: ⚠️ **CRITICAL** - All user-facing content MUST be in Romanian

### Current Project Status

- ✅ **Foundation**: Next.js 16.0.8, React 19.2.1, TypeScript 5.x
- ✅ **Authentication**: Stack Auth fully integrated
- ✅ **Database**: Drizzle ORM + Neon Postgres configured
- ✅ **Routing**: SEO-friendly Romanian routes implemented
- ✅ **Legal Pages**: Privacy, Terms, Cookies, GDPR complete
- 🚧 **In Progress**: Email confirmation flow, onboarding
- 📋 **Planned**: AI Quiz, Clubs directory, Doctors network

---

## Quick Start

### First Time Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Initialize database
npm run db:push

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

### Daily Development

```bash
# Start dev server
npm run dev

# Check code quality
npm run lint
npm run format:check

# Format code
npm run format

# Database operations
npm run db:studio  # Open Drizzle Studio GUI
npm run db:generate  # Generate migrations
npm run db:push  # Push schema changes
```

---

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
npm run db:check         # Check migration status

# Utilities
npm run clean            # Remove node_modules and lock files
npm run buildCommand     # Rebuild sharp + production build (Vercel)
```

### Command Details

- **`npm run dev`**: Starts Next.js dev server with hot reload on port 3000
- **`npm run build`**: Creates optimized production build
- **`npm run db:push`**: Syncs schema changes directly to database (development)
- **`npm run db:generate`**: Creates migration files (production workflow)
- **`npm run db:studio`**: Opens Drizzle Studio at `http://localhost:4983`

---

## Architecture & Key Patterns

### Framework Stack

- **Next.js 16.0.8** with App Router and **Cache Components** enabled
- **React 19.2.1** with TypeScript 5.x
- **Drizzle ORM** with Neon serverless Postgres
- **Stack Auth** for authentication (fully integrated)
- **Tailwind CSS v4** (new components) + Bootstrap 5.3.3 (existing Kindedo theme)

### Next.js 16 Cache Components Pattern

**Critical**: Next.js 16 uses **dynamic-by-default** with opt-in caching via `"use cache"` directive.

#### Legacy Patterns (REMOVED)

❌ **DO NOT USE** these patterns:

```typescript
// ❌ OLD - Don't use
export const dynamic = "force-dynamic";
export const revalidate = 3600;
unstable_noStore();
```

#### Modern Caching Patterns

✅ **Public cache** (same for all users):

```typescript
"use cache";
import { cacheLife, cacheTag } from "next/cache";

async function getClubs() {
  cacheLife("hours"); // Time-based revalidation (1 hour)
  cacheTag("clubs"); // Tag-based revalidation
  return await db.query.clubs.findMany();
}
```

✅ **Private cache** (user-specific, prefetchable):

```typescript
"use cache: private";
async function getUserDashboard() {
  const session = await requireAuth();
  cacheTag(`user-${session.userId}`);
  return await getUserData(session.userId);
}
```

✅ **Dynamic content** (default, no caching):

```typescript
import { cookies, headers } from "next/headers"

async function DynamicPage() {
  const session = await cookies() // Dynamic API = no caching
  const userAgent = await headers()
  return <div>User-specific content</div>
}
```

#### Important Rules

- **Dynamic routes MUST have `generateStaticParams()`** returning at least one value for Cache Components compatibility
- Using dynamic APIs (`cookies()`, `headers()`, `searchParams`) automatically makes the route dynamic
- Cache tags enable fine-grained revalidation via `revalidateTag()`

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
│   │   │   ├── clubs/        # Club components
│   │   │   ├── quiz/         # Quiz components
│   │   │   └── doctors/      # Doctor components
│   │   ├── layout/           # Header, Footer, Sidebar
│   │   ├── ui/               # shadcn/ui components
│   │   ├── shared/           # Common reusable components
│   │   ├── Form/             # Form components
│   │   └── Auth/             # Auth-specific components
│   │
│   ├── lib/
│   │   ├── auth/             # Stack Auth config & session
│   │   │   ├── stack.ts      # Stack Auth setup
│   │   │   ├── session.ts    # Session helpers (getSession, requireAuth)
│   │   │   └── errors.ts     # Romanian error messages
│   │   ├── db/               # Drizzle ORM
│   │   │   ├── schema.ts     # Database schema
│   │   │   ├── index.ts      # DB client
│   │   │   └── migrations/   # Migration files
│   │   ├── routes.ts         # ⚠️ SINGLE SOURCE OF TRUTH for all routes
│   │   ├── validations/      # Zod schemas
│   │   └── integrations/     # External services (OpenAI, Cloudinary, Brevo)
│   │
│   ├── modules/              # Backend business logic (service layer)
│   │   ├── auth/
│   │   ├── quiz/
│   │   ├── clubs/
│   │   ├── doctors/
│   │   └── bookings/
│   │
│   ├── providers/            # React providers
│   │   └── StackAuthProvider.tsx
│   │
│   └── types/                # Global TypeScript types
│
├── docs/                     # Comprehensive documentation
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
└── memory-bank/              # Project memory
    ├── systemPatterns.md    # Architecture patterns
    ├── techContext.md        # Tech stack details
    ├── productContext.md     # Product requirements
    ├── activeContext.md      # Current work focus
    └── progress.md           # Development tracking
```

### Routing Strategy

**Location**: `lib/routes.ts` - **⚠️ ALWAYS import routes from here, NEVER hardcode paths**

#### SEO Strategy

- **Public routes** (Romanian for SEO): `/sporturi`, `/cluburi`, `/doctori`, `/chestionar`, `/despre-noi`
- **Internal routes** (English): `/auth/login`, `/parent/dashboard`, `/club/dashboard`

#### Usage Examples

```typescript
import { routes } from "@/lib/routes"

// Navigation links
<Link href={routes.clubs.list}>Cluburi</Link>
<Link href={routes.clubs.detail("club-slug")}>Detalii Club</Link>
<Link href={routes.auth.login}>Login</Link>

// Server Actions redirects
import { redirect } from "next/navigation"
redirect(routes.parent.dashboard)

// Form actions
<form action={routes.auth.register}>
```

#### Route Structure

Routes are organized by feature:

- `routes.auth.*` - Authentication routes
- `routes.clubs.*` - Club discovery routes
- `routes.doctors.*` - Doctor profiles routes
- `routes.quiz.*` - AI Coach Quiz routes
- `routes.parent.*` - Parent dashboard routes
- `routes.legal.*` - Legal pages

### Server vs Client Components

**Default**: Server Components (all pages default to Server Components)

#### Use Client Components (`'use client'`) ONLY when you need:

1. **Interactivity**: `onClick`, `onChange`, event handlers
2. **React Hooks**: `useState`, `useEffect`, `useContext`, `useReducer`
3. **Browser APIs**: `localStorage`, `window`, `document`, `navigator`
4. **Third-party client libraries**: Swiper, React Hook Form, Redux
5. **Stack Auth client hooks**: `useStackApp()`, `useUser()`, `useStackRedirect()`

#### Pattern: Server Components First

```typescript
// ✅ Server Component (default)
async function ClubList() {
  const clubs = await getClubs() // Server-side data fetching
  return <ClubGrid clubs={clubs} />
}

// ✅ Client Component (when needed)
"use client"
function ClubCard({ club }) {
  const [isFavorite, setIsFavorite] = useState(false)
  return <button onClick={() => setIsFavorite(!isFavorite)}>...</button>
}
```

#### Best Practices

- **Server Components** for data fetching, SEO, performance
- **Client Components** for interactivity, state management
- **Composition**: Use Server Components as containers, Client Components for interactive parts
- **Minimize client bundle**: Keep Client Components small and focused

### Authentication Flow (Stack Auth)

**Status**: ✅ Fully integrated and complete

#### Client-Side Authentication

```typescript
"use client";
import { useStackApp } from "@stackframe/stack";
import { getErrorMessage } from "@/lib/auth/errors";

function LoginForm() {
  const stackApp = useStackApp();
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(email: string, password: string) {
    try {
      await stackApp.signInWithCredential({ email, password });
      // Redirect handled by Stack Auth
    } catch (err) {
      setError(getErrorMessage(err)); // Romanian error message
    }
  }

  // Similar patterns for:
  // - stackApp.signUpWithCredential()
  // - stackApp.sendForgotPasswordEmail()
  // - stackApp.resetPasswordWithToken()
}
```

#### Server-Side Session

```typescript
import { getSession, requireAuth } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { routes } from "@/lib/routes"

// Optional auth check
async function OptionalAuthPage() {
  const session = await getSession()
  if (!session) {
    return <div>Please log in</div>
  }
  return <div>Welcome {session.user.displayName}</div>
}

// Required auth (throws if not authenticated)
async function ProtectedPage() {
  const session = await requireAuth() // Throws if not authenticated
  return <div>Protected content for {session.user.displayName}</div>
}

// Server Action with auth
async function updateProfile(formData: FormData) {
  const session = await requireAuth()
  // Update profile for session.user.id
}
```

#### Error Handling

```typescript
import { getErrorMessage } from "@/lib/auth/errors";

try {
  await stackApp.signInWithCredential({ email, password });
} catch (error) {
  const message = getErrorMessage(error); // Returns Romanian message
  // Handle error
}
```

#### Redirect Flow

- **Login success** → `/parent/dashboard`
- **Signup success** → `/parent/dashboard`
- **Password reset** → `/auth/login`
- **Email confirmation** → `/auth/email-confirmation`

### Service Layer Pattern

**Location**: `modules/` directory

#### Structure

Each feature module contains:

- `*.service.ts` - Business logic, validation, orchestration
- `*.repository.ts` - Data access layer (Drizzle queries)
- `*.types.ts` - TypeScript interfaces and types

#### Flow Pattern

```
Client Component
    ↓
Server Action (app/actions/*.ts)
    ↓
Service Layer (modules/*/*.service.ts)
    ↓
Repository Layer (modules/*/*.repository.ts)
    ↓
Database (Drizzle ORM)
```

#### Example

```typescript
// app/actions/clubs.ts
"use server";
import { getClubBySlug } from "@/modules/clubs/clubs.service";

export async function getClubAction(slug: string) {
  return await getClubBySlug(slug);
}

// modules/clubs/clubs.service.ts
import { getClubBySlug as getClubRepo } from "./clubs.repository";

export async function getClubBySlug(slug: string) {
  // Business logic, validation
  if (!slug) throw new Error("Slug is required");
  return await getClubRepo(slug);
}

// modules/clubs/clubs.repository.ts
import { db } from "@/lib/db";
import { clubs } from "@/lib/db/schema";

export async function getClubBySlug(slug: string) {
  return await db.query.clubs.findFirst({
    where: eq(clubs.slug, slug),
  });
}
```

### Database Architecture

**ORM**: Drizzle ORM with Neon serverless Postgres

**Schema Location**: `lib/db/schema.ts`

#### Core Tables

- `users` - All user types (parent, club_admin, doctor, admin)
- `children` - Child profiles (linked to parents)
- `quizzes` - Quiz answers and AI recommendations
- `clubs` - Sports club information
- `doctors` - Pediatric specialist profiles
- `bookings` - Club trials and doctor consultations
- `favorites` - Saved clubs/doctors
- `reviews` - Moderated reviews

#### Key Relationships

```
users (1) → (many) children
children (1) → (many) quizzes
children (1) → (many) bookings
clubs (1) → (many) bookings
doctors (1) → (many) bookings
```

#### Database Operations

```typescript
// Query example
import { db } from "@/lib/db";
import { clubs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const club = await db.query.clubs.findFirst({
  where: eq(clubs.slug, "club-slug"),
  with: {
    bookings: true,
    reviews: true,
  },
});

// Insert example
await db.insert(clubs).values({
  name: "Club Name",
  slug: "club-slug",
  // ...
});
```

### TypeScript Path Aliases

**Configuration**: `tsconfig.json` uses `@/*` for `./src/*`

**Usage**:

```typescript
import { routes } from "@/lib/routes";
import ClubCard from "@/components/features/clubs/ClubCard";
import { getClubBySlug } from "@/modules/clubs/clubs.service";
import { db } from "@/lib/db";
```

---

## Critical Development Rules

### Language Requirements

⚠️ **CRITICAL**: All user-facing content MUST be in Romanian:

- ✅ UI text, labels, buttons, messages
- ✅ Quiz questions and explanations
- ✅ Sport recommendations and reasoning (AI-generated)
- ✅ Club and doctor descriptions
- ✅ Email notifications and templates
- ✅ Error messages and validation text
- ✅ Onboarding flows and instructions

**Exception**: Technical documentation, code comments, and internal dev notes can be in English.

**AI Integration**: When using OpenAI, system prompts MUST explicitly instruct AI to generate ALL content in Romanian language only.

```typescript
// ✅ Correct OpenAI prompt
const systemPrompt = `
You are a sports recommendation assistant for Romanian parents.
IMPORTANT: Generate ALL responses in Romanian language only.
...
`;

// ❌ Wrong - no language specification
const systemPrompt = `
You are a sports recommendation assistant.
...
`;
```

### Code Quality Standards

1. **Never hardcode routes** - Always use `@/lib/routes`
2. **Server Components first** - Only add `'use client'` when necessary
3. **Cache Components** - Use `"use cache"` directive for cacheable content, avoid legacy patterns
4. **Type safety** - Use TypeScript strict mode, validate with Zod schemas
5. **Authentication** - Use `requireAuth()` in Server Actions, Stack Auth hooks in client components
6. **Error handling** - Use centralized error messages from `@/lib/auth/errors`
7. **Import patterns** - Use `@/*` path alias consistently
8. **Validation** - Always validate user input with Zod schemas
9. **Error boundaries** - Handle errors gracefully with proper error messages
10. **Accessibility** - Follow WCAG guidelines, use semantic HTML

### Migration Strategy

#### Styling

**Gradual migration** from Bootstrap (existing Kindedo theme) to Tailwind CSS (new components):

- ✅ Keep Bootstrap for existing components
- ✅ Use Tailwind for all new components
- ✅ Import order: `globals.scss` (Bootstrap) then `globals.css` (Tailwind)

```typescript
// ✅ Correct import order
import "@/styles/globals.scss"; // Bootstrap
import "@/styles/globals.css"; // Tailwind
```

#### State Management

**Transition** from Redux to Server Actions + React Context for new features:

- ✅ Keep Redux for existing features (if any)
- ✅ Use Server Actions + React Context for new features
- ✅ Prefer Server Components and Server Actions over client-side state

---

## Documentation Structure

### Comprehensive Docs (`docs/`)

**Before implementing features, review these docs:**

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

**Current project context:**

- **systemPatterns.md** - Architecture patterns and design decisions
- **techContext.md** - Technology stack details and configuration
- **productContext.md** - Product requirements and business logic
- **activeContext.md** - Current work focus and recent changes
- **progress.md** - Development progress tracking

**⚠️ Important**: Always read relevant memory bank files before starting work to understand current context.

---

## External Services

### Required Environment Variables

Create `.env.local` with:

```bash
# Database
DATABASE_URL="postgresql://user:password@host/database"

# Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID="your-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="pk_..."
STACK_SECRET_SERVER_KEY="sk_..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Brevo (Email)
BREVO_API_KEY="your-api-key"
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

### Integration Patterns

```typescript
// OpenAI example
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await openai.chat.completions.create({
  model: "gpt-4-turbo",
  messages: [
    {
      role: "system",
      content:
        "You are a sports recommendation assistant. Generate ALL responses in Romanian language only.",
    },
    {
      role: "user",
      content: "Recommend sports for a 7-year-old child...",
    },
  ],
});

// Cloudinary example
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const result = await cloudinary.uploader.upload(imageFile);

// Brevo example
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

const api = new TransactionalEmailsApi();
api.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

await api.sendTransacEmail({
  to: [{ email: user.email }],
  subject: "Bun venit la Yuvoo",
  htmlContent: "<p>Conținut în română</p>",
});
```

---

## Component Adaptation (Kindedo Theme)

The project started from the Kindedo educational template. Key adaptations:

### Completed ✅

- `Class → Club` components (`components/features/clubs/`)
- Authentication pages with Stack Auth integration
- Legal pages (privacy, terms, cookies, GDPR)
- SEO-friendly Romanian routes
- Email confirmation flow

### Planned 📋

- `Teacher → Doctor` profiles
- `Program → Sport` recommendations
- AI Coach Quiz implementation
- Club booking system
- Doctor consultation booking

### Reusable (No Changes Needed)

- Header, Footer, Banner components
- Testimonials, Gallery, FAQ, Contact
- Animation patterns (WOW.js, Swiper)
- Layout components

---

## Development Workflow

### Standard Workflow

1. **Review documentation** in `docs/` before starting
2. **Check `memory-bank/progress.md`** for current status
3. **Read `memory-bank/activeContext.md`** for current focus
4. **Use `@/lib/routes`** for all navigation
5. **Server Components by default**, Client Components when needed
6. **Stack Auth** for authentication, `requireAuth()` in Server Actions
7. **All user-facing text in Romanian**
8. **Test locally** with `npm run dev`
9. **Lint and format** before committing
10. **Database changes** via Drizzle migrations

### Feature Development Checklist

- [ ] Review relevant `docs/` files
- [ ] Check `memory-bank/` for context
- [ ] Plan component structure (Server vs Client)
- [ ] Create/update routes in `lib/routes.ts`
- [ ] Implement service layer in `modules/`
- [ ] Create Server Actions in `app/actions/`
- [ ] Build components in `components/`
- [ ] Add Romanian translations
- [ ] Test authentication flow (if needed)
- [ ] Test database operations
- [ ] Run linter and formatter
- [ ] Update `memory-bank/progress.md`

### Git Workflow

```bash
# Create feature branch
git checkout -b feat/feature-name

# Make changes
# ...

# Stage and commit
git add .
git commit -m "feat: add feature description"

# Push and create PR
git push origin feat/feature-name
```

---

## Testing Guidelines

### Manual Testing Checklist

- [ ] **Authentication**: Login, signup, password reset, email confirmation
- [ ] **Navigation**: All routes accessible, links work correctly
- [ ] **Forms**: Validation, error messages, success states
- [ ] **Responsive**: Mobile, tablet, desktop layouts
- [ ] **Language**: All text in Romanian
- [ ] **Performance**: Page load times, image optimization
- [ ] **Accessibility**: Keyboard navigation, screen readers

### Database Testing

```bash
# Open Drizzle Studio
npm run db:studio

# Check migrations
npm run db:check

# Test queries in Drizzle Studio
```

### Common Test Scenarios

1. **User Registration Flow**
   - Sign up with new email
   - Verify email confirmation
   - Complete onboarding

2. **Club Discovery**
   - Browse clubs list
   - Filter by sport, location
   - View club details
   - Save to favorites

3. **Quiz Flow**
   - Start quiz
   - Answer all questions
   - View recommendations
   - Save results

---

## Troubleshooting

### Common Issues

#### Database Connection Errors

```bash
# Check DATABASE_URL in .env.local
echo $DATABASE_URL

# Test connection
npm run db:studio
```

#### Stack Auth Errors

- Verify environment variables are set correctly
- Check Stack Auth dashboard for configuration
- Ensure `StackAuthProvider` wraps the app in `layout.tsx`

#### Build Errors

```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

#### TypeScript Errors

- Run `npm run lint` to see all errors
- Check `tsconfig.json` path aliases
- Verify imports use `@/*` alias

#### Cache Issues

- Clear Next.js cache: `rm -rf .next`
- Restart dev server
- Check `"use cache"` directives

### Debugging Tips

1. **Check browser console** for client-side errors
2. **Check terminal** for server-side errors
3. **Use Drizzle Studio** to inspect database
4. **Check Stack Auth logs** in dashboard
5. **Review `memory-bank/progress.md`** for known issues

---

## Quick Reference

### Import Patterns

```typescript
// Routes
import { routes } from "@/lib/routes";

// Auth
import { getSession, requireAuth } from "@/lib/auth/session";
import { getErrorMessage } from "@/lib/auth/errors";
import { useStackApp } from "@stackframe/stack";

// Database
import { db } from "@/lib/db";
import { clubs } from "@/lib/db/schema";

// Components
import ClubCard from "@/components/features/clubs/ClubCard";

// Services
import { getClubBySlug } from "@/modules/clubs/clubs.service";
```

### Common Code Snippets

#### Server Component with Data

```typescript
import { db } from "@/lib/db"
import { clubs } from "@/lib/db/schema"

export default async function ClubsPage() {
  const clubsList = await db.query.clubs.findMany()
  return <ClubList clubs={clubsList} />
}
```

#### Client Component with State

```typescript
"use client"
import { useState } from "react"

export function InteractiveComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

#### Server Action

```typescript
"use server";
import { requireAuth } from "@/lib/auth/session";
import { updateProfile } from "@/modules/auth/auth.service";

export async function updateProfileAction(formData: FormData) {
  const session = await requireAuth();
  const name = formData.get("name") as string;
  return await updateProfile(session.user.id, { name });
}
```

#### Form with Server Action

```typescript
"use client"
import { updateProfileAction } from "@/app/actions/profile"
import { useFormState } from "react-dom"

export function ProfileForm() {
  const [state, formAction] = useFormState(updateProfileAction, null)
  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit">Save</button>
    </form>
  )
}
```

---

## Performance & Security

### Performance

- ✅ Cache Components with `"use cache"` for cacheable content
- ✅ Server Components reduce client bundle size
- ✅ Cloudinary CDN for images
- ✅ Strategic database indexes
- ✅ Dynamic routes with `generateStaticParams()`
- ✅ Image optimization with Next.js Image component

### Security

- ✅ Stack Auth for authentication
- ✅ Zod validation for all inputs
- ✅ Drizzle ORM (parameterized queries)
- ✅ Role-based authorization in Server Actions
- ✅ Environment variables never committed
- ✅ HTTPS in production
- ✅ CSRF protection via Server Actions

---

## Deployment

**Platform**: Vercel  
**Region**: fra1 (Frankfurt, Europe)  
**Build**: Automatic on push to main branch  
**Environment**: Configure variables in Vercel dashboard

### Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations run
- [ ] Build succeeds locally (`npm run build`)
- [ ] Test production build (`npm start`)
- [ ] Verify authentication works
- [ ] Check all routes accessible
- [ ] Test email sending (Brevo)
- [ ] Verify image uploads (Cloudinary)

---

**Last Updated**: 2024  
**Project Status**: MVP Phase - Core pages and authentication complete, transitioning to feature development (Quiz, Clubs, Doctors)
