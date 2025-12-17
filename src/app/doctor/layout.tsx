import React from "react";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import PostHogUserIdentification from "@/components/analytics/PostHogUserIdentification";

/**
 * Doctor Routes Layout
 *
 * Layout for all doctor-protected routes.
 * Automatically identifies users with PostHog for analytics tracking.
 */
export default async function DoctorLayout({ children }: { children: React.ReactNode }) {
  // Explicitly access cookies to ensure route is dynamic
  await cookies();
  // Require authentication
  const session = await requireAuth();

  return (
    <>
      <PostHogUserIdentification
        userId={session.user.id}
        email={session.user.primaryEmail}
        role={session.dbUser.role}
        firstName={session.dbUser.firstName}
        lastName={session.dbUser.lastName}
        phone={session.dbUser.phone}
        signupDate={session.dbUser.createdAt}
        emailVerified={session.user.primaryEmailVerified ?? undefined}
        onboardingCompleted={session.dbUser.onboardingCompleted}
      />
      {children}
    </>
  );
}
