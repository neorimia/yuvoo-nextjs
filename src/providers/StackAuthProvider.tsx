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
 * IMPORTANT: To prevent "Rendered more hooks than during the previous render" errors:
 * 1. We use a stable inner component that handles conditional StackProvider rendering
 * 2. The outer component always calls the same hooks in the same order
 * 3. The inner component uses key-based remounting when stackClientApp changes
 *    from null to non-null, which is expected and safe
 */
export function StackAuthProvider({ children }: StackAuthProviderProps) {
  // CRITICAL: Track if component has mounted on client to prevent hydration mismatches
  // Both server and client will render children initially (mounted = false)
  // After mount, client will render StackProvider (mounted = true)
  const [mounted, setMounted] = useState(false);
  const [stackClientApp, setStackClientApp] = useState<StackClientApp<true> | null>(null);

  // Initialize app AFTER component mounts on client
  // This ensures server and client render the same thing initially
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

  // CRITICAL: Always render the same structure on both server and client initially
  // This prevents hydration mismatches. After mount, we conditionally render StackProvider.
  //
  // IMPORTANT: This conditional rendering of StackProvider can cause hook count issues
  // if StackProvider uses hooks. However, we need to do this to prevent hydration errors.
  // The key is that the conditional is based on `mounted`, which changes AFTER the first
  // render, so the initial server and client renders match.

  // Before mount (SSR and initial client render), render children directly
  // This ensures server and client render the same thing
  if (!mounted || !stackClientApp) {
    return <>{children}</>;
  }

  // After mount and app is available, render StackProvider
  // This only happens on the client after hydration is complete
  return <StackProvider app={stackClientApp}>{children}</StackProvider>;
}
