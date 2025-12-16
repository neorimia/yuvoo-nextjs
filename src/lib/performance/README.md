# Performance Optimization Module

Utilities and patterns for optimizing application performance.

## Files

- `optimization.ts` - General performance utilities (caching, debouncing, throttling, monitoring)
- `react-optimization.ts` - React-specific optimization utilities (memoization, lazy loading)

## Features

### Query Result Caching

In-memory cache with TTL support for database queries:

```typescript
import { cachedQuery, generateCacheKey } from "@/lib/performance/optimization";

const cacheKey = generateCacheKey("clubs", { city: "București", sport: "fotbal" });
const clubs = await cachedQuery(
  cacheKey,
  () => searchClubs(filters),
  5 * 60 * 1000 // 5 minutes TTL
);
```

### Debouncing and Throttling

```typescript
import { debounce, throttle } from "@/lib/performance/optimization";

// Debounce search input
const debouncedSearch = debounce((query: string) => {
  performSearch(query);
}, 300);

// Throttle scroll handler
const throttledScroll = throttle(() => {
  handleScroll();
}, 100);
```

### Performance Monitoring

```typescript
import { performanceMonitor } from "@/lib/performance/optimization";

// Measure async function
const { result, duration } = await performanceMonitor.measureAsync("Database Query", () =>
  searchClubs(filters)
);

// Measure sync function
const { result, duration } = performanceMonitor.measureSync("Expensive Calculation", () =>
  computeExpensiveValue()
);
```

### React Component Optimization

```typescript
import {
  memoizeComponent,
  useStableCallback,
  useStableValue,
} from "@/lib/performance/react-optimization";

// Memoize component
const OptimizedComponent = memoizeComponent(MyComponent);

// Stable callback
const handleClick = useStableCallback(() => {
  doSomething();
});

// Stable value
const expensiveValue = useStableValue(() => {
  return computeExpensiveValue(data);
}, [data]);
```

## Cache Management

### Cache Cleanup

Start automatic cache cleanup:

```typescript
import { startCacheCleanup } from "@/lib/performance/optimization";

// Clean up expired entries every minute
const cleanupInterval = startCacheCleanup(60 * 1000);

// Stop cleanup
clearInterval(cleanupInterval);
```

### Manual Cache Operations

```typescript
import { queryCache, searchCache } from "@/lib/performance/optimization";

// Clear all caches
queryCache.clear();
searchCache.clear();

// Clear expired entries
queryCache.clearExpired();
searchCache.clearExpired();

// Get cache size
const size = queryCache.size();
```

## Best Practices

1. **Use caching for frequently accessed data** - Reduces database load
2. **Set appropriate TTL** - Balance freshness and performance
3. **Clear cache on updates** - Invalidate when data changes
4. **Monitor cache hit rates** - Track effectiveness
5. **Use debouncing for user input** - Reduce API calls
6. **Memoize expensive components** - Prevent unnecessary re-renders

## Documentation

See `docs/PERFORMANCE_OPTIMIZATION_GUIDE.md` for comprehensive performance optimization guide.

---

**Last Updated**: January 2025  
**Status**: Production Ready
