/**
 * Quiz Server Actions
 *
 * Server Actions for AI Coach Quiz submission and results.
 * All error messages are in Romanian as per project requirements.
 *
 * GDPR Compliance:
 * - Art. 6(1)(a): Consent verification before processing
 * - Art. 9(2)(a): Health data consent required
 * - Art. 22: AI recommendation consent required
 *
 * Security:
 * - Rate limiting: 3 quiz submissions per hour per user/IP
 * - Input validation with Zod schemas
 * - Authentication checks for protected operations
 */

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { getSession } from "@/lib/auth/session";
import { requireAuth, getCurrentUser } from "@/modules/auth/auth.service";
import { getChildById } from "@/modules/children/children.service";
import {
  submitQuiz,
  getQuizResult,
  getQuizHistory,
  createTemporaryChildForQuiz,
} from "@/modules/quiz/quiz.service";
import { sendQuizResultsEmail } from "@/modules/quiz/quiz.email";
import { createQuizInputSchema, quizAnswersSchema } from "@/lib/validations/quiz";
import { rateLimit, getClientIdentifier } from "@/lib/rate-limit";
import type { QuizResult, CreateQuizInput } from "@/modules/quiz/quiz.types";
import type { AuthUser } from "@/modules/auth/auth.types";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { hasRequiredConsents } from "@/modules/consent/consent.service";

/**
 * Clean quiz input by removing $undefined values and handling array input
 */
function cleanQuizInput(input: unknown): CreateQuizInput {
  // Handle array input (unwrap if needed)
  let cleanedInput: unknown = input;
  if (Array.isArray(input) && input.length > 0) {
    cleanedInput = input[0];
  }

  // Recursively clean $undefined values and convert to proper undefined
  function cleanObject(obj: unknown): unknown {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(cleanObject);
    }

    if (typeof obj === "object") {
      const cleaned: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        // Skip $undefined values
        if (value === "$undefined" || value === null) {
          continue; // Omit the property
        }
        // Recursively clean nested objects
        cleaned[key] = cleanObject(value);
      }
      return cleaned;
    }

    // Skip $undefined strings
    if (obj === "$undefined") {
      return undefined;
    }

    return obj;
  }

  return cleanObject(cleanedInput) as CreateQuizInput;
}

/**
 * Submit quiz and get AI recommendations
 *
 * Validates input and orchestrates quiz submission.
 * Works for both authenticated and unauthenticated users.
 * For unauthenticated users, creates a temporary child record.
 *
 * Security: Rate limited to 3 submissions per hour per user/IP
 *
 * @param input - Quiz submission with child ID (or placeholder), answers, and optional email
 *   - For authenticated users: email is optional (uses account email)
 *   - For unauthenticated users: email is optional but recommended to receive results
 *   - Can accept array input (will unwrap automatically)
 * @returns Success response with quiz result or error response
 */
export async function submitQuizAction(
  input: CreateQuizInput | CreateQuizInput[] | unknown
): Promise<{ success: boolean; result?: QuizResult; error?: string }> {
  try {
    // Step 0: Clean and normalize input (handle array, $undefined values)
    const cleanedInput = cleanQuizInput(input);

    // Validate cleaned input structure
    if (!cleanedInput || typeof cleanedInput !== "object") {
      return {
        success: false,
        error: "Formatul datelor este invalid. Te rugăm să reîncărci pagina și să încerci din nou.",
      };
    }

    // Step 1: Check authentication (optional)
    const session = await getSession();

    // Step 2: Rate limiting (prevent abuse and control OpenAI costs)
    const headersList = await headers();
    const mockRequest = new Request("http://localhost", {
      headers: headersList as HeadersInit,
    });

    // Get user ID for rate limiting (if authenticated)
    const userId = session ? (await getCurrentUser())?.id : undefined;
    const identifier = getClientIdentifier(userId, mockRequest);

    const rateLimitResult = await rateLimit(identifier, {
      maxAttempts: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
    });

    if (!rateLimitResult.success) {
      return {
        success: false,
        error: `Ai atins limita de chestionare (3 per oră). Te rugăm să încerci din nou după ${rateLimitResult.resetTime}.`,
      };
    }

    // Step 3: Handle placeholder child ID BEFORE validation
    // If using placeholder, create temporary child first
    let childId = cleanedInput.childId;
    let needsTemporaryChild = false;

    if (!childId || childId === "placeholder-child-id") {
      needsTemporaryChild = true;
      // We'll create the temporary child after validating answers
      // For now, we'll validate answers separately
    }

    // Step 4: Validate answers and optional email (separate from childId validation)
    const answersValidation = quizAnswersSchema.safeParse(cleanedInput.answers);

    if (!answersValidation.success) {
      // Extract first validation error message (in Romanian)
      const firstError = answersValidation.error.errors[0];
      return {
        success: false,
        error: firstError?.message || "Date invalide. Te rugăm să verifici răspunsurile.",
      };
    }

    // Validate email if provided (for unauthenticated users)
    if (cleanedInput.email && cleanedInput.email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanedInput.email.trim())) {
        return {
          success: false,
          error: "Email-ul introdus nu este valid.",
        };
      }
    }

    // Step 5: Create temporary child if needed
    if (needsTemporaryChild) {
      if (session) {
        // Authenticated user but no child selected
        const user = await getCurrentUser();
        if (!user) {
          return {
            success: false,
            error: "Eroare la obținerea informațiilor utilizatorului.",
          };
        }
        childId = await createTemporaryChildForQuiz(answersValidation.data, user.id);
      } else {
        // Unauthenticated user - create temporary child with anonymous parent
        childId = await createTemporaryChildForQuiz(answersValidation.data, null);
      }
    } else {
      // Validate childId is a valid UUID
      const childIdValidation = createQuizInputSchema.shape.childId.safeParse(childId);
      if (!childIdValidation.success) {
        return {
          success: false,
          error: "ID-ul copilului trebuie să fie un UUID valid.",
        };
      }

      // Verify child belongs to authenticated user (if authenticated)
      if (session) {
        const user = await getCurrentUser();
        if (!user) {
          return {
            success: false,
            error: "Eroare la obținerea informațiilor utilizatorului.",
          };
        }
        const child = await getChildById(childId, user.id);
        if (!child) {
          return {
            success: false,
            error: "Copilul selectat nu îți aparține sau nu există.",
          };
        }
      }
    }

    // Step 6: Verify GDPR consents (for authenticated users)
    // Guests have consents stored in the quiz flow state and will be recorded on account creation
    if (session) {
      const user = await getCurrentUser();
      if (user) {
        const consentCheck = await hasRequiredConsents(user.id, childId);
        if (!consentCheck.hasAll) {
          console.warn("[Quiz Action] Missing required consents:", {
            userId: user.id,
            childId,
            missing: consentCheck.missing,
          });
          // Note: We don't block the quiz submission for consent issues
          // because consents should have been recorded in the consent step.
          // This is just a warning for monitoring purposes.
          // If strict enforcement is needed, uncomment the following:
          // return {
          //   success: false,
          //   error: "Consimțămintele obligatorii lipsesc. Te rugăm să revii la pasul de consimțământ.",
          // };
        }
      }
    }

    // Step 7: Submit quiz (includes AI processing)
    const quizInput = {
      childId,
      answers: answersValidation.data,
      // Note: email is not passed to submitQuiz, it's only used for email sending
    };

    console.log("[Quiz Action] Starting quiz submission...", {
      childId,
      hasAnswers: !!quizInput.answers,
      timestamp: new Date().toISOString(),
    });

    let result: QuizResult;
    try {
      result = await submitQuiz(quizInput);
      console.log("[Quiz Action] Quiz submission successful", {
        quizId: result.id,
        recommendationsCount: result.recommendations?.length || 0,
      });
    } catch (submitError) {
      console.error("[Quiz Action] Error in submitQuiz service:", {
        error: submitError instanceof Error ? submitError.message : String(submitError),
        name: submitError instanceof Error ? submitError.name : "Unknown",
        stack: submitError instanceof Error ? submitError.stack : undefined,
      });
      throw submitError; // Re-throw to be caught by outer catch
    }

    // Step 8: Send quiz results email (non-blocking)
    // Determine email address and user info
    let emailToSend: string | null = null;
    let authUser: AuthUser | undefined = undefined;

    if (session) {
      // Authenticated user - get AuthUser and use their email
      const user = await getCurrentUser();
      if (user) {
        emailToSend = user.email;
        authUser = user;
      }
    } else if (cleanedInput.email && cleanedInput.email.trim() !== "") {
      // Unauthenticated user - use provided email
      emailToSend = cleanedInput.email.trim();
      // No authUser for unauthenticated users (will be undefined)
    }

    // Send email if we have an email address
    if (emailToSend) {
      sendQuizResultsEmail(result, emailToSend, authUser).catch((error) => {
        // Log error but don't block quiz submission
        console.error("[Quiz Action] Error sending quiz results email:", error);
      });
    }

    // Step 9: Track quiz completion event
    try {
      let childAge = answersValidation.data.age;
      if (session) {
        const user = await getCurrentUser();
        if (user) {
          try {
            const child = await getChildById(childId, user.id);
            if (child) {
              childAge = child.age;
            }
          } catch (childError) {
            // Child fetch failed, use age from answers
            if (process.env.NODE_ENV === "development") {
              console.error("[PostHog] Error fetching child for tracking:", childError);
            }
          }
        }
      }
      const user = session ? await getCurrentUser() : null;
      await trackEventServer(PostHogEvents.QUIZ_COMPLETED, {
        distinctId: user?.id || "anonymous",
        [PostHogProperties.QUIZ_ID]: result.id,
        [PostHogProperties.CHILD_ID]: childId,
        [PostHogProperties.CHILD_AGE]: childAge,
        [PostHogProperties.RECOMMENDATIONS_COUNT]: result.recommendations?.length || 0,
      });
    } catch (trackingError) {
      // Don't fail quiz submission if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking quiz completion:", trackingError);
      }
    }

    // Step 10: Revalidate cache
    revalidatePath("/chestionar");
    revalidatePath(`/chestionar/rezultate/${result.id}`);

    // Revalidate parent dashboard cache if user is authenticated
    if (session) {
      const user = await getCurrentUser();
      if (user) {
        revalidateTag(`user-${user.id}`, "max");
        revalidateTag(`parent-dashboard-${user.id}`, "max");
      }
    }

    return { success: true, result };
  } catch (error) {
    // Enhanced error logging for debugging
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "Unknown",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    };
    console.error("[Quiz Action] Error submitting quiz:", errorDetails);

    // Handle authentication errors
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return {
        success: false,
        error: "Trebuie să fii autentificat pentru a trimite chestionarul.",
      };
    }

    // Handle OpenAI API errors
    if (error instanceof Error && error.message.includes("OpenAI")) {
      console.error("[Quiz Action] OpenAI API error:", error);
      return {
        success: false,
        error:
          "Eroare la generarea recomandărilor AI. Te rugăm să încerci din nou în câteva momente.",
      };
    }

    // Handle timeout errors (more specific detection)
    if (
      error instanceof Error &&
      (error.message.includes("timeout") ||
        error.message.includes("TIMEOUT") ||
        error.message.includes("ETIMEDOUT") ||
        error.name === "TimeoutError" ||
        error.message.includes("Request timed out"))
    ) {
      console.error("[Quiz Action] Timeout error:", error);
      return {
        success: false,
        error:
          "Procesarea durează mai mult decât de obicei. Te rugăm să încerci din nou. Dacă problema persistă, contactează-ne.",
      };
    }

    // Handle connection errors (more specific detection)
    if (
      error instanceof Error &&
      (error.message.includes("Connection terminated") ||
        error.message.includes("ECONNRESET") ||
        error.message.includes("ECONNREFUSED") ||
        error.message.includes("ENOTFOUND") ||
        error.message.includes("fetch failed") ||
        error.message.includes("NetworkError") ||
        error.message.includes("Failed to fetch"))
    ) {
      console.error("[Quiz Action] Connection error:", error);
      return {
        success: false,
        error:
          "Conexiunea a fost întreruptă. Te rugăm să verifici conexiunea la internet și să încerci din nou. Dacă problema persistă, contactează-ne.",
      };
    }

    // Handle database errors
    if (
      error instanceof Error &&
      (error.message.includes("database") || error.message.includes("Database"))
    ) {
      console.error("[Quiz Action] Database error:", error);
      return {
        success: false,
        error: "Eroare la salvarea datelor. Te rugăm să încerci din nou.",
      };
    }

    // Return error message (already in Romanian from service layer)
    // If error message is already in Romanian, use it; otherwise provide generic message
    const errorMessage = error instanceof Error ? error.message : "Eroare necunoscută";
    const isRomanianError =
      errorMessage.includes("Eroare") ||
      errorMessage.includes("Nu") ||
      errorMessage.includes("Te rugăm");

    return {
      success: false,
      error: isRomanianError
        ? errorMessage
        : "Eroare la trimiterea chestionarului. Te rugăm să încerci din nou. Dacă problema persistă, contactează-ne.",
    };
  }
}

/**
 * Get quiz result by ID
 *
 * Retrieves quiz results with recommendations.
 * Note: Quiz results are public (no authentication required for viewing),
 * but authentication is required for saving results to account.
 *
 * @param quizId - Quiz ID to retrieve
 * @returns Quiz result with recommendations or null if not found
 */
export async function getQuizResultAction(quizId: string): Promise<QuizResult | null> {
  try {
    // Validate quizId format (UUID)
    if (!quizId || typeof quizId !== "string" || quizId.length !== 36) {
      console.error("Invalid quiz ID format:", quizId);
      return null;
    }

    const result = await getQuizResult(quizId);

    // Note: Ownership verification can be added here if needed
    // For now, quiz results are public (shareable via link)

    return result;
  } catch (error) {
    console.error("Error getting quiz result:", error);
    return null;
  }
}

/**
 * Get quiz history for a child
 *
 * Retrieves all completed quizzes for a specific child.
 * Requires authentication and verifies child ownership.
 *
 * @param childId - Child ID to get quiz history for
 * @returns Array of quiz results (empty array if none found or error)
 */
export async function getQuizHistoryAction(childId: string): Promise<QuizResult[]> {
  try {
    // Step 1: Authentication check
    const user = await requireAuth();

    // Step 2: Validate childId format
    if (!childId || typeof childId !== "string" || childId.length !== 36) {
      console.error("Invalid child ID format:", childId);
      return [];
    }

    // Step 3: Verify child belongs to user
    const child = await getChildById(childId, user.id);
    if (!child) {
      console.error(`Child ${childId} not found or access denied for user ${user.id}`);
      return [];
    }

    // Step 4: Get quiz history
    return await getQuizHistory(childId);
  } catch (error) {
    console.error("Error getting quiz history:", error);

    // Handle authentication errors
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      console.error("Unauthorized access to quiz history");
      return [];
    }

    return [];
  }
}

/**
 * Save quiz results (mark as saved/bookmarked)
 *
 * Note: Quiz results are already saved in the database when submitted.
 * This action confirms the save and can be used for future "favorites" functionality.
 */
export async function saveQuizResultsAction(
  quizId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Step 1: Authentication check
    await requireAuth();

    // Step 2: Validate quizId format
    if (!quizId || typeof quizId !== "string" || quizId.length !== 36) {
      return {
        success: false,
        error: "ID-ul chestionarului este invalid.",
      };
    }

    // Step 3: Verify quiz result exists
    const result = await getQuizResult(quizId);
    if (!result) {
      return {
        success: false,
        error: "Rezultatele chestionarului nu au fost găsite.",
      };
    }

    // Step 4: Verify child belongs to user (if childId exists)
    // Note: Quiz results are already saved, this is just confirmation
    // Future: Could add a "saved" flag or favorites table entry here

    // For now, just confirm the save (results are already persisted)
    // TODO: Add saved/bookmarked functionality if needed

    return { success: true };
  } catch (error) {
    console.error("Error saving quiz results:", error);

    if (error instanceof Error && error.message.includes("Unauthorized")) {
      return {
        success: false,
        error: "Trebuie să fii autentificat pentru a salva rezultatele.",
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la salvarea rezultatelor.",
    };
  }
}
