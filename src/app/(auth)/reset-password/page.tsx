import React, { Suspense } from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ResetPasswordMain from "@/components/Auth/ResetPasswordMain";

export const metadata: Metadata = {
  title: "Resetare Parolă | Yuvoo",
  description:
    "Resetează parola contului tău Yuvoo. Introdu parola nouă folosind link-ul primit pe email.",
  keywords: [
    "resetare parola yuvoo",
    "schimbare parola yuvoo",
    "reset password yuvoo",
    "parola noua",
  ],
  openGraph: {
    title: "Resetare Parolă | Yuvoo",
    description:
      "Resetează parola contului tău Yuvoo. Introdu parola nouă folosind link-ul primit pe email.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/reset-password`,
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Resetare Parolă | Yuvoo",
    description: "Resetează parola contului tău Yuvoo.",
  },
  alternates: {
    canonical: "/auth/reset-password",
  },
};

/**
 * Reset Password Page
 *
 * Authentication page for password reset.
 * Route: /auth/reset-password?token=<reset-token>
 */
export default function ResetPasswordPage() {
  return (
    <>
      <BreadcrumbOne title="Resetare Parolă" subTitle="Resetare Parolă" />
      <Suspense fallback={<div className="text-center py-5">Se încarcă...</div>}>
        <ResetPasswordMain />
      </Suspense>
    </>
  );
}
