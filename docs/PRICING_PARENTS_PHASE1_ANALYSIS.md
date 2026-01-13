# Phase 1: Analysis & Architecture Design - Parent Pricing Implementation

**Date**: 2025-01-XX  
**Status**: ✅ Complete  
**Next Phase**: Phase 2 - Database Schema & Payment Integration

---

## Executive Summary

This document provides a comprehensive analysis of the current quiz implementation and designs the architecture for the one-time payment flow for parent pricing. The implementation will transform the free quiz into a monetized feature with a clear value proposition: free quiz → email collection → teaser (single sport) → one-time payment (39-49 lei) → complete personalized report.

---

## 1. Current State Analysis

### 1.1 Quiz Completion Flow (✅ Complete)

**Current Implementation**:

- **Location**: `src/app/(public)/chestionar/container/page.tsx` (QuizContainer component)
- **Flow**: User completes 6-question quiz → submits via `submitQuizAction` → AI generates recommendations → results displayed
- **Server Action**: `src/app/actions/quiz.ts` → `submitQuizAction()`
- **Service Layer**: `src/modules/quiz/quiz.service.ts` → `submitQuiz()`
- **Repository**: `src/modules/quiz/quiz.repository.ts`
- **AI Service**: `src/modules/quiz/ai-recommendations.service.ts` (OpenAI GPT-4 Turbo)

**Key Findings**:

- ✅ Quiz submission works for both authenticated and unauthenticated users
- ✅ Email can be collected optionally (via `CreateQuizInput.email`)
- ✅ Quiz results are saved to database immediately after submission
- ✅ Results page displays ALL recommendations immediately (no paywall)
- ✅ Email notifications are sent via Brevo (`src/modules/quiz/quiz.email.ts`)
- ✅ PostHog tracking is implemented for quiz completion

**Current Flow**:

```
1. User completes quiz (6 questions)
2. User submits quiz → submitQuizAction()
3. Quiz saved to database (quizzes table)
4. AI generates recommendations (OpenAI)
5. Recommendations saved to database
6. User redirected to results page: /chestionar/rezultate/[id]
7. Results page displays ALL recommendations immediately
8. Email sent with results (if email provided)
```

**Required Changes**:

- ❌ Need to intercept flow after quiz submission (before results display)
- ❌ Need to add email collection gate (mandatory, not optional)
- ❌ Need to create teaser page (single sport, minimal details)
- ❌ Need to add paywall before full results
- ❌ Need to modify results page to check payment status

### 1.2 Database Schema (✅ Complete)

**Current Schema** (`src/lib/db/schema.ts`):

```typescript
export const quizzes = pgTable("quizzes", {
  id: text("id").primaryKey(),
  childId: text("child_id")
    .notNull()
    .references(() => children.id),
  answers: jsonb("answers").notNull(), // Quiz answers as JSON
  recommendations: jsonb("recommendations"), // AI recommendations as JSON
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

**Key Findings**:

- ✅ Quiz answers stored as JSONB
- ✅ Recommendations stored as JSONB (includes SportRecommendation[] and optional SpecialistRecommendation)
- ✅ No email field in quizzes table (email is optional in CreateQuizInput)
- ✅ No payment tracking
- ✅ No access control for paid reports

**Required Changes**:

- ❌ Add `email` field to quizzes table (for email collection)
- ❌ Create `payments` table (payment tracking)
- ❌ Create `report_access` table (access token management)

### 1.3 AI Recommendation Service (✅ Complete)

**Current Implementation**:

- **Location**: `src/modules/quiz/ai-recommendations.service.ts`
- **Model**: OpenAI GPT-4 Turbo
- **Language**: Romanian (enforced in system prompt)
- **Output**: 3-5 sport recommendations with match scores (0-100), reasoning, benefits, considerations
- **Caching**: `ai-recommendations-cache.service.ts` (caches AI responses)

**Key Findings**:

- ✅ AI generates comprehensive recommendations (sportId, sportName, matchScore, reasoning, benefits, considerations)
- ✅ Recommendations are in Romanian
- ✅ Match scores are 0-100 scale
- ✅ Specialist recommendations are optional (based on risk signals)
- ✅ Caching is implemented to reduce API costs

**Required Changes**:

- ⚠️ May need to enhance AI prompts to generate all 7 report sections:
  1. Top 2-3 sporturi recomandate ✅ (already generated)
  2. De ce aceste sporturi sunt potrivite ✅ (reasoning field)
  3. Ce dezvoltă fiecare sport (fizic + emoțional) ⚠️ (benefits field exists, but may need enhancement)
  4. Ce sporturi ar trebui evitate momentan ❌ (not generated)
  5. Vârsta ideală pentru început ❌ (not generated)
  6. Pașii următori recomandați ❌ (not generated)
  7. Sugestii de cluburi locale ❌ (separate service: `sport-club-mapping.service.ts`)

### 1.4 Quiz Results Display (✅ Complete)

**Current Implementation**:

- **Location**: `src/app/(public)/chestionar/rezultate/[id]/page.tsx`
- **Access**: Public (no authentication required)
- **Display**: Shows ALL recommendations immediately
- **Components**:
  - `SportRecommendationCard` - displays each recommendation
  - `SpecialistRecommendationCard` - displays specialist recommendation if present
  - `ResultsActions` - action buttons (save, share, etc.)

**Key Findings**:

- ✅ Results page is public (shareable via link)
- ✅ All recommendations displayed immediately
- ✅ No payment check
- ✅ No access control

**Required Changes**:

- ❌ Need to add payment status check
- ❌ Need to show teaser for unpaid quizzes
- ❌ Need to show full report only for paid quizzes
- ❌ Need to add PDF download button (for paid reports)

### 1.5 Email Service (✅ Complete)

**Current Implementation**:

- **Location**: `src/modules/quiz/quiz.email.ts`
- **Provider**: Brevo (already integrated)
- **Function**: `sendQuizResultsEmail()` - sends quiz results via email
- **Content**: Includes all recommendations

**Key Findings**:

- ✅ Brevo is configured and working
- ✅ Email templates exist for quiz results
- ✅ Email sending is non-blocking (doesn't fail quiz submission)

**Required Changes**:

- ❌ Need new email template for teaser (single sport)
- ❌ Need new email template for payment success
- ❌ Need new email template for report access (with persistent link)

---

## 2. Payment Flow Architecture

### 2.1 User Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    QUIZ COMPLETION (FREE)                       │
│  User completes 6-question quiz → Submits quiz                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  EMAIL COLLECTION GATE                          │
│  - Inform user they'll receive free teaser                     │
│  - Collect email address (mandatory)                           │
│  - Store email with quiz record                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    TEASER PAGE (FREE)                            │
│  - Display single sport recommendation (highest match score)    │
│  - Minimal details (sport name, match score, brief reason)      │
│  - NO detailed explanations                                     │
│  - NO action plan                                               │
│  - NO alternatives                                               │
│  - CTA: "Deblochează raportul complet" → Paywall               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PAYWALL PAGE                                  │
│  - Value proposition: "Am identificat sportul potrivit..."    │
│  - Pricing: 39-49 lei (one-time, no subscription)              │
│  - Clear pricing display (no hidden costs)                     │
│  - Payment form (Stripe/PayPal/other)                           │
│  - CTA: "Plătește acum"                                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PAYMENT PROCESSING                              │
│  - Create payment record (status: pending)                      │
│  - Process payment via payment provider                         │
│  - Webhook: Update payment status (success/failure)             │
│  - On success: Generate access token, grant report access      │
│  - Send payment success email                                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              PAYMENT SUCCESS PAGE                                │
│  - Confirm payment success                                      │
│  - Provide report access link                                    │
│  - CTA: "Vezi raportul complet" → Report page                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              COMPLETE REPORT PAGE (PAID)                         │
│  - Verify access token (from URL or session)                    │
│  - Display all 7 report sections:                               │
│    1. Top 2-3 sporturi recomandate (with scores)                │
│    2. De ce aceste sporturi sunt potrivite                      │
│    3. Ce dezvoltă fiecare sport (fizic + emoțional)            │
│    4. Ce sporturi ar trebui evitate momentan                    │
│    5. Vârsta ideală pentru început                             │
│    6. Pașii următori recomandați                                │
│    7. Sugestii de cluburi locale                               │
│  - PDF download button                                          │
│  - Persistent access (no expiration)                            │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Route Structure

**New Routes** (to be added to `src/lib/routes.ts`):

```typescript
quiz: {
  intro: "/chestionar",
  container: "/chestionar/container",
  preview: "/chestionar/previzualizare",
  results: (id: string) => `/chestionar/rezultate/${id}`,
  // NEW ROUTES:
  emailGate: (quizId: string) => `/chestionar/email/${quizId}`,
  teaser: (quizId: string) => `/chestionar/teaser/${quizId}`,
  paywall: (quizId: string) => `/chestionar/paywall/${quizId}`,
  paymentSuccess: (quizId: string) => `/chestionar/payment/success/${quizId}`,
  paymentFailure: (quizId: string) => `/chestionar/payment/failure/${quizId}`,
  report: (accessToken: string) => `/chestionar/raport/${accessToken}`,
}
```

**Route Flow**:

1. `/chestionar/container` → Quiz completion
2. `/chestionar/email/[quizId]` → Email collection (NEW)
3. `/chestionar/teaser/[quizId]` → Teaser page (NEW)
4. `/chestionar/paywall/[quizId]` → Paywall (NEW)
5. `/chestionar/payment/success/[quizId]` → Payment success (NEW)
6. `/chestionar/raport/[accessToken]` → Complete report (NEW)
7. `/chestionar/rezultate/[id]` → Legacy results page (keep for backward compatibility, but redirect to teaser if unpaid)

### 2.3 State Management

**Quiz State**:

- `quizId`: UUID of quiz submission
- `email`: Email address (collected at gate)
- `paymentStatus`: `pending` | `completed` | `failed` | `refunded`
- `accessToken`: Unique token for report access (generated after payment)

**Payment State**:

- `paymentId`: Payment provider transaction ID
- `amount`: Payment amount (39-49 lei)
- `currency`: "RON" (Romanian Leu)
- `status`: `pending` | `completed` | `failed` | `refunded`
- `createdAt`: Payment creation timestamp
- `completedAt`: Payment completion timestamp

**Access Control**:

- `accessToken`: Unique, non-guessable token (UUID v4 or crypto.randomBytes)
- `expiresAt`: Optional expiration (set to 10 years for "permanent" access)
- `quizId`: Links access token to quiz
- `paymentId`: Links access token to payment

---

## 3. Database Schema Design

### 3.1 Extended Quizzes Table

**Add email field**:

```typescript
export const quizzes = pgTable("quizzes", {
  id: text("id").primaryKey(),
  childId: text("child_id")
    .notNull()
    .references(() => children.id),
  answers: jsonb("answers").notNull(),
  recommendations: jsonb("recommendations"),
  email: text("email"), // NEW: Email collected at gate
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

### 3.2 Payments Table (NEW)

```typescript
export const payments = pgTable(
  "payments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id), // Optional (for authenticated users)
    quizId: text("quiz_id")
      .notNull()
      .references(() => quizzes.id),

    // Payment details
    amount: integer("amount").notNull(), // Amount in smallest currency unit (lei * 100 = bani)
    currency: text("currency").notNull().default("RON"),
    status: text("status").notNull().default("pending"), // pending | completed | failed | refunded

    // Payment provider
    paymentProvider: text("payment_provider").notNull(), // "stripe" | "paypal" | "netopia" | etc.
    paymentProviderId: text("payment_provider_id"), // Provider's transaction ID
    paymentProviderMetadata: jsonb("payment_provider_metadata"), // Additional provider data

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    quizIdIdx: index("idx_payments_quiz_id").on(table.quizId),
    userIdIdx: index("idx_payments_user_id").on(table.userId),
    statusIdx: index("idx_payments_status").on(table.status),
    paymentProviderIdIdx: index("idx_payments_provider_id").on(table.paymentProviderId),
  })
);
```

**Payment Status Enum** (optional, or use text):

```typescript
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
]);
```

### 3.3 Report Access Table (NEW)

```typescript
export const reportAccess = pgTable(
  "report_access",
  {
    id: text("id").primaryKey(),
    quizId: text("quiz_id")
      .notNull()
      .references(() => quizzes.id),
    paymentId: text("payment_id")
      .notNull()
      .references(() => payments.id),

    // Access token (unique, non-guessable)
    accessToken: text("access_token").notNull().unique(),

    // Expiration (set to 10 years for "permanent" access)
    expiresAt: timestamp("expires_at"),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastAccessedAt: timestamp("last_accessed_at"), // Track usage
  },
  (table) => ({
    quizIdIdx: index("idx_report_access_quiz_id").on(table.quizId),
    paymentIdIdx: index("idx_report_access_payment_id").on(table.paymentId),
    accessTokenIdx: index("idx_report_access_token").on(table.accessToken),
  })
);
```

**Access Token Generation**:

- Use `crypto.randomUUID()` or `crypto.randomBytes(32).toString('hex')`
- Store as unique in database
- Include in report URL: `/chestionar/raport/[accessToken]`

---

## 4. Payment Provider Selection

### 4.1 Evaluation Criteria

**Requirements**:

1. ✅ Support one-time payments (no subscriptions)
2. ✅ Support Romanian Leu (RON) currency
3. ✅ PCI compliance (handled by provider)
4. ✅ Webhook support for payment status updates
5. ✅ Romanian market familiarity (preferred)
6. ✅ Reasonable fees (transaction fees)
7. ✅ Good documentation and SDK support
8. ✅ Test mode for development

### 4.2 Provider Options

#### Option 1: Stripe

**Pros**:

- ✅ Excellent documentation and SDK
- ✅ Strong TypeScript support
- ✅ Webhook support
- ✅ Test mode
- ✅ PCI compliant
- ✅ Supports RON currency
- ✅ Widely used, reliable

**Cons**:

- ❌ Higher fees (2.9% + 0.30 EUR per transaction)
- ❌ Less familiar to Romanian users (may prefer local providers)

**Fees**: 2.9% + 0.30 EUR per transaction  
**SDK**: `stripe` (npm package)  
**Documentation**: https://stripe.com/docs

#### Option 2: PayPal

**Pros**:

- ✅ Familiar to Romanian users
- ✅ Good documentation
- ✅ Webhook support
- ✅ Test mode
- ✅ PCI compliant
- ✅ Supports RON currency

**Cons**:

- ❌ Higher fees (similar to Stripe)
- ❌ Less developer-friendly than Stripe

**Fees**: ~2.9% + fixed fee per transaction  
**SDK**: `@paypal/checkout-server-sdk` (npm package)  
**Documentation**: https://developer.paypal.com/docs

#### Option 3: Netopia (Romanian Payment Provider)

**Pros**:

- ✅ Romanian company, familiar to local market
- ✅ Lower fees (typically 1.5-2% per transaction)
- ✅ Better local market fit
- ✅ Supports RON currency
- ✅ Webhook support

**Cons**:

- ⚠️ Less documentation (may be in Romanian)
- ⚠️ Smaller developer community
- ⚠️ May have less TypeScript support

**Fees**: ~1.5-2% per transaction (typically lower than Stripe/PayPal)  
**SDK**: Check Netopia documentation  
**Documentation**: https://www.netopia.com/ (Romanian)

#### Option 4: PayU (Romanian Payment Provider)

**Pros**:

- ✅ Romanian company, familiar to local market
- ✅ Lower fees (typically 1.5-2% per transaction)
- ✅ Better local market fit
- ✅ Supports RON currency
- ✅ Webhook support

**Cons**:

- ⚠️ Less documentation
- ⚠️ Smaller developer community

**Fees**: ~1.5-2% per transaction  
**SDK**: Check PayU documentation  
**Documentation**: https://www.payu.ro/ (Romanian)

### 4.3 Recommendation

**Primary Choice**: **Stripe**

**Rationale**:

1. **Developer Experience**: Best documentation, TypeScript support, and developer tools
2. **Reliability**: Widely used, battle-tested, reliable infrastructure
3. **Features**: Excellent webhook support, test mode, dashboard for monitoring
4. **Future-proof**: Easy to add features (refunds, subscriptions if needed later)
5. **Time to Market**: Faster implementation due to excellent documentation

**Secondary Option**: **Netopia** (if lower fees are critical and Romanian market fit is priority)

**Implementation Strategy**:

- Design payment service with abstraction layer
- Start with Stripe implementation
- Can swap to Netopia/PayU later if needed (with minimal code changes)

---

## 5. Report Structure Design

### 5.1 Report Content Sections

Based on `docs/PRICING_PARENTS.md`, the complete report must include:

#### Section 1: Top 2-3 Sporturi Recomandate

- **Source**: AI recommendations (already generated)
- **Display**: Sport cards with match scores (85%, 72%, etc.)
- **Order**: By match score (highest first)
- **Limit**: Top 2-3 sports (not all 5)

#### Section 2: De ce aceste sporturi sunt potrivite

- **Source**: AI `reasoning` field (already generated)
- **Enhancement**: May need to ensure non-medical language, calm tone
- **Display**: Explanation per sport

#### Section 3: Ce dezvoltă fiecare sport (fizic + emoțional)

- **Source**: AI `benefits` field (already generated)
- **Enhancement**: May need to categorize as "fizic" vs "emoțional"
- **Display**:
  - Fizic: coordonație, forță, mobilitate
  - Emoțional: încredere, disciplină, socializare

#### Section 4: Ce sporturi ar trebui evitate momentan

- **Source**: ❌ NOT currently generated by AI
- **Requirement**: Generate list of sports to avoid with short explanations
- **Tone**: Non-negative, non-alarmist
- **Display**: List with brief explanations

#### Section 5: Vârsta ideală pentru început

- **Source**: ❌ NOT currently generated by AI
- **Requirement**:
  - "Acum" vs "Peste 6-12 luni"
  - Signs to watch for parent
- **Display**: Age guidance per recommended sport

#### Section 6: Pașii următori recomandați

- **Source**: ❌ NOT currently generated by AI
- **Requirement**:
  - How to start
  - What to watch at first training
  - Questions to ask club
- **Display**: Step-by-step action plan

#### Section 7: Sugestii de cluburi locale

- **Source**: `sport-club-mapping.service.ts` (exists, but may need enhancement)
- **Requirement**:
  - Based on user's city (from quiz or profile)
  - No availability promises
  - No direct contact details (leads are separate)
- **Display**: Club cards with basic info (name, location, sport type)

### 5.2 AI Prompt Enhancement

**Current AI Prompt** (`src/modules/quiz/ai-recommendations.service.ts`):

- ✅ Generates sport recommendations with match scores
- ✅ Generates reasoning (why sport is suitable)
- ✅ Generates benefits (what sport develops)
- ✅ Generates considerations (practical aspects)

**Required Enhancements**:

1. **Add "sports to avoid"**: Generate list of sports that should be avoided (with explanations)
2. **Add "age guidance"**: Generate guidance on when to start (now vs later, signs to watch)
3. **Add "next steps"**: Generate action plan (how to start, what to watch, questions to ask)

**Enhanced Prompt Structure**:

```typescript
{
  "recommendations": [...], // Existing
  "sportsToAvoid": [
    {
      "sportName": "Sport Name",
      "reason": "Brief explanation why to avoid (non-negative tone)"
    }
  ],
  "ageGuidance": {
    "recommendedSports": [
      {
        "sportId": "fotbal",
        "startNow": true, // or false
        "startLaterMonths": 6, // if startNow is false
        "signsToWatch": ["Sign 1", "Sign 2"]
      }
    ]
  },
  "nextSteps": {
    "howToStart": "Step-by-step guide",
    "firstTrainingWatch": ["What to watch 1", "What to watch 2"],
    "questionsToAskClub": ["Question 1", "Question 2"]
  }
}
```

### 5.3 Report Page Layout

**Structure**:

```
┌─────────────────────────────────────────┐
│         REPORT HEADER                   │
│  "Raportul complet: Sportul potrivit    │
│   pentru copilul tău"                   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Section 1: Top 2-3 Sporturi            │
│  [Sport Card 1] [Sport Card 2] [Sport Card 3] │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Section 2: De ce sunt potrivite         │
│  [Explanation per sport]                 │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Section 3: Ce dezvoltă fiecare sport   │
│  [Fizic] [Emoțional] per sport           │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Section 4: Sporturi de evitat           │
│  [List with explanations]                │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Section 5: Vârsta ideală                │
│  [Age guidance per sport]                │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Section 6: Pașii următori               │
│  [Action plan]                           │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Section 7: Cluburi locale                │
│  [Club cards]                             │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  ACTIONS                                 │
│  [Download PDF] [Share] [Save]           │
└─────────────────────────────────────────┘
```

### 5.4 PDF Template Structure

**PDF Generation Approach**:

- **Option 1**: Puppeteer (HTML-to-PDF) - Renders report page as PDF
- **Option 2**: react-pdf - Programmatic PDF generation
- **Recommendation**: Puppeteer (matches web page exactly, easier to maintain)

**PDF Structure**:

- Same sections as web page
- Yuvoo branding (header/footer)
- Print-optimized styling
- Romanian fonts support

---

## 6. API Endpoints Design

### 6.1 Server Actions

**Location**: `src/app/actions/payments/`

1. **`createPaymentAction(quizId: string)`**
   - Creates payment record (status: pending)
   - Returns payment intent/session from payment provider
   - Validates quiz exists and is unpaid

2. **`verifyPaymentAction(paymentId: string)`**
   - Verifies payment status with payment provider
   - Updates payment record
   - Grants report access if payment successful

3. **`getPaymentStatusAction(quizId: string)`**
   - Returns payment status for quiz
   - Used to check if user has paid

### 6.2 API Routes

**Location**: `src/app/api/payments/`

1. **`/api/payments/webhook`** (POST)
   - Handles payment provider webhooks
   - Updates payment status
   - Grants report access on success
   - Sends email notifications

2. **`/api/reports/[accessToken]/download`** (GET)
   - Generates PDF on request
   - Verifies access token
   - Returns PDF as download

---

## 7. Security Considerations

### 7.1 Payment Security

- ✅ Use payment provider SDK (handles PCI compliance)
- ✅ Never store credit card details
- ✅ Verify webhook signatures
- ✅ Use HTTPS in production
- ✅ Validate payment amounts server-side

### 7.2 Access Control

- ✅ Access tokens must be unique and non-guessable
- ✅ Verify access token on every report access
- ✅ Verify payment status server-side (don't trust client)
- ✅ Rate limit report access (prevent abuse)

### 7.3 Data Privacy

- ✅ Email addresses stored securely
- ✅ Payment data stored securely
- ✅ Access tokens stored securely
- ✅ Comply with GDPR (Romanian/EU regulations)

---

## 8. Implementation Dependencies

### 8.1 Technical Dependencies

- ✅ Next.js 16.0.8+ (Cache Components)
- ✅ React 19.2.1+
- ✅ TypeScript 5.x
- ✅ Drizzle ORM (database)
- ✅ Stack Auth (authentication - already integrated)
- ✅ Brevo (email - already integrated)
- ❌ Payment provider SDK (Stripe/PayPal/Netopia - to be installed)
- ❌ PDF generation library (Puppeteer/react-pdf - to be selected)

### 8.2 Code Dependencies

- ✅ Quiz service (`src/modules/quiz/quiz.service.ts`)
- ✅ Quiz repository (`src/modules/quiz/quiz.repository.ts`)
- ✅ AI recommendations service (`src/modules/quiz/ai-recommendations.service.ts`)
- ✅ Email service (`src/modules/quiz/quiz.email.ts`)
- ✅ Routes (`src/lib/routes.ts`)
- ✅ Shared components (`src/components/shared/`)

### 8.3 Prerequisites

- [ ] Payment provider account created (Stripe recommended)
- [ ] Payment provider API keys obtained
- [ ] PDF generation library selected (Puppeteer recommended)
- [ ] Database access verified
- [ ] Brevo email service configured (✅ already done)

---

## 9. Next Steps (Phase 2)

1. **Extend Database Schema**
   - Add `email` field to `quizzes` table
   - Create `payments` table
   - Create `report_access` table
   - Generate Drizzle migrations

2. **Install Payment Provider SDK**
   - Install Stripe SDK: `npm install stripe`
   - Configure Stripe API keys in `.env.local`
   - Test Stripe connection

3. **Create Payment Service**
   - Create `src/modules/payments/payments.service.ts`
   - Create `src/modules/payments/payments.repository.ts`
   - Implement payment creation
   - Implement payment verification

4. **Create Payment Server Actions**
   - Create `src/app/actions/payments/create-payment.ts`
   - Create `src/app/actions/payments/verify-payment.ts`
   - Add Zod validation schemas

5. **Create Payment Webhook Handler**
   - Create `src/app/api/payments/webhook/route.ts`
   - Implement webhook signature verification
   - Implement payment status updates

---

## 10. Architecture Decisions

### 10.1 Payment Provider: Stripe

**Decision**: Use Stripe as primary payment provider.

**Rationale**: Best developer experience, excellent documentation, TypeScript support, reliable infrastructure.

**Alternative**: Can swap to Netopia/PayU later if needed (with abstraction layer).

### 10.2 PDF Generation: Puppeteer

**Decision**: Use Puppeteer for PDF generation (HTML-to-PDF).

**Rationale**: Matches web page exactly, easier to maintain, print-optimized styling.

**Alternative**: react-pdf (programmatic generation) if more control needed.

### 10.3 Access Token: UUID v4

**Decision**: Use `crypto.randomUUID()` for access tokens.

**Rationale**: Unique, non-guessable, sufficient entropy, built-in Node.js support.

**Alternative**: `crypto.randomBytes(32).toString('hex')` if more entropy needed.

### 10.4 Email Collection: Mandatory

**Decision**: Make email collection mandatory (not optional).

**Rationale**: Required for teaser delivery and report access link. Can't proceed without email.

**Alternative**: Allow optional email for authenticated users (use account email).

---

## 11. Open Questions

1. **Pricing**: Final price decision (39 lei vs 49 lei)? → **Decision needed from product team**
2. **Email for Authenticated Users**: Use account email automatically or still collect? → **Decision: Use account email automatically, skip email gate**
3. **Report Expiration**: Set expiration to 10 years or truly permanent (null)? → **Decision: 10 years (practically permanent)**
4. **Club Suggestions**: How many clubs to suggest? → **Decision: 3-5 clubs per recommended sport**
5. **AI Prompt Enhancement**: Enhance existing prompt or create separate prompt for report sections? → **Decision: Enhance existing prompt**

---

## 12. Risk Assessment

### 12.1 Technical Risks

- **Low Risk**: Payment provider integration (well-documented, standard patterns)
- **Low Risk**: PDF generation (mature libraries available)
- **Medium Risk**: AI prompt enhancement (may need iteration to get right tone/content)
- **Low Risk**: Database schema changes (straightforward additions)

### 12.2 Business Risks

- **Low Risk**: Payment processing (handled by provider, PCI compliant)
- **Medium Risk**: Conversion rate (may need A/B testing on pricing/UX)
- **Low Risk**: Refund requests (one-time payment, clear value proposition)

### 12.3 Mitigation Strategies

- **Payment Provider**: Use Stripe test mode extensively before production
- **AI Prompts**: Test with multiple quiz inputs, iterate on prompts
- **Conversion Rate**: Track metrics, A/B test pricing and UX
- **Refunds**: Clear value proposition, good customer support

---

## 13. Success Metrics

### 13.1 Technical Metrics

- ✅ Payment processing success rate: >99%
- ✅ PDF generation time: <5 seconds
- ✅ Report page load time: <2 seconds
- ✅ Webhook processing: <1 second

### 13.2 Business Metrics

- ✅ Conversion rate (email → payment): ≥5%
- ✅ Bounce rate (after teaser): <40%
- ✅ Refund rate: ≈0%
- ✅ Payment completion rate: >95%

---

**Document Status**: ✅ Complete  
**Next Phase**: Phase 2 - Database Schema & Payment Integration  
**Last Updated**: 2025-01-XX
