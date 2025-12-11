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

/**
 * Login Page
 *
 * Authentication page for user login.
 * Route: /auth/login
 */
export default function LoginPage() {
  return (
    <>
      <LoginMain />
    </>
  );
}
