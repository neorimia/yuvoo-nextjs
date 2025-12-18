# Caching Strategy for Next.js 16 Cache Components

This document outlines the caching strategy for Yuvoo using Next.js 16 Cache Components.

## Overview

Next.js 16 introduces Cache Components, which provides a new caching model:

- **Dynamic by default**: Routes are dynamic unless explicitly cached
- **Opt-in caching**: Use `"use cache"` directive for cacheable content
- **Private cache**: Use `"use cache: private"` for user-specific prefetchable content
- **Time-based revalidation**: Use `cacheLife()` for time-based cache expiration
- **Tag-based revalidation**: Use `cacheTag()` and `revalidateTag()` for granular cache invalidation

## Migration Status

✅ **Completed**: All legacy patterns (`export const dynamic`, `export const revalidate`, `unstable_noStore()`) have been removed and replaced with Cache Components patterns.

## Caching Patterns

### Public Cache (Same for All Users)

Use `"use cache"` directive with `cacheLife()` and `cacheTag()` for public content that is the same for all users.

**Example**:

```typescript
"use cache";

import { cacheLife, cacheTag } from "next/cache";

export default async function PublicPage() {
  const data = await fetchData();

  // Cache for 1 hour
  cacheLife("hours");
  // Cache tag for revalidation
  cacheTag("public-content");

  return <div>{data}</div>;
}
```

**Pages Using Public Cache**:

- `/` (home page) - 1 hour cache
- `/sporturi` (sports listing) - 1 hour cache
- `/cluburi/[slug]` (club detail) - 1 hour cache
- `/doctori/[slug]` (doctor detail) - 1 hour cache

### Private Cache (User-Specific)

Use `"use cache: private"` for user-specific content that can be prefetched.

**Example**:

```typescript
"use cache: private";

import { cacheLife, cacheTag } from "next/cache";
import { requireAuth } from "@/lib/auth/session";

export default async function UserDashboard() {
  const session = await requireAuth();
  const data = await fetchUserData(session.userId);

  // Cache for 5 minutes (user data changes more frequently)
  cacheLife("minutes");
  // User-specific cache tag
  cacheTag(`user-${session.userId}`);
  cacheTag(`dashboard-${session.userId}`);

  return <div>{data}</div>;
}
```

**Pages Using Private Cache**:

- `/parent/dashboard` - 5 minutes cache, user-specific tags

### Dynamic Routes (No Caching)

Routes that use dynamic APIs (`cookies()`, `headers()`, `searchParams`) are automatically dynamic and cannot be cached.

**Example**:

```typescript
// No "use cache" directive - route is dynamic by default
export default async function DynamicPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const params = await searchParams;
  const data = await fetchFilteredData(params.filter);

  return <div>{data}</div>;
}
```

**Pages That Remain Dynamic**:

- `/cluburi` (clubs listing with filters) - uses `searchParams`
- `/doctori` (doctors listing with filters) - uses `searchParams`

**Note**: While these pages cannot be cached at the route level, the underlying data fetching functions can still use cache tags for optimization.

## Cache Tags

Cache tags enable fine-grained cache invalidation. Tags are organized by entity type and scope.

### Tag Naming Convention

- **Entity-specific**: `club-{id}`, `doctor-{id}`, `user-{id}`
- **Slug-based**: `club-slug-{slug}`, `doctor-slug-{slug}`
- **List-based**: `clubs-list`, `doctors-list`, `sports-list`
- **Home page sections**: `home-featured-clubs`, `home-featured-doctors`, `home-featured-sports`
- **User-specific**: `user-{userId}`, `parent-dashboard-{userId}`

### Cache Tag Usage

**In Pages** (for cache tagging):

```typescript
"use cache";
import { cacheTag } from "next/cache";

export default async function ClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  // Tag for this specific club
  cacheTag(`club-${club.id}`);
  cacheTag(`club-slug-${slug}`);
  // Tag for the clubs list (for list invalidation)
  cacheTag("clubs-list");

  return <ClubDetails club={club} />;
}
```

**In Server Actions** (for cache invalidation):

```typescript
"use server";
import { revalidateTag } from "next/cache";

export async function updateClubAction(clubId: string, updates: ClubUpdates) {
  const club = await updateClub(clubId, updates);

  // Invalidate specific club cache
  revalidateTag(`club-${club.id}`);
  revalidateTag(`club-slug-${club.slug}`);
  // Invalidate clubs list cache
  revalidateTag("clubs-list");
  // Invalidate home page featured clubs
  revalidateTag("home-featured-clubs");

  return { success: true, club };
}
```

## Cache Life Configuration

Use `cacheLife()` to set time-based cache expiration:

- **`cacheLife("minutes")`**: Cache for 5 minutes (default for minutes)
- **`cacheLife("hours")`**: Cache for 1 hour (default for hours)
- **`cacheLife("days")`**: Cache for 1 day (default for days)
- **`cacheLife("max")`**: Cache indefinitely (until tag-based revalidation)

### Recommended Cache Life Settings

| Page Type          | Cache Life | Reason                            |
| ------------------ | ---------- | --------------------------------- |
| Home page          | 1 hour     | Content changes infrequently      |
| Sports listing     | 1 hour     | Sports list is relatively static  |
| Club/Doctor detail | 1 hour     | Details change infrequently       |
| Parent dashboard   | 5 minutes  | User data changes more frequently |

## Cache Invalidation Strategy

### When to Invalidate

Cache should be invalidated when:

1. **Entity is updated**: Invalidate entity-specific tags and list tags
2. **Entity is created**: Invalidate list tags and home page tags
3. **Entity is deleted**: Invalidate entity-specific tags and list tags
4. **User data changes**: Invalidate user-specific tags

### Invalidation Patterns

**Update Entity**:

```typescript
// In Server Action
revalidateTag(`club-${club.id}`);
revalidateTag(`club-slug-${club.slug}`);
revalidateTag("clubs-list");
revalidateTag("home-featured-clubs");
```

**Create Entity**:

```typescript
// In Server Action
revalidateTag("clubs-list");
revalidateTag("home-featured-clubs");
```

**Delete Entity**:

```typescript
// In Server Action
revalidateTag(`club-${clubId}`);
revalidateTag("clubs-list");
revalidateTag("home-featured-clubs");
```

**Update User Data**:

```typescript
// In Server Action
revalidateTag(`user-${userId}`);
revalidateTag(`parent-dashboard-${userId}`);
```

## Dynamic Routes with generateStaticParams()

All dynamic routes using `"use cache"` MUST have `generateStaticParams()` returning at least one value.

**Example**:

```typescript
"use cache";

export async function generateStaticParams() {
  // Return at least one value for Cache Components compatibility
  // TODO: When repository is implemented, fetch all slugs here
  return [{ slug: "example-club" }];
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // ...
}
```

**Routes with generateStaticParams()**:

- `/cluburi/[slug]`
- `/doctori/[slug]`
- `/sporturi/[slug]`
- `/cluburi/locatie/[location]`
- `/parent/children/[id]`
- `/parent/children/[id]/quizzes`
- `/parent/children/[id]/edit`
- `/chestionar/rezultate/[id]`

## Performance Considerations

### Cache Hit Rates

Target cache hit rates:

- **Public pages**: >70% cache hit rate in production
- **Private pages**: >50% cache hit rate (lower due to user-specific nature)

### Monitoring

Monitor cache performance:

- **Vercel Analytics**: Cache hit/miss metrics
- **Lighthouse**: Performance scores should improve with caching
- **Server logs**: Track cache tag invalidation frequency

### Optimization Tips

1. **Use appropriate cache life**: Balance freshness with performance
2. **Tag strategically**: Use tags that group related content
3. **Invalidate selectively**: Only invalidate tags that are actually affected
4. **Combine tags**: Use multiple tags for fine-grained control

## Migration Checklist

- [x] Remove all `export const dynamic` declarations
- [x] Remove all `export const revalidate` declarations
- [x] Remove all `unstable_noStore()` calls
- [x] Add `"use cache"` to cacheable public pages
- [x] Add `"use cache: private"` to user-specific pages
- [x] Add `cacheLife()` to all cached pages
- [x] Add `cacheTag()` to all cached pages
- [x] Add `generateStaticParams()` to all dynamic cached routes
- [x] Update Server Actions to use `revalidateTag()`
- [x] Document caching strategy

## Testing

### Local Testing

1. **Build test**: `npm run build` - Verify no cache-related errors
2. **Cache behavior**: Check that cached pages return quickly on second request
3. **Invalidation**: Update entity and verify cache is cleared

### Production Testing

1. **Cache hit rates**: Monitor in Vercel Analytics
2. **Performance**: Check Lighthouse scores
3. **Invalidation**: Test cache invalidation after updates

## Troubleshooting

### Cache Not Working

- Verify `cacheComponents: true` in `next.config.ts`
- Check that `"use cache"` directive is present
- Ensure no dynamic APIs are used (cookies, headers, searchParams)

### Cache Not Invalidating

- Verify `revalidateTag()` is called in Server Actions
- Check that tag names match between `cacheTag()` and `revalidateTag()`
- Ensure Server Actions are marked with `"use server"`

### Build Errors

- Ensure all dynamic routes have `generateStaticParams()`
- Check that `generateStaticParams()` returns at least one value
- Verify no legacy caching patterns are used

## References

- [Next.js 16 Cache Components Documentation](https://nextjs.org/docs/app/building-your-application/caching)
- [Next.js Cache API Reference](https://nextjs.org/docs/app/api-reference/functions/cache)
- [Yuvoo Architecture Overview](./ARCHITECTURE_OVERVIEW.md)

---

**Last Updated**: 2024
**Status**: ✅ Complete - All pages migrated to Cache Components
