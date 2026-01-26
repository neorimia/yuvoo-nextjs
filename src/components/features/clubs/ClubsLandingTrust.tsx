import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import TrustCard, { TrustCardProps } from "@/components/shared/TrustCard";
import { routes } from "@/lib/routes";

/**
 * Clubs Landing Trust Indicators Section
 *
 * Displays trust indicators and security information.
 * Part of the clubs landing page (/pentru-cluburi).
 */
export default function ClubsLandingTrust() {
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
      title: "Cluburi verificate manual",
      description: "Toate cluburile sunt verificate de echipa noastră pentru siguranță și calitate",
      link: routes.clubs.list,
    },
    {
      id: 3,
      icon: "fa-solid fa-heart",
      title: "Focus pe dezvoltarea sănătoasă",
      description: "Prioritizăm siguranța și bunăstarea copiilor în toate deciziile noastre",
    },
  ];

  return (
    <section className="bd-clubs-landing-trust pt-70 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            {/* Section Title */}
            <SectionTitle title="Siguranță & încredere" className="mb-40" animationDelay=".3s" />

            {/* Trust Indicators */}
            <div className="row bd-trust-cards-row">
              {trustIndicators.map((indicator) => (
                <TrustCard
                  key={indicator.id}
                  {...indicator}
                  columnClasses="col-md-4 col-sm-10"
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
