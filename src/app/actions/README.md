# Server Actions

Server Actions are the primary backend entry point for Next.js App Router.

## Structure

Each feature has its own Server Actions file:

- `auth.ts` - Authentication actions
- `children.ts` - Child profile actions
- `quiz.ts` - Quiz submission & analysis
- `clubs.ts` - Club search & management
- `doctors.ts` - Doctor search & management
- `bookings.ts` - Booking creation & management
- `favorites.ts` - Favorites management
- `uploads.ts` - File upload actions

## Pattern

Server Actions follow this pattern:

1. **Authentication Check** - Verify user is authenticated (if required)
2. **Input Validation** - Validate input using Zod schemas from `lib/validations/`
3. **Service Layer Call** - Call appropriate service from `modules/`
4. **Cache Revalidation** - Revalidate Next.js cache if needed
5. **Error Handling** - Handle and format errors appropriately

## Example Flow

```
Client Component → Server Action → Service → Repository → Database
                                      ↓
                                  Response → Client
```

## Usage

```tsx
"use client";

import { getClubBySlug } from "@/app/actions/clubs";

export function ClubDetails({ slug }: { slug: string }) {
  const handleLoad = async () => {
    const club = await getClubBySlug(slug);
    // Use club data
  };

  return <button onClick={handleLoad}>Load Club</button>;
}
```

## Best Practices

1. **Always validate input** - Use Zod schemas from `lib/validations/`
2. **Check authentication** - Use `requireAuth()` from `modules/auth/auth.service`
3. **Handle errors gracefully** - Return error objects, don't throw
4. **Revalidate cache** - Use `revalidatePath()` after mutations
5. **Type safety** - Use TypeScript types from modules
6. **Romanian language** - All error messages must be in Romanian
