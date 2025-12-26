import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import TrustCard, { TrustCardProps } from "@/components/shared/TrustCard";
import { routes } from "@/lib/routes";

/**
 * Doctors Landing Trust Indicators Section
 *
 * Displays trust indicators and security information.
 * Part of the doctors landing page (/pentru-doctori).
 */
export default function DoctorsLandingTrust() {
  const trustIndicators: TrustCardProps[] = [
    {
      id: 1,
      icon: "fa-solid fa-shield-check",
      title: "Platformă GDPR-compliant",
      description: "Protejăm datele conform GDPR. Datele sunt criptate și stocate în siguranță",
      link: routes.gdpr,
    },
    {
      id: 2,
      icon: "fa-solid fa-certificate",
      title: "Experți verificați manual",
      description: "Toți experții sunt verificați de echipa noastră pentru siguranță și calitate",
      link: routes.doctors.list,
    },
    {
      id: 3,
      icon: "fa-solid fa-heart",
      title: "Focus pe dezvoltarea sănătoasă a copiilor",
      description: "Prioritizăm siguranța și bunăstarea copiilor în toate deciziile noastre",
    },
  ];

  return (
    <section className="bd-doctors-landing-trust pt-70 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            {/* Section Title */}
            <SectionTitle title="Siguranță & încredere" className="mb-40" animationDelay=".3s" />

            {/* Trust Indicators */}
            <div className="row bd-trust-cards-row">
              {trustIndicators.map((indicator) => (
                <TrustCard
                  key={indicator.id}
                  {...indicator}
                  columnClasses="col-lg-4 col-md-4 col-sm-10"
                  animationDelay={`${0.4 + (indicator.id - 1) * 0.1}s`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
