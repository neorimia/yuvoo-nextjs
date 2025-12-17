import React from "react";
import { cookies } from "next/headers";
import { requireAuth } from "@/lib/auth/session";
import PostHogUserIdentification from "@/components/analytics/PostHogUserIdentification";

/**
 * Club Routes Layout
 *
 * Layout for all club-protected routes.
 * Automatically identifies users with PostHog for analytics tracking.
 */
export default async function ClubLayout({ children }: { children: React.ReactNode }) {
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
        name={session.dbUser.firstName || session.dbUser.email || undefined}
        signupDate={session.dbUser.createdAt}
      />
      {children}
    </>
  );
}
