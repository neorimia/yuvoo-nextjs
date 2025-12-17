# Layout Setup Guide

Complete guide for understanding and working with Yuvoo's layout structure.

## Overview

Yuvoo uses Next.js App Router with route groups for organizing different layout types. The layout structure follows a hierarchical pattern where each route group can have its own layout.

## Layout Hierarchy

```
Root Layout (app/layout.tsx)
├── Public Routes (app/(public)/layout.tsx)
│   ├── Header (YuvooHeader)
│   ├── Main Content
│   └── Footer (FooterOne)
├── Auth Routes (app/(auth)/layout.tsx)
│   └── Minimal layout (no Header/Footer)
├── Legal Routes (app/(legal)/layout.tsx)
│   └── Minimal layout
└── Protected Routes (app/parent/, app/club/, app/doctor/, app/admin/)
    └── No shared layout (individual layouts per route group)
```

## Layout Components

### 1. Root Layout (`src/app/layout.tsx`)

**Purpose**: Base layout for entire application

**Features**:

- HTML structure with language attribute (`lang="ro"`)
- Global providers (VideoProvider, ReduxProvider, AppProvider)
- Global UI components (Toaster, GlobalVideoModal, CookieConsentBanner)
- Global styles (Bootstrap + SCSS)
- Font configuration (Gabarito)
- Metadata configuration

**Status**: ✅ Complete

### 2. Public Routes Layout (`src/app/(public)/layout.tsx`)

**Purpose**: Layout for public pages (no authentication required)

**Includes**:

- `YuvooHeader` - Main navigation header
- `Wrapper` - Page wrapper component
- `FooterOne` - Main footer
- Main content area

**Routes Using This Layout**:

- `/` (homepage)
- `/sporturi` (sports list)
- `/cluburi` (clubs list)
- `/doctori` (doctors list)
- `/chestionar` (quiz)
- `/cautare` (search)
- `/despre-noi` (about)
- `/intrebari-frecvente` (FAQ)

**Status**: ✅ Complete

### 3. Auth Routes Layout (`src/app/(auth)/layout.tsx`)

**Purpose**: Layout for authentication pages

**Features**:

- Minimal layout (no Header/Footer)
- Clean, focused design for auth flows

**Routes Using This Layout**:

- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/auth/email-confirmation`

**Status**: ✅ Complete

### 4. Protected Routes

**Purpose**: Routes requiring authentication

**Current Structure**:

- No shared layout file (each route group can have its own)
- Individual pages use `requireAuth()` for protection

**Route Groups**:

- `/parent/*` - Parent dashboard and features
- `/club/*` - Club admin features
- `/doctor/*` - Doctor features
- `/admin/*` - Admin features

**Status**: ✅ Routes exist, no shared layout needed

## Layout Components

### Header Component (`src/layouts/Header/YuvooHeader.tsx`)

**Features**:

- Logo with link to homepage
- Main navigation menu (`HeaderMenus`)
- Search functionality (`SearchPopup`)
- Mobile menu (`MenuSidebar`)
- Topbar with contact info (`TopbarFour`)
- User authentication state handling

**Status**: ✅ Complete

### Footer Component (`src/layouts/Footer/FooterOne.tsx`)

**Features**:

- Logo and description
- Quick links
- Contact information
- Social media links
- Copyright text

**Status**: ✅ Complete

### Wrapper Component (`src/layouts/Wrapper.tsx`)

**Purpose**: Page wrapper with common structure

**Features**:

- Consistent page structure
- Preloader support
- Back to top button
- Common page elements

**Status**: ✅ Complete

## Routing Structure

All routes are defined in `src/lib/routes.ts` - the single source of truth for navigation.

**Route Categories**:

1. **Public SEO Routes** (Romanian):
   - `/sporturi` - Sports list
   - `/cluburi` - Clubs list
   - `/doctori` - Doctors list
   - `/chestionar` - Quiz
   - `/cautare` - Search

2. **Internal Routes** (English):
   - `/auth/*` - Authentication
   - `/parent/*` - Parent dashboard
   - `/club/*` - Club admin
   - `/doctor/*` - Doctor portal
   - `/admin/*` - Admin panel

3. **Legal Routes** (Romanian):
   - `/confidentialitate` - Privacy
   - `/termeni` - Terms
   - `/cookies` - Cookies
   - `/gdpr-parinti` - GDPR

## Adding New Layouts

### For New Route Groups

1. Create route group folder: `app/(group-name)/`
2. Create `layout.tsx` in the route group folder
3. Import necessary components (Header, Footer, etc.)
4. Wrap children with layout structure

**Example**:

```tsx
// app/(group-name)/layout.tsx
import YuvooHeader from "@/layouts/Header/YuvooHeader";
import FooterOne from "@/layouts/Footer/FooterOne";
import Wrapper from "@/layouts/Wrapper";

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <YuvooHeader />
      <main>{children}</main>
      <FooterOne />
    </Wrapper>
  );
}
```

### For Protected Routes

Protected routes use `requireAuth()` in individual pages rather than a shared layout:

```tsx
// app/parent/dashboard/page.tsx
import { requireAuth } from "@/lib/auth/session";

export default async function DashboardPage() {
  await requireAuth(); // Throws if not authenticated
  // ... page content
}
```

## Sidebar for Auth Routes

Currently, there's no shared sidebar for authenticated routes. Each page can implement its own navigation if needed.

**Future Enhancement**: Consider creating a `ParentSidebar` component for parent dashboard routes if navigation becomes complex.

## Best Practices

1. **Always use `@/lib/routes`** for navigation links
2. **Use route groups** for organizing layouts
3. **Keep layouts minimal** - only include what's needed
4. **Use `requireAuth()`** for protected pages
5. **Follow existing patterns** - check similar routes for examples

## Status Summary

- ✅ Root layout complete
- ✅ Public routes layout complete (Header + Footer)
- ✅ Auth routes layout complete (minimal)
- ✅ Header component complete
- ✅ Footer component complete
- ✅ Wrapper component complete
- ✅ Routing structure defined
- 📋 Sidebar for auth routes (optional, not needed currently)

---

**Last Updated**: January 2025  
**Status**: All basic layouts complete and documented
