# Phase 8: PostHog Configuration & Launch Guide

**Status**: ⏳ **READY FOR IMPLEMENTATION**  
**Date**: January 26, 2026  
**Objective**: Complete step-by-step guide to configure PostHog and launch all optimization features

---

## Overview

Phase 8 provides a comprehensive, actionable guide to configure PostHog feature flags, funnels, and dashboards, then launch all the optimization features built in Phases 1-7.

**This is the execution phase** - everything is built, now it's time to configure and launch.

---

## Prerequisites

### PostHog Account Setup

- [ ] PostHog account created
- [ ] Project created in PostHog
- [ ] API keys configured:
  - [ ] `NEXT_PUBLIC_POSTHOG_KEY` set in `.env.local`
  - [ ] `NEXT_PUBLIC_POSTHOG_HOST` set (default: `https://eu.i.posthog.com`)
- [ ] PostHog initialized in app (check `src/lib/analytics/posthog.tsx`)

### Code Verification

- [ ] All Phase 1-7 code deployed to production/staging
- [ ] Feature flags infrastructure working (`src/lib/analytics/feature-flags.ts`)
- [ ] Server-side feature flags working (`src/lib/analytics/feature-flags-server.ts`)
- [ ] All tracking events implemented
- [ ] Testimonials component ready (Phase 7)

---

## Step-by-Step Configuration

### Step 1: Create Feature Flags (30 minutes)

#### 1.1 Hero Headline Variant

1. Navigate to **PostHog → Feature Flags → New Feature Flag**
2. **Name**: `clubs_landing_hero_headline_variant`
3. **Type**: Multivariate
4. **Variants**:
   - `current` (33%)
   - `variant_a` (33%)
   - `variant_b` (33%)
5. **Targeting**: All users
   - Or: URL contains `/pentru-cluburi`
6. **Description**: "A/B test for hero headline on clubs landing page"
7. **Save** and **Enable**

#### 1.2 Hero CTA Variant

1. **Name**: `clubs_landing_hero_cta_variant`
2. **Type**: Multivariate
3. **Variants**: `current`, `variant_a`, `variant_b` (33% each)
4. **Targeting**: All users (or URL contains `/pentru-cluburi`)
5. **Description**: "A/B test for hero CTA button text"
6. **Save** and **Enable**

#### 1.3 Final CTA Variant

1. **Name**: `clubs_landing_final_cta_variant`
2. **Type**: Multivariate
3. **Variants**: `current`, `variant_a`, `variant_b` (33% each)
4. **Targeting**: All users (or URL contains `/pentru-cluburi`)
5. **Description**: "A/B test for final CTA button text"
6. **Save** and **Enable**

#### 1.4 Email Subject Line Variant

1. **Name**: `lead_notification_email_subject_variant`
2. **Type**: Multivariate
3. **Variants**: `current`, `variant_a`, `variant_b` (33% each)
4. **Targeting**: All users (for server-side email sending)
5. **Description**: "A/B test for lead notification email subject lines"
6. **Save** and **Enable**

**Verification**: Test each flag locally using PostHog override (see Phase 4 setup guide)

---

### Step 2: Create Conversion Funnels (45 minutes)

#### 2.1 Clubs Landing Page Conversion Funnel

1. Navigate to **PostHog → Insights → New Funnel**
2. **Name**: "Clubs Landing Page Conversion"
3. **Steps**:
   - Step 1: `clubs_landing_page_viewed`
   - Step 2: `clubs_landing_variant_shown` (where `variant_location` = "hero")
   - Step 3: `clubs_landing_cta_clicked` (where `location` = "hero")
   - Step 4: `clubs_contact_modal_opened`
   - Step 5: `clubs_contact_form_submitted`
4. **Time Window**: 1 hour (users must complete within 1 hour)
5. **Save**

**Test**: Visit `/pentru-cluburi` and complete the flow, verify events appear in funnel

#### 2.2 Email Engagement Funnel

1. **Name**: "Email Engagement & Lead Conversion"
2. **Steps**:
   - Step 1: `email_variant_sent` (where `email_type` = "lead_notification")
   - Step 2: `email_opened` (via Brevo webhook or PostHog tracking)
   - Step 3: `lead_viewed` (when club views lead in dashboard)
   - Step 4: `lead_accepted`
3. **Time Window**: 7 days
4. **Save**

**Note**: Email open tracking requires Brevo webhook setup (see Step 4)

#### 2.3 A/B Test Comparison Funnel

1. **Name**: "A/B Test Conversion Comparison"
2. **Steps**:
   - Step 1: `clubs_landing_variant_shown`
   - Step 2: `clubs_landing_variant_clicked`
   - Step 3: `clubs_contact_form_submitted`
3. **Group By**: `variant_name` and `variant_value`
4. **Time Window**: 1 hour
5. **Save**

---

### Step 3: Create Dashboards (60 minutes)

#### 3.1 Clubs Landing Page Performance Dashboard

1. Navigate to **PostHog → Dashboards → New Dashboard**
2. **Name**: "Clubs Landing Page Performance"
3. **Add Widgets**:

   **Widget 1: Overall Conversion Rate**
   - Type: Number
   - Formula: `clubs_contact_form_submitted / clubs_landing_page_viewed`
   - Time Period: Last 30 days
   - Comparison: Previous period

   **Widget 2: Conversion Funnel**
   - Type: Funnel
   - Funnel: "Clubs Landing Page Conversion"
   - Group By: None (overall) and by `variant_value`

   **Widget 3: CTA Click Rate by Location**
   - Type: Bar Chart
   - Event: `clubs_landing_cta_clicked`
   - Group By: `location` (hero, solution, benefits, final_cta)
   - Metric: Click rate (clicks / page views)

   **Widget 4: Page Views Over Time**
   - Type: Line Chart
   - Event: `clubs_landing_page_viewed`
   - Time Period: Last 30 days
   - Group By: Day

   **Widget 5: Form Submission Rate**
   - Type: Number
   - Event: `clubs_contact_form_submitted`
   - Time Period: Last 30 days
   - Comparison: Previous period

   **Widget 6: Average Time to Conversion**
   - Type: Number
   - Funnel: "Clubs Landing Page Conversion"
   - Metric: Average time from step 1 to step 5

4. **Save Dashboard**

#### 3.2 A/B Testing Results Dashboard

1. **Name**: "A/B Testing Results"
2. **Add Widgets**:

   **Widget 1: Variant Distribution**
   - Type: Pie Chart
   - Event: `clubs_landing_variant_shown`
   - Group By: `variant_value`
   - Should show ~33% each

   **Widget 2: Conversion Rate by Variant**
   - Type: Bar Chart
   - Funnel: "A/B Test Conversion Comparison"
   - Group By: `variant_value`
   - Compare conversion rates

   **Widget 3: Click-Through Rate by Variant**
   - Type: Bar Chart
   - Event: `clubs_landing_variant_clicked`
   - Group By: `variant_value`
   - Metric: CTR (clicks / views)

   **Widget 4: Email Subject Line Performance**
   - Type: Bar Chart
   - Events: `email_variant_sent` and `email_opened`
   - Group By: `variant_value`
   - Metric: Open rate by variant

3. **Save Dashboard**

#### 3.3 Email Performance Dashboard

1. **Name**: "Email Performance"
2. **Add Widgets**:

   **Widget 1: Email Send Volume**
   - Type: Line Chart
   - Event: `email_variant_sent`
   - Time Period: Last 30 days
   - Group By: Day and `email_type`

   **Widget 2: Email Open Rate**
   - Type: Number
   - Formula: `email_opened / email_variant_sent`
   - Time Period: Last 30 days
   - Group By: `variant_value`

   **Widget 3: Email Action Rate**
   - Type: Number
   - Funnel: "Email Engagement & Lead Conversion"
   - Metric: Open → View Lead conversion rate

   **Widget 4: Lead Acceptance Rate**
   - Type: Number
   - Funnel: "Email Engagement & Lead Conversion"
   - Metric: Email Sent → Lead Accepted conversion rate

3. **Save Dashboard**

---

### Step 4: Set Up Email Open Tracking (30 minutes)

#### Option A: Brevo Webhook (Recommended)

1. **Create Webhook Endpoint**:
   - Create API route: `/api/webhooks/brevo-email-opened`
   - Handle Brevo webhook for email opens
   - Track `email_opened` event in PostHog

2. **Configure Brevo Webhook**:
   - Go to Brevo → Settings → Webhooks
   - Add webhook URL: `https://yourdomain.com/api/webhooks/brevo-email-opened`
   - Select events: "Email opened"
   - Save webhook

3. **Test**: Send test email and verify webhook fires

#### Option B: PostHog Email Tracking Pixel

1. **Add Tracking Pixel to Email Templates**:
   - Add PostHog tracking pixel to email HTML
   - PostHog automatically tracks opens
   - Less reliable but easier to implement

**Recommendation**: Use Option A (Brevo webhook) for more reliable tracking

---

### Step 5: Set Up Alerts (15 minutes)

1. Navigate to **PostHog → Alerts → New Alert**

2. **Alert 1: Conversion Rate Drop**
   - **Name**: "Clubs Landing Conversion Rate Drop"
   - **Metric**: Conversion rate (form submissions / page views)
   - **Condition**: Drops by >10% compared to previous period
   - **Frequency**: Daily
   - **Channels**: Email, Slack (if configured)

3. **Alert 2: Email Open Rate Drop**
   - **Name**: "Email Open Rate Drop"
   - **Metric**: Email open rate
   - **Condition**: Drops by >15% compared to previous period
   - **Frequency**: Daily

4. **Alert 3: Form Submission Errors**
   - **Name**: "Form Submission Errors"
   - **Event**: `clubs_contact_form_error`
   - **Condition**: More than 5 errors in 1 hour
   - **Frequency**: Real-time

5. **Alert 4: A/B Test Significance**
   - **Name**: "A/B Test Statistical Significance"
   - **Metric**: A/B test conversion rate difference
   - **Condition**: p-value < 0.05 (statistically significant)
   - **Frequency**: Weekly

---

### Step 6: Test Everything (30 minutes)

#### 6.1 Test Feature Flags Locally

1. Open browser console on `/pentru-cluburi` page
2. Test variant A:
   ```javascript
   posthog.featureFlags.override({
     clubs_landing_hero_headline_variant: "variant_a",
     clubs_landing_hero_cta_variant: "variant_a",
   });
   ```
3. Refresh page and verify variant A displays
4. Test variant B:
   ```javascript
   posthog.featureFlags.override({
     clubs_landing_hero_headline_variant: "variant_b",
     clubs_landing_hero_cta_variant: "variant_b",
   });
   ```
5. Clear overrides:
   ```javascript
   posthog.featureFlags.clearOverrides();
   ```

#### 6.2 Test Event Tracking

1. Visit `/pentru-cluburi` page
2. Check PostHog → Activity for `clubs_landing_page_viewed` event
3. Click hero CTA
4. Check for `clubs_landing_cta_clicked` and `clubs_contact_modal_opened` events
5. Submit form
6. Check for `clubs_contact_form_submitted` event

#### 6.3 Test Email Variants

1. Create a test lead
2. Check email sent with variant subject line
3. Verify `email_variant_sent` event tracked
4. Open email (if webhook configured)
5. Verify `email_opened` event tracked

---

### Step 7: Launch Checklist (15 minutes)

#### Pre-Launch

- [ ] All feature flags created and enabled
- [ ] All funnels created and tested
- [ ] All dashboards created
- [ ] Email open tracking configured
- [ ] Alerts configured
- [ ] Local testing completed
- [ ] Events tracking correctly

#### Launch

- [ ] Feature flags enabled in production
- [ ] Monitor feature flag distribution (should be ~33% each)
- [ ] Monitor events are being tracked
- [ ] Check dashboards for initial data
- [ ] Verify alerts are working

#### Post-Launch (First Week)

- [ ] Daily: Check feature flag distribution
- [ ] Daily: Monitor conversion rates
- [ ] Daily: Check for errors or issues
- [ ] Weekly: Review A/B test results
- [ ] Weekly: Check email performance

---

## Monitoring & Analysis

### Week 1: Baseline Collection

**Focus**: Collect baseline data, verify everything works

- Monitor feature flag distribution
- Check events are tracking correctly
- Verify funnels are capturing data
- Check dashboards for initial metrics
- Fix any issues that arise

### Week 2-3: A/B Test Analysis

**Focus**: Analyze A/B test results

- Check conversion rates by variant
- Calculate statistical significance (p-value)
- Compare click-through rates
- Analyze email open rates by variant
- Identify early winners (if statistically significant)

### Week 4: Results & Implementation

**Focus**: Implement winning variants

- Declare winning variants (if statistically significant)
- Set winning variants as default (100% distribution)
- Or continue testing if results are inconclusive
- Document learnings and insights

---

## Success Metrics

### Feature Flags

- **Distribution**: ~33% each variant (within 5% tolerance)
- **Coverage**: 100% of `/pentru-cluburi` visitors receive a variant
- **Consistency**: Same user gets same variant (unless flag changes)

### Conversion Funnels

- **Data Collection**: All steps capturing events correctly
- **Drop-off Analysis**: Identify where users drop off
- **Conversion Rate**: Baseline established for comparison

### Dashboards

- **Data Accuracy**: Metrics match expected values
- **Real-time Updates**: Dashboards update within 5 minutes
- **Visualization**: Charts display correctly

### A/B Tests

- **Sample Size**: Minimum 1,000 visitors per variant (hero), 500 (final CTA)
- **Statistical Significance**: p-value < 0.05 for winner declaration
- **Improvement Threshold**: >5% improvement to declare winner

---

## Troubleshooting

### Feature Flags Not Working

**Symptoms**: All users see same variant (default)

**Solutions**:

1. Check PostHog API key is set correctly
2. Verify feature flag is enabled in PostHog
3. Check feature flag name matches exactly
4. Verify targeting conditions
5. Check browser console for PostHog errors

### Events Not Tracking

**Symptoms**: Events don't appear in PostHog

**Solutions**:

1. Check PostHog is initialized (`posthog.__loaded`)
2. Verify event names match exactly
3. Check browser console for errors
4. Verify user has consented to analytics
5. Check PostHog → Activity for events

### Funnels Not Showing Data

**Symptoms**: Funnel shows 0% conversion

**Solutions**:

1. Verify all events are tracking
2. Check event property filters match exactly
3. Verify time window is appropriate
4. Check if events are happening in correct order
5. Test with known user journey

### Email Variants Not Working

**Symptoms**: All emails use same subject line

**Solutions**:

1. Check server-side PostHog client is initialized
2. Verify feature flag name matches exactly
3. Check `distinctId` is being used correctly
4. Verify feature flag is enabled
5. Check server logs for errors

---

## Next Steps After Launch

1. **Monitor Daily**: Check dashboards and alerts
2. **Collect Data**: Wait for sufficient sample size (2-3 weeks)
3. **Analyze Results**: Compare variants, check statistical significance
4. **Implement Winners**: Set winning variants as default
5. **Iterate**: Test new variations based on learnings
6. **Collect Testimonials**: Start Phase 7 testimonials collection
7. **Continuous Optimization**: Set up ongoing A/B testing program

---

## Resources

- **PostHog Feature Flags Docs**: https://posthog.com/docs/feature-flags
- **PostHog Funnels Docs**: https://posthog.com/docs/user-guides/funnels
- **PostHog Dashboards Docs**: https://posthog.com/docs/user-guides/dashboards
- **Statistical Significance Calculator**: https://www.optimizely.com/sample-size-calculator/
- **Phase 4 Setup Guide**: `prompts/clubs-landing-phase4-posthog-setup.md`

---

**Document Version**: 1.0  
**Last Updated**: January 26, 2026
