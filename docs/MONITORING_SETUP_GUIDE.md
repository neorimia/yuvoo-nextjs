# Monitoring Setup Guide

Complete guide for setting up monitoring, error tracking, and analytics for Yuvoo.

**Last Updated**: January 2025  
**Status**: Ready for Implementation

---

## Overview

Yuvoo monitoring setup includes:

- **Error Tracking**: Sentry for error tracking and performance monitoring
- **Analytics**: Vercel Analytics (built-in) + Google Analytics (optional)
- **Performance Monitoring**: Web Vitals, custom performance metrics
- **Logging**: Structured logging for debugging and analysis

---

## Prerequisites

Before setting up monitoring, ensure you have:

1. ✅ **Vercel Account**: For Vercel Analytics
2. ✅ **Sentry Account** (optional): For error tracking
3. ✅ **Google Analytics Account** (optional): For user analytics
4. ✅ **Production Deployment**: Monitoring is most useful in production

---

## 1. Error Tracking Setup

### Option 1: Sentry (Recommended)

**Why Sentry**:

- Comprehensive error tracking
- Performance monitoring
- Release tracking
- Source maps support
- User context tracking
- GDPR compliant

#### Step 1.1: Create Sentry Project

1. Go to [Sentry.io](https://sentry.io) and sign up/login
2. Create a new project:
   - **Platform**: Next.js
   - **Project Name**: `yuvoo`
   - **Organization**: Your organization

3. **Copy DSN** (Data Source Name) - you'll need it for configuration

#### Step 1.2: Install Sentry SDK

```bash
npm install @sentry/nextjs
```

#### Step 1.3: Configure Sentry

**Run Sentry wizard** (recommended for first-time setup):

```bash
npx @sentry/wizard@latest -i nextjs
```

This will:

- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Create `sentry.edge.config.ts`
- Update `next.config.ts` with Sentry plugin
- Create `.sentryclirc` for source maps

**Manual Configuration** (if wizard doesn't work):

1. **Create `sentry.client.config.ts`**:

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0, // Adjust based on traffic (1.0 = 100%, 0.1 = 10%)
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

2. **Create `sentry.server.config.ts`**:

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  debug: false,
});
```

3. **Create `sentry.edge.config.ts`**:

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

#### Step 1.4: Update Next.js Config

**Update `next.config.ts`**:

```typescript
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // ... existing config
};

// Wrap with Sentry
export default withSentryConfig(nextConfig, {
  // Sentry configuration
  silent: true,
  org: "your-org",
  project: "yuvoo",
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
```

#### Step 1.5: Set Environment Variables

**Add to `.env.local`** (development):

```bash
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_ORG=your-org
SENTRY_PROJECT=yuvoo
SENTRY_AUTH_TOKEN=your-auth-token
```

**Add to Vercel** (production):

- Go to Project Settings → Environment Variables
- Add all Sentry variables for Production, Preview, and Development

#### Step 1.6: Error Boundary Component

**Create `src/components/shared/ErrorBoundary.tsx`**:

```typescript
"use client";

import React from "react";
import * as Sentry from "@sentry/nextjs";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="container py-5">
            <div className="alert alert-danger">
              <h4>Ceva nu a mers bine</h4>
              <p>Ne pare rău, a apărut o eroare. Vă rugăm să reîncercați.</p>
              <button
                className="btn btn-primary"
                onClick={() => this.setState({ hasError: false })}
              >
                Reîncearcă
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

#### Step 1.7: Usage in Code

**Capture errors manually**:

```typescript
import * as Sentry from "@sentry/nextjs";

try {
  // Your code
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: "booking",
    },
    extra: {
      userId: user.id,
      bookingId: booking.id,
    },
  });
  throw error; // Re-throw if needed
}
```

**Add user context**:

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.displayName,
});
```

### Option 2: Vercel Logs (Built-in)

**Vercel provides built-in logging**:

- Available in Vercel Dashboard → Logs
- No setup required
- View function logs, errors, and performance
- Limited retention (7 days on free tier)

**Usage**:

- Logs are automatically captured
- View in Vercel Dashboard → Your Project → Logs
- Filter by function, time range, log level

---

## 2. Analytics Setup

### Option 1: Vercel Analytics (Recommended - Built-in)

**Why Vercel Analytics**:

- Zero configuration
- Web Vitals tracking
- Real User Monitoring (RUM)
- Performance insights
- No additional cost (included with Vercel)

#### Step 2.1: Enable Vercel Analytics

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Analytics**
2. Click **"Enable Analytics"**
3. Analytics will start collecting data automatically

#### Step 2.2: View Analytics

- **Dashboard**: Vercel Dashboard → Your Project → Analytics
- **Metrics**: Page views, Web Vitals, performance scores
- **Real-time**: Live user activity

**No code changes required** - Vercel Analytics works automatically.

### Option 2: Google Analytics (Optional)

**Why Google Analytics**:

- Comprehensive user analytics
- Custom events and conversions
- Audience insights
- E-commerce tracking (if needed)

#### Step 2.1: Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property:
   - **Property Name**: `Yuvoo`
   - **Reporting Time Zone**: `Europe/Bucharest`
   - **Currency**: `RON`

3. **Copy Measurement ID** (format: `G-XXXXXXXXXX`)

#### Step 2.2: Install Google Analytics

**Option A: Using `next/script` (Recommended)**:

1. **Create `src/lib/analytics/google-analytics.ts`**:

```typescript
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

2. **Add to `src/app/layout.tsx`**:

```typescript
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

3. **Add environment variable**:

```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Step 2.3: Track Custom Events

**Example: Track quiz completion**:

```typescript
import { event } from "@/lib/analytics/google-analytics";

// Track quiz completion
event({
  action: "quiz_completed",
  category: "quiz",
  label: sportType,
  value: score,
});
```

**Example: Track booking creation**:

```typescript
event({
  action: "booking_created",
  category: "bookings",
  label: bookingType, // "club" or "doctor"
  value: 1,
});
```

### Option 3: Privacy-First Analytics (Optional)

**Consider privacy-first alternatives**:

- **Plausible Analytics**: Privacy-focused, GDPR compliant
- **PostHog**: Open-source, self-hostable
- **Umami**: Self-hosted, privacy-focused

---

## 3. Performance Monitoring

### Web Vitals Tracking ✅ IMPLEMENTED

**Status**: ✅ Complete - Web Vitals monitoring implemented

**Implementation Location**:

- `src/lib/monitoring/web-vitals.ts` - Web Vitals tracking utilities
- `src/components/monitoring/WebVitalsReporter.tsx` - React component
- Integrated in `src/app/layout.tsx`

**Tracked Metrics**:

- **LCP** (Largest Contentful Paint) - Target: < 2.5 seconds
- **INP** (Interaction to Next Paint) - Replaces FID, Target: < 200ms
- **CLS** (Cumulative Layout Shift) - Target: < 0.1
- **FCP** (First Contentful Paint) - Target: < 1.8 seconds
- **TTFB** (Time to First Byte) - Target: < 800ms

**Metrics are sent to**:

- PostHog as `$web_vitals` events
- Sentry as distribution metrics

**Documentation**: See `docs/PERFORMANCE_MONITORING_SETUP.md` for complete implementation details.

#### Implementation Details

**Code Location**: `src/lib/monitoring/web-vitals.ts`

**API Performance Monitoring**: ✅ Complete

**Implementation Location**: `src/lib/monitoring/api-performance.ts`

Provides utilities for tracking API response times:

- `trackApiPerformance()` - Track API route performance
- `trackApiHandler()` - Wrap API handlers with performance tracking
- `trackServerActionPerformance()` - Track Server Action performance
- `trackServerAction()` - Wrap Server Actions with performance tracking

**Usage Example**:

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

**Documentation**: See `docs/PERFORMANCE_MONITORING_SETUP.md` for complete implementation details and usage examples.

**Update `src/app/layout.tsx`**:

```typescript
import { reportWebVitals } from "@/lib/analytics/web-vitals";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined") {
    reportWebVitals();
  }

  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
```

### Custom Performance Monitoring

**Create `src/lib/performance/monitoring.ts`**:

```typescript
/**
 * Performance Monitoring Utilities
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];

  /**
   * Measure function execution time
   */
  async measure<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.recordMetric(name, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}_error`, duration);
      throw error;
    }
  }

  /**
   * Record a performance metric
   */
  recordMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
    };

    this.metrics.push(metric);

    // Send to analytics (if configured)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "performance_metric", {
        event_category: "Performance",
        event_label: name,
        value: Math.round(value),
      });
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`);
    }
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Clear metrics
   */
  clear() {
    this.metrics = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

**Usage**:

```typescript
import { performanceMonitor } from "@/lib/performance/monitoring";

// Measure API call
const result = await performanceMonitor.measure("api_get_clubs", async () => {
  return await getClubs();
});

// Record custom metric
performanceMonitor.recordMetric("quiz_submission_time", 1234);
```

---

## 4. Logging Setup

### Structured Logging

**Create `src/lib/logging/logger.ts`**:

```typescript
/**
 * Structured Logging Utility
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: Error;
}

class Logger {
  private formatMessage(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    };
  }

  debug(message: string, context?: Record<string, unknown>) {
    const entry = this.formatMessage("debug", message, context);
    if (process.env.NODE_ENV === "development") {
      console.debug(JSON.stringify(entry));
    }
  }

  info(message: string, context?: Record<string, unknown>) {
    const entry = this.formatMessage("info", message, context);
    console.log(JSON.stringify(entry));
  }

  warn(message: string, context?: Record<string, unknown>) {
    const entry = this.formatMessage("warn", message, context);
    console.warn(JSON.stringify(entry));
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    const entry = this.formatMessage("error", message, context, error);

    // Send to Sentry (if configured)
    if (typeof window !== "undefined" && (window as any).Sentry) {
      (window as any).Sentry.captureException(error || new Error(message), {
        extra: context,
      });
    }

    console.error(JSON.stringify(entry));
  }
}

export const logger = new Logger();
```

**Usage**:

```typescript
import { logger } from "@/lib/logging/logger";

logger.info("User logged in", { userId: user.id });
logger.error("Failed to create booking", error, { userId: user.id, clubId: club.id });
```

---

## 5. Monitoring Dashboard ✅ GUIDES CREATED

**Status**: ✅ Complete - Dashboard setup guides created

**Documentation**:

- `docs/MONITORING_DASHBOARDS_SETUP.md` - Complete dashboard setup guide
  - PostHog dashboards (user flows, error rates, performance)
  - Sentry dashboards (error overview, performance, user impact)
  - Dashboard best practices and layout recommendations
- `docs/POSTHOG_DASHBOARD_SETUP.md` - PostHog-specific dashboard configuration

**Next Steps**: Follow the guides to create dashboards in PostHog and Sentry dashboards.

### Vercel Dashboard

**Available Metrics**:

- Function execution time
- Function invocations
- Error rates
- Bandwidth usage
- Build times

**Access**: Vercel Dashboard → Your Project → Analytics

### Sentry Dashboard

**Available Metrics**:

- Error frequency
- Performance metrics
- Release health
- User impact
- Issue trends

**Access**: Sentry Dashboard → Your Project

### Google Analytics Dashboard

**Available Metrics**:

- Page views
- User sessions
- Bounce rate
- Conversion events
- Audience demographics

**Access**: Google Analytics → Your Property

---

## 6. Alerting Setup ✅ GUIDE CREATED

**Status**: ✅ Complete - Alerting setup guide created

**Documentation**: `docs/SENTRY_ALERTING_SETUP.md`

**Includes**:

- Error rate alerts (>5% error rate)
- Slow page load alerts (>3s page load)
- New issue alerts
- Performance degradation alerts
- Email notification configuration

**Next Steps**: Follow the guide to configure alerts in Sentry dashboard.

### Sentry Alerts

1. Go to **Sentry Dashboard** → **Alerts**
2. Create alert rules:
   - **Error rate threshold**: Alert if error rate > 5%
   - **Performance degradation**: Alert if p95 latency > 2s
   - **New issues**: Alert on new error types

3. **Configure notifications**:
   - Email
   - Slack
   - PagerDuty
   - Webhooks

### Vercel Alerts

1. Go to **Vercel Dashboard** → **Settings** → **Notifications**
2. Configure alerts for:
   - Build failures
   - Deployment failures
   - Function errors

### Custom Alerts

**Create monitoring endpoint** (`src/app/api/health/route.ts`):

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check database connection
    // Check external services
    // Return health status

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: "ok",
        email: "ok",
        ai: "ok",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
```

**Set up uptime monitoring**:

- Use services like UptimeRobot, Pingdom, or StatusCake
- Monitor `/api/health` endpoint
- Alert on downtime

---

## 7. GDPR Compliance

### Cookie Consent

**Important**: Analytics and tracking require user consent in EU/GDPR regions.

1. **Implement cookie consent banner** (already in `src/lib/cookies.ts`)
2. **Only load analytics after consent**:

```typescript
// Only load Google Analytics if user consented
if (cookies.analytics) {
  // Load Google Analytics
}
```

### Data Privacy

- **Anonymize IP addresses** in Google Analytics
- **Respect Do Not Track** headers
- **Provide opt-out mechanisms**
- **Document data collection** in Privacy Policy

---

## 8. Implementation Checklist

### Error Tracking

- [ ] Create Sentry account and project
- [ ] Install `@sentry/nextjs`
- [ ] Run Sentry wizard or configure manually
- [ ] Set environment variables
- [ ] Create ErrorBoundary component
- [ ] Add error tracking to critical paths
- [ ] Configure alerts

### Analytics

- [ ] Enable Vercel Analytics
- [ ] (Optional) Set up Google Analytics
- [ ] Add measurement ID to environment variables
- [ ] Implement custom event tracking
- [ ] Test analytics in development
- [ ] Verify data collection in production

### Performance Monitoring

- [ ] Install `web-vitals` package
- [ ] Create Web Vitals reporting utility
- [ ] Add to app layout
- [ ] Create custom performance monitoring
- [ ] Set up performance alerts
- [ ] Monitor Core Web Vitals

### Logging

- [ ] Create structured logging utility
- [ ] Replace console.log with logger
- [ ] Add logging to critical paths
- [ ] Configure log levels
- [ ] Set up log aggregation (optional)

### Alerts

- [ ] Configure Sentry alerts
- [ ] Configure Vercel notifications
- [ ] Set up health check endpoint
- [ ] Configure uptime monitoring
- [ ] Test alert delivery

---

## 9. Related Documentation

### Additional Guides

- **`docs/SENTRY_ALERTING_SETUP.md`** - Complete guide for configuring Sentry email alerts
  - Error rate alerts (>5% error rate)
  - Slow page load alerts (>3s page load)
  - New issue alerts
  - Performance degradation alerts

- **`docs/PERFORMANCE_MONITORING_SETUP.md`** - Performance monitoring implementation guide
  - Core Web Vitals tracking (LCP, INP, CLS, FCP, TTFB)
  - API response time monitoring
  - Integration with PostHog and Sentry

- **`docs/MONITORING_DASHBOARDS_SETUP.md`** - Dashboard creation guide
  - PostHog dashboards (user flows, activity, performance)
  - Sentry dashboards (error overview, performance, user impact)
  - Dashboard best practices

- **`docs/POSTHOG_DASHBOARD_SETUP.md`** - PostHog-specific dashboard setup
  - Funnel configuration
  - Cohort creation
  - Custom insights

---

## 10. Best Practices

### Error Tracking

- **Don't log sensitive data**: Never log passwords, tokens, or PII
- **Use tags and context**: Add relevant tags for filtering
- **Set appropriate sample rates**: Adjust based on traffic
- **Monitor error trends**: Track error rates over time

### Analytics

- **Respect user privacy**: Only collect necessary data
- **Anonymize data**: Remove PII from analytics
- **Use custom events**: Track meaningful user actions
- **Monitor conversion funnels**: Track key user journeys

### Performance

- **Monitor Core Web Vitals**: Focus on LCP, FID, CLS
- **Set performance budgets**: Define acceptable thresholds
- **Optimize critical paths**: Focus on high-traffic pages
- **Monitor API performance**: Track backend response times

### Logging

- **Use structured logging**: JSON format for easy parsing
- **Set appropriate log levels**: Debug, Info, Warn, Error
- **Don't over-log**: Only log meaningful events
- **Rotate logs**: Prevent log files from growing too large

---

## 10. Troubleshooting

### Sentry Not Capturing Errors

**Solutions**:

1. Verify DSN is correct
2. Check environment variables
3. Ensure Sentry is initialized
4. Check browser console for errors
5. Verify source maps are uploaded

### Analytics Not Tracking

**Solutions**:

1. Check measurement ID is correct
2. Verify script is loaded (check Network tab)
3. Check cookie consent (if required)
4. Test in incognito mode
5. Verify events are firing (use GA Debugger)

### Performance Metrics Missing

**Solutions**:

1. Ensure `web-vitals` package is installed
2. Check Web Vitals reporting function is called
3. Verify analytics integration is working
4. Check browser compatibility

---

## Support Resources

- **Sentry Docs**: [docs.sentry.io](https://docs.sentry.io)
- **Vercel Analytics**: [vercel.com/docs/analytics](https://vercel.com/docs/analytics)
- **Google Analytics**: [support.google.com/analytics](https://support.google.com/analytics)
- **Web Vitals**: [web.dev/vitals](https://web.dev/vitals)

---

**Last Updated**: January 2025  
**Status**: Ready for Implementation
