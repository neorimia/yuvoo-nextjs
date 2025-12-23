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
 *
 * Creates a StackClientApp instance with the exact same configuration as stack.ts
 * to ensure consistency and prevent StackAssertionError.
 */
export function StackAuthProvider({ children }: StackAuthProviderProps) {
  // Create client app with the exact same configuration as stack.ts
  // This ensures consistency and prevents StackAssertionError
  // useMemo ensures the app is only created once per component lifecycle
  const stackClientApp = useMemo(() => {
    const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
    const publishableClientKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

    if (!projectId) {
      throw new Error("NEXT_PUBLIC_STACK_PROJECT_ID is required. Please set it in .env.local");
    }

    if (!publishableClientKey) {
      throw new Error(
        "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY is required. Please set it in .env.local"
      );
    }

    // Use the exact same configuration as stack.ts client-side initialization
    // This ensures both instances are identical and prevents StackAssertionError
    return new StackClientApp({
      projectId,
      publishableClientKey,
      tokenStore: "nextjs-cookie",
    });
  }, []);

  return <StackProvider app={stackClientApp}>{children}</StackProvider>;
}
