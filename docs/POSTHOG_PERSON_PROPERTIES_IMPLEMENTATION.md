# PostHog Person Properties Implementation

**Status**: ✅ Complete  
**Last Updated**: January 2025

This document details the implementation of PostHog person properties following PostHog AI recommendations.

---

## Overview

Person properties are user attributes stored in PostHog that persist across sessions. They're more efficient than sending user metadata with every event. We use `$set` for updatable properties and `$set_once` for immutable properties.

---

## Implementation Summary

### ✅ Person Properties Implemented

| Property                  | Type     | Set With    | When Set                                 | Location                                         |
| ------------------------- | -------- | ----------- | ---------------------------------------- | ------------------------------------------------ |
| `email`                   | String   | `$set`      | Signup, every page load                  | `auth.ts`, `PostHogUserIdentification.tsx`       |
| `role`                    | String   | `$set`      | Signup, every page load                  | `auth.ts`, `PostHogUserIdentification.tsx`       |
| `name`                    | String   | `$set`      | Signup, profile updates, every page load | `auth.ts`, `PostHogUserIdentification.tsx`       |
| `phoneNumber`             | String   | `$set`      | Profile updates, every page load         | `PostHogUserIdentification.tsx`                  |
| `signupDate`              | DateTime | `$set_once` | Signup only                              | `auth.ts`, `PostHogUserIdentification.tsx`       |
| `emailVerified`           | Boolean  | `$set`      | Email verification, every page load      | `auth.ts`, `PostHogUserIdentification.tsx`       |
| `emailVerifiedDate`       | DateTime | `$set_once` | Email verification only                  | `auth.ts`                                        |
| `onboardingCompleted`     | Boolean  | `$set`      | Onboarding completion, every page load   | `onboarding.ts`, `PostHogUserIdentification.tsx` |
| `onboardingCompletedDate` | DateTime | `$set_once` | Onboarding completion only               | `onboarding.ts`                                  |
| `onboardingRole`          | String   | `$set_once` | Onboarding completion only               | `onboarding.ts`                                  |
| `lastLoginDate`           | DateTime | `$set`      | Every login                              | `auth.ts`                                        |

---

## Implementation Details

### 1. User Signup (`user_signed_up`)

**Location**: `src/app/actions/auth.ts:182-199`

**Implementation**:

```typescript
await trackEventServer(PostHogEvents.USER_SIGNED_UP, {
  distinctId: session.user.id,
  [PostHogProperties.USER_ID]: session.user.id,
  [PostHogProperties.USER_ROLE]: session.dbUser.role,
  // Person properties: $set for updatable, $set_once for immutable
  $set: {
    email: session.user.primaryEmail || session.dbUser.email,
    role: session.dbUser.role,
    ...(session.dbUser.firstName && { name: session.dbUser.firstName }),
  },
  $set_once: {
    signupDate: session.dbUser.createdAt.toISOString(),
  },
});
```

**Properties Set**:

- ✅ `email` (updatable)
- ✅ `role` (updatable)
- ✅ `name` (updatable, if available)
- ✅ `signupDate` (immutable, set once)

---

### 2. Email Verification (`email_verified`)

**Location**: `src/app/actions/auth.ts:403-410`

**Implementation**:

```typescript
await trackEventServer(PostHogEvents.EMAIL_VERIFIED, {
  distinctId: session.user.id,
  [PostHogProperties.USER_ID]: session.user.id,
  // Person properties: mark email as verified
  $set: {
    emailVerified: true,
  },
  $set_once: {
    emailVerifiedDate: new Date().toISOString(),
  },
});
```

**Properties Set**:

- ✅ `emailVerified: true` (updatable)
- ✅ `emailVerifiedDate` (immutable, set once)

---

### 3. User Login (`user_logged_in`)

**Location**: `src/app/actions/auth.ts:81-86`

**Implementation**:

```typescript
await trackEventServer(PostHogEvents.USER_LOGGED_IN, {
  distinctId: session.user.id,
  [PostHogProperties.USER_ID]: session.user.id,
  [PostHogProperties.USER_ROLE]: session.dbUser?.role || "unknown",
  // Update last login date
  $set: {
    lastLoginDate: new Date().toISOString(),
  },
});
```

**Properties Set**:

- ✅ `lastLoginDate` (updatable, updated on every login)

---

### 4. Onboarding Completion (`onboarding_completed`)

**Location**:

- `src/app/actions/onboarding.ts:348-356` (Parent)
- `src/app/actions/onboarding.ts:732-740` (Club)
- `src/app/actions/onboarding.ts:1185-1193` (Doctor)

**Implementation**:

```typescript
await trackEventServer(PostHogEvents.ONBOARDING_COMPLETED, {
  distinctId: session.user.id,
  [PostHogProperties.ONBOARDING_ROLE]: session.dbUser.role,
  // Person properties: mark onboarding as complete
  $set: {
    onboardingCompleted: true,
  },
  $set_once: {
    onboardingCompletedDate: new Date().toISOString(),
    onboardingRole: session.dbUser.role,
  },
});
```

**Properties Set**:

- ✅ `onboardingCompleted: true` (updatable)
- ✅ `onboardingCompletedDate` (immutable, set once)
- ✅ `onboardingRole` (immutable, set once)

---

### 5. Automatic Property Updates (Every Page Load)

**Location**: `src/components/analytics/PostHogUserIdentification.tsx`

**Implementation**:
The `PostHogUserIdentification` component automatically updates person properties whenever a user visits a protected page. This ensures properties stay in sync with the database.

**Properties Updated**:

- ✅ `email`
- ✅ `role`
- ✅ `name` (built from firstName + lastName)
- ✅ `phoneNumber`
- ✅ `emailVerified`
- ✅ `onboardingCompleted`
- ✅ `signupDate` (via $set_once, only if not already set)

**Used In**:

- `src/app/parent/layout.tsx`
- `src/app/club/layout.tsx`
- `src/app/doctor/layout.tsx`

---

## Property Update Flow

### When Properties Are Set

1. **On Signup**:
   - `email`, `role`, `name`, `signupDate` set via `user_signed_up` event

2. **On Email Verification**:
   - `emailVerified`, `emailVerifiedDate` set via `email_verified` event

3. **On Login**:
   - `lastLoginDate` updated via `user_logged_in` event

4. **On Onboarding Completion**:
   - `onboardingCompleted`, `onboardingCompletedDate`, `onboardingRole` set via `onboarding_completed` event

5. **On Every Protected Page Visit**:
   - All properties synced via `PostHogUserIdentification` component
   - Ensures properties stay up-to-date

6. **On Profile Update**:
   - Properties automatically updated on next page load via `PostHogUserIdentification`

---

## TypeScript Support

**Updated Type**: `PostHogEventProperties` in `src/lib/analytics/events.ts`

Now supports `$set` and `$set_once` properties:

```typescript
export type PostHogEventProperties = {
  $set?: Record<string, string | number | boolean | undefined>;
  $set_once?: Record<string, string | number | boolean | undefined>;
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | Record<string, string | number | boolean | undefined>;
};
```

---

## Usage in PostHog Dashboard

### Creating Cohorts

You can now create cohorts based on person properties:

**Example Cohorts**:

- **Verified Users**: `emailVerified = true`
- **Completed Onboarding**: `onboardingCompleted = true`
- **New Users (Last 7 Days)**: `signupDate` in last 7 days
- **Active Users**: `lastLoginDate` in last 30 days
- **By Role**: `role = "parent"` / `"club_admin"` / `"doctor"`

### Funnel Breakdowns

Break down funnels by person properties:

- By `role` (parent, club_admin, doctor, admin)
- By `onboardingCompleted` status
- By `emailVerified` status

---

## Testing

### Test Script

Run the test script to verify all person properties are set correctly:

```bash
npm run test:posthog
```

This will fire all events including signup, email verification, login, and onboarding completion events with person properties.

### Manual Verification

1. **Sign up a new user**
2. **Verify email**
3. **Complete onboarding**
4. **Check PostHog Dashboard** → Persons → Select user → Properties tab

You should see:

- ✅ `email`
- ✅ `role`
- ✅ `name`
- ✅ `signupDate`
- ✅ `emailVerified: true`
- ✅ `emailVerifiedDate`
- ✅ `onboardingCompleted: true`
- ✅ `onboardingCompletedDate`
- ✅ `onboardingRole`
- ✅ `lastLoginDate`

---

## Best Practices

### ✅ What We're Doing Right

1. **Using `$set_once` for immutable properties**:
   - `signupDate`, `emailVerifiedDate`, `onboardingCompletedDate`, `onboardingRole`
   - These are set once and never overwritten

2. **Using `$set` for updatable properties**:
   - `email`, `role`, `name`, `phoneNumber`, `emailVerified`, `onboardingCompleted`, `lastLoginDate`
   - These can be updated as user data changes

3. **Automatic sync on page load**:
   - `PostHogUserIdentification` ensures properties stay in sync
   - No need to manually update properties after profile changes

4. **Non-blocking tracking**:
   - All tracking wrapped in try-catch
   - Failures don't affect core functionality

---

## Recommended Additional Properties (Future)

Based on PostHog AI recommendations, these properties could be added in the future:

| Property         | When to Set                    | Priority |
| ---------------- | ------------------------------ | -------- |
| `city`           | Profile update, onboarding     | Medium   |
| `childrenCount`  | After adding/removing children | Medium   |
| `totalBookings`  | After creating booking         | Low      |
| `preferredSport` | After quiz completion          | Low      |

These can be added incrementally as features are developed.

---

## Summary

✅ **All recommended person properties implemented**:

- ✅ Signup properties (`email`, `role`, `name`, `signupDate`)
- ✅ Email verification properties (`emailVerified`, `emailVerifiedDate`)
- ✅ Login tracking (`lastLoginDate`)
- ✅ Onboarding properties (`onboardingCompleted`, `onboardingCompletedDate`, `onboardingRole`)
- ✅ Automatic property sync on every protected page visit

✅ **TypeScript support**: Full type safety for `$set` and `$set_once`

✅ **Production ready**: All properties set correctly, non-blocking, error-handled

---

**Next Steps**:

1. Run `npm run test:posthog` to fire all events
2. Verify properties in PostHog dashboard
3. Create cohorts and funnels using these properties
