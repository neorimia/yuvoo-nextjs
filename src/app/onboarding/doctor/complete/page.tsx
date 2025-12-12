/**
 * Doctor Onboarding - Step 8: Complete
 */

import { requireRole } from "@/lib/auth/session";
import { completeDoctorOnboarding } from "@/app/actions/onboarding";

export default async function DoctorCompletePage() {
  await requireRole("doctor");

  // Mark onboarding as complete and redirect to dashboard
  // This function calls redirect() internally, so it never returns
  await completeDoctorOnboarding();
}
