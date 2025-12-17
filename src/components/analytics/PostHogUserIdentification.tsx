"use client";

import { useEffect, useRef } from "react";
import { identifyUser } from "@/lib/analytics/tracking";

interface PostHogUserIdentificationProps {
  userId: string;
  email?: string | null;
  role?: string | null;
  name?: string | null;
  signupDate?: Date | string | null; // User signup date for $set_once
}

/**
 * PostHog User Identification Component
 *
 * Identifies the user in PostHog after authentication.
 * This connects anonymous sessions with authenticated users,
 * enabling complete user journey tracking across sessions.
 *
 * Should be used in protected pages where user session is guaranteed.
 *
 * @example
 * // In a Server Component page:
 * const session = await requireAuth();
 * return (
 *   <>
 *     <PostHogUserIdentification
 *       userId={session.user.id}
 *       email={session.user.primaryEmail}
 *       role={session.dbUser.role}
 *       name={session.dbUser.firstName}
 *       signupDate={session.dbUser.createdAt}
 *     />
 *     {/* Rest of page content *\/}
 *   </>
 * );
 */
export default function PostHogUserIdentification({
  userId,
  email,
  role,
  name,
  signupDate,
}: PostHogUserIdentificationProps) {
  const hasIdentified = useRef(false);

  useEffect(() => {
    // Only identify once per component mount
    if (hasIdentified.current) return;

    // Convert signupDate to ISO string if it's a Date object
    const signupDateString =
      signupDate instanceof Date
        ? signupDate.toISOString()
        : typeof signupDate === "string"
          ? signupDate
          : undefined;

    // Identify user with PostHog using person properties
    // $set: Properties that can be updated (email, role, name)
    // $set_once: Properties that should only be set once (signupDate)
    identifyUser(userId, {
      $set: {
        ...(email && { email }),
        ...(role && { role }),
        ...(name && { name }),
      },
      ...(signupDateString && {
        $set_once: {
          signupDate: signupDateString,
        },
      }),
    });

    hasIdentified.current = true;
  }, [userId, email, role, name, signupDate]);

  // This component doesn't render anything
  return null;
}
