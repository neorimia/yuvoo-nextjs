"use client";

import React, { useEffect } from "react";
import { trackEvent, PostHogEvents, PostHogProperties } from "@/lib/analytics/tracking";
import { useFeatureFlag, FeatureFlags, FeatureFlagVariants } from "@/lib/analytics/feature-flags";
import { openClubsPremiumMailto } from "@/lib/clubs-landing-modal";
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
  // A/B Testing: Hero Headline Variant
  const { value: headlineVariant } = useFeatureFlag(
    FeatureFlags.CLUBS_LANDING_HERO_HEADLINE_VARIANT
  );

  // A/B Testing: Hero CTA Variant
  const { value: ctaVariant } = useFeatureFlag(FeatureFlags.CLUBS_LANDING_HERO_CTA_VARIANT);

  // Get headline text based on variant
  const getHeadlineText = () => {
    switch (headlineVariant) {
      case FeatureFlagVariants.HERO_HEADLINE_VARIANT_A:
        return "Părinți pre-calificați. Zero timp pierdut. Mai multe înscrieri.";
      case FeatureFlagVariants.HERO_HEADLINE_VARIANT_B:
        return "Stop la mesaje inutile. Start cu lead-uri calificate.";
      default:
        return "Crești numărul de copii înscriși, fără lead-uri inutile";
    }
  };

  // Get CTA text based on variant
  const getCTAText = () => {
    switch (ctaVariant) {
      case FeatureFlagVariants.CTA_VARIANT_A:
        return "Rezervă locul tău gratuit";
      case FeatureFlagVariants.CTA_VARIANT_B:
        return "Începe acum - 6 luni gratuite";
      default:
        return `Rezervă locul tău gratuit (${remainingSpots} locuri rămase)`;
    }
  };

  // Track variant shown when component mounts
  useEffect(() => {
    if (headlineVariant) {
      trackEvent(PostHogEvents.CLUBS_LANDING_VARIANT_SHOWN, {
        [PostHogProperties.VARIANT_NAME]: FeatureFlags.CLUBS_LANDING_HERO_HEADLINE_VARIANT,
        [PostHogProperties.VARIANT_VALUE]: headlineVariant,
        [PostHogProperties.VARIANT_LOCATION]: "hero",
      });
    }
    if (ctaVariant) {
      trackEvent(PostHogEvents.CLUBS_LANDING_VARIANT_SHOWN, {
        [PostHogProperties.VARIANT_NAME]: FeatureFlags.CLUBS_LANDING_HERO_CTA_VARIANT,
        [PostHogProperties.VARIANT_VALUE]: ctaVariant,
        [PostHogProperties.VARIANT_LOCATION]: "hero",
      });
    }
  }, [headlineVariant, ctaVariant]);

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const ctaText = getCTAText();

    // Track event with variant info
    trackEvent(PostHogEvents.CLUBS_LANDING_VARIANT_CLICKED, {
      [PostHogProperties.VARIANT_NAME]: FeatureFlags.CLUBS_LANDING_HERO_CTA_VARIANT,
      [PostHogProperties.VARIANT_VALUE]: ctaVariant || FeatureFlagVariants.CTA_CURRENT,
      [PostHogProperties.VARIANT_LOCATION]: "hero",
      [PostHogProperties.CTA_TEXT]: ctaText,
    });

    // Also track standard CTA click event
    trackEvent(PostHogEvents.CLUBS_LANDING_CTA_CLICKED, {
      location: "hero",
      cta_text: ctaText,
    });

    // Open modal
    openClubsPremiumMailto("hero", ctaText);
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
                  {getHeadlineText()}
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
                    <button type="button" className="bd-btn mx-auto" onClick={handleCTAClick}>
                      <span className="bd-btn-inner">
                        <span className="bd-btn-normal">{getCTAText()}</span>
                        <span className="bd-btn-hover">{getCTAText()}</span>
                      </span>
                    </button>
                  )}
                  {remainingSpots === 0 && (
                    <div className="text-center display-flex flex-column align-items-center mx-auto">
                      <p className="text-center text-muted mb-3">
                        Nu mai sunt locuri disponibile în programul Founding Club.
                      </p>
                      <p
                        className="text-center"
                        style={{ fontSize: "16px", color: "#424242", marginBottom: "20px" }}
                      >
                        Upgrade la Premium pentru acces nelimitat la cereri și beneficii exclusive
                        (99 lei/lună sau 990 lei/an)
                      </p>
                      <Link href={routes.club.premium} className="bd-btn mx-auto">
                        <span className="bd-btn-inner">
                          <span className="bd-btn-normal">Upgrade la Premium</span>
                          <span className="bd-btn-hover">Upgrade la Premium</span>
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
