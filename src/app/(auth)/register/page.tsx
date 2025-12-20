import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getRoleBasedRedirect } from "@/lib/auth/redirects";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import RegisterMain from "@/components/Auth/RegisterMain";

export const metadata: Metadata = {
  title: "Înregistrare | Yuvoo",
  description:
    "Creează un cont nou pe Yuvoo pentru a descoperi sporturile potrivite copilului tău. Începe gratuit și primește recomandări personalizate.",
  keywords: [
    "înregistrare yuvoo",
    "cont nou yuvoo",
    "sign up yuvoo",
    "sport copii",
    "cluburi sportive copii",
    "recomandări sport AI",
  ],
  openGraph: {
    title: "Înregistrare | Yuvoo",
    description:
      "Creează un cont nou pe Yuvoo pentru a descoperi sporturile potrivite copilului tău.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/register`,
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Înregistrare | Yuvoo",
    description:
      "Creează un cont nou pe Yuvoo pentru a descoperi sporturile potrivite copilului tău.",
  },
  alternates: {
    canonical: "/auth/register",
  },
};

/**
 * Register Page
 *
 * Authentication page for user registration.
 * Route: /auth/register
 */
export default async function RegisterPage() {
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
      <BreadcrumbOne title="Înregistrare" subTitle="Înregistrare" />
      <RegisterMain />
    </>
  );
}
