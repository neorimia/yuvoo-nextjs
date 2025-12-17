# PostHog Dashboard Setup Guide

**Status**: Ready for Configuration  
**Last Updated**: January 2025

This guide provides step-by-step instructions for configuring PostHog dashboards, funnels, cohorts, and alerts after the analytics integration is complete.

---

## Table of Contents

1. [Setting Up Funnels](#setting-up-funnels)
2. [Creating User Cohorts](#creating-user-cohorts)
3. [Setting Up Alerts](#setting-up-alerts)
4. [Session Recordings](#session-recordings)
5. [Performance Monitoring](#performance-monitoring)

---

## Setting Up Funnels

Funnels help you understand user conversion rates through key user journeys. Here are the recommended funnels for Yuvoo:

### 1. Quiz → Booking Conversion Funnel

**Purpose**: Track how many users complete the quiz and then make a booking.

**Steps**:

1. **Navigate to PostHog Dashboard**
   - Go to your PostHog project dashboard
   - Click on "Insights" in the left sidebar
   - Click "New insight" → "Funnel"

2. **Configure Funnel Steps**:

   **Step 1: Quiz Started**
   - Event: `quiz_started`
   - Description: "User started the quiz"

   **Step 2: Quiz Completed**
   - Event: `quiz_completed`
   - Description: "User completed the quiz"
   - Filter: Must have completed Step 1

   **Step 3: Club/Doctor Viewed** (Optional intermediate step)
   - Event: `$pageview` (filtered by club/doctor detail pages)
   - OR use custom event if you add `club_viewed`/`doctor_viewed` events
   - Description: "User viewed a club or doctor"

   **Step 4: Booking Created**
   - Event: `club_booking_created` OR `doctor_consultation_created`
   - Description: "User created a booking"
   - Filter: Must have completed Step 2

3. **Funnel Settings**:
   - **Conversion Window**: 7 days (users have 7 days to convert after completing quiz)
   - **Funnel Type**: "Strict order" (steps must happen in sequence)
   - **Breakdown**: Optional - by `userRole` property to see conversion by user type

4. **Save Funnel**:
   - Name: "Quiz to Booking Conversion"
   - Save to dashboard for easy access

**Expected Metrics**:

- Conversion rate from quiz start to completion
- Conversion rate from quiz completion to booking
- Overall conversion rate (quiz start → booking)

---

### 2. User Onboarding Funnel

**Purpose**: Track user registration and onboarding completion.

**Steps**:

1. **Step 1: User Signed Up**
   - Event: `user_signed_up`
   - Description: "User registered"

2. **Step 2: Email Verified**
   - Event: `email_verified`
   - Description: "User verified their email"
   - Filter: Must have completed Step 1

3. **Step 3: Onboarding Started** (if tracked)
   - Event: `onboarding_started`
   - Description: "User started onboarding"

4. **Step 4: Onboarding Completed** (if tracked)
   - Event: `onboarding_completed`
   - Description: "User completed onboarding"
   - Filter: Must have completed Step 3

**Settings**:

- Conversion Window: 1 day
- Funnel Type: "Strict order"

---

### 3. Discovery → Booking Funnel

**Purpose**: Track users who discover clubs/doctors and make bookings.

**Steps**:

1. **Step 1: Club/Doctor Searched**
   - Event: `club_searched` OR `doctor_searched`
   - Description: "User searched for clubs/doctors"

2. **Step 2: Club/Doctor Favorited** (Optional)
   - Event: `club_favorited` OR `doctor_favorited`
   - Description: "User favorited a club/doctor"

3. **Step 3: Booking Created**
   - Event: `club_booking_created` OR `doctor_consultation_created`
   - Description: "User created a booking"

**Settings**:

- Conversion Window: 14 days
- Funnel Type: "Unordered" (steps can happen in any order)

---

## Creating User Cohorts

Cohorts help you segment users for analysis and targeted insights.

### Recommended Cohorts

#### 1. Active Quiz Users

**Definition**: Users who have completed at least one quiz in the last 30 days.

**Steps**:

1. Go to "Persons" → "Cohorts" → "New cohort"
2. Add condition:
   - Event: `quiz_completed`
   - Count: At least 1
   - Time period: Last 30 days
3. Name: "Active Quiz Users (30 days)"
4. Save cohort

#### 2. High-Value Users

**Definition**: Users who have made at least 2 bookings.

**Steps**:

1. Create new cohort
2. Add condition:
   - Event: `club_booking_created` OR `doctor_consultation_created`
   - Count: At least 2
   - Time period: All time
3. Name: "High-Value Users (2+ Bookings)"
4. Save cohort

#### 3. New Users (Last 7 Days)

**Definition**: Users who signed up in the last 7 days.

**Steps**:

1. Create new cohort
2. Add condition:
   - Person property: `signupDate` (from `$set_once`)
   - Operator: "In the last 7 days"
3. Name: "New Users (7 days)"
4. Save cohort

#### 4. Parents with Children

**Definition**: Users with role "parent" who have completed at least one quiz.

**Steps**:

1. Create new cohort
2. Add conditions:
   - Person property: `role` = "parent"
   - Event: `quiz_completed` (at least 1, all time)
3. Name: "Parents with Quiz Activity"
4. Save cohort

#### 5. Inactive Users

**Definition**: Users who signed up but haven't completed a quiz in 30+ days.

**Steps**:

1. Create new cohort
2. Add conditions:
   - Event: `user_signed_up` (at least 1, all time)
   - Event: `quiz_completed` (0 in last 30 days)
3. Name: "Inactive Users (No Quiz 30+ days)"
4. Save cohort

---

## Setting Up Alerts

Alerts notify you when important events happen or thresholds are crossed.

### Recommended Alerts

#### 1. High Quiz Completion Rate Alert

**Purpose**: Alert when quiz completion rate drops below threshold.

**Steps**:

1. Go to "Insights" → "Alerts" → "New alert"
2. Configure:
   - **Metric**: Funnel conversion rate
   - **Funnel**: "Quiz to Booking Conversion"
   - **Step**: Step 1 → Step 2 (quiz_started → quiz_completed)
   - **Condition**: Conversion rate < 50% (adjust based on baseline)
   - **Time period**: Last 24 hours
3. **Notification**: Email or Slack (configure in PostHog settings)
4. Name: "Low Quiz Completion Rate"
5. Save alert

#### 2. Booking Spike Alert

**Purpose**: Alert when bookings spike (positive signal).

**Steps**:

1. Create new alert
2. Configure:
   - **Metric**: Event count
   - **Event**: `club_booking_created` OR `doctor_consultation_created`
   - **Condition**: Count > 50 (in last 24 hours) - adjust based on baseline
3. **Notification**: Email
4. Name: "Booking Spike Alert"
5. Save alert

#### 3. User Registration Drop Alert

**Purpose**: Alert when new user registrations drop significantly.

**Steps**:

1. Create new alert
2. Configure:
   - **Metric**: Event count
   - **Event**: `user_signed_up`
   - **Condition**: Count < 5 (in last 24 hours) - adjust based on baseline
   - **Comparison**: Compare to previous period (7 days ago)
3. **Notification**: Email
4. Name: "Low User Registration Alert"
5. Save alert

#### 4. Error Rate Alert

**Purpose**: Alert when error tracking events spike.

**Steps**:

1. Create new alert
2. Configure:
   - **Metric**: Event count
   - **Event**: `$exception` (PostHog automatic error tracking)
   - **Condition**: Count > 10 (in last 1 hour)
3. **Notification**: Email or Slack
4. Name: "High Error Rate Alert"
5. Save alert

---

## Session Recordings

PostHog automatically records user sessions (with privacy settings configured). Use these to:

### Review User Journeys

1. **Navigate to Session Recordings**
   - Go to "Recordings" in PostHog dashboard
   - Filter by:
     - User properties (role, signupDate)
     - Events (quiz_started, booking_created)
     - Date range

2. **Identify Pain Points**
   - Watch recordings of users who abandon the quiz
   - Review sessions where bookings are cancelled
   - Look for common UX issues

3. **Optimize User Experience**
   - Use insights from recordings to improve:
     - Quiz flow
     - Booking process
     - Navigation

### Privacy Settings

Session recordings are configured with:

- `maskAllInputs: true` - All inputs are masked
- `maskInputOptions: { password: true, email: true }` - Sensitive fields masked
- Users can opt-out via cookie consent

---

## Performance Monitoring

### Core Web Vitals Tracking

PostHog can track Core Web Vitals automatically. To enable:

1. **Verify Configuration**
   - Check `src/lib/analytics/posthog.tsx`
   - Ensure `capture_pageview: true` is set (already configured)

2. **View Performance Metrics**
   - Go to "Insights" → "Performance"
   - View:
     - Largest Contentful Paint (LCP)
     - First Input Delay (FID)
     - Cumulative Layout Shift (CLS)
     - First Contentful Paint (FCP)
     - Time to First Byte (TTFB)

3. **Set Performance Alerts**
   - Create alerts for:
     - LCP > 2.5 seconds
     - CLS > 0.1
     - FID > 100ms

### API Response Time Monitoring

Track API response times by adding custom events:

**Example** (can be added to Server Actions):

```typescript
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents } from "@/lib/analytics/events";

// After API call
const startTime = Date.now();
const result = await apiCall();
const duration = Date.now() - startTime;

await trackEventServer(PostHogEvents.API_CALL_COMPLETED, {
  distinctId: session.user.id,
  duration,
  endpoint: "/api/example",
});
```

Then create insights to track average response times by endpoint.

---

## Dashboard Organization

### Recommended Dashboard Structure

1. **Overview Dashboard**
   - Key metrics: Daily active users, new signups, quiz completions, bookings
   - Funnels: Quiz → Booking conversion
   - Recent alerts

2. **User Engagement Dashboard**
   - Quiz completion rates
   - Booking rates
   - Favorite actions
   - User cohorts

3. **Performance Dashboard**
   - Core Web Vitals
   - API response times
   - Error rates
   - Session recordings

4. **Business Metrics Dashboard**
   - Conversion funnels
   - Revenue metrics (if applicable)
   - User retention
   - Cohort analysis

---

## Best Practices

1. **Regular Review**
   - Review funnels weekly
   - Check alerts daily
   - Analyze session recordings monthly

2. **Iterative Improvement**
   - Use insights to improve conversion rates
   - A/B test changes based on funnel data
   - Optimize based on performance metrics

3. **Privacy Compliance**
   - Ensure all tracking respects GDPR
   - Review session recordings for sensitive data
   - Respect user cookie preferences

4. **Documentation**
   - Document custom events and properties
   - Keep funnel definitions updated
   - Share insights with team

---

## Quick Reference

### Event Names (from `src/lib/analytics/events.ts`)

**Authentication**:

- `user_signed_up`
- `user_logged_in`
- `email_verified`
- `password_reset_requested`
- `password_reset_completed`

**Quiz**:

- `quiz_started`
- `quiz_step_completed`
- `quiz_completed`

**Bookings**:

- `club_booking_created`
- `club_booking_cancelled`
- `doctor_consultation_created`
- `doctor_consultation_cancelled`

**Discovery**:

- `club_searched`
- `doctor_searched`
- `club_favorited`
- `club_unfavorited`
- `doctor_favorited`
- `doctor_unfavorited`

### Person Properties (from `$set` and `$set_once`)

- `email` - User email (updatable)
- `role` - User role: parent, club_admin, doctor, admin (updatable)
- `name` - User name (updatable)
- `signupDate` - User signup date (immutable, `$set_once`)

---

## Next Steps

1. ✅ **Test all events** (Recommended first step):

   ```bash
   npm run test:posthog
   ```

   This will fire all custom events so PostHog AI can see them.

2. ✅ Set up funnels (Quiz → Booking conversion)
3. ✅ Create user cohorts
4. ✅ Set up alerts for key events
5. Review session recordings regularly
6. Monitor performance metrics
7. Iterate based on insights

---

**References**:

- [PostHog Funnels Documentation](https://posthog.com/docs/user-guides/funnels)
- [PostHog Cohorts Documentation](https://posthog.com/docs/user-guides/cohorts)
- [PostHog Alerts Documentation](https://posthog.com/docs/user-guides/alerts)
- [PostHog Session Recordings](https://posthog.com/docs/user-guides/recordings)
