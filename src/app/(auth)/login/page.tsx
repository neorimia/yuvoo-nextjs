import React from "react";
import type { Metadata } from "next";
import LoginMain from "@/components/Auth/LoginMain";

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
  const params = await searchParams;
  // Support both 'redirect' and 'returnUrl' query parameters
  const redirectUrl = params.redirect || params.returnUrl || undefined;

  return (
    <>
      <LoginMain redirectUrl={redirectUrl} />
    </>
  );
}
