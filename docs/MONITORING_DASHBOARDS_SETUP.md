# Monitoring Dashboards Setup Guide

Complete guide for creating and configuring dashboards in PostHog and Sentry for user flows, error rates, and performance metrics.

**Last Updated**: January 2025  
**Status**: Ready for Configuration

---

## Overview

Dashboards provide a centralized view of key metrics:

- **User Flows**: Conversion funnels, user journeys
- **Error Rates**: Error frequency, error trends, error types
- **Performance**: Page load times, API response times, Core Web Vitals

---

## PostHog Dashboards

### Dashboard 1: User Conversion Funnel

**Purpose**: Track user journey from signup to booking

#### Step 1.1: Create Funnel

1. Go to PostHog Dashboard → **Insights** → **New Insight** → **Funnel**
2. **Steps**:
   - Step 1: `user_signed_up`
   - Step 2: `onboarding_completed`
   - Step 3: `quiz_completed`
   - Step 4: `club_viewed` OR `doctor_viewed`
   - Step 5: `club_booking_created` OR `doctor_consultation_created`
3. **Filters**:
   - Time range: Last 30 days
   - User properties: `role = "parent"`
4. **Save**: Click "Save" → "Save as Dashboard"

#### Step 1.2: Add Breakdown

- **Breakdown by**: `role` (to see conversion by user type)
- **Breakdown by**: `onboardingRole` (to see conversion by onboarding path)

---

### Dashboard 2: Error Rate Tracking

**Purpose**: Monitor error rates and trends

#### Step 2.1: Create Error Rate Insight

1. Go to PostHog Dashboard → **Insights** → **New Insight** → **Trends**
2. **Event**: `$pageview` (or specific error events if you track them)
3. **Metric**: Count
4. **Formula** (optional): Calculate error rate if tracking error events
5. **Filters**: Time range, environment
6. **Visualization**: Time series chart
7. **Save**: Add to dashboard

---

### Dashboard 3: Performance Metrics

**Purpose**: Monitor Core Web Vitals and page performance

#### Step 3.1: Create Web Vitals Insight

1. Go to PostHog Dashboard → **Insights** → **New Insight** → **Trends**
2. **Event**: `$web_vitals`
3. **Metric**: Average `metric_value`
4. **Breakdown by**: `metric_name` (LCP, FID, CLS, FCP, TTFB)
5. **Filters**: Time range
6. **Visualization**: Time series chart (multiple lines)
7. **Save**: Add to dashboard

#### Step 3.2: Create Page Load Time Insight

1. Go to PostHog Dashboard → **Insights** → **New Insight** → **Trends**
2. **Event**: `$pageview`
3. **Metric**: Average `$performance_page_loaded` (if available)
4. **Breakdown by**: `$current_url`
5. **Filters**: Time range
6. **Visualization**: Bar chart (top pages)
7. **Save**: Add to dashboard

---

### Dashboard 4: User Activity Overview

**Purpose**: Overview of key user activities

#### Metrics to Include

1. **Total Users**: Unique users in time period
2. **Quiz Completions**: Count of `quiz_completed` events
3. **Bookings Created**: Count of `club_booking_created` + `doctor_consultation_created`
4. **Favorites Added**: Count of `club_favorited` + `doctor_favorited`
5. **Search Activity**: Count of `club_searched` + `doctor_searched`

#### Creating the Dashboard

1. Go to PostHog Dashboard → **Dashboards** → **New Dashboard**
2. **Add Multiple Insights**:
   - Create separate insights for each metric
   - Add all insights to the dashboard
3. **Layout**: Arrange in grid (2-3 columns)
4. **Save**: Name it "User Activity Overview"

---

## Sentry Dashboards

### Dashboard 1: Error Overview

**Purpose**: Track error rates and trends

#### Step 1.1: Create Error Rate Widget

1. Go to Sentry Dashboard → **Dashboards** → **New Dashboard**
2. **Add Widget** → **Discover**
3. **Query**:
   - Event type: Error
   - Time range: Last 24 hours
   - Group by: Time
4. **Visualization**: Line chart
5. **Save**: Name it "Error Rate (24h)"

#### Step 1.2: Create Error Breakdown Widget

1. **Add Widget** → **Discover**
2. **Query**:
   - Event type: Error
   - Group by: Issue title
   - Order by: Count (desc)
   - Limit: 10
3. **Visualization**: Table
4. **Save**: Name it "Top 10 Errors"

---

### Dashboard 2: Performance Overview

**Purpose**: Monitor API and page performance

#### Step 2.1: Create API Performance Widget

1. Go to Sentry Dashboard → **Performance**
2. **Create Widget**:
   - Transaction: `api.*`
   - Metric: `p95(transaction.duration)`
   - Group by: Transaction name
   - Time range: Last 24 hours
3. **Visualization**: Bar chart
4. **Save**: Add to dashboard

#### Step 2.2: Create Page Load Widget

1. **Create Widget**:
   - Transaction: `page.*`
   - Metric: `p95(transaction.duration)`
   - Group by: Transaction name
   - Time range: Last 24 hours
2. **Visualization**: Bar chart
3. **Save**: Add to dashboard

#### Step 2.3: Create Web Vitals Widget

1. **Create Widget**:
   - Metric: Distribution (`lcp`, `fid`, `cls`, `fcp`, `ttfb`)
   - Aggregation: p75, p95
   - Time range: Last 24 hours
2. **Visualization**: Table or time series
3. **Save**: Add to dashboard

---

### Dashboard 3: User Impact

**Purpose**: Track errors affecting users

#### Step 3.1: Create Affected Users Widget

1. **Add Widget** → **Discover**
2. **Query**:
   - Event type: Error
   - Group by: User
   - Metric: Unique users affected
   - Time range: Last 24 hours
3. **Visualization**: Number widget
4. **Save**: Name it "Affected Users (24h)"

#### Step 3.2: Create Error by User Role Widget

1. **Add Widget** → **Discover**
2. **Query**:
   - Event type: Error
   - Group by: `tags[role]`
   - Metric: Count
   - Time range: Last 24 hours
3. **Visualization**: Pie chart
4. **Save**: Name it "Errors by User Role"

---

## Combined Dashboard Strategy

### Recommended Dashboard Layout

#### PostHog Dashboard: "User Analytics"

**Row 1**: User Funnel

- User Conversion Funnel (wide)

**Row 2**: Activity Metrics

- Quiz Completions | Bookings Created | Favorites Added

**Row 3**: Performance

- Web Vitals (LCP, FID, CLS) | Page Load Times

**Row 4**: Error Tracking

- Error Rate | Error Trends

#### Sentry Dashboard: "Error & Performance Monitoring"

**Row 1**: Error Overview

- Error Rate (24h) | Top 10 Errors

**Row 2**: Performance Metrics

- API Performance (p95) | Page Load Performance (p95) | Web Vitals

**Row 3**: User Impact

- Affected Users | Errors by Role

---

## Dashboard Best Practices

### Organization

- **Group related metrics**: Keep similar metrics together
- **Use meaningful names**: Clear, descriptive widget names
- **Set appropriate time ranges**: Default to last 24h or 7d
- **Add context**: Include notes or descriptions where helpful

### Visualization

- **Choose appropriate charts**:
  - Time series for trends
  - Bar charts for comparisons
  - Tables for detailed data
  - Numbers for key metrics
- **Use colors consistently**: Green for good, red for bad, yellow for warning
- **Set thresholds**: Highlight metrics that exceed targets

### Maintenance

- **Review regularly**: Check dashboards weekly
- **Update as needed**: Add/remove widgets based on relevance
- **Document**: Note what each dashboard is for
- **Share**: Make dashboards accessible to team

---

## Quick Start Checklist

### PostHog Dashboards

- [ ] Create "User Conversion Funnel" dashboard
- [ ] Add funnel: Signup → Onboarding → Quiz → View → Booking
- [ ] Create "Performance Metrics" dashboard
- [ ] Add Web Vitals insights (LCP, FID, CLS)
- [ ] Create "User Activity Overview" dashboard
- [ ] Add key activity metrics (quizzes, bookings, favorites)

### Sentry Dashboards

- [ ] Create "Error Overview" dashboard
- [ ] Add error rate widget
- [ ] Add top errors widget
- [ ] Create "Performance Overview" dashboard
- [ ] Add API performance widget
- [ ] Add page load performance widget
- [ ] Add Web Vitals widget

---

## Acceptance Criteria

- [ ] User flow dashboard created (PostHog)
- [ ] Error rate dashboard created (Sentry)
- [ ] Performance dashboard created (both)
- [ ] Dashboards include all key metrics
- [ ] Dashboards are accessible to team
- [ ] Dashboard documentation complete

---

## Next Steps

1. **Create dashboards**: Use the steps above
2. **Customize**: Adjust based on your needs
3. **Set up alerts**: Configure alerts based on dashboard metrics
4. **Review regularly**: Check dashboards weekly
5. **Iterate**: Update dashboards as needed

---

**Related Documentation**:

- `docs/POSTHOG_DASHBOARD_SETUP.md` - PostHog dashboard setup (already created)
- `docs/SENTRY_ALERTING_SETUP.md` - Sentry alerting configuration
- `docs/PERFORMANCE_MONITORING_SETUP.md` - Performance monitoring setup
- `docs/MONITORING_SETUP_GUIDE.md` - Complete monitoring setup guide
