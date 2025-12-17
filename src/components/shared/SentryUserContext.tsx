"use client";

import { useEffect } from "react";
import { setSentryUserContext } from "@/lib/monitoring/sentry-context";

interface SentryUserContextProps {
  userId: string;
  email?: string | null;
  role?: string | null;
  name?: string | null;
}

/**
 * Sentry User Context Component
 *
 * Sets user context in Sentry for error tracking.
 * Should be used in protected route layouts where user session is guaranteed.
 *
 * @example
 * // In a Server Component layout:
 * const session = await requireAuth();
 * return (
 *   <>
 *     <SentryUserContext
 *       userId={session.user.id}
 *       email={session.user.primaryEmail}
 *       role={session.dbUser.role}
 *       name={session.dbUser.firstName}
 *     />
 *     {children}
 *   </>
 * );
 */
export function SentryUserContext({ userId, email, role, name }: SentryUserContextProps) {
  useEffect(() => {
    setSentryUserContext(userId, email, role, name);
  }, [userId, email, role, name]);

  return null;
}
