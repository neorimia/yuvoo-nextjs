# Yuvoo - Site Map

## Overview

This document provides a comprehensive site map of the Yuvoo platform, including all routes, page structures, user flows, and navigation patterns.

**Purpose**: Single source of truth for understanding the complete application structure, routes, and user journeys.

**Key Principle**: Public routes use Romanian language for SEO optimization, internal routes use English (not SEO-sensitive).

---

## Application Structure

### Route Groups

The application is organized into route groups that don't affect URL structure:

```
app/
├── (marketing)/          # Public marketing pages
├── (public)/             # Public app pages (no auth required)
├── (auth)/               # Authentication pages
├── (parent)/             # Protected parent routes
├── (club-portal)/        # Club admin portal (Phase 2+)
├── (doctor-portal)/      # Doctor portal (Phase 2+)
├── (admin)/              # Admin dashboard
└── api/                  # API routes (webhooks, cron)
```

---

## Public Routes (SEO-Friendly, Romanian)

### Home & Landing Pages

| Route     | Description          | Component  | Auth Required |
| --------- | -------------------- | ---------- | ------------- |
| `/`       | Homepage             | `page.tsx` | No            |
| `/home-2` | Alternative homepage | `page.tsx` | No            |
| `/home-3` | Alternative homepage | `page.tsx` | No            |

**Features**:

- Value proposition
- 3-step process explanation
- Sign-up CTA
- Trust indicators
- Featured clubs section
- Call-to-action to start quiz

### Sports (Sporturi)

| Route              | Description         | Component                  | Auth Required |
| ------------------ | ------------------- | -------------------------- | ------------- |
| `/sporturi`        | Sports listing page | `sporturi/page.tsx`        | No            |
| `/sporturi/[slug]` | Sport detail page   | `sporturi/[slug]/page.tsx` | No            |

**Features**:

- List of all sports
- Sport descriptions
- Age recommendations
- Benefits for children
- Related clubs
- Related doctors (if applicable)

**Example Slugs**:

- `fotbal`
- `baschet`
- `tenis`
- `inot`
- `gimnastica`
- `dans`

### Clubs (Cluburi)

| Route                           | Description        | Component                               | Auth Required |
| ------------------------------- | ------------------ | --------------------------------------- | ------------- |
| `/cluburi`                      | Clubs listing page | `cluburi/page.tsx`                      | No            |
| `/cluburi/[slug]`               | Club detail page   | `cluburi/[slug]/page.tsx`               | No            |
| `/cluburi/categorie/[category]` | Club category page | `cluburi/categorie/[category]/page.tsx` | No            |
| `/cluburi/[slug]/recenzii`      | Club reviews page  | `cluburi/[slug]/recenzii/page.tsx`      | No            |

**Features**:

- Club search and filters
- Club cards with verification badges
- Club detail information
- Location and contact details
- Schedule and pricing
- Photo gallery
- Reviews (Phase 2+)
- Booking form (basic in Phase 1)

**Example Slugs**:

- `fotbal-club-bucuresti-sector-1`
- `baschet-academia-bucuresti`
- `tenis-copii-otopeni`

### Doctors (Doctori)

| Route             | Description          | Component                 | Auth Required |
| ----------------- | -------------------- | ------------------------- | ------------- |
| `/doctori`        | Doctors listing page | `doctori/page.tsx`        | No            |
| `/doctori/[slug]` | Doctor detail page   | `doctori/[slug]/page.tsx` | No            |

**Features**:

- Doctor search and filters
- Doctor cards with verification badges
- Doctor profile information
- Specialty and credentials
- Location and contact details
- Availability calendar (Phase 2+)
- Booking form (basic in Phase 1)

**Example Slugs**:

- `ortopedie-pediatrica-dr-ionescu-bucuresti`
- `nutritie-copii-dr-popescu-bucuresti`

### Quiz (Chestionar)

| Route                        | Description                | Component                            | Auth Required |
| ---------------------------- | -------------------------- | ------------------------------------ | ------------- |
| `/chestionar`                | Quiz intro page            | `chestionar/page.tsx`                | No            |
| `/chestionar/container`      | Quiz container (questions) | `chestionar/container/page.tsx`      | No            |
| `/chestionar/previzualizare` | Quiz preview               | `chestionar/previzualizare/page.tsx` | No            |
| `/chestionar/rezultate`      | Quiz results               | `chestionar/rezultate/page.tsx`      | No            |

**Features**:

- Quiz introduction and explanation
- 6-step question flow
- Progress indicator
- Results display with recommendations
- Links to recommended clubs
- Links to recommended doctors (if risk signals)

### Search

| Route      | Description | Component          | Auth Required |
| ---------- | ----------- | ------------------ | ------------- |
| `/cautare` | Search page | `cautare/page.tsx` | No            |

**Features**:

- Unified search (clubs, doctors, sports)
- Search filters
- Search results display
- Search suggestions

### Information Pages

| Route                  | Description   | Component                      | Auth Required |
| ---------------------- | ------------- | ------------------------------ | ------------- |
| `/despre-noi`          | About page    | `despre-noi/page.tsx`          | No            |
| `/parteneri`           | Partners page | `parteneri/page.tsx`           | No            |
| `/intrebari-frecvente` | FAQ page      | `intrebari-frecvente/page.tsx` | No            |
| `/contact`             | Contact page  | `contact/page.tsx`             | No            |
| `/ajutor`              | Help page     | `ajutor/page.tsx`              | No            |

**Features**:

- Company information
- Team information
- Partner logos and information
- FAQ with answers
- Contact form
- Help documentation

### Legal Pages

| Route                | Description      | Component                    | Auth Required |
| -------------------- | ---------------- | ---------------------------- | ------------- |
| `/confidentialitate` | Privacy policy   | `confidentialitate/page.tsx` | No            |
| `/termeni`           | Terms of service | `termeni/page.tsx`           | No            |
| `/cookies`           | Cookie policy    | `cookies/page.tsx`           | No            |
| `/gdpr-parinti`      | GDPR for parents | `gdpr-parinti/page.tsx`      | No            |

---

## Authentication Routes (Internal, English)

### Auth Pages

| Route                        | Description               | Component                            | Auth Required |
| ---------------------------- | ------------------------- | ------------------------------------ | ------------- |
| `/auth/login`                | Login page                | `auth/login/page.tsx`                | No            |
| `/auth/register`             | Register page             | `auth/register/page.tsx`             | No            |
| `/auth/forgot-password`      | Forgot password page      | `auth/forgot-password/page.tsx`      | No            |
| `/auth/reset-password`       | Reset password page       | `auth/reset-password/page.tsx`       | No            |
| `/auth/verify-email`         | Email verification page   | `auth/verify-email/page.tsx`         | No            |
| `/auth/verification-pending` | Verification pending page | `auth/verification-pending/page.tsx` | No            |
| `/auth/choose-role`          | Role selection page       | `auth/choose-role/page.tsx`          | No            |

**Features**:

- Stack Auth integration
- Email/password authentication
- OAuth support (future)
- Email verification flow
- Password reset flow

---

## Protected Routes (Internal, English)

### Parent Dashboard

| Route                        | Description           | Component                            | Auth Required |
| ---------------------------- | --------------------- | ------------------------------------ | ------------- |
| `/parent/dashboard`          | Parent dashboard      | `parent/dashboard/page.tsx`          | Yes (Parent)  |
| `/parent/getting-started`    | Getting started guide | `parent/getting-started/page.tsx`    | Yes (Parent)  |
| `/parent/children`           | Children list         | `parent/children/page.tsx`           | Yes (Parent)  |
| `/parent/children/add`       | Add child             | `parent/children/add/page.tsx`       | Yes (Parent)  |
| `/parent/children/[id]/edit` | Edit child            | `parent/children/[id]/edit/page.tsx` | Yes (Parent)  |
| `/parent/children/[id]`      | Child detail          | `parent/children/[id]/page.tsx`      | Yes (Parent)  |
| `/parent/bookings`           | Bookings list         | `parent/bookings/page.tsx`           | Yes (Parent)  |
| `/parent/bookings/[id]`      | Booking detail        | `parent/bookings/[id]/page.tsx`      | Yes (Parent)  |
| `/parent/favorites`          | Favorites list        | `parent/favorites/page.tsx`          | Yes (Parent)  |
| `/parent/settings`           | Settings page         | `parent/settings/page.tsx`           | Yes (Parent)  |
| `/parent/profile`            | Profile page          | `parent/profile/page.tsx`            | Yes (Parent)  |

**Features**:

- Dashboard overview
- Child profile management
- Quiz history
- Bookings management
- Favorites management
- Settings and preferences

### Club Portal (Phase 2+)

| Route               | Description         | Component                   | Auth Required    |
| ------------------- | ------------------- | --------------------------- | ---------------- |
| `/club/dashboard`   | Club dashboard      | `club/dashboard/page.tsx`   | Yes (Club Admin) |
| `/club/profile`     | Edit profile        | `club/profile/page.tsx`     | Yes (Club Admin) |
| `/club/classes`     | Classes list        | `club/classes/page.tsx`     | Yes (Club Admin) |
| `/club/classes/add` | Add class           | `club/classes/add/page.tsx` | Yes (Club Admin) |
| `/club/bookings`    | Bookings management | `club/bookings/page.tsx`    | Yes (Club Admin) |
| `/club/settings`    | Settings            | `club/settings/page.tsx`    | Yes (Club Admin) |

### Doctor Portal (Phase 2+)

| Route               | Description         | Component                   | Auth Required |
| ------------------- | ------------------- | --------------------------- | ------------- |
| `/doctor/dashboard` | Doctor dashboard    | `doctor/dashboard/page.tsx` | Yes (Doctor)  |
| `/doctor/profile`   | Doctor profile      | `doctor/profile/page.tsx`   | Yes (Doctor)  |
| `/doctor/bookings`  | Bookings management | `doctor/bookings/page.tsx`  | Yes (Doctor)  |
| `/doctor/settings`  | Settings            | `doctor/settings/page.tsx`  | Yes (Doctor)  |

### Admin Dashboard

| Route                  | Description         | Component                      | Auth Required |
| ---------------------- | ------------------- | ------------------------------ | ------------- |
| `/admin/dashboard`     | Admin dashboard     | `admin/dashboard/page.tsx`     | Yes (Admin)   |
| `/admin/users`         | Users management    | `admin/users/page.tsx`         | Yes (Admin)   |
| `/admin/clubs`         | Clubs management    | `admin/clubs/page.tsx`         | Yes (Admin)   |
| `/admin/clubs/[id]`    | Club detail         | `admin/clubs/[id]/page.tsx`    | Yes (Admin)   |
| `/admin/doctors`       | Doctors management  | `admin/doctors/page.tsx`       | Yes (Admin)   |
| `/admin/doctors/[id]`  | Doctor detail       | `admin/doctors/[id]/page.tsx`  | Yes (Admin)   |
| `/admin/verifications` | Verifications queue | `admin/verifications/page.tsx` | Yes (Admin)   |

---

## User Flows

### Primary User Journey (Parent)

```
1. Landing Page (/)
   ↓
2. Sign Up (/auth/register) OR Start Quiz (/chestionar)
   ↓
3. Complete Quiz (/chestionar/container)
   ↓
4. View Results (/chestionar/rezultate)
   ↓
5. Browse Recommended Clubs (/cluburi)
   ↓
6. View Club Details (/cluburi/[slug])
   ↓
7. Create Booking (if authenticated) OR Sign Up
   ↓
8. Parent Dashboard (/parent/dashboard)
   ↓
9. Manage Children (/parent/children)
   ↓
10. View Bookings (/parent/bookings)
```

### Club Discovery Flow

```
1. Sports Listing (/sporturi)
   ↓
2. Sport Detail (/sporturi/[slug])
   ↓
3. Clubs for Sport (/cluburi?sport=[slug])
   ↓
4. Club Detail (/cluburi/[slug])
   ↓
5. Booking or Contact
```

### Doctor Consultation Flow

```
1. Quiz Results (/chestionar/rezultate)
   ↓
2. Risk Signal Detected → Doctor Recommendation
   ↓
3. Doctors Listing (/doctori)
   ↓
4. Doctor Detail (/doctori/[slug])
   ↓
5. Booking Consultation
```

### Search Flow

```
1. Search Page (/cautare)
   ↓
2. Enter Search Query
   ↓
3. View Results (Clubs, Doctors, Sports)
   ↓
4. Filter Results
   ↓
5. Navigate to Detail Page
```

---

## Navigation Structure

### Main Navigation (Header)

**Public Navigation**:

- Acasă (/)
- Sporturi (/sporturi)
- Cluburi (/cluburi)
- Doctori (/doctori)
- Chestionar (/chestionar)
- Despre Noi (/despre-noi)
- Contact (/contact)

**Authenticated Navigation**:

- Dashboard (/parent/dashboard)
- Copiii Mei (/parent/children)
- Rezervări (/parent/bookings)
- Favorite (/parent/favorites)
- Setări (/parent/settings)

### Footer Navigation

**Links**:

- Despre Noi (/despre-noi)
- Parteneri (/parteneri)
- Întrebări Frecvente (/intrebari-frecvente)
- Contact (/contact)
- Ajutor (/ajutor)

**Legal**:

- Confidențialitate (/confidentialitate)
- Termeni și Condiții (/termeni)
- Cookies (/cookies)
- GDPR pentru Părinți (/gdpr-parinti)

---

## Route Helper Functions

### Usage from `src/lib/routes.ts`

```typescript
import { routes } from "@/lib/routes";

// Public routes
<Link href={routes.home}>Acasă</Link>
<Link href={routes.clubs.list}>Cluburi</Link>
<Link href={routes.clubs.detail("fotbal-club-bucuresti")}>Detalii Club</Link>

// Auth routes
<Link href={routes.login}>Autentificare</Link>
<Link href={routes.register}>Înregistrare</Link>

// Protected routes
<Link href={routes.parent.dashboard}>Dashboard</Link>
<Link href={routes.parent.children.list}>Copiii Mei</Link>
```

### Helper Functions

```typescript
import { isProtectedRoute, getRouteGroup, isPublicSeoRoute } from "@/lib/routes";

// Check if route requires authentication
if (isProtectedRoute("/parent/dashboard")) {
  // Redirect to login
}

// Get route group
const group = getRouteGroup("/cluburi"); // Returns "public"

// Check if route is SEO-friendly
if (isPublicSeoRoute("/cluburi")) {
  // Add SEO meta tags
}
```

---

## SEO Notes

### Public SEO Routes (Romanian)

These routes are indexed by search engines and use Romanian language:

- `/sporturi`, `/sporturi/[slug]`
- `/cluburi`, `/cluburi/[slug]`
- `/doctori`, `/doctori/[slug]`
- `/chestionar`, `/chestionar/rezultate`
- `/despre-noi`, `/parteneri`, `/intrebari-frecvente`, `/contact`, `/ajutor`
- `/confidentialitate`, `/termeni`, `/cookies`, `/gdpr-parinti`

### Internal Routes (English)

These routes are NOT indexed and use English:

- `/auth/*`
- `/parent/*`
- `/club/*`
- `/doctor/*`
- `/admin/*`

---

## Legacy Routes (Redirects)

### Kindedo → Yuvoo Redirects

| Old Route   | New Route   | Status         |
| ----------- | ----------- | -------------- |
| `/classes`  | `/cluburi`  | ✅ Implemented |
| `/teachers` | `/doctori`  | ✅ Implemented |
| `/programs` | `/sporturi` | ✅ Implemented |

---

## SEO Files

### Sitemap (`/sitemap.xml`)

Auto-generated sitemap for Google Search Console indexing.

**Included Pages** (indexed):
| Category | Example Routes | Priority | Change Frequency |
|----------|----------------|----------|------------------|
| Homepage | `/` | 1.0 | daily |
| Core Directories | `/sporturi`, `/cluburi`, `/doctori` | 0.9 | daily/weekly |
| AI Quiz | `/chestionar` | 0.9 | monthly |
| B2B Landing | `/pentru-cluburi`, `/pentru-doctori` | 0.85 | monthly |
| B2B Sub-pages | `/pentru-cluburi/cum-functioneaza`, etc. | 0.65-0.7 | monthly |
| Detail Pages | `/cluburi/[slug]`, `/doctori/[slug]` | 0.7-0.8 | weekly |
| Location Pages | `/cluburi/locatie/[location]` | 0.75 | weekly |
| Info Pages | `/despre-noi`, `/contact`, `/ajutor` | 0.6-0.7 | monthly |
| Search | `/cautare` | 0.7 | weekly |
| Legal Pages | `/confidentialitate`, `/termeni`, etc. | 0.3 | yearly |

**Excluded Pages** (not indexed):

- Authentication routes (`/login`, `/register`, `/auth/*`)
- Protected dashboards (`/parent/*`, `/club/*`, `/doctor/*`, `/admin/*`)
- Internal quiz flows (`/chestionar/rezultate/*`, `/chestionar/container`)
- Payment flows (`/chestionar/payment/*`, `/cereri/*`)
- Onboarding flows (`/onboarding/*`)
- API routes (`/api/*`)

### Robots.txt (`/robots.txt`)

Auto-generated robots.txt with comprehensive crawler rules.

**Allowed**:

- All public pages for search engine crawlers
- Image crawlers for club/doctor/sport images

**Blocked**:

- Authentication and protected routes
- API endpoints
- Analytics/tracking paths (`/ingest/`, `/monitoring`)
- AI crawlers (GPTBot, ChatGPT-User, CCBot, anthropic-ai)

---

## API Routes

### Public API

| Route          | Description     | Method |
| -------------- | --------------- | ------ |
| `/api/search`  | Search endpoint | GET    |
| `/api/clubs`   | Clubs listing   | GET    |
| `/api/doctors` | Doctors listing | GET    |

### Protected API

| Route            | Description          | Method                 | Auth Required |
| ---------------- | -------------------- | ---------------------- | ------------- |
| `/api/bookings`  | Bookings management  | GET, POST              | Yes           |
| `/api/favorites` | Favorites management | GET, POST, DELETE      | Yes           |
| `/api/children`  | Children management  | GET, POST, PUT, DELETE | Yes           |

### Webhooks

| Route                 | Description          | Method |
| --------------------- | -------------------- | ------ |
| `/api/webhooks/stack` | Stack Auth webhooks  | POST   |
| `/api/webhooks/brevo` | Brevo email webhooks | POST   |

---

## Quick Reference

### Route Categories

**Public SEO Routes** (Romanian):

- Home, Sports, Clubs, Doctors, Quiz, Info, Legal pages

**Internal Routes** (English):

- Auth, Parent Dashboard, Club Portal, Doctor Portal, Admin

**API Routes**:

- Search, Data endpoints, Webhooks

### Route Patterns

**Dynamic Routes**:

- `[slug]` - Club, Doctor, Sport slugs
- `[id]` - User, Child, Booking IDs
- `[category]` - Club categories

**Query Parameters**:

- `?sport=[slug]` - Filter by sport
- `?city=[city]` - Filter by city
- `?age=[age]` - Filter by age
- `?verified=true` - Filter verified only

---

## References

- **Routes Definition**: `src/lib/routes.ts` - Single source of truth for all routes
- **SEO Guidelines**: `docs/SEO_GUIDELINES.md` - SEO strategy and slug generation
- **Architecture Overview**: `docs/ARCHITECTURE_OVERVIEW.md` - Technical architecture
- **System Patterns**: `memory-bank/systemPatterns.md` - Routing patterns

---

## Summary

This site map ensures:

- ✅ **Complete Route Structure**: All routes documented
- ✅ **User Flows**: Clear user journey paths
- ✅ **Navigation Structure**: Header and footer navigation
- ✅ **SEO Strategy**: Public routes in Romanian, internal routes in English
- ✅ **Route Helpers**: Functions for route checking and building
- ✅ **Legacy Support**: Redirect mappings from old routes

**Always reference this site map when creating new pages or understanding the application structure.**
