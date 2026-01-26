# Phase 4: A/B Testing Implementation Plan

**Status**: ⏳ **READY FOR IMPLEMENTATION**  
**Created**: January 26, 2026  
**Objective**: Implement A/B testing framework and variations for conversion optimization

---

## Overview

Phase 4 focuses on implementing A/B testing infrastructure using PostHog feature flags to test copy variations and optimize conversion rates. This phase builds on the improvements made in Phases 1-3.

**Expected Impact**: +5-15% additional conversion rate improvement through data-driven optimization

---

## A/B Testing Infrastructure

### PostHog Feature Flags Setup

**Location**: `src/lib/analytics/feature-flags.ts` ✅ **CREATED**

**Features**:

- Feature flag names enum (`FeatureFlags`)
- Variant values enum (`FeatureFlagVariants`)
- Utility functions: `getFeatureFlag()`, `useFeatureFlag()`, `isFeatureFlagEnabled()`, `getFeatureFlagVariant()`
- React hook for client-side feature flag access

**PostHog Configuration Required**:

1. Create feature flags in PostHog dashboard:
   - `clubs_landing_hero_headline_variant` (multivariate: current, variant_a, variant_b)
   - `clubs_landing_hero_cta_variant` (multivariate: current, variant_a, variant_b)
   - `clubs_landing_final_cta_variant` (multivariate: current, variant_a, variant_b)
   - `lead_notification_email_subject_variant` (multivariate: current, variant_a, variant_b)

2. Set up 50/50 split tests for each flag
3. Configure targeting (all users visiting `/pentru-cluburi`)

---

## Test Variations

### Test 1: Hero Headline Variations

**Feature Flag**: `clubs_landing_hero_headline_variant`

**Variants**:

- **Current** (`current`): "Crești numărul de copii înscriși, fără lead-uri inutile"
- **Variant A** (`variant_a`): "Părinți pre-calificați. Zero timp pierdut. Mai multe înscrieri."
- **Variant B** (`variant_b`): "Stop la mesaje inutile. Start cu lead-uri calificate."

**Implementation**:

- File: `src/components/features/clubs/ClubsLandingHero.tsx`
- Use `useFeatureFlag(FeatureFlags.CLUBS_LANDING_HERO_HEADLINE_VARIANT)` hook
- Render headline based on variant value
- Track which variant was shown in PostHog event

**Success Metrics**:

- Click-through rate (CTR) on hero CTA
- Time on page
- Scroll depth
- Conversion rate (form submission)

**Success Threshold**: +5% improvement in CTR or conversion rate

**Test Duration**: 2-3 weeks (minimum 1,000 visitors per variant)

---

### Test 2: Hero CTA Button Text Variations

**Feature Flag**: `clubs_landing_hero_cta_variant`

**Variants**:

- **Current** (`current`): "Rezervă locul tău gratuit ({remainingSpots} locuri rămase)"
- **Variant A** (`variant_a`): "Rezervă locul tău gratuit"
- **Variant B** (`variant_b`): "Începe acum - 6 luni gratuite"

**Implementation**:

- File: `src/components/features/clubs/ClubsLandingHero.tsx`
- Use `useFeatureFlag(FeatureFlags.CLUBS_LANDING_HERO_CTA_VARIANT)` hook
- Render CTA button text based on variant
- Track CTA clicks with variant property

**Success Metrics**:

- CTA click rate
- Form submission rate
- Conversion rate

**Success Threshold**: +5% improvement in CTA click rate or conversion rate

**Test Duration**: 2-3 weeks (minimum 1,000 visitors per variant)

---

### Test 3: Final CTA Button Text Variations

**Feature Flag**: `clubs_landing_final_cta_variant`

**Variants**:

- **Current** (`current`): "Nu rata șansa - Rezervă acum (doar {remainingSpots} locuri rămase)"
- **Variant A** (`variant_a`): "Rezervă acum - 6 luni gratuite"
- **Variant B** (`variant_b`): "Devino Founding Club acum"

**Implementation**:

- File: `src/components/features/clubs/ClubsLandingFinalCTA.tsx`
- Use `useFeatureFlag(FeatureFlags.CLUBS_LANDING_FINAL_CTA_VARIANT)` hook
- Render CTA button text based on variant
- Track CTA clicks with variant property

**Success Metrics**:

- CTA click rate
- Form submission rate
- Conversion rate

**Success Threshold**: +5% improvement in CTA click rate or conversion rate

**Test Duration**: 2-3 weeks (minimum 500 visitors per variant)

---

### Test 4: Email Subject Line Variations

**Feature Flag**: `lead_notification_email_subject_variant`

**Variants**:

- **Current** (`current`): "🎯 Părinte pre-calificat caută {sportName} în {locationName}"
- **Variant A** (`variant_a`): "Nou: Cerere {sportName} pentru copil de {age} ani"
- **Variant B** (`variant_b`): "Cerere pre-calificată - {sportName} în {locationName}"

**Implementation**:

- File: `emails/lead-notification-email.tsx`
- Use PostHog server-side feature flag check (via `getPostHogServer()`)
- Generate subject line based on variant
- Track email open rate and action rate by variant

**Success Metrics**:

- Email open rate
- Email action rate (click-through to view lead)
- Lead acceptance rate

**Success Threshold**: +10% improvement in open rate or +5% in action rate

**Test Duration**: 2-3 weeks (minimum 200 emails per variant)

---

## Implementation Steps

### Step 1: Update Components with Feature Flags

1. **ClubsLandingHero.tsx**:
   - Import `useFeatureFlag` and `FeatureFlags`
   - Add headline variant logic
   - Add CTA variant logic
   - Track variant shown in PostHog event

2. **ClubsLandingFinalCTA.tsx**:
   - Import `useFeatureFlag` and `FeatureFlags`
   - Add CTA variant logic
   - Track variant shown in PostHog event

3. **lead-notification-email.tsx**:
   - Import server-side PostHog client
   - Add subject line variant logic
   - Track email variant in PostHog (via server-side event)

### Step 2: Add PostHog Event Tracking

**New Events to Track**:

- `clubs_landing_variant_shown` - When a variant is displayed
- `clubs_landing_variant_clicked` - When user clicks a variant CTA
- `email_variant_sent` - When email with variant subject is sent
- `email_variant_opened` - When email with variant subject is opened

**Properties to Track**:

- `variant_name` - Name of the feature flag
- `variant_value` - Value of the variant (current, variant_a, variant_b)
- `location` - Where variant was shown (hero, final_cta, email)
- `cta_text` - Text of the CTA button

### Step 3: PostHog Dashboard Configuration

1. **Create Feature Flags**:
   - Navigate to PostHog → Feature Flags
   - Create each flag with multivariate options
   - Set 50/50 split (or 33/33/33 for 3 variants)
   - Target: All users visiting `/pentru-cluburi`

2. **Create Funnels**:
   - Hero CTA Click → Form View → Form Submission
   - Final CTA Click → Form View → Form Submission
   - Email Sent → Email Opened → Lead Viewed → Lead Accepted

3. **Create Dashboards**:
   - A/B Test Results Dashboard
   - Conversion Funnel Dashboard
   - Email Performance Dashboard

### Step 4: Monitoring & Analysis

**Daily Monitoring**:

- Check feature flag distribution (should be ~50/50)
- Monitor conversion rates by variant
- Check for statistical significance

**Weekly Analysis**:

- Calculate conversion rate improvement
- Check statistical significance (p-value < 0.05)
- Identify winning variants

**After 2-3 Weeks**:

- Declare winning variant if statistically significant
- Implement winning variant as default
- Document results and learnings

---

## Code Examples

### Example 1: Hero Headline with Feature Flag

```typescript
"use client";

import { useFeatureFlag, FeatureFlags, FeatureFlagVariants } from "@/lib/analytics/feature-flags";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";

export default function ClubsLandingHero({ remainingSpots }: Props) {
  const { value: headlineVariant } = useFeatureFlag(
    FeatureFlags.CLUBS_LANDING_HERO_HEADLINE_VARIANT
  );

  // Determine headline text based on variant
  const getHeadlineText = () => {
    switch (headlineVariant) {
      case FeatureFlagVariants.HERO_HEADLINE_VARIANT_A:
        return "Părinți pre-calificați. Zero timp pierdut. Mai multe înscrieri.";
      case FeatureFlagVariants.HERO_HEADLINE_VARIANT_B:
        return "Stop la mesaje inutile. Start cu lead-uri calificate.";
      default:
        return "Crești numărul de copii înscriși, fără lead-uri inutile";
    }
  };

  // Track variant shown
  useEffect(() => {
    if (headlineVariant) {
      trackEvent(PostHogEvents.CLUBS_LANDING_VARIANT_SHOWN, {
        variant_name: FeatureFlags.CLUBS_LANDING_HERO_HEADLINE_VARIANT,
        variant_value: headlineVariant,
        location: "hero",
      });
    }
  }, [headlineVariant]);

  return (
    <h1>{getHeadlineText()}</h1>
    // ... rest of component
  );
}
```

### Example 2: CTA Button with Feature Flag

```typescript
const { value: ctaVariant } = useFeatureFlag(
  FeatureFlags.CLUBS_LANDING_HERO_CTA_VARIANT
);

const getCTAText = () => {
  switch (ctaVariant) {
    case FeatureFlagVariants.CTA_VARIANT_A:
      return "Rezervă locul tău gratuit";
    case FeatureFlagVariants.CTA_VARIANT_B:
      return "Începe acum - 6 luni gratuite";
    default:
      return `Rezervă locul tău gratuit (${remainingSpots} locuri rămase)`;
  }
};

const handleCTAClick = (e: React.MouseEvent) => {
  e.preventDefault();

  // Track variant clicked
  trackEvent(PostHogEvents.CLUBS_LANDING_VARIANT_CLICKED, {
    variant_name: FeatureFlags.CLUBS_LANDING_HERO_CTA_VARIANT,
    variant_value: ctaVariant,
    location: "hero",
    cta_text: getCTAText(),
  });

  openClubsContactModal("hero", getCTAText());
};

return (
  <button onClick={handleCTAClick}>
    {getCTAText()}
  </button>
);
```

### Example 3: Email Subject Line with Server-Side Feature Flag

```typescript
import { getPostHogServer } from "@/lib/analytics/posthog-server";
import { FeatureFlags, FeatureFlagVariants } from "@/lib/analytics/feature-flags";

export async function generateEmailSubject(
  sportName: string,
  locationName: string,
  childAge: number
): Promise<string> {
  const posthog = getPostHogServer();

  // Get variant for email (use a default user ID or session-based)
  // Note: For emails, we might need to use a different approach
  // since there's no user session. Consider using club-specific targeting.

  const variant = posthog?.getFeatureFlag(
    FeatureFlags.LEAD_NOTIFICATION_EMAIL_SUBJECT_VARIANT,
    "default_user_id" // Use club ID or a default identifier
  );

  switch (variant) {
    case FeatureFlagVariants.EMAIL_SUBJECT_VARIANT_A:
      return `Nou: Cerere ${sportName} pentru copil de ${childAge} ani`;
    case FeatureFlagVariants.EMAIL_SUBJECT_VARIANT_B:
      return `Cerere pre-calificată - ${sportName} în ${locationName}`;
    default:
      return `🎯 Părinte pre-calificat caută ${sportName} în ${locationName}`;
  }
}
```

---

## Testing Checklist

### Pre-Launch

- [ ] Feature flags created in PostHog dashboard
- [ ] Feature flags configured with correct variants
- [ ] 50/50 split configured correctly
- [ ] Components updated with feature flag logic
- [ ] PostHog events added for variant tracking
- [ ] Test all variants locally (using PostHog override)
- [ ] Verify events are tracked correctly

### Post-Launch

- [ ] Monitor feature flag distribution (should be ~50/50)
- [ ] Check PostHog events are being tracked
- [ ] Verify conversion tracking is working
- [ ] Monitor for any errors or issues
- [ ] Check statistical significance daily

### Analysis

- [ ] Calculate conversion rates by variant
- [ ] Check statistical significance (p-value)
- [ ] Identify winning variant
- [ ] Document results and learnings
- [ ] Implement winning variant as default

---

## Success Criteria

**Test is successful if**:

1. Statistical significance: p-value < 0.05
2. Minimum sample size reached (1,000+ visitors per variant)
3. Clear winner identified (>5% improvement)
4. No negative impact on other metrics

**Test should be stopped if**:

1. Negative impact on conversion rate (>5% decrease)
2. Technical issues preventing accurate tracking
3. External factors affecting results (e.g., marketing campaign)

---

## Next Steps After Phase 4

1. **Implement Winning Variants**: Set winning variants as default
2. **Iterate**: Test new variations based on learnings
3. **Expand Testing**: Test other elements (pricing section, benefits, etc.)
4. **Document Learnings**: Update copywriting guidelines based on results
5. **Continuous Optimization**: Set up ongoing A/B testing program

---

## Resources

- **PostHog Feature Flags Docs**: https://posthog.com/docs/feature-flags
- **PostHog A/B Testing Guide**: https://posthog.com/docs/feature-flags/ab-testing
- **Statistical Significance Calculator**: https://www.optimizely.com/sample-size-calculator/

---

**Document Version**: 1.0  
**Last Updated**: January 26, 2026
