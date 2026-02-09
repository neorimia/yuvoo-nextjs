/**
 * Lead Types
 *
 * TypeScript types for lead management system.
 */

// Lead status enum
export enum LeadStatus {
  NOU = "nou", // New lead, just created
  IN_ASTEPTARE = "in_asteptare", // Waiting for club response (after reminder)
  ACCEPTAT = "acceptat", // Accepted by club (payment completed or premium)
  EXPIRAT = "expirat", // Expired (5 days passed without acceptance)
}

// Lead payment method enum
export enum LeadPaymentMethod {
  PAY_PER_LEAD = "pay_per_lead", // One-time payment per lead (3€)
  PREMIUM = "premium", // Premium club subscription (unlimited leads)
}

// Lead payment status enum (for Stripe payment intents)
export enum LeadPaymentStatus {
  PENDING = "pending", // Payment intent created
  SUCCEEDED = "succeeded", // Payment completed
  FAILED = "failed", // Payment failed
}

// Subscription type enum for premium clubs
export enum SubscriptionType {
  MONTHLY = "MONTHLY", // Monthly subscription (99.99 RON/month)
  YEARLY = "YEARLY", // Yearly subscription (999.99 RON/year)
}

// Lead interface (matches database schema)
export interface Lead {
  id: string;
  clubId: string;
  parentId: string | null; // Optional - can be anonymous
  parentName: string;
  parentEmail: string;
  parentPhone: string | null; // Optional but recommended
  childAge: number;
  message: string | null; // Optional message from parent
  sportType: string | null; // Sport name (matches clubs.sportType)
  locationId: string | null; // City/location
  status: LeadStatus;
  createdAt: Date;
  expiresAt: Date; // 5 days from creation
  acceptedAt: Date | null; // When club accepted (paid or premium)
  paymentId: string | null; // Link to payment if pay-per-lead
  paymentMethod: LeadPaymentMethod | null; // 'pay_per_lead' | 'premium' (null if not accepted yet)
  createdBy: string | null; // IP address or user ID for tracking
}

// Create lead input (for form submission)
export interface CreateLeadInput {
  clubId: string;
  parentId?: string | null; // Optional - can be anonymous
  parentName: string;
  parentEmail: string;
  parentPhone?: string | null; // Optional but recommended
  childAge: number;
  message?: string | null; // Optional message from parent
  sportType?: string | null; // Sport name
  locationId?: string | null; // City/location
  ipAddress?: string | null; // IP address for tracking
}

// Update lead status input
export interface UpdateLeadStatusInput {
  leadId: string;
  status: LeadStatus;
}

// Premium Club Status interface
export interface PremiumClubStatus {
  id: string;
  clubId: string;
  isPremium: boolean;
  premiumStartDate: Date | null;
  premiumEndDate: Date | null; // End date based on subscription type (1 month for monthly, 12 months for yearly)
  subscriptionType: SubscriptionType | null; // MONTHLY or YEARLY
  billingPeriod: number | null; // Number of months (1 for monthly, 12 for yearly)
  nextBillingDate: Date | null; // When next payment is due
  billingAmount: number | null; // Amount paid in bani (9999 for monthly, 99999 for yearly)
  stripeSubscriptionId: string | null; // Stripe subscription ID
  stripeCustomerId: string | null; // Stripe customer ID
  createdAt: Date;
  updatedAt: Date;
}

// Lead Payment interface
export interface LeadPayment {
  id: string;
  leadId: string;
  clubId: string;
  amount: number; // Amount in cents (300 = 3€)
  currency: string; // "EUR" for pay-per-lead, "RON" for premium
  paymentMethod: LeadPaymentMethod; // 'pay_per_lead' | 'premium'
  stripePaymentIntentId: string;
  status: LeadPaymentStatus; // 'pending', 'succeeded', 'failed'
  paidAt: Date | null; // When payment completed
  // Guest payment fields (for clubs without user accounts)
  isGuestPayment: boolean; // true if payment from guest (no account)
  guestEmail: string | null; // Email address for guest payments (nullable, only set for guest payments)
  createdAt: Date;
}

// Lead with related data (for display)
export interface LeadWithRelations extends Lead {
  club?: {
    id: string;
    name: string;
    slug: string | null;
  };
  location?: {
    id: string;
    name: string;
    type: string;
  };
}
