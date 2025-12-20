/**
 * Stack Auth Provider
 *
 * Provides Stack Auth context to client components.
 * Enables client-side hooks: useStackApp(), useUser(), useStackRedirect(), etc.
 *
 * This provider wraps the application and makes Stack Auth available
 * to all client components that need authentication state.
 */

"use client";

import { StackProvider, StackClientApp } from "@stackframe/stack";
import { useMemo } from "react";
import type { ReactNode } from "react";

interface StackAuthProviderProps {
  children: ReactNode;
}

/**
 * Stack Auth Provider Component
 *
 * Wraps the app with StackProvider to enable:
 * - Client-side authentication hooks (useStackApp, useUser, etc.)
 * - Automatic session management
 * - Client-side redirect handling
 */
export function StackAuthProvider({ children }: StackAuthProviderProps) {
  // Create client app with public environment variables
  // useMemo ensures the app is only created once
  const stackClientApp = useMemo(() => {
    const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
    const publishableClientKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

    if (!projectId || !publishableClientKey) {
      throw new Error(
        "Missing Stack Auth environment variables. " +
          "Please ensure NEXT_PUBLIC_STACK_PROJECT_ID and NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY are set."
      );
    }

    return new StackClientApp({
      projectId,
      publishableClientKey,
      tokenStore: "cookie",
    });
  }, []);

  return <StackProvider app={stackClientApp}>{children}</StackProvider>;
}
