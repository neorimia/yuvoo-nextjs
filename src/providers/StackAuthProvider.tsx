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
 * IMPORTANT: To prevent hydration mismatches, we:
 * 1. Always render the same structure on server and initial client render
 * 2. Only initialize Stack Auth after the component mounts on the client
 * 3. Use a mounted flag to ensure consistent rendering
 */
export function StackAuthProvider({ children }: StackAuthProviderProps) {
  // Track if component has mounted (client-side only)
  // This ensures server and initial client render match
  const [mounted, setMounted] = useState(false);
  const [stackClientApp, setStackClientApp] = useState<StackClientApp<true> | null>(null);

  // Initialize Stack Auth ONLY after component mounts on client
  // This ensures server and initial client render are identical
  useEffect(() => {
    setMounted(true);
    try {
      const app = getStackClientApp();
      setStackClientApp(app);
    } catch (_error) {
      // Failed to initialize - components will handle null user
      // Error is logged by getStackClientApp() if needed
      setStackClientApp(null);
    }
  }, []);

  // During SSR and initial client render (before mount),
  // render children without StackProvider to ensure hydration match
  if (!mounted || !stackClientApp) {
    return <>{children}</>;
  }

  // After mount and initialization, wrap children with StackProvider
  return <StackProvider app={stackClientApp}>{children}</StackProvider>;
}
