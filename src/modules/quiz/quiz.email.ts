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
import * as React from "react";
import { renderEmail } from "../../../emails/utils/render-email";
import QuizTeaserEmail from "../../../emails/quiz-teaser-email";
import { quizRepository } from "./quiz.repository";
import type { QuizResult } from "./quiz.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";

/**
 * Map database child to Child type
 */
function mapDbChildToChild(dbChild: typeof children.$inferSelect): Child {
  // Validate required fields
  if (!dbChild.firstName || !dbChild.lastName) {
    throw new Error(`Invalid child data: missing firstName or lastName for child ${dbChild.id}`);
  }

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
 * Send teaser email
 *
 * Sends a teaser email with only the top sport recommendation (minimal details).
 * Used after email collection to create desire for the full report.
 *
 * @param quizResult - Quiz result with recommendations
 * @param userEmail - Email address to send to (required)
 * @returns Promise that resolves when email is sent (or fails silently)
 */
export async function sendTeaserEmail(quizResult: QuizResult, userEmail: string): Promise<void> {
  try {
    // Validate email
    if (!userEmail || typeof userEmail !== "string" || !userEmail.includes("@")) {
      console.error("[Quiz Email] Invalid email address:", userEmail);
      return;
    }

    // Validate quiz has recommendations
    if (!quizResult.recommendations || quizResult.recommendations.length === 0) {
      console.error("[Quiz Email] Quiz has no recommendations for teaser email:", quizResult.id);
      return;
    }

    // Get top recommendation (highest match score)
    const topRecommendation = [...quizResult.recommendations].sort(
      (a, b) => b.matchScore - a.matchScore
    )[0];

    if (!topRecommendation) {
      console.error("[Quiz Email] No top recommendation found for teaser email");
      return;
    }

    // Fetch child data
    const child = await getChildById(quizResult.childId);
    if (!child) {
      console.error("[Quiz Email] Child not found for teaser email:", quizResult.childId);
      return;
    }

    // Prefer childName from quiz answers (user typed in quiz) over DB child.firstName (e.g. "Copil" for temp child)
    const quizAnswers = await quizRepository.getQuizAnswers(quizResult.id);
    const displayName = quizAnswers?.childName?.trim() || child.firstName || "Copil";

    // Send teaser email via Brevo using React Email
    const { sendEmail } = await import("@/lib/integrations/brevo");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
    const teaserUrl = `${appUrl}/chestionar/teaser/${quizResult.id}`;

    // Render React Email component to HTML (pass displayName for subject/heading)
    const emailComponent = React.createElement(QuizTeaserEmail, {
      quizResult,
      child,
      teaserUrl,
      childDisplayName: displayName,
    });
    const { html, text } = await renderEmail(emailComponent);

    await sendEmail({
      to: userEmail,
      subject: `Recomandarea noastră pentru ${displayName} - ${topRecommendation.sportName}`,
      htmlContent: html,
      textContent: text,
      tags: ["quiz-teaser", "sport-recommendation"],
    });

    console.log(`[Quiz Email] Teaser email sent to ${userEmail}`);
  } catch (error) {
    // Don't throw - email failures shouldn't block quiz operations
    console.error("[Quiz Email] Error sending teaser email:", error);
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

    // Prefer child name from quiz answers (user typed in quiz) over DB child (e.g. "Copil Temporar")
    const quizAnswers = await quizRepository.getQuizAnswers(quizResult.id);
    const childDisplayName = quizAnswers?.childName?.trim() || undefined;

    // Send email
    await sendQuizResults(quizResult, child, userEmail, user, childDisplayName);
  } catch (error) {
    // Don't throw - email failures shouldn't block quiz operations
    console.error("[Quiz Email] Error sending quiz results email:", error);
  }
}
