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

- **Tailwind CSS**: `4.1.17` (installed) ✅ - Utility-first CSS for new components (upgraded from v3.4.19)
- **@tailwindcss/postcss**: `4.1.17` (installed) ✅ - PostCSS plugin for Tailwind v4
- **PostCSS**: `8.5.6` (installed) ✅ - CSS processing
- **Note**: Tailwind v4 uses CSS-based configuration (no tailwind.config.ts), Autoprefixer is built-in

**Planned Migration** (for additional UI libraries):

- **shadcn/ui**: Component library built on Radix UI (planificat)
  - `@radix-ui/react-dialog ^1.0.5`
  - `@radix-ui/react-select ^2.0.0`
  - `@radix-ui/react-slot ^1.0.2`
- **Lucide React**: `^0.344.0` - Icon library (planificat)
- **Class Variance Authority**: `^0.7.0` - Component variants (planificat)
- **clsx**: `^2.1.0` - Conditional classnames (planificat)
- **tailwind-merge**: `^2.2.0` - Merge Tailwind classes (planificat)

**Migration Strategy**:

- **Current**: Bootstrap for existing components, Tailwind for new components (gradual migration)
- **Planned**: Remove Tailwind CSS and shadcn/ui, keep only Bootstrap 5.3.3 + SCSS
- **Documentation**: See `docs/TAILWIND_REMOVAL_PLAN.md` for complete migration plan
- **Components**: See `docs/REUSABLE_COMPONENTS_LIST.md` for inventory of reusable Bootstrap components
- **Bootstrap Utility API**: Use Bootstrap's Sass-based Utility API to create custom Yuvoo-branded utilities instead of Tailwind utilities

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
- **Prettier**: `^3.2.5` - Code formatting
- **Prettier Plugin Tailwind**: `^0.5.11` - Tailwind class sorting
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
- `src/providers/StackAuthProvider.tsx` - Client-side provider wrapper
- `lib/auth/errors.ts` - Error message mappings (Romanian)
- `lib/auth/session.ts` - Session management helpers

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

**Error Handling**:

- Centralized error messages in `lib/auth/errors.ts`
- All error messages in Romanian
- `getErrorMessage()` utility extracts user-friendly messages
- Consistent error display across all forms

## Deployment

### Vercel Configuration

**Platform**: Vercel
**Region**: `fra1` (Frankfurt, Europe)
**Framework**: Next.js (auto-detected)

**Configuration File**: `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["fra1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "OPENAI_API_KEY": "@openai-api-key",
    "CLOUDINARY_CLOUD_NAME": "@cloudinary-cloud-name",
    "CLOUDINARY_API_KEY": "@cloudinary-api-key",
    "CLOUDINARY_API_SECRET": "@cloudinary-api-secret",
    "STACK_PROJECT_ID": "@stack-project-id",
    "STACK_SECRET_SERVER_KEY": "@stack-secret-server-key"
  }
}
```

### Environment Variables in Vercel

Use Vercel's environment variable management:

- Set in Vercel dashboard
- Reference with `@variable-name` in `vercel.json`
- Different values for production/preview

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

**Setup**:

1. Create Brevo account
2. Get API key
3. Configure sender email/name
4. Set up templates in `lib/integrations/brevo/templates.ts`

**Email Types**:

- Quiz result summaries
- Booking confirmations
- Verification status updates
- Reminder emails

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

### Caching Strategy

**Cache Components (Next.js 16)**:

- **Dynamic by Default**: All routes are dynamic unless using `"use cache"`
- **Opt-in Caching**: Use `"use cache"` directive for cacheable content (must be async functions)
- **Private Cache**: Use `"use cache: private"` for user-specific prefetchable content
- **Cache Life**: Configure with `cacheLife()` for time-based revalidation
- **Cache Tags**: Use `cacheTag()` for on-demand revalidation
- **Static Shells**: Cached components create static shells for instant loading
- **Suspense Boundaries**: Use `<Suspense>` for dynamic content within cached routes

**Legacy Patterns (Removed)**:

- ❌ `export const dynamic = "force-dynamic"` - Removed, use dynamic APIs instead
- ❌ `export const revalidate` - Removed, use `cacheLife()` instead
- ❌ `unstable_noStore()` - Removed, dynamic by default

**Revalidation**:

- **Time-based**: `cacheLife('hours')`, `cacheLife('days')`, etc.
- **Tag-based**: `cacheTag('resource-name')` with `revalidateTag()` or `updateTag()`
- **Path-based**: `revalidatePath()` after mutations (still supported)

**Static Assets**: Cloudinary CDN

## Security Considerations

1. **Authentication**: Stack Auth (managed service)
2. **Authorization**: Role-based checks in Server Actions
3. **Input Validation**: Zod schemas
4. **SQL Injection**: Drizzle ORM parameterized queries
5. **XSS**: React automatic escaping
6. **CSRF**: Next.js built-in protection
7. **File Uploads**: Cloudinary (validated, secure storage)
8. **Environment Variables**: Never commit to git
9. **API Keys**: Store in environment variables only

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## Accessibility

- **ARIA Labels**: shadcn/ui components include ARIA
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Semantic HTML
- **Color Contrast**: WCAG AA compliance
- **Focus Management**: Visible focus indicators

## Monitoring & Analytics (Future)

**Planned Integrations**:

- Vercel Analytics
- Error tracking (Sentry)
- User analytics
- Performance monitoring

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

## Future Technical Enhancements

- **Testing**: Unit, integration, E2E tests
- **CI/CD**: GitHub Actions
- **Monitoring**: Error tracking, analytics
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
- **Site Map**: `docs/SITE_MAP.md` - Complete application structure, all routes, user flows, and navigation patterns
- **Wireframes**: `docs/WIREFRAMES.md` - Detailed page structures, component placement, and layout specifications for all major pages
- **Authentication Integration Plan**: `docs/AUTH_INTEGRATION_PLAN.md` - Complete authentication system integration details, Stack Auth setup, Romanian localization, and implementation checklist
- **System Patterns**: `memory-bank/systemPatterns.md` - Architecture patterns and design decisions
- **Active Context**: `memory-bank/activeContext.md` - Current work focus and recent changes
- **Progress Tracking**: `memory-bank/progress.md` - Development progress and completed items
