# Brevo Quick Start

Quick reference for setting up Brevo email service.

## 1. Create Account

1. Go to [brevo.com](https://www.brevo.com) and sign up
2. Verify your email address

## 2. Get API Key

1. Go to [API Settings](https://app.brevo.com/settings/keys/api)
2. Click "Generate a new API key"
3. Name it "Yuvoo Development"
4. Copy the API key (shown only once!)

## 3. Verify Sender Email

1. Go to [Senders](https://app.brevo.com/settings/senders)
2. Click "Add a sender"
3. Add `noreply@yuvoo.ro` (or your email)
4. Verify the email address

## 4. Configure Environment

Add to `.env.local`:

```bash
BREVO_API_KEY="xkeysib-your-api-key-here"
BREVO_SENDER_EMAIL="noreply@yuvoo.ro"
BREVO_SENDER_NAME="Yuvoo"
```

## 5. Test Configuration

```bash
npx tsx src/lib/integrations/brevo/test-brevo.ts
```

## Full Guide

See `docs/BREVO_SETUP_GUIDE.md` for detailed instructions.

## Next Steps

After setup is complete, proceed with email integration:

- See `docs/BREVO_EMAIL_INTEGRATION_PLAN.md` for implementation plan
