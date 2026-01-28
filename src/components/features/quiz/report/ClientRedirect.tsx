/**
 * Client Redirect Component
 *
 * Handles redirects on the client side to prevent hooks errors in Next.js Router.
 * This component uses useRouter to redirect, avoiding server-side redirect() calls
 * that can cause component tree inconsistencies.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ClientRedirectProps {
  to: string;
}

export default function ClientRedirect({ to }: ClientRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  // Return null to prevent rendering anything
  return null;
}
