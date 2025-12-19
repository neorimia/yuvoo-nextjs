import React from "react";
import type { Metadata } from "next";
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
export default function RegisterPage() {
  return (
    <>
      <BreadcrumbOne title="Înregistrare" subTitle="Înregistrare" />
      <RegisterMain />
    </>
  );
}
