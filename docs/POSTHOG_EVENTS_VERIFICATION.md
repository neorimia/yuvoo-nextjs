# PostHog Events Verification Guide

**Status**: All Events Implemented ✅  
**Last Updated**: January 2025

This document verifies that all PostHog events mentioned by PostHog AI are actually implemented in the codebase and provides guidance on how to verify they're working.

---

## ✅ Events Status

### Events That ARE Implemented

All the events mentioned by PostHog AI are **already implemented** in the codebase:

#### 1. ✅ `quiz_completed`

**Status**: ✅ **IMPLEMENTED**

**Location**: `src/app/actions/quiz.ts:197`

```typescript
await trackEventServer(PostHogEvents.QUIZ_COMPLETED, {
  distinctId: session?.user.id || "anonymous",
  [PostHogProperties.QUIZ_ID]: result.id,
  [PostHogProperties.CHILD_ID]: childId,
  [PostHogProperties.CHILD_AGE]: childAge,
  [PostHogProperties.RECOMMENDATIONS_COUNT]: result.recommendations?.length || 0,
});
```

**When it fires**: After a user successfully completes and submits the quiz.

---

#### 2. ✅ `club_booking_created`

**Status**: ✅ **IMPLEMENTED**

**Location**: `src/app/actions/bookings.ts:43-52`

```typescript
const eventName =
  validatedInput.entityType === "club"
    ? PostHogEvents.CLUB_BOOKING_CREATED
    : PostHogEvents.DOCTOR_CONSULTATION_CREATED;

await trackEventServer(eventName, {
  distinctId: user.id,
  [PostHogProperties.BOOKING_ID]: booking.id,
  [PostHogProperties.BOOKING_STATUS]: booking.status,
  ...(validatedInput.entityType === "club"
    ? { [PostHogProperties.CLUB_ID]: validatedInput.entityId }
    : { [PostHogProperties.DOCTOR_ID]: validatedInput.entityId }),
});
```

**When it fires**: When a user creates a booking for a club trial.

---

#### 3. ✅ `doctor_consultation_created`

**Status**: ✅ **IMPLEMENTED**

**Location**: `src/app/actions/bookings.ts:43-52` (same code, different event name)

**When it fires**: When a user creates a booking for a doctor consultation.

---

#### 4. ✅ `club_viewed` and `doctor_viewed`

**Status**: ✅ **IMPLEMENTED** (Just Added)

**Location**:

- `src/components/analytics/PostHogViewTracking.tsx` (new component)
- `src/app/(public)/cluburi/[slug]/page.tsx` (integrated)
- `src/app/(public)/doctori/[slug]/page.tsx` (integrated)

**When it fires**: When a user views a club or doctor detail page.

---

### Properties Status

#### ✅ `userRole` Property

**Status**: ✅ **IMPLEMENTED** (as `role`)

**Location**: `src/components/analytics/PostHogUserIdentification.tsx:66`

```typescript
identifyUser(userId, {
  $set: {
    ...(email && { email }),
    ...(role && { role }), // This is the userRole property
    ...(name && { name }),
  },
  // ...
});
```

**Note**: The property is called `role` (not `userRole`) in person properties. PostHog AI might be looking for `userRole`, but the actual property name is `role`.

**To use in PostHog**:

- In funnels/cohorts, use the person property: `role`
- Values: `"parent"`, `"club_admin"`, `"doctor"`, `"admin"`

---

## Why PostHog AI Doesn't See These Events

PostHog AI checks your **actual PostHog project** for events that have been **fired**. If events haven't been triggered yet (no users have performed these actions), PostHog AI won't see them.

**This is normal** - the events are implemented in code but need to be triggered by user actions.

---

## How to Verify Events Are Working

### 0. Quick Test Script (Recommended)

**Fastest way to test all events**:

```bash
npm run test:posthog
```

This script (`scripts/test-posthog-events.ts`) will:

- Fire all custom PostHog events automatically
- Use test user IDs and entity IDs
- Simulate a complete user journey
- Show success/error messages for each event

**Requirements**:

- `NEXT_PUBLIC_POSTHOG_KEY` must be set in `.env.local`
- Script uses server-side PostHog client

**After running**:

- Check PostHog dashboard → Insights → Live Events
- All events should appear within a few seconds
- PostHog AI will now be able to see all events

---

### 1. Test Events Manually

1. **Start your development server**:

   ```bash
   npm run dev
   ```

2. **Enable PostHog debug mode** (already configured in development):
   - PostHog automatically enables debug mode in development
   - Check browser console for PostHog logs

3. **Test each event**:
   - **Quiz Completed**: Complete a quiz
   - **Club Booking Created**: Create a booking for a club
   - **Doctor Consultation Created**: Create a booking for a doctor
   - **Club/Doctor Viewed**: Visit a club or doctor detail page

4. **Check PostHog Dashboard**:
   - Go to PostHog → Insights → Live Events
   - You should see events appearing in real-time

### 2. Verify in PostHog Dashboard

1. **Navigate to Events**:
   - PostHog Dashboard → Insights → Events
   - Search for event names:
     - `quiz_completed`
     - `club_booking_created`
     - `doctor_consultation_created`
     - `club_viewed`
     - `doctor_viewed`

2. **Check Person Properties**:
   - PostHog Dashboard → Persons
   - Select a user
   - Check for `role` property (not `userRole`)

### 3. Use PostHog Debug Mode

In development, PostHog automatically enables debug mode. You'll see:

- Console logs for all events
- Event properties
- User identification

---

## URL Patterns for Funnel Step 3

For the intermediate step in the Quiz → Booking funnel, you can use:

### Option 1: Use `$pageview` with URL filters

**Club detail pages**: `/cluburi/*`

- Pattern: `$pageview` where `$current_url` contains `/cluburi/`
- Exclude: `/cluburi` (listing page)

**Doctor detail pages**: `/doctori/*`

- Pattern: `$pageview` where `$current_url` contains `/doctori/`
- Exclude: `/doctori` (listing page)

### Option 2: Use Custom Events (Recommended)

Now that `club_viewed` and `doctor_viewed` are implemented, you can use:

**Step 3**: `club_viewed` OR `doctor_viewed`

- This is more precise than filtering `$pageview` by URL

---

## Creating the Funnel Now

Even though PostHog AI doesn't see the events yet, you can still create the funnel configuration:

### Quiz → Booking Conversion Funnel

**Step 1: Quiz Started**

- Event: `quiz_started`
- ✅ This event exists and is tracked

**Step 2: Quiz Completed**

- Event: `quiz_completed`
- ✅ This event exists and is tracked
- Filter: Must have completed Step 1

**Step 3: Club/Doctor Viewed** (Optional)

- Event: `club_viewed` OR `doctor_viewed`
- ✅ These events now exist and are tracked
- Filter: Must have completed Step 2

**Step 4: Booking Created**

- Event: `club_booking_created` OR `doctor_consultation_created`
- ✅ These events exist and are tracked
- Filter: Must have completed Step 2

**Funnel Settings**:

- Conversion Window: 7 days
- Funnel Type: "Strict order"
- Breakdown: By person property `role` (not `userRole`)

---

## Property Name Clarification

**Important**: The person property is called `role`, not `userRole`.

When creating funnels or cohorts in PostHog:

- ✅ Use: `role` (person property)
- ❌ Don't use: `userRole` (doesn't exist)

**Values**:

- `"parent"`
- `"club_admin"`
- `"doctor"`
- `"admin"`

---

## Next Steps

1. ✅ All events are implemented
2. ✅ View tracking added for clubs and doctors
3. ⏳ **Test events** by performing user actions
4. ⏳ **Verify in PostHog** dashboard that events appear
5. ⏳ **Create funnels** once events start appearing

---

## Summary

| Event/Property                | Status         | Location                                                 |
| ----------------------------- | -------------- | -------------------------------------------------------- |
| `quiz_completed`              | ✅ Implemented | `src/app/actions/quiz.ts`                                |
| `club_booking_created`        | ✅ Implemented | `src/app/actions/bookings.ts`                            |
| `doctor_consultation_created` | ✅ Implemented | `src/app/actions/bookings.ts`                            |
| `club_viewed`                 | ✅ Implemented | `src/app/(public)/cluburi/[slug]/page.tsx`               |
| `doctor_viewed`               | ✅ Implemented | `src/app/(public)/doctori/[slug]/page.tsx`               |
| `role` (person property)      | ✅ Implemented | `src/components/analytics/PostHogUserIdentification.tsx` |

**All events are ready** - they just need to be triggered by user actions to appear in PostHog!
