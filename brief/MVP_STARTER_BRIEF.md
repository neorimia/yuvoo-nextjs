# 🏗️ Yuvoo – Complete Next.js Monorepo Architecture

## 📋 Executive Summary

**Project**: Yuvoo - AI-powered sports discovery platform for children
**Architecture**: Next.js 15 Monolithic App with Modular Backend Pattern
**Timeline**: 16-week MVP
**Deployment**: Vercel (Frontend) + Neon (Database) + Cloudinary (Media)

---

## 📐 Complete Project Structure

```
yuvoo-monorepo/
├── .env.local
├── .env.production
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── drizzle.config.ts
├── package.json
├── README.md
│
├── app/                                    # Next.js App Router
│   ├── layout.tsx                          # Root layout
│   ├── page.tsx                            # Landing page
│   ├── providers.tsx                       # React providers wrapper
│   ├── error.tsx                           # Global error boundary
│   ├── not-found.tsx                       # 404 page
│   │
│   ├── (marketing)/                        # Public marketing pages
│   │   ├── layout.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── how-it-works/
│   │   │   └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── (public)/                           # Public app pages (no auth)
│   │   ├── layout.tsx
│   │   │
│   │   ├── quiz/                           # AI Coach Quiz
│   │   │   ├── page.tsx                    # Quiz intro
│   │   │   ├── start/
│   │   │   │   └── page.tsx                # Start quiz
│   │   │   ├── questions/
│   │   │   │   └── [step]/
│   │   │   │       └── page.tsx            # Dynamic quiz steps
│   │   │   └── results/
│   │   │       └── [id]/
│   │   │           └── page.tsx            # Quiz results
│   │   │
│   │   ├── clubs/                          # Club Discovery
│   │   │   ├── page.tsx                    # Club search/listing
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx                # Club detail (SSG)
│   │   │   │   └── loading.tsx             # Loading state
│   │   │   └── loading.tsx
│   │   │
│   │   └── doctors/                        # Doctor Profiles
│   │       ├── page.tsx                    # Doctor listing
│   │       ├── [id]/
│   │       │   ├── page.tsx                # Doctor profile (SSG)
│   │       │   └── loading.tsx
│   │       └── loading.tsx
│   │
│   ├── (auth)/                             # Protected routes (requires auth)
│   │   ├── layout.tsx                      # Auth wrapper with sidebar
│   │   ├── middleware.ts                   # Auth middleware
│   │   │
│   │   ├── dashboard/                      # Parent Dashboard
│   │   │   ├── page.tsx                    # Overview
│   │   │   └── loading.tsx
│   │   │
│   │   ├── children/                       # Child Management
│   │   │   ├── page.tsx                    # Children list
│   │   │   ├── new/
│   │   │   │   └── page.tsx                # Add new child
│   │   │   └── [id]/
│   │   │       ├── page.tsx                # Child profile
│   │   │       ├── edit/
│   │   │       │   └── page.tsx            # Edit child
│   │   │       └── quiz/
│   │   │           └── page.tsx            # Take quiz for child
│   │   │
│   │   ├── bookings/                       # Booking Management
│   │   │   ├── page.tsx                    # All bookings
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx                # Booking detail
│   │   │   └── new/
│   │   │       ├── club/
│   │   │       │   └── [clubId]/
│   │   │       │       └── page.tsx        # Book club trial
│   │   │       └── doctor/
│   │   │           └── [doctorId]/
│   │   │               └── page.tsx        # Book consultation
│   │   │
│   │   ├── favorites/                      # Saved Clubs/Doctors
│   │   │   └── page.tsx
│   │   │
│   │   └── settings/                       # Account Settings
│   │       ├── page.tsx                    # Profile settings
│   │       ├── notifications/
│   │       │   └── page.tsx
│   │       └── privacy/
│   │           └── page.tsx
│   │
│   ├── (club-portal)/                      # Club Admin Portal
│   │   ├── layout.tsx
│   │   ├── club/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── schedule/
│   │   │   │   └── page.tsx
│   │   │   └── bookings/
│   │   │       └── page.tsx
│   │   └── onboarding/
│   │       └── page.tsx
│   │
│   ├── (doctor-portal)/                    # Doctor Portal
│   │   ├── layout.tsx
│   │   └── doctor/
│   │       ├── dashboard/
│   │       │   └── page.tsx
│   │       ├── profile/
│   │       │   └── page.tsx
│   │       ├── availability/
│   │       │   └── page.tsx
│   │       └── appointments/
│   │           └── page.tsx
│   │
│   ├── api/                                # API Routes (webhooks & external integrations)
│   │   ├── webhooks/
│   │   │   ├── stripe/
│   │   │   │   └── route.ts                # Stripe webhook handler
│   │   │   └── stack-auth/
│   │   │       └── route.ts                # Stack Auth webhook
│   │   └── cron/
│   │       ├── send-reminders/
│   │       │   └── route.ts                # Booking reminders
│   │       └── cleanup/
│   │           └── route.ts                # Database cleanup
│   │
│   └── actions/                            # Server Actions (main backend logic)
│       ├── auth.ts                         # Authentication actions
│       ├── children.ts                     # Child profile actions
│       ├── quiz.ts                         # Quiz submission & analysis
│       ├── clubs.ts                        # Club search & management
│       ├── doctors.ts                      # Doctor search & management
│       ├── bookings.ts                     # Booking creation & management
│       ├── favorites.ts                    # Favorites management
│       └── uploads.ts                      # File upload actions
│
├── components/                             # React Components
│   ├── ui/                                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   ├── calendar.tsx
│   │   ├── toast.tsx
│   │   └── ... (other shadcn components)
│   │
│   ├── layout/                             # Layout Components
│   │   ├── header/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── UserMenu.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── footer/
│   │   │   ├── Footer.tsx
│   │   │   └── NewsletterSignup.tsx
│   │   ├── sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   └── SidebarNav.tsx
│   │   └── PageContainer.tsx
│   │
│   ├── features/                           # Feature-specific components
│   │   ├── quiz/
│   │   │   ├── QuizFlow.tsx                # Main quiz orchestrator
│   │   │   ├── QuizProgress.tsx            # Progress indicator
│   │   │   ├── questions/
│   │   │   │   ├── QuestionCard.tsx
│   │   │   │   ├── AgeQuestion.tsx
│   │   │   │   ├── PersonalityQuestion.tsx
│   │   │   │   ├── EnergyQuestion.tsx
│   │   │   │   ├── InterestsQuestion.tsx
│   │   │   │   └── PhysicalQuestion.tsx
│   │   │   └── results/
│   │   │       ├── ResultsCard.tsx
│   │   │       ├── SportRecommendation.tsx
│   │   │       ├── ReasoningDisplay.tsx
│   │   │       └── NextStepsCard.tsx
│   │   │
│   │   ├── clubs/
│   │   │   ├── ClubCard.tsx                # Club preview card
│   │   │   ├── ClubGrid.tsx                # Grid layout
│   │   │   ├── ClubDetail.tsx              # Full club view
│   │   │   ├── ClubFilters.tsx             # Search filters
│   │   │   ├── ClubMap.tsx                 # Map with markers
│   │   │   ├── ClubGallery.tsx             # Photo gallery
│   │   │   ├── ClubSchedule.tsx            # Schedule display
│   │   │   ├── ClubReviews.tsx             # Reviews section
│   │   │   └── BookClubForm.tsx            # Booking form
│   │   │
│   │   ├── doctors/
│   │   │   ├── DoctorCard.tsx              # Doctor preview
│   │   │   ├── DoctorGrid.tsx
│   │   │   ├── DoctorProfile.tsx           # Full profile
│   │   │   ├── DoctorFilters.tsx
│   │   │   ├── AvailabilityCalendar.tsx    # Booking calendar
│   │   │   └── BookAppointmentForm.tsx
│   │   │
│   │   ├── children/
│   │   │   ├── ChildCard.tsx               # Child profile card
│   │   │   ├── ChildForm.tsx               # Add/Edit child form
│   │   │   ├── ChildProfile.tsx            # Child detail view
│   │   │   └── ChildActivityTimeline.tsx   # Activity history
│   │   │
│   │   ├── bookings/
│   │   │   ├── BookingCard.tsx
│   │   │   ├── BookingList.tsx
│   │   │   ├── BookingDetail.tsx
│   │   │   ├── BookingStatusBadge.tsx
│   │   │   └── CancelBookingDialog.tsx
│   │   │
│   │   └── dashboard/
│   │       ├── DashboardStats.tsx          # Overview stats
│   │       ├── RecentActivity.tsx
│   │       ├── UpcomingBookings.tsx
│   │       └── RecommendedClubs.tsx
│   │
│   ├── forms/                              # Reusable form components
│   │   ├── FormField.tsx
│   │   ├── FormError.tsx
│   │   ├── FormSuccess.tsx
│   │   ├── ImageUpload.tsx
│   │   └── DatePicker.tsx
│   │
│   └── shared/                             # Shared/Common components
│       ├── LoadingSpinner.tsx
│       ├── EmptyState.tsx
│       ├── ErrorBoundary.tsx
│       ├── Badge.tsx
│       ├── Avatar.tsx
│       ├── Rating.tsx
│       ├── SearchBar.tsx
│       └── Pagination.tsx
│
├── lib/                                    # Core Libraries & Utilities
│   ├── auth/
│   │   ├── stack.ts                        # Stack Auth configuration
│   │   ├── session.ts                      # Session management
│   │   └── middleware.ts                   # Auth middleware helpers
│   │
│   ├── db/
│   │   ├── drizzle.ts                      # Drizzle client
│   │   ├── schema.ts                       # Database schema
│   │   ├── migrations/                     # SQL migrations
│   │   └── seed.ts                         # Database seeding
│   │
│   ├── validations/                        # Zod schemas
│   │   ├── auth.ts
│   │   ├── child.ts
│   │   ├── quiz.ts
│   │   ├── club.ts
│   │   ├── doctor.ts
│   │   └── booking.ts
│   │
│   ├── integrations/                       # External service integrations
│   │   ├── openai/
│   │   │   ├── client.ts
│   │   │   └── prompts.ts
│   │   ├── cloudinary/
│   │   │   ├── client.ts
│   │   │   └── upload.ts
│   │   ├── brevo/
│   │   │   ├── client.ts
│   │   │   └── templates.ts
│   │   └── stripe/
│   │       ├── client.ts
│   │       └── webhooks.ts
│   │
│   └── utils/
│       ├── cn.ts                           # Tailwind class merger
│       ├── date.ts                         # Date utilities
│       ├── format.ts                       # Formatting utilities
│       ├── errors.ts                       # Error handling
│       └── constants.ts                    # App constants
│
├── modules/                                # Backend Business Logic (Service Layer)
│   ├── auth/
│   │   ├── auth.service.ts
│   │   ├── auth.repository.ts
│   │   └── auth.types.ts
│   │
│   ├── children/
│   │   ├── children.service.ts
│   │   ├── children.repository.ts
│   │   └── children.types.ts
│   │
│   ├── quiz/
│   │   ├── quiz.service.ts
│   │   ├── quiz.repository.ts
│   │   ├── quiz.analyzer.ts                # AI analysis logic
│   │   └── quiz.types.ts
│   │
│   ├── clubs/
│   │   ├── clubs.service.ts
│   │   ├── clubs.repository.ts
│   │   ├── clubs.search.ts                 # Search/filter logic
│   │   └── clubs.types.ts
│   │
│   ├── doctors/
│   │   ├── doctors.service.ts
│   │   ├── doctors.repository.ts
│   │   ├── doctors.search.ts
│   │   └── doctors.types.ts
│   │
│   ├── bookings/
│   │   ├── bookings.service.ts
│   │   ├── bookings.repository.ts
│   │   ├── bookings.notifications.ts       # Email/SMS notifications
│   │   └── bookings.types.ts
│   │
│   └── favorites/
│       ├── favorites.service.ts
│       ├── favorites.repository.ts
│       └── favorites.types.ts
│
├── types/                                  # Global TypeScript types
│   ├── index.ts
│   ├── database.ts                         # Database types (from schema)
│   ├── api.ts                              # API request/response types
│   └── next-auth.d.ts                      # Next Auth type extensions
│
├── styles/
│   ├── globals.css                         # Global styles + Tailwind
│   └── fonts/                              # Custom fonts
│
├── public/                                 # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   └── sports/                         # Sport icons
│   ├── icons/
│   └── favicon.ico
│
├── tests/                                  # Test files
│   ├── unit/
│   │   ├── modules/
│   │   └── utils/
│   ├── integration/
│   │   └── actions/
│   └── e2e/
│       └── flows/
│
├── scripts/                                # Utility scripts
│   ├── seed-database.ts
│   ├── generate-types.ts
│   └── migrate.ts
│
└── docs/                                   # Documentation
    ├── API.md
    ├── DATABASE.md
    ├── DEPLOYMENT.md
    └── CONTRIBUTING.md
```

---

## 🔧 Technology Stack Details

### Core Framework
```json
{
  "dependencies": {
    "next": "^15.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.6.3"
  }
}
```

### Database & ORM
```json
{
  "dependencies": {
    "drizzle-orm": "^0.36.4",
    "@neondatabase/serverless": "^0.10.3",
    "postgres": "^3.4.5"
  },
  "devDependencies": {
    "drizzle-kit": "^0.28.1"
  }
}
```

### Authentication
```json
{
  "dependencies": {
    "@stackframe/stack": "^2.5.40"
  }
}
```

### UI & Styling
```json
{
  "dependencies": {
    "tailwindcss": "^3.4.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "lucide-react": "^0.344.0"
  }
}
```

### Validation
```json
{
  "dependencies": {
    "zod": "^3.22.4"
  }
}
```

### AI & External Services
```json
{
  "dependencies": {
    "openai": "^4.72.0",
    "cloudinary": "^2.5.1",
    "@getbrevo/brevo": "^2.2.0"
  }
}
```

### Development Tools
```json
{
  "devDependencies": {
    "@types/node": "^20.11.20",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.3",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.11"
  }
}
```

---

## 📊 Complete Database Schema

```typescript
// lib/db/schema.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  decimal,
  pgEnum,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// ENUMS
// ============================================

export const userRoleEnum = pgEnum('user_role', ['parent', 'club_admin', 'doctor', 'admin']);
export const genderEnum = pgEnum('gender', ['male', 'female', 'other', 'prefer_not_to_say']);
export const energyLevelEnum = pgEnum('energy_level', ['low', 'medium', 'high', 'very_high']);
export const bookingStatusEnum = pgEnum('booking_status', [
  'pending',
  'confirmed',
  'completed',
  'cancelled',
  'no_show',
]);
export const bookingTypeEnum = pgEnum('booking_type', ['club_trial', 'doctor_consultation']);
export const sportCategoryEnum = pgEnum('sport_category', [
  'team',
  'individual',
  'water',
  'winter',
  'combat',
  'racket',
  'gymnastics',
  'outdoor',
]);

// ============================================
// USERS
// ============================================

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    stackUserId: varchar('stack_user_id', { length: 255 }).unique(), // Stack Auth ID
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }),
    role: userRoleEnum('role').default('parent').notNull(),
    avatarUrl: text('avatar_url'),
    emailVerified: boolean('email_verified').default(false),
    onboardingCompleted: boolean('onboarding_completed').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index('users_email_idx').on(table.email),
    stackUserIdx: index('users_stack_user_idx').on(table.stackUserId),
  })
);

// ============================================
// CHILDREN PROFILES
// ============================================

export const children = pgTable(
  'children',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    parentId: uuid('parent_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    dateOfBirth: timestamp('date_of_birth').notNull(),
    gender: genderEnum('gender'),
    weight: decimal('weight', { precision: 5, scale: 2 }), // kg
    height: decimal('height', { precision: 5, scale: 2 }), // cm
    medicalNotes: text('medical_notes'),
    allergies: text('allergies'),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    parentIdx: index('children_parent_idx').on(table.parentId),
  })
);

// ============================================
// QUIZ SYSTEM
// ============================================

export const quizzes = pgTable(
  'quizzes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    childId: uuid('child_id')
      .references(() => children.id, { onDelete: 'cascade' })
      .notNull(),
    
    // Quiz Answers
    age: integer('age').notNull(),
    energyLevel: energyLevelEnum('energy_level').notNull(),
    personality: jsonb('personality').notNull(), // Array of traits
    physicalBuild: varchar('physical_build', { length: 50 }),
    interests: jsonb('interests').notNull(), // Array of interests
    previousSports: jsonb('previous_sports'), // Array of sports tried
    timeAvailability: varchar('time_availability', { length: 50 }),
    budget: varchar('budget', { length: 50 }),
    goals: jsonb('goals'), // Array of parent goals
    
    // AI Analysis Results
    recommendations: jsonb('recommendations').notNull(), // Array of recommended sports with scores
    reasoning: text('reasoning'),
    aiModel: varchar('ai_model', { length: 100 }).default('gpt-4-turbo'),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    childIdx: index('quizzes_child_idx').on(table.childId),
    createdAtIdx: index('quizzes_created_at_idx').on(table.createdAt),
  })
);

// ============================================
// SPORTS CLUBS
// ============================================

export const clubs = pgTable(
  'clubs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    adminId: uuid('admin_id').references(() => users.id),
    
    // Basic Info
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description'),
    sportType: varchar('sport_type', { length: 100 }).notNull(),
    sportCategory: sportCategoryEnum('sport_category'),
    
    // Location
    address: text('address').notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    county: varchar('county', { length: 100 }),
    postalCode: varchar('postal_code', { length: 20 }),
    latitude: decimal('latitude', { precision: 10, scale: 8 }),
    longitude: decimal('longitude', { precision: 11, scale: 8 }),
    
    // Contact
    phone: varchar('phone', { length: 20 }),
    email: varchar('email', { length: 255 }),
    website: text('website'),
    
    // Age Groups
    minAge: integer('min_age').notNull(),
    maxAge: integer('max_age').notNull(),
    
    // Verification & Quality
    verified: boolean('verified').default(false).notNull(),
    verifiedAt: timestamp('verified_at'),
    featured: boolean('featured').default(false),
    rating: decimal('rating', { precision: 2, scale: 1 }),
    reviewCount: integer('review_count').default(0),
    
    // Media
    logoUrl: text('logo_url'),
    coverImageUrl: text('cover_image_url'),
    photos: jsonb('photos'), // Array of photo URLs
    videoUrl: text('video_url'),
    
    // Schedule & Availability
    schedule: jsonb('schedule'), // Weekly schedule object
    capacity: integer('capacity'),
    
    // Pricing
    priceRange: varchar('price_range', { length: 50 }), // e.g., "100-200 RON/month"
    trialAvailable: boolean('trial_available').default(true),
    trialPrice: decimal('trial_price', { precision: 10, scale: 2 }),
    
    // Features
    facilities: jsonb('facilities'), // Array of facility names
    certifications: jsonb('certifications'), // Array of certifications
    
    // SEO
    metaTitle: varchar('meta_title', { length: 255 }),
    metaDescription: text('meta_description'),
    
    // Status
    active: boolean('active').default(true),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    sportCityIdx: index('clubs_sport_city_idx').on(table.sportType, table.city),
    verifiedIdx: index('clubs_verified_idx').on(table.verified),
    slugIdx: index('clubs_slug_idx').on(table.slug),
    locationIdx: index('clubs_location_idx').on(table.latitude, table.longitude),
  })
);

// ============================================
// DOCTORS/SPECIALISTS
// ============================================

export const doctors = pgTable(
  'doctors',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id),
    
    // Basic Info
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 100 }), // Dr., Prof., etc.
    specialty: varchar('specialty', { length: 100 }).notNull(), // Pediatric Orthopedist, etc.
    subSpecialties: jsonb('sub_specialties'), // Array of sub-specialties
    
    // Professional Info
    qualifications: text('qualifications'),
    experience: integer('experience'), // Years of experience
    bio: text('bio'),
    languagesSpoken: jsonb('languages_spoken'), // Array of languages
    
    // Clinic/Practice Info
    clinicName: varchar('clinic_name', { length: 255 }),
    address: text('address'),
    city: varchar('city', { length: 100 }),
    county: varchar('county', { length: 100 }),
    postalCode: varchar('postal_code', { length: 20 }),
    
    // Contact
    phone: varchar('phone', { length: 20 }),
    email: varchar('email', { length: 255 }),
    website: text('website'),
    
    // Verification & Quality
    verified: boolean('verified').default(false).notNull(),
    verifiedAt: timestamp('verified_at'),
    licenseNumber: varchar('license_number', { length: 100 }),
    rating: decimal('rating', { precision: 2, scale: 1 }),
    reviewCount: integer('review_count').default(0),
    
    // Media
    photoUrl: text('photo_url'),
    clinicPhotos: jsonb('clinic_photos'), // Array of photo URLs
    
    // Availability & Pricing
    availability: jsonb('availability'), // Weekly availability object
    consultationFee: decimal('consultation_fee', { precision: 10, scale: 2 }),
    consultationDuration: integer('consultation_duration'), // minutes
    onlineConsultation: boolean('online_consultation').default(false),
    
    // Insurance
    acceptsInsurance: boolean('accepts_insurance').default(false),
    insuranceProviders: jsonb('insurance_providers'), // Array of accepted insurers
    
    // SEO
    metaTitle: varchar('meta_title', { length: 255 }),
    metaDescription: text('meta_description'),
    
    // Status
    active: boolean('active').default(true),
    acceptingNewPatients: boolean('accepting_new_patients').default(true),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    specialtyCityIdx: index('doctors_specialty_city_idx').on(table.specialty, table.city),
    verifiedIdx: index('doctors_verified_idx').on(table.verified),
    slugIdx: index('doctors_slug_idx').on(table.slug),
  })
);

// ============================================
// BOOKINGS
// ============================================

export const bookings = pgTable(
  'bookings',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    parentId: uuid('parent_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    childId: uuid('child_id')
      .references(() => children.id, { onDelete: 'cascade' })
      .notNull(),
    
    // Booking Type
    bookingType: bookingTypeEnum('booking_type').notNull(),
    clubId: uuid('club_id').references(() => clubs.id, { onDelete: 'set null' }),
    doctorId: uuid('doctor_id').references(() => doctors.id, { onDelete: 'set null' }),
    
    // Schedule
    scheduledAt: timestamp('scheduled_at').notNull(),
    duration: integer('duration'), // minutes
    endTime: timestamp('end_time'),
    
    // Status
    status: bookingStatusEnum('status').default('pending').notNull(),
    
    // Notes & Communication
    parentNotes: text('parent_notes'),
    providerNotes: text('provider_notes'),
    cancellationReason: text('cancellation_reason'),
    
    // Reminders
    reminderSent: boolean('reminder_sent').default(false),
    reminderSentAt: timestamp('reminder_sent_at'),
    
    // Timestamps
    confirmedAt: timestamp('confirmed_at'),
    completedAt: timestamp('completed_at'),
    cancelledAt: timestamp('cancelled_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    parentIdx: index('bookings_parent_idx').on(table.parentId),
    childIdx: index('bookings_child_idx').on(table.childId),
    scheduledIdx: index('bookings_scheduled_idx').on(table.scheduledAt),
    statusIdx: index('bookings_status_idx').on(table.status),
  })
);

// ============================================
// FAVORITES
// ============================================

export const favorites = pgTable(
  'favorites',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    clubId: uuid('club_id').references(() => clubs.id, { onDelete: 'cascade' }),
    doctorId: uuid('doctor_id').references(() => doctors.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    userClubIdx: index('favorites_user_club_idx').on(table.userId, table.clubId),
    userDoctorIdx: index('favorites_user_doctor_idx').on(table.userId, table.doctorId),
  })
);

// ============================================
// REVIEWS
// ============================================

export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    clubId: uuid('club_id').references(() => clubs.id, { onDelete: 'cascade' }),
    doctorId: uuid('doctor_id').references(() => doctors.id, { onDelete: 'cascade' }),
    bookingId: uuid('booking_id').references(() => bookings.id, { onDelete: 'set null' }),
    
    rating: integer('rating').notNull(), // 1-5
    title: varchar('title', { length: 255 }),
    comment: text('comment'),
    
    // Moderation
    approved: boolean('approved').default(false),
    approvedAt: timestamp('approved_at'),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    clubIdx: index('reviews_club_idx').on(table.clubId),
    doctorIdx: index('reviews_doctor_idx').on(table.doctorId),
    approvedIdx: index('reviews_approved_idx').on(table.approved),
  })
);

// ============================================
// RELATIONS
// ============================================

export const usersRelations = relations(users, ({ many }) => ({
  children: many(children),
  bookings: many(bookings),
  favorites: many(favorites),
  reviews: many(reviews),
}));

export const childrenRelations = relations(children, ({ one, many }) => ({
  parent: one(users, {
    fields: [children.parentId],
    references: [users.id],
  }),
  quizzes: many(quizzes),
  bookings: many(bookings),
}));

export const quizzesRelations = relations(quizzes, ({ one }) => ({
  child: one(children, {
    fields: [quizzes.childId],
    references: [children.id],
  }),
}));

export const clubsRelations = relations(clubs, ({ many }) => ({
  bookings: many(bookings),
  favorites: many(favorites),
  reviews: many(reviews),
}));

export const doctorsRelations = relations(doctors, ({ many }) => ({
  bookings: many(bookings),
  favorites: many(favorites),
  reviews: many(reviews),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  parent: one(users, {
    fields: [bookings.parentId],
    references: [users.id],
  }),
  child: one(children, {
    fields: [bookings.childId],
    references: [children.id],
  }),
  club: one(clubs, {
    fields: [bookings.clubId],
    references: [clubs.id],
  }),
  doctor: one(doctors, {
    fields: [bookings.doctorId],
    references: [doctors.id],
  }),
}));
```

---

## 🔐 Authentication Setup (Stack Auth)

```typescript
// lib/auth/stack.ts
import { StackServerApp } from '@stackframe/stack';

export const stackServerApp = new StackServerApp({
  tokenStore: 'nextjs-cookie',
  urls: {
    home: '/',
    afterSignIn: '/dashboard',
    afterSignUp: '/onboarding',
    afterSignOut: '/',
  },
});

// Get current user (server-side)
export async function getCurrentUser() {
  return await stackServerApp.getUser();
}

// Require authentication (throw if not authenticated)
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}
```

```typescript
// lib/auth/session.ts
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from './stack';

export async function getSession() {
  const stackUser = await getCurrentUser();
  
  if (!stackUser) {
    return null;
  }

  // Get or create user in our database
  let [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.stackUserId, stackUser.id))
    .limit(1);

  if (!dbUser) {
    // Create user on first login
    [dbUser] = await db
      .insert(users)
      .values({
        stackUserId: stackUser.id,
        email: stackUser.primaryEmail || '',
        name: stackUser.displayName || 'User',
        emailVerified: stackUser.primaryEmailVerified,
      })
      .returning();
  }

  return {
    user: dbUser,
    stackUser,
  };
}
```

```typescript
// app/(auth)/layout.tsx
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { Sidebar } from '@/components/layout/sidebar/Sidebar';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={session.user} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

---

## 🎯 Core Feature Implementation Examples

### 1. Quiz Flow with AI Analysis

```typescript
// app/actions/quiz.ts
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/drizzle';
import { quizzes, children } from '@/lib/db/schema';
import { QuizService } from '@/modules/quiz/quiz.service';
import { quizSubmissionSchema } from '@/lib/validations/quiz';
import { requireAuth } from '@/lib/auth/stack';
import { eq } from 'drizzle-orm';

const quizService = new QuizService();

export async function submitQuiz(childId: string, formData: FormData) {
  try {
    // 1. Authenticate
    const user = await requireAuth();

    // 2. Verify child belongs to user
    const [child] = await db
      .select()
      .from(children)
      .where(eq(children.id, childId))
      .limit(1);

    if (!child || child.parentId !== user.id) {
      throw new Error('Child not found');
    }

    // 3. Validate input
    const rawData = Object.fromEntries(formData);
    const validatedData = quizSubmissionSchema.parse(rawData);

    // 4. Analyze with AI
    const analysis = await quizService.analyzeQuizAnswers({
      childId,
      ...validatedData,
    });

    // 5. Save to database
    const [quiz] = await db
      .insert(quizzes)
      .values({
        childId,
        age: validatedData.age,
        energyLevel: validatedData.energyLevel,
        personality: validatedData.personality,
        physicalBuild: validatedData.physicalBuild,
        interests: validatedData.interests,
        previousSports: validatedData.previousSports,
        timeAvailability: validatedData.timeAvailability,
        budget: validatedData.budget,
        goals: validatedData.goals,
        recommendations: analysis.recommendations,
        reasoning: analysis.reasoning,
      })
      .returning();

    // 6. Revalidate cache
    revalidatePath(`/children/${childId}`);
    revalidatePath('/dashboard');

    return {
      success: true,
      quizId: quiz.id,
      recommendations: analysis.recommendations,
    };
  } catch (error) {
    console.error('Quiz submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit quiz',
    };
  }
}
```

```typescript
// modules/quiz/quiz.service.ts
import OpenAI from 'openai';
import type { QuizAnswers, QuizAnalysis } from './quiz.types';

export class QuizService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeQuizAnswers(answers: QuizAnswers): Promise<QuizAnalysis> {
    const prompt = this.buildAnalysisPrompt(answers);

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a pediatric sports development specialist with expertise in matching children to appropriate sports based on their physical, psychological, and developmental characteristics. 
          
          Analyze the child's profile and recommend 3 sports that would be most beneficial. For each sport, provide:
          - Match score (0-100)
          - Key reasons why this sport is suitable
          - Developmental benefits
          - Potential challenges
          
          Respond in JSON format with this structure:
          {
            "recommendations": [
              {
                "sport": "string",
                "score": number,
                "reasons": ["string"],
                "benefits": ["string"],
                "challenges": ["string"]
              }
            ],
            "reasoning": "string (overall analysis)"
          }`,
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return result as QuizAnalysis;
  }

  private buildAnalysisPrompt(answers: QuizAnswers): string {
    return `
Child Profile Analysis:

Age: ${answers.age} years old

Energy Level: ${answers.energyLevel}
This indicates the child's activity preference and stamina levels.

Personality Traits: ${answers.personality.join(', ')}
These traits influence how the child interacts with teammates and handles competition.

Physical Build: ${answers.physicalBuild || 'Not specified'}

Interests: ${answers.interests.join(', ')}
Current hobbies and activities that interest the child.

Previous Sports Experience: ${answers.previousSports?.join(', ') || 'None'}

Time Availability: ${answers.timeAvailability || 'Not specified'}
How much time the child can commit to sports activities.

Budget Considerations: ${answers.budget || 'Not specified'}

Parent Goals: ${answers.goals?.join(', ') || 'General fitness and enjoyment'}

Based on this comprehensive profile, recommend the 3 most suitable sports for this child, considering:
1. Developmental appropriateness for their age
2. Alignment with personality and interests
3. Physical requirements matching their build and energy
4. Practical considerations (time, budget)
5. Long-term benefits for physical and social development
    `.trim();
  }
}
```

### 2. Club Search with Filters

```typescript
// app/actions/clubs.ts
'use server';

import { db } from '@/lib/db/drizzle';
import { ClubsService } from '@/modules/clubs/clubs.service';
import { clubSearchSchema } from '@/lib/validations/club';

const clubsService = new ClubsService();

export async function searchClubs(filters: unknown) {
  try {
    const validatedFilters = clubSearchSchema.parse(filters);
    const clubs = await clubsService.search(validatedFilters);

    return {
      success: true,
      clubs,
    };
  } catch (error) {
    console.error('Club search error:', error);
    return {
      success: false,
      clubs: [],
      error: error instanceof Error ? error.message : 'Search failed',
    };
  }
}

export async function getClubById(id: string) {
  try {
    const club = await clubsService.getById(id);

    if (!club) {
      return {
        success: false,
        error: 'Club not found',
      };
    }

    return {
      success: true,
      club,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch club',
    };
  }
}
```

```typescript
// modules/clubs/clubs.service.ts
import { db } from '@/lib/db/drizzle';
import { clubs } from '@/lib/db/schema';
import { eq, and, sql, or, gte, lte } from 'drizzle-orm';
import type { ClubSearchFilters } from './clubs.types';

export class ClubsService {
  async search(filters: ClubSearchFilters) {
    const conditions = [eq(clubs.active, true)];

    // Sport filter
    if (filters.sport) {
      conditions.push(eq(clubs.sportType, filters.sport));
    }

    // City filter
    if (filters.city) {
      conditions.push(eq(clubs.city, filters.city));
    }

    // Age filter
    if (filters.age) {
      conditions.push(
        and(
          lte(clubs.minAge, filters.age),
          gte(clubs.maxAge, filters.age)
        )!
      );
    }

    // Verified only
    if (filters.verifiedOnly) {
      conditions.push(eq(clubs.verified, true));
    }

    // Trial available
    if (filters.trialAvailable) {
      conditions.push(eq(clubs.trialAvailable, true));
    }

    // Location-based search (radius in km)
    if (filters.latitude && filters.longitude && filters.radius) {
      conditions.push(
        sql`ST_DWithin(
          geography(ST_MakePoint(${clubs.longitude}, ${clubs.latitude})),
          geography(ST_MakePoint(${filters.longitude}, ${filters.latitude})),
          ${filters.radius * 1000}
        )`
      );
    }

    // Text search in name and description
    if (filters.query) {
      conditions.push(
        or(
          sql`${clubs.name} ILIKE ${`%${filters.query}%`}`,
          sql`${clubs.description} ILIKE ${`%${filters.query}%`}`
        )!
      );
    }

    const results = await db
      .select()
      .from(clubs)
      .where(and(...conditions))
      .orderBy(sql`${clubs.featured} DESC, ${clubs.rating} DESC NULLS LAST`)
      .limit(filters.limit || 20)
      .offset(filters.offset || 0);

    return results;
  }

  async getById(id: string) {
    const [club] = await db
      .select()
      .from(clubs)
      .where(eq(clubs.id, id))
      .limit(1);

    return club;
  }

  async getFeatured(limit = 6) {
    return await db
      .select()
      .from(clubs)
      .where(and(eq(clubs.featured, true), eq(clubs.verified, true)))
      .orderBy(sql`${clubs.rating} DESC`)
      .limit(limit);
  }
}
```

### 3. Booking System

```typescript
// app/actions/bookings.ts
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/drizzle';
import { BookingsService } from '@/modules/bookings/bookings.service';
import { bookingCreateSchema } from '@/lib/validations/booking';
import { requireAuth } from '@/lib/auth/stack';

const bookingsService = new BookingsService();

export async function createBooking(data: unknown) {
  try {
    const user = await requireAuth();
    const validatedData = bookingCreateSchema.parse(data);

    const booking = await bookingsService.create({
      ...validatedData,
      parentId: user.id,
    });

    // Send confirmation email
    await bookingsService.sendConfirmationEmail(booking.id);

    revalidatePath('/bookings');
    revalidatePath('/dashboard');

    return {
      success: true,
      booking,
    };
  } catch (error) {
    console.error('Booking creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create booking',
    };
  }
}

export async function cancelBooking(bookingId: string, reason?: string) {
  try {
    const user = await requireAuth();

    const cancelled = await bookingsService.cancel(bookingId, user.id, reason);

    revalidatePath('/bookings');
    revalidatePath('/dashboard');

    return {
      success: true,
      booking: cancelled,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to cancel booking',
    };
  }
}

export async function getUserBookings() {
  try {
    const user = await requireAuth();
    const bookings = await bookingsService.getByParentId(user.id);

    return {
      success: true,
      bookings,
    };
  } catch (error) {
    return {
      success: false,
      bookings: [],
      error: error instanceof Error ? error.message : 'Failed to fetch bookings',
    };
  }
}
```

---

## 🎨 Component Examples

### Quiz Flow Component

```typescript
// components/features/quiz/QuizFlow.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizProgress } from './QuizProgress';
import { AgeQuestion } from './questions/AgeQuestion';
import { PersonalityQuestion } from './questions/PersonalityQuestion';
import { EnergyQuestion } from './questions/EnergyQuestion';
import { InterestsQuestion } from './questions/InterestsQuestion';
import { submitQuiz } from '@/app/actions/quiz';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface QuizFlowProps {
  childId: string;
  childName: string;
}

const QUIZ_STEPS = [
  { id: 'age', title: 'Age & Development', component: AgeQuestion },
  { id: 'energy', title: 'Energy Level', component: EnergyQuestion },
  { id: 'personality', title: 'Personality', component: PersonalityQuestion },
  { id: 'interests', title: 'Interests', component: InterestsQuestion },
];

export function QuizFlow({ childId, childName }: QuizFlowProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CurrentStepComponent = QUIZ_STEPS[currentStep].component;

  const handleNext = (stepAnswers: Record<string, any>) => {
    setAnswers((prev) => ({ ...prev, ...stepAnswers }));

    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit({ ...answers, ...stepAnswers });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (finalAnswers: Record<string, any>) => {
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(finalAnswers).forEach(([key, value]) => {
      formData.append(key, JSON.stringify(value));
    });

    const result = await submitQuiz(childId, formData);

    if (result.success) {
      router.push(`/quiz/results/${result.quizId}`);
    } else {
      alert('Failed to submit quiz. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-lg text-gray-600">Analyzing results...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <QuizProgress
        currentStep={currentStep}
        totalSteps={QUIZ_STEPS.length}
        steps={QUIZ_STEPS}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">
          {QUIZ_STEPS[currentStep].title}
        </h2>
        <p className="text-gray-600 mb-6">
          Answering for: <span className="font-semibold">{childName}</span>
        </p>

        <CurrentStepComponent
          onNext={handleNext}
          onBack={currentStep > 0 ? handleBack : undefined}
          initialValues={answers}
        />
      </div>
    </div>
  );
}
```

---

## 🚀 Deployment Configuration

### Vercel Configuration

```json
// vercel.json
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

### Environment Variables Template

```bash
# .env.local

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

---

## 📦 Package.json

```json
{
  "name": "yuvoo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "db:seed": "tsx scripts/seed-database.ts",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@neondatabase/serverless": "^0.10.3",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@stackframe/stack": "^2.5.40",
    "class-variance-authority": "^0.7.0",
    "cloudinary": "^2.5.1",
    "clsx": "^2.1.0",
    "drizzle-orm": "^0.36.4",
    "lucide-react": "^0.344.0",
    "next": "^15.0.3",
    "openai": "^4.72.0",
    "postgres": "^3.4.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.2.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.11.20",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "drizzle-kit": "^0.28.1",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.3",
    "postcss": "^8.4.35",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.11",
    "tailwindcss": "^3.4.1",
    "tsx": "^4.7.1",
    "typescript": "^5.6.3"
  }
}
```

---

## 🧪 Testing Setup (Optional for MVP+)

```typescript
// tests/unit/modules/quiz.service.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { QuizService } from '@/modules/quiz/quiz.service';

describe('QuizService', () => {
  let quizService: QuizService;

  beforeEach(() => {
    quizService = new QuizService();
  });

  it('should analyze quiz answers and return recommendations', async () => {
    const answers = {
      childId: 'test-child-id',
      age: 8,
      energyLevel: 'high',
      personality: ['outgoing', 'competitive'],
      interests: ['running', 'teamwork'],
      physicalBuild: 'average',
    };

    const result = await quizService.analyzeQuizAnswers(answers);

    expect(result).toHaveProperty('recommendations');
    expect(result.recommendations).toBeInstanceOf(Array);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });
});
```

---

## 📝 Next Steps: Implementation Order

### Week 1-2: Foundation
1. Initialize Next.js project with TypeScript
2. Set up Tailwind CSS and shadcn/ui
3. Configure Drizzle ORM and create schema
4. Set up Stack Auth
5. Create basic layout components (Header, Footer, Sidebar)

### Week 3-4: Core Pages
1. Landing page
2. Sign up/Sign in flows
3. Dashboard layout
4. Child profile management (CRUD)

### Week 5-8: Quiz System
1. Quiz flow UI components
2. Server Actions for quiz submission
3. OpenAI integration
4. Results display

### Week 9-12: Club Discovery
1. Club search and filters
2. Club detail pages (SSG)
3. Map integration
4. Booking flow

### Week 13-14: Doctor Profiles
1. Doctor listing and search
2. Doctor detail pages
3. Appointment booking
4. Calendar integration

### Week 15-16: Polish & Deploy
1. Email notifications
2. Testing
3. Performance optimization
4. Deploy to Vercel

---
