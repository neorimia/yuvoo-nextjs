"use client";
import React from "react";
import Link from "next/link";
import SectionTitle from "@/components/shared/SectionTitle";
import StepCard from "@/components/shared/StepCard";
import { trackEvent, PostHogEvents } from "@/lib/analytics/tracking";
import { CLUBS_CONTACT_MODAL_ID, openClubsContactModal } from "@/lib/clubs-landing-modal";
import { routes } from "@/lib/routes";

/**
 * Clubs Landing Solution Section
 *
 * Displays how Yuvoo solves the problems clubs face.
 * Shows a 4-step process with visual indicators.
 * Part of the clubs landing page (/pentru-cluburi).
 */

interface IStep {
  id: number;
  icon: string;
  title: string;
  microcopy: string;
  link?: string;
}

export default function ClubsLandingSolution() {
  const steps: IStep[] = [
    {
      id: 1,
      icon: "flaticon-reading",
      title: "Părintele completează un quiz AI",
      microcopy: "3 minute despre copil",
    },
    {
      id: 2,
      icon: "flaticon-presentation",
      title: "Primește sporturile compatibile",
      microcopy: "Cu vârsta și personalitatea copilului",
    },
    {
      id: 3,
      icon: "flaticon-badge",
      title: "Vede doar cluburi verificate",
      microcopy: "Care se potrivesc cu sportul și vârsta copilului",
    },
    {
      id: 4,
      icon: "flaticon-phone-call",
      title: "Ești contactat doar de părinți potriviți",
      microcopy: "Părinți care se potrivesc cu sportul și vârsta copilului",
    },
  ];

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Track event
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "solution",
      cta_text: "Vrei mai multe lead-uri calificate? Rezervă call-ul",
    });

    // Open modal
    openClubsContactModal("solution", "Devino Founding Club Gratuit");
  };

  return (
    <section
      className="bd-clubs-landing-solution pt-120 pb-70"
      style={{ backgroundColor: "#FFF6EB" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            {/* Section Title */}
            <SectionTitle
              title="Soluția Yuvoo (simplu și eficient)"
              subtitle={
                <>
                  Yuvoo filtrează părinții înainte să ajungă la tine. Mai puține mesaje inutile. Mai
                  multe înscrieri reale.
                </>
              }
              className="mb-50"
              animationDelay=".3s"
            />

            {/* 4-Step Process */}
            <div className="row g-4 mb-50">
              {steps.map((step) => (
                <StepCard
                  key={step.id}
                  icon={step.icon}
                  title={step.title}
                  description={step.microcopy}
                  link={step.link}
                  animationDelay={`${0.4 + (step.id - 1) * 0.1}s`}
                  columnClasses="col-lg-6 col-md-6"
                  variant="how-it-works"
                />
              ))}
            </div>

            {/* Outcome Statement */}
            <div
              className="wow fadeInUp text-center"
              data-wow-duration="1s"
              data-wow-delay=".8s"
              style={{
                marginTop: "40px",
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
                  marginBottom: 0,
                  lineHeight: "1.5",
                }}
              >
                Mai puține mesaje inutile. Mai multe înscrieri reale.
              </p>
              {/* Primary CTA Button */}
              <div
                className="bd-hero-btn mt-4 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".8s"
              >
                <button
                  type="button"
                  className="bd-btn mx-auto"
                  onClick={handleCTAClick}
                  data-bs-toggle="modal"
                  data-bs-target={`#${CLUBS_CONTACT_MODAL_ID}`}
                >
                  <span className="bd-btn-inner">
                    <span className="bd-btn-normal">
                      Vrei mai multe lead-uri calificate? Rezervă call-ul
                    </span>
                    <span className="bd-btn-hover">
                      Vrei mai multe lead-uri calificate? Rezervă call-ul
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Link to How It Works Page */}
            <div
              className="text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".6s"
              style={{ marginTop: "40px" }}
            >
              <Link
                href={routes.clubs.howItWorks}
                className="text-decoration-none"
                style={{
                  color: "var(--bd-theme-1)",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Vezi procesul complet →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
