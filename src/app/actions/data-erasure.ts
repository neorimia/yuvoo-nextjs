/**
 * Data Erasure Server Actions
 *
 * GDPR Art. 17 (Right to Erasure / Right to be Forgotten)
 *
 * Allows users to request deletion of all their personal data.
 * Some data may be retained for legal obligations (e.g., payment records).
 */

"use server";

import { headers } from "next/headers";
import { requireAuth } from "@/modules/auth/auth.service";
import { db } from "@/lib/db";
import {
  users,
  children,
  quizzes,
  userConsents,
  favorites,
  bookings,
  dataExportRequests,
  consentAuditLog,
} from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";

// ============================================================================
// Types
// ============================================================================

interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

interface ErasureResult {
  message: string;
  deletedData: string[];
  retainedData: string[];
  requestId: string;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Confirmation phrase required for data erasure
 * Must be typed exactly to confirm deletion
 */
const ERASURE_CONFIRMATION_PHRASE = "ȘTERGERE DEFINITIVĂ";

/**
 * Data categories that are retained after erasure
 * (Legal obligations per GDPR Art. 17(3))
 */
const RETAINED_DATA_CATEGORIES = [
  "Înregistrări de plăți (reținute 10 ani conform obligațiilor fiscale - Art. 17(3)(b))",
  "Jurnale de audit pentru consimțământ (reținute 6 ani pentru responsabilitate - Art. 17(3)(e))",
  "Date necesare pentru litigii în curs (dacă există - Art. 17(3)(e))",
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get client info from request headers
 */
async function getClientInfo(): Promise<{ ipAddress: string; userAgent: string }> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";
  return { ipAddress, userAgent };
}

/**
 * Generate anonymized email for deleted users
 */
function generateAnonymizedEmail(userId: string): string {
  return `deleted_${userId.slice(0, 8)}@anonymized.yuvoo.ro`;
}

/**
 * Generate anonymized Stack user ID
 */
function generateAnonymizedStackUserId(userId: string): string {
  return `deleted_${userId.slice(0, 8)}`;
}

// ============================================================================
// Data Erasure Actions
// ============================================================================

/**
 * Request data erasure (GDPR Art. 17 - Right to Erasure)
 *
 * Deletes all personal data except:
 * - Payment records (10-year legal retention for tax purposes)
 * - Consent audit logs (6-year retention for accountability)
 *
 * The user record is anonymized rather than deleted to maintain
 * referential integrity for retained records.
 */
export async function requestDataErasureAction(
  confirmPhrase: string
): Promise<ActionResult<ErasureResult>> {
  try {
    const user = await requireAuth();
    const userId = user.id;
    const { ipAddress, userAgent } = await getClientInfo();

    // Require explicit confirmation
    if (confirmPhrase !== ERASURE_CONFIRMATION_PHRASE) {
      return {
        success: false,
        error: `Te rugăm să confirmi ștergerea introducând exact '${ERASURE_CONFIRMATION_PHRASE}'`,
      };
    }

    // Create erasure request record for audit trail
    const [request] = await db
      .insert(dataExportRequests)
      .values({
        userId,
        requestType: "erasure",
        status: "processing",
        notes: `Request IP: ${ipAddress}`,
      })
      .returning();

    const deletedData: string[] = [];

    try {
      // Get child IDs for cascade deletion
      const childrenData = await db.query.children.findMany({
        where: eq(children.parentId, userId),
        columns: { id: true },
      });
      const childIds = childrenData.map((c) => c.id);

      // Get consent IDs for audit log reference (before deletion)
      const consentsData = await db.query.userConsents.findMany({
        where: eq(userConsents.userId, userId),
        columns: { id: true },
      });
      const consentIds = consentsData.map((c) => c.id);

      // ========== DELETE IN ORDER OF DEPENDENCIES ==========

      // 1. Delete favorites
      const deletedFavorites = await db
        .delete(favorites)
        .where(eq(favorites.userId, userId))
        .returning({ id: favorites.id });
      if (deletedFavorites.length > 0) {
        deletedData.push(`Favorite (${deletedFavorites.length})`);
      }

      // 2. Delete bookings
      const deletedBookings = await db
        .delete(bookings)
        .where(eq(bookings.parentId, userId))
        .returning({ id: bookings.id });
      if (deletedBookings.length > 0) {
        deletedData.push(`Rezervări (${deletedBookings.length})`);
      }

      // 3. Delete quizzes (for all children)
      if (childIds.length > 0) {
        const deletedQuizzes = await db
          .delete(quizzes)
          .where(inArray(quizzes.childId, childIds))
          .returning({ id: quizzes.id });
        if (deletedQuizzes.length > 0) {
          deletedData.push(`Rezultate quiz (${deletedQuizzes.length})`);
        }
      }

      // 4. Delete children
      const deletedChildren = await db
        .delete(children)
        .where(eq(children.parentId, userId))
        .returning({ id: children.id });
      if (deletedChildren.length > 0) {
        deletedData.push(`Profile copii (${deletedChildren.length})`);
      }

      // 5. Mark consents as withdrawn (don't delete - keep audit trail)
      // The consent records themselves can be deleted, but audit log is retained
      if (consentIds.length > 0) {
        // First, create audit entries for withdrawal
        for (const consentId of consentIds) {
          await db.insert(consentAuditLog).values({
            userConsentId: consentId,
            action: "withdrawn_erasure",
            previousStatus: "granted",
            newStatus: "withdrawn",
            privacyPolicyVersion: "erasure_request",
            ipAddress,
            userAgent,
          });
        }

        // Then delete the consent records (audit log is retained)
        const deletedConsents = await db
          .delete(userConsents)
          .where(eq(userConsents.userId, userId))
          .returning({ id: userConsents.id });
        if (deletedConsents.length > 0) {
          deletedData.push(`Înregistrări consimțământ (${deletedConsents.length})`);
        }
      }

      // 6. Anonymize user record (don't delete - referential integrity for payments)
      await db
        .update(users)
        .set({
          email: generateAnonymizedEmail(userId),
          firstName: null,
          lastName: null,
          phone: null,
          stackUserId: generateAnonymizedStackUserId(userId),
          cityId: null,
          sectorId: null,
          countyId: null,
          emailNotificationPreferences: null,
          onboardingCompleted: false,
          profileCompletionPercentage: 0,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));
      deletedData.push("Profil utilizator (anonimizat)");

      // Update erasure request status to completed
      await db
        .update(dataExportRequests)
        .set({
          status: "completed",
          completedAt: new Date(),
          notes: `Deleted: ${deletedData.join(", ")}`,
        })
        .where(eq(dataExportRequests.id, request.id));

      // TODO: Delete from Stack Auth
      // This requires Stack Auth API integration
      // await stackAuthClient.deleteUser(user.stackUserId);

      return {
        success: true,
        data: {
          message: "Datele tale au fost șterse. Contul a fost dezactivat și anonimizat.",
          deletedData,
          retainedData: RETAINED_DATA_CATEGORIES,
          requestId: request.id,
        },
      };
    } catch (error) {
      // Update request status to failed
      await db
        .update(dataExportRequests)
        .set({
          status: "failed",
          notes: error instanceof Error ? error.message : "Unknown error",
        })
        .where(eq(dataExportRequests.id, request.id));

      throw error;
    }
  } catch (error) {
    console.error("Data erasure failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Eroare la ștergerea datelor. Te rugăm să contactezi suportul la gdpr@yuvoo.ro",
    };
  }
}

/**
 * Validate erasure confirmation phrase
 * Used for client-side validation before submission
 */
export async function validateErasureConfirmationAction(
  confirmPhrase: string
): Promise<ActionResult<{ isValid: boolean; requiredPhrase: string }>> {
  return {
    success: true,
    data: {
      isValid: confirmPhrase === ERASURE_CONFIRMATION_PHRASE,
      requiredPhrase: ERASURE_CONFIRMATION_PHRASE,
    },
  };
}

/**
 * Get the required erasure confirmation phrase
 */
export async function getErasureConfirmationPhraseAction(): Promise<ActionResult<string>> {
  return {
    success: true,
    data: ERASURE_CONFIRMATION_PHRASE,
  };
}
