/**
 * Doctor Onboarding Layout
 *
 * Layout for doctor onboarding flow (8 steps).
 * Ensures user has "doctor" role.
 */

import { requireRole } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function DoctorOnboardingLayout({ children }: { children: ReactNode }) {
  // During production builds, skip authentication checks entirely
  // This prevents "cookies() rejects during prerender" errors
  const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

  if (isProductionBuild) {
    return <div className="doctor-onboarding">{children}</div>;
  }

  // At runtime, require doctor role
  try {
    await requireRole("doctor");
  } catch (_error) {
    // User is not a doctor, redirect to login
    redirect("/auth/login");
  }

  return <div className="doctor-onboarding">{children}</div>;
}
