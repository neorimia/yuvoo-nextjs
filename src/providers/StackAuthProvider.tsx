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

import { StackProvider, type StackClientApp } from "@stackframe/stack";
import { stackClientApp } from "@/lib/auth/stack";
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
  // Type assertion needed: StackProvider accepts StackClientApp but TypeScript
  // type system requires explicit casting due to generic type constraints
  // The client app is properly typed, but StackProvider's generic constraints
  // require this assertion to satisfy the type checker
  return (
    <StackProvider app={stackClientApp as StackClientApp<true, string>}>{children}</StackProvider>
  );
}
