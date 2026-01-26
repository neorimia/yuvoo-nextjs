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
interface ClubsLandingTrustProps {
  verifiedCount?: number;
}

export default function ClubsLandingTrust({ verifiedCount }: ClubsLandingTrustProps) {
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
      title: verifiedCount
        ? `${verifiedCount}+ cluburi verificate manual`
        : "Cluburi verificate manual",
      description: "Toate cluburile sunt verificate de echipa noastră pentru siguranță și calitate",
      link: routes.clubs.list,
    },
    {
      id: 3,
      icon: "fa-solid fa-heart",
      title: "Focus pe dezvoltarea sănătoasă",
      description: "Prioritizăm siguranța și bunăstarea copiilor în toate deciziile noastre",
    },
    {
      id: 4,
      icon: "fa-solid fa-users",
      title: "Părinți încredințați",
      description: "Mii de părinți folosesc Yuvoo pentru a găsi sportul potrivit copiilor lor",
    },
    {
      id: 5,
      icon: "fa-solid fa-chart-line",
      title: "Rezultate măsurabile",
      description:
        "Cluburile noastre raportează conversie medie de 60-80% vs. 10-20% din ads tradiționale",
    },
    {
      id: 6,
      icon: "fa-solid fa-handshake",
      title: "Transparență totală",
      description: "Fără costuri ascunse, fără contracte pe termen lung, fără compromisuri",
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
                  columnClasses="col-lg-4 col-md-6 col-sm-10"
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
