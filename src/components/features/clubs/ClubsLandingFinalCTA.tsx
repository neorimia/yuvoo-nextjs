"use client";

import React from "react";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";
import { openClubsContactModal } from "@/lib/clubs-landing-modal";
import { routes } from "@/lib/routes";
import Link from "next/link";

const MAX_FOUNDING_CLUBS = 15;

/**
 * Clubs Landing Final CTA Section
 *
 * Final call-to-action section with location info, availability, and prominent CTA button.
 * Part of the clubs landing page (/pentru-cluburi).
 */
interface ClubsLandingFinalCTAProps {
  verifiedCount: number;
  remainingSpots: number;
}

export default function ClubsLandingFinalCTA({
  verifiedCount,
  remainingSpots,
}: ClubsLandingFinalCTAProps) {
  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Track event
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "final",
      cta_text: "Devino Founding Club Gratuit",
    });

    // Open modal
    openClubsContactModal("final", "Devino Founding Club Gratuit");
  };

  return (
    <>
      <section className="bd-clubs-landing-final-cta pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-xl-9">
              <div className="wow fadeInUp text-center" data-wow-duration="1s" data-wow-delay=".3s">
                {/* Title */}
                <h2 className="bd-section-title bd-clubs-landing-final-cta-title mb-30">
                  🚀 Intră acum în programul Founding Club
                </h2>

                {/* Location & Availability Info */}
                <div className="bd-clubs-landing-final-cta-info-wrapper mb-40">
                  <div className="bd-clubs-landing-final-cta-spots-counter">
                    <span>🏅</span>
                    <div className="bd-clubs-landing-final-cta-spots-counter-text">
                      <span className="bd-clubs-landing-final-cta-spots-counter-text-label">
                        <strong>Locuri rămase:</strong>
                      </span>{" "}
                      <span className="bd-clubs-landing-final-cta-spots-counter-text-value">
                        {remainingSpots} / {MAX_FOUNDING_CLUBS}
                      </span>
                      {remainingSpots === 0 && (
                        <span className="bd-clubs-landing-final-cta-spots-counter-text-status">
                          {" "}
                          (complet)
                        </span>
                      )}
                      {verifiedCount > 0 && (
                        <span className="bd-clubs-landing-final-cta-spots-counter-text-verified">
                          {" "}
                          ({verifiedCount} cluburi verificate)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                {remainingSpots > 0 && (
                  <div className="mb-30">
                    <button type="button" className="bd-btn mx-auto" onClick={handleCTAClick}>
                      <span className="bd-btn-inner">
                        <span className="bd-btn-normal">Devino Founding Club</span>
                        <span className="bd-btn-hover">Devino Founding Club</span>
                      </span>
                    </button>
                  </div>
                )}
                {remainingSpots === 0 && (
                  <>
                    <p className="text-center mb-3">
                      <span className="bd-clubs-landing-final-cta-subtitle-small">
                        Nu mai sunt locuri disponibile în programul Founding Club.
                      </span>
                    </p>
                    <p className="text-center mb-30" style={{ fontSize: "16px", color: "#424242" }}>
                      Upgrade la Premium pentru acces nelimitat la cereri și beneficii exclusive (99
                      lei/lună sau 990 lei/an)
                    </p>
                    <div className="mb-30">
                      <Link href={routes.club.premium} className="bd-btn mx-auto">
                        <span className="bd-btn-inner">
                          <span className="bd-btn-normal">Upgrade la Premium</span>
                          <span className="bd-btn-hover">Upgrade la Premium</span>
                        </span>
                      </Link>
                    </div>
                  </>
                )}

                {/* Subtitle */}
                <p className="bd-clubs-landing-final-cta-subtitle">
                  👉 Rezervă un call de 15 minute
                  <br />
                  <span className="bd-clubs-landing-final-cta-subtitle-small">
                    (îți facem profilul pe loc dacă decizi să continui)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
