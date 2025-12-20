/**
 * Authentication Redirect Helpers
 *
 * Helper functions for determining redirect URLs based on user role and onboarding status.
 */

import { routes } from "@/lib/routes";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import type { UserRole } from "@/modules/auth/auth.types";

/**
 * Get role-based redirect URL
 * Returns onboarding URL if onboarding is incomplete, otherwise returns dashboard URL
 *
 * @param role - User role (parent, club_admin, doctor, admin)
 * @param onboardingCompleted - Whether the user has completed onboarding
 * @returns Redirect URL string
 */
export function getRoleBasedRedirect(role: UserRole, onboardingCompleted: boolean): string {
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
