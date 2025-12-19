/**
 * Authentication Server Actions
 *
 * Server Actions for authentication and authorization.
 * All authentication operations are performed server-side for better security.
 */

"use server";

import { headers } from "next/headers";
import { stackServerApp } from "@/lib/auth/stack";
import { getCurrentUser, requireAuth, requireRole } from "@/modules/auth/auth.service";
import { getSession } from "@/lib/auth/session";
import type { AuthUser, UserRole } from "@/modules/auth/auth.types";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import { routes } from "@/lib/routes";
import { getErrorMessage } from "@/lib/auth/errors";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";
import { rateLimit, getClientIdentifierFromHeaders, RATE_LIMIT_CONFIGS } from "@/lib/rate-limit";
import {
  signInSchema,
  signUpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from "@/lib/validations/auth";

/**
 * Get role-based redirect URL
 * Returns onboarding URL if onboarding is incomplete, otherwise returns dashboard URL
 */
async function getRoleBasedRedirect(role: UserRole, onboardingCompleted: boolean): Promise<string> {
  // If onboarding is not completed, redirect to onboarding
  if (!onboardingCompleted) {
    switch (role) {
      case UserRoleEnum.PARENT:
        return routes.onboarding.parent.welcome;
      case UserRoleEnum.CLUB_ADMIN:
        return routes.onboarding.club.welcome;
      case UserRoleEnum.DOCTOR:
        return routes.onboarding.doctor.welcome;
      case UserRoleEnum.ADMIN:
        // Admins don't need onboarding
        return routes.admin.dashboard;
      default:
        return routes.onboarding.parent.welcome;
    }
  }

  // Onboarding completed - redirect to dashboard
  switch (role) {
    case UserRoleEnum.PARENT:
      return routes.parent.dashboard;
    case UserRoleEnum.CLUB_ADMIN:
      return routes.club.dashboard;
    case UserRoleEnum.DOCTOR:
      return routes.doctor.dashboard;
    case UserRoleEnum.ADMIN:
      return routes.admin.dashboard;
    default:
      return routes.parent.dashboard;
  }
}

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
  // Validate input with Zod schema
  const validationResult = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    const firstError = validationResult.error.errors[0];
    return {
      success: false,
      error: firstError?.message || "Date invalide. Te rugăm să verifici email-ul și parola.",
    };
  }

  const { email, password } = validationResult.data;

  // Rate limiting: prevent brute force attacks
  try {
    const headersList = await headers();
    const identifier = getClientIdentifierFromHeaders(undefined, headersList);
    const rateLimitResult = await rateLimit(`signin:${identifier}`, RATE_LIMIT_CONFIGS.SIGN_IN);

    if (!rateLimitResult.success) {
      return {
        success: false,
        error: `Prea multe încercări de autentificare. Te rugăm să încerci din nou după ${rateLimitResult.resetTime}.`,
      };
    }
  } catch (rateLimitError) {
    // Don't block login if rate limiting fails (log and continue)
    console.error("[RateLimit] Error checking rate limit for sign in:", rateLimitError);
  }

  try {
    await stackServerApp.signInWithCredential({
      email,
      password,
    });

    // Debug: Check cookies and session (development only)
    if (process.env.NODE_ENV === "development") {
      const { logCookieDebug } = await import("@/lib/auth/debug-cookies");
      await logCookieDebug("signInAction - After login");
    }

    // Get user session for tracking and role-based redirect
    let session = null;
    try {
      session = await getSession();
      if (session?.user) {
        // Track login event server-side with person properties
        await trackEventServer(PostHogEvents.USER_LOGGED_IN, {
          distinctId: session.user.id,
          [PostHogProperties.USER_ID]: session.user.id,
          [PostHogProperties.USER_ROLE]: session.dbUser?.role || "unknown",
          // Update last login date
          $set: {
            lastLoginDate: new Date().toISOString(),
          },
        });
      }
    } catch (trackingError) {
      // Don't fail login if tracking fails
      if (process.env.NODE_ENV === "development") {
        console.error("[PostHog] Error tracking login event:", trackingError);
      }
    }

    // Use redirectUrl if provided, otherwise use role-based redirect
    // Validate redirectUrl to prevent open redirect vulnerabilities
    let safeRedirectUrl: string;

    if (redirectUrl) {
      try {
        // Decode URL if it's still encoded (Next.js should decode query params, but be safe)
        let decodedUrl = redirectUrl;
        if (redirectUrl.includes("%")) {
          decodedUrl = decodeURIComponent(redirectUrl);
        }

        // Validate it's a relative path (security: prevent open redirect)
        if (decodedUrl.startsWith("/") && !decodedUrl.startsWith("//")) {
          safeRedirectUrl = decodedUrl;
        } else {
          // Invalid redirect URL - use role-based redirect
          if (session?.dbUser) {
            safeRedirectUrl = await getRoleBasedRedirect(
              session.dbUser.role,
              session.dbUser.onboardingCompleted
            );
          } else {
            safeRedirectUrl = routes.parent.dashboard; // Fallback
          }
        }
      } catch (error) {
        // If decoding fails, use role-based redirect
        console.error("Error decoding redirectUrl:", error);
        if (session?.dbUser) {
          safeRedirectUrl = await getRoleBasedRedirect(
            session.dbUser.role,
            session.dbUser.onboardingCompleted
          );
        } else {
          safeRedirectUrl = routes.parent.dashboard; // Fallback
        }
      }
    } else {
      // No redirectUrl provided - use role-based redirect
      if (session?.dbUser) {
        safeRedirectUrl = await getRoleBasedRedirect(
          session.dbUser.role,
          session.dbUser.onboardingCompleted
        );
      } else {
        // Session not available yet - this shouldn't happen, but use fallback
        safeRedirectUrl = routes.parent.dashboard;
      }
    }

    // Return success - redirect will be handled by the form component
    return {
      success: true,
      redirect: safeRedirectUrl,
    };
  } catch (error) {
    // Re-throw NEXT_REDIRECT errors to allow Next.js to handle them
    // Stack Auth might throw these internally
    if (error && typeof error === "object" && "digest" in error) {
      const digest = (error as { digest?: string }).digest;
      if (digest && typeof digest === "string" && digest.includes("NEXT_REDIRECT")) {
        throw error;
      }
    }

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
  // Validate input with Zod schema
  const validationResult = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
    role: formData.get("role"),
  });

  if (!validationResult.success) {
    const firstError = validationResult.error.errors[0];
    return {
      success: false,
      error: firstError?.message || "Date invalide. Te rugăm să verifici toate câmpurile.",
    };
  }

  const { email, password, role } = validationResult.data;

  // Rate limiting: prevent spam registrations
  try {
    const headersList = await headers();
    const identifier = getClientIdentifierFromHeaders(undefined, headersList);
    const rateLimitResult = await rateLimit(`signup:${identifier}`, RATE_LIMIT_CONFIGS.SIGN_UP);

    if (!rateLimitResult.success) {
      return {
        success: false,
        error: `Prea multe încercări de înregistrare. Te rugăm să încerci din nou după ${rateLimitResult.resetTime}.`,
      };
    }
  } catch (rateLimitError) {
    // Don't block signup if rate limiting fails (log and continue)
    console.error("[RateLimit] Error checking rate limit for sign up:", rateLimitError);
  }

  try {
    // Build verification callback URL for email verification
    // Required when calling from Server Action (non-browser environment)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verificationCallbackUrl = `${baseUrl}${routes.emailConfirmation}`;

    await stackServerApp.signUpWithCredential({
      email,
      password,
      verificationCallbackUrl,
    });

    // Update user metadata with role after signup
    // Get the user and update metadata to ensure role is stored
    try {
      const user = await stackServerApp.getUser();
      if (user) {
        await user.update({
          clientMetadata: {
            role: role,
          },
        });
      }
    } catch (metadataError) {
      // Log error but don't fail signup - role will use default "parent" in database
      if (process.env.NODE_ENV === "development") {
        console.error("[Stack Auth] Error updating user metadata:", metadataError);
      }
    }

    // After signup, user is automatically synced to database via getSession
    // Check onboarding status to determine redirect
    try {
      const session = await getSession();
      if (session?.dbUser) {
        // Track signup event server-side with person properties
        try {
          const signupDate = session.dbUser.createdAt.toISOString();
          await trackEventServer(PostHogEvents.USER_SIGNED_UP, {
            distinctId: session.user.id,
            [PostHogProperties.USER_ID]: session.user.id,
            [PostHogProperties.USER_ROLE]: session.dbUser.role,
            // Person properties: $set for updatable, $set_once for immutable
            $set: {
              email: session.user.primaryEmail || session.dbUser.email,
              role: session.dbUser.role,
              ...(session.dbUser.firstName && { name: session.dbUser.firstName }),
            },
            $set_once: {
              signupDate: signupDate,
            },
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
    // Re-throw NEXT_REDIRECT errors to allow Next.js to handle them
    // Stack Auth might throw these internally
    if (error && typeof error === "object" && "digest" in error) {
      const digest = (error as { digest?: string }).digest;
      if (digest && typeof digest === "string" && digest.includes("NEXT_REDIRECT")) {
        throw error;
      }
    }

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
    case UserRoleEnum.PARENT:
      return routes.onboarding.parent.welcome;
    case UserRoleEnum.CLUB_ADMIN:
      return routes.onboarding.club.welcome;
    case UserRoleEnum.DOCTOR:
      return routes.onboarding.doctor.welcome;
    case UserRoleEnum.ADMIN:
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
  // Validate input with Zod schema
  const validationResult = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validationResult.success) {
    const firstError = validationResult.error.errors[0];
    return {
      success: false,
      error: firstError?.message || "Adresa de email este obligatorie",
    };
  }

  const { email } = validationResult.data;

  // Rate limiting: prevent email spam
  try {
    const headersList = await headers();
    const identifier = getClientIdentifierFromHeaders(undefined, headersList);
    const rateLimitResult = await rateLimit(
      `forgot-password:${identifier}`,
      RATE_LIMIT_CONFIGS.FORGOT_PASSWORD
    );

    if (!rateLimitResult.success) {
      return {
        success: false,
        error: `Prea multe solicitări de resetare a parolei. Te rugăm să încerci din nou după ${rateLimitResult.resetTime}.`,
      };
    }
  } catch (rateLimitError) {
    // Don't block if rate limiting fails (log and continue)
    console.error("[RateLimit] Error checking rate limit for forgot password:", rateLimitError);
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
  // Validate input with Zod schema
  const validationResult = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  if (!validationResult.success) {
    const firstError = validationResult.error.errors[0];
    return {
      success: false,
      error: firstError?.message || "Date invalide. Te rugăm să verifici toate câmpurile.",
    };
  }

  const { token, password } = validationResult.data;

  // Rate limiting: prevent brute force on password reset
  try {
    const headersList = await headers();
    const identifier = getClientIdentifierFromHeaders(undefined, headersList);
    const rateLimitResult = await rateLimit(
      `reset-password:${identifier}`,
      RATE_LIMIT_CONFIGS.RESET_PASSWORD
    );

    if (!rateLimitResult.success) {
      return {
        success: false,
        error: `Prea multe încercări de resetare a parolei. Te rugăm să încerci din nou după ${rateLimitResult.resetTime}.`,
      };
    }
  } catch (rateLimitError) {
    // Don't block if rate limiting fails (log and continue)
    console.error("[RateLimit] Error checking rate limit for reset password:", rateLimitError);
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
  // Validate input with Zod schema
  const validationResult = verifyEmailSchema.safeParse({ token });

  if (!validationResult.success) {
    const firstError = validationResult.error.errors[0];
    return {
      success: false,
      error: firstError?.message || "Link-ul de verificare este invalid sau lipsește",
    };
  }

  const { token: validatedToken } = validationResult.data;

  try {
    const result = await stackServerApp.verifyEmail(validatedToken);

    if ("status" in result && result.status === "ok") {
      // Try to get user session for tracking
      try {
        const session = await getSession();
        if (session?.user) {
          await trackEventServer(PostHogEvents.EMAIL_VERIFIED, {
            distinctId: session.user.id,
            [PostHogProperties.USER_ID]: session.user.id,
            // Person properties: mark email as verified
            $set: {
              emailVerified: true,
            },
            $set_once: {
              emailVerifiedDate: new Date().toISOString(),
            },
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
      const errorMessage = error?.humanReadableMessage || error?.message || "";

      // Check if the error indicates the link was already used (email already verified)
      // Stack Auth returns "The verification link has already been used" for already-verified emails
      if (
        errorMessage.toLowerCase().includes("already been used") ||
        errorMessage.toLowerCase().includes("already used") ||
        errorMessage.toLowerCase().includes("deja folosit")
      ) {
        // Email is already verified - treat as success
        // The user can just log in
        return {
          success: true,
          redirect: routes.login,
          message: "Email-ul tău este deja verificat. Poți să te autentifici.",
        };
      }

      // For other errors, return the error message in Romanian
      const errorMsg =
        errorMessage || "Eroare la verificarea email-ului. Link-ul poate fi expirat sau invalid.";

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
