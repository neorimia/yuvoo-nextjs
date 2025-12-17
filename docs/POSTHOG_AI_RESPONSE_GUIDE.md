# PostHog AI Response Guide

**Last Updated**: January 2025

This guide helps you respond to PostHog AI when it says events don't exist, even though they're implemented in your codebase.

---

## Understanding PostHog AI's Response

PostHog AI checks your **actual PostHog project** for events that have been **fired**. If events haven't been triggered yet (no users have performed these actions), PostHog AI won't see them.

**This is normal** - the events are implemented in code but need to be triggered by user actions or the test script.

---

## Quick Solution: Fire All Events

**Run the test script to populate PostHog with all events**:

```bash
npm run test:posthog
```

This will:

- Fire all custom PostHog events
- Make them visible to PostHog AI
- Allow you to create funnels immediately

**After running**, PostHog AI will be able to see all events.

---

## Event Status Reference

### ✅ Events That ARE Implemented

All these events are implemented in your codebase:

| Event                         | Status         | Location                                         |
| ----------------------------- | -------------- | ------------------------------------------------ |
| `quiz_completed`              | ✅ Implemented | `src/app/actions/quiz.ts:197`                    |
| `club_booking_created`        | ✅ Implemented | `src/app/actions/bookings.ts:43`                 |
| `doctor_consultation_created` | ✅ Implemented | `src/app/actions/bookings.ts:44`                 |
| `club_viewed`                 | ✅ Implemented | `src/app/(public)/cluburi/[slug]/page.tsx`       |
| `doctor_viewed`               | ✅ Implemented | `src/app/(public)/doctori/[slug]/page.tsx`       |
| `quiz_started`                | ✅ Implemented | `src/components/features/quiz/QuizContainer.tsx` |

### Property Status

| Property                 | Status         | Notes                                                             |
| ------------------------ | -------------- | ----------------------------------------------------------------- |
| `role` (person property) | ✅ Implemented | Set as `role` (not `userRole`) in `PostHogUserIdentification.tsx` |

**Important**: The property is called `role`, not `userRole`. PostHog AI might look for `userRole`, but use `role` when creating funnels/cohorts.

---

## Response Template for PostHog AI

When PostHog AI says events don't exist, you can respond:

```
All events are actually implemented in my codebase. They just haven't been fired yet.
I'll run my test script to populate PostHog with all events, then you'll be able to see them.

Please create the funnel as a template - I'll fire the events right after.
```

Or if you've already run the test script:

```
I've just fired all events using my test script. Please check again - all events should now be visible:
- quiz_completed
- club_booking_created
- doctor_consultation_created
- club_viewed
- doctor_viewed

Also note: The person property is called "role" (not "userRole") with values: "parent", "club_admin", "doctor", "admin".
```

---

## Step-by-Step Workflow

### Option 1: Create Funnel Template First (Recommended)

1. **Tell PostHog AI**: "Please create the funnel as a template - all events are implemented, I just need to fire them."

2. **Run test script**:

   ```bash
   npm run test:posthog
   ```

3. **Wait a few seconds** for events to appear in PostHog

4. **Tell PostHog AI**: "I've fired all events. The funnel should now show data."

### Option 2: Fire Events First

1. **Run test script**:

   ```bash
   npm run test:posthog
   ```

2. **Wait 5-10 seconds** for events to propagate

3. **Ask PostHog AI again**: "Please check my events now - I've just fired them all."

4. **PostHog AI will see all events** and can create the funnel with real data

---

## Property Name Clarification

**When PostHog AI asks about `userRole`**:

- ✅ **Use**: `role` (person property)
- ❌ **Don't use**: `userRole` (doesn't exist)

**How it's set**:

```typescript
// In PostHogUserIdentification.tsx
identifyUser(userId, {
  $set: {
    role: "parent", // This is the property name
  },
});
```

**Values**:

- `"parent"`
- `"club_admin"`
- `"doctor"`
- `"admin"`

---

## Funnel Configuration Reference

Once events are fired, you can create this funnel:

### Quiz → Booking Conversion Funnel

**Step 1: Quiz Started**

- Event: `quiz_started`
- ✅ Exists

**Step 2: Quiz Completed**

- Event: `quiz_completed`
- ✅ Implemented (fire with test script)

**Step 3: Club/Doctor Viewed** (Optional)

- Event: `club_viewed` OR `doctor_viewed`
- ✅ Implemented (fire with test script)

**Step 4: Booking Created**

- Event: `club_booking_created` OR `doctor_consultation_created`
- ✅ Implemented (fire with test script)

**Breakdown**: By person property `role` (not `userRole`)

---

## Verification Checklist

After running the test script:

- [ ] Check PostHog Dashboard → Insights → Live Events
- [ ] Verify all events appear:
  - [ ] `quiz_completed`
  - [ ] `club_booking_created`
  - [ ] `doctor_consultation_created`
  - [ ] `club_viewed`
  - [ ] `doctor_viewed`
- [ ] Check person properties:
  - [ ] `role` property exists (not `userRole`)
- [ ] Ask PostHog AI to check events again
- [ ] Create funnels with PostHog AI

---

## Troubleshooting

### Events Still Not Visible

1. **Check PostHog key**: Ensure `NEXT_PUBLIC_POSTHOG_KEY` is correct
2. **Check PostHog host**: Ensure `NEXT_PUBLIC_POSTHOG_HOST` matches your PostHog region
3. **Wait longer**: Events can take 10-30 seconds to appear
4. **Check PostHog dashboard**: Go to Insights → Live Events to verify

### Property Not Found

- Use `role` (not `userRole`) when creating funnels/cohorts
- The property is set via `$set` in person properties
- Check a user's person profile in PostHog to verify the property exists

---

## Quick Reference

**Test Script**: `npm run test:posthog`

**Property Name**: `role` (person property)

**Event Names**: All use snake_case (e.g., `quiz_completed`, `club_booking_created`)

**Documentation**: See `docs/POSTHOG_EVENTS_VERIFICATION.md` for complete event list

---

**Remember**: All events are implemented - they just need to be fired to appear in PostHog!
