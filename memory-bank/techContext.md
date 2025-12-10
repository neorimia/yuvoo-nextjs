# Yuvoo - Technical Context

## Technology Stack

### Core Framework

**Current Installed Versions**:

- **Next.js**: `15.5.7` (installed) - React framework with App Router ✅
- **React**: `19.2.1` (installed) - UI library ✅
- **React DOM**: `19.2.1` (installed) - React rendering ✅
- **TypeScript**: `5.9.3` (installed) - Type safety ✅

**Package.json Versions**:

- **Next.js**: `^15.3.1` (package.json) - will install latest 15.x
- **React**: `^19.0.0` (package.json) - will install latest 19.x
- **TypeScript**: `^5` (package.json) - will install latest 5.x

**Note**: Installed versions are newer than package.json minimums, which is good for compatibility.

### Database & ORM

- **Drizzle ORM**: `^0.36.4` - Type-safe ORM
- **Neon Database**: `@neondatabase/serverless ^0.10.3` - Serverless Postgres
- **Postgres**: `^3.4.5` - Database driver
- **Drizzle Kit**: `^0.28.1` (dev) - Migration tool

### Authentication

- **Stack Auth**: `@stackframe/stack ^2.5.40` - Authentication service
  - Handles user authentication
  - Email/password, OAuth support
  - Session management
  - User management

### UI & Styling

**Current (Starting Theme - Kindedo)**:

- **Bootstrap**: `5.3.3` - CSS framework (actual)
- **SCSS**: `^1.75.0` - CSS preprocessor (actual)
- **Animate.css** - Animation library (actual)
- **WOW.js**: `^1.2.2` - Scroll animations (actual)
- **Font Awesome Pro** - Icon library (actual)
- **Flaticon Kindedo** - Custom icons (actual)
- **Nice Select** - Styled dropdowns (actual)
- **Fredoka** (Google Fonts) - Primary font, child-friendly (actual)

**Planned Migration**:

- **Tailwind CSS**: `^3.4.1` - Utility-first CSS (planificat)
- **shadcn/ui**: Component library built on Radix UI (planificat)
  - `@radix-ui/react-dialog ^1.0.5`
  - `@radix-ui/react-select ^2.0.0`
  - `@radix-ui/react-slot ^1.0.2`
- **Lucide React**: `^0.344.0` - Icon library (planificat)
- **Class Variance Authority**: `^0.7.0` - Component variants (planificat)
- **clsx**: `^2.1.0` - Conditional classnames (planificat)
- **tailwind-merge**: `^2.2.0` - Merge Tailwind classes (planificat)

**Migration Strategy**: Gradual migration - keep Bootstrap for existing components, use Tailwind for new components. See `designSystem.md` for details.

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

## Authentication Setup

### Stack Auth Configuration

**Why Stack Auth**:

- Managed authentication service
- Built-in user management
- OAuth support
- Session handling
- Email verification

**Setup Steps**:

1. Create Stack Auth project
2. Get project ID and keys
3. Configure in `lib/auth/stack.ts`
4. Set up redirect URLs
5. Sync with local database

**Session Flow**:

1. User authenticates via Stack Auth
2. Server gets Stack Auth user
3. Syncs with local `users` table
4. Returns combined session

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

**Setup**:

1. Create Cloudinary account
2. Get cloud name, API key, API secret
3. Configure in `lib/integrations/cloudinary/client.ts`

**Features Used**:

- Image uploads
- Automatic optimization
- CDN delivery
- Transformations (resize, crop, etc.)

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

- **Next.js Cache**: Automatic caching of Server Components
- **Revalidation**: `revalidatePath()` after mutations
- **Static Assets**: Cloudinary CDN

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
