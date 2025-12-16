/**
 * Authentication Server Actions
 *
 * Server Actions for authentication and authorization.
 * All authentication operations are performed server-side for better security.
 */

"use server";

import { stackServerApp } from "@/lib/auth/stack";
import { getCurrentUser, requireAuth, requireRole } from "@/modules/auth/auth.service";
import type { AuthUser, UserRole } from "@/modules/auth/auth.types";
import { routes } from "@/lib/routes";
import { getErrorMessage } from "@/lib/auth/errors";

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

    // Return success - redirect will be handled by the form component
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
    await stackServerApp.resetPasswordWithToken({
      token,
      newPassword: password,
    });

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
