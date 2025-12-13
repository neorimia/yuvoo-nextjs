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

export default async function OnboardingLayout({ children }: { children: ReactNode }) {
  // Access cookies to make this route dynamic (required for authentication)
  // In Next.js 16 Cache Components mode, using cookies() automatically makes the route dynamic
  await cookies();

  // Require authentication for all onboarding routes
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
    case "parent":
      return "/parent/dashboard";
    case "club_admin":
      return "/club/dashboard";
    case "doctor":
      return "/doctor/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/parent/dashboard";
  }
}
