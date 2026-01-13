/**
 * Email Collection Server Action
 *
 * Collects email address after quiz completion and redirects to teaser page.
 * Updates quiz record with email and sends teaser email.
 */

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getQuizResult } from "@/modules/quiz/quiz.service";
import { updateQuizEmail, updateQuizLocation } from "@/modules/quiz/quiz.repository";
import { sendTeaserEmail } from "@/modules/quiz/quiz.email";
import { routes } from "@/lib/routes";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

/**
 * Email collection schema
 */
const collectEmailSchema = z.object({
  quizId: z
    .string({
      required_error: "ID-ul chestionarului este obligatoriu",
    })
    .uuid("ID-ul chestionarului trebuie să fie un UUID valid"),
  email: z
    .string({
      required_error: "Email-ul este obligatoriu",
    })
    .email("Email-ul trebuie să fie valid")
    .min(1, "Email-ul nu poate fi gol"),
  location: z
    .string({
      required_error: "Locația este obligatorie",
    })
    .min(1, "Locația nu poate fi goală")
    .max(100, "Locația nu poate depăși 100 de caractere"),
});

/**
 * Collect email after quiz completion
 *
 * Updates quiz record with email and redirects to teaser page.
 * Sends teaser email with single sport recommendation.
 *
 * @param formData - Form data with quizId and email
 * @returns Redirects to teaser page or returns error
 */
export async function collectEmailAction(formData: FormData) {
  try {
    // Extract and validate input
    const rawInput = {
      quizId: formData.get("quizId") as string,
      email: formData.get("email") as string,
      location: formData.get("location") as string,
    };

    const validation = collectEmailSchema.safeParse(rawInput);

    if (!validation.success) {
      const firstError = validation.error.errors[0];
      return {
        success: false as const,
        error: firstError?.message || "Date invalide. Te rugăm să verifici email-ul introdus.",
      };
    }

    const { quizId, email, location } = validation.data;

    // Verify quiz exists and has recommendations
    const quizResult = await getQuizResult(quizId);

    if (!quizResult) {
      return {
        success: false as const,
        error: "Chestionarul nu a fost găsit. Te rugăm să completezi chestionarul din nou.",
      };
    }

    if (!quizResult.recommendations || quizResult.recommendations.length === 0) {
      return {
        success: false as const,
        error: "Chestionarul nu are recomandări. Te rugăm să completezi chestionarul din nou.",
      };
    }

    // Update quiz record with email and location
    await updateQuizEmail(quizId, email);
    await updateQuizLocation(quizId, location);

    // Send teaser email (non-blocking)
    sendTeaserEmail(quizResult, email).catch((error) => {
      console.error("[Email Collection] Error sending teaser email:", error);
      // Don't block redirect if email fails
    });

    // Track email collection event
    try {
      await trackEventServer(PostHogEvents.EMAIL_COLLECTED, {
        distinctId: "anonymous",
        [PostHogProperties.QUIZ_ID]: quizId,
        [PostHogProperties.USER_EMAIL]: email,
      });
    } catch (trackingError) {
      // Don't block redirect if tracking fails
      console.error("[Email Collection] Error tracking event:", trackingError);
    }

    // Revalidate cache
    revalidatePath(routes.quiz.emailGate(quizId));
    revalidatePath(routes.quiz.teaser(quizId));

    // Redirect to teaser page
    redirect(routes.quiz.teaser(quizId));
  } catch (error) {
    console.error("[Email Collection] Error collecting email:", error);

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Eroare la procesarea email-ului. Te rugăm să încerci din nou.",
    };
  }
}
