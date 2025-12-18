# Club Components

Components for displaying and managing sports clubs.

## Components

### Public-Facing Components

- `ClubsMain.tsx` - Club listing page component
- `ClubDetailsMain.tsx` - Club detail page component (Server Component, used in SSG pages)
- `ClubSearchFilters.tsx` - Club search and filters component
- `HomeClubArea.tsx` - Homepage club section component
- `HomeTwoClubArea.tsx` - Alternative homepage club section with carousel
- `ClubCard.tsx` - Reusable club card component (adapted from Class cards, supports multiple variants)
- `ClubDetailsWidget.tsx` - Club details widget component
- `ClubDetailsWidgetTwo.tsx` - Additional club details widget component
- `ClubSchedule.tsx` - Club training schedule display component
- `ClubGallery.tsx` - Photo gallery component for club images
- `ClubMap.tsx` - Map component for displaying club location
- `BookingForm.tsx` - Booking form component for club trial sessions (Client Component)
- `BookingFormSection.tsx` - Booking form section wrapper (Server Component)
- `VerificationBadge.tsx` - Club verification badge component (supports multiple statuses, variants, and sizes)

### Dashboard Components

- `ClubDashboardHeader.tsx` - Dashboard header with title, welcome message, and verification badge
- `ClubDashboardContent.tsx` - Main dashboard content component (orchestrates all dashboard sections)
- `ClubNotFoundState.tsx` - Empty state component when club profile is not found
- `ProfileCompletenessIndicator.tsx` - Progress indicator showing club profile completeness
- `BookingStatistics.tsx` - Statistics cards displaying booking counts by status
- `RecentActivityFeed.tsx` - Feed component displaying recent booking activity

## Usage

These components are adapted from the Kindedo Class components and updated for the Yuvoo Club domain.

### Data Structure

Components expect Club data matching the `Club` interface from `@/modules/clubs/clubs.types`.

### Routes

Components use routes from `@/lib/routes`:

- List: `routes.clubs.list` → `/cluburi`
- Detail: `routes.clubs.detail(slug)` → `/cluburi/${slug}`

### Features

- Verification badge display
- Sport information
- Location display
- Age groups
- Pricing information
- Image galleries
- Search and filtering (sport, age, city, level, verified, featured)
- Sorting options (name, verified, rating, distance)
- Location-based search (radius, distance sorting)
- Booking form for trial sessions (child selection, date/time, notes)
- Full booking creation flow (form → validation → database → notifications)
- Enhanced verification badge with status support (approved, pending, in_review, rejected)

## Migration Notes

These components are created as adaptations of Class components:

- `Class/ClassesMain.tsx` → `features/clubs/ClubsMain.tsx` (now uses ClubCard component)
- `Class/ClassDetailsMain.tsx` → `features/clubs/ClubDetailsMain.tsx` (converted to Server Component, supports SSG)
- `Class/HomeClassArea.tsx` → `features/clubs/HomeClubArea.tsx`
- `Class/HomeTwoClassArea.tsx` → `features/clubs/HomeTwoClubArea.tsx`
- `Class/ClassDetailsWidget.tsx` → `features/clubs/ClubDetailsWidget.tsx`
- `Class/ClassDetailsWidgetTwo.tsx` → `features/clubs/ClubDetailsWidgetTwo.tsx`
- `Class/LearningSchedule.tsx` → `features/clubs/ClubSchedule.tsx`
- `Class card structure (bd-class-3)` → `ClubCard.tsx` (listing variant)
- `Gallery/GalleryMain.tsx` → `features/clubs/ClubGallery.tsx` (adapted for club images)
- `Contact/ContactFormMain.tsx` (map pattern) → `features/clubs/ClubMap.tsx` (new component for club locations)
- `Form/ContactForm.tsx` (form pattern) → `features/clubs/BookingForm.tsx` (new component for booking club trials)
