"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";

/**
 * ROI Calculator CTA Component
 *
 * Displays call-to-action buttons for upgrading to Premium or booking a call.
 * Part of the ROI Calculator standalone page.
 */
export default function ROICalculatorCTA() {
  const handlePremiumClick = () => {
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "roi_calculator",
      cta_text: "Upgrade la Premium",
    });
  };

  const handleLandingClick = () => {
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "roi_calculator",
      cta_text: "Rezervă call-ul",
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 text-center">
        <h2 className="bd-section-title mb-30">Vrei să economisești timp și bani?</h2>
        <p
          style={{
            fontSize: "18px",
            color: "#424242",
            marginBottom: "40px",
          }}
        >
          Upgrade la Premium pentru acces nelimitat la lead-uri pre-calificate sau rezervă un call
          pentru a discuta despre programul Founding Club (6 luni gratuite).
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link
            href={routes.registerWithRole("club_admin")}
            className="bd-btn"
            onClick={handlePremiumClick}
          >
            <span className="bd-btn-inner">
              <span className="bd-btn-normal">Upgrade la Premium</span>
              <span className="bd-btn-hover">Upgrade la Premium</span>
            </span>
          </Link>
          <Link
            href={routes.clubs.landing}
            className="bd-btn bd-btn-border"
            onClick={handleLandingClick}
          >
            <span className="bd-btn-inner">
              <span className="bd-btn-normal">Rezervă call-ul</span>
              <span className="bd-btn-hover">Rezervă call-ul</span>
            </span>
          </Link>
        </div>
        <p
          style={{
            fontSize: "14px",
            color: "#6B6B6B",
            marginTop: "30px",
            fontStyle: "italic",
          }}
        >
          💡 Bazat pe date reale de la cluburi Yuvoo. Vezi case studies pentru dovezi concrete.
        </p>
      </div>
    </div>
  );
}
