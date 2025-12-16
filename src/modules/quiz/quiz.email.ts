/**
 * Quiz Email Service
 *
 * Email notifications for quiz results.
 * Sends quiz result summaries with top recommendations.
 */

import { sendQuizResults } from "@/lib/integrations/brevo";
import { db } from "@/lib/db";
import { children } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { QuizResult } from "./quiz.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";

/**
 * Map database child to Child type
 */
function mapDbChildToChild(dbChild: typeof children.$inferSelect): Child {
  // Calculate age from dateOfBirth
  const today = new Date();
  const birthDate = new Date(dbChild.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return {
    id: dbChild.id,
    parentId: dbChild.parentId,
    firstName: dbChild.firstName,
    lastName: dbChild.lastName,
    dateOfBirth: dbChild.dateOfBirth,
    gender: dbChild.gender as Child["gender"],
    age,
    createdAt: dbChild.createdAt,
    updatedAt: dbChild.updatedAt,
  };
}

/**
 * Get child by ID
 */
async function getChildById(childId: string): Promise<Child | null> {
  try {
    const dbChild = await db.query.children.findFirst({
      where: eq(children.id, childId),
    });

    if (!dbChild) {
      return null;
    }

    return mapDbChildToChild(dbChild);
  } catch (error) {
    console.error("[Quiz Email] Error fetching child:", error);
    return null;
  }
}

/**
 * Send quiz results email
 *
 * Sends an email with quiz results and top recommendations.
 * Works for both authenticated and unauthenticated users.
 *
 * @param quizResult - Quiz result with recommendations
 * @param userEmail - Email address to send to (required)
 * @param user - Optional authenticated user (for personalization)
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendQuizResultsEmail(
  quizResult: QuizResult,
  userEmail: string,
  user?: AuthUser
): Promise<void> {
  try {
    // Validate email
    if (!userEmail || typeof userEmail !== "string" || !userEmail.includes("@")) {
      console.error("[Quiz Email] Invalid email address:", userEmail);
      return;
    }

    // Fetch child data
    const child = await getChildById(quizResult.childId);
    if (!child) {
      console.error("[Quiz Email] Child not found for quiz results email:", quizResult.childId);
      return;
    }

    // Send email
    await sendQuizResults(quizResult, child, userEmail, user);
  } catch (error) {
    // Don't throw - email failures shouldn't block quiz operations
    console.error("[Quiz Email] Error sending quiz results email:", error);
  }
}
