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
  // Require doctor role
  try {
    await requireRole("doctor");
  } catch (_error) {
    // User is not a doctor, redirect to login
    redirect("/auth/login");
  }

  return <div className="doctor-onboarding">{children}</div>;
}
