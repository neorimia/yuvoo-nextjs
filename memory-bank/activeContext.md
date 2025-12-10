# Yuvoo - Active Context

## Current Status

**Phase**: Planning & Architecture Design
**Date**: Initial Memory Bank Creation
**Focus**: Establishing project foundation and documentation

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

### Current Codebase State

**Observation**: The current codebase appears to be a template/starter project (`kindedo-nextjs`) with:

- Bootstrap-based styling
- Redux state management
- Existing component structure
- Different architecture than planned

**Action Needed**:

- Assess whether to:
  - Migrate existing codebase to new architecture
  - Start fresh with new architecture
  - Hybrid approach (reuse some components)

## Active Decisions & Considerations

### Architecture Decision

**Planned Architecture** (from MVP_STARTER_BRIEF.md):

- Next.js 15 with App Router
- Server Actions pattern
- Drizzle ORM
- Stack Auth
- Tailwind CSS + shadcn/ui
- Modular service layer

**Current Codebase**:

- Next.js 15 (matches)
- Bootstrap styling (different)
- Redux (different)
- Existing component structure

**Decision Needed**: Migration strategy

### Technology Stack Alignment

**To Verify**:

- [ ] Current Next.js version matches requirements
- [ ] Database setup (Neon + Drizzle)
- [ ] Authentication setup (Stack Auth)
- [ ] UI library migration (Bootstrap → Tailwind + shadcn/ui)
- [ ] State management (Redux → Server Actions + React state)

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

   - [ ] Verify/upgrade Next.js to latest version
   - [ ] Install required dependencies
   - [ ] Set up Tailwind CSS
   - [ ] Install shadcn/ui components
   - [ ] Remove/replace Bootstrap if needed

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

- **Phase 1 Focus**: Sports only, ages 4-14, Bucharest
- **No Payments**: Payment-enabled bookings in Phase 2
- **No Calendar**: Family calendar in Phase 2
- **Rule-based AI**: ML models in later phases
- **Verification Important**: Club verification builds trust
- **Medical Integration**: Specialists are key differentiator
- **Language Requirement**: ALL user-facing content must be in Romanian language only
