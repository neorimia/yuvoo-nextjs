import React from "react";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import ContactInfoArea from "@/components/Info/ContactInfoArea";
import ContactFormMain from "@/components/Contact/ContactFormMain";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Contact - Contactează echipa Yuvoo",
  description:
    "Ai întrebări despre Yuvoo? Contactează-ne prin email, telefon sau formular. Suntem aici să te ajutăm să găsești activitățile sportive perfecte pentru copilul tău.",
  keywords: [
    "contact Yuvoo",
    "suport Yuvoo",
    "contactare Yuvoo",
    "email Yuvoo",
    "telefon Yuvoo",
    "ajutor sporturi copii",
    "contact platformă sport copii",
  ],
  openGraph: {
    title: "Contact - Contactează echipa Yuvoo",
    description:
      "Ai întrebări despre Yuvoo? Contactează-ne prin email, telefon sau formular. Suntem aici să te ajutăm să găsești activitățile sportive perfecte pentru copilul tău.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/contact`,
    siteName: "Yuvoo",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Contactează echipa Yuvoo",
    description: "Ai întrebări despre Yuvoo? Contactează-ne prin email, telefon sau formular.",
  },
  alternates: {
    canonical: "/contact",
  },
};

/**
 * Contact Page
 *
 * Public contact page for Yuvoo.
 * SEO-friendly route: /contact
 */
export default function ContactPage() {
  return (
    <>
      <BreadcrumbOne
        title="Contact"
        subTitle="Contact"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Contact", url: routes.contact },
        ]}
      />
      <ContactInfoArea />
      <ContactFormMain />
    </>
  );
}
