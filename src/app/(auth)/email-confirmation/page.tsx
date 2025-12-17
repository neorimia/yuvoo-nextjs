import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import EmailConfirmationMain from "@/components/Auth/EmailConfirmationMain";

export const metadata: Metadata = {
  title: "Verificare Email | Yuvoo",
  description:
    "Verifică adresa ta de email pentru a activa contul Yuvoo. Click pe link-ul primit pe email.",
  keywords: [
    "verificare email yuvoo",
    "confirmare email yuvoo",
    "email verification yuvoo",
    "activare cont yuvoo",
  ],
  openGraph: {
    title: "Verificare Email | Yuvoo",
    description:
      "Verifică adresa ta de email pentru a activa contul Yuvoo. Click pe link-ul primit pe email.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/email-confirmation`,
    siteName: "Yuvoo",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Verificare Email | Yuvoo",
    description: "Verifică adresa ta de email pentru a activa contul Yuvoo.",
  },
  alternates: {
    canonical: "/auth/email-confirmation",
  },
};

/**
 * Email Confirmation Page
 *
 * Authentication page for email verification.
 * Route: /auth/email-confirmation?code=<verification-code>
 *        /auth/email-confirmation?token=<verification-token> (backwards compatibility)
 */
export default async function EmailConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; token?: string }>;
}) {
  const params = await searchParams;
  // Stack Auth uses 'code' in email links, but we also support 'token' for backwards compatibility
  const token = params.code || params.token || null;

  // Note: EmailConfirmationMain contains EmailConfirmationForm which may call redirect()
  // We cannot wrap it in Suspense because redirect() throws NEXT_REDIRECT error
  // which needs to propagate to Next.js router without being caught by Suspense
  return (
    <>
      <BreadcrumbOne title="Verificare Email" subTitle="Verificare Email" />
      <EmailConfirmationMain token={token} />
    </>
  );
}
