# Performance Optimization Guide

Comprehensive guide for optimizing application performance in the Yuvoo platform.

## Overview

Performance optimization is critical for:

- **User Experience**: Faster page loads, smoother interactions
- **SEO**: Better Core Web Vitals scores
- **Cost Efficiency**: Reduced server load and API costs
- **Scalability**: Handle more users with same resources

## Optimization Areas

### 1. Database Query Optimization

#### Indexes

**Status**: ✅ **COMPLETE** - All necessary indexes added

**Indexes Added**:

**Users Table**:

- `idx_users_email` - Email lookups
- `idx_users_stack_user_id` - Stack Auth ID lookups
- `idx_users_role` - Role-based queries

**Children Table**:

- `idx_children_parent_id` - Parent-child relationships

**Quizzes Table** (Already existed):

- `idx_quizzes_child_id` - Child quiz history
- `idx_quizzes_created_at` - Date sorting
- `idx_quizzes_child_created` - Composite (child + date)

**Clubs Table**:

- `idx_clubs_slug` - Slug lookups (O(1) performance)
- `idx_clubs_sport_type` - Sport filtering
- `idx_clubs_city` - City filtering
- `idx_clubs_verified` - Verification status filtering
- `idx_clubs_featured` - Featured clubs
- `idx_clubs_verification_status` - Verification workflow
- `idx_clubs_sport_city` - Composite (sport + city) - Common search pattern
- `idx_clubs_verified_featured` - Composite (verified + featured)

**Doctors Table**:

- `idx_doctors_slug` - Slug lookups (O(1) performance)
- `idx_doctors_specialty` - Specialty filtering
- `idx_doctors_city` - City filtering
- `idx_doctors_verified` - Verification status filtering
- `idx_doctors_verification_status` - Verification workflow
- `idx_doctors_specialty_city` - Composite (specialty + city) - Common search pattern
- `idx_doctors_verified_specialty` - Composite (verified + specialty)

**Bookings Table**:

- `idx_bookings_parent_id` - User bookings
- `idx_bookings_child_id` - Child bookings
- `idx_bookings_club_id` - Club bookings
- `idx_bookings_doctor_id` - Doctor bookings
- `idx_bookings_status` - Status filtering
- `idx_bookings_scheduled_at` - Date-based queries
- `idx_bookings_parent_status` - Composite (parent + status)
- `idx_bookings_scheduled_status` - Composite (scheduled + status)

**Favorites Table**:

- `idx_favorites_user_id` - User favorites
- `idx_favorites_club_id` - Club favorites
- `idx_favorites_doctor_id` - Doctor favorites
- `idx_favorites_user_club` - Composite (user + club)
- `idx_favorites_user_doctor` - Composite (user + doctor)

**Reviews Table**:

- `idx_reviews_user_id` - User reviews
- `idx_reviews_club_id` - Club reviews
- `idx_reviews_doctor_id` - Doctor reviews
- `idx_reviews_moderated` - Moderation status
- `idx_reviews_rating` - Rating queries
- `idx_reviews_club_moderated` - Composite (club + moderated)
- `idx_reviews_doctor_moderated` - Composite (doctor + moderated)

**Query Performance**:

- All common query patterns now have indexes
- Composite indexes for multi-column filters
- Slug-based lookups are O(1) with unique indexes

#### Query Optimization Best Practices

1. **Use Indexed Columns**: Always filter by indexed columns when possible
2. **Limit Results**: Use pagination to limit result sets
3. **Select Specific Fields**: Only select needed columns
4. **Avoid N+1 Queries**: Use joins or batch queries
5. **Cache Results**: Use query caching for frequently accessed data

### 2. React Component Optimization

#### Memoization

**Components Memoized**:

- ✅ `ClubCard` - Memoized to prevent re-renders
- ✅ `DoctorCard` - Memoized to prevent re-renders
- ✅ Quiz question components (already memoized)

**Pattern**:

```tsx
export default React.memo(ComponentName);
```

#### useMemo and useCallback

**When to Use**:

- `useMemo`: Expensive calculations, object/array creation
- `useCallback`: Event handlers passed to child components

**Example**:

```tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const handleClick = useCallback(() => {
  doSomething();
}, []);
```

#### Code Splitting

**Next.js Automatic Code Splitting**:

- Route-based splitting (automatic)
- Dynamic imports for heavy components

**Manual Code Splitting**:

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <div>Loading...</div>,
  ssr: false, // If component doesn't need SSR
});
```

### 3. Caching Strategy

#### Query Result Caching

**Location**: `src/lib/performance/optimization.ts`

**Usage**:

```typescript
import { cachedQuery, generateCacheKey } from "@/lib/performance/optimization";

const cacheKey = generateCacheKey("clubs", { city: "București", sport: "fotbal" });
const clubs = await cachedQuery(cacheKey, () => searchClubs(filters), 5 * 60 * 1000); // 5 min TTL
```

**Cache Types**:

- `queryCache` - Database query results (5 min default TTL)
- `searchCache` - Search results (5 min default TTL)

#### AI Recommendations Caching

**Location**: `src/modules/quiz/ai-recommendations-cache.service.ts`

**Features**:

- In-memory cache with 7-day TTL
- Cache key from normalized quiz answers
- Automatic expiration and cleanup

### 4. Image Optimization

**Status**: ✅ **COMPLETE** - See `docs/IMAGE_OPTIMIZATION_GUIDE.md`

**Optimizations**:

- Next.js Image component with automatic optimization
- Cloudinary transformations for CDN images
- Responsive image sizes
- Format conversion (WebP, AVIF)
- Quality optimization (80-90%)

### 5. Bundle Size Optimization

#### Next.js Automatic Optimizations

- **Tree Shaking**: Automatic removal of unused code
- **Code Splitting**: Automatic route-based splitting
- **Minification**: Automatic in production builds
- **Compression**: Gzip enabled in `next.config.ts`

#### Manual Optimizations

1. **Dynamic Imports**: Lazy load heavy components
2. **Remove Unused Dependencies**: Regular audit of `package.json`
3. **Optimize Third-party Libraries**: Use lighter alternatives when possible

### 6. API Response Optimization

#### Response Size

- Only return necessary fields
- Use pagination for large datasets
- Compress responses (Next.js handles this)

#### Rate Limiting

**Location**: `src/lib/rate-limit.ts`

**Features**:

- Per-user rate limiting (authenticated)
- Per-IP rate limiting (anonymous)
- Prevents abuse and controls costs

### 7. Next.js Configuration Optimizations

**File**: `next.config.ts`

**Current Optimizations**:

- ✅ Image optimization enabled
- ✅ Gzip compression enabled
- ✅ React Strict Mode enabled
- ✅ Cache Components enabled
- ✅ Powered-by header removed (security)

**Additional Optimizations**:

```typescript
const nextConfig: NextConfig = {
  // Production optimizations
  compress: true, // Gzip compression
  reactStrictMode: true, // React strict mode
  poweredByHeader: false, // Security

  // Experimental optimizations (if needed)
  experimental: {
    optimizeCss: true, // CSS optimization
  },
};
```

## Performance Monitoring

### Tools

1. **Lighthouse**: Run audits for performance metrics
2. **PageSpeed Insights**: Real-world performance testing
3. **Next.js Analytics**: Built-in performance monitoring
4. **Custom Monitoring**: `performanceMonitor` utility

### Key Metrics

**Core Web Vitals**:

- **LCP (Largest Contentful Paint)**: < 2.5s (target: < 1.5s)
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

**Additional Metrics**:

- **TTFB (Time to First Byte)**: < 600ms
- **FCP (First Contentful Paint)**: < 1.8s
- **TBT (Total Blocking Time)**: < 200ms

### Monitoring Utilities

**Location**: `src/lib/performance/optimization.ts`

**Usage**:

```typescript
import { performanceMonitor } from "@/lib/performance/optimization";

const { result, duration } = await performanceMonitor.measureAsync("Database Query", () =>
  searchClubs(filters)
);
```

## Optimization Checklist

### Database

- [x] All necessary indexes added ✅
- [x] Composite indexes for common query patterns ✅
- [x] Unique indexes for slug lookups ✅
- [ ] Query result caching (optional, for frequently accessed data)
- [ ] Connection pooling optimization (if needed)

### React Components

- [x] Key components memoized (ClubCard, DoctorCard) ✅
- [x] Quiz components optimized with React.memo ✅
- [ ] Additional components memoized (as needed)
- [ ] useMemo/useCallback for expensive operations
- [ ] Code splitting for heavy components

### Caching

- [x] AI recommendations caching (7-day TTL) ✅
- [x] Query caching utilities created ✅
- [ ] Search result caching (implement as needed)
- [ ] Static page caching (Next.js handles automatically)

### Images

- [x] Image optimization utilities ✅
- [x] Cloudinary optimization ✅
- [x] Responsive image sizes ✅
- [x] Format conversion (WebP, AVIF) ✅

### Bundle Size

- [x] Next.js automatic optimizations enabled ✅
- [ ] Regular dependency audits
- [ ] Dynamic imports for heavy libraries

### API

- [x] Rate limiting implemented ✅
- [x] Non-blocking email sending ✅
- [ ] Response compression (Next.js handles automatically)

## Performance Testing

### Before Optimization

1. Run Lighthouse audit
2. Check bundle size (`npm run build`)
3. Monitor database query times
4. Check Core Web Vitals

### After Optimization

1. Re-run Lighthouse audit
2. Compare bundle sizes
3. Monitor query performance
4. Verify Core Web Vitals improvements

### Continuous Monitoring

1. Set up performance budgets
2. Monitor in production
3. Regular performance audits
4. Track Core Web Vitals over time

## Best Practices

### Database Queries

1. **Always use indexes**: Filter by indexed columns
2. **Limit result sets**: Use pagination
3. **Select only needed fields**: Avoid `SELECT *`
4. **Use joins efficiently**: Avoid N+1 queries
5. **Cache frequently accessed data**: Use query caching

### React Components

1. **Memoize expensive components**: Use `React.memo`
2. **Memoize expensive calculations**: Use `useMemo`
3. **Stabilize callbacks**: Use `useCallback`
4. **Lazy load heavy components**: Use dynamic imports
5. **Avoid unnecessary re-renders**: Check dependencies

### Images

1. **Always use Next.js Image**: Automatic optimization
2. **Specify dimensions**: Prevent layout shift
3. **Use responsive sizes**: Better performance
4. **Optimize Cloudinary URLs**: Use transformations
5. **Priority loading**: For above-the-fold images

### Caching

1. **Cache query results**: For frequently accessed data
2. **Set appropriate TTL**: Balance freshness and performance
3. **Clear cache on updates**: Invalidate when data changes
4. **Monitor cache hit rates**: Track effectiveness

## Troubleshooting

### Slow Queries

1. Check if indexes are being used
2. Analyze query execution plans
3. Check for missing indexes
4. Optimize query logic

### Slow Page Loads

1. Check bundle size
2. Analyze with Lighthouse
3. Check image optimization
4. Verify code splitting

### High Memory Usage

1. Check for memory leaks
2. Monitor cache sizes
3. Clear expired cache entries
4. Optimize component re-renders

## Resources

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Database Indexing](https://www.postgresql.org/docs/current/indexes.html)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Last Updated**: January 2025  
**Status**: Production Ready
