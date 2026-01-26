"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";
import { CLUBS_CONTACT_MODAL_ID, openClubsContactModal } from "@/lib/clubs-landing-modal";

/**
 * Case Studies CTA Component
 *
 * Final call-to-action section for the Case Studies page.
 */
export default function CaseStudiesCTA() {
  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "case_studies_cta",
      cta_text: "Vrei să fii următorul success story? Rezervă call-ul",
    });

    openClubsContactModal(
      "case_studies_cta",
      "Vrei să fii următorul success story? Rezervă call-ul"
    );
  };

  return (
    <section className="pt-70 pb-120" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="bd-section-title mb-30">Vrei să fii următorul success story?</h2>
            <p
              style={{
                fontSize: "18px",
                color: "#424242",
                marginBottom: "40px",
                lineHeight: "1.6",
              }}
            >
              Rezervă un call de 15 minute pentru a discuta despre programul Founding Club (6 luni
              gratuite) sau upgrade la Premium pentru acces imediat la lead-uri pre-calificate.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <button
                type="button"
                className="bd-btn"
                onClick={handleCTAClick}
                data-bs-toggle="modal"
                data-bs-target={`#${CLUBS_CONTACT_MODAL_ID}`}
              >
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">Rezervă call-ul</span>
                  <span className="bd-btn-hover">Rezervă call-ul</span>
                </span>
              </button>
              <Link href={routes.club.premium} className="bd-btn bd-btn-border">
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">Upgrade la Premium</span>
                  <span className="bd-btn-hover">Upgrade la Premium</span>
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
              💡 Programul Founding Club: Primele 15 cluburi intră gratuit pentru 6 luni. Doar 15
              locuri disponibile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
