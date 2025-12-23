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

import { StackProvider } from "@stackframe/stack";
import { getStackClientApp } from "@/lib/auth/stack";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { StackClientApp } from "@stackframe/stack";

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
 * CRITICAL: This component ensures the StackClientApp instance is ONLY
 * created on the client side after hydration. This prevents both:
 * 1. StackAssertionError (configuration mismatch)
 * 2. Hydration errors (server/client render mismatch)
 *
 * The component uses a two-phase approach:
 * 1. Initial render (SSR + client): renders children without StackProvider
 * 2. After hydration (client only): wraps children with StackProvider
 */
export function StackAuthProvider({ children }: StackAuthProviderProps) {
  const [stackClientApp, setStackClientApp] = useState<StackClientApp<true> | null>(null);

  // Initialize Stack Auth ONLY on the client side, AFTER hydration
  // This ensures server and client render the same thing initially
  useEffect(() => {
    // This only runs on the client after hydration
    const app = getStackClientApp();
    setStackClientApp(app);
  }, []);

  // Until Stack Auth is initialized (SSR + initial client render),
  // render children without StackProvider to prevent hydration mismatch
  if (!stackClientApp) {
    return <>{children}</>;
  }

  // After Stack Auth is initialized (client only, post-hydration),
  // wrap children with StackProvider
  return <StackProvider app={stackClientApp}>{children}</StackProvider>;
}
