# Performance Monitoring Setup Guide

Complete guide for setting up performance monitoring for Core Web Vitals and API response times.

**Last Updated**: January 2025  
**Status**: Implementation Complete

---

## Overview

Performance monitoring tracks:

- **Core Web Vitals**: LCP, FID, CLS, FCP, TTFB
- **API Response Times**: Server Actions and API routes
- **Page Load Times**: Overall page performance

All metrics are sent to:

- **PostHog**: For analytics and user behavior correlation
- **Sentry**: For error correlation and performance tracking

---

## Implementation Status

✅ **Complete**: Web Vitals monitoring implemented  
✅ **Complete**: API performance tracking utilities created  
✅ **Complete**: Integrated into root layout

---

## Core Web Vitals Monitoring

### What's Tracked

1. **LCP (Largest Contentful Paint)**: Time to render largest content element
   - Target: < 2.5 seconds
2. **FID (First Input Delay)**: Time from first interaction to response
   - Target: < 100 milliseconds
3. **CLS (Cumulative Layout Shift)**: Visual stability score
   - Target: < 0.1
4. **FCP (First Contentful Paint)**: Time to first content render
   - Target: < 1.8 seconds
5. **TTFB (Time to First Byte)**: Server response time
   - Target: < 800 milliseconds

### Implementation

**Location**: `src/lib/monitoring/web-vitals.ts`

**Component**: `src/components/monitoring/WebVitalsReporter.tsx`

**Integration**: Already integrated in `src/app/layout.tsx`

### How It Works

1. **WebVitalsReporter** component mounts on page load
2. **reportWebVitals()** function initializes tracking
3. Metrics are automatically captured and sent to:
   - PostHog as `$web_vitals` events
   - Sentry as distribution metrics

### Viewing Metrics

**PostHog**:

1. Go to PostHog Dashboard
2. Navigate to **Events** → Filter by `$web_vitals`
3. View metric values and trends

**Sentry**:

1. Go to Sentry Dashboard
2. Navigate to **Performance** → **Metrics**
3. Filter by metric names: `lcp`, `fid`, `cls`, `fcp`, `ttfb`

---

## API Response Time Monitoring

### Implementation

**Location**: `src/lib/monitoring/api-performance.ts`

### Available Functions

#### 1. Track API Performance

```typescript
import { trackApiPerformance } from "@/lib/monitoring/api-performance";

// After API request completes
trackApiPerformance("/api/bookings", "POST", 250, 200);
```

#### 2. Wrap API Handler

```typescript
import { trackApiHandler } from "@/lib/monitoring/api-performance";
import { NextResponse } from "next/server";

export const GET = trackApiHandler(async (request: Request) => {
  // Your handler code
  return NextResponse.json({ data: "ok" });
});
```

#### 3. Track Server Action Performance

```typescript
import { trackServerActionPerformance } from "@/lib/monitoring/api-performance";

// After Server Action completes
const startTime = Date.now();
// ... action code ...
const duration = Date.now() - startTime;
trackServerActionPerformance("createBooking", duration, true);
```

#### 4. Wrap Server Action

```typescript
import { trackServerAction } from "@/lib/monitoring/api-performance";

export const createBookingAction = trackServerAction(
  async (formData: FormData) => {
    // Your action code
    return { success: true };
  },
  "createBooking" // Action name
);
```

### Example: Server Action Integration

```typescript
// src/app/actions/bookings.ts
"use server";

import { trackServerAction } from "@/lib/monitoring/api-performance";

async function createBookingInternal(formData: FormData) {
  // Your booking creation logic
  // ...
  return { success: true, bookingId: "123" };
}

// Wrap with performance tracking
export const createBookingAction = trackServerAction(createBookingInternal, "createBooking");
```

---

## Performance Dashboards

### PostHog Dashboard

**Create Web Vitals Dashboard**:

1. Go to PostHog Dashboard → **Dashboards** → **New Dashboard**
2. **Add Insight**:
   - Event: `$web_vitals`
   - Metric: Average `metric_value`
   - Group by: `metric_name`
3. **Visualization**: Time series chart
4. **Filters**: Filter by specific metrics (LCP, FID, CLS, etc.)

### Sentry Performance Dashboard

**View Performance Metrics**:

1. Go to Sentry Dashboard → **Performance**
2. **Metrics Tab**:
   - View distribution metrics
   - Filter by metric name (`lcp`, `fid`, `cls`, etc.)
   - View percentiles (p50, p75, p95, p99)
3. **Transactions Tab**:
   - View API route performance
   - Filter by route (`api.*`, `page.*`)
   - See slowest transactions

---

## Setting Up Performance Alerts

### Sentry Performance Alerts

See `docs/SENTRY_ALERTING_SETUP.md` for complete guide.

**Quick Setup**:

1. Go to Sentry Dashboard → **Alerts** → **Create Alert Rule**
2. **Condition**: "An event is seen" → Filter by transaction
3. **Metric**: `p95(transaction.duration)`
4. **Threshold**: > 3000ms (for page loads) or > 2000ms (for API routes)
5. **Action**: Email notification

### PostHog Insights

1. Go to PostHog Dashboard → **Insights**
2. Create insight for `$web_vitals` events
3. Set up alerts for metrics exceeding thresholds:
   - LCP > 2500ms
   - FID > 100ms
   - CLS > 0.1

---

## Best Practices

### Core Web Vitals

- **Monitor regularly**: Check metrics weekly
- **Set realistic targets**: Based on your actual performance
- **Focus on p75/p95**: Most users experience these percentiles
- **Correlate with errors**: Slow pages often have more errors

### API Performance

- **Track all critical routes**: Booking, quiz, authentication
- **Set appropriate thresholds**: Different routes have different targets
- **Monitor percentiles**: p95 and p99 show worst-case performance
- **Alert on degradation**: If performance degrades significantly

### Performance Budgets

**Recommended Targets**:

- **Page Load (LCP)**: < 2.5 seconds (p75)
- **API Response**: < 1 second (p95)
- **Server Actions**: < 500ms (p95)
- **TTFB**: < 800ms (p95)

---

## Troubleshooting

### Metrics Not Showing

- **Check PostHog/Sentry integration**: Verify SDKs are initialized
- **Check browser console**: Look for Web Vitals logs in development
- **Verify component mounting**: WebVitalsReporter should be in layout
- **Check network requests**: Verify events are being sent

### Slow Metrics

- **Database queries**: Check for N+1 queries
- **Image optimization**: Ensure images are optimized
- **Bundle size**: Check JavaScript bundle size
- **Server performance**: Monitor server response times

---

## Acceptance Criteria Checklist

- [x] Web Vitals tracking implemented
- [x] WebVitalsReporter component created
- [x] Integrated into root layout
- [x] API performance tracking utilities created
- [x] PostHog integration for Web Vitals
- [x] Sentry integration for Web Vitals
- [ ] Server Actions wrapped with performance tracking (optional, as needed)
- [ ] Performance dashboards created in PostHog
- [ ] Performance dashboards created in Sentry
- [ ] Performance alerts configured

---

## Next Steps

1. **Monitor metrics**: Watch for a few days to establish baseline
2. **Create dashboards**: Set up dashboards in PostHog and Sentry
3. **Set up alerts**: Configure alerts for performance degradation
4. **Optimize**: Use metrics to identify and fix performance issues

---

**Related Documentation**:

- `docs/MONITORING_SETUP_GUIDE.md` - Complete monitoring setup
- `docs/SENTRY_ALERTING_SETUP.md` - Sentry alerting configuration
- `docs/POSTHOG_DASHBOARD_SETUP.md` - PostHog dashboard setup
