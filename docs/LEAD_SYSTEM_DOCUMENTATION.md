# Lead Generation System Documentation

## Overview

The Lead Generation System enables parents to express interest in clubs. **Contact between parents and clubs is free for both parties.** Clubs can optionally upgrade to Premium for increased visibility (badge, priority listing). The system includes automated expiration, reminders, and email notifications with full contact details.

**Status**: Phase 1-8 Complete ✅ | Free contact model active ✅

---

## Architecture

### Database Schema

**Tables**:

- `leads` - Lead submissions from parents
- `premium_club_status` - Premium subscription status for clubs
- `lead_payments` - Payment tracking for pay-per-lead and premium upgrades

**Key Fields**:

- `leads.status`: `nou` | `in_asteptare` | `acceptat` | `expirat`
- `leads.expiresAt`: 5 days from creation
- `leads.paymentId`: Links to payment if unlocked
- `leads.paymentMethod`: `pay_per_lead` | `premium`

### Service Layer

**Modules**:

- `modules/leads/` - Lead management (service, repository)
- `modules/clubs/premium-club.service.ts` - Premium status management
- `modules/payments/lead-payment.service.ts` - Payment processing
- `modules/emails/lead-emails.service.ts` - Email notifications

### Routes

**Public Routes**:

- `/cluburi/[slug]` - Club detail page with lead submission button

**Protected Routes (Club Admin)**:

- `/club/dashboard/leaduri` - Lead management dashboard
- `/club/dashboard/leaduri/[leadId]` - Lead detail page
- `/club/dashboard/leaduri/[leadId]/plata` - Pay-per-lead payment page
- `/club/dashboard/premium` - Premium upgrade page

**API Routes**:

- `/api/cron/expire-leads` - Expiration cron job (daily)
- `/api/cron/send-lead-reminders` - Reminder cron job (hourly)
- `/api/payments/webhook` - Stripe webhook handler

---

## Cron Jobs

### Vercel Plan Limitations

**Important**: Vercel cron job precision depends on your plan:

- **Hobby Plan**:
  - 100 cron jobs per project
  - **Hourly precision** - Cron jobs can trigger anywhere within the scheduled hour
  - Example: A cron job scheduled for `0 0 * * *` (midnight) may trigger anywhere between 00:00 and 00:59
  - Example: A cron job scheduled for `0 * * * *` (every hour) may trigger anywhere within that hour window
- **Pro Plan**:
  - 100 cron jobs per project
  - **Per-minute precision** - Cron jobs trigger at the exact scheduled minute
- **Enterprise Plan**:
  - 100 cron jobs per project
  - **Per-minute precision** - Cron jobs trigger at the exact scheduled minute

**Impact on Yuvoo Cron Jobs**:

- `expire-leads` (daily at midnight): On Hobby plan, may run anywhere between 00:00-00:59
- `send-lead-reminders` (hourly): On Hobby plan, may run anywhere within each hour window

**Recommendation**: For production use, consider upgrading to Pro plan for precise timing, especially if lead expiration timing is critical.

### Expire Leads Cron Job

**Route**: `/api/cron/expire-leads`  
**Schedule**: Daily at midnight (`0 0 * * *`)  
**Purpose**: Expire leads that have passed their 5-day expiration date

**Note**: On Hobby plan, this may execute anywhere between 00:00 and 00:59

**Process**:

1. Find leads where `expiresAt < now` AND status is `nou` or `in_asteptare`
2. Update status to `expirat`
3. Send email to parent with alternative club suggestions
4. Track expiration event in PostHog

**Configuration** (`vercel.json`):

```json
{
  "crons": [
    {
      "path": "/api/cron/expire-leads",
      "schedule": "0 0 * * *"
    }
  ]
}
```

**Security**: Protected by `CRON_SECRET` environment variable

**Response**:

```json
{
  "success": true,
  "expired": 5,
  "errors": 0,
  "timestamp": "2026-01-26T00:00:00.000Z"
}
```

### Send Lead Reminders Cron Job

**Route**: `/api/cron/send-lead-reminders`  
**Schedule**: Every hour (`0 * * * *`)  
**Purpose**: Send reminder emails to clubs about pending leads (48h after creation)

**Note**: On Hobby plan, this may execute anywhere within each hour window (e.g., scheduled for 1:00 PM may run between 1:00 PM and 1:59 PM)

**Process**:

1. Find leads created 48h ago with status `nou`
2. Update status to `in_asteptare` (optional)
3. Send reminder email to club
4. Track reminder event (if needed)

**Configuration** (`vercel.json`):

```json
{
  "crons": [
    {
      "path": "/api/cron/send-lead-reminders",
      "schedule": "0 * * * *"
    }
  ]
}
```

**Security**: Protected by `CRON_SECRET` environment variable

**Response**:

```json
{
  "success": true,
  "sent": 3,
  "errors": 0,
  "timestamp": "2026-01-26T12:00:00.000Z"
}
```

### Environment Variables

**Required**:

```bash
CRON_SECRET=your-secret-key-here
```

**Setup**:

1. Generate a secure random string for `CRON_SECRET`
2. Add to `.env.local` for local development
3. Add to Vercel environment variables for production
4. Vercel Cron will automatically include this secret in the `Authorization` header

**Testing Locally**:

```bash
curl -X POST http://localhost:3000/api/cron/expire-leads \
  -H "Authorization: Bearer your-secret-key-here"
```

---

## PostHog Event Tracking

### Events Implemented

#### Lead Submission (`LEAD_SUBMITTED`)

**Triggered**: When parent submits a lead  
**Location**: `app/actions/leads.ts`  
**Properties**:

- `leadId` - Lead ID
- `clubId` - Club ID
- `clubSport` - Sport type (optional)
- `clubCity` - Location ID (optional)
- `childAge` - Child's age

#### Lead View (`LEAD_VIEWED`)

**Triggered**: When club admin views lead detail page  
**Location**: `app/club/dashboard/leaduri/[leadId]/page.tsx`  
**Properties**:

- `leadId` - Lead ID
- `clubId` - Club ID
- `leadStatus` - Current lead status
- `leadPaymentMethod` - Payment method if unlocked (optional)

#### Lead Payment Initiated (`LEAD_PAYMENT_INITIATED`)

**Triggered**: When club initiates pay-per-lead payment  
**Location**: `app/actions/lead-payments.ts`  
**Properties**:

- `leadId` - Lead ID
- `clubId` - Club ID
- `leadPaymentMethod` - `pay_per_lead`
- `paymentAmount` - 300 (3€ in cents)

#### Lead Payment Completed (`LEAD_PAYMENT_COMPLETED`)

**Triggered**: When pay-per-lead payment succeeds  
**Location**: `app/api/payments/webhook/route.ts`  
**Properties**:

- `leadId` - Lead ID
- `clubId` - Club ID
- `leadPaymentMethod` - `pay_per_lead`
- `paymentAmount` - Payment amount in cents

#### Premium Upgrade Initiated (`PREMIUM_UPGRADE_INITIATED`)

**Triggered**: When club initiates premium upgrade  
**Location**: `app/actions/lead-payments.ts`  
**Properties**:

- `clubId` - Club ID
- `paymentAmount` - 19900 (199 lei in bani)

#### Premium Upgrade Completed (`PREMIUM_UPGRADE_COMPLETED`)

**Triggered**: When premium upgrade payment succeeds  
**Location**: `app/api/payments/webhook/route.ts`  
**Properties**:

- `clubId` - Club ID
- `leadPaymentMethod` - `premium`
- `paymentAmount` - Payment amount in bani

#### Lead Expired (`LEAD_EXPIRED`)

**Triggered**: When lead expires (via cron job)  
**Location**: `modules/leads/leads.service.ts` (expireLead function)  
**Properties**:

- `leadId` - Lead ID
- `clubId` - Club ID
- `leadStatus` - `expirat`

### Event Names

All events are defined in `lib/analytics/events.ts`:

```typescript
export const PostHogEvents = {
  LEAD_SUBMITTED: "lead_submitted",
  LEAD_VIEWED: "lead_viewed",
  LEAD_PAYMENT_INITIATED: "lead_payment_initiated",
  LEAD_PAYMENT_COMPLETED: "lead_payment_completed",
  LEAD_EXPIRED: "lead_expired",
  PREMIUM_UPGRADE_INITIATED: "premium_upgrade_initiated",
  PREMIUM_UPGRADE_COMPLETED: "premium_upgrade_completed",
};
```

---

## Error Handling

### Error Handling Strategy

**Principles**:

1. **Non-blocking**: Tracking and email failures don't block core operations
2. **Romanian Messages**: All user-facing error messages in Romanian
3. **Proper Logging**: Errors logged with context for debugging
4. **Graceful Degradation**: System continues to function even if non-critical operations fail

### Error Cases Handled

#### Invalid Lead ID

- **Location**: `modules/leads/leads.service.ts`
- **Error**: `"Cererea nu a fost găsită"`
- **HTTP Status**: 404

#### Unauthorized Access

- **Location**: `modules/leads/leads.service.ts`
- **Error**: `"Nu aveți acces la această cerere"`
- **HTTP Status**: 403

#### Payment Failure

- **Location**: `app/api/payments/webhook/route.ts`
- **Action**: Update payment status to `failed`
- **Notification**: Logged, no user notification (handled by Stripe)

#### Email Sending Failure

- **Location**: Multiple (email service calls)
- **Action**: Logged, operation continues
- **Rationale**: Email failures shouldn't block lead operations

#### Expiration Job Failure

- **Location**: `app/api/cron/expire-leads/route.ts`
- **Action**: Returns error count in response
- **Logging**: Full error logged for debugging

#### Cron Secret Missing

- **Location**: Cron job routes
- **Error**: `"Unauthorized"`
- **HTTP Status**: 401
- **Logging**: Error logged if `CRON_SECRET` not set

### Error Message Standards

**All error messages must be in Romanian**:

- ✅ `"Cererea nu a fost găsită"`
- ✅ `"Nu aveți acces la această cerere"`
- ✅ `"Eroare la crearea plății"`
- ❌ `"Lead not found"`
- ❌ `"Unauthorized access"`

---

## Testing

### Manual Testing Checklist

#### Parent Flow

- [ ] Submit lead on non-premium club
- [ ] Check email received (club notification)
- [ ] Check lead status (if accessible)
- [ ] Wait for expiration (or manually expire)
- [ ] Check expiration email with alternative clubs

#### Club Flow

- [ ] Receive notification email (no contact info)
- [ ] View lead detail page (contact hidden)
- [ ] Initiate pay-per-lead payment (3€)
- [ ] Complete payment
- [ ] View contact info after payment
- [ ] Accept lead (if applicable)

#### Premium Flow

- [ ] View premium upgrade page
- [ ] Initiate premium upgrade (199 lei/year)
- [ ] Complete payment
- [ ] Check premium badge displayed
- [ ] Check contact visible on club detail page
- [ ] Check premium clubs appear first in listings
- [ ] Check unlimited leads access

#### Expiration Flow

- [ ] Create test lead
- [ ] Manually expire (or wait 5 days)
- [ ] Check parent notification email
- [ ] Check alternative clubs suggested
- [ ] Verify lead status updated to `expirat`

### PostHog Event Verification

**Check PostHog dashboard for**:

- `lead_submitted` events with correct properties
- `lead_viewed` events when clubs view leads
- `lead_payment_initiated` and `lead_payment_completed` events
- `premium_upgrade_initiated` and `premium_upgrade_completed` events
- `lead_expired` events from cron jobs

---

## Business Logic

### Lead Expiration

- **Duration**: 5 days from creation
- **Status Update**: `nou` or `in_asteptare` → `expirat`
- **Parent Notification**: Email with alternative club suggestions
- **Alternative Clubs**: 3-5 clubs with same sport and location

### Lead Reminders

- **Timing**: 48 hours after creation
- **Status Update**: `nou` → `in_asteptare` (optional)
- **Club Notification**: Reminder email with lead details (no contact info)

### Premium Benefits

- **Badge**: "Verificat Yuvoo" badge displayed
- **Priority Listing**: Premium clubs appear first in search results
- **Contact Visibility**: Contact info visible to parents on club detail page
- **Unlimited Leads**: Access to all leads without per-lead payment
- **Price**: 199 lei/year (19900 bani)

### Pay-Per-Lead

- **Price**: 3€ (300 cents)
- **Currency**: EUR
- **Unlock**: Contact info revealed after payment
- **One-Time**: Each lead requires separate payment (unless premium)

---

## Files Reference

### Key Files

**Service Layer**:

- `src/modules/leads/leads.service.ts` - Lead business logic
- `src/modules/leads/leads.repository.ts` - Data access layer
- `src/modules/clubs/premium-club.service.ts` - Premium status management
- `src/modules/payments/lead-payment.service.ts` - Payment processing

**Server Actions**:

- `src/app/actions/leads.ts` - Lead submission action
- `src/app/actions/lead-payments.ts` - Payment actions

**Components**:

- `src/components/features/clubs/LeadSubmissionModal.tsx` - Lead submission form
- `src/components/features/clubs/LeadSubmissionButton.tsx` - Submission button
- `src/components/features/clubs/LeadDetailView.tsx` - Lead detail display
- `src/components/features/clubs/LeadManagementDashboard.tsx` - Lead list
- `src/components/features/clubs/PayPerLeadPayment.tsx` - Payment form
- `src/components/features/clubs/PremiumUpgrade.tsx` - Premium upgrade form
- `src/components/features/clubs/PremiumBadge.tsx` - Premium badge component

**Pages**:

- `src/app/club/dashboard/leaduri/page.tsx` - Lead management dashboard
- `src/app/club/dashboard/leaduri/[leadId]/page.tsx` - Lead detail page
- `src/app/club/dashboard/leaduri/[leadId]/plata/page.tsx` - Payment page
- `src/app/club/dashboard/premium/page.tsx` - Premium upgrade page

**Cron Jobs**:

- `src/app/api/cron/expire-leads/route.ts` - Expiration cron job
- `src/app/api/cron/send-lead-reminders/route.ts` - Reminder cron job

**Email Templates**:

- `emails/lead-notification-email.tsx` - Club notification email
- `emails/lead-reminder-email.tsx` - Reminder email
- `emails/lead-expired-email.tsx` - Expiration email to parent
- `emails/lead-accepted-email.tsx` - Acceptance email to parent

---

## Maintenance

### Monitoring

**Key Metrics**:

- Lead submission rate
- Lead acceptance rate
- Time to accept leads
- Payment conversion rate
- Premium upgrade rate
- Expiration rate

**PostHog Dashboards**:

- Create dashboard for lead metrics
- Track conversion funnel: submission → view → payment → acceptance
- Monitor premium upgrade conversions

### Common Issues

**Issue**: Cron jobs not running  
**Solution**: Check `CRON_SECRET` environment variable, verify Vercel cron configuration

**Issue**: Emails not sending  
**Solution**: Check Brevo API key, verify email service configuration

**Issue**: Payments not processing  
**Solution**: Check Stripe webhook configuration, verify payment intent creation

**Issue**: Premium status not updating  
**Solution**: Check premium service date validation, verify payment webhook processing

---

## Future Enhancements

**Out of Scope (Phase 1)**:

- Lead analytics dashboard for clubs
- Bulk lead export
- Lead response tracking
- Parent-club messaging system
- Lead quality scoring
- A/B testing for pricing

---

**Last Updated**: 2026-01-26  
**Status**: Phase 7 Complete ✅  
**Next Steps**: Monitor metrics, gather user feedback, iterate on pricing and features
