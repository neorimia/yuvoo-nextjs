━━━━━━━━━━━━━━━━━━━━
FEATURE IMPLEMENTATION PLAN
━━━━━━━━━━━━━━━━━━━━

**Feature Name**: Club Monetization - Lead Generation System (Pay-per-Lead + Premium Club)
**Created**: 2025-01-XX
**Based on**: PARTEA 2 — MONETIZARE CLUBURI requirements
**Following**: Yuvoo Prompting Standard (`memory-bank/promptingSystem.md`)

━━━━━━━━━━━━━━━━━━━━
TASK RESTATEMENT
━━━━━━━━━━━━━━━━━━━━

**Task**: Implement a lead generation monetization system for clubs where: (1) parents can express interest in clubs via a locked lead system, (2) clubs receive notifications about new leads without seeing contact details, (3) clubs can unlock leads by either paying per lead (3€) or upgrading to Premium Club (199 lei/year), (4) leads expire after 5 days with automatic reminders, (5) the system maintains clear separation between B2C (parents) and B2B (clubs) messaging and UX.

**Scope**:

- Lead submission flow (parent → platform)
- Lead notification system (platform → club)
- Pay-per-lead payment flow (3€ per lead)
- Premium Club upgrade flow (199 lei/year)
- Lead management dashboard for clubs
- Lead expiration and reminder system
- Email notifications (parents and clubs)
- Lead status tracking (Nou, În așteptare, Acceptat, Expirat)
- Contact information reveal (after payment/upgrade)
- Fallback logic (expired leads, alternative club suggestions)

**Constraints**:

- All user-facing content MUST be in Romanian
- **CRITICAL**: Clubs do NOT pay to appear on the platform
- **CRITICAL**: Clubs pay ONLY when there's real interest (validated lead)
- NO forced subscriptions or upfront payments
- NO high friction on first contact
- Lead = explicit request from a real parent
- **UX Rule**: Parents NEVER see B2B pricing or "club must pay" messaging
- **UX Rule**: Clubs NEVER see term "lead" - use "cerere", "părinte interesat", "oportunitate"
- Use Next.js 16 Cache Components pattern
- Follow existing Bootstrap 5.3.3 + SCSS styling patterns
- Use shared components where possible
- Maintain consistency with existing codebase patterns
- All Server Actions must use Zod validation
- All pages must have proper role-based access control
- Payment processing must be secure and PCI-compliant
- Lead data must be protected (no free access to parent contact info)
- Lead expiration must be automatic (5 days)
- Reminder system must be automated (48h reminder, 5 day expiration)

**Output Format**: Step-by-step implementation plan with:

- Current state analysis
- Gap identification
- Implementation phases
- Detailed tasks per phase
- Acceptance criteria
- Dependencies and prerequisites
- Technical architecture decisions
- Database schema changes
- Email template requirements

━━━━━━━━━━━━━━━━━━━━
CURRENT STATE ANALYSIS
━━━━━━━━━━━━━━━━━━━━

### ✅ What Exists (Complete)

- [x] Club pages (public club detail pages)
- [x] Club listing pages (with filters)
- [x] User authentication (Stack Auth - complete)
- [x] Database schema for clubs (clubs table exists)
- [x] Database schema for users (users table exists)
- [x] Email service (Brevo - complete, React Email templates implemented)
- [x] Payment integration (Stripe - exists from parent pricing feature)
- [x] Romanian language support (all content in Romanian)
- [x] Club admin authentication (role-based access)

### ⚠️ What Exists (Partial/Needs Enhancement)

- [ ] Club detail pages (need to hide contact info for non-premium clubs)
- [ ] Club admin dashboard (may exist but needs lead management section)
- [ ] Email templates (exist but need lead-specific templates)
- [ ] Payment processing (exists but needs pay-per-lead flow)

### ❌ What's Missing

- [ ] Lead database schema (leads table)
- [ ] Lead submission form/modal (parent side)
- [ ] Lead notification system (email to clubs)
- [ ] Pay-per-lead payment flow (3€)
- [ ] Premium Club upgrade flow (199 lei/year)
- [ ] Lead management dashboard (club admin)
- [ ] Lead status tracking system
- [ ] Lead expiration system (5 days)
- [ ] Reminder system (48h reminder)
- [ ] Contact information reveal (after payment/upgrade)
- [ ] Fallback logic (expired leads, alternative suggestions)
- [ ] Premium Club badge system
- [ ] Premium Club benefits (unlimited leads, priority listing, visible contact)

━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION PLAN
━━━━━━━━━━━━━━━━━━━━

### Phase 1: Database Schema & Core Models (1 day)

**Goal**: Create database schema for leads, premium club status, and payment tracking.

**Route(s)**: N/A (database only)
**File(s)**:

- `src/lib/db/schema.ts` (add leads table, premium_club_status)
- `src/lib/db/migrations/` (create migration)

#### Current State

- ✅ Clubs table exists
- ✅ Users table exists
- ✅ Payment tracking exists (from parent pricing)
- ❌ Leads table missing
- ❌ Premium club status tracking missing
- ❌ Lead payment tracking missing

#### Implementation Tasks

1. **Create Leads Table Schema** (2 hours)
   - [ ] **Add leads table to schema.ts**
     - Fields: id, clubId, parentId (nullable - can be anonymous), parentName, parentEmail, parentPhone (nullable), childAge, message (nullable), sportId, locationId, status (enum: 'nou', 'in_asteptare', 'acceptat', 'expirat'), createdAt, expiresAt, acceptedAt, paymentId (nullable), paymentMethod ('pay_per_lead' | 'premium'), createdBy (IP or user ID)
     - Indexes: clubId, parentEmail, status, expiresAt, createdAt
     - Foreign keys: clubId → clubs.id, parentId → users.id (nullable)
   - [ ] **Add premium_club_status table**
     - Fields: id, clubId, isPremium (boolean), premiumStartDate, premiumEndDate, stripeSubscriptionId (nullable), stripeCustomerId (nullable)
     - Indexes: clubId, isPremium
     - Foreign keys: clubId → clubs.id
   - [ ] **Add lead_payments table**
     - Fields: id, leadId, clubId, amount, currency, paymentMethod, stripePaymentIntentId, status, paidAt
     - Indexes: leadId, clubId, stripePaymentIntentId
     - Foreign keys: leadId → leads.id, clubId → clubs.id

2. **Create TypeScript Types** (1 hour)
   - [ ] **Create lead types** (`src/types/leads.ts`)
     - LeadStatus enum
     - Lead interface
     - CreateLeadInput interface
     - LeadPayment interface
     - PremiumClubStatus interface
   - [ ] **Export types** for use across codebase

3. **Create Zod Validation Schemas** (1 hour)
   - [ ] **Create lead validation schemas** (`src/lib/validations/leads.ts`)
     - createLeadSchema (parentName, parentEmail, parentPhone optional, childAge, message optional, clubId)
     - updateLeadStatusSchema (status, leadId)
     - All error messages in Romanian

4. **Generate and Run Migration** (1 hour)
   - [ ] **Generate migration**
     - Run `npm run db:generate`
   - [ ] **Review migration file**
     - Verify all fields and indexes
   - [ ] **Run migration**
     - Run `npm run db:push` or `npm run db:migrate`

#### Code Example

```typescript
// src/lib/db/schema.ts

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clubId: uuid("club_id")
      .notNull()
      .references(() => clubs.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id").references(() => users.id, { onDelete: "set null" }),
    parentName: varchar("parent_name", { length: 255 }).notNull(),
    parentEmail: varchar("parent_email", { length: 255 }).notNull(),
    parentPhone: varchar("parent_phone", { length: 50 }),
    childAge: integer("child_age").notNull(),
    message: text("message"),
    sportId: uuid("sport_id").references(() => sports.id),
    locationId: uuid("location_id").references(() => locations.id),
    status: varchar("status", { length: 20 }).notNull().default("nou"), // 'nou', 'in_asteptare', 'acceptat', 'expirat'
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    acceptedAt: timestamp("accepted_at"),
    paymentId: uuid("payment_id").references(() => leadPayments.id),
    paymentMethod: varchar("payment_method", { length: 20 }), // 'pay_per_lead' | 'premium'
    createdBy: varchar("created_by", { length: 255 }), // IP address or user ID
  },
  (table) => ({
    clubIdIdx: index("leads_club_id_idx").on(table.clubId),
    parentEmailIdx: index("leads_parent_email_idx").on(table.parentEmail),
    statusIdx: index("leads_status_idx").on(table.status),
    expiresAtIdx: index("leads_expires_at_idx").on(table.expiresAt),
  })
);

export const premiumClubStatus = pgTable(
  "premium_club_status",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clubId: uuid("club_id")
      .notNull()
      .unique()
      .references(() => clubs.id, { onDelete: "cascade" }),
    isPremium: boolean("is_premium").notNull().default(false),
    premiumStartDate: timestamp("premium_start_date"),
    premiumEndDate: timestamp("premium_end_date"),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    clubIdIdx: index("premium_club_status_club_id_idx").on(table.clubId),
    isPremiumIdx: index("premium_club_status_is_premium_idx").on(table.isPremium),
  })
);

export const leadPayments = pgTable(
  "lead_payments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    leadId: uuid("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    clubId: uuid("club_id")
      .notNull()
      .references(() => clubs.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(), // in cents (300 = 3€)
    currency: varchar("currency", { length: 3 }).notNull().default("EUR"),
    paymentMethod: varchar("payment_method", { length: 20 }).notNull(), // 'pay_per_lead' | 'premium'
    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }).notNull(),
    status: varchar("status", { length: 20 }).notNull(), // 'pending', 'succeeded', 'failed'
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    leadIdIdx: index("lead_payments_lead_id_idx").on(table.leadId),
    clubIdIdx: index("lead_payments_club_id_idx").on(table.clubId),
    stripePaymentIntentIdIdx: index("lead_payments_stripe_payment_intent_id_idx").on(
      table.stripePaymentIntentId
    ),
  })
);
```

#### Acceptance Criteria

- ✅ Leads table created with all required fields
- ✅ Premium club status table created
- ✅ Lead payments table created
- ✅ All indexes created for performance
- ✅ Foreign keys properly configured
- ✅ TypeScript types exported
- ✅ Zod schemas created with Romanian error messages
- ✅ Migration runs successfully
- ✅ Database schema matches requirements

**Deliverable**: Complete database schema for leads, premium clubs, and payments.

---

### Phase 2: Service Layer & Repository (1.5 days)

**Goal**: Create business logic layer for lead management, premium club management, and payment processing.

**Route(s)**: N/A (services only)
**File(s)**:

- `src/modules/leads/leads.service.ts`
- `src/modules/leads/leads.repository.ts`
- `src/modules/clubs/premium-club.service.ts`
- `src/modules/clubs/premium-club.repository.ts`
- `src/modules/payments/lead-payment.service.ts`

#### Current State

- ✅ Payment service exists (from parent pricing)
- ✅ Club service exists (basic CRUD)
- ❌ Lead service missing
- ❌ Premium club service missing
- ❌ Lead payment service missing

#### Implementation Tasks

1. **Create Lead Repository** (3 hours)
   - [ ] **Create leads.repository.ts**
     - `createLead()` - Create new lead with 5-day expiration
     - `getLeadById()` - Get lead by ID (with club and parent info)
     - `getLeadsByClubId()` - Get all leads for a club (with filters)
     - `updateLeadStatus()` - Update lead status
     - `getExpiredLeads()` - Get leads that expired (for cleanup job)
     - `getLeadsNeedingReminder()` - Get leads needing 48h reminder
     - `acceptLead()` - Mark lead as accepted (with payment info)
   - [ ] **Use Drizzle ORM queries**
     - Proper joins for club, parent, sport, location
     - Efficient queries with indexes

2. **Create Lead Service** (4 hours)
   - [ ] **Create leads.service.ts**
     - `createLead()` - Validate input, create lead, send notification to club
     - `getLeadForClub()` - Get lead details for club (hide contact if not paid)
     - `getLeadsForClubDashboard()` - Get paginated leads for club dashboard
     - `expireLead()` - Mark lead as expired, notify parent with alternatives
     - `sendReminderToClub()` - Send 48h reminder email to club
     - `getParentLeadStatus()` - Get lead status for parent (without revealing club contact)
   - [ ] **Business logic**:
     - Calculate expiration date (5 days from creation)
     - Check if club is premium before revealing contact
     - Validate lead ownership (club can only see their leads)
     - Handle lead expiration logic

3. **Create Premium Club Repository** (2 hours)
   - [ ] **Create premium-club.repository.ts**
     - `getPremiumStatus()` - Get premium status for club
     - `setPremiumStatus()` - Set premium status (with dates)
     - `getPremiumClubs()` - Get all premium clubs
     - `updatePremiumStatus()` - Update premium status
   - [ ] **Use Drizzle ORM queries**

4. **Create Premium Club Service** (3 hours)
   - [ ] **Create premium-club.service.ts**
     - `checkIsPremium()` - Check if club is premium (with date validation)
     - `upgradeToPremium()` - Process premium upgrade (199 lei/year)
     - `getPremiumBenefits()` - Get premium benefits description
     - `handlePremiumExpiration()` - Handle premium expiration (for cron job)
   - [ ] **Business logic**:
     - Validate premium dates (1 year from start)
     - Check if premium is still active
     - Handle premium expiration

5. **Create Lead Payment Service** (3 hours)
   - [ ] **Create lead-payment.service.ts**
     - `createPayPerLeadPayment()` - Create Stripe payment intent for 3€
     - `processPayPerLeadPayment()` - Process payment completion
     - `unlockLeadAfterPayment()` - Unlock lead contact info after payment
     - `handlePaymentFailure()` - Handle payment failure
   - [ ] **Integration with Stripe**:
     - Use existing Stripe setup from parent pricing
     - Create payment intent (3€ = 300 cents)
     - Handle webhook for payment confirmation
     - Update lead status after payment

#### Code Example

```typescript
// src/modules/leads/leads.service.ts

import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { createLead as createLeadRepo, getLeadById, updateLeadStatus } from "./leads.repository";
import { sendLeadNotificationEmail } from "@/modules/emails/lead-emails.service";
import { addDays } from "date-fns";

export async function createLead(input: CreateLeadInput) {
  // Validate input
  const validated = createLeadSchema.parse(input);

  // Calculate expiration (5 days from now)
  const expiresAt = addDays(new Date(), 5);

  // Create lead
  const lead = await createLeadRepo({
    ...validated,
    expiresAt,
    status: "nou",
    createdBy: input.ipAddress || null,
  });

  // Send notification to club (without contact details)
  await sendLeadNotificationEmail({
    clubId: validated.clubId,
    leadId: lead.id,
    sport: validated.sportName,
    childAge: validated.childAge,
    location: validated.locationName,
  });

  // Schedule reminder (48h) - use cron job or queue
  // Schedule expiration (5 days) - use cron job or queue

  return lead;
}

export async function getLeadForClub(leadId: string, clubId: string) {
  const lead = await getLeadById(leadId);

  // Verify ownership
  if (lead.clubId !== clubId) {
    throw new Error("Nu aveți acces la această cerere");
  }

  // Check if contact info should be revealed
  const isPremium = await checkIsPremium(clubId);
  const isPaid = lead.paymentId !== null;

  if (!isPremium && !isPaid) {
    // Hide contact info
    return {
      ...lead,
      parentName: null,
      parentEmail: null,
      parentPhone: null,
    };
  }

  return lead;
}
```

#### Acceptance Criteria

- ✅ All repository functions implemented
- ✅ All service functions implemented
- ✅ Business logic correctly handles lead expiration
- ✅ Business logic correctly handles premium status
- ✅ Payment processing integrated with Stripe
- ✅ Error handling in place (Romanian error messages)
- ✅ Type safety maintained throughout
- ✅ All functions properly typed

**Deliverable**: Complete service layer for leads, premium clubs, and payments.

---

### Phase 3: Lead Submission Flow (Parent Side) (2 days)

**Goal**: Implement lead submission modal and flow for parents on club detail pages.

**Route(s)**:

- `/cluburi/[slug]` (modify existing page)
  **File(s)**:
- `src/app/(public)/cluburi/[slug]/page.tsx` (modify)
- `src/components/features/clubs/LeadSubmissionModal.tsx` (new)
- `src/app/actions/leads.ts` (new)

#### Current State

- ✅ Club detail page exists
- ✅ Club contact information displayed
- ❌ Lead submission modal missing
- ❌ Contact info hiding logic missing (for non-premium clubs)

#### Implementation Tasks

1. **Modify Club Detail Page** (2 hours)
   - [ ] **Hide contact info for non-premium clubs**
     - Check if club is premium
     - Hide email, phone, address if not premium
     - Show "Sunt interesat" button instead
   - [ ] **Add lead submission button**
     - Button: "Sunt interesat"
     - Opens modal on click
     - Only show if club is not premium OR if parent wants to submit lead anyway

2. **Create Lead Submission Modal Component** (4 hours)
   - [ ] **Create LeadSubmissionModal.tsx**
     - Modal with Bootstrap styling
     - Form fields:
       - Nume părinte (required)
       - Email (required)
       - Telefon (optional but recommended)
       - Vârsta copilului (required, number input)
       - Mesaj scurt (optional, textarea)
     - Explanation text: "Trimite interesul tău către acest club. Te vom anunța dacă acesta răspunde."
     - Submit button: "Trimite interesul"
     - Loading state during submission
     - Success state: "Interes trimis către club"
     - Error handling with Romanian messages
   - [ ] **Client component** (`'use client'`)
     - Use React Hook Form for form management
     - Use Zod validation (client-side)
     - Handle form submission

3. **Create Lead Submission Server Action** (3 hours)
   - [ ] **Create app/actions/leads.ts**
     - `submitLeadAction()` - Server action to create lead
     - Validate input with Zod
     - Call lead service to create lead
     - Return success/error
   - [ ] **Error handling**:
     - Romanian error messages
     - Proper error types
   - [ ] **PostHog tracking**:
     - Track lead submission event
     - Track club ID, sport, location

4. **Create Lead Status Page for Parents** (3 hours)
   - [ ] **Create route**: `/parent/leaduri/[leadId]` (if needed)
     - Show lead status
     - Show "Interes trimis către club" message
     - Show expiration countdown (if applicable)
     - Show alternative clubs if expired
   - [ ] **Or integrate into existing parent dashboard**

5. **Update Club Card Component** (2 hours)
   - [ ] **Modify ClubCard.tsx** (if used on listing pages)
     - Check premium status
     - Show/hide contact info accordingly
     - Add "Sunt interesat" button for non-premium clubs

#### Code Example

```typescript
// src/components/features/clubs/LeadSubmissionModal.tsx

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLeadSchema } from "@/lib/validations/leads";
import { submitLeadAction } from "@/app/actions/leads";

interface LeadSubmissionModalProps {
  clubId: string;
  clubName: string;
  sportName?: string;
  locationName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadSubmissionModal({
  clubId,
  clubName,
  sportName,
  locationName,
  isOpen,
  onClose,
}: LeadSubmissionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createLeadSchema),
  });

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    try {
      const result = await submitLeadAction({
        ...data,
        clubId,
        sportName,
        locationName,
      });

      if (result.success) {
        setSubmitSuccess(true);
        reset();
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
        }, 2000);
      }
    } catch (error) {
      // Error handling
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sunt interesat</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="mb-4">
              Trimite interesul tău către acest club. Te vom anunța dacă acesta răspunde.
            </p>

            {submitSuccess ? (
              <div className="alert alert-success">
                Interes trimis către club
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Nume părinte *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.parentName ? 'is-invalid' : ''}`}
                    {...register('parentName')}
                  />
                  {errors.parentName && (
                    <div className="invalid-feedback">
                      {errors.parentName.message as string}
                    </div>
                  )}
                </div>

                {/* Other form fields */}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Se trimite...' : 'Trimite interesul'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### Acceptance Criteria

- ✅ Contact info hidden for non-premium clubs
- ✅ "Sunt interesat" button displayed for non-premium clubs
- ✅ Lead submission modal opens correctly
- ✅ Form validation works (client and server)
- ✅ Lead submission succeeds
- ✅ Success message displayed
- ✅ Error handling works
- ✅ PostHog tracking implemented
- ✅ All text in Romanian
- ✅ Modal styling matches Bootstrap theme

**Deliverable**: Complete lead submission flow for parents.

---

### Phase 4: Club Notification & Payment Flow (2.5 days)

**Goal**: Implement email notifications to clubs and payment flow (pay-per-lead and premium upgrade).

**Route(s)**:

- `/club/dashboard/leaduri` (new - lead management)
- `/club/dashboard/leaduri/[leadId]` (new - lead detail)
- `/club/dashboard/leaduri/[leadId]/plata` (new - payment page)
- `/club/dashboard/premium` (new - premium upgrade page)

**File(s)**:

- `src/app/(auth)/club/dashboard/leaduri/page.tsx` (new)
- `src/app/(auth)/club/dashboard/leaduri/[leadId]/page.tsx` (new)
- `src/app/(auth)/club/dashboard/leaduri/[leadId]/plata/page.tsx` (new)
- `src/app/(auth)/club/dashboard/premium/page.tsx` (new)
- `src/components/features/clubs/LeadManagementDashboard.tsx` (new)
- `src/components/features/clubs/LeadDetailView.tsx` (new)
- `src/components/features/clubs/PayPerLeadPayment.tsx` (new)
- `src/components/features/clubs/PremiumUpgrade.tsx` (new)
- `src/modules/emails/lead-emails.service.ts` (new)
- `src/app/api/webhooks/stripe-lead-payment.ts` (new)

#### Current State

- ✅ Email service exists (Brevo)
- ✅ React Email templates exist
- ✅ Stripe payment integration exists
- ✅ Club dashboard exists (basic)
- ❌ Lead notification emails missing
- ❌ Lead management pages missing
- ❌ Pay-per-lead flow missing
- ❌ Premium upgrade flow missing

#### Implementation Tasks

1. **Create Lead Notification Email Templates** (3 hours)
   - [ ] **Create email template** (`src/modules/emails/templates/lead-notification.tsx`)
     - Subject: "Un părinte caută [SPORT] pentru copil de [VÂRSTĂ] ani, în [ORAȘ]"
     - Body:
       - "Un părinte caută [SPORT] pentru copil de [VÂRSTĂ] ani, în [ORAȘ]."
       - "Vrei să vezi datele de contact?"
       - CTA button: "Vezi cererea" (links to lead detail page)
     - **CRITICAL**: NO parent name, email, or phone in email
     - Only show: sport, child age, location
   - [ ] **Create reminder email template** (`src/modules/emails/templates/lead-reminder.tsx`)
     - Subject: "Ai o cerere în așteptare"
     - Body: Reminder about pending lead (48h after creation)
     - CTA: "Vezi cererea"
   - [ ] **Create expiration notification** (for parent)
     - Subject: "Îți recomandăm alte cluburi similare"
     - Body: Lead expired, suggest alternative clubs

2. **Create Lead Email Service** (2 hours)
   - [ ] **Create lead-emails.service.ts**
     - `sendLeadNotificationEmail()` - Send notification to club
     - `sendLeadReminderEmail()` - Send 48h reminder
     - `sendLeadExpiredEmailToParent()` - Notify parent of expiration
     - `sendLeadAcceptedEmailToParent()` - Notify parent when club accepts

3. **Create Lead Management Dashboard** (4 hours)
   - [ ] **Create LeadManagementDashboard.tsx**
     - List all leads for club (paginated)
     - Filters: status (Nou, În așteptare, Acceptat, Expirat)
     - Sort: newest first
     - Show: sport, child age, location, status, created date
     - Click to view lead detail
     - Show count of new leads
   - [ ] **Server component** (data fetching)
     - Fetch leads for club
     - Check premium status

4. **Create Lead Detail Page** (4 hours)
   - [ ] **Create lead detail page** (`/club/dashboard/leaduri/[leadId]`)
     - Show lead information
     - **If contact hidden**: Show paywall options
       - Option A: Pay per Lead (3€)
       - Option B: Upgrade to Premium (199 lei/year)
     - **If contact visible**: Show full lead details
     - Show lead status
     - Show expiration countdown
     - Action buttons: Accept, Decline (if applicable)

5. **Create Pay-Per-Lead Payment Flow** (4 hours)
   - [ ] **Create payment page** (`/club/dashboard/leaduri/[leadId]/plata`)
     - Show lead summary (without contact)
     - Show price: 3€
     - Stripe payment form
     - Process payment
     - On success: unlock lead, redirect to lead detail
   - [ ] **Create Stripe payment intent**
     - Amount: 300 cents (3€)
     - Currency: EUR
     - Metadata: leadId, clubId
   - [ ] **Handle webhook**
     - Update lead payment status
     - Unlock lead contact info
     - Send confirmation email to club

6. **Create Premium Upgrade Flow** (4 hours)
   - [ ] **Create premium upgrade page** (`/club/dashboard/premium`)
     - Show premium benefits:
       - Badge "Verificat Yuvoo"
       - Acces nelimitat la cereri
       - Afișare prioritară în listări
       - Date de contact vizibile pentru părinți
       - Notificări instant pentru cereri noi
     - Price: 199 lei/an
     - Stripe payment form (subscription or one-time)
     - Process payment
     - On success: activate premium, unlock all leads
   - [ ] **Create Stripe subscription**
     - Amount: 19900 cents (199 lei)
     - Currency: RON
     - Interval: year
     - Metadata: clubId

7. **Update Club Dashboard Navigation** (1 hour)
   - [ ] **Add "Cereri" link** to club dashboard
     - Show badge with new leads count
   - [ ] **Add "Premium" link** to club dashboard
     - Show premium status badge

#### Code Example

```typescript
// src/modules/emails/templates/lead-notification.tsx

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";

interface LeadNotificationEmailProps {
  clubName: string;
  sportName: string;
  childAge: number;
  locationName: string;
  leadId: string;
}

export function LeadNotificationEmail({
  clubName,
  sportName,
  childAge,
  locationName,
  leadId,
}: LeadNotificationEmailProps) {
  const leadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/club/dashboard/leaduri/${leadId}`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Bună, {clubName}!</Text>

          <Text style={paragraph}>
            Un părinte caută <strong>{sportName}</strong> pentru copil de{" "}
            <strong>{childAge} ani</strong>, în <strong>{locationName}</strong>.
          </Text>

          <Text style={paragraph}>
            Vrei să vezi datele de contact?
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={leadUrl}>
              Vezi cererea
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Această cerere expiră în 5 zile.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
```

#### Acceptance Criteria

- ✅ Lead notification emails sent to clubs
- ✅ Email contains NO parent contact info
- ✅ Email contains sport, age, location only
- ✅ Reminder emails sent after 48h
- ✅ Lead management dashboard displays leads
- ✅ Lead detail page shows paywall for unpaid leads
- ✅ Pay-per-lead payment flow works (3€)
- ✅ Premium upgrade flow works (199 lei/year)
- ✅ Lead contact info unlocked after payment
- ✅ Stripe webhooks handle payment confirmation
- ✅ All text in Romanian
- ✅ UX follows B2B messaging rules (no "lead" term)

**Deliverable**: Complete club notification and payment flow.

---

### Phase 5: Lead Expiration & Reminder System (1.5 days)

**Goal**: Implement automated lead expiration (5 days) and reminder system (48h).

**Route(s)**: N/A (background jobs)
**File(s)**:

- `src/app/api/cron/expire-leads.ts` (new)
- `src/app/api/cron/send-lead-reminders.ts` (new)
- `src/modules/leads/lead-expiration.service.ts` (new)

#### Current State

- ✅ Database has expiresAt field
- ✅ Email service exists
- ❌ Expiration job missing
- ❌ Reminder job missing
- ❌ Expiration logic missing

#### Implementation Tasks

1. **Create Lead Expiration Service** (3 hours)
   - [ ] **Create lead-expiration.service.ts**
     - `expireLeads()` - Find expired leads, mark as expired
     - `notifyParentOfExpiration()` - Send email to parent with alternatives
     - `suggestAlternativeClubs()` - Find similar clubs to suggest
   - [ ] **Business logic**:
     - Find leads where expiresAt < now AND status = 'nou' or 'in_asteptare'
     - Update status to 'expirat'
     - Send email to parent
     - Suggest 3-5 alternative clubs (same sport, same location)

2. **Create Expiration Cron Job** (2 hours)
   - [ ] **Create API route** (`/api/cron/expire-leads`)
     - Protected route (cron secret or Vercel Cron)
     - Call expiration service
     - Log results
   - [ ] **Configure Vercel Cron** (or similar)
     - Run daily at midnight
     - Or use queue system (if available)

3. **Create Reminder Service** (2 hours)
   - [ ] **Create reminder logic in leads.service.ts**
     - `getLeadsNeedingReminder()` - Find leads created 48h ago, not accepted
     - `sendReminderToClub()` - Send reminder email
   - [ ] **Business logic**:
     - Find leads where createdAt = 48h ago AND status = 'nou'
     - Send reminder email
     - Update status to 'in_asteptare' (optional)

4. **Create Reminder Cron Job** (2 hours)
   - [ ] **Create API route** (`/api/cron/send-lead-reminders`)
     - Protected route (cron secret)
     - Call reminder service
     - Log results
   - [ ] **Configure Vercel Cron**
     - Run every hour (or twice daily)

5. **Create Expiration Email Template** (2 hours)
   - [ ] **Create expiration email template**
     - Subject: "Îți recomandăm alte cluburi similare"
     - Body:
       - Explain lead expired
       - List 3-5 alternative clubs
       - CTA: "Vezi cluburi alternative"
     - All text in Romanian

#### Code Example

```typescript
// src/modules/leads/lead-expiration.service.ts

import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { eq, and, lt, or } from "drizzle-orm";
import { sendLeadExpiredEmailToParent } from "@/modules/emails/lead-emails.service";
import { suggestAlternativeClubs } from "@/modules/clubs/clubs.service";

export async function expireLeads() {
  const now = new Date();

  // Find expired leads
  const expiredLeads = await db.query.leads.findMany({
    where: and(
      lt(leads.expiresAt, now),
      or(eq(leads.status, "nou"), eq(leads.status, "in_asteptare"))
    ),
    with: {
      club: true,
    },
  });

  // Update status and notify parents
  for (const lead of expiredLeads) {
    await db.update(leads).set({ status: "expirat" }).where(eq(leads.id, lead.id));

    // Find alternative clubs
    const alternatives = await suggestAlternativeClubs({
      sportId: lead.sportId,
      locationId: lead.locationId,
      excludeClubId: lead.clubId,
      limit: 5,
    });

    // Send email to parent
    await sendLeadExpiredEmailToParent({
      parentEmail: lead.parentEmail,
      parentName: lead.parentName,
      clubName: lead.club.name,
      alternativeClubs: alternatives,
    });
  }

  return {
    expired: expiredLeads.length,
  };
}
```

#### Acceptance Criteria

- ✅ Expiration cron job runs daily
- ✅ Expired leads marked correctly
- ✅ Parents notified of expiration
- ✅ Alternative clubs suggested
- ✅ Reminder cron job runs (hourly or twice daily)
- ✅ Reminder emails sent after 48h
- ✅ All emails in Romanian
- ✅ Cron jobs protected with secret
- ✅ Logging in place

**Deliverable**: Automated lead expiration and reminder system.

---

### Phase 6: Premium Club Benefits Implementation (1.5 days)

**Goal**: Implement Premium Club benefits (badge, priority listing, visible contact, unlimited leads).

**Route(s)**:

- `/cluburi` (modify - priority sorting)
- `/cluburi/[slug]` (modify - show badge, contact info)
- Club admin dashboard (modify - show premium status)

**File(s)**:

- `src/components/features/clubs/PremiumBadge.tsx` (new)
- `src/modules/clubs/clubs-listing.service.ts` (modify - priority sorting)
- `src/app/(public)/cluburi/page.tsx` (modify)

#### Current State

- ✅ Club listing page exists
- ✅ Club detail page exists
- ✅ Premium status tracking exists (Phase 1)
- ❌ Premium badge missing
- ❌ Priority listing missing
- ❌ Contact info visibility logic missing

#### Implementation Tasks

1. **Create Premium Badge Component** (1 hour)
   - [ ] **Create PremiumBadge.tsx**
     - Badge: "Verificat Yuvoo" or "Premium"
     - Bootstrap badge styling
     - Icon (checkmark or star)
     - Tooltip: "Club Premium Yuvoo"

2. **Update Club Listing to Show Premium First** (3 hours)
   - [ ] **Modify clubs-listing.service.ts**
     - Add priority sorting: premium clubs first
     - Then sort by other criteria (name, rating, etc.)
   - [ ] **Update listing page**
     - Show premium badge on club cards
     - Highlight premium clubs (optional)

3. **Update Club Detail Page** (2 hours)
   - [ ] **Show premium badge** if club is premium
   - [ ] **Show contact info** if club is premium
   - [ ] **Hide "Sunt interesat" button** if premium (or show both)

4. **Update Club Card Component** (2 hours)
   - [ ] **Show premium badge** on club cards
   - [ ] **Show contact info** if premium
   - [ ] **Hide contact info** if not premium

5. **Update Club Admin Dashboard** (2 hours)
   - [ ] **Show premium status** in dashboard
   - [ ] **Show premium expiration date** if premium
   - [ ] **Link to premium upgrade** if not premium
   - [ ] **Show premium benefits** summary

#### Code Example

```typescript
// src/components/features/clubs/PremiumBadge.tsx

import { Badge } from "react-bootstrap";

export function PremiumBadge() {
  return (
    <Badge bg="primary" className="ms-2">
      <i className="bi bi-check-circle-fill me-1"></i>
      Verificat Yuvoo
    </Badge>
  );
}

// src/modules/clubs/clubs-listing.service.ts

export async function getClubsForListing(filters: ClubFilters) {
  const clubs = await db.query.clubs.findMany({
    where: buildWhereClause(filters),
    with: {
      premiumStatus: true,
    },
  });

  // Sort: premium first, then by other criteria
  return clubs.sort((a, b) => {
    const aIsPremium = a.premiumStatus?.isPremium &&
      new Date(a.premiumStatus.premiumEndDate) > new Date();
    const bIsPremium = b.premiumStatus?.isPremium &&
      new Date(b.premiumStatus.premiumEndDate) > new Date();

    if (aIsPremium && !bIsPremium) return -1;
    if (!aIsPremium && bIsPremium) return 1;

    // Then sort by other criteria (name, rating, etc.)
    return a.name.localeCompare(b.name);
  });
}
```

#### Acceptance Criteria

- ✅ Premium badge displayed on premium clubs
- ✅ Premium clubs appear first in listings
- ✅ Contact info visible for premium clubs
- ✅ Contact info hidden for non-premium clubs
- ✅ Premium status shown in club admin dashboard
- ✅ All styling matches Bootstrap theme
- ✅ Badge is visually distinct

**Deliverable**: Complete Premium Club benefits implementation.

---

### Phase 7: Integration & Testing (1 day)

**Goal**: Integrate all components, add PostHog tracking, and test complete flow.

**Route(s)**: All routes from previous phases
**File(s)**: Various

#### Current State

- ✅ All phases completed
- ❌ PostHog tracking missing
- ❌ End-to-end testing missing
- ❌ Error handling review missing

#### Implementation Tasks

1. **Add PostHog Tracking** (3 hours)
   - [ ] **Track lead submission** (parent side)
     - Event: "lead_submitted"
     - Properties: clubId, sportId, locationId, childAge
   - [ ] **Track lead view** (club side)
     - Event: "lead_viewed"
     - Properties: leadId, clubId
   - [ ] **Track pay-per-lead payment**
     - Event: "lead_payment_initiated"
     - Event: "lead_payment_completed"
     - Properties: leadId, clubId, amount
   - [ ] **Track premium upgrade**
     - Event: "premium_upgrade_initiated"
     - Event: "premium_upgrade_completed"
     - Properties: clubId, amount
   - [ ] **Track lead expiration**
     - Event: "lead_expired"
     - Properties: leadId, clubId

2. **End-to-End Testing** (3 hours)
   - [ ] **Test parent flow**:
     - Submit lead on non-premium club
     - Check email received
     - Check lead status page
   - [ ] **Test club flow**:
     - Receive notification email
     - View lead (contact hidden)
     - Pay per lead
     - View contact info
   - [ ] **Test premium flow**:
     - Upgrade to premium
     - Check premium badge
     - Check contact visible
     - Check unlimited leads access
   - [ ] **Test expiration**:
     - Create test lead
     - Wait for expiration (or manually expire)
     - Check parent notification
     - Check alternative clubs suggested

3. **Error Handling Review** (2 hours)
   - [ ] **Review all error cases**:
     - Invalid lead ID
     - Unauthorized access
     - Payment failure
     - Email sending failure
     - Expiration job failure
   - [ ] **Add proper error handling**:
     - Romanian error messages
     - Proper HTTP status codes
     - Logging for debugging

4. **Documentation** (1 hour)
   - [ ] **Update API documentation** (if applicable)
   - [ ] **Update README** with new features
   - [ ] **Document cron jobs** setup

#### Acceptance Criteria

- ✅ PostHog tracking implemented for all key events
- ✅ End-to-end flow tested (parent → club → payment)
- ✅ Premium flow tested
- ✅ Expiration flow tested
- ✅ Error handling reviewed and improved
- ✅ All error messages in Romanian
- ✅ Documentation updated

**Deliverable**: Complete, tested, and documented lead monetization system.

━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION PRIORITIES
━━━━━━━━━━━━━━━━━━━━

### Priority 1 (Critical - Must Have)

- Phase 1: Database Schema & Core Models
- Phase 2: Service Layer & Repository
- Phase 3: Lead Submission Flow (Parent Side)
- Phase 4: Club Notification & Payment Flow

### Priority 2 (High - Should Have)

- Phase 5: Lead Expiration & Reminder System
- Phase 6: Premium Club Benefits Implementation

### Priority 3 (Medium - Nice to Have)

- Phase 7: Integration & Testing (can be done incrementally)

━━━━━━━━━━━━━━━━━━━━
DEPENDENCIES & PREREQUISITES
━━━━━━━━━━━━━━━━━━━━

### Technical Dependencies

- Next.js 16 with Cache Components
- Stripe payment integration (already exists)
- Brevo email service (already exists)
- React Email templates (already exists)
- Drizzle ORM (already exists)
- PostHog (already exists)
- Bootstrap 5.3.3 + SCSS (already exists)
- Vercel Cron (or similar cron job system)

### Code Dependencies

- Club service (`modules/clubs/`)
- Email service (`modules/emails/`)
- Payment service (`modules/payments/`)
- Authentication (`lib/auth/`)
- Routes (`lib/routes.ts`)

### Prerequisites

- ✅ Stripe account configured
- ✅ Brevo account configured
- ✅ Database access
- ✅ Vercel deployment (for cron jobs)
- ⚠️ Club admin dashboard exists (may need to create)

━━━━━━━━━━━━━━━━━━━━
ACCEPTANCE CRITERIA (Overall)
━━━━━━━━━━━━━━━━━━━━

### Functional Requirements

- ✅ Parents can submit leads for non-premium clubs
- ✅ Clubs receive email notifications (without contact info)
- ✅ Clubs can pay per lead (3€) to unlock contact info
- ✅ Clubs can upgrade to Premium (199 lei/year) for unlimited leads
- ✅ Leads expire after 5 days
- ✅ Reminders sent after 48h
- ✅ Premium clubs show badge and contact info
- ✅ Premium clubs appear first in listings
- ✅ Parents receive notifications (submission, expiration, acceptance)

### Non-Functional Requirements

- ✅ All content in Romanian
- ✅ Secure payment processing (PCI-compliant)
- ✅ Protected lead data (no free access)
- ✅ Automated expiration and reminders
- ✅ Performance: Lead queries optimized with indexes
- ✅ Accessibility: Forms and modals accessible
- ✅ Mobile responsive: All components work on mobile

### Quality Requirements

- ✅ Type safety: All TypeScript types defined
- ✅ Validation: Zod schemas for all inputs
- ✅ Error handling: Romanian error messages
- ✅ Testing: End-to-end flow tested
- ✅ Documentation: Code documented, README updated
- ✅ PostHog tracking: All key events tracked

### Business Requirements

- ✅ **CRITICAL**: Clubs do NOT pay to appear
- ✅ **CRITICAL**: Clubs pay ONLY for validated leads
- ✅ **CRITICAL**: No forced subscriptions
- ✅ **CRITICAL**: Low friction for parents
- ✅ Lead = explicit parent request
- ✅ KPI tracking: Lead submit rate, accept rate, time to accept, conversion rate

━━━━━━━━━━━━━━━━━━━━
ESTIMATED EFFORT
━━━━━━━━━━━━━━━━━━━━

- **Phase 1**: 1 day (8 hours)
- **Phase 2**: 1.5 days (12 hours)
- **Phase 3**: 2 days (16 hours)
- **Phase 4**: 2.5 days (20 hours)
- **Phase 5**: 1.5 days (12 hours)
- **Phase 6**: 1.5 days (12 hours)
- **Phase 7**: 1 day (8 hours)
- **Total**: 11 days (88 hours)

**Note**: Phases can be done in parallel where possible (e.g., Phase 3 and Phase 4 can overlap).

━━━━━━━━━━━━━━━━━━━━
NEXT STEPS
━━━━━━━━━━━━━━━━━━━━

1. **Review and approve** this implementation plan
2. **Set up database** - Run Phase 1 migrations
3. **Start with Phase 1** - Database schema
4. **Proceed sequentially** through phases (or in parallel where possible)
5. **Test incrementally** - Test each phase before moving to next
6. **Deploy incrementally** - Deploy each phase as completed

━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━

### Critical UX Rules

1. **For Parents**:
   - NEVER show "club must pay" messaging
   - NEVER show B2B pricing
   - Message: "Trimitem interesul tău către club"

2. **For Clubs**:
   - NEVER use term "lead"
   - Use: "cerere", "părinte interesat", "oportunitate"
   - Focus on opportunity, not transaction

### Business Logic Notes

- Lead expiration: 5 days from creation
- Reminder: 48 hours after creation
- Pay-per-lead: 3€ (300 cents)
- Premium: 199 lei/year (19900 cents)
- Premium benefits: Badge, unlimited leads, priority listing, visible contact

### Technical Notes

- Use existing Stripe integration patterns from parent pricing
- Use existing email templates patterns
- Use existing service layer patterns
- Cron jobs can use Vercel Cron or external service
- Consider queue system for email sending (if high volume)

### Future Enhancements (Out of Scope)

- Lead analytics dashboard for clubs
- Bulk lead export
- Lead response tracking
- Parent-club messaging system
- Lead quality scoring

---

**Last Updated**: 2025-01-XX
**Status**: Ready for Implementation
**Next Action**: Review plan, approve, start Phase 1
