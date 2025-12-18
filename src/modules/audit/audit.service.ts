/**
 * Audit Service
 *
 * Business logic for audit logging.
 * Provides high-level functions for logging admin actions.
 */

import { auditRepository } from "./audit.repository";
import { headers } from "next/headers";

/**
 * Get client IP address from headers
 */
async function getClientIp(): Promise<string | undefined> {
  try {
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");

    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }
    if (realIp) {
      return realIp;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Get user agent from headers
 */
async function getUserAgent(): Promise<string | undefined> {
  try {
    const headersList = await headers();
    return headersList.get("user-agent") || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Log verification status change
 * Note: This function must be called from a Server Action context (where headers() is available)
 */
export async function logVerificationStatusChange(
  userId: string,
  entityType: "club" | "doctor",
  entityId: string,
  oldStatus: "pending" | "in_review" | "approved" | "rejected",
  newStatus: "pending" | "in_review" | "approved" | "rejected",
  reason?: string
): Promise<void> {
  try {
    const ipAddress = await getClientIp();
    const userAgent = await getUserAgent();

    await auditRepository.createAuditLog({
      userId,
      action: "verification_status_changed",
      entityType,
      entityId,
      oldValue: { verificationStatus: oldStatus },
      newValue: { verificationStatus: newStatus },
      metadata: reason ? { reason } : undefined,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    // Don't fail the main operation if audit logging fails
    console.error("[Audit] Failed to log verification status change:", error);
  }
}

/**
 * Log admin action (generic)
 * Note: This function must be called from a Server Action context (where headers() is available)
 */
export async function logAdminAction(
  userId: string,
  action: string,
  entityType: "club" | "doctor",
  entityId: string,
  oldValue?: unknown,
  newValue?: unknown,
  metadata?: unknown
): Promise<void> {
  try {
    const ipAddress = await getClientIp();
    const userAgent = await getUserAgent();

    await auditRepository.createAuditLog({
      userId,
      action,
      entityType,
      entityId,
      oldValue,
      newValue,
      metadata,
      ipAddress,
      userAgent,
    });
  } catch (error) {
    // Don't fail the main operation if audit logging fails
    console.error("[Audit] Failed to log admin action:", error);
  }
}
