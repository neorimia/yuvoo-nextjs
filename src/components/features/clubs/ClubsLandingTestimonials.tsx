import React from "react";
import Image from "next/image"; // Used when real testimonials with logos are added
import Link from "next/link";
import SectionTitle from "@/components/shared/SectionTitle";
import {
  getVerifiedTestimonials,
  getFeaturedTestimonials,
  type ClubTestimonial,
} from "@/data/clubs-landing-testimonials-data";
import { routes } from "@/lib/routes";

/**
 * Clubs Landing Testimonials Section
 *
 * Displays social proof through club testimonials.
 * Part of the clubs landing page (/pentru-cluburi).
 *
 * Supports both real verified testimonials (with metrics, logos, etc.)
 * and placeholder testimonials (when no real ones are available yet).
 */
export default function ClubsLandingTestimonials() {
  // Get real verified testimonials
  const verifiedTestimonials = getVerifiedTestimonials();
  const featuredTestimonials = getFeaturedTestimonials();

  // Use real testimonials if available, otherwise use placeholders
  const testimonials: Array<ClubTestimonial | { quote: string; author: string; location: string }> =
    verifiedTestimonials.length > 0
      ? [...featuredTestimonials, ...verifiedTestimonials.filter((t) => !t.featured)]
      : [
          // Placeholder testimonials (fallback)
          {
            quote:
              "Părinții care au venit prin Yuvoo știau deja ce caută. Discuția a fost mult mai ușoară.",
            author: "Club de înot",
            location: "București",
          },
          {
            quote: "Nu e încă o platformă de reclame. E un filtru care ne economisește timp.",
            author: "Academie de fotbal",
            location: "Sector 3",
          },
        ];

  return (
    <section className="bd-clubs-landing-testimonials pt-120 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            {/* Section Title */}
            <SectionTitle
              title='🧠 De ce cluburile spun "DA"'
              className="mb-50"
              animationDelay=".3s"
            />

            {/* Testimonials Grid */}
            <div className="row g-4 mb-30">
              {testimonials.map((testimonial, index) => {
                const isRealTestimonial = "id" in testimonial && testimonial.isVerified;
                const realTestimonial = isRealTestimonial ? (testimonial as ClubTestimonial) : null;

                return (
                  <div
                    key={isRealTestimonial ? realTestimonial!.id : `placeholder-${index}`}
                    className="col-lg-6 col-md-6"
                  >
                    <div
                      className="wow fadeInUp h-100"
                      data-wow-duration="1s"
                      data-wow-delay={`${0.4 + index * 0.1}s`}
                    >
                      <div
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderRadius: "16px",
                          padding: "35px",
                          height: "100%",
                          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                          border: "1px solid #E6E6E6",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Verification Badge (for real testimonials) */}
                        {isRealTestimonial && (
                          <div
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                              backgroundColor: "var(--bd-theme-1)",
                              color: "#FFFFFF",
                              fontSize: "10px",
                              fontWeight: 600,
                              padding: "4px 8px",
                              borderRadius: "4px",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            ✓ Verificat
                          </div>
                        )}

                        {/* Quote Icon */}
                        <div
                          style={{
                            position: "absolute",
                            top: "20px",
                            right: isRealTestimonial ? "80px" : "20px",
                            fontSize: "48px",
                            color: "var(--bd-theme-1)",
                            opacity: 0.15,
                            lineHeight: 1,
                          }}
                        >
                          &quot;
                        </div>

                        {/* Club Logo (for real testimonials) */}
                        {isRealTestimonial && realTestimonial!.logo && (
                          <div style={{ marginBottom: "15px" }}>
                            <Image
                              src={realTestimonial!.logo}
                              alt={`${realTestimonial!.clubName} logo`}
                              width={120}
                              height={40}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        )}

                        {/* Quote Text */}
                        <p
                          style={{
                            fontSize: "18px",
                            lineHeight: "28px",
                            color: "#1B1B1B",
                            marginBottom: "20px",
                            fontStyle: "italic",
                            flex: 1,
                            paddingRight: "30px",
                          }}
                        >
                          {testimonial.quote}
                        </p>

                        {/* Metrics (for real testimonials) */}
                        {isRealTestimonial && realTestimonial!.metrics && (
                          <div
                            style={{
                              backgroundColor: "#EBFFFE",
                              padding: "12px 16px",
                              borderRadius: "8px",
                              marginBottom: "15px",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "var(--bd-theme-1)",
                                marginBottom: "4px",
                              }}
                            >
                              📊 Rezultate:
                            </p>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#1B1B1B",
                                marginBottom: 0,
                              }}
                            >
                              {realTestimonial!.metrics}
                            </p>
                            {realTestimonial!.results && (
                              <p
                                style={{
                                  fontSize: "13px",
                                  color: "#6B6B6B",
                                  marginTop: "4px",
                                  marginBottom: 0,
                                }}
                              >
                                {realTestimonial!.results}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Author Info */}
                        <div
                          style={{
                            borderTop: "1px solid #E6E6E6",
                            paddingTop: "15px",
                            marginTop: "auto",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                              color: "#1B1B1B",
                              marginBottom: "3px",
                            }}
                          >
                            — {isRealTestimonial ? realTestimonial!.clubName : testimonial.author}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#6B6B6B",
                                marginBottom: 0,
                              }}
                            >
                              {isRealTestimonial
                                ? `${realTestimonial!.location} · ${realTestimonial!.sport}`
                                : testimonial.location}
                            </p>
                            {isRealTestimonial && realTestimonial!.author && (
                              <p
                                style={{
                                  fontSize: "12px",
                                  color: "#6B6B6B",
                                  marginBottom: 0,
                                  fontStyle: "italic",
                                }}
                              >
                                {realTestimonial!.author}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Link to Case Studies Page */}
            {verifiedTestimonials.length > 0 && (
              <div className="text-center wow fadeInUp" data-wow-duration="1s" data-wow-delay=".6s">
                <Link
                  href={routes.clubs.caseStudies}
                  className="text-decoration-none"
                  style={{
                    color: "var(--bd-theme-1)",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  Vezi case studies complete →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
