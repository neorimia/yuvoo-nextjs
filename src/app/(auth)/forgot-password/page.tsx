import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ForgotPasswordMain from "@/components/Auth/ForgotPasswordMain";
import { redirect } from "next/navigation";
import { getRoleBasedRedirect } from "@/lib/auth/redirects";
import { getSession } from "@/lib/auth/session";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Recuperare Parolă | Yuvoo",
  description:
    "Recuperează parola contului tău Yuvoo. Introdu adresa de email și vei primi un link de resetare.",
  keywords: [
    "recuperare parola yuvoo",
    "resetare parola yuvoo",
    "forgot password yuvoo",
    "parola uitata",
  ],
  openGraph: {
    title: "Recuperare Parolă | Yuvoo",
    description:
      "Recuperează parola contului tău Yuvoo. Introdu adresa de email și vei primi un link de resetare.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${routes.forgotPassword}`,
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Recuperare Parolă | Yuvoo",
    description: "Recuperează parola contului tău Yuvoo.",
  },
  alternates: {
    canonical: routes.forgotPassword,
  },
};

/**
 * Forgot Password Page
 *
 * Authentication page for password recovery.
 * Route: /auth/forgot-password
 */
export default async function ForgotPasswordPage() {
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
  return (
    <>
      <BreadcrumbOne title="Recuperare Parolă" subTitle="Recuperare Parolă" />
      <ForgotPasswordMain />
    </>
  );
}
