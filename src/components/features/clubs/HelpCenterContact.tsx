"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { CLUBS_CONTACT_MODAL_ID, openClubsContactModal } from "@/lib/clubs-landing-modal";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";

/**
 * Help Center Contact Component
 *
 * Contact section for additional support.
 */
export default function HelpCenterContact() {
  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "help_center",
      cta_text: "Contactează-ne",
    });

    openClubsContactModal("help_center", "Contactează-ne");
  };

  return (
    <section className="pt-70 pb-120" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <SectionTitle
              title="Nu ai găsit răspunsul căutat?"
              subtitle="Echipa noastră este aici să te ajute"
              className="mb-40"
            />

            <div className="row g-4 mb-40">
              <div className="col-md-6">
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "30px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      marginBottom: "15px",
                    }}
                  >
                    📧
                  </div>
                  <h4
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#1B1B1B",
                      marginBottom: "12px",
                    }}
                  >
                    Email
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#424242",
                      marginBottom: "15px",
                    }}
                  >
                    Trimite-ne un email și îți răspundem în maxim 24 de ore
                  </p>
                  <a
                    href="mailto:contact@yuvoo.ro"
                    style={{
                      color: "var(--bd-theme-1)",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    contact@yuvoo.ro →
                  </a>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "30px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      marginBottom: "15px",
                    }}
                  >
                    📞
                  </div>
                  <h4
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#1B1B1B",
                      marginBottom: "12px",
                    }}
                  >
                    Telefon
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#424242",
                      marginBottom: "15px",
                    }}
                  >
                    Sună-ne pentru suport rapid
                  </p>
                  <a
                    href="tel:+40746385038"
                    style={{
                      color: "var(--bd-theme-1)",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    +40 746 385 038 →
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#EBFFFE",
                borderRadius: "16px",
                padding: "30px",
                border: "2px solid var(--bd-theme-1)",
              }}
            >
              <h4
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#1B1B1B",
                  marginBottom: "15px",
                }}
              >
                Vrei să discuți despre programul Founding Club?
              </h4>
              <p
                style={{
                  fontSize: "16px",
                  color: "#424242",
                  marginBottom: "25px",
                }}
              >
                Rezervă un call de 15 minute pentru a discuta despre programul gratuit de 6 luni sau
                upgrade la Premium.
              </p>
              <button
                type="button"
                className="bd-btn"
                onClick={handleContactClick}
                data-bs-toggle="modal"
                data-bs-target={`#${CLUBS_CONTACT_MODAL_ID}`}
              >
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
