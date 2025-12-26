import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import TrustCard, { TrustCardProps } from "@/components/shared/TrustCard";

/**
 * Doctors Landing Ethics Section
 *
 * CRITICAL section displaying ethics, GDPR, and professional control information.
 * Part of the doctors landing page (/pentru-doctori).
 * This section is critical for doctor conversion per brief.
 */
export default function DoctorsLandingEthics() {
  const ethicsPoints: TrustCardProps[] = [
    {
      id: 1,
      icon: "fa-solid fa-shield-check",
      title: "Platformă GDPR-compliant",
      description: "Respectăm standarde stricte de protecție a datelor conform GDPR",
    },
    {
      id: 2,
      icon: "fa-solid fa-lock",
      title: "Nu stocăm date medicale sensibile",
      description: "Datele copiilor sunt extrem de sensibile - nu le stocăm",
    },
    {
      id: 3,
      icon: "fa-solid fa-ban",
      title: "Nu oferim diagnostic online",
      description: "Yuvoo nu înlocuiește actul medical - este doar ghidare",
    },
    {
      id: 4,
      icon: "fa-solid fa-file-medical",
      title: "Nu facem recomandări medicale individuale",
      description: "Conținutul este informativ, educațional, nu medical",
    },
    {
      id: 5,
      icon: "fa-solid fa-user-check",
      title: "Ai control total asupra profilului",
      description: "Poți edita sau retrage profilul oricând, fără explicații",
    },
    {
      id: 6,
      icon: "fa-solid fa-edit",
      title: "Poți edita sau retrage profilul oricând",
      description: "Control complet asupra prezenței tale în platformă",
    },
  ];

  return (
    <section className="bd-doctors-landing-ethics pt-120 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            {/* Section Title */}
            <SectionTitle
              title="Etică, confidențialitate și control profesional"
              className="mb-50"
              animationDelay=".3s"
            />

            {/* Ethics Points Grid */}
            <div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
              <div className="row bd-trust-cards-row mb-50">
                {ethicsPoints.map((point) => (
                  <TrustCard
                    key={point.id}
                    {...point}
                    columnClasses="col-lg-4 col-md-6 col-sm-10"
                    animationDelay={`${0.4 + (point.id - 1) * 0.1}s`}
                  />
                ))}
              </div>
            </div>

            {/* Closing Statement */}
            <div
              className="wow fadeInUp text-center"
              data-wow-duration="1s"
              data-wow-delay=".7s"
              style={{
                padding: "30px",
                backgroundColor: "#EBFFFE",
                borderRadius: "16px",
                border: "2px solid var(--bd-theme-1)",
              }}
            >
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#1B1B1B",
                  marginBottom: 0,
                  lineHeight: "1.5",
                }}
              >
                👉 Reputația ta profesională este tratată cu maximă responsabilitate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
