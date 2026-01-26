# Phase 5: Email Subject Line A/B Testing Implementation

**Status**: ✅ **COMPLETE**  
**Date**: January 26, 2026  
**Objective**: Implement server-side A/B testing for email subject lines

---

## Overview

Phase 5 completes the A/B testing infrastructure by adding server-side feature flag support for email subject lines. This allows testing different email subject line variations to optimize open rates and engagement.

---

## What Was Completed

### 1. Server-Side Feature Flags Infrastructure ✅

**File**: `src/lib/analytics/feature-flags-server.ts`

- Created server-side feature flags utility module
- Implemented `getFeatureFlagServer()` - Get flag value server-side
- Implemented `getFeatureFlagVariantServer()` - Get variant string server-side
- Implemented `generateEmailSubjectWithVariant()` - Generate email subject with A/B testing support
- Supports placeholder replacement (`{sportName}`, `{locationName}`, `{age}`, `{childAge}`)

### 2. Email Service Updated ✅

**File**: `src/modules/emails/lead-emails.service.ts`

- Updated `sendLeadNotificationEmail()` function
- Integrated server-side feature flag for subject line generation
- Added variant tracking via `EMAIL_VARIANT_SENT` event
- Uses club email as `distinctId` for consistent variant assignment
- Maintains backward compatibility (defaults to current subject if flag not set)

### 3. PostHog Events Already Configured ✅

- `EMAIL_VARIANT_SENT` event already exists (from Phase 4)
- `EMAIL_VARIANT_OPENED` event already exists (for future email open tracking)
- Properties already defined: `VARIANT_NAME`, `VARIANT_VALUE`, `VARIANT_LOCATION`

---

## Implementation Details

### Email Subject Line Variants

**Feature Flag**: `lead_notification_email_subject_variant`

**Variants**:

- **Current** (`current`): "🎯 Părinte pre-calificat caută {sportName} în {locationName}"
- **Variant A** (`variant_a`): "Nou: Cerere {sportName} pentru copil de {age} ani"
- **Variant B** (`variant_b`): "Cerere pre-calificată - {sportName} în {locationName}"

### How It Works

1. **When email is sent**:
   - `sendLeadNotificationEmail()` is called with lead details
   - Server-side PostHog client checks feature flag for club email (used as `distinctId`)
   - Subject line is generated based on variant assigned to that club
   - Email is sent with variant subject line
   - `EMAIL_VARIANT_SENT` event is tracked with variant information

2. **Variant Assignment**:
   - Uses club email as `distinctId` for consistent assignment
   - Same club always gets same variant (unless flag changes)
   - PostHog handles 33/33/33 distribution automatically

3. **Tracking**:
   - Each email send tracks which variant was used
   - Properties include: variant name, variant value, location, email type, sport, location, child age
   - Can analyze open rates and action rates by variant in PostHog

---

## PostHog Configuration Required

### Feature Flag Setup

1. Navigate to **PostHog → Feature Flags**
2. Create flag: `lead_notification_email_subject_variant`
   - Type: Multivariate
   - Variants: `current`, `variant_a`, `variant_b`
   - Distribution: 33% / 33% / 33%
   - Targeting: All clubs (for email sending)
   - Description: "A/B test for lead notification email subject lines"

### Metrics to Track

1. **Email Open Rate**:
   - Filter by `email_variant_sent` event
   - Group by `variant_value`
   - Compare open rates between variants

2. **Email Action Rate**:
   - Track clicks on "Vezi cererea" button
   - Compare click-through rates by variant

3. **Lead Acceptance Rate**:
   - Track lead acceptance after email open
   - Compare acceptance rates by variant

---

## Testing

### Local Testing

1. **Test variant generation**:

   ```typescript
   import { generateEmailSubjectWithVariant } from "@/lib/analytics/feature-flags-server";
   import { FeatureFlags } from "@/lib/analytics/feature-flags";

   const subject = await generateEmailSubjectWithVariant({
     flagName: FeatureFlags.LEAD_NOTIFICATION_EMAIL_SUBJECT_VARIANT,
     distinctId: "test@club.com",
     sportName: "Fotbal",
     locationName: "București",
     childAge: 8,
     variants: {
       current: "🎯 Părinte pre-calificat caută {sportName} în {locationName}",
       variant_a: "Nou: Cerere {sportName} pentru copil de {age} ani",
       variant_b: "Cerere pre-calificată - {sportName} în {locationName}",
     },
   });
   ```

2. **Test with PostHog override** (if available):
   - Use PostHog dashboard to override flag for specific club email
   - Send test email and verify correct variant is used

### Production Testing

1. **Monitor email sends**:
   - Check PostHog → Activity for `email_variant_sent` events
   - Verify variants are distributed ~33% each

2. **Monitor open rates**:
   - Use Brevo analytics or PostHog email tracking
   - Compare open rates by variant

3. **Monitor action rates**:
   - Track clicks on "Vezi cererea" button
   - Compare click-through rates by variant

---

## Success Criteria

**Test is successful if**:

1. Statistical significance: p-value < 0.05
2. Minimum sample size reached (200+ emails per variant)
3. Clear winner identified (>10% improvement in open rate or >5% in action rate)
4. No negative impact on other metrics

**Test should be stopped if**:

1. Negative impact on open rate (>10% decrease)
2. Negative impact on action rate (>5% decrease)
3. Technical issues preventing accurate tracking

---

## Future Enhancements

### Email Open Tracking

To track email opens by variant, integrate PostHog email tracking:

1. Add tracking pixel to email template
2. Track `EMAIL_VARIANT_OPENED` event when pixel loads
3. Include variant information in event properties
4. Analyze open rates by variant in PostHog

### Additional Email Types

Can extend A/B testing to:

- Lead reminder emails
- Lead expired emails
- Lead accepted emails
- Guest payment success emails

---

## Files Modified

### New Files

- `src/lib/analytics/feature-flags-server.ts` - Server-side feature flags utilities

### Modified Files

- `src/modules/emails/lead-emails.service.ts` - Added A/B testing for subject lines

---

## Expected Impact

- **Email Open Rate**: +10-20% improvement with optimal variant
- **Email Action Rate**: +5-10% improvement with optimal variant
- **Overall Lead Conversion**: +3-5% improvement from better email engagement

---

## Next Steps

1. **Configure PostHog Feature Flag**: Set up `lead_notification_email_subject_variant` flag
2. **Monitor Results**: Track email sends and open rates for 2-3 weeks
3. **Analyze Data**: Compare open rates and action rates by variant
4. **Implement Winner**: Set winning variant as default
5. **Iterate**: Test new variations based on learnings

---

**Document Version**: 1.0  
**Last Updated**: January 26, 2026
