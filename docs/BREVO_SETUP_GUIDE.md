# Brevo Email Service Setup Guide

This guide walks you through setting up a Brevo account and configuring it for the Yuvoo platform.

## Overview

**Brevo** (formerly Sendinblue) is a transactional email service that will handle all email notifications for:

- Booking confirmations
- Booking cancellations
- Booking reminders
- Quiz result summaries

**Free Tier**: 300 emails/day (perfect for MVP and testing)

---

## Step 1: Create Brevo Account

### 1.1 Sign Up

1. Go to [Brevo Website](https://www.brevo.com)
2. Click **"Sign up free"** or **"Get started"**
3. Fill in your information:
   - Email address
   - Password
   - Company name (optional): "Yuvoo"
   - Country: Romania

### 1.2 Verify Your Email

1. Check your email inbox
2. Click the verification link in the email from Brevo
3. Complete the email verification process

### 1.3 Complete Account Setup

1. Log in to your Brevo account
2. Complete any additional setup steps (if prompted)
3. You'll be taken to the Brevo dashboard

---

## Step 2: Get API Key

### 2.1 Navigate to API Keys

1. In the Brevo dashboard, click on your **profile icon** (top right)
2. Select **"SMTP & API"** from the dropdown menu
   - Or go directly to: [Brevo SMTP & API Settings](https://app.brevo.com/settings/keys/api)

### 2.2 Create API Key

1. Scroll down to the **"API Keys"** section
2. Click **"Generate a new API key"**
3. Enter a name for the key (e.g., "Yuvoo Production" or "Yuvoo Development")
4. Select permissions:
   - ✅ **Email** (required for sending emails)
   - ✅ **Account** (optional, for account management)
5. Click **"Generate"**

### 2.3 Copy API Key

⚠️ **IMPORTANT**: The API key will only be shown once. Copy it immediately!

1. Copy the API key (it will look like: `xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
2. **Save it securely** - you won't be able to see it again
3. If you lose it, you'll need to generate a new one

**Example API Key Format**:

```
xkeysib-1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef-1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

---

## Step 3: Configure Sender Information

### 3.1 Set Up Sender Email

1. In Brevo dashboard, go to **"Senders & IP"** → **"Senders"**
   - Direct link: [Brevo Senders](https://app.brevo.com/settings/senders)
2. Click **"Add a sender"**
3. Fill in the form:
   - **Email**: `noreply@yuvoo.ro` (or your domain email)
   - **Name**: `Yuvoo`
   - **Company**: `Yuvoo`
   - **Address**: Your company address (optional)
   - **City**: `București` (or your city)
   - **Country**: `Romania`
4. Click **"Save"**

### 3.2 Verify Sender Email

⚠️ **IMPORTANT**: You must verify your sender email before sending emails.

1. Brevo will send a verification email to `noreply@yuvoo.ro`
2. Check the email inbox
3. Click the verification link in the email
4. Wait for verification status to change to **"Verified"** (green checkmark)

**Note**: If you don't have access to the email inbox, you can:

- Use a domain you control
- Use Brevo's test email feature for development
- Set up email forwarding

### 3.3 Alternative: Use Brevo Test Email (Development Only)

For development and testing, you can use Brevo's test email feature:

- Sender email: Use your verified personal email
- This is fine for development, but use a proper domain email for production

---

## Step 4: Configure Environment Variables

### 4.1 Create/Update `.env.local`

In your project root, create or update `.env.local`:

```bash
# Brevo Email Service
BREVO_API_KEY="xkeysib-your-actual-api-key-here"
BREVO_SENDER_EMAIL="noreply@yuvoo.ro"
BREVO_SENDER_NAME="Yuvoo"
```

### 4.2 Environment Variable Details

**BREVO_API_KEY** (Required)

- Your Brevo API key from Step 2.3
- Server-side only (never expose to client)
- Format: `xkeysib-...`

**BREVO_SENDER_EMAIL** (Required)

- The verified sender email from Step 3.1
- Must be verified in Brevo dashboard
- Example: `noreply@yuvoo.ro`

**BREVO_SENDER_NAME** (Required)

- Display name for emails
- Will appear as "From: Yuvoo <noreply@yuvoo.ro>"
- Example: `Yuvoo`

### 4.3 Verify Environment Variables

After adding the variables, restart your development server:

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

---

## Step 5: Test Configuration

### 5.1 Run Test Script

We've created a test script to verify your Brevo configuration:

```bash
npx tsx src/lib/integrations/brevo/test-brevo.ts
```

This script will:

- ✅ Check if environment variables are set
- ✅ Test Brevo API connection
- ✅ Send a test email to verify everything works
- ✅ Display success/error messages

### 5.2 Expected Output

**Success**:

```
✅ Brevo configuration test passed!
✅ Environment variables are set correctly
✅ Brevo API connection successful
✅ Test email sent successfully
```

**Error**:
If you see errors, check:

- API key is correct and copied completely
- Sender email is verified in Brevo dashboard
- Environment variables are in `.env.local` (not `.env`)
- Server was restarted after adding environment variables

### 5.3 Manual Test

You can also test by creating a booking or completing a quiz (once email integration is implemented). Check your email inbox for the notification.

---

## Step 6: Production Setup

### 6.1 Production API Key

1. Create a separate API key for production:
   - Name: "Yuvoo Production"
   - Same permissions as development key
2. Store it securely (password manager, secrets manager)

### 6.2 Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `BREVO_API_KEY` = Your production API key
   - `BREVO_SENDER_EMAIL` = `noreply@yuvoo.ro`
   - `BREVO_SENDER_NAME` = `Yuvoo`
4. Select environment: **Production** (and **Preview** if needed)
5. Click **Save**

### 6.3 Domain Email Setup (Production)

For production, you should:

1. Use a proper domain email (`noreply@yuvoo.ro`)
2. Set up SPF and DKIM records (Brevo will provide instructions)
3. Verify the domain in Brevo dashboard
4. This improves email deliverability

---

## Troubleshooting

### Issue: "BREVO_API_KEY environment variable is required"

**Solution**:

- Check that `.env.local` exists in project root
- Verify the variable name is exactly `BREVO_API_KEY`
- Restart the development server after adding variables
- Check for typos or extra spaces

### Issue: "Invalid API key"

**Solution**:

- Verify the API key is copied completely (it's very long)
- Check for extra spaces or line breaks
- Generate a new API key if needed
- Ensure you're using the correct key (development vs production)

### Issue: "Sender email not verified"

**Solution**:

- Go to Brevo dashboard → Senders
- Check verification status
- Click "Resend verification email" if needed
- Verify the email address in your inbox
- For development, use a verified personal email

### Issue: "Email not received"

**Solution**:

- Check spam/junk folder
- Verify recipient email address is correct
- Check Brevo dashboard → Statistics for delivery status
- Verify sender email is verified
- Check Brevo account limits (free tier: 300 emails/day)

### Issue: "Rate limit exceeded"

**Solution**:

- Free tier limit: 300 emails/day
- Wait 24 hours or upgrade to paid plan
- Monitor usage in Brevo dashboard → Statistics

---

## Brevo Dashboard Features

### Statistics & Analytics

- **Dashboard**: View email sending statistics
- **Statistics**: Track sent, delivered, opened, clicked emails
- **Reports**: Detailed email performance reports

### Email Templates (Future)

- Brevo supports email templates in the dashboard
- Can be used for advanced personalization
- For now, we use inline HTML templates

### Webhooks (Future)

- Set up webhooks for email event tracking
- Track opens, clicks, bounces, unsubscribes
- Useful for analytics and user engagement

---

## Security Best Practices

1. **Never commit API keys to Git**
   - `.env.local` is in `.gitignore`
   - Never share API keys in code or messages

2. **Use different keys for development and production**
   - Separate API keys for each environment
   - Easier to revoke if compromised

3. **Rotate API keys regularly**
   - Generate new keys periodically
   - Revoke old keys in Brevo dashboard

4. **Monitor API usage**
   - Check Brevo dashboard regularly
   - Set up alerts for unusual activity

5. **Verify sender emails**
   - Always verify sender emails before production
   - Use proper domain emails for production

---

## Next Steps

After completing this setup:

1. ✅ **Test the configuration** using the test script
2. ✅ **Proceed with Phase 1** of email integration (see `docs/BREVO_EMAIL_INTEGRATION_PLAN.md`)
3. ✅ **Implement email templates** and services
4. ✅ **Test email sending** with real bookings and quizzes

---

## Resources

- **Brevo Documentation**: [https://developers.brevo.com/](https://developers.brevo.com/)
- **Brevo API Reference**: [https://developers.brevo.com/reference](https://developers.brevo.com/reference)
- **Brevo Dashboard**: [https://app.brevo.com/](https://app.brevo.com/)
- **Brevo Support**: [https://help.brevo.com/](https://help.brevo.com/)

---

## Checklist

- [ ] Brevo account created
- [ ] Email verified
- [ ] API key generated and copied
- [ ] Sender email added and verified
- [ ] Environment variables added to `.env.local`
- [ ] Test script run successfully
- [ ] Test email received
- [ ] Production API key created (for deployment)
- [ ] Vercel environment variables configured (for deployment)

---

**Last Updated**: January 2025  
**Status**: Ready for Setup
