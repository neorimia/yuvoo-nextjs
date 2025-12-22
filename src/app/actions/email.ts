"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyEmailToken } from "@/lib/utils/email-tokens";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

/**
 * Unsubscribe action schema
 */
const unsubscribeSchema = z.object({
  email: z.string().email("Adresa de email nu este validă"),
});

/**
 * Unsubscribe from email notifications
 *
 * @param prevState - Previous form state
 * @param formData - Form data with email
 * @returns Success or error message
 */
export async function unsubscribeAction(
  prevState: { success?: boolean; error?: string; message?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    // Validate input
    const result = unsubscribeSchema.safeParse({
      email: formData.get("email"),
    });

    if (!result.success) {
      return {
        success: false,
        error: result.error.errors[0]?.message || "Adresa de email nu este validă",
      };
    }

    const { email } = result.data;

    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase().trim()),
    });

    if (!user) {
      // User doesn't exist - still return success for privacy (don't reveal if email exists)
      return {
        success: true,
        message:
          "Dacă această adresă de email era înregistrată, a fost dezabonată cu succes. Nu vei mai primi emailuri de la Yuvoo.",
      };
    }

    // Update user to mark as unsubscribed
    // Set unsubscribed flag in emailNotificationPreferences JSONB field
    const currentPreferences = (user.emailNotificationPreferences as Record<string, unknown>) || {};
    await db
      .update(users)
      .set({
        emailNotificationPreferences: {
          ...currentPreferences,
          unsubscribed: true,
          unsubscribedAt: new Date().toISOString(),
        },
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Track unsubscription event in PostHog
    try {
      await trackEventServer(PostHogEvents.EMAIL_UNSUBSCRIBED, {
        distinctId: user.id,
        [PostHogProperties.USER_ID]: user.id,
        [PostHogProperties.USER_EMAIL]: user.email,
        [PostHogProperties.USER_ROLE]: user.role,
        method: "form", // Form-based unsubscription
      });
    } catch (error) {
      // Don't fail if tracking fails
      console.error("[Unsubscribe] PostHog tracking error:", error);
    }

    return {
      success: true,
      message:
        "Te-ai dezabonat cu succes de la emailurile Yuvoo. Nu vei mai primi emailuri de marketing sau rapoarte de recomandări.",
    };
  } catch (error) {
    console.error("[Unsubscribe] Error:", error);
    return {
      success: false,
      error: "A apărut o eroare. Te rugăm să încerci din nou sau să ne contactezi.",
    };
  }
}

/**
 * Unsubscribe via token (from email link)
 *
 * @param token - Unsubscribe token from email link
 * @returns Success or error message
 */
export async function unsubscribeWithTokenAction(
  token: string
): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    // Verify token and extract email
    const email = verifyEmailToken(token);

    if (!email) {
      return {
        success: false,
        error:
          "Link-ul de dezabonare nu este valid sau a expirat. Te rugăm să folosești formularul de mai jos.",
      };
    }

    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase().trim()),
    });

    if (!user) {
      // User doesn't exist - still return success for privacy
      return {
        success: true,
        message:
          "Dacă această adresă de email era înregistrată, a fost dezabonată cu succes. Nu vei mai primi emailuri de la Yuvoo.",
      };
    }

    // Update user to mark as unsubscribed
    const currentPreferences = (user.emailNotificationPreferences as Record<string, unknown>) || {};
    await db
      .update(users)
      .set({
        emailNotificationPreferences: {
          ...currentPreferences,
          unsubscribed: true,
          unsubscribedAt: new Date().toISOString(),
        },
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Track unsubscription event in PostHog
    try {
      await trackEventServer(PostHogEvents.EMAIL_UNSUBSCRIBED, {
        distinctId: user.id,
        [PostHogProperties.USER_ID]: user.id,
        [PostHogProperties.USER_EMAIL]: user.email,
        [PostHogProperties.USER_ROLE]: user.role,
        method: "token", // Token-based unsubscription
      });
    } catch (error) {
      console.error("[Unsubscribe] PostHog tracking error:", error);
    }

    return {
      success: true,
      message:
        "Te-ai dezabonat cu succes de la emailurile Yuvoo. Nu vei mai primi emailuri de marketing sau rapoarte de recomandări.",
    };
  } catch (error) {
    console.error("[Unsubscribe Token] Error:", error);
    return {
      success: false,
      error: "A apărut o eroare. Te rugăm să încerci din nou sau să ne contactezi.",
    };
  }
}

/**
 * Update email preferences
 *
 * @param userId - User ID
 * @param preferences - Email preferences object
 * @returns Success or error message
 */
export async function updateEmailPreferencesAction(
  userId: string,
  preferences: {
    quizResults?: boolean;
    clubUpdates?: boolean;
    doctorUpdates?: boolean;
    newsletter?: boolean;
    marketing?: boolean;
  }
): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return {
        success: false,
        error: "Utilizatorul nu a fost găsit.",
      };
    }

    // Update preferences
    const currentPreferences = (user.emailNotificationPreferences as Record<string, unknown>) || {};
    await db
      .update(users)
      .set({
        emailNotificationPreferences: {
          ...currentPreferences,
          ...preferences,
          updatedAt: new Date().toISOString(),
        },
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    // Track preferences update in PostHog
    try {
      await trackEventServer(PostHogEvents.EMAIL_PREFERENCES_UPDATED, {
        distinctId: userId,
        [PostHogProperties.USER_ID]: userId,
        preferences: JSON.stringify(preferences),
      });
    } catch (error) {
      console.error("[Email Preferences] PostHog tracking error:", error);
    }

    return {
      success: true,
      message: "Preferințele tale de email au fost actualizate cu succes.",
    };
  } catch (error) {
    console.error("[Email Preferences] Error:", error);
    return {
      success: false,
      error: "A apărut o eroare. Te rugăm să încerci din nou.",
    };
  }
}

/**
 * Get email preferences for a user
 *
 * @param userId - User ID
 * @returns Email preferences object
 */
export async function getEmailPreferencesAction(userId: string): Promise<{
  success: boolean;
  preferences?: Record<string, unknown>;
  error?: string;
}> {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return {
        success: false,
        error: "Utilizatorul nu a fost găsit.",
      };
    }

    const preferences = (user.emailNotificationPreferences as Record<string, unknown>) || {};

    return {
      success: true,
      preferences,
    };
  } catch (error) {
    console.error("[Get Email Preferences] Error:", error);
    return {
      success: false,
      error: "A apărut o eroare. Te rugăm să încerci din nou.",
    };
  }
}
