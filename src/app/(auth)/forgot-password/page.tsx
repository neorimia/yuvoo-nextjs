import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ForgotPasswordMain from "@/components/Auth/ForgotPasswordMain";

export const metadata: Metadata = {
  title: "Recuperare Parolă - Yuvoo",
  description: "Recuperează parola contului tău Yuvoo.",
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
