/**
 * Onboarding Layout
 *
 * Protected layout for all onboarding flows (parent, club, doctor).
 * Ensures user is authenticated before accessing onboarding routes.
 */

import { requireAuth } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

export default async function OnboardingLayout({ children }: { children: ReactNode }) {
  // Access cookies to make this route dynamic (required for authentication)
  // In Next.js 16 Cache Components mode, using cookies() automatically makes the route dynamic
  // Handle prerender case gracefully - during build, cookies() will reject
  let isPrerendering = false;
  let cookiesResult: Awaited<ReturnType<typeof cookies>> | null = null;

  try {
    cookiesResult = await cookies();
  } catch (error: unknown) {
    // During build/prerender, cookies() rejects with HANGING_PROMISE_REJECTION
    // Check for the specific error digest that indicates prerendering
    const errorObj = error as { digest?: string; message?: string; name?: string };
    const errorMessage = errorObj?.message || "";
    const errorDigest = errorObj?.digest || "";

    // Check for any indication this is a prerender error
    if (
      errorDigest === "HANGING_PROMISE_REJECTION" ||
      errorMessage.includes("prerender") ||
      errorMessage.includes("prerender is complete") ||
      errorMessage.includes("During prerendering")
    ) {
      isPrerendering = true;
    } else {
      // During production builds, assume all cookies() errors are prerender-related
      // This is safer than re-throwing and breaking the build
      if (
        process.env.NODE_ENV === "production" ||
        process.env.NEXT_PHASE === "phase-production-build"
      ) {
        isPrerendering = true;
      } else {
        // Only re-throw in development if it's clearly not a prerender error
        throw error;
      }
    }
  }

  // During prerender, skip auth check and return layout without auth
  if (isPrerendering || !cookiesResult) {
    return (
      <div className="onboarding-container">
        <main className="onboarding-main">{children}</main>
      </div>
    );
  }

  // Require authentication for all onboarding routes (runtime only)
  const session = await requireAuth();

  // If onboarding already completed, redirect to dashboard
  // This is a backup check - middleware should catch this
  if (session.dbUser.onboardingCompleted) {
    const dashboardUrl = getDashboardUrl(session.dbUser.role);
    redirect(dashboardUrl);
  }

  return (
    <div className="onboarding-container">
      {/* Minimal layout - no header/footer to reduce distractions */}
      <main className="onboarding-main">{children}</main>
    </div>
  );
}

/**
 * Get dashboard URL based on user role
 */
function getDashboardUrl(role: string): string {
  switch (role) {
    case "parent":
      return "/parent/dashboard";
    case "club_admin":
      return "/club/dashboard";
    case "doctor":
      return "/doctor/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/parent/dashboard";
  }
}
