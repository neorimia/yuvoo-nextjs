# Updated Prompt Template for Yuvoo Codebase

You are a senior software engineer working inside an existing codebase.

## Context

### Tech Stack

- **Framework**: Next.js 16.0.8 with App Router and Cache Components enabled
- **React**: 19.2.1
- **TypeScript**: 5.9.3 (strict mode)
- **Database**: Neon serverless Postgres with Drizzle ORM 0.36.4
- **Authentication**: Stack Auth (server-side only, no client provider)
- **Styling**: Bootstrap 5.3.3 + SCSS (all components use Bootstrap, no Tailwind)
- **Validation**: Zod 3.22.4
- **AI**: OpenAI GPT-4 Turbo (Romanian language only)
- **Media**: Cloudinary (images & documents)
- **Email**: Brevo (transactional emails)

### Framework Version Details

- **Next.js**: 16.0.8 with `cacheComponents: true` enabled
- **Cache Components**: Dynamic by default, use `"use cache"` directive for cacheable content (must be async functions)
- **Dynamic Routes**: All dynamic routes MUST have `generateStaticParams()` returning at least one value
- **Route Segment Config**: DO NOT use `export const dynamic`, `export const revalidate` - removed in Cache Components
- **Async Params**: Always await params: `const { slug } = await params;` (Next.js 16)

### Repo Structure

```
yuvoo-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Protected parent routes
│   │   ├── (public)/          # Public app pages (quiz, clubs, doctors)
│   │   ├── (marketing)/        # Public marketing pages
│   │   ├── actions/           # Server Actions (main backend)
│   │   └── api/                # API routes (webhooks, cron)
│   ├── components/
│   │   ├── features/          # Feature-specific components (quiz, clubs, doctors)
│   │   ├── layout/             # Header, Footer, Sidebar
│   │   ├── UI/                 # Bootstrap wrapper components
│   │   ├── Form/               # Form components
│   │   └── Auth/               # Auth-specific components
│   ├── lib/
│   │   ├── auth/               # Stack Auth config & session (server-side only)
│   │   ├── db/                 # Drizzle ORM schema & client
│   │   ├── routes.ts           # ⚠️ SINGLE SOURCE OF TRUTH for all routes
│   │   ├── validations/        # Zod schemas (Romanian error messages)
│   │   └── integrations/      # External services (OpenAI, Cloudinary, Brevo)
│   ├── modules/                # Backend business logic (service layer)
│   │   ├── auth/, children/, quiz/, clubs/, doctors/, bookings/
│   └── types/                  # Global TypeScript types
└── public/assets/scss/         # Bootstrap + SCSS styles
```

### Conventions

#### Routing

- **ALWAYS use `@/lib/routes`** - Never hardcode paths
- **SEO Strategy**: Public routes use Romanian (`/cluburi`, `/doctori`, `/chestionar`), internal routes use English (`/auth/login`, `/parent/dashboard`)
- **Route Groups**: `(public)/`, `(auth)/`, `(marketing)/` organize routes without affecting URLs

#### Component Patterns

- **Default**: Server Components (all pages default to Server Components)
- **Client Components**: Only when needed (`'use client'` for interactivity, hooks, browser APIs)
- **Server Actions**: Primary backend logic in `app/actions/`
- **Service Layer**: Business logic in `modules/` (service → repository → database)

#### Styling

- **Bootstrap 5.3.3 ONLY** - All components use Bootstrap utilities
- **Custom Utilities**: Use Yuvoo-branded utilities (`bg-yuvoo-primary`, `text-yuvoo-primary`, etc.)
- **SCSS**: Custom styles in `public/assets/scss/`
- **NO Tailwind** - Completely removed from project

#### Language Requirements

- **CRITICAL**: All user-facing content MUST be in Romanian
- **AI Prompts**: Must explicitly instruct AI to generate content in Romanian only
- **Error Messages**: All validation and error messages in Romanian
- **Exception**: Code comments and technical docs can be in English

#### Authentication

- **Server-Side Only**: No StackProvider, all auth via Server Actions
- **Session Helpers**: `getSession()`, `requireAuth()` from `@/lib/auth/session`
- **Server Actions**: `signInAction`, `signUpAction`, `forgotPasswordAction`, etc. in `app/actions/auth.ts`

#### Database

- **Drizzle ORM**: Type-safe queries with relations
- **Schema**: `lib/db/schema.ts` - all tables defined
- **Migrations**: `npm run db:push` for development, `npm run db:generate` for production

#### TypeScript

- **Path Aliases**: Use `@/*` for `./src/*` imports
- **Strict Mode**: Enabled
- **Validation**: Zod schemas for all inputs

#### Caching (Next.js 16 Cache Components)

- **Dynamic by Default**: Routes are dynamic unless using `"use cache"`
- **Public Cache**: `"use cache"` with `cacheLife()` and `cacheTag()`
- **Private Cache**: `"use cache: private"` for user-specific prefetchable content
- **Revalidation**: `revalidateTag()`, `revalidatePath()`, or `updateTag()`

Make changes only in files you explicitly mention in an “Affected files” list. If a new file is necessary, justify it first.

## Goal

[clear, single objective]

## Constraints

- Do NOT change unrelated files
- Keep changes minimal and scoped
- Follow existing patterns (Server Components first, Bootstrap styling, Romanian language)
- No breaking changes
- **Always use `@/lib/routes`** for navigation
- **All user-facing text in Romanian**
- **Server Components by default**, Client Components only when needed
- **Bootstrap 5.3.3** for all styling (no Tailwind)
- **Cache Components**: Use `"use cache"` for cacheable content, dynamic by default
- **Dynamic Routes**: Must have `generateStaticParams()` returning at least one value

## Tasks

1. Analyze current implementation
2. Propose the smallest viable change
3. Implement the change following project patterns
4. Explain briefly why this approach was chosen

## Definition of Done

- Code compiles (TypeScript strict mode)
- No linting errors (`npm run lint`)
- No unused code
- No TODOs left behind
- All user-facing text in Romanian
- Routes use `@/lib/routes` helper
- Server Components used by default
- Bootstrap styling (no Tailwind classes)
- Cache Components compatible (if applicable)
- Follows service layer pattern (actions → services → repositories)

## Key Patterns Reference

- **Server Actions Pattern**: `app/actions/*.ts` → `modules/*/*.service.ts` → `modules/*/*.repository.ts` → Database
- **Component Pattern**: Server Components default, Client Components for interactivity only
- **Styling Pattern**: Bootstrap 5.3.3 utilities + custom Yuvoo utilities + SCSS
- **Authentication Pattern**: Server Actions only, no client-side provider
- **Caching Pattern**: Dynamic by default, `"use cache"` for cacheable content
- **Validation Pattern**: Zod schemas with Romanian error messages

## Documentation References

- `CLAUDE.md` - Comprehensive project guide
- `docs/ARCHITECTURE_OVERVIEW.md` - Complete architecture documentation
- `docs/ PROMPTING_RULES_FOR_CODEGEN.md` - Code generation guidelines
- `memory-bank/systemPatterns.md` - Architecture patterns
- `memory-bank/techContext.md` - Technology stack details
- `memory-bank/activeContext.md` - Current work focus
