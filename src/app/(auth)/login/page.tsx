import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getRoleBasedRedirect } from "@/lib/auth/redirects";
import LoginMain from "@/components/Auth/LoginMain";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";

export const metadata: Metadata = {
  title: "Autentificare | Yuvoo",
  description:
    "Autentifică-te în contul tău Yuvoo pentru a accesa funcționalitățile complete. Descoperă sporturile potrivite copilului tău.",
  keywords: [
    "autentificare yuvoo",
    "login yuvoo",
    "cont yuvoo",
    "sport copii",
    "cluburi sportive copii",
  ],
  openGraph: {
    title: "Autentificare | Yuvoo",
    description: "Autentifică-te în contul tău Yuvoo pentru a accesa funcționalitățile complete.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/login`,
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Autentificare | Yuvoo",
    description: "Autentifică-te în contul tău Yuvoo pentru a accesa funcționalitățile complete.",
  },
  alternates: {
    canonical: "/auth/login",
  },
};

interface LoginPageProps {
  searchParams: Promise<{
    redirect?: string;
    returnUrl?: string;
  }>;
}

/**
 * Login Page
 *
 * Authentication page for user login.
 * Supports redirect parameter for post-login navigation.
 * Route: /auth/login
 */
export default async function LoginPage({ searchParams }: LoginPageProps) {
  // Check if user is already authenticated
  // If yes, redirect to their dashboard or onboarding
  const session = await getSession();
  if (session?.dbUser) {
    const redirectUrl = getRoleBasedRedirect(
      session.dbUser.role,
      session.dbUser.onboardingCompleted
    );
    redirect(redirectUrl);
  }

  const params = await searchParams;
  // Support both 'redirect' and 'returnUrl' query parameters
  // Next.js automatically decodes query parameters, but we need to ensure it's a valid path
  let redirectUrl = params.redirect || params.returnUrl || undefined;

  // Validate and decode if needed (Next.js should already decode, but be safe)
  if (redirectUrl) {
    try {
      // Decode if it's still encoded (shouldn't happen, but safety check)
      if (redirectUrl.startsWith("%2F") || redirectUrl.includes("%")) {
        redirectUrl = decodeURIComponent(redirectUrl);
      }
      // Validate it's a relative path (security: prevent open redirect)
      if (!redirectUrl.startsWith("/")) {
        redirectUrl = undefined;
      }
    } catch (_error) {
      // If decoding fails, ignore the redirectUrl
      redirectUrl = undefined;
    }
  }

  return (
    <>
      <BreadcrumbOne title="Autentificare" subTitle="Autentificare" />
      <LoginMain redirectUrl={redirectUrl} />
    </>
  );
}
