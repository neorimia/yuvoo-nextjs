/**
 * Quiz Child Selection Server Actions
 *
 * Handles child creation and selection for quiz flow.
 * Supports both authenticated users and guests.
 */

"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { createChild } from "@/modules/children/children.service";
import { createTemporaryChildForQuiz } from "@/modules/quiz/quiz.service";

/**
 * Calculate date of birth from age (approximate - January 1st of birth year)
 */
function calculateDOBFromAge(age: number): Date {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  return new Date(birthYear, 0, 1); // January 1st
}

/**
 * Select an existing child for quiz (authenticated users only)
 *
 * Validates ownership and redirects to quiz container.
 *
 * @param childId - ID of the child to select
 */
export async function selectChildForQuizAction(childId: string): Promise<void> {
  const session = await getSession();

  if (!session) {
    // Should not happen if UI is correct, but redirect to login just in case
    redirect(routes.login);
  }

  // Redirect to quiz container with the selected child ID
  redirect(`${routes.quiz.container}?childId=${childId}`);
}

/**
 * Create a new child for authenticated user and redirect to quiz
 *
 * @param formData - Form data containing child information
 */
export async function createChildForQuizAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();

  if (!session) {
    return { success: false, error: "Trebuie să fii autentificat pentru a adăuga un copil." };
  }

  try {
    const firstName = (formData.get("firstName") as string)?.trim();
    const lastName = (formData.get("lastName") as string)?.trim() || "Copil";
    const ageString = formData.get("age") as string;
    const gender = formData.get("gender") as "male" | "female" | "other" | null;

    // Validation
    if (!firstName || firstName.length === 0) {
      return { success: false, error: "Numele copilului este obligatoriu." };
    }

    if (firstName.length > 50) {
      return { success: false, error: "Numele nu poate avea mai mult de 50 de caractere." };
    }

    const age = parseInt(ageString, 10);
    if (isNaN(age) || age < 4 || age > 14) {
      return { success: false, error: "Vârsta trebuie să fie între 4 și 14 ani." };
    }

    // Create the child
    const child = await createChild({
      parentId: session.dbUser.id,
      firstName,
      lastName,
      dateOfBirth: calculateDOBFromAge(age),
      gender: gender || undefined,
    });

    // Redirect to quiz container with the new child ID
    redirect(`${routes.quiz.container}?childId=${child.id}`);
  } catch (error) {
    // If redirect was called, it throws NEXT_REDIRECT which we should not catch
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    console.error("Error creating child for quiz:", error);
    return { success: false, error: "A apărut o eroare. Te rugăm să încerci din nou." };
  }
}

/**
 * Start quiz for guest user
 *
 * Creates a temporary child placeholder and redirects to quiz.
 * The actual child info (name, age, gender) is collected in Quiz Question 1.
 */
export async function startGuestQuizAction(): Promise<void> {
  // Check if user is authenticated (they can still use guest flow)
  const session = await getSession();
  const parentId = session?.dbUser.id || null;

  // Create temporary child with placeholder values
  // Real values will be collected in Quiz Question 1
  const childId = await createTemporaryChildForQuiz(
    {
      age: 4, // Default placeholder age (will be overwritten by quiz answers)
      gender: undefined,
      childName: undefined,
    },
    parentId
  );

  // Redirect to quiz container with the new child ID
  redirect(`${routes.quiz.container}?childId=${childId}`);
}
