/**
 * Club Admin Onboarding Layout
 *
 * Layout for club admin onboarding flow (7 steps).
 * Ensures user has "club_admin" role.
 */

import { requireRole } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function ClubOnboardingLayout({ children }: { children: ReactNode }) {
  // Require club_admin role
  try {
    await requireRole("club_admin");
  } catch (_error) {
    // User is not a club admin, redirect to login
    redirect("/auth/login");
  }

  return <div className="club-onboarding">{children}</div>;
}
