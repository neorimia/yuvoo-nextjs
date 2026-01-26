/**
 * Lead Payment Repository
 *
 * Data access layer for lead payments.
 * Handles database queries for lead payment data using Drizzle ORM.
 */

import { db } from "@/lib/db";
import { leadPayments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { LeadPayment, LeadPaymentStatus, LeadPaymentMethod } from "@/types/leads";

/**
 * Map database lead payment record to LeadPayment type
 */
function mapDbPaymentToPayment(dbPayment: typeof leadPayments.$inferSelect): LeadPayment {
  return {
    id: dbPayment.id,
    leadId: dbPayment.leadId,
    clubId: dbPayment.clubId,
    amount: dbPayment.amount,
    currency: dbPayment.currency,
    paymentMethod: dbPayment.paymentMethod as LeadPaymentMethod,
    stripePaymentIntentId: dbPayment.stripePaymentIntentId,
    status: dbPayment.status as LeadPaymentStatus,
    paidAt: dbPayment.paidAt || null,
    isGuestPayment: dbPayment.isGuestPayment || false,
    guestEmail: dbPayment.guestEmail || null,
    createdAt: dbPayment.createdAt,
  };
}

/**
 * Create lead payment
 */
export async function create(input: {
  leadId: string;
  clubId: string;
  amount: number;
  currency: string;
  paymentMethod: LeadPaymentMethod;
  stripePaymentIntentId: string;
  status: LeadPaymentStatus;
  isGuestPayment?: boolean; // Optional: true for guest payments
  guestEmail?: string | null; // Optional: email for guest payments
}): Promise<LeadPayment> {
  const paymentId = crypto.randomUUID();

  const [dbPayment] = await db
    .insert(leadPayments)
    .values({
      id: paymentId,
      leadId: input.leadId,
      clubId: input.clubId,
      amount: input.amount,
      currency: input.currency,
      paymentMethod: input.paymentMethod,
      stripePaymentIntentId: input.stripePaymentIntentId,
      status: input.status,
      isGuestPayment: input.isGuestPayment || false,
      guestEmail: input.guestEmail || null,
    })
    .returning();

  return mapDbPaymentToPayment(dbPayment);
}

/**
 * Find payment by ID
 */
export async function findById(paymentId: string): Promise<LeadPayment | null> {
  const dbPayment = await db.query.leadPayments.findFirst({
    where: eq(leadPayments.id, paymentId),
  });

  if (!dbPayment) {
    return null;
  }

  return mapDbPaymentToPayment(dbPayment);
}

/**
 * Find payment by Stripe payment intent ID
 */
export async function findByStripePaymentIntentId(
  stripePaymentIntentId: string
): Promise<LeadPayment | null> {
  const dbPayment = await db.query.leadPayments.findFirst({
    where: eq(leadPayments.stripePaymentIntentId, stripePaymentIntentId),
  });

  if (!dbPayment) {
    return null;
  }

  return mapDbPaymentToPayment(dbPayment);
}

/**
 * Find payments by lead ID
 */
export async function findByLeadId(leadId: string): Promise<LeadPayment[]> {
  const dbPayments = await db.query.leadPayments.findMany({
    where: eq(leadPayments.leadId, leadId),
  });

  return dbPayments.map(mapDbPaymentToPayment);
}

/**
 * Find payments by club ID
 */
export async function findByClubId(clubId: string): Promise<LeadPayment[]> {
  const dbPayments = await db.query.leadPayments.findMany({
    where: eq(leadPayments.clubId, clubId),
  });

  return dbPayments.map(mapDbPaymentToPayment);
}

/**
 * Update payment status
 */
export async function updateStatus(
  paymentId: string,
  status: LeadPaymentStatus,
  paidAt?: Date | null
): Promise<LeadPayment> {
  const [dbPayment] = await db
    .update(leadPayments)
    .set({
      status,
      paidAt: paidAt || (status === "succeeded" ? new Date() : null),
    })
    .where(eq(leadPayments.id, paymentId))
    .returning();

  if (!dbPayment) {
    throw new Error("Payment not found");
  }

  return mapDbPaymentToPayment(dbPayment);
}

/**
 * Update payment (general update method)
 */
export async function update(
  paymentId: string,
  data: Partial<{
    stripePaymentIntentId: string;
    status: LeadPaymentStatus;
    paidAt: Date | null;
  }>
): Promise<LeadPayment> {
  const [dbPayment] = await db
    .update(leadPayments)
    .set(data)
    .where(eq(leadPayments.id, paymentId))
    .returning();

  if (!dbPayment) {
    throw new Error("Payment not found");
  }

  return mapDbPaymentToPayment(dbPayment);
}

export const leadPaymentRepository = {
  create,
  findById,
  findByStripePaymentIntentId,
  findByLeadId,
  findByClubId,
  updateStatus,
  update,
};
