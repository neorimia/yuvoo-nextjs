import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ForgotPasswordMain from "@/components/Auth/ForgotPasswordMain";

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
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/forgot-password`,
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
    canonical: "/auth/forgot-password",
  },
};

/**
 * Forgot Password Page
 *
 * Authentication page for password recovery.
 * Route: /auth/forgot-password
 */
export default function ForgotPasswordPage() {
  return (
    <>
      <BreadcrumbOne title="Recuperare Parolă" subTitle="Recuperare Parolă" />
      <ForgotPasswordMain />
    </>
  );
}
