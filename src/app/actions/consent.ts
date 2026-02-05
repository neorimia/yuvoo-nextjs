/**
 * Consent Server Actions
 *
 * Server Actions for GDPR-compliant consent management.
 * All actions require authentication and create audit log entries.
 *
 * GDPR Requirements:
 * - Art. 7(1): Demonstrate consent was given
 * - Art. 7(3): Easy withdrawal of consent
 * - Art. 9(2)(a): Explicit consent for health data
 */

"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/modules/auth/auth.service";
import {
  grantConsent,
  withdrawConsent,
  grantMultipleConsents,
  getUserConsents,
  hasRequiredConsents,
  getConsentAuditHistory,
} from "@/modules/consent/consent.service";
import {
  type ConsentType,
  CONSENT_TYPES,
  REQUIRED_CONSENTS,
  CONSENT_TEXTS,
} from "@/lib/consent/constants";
import { routes } from "@/lib/routes";

// ============================================================================
// Types
// ============================================================================

interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

interface ConsentStatusResponse {
  type: ConsentType;
  label: string;
  status: "granted" | "withdrawn" | "not_set";
  isRequired: boolean;
  grantedAt?: string;
  withdrawnAt?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get client IP and user agent from request headers
 */
async function getClientInfo(): Promise<{ ipAddress: string; userAgent: string }> {
  const headersList = await headers();

  // Get IP address (check various headers used by proxies/load balancers)
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

  // Get user agent
  const userAgent = headersList.get("user-agent") || "unknown";

  return { ipAddress, userAgent };
}

// ============================================================================
// Grant Consent Actions
// ============================================================================

/**
 * Grant a single consent
 */
export async function grantConsentAction(
  consentType: ConsentType,
  childId?: string
): Promise<ActionResult<{ id: string }>> {
  try {
    const user = await requireAuth();
    const { ipAddress, userAgent } = await getClientInfo();

    const consent = await grantConsent({
      userId: user.id,
      childId,
      consentType,
      ipAddress,
      userAgent,
    });

    revalidatePath(routes.parent.privacy);

    return {
      success: true,
      data: { id: consent.id },
    };
  } catch (error) {
    console.error("Error granting consent:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la acordarea consimțământului",
    };
  }
}

/**
 * Grant multiple consents at once (for onboarding/quiz flow)
 */
export async function grantMultipleConsentsAction(
  consentTypes: ConsentType[],
  childId?: string
): Promise<ActionResult<{ count: number }>> {
  try {
    const user = await requireAuth();
    const { ipAddress, userAgent } = await getClientInfo();

    const consents = await grantMultipleConsents({
      userId: user.id,
      childId,
      consentTypes,
      ipAddress,
      userAgent,
    });

    revalidatePath(routes.parent.privacy);

    return {
      success: true,
      data: { count: consents.length },
    };
  } catch (error) {
    console.error("Error granting multiple consents:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la acordarea consimțămintelor",
    };
  }
}

/**
 * Grant all required consents for AI recommendations
 */
export async function grantRequiredConsentsAction(
  childId?: string
): Promise<ActionResult<{ count: number }>> {
  return grantMultipleConsentsAction(REQUIRED_CONSENTS, childId);
}

// ============================================================================
// Withdraw Consent Actions
// ============================================================================

/**
 * Withdraw a single consent
 */
export async function withdrawConsentAction(
  consentType: ConsentType,
  childId?: string
): Promise<ActionResult> {
  try {
    const user = await requireAuth();
    const { ipAddress, userAgent } = await getClientInfo();

    const result = await withdrawConsent({
      userId: user.id,
      childId,
      consentType,
      ipAddress,
      userAgent,
    });

    if (!result) {
      return {
        success: false,
        error: "Consimțământul nu a fost găsit sau este deja retras",
      };
    }

    revalidatePath(routes.parent.privacy);

    return { success: true };
  } catch (error) {
    console.error("Error withdrawing consent:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la retragerea consimțământului",
    };
  }
}

// ============================================================================
// Query Actions
// ============================================================================

/**
 * Get all consents for the current user
 */
export async function getUserConsentsAction(): Promise<ActionResult<ConsentStatusResponse[]>> {
  try {
    const user = await requireAuth();
    const consents = await getUserConsents(user.id);

    // Build response with all consent types
    const allConsentTypes = Object.values(CONSENT_TYPES);
    const response: ConsentStatusResponse[] = allConsentTypes.map((type) => {
      const consent = consents.find((c) => c.consentType === type);
      const isRequired = REQUIRED_CONSENTS.includes(type);

      return {
        type,
        label: CONSENT_TEXTS[type].label,
        status: consent?.status ?? "not_set",
        isRequired,
        grantedAt: consent?.grantedAt?.toISOString(),
        withdrawnAt: consent?.withdrawnAt?.toISOString() ?? undefined,
      };
    });

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("Error getting user consents:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la încărcarea consimțămintelor",
    };
  }
}

/**
 * Check if user has all required consents for AI recommendations
 */
export async function checkRequiredConsentsAction(childId?: string): Promise<
  ActionResult<{
    hasAll: boolean;
    missing: { type: ConsentType; label: string }[];
    granted: { type: ConsentType; label: string }[];
  }>
> {
  try {
    const user = await requireAuth();
    const result = await hasRequiredConsents(user.id, childId);

    return {
      success: true,
      data: {
        hasAll: result.hasAll,
        missing: result.missing.map((type) => ({
          type,
          label: CONSENT_TEXTS[type].label,
        })),
        granted: result.granted.map((type) => ({
          type,
          label: CONSENT_TEXTS[type].label,
        })),
      },
    };
  } catch (error) {
    console.error("Error checking required consents:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la verificarea consimțămintelor",
    };
  }
}

/**
 * Get consent audit history for GDPR compliance reporting
 */
export async function getConsentAuditHistoryAction(): Promise<
  ActionResult<
    {
      id: string;
      action: string;
      previousStatus: string | null;
      newStatus: string;
      policyVersion: string;
      createdAt: string;
    }[]
  >
> {
  try {
    const user = await requireAuth();
    const history = await getConsentAuditHistory(user.id);

    return {
      success: true,
      data: history.map((entry) => ({
        id: entry.id,
        action: entry.action,
        previousStatus: entry.previousStatus,
        newStatus: entry.newStatus,
        policyVersion: entry.privacyPolicyVersion,
        createdAt: entry.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Error getting consent audit history:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Eroare la încărcarea istoricului consimțămintelor",
    };
  }
}

// ============================================================================
// Toggle Action (for settings page)
// ============================================================================

/**
 * Toggle consent status (grant if withdrawn, withdraw if granted)
 */
export async function toggleConsentAction(
  consentType: ConsentType,
  newStatus: boolean,
  childId?: string
): Promise<ActionResult<{ id?: string } | undefined>> {
  if (newStatus) {
    return grantConsentAction(consentType, childId);
  } else {
    // withdrawConsentAction returns ActionResult (no data)
    const result = await withdrawConsentAction(consentType, childId);
    return { success: result.success, error: result.error, data: undefined };
  }
}
