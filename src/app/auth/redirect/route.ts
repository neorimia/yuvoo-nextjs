/**
 * Authentication Redirect Proxy
 *
 * This route handles post-authentication redirects from Stack Auth.
 * It redirects users to the appropriate dashboard or onboarding flow
 * based on their role and onboarding status.
 *
 * Route: /auth/redirect
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import type { UserRole } from "@/modules/auth/auth.types";

/**
 * Get role-based redirect URL
 * Returns onboarding URL if onboarding is incomplete, otherwise returns dashboard URL
 */
function getRoleBasedRedirect(role: UserRole, onboardingCompleted: boolean): string {
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

export async function GET(request: NextRequest) {
  try {
    // Get user session
    // Note: If session is not immediately available (e.g., cookies still being set),
    // we'll retry once after a short delay
    let session = await getSession();

    if (!session) {
      // Session not found - this might be a timing issue with cookie setting
      // Wait a brief moment and retry once
      await new Promise((resolve) => setTimeout(resolve, 100));
      session = await getSession();

      if (!session) {
        // Still not authenticated after retry - redirect to login
        console.warn("[Auth Redirect] Session not found after retry, redirecting to login");
        return NextResponse.redirect(new URL(routes.login, request.url));
      }
    }

    // Get role-based redirect URL
    const redirectUrl = getRoleBasedRedirect(
      session.dbUser.role,
      session.dbUser.onboardingCompleted
    );

    // Redirect to appropriate URL
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    // Error getting session - redirect to login
    console.error("[Auth Redirect] Error getting session:", error);
    return NextResponse.redirect(new URL(routes.login, request.url));
  }
}
