/**
 * Club Admin Onboarding - Step 7: Complete
 */

import { requireRole } from "@/lib/auth/session";
import { completeClubOnboarding } from "@/app/actions/onboarding";

export default async function ClubCompletePage() {
  await requireRole("club_admin");

  // Mark onboarding as complete and redirect to dashboard
  // This function calls redirect() internally, so it never returns
  await completeClubOnboarding();
}
