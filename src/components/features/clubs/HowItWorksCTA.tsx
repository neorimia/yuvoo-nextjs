"use client";

import React from "react";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";
import { openClubsPremiumMailto } from "@/lib/clubs-landing-modal";

/**
 * How It Works CTA Component
 *
 * Call-to-action section for the How It Works page.
 */
export default function HowItWorksCTA() {
  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "how_it_works",
      cta_text: "Rezervă call-ul",
    });

    openClubsPremiumMailto("how_it_works", "Rezervă call-ul");
  };

  return (
    <section className="pt-70 pb-120" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="bd-section-title mb-30">Gata să începi?</h2>
            <p
              style={{
                fontSize: "18px",
                color: "#424242",
                marginBottom: "40px",
                lineHeight: "1.6",
              }}
            >
              Rezervă call-ul, iar noi te vom contacta pentru a discuta despre contul tău Premium
              pentru acces imediat la lead-uri pre-calificate.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <button type="button" className="bd-btn" onClick={handleCTAClick}>
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">Rezervă call-ul</span>
                  <span className="bd-btn-hover">Rezervă call-ul</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
