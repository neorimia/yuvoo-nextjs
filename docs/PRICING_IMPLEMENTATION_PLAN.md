# Pricing Implementation Plan

## Dual Subscription Model: 99 lei/month & 990 lei/year

**Date**: January 2026  
**Status**: Planning Phase  
**Pricing Model**: Monthly base (99 lei/month) + Annual discount (990 lei/year - 17% discount)

---

## Overview

This document outlines the implementation plan for supporting both monthly and yearly premium subscriptions for sports clubs on Yuvoo platform.

### Pricing Structure

- **Monthly**: 99 lei/month (base price)
- **Annual**: 990 lei/year (17% discount, pay for 10 months, get 2 months free)
- **Savings**: 198 lei/year with annual subscription
- **Monthly Equivalent**: 82.5 lei/month with annual plan

---

## Implementation Phases

### Phase 1: Database Schema Updates

#### 1.1 Review Current Schema

- [ ] Check `premium_clubs` table structure
- [ ] Identify fields related to subscription tracking
- [ ] Review `lead_payments` table for payment method tracking

#### 1.2 Schema Changes Required

- [ ] Add `subscription_type` enum field: `MONTHLY` | `YEARLY`
- [ ] Add `billing_period` field (if not exists): stores subscription duration
- [ ] Add `next_billing_date` field: tracks when next payment is due
- [ ] Add `billing_amount` field: stores the amount paid for this subscription period

#### 1.3 Migration Script

```sql
-- Add subscription_type enum
CREATE TYPE subscription_type AS ENUM ('MONTHLY', 'YEARLY');

-- Add fields to premium_clubs table
ALTER TABLE premium_clubs
ADD COLUMN subscription_type subscription_type DEFAULT 'MONTHLY',
ADD COLUMN billing_period INTEGER DEFAULT 1, -- months
ADD COLUMN next_billing_date TIMESTAMP,
ADD COLUMN billing_amount INTEGER; -- in bani (cents)
```

---

### Phase 2: Backend Service Updates

#### 2.1 Payment Service (`src/modules/payments/lead-payment.service.ts`)

**Constants to Add:**

```typescript
export const PREMIUM_MONTHLY_AMOUNT_LEI = 99;
export const PREMIUM_MONTHLY_AMOUNT_BANI = PREMIUM_MONTHLY_AMOUNT_LEI * 100; // 9900 bani

export const PREMIUM_YEARLY_AMOUNT_LEI = 990;
export const PREMIUM_YEARLY_AMOUNT_BANI = PREMIUM_YEARLY_AMOUNT_LEI * 100; // 99000 bani
```

**Function Updates:**

- [ ] Update `createPremiumUpgradePaymentIntent()` to accept `subscriptionType: 'MONTHLY' | 'YEARLY'`
- [ ] Calculate amount based on subscription type
- [ ] Add subscription type to Stripe metadata
- [ ] Update payment processing to handle both types

**Example Implementation:**

```typescript
export async function createPremiumUpgradePaymentIntent(
  clubId: string,
  subscriptionType: "MONTHLY" | "YEARLY"
): Promise<{ payment: LeadPayment; clientSecret: string }> {
  const amount =
    subscriptionType === "MONTHLY" ? PREMIUM_MONTHLY_AMOUNT_BANI : PREMIUM_YEARLY_AMOUNT_BANI;

  // ... rest of implementation
}
```

#### 2.2 Premium Club Service (`src/modules/clubs/premium-club.service.ts`)

**Function Updates:**

- [ ] Update `upgradeToPremium()` to accept `subscriptionType` parameter
- [ ] Calculate `premiumEndDate` based on subscription type:
  - Monthly: current date + 1 month
  - Yearly: current date + 12 months
- [ ] Store subscription type in database
- [ ] Set `next_billing_date` based on subscription type

**Example Implementation:**

```typescript
export async function upgradeToPremium(
  clubId: string,
  options: {
    subscriptionType: "MONTHLY" | "YEARLY";
    stripeSubscriptionId?: string | null;
    stripeCustomerId?: string | null;
  }
): Promise<PremiumClubStatus> {
  const billingPeriod = options.subscriptionType === "MONTHLY" ? 1 : 12;
  const premiumEndDate = addMonths(new Date(), billingPeriod);
  const nextBillingDate = addMonths(new Date(), billingPeriod);

  // ... rest of implementation
}
```

#### 2.3 Server Actions (`src/app/actions/lead-payments.ts`)

**New/Updated Actions:**

- [ ] Update `createPremiumUpgradePaymentAction` to accept `subscriptionType` from form data
- [ ] Pass subscription type to payment service
- [ ] Return subscription type in response for UI updates

---

### Phase 3: Type Definitions

#### 3.1 Update TypeScript Types (`src/types/leads.ts`)

**Add Subscription Type Enum:**

```typescript
export enum SubscriptionType {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}
```

**Update PremiumClubStatus Interface:**

```typescript
export interface PremiumClubStatus {
  // ... existing fields
  subscriptionType: SubscriptionType;
  billingPeriod: number; // months
  nextBillingDate: Date | null;
  billingAmount: number; // in bani
}
```

---

### Phase 4: Frontend Component Updates

#### 4.1 Pricing Landing Page (`src/components/features/clubs/ClubsLandingPricing.tsx`)

**Updates Required:**

- [ ] Add pricing comparison section showing both options
- [ ] Display monthly option: "99 lei/lună"
- [ ] Display annual option: "990 lei/an" with "Most Popular" badge
- [ ] Show savings message: "Economisește 198 lei/an"
- [ ] Show monthly equivalent: "Doar 82.5 lei/lună echivalent"
- [ ] Add value proposition: "Plătești pentru 10 luni, primești 12"
- [ ] Update CTA buttons to include subscription type selection

**Design Considerations:**

- Use card layout with side-by-side comparison
- Highlight annual option as "Recommended"
- Show clear savings calculation
- Add visual indicators (badges, icons)

#### 4.2 Premium Upgrade Component (`src/components/features/clubs/PremiumUpgrade.tsx`)

**Updates Required:**

- [ ] Add subscription type selector (radio buttons or tabs)
- [ ] Display pricing dynamically based on selection
- [ ] Show savings calculation when annual is selected
- [ ] Update payment form to include subscription type
- [ ] Update comparison sidebar with both options
- [ ] Add Romanian labels: "Lunar" and "Anual"

**UI Flow:**

1. User selects subscription type (Monthly/Annual)
2. Price updates dynamically
3. Savings message appears for annual
4. User proceeds to payment

**Example Structure:**

```tsx
<div className="subscription-type-selector">
  <label>
    <input type="radio" value="MONTHLY" />
    Lunar - 99 lei/lună
  </label>
  <label>
    <input type="radio" value="YEARLY" />
    Anual - 990 lei/an <span className="badge">Recomandat</span>
  </label>
</div>
```

#### 4.3 Club Dashboard Updates

**Updates Required:**

- [ ] Display current subscription type
- [ ] Show next billing date
- [ ] Display billing amount
- [ ] Add option to switch subscription type (upgrade/downgrade)
- [ ] Show subscription status and expiration date

---

### Phase 5: Stripe Integration

#### 5.1 Stripe Subscription Setup

**Considerations:**

- [ ] Decide on Stripe Products/Plans structure
- [ ] Create Stripe Product for Premium Monthly (99 lei)
- [ ] Create Stripe Product for Premium Yearly (990 lei)
- [ ] Set up recurring billing for monthly subscriptions
- [ ] Handle annual subscription as one-time payment or recurring

#### 5.2 Webhook Updates

**Webhook Handlers:**

- [ ] Update webhook handler to process monthly renewals
- [ ] Update webhook handler to process yearly renewals
- [ ] Handle subscription cancellation
- [ ] Handle subscription upgrades/downgrades
- [ ] Handle payment failures

---

### Phase 6: Testing

#### 6.1 Unit Tests

- [ ] Test payment service with both subscription types
- [ ] Test premium club service with both subscription types
- [ ] Test date calculations (premiumEndDate, nextBillingDate)
- [ ] Test amount calculations

#### 6.2 Integration Tests

- [ ] Test monthly subscription flow end-to-end
- [ ] Test yearly subscription flow end-to-end
- [ ] Test subscription type switching
- [ ] Test payment processing with Stripe

#### 6.3 User Acceptance Testing

- [ ] Test pricing display on landing page
- [ ] Test subscription selection in upgrade flow
- [ ] Test payment processing for both types
- [ ] Test dashboard display of subscription info
- [ ] Test Romanian translations

---

### Phase 7: Analytics & Tracking

#### 7.1 Event Tracking

- [ ] Add `subscriptionType` parameter to premium upgrade events
- [ ] Track conversion rates by subscription type
- [ ] Track churn rates by subscription type
- [ ] Track upgrade/downgrade events

**PostHog Events:**

```typescript
PREMIUM_UPGRADE_INITIATED: {
  subscriptionType: 'MONTHLY' | 'YEARLY',
  clubId: string,
}

PREMIUM_UPGRADE_COMPLETED: {
  subscriptionType: 'MONTHLY' | 'YEARLY',
  clubId: string,
  amount: number,
}
```

---

## Implementation Checklist

### Database

- [ ] Review current schema
- [ ] Create migration script
- [ ] Run migration in development
- [ ] Test migration rollback
- [ ] Deploy migration to production

### Backend

- [ ] Update payment service constants
- [ ] Update payment service functions
- [ ] Update premium club service
- [ ] Update server actions
- [ ] Update type definitions
- [ ] Add error handling for subscription types

### Frontend

- [ ] Update ClubsLandingPricing component
- [ ] Update PremiumUpgrade component
- [ ] Add subscription type selector
- [ ] Update club dashboard
- [ ] Add Romanian translations
- [ ] Update styling for pricing comparison

### Stripe

- [ ] Create Stripe products/plans
- [ ] Update webhook handlers
- [ ] Test payment processing
- [ ] Test subscription renewals

### Testing

- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Perform manual testing
- [ ] Test edge cases

### Documentation

- [ ] Update API documentation
- [ ] Update component documentation
- [ ] Update user-facing documentation
- [ ] Create migration guide

---

## Key Files to Modify

### Backend

- `src/modules/payments/lead-payment.service.ts`
- `src/modules/clubs/premium-club.service.ts`
- `src/app/actions/lead-payments.ts`
- `src/types/leads.ts`
- `src/lib/db/schema.ts` (if using Drizzle)

### Frontend

- `src/components/features/clubs/ClubsLandingPricing.tsx`
- `src/components/features/clubs/PremiumUpgrade.tsx`
- `src/app/club/dashboard/page.tsx` (if subscription info displayed)

### Database

- Migration file: `src/lib/db/migrations/XXXX_add_subscription_type.sql`

---

## Romanian Translations

### Labels

- **Monthly**: "Lunar"
- **Yearly**: "Anual"
- **Recommended**: "Recomandat"
- **Most Popular**: "Cel mai popular"
- **Save**: "Economisește"
- **Monthly Equivalent**: "Echivalent lunar"
- **Pay for X months, get Y**: "Plătești pentru X luni, primești Y"

### Messages

- "Economisește 198 lei/an cu planul anual"
- "Plătești pentru 10 luni, primești 12"
- "Doar 82.5 lei/lună echivalent"
- "Anulează oricând"

---

## Risk Mitigation

### Potential Issues

1. **Migration Complexity**: Ensure backward compatibility with existing premium subscriptions
2. **Stripe Integration**: Handle both one-time and recurring payments
3. **Date Calculations**: Account for timezone differences and edge cases
4. **User Confusion**: Clear UI/UX to explain both options

### Solutions

1. Set default subscription type for existing premium clubs
2. Use Stripe's subscription API for monthly, one-time payments for yearly
3. Use date-fns or similar library for date calculations
4. Add tooltips and help text explaining each option

---

## Success Metrics

### Key Performance Indicators

- Conversion rate by subscription type
- Average revenue per user (ARPU)
- Customer lifetime value (LTV) by subscription type
- Churn rate by subscription type
- Upgrade rate (monthly to yearly)

### Targets

- 60%+ of new subscriptions choose annual plan
- <5% monthly churn rate
- > 80% upgrade rate from monthly to yearly after 3 months

---

## Timeline Estimate

- **Phase 1 (Database)**: 2-3 hours
- **Phase 2 (Backend)**: 4-6 hours
- **Phase 3 (Types)**: 1 hour
- **Phase 4 (Frontend)**: 6-8 hours
- **Phase 5 (Stripe)**: 3-4 hours
- **Phase 6 (Testing)**: 4-6 hours
- **Phase 7 (Analytics)**: 1-2 hours

**Total Estimate**: 21-30 hours

---

## Next Steps

1. Review and approve this implementation plan
2. Set up development branch: `feat/dual-pricing-subscription`
3. Start with Phase 1 (Database schema updates)
4. Implement incrementally, testing after each phase
5. Deploy to staging for UAT
6. Deploy to production after approval

---

**Last Updated**: January 2026  
**Status**: Ready for Implementation
