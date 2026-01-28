# Phase 6: Analytics & Conversion Monitoring Setup

**Status**: ⏳ **READY FOR IMPLEMENTATION**  
**Date**: January 26, 2026  
**Objective**: Set up comprehensive analytics tracking, conversion funnels, and monitoring dashboards to measure the impact of Phases 1-5

---

## Overview

Phase 6 focuses on creating the analytics infrastructure needed to measure conversion rates, track user behavior, and monitor the impact of all optimization phases. This includes PostHog funnels, dashboards, and conversion tracking.

**Expected Impact**: Enable data-driven decision making and continuous optimization

---

## What Needs to Be Created

### 1. Conversion Funnels in PostHog

#### Funnel 1: Clubs Landing Page Conversion Funnel

**Purpose**: Track conversion from landing page visit to form submission

**Steps**:

1. `clubs_landing_page_viewed` - User visits `/pentru-cluburi`
2. `clubs_landing_variant_shown` (where `variant_location` = "hero") - Hero section viewed
3. `clubs_landing_cta_clicked` (where `location` = "hero") - Hero CTA clicked
4. `clubs_contact_modal_opened` - Contact modal opened
5. `clubs_contact_form_submitted` - Form submitted successfully

**Success Metrics**:

- Overall conversion rate (visit → form submission)
- Drop-off rate at each step
- Time to conversion
- Conversion rate by traffic source

**PostHog Configuration**:

- Create funnel: "Clubs Landing Page Conversion"
- Group by: `variant_value` (to compare A/B test variants)
- Filter by: `location` = "hero" or "final_cta"

---

#### Funnel 2: Email Engagement Funnel

**Purpose**: Track email open rates and action rates

**Steps**:

1. `email_variant_sent` (where `email_type` = "lead_notification") - Email sent
2. `email_opened` (via Brevo webhook or PostHog email tracking) - Email opened
3. `lead_viewed` (when club views lead in dashboard) - Lead viewed
4. `lead_accepted` - Lead accepted by club

**Success Metrics**:

- Email open rate by variant
- Email action rate (open → view lead)
- Lead acceptance rate
- Time from email send to lead acceptance

**PostHog Configuration**:

- Create funnel: "Email Engagement & Lead Conversion"
- Group by: `variant_value` (to compare email subject variants)
- Filter by: `email_type` = "lead_notification"

---

#### Funnel 3: A/B Test Comparison Funnel

**Purpose**: Compare conversion rates between A/B test variants

**Steps**:

1. `clubs_landing_variant_shown` - Variant displayed
2. `clubs_landing_variant_clicked` - Variant CTA clicked
3. `clubs_contact_form_submitted` - Form submitted

**Success Metrics**:

- Conversion rate by variant
- Click-through rate by variant
- Statistical significance (p-value)

**PostHog Configuration**:

- Create funnel: "A/B Test Conversion Comparison"
- Group by: `variant_name` and `variant_value`
- Filter by: `variant_location` = "hero" or "final_cta"

---

### 2. PostHog Dashboards

#### Dashboard 1: Clubs Landing Page Performance

**Widgets**:

1. **Overall Conversion Rate** (Number)
   - Metric: Form submissions / Page views
   - Time period: Last 30 days
   - Comparison: Previous period

2. **Conversion Funnel** (Funnel Chart)
   - Funnel: "Clubs Landing Page Conversion"
   - Group by: None (overall) and by `variant_value` (A/B test)

3. **CTA Click Rate by Location** (Bar Chart)
   - Event: `clubs_landing_cta_clicked`
   - Group by: `location` (hero, solution, benefits, final_cta)
   - Metric: Click rate (clicks / page views)

4. **Page Views Over Time** (Line Chart)
   - Event: `clubs_landing_page_viewed`
   - Time period: Last 30 days
   - Group by: Day

5. **Form Submission Rate** (Number)
   - Event: `clubs_contact_form_submitted`
   - Time period: Last 30 days
   - Comparison: Previous period

6. **Average Time to Conversion** (Number)
   - Funnel: "Clubs Landing Page Conversion"
   - Metric: Average time from step 1 to step 5

---

#### Dashboard 2: A/B Testing Results

**Widgets**:

1. **Variant Distribution** (Pie Chart)
   - Event: `clubs_landing_variant_shown`
   - Group by: `variant_value`
   - Should show ~33% each for hero headline, CTA variants

2. **Conversion Rate by Variant** (Bar Chart)
   - Funnel: "A/B Test Conversion Comparison"
   - Group by: `variant_value`
   - Compare conversion rates

3. **Click-Through Rate by Variant** (Bar Chart)
   - Event: `clubs_landing_variant_clicked`
   - Group by: `variant_value`
   - Metric: CTR (clicks / views)

4. **Statistical Significance** (Table)
   - Compare variants using PostHog's statistical testing
   - Show p-value, confidence intervals

5. **Email Subject Line Performance** (Bar Chart)
   - Event: `email_variant_sent` and `email_opened`
   - Group by: `variant_value`
   - Metric: Open rate by variant

---

#### Dashboard 3: Email Performance

**Widgets**:

1. **Email Send Volume** (Line Chart)
   - Event: `email_variant_sent`
   - Time period: Last 30 days
   - Group by: Day and `email_type`

2. **Email Open Rate** (Number)
   - Events: `email_variant_sent` / `email_opened`
   - Time period: Last 30 days
   - Group by: `variant_value`

3. **Email Action Rate** (Number)
   - Funnel: "Email Engagement & Lead Conversion"
   - Metric: Open → View Lead conversion rate

4. **Lead Acceptance Rate** (Number)
   - Funnel: "Email Engagement & Lead Conversion"
   - Metric: Email Sent → Lead Accepted conversion rate

5. **Average Time to Action** (Number)
   - Funnel: "Email Engagement & Lead Conversion"
   - Metric: Average time from email send to lead view

---

### 3. Conversion Tracking Events

#### New Events to Track

**Event**: `clubs_landing_page_viewed`

- **When**: User visits `/pentru-cluburi` page
- **Properties**:
  - `page_url` - Full URL
  - `referrer` - Traffic source
  - `utm_source` - UTM source (if available)
  - `utm_medium` - UTM medium (if available)
  - `utm_campaign` - UTM campaign (if available)

**Event**: `clubs_contact_modal_opened`

- **When**: Contact modal is opened
- **Properties**:
  - `location` - Where modal was opened from (hero, solution, benefits, final_cta)
  - `cta_text` - Text of the CTA that triggered modal
  - `variant_value` - A/B test variant (if applicable)

**Event**: `clubs_contact_form_submitted`

- **When**: Contact form is successfully submitted
- **Properties**:
  - `location` - Where form was opened from
  - `form_type` - Type of form (founding_club, premium_inquiry, etc.)
  - `variant_value` - A/B test variant (if applicable)
  - `time_to_submit` - Time from page view to submission (seconds)

**Event**: `email_opened`

- **When**: Email is opened (via Brevo webhook or PostHog tracking pixel)
- **Properties**:
  - `email_type` - Type of email (lead_notification, reminder, etc.)
  - `variant_value` - Email subject variant
  - `time_to_open` - Time from send to open (minutes)

**Event**: `lead_viewed`

- **When**: Club views lead in dashboard
- **Properties**:
  - `lead_id` - Lead ID
  - `email_variant` - Email variant that led to this view
  - `time_from_email` - Time from email send to view (minutes)

---

### 4. Implementation Steps

#### Step 1: Add Missing Events to Components

1. **Clubs Landing Page** (`src/app/(public)/pentru-cluburi/page.tsx`):
   - Add `clubs_landing_page_viewed` event on page load
   - Track UTM parameters and referrer

2. **Contact Modal** (`src/lib/clubs-landing-modal.tsx` or similar):
   - Add `clubs_contact_modal_opened` event when modal opens
   - Track location and CTA text

3. **Contact Form** (form submission handler):
   - Add `clubs_contact_form_submitted` event on successful submission
   - Track form type and time to submit

#### Step 2: Create PostHog Funnels

1. Navigate to PostHog → Insights → New Funnel
2. Create each funnel as described above
3. Save funnels for dashboard use

#### Step 3: Create PostHog Dashboards

1. Navigate to PostHog → Dashboards → New Dashboard
2. Create each dashboard as described above
3. Add widgets for each metric
4. Set up refresh schedule (daily/weekly)

#### Step 4: Set Up Email Open Tracking

**Option A: Brevo Webhook** (Recommended)

1. Set up Brevo webhook for email opens
2. Create API endpoint to receive webhook
3. Track `email_opened` event in PostHog

**Option B: PostHog Email Tracking Pixel**

1. Add PostHog tracking pixel to email templates
2. PostHog automatically tracks opens
3. Less reliable but easier to implement

#### Step 5: Set Up Alerts

1. Create alerts for:
   - Conversion rate drops >10%
   - Email open rate drops >15%
   - Form submission errors
   - A/B test statistical significance reached

---

## Code Implementation

### Example 1: Track Page View

```typescript
// src/app/(public)/pentru-cluburi/page.tsx
"use client";

import { useEffect } from "react";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";
import { useSearchParams } from "next/navigation";

export default function PentruCluburiPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view
    trackEvent(PostHogEvents.CLUBS_LANDING_PAGE_VIEWED, {
      page_url: window.location.href,
      referrer: document.referrer || "direct",
      utm_source: searchParams.get("utm_source") || null,
      utm_medium: searchParams.get("utm_medium") || null,
      utm_campaign: searchParams.get("utm_campaign") || null,
    });
  }, [searchParams]);

  // ... rest of component
}
```

### Example 2: Track Modal Open

```typescript
// src/lib/clubs-landing-modal.tsx
export function openClubsContactModal(location: string, ctaText: string) {
  // Track modal open
  trackEvent(PostHogEvents.CLUBS_CONTACT_MODAL_OPENED, {
    location,
    cta_text: ctaText,
    // variant_value will be tracked automatically if modal opened from variant CTA
  });

  // Open modal
  // ... modal opening logic
}
```

### Example 3: Track Form Submission

```typescript
// Form submission handler
async function handleFormSubmit(formData: FormData) {
  const startTime = performance.now();

  try {
    const result = await submitForm(formData);

    const timeToSubmit = Math.round((performance.now() - startTime) / 1000);

    // Track successful submission
    trackEvent(PostHogEvents.CLUBS_CONTACT_FORM_SUBMITTED, {
      location: getFormLocation(), // From modal or context
      form_type: "founding_club",
      time_to_submit: timeToSubmit,
      // variant_value will be tracked automatically if form opened from variant CTA
    });

    return result;
  } catch (error) {
    // Track error (separate event)
    trackEvent(PostHogEvents.CLUBS_CONTACT_FORM_ERROR, {
      location: getFormLocation(),
      error_message: error.message,
    });
    throw error;
  }
}
```

---

## Success Criteria

- ✅ All conversion funnels created and tracking correctly
- ✅ Dashboards set up with key metrics
- ✅ Email open tracking implemented
- ✅ Alerts configured for key metrics
- ✅ Baseline metrics established (for comparison after optimizations)

---

## Expected Outcomes

After Phase 6 implementation:

1. **Visibility**: Clear view of conversion rates and user behavior
2. **A/B Test Results**: Ability to compare variants and identify winners
3. **Optimization Insights**: Data-driven decisions on what to improve next
4. **Monitoring**: Alerts for performance issues or opportunities

---

## Next Steps After Phase 6

1. **Baseline Measurement**: Collect 2-3 weeks of baseline data
2. **A/B Test Analysis**: Analyze Phase 4-5 A/B test results
3. **Optimization**: Implement winning variants and new optimizations
4. **Iteration**: Continuous improvement based on data

---

**Document Version**: 1.0  
**Last Updated**: January 26, 2026
