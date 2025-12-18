/**
 * Parent Onboarding - Step 5: Complete
 *
 * Final step - mark onboarding as complete and redirect to dashboard.
 */

import { headers } from "next/headers";
import { requireRole } from "@/lib/auth/session";
import { completeParentOnboarding } from "@/app/actions/onboarding";

export default async function ParentCompletePage() {
  // Make page dynamic to avoid prerendering issues
  await headers();

  await requireRole("parent");

  // Mark onboarding as complete and redirect to dashboard
  // This function calls redirect() internally, so it never returns
  await completeParentOnboarding("dashboard");
}
