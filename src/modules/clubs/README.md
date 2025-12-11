# Clubs Module

Sports club operations and search business logic.

## Files

- `clubs.service.ts` - Business logic for club operations
- `clubs.repository.ts` - Data access for club queries
- `clubs.search.ts` - Search and filtering logic
- `clubs.types.ts` - TypeScript types

## Functions

### Service

- `getClubBySlug(slug)` - Get club by slug
- `searchClubs(filters)` - Search clubs with filters
- `getClubsBySport(sportId)` - Get clubs by sport
- `getVerifiedClubs()` - Get verified clubs only

### Search

- `search(filters)` - Search with filters, sorting, pagination

### Repository

- `findBySlug(slug)` - Find club by slug
- `findBySport(sportId)` - Find clubs by sport
- `findVerified()` - Find verified clubs
- `findAll()` - Find all clubs

## Usage

```typescript
import { getClubBySlug, searchClubs } from "@/modules/clubs/clubs.service";

// Get club details
const club = await getClubBySlug("fotbal-club-bucuresti");

// Search clubs
const results = await searchClubs({
  sportId: "football",
  age: 8,
  city: "București",
  verified: true,
  page: 1,
  pageSize: 20,
});
```
