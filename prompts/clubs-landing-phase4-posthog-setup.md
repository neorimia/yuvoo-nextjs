# Phase 4: PostHog Feature Flags Setup Guide

**Quick Reference**: Step-by-step guide to configure PostHog feature flags for A/B testing

---

## Prerequisites

- PostHog account with access to project
- PostHog project configured in `.env.local`:
  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST` (optional, defaults to `https://eu.i.posthog.com`)

---

## Step 1: Create Feature Flags

Navigate to **PostHog Dashboard → Feature Flags → New Feature Flag**

### Flag 1: Hero Headline Variant

**Name**: `clubs_landing_hero_headline_variant`

**Type**: Multivariate

**Variants**:

- `current` (33%)
- `variant_a` (33%)
- `variant_b` (33%)

**Targeting**:

- Release conditions: All users
- Or target specific: URL contains `/pentru-cluburi`

**Description**: "A/B test for hero headline on clubs landing page"

---

### Flag 2: Hero CTA Variant

**Name**: `clubs_landing_hero_cta_variant`

**Type**: Multivariate

**Variants**:

- `current` (33%)
- `variant_a` (33%)
- `variant_b` (33%)

**Targeting**:

- Release conditions: All users
- Or target specific: URL contains `/pentru-cluburi`

**Description**: "A/B test for hero CTA button text on clubs landing page"

---

### Flag 3: Final CTA Variant

**Name**: `clubs_landing_final_cta_variant`

**Type**: Multivariate

**Variants**:

- `current` (33%)
- `variant_a` (33%)
- `variant_b` (33%)

**Targeting**:

- Release conditions: All users
- Or target specific: URL contains `/pentru-cluburi`

**Description**: "A/B test for final CTA button text on clubs landing page"

---

### Flag 4: Email Subject Line Variant (Future)

**Name**: `lead_notification_email_subject_variant`

**Type**: Multivariate

**Variants**:

- `current` (33%)
- `variant_a` (33%)
- `variant_b` (33%)

**Targeting**:

- Release conditions: All users
- Note: This will be used server-side for email generation

**Description**: "A/B test for lead notification email subject lines"

---

## Step 2: Enable Feature Flags

1. Go to each feature flag
2. Click **"Enable"** or toggle the flag to active
3. Verify distribution is set correctly (33% / 33% / 33%)

---

## Step 3: Test Locally (Optional)

### Using PostHog Override

1. Open browser console on `/pentru-cluburi` page
2. Run:
   ```javascript
   posthog.featureFlags.override({
     clubs_landing_hero_headline_variant: "variant_a",
     clubs_landing_hero_cta_variant: "variant_a",
     clubs_landing_final_cta_variant: "variant_a",
   });
   ```
3. Refresh page to see variant A
4. Change to `variant_b` or `current` to test other variants

### Clear Override

```javascript
posthog.featureFlags.clearOverrides();
```

---

## Step 4: Monitor Tests

### Check Feature Flag Distribution

1. Go to **PostHog → Feature Flags**
2. Click on each flag
3. View **"Insights"** tab
4. Verify distribution is ~33% each variant

### Check Events

1. Go to **PostHog → Activity**
2. Filter for events:
   - `clubs_landing_variant_shown`
   - `clubs_landing_variant_clicked`
   - `clubs_landing_cta_clicked`

### Create Funnel

1. Go to **PostHog → Insights → New Funnel**
2. Create funnel:
   - Step 1: `clubs_landing_variant_shown` (where `variant_location` = "hero")
   - Step 2: `clubs_landing_variant_clicked` (where `variant_location` = "hero")
   - Step 3: Form submission (if tracked)

3. Group by `variant_value` to compare conversion rates

---

## Step 5: Analyze Results

### After 2-3 Weeks

1. **Check Sample Size**:
   - Minimum 1,000 visitors per variant for hero headline/CTA
   - Minimum 500 visitors per variant for final CTA
   - Minimum 200 emails per variant for email subject

2. **Calculate Conversion Rates**:
   - Use PostHog funnel analysis
   - Compare conversion rates by variant
   - Check statistical significance (p-value < 0.05)

3. **Identify Winner**:
   - Variant with highest conversion rate
   - Statistically significant improvement (>5%)
   - No negative impact on other metrics

---

## Step 6: Implement Winner

### Option 1: Set as Default Variant

1. Go to feature flag in PostHog
2. Change variant distribution:
   - Set winning variant to 100%
   - Set other variants to 0%
3. Or disable feature flag and update code to use winning variant as default

### Option 2: Update Code Default

1. Update component to use winning variant as default
2. Remove feature flag check (or keep for future tests)
3. Deploy changes

---

## Troubleshooting

### Feature Flag Not Working

1. **Check PostHog is initialized**:

   ```javascript
   console.log(posthog.__loaded); // Should be true
   ```

2. **Check feature flag value**:

   ```javascript
   console.log(posthog.getFeatureFlag("clubs_landing_hero_headline_variant"));
   ```

3. **Check PostHog key**:
   - Verify `NEXT_PUBLIC_POSTHOG_KEY` is set in `.env.local`
   - Verify key matches PostHog dashboard

### Events Not Tracking

1. **Check PostHog initialization**:
   - Verify user has consented to analytics
   - Check PostHog provider is wrapping the app

2. **Check event names**:
   - Verify event names match `PostHogEvents` enum
   - Check PostHog → Activity for events

3. **Check browser console**:
   - Look for PostHog errors
   - Check network tab for PostHog requests

### Variant Distribution Not 33/33/33

1. **Check feature flag configuration**:
   - Verify variants are set to 33% each
   - Check targeting conditions

2. **Check sample size**:
   - Need sufficient traffic for distribution to normalize
   - Wait for more visitors

---

## Quick Reference

### Feature Flag Names

- `clubs_landing_hero_headline_variant`
- `clubs_landing_hero_cta_variant`
- `clubs_landing_final_cta_variant`
- `lead_notification_email_subject_variant`

### Variant Values

- `current` - Current/default copy
- `variant_a` - Alternative copy A
- `variant_b` - Alternative copy B

### Events to Monitor

- `clubs_landing_variant_shown` - When variant is displayed
- `clubs_landing_variant_clicked` - When variant CTA is clicked
- `clubs_landing_cta_clicked` - Standard CTA click event

### Success Thresholds

- **Minimum sample size**: 1,000 visitors per variant (hero), 500 (final CTA)
- **Statistical significance**: p-value < 0.05
- **Improvement threshold**: +5% conversion rate improvement

---

**Next Steps**: After configuring flags, monitor for 2-3 weeks, then analyze results.
