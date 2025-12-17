/**
 * Authentication Server Actions
 *
 * Server Actions for authentication and authorization.
 * All authentication operations are performed server-side for better security.
 */

"use server";

import { stackServerApp } from "@/lib/auth/stack";
import { getCurrentUser, requireAuth, requireRole } from "@/modules/auth/auth.service";
import { getSession } from "@/lib/auth/session";
import type { AuthUser, UserRole } from "@/modules/auth/auth.types";
import { routes } from "@/lib/routes";
import { getErrorMessage } from "@/lib/auth/errors";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

/**
 * Get current authenticated user
 */
export async function getCurrentUserAction(): Promise<AuthUser | null> {
  try {
    return await getCurrentUser();
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuthAction(): Promise<AuthUser> {
  try {
    return await requireAuth();
  } catch {
    throw new Error("Autentificare necesară");
  }
}

/**
 * Require specific role - throws if user doesn't have role
 */
export async function requireRoleAction(role: UserRole): Promise<AuthUser> {
  try {
    return await requireRole(role);
  } catch {
    throw new Error(`Rolul ${role} este necesar`);
  }
}

/**
 * Sign in with email and password
 *
 * @param formData - Form data containing email and password
 * @param redirectUrl - Optional URL to redirect to after successful login
 */
export async function signInAction(formData: FormData, redirectUrl?: string) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      success: false,
      error: "Email și parola sunt obligatorii",
    };
  }

  try {
    await stackServerApp.signInWithCredential({
      email,
      password,
    });

    // Get user session for tracking
    try {
      const session = await getSession();
      if (session?.user) {
        // Track login event server-side
        await trackEventServer(PostHogEvents.USER_LOGGED_IN, {
          distinctId: session.user.id,
          [PostHogProperties.USER_ID]: session.user.id,
          [PostHogProperties.USER_ROLE]: session.dbUser?.role || "unknown",
        });
      }
    } catch (trackingError) {
      // Don't fail login if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking login event:", trackingError);
      }
    }

    // Use redirectUrl if provided, otherwise default to dashboard
    // Validate redirectUrl to prevent open redirect vulnerabilities
    const safeRedirectUrl =
      redirectUrl && redirectUrl.startsWith("/") ? redirectUrl : routes.parent.dashboard;

    // Return success - redirect will be handled by the form component
    return {
      success: true,
      redirect: safeRedirectUrl,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Sign up with email and password
 *
 * After successful signup:
 * - User is automatically synced to database (via getSession)
 * - If onboarding not completed, redirects to onboarding
 * - If onboarding completed, redirects to dashboard
 */
export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;

  if (!email || !password || !passwordConfirmation) {
    return {
      success: false,
      error: "Toate câmpurile sunt obligatorii",
    };
  }

  if (password !== passwordConfirmation) {
    return {
      success: false,
      error: "Parolele nu se potrivesc",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: "Parola trebuie să aibă cel puțin 6 caractere",
    };
  }

  try {
    await stackServerApp.signUpWithCredential({
      email,
      password,
    });

    // After signup, user is automatically synced to database via getSession
    // Check onboarding status to determine redirect
    try {
      const session = await getSession();
      if (session?.dbUser) {
        // Track signup event server-side
        try {
          await trackEventServer(PostHogEvents.USER_SIGNED_UP, {
            distinctId: session.user.id,
            [PostHogProperties.USER_ID]: session.user.id,
            [PostHogProperties.USER_ROLE]: session.dbUser.role,
          });
        } catch (trackingError) {
          // Don't fail signup if tracking fails
          if (process.env.NODE_ENV === "development") {
            console.error("[PostHog] Error tracking signup event:", trackingError);
          }
        }

        // Check if onboarding is completed
        if (!session.dbUser.onboardingCompleted) {
          // Redirect to onboarding based on role
          const onboardingUrl = getOnboardingUrl(session.dbUser.role);
          return {
            success: true,
            redirect: onboardingUrl,
          };
        }
      }
    } catch (sessionError) {
      // If we can't get session, default to dashboard
      // User will be redirected to onboarding by proxy if needed
      console.error("Error checking onboarding status after signup:", sessionError);
    }

    // Default: redirect to dashboard (proxy will handle onboarding redirect if needed)
    return {
      success: true,
      redirect: routes.parent.dashboard,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Get onboarding URL based on user role
 */
function getOnboardingUrl(role: string): string {
  switch (role) {
    case "parent":
      return routes.onboarding.parent.welcome;
    case "club_admin":
      return routes.onboarding.club.welcome;
    case "doctor":
      return routes.onboarding.doctor.welcome;
    case "admin":
      // Admins don't need onboarding
      return routes.admin.dashboard;
    default:
      return routes.onboarding.parent.welcome;
  }
}

/**
 * Send forgot password email
 */
export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return {
      success: false,
      error: "Adresa de email este obligatorie",
    };
  }

  try {
    await stackServerApp.sendForgotPasswordEmail(email);

    // Track password reset request (no distinctId since user might not be authenticated)
    try {
      // Use email as distinctId if available
      await trackEventServer(PostHogEvents.PASSWORD_RESET_REQUESTED, {
        distinctId: email, // Use email as distinctId for unauthenticated users
      });
    } catch (trackingError) {
      // Don't fail if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking password reset request:", trackingError);
      }
    }

    return {
      success: true,
      message:
        "Link-ul de resetare a parolei a fost trimis la adresa ta de email. Verifică căsuța poștală.",
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Reset password with token
 */
export async function resetPasswordAction(formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("passwordConfirmation") as string;

  if (!token) {
    return {
      success: false,
      error: "Link-ul de resetare este invalid sau a expirat",
    };
  }

  if (!password || !passwordConfirmation) {
    return {
      success: false,
      error: "Parola și confirmarea parolei sunt obligatorii",
    };
  }

  if (password !== passwordConfirmation) {
    return {
      success: false,
      error: "Parolele nu se potrivesc",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: "Parola trebuie să aibă cel puțin 6 caractere",
    };
  }

  try {
    // Stack Auth uses resetPassword method with code and password
    // The token from the URL is actually a reset code
    await stackServerApp.resetPassword({
      code: token, // Stack Auth expects 'code' parameter
      password: password,
    });

    // Try to get user session for tracking (user might be authenticated now)
    try {
      const session = await getSession();
      if (session?.user) {
        await trackEventServer(PostHogEvents.PASSWORD_RESET_COMPLETED, {
          distinctId: session.user.id,
          [PostHogProperties.USER_ID]: session.user.id,
        });
      }
    } catch (trackingError) {
      // Don't fail if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking password reset completion:", trackingError);
      }
    }

    // Return success - redirect will be handled by the form component
    return {
      success: true,
      redirect: routes.login,
    };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

/**
 * Verify email with token
 */
export async function verifyEmailAction(token: string) {
  if (!token) {
    return {
      success: false,
      error: "Link-ul de verificare este invalid sau lipsește",
    };
  }

  try {
    const result = await stackServerApp.verifyEmail(token);

    if ("status" in result && result.status === "ok") {
      // Try to get user session for tracking
      try {
        const session = await getSession();
        if (session?.user) {
          await trackEventServer(PostHogEvents.EMAIL_VERIFIED, {
            distinctId: session.user.id,
            [PostHogProperties.USER_ID]: session.user.id,
          });
        }
      } catch (trackingError) {
        // Don't fail if tracking fails
        if (process.env.NODE_ENV === "development") {
          console.error("[PostHog] Error tracking email verification:", trackingError);
        }
      }

      // Return success - redirect will be handled by the component
      return {
        success: true,
        redirect: routes.login,
      };
    } else {
      const error = result.error as { humanReadableMessage?: string; message?: string } | undefined;
      const errorMsg =
        error?.humanReadableMessage || error?.message || "Eroare la verificarea email-ului";

      return {
        success: false,
        error: errorMsg,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
