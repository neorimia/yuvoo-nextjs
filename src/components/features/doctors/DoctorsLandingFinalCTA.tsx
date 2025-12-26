"use client";

import React from "react";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";
import { openDoctorsContactModal } from "@/lib/doctors-landing-modal";

/**
 * Doctors Landing Final CTA Section
 *
 * Final call-to-action section with low-pressure CTAs.
 * Part of the doctors landing page (/pentru-doctori).
 * NO urgency, NO spots counter - professional, ethical tone.
 */
export default function DoctorsLandingFinalCTA() {
  const handlePrimaryCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Track event
    trackEvent(PostHogEvents.DOCTORS_LANDING_CTA_CLICKED, {
      location: "final",
      cta_text: "Aplică pentru rolul de Expert Pediatric Verificat",
    });

    // Open modal
    openDoctorsContactModal("final", "Aplică pentru rolul de Expert Pediatric Verificat");
  };

  const _handleSecondaryCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Track event
    trackEvent(PostHogEvents.DOCTORS_LANDING_CTA_CLICKED, {
      location: "final",
      cta_text: "Programează un call de clarificare",
    });

    // Open modal
    openDoctorsContactModal("final", "Programează un call de clarificare");
  };

  return (
    <section className="bd-doctors-landing-final-cta pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <div className="wow fadeInUp text-center" data-wow-duration="1s" data-wow-delay=".3s">
              {/* Title */}
              <h2 className="bd-section-title bd-doctors-landing-final-cta-title mb-30">
                Devino Expert Pediatric Verificat
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: "#424242",
                  marginBottom: "40px",
                  maxWidth: "600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Dacă îți dorești să contribui la alegeri sportive mai sigure pentru copii și să faci
                parte dintr-un proiect responsabil:
              </p>

              {/* Primary CTA Button */}
              <div className="mb-30">
                <button type="button" className="bd-btn mx-auto" onClick={handlePrimaryCTAClick}>
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">Aplică</span>
                    <span className="bd-btn-hover">Aplică</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
