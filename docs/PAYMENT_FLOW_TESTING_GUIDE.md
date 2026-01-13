# Payment Flow Testing Guide

**Date**: January 2025  
**Phase**: Phase 8 - Polish, Testing & Optimization  
**Feature**: Parent Pricing - One-Time Payment for Complete Sport Recommendation Report

---

## Overview

This document provides comprehensive testing procedures for the complete payment flow, including end-to-end testing, payment processing, PDF generation, email delivery, access control, and error scenarios.

---

## Testing Environment Setup

### Prerequisites

1. **Environment Variables**:

   ```bash
   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."

   # Database
   DATABASE_URL="postgresql://..."

   # Email
   BREVO_API_KEY="..."
   BREVO_SENDER_EMAIL="noreply@yuvoo.com"

   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

2. **Stripe Test Mode**:
   - Use Stripe test mode keys
   - Configure webhook endpoint: `http://localhost:3000/api/payments/webhook`
   - Use Stripe CLI for local webhook testing: `stripe listen --forward-to localhost:3000/api/payments/webhook`

3. **Test Cards**:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0025 0000 3155`
   - Insufficient funds: `4000 0000 0000 9995`

4. **Database**:
   - Use test database or ensure clean state
   - Seed data available for testing

---

## Test Scenarios

### 1. End-to-End Flow Testing

#### Test Case 1.1: Complete Happy Path

**Objective**: Verify complete flow from quiz to report access

**Steps**:

1. Navigate to `/chestionar`
2. Complete quiz with all questions
3. Submit quiz
4. Verify redirect to `/chestionar/email/[quizId]`
5. Enter email and location
6. Submit email form
7. Verify redirect to `/chestionar/teaser/[quizId]`
8. Verify single sport recommendation displayed
9. Click "Deblochează Raportul Complet"
10. Verify redirect to `/chestionar/paywall/[quizId]`
11. Verify pricing information displayed (39 lei)
12. Enter payment details (test card: 4242 4242 4242 4242)
13. Submit payment
14. Verify redirect to `/chestionar/payment/success/[quizId]`
15. Wait for polling to complete (or check email)
16. Verify redirect to `/chestionar/raport/[accessToken]`
17. Verify complete report displayed
18. Click "Descarcă Raportul PDF"
19. Verify PDF downloads successfully

**Expected Results**:

- ✅ All steps complete without errors
- ✅ Email received with report link
- ✅ Report accessible via access token
- ✅ PDF downloads correctly
- ✅ All content in Romanian
- ✅ PostHog events tracked correctly

**PostHog Events to Verify**:

- `QUIZ_COMPLETED`
- `EMAIL_COLLECTED`
- `PAYMENT_CREATED`
- `PAYMENT_COMPLETED`
- `REPORT_ACCESSED`
- `REPORT_ACCESSED` (with `pdfDownloaded: true`)

---

#### Test Case 1.2: Unauthenticated User Flow

**Objective**: Verify flow works for users not logged in

**Steps**:

1. Ensure user is logged out
2. Follow Test Case 1.1 steps

**Expected Results**:

- ✅ Flow works without authentication
- ✅ Payment can be completed
- ✅ Report access granted
- ✅ Email sent to provided email address

---

#### Test Case 1.3: Authenticated User Flow

**Objective**: Verify flow works for logged-in users

**Steps**:

1. Log in as parent user
2. Follow Test Case 1.1 steps
3. Verify user ID associated with payment

**Expected Results**:

- ✅ Flow works with authentication
- ✅ User ID stored in payment record
- ✅ Report accessible via access token
- ✅ Email sent to user's account email

---

### 2. Payment Processing Testing

#### Test Case 2.1: Successful Payment

**Objective**: Verify successful payment processing

**Steps**:

1. Navigate to paywall page
2. Use test card: `4242 4242 4242 4242`
3. Enter valid card details (any future expiry, any CVC)
4. Submit payment
5. Verify payment success

**Expected Results**:

- ✅ Payment intent created
- ✅ Payment status: `completed`
- ✅ Webhook received and processed
- ✅ Report access token generated
- ✅ Email sent with access link
- ✅ PostHog event: `PAYMENT_COMPLETED`

**Database Verification**:

```sql
-- Check payment record
SELECT * FROM payments WHERE quiz_id = '[quizId]';
-- Expected: status = 'completed', payment_provider_id set

-- Check report access
SELECT * FROM report_access WHERE payment_id = '[paymentId]';
-- Expected: access_token set, expires_at null (permanent)
```

---

#### Test Case 2.2: Payment Decline

**Objective**: Verify payment decline handling

**Steps**:

1. Navigate to paywall page
2. Use test card: `4000 0000 0000 0002`
3. Enter card details
4. Submit payment
5. Verify error message displayed

**Expected Results**:

- ✅ Payment declined
- ✅ Error message in Romanian
- ✅ User stays on paywall page
- ✅ Can retry payment
- ✅ PostHog event: `PAYMENT_FAILED`

**Error Message**: "Plata a fost refuzată. Te rugăm să verifici datele cardului sau să încerci cu alt card."

---

#### Test Case 2.3: 3D Secure Authentication

**Objective**: Verify 3D Secure flow

**Steps**:

1. Navigate to paywall page
2. Use test card: `4000 0025 0000 3155`
3. Enter card details
4. Submit payment
5. Complete 3D Secure authentication
6. Verify payment success

**Expected Results**:

- ✅ 3D Secure challenge displayed
- ✅ Authentication completed
- ✅ Payment succeeds after authentication
- ✅ Redirect to success page

---

#### Test Case 2.4: Insufficient Funds

**Objective**: Verify insufficient funds handling

**Steps**:

1. Navigate to paywall page
2. Use test card: `4000 0000 0000 9995`
3. Enter card details
4. Submit payment
5. Verify error message

**Expected Results**:

- ✅ Payment declined
- ✅ Error message: "Fonduri insuficiente pe card"
- ✅ User can retry with different card

---

#### Test Case 2.5: Payment Timeout

**Objective**: Verify payment timeout handling

**Steps**:

1. Navigate to paywall page
2. Start payment process
3. Simulate network timeout (disable network)
4. Verify error handling

**Expected Results**:

- ✅ Error message displayed
- ✅ User can retry payment
- ✅ No duplicate payments created

---

### 3. PDF Generation Testing

#### Test Case 3.1: PDF Download Success

**Objective**: Verify PDF generation and download

**Steps**:

1. Complete payment flow
2. Navigate to report page
3. Click "Descarcă Raportul PDF"
4. Verify PDF downloads
5. Open PDF and verify content

**Expected Results**:

- ✅ PDF downloads successfully
- ✅ PDF contains all report sections
- ✅ PDF formatting correct
- ✅ Images and styling preserved
- ✅ File name: `raport-yuvoo-[quizId].pdf`
- ✅ PostHog event: `REPORT_ACCESSED` with `pdfDownloaded: true`

**PDF Content Verification**:

- ✅ Report header
- ✅ Sport recommendations (2-3 sports)
- ✅ Sport explanations
- ✅ Sport benefits
- ✅ Sports to avoid
- ✅ Age guidance
- ✅ Next steps
- ✅ Local clubs suggestions

---

#### Test Case 3.2: PDF Generation Error

**Objective**: Verify PDF generation error handling

**Steps**:

1. Complete payment flow
2. Navigate to report page
3. Simulate PDF generation error (e.g., invalid access token)
4. Click "Descarcă Raportul PDF"
5. Verify error message

**Expected Results**:

- ✅ Error message displayed in Romanian
- ✅ User can retry download
- ✅ Error logged for debugging

**Error Messages**:

- 403: "Acces refuzat. Te rugăm să verifici că ai acces la acest raport..."
- 404: "Raportul nu a fost găsit. Te rugăm să contactezi suportul."
- 500: "Eroare la server. Te rugăm să încerci din nou..."

---

#### Test Case 3.3: PDF Generation Performance

**Objective**: Verify PDF generation performance

**Steps**:

1. Complete payment flow
2. Navigate to report page
3. Click "Descarcă Raportul PDF"
4. Measure generation time

**Expected Results**:

- ✅ PDF generated within 5-10 seconds
- ✅ Loading state displayed during generation
- ✅ User feedback provided

---

### 4. Email Delivery Testing

#### Test Case 4.1: Payment Success Email

**Objective**: Verify payment success email delivery

**Steps**:

1. Complete payment flow
2. Check email inbox
3. Verify email received

**Expected Results**:

- ✅ Email received within 1-2 minutes
- ✅ Email subject: "Raportul tău personalizat este gata!"
- ✅ Email contains report access link
- ✅ Email in Romanian
- ✅ Link works and redirects to report

**Email Content Verification**:

- ✅ Greeting with user name (if available)
- ✅ Payment confirmation
- ✅ Report access link
- ✅ Instructions for accessing report
- ✅ Support contact information

---

#### Test Case 4.2: Email Link Access

**Objective**: Verify email link provides report access

**Steps**:

1. Receive payment success email
2. Click report access link
3. Verify report page loads
4. Verify report content displayed

**Expected Results**:

- ✅ Link redirects to `/chestionar/raport/[accessToken]`
- ✅ Report accessible without additional payment
- ✅ All report sections displayed
- ✅ PDF download available

---

#### Test Case 4.3: Email Delivery Failure

**Objective**: Verify email delivery failure handling

**Steps**:

1. Configure invalid email (or disable email service)
2. Complete payment flow
3. Verify webhook still processes
4. Check error logs

**Expected Results**:

- ✅ Payment still processes successfully
- ✅ Report access token generated
- ✅ Webhook doesn't fail due to email error
- ✅ Error logged for debugging
- ✅ User can still access report via polling or manual link

---

### 5. Access Control Testing

#### Test Case 5.1: Valid Access Token

**Objective**: Verify valid access token grants access

**Steps**:

1. Complete payment flow
2. Get access token from email or database
3. Navigate to `/chestionar/raport/[accessToken]`
4. Verify report displayed

**Expected Results**:

- ✅ Report accessible
- ✅ All sections displayed
- ✅ PDF download available
- ✅ No payment required

---

#### Test Case 5.2: Invalid Access Token

**Objective**: Verify invalid access token is rejected

**Steps**:

1. Navigate to `/chestionar/raport/invalid-token`
2. Verify access denied

**Expected Results**:

- ✅ Redirect to paywall or quiz intro
- ✅ Error message in Romanian
- ✅ User cannot access report

---

#### Test Case 5.3: Expired Access Token

**Objective**: Verify expired access token handling

**Steps**:

1. Create access token with expiration (if applicable)
2. Wait for expiration
3. Navigate to report page
4. Verify access denied

**Expected Results**:

- ✅ Access denied for expired token
- ✅ Error message displayed
- ✅ Redirect to appropriate page

**Note**: Current implementation uses permanent access (no expiration). This test may not apply.

---

#### Test Case 5.4: Access Token Reuse

**Objective**: Verify access token can be reused

**Steps**:

1. Complete payment flow
2. Access report via token
3. Close browser
4. Access report again with same token
5. Verify access granted

**Expected Results**:

- ✅ Token can be reused multiple times
- ✅ No expiration
- ✅ Access granted each time
- ✅ `lastAccessedAt` timestamp updated

---

#### Test Case 5.5: Payment Status Verification

**Objective**: Verify only completed payments grant access

**Steps**:

1. Create payment with status `pending`
2. Try to access report
3. Verify access denied
4. Complete payment
5. Verify access granted

**Expected Results**:

- ✅ Pending payment: Access denied
- ✅ Completed payment: Access granted
- ✅ Failed payment: Access denied

---

### 6. Error Scenario Testing

#### Test Case 6.1: Network Errors

**Objective**: Verify network error handling

**Steps**:

1. Start payment flow
2. Disable network connection
3. Attempt payment
4. Verify error handling

**Expected Results**:

- ✅ Error message displayed
- ✅ User can retry
- ✅ No duplicate payments
- ✅ Error message in Romanian

---

#### Test Case 6.2: Server Errors

**Objective**: Verify server error handling

**Steps**:

1. Simulate server error (500)
2. Attempt payment
3. Verify error handling

**Expected Results**:

- ✅ Error message displayed
- ✅ User can retry
- ✅ Error logged for debugging
- ✅ No data corruption

---

#### Test Case 6.3: Database Errors

**Objective**: Verify database error handling

**Steps**:

1. Simulate database connection error
2. Attempt payment
3. Verify error handling

**Expected Results**:

- ✅ Error message displayed
- ✅ User can retry
- ✅ Error logged
- ✅ No partial data saved

---

#### Test Case 6.4: Webhook Failure

**Objective**: Verify webhook failure handling

**Steps**:

1. Complete payment on frontend
2. Simulate webhook failure
3. Verify payment success page behavior
4. Check polling mechanism

**Expected Results**:

- ✅ Payment success page shows polling
- ✅ Polling attempts to get access token
- ✅ Fallback message if polling fails
- ✅ Email sent as backup
- ✅ User can access report via email link

---

#### Test Case 6.5: Component Errors

**Objective**: Verify React error boundary handling

**Steps**:

1. Intentionally cause component error
2. Verify error boundary catches error
3. Verify error UI displayed

**Expected Results**:

- ✅ Error boundary catches error
- ✅ Error UI displayed (Romanian)
- ✅ Recovery options provided
- ✅ App doesn't crash

---

#### Test Case 6.6: Invalid Quiz ID

**Objective**: Verify invalid quiz ID handling

**Steps**:

1. Navigate to paywall with invalid quiz ID
2. Verify error handling

**Expected Results**:

- ✅ Error message displayed
- ✅ Redirect to quiz intro
- ✅ No payment attempted

---

#### Test Case 6.7: Duplicate Payment Prevention

**Objective**: Verify duplicate payment prevention

**Steps**:

1. Start payment
2. Submit payment form
3. Before redirect, submit again
4. Verify duplicate prevention

**Expected Results**:

- ✅ Only one payment created
- ✅ No duplicate charges
- ✅ Proper error handling

---

## Manual Testing Checklist

### Pre-Testing Setup

- [ ] Environment variables configured
- [ ] Stripe test mode enabled
- [ ] Webhook endpoint configured
- [ ] Database accessible
- [ ] Email service configured
- [ ] Test cards available

### Quiz Flow

- [ ] Quiz completion works
- [ ] Quiz submission successful
- [ ] Redirect to email collection
- [ ] All questions answered correctly

### Email Collection

- [ ] Email form displays
- [ ] Email validation works
- [ ] Location field works
- [ ] Form submission successful
- [ ] Redirect to teaser page

### Teaser Page

- [ ] Single sport recommendation displayed
- [ ] Sport details shown
- [ ] "Deblochează Raportul Complet" button works
- [ ] Redirect to paywall

### Paywall Page

- [ ] Pricing information displayed (39 lei)
- [ ] Payment form loads
- [ ] Stripe Elements render
- [ ] Form validation works
- [ ] Error boundary in place

### Payment Processing

- [ ] Payment intent creation successful
- [ ] Payment submission works
- [ ] Success card processes
- [ ] Decline card shows error
- [ ] 3D Secure works
- [ ] Error messages in Romanian

### Payment Success Page

- [ ] Success message displayed
- [ ] Polling mechanism works
- [ ] Redirect to report when token available
- [ ] Fallback message if polling fails
- [ ] Email link mentioned

### Report Page

- [ ] Report displays correctly
- [ ] All sections present
- [ ] Content in Romanian
- [ ] PDF download works
- [ ] Access token works
- [ ] Suspense boundary works

### PDF Generation

- [ ] PDF downloads successfully
- [ ] PDF content correct
- [ ] PDF formatting preserved
- [ ] Error handling works
- [ ] Performance acceptable

### Email Delivery

- [ ] Email sent after payment
- [ ] Email content correct
- [ ] Email link works
- [ ] Email in Romanian
- [ ] Email delivery failure handled

### Access Control

- [ ] Valid token grants access
- [ ] Invalid token denied
- [ ] Token reuse works
- [ ] Payment status verified
- [ ] Access persistent

### Error Scenarios

- [ ] Network errors handled
- [ ] Server errors handled
- [ ] Database errors handled
- [ ] Webhook failures handled
- [ ] Component errors caught
- [ ] Error messages in Romanian

### Analytics

- [ ] PostHog events tracked
- [ ] Event properties correct
- [ ] Conversion funnel tracked
- [ ] Error events tracked

---

## Automated Testing (Future)

### Unit Tests

**Recommended Framework**: Jest + React Testing Library

**Test Areas**:

- Server Actions
- Repository functions
- Service layer functions
- Validation schemas
- Utility functions

### Integration Tests

**Recommended Framework**: Playwright or Cypress

**Test Areas**:

- Complete payment flow
- PDF generation
- Email delivery
- Access control
- Error scenarios

### E2E Tests

**Recommended Framework**: Playwright

**Test Scenarios**:

- Complete happy path
- Payment decline
- Error recovery
- Access control
- PDF download

---

## Test Data

### Test Quiz Answers

```typescript
{
  age: 7,
  gender: "male",
  interests: ["fotbal", "baschet"],
  physicalActivity: "active",
  preferences: "team_sports",
  // ... other questions
}
```

### Test Payment Data

```typescript
{
  quizId: "test-quiz-id",
  amount: 3900, // 39 lei in bani
  currency: "RON",
  status: "completed"
}
```

### Test Access Tokens

- Valid: Use token from completed payment
- Invalid: "invalid-token-123"
- Expired: Not applicable (permanent access)

---

## Performance Testing

### Load Testing

**Tools**: k6, Artillery, or Apache Bench

**Scenarios**:

- Concurrent payment submissions
- PDF generation under load
- Database query performance
- Webhook processing speed

### Performance Metrics

- Payment creation: < 2 seconds
- PDF generation: < 10 seconds
- Page load: < 1 second
- Database queries: < 500ms

---

## Security Testing

### Security Checks

- [ ] Payment data not logged
- [ ] Access tokens secure (non-guessable)
- [ ] Webhook signature verified
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting active

---

## Browser Testing

### Supported Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Testing

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Payment form responsive
- [ ] Report page responsive

---

## Accessibility Testing

### WCAG 2.1 AA Compliance

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] ARIA labels present
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] Error messages accessible

---

## Regression Testing

### After Changes

- [ ] Run complete happy path
- [ ] Test error scenarios
- [ ] Verify analytics
- [ ] Check email delivery
- [ ] Verify PDF generation

---

## Test Reporting

### Test Results Template

```markdown
## Test Execution Report

**Date**: [Date]
**Tester**: [Name]
**Environment**: [Development/Staging/Production]

### Results Summary

- Total Tests: [Number]
- Passed: [Number]
- Failed: [Number]
- Skipped: [Number]

### Failed Tests

1. [Test Case] - [Issue Description]
2. [Test Case] - [Issue Description]

### Notes

[Any additional notes or observations]
```

---

## Troubleshooting

### Common Issues

1. **Payment Not Processing**:
   - Check Stripe keys
   - Verify webhook endpoint
   - Check network connectivity

2. **PDF Not Generating**:
   - Check Puppeteer installation
   - Verify report page loads
   - Check server logs

3. **Email Not Sending**:
   - Verify Brevo API key
   - Check email service status
   - Verify sender email verified

4. **Access Token Not Working**:
   - Check database for token
   - Verify payment status
   - Check token expiration

---

## Conclusion

**Status**: ✅ **Testing Guide Complete**

This comprehensive testing guide covers all aspects of the payment flow:

- ✅ End-to-end flow testing
- ✅ Payment processing testing
- ✅ PDF generation testing
- ✅ Email delivery testing
- ✅ Access control testing
- ✅ Error scenario testing

**Next Steps**:

1. Execute manual testing checklist
2. Document test results
3. Fix any issues found
4. Consider implementing automated tests

---

**Last Updated**: January 2025  
**Status**: ✅ Complete - Ready for testing execution
