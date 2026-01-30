"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import TrustCard, { TrustCardProps } from "@/components/shared/TrustCard";
import { openClubsPremiumMailto } from "@/lib/clubs-landing-modal";
import { PostHogEvents, trackEvent } from "@/lib/analytics/tracking";

/**
 * Clubs Landing Why Now Section
 *
 * Explains why "now" is the right time to join as a Founding Club.
 * Creates urgency and scarcity while highlighting unique benefits.
 * Part of the clubs landing page (/pentru-cluburi).
 * Positioned between Benefits and Pricing sections.
 */
interface ClubsLandingWhyNowProps {
  remainingSpots: number;
}

export default function ClubsLandingWhyNow({ remainingSpots }: ClubsLandingWhyNowProps) {
  const whyNowPoints: TrustCardProps[] = [
    {
      id: 1,
      icon: "fa-solid fa-gift",
      title: "6 luni gratuite (valoare 594 lei)",
      description: "Primele 15 cluburi primesc acces complet gratuit pentru 6 luni",
    },
    {
      id: 2,
      icon: "fa-solid fa-star",
      title: "Prioritate în rezultate",
      description: "La lansarea oficială, vei apărea primul în rezultatele de căutare",
    },
    {
      id: 3,
      icon: "fa-solid fa-certificate",
      title: 'Badge exclusiv "Verified Founding Club"',
      description: "Badge unic care nu va mai fi disponibil după ce se umplu cele 15 locuri",
    },
    {
      id: 4,
      icon: "fa-solid fa-comments",
      title: "Influență asupra platformei",
      description: "Feedback direct către echipa Yuvoo pentru îmbunătățiri și funcții noi",
    },
    {
      id: 5,
      icon: "fa-solid fa-clock",
      title: "Oferta limitată",
      description: "După ce se umplu cele 15 locuri, programul Founding Club se închide permanent",
    },
    {
      id: 6,
      icon: "fa-solid fa-rocket",
      title: "Start rapid",
      description: "Profilul tău va fi gata în call-ul de 15 minute dacă decizi să continui",
    },
  ];

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Track event
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "why-now",
      cta_text: "Rezervă locul tău acum",
    });

    // Open modal
    openClubsPremiumMailto("why-now", "Rezervă locul tău acum");
  };

  return (
    <section
      className="bd-clubs-landing-why-now pt-120 pb-70"
      style={{ backgroundColor: "#FFF6EB" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            {/* Section Title */}
            <SectionTitle
              title="De ce acum?"
              subtitle={
                <>
                  Momentul potrivit să te alături programului Founding Club.{" "}
                  {remainingSpots > 0 && (
                    <>
                      <strong style={{ color: "var(--bd-theme-1)" }}>
                        Doar {remainingSpots} locuri rămase
                      </strong>
                      . După ce se umplu, programul se închide permanent.
                    </>
                  )}
                  {remainingSpots === 0 && (
                    <>
                      Programul Founding Club este complet. Upgrade la Premium pentru acces
                      nelimitat.
                    </>
                  )}
                </>
              }
              className="mb-50"
              animationDelay=".3s"
            />

            {/* Why Now Points */}
            <div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
              <div className="row bd-trust-cards-row mb-50">
                {whyNowPoints.map((point) => (
                  <TrustCard
                    key={point.id}
                    {...point}
                    columnClasses="col-lg-4 col-md-6 col-sm-10"
                    animationDelay={`${0.4 + (point.id - 1) * 0.1}s`}
                  />
                ))}
              </div>
            </div>

            {/* Urgency Callout */}
            {remainingSpots > 0 && (
              <div
                className="wow fadeInUp text-center"
                data-wow-duration="1s"
                data-wow-delay=".7s"
                style={{
                  padding: "30px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: "2px solid var(--bd-theme-1)",
                }}
              >
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "#1B1B1B",
                    marginBottom: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  ⚠️ După ce se umplu cele 15 locuri, programul Founding Club se închide permanent
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#6B6B6B",
                    marginBottom: "20px",
                    lineHeight: "1.6",
                  }}
                >
                  Nu vei mai putea beneficia de 6 luni gratuite sau badge-ul exclusiv &quot;Verified
                  Founding Club&quot;. Upgrade la Premium va rămâne disponibil, dar fără beneficiile
                  unice ale programului Founding.
                </p>
                {/* Primary CTA Button */}
                <div
                  className="bd-hero-btn mt-4 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".8s"
                >
                  <button type="button" className="bd-btn mx-auto" onClick={handleCTAClick}>
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">
                        Rezervă locul tău acum ({remainingSpots} locuri rămase)
                      </span>
                      <span className="bd-btn-hover">
                        Rezervă locul tău acum ({remainingSpots} locuri rămase)
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
