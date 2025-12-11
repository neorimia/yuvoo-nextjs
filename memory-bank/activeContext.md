# Yuvoo - Active Context

## Current Status

**Phase**: Foundation Setup & Architecture Migration
**Date**: December 2024
**Focus**: Next.js 16 upgrade, Cache Components migration, and code generation standards

## Current Work Focus

### Immediate Priorities

1. **Memory Bank Creation** ✅
   - Documenting project structure
   - Establishing context for future development
   - Creating reference documentation

2. **Architecture Review**
   - Reviewing MVP_STARTER_BRIEF.md architecture
   - Understanding current codebase state
   - Planning migration/implementation strategy

3. **Next Steps Planning**
   - Week 1-2 foundation setup
   - Technology stack verification
   - Development environment setup

## Recent Changes

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

### Code Generation Documentation

- **Created**: `docs/ PROMPTING_RULES_FOR_CODEGEN.md` - Comprehensive code generation guidelines
- **Content**: Next.js 16 patterns, Cache Components rules, file naming, error handling, TypeScript patterns, Romanian language requirements
- **Status**: ✅ Complete - Serves as reference for all code generation

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
- **Phase 1 Focus**: Sports only, ages 4-14, Bucharest
- **No Payments**: Payment-enabled bookings in Phase 2
- **No Calendar**: Family calendar in Phase 2
- **Rule-based AI**: ML models in later phases
- **Verification Important**: Club verification builds trust
- **Medical Integration**: Specialists are key differentiator
- **Language Requirement**: ALL user-facing content must be in Romanian language only
