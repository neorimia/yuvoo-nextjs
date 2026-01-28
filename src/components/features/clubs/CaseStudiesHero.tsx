"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { CLUBS_CONTACT_MODAL_ID, openClubsContactModal } from "@/lib/clubs-landing-modal";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";

/**
 * Case Studies Hero Component
 *
 * Hero section for the Case Studies page.
 */
export default function CaseStudiesHero() {
  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "case_studies_hero",
      cta_text: "Vrei să fii următorul success story? Rezervă call-ul",
    });

    openClubsContactModal(
      "case_studies_hero",
      "Vrei să fii următorul success story? Rezervă call-ul"
    );
  };

  return (
    <section className="bd-hero-area bd-hero-area-3 fix pt-120 pb-70">
      <div className="bd-gradient-bg"></div>
      <div className="container">
        <div className="bd-hero-inner-3">
          <div className="row align-items-center">
            <div className="col-lg-10 col-xl-9 mx-auto">
              <div className="bd-hero-content text-center">
                <SectionTitle
                  title="Povești reale de la cluburi care au crescut cu Yuvoo"
                  subtitle="Descoperă cum cluburi similare au obținut rezultate concrete: mai multe lead-uri calificate, mai puțin timp pierdut, mai multe înscrieri"
                  className="mb-30"
                />
                <p
                  style={{
                    fontSize: "16px",
                    color: "#6B6B6B",
                    marginBottom: "30px",
                    lineHeight: "1.8",
                  }}
                >
                  Aceste case studies prezintă rezultate reale de la cluburi care folosesc Yuvoo.
                  Toate metricile sunt verificate și aprobate de cluburi.
                </p>
                <button
                  type="button"
                  className="bd-btn"
                  onClick={handleCTAClick}
                  data-bs-toggle="modal"
                  data-bs-target={`#${CLUBS_CONTACT_MODAL_ID}`}
                >
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">
                      Vrei să fii următorul success story? Rezervă call-ul
                    </span>
                    <span className="bd-btn-hover">
                      Vrei să fii următorul success story? Rezervă call-ul
                    </span>
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
