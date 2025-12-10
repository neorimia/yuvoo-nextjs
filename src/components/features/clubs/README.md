# Club Components

Components for displaying and managing sports clubs.

## Components

- `ClubsMain.tsx` - Club listing page component
- `ClubDetailsMain.tsx` - Club detail page component
- `HomeClubArea.tsx` - Homepage club section component
- `ClubCard.tsx` - Reusable club card component
- `VerificationBadge.tsx` - Club verification badge component

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

## Migration Notes

These components are created as adaptations of Class components:

- `Class/ClassesMain.tsx` → `features/clubs/ClubsMain.tsx`
- `Class/ClassDetailsMain.tsx` → `features/clubs/ClubDetailsMain.tsx`
- `Class/HomeClassArea.tsx` → `features/clubs/HomeClubArea.tsx`
