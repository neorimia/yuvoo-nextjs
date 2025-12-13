/**
 * Parent Onboarding Layout
 *
 * Layout for parent onboarding flow (5 steps).
 * Ensures user has "parent" role.
 */

import { requireRole } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function ParentOnboardingLayout({ children }: { children: ReactNode }) {
  // Require parent role
  try {
    await requireRole("parent");
  } catch (_error) {
    // User is not a parent, redirect to login
    redirect("/auth/login");
  }

  return <div className="parent-onboarding">{children}</div>;
}
