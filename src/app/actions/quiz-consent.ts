/**
 * Quiz Consent Server Actions
 *
 * GDPR Compliance for Quiz Flow:
 * - Art. 6(1)(a): Consent as legal basis for processing
 * - Art. 7(1): Demonstrable consent with audit trail
 * - Art. 9(2)(a): Explicit consent for health data
 * - Art. 22: Consent for automated decision-making
 *
 * These actions record quiz-related consents before quiz submission.
 */

"use server";

import { headers } from "next/headers";
import { getSession } from "@/lib/auth/session";
import { grantMultipleConsents } from "@/modules/consent/consent.service";
import { CONSENT_TYPES, type ConsentType } from "@/lib/consent/constants";

// ============================================================================
// Types
// ============================================================================

interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

interface QuizConsentInput {
  /** Child ID if consents are child-specific */
  childId?: string;
  /** Granted consent types */
  consents: {
    childDataRecommendations: boolean;
    healthDataRecommendations: boolean;
    shareWithClubs: boolean;
    specialistSuggestions: boolean;
    marketingCommunications: boolean;
  };
}

interface QuizConsentResult {
  recordedConsents: ConsentType[];
  userId: string;
  childId?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get client info from request headers for audit trail
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
 * Map consent input to consent types array
 */
function mapInputToConsentTypes(consents: QuizConsentInput["consents"]): ConsentType[] {
  const granted: ConsentType[] = [];

  if (consents.childDataRecommendations) {
    granted.push(CONSENT_TYPES.CHILD_DATA_RECOMMENDATIONS);
  }
  if (consents.healthDataRecommendations) {
    granted.push(CONSENT_TYPES.HEALTH_DATA_RECOMMENDATIONS);
  }
  if (consents.shareWithClubs) {
    granted.push(CONSENT_TYPES.SHARE_WITH_CLUBS);
  }
  if (consents.specialistSuggestions) {
    granted.push(CONSENT_TYPES.SPECIALIST_SUGGESTIONS);
  }
  if (consents.marketingCommunications) {
    granted.push(CONSENT_TYPES.MARKETING_COMMUNICATIONS);
  }

  return granted;
}

/**
 * Validate required consents are granted
 */
function validateRequiredConsents(consents: QuizConsentInput["consents"]): string | null {
  if (!consents.childDataRecommendations) {
    return "Consimțământul pentru prelucrarea datelor copilului este obligatoriu.";
  }
  if (!consents.healthDataRecommendations) {
    return "Consimțământul pentru prelucrarea datelor de sănătate este obligatoriu.";
  }
  if (!consents.shareWithClubs) {
    return "Consimțământul pentru partajarea datelor cu cluburile este obligatoriu.";
  }
  return null;
}

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Record quiz consents before quiz submission
 *
 * This action should be called when:
 * 1. User completes the consent step in the quiz flow
 * 2. Before quiz answers are submitted to the AI
 *
 * For guest users (no session), we create a temporary user ID
 * that will be associated with the quiz record.
 */
export async function recordQuizConsentsAction(
  input: QuizConsentInput
): Promise<ActionResult<QuizConsentResult>> {
  try {
    // Validate required consents
    const validationError = validateRequiredConsents(input.consents);
    if (validationError) {
      return { success: false, error: validationError };
    }

    // Get client info for audit trail
    const { ipAddress, userAgent } = await getClientInfo();

    // Get session (may be null for guests)
    const session = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
      // For guests, we return success but note that consents will be
      // recorded when they provide their email or create an account
      return {
        success: true,
        data: {
          recordedConsents: mapInputToConsentTypes(input.consents),
          userId: "guest",
          childId: input.childId,
        },
      };
    }

    // Map consents to types
    const consentTypes = mapInputToConsentTypes(input.consents);

    // Record consents
    await grantMultipleConsents({
      userId,
      childId: input.childId,
      consentTypes,
      ipAddress,
      userAgent,
    });

    return {
      success: true,
      data: {
        recordedConsents: consentTypes,
        userId,
        childId: input.childId,
      },
    };
  } catch (error) {
    console.error("Failed to record quiz consents:", error);
    return {
      success: false,
      error: "Eroare la înregistrarea consimțămintelor. Te rugăm să încerci din nou.",
    };
  }
}

/**
 * Record consents for a guest user after email collection
 *
 * This action is called when a guest user provides their email
 * and we need to associate their consents with the new user record.
 */
export async function recordGuestQuizConsentsAction(
  userId: string,
  input: QuizConsentInput
): Promise<ActionResult<QuizConsentResult>> {
  try {
    // Validate required consents
    const validationError = validateRequiredConsents(input.consents);
    if (validationError) {
      return { success: false, error: validationError };
    }

    // Get client info for audit trail
    const { ipAddress, userAgent } = await getClientInfo();

    // Map consents to types
    const consentTypes = mapInputToConsentTypes(input.consents);

    // Record consents
    await grantMultipleConsents({
      userId,
      childId: input.childId,
      consentTypes,
      ipAddress,
      userAgent,
    });

    return {
      success: true,
      data: {
        recordedConsents: consentTypes,
        userId,
        childId: input.childId,
      },
    };
  } catch (error) {
    console.error("Failed to record guest quiz consents:", error);
    return {
      success: false,
      error: "Eroare la înregistrarea consimțămintelor. Te rugăm să încerci din nou.",
    };
  }
}

/**
 * Check if user has valid quiz consents
 *
 * Used to verify consent status before processing quiz results
 * or displaying AI recommendations.
 */
export async function verifyQuizConsentsAction(
  childId?: string
): Promise<ActionResult<{ hasRequiredConsents: boolean; missingConsents: ConsentType[] }>> {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    if (!userId) {
      // Guests are assumed to have provided consents in the quiz flow
      // Actual verification happens when they create an account
      return {
        success: true,
        data: {
          hasRequiredConsents: true,
          missingConsents: [],
        },
      };
    }

    // Import here to avoid circular dependency
    const { hasRequiredConsents } = await import("@/modules/consent/consent.service");
    const result = await hasRequiredConsents(userId, childId);

    return {
      success: true,
      data: {
        hasRequiredConsents: result.hasAll,
        missingConsents: result.missing,
      },
    };
  } catch (error) {
    console.error("Failed to verify quiz consents:", error);
    return {
      success: false,
      error: "Eroare la verificarea consimțămintelor.",
    };
  }
}
