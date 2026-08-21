/**
 * Club Admin Onboarding Layout
 *
 * Layout for club admin onboarding flow (7 steps).
 * Ensures user has "club_admin" role.
 */

import { requireRole } from "@/lib/auth/session";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function ClubOnboardingLayout({ children }: { children: ReactNode }) {
  // During production builds, skip authentication checks entirely
  // This prevents "cookies() rejects during prerender" errors
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  if (isProductionBuild) {
    return <div className="club-onboarding">{children}</div>;
  }

  // At runtime, require club_admin role
  try {
    await requireRole("club_admin");
  } catch (_error) {
    // User is not a club admin, redirect to login
    redirect(routes.login);
  }

  return <div className="club-onboarding">{children}</div>;
}
