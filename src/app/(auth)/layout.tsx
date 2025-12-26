import React from "react";
import { PRE_LAUNCH_RESTRICTIONS_ENABLED } from "@/lib/config/pre-launch";
import PreLaunchPage from "@/components/features/early-access/PreLaunchPage";

/**
 * Auth Routes Layout
 *
 * Layout for authentication pages (login, register, etc.).
 * Checks pre-launch restrictions flag.
 * If enabled, shows pre-launch page instead of auth routes.
 */
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  if (PRE_LAUNCH_RESTRICTIONS_ENABLED) {
    return <PreLaunchPage routeType="auth" />;
  }

  return <>{children}</>;
}
