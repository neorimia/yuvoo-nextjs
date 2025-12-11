import React from "react";
import type { Metadata } from "next";
import HomeNewsletter from "@/components/Newsletter/HomeNewsletter";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import LoginMain from "@/components/Auth/LoginMain";

export const metadata: Metadata = {
  title: "Autentificare - Yuvoo",
  description: "Autentifică-te în contul tău Yuvoo pentru a accesa funcționalitățile complete.",
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
      <BreadcrumbOne title="Autentificare" subTitle="Autentificare" />
      <LoginMain />
      <HomeNewsletter />
    </>
  );
}
