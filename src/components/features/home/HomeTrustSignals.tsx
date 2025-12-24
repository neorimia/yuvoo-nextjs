import React from "react";
import { routes } from "@/lib/routes";
import TrustCard, { TrustCardProps } from "@/components/shared/TrustCard";

/**
 * HomeTrustSignals Component
 *
 * Displays trust signals and security badges on the home page.
 * Builds credibility through verification badges, GDPR compliance, and security indicators.
 */

const trustSignals: TrustCardProps[] = [
  {
    id: 1,
    icon: "fa-solid fa-certificate",
    title: "Cluburi verificate",
    description: "Toate cluburile sunt verificate de echipa noastră pentru siguranță și calitate",
    link: routes.clubs.list,
  },
  {
    id: 2,
    icon: "fa-solid fa-shield-check",
    title: "GDPR compliant",
    description:
      "Protejăm datele copiilor tăi conform GDPR. Datele sunt criptate și stocate în siguranță",
    link: routes.gdpr,
  },
  {
    id: 3,
    icon: "fa-solid fa-user-doctor",
    title: "Specialiști verificați",
    description: "Toți doctorii sunt verificați și au credențiale medicale valide",
    link: routes.doctors.list,
  },
  {
    id: 4,
    icon: "fa-solid fa-lock",
    title: "Platformă securizată",
    description: "Tehnologie avansată pentru protecția datelor și siguranța utilizatorilor",
  },
  {
    id: 5,
    icon: "fa-solid fa-heart",
    title: "100% gratuit pentru părinți",
    description: "Platforma Yuvoo este complet gratuită. Fără costuri ascunse sau abonamente",
  },
  {
    id: 6,
    icon: "fa-solid fa-robot",
    title: "Recomandări bazate pe AI",
    description:
      "Sistem AI avansat care analizează profilul copilului pentru recomandări personalizate",
  },
];

const HomeTrustSignals = () => {
  return (
    <section className="bd-trust-area">
      <div className="container">
        <div className="row bd-trust-row">
          <div className="col-lg-8">
            <div
              className="bd-trust-title-wrapper wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h2 className="bd-trust-section-title">De ce să ne alegi pe noi?</h2>
              <p className="bd-trust-section-text">
                Yuvoo este platforma de încredere pentru părinții care caută cele mai bune opțiuni
                sportive pentru copiii lor
              </p>
            </div>
          </div>
        </div>
        <div
          className="row bd-trust-cards-row wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".4s"
        >
          {trustSignals.map((signal) => (
            <TrustCard
              key={signal.id}
              {...signal}
              columnClasses="col-lg-6 col-md-6 col-sm-10"
              animationDelay={`${0.4 + (signal.id - 1) * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTrustSignals;
