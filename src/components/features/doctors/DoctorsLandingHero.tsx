"use client";

import React from "react";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";
import { DOCTORS_CONTACT_MODAL_ID, openDoctorsContactModal } from "@/lib/doctors-landing-modal";

/**
 * Doctors Landing Hero Section
 *
 * Hero section for the doctors landing page (/pentru-doctori).
 * Promotes the Verified Pediatric Expert program with clear value proposition and CTA.
 * Follows Yuvoo brand guidelines and matches other hero component patterns.
 * Professional, ethical, non-commercial tone per brief.
 */
export default function DoctorsLandingHero() {
  const handlePrimaryCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Track event
    trackEvent(PostHogEvents.DOCTORS_LANDING_CTA_CLICKED, {
      location: "hero",
      cta_text: "Devino Expert Pediatric Verificat",
    });

    // Open modal
    openDoctorsContactModal("hero", "Devino Expert Pediatric Verificat");
  };

  const handleSecondaryCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Track event
    trackEvent(PostHogEvents.DOCTORS_LANDING_CTA_CLICKED, {
      location: "hero",
      cta_text: "Programează un call de clarificare",
    });

    // Open modal (same modal, different context)
    openDoctorsContactModal("hero", "Programează un call de clarificare");
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
                  Pentru Doctori & Specialiști Pediatrici
                </span>

                {/* Main Headline */}
                <h1
                  className="bd-hero-title wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".5s"
                >
                  Ajută părinții să aleagă sportul potrivit pentru copii, în siguranță medicală
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
                  Yuvoo este o platformă de ghidare pentru părinți care combină recomandări AI cu
                  validare medicală pediatrică, pentru a preveni alegeri sportive nepotrivite
                  copiilor între 4–14 ani.
                </p>

                {/* Trust Cues */}
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
                  <span style={{ color: "var(--bd-theme-1)" }}>✓</span> Nu suntem marketplace
                  medical · <span style={{ color: "var(--bd-theme-1)" }}>✓</span> Fără promovare
                  agresivă · <span style={{ color: "var(--bd-theme-1)" }}>✓</span> Control editorial
                  complet
                </div>

                {/* Call to Action Section */}
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
                      marginBottom: "20px",
                      fontWeight: 400,
                    }}
                  >
                    👉 Căutăm medici și specialiști pediatrici care doresc să contribuie ca Experți
                    Pediatrici Verificați.
                  </p>
                </div>

                {/* Primary CTA Button */}
                <div
                  className="bd-hero-btn wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".8s"
                >
                  <button
                    type="button"
                    className="bd-btn mx-auto"
                    onClick={handlePrimaryCTAClick}
                    data-bs-toggle="modal"
                    data-bs-target={`#${DOCTORS_CONTACT_MODAL_ID}`}
                  >
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Devino Expert Pediatric Verificat</span>
                      <span className="bd-btn-hover">Devino Expert Pediatric Verificat</span>
                    </span>
                  </button>
                </div>

                {/* Secondary CTA */}
                <div
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".85s"
                  style={{
                    marginTop: "15px",
                  }}
                >
                  <a
                    href="#"
                    onClick={handleSecondaryCTAClick}
                    style={{
                      fontSize: "16px",
                      color: "var(--bd-theme-1)",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Sau programează un call de clarificare (15 min)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
