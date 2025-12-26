import React from "react";
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";

/**
 * Quiz Routes Layout
 *
 * Checks pre-launch restrictions flag.
 * If enabled, shows pre-launch page instead of quiz routes.
 */
export default async function QuizLayout({ children }: { children: React.ReactNode }) {
  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="quiz" />;
  }

  return <>{children}</>;
}
