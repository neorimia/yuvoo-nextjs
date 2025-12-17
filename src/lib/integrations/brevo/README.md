# Brevo Email Integration

Complete email service integration using Brevo (formerly Sendinblue) for transactional emails.

## Overview

This module provides a complete email infrastructure for sending transactional emails in the Yuvoo platform. All emails are sent in Romanian language and follow Yuvoo branding guidelines.

## Files

- `client.ts` - Enhanced Brevo client with error handling, retry logic, and type-safe email sending
- `templates.ts` - HTML email templates (responsive, Bootstrap-based) for all email types
- `email.service.ts` - High-level email service functions
- `types.ts` - TypeScript types for email integration
- `index.ts` - Central export file
- `test-brevo.ts` - Configuration test script

## Setup

See `docs/BREVO_SETUP_GUIDE.md` for complete setup instructions.

**Quick Setup**:

1. Create Brevo account at [brevo.com](https://www.brevo.com)
2. Get API key from [Brevo API Settings](https://app.brevo.com/settings/keys/api)
3. Verify sender email in [Brevo Senders](https://app.brevo.com/settings/senders)
4. Add to `.env.local`:
   ```bash
   BREVO_API_KEY="your-api-key"
   BREVO_SENDER_EMAIL="noreply@yuvoo.ro"
   BREVO_SENDER_NAME="Yuvoo"
   ```
5. Test configuration:
   ```bash
   npx tsx src/lib/integrations/brevo/test-brevo.ts
   ```

## Email Templates

### Available Templates

#### Booking Emails

- **Booking Confirmation** - Sent when booking is created
- **Booking Cancellation** - Sent when booking is cancelled
- **Booking Reminder** - Sent 24 hours before scheduled booking

#### Quiz Emails

- **Quiz Results** - Sent after quiz completion with top 3 recommendations

#### Onboarding Emails

- **Welcome Email** - Sent to new users after registration

#### Verification Emails

- **Club Verification Status** - Sent when club verification status changes
- **Doctor Verification Status** - Sent when doctor verification status changes

### Template Features

- ✅ Responsive HTML design (mobile-friendly)
- ✅ Bootstrap-based styling (consistent with platform)
- ✅ Yuvoo branding (colors, logo)
- ✅ Romanian language content
- ✅ Plain text fallback versions
- ✅ Personalized greetings
- ✅ Clear call-to-action buttons
- ✅ Footer with contact info

## Usage

### Booking Emails

```typescript
import {
  sendBookingConfirmation,
  sendBookingCancellation,
  sendBookingReminder,
} from "@/lib/integrations/brevo";

// Send confirmation (automatically called by bookings service)
await sendBookingConfirmation(booking, user, club, child);

// Send cancellation (automatically called by bookings service)
await sendBookingCancellation(booking, user, club, child);

// Send reminder (for future cron job)
await sendBookingReminder(booking, user, club, child);
```

### Quiz Emails

```typescript
import { sendQuizResults } from "@/lib/integrations/brevo";

// Send quiz results (automatically called by quiz action)
await sendQuizResults(quizResult, child, userEmail, user);
```

### Welcome Emails

```typescript
import { sendWelcomeEmail } from "@/lib/integrations/brevo";

// Send welcome email to new user
await sendWelcomeEmail(user);
```

### Verification Status Emails

```typescript
import { sendClubVerificationStatus, sendDoctorVerificationStatus } from "@/lib/integrations/brevo";

// Send club verification status update
await sendClubVerificationStatus(
  clubName,
  "approved", // or "rejected" or "in_review"
  user,
  rejectionReason // optional
);

// Send doctor verification status update
await sendDoctorVerificationStatus(
  doctorName,
  "approved", // or "rejected" or "in_review"
  user,
  rejectionReason // optional
);
```

## Email Service Functions

### Core Functions

- `sendEmail(params)` - Low-level email sending with retry logic
- `isValidEmail(email)` - Email validation helper
- `getSenderInfo()` - Get default sender information

### High-Level Functions

- `sendBookingConfirmation()` - Booking confirmation email
- `sendBookingCancellation()` - Booking cancellation email
- `sendBookingReminder()` - Booking reminder email
- `sendQuizResults()` - Quiz results email
- `sendWelcomeEmail()` - Welcome email for new users
- `sendClubVerificationStatus()` - Club verification status update
- `sendDoctorVerificationStatus()` - Doctor verification status update

## Error Handling

All email functions are **non-blocking**:

- Email failures don't affect core operations (bookings, quiz submissions, etc.)
- Errors are logged for debugging
- Retry logic handles transient failures (up to 3 retries with exponential backoff)

## Email Content

All email content is in **Romanian language** and follows:

- Brand voice: 70% Warm & Supportive, 30% Expert & Confident
- Clear, friendly, and empathetic tone
- Actionable CTAs
- Consistent with platform UI/UX

## Template Structure

All templates follow this structure:

1. **Header** - Yuvoo branding with gradient background
2. **Greeting** - Personalized with user's first name
3. **Main Content** - Romanian text with relevant information
4. **Call-to-Action** - Primary and secondary buttons
5. **Footer** - Contact info and unsubscribe link

## Integration Points

### Automatic Email Sending

- **Bookings**: Emails sent automatically in `bookings.service.ts`
- **Quiz**: Emails sent automatically in `app/actions/quiz.ts`
- **Welcome**: Can be integrated in user registration flow
- **Verification**: Can be integrated in admin verification workflow

### Manual Email Sending

For custom use cases, import and call email service functions directly.

## Testing

### Test Configuration

```bash
npx tsx src/lib/integrations/brevo/test-brevo.ts
```

### Test Email Sending

1. Create a booking → Check for confirmation email
2. Cancel a booking → Check for cancellation email
3. Complete a quiz → Check for results email
4. Verify all emails are in Romanian
5. Verify all links work correctly
6. Test on multiple email clients (Gmail, Outlook, etc.)

## Environment Variables

**Required**:

- `BREVO_API_KEY` - Brevo API key (server-side only)
- `BREVO_SENDER_EMAIL` - Verified sender email address
- `BREVO_SENDER_NAME` - Display name for emails

**Optional**:

- `NEXT_PUBLIC_APP_URL` - Base URL for email links (defaults to "https://yuvoo.ro")

## Performance

- Emails sent asynchronously (non-blocking)
- Retry logic with exponential backoff
- Rate limiting protection
- Caching ready for future optimization

## Security

- API key stored server-side only
- Email validation before sending
- No sensitive data in email content
- Secure links to platform pages

## Future Enhancements

- Email preferences (user opt-out)
- Scheduled emails (reminders, digests)
- Email event tracking (webhooks)
- A/B testing for email content
- Template management in Brevo dashboard

---

**Last Updated**: January 2025  
**Status**: Production Ready
