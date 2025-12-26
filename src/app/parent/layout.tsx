import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import PostHogUserIdentification from "@/components/analytics/PostHogUserIdentification";
import { SentryUserContext } from "@/components/shared/SentryUserContext";
import DashboardShell from "@/components/layout/DashboardShell";
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";

/**
 * Parent Routes Layout
 *
 * Layout for all parent-protected routes.
 * Checks pre-launch restrictions flag first.
 * If enabled, shows pre-launch page instead of dashboard.
 * Otherwise, wraps content with DashboardShell for consistent navigation and layout.
 * Automatically identifies users with PostHog for analytics tracking.
 */
export default async function ParentLayout({ children }: { children: React.ReactNode }) {
  // Check pre-launch restrictions first
  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="dashboard" />;
  }

  // Explicitly access cookies to ensure route is dynamic
  await cookies();

  // Get session (don't throw if not authenticated - handle gracefully)
  const session = await getSession();

  // If not authenticated, redirect to login
  if (!session) {
    redirect(routes.login);
  }

  // Role-based protection: redirect non-parent users to their appropriate dashboard
  if (session.dbUser.role !== UserRoleEnum.PARENT) {
    // Redirect based on role and onboarding status
    if (!session.dbUser.onboardingCompleted) {
      // Redirect to appropriate onboarding
      switch (session.dbUser.role) {
        case UserRoleEnum.CLUB_ADMIN:
          redirect(routes.onboarding.club.welcome);
        case UserRoleEnum.DOCTOR:
          redirect(routes.onboarding.doctor.welcome);
        case UserRoleEnum.ADMIN:
          redirect(routes.admin.dashboard);
        default:
          redirect(routes.onboarding.parent.welcome);
      }
    } else {
      // Redirect to appropriate dashboard
      switch (session.dbUser.role) {
        case UserRoleEnum.CLUB_ADMIN:
          redirect(routes.club.dashboard);
        case UserRoleEnum.DOCTOR:
          redirect(routes.doctor.dashboard);
        case UserRoleEnum.ADMIN:
          redirect(routes.admin.dashboard);
        default:
          redirect(routes.parent.dashboard);
      }
    }
  }

  // Note: Parent onboarding completion is handled by the onboarding complete page
  // which redirects to dashboard. The onboarding flow itself handles access control.

  return (
    <>
      <SentryUserContext
        userId={session.user.id}
        email={session.user.primaryEmail}
        role={session.dbUser.role}
        name={session.dbUser.firstName || session.dbUser.email || undefined}
      />
      <PostHogUserIdentification
        userId={session.user.id}
        email={session.user.primaryEmail}
        role={session.dbUser.role}
        firstName={session.dbUser.firstName}
        lastName={session.dbUser.lastName}
        phone={session.dbUser.phone}
        signupDate={session.dbUser.createdAt}
        emailVerified={
          (session.user as { primaryEmailVerified?: boolean }).primaryEmailVerified ?? undefined
        }
        onboardingCompleted={session.dbUser.onboardingCompleted}
      />
      <DashboardShell role="parent">{children}</DashboardShell>
    </>
  );
}
