/**
 * Payment Repository
 *
 * Data access layer for payments and report access.
 * Uses Drizzle ORM for database operations.
 */

import { db } from "@/lib/db";
import { payments, reportAccess } from "@/lib/db/schema";
import { eq, and, gt, or, isNull, desc } from "drizzle-orm";
import type {
  Payment,
  ReportAccess,
  CreatePaymentInput,
  UpdatePaymentInput,
  CreateReportAccessInput,
} from "./payments.types";

/**
 * Create payment record
 */
export async function createPayment(input: CreatePaymentInput): Promise<Payment> {
  const paymentId = crypto.randomUUID();

  const [payment] = await db
    .insert(payments)
    .values({
      id: paymentId,
      userId: input.userId || null,
      quizId: input.quizId,
      amount: input.amount,
      currency: input.currency || "RON",
      status: "pending",
      paymentProvider: input.paymentProvider,
      paymentProviderId: null,
      paymentProviderMetadata: null,
    })
    .returning();

  return {
    id: payment.id,
    userId: payment.userId,
    quizId: payment.quizId,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status as Payment["status"],
    paymentProvider: payment.paymentProvider as Payment["paymentProvider"],
    paymentProviderId: payment.paymentProviderId,
    paymentProviderMetadata: payment.paymentProviderMetadata as Record<string, unknown> | null,
    createdAt: payment.createdAt,
    completedAt: payment.completedAt,
    updatedAt: payment.updatedAt,
  };
}

/**
 * Get payment by ID
 */
export async function getPaymentById(paymentId: string): Promise<Payment | null> {
  const [payment] = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);

  if (!payment) {
    return null;
  }

  return {
    id: payment.id,
    userId: payment.userId,
    quizId: payment.quizId,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status as Payment["status"],
    paymentProvider: payment.paymentProvider as Payment["paymentProvider"],
    paymentProviderId: payment.paymentProviderId,
    paymentProviderMetadata: payment.paymentProviderMetadata as Record<string, unknown> | null,
    createdAt: payment.createdAt,
    completedAt: payment.completedAt,
    updatedAt: payment.updatedAt,
  };
}

/**
 * Get payment by quiz ID
 *
 * Optimized query using quizIdIdx index.
 * Returns most recent payment for the quiz.
 */
export async function getPaymentByQuizId(quizId: string): Promise<Payment | null> {
  // Use index on quizId for fast lookup
  const [payment] = await db
    .select()
    .from(payments)
    .where(eq(payments.quizId, quizId))
    .orderBy(desc(payments.createdAt)) // Most recent first
    .limit(1);

  if (!payment) {
    return null;
  }

  return {
    id: payment.id,
    userId: payment.userId,
    quizId: payment.quizId,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status as Payment["status"],
    paymentProvider: payment.paymentProvider as Payment["paymentProvider"],
    paymentProviderId: payment.paymentProviderId,
    paymentProviderMetadata: payment.paymentProviderMetadata as Record<string, unknown> | null,
    createdAt: payment.createdAt,
    completedAt: payment.completedAt,
    updatedAt: payment.updatedAt,
  };
}

/**
 * Update payment
 */
export async function updatePayment(
  paymentId: string,
  input: UpdatePaymentInput
): Promise<Payment> {
  const updateData: {
    status?: "pending" | "completed" | "failed" | "refunded";
    paymentProviderId?: string | null;
    paymentProviderMetadata?: Record<string, unknown> | null;
    completedAt?: Date | null;
    updatedAt: Date;
  } = {
    updatedAt: new Date(),
  };

  if (input.status !== undefined) {
    updateData.status = input.status;
  }
  if (input.paymentProviderId !== undefined) {
    updateData.paymentProviderId = input.paymentProviderId;
  }
  if (input.paymentProviderMetadata !== undefined) {
    updateData.paymentProviderMetadata = input.paymentProviderMetadata;
  }
  if (input.completedAt !== undefined) {
    updateData.completedAt = input.completedAt;
  }

  const [payment] = await db
    .update(payments)
    .set(updateData)
    .where(eq(payments.id, paymentId))
    .returning();

  return {
    id: payment.id,
    userId: payment.userId,
    quizId: payment.quizId,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status as Payment["status"],
    paymentProvider: payment.paymentProvider as Payment["paymentProvider"],
    paymentProviderId: payment.paymentProviderId,
    paymentProviderMetadata: payment.paymentProviderMetadata as Record<string, unknown> | null,
    createdAt: payment.createdAt,
    completedAt: payment.completedAt,
    updatedAt: payment.updatedAt,
  };
}

/**
 * Create report access record
 */
export async function createReportAccess(input: CreateReportAccessInput): Promise<ReportAccess> {
  const accessId = crypto.randomUUID();
  const accessToken = crypto.randomUUID(); // UUID v4 for access token

  // Set expiration to 10 years from now if not provided (practically permanent)
  const expiresAt = input.expiresAt || new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000);

  const [access] = await db
    .insert(reportAccess)
    .values({
      id: accessId,
      quizId: input.quizId,
      paymentId: input.paymentId,
      accessToken,
      expiresAt,
    })
    .returning();

  return {
    id: access.id,
    quizId: access.quizId,
    paymentId: access.paymentId,
    accessToken: access.accessToken,
    expiresAt: access.expiresAt,
    createdAt: access.createdAt,
    lastAccessedAt: access.lastAccessedAt,
  };
}

/**
 * Get report access by token
 *
 * Optimized query with proper index usage (accessTokenIdx).
 */
export async function getReportAccessByToken(token: string): Promise<ReportAccess | null> {
  const now = new Date();

  // Use index on accessToken for fast lookup
  const [access] = await db
    .select()
    .from(reportAccess)
    .where(
      and(
        eq(reportAccess.accessToken, token),
        // Check if not expired: expiresAt is null OR expiresAt > now
        or(isNull(reportAccess.expiresAt), gt(reportAccess.expiresAt, now))
      )
    )
    .limit(1);

  if (!access) {
    return null;
  }

  return {
    id: access.id,
    quizId: access.quizId,
    paymentId: access.paymentId,
    accessToken: access.accessToken,
    expiresAt: access.expiresAt,
    createdAt: access.createdAt,
    lastAccessedAt: access.lastAccessedAt,
  };
}

/**
 * Update last accessed timestamp
 */
export async function updateLastAccessed(token: string): Promise<void> {
  await db
    .update(reportAccess)
    .set({
      lastAccessedAt: new Date(),
    })
    .where(eq(reportAccess.accessToken, token));
}

/**
 * Get report access by payment ID
 */
export async function getReportAccessByPaymentId(paymentId: string): Promise<ReportAccess | null> {
  const [access] = await db
    .select()
    .from(reportAccess)
    .where(eq(reportAccess.paymentId, paymentId))
    .limit(1);

  if (!access) {
    return null;
  }

  return {
    id: access.id,
    quizId: access.quizId,
    paymentId: access.paymentId,
    accessToken: access.accessToken,
    expiresAt: access.expiresAt,
    createdAt: access.createdAt,
    lastAccessedAt: access.lastAccessedAt,
  };
}
