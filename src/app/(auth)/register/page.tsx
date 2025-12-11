import React from "react";
import type { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import RegisterMain from "@/components/Auth/RegisterMain";

export const metadata: Metadata = {
  title: "Înregistrare - Yuvoo",
  description:
    "Creează un cont nou pe Yuvoo pentru a descoperi sporturile potrivite copilului tău.",
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
      <HomeNewsletter />
    </>
  );
}
