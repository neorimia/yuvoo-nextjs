# Stripe Implementation Guide

**Status**: Complete  
**Date**: January 2025  
**Product**: Yuvoo - Parent Pricing (One-Time Payment for Quiz Reports)

---

## Overview

This guide covers the complete setup and implementation of Stripe payment processing for Yuvoo's one-time payment flow. The integration allows parents to purchase complete sport recommendation reports for 39 lei (one-time payment, no subscription).

**Payment Flow**:

1. User completes quiz (free)
2. User provides email and location
3. User views teaser (single sport recommendation)
4. User proceeds to paywall
5. User completes payment via Stripe
6. User receives report access after successful payment

---

## Table of Contents

1. [Stripe Account Setup](#1-stripe-account-setup)
2. [Environment Variables Configuration](#2-environment-variables-configuration)
3. [Webhook Configuration](#3-webhook-configuration)
4. [Testing with Stripe Test Mode](#4-testing-with-stripe-test-mode)
5. [Production Deployment](#5-production-deployment)
6. [Security Best Practices](#6-security-best-practices)
7. [Troubleshooting](#7-troubleshooting)
8. [API Reference](#8-api-reference)

---

## 1. Stripe Account Setup

### Step 1: Create Stripe Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Sign up for a new account or log in to existing account
3. Complete account verification (business details, bank account, etc.)

### Step 2: Activate Account

1. Complete business information in Stripe Dashboard
2. Add bank account for payouts
3. Verify business identity (required for production)
4. Wait for account activation (usually instant for test mode, 1-2 days for production)

### Step 3: Enable Romanian Leu (RON) Currency

1. Go to **Settings** → **Business settings** → **Currencies**
2. Enable **Romanian Leu (RON)** if not already enabled
3. Verify RON is supported in your region

**Note**: Stripe supports RON in Romania. If RON is not available, contact Stripe support.

---

## 2. Environment Variables Configuration

### Required Environment Variables

Add these variables to your `.env.local` file (development) and Vercel environment variables (production):

```bash
# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_..." # Test mode: sk_test_..., Production: sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..." # Test mode: pk_test_..., Production: pk_live_...
STRIPE_WEBHOOK_SECRET="whsec_..." # Webhook signing secret (different for test and production)
```

### Getting Your API Keys

#### Test Mode Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Click **Reveal test key** for **Secret key**
3. Copy the **Publishable key** (starts with `pk_test_`)
4. Copy the **Secret key** (starts with `sk_test_`)

#### Production Keys

1. Switch to **Live mode** in Stripe Dashboard (toggle in top right)
2. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Click **Reveal live key** for **Secret key**
4. Copy the **Publishable key** (starts with `pk_live_`)
5. Copy the **Secret key** (starts with `sk_live_`)

**⚠️ Important**: Never commit API keys to version control. Always use environment variables.

### Environment Variable Setup

#### Development (`.env.local`)

```bash
# Stripe Test Mode
STRIPE_SECRET_KEY="sk_test_51..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51..."
STRIPE_WEBHOOK_SECRET="whsec_test_..."
```

#### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - `STRIPE_SECRET_KEY` → Production secret key (`sk_live_...`)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → Production publishable key (`pk_live_...`)
   - `STRIPE_WEBHOOK_SECRET` → Production webhook secret (`whsec_...`)
4. Select **Production** environment for all variables
5. Save changes

---

## 3. Webhook Configuration

Webhooks are essential for securely processing payment status updates from Stripe.

### Step 1: Create Webhook Endpoint

#### Development (Local Testing)

Use Stripe CLI for local webhook testing:

1. **Install Stripe CLI**:

   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Linux
   # Download from https://stripe.com/docs/stripe-cli

   # Windows
   # Download from https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe CLI**:

   ```bash
   stripe login
   ```

3. **Forward webhooks to local server**:

   ```bash
   stripe listen --forward-to localhost:3000/api/payments/webhook
   ```

4. **Copy webhook signing secret**:
   - The CLI will output a webhook signing secret (starts with `whsec_`)
   - Add this to your `.env.local` as `STRIPE_WEBHOOK_SECRET`

#### Production

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Configure endpoint:
   - **Endpoint URL**: `https://yourdomain.com/api/payments/webhook`
   - **Description**: "Yuvoo Payment Webhook"
   - **Events to send**: Select these events:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
4. Click **Add endpoint**
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

### Step 2: Verify Webhook Endpoint

The webhook endpoint is already implemented at:

- **Path**: `/api/payments/webhook`
- **File**: `src/app/api/payments/webhook/route.ts`

**What it does**:

- Verifies webhook signature for security
- Handles `payment_intent.succeeded` events
- Handles `payment_intent.payment_failed` events
- Updates payment status in database
- Creates report access tokens
- Sends payment success emails

**No additional code needed** - the endpoint is already implemented and ready to use.

---

## 4. Testing with Stripe Test Mode

### Test Card Numbers

Stripe provides test card numbers for testing different scenarios:

#### Successful Payment

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

#### Payment Requires Authentication (3D Secure)

```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

#### Payment Declined

```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

#### Insufficient Funds

```
Card Number: 4000 0000 0000 9995
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Testing Flow

1. **Start development server**:

   ```bash
   npm run dev
   ```

2. **Start Stripe CLI webhook forwarding** (in separate terminal):

   ```bash
   stripe listen --forward-to localhost:3000/api/payments/webhook
   ```

3. **Complete test payment flow**:
   - Complete quiz
   - Provide email and location
   - View teaser
   - Go to paywall
   - Use test card `4242 4242 4242 4242`
   - Complete payment

4. **Verify in Stripe Dashboard**:
   - Go to [Stripe Dashboard → Payments](https://dashboard.stripe.com/test/payments)
   - Verify payment appears with status "Succeeded"
   - Check webhook events in [Webhooks](https://dashboard.stripe.com/test/webhooks)

5. **Verify in Application**:
   - Check payment status in database
   - Verify report access token created
   - Verify email sent (check Brevo dashboard)

### Testing Webhook Events

You can trigger test webhook events using Stripe CLI:

```bash
# Trigger payment_intent.succeeded
stripe trigger payment_intent.succeeded

# Trigger payment_intent.payment_failed
stripe trigger payment_intent.payment_failed
```

---

## 5. Production Deployment

### Step 1: Switch to Live Mode

1. Complete Stripe account activation (business verification, bank account)
2. Switch to **Live mode** in Stripe Dashboard
3. Get production API keys (see [Environment Variables Configuration](#2-environment-variables-configuration))

### Step 2: Configure Production Webhook

1. Create production webhook endpoint (see [Webhook Configuration](#3-webhook-configuration))
2. Use production webhook signing secret
3. Test webhook with Stripe Dashboard → Webhooks → Send test webhook

### Step 3: Update Vercel Environment Variables

1. Add production Stripe keys to Vercel:
   - `STRIPE_SECRET_KEY` → Production secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → Production publishable key
   - `STRIPE_WEBHOOK_SECRET` → Production webhook secret
2. Ensure all variables are set for **Production** environment
3. Redeploy application

### Step 4: Verify Production Setup

1. **Test with real card** (small amount):
   - Use a real card with small amount (39 lei)
   - Complete payment flow
   - Verify payment in Stripe Dashboard
   - Verify webhook received
   - Verify report access granted

2. **Monitor Stripe Dashboard**:
   - Check [Payments](https://dashboard.stripe.com/payments) for successful payments
   - Check [Webhooks](https://dashboard.stripe.com/webhooks) for webhook delivery
   - Check [Logs](https://dashboard.stripe.com/logs) for any errors

### Step 5: Configure Payment Amount

The payment amount is configured in:

- **File**: `src/modules/payments/payments.service.ts`
- **Variable**: `PAYMENT_AMOUNT_LEI`

```typescript
export const PAYMENT_AMOUNT_LEI = 39; // Can be adjusted to 49
```

To change the amount:

1. Update `PAYMENT_AMOUNT_LEI` in `payments.service.ts`
2. Update display text in paywall page (`src/app/(public)/chestionar/paywall/[quizId]/page.tsx`)
3. Redeploy application

---

## 6. Security Best Practices

### ✅ Implemented Security Measures

1. **Webhook Signature Verification**:
   - All webhooks are verified using Stripe's signature
   - Invalid signatures are rejected
   - Implementation: `src/app/api/payments/webhook/route.ts`

2. **Server-Side Payment Processing**:
   - Payment intents created server-side only
   - Client secret never exposed in client code
   - Implementation: `src/app/actions/payments.ts`

3. **Access Token Validation**:
   - Report access tokens verified on every request
   - Expired tokens rejected
   - Payment status verified before granting access
   - Implementation: `src/modules/payments/payments.service.ts`

4. **Environment Variables**:
   - Secret keys never committed to version control
   - `.env.local` in `.gitignore`
   - Production keys only in Vercel environment variables

### 🔒 Additional Security Recommendations

1. **Rate Limiting**:
   - Consider adding rate limiting to payment creation endpoint
   - Prevent payment spam/abuse

2. **IP Whitelisting** (Optional):
   - Whitelist Stripe webhook IPs for additional security
   - [Stripe Webhook IPs](https://stripe.com/docs/ips)

3. **HTTPS Only**:
   - Ensure all payment pages use HTTPS
   - Vercel automatically provides HTTPS in production

4. **PCI Compliance**:
   - Stripe handles PCI compliance (we never store card details)
   - No card data touches our servers
   - All payment processing via Stripe Elements

---

## 7. Troubleshooting

### Common Issues

#### Issue: "STRIPE_SECRET_KEY environment variable is not set"

**Solution**:

1. Check `.env.local` file exists in project root
2. Verify `STRIPE_SECRET_KEY` is set
3. Restart development server after adding environment variables
4. For production, check Vercel environment variables

#### Issue: Webhook not receiving events

**Solution**:

1. **Development**: Ensure Stripe CLI is running:

   ```bash
   stripe listen --forward-to localhost:3000/api/payments/webhook
   ```

2. **Production**:
   - Verify webhook endpoint URL is correct in Stripe Dashboard
   - Check webhook signing secret matches in Vercel
   - Check webhook delivery logs in Stripe Dashboard
   - Verify endpoint returns 200 status code

3. **Check webhook signature verification**:
   - Webhook endpoint verifies signature automatically
   - Invalid signatures are rejected (check server logs)

#### Issue: Payment succeeds but report access not granted

**Solution**:

1. Check webhook was received (Stripe Dashboard → Webhooks)
2. Check server logs for webhook processing errors
3. Verify payment status in database:
   ```sql
   SELECT * FROM payments WHERE quiz_id = 'your-quiz-id';
   ```
4. Check report access was created:
   ```sql
   SELECT * FROM report_access WHERE payment_id = 'your-payment-id';
   ```

#### Issue: "Payment intent not found" error

**Solution**:

1. Verify `paymentProviderId` is stored in database
2. Check payment intent exists in Stripe Dashboard
3. Verify Stripe API key is correct (test vs production)

#### Issue: 3D Secure authentication not working

**Solution**:

1. 3D Secure is handled automatically by Stripe Elements
2. Test with card `4000 0025 0000 3155` to trigger 3D Secure
3. Ensure `redirect: "if_required"` in payment confirmation (already implemented)

#### Issue: Currency not supported (RON)

**Solution**:

1. Verify RON is enabled in Stripe Dashboard (Settings → Business settings → Currencies)
2. Check account is in Romania or RON-enabled region
3. Contact Stripe support if RON is not available

### Debugging Tools

1. **Stripe Dashboard**:
   - [Payments](https://dashboard.stripe.com/payments) - View all payments
   - [Webhooks](https://dashboard.stripe.com/webhooks) - View webhook events
   - [Logs](https://dashboard.stripe.com/logs) - View API request logs
   - [Events](https://dashboard.stripe.com/events) - View all events

2. **Stripe CLI**:

   ```bash
   # View webhook events
   stripe events list

   # View payment intents
   stripe payment_intents list

   # Trigger test events
   stripe trigger payment_intent.succeeded
   ```

3. **Application Logs**:
   - Check server logs for webhook processing
   - Check browser console for client-side errors
   - Check Vercel function logs for production errors

---

## 8. API Reference

### Payment Service Functions

**Location**: `src/modules/payments/payments.service.ts`

#### `createStripePaymentIntent(input: CreatePaymentInput)`

Creates a payment intent in Stripe and payment record in database.

**Parameters**:

- `input.quizId`: Quiz ID (required)
- `input.userId`: User ID (optional, for authenticated users)

**Returns**:

```typescript
{
  payment: Payment;
  clientSecret: string; // For Stripe Elements
}
```

**Usage**:

```typescript
import { createStripePaymentIntent } from "@/modules/payments/payments.service";

const { payment, clientSecret } = await createStripePaymentIntent({
  quizId: "quiz-id",
  userId: "user-id", // optional
});
```

#### `verifyStripePayment(paymentId: string)`

Verifies payment status with Stripe and updates database.

**Parameters**:

- `paymentId`: Payment ID

**Returns**: Updated `Payment` object

#### `handleStripeWebhook(event: Stripe.Event)`

Processes Stripe webhook events.

**Parameters**:

- `event`: Stripe webhook event

**Returns**:

```typescript
{
  payment: Payment | null;
  reportAccess: ReportAccess | null;
}
```

### Server Actions

**Location**: `src/app/actions/payments.ts`

#### `createPaymentAction(input: { quizId: string })`

Server Action to create payment intent.

**Usage**:

```typescript
"use client";
import { createPaymentAction } from "@/app/actions/payments";

const result = await createPaymentAction({ quizId: "quiz-id" });
if (result.success && result.clientSecret) {
  // Use clientSecret with Stripe Elements
}
```

### API Routes

#### `POST /api/payments/webhook`

Webhook endpoint for Stripe events.

**Headers**:

- `stripe-signature`: Webhook signature (required)

**Body**: Raw webhook event from Stripe

**Response**: `{ received: true, paymentId: string }`

#### `GET /api/payments/[paymentId]/access-token`

Check if access token is available for a payment.

**Response**:

```typescript
{
  accessToken: string | null;
  available: boolean;
  quizId?: string;
}
```

### Client Components

#### `PaymentForm`

**Location**: `src/components/features/payments/PaymentForm.tsx`

Stripe Elements payment form component.

**Props**:

- `quizId`: Quiz ID (required)
- `onPaymentCreated?`: Callback when payment is created

**Usage**:

```tsx
import PaymentForm from "@/components/features/payments/PaymentForm";
import { StripeProvider } from "@/components/providers/StripeProvider";

<StripeProvider>
  <PaymentForm quizId={quizId} />
</StripeProvider>;
```

---

## Payment Flow Diagram

```
User completes quiz
    ↓
User provides email
    ↓
User views teaser
    ↓
User clicks "Deblochează Raportul"
    ↓
PaymentForm component loads
    ↓
createPaymentAction() called
    ↓
Payment intent created in Stripe
    ↓
Client secret returned to frontend
    ↓
User enters card details (Stripe Elements)
    ↓
User submits payment
    ↓
Stripe processes payment
    ↓
Payment succeeds → Redirect to success page
    ↓
Stripe sends webhook → /api/payments/webhook
    ↓
Webhook updates payment status
    ↓
Report access token created
    ↓
Email sent with report link
    ↓
User accesses report via access token
```

---

## Support & Resources

### Stripe Documentation

- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Payment Intents](https://stripe.com/docs/payments/payment-intents)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Security](https://stripe.com/docs/security)

### Internal Documentation

- `docs/PRICING_PARENTS_PHASE4_SUMMARY.md` - Payment flow implementation details
- `src/modules/payments/payments.service.ts` - Payment service implementation
- `src/app/api/payments/webhook/route.ts` - Webhook handler implementation

### Getting Help

1. **Stripe Support**: [support.stripe.com](https://support.stripe.com)
2. **Stripe Status**: [status.stripe.com](https://status.stripe.com)
3. **Check Application Logs**: Server logs, Vercel function logs
4. **Check Stripe Dashboard**: Payments, Webhooks, Logs sections

---

## Checklist

### Development Setup

- [ ] Stripe account created
- [ ] Test mode API keys obtained
- [ ] Environment variables configured in `.env.local`
- [ ] Stripe CLI installed and configured
- [ ] Webhook forwarding set up for local development
- [ ] Test payment completed successfully
- [ ] Webhook events received and processed

### Production Deployment

- [ ] Stripe account activated (business verification complete)
- [ ] Production API keys obtained
- [ ] Production webhook endpoint created
- [ ] Environment variables configured in Vercel
- [ ] Webhook signing secret added to Vercel
- [ ] Test payment completed in production
- [ ] Webhook events received in production
- [ ] Payment amount verified (39 lei)
- [ ] Email notifications working

### Security

- [ ] Webhook signature verification working
- [ ] Secret keys not committed to version control
- [ ] HTTPS enabled in production
- [ ] Payment processing server-side only
- [ ] Access tokens validated on every request

---

**Last Updated**: January 2025  
**Status**: Complete - Ready for production use
