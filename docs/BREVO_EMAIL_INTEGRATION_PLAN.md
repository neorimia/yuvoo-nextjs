# Brevo Email Integration Plan

## Overview

This document outlines the comprehensive plan for implementing Brevo email integration in the Yuvoo platform. The integration will enable transactional emails for bookings, quiz results, and other user notifications.

**Status**: Planning Phase  
**Priority**: Week 15-16 (Polish & Deploy)  
**Estimated Time**: 2-3 days

---

## Current State

### ✅ Completed

- Brevo package installed (`@getbrevo/brevo ^2.2.0`, version 2.5.0)
- Basic client setup (`src/lib/integrations/brevo/client.ts`)
- Environment variables documented
- Integration structure planned

### ⏳ Pending

- Email templates implementation
- Booking notification integration
- Quiz result email summaries
- Error handling and retry logic
- Testing and validation

---

## Email Use Cases

### 1. Booking Notifications

**Booking Confirmation** (`sendConfirmation`)

- Triggered when: Booking is created successfully
- Recipients: Parent (user who made booking)
- Content: Booking details, date/time, club/doctor info, next steps
- Language: Romanian

**Booking Cancellation** (`sendCancellation`)

- Triggered when: Booking is cancelled (by user or admin)
- Recipients: Parent (user who made booking)
- Content: Cancellation confirmation, refund info (if applicable), alternative options
- Language: Romanian

**Booking Reminder** (`sendReminder`)

- Triggered when: 24 hours before scheduled booking
- Recipients: Parent (user who made booking)
- Content: Reminder of upcoming booking, date/time, location/online link
- Language: Romanian

### 2. Quiz Result Summaries

**Quiz Results Email** (`sendQuizResults`)

- Triggered when: Quiz is completed and results are generated
- Recipients: Parent (if authenticated) or email provided during quiz
- Content: Top 3 sport recommendations, match scores, reasoning, specialist recommendations (if any), link to full results
- Language: Romanian

### 3. Future Use Cases (Phase 2)

- Welcome emails (onboarding)
- Profile verification notifications
- Club/doctor verification status updates
- Weekly digest emails
- Password reset emails (handled by Stack Auth)

---

## Implementation Plan

### Phase 1: Core Email Infrastructure (Day 1)

#### 1.1 Enhance Brevo Client (`src/lib/integrations/brevo/client.ts`)

**Tasks**:

- [ ] Add error handling wrapper
- [ ] Add retry logic for failed requests
- [ ] Add rate limiting protection
- [ ] Add logging for email sends
- [ ] Add type-safe email sending function

**Implementation Details**:

```typescript
// Enhanced client with error handling
export async function sendEmail(params: EmailParams): Promise<EmailResult>;
// EmailParams interface with to, subject, htmlContent, etc.
// EmailResult interface with success, messageId, error
```

#### 1.2 Create Email Templates Module (`src/lib/integrations/brevo/templates.ts`)

**Tasks**:

- [ ] Create template functions for each email type
- [ ] Implement HTML email templates (responsive, Bootstrap-based)
- [ ] Add Romanian content from COPY_LIBRARY.md
- [ ] Add template variables (user name, booking details, etc.)
- [ ] Create plain text fallback versions

**Templates Needed**:

1. `bookingConfirmationTemplate(booking, user, entity)`
2. `bookingCancellationTemplate(booking, user, entity)`
3. `bookingReminderTemplate(booking, user, entity)`
4. `quizResultsTemplate(quizResult, child, user)`

**Template Structure**:

- Header with Yuvoo logo
- Personalized greeting
- Main content (Romanian)
- Call-to-action buttons
- Footer with contact info and unsubscribe link

#### 1.3 Create Email Service (`src/lib/integrations/brevo/email.service.ts`)

**Tasks**:

- [ ] Create high-level email sending service
- [ ] Integrate templates with Brevo client
- [ ] Add email validation
- [ ] Add sender configuration (from email/name)
- [ ] Add error handling and logging

**Functions**:

```typescript
export async function sendBookingConfirmation(
  booking: Booking,
  user: User,
  entity: Club | Doctor
): Promise<void>;
export async function sendBookingCancellation(
  booking: Booking,
  user: User,
  entity: Club | Doctor
): Promise<void>;
export async function sendBookingReminder(
  booking: Booking,
  user: User,
  entity: Club | Doctor
): Promise<void>;
export async function sendQuizResults(
  quizResult: QuizResult,
  child: Child,
  user?: User
): Promise<void>;
```

---

### Phase 2: Booking Notifications Integration (Day 2)

#### 2.1 Update Bookings Notifications (`src/modules/bookings/bookings.notifications.ts`)

**Tasks**:

- [ ] Import email service
- [ ] Implement `sendConfirmation()` function
- [ ] Implement `sendCancellation()` function
- [ ] Implement `sendReminder()` function
- [ ] Add error handling (don't fail booking if email fails)
- [ ] Add logging for debugging

**Implementation Pattern**:

```typescript
export async function sendConfirmation(booking: Booking): Promise<void> {
  try {
    // Fetch user and entity (club/doctor) data
    // Call email service
    // Log success
  } catch (error) {
    // Log error but don't throw (booking should succeed even if email fails)
    console.error("Failed to send booking confirmation email:", error);
  }
}
```

#### 2.2 Integrate with Booking Service (`src/modules/bookings/bookings.service.ts`)

**Tasks**:

- [ ] Call `sendConfirmation()` after successful booking creation
- [ ] Call `sendCancellation()` when booking is cancelled
- [ ] Ensure email sending doesn't block booking operations
- [ ] Add error handling

**Integration Points**:

- `createBooking()` → Send confirmation email
- `cancelBooking()` → Send cancellation email

#### 2.3 Create Booking Reminder Job (Future: Cron Job)

**Tasks**:

- [ ] Create API route for booking reminders (`/api/cron/booking-reminders`)
- [ ] Query bookings scheduled for tomorrow
- [ ] Send reminder emails
- [ ] Add to Vercel cron jobs configuration

**Note**: This can be implemented later as a separate task. For MVP, focus on confirmation and cancellation emails.

---

### Phase 3: Quiz Results Email Integration (Day 2-3)

#### 3.1 Create Quiz Email Service (`src/modules/quiz/quiz.email.ts`)

**Tasks**:

- [ ] Create `sendQuizResultsEmail()` function
- [ ] Fetch quiz result data
- [ ] Fetch child and user data
- [ ] Format email with top recommendations
- [ ] Include link to full results page
- [ ] Handle unauthenticated users (email from quiz submission)

**Implementation**:

```typescript
export async function sendQuizResultsEmail(
  quizResult: QuizResult,
  child: Child,
  userEmail: string,
  userName?: string
): Promise<void>;
```

#### 3.2 Integrate with Quiz Service (`src/modules/quiz/quiz.service.ts`)

**Tasks**:

- [ ] Call `sendQuizResultsEmail()` after quiz results are generated
- [ ] Handle both authenticated and unauthenticated users
- [ ] Add error handling (don't fail quiz if email fails)
- [ ] Add logging

**Integration Point**:

- `submitQuiz()` → After results are saved, send email

#### 3.3 Update Quiz Server Action (`src/app/actions/quiz.ts`)

**Tasks**:

- [ ] Extract user email from session or quiz input
- [ ] Pass email to quiz service
- [ ] Ensure email sending is non-blocking

---

### Phase 4: Testing & Validation (Day 3)

#### 4.1 Unit Tests

**Tasks**:

- [ ] Test email template generation
- [ ] Test email service functions
- [ ] Test error handling
- [ ] Test Romanian content rendering

#### 4.2 Integration Tests

**Tasks**:

- [ ] Test booking confirmation email flow
- [ ] Test booking cancellation email flow
- [ ] Test quiz results email flow
- [ ] Test with real Brevo API (test mode)
- [ ] Verify emails arrive correctly
- [ ] Verify Romanian content is correct
- [ ] Verify links work correctly

#### 4.3 Manual Testing Checklist

**Booking Emails**:

- [ ] Create club trial booking → Verify confirmation email received
- [ ] Create doctor consultation booking → Verify confirmation email received
- [ ] Cancel booking → Verify cancellation email received
- [ ] Verify email content is in Romanian
- [ ] Verify all links work
- [ ] Verify email renders correctly on mobile

**Quiz Emails**:

- [ ] Complete quiz as authenticated user → Verify results email received
- [ ] Complete quiz as unauthenticated user → Verify results email received
- [ ] Verify top 3 recommendations displayed
- [ ] Verify match scores displayed
- [ ] Verify link to results page works
- [ ] Verify email content is in Romanian

**Error Handling**:

- [ ] Test with invalid email address
- [ ] Test with missing Brevo API key
- [ ] Test with network failure
- [ ] Verify booking/quiz operations succeed even if email fails

---

## Technical Specifications

### Environment Variables

**Required**:

```bash
BREVO_API_KEY="your-brevo-api-key"  # Server-side only
BREVO_SENDER_EMAIL="noreply@yuvoo.ro"
BREVO_SENDER_NAME="Yuvoo"
```

**Optional** (for future):

```bash
BREVO_WEBHOOK_SECRET="webhook-secret"  # For email event tracking
```

### Email Template Requirements

**Design**:

- Responsive HTML (mobile-friendly)
- Bootstrap-based styling (consistent with platform)
- Yuvoo branding (colors, logo)
- Clear typography hierarchy
- Accessible (WCAG compliant)

**Content**:

- All text in Romanian
- Personalized greetings (use user's first name)
- Clear call-to-action buttons
- Footer with contact info and unsubscribe link
- Plain text fallback version

**Variables**:

- User name (first name)
- Booking details (date, time, location)
- Club/doctor information
- Quiz recommendations
- Links to platform pages

### Error Handling Strategy

**Principles**:

1. Email failures should not block core operations (bookings, quiz submissions)
2. All errors should be logged for debugging
3. Retry logic for transient failures (network issues)
4. Rate limiting to prevent API abuse

**Error Types**:

- Invalid email address → Log and skip
- Brevo API errors → Log and retry (up to 3 times)
- Network failures → Log and retry
- Missing configuration → Log error and skip

### Performance Considerations

**Optimization**:

- Send emails asynchronously (don't block user requests)
- Batch email sends when possible
- Cache email templates
- Use Brevo's template API for better performance (future)

**Rate Limiting**:

- Brevo free tier: 300 emails/day
- Monitor email sending rate
- Implement queue system if needed (future)

---

## File Structure

```
src/
├── lib/
│   └── integrations/
│       └── brevo/
│           ├── client.ts              # Enhanced Brevo client
│           ├── templates.ts           # Email templates (HTML + text)
│           ├── email.service.ts       # High-level email service
│           └── types.ts               # Email-related TypeScript types
│
├── modules/
│   ├── bookings/
│   │   └── bookings.notifications.ts  # Updated with email integration
│   └── quiz/
│       └── quiz.email.ts              # Quiz email service
│
└── app/
    └── api/
        └── cron/
            └── booking-reminders/      # Future: Cron job for reminders
                └── route.ts
```

---

## Dependencies

**Existing**:

- `@getbrevo/brevo ^2.2.0` ✅ (already installed)

**No Additional Dependencies Required**

---

## Romanian Content Reference

**Email Subjects** (from `docs/COPY_LIBRARY.md`):

- Booking: "Confirmare rezervare - [Club/Doctor Name]"
- Cancellation: "Anulare rezervare - [Club/Doctor Name]"
- Reminder: "Reamintire rezervare - [Club/Doctor Name]"
- Quiz: "Rezultatele chestionarului AI - Recomandări personalizate"

**Email Greetings**:

- "Salut [Nume],"
- "Bună [Nume],"
- "Dragă [Nume],"

**Email Closings**:

- "Cu drag, Echipa Yuvoo"
- "Spor la descoperiri! Echipa Yuvoo"
- "Împreună pentru copiii tăi, Echipa Yuvoo"

**Full Content**: See `docs/COPY_LIBRARY.md` section "Email Templates" for complete Romanian copy.

---

## Success Criteria

### Functional Requirements

- ✅ Booking confirmation emails sent automatically
- ✅ Booking cancellation emails sent automatically
- ✅ Quiz result emails sent automatically
- ✅ All emails in Romanian language
- ✅ All emails include correct information
- ✅ All links in emails work correctly
- ✅ Emails render correctly on mobile devices

### Non-Functional Requirements

- ✅ Email sending doesn't block core operations
- ✅ Error handling prevents failures from affecting users
- ✅ Logging enables debugging
- ✅ Performance: Emails sent within 5 seconds
- ✅ Reliability: 95%+ email delivery rate

### Quality Requirements

- ✅ All Romanian content is grammatically correct
- ✅ Email templates match Yuvoo branding
- ✅ Emails are accessible (WCAG compliant)
- ✅ Code follows project patterns (service layer, error handling)

---

## Future Enhancements (Phase 2)

1. **Email Templates in Brevo Dashboard**
   - Move templates to Brevo for easier editing
   - Use template IDs instead of inline HTML

2. **Email Event Tracking**
   - Webhook integration for open/click tracking
   - Analytics dashboard for email performance

3. **Advanced Features**:
   - Email preferences (user can opt-out)
   - Scheduled emails (reminders, digests)
   - A/B testing for email content
   - Personalization based on user behavior

4. **Additional Email Types**:
   - Welcome emails (onboarding)
   - Profile verification notifications
   - Club/doctor verification status updates
   - Weekly digest emails

---

## Testing Strategy

### Development Testing

1. Use Brevo test mode (sandbox)
2. Send test emails to developer email
3. Verify content and formatting
4. Test error scenarios

### Staging Testing

1. Configure Brevo with staging API key
2. Test full email flows
3. Verify Romanian content
4. Test on multiple email clients (Gmail, Outlook, etc.)

### Production Testing

1. Start with low volume
2. Monitor email delivery rates
3. Monitor error logs
4. Gather user feedback

---

## Rollout Plan

### Phase 1: Core Infrastructure (Day 1)

- Implement email client and templates
- Test with manual email sends

### Phase 2: Booking Integration (Day 2)

- Integrate booking confirmation emails
- Integrate booking cancellation emails
- Test booking flow end-to-end

### Phase 3: Quiz Integration (Day 2-3)

- Integrate quiz results emails
- Test quiz flow end-to-end

### Phase 4: Testing & Polish (Day 3)

- Comprehensive testing
- Bug fixes
- Documentation updates

### Phase 5: Deployment

- Deploy to staging
- Final testing
- Deploy to production
- Monitor email delivery

---

## Risk Mitigation

### Risks

1. **Brevo API Rate Limits**: Monitor usage, implement queue if needed
2. **Email Delivery Failures**: Implement retry logic, monitor delivery rates
3. **Content Errors**: Review all Romanian content, test thoroughly
4. **Performance Impact**: Send emails asynchronously, don't block operations

### Mitigation Strategies

- Start with low volume in production
- Monitor email delivery rates daily
- Set up alerts for high failure rates
- Keep email sending non-blocking
- Have fallback plan (manual email sending if needed)

---

## Documentation Updates

After implementation, update:

- [ ] `docs/COPY_LIBRARY.md` - Add actual email content used
- [ ] `src/lib/integrations/README.md` - Update Brevo section
- [ ] `memory-bank/progress.md` - Mark tasks as complete
- [ ] `CLAUDE.md` - Update email integration section
- [ ] Create `src/lib/integrations/brevo/README.md` - Usage guide

---

## Questions & Decisions

### Open Questions

1. Should we use Brevo's template API or inline HTML? (Decision: Start with inline HTML, migrate to templates later)
2. Should booking reminders be sent automatically? (Decision: Implement as cron job in Phase 2)
3. Should we track email opens/clicks? (Decision: Add webhook integration in Phase 2)

### Decisions Made

- ✅ Use inline HTML templates initially (easier to maintain, no Brevo dashboard dependency)
- ✅ Send emails asynchronously (non-blocking)
- ✅ All emails in Romanian only
- ✅ Use service layer pattern (consistent with project architecture)

---

## Next Steps

1. **Review this plan** with team
2. **Set up Brevo account** and get API key
3. **Configure environment variables** in `.env.local`
4. **Start Phase 1** implementation
5. **Test thoroughly** before production deployment

---

**Last Updated**: January 2025  
**Status**: Ready for Implementation  
**Estimated Completion**: 2-3 days
