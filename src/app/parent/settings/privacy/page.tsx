import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { requireAuth } from "@/modules/auth/auth.service";
import { getUserConsents } from "@/modules/consent/consent.service";
import { routes } from "@/lib/routes";
import { CONSENT_TYPES, CONSENT_TEXTS, REQUIRED_CONSENTS } from "@/lib/consent/constants";
import { PrivacySettingsClient } from "./PrivacySettingsClient";

export const metadata: Metadata = {
  title: "Setări de Confidențialitate - Yuvoo",
  description:
    "Gestionează consimțământul pentru prelucrarea datelor, exportă datele tale sau șterge contul.",
};

/**
 * Privacy Settings Page
 *
 * GDPR compliance page allowing users to:
 * - View and manage consent settings (Art. 7)
 * - Export their data (Art. 15, 20)
 * - Delete their account (Art. 17)
 *
 * Route: /parent/settings/privacy
 */
export default async function PrivacySettingsPage() {
  // Explicitly access cookies to ensure route is dynamic
  await cookies();
  const user = await requireAuth();

  // Fetch current consent statuses
  const consents = await getUserConsents(user.id);

  // Build consent status map
  const allConsentTypes = Object.values(CONSENT_TYPES);
  const consentStatuses = allConsentTypes.map((type) => {
    const consent = consents.find((c) => c.consentType === type);
    const isRequired = REQUIRED_CONSENTS.includes(type);
    const texts = CONSENT_TEXTS[type];

    // Map database status to client status (database has "granted" | "withdrawn", client also needs "not_set")
    const status: "granted" | "withdrawn" | "not_set" = consent?.status ?? "not_set";

    return {
      type,
      label: texts.label,
      description: texts.description,
      legalBasis: texts.legalBasis,
      isRequired,
      status,
      grantedAt: consent?.grantedAt?.toISOString(),
      withdrawnAt: consent?.withdrawnAt?.toISOString(),
    };
  });

  return (
    <section className="bd-privacy-settings-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-30">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href={routes.parent.dashboard}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href={routes.parent.settings}>Setări</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Confidențialitate
                </li>
              </ol>
            </nav>

            {/* Page Header */}
            <div className="bd-privacy-header mb-40">
              <h1 className="bd-section-title mb-15">Setări de Confidențialitate</h1>
              <p className="text-muted">
                Gestionează consimțământul pentru prelucrarea datelor tale și ale copiilor tăi.
                Conform GDPR, ai dreptul să retragi oricând consimțământul acordat.
              </p>
            </div>

            <div className="row">
              <div className="col-lg-8">
                {/* Pass to client component for interactivity */}
                <PrivacySettingsClient initialConsents={consentStatuses} userEmail={user.email} />
              </div>

              {/* Sidebar with links */}
              <div className="col-lg-4">
                <div className="bd-privacy-sidebar">
                  {/* Legal Links */}
                  <div className="card mb-4">
                    <div className="card-header">
                      <h6 className="mb-0">
                        <i className="bi bi-file-text me-2" />
                        Documente legale
                      </h6>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2">
                          <Link
                            href={routes.privacy}
                            target="_blank"
                            className="text-decoration-none"
                          >
                            <i className="bi bi-arrow-right me-2" />
                            Politica de confidențialitate
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link href={routes.gdpr} target="_blank" className="text-decoration-none">
                            <i className="bi bi-arrow-right me-2" />
                            GDPR pentru părinți
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            href={routes.terms}
                            target="_blank"
                            className="text-decoration-none"
                          >
                            <i className="bi bi-arrow-right me-2" />
                            Termeni și condiții
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={routes.cookies}
                            target="_blank"
                            className="text-decoration-none"
                          >
                            <i className="bi bi-arrow-right me-2" />
                            Politica de cookie-uri
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">
                        <i className="bi bi-envelope me-2" />
                        Întrebări GDPR
                      </h6>
                    </div>
                    <div className="card-body">
                      <p className="small text-muted mb-2">
                        Pentru orice întrebări legate de protecția datelor:
                      </p>
                      <a
                        href="mailto:gdpr@yuvoo.ro"
                        className="btn btn-outline-primary btn-sm w-100"
                      >
                        <i className="bi bi-envelope me-2" />
                        gdpr@yuvoo.ro
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
