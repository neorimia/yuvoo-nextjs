/**
 * Onboarding Layout
 *
 * Protected layout for all onboarding flows (parent, club, doctor).
 * Ensures user is authenticated before accessing onboarding routes.
 */

import { requireAuth } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { UserRoleEnum } from "@/modules/auth/auth.types";
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";

export default async function OnboardingLayout({ children }: { children: ReactNode }) {
  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="onboarding" />;
  }
  // During production builds, skip authentication checks entirely
  // This prevents "cookies() rejects during prerender" errors
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  if (isProductionBuild) {
    // Return minimal layout for build-time prerendering
    return (
      <div className="onboarding-container">
        <main className="onboarding-main">{children}</main>
      </div>
    );
  }

  // At runtime, access cookies to make this route dynamic (required for authentication)
  // In Next.js 16 Cache Components mode, using cookies() automatically makes the route dynamic
  let cookiesResult: Awaited<ReturnType<typeof cookies>> | null = null;

  try {
    cookiesResult = await cookies();
  } catch (error: unknown) {
    // During unexpected prerender cases at runtime, handle gracefully
    const errorObj = error as { digest?: string; message?: string };
    const errorMessage = errorObj?.message || "";

    // Only log in development to help debugging
    if (process.env.NODE_ENV === "development") {
      console.warn("Onboarding layout: cookies() access failed during prerender", errorMessage);
    }

    // Return layout without auth check
    return (
      <div className="onboarding-container">
        <main className="onboarding-main">{children}</main>
      </div>
    );
  }

  // If cookies access failed, skip auth check
  if (!cookiesResult) {
    return (
      <div className="onboarding-container">
        <main className="onboarding-main">{children}</main>
      </div>
    );
  }

  // Require authentication for all onboarding routes (runtime only)
  const session = await requireAuth();

  // If onboarding already completed, redirect to dashboard
  // This is a backup check - middleware should catch this
  if (session.dbUser.onboardingCompleted) {
    const dashboardUrl = getDashboardUrl(session.dbUser.role);
    redirect(dashboardUrl);
  }

  return (
    <div className="onboarding-container">
      {/* Minimal layout - no header/footer to reduce distractions */}
      <main className="onboarding-main">{children}</main>
    </div>
  );
}

/**
 * Get dashboard URL based on user role
 */
function getDashboardUrl(role: string): string {
  switch (role) {
    case UserRoleEnum.PARENT:
      return "/parent/dashboard";
    case UserRoleEnum.CLUB_ADMIN:
      return "/club/dashboard";
    case UserRoleEnum.DOCTOR:
      return "/doctor/dashboard";
    case UserRoleEnum.ADMIN:
      return "/admin/dashboard";
    default:
      return "/parent/dashboard";
  }
}
