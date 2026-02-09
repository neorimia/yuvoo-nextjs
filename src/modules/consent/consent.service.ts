/**
 * Consent Service Layer
 *
 * Business logic for GDPR-compliant consent management.
 *
 * GDPR Requirements:
 * - Art. 7(1): Controller must demonstrate consent was given
 * - Art. 7(3): Withdrawal must be as easy as giving consent
 * - Art. 9(2)(a): Explicit consent for special category data (health)
 *
 * All consent actions create audit log entries for compliance.
 */

import { db } from "@/lib/db";
import { userConsents, consentAuditLog } from "@/lib/db/schema";
import { eq, and, inArray, isNull, desc } from "drizzle-orm";
import {
  type ConsentType,
  CONSENT_TEXTS,
  CURRENT_PRIVACY_POLICY_VERSION,
  REQUIRED_CONSENTS,
  getConsentFullText,
} from "@/lib/consent/constants";

// ============================================================================
// Types
// ============================================================================

export interface GrantConsentParams {
  userId: string;
  childId?: string;
  consentType: ConsentType;
  ipAddress?: string;
  userAgent?: string;
}

export interface ConsentRecord {
  id: string;
  userId: string;
  childId: string | null;
  consentType: ConsentType;
  status: "granted" | "withdrawn";
  consentVersion: string;
  consentText: string;
  grantedAt: Date;
  withdrawnAt: Date | null;
  updatedAt: Date;
}

export interface ConsentAuditEntry {
  id: string;
  userConsentId: string;
  action: string;
  previousStatus: "granted" | "withdrawn" | null;
  newStatus: "granted" | "withdrawn";
  privacyPolicyVersion: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

// ============================================================================
// Core Consent Operations
// ============================================================================

/**
 * Grant consent for a specific purpose
 * Creates or updates consent record and adds audit log entry
 */
export async function grantConsent({
  userId,
  childId,
  consentType,
  ipAddress,
  userAgent,
}: GrantConsentParams): Promise<ConsentRecord> {
  const consentText = getConsentFullText(consentType);

  // Build where conditions - handle null childId explicitly
  const whereConditions = childId
    ? and(
        eq(userConsents.userId, userId),
        eq(userConsents.childId, childId),
        eq(userConsents.consentType, consentType)
      )
    : and(
        eq(userConsents.userId, userId),
        isNull(userConsents.childId),
        eq(userConsents.consentType, consentType)
      );

  // Check if consent already exists
  const existing = await db.select().from(userConsents).where(whereConditions).limit(1);

  if (existing.length > 0) {
    const existingConsent = existing[0];

    // Update existing consent
    const [updated] = await db
      .update(userConsents)
      .set({
        status: "granted",
        consentVersion: CURRENT_PRIVACY_POLICY_VERSION,
        consentText,
        ipAddress,
        userAgent,
        grantedAt: new Date(),
        withdrawnAt: null,
        updatedAt: new Date(),
      })
      .where(eq(userConsents.id, existingConsent.id))
      .returning();

    // Create audit log entry
    await db.insert(consentAuditLog).values({
      userConsentId: updated.id,
      action: existingConsent.status === "withdrawn" ? "re-granted" : "updated",
      previousStatus: existingConsent.status as "granted" | "withdrawn",
      newStatus: "granted",
      privacyPolicyVersion: CURRENT_PRIVACY_POLICY_VERSION,
      ipAddress,
      userAgent,
    });

    return updated as ConsentRecord;
  }

  // Create new consent
  const [created] = await db
    .insert(userConsents)
    .values({
      userId,
      childId: childId ?? null,
      consentType,
      status: "granted",
      consentVersion: CURRENT_PRIVACY_POLICY_VERSION,
      consentText,
      ipAddress,
      userAgent,
    })
    .returning();

  // Create audit log entry
  await db.insert(consentAuditLog).values({
    userConsentId: created.id,
    action: "granted",
    previousStatus: null,
    newStatus: "granted",
    privacyPolicyVersion: CURRENT_PRIVACY_POLICY_VERSION,
    ipAddress,
    userAgent,
  });

  return created as ConsentRecord;
}

/**
 * Withdraw consent for a specific purpose
 * Updates consent record and adds audit log entry
 */
export async function withdrawConsent({
  userId,
  childId,
  consentType,
  ipAddress,
  userAgent,
}: GrantConsentParams): Promise<ConsentRecord | null> {
  // Build where conditions - handle null childId explicitly
  const whereConditions = childId
    ? and(
        eq(userConsents.userId, userId),
        eq(userConsents.childId, childId),
        eq(userConsents.consentType, consentType),
        eq(userConsents.status, "granted")
      )
    : and(
        eq(userConsents.userId, userId),
        isNull(userConsents.childId),
        eq(userConsents.consentType, consentType),
        eq(userConsents.status, "granted")
      );

  // Find existing granted consent
  const existing = await db.select().from(userConsents).where(whereConditions).limit(1);

  if (existing.length === 0) {
    return null;
  }

  const existingConsent = existing[0];

  // Update consent status to withdrawn
  const [updated] = await db
    .update(userConsents)
    .set({
      status: "withdrawn",
      withdrawnAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(userConsents.id, existingConsent.id))
    .returning();

  // Create audit log entry
  await db.insert(consentAuditLog).values({
    userConsentId: updated.id,
    action: "withdrawn",
    previousStatus: "granted",
    newStatus: "withdrawn",
    privacyPolicyVersion: CURRENT_PRIVACY_POLICY_VERSION,
    ipAddress,
    userAgent,
  });

  return updated as ConsentRecord;
}

/**
 * Grant multiple consents at once (batch operation)
 * Useful during onboarding or quiz flow
 */
export async function grantMultipleConsents({
  userId,
  childId,
  consentTypes,
  ipAddress,
  userAgent,
}: {
  userId: string;
  childId?: string;
  consentTypes: ConsentType[];
  ipAddress?: string;
  userAgent?: string;
}): Promise<ConsentRecord[]> {
  const results: ConsentRecord[] = [];

  for (const consentType of consentTypes) {
    const result = await grantConsent({
      userId,
      childId,
      consentType,
      ipAddress,
      userAgent,
    });
    results.push(result);
  }

  return results;
}

// ============================================================================
// Consent Queries
// ============================================================================

/**
 * Get all consents for a user
 */
export async function getUserConsents(userId: string): Promise<ConsentRecord[]> {
  const consents = await db
    .select()
    .from(userConsents)
    .where(eq(userConsents.userId, userId))
    .orderBy(desc(userConsents.updatedAt));

  return consents as ConsentRecord[];
}

/**
 * Get consents for a specific child
 */
export async function getChildConsents(userId: string, childId: string): Promise<ConsentRecord[]> {
  const consents = await db
    .select()
    .from(userConsents)
    .where(and(eq(userConsents.userId, userId), eq(userConsents.childId, childId)))
    .orderBy(desc(userConsents.updatedAt));

  return consents as ConsentRecord[];
}

/**
 * Get user-level consents (not tied to a specific child)
 */
export async function getUserLevelConsents(userId: string): Promise<ConsentRecord[]> {
  const consents = await db
    .select()
    .from(userConsents)
    .where(and(eq(userConsents.userId, userId), isNull(userConsents.childId)))
    .orderBy(desc(userConsents.updatedAt));

  return consents as ConsentRecord[];
}

/**
 * Check if user has granted specific consent
 */
export async function hasConsent(
  userId: string,
  consentType: ConsentType,
  childId?: string
): Promise<boolean> {
  const whereConditions = childId
    ? and(
        eq(userConsents.userId, userId),
        eq(userConsents.childId, childId),
        eq(userConsents.consentType, consentType),
        eq(userConsents.status, "granted")
      )
    : and(
        eq(userConsents.userId, userId),
        isNull(userConsents.childId),
        eq(userConsents.consentType, consentType),
        eq(userConsents.status, "granted")
      );

  const consent = await db
    .select({ id: userConsents.id })
    .from(userConsents)
    .where(whereConditions)
    .limit(1);

  return consent.length > 0;
}

/**
 * Check if user has all required consents for AI recommendations
 */
export async function hasRequiredConsents(
  userId: string,
  childId?: string
): Promise<{
  hasAll: boolean;
  missing: ConsentType[];
  granted: ConsentType[];
}> {
  const granted: ConsentType[] = [];
  const missing: ConsentType[] = [];

  for (const consentType of REQUIRED_CONSENTS) {
    const has = await hasConsent(userId, consentType, childId);
    if (has) {
      granted.push(consentType);
    } else {
      missing.push(consentType);
    }
  }

  return {
    hasAll: missing.length === 0,
    missing,
    granted,
  };
}

/**
 * Get consent status for multiple consent types
 */
export async function getConsentStatuses(
  userId: string,
  consentTypes: ConsentType[],
  childId?: string
): Promise<Record<ConsentType, boolean>> {
  const statuses: Record<string, boolean> = {};

  for (const consentType of consentTypes) {
    statuses[consentType] = await hasConsent(userId, consentType, childId);
  }

  return statuses as Record<ConsentType, boolean>;
}

// ============================================================================
// Audit & Compliance
// ============================================================================

/**
 * Get consent audit history for a user
 * Used for compliance reporting and data subject requests
 */
export async function getConsentAuditHistory(userId: string): Promise<ConsentAuditEntry[]> {
  // First get all user's consent IDs
  const consents = await db
    .select({ id: userConsents.id })
    .from(userConsents)
    .where(eq(userConsents.userId, userId));

  const consentIds = consents.map((c) => c.id);

  if (consentIds.length === 0) {
    return [];
  }

  // Get audit log entries for those consents
  const auditEntries = await db
    .select()
    .from(consentAuditLog)
    .where(inArray(consentAuditLog.userConsentId, consentIds))
    .orderBy(desc(consentAuditLog.createdAt));

  return auditEntries as ConsentAuditEntry[];
}

/**
 * Get detailed consent status with audit history for a specific consent
 */
export async function getConsentWithHistory(consentId: string): Promise<{
  consent: ConsentRecord | null;
  history: ConsentAuditEntry[];
}> {
  const [consent] = await db
    .select()
    .from(userConsents)
    .where(eq(userConsents.id, consentId))
    .limit(1);

  if (!consent) {
    return { consent: null, history: [] };
  }

  const history = await db
    .select()
    .from(consentAuditLog)
    .where(eq(consentAuditLog.userConsentId, consentId))
    .orderBy(desc(consentAuditLog.createdAt));

  return {
    consent: consent as ConsentRecord,
    history: history as ConsentAuditEntry[],
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get human-readable label for a consent type
 */
export function getConsentLabel(consentType: ConsentType): string {
  return CONSENT_TEXTS[consentType]?.label ?? consentType;
}

/**
 * Get description for a consent type
 */
export function getConsentDescription(consentType: ConsentType): string {
  return CONSENT_TEXTS[consentType]?.description ?? "";
}

/**
 * Format consent record for API response
 */
export function formatConsentForResponse(consent: ConsentRecord) {
  return {
    id: consent.id,
    type: consent.consentType,
    label: getConsentLabel(consent.consentType),
    status: consent.status,
    grantedAt: consent.grantedAt.toISOString(),
    withdrawnAt: consent.withdrawnAt?.toISOString() ?? null,
    policyVersion: consent.consentVersion,
  };
}
