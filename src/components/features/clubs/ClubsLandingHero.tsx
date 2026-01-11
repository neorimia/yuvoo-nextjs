"use client";

import React from "react";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";
import { CLUBS_CONTACT_MODAL_ID, openClubsContactModal } from "@/lib/clubs-landing-modal";
import Link from "next/link";
import { routes } from "@/lib/routes";

/**
 * Clubs Landing Hero Section
 *
 * Hero section for the clubs landing page (/pentru-cluburi).
 * Promotes the Founding Club program with clear value proposition and CTA.
 * Follows Yuvoo brand guidelines and matches other hero component patterns.
 */
interface ClubsLandingHeroProps {
  verifiedCount: number;
  remainingSpots: number;
}

export default function ClubsLandingHero({ verifiedCount, remainingSpots }: ClubsLandingHeroProps) {
  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Track event
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "hero",
      cta_text: "Devino Founding Club Gratuit",
    });

    // Open modal
    openClubsContactModal("hero", "Devino Founding Club Gratuit");
  };

  return (
    <section className="bd-hero-area bd-hero-area-3 fix">
      <div className="bd-gradient-bg"></div>
      <div className="container">
        <div className="bd-hero-inner-3">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-10 col-lg-12 mx-auto">
              <div className="bd-hero-content text-center">
                {/* Subtitle */}
                <span
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".3s"
                  style={{
                    fontSize: "23px",
                    fontWeight: 600,
                    color: "var(--bd-theme-1)",
                    marginBottom: "10px",
                    display: "inline-block",
                  }}
                >
                  Pentru Cluburi Sportive
                </span>

                {/* Main Headline */}
                <h1
                  className="bd-hero-title wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".5s"
                >
                  Crești numărul de copii înscriși, fără lead-uri inutile
                </h1>

                {/* Value Proposition */}
                <p
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".6s"
                  style={{
                    fontSize: "18px",
                    lineHeight: "30px",
                    marginBottom: "20px",
                    color: "#424242",
                    maxWidth: "700px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  Yuvoo conectează cluburi sportive pentru copii cu părinți care știu deja că
                  sportul tău este potrivit pentru copilul lor.
                </p>

                {/* Key Benefits */}
                <div
                  className="wow fadeInUp mb-4"
                  data-wow-duration="1s"
                  data-wow-delay=".7s"
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#424242",
                    marginBottom: "30px",
                  }}
                >
                  <span style={{ color: "var(--bd-theme-1)" }}>✓</span> Părinți pre-calificați ·{" "}
                  <span style={{ color: "var(--bd-theme-1)" }}>✓</span> Cluburi sportive ·{" "}
                  <span style={{ color: "var(--bd-theme-1)" }}>✓</span> Zero risc în MVP
                </div>

                {/* Founding Club Info with Dynamic Spots */}
                <div
                  className="wow fadeInUp mb-4"
                  data-wow-duration="1s"
                  data-wow-delay=".75s"
                  style={{
                    marginBottom: "40px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#6B6B6B",
                      marginBottom: "15px",
                      fontWeight: 400,
                    }}
                  >
                    Primele 15 cluburi din România intră gratuit ca Founding Clubs
                  </p>
                  {/* Dynamic Spots Counter - Prominent Display */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 24px",
                      backgroundColor: remainingSpots > 0 ? "#EBFFFE" : "#FFF6EB",
                      borderRadius: "12px",
                      border: `2px solid ${remainingSpots > 0 ? "var(--bd-theme-1)" : "#FFA500"}`,
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#1B1B1B",
                    }}
                  >
                    <span style={{ fontSize: "20px", marginBottom: "0" }}>🏅</span>
                    <span className="mb-0 inline-block">
                      <span className="text-black m-0">Locuri rămase:</span>{" "}
                      <span className="text-yuvoo-primary mr-2 mb-0"> {remainingSpots} / 15</span>{" "}
                      {remainingSpots === 0 && (
                        <span className="text-yuvoo-secondary mb-0">(complet)</span>
                      )}
                      {verifiedCount > 0 && (
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#6B6B6B",
                            marginLeft: "8px",
                            marginBottom: "0",
                          }}
                        >
                          ({verifiedCount} cluburi verificate)
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <div
                  className="bd-hero-btn wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".8s"
                >
                  {remainingSpots > 0 && (
                    <button
                      type="button"
                      className="bd-btn mx-auto"
                      onClick={handleCTAClick}
                      data-bs-toggle="modal"
                      data-bs-target={`#${CLUBS_CONTACT_MODAL_ID}`}
                    >
                      <span className="bd-btn-inner">
                        <span className="bd-btn-normal">Devino Founding Club</span>
                        <span className="bd-btn-hover">Devino Founding Club</span>
                      </span>
                    </button>
                  )}
                  {remainingSpots === 0 && (
                    <div className="text-center display-flex flex-column align-items-center mx-auto">
                      <p className="text-center text-muted">
                        Nu mai sunt locuri disponibile. Vezi oferta completa aici:
                      </p>
                      <Link href={routes.clubs.pricing} className="bd-btn mx-auto">
                        <span className="bd-btn-inner">
                          <span className="bd-btn-normal">Vezi oferta completa</span>
                          <span className="bd-btn-hover">Vezi oferta completa</span>
                        </span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* CTA Subtitle */}
                {remainingSpots > 0 && (
                  <p
                    className="wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".9s"
                    style={{
                      marginTop: "20px",
                      fontSize: "14px",
                      color: "#6B6B6B",
                      fontWeight: 400,
                    }}
                  >
                    Call de 15 minute · Fără obligații
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
