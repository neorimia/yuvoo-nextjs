"use client";

import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/auth/stack";
import React from "react";

interface StackAuthProviderProps {
  children: React.ReactNode;
}

/**
 * Stack Auth Provider Wrapper
 *
 * Provides Stack Auth context to all client components.
 * This is a client component wrapper for StackProvider.
 */
export default function StackAuthProvider({ children }: StackAuthProviderProps) {
  return (
    <StackProvider app={stackServerApp}>
      <StackTheme>{children}</StackTheme>
    </StackProvider>
  );
}
