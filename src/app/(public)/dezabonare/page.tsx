import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import SectionTitle from "@/components/shared/SectionTitle";
import { routes } from "@/lib/routes";
import UnsubscribeForm from "@/components/Contact/UnsubscribeForm";
import UnsubscribeTokenHandler from "@/components/Contact/UnsubscribeTokenHandler";

export const metadata: Metadata = {
  title: "Dezabonare - Yuvoo",
  description:
    "Dezabonează-te de la emailurile Yuvoo. Respectăm dreptul tău la confidențialitate și poți să te dezabonezi oricând.",
  keywords: [
    "dezabonare Yuvoo",
    "oprire email Yuvoo",
    "preferințe email",
    "confidențialitate Yuvoo",
    "GDPR Yuvoo",
  ],
  openGraph: {
    title: "Dezabonare - Yuvoo",
    description:
      "Dezabonează-te de la emailurile Yuvoo. Respectăm dreptul tău la confidențialitate.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro"}/dezabonare`,
    siteName: "Yuvoo",
    locale: "ro_RO",
  },
  twitter: {
    card: "summary",
    title: "Dezabonare - Yuvoo",
    description: "Dezabonează-te de la emailurile Yuvoo.",
  },
  alternates: {
    canonical: "/dezabonare",
  },
  robots: {
    index: false, // Don't index unsubscribe page
    follow: false,
  },
};

/**
 * Unsubscribe Page
 *
 * Public page for email unsubscription.
 * SEO-friendly route: /dezabonare
 * Not indexed by search engines (robots: noindex)
 *
 * Supports:
 * - Token-based unsubscription (from email links): /dezabonare?token=...
 * - Form-based unsubscription (manual email entry)
 */
export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const params = await searchParams;
  const hasToken = !!params.token;

  return (
    <div className="bd-page-area">
      <BreadcrumbOne title="Dezabonare" subTitle="Dezabonează-te de la emailurile Yuvoo" />

      <div className="bd-contact-area pt-120 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bd-contact-form-wrapper">
                <SectionTitle
                  subtitle="Respectăm confidențialitatea ta"
                  title="Dezabonare de la emailuri"
                  titleClassName="bd-section__title"
                />

                <div className="bd-contact-form">
                  <p
                    className="mb-4"
                    style={{ color: "#424242", fontSize: "16px", lineHeight: "26px" }}
                  >
                    Ne pare rău să te vedem plecând! Dacă dorești să te dezabonezi de la emailurile
                    noastre, introdu adresa ta de email mai jos.
                  </p>

                  <p
                    className="mb-4"
                    style={{ color: "#424242", fontSize: "16px", lineHeight: "26px" }}
                  >
                    Odată dezabonat, nu vei mai primi:
                  </p>

                  <ul
                    className="mb-4"
                    style={{
                      color: "#424242",
                      fontSize: "16px",
                      lineHeight: "26px",
                      paddingLeft: "20px",
                    }}
                  >
                    <li>Rapoarte de recomandări sportive</li>
                    <li>Notificări despre cluburi noi</li>
                    <li>Actualizări despre serviciile Yuvoo</li>
                    <li>Newsletter-uri și comunicări de marketing</li>
                  </ul>

                  <p
                    className="mb-4"
                    style={{ color: "#6B6B6B", fontSize: "14px", lineHeight: "22px" }}
                  >
                    <strong>Notă:</strong> Vei continua să primești emailuri importante legate de
                    contul tău (confirmări de rezervări, notificări de securitate, etc.).
                  </p>

                  {hasToken ? (
                    <UnsubscribeTokenHandler token={params.token!} />
                  ) : (
                    <UnsubscribeForm initialEmail={params.email} />
                  )}

                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid #E6E6E6" }}>
                    <p className="mb-2" style={{ color: "#6B6B6B", fontSize: "14px" }}>
                      Ai întrebări?{" "}
                      <Link
                        href={routes.contact}
                        style={{ color: "#00BBAE", textDecoration: "underline" }}
                      >
                        Contactează-ne
                      </Link>
                    </p>
                    <p style={{ color: "#6B6B6B", fontSize: "14px" }}>
                      Poți consulta{" "}
                      <Link
                        href={routes.privacy}
                        style={{ color: "#00BBAE", textDecoration: "underline" }}
                      >
                        politica noastră de confidențialitate
                      </Link>{" "}
                      pentru mai multe informații.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
