import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * Clubs Landing Testimonials Section
 *
 * Displays social proof through club testimonials.
 * Part of the clubs landing page (/pentru-cluburi).
 */
export default function ClubsLandingTestimonials() {
  const testimonials = [
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
              {testimonials.map((testimonial, index) => (
                <div key={index} className="col-lg-6 col-md-6">
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
                      {/* Quote Icon */}
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "20px",
                          fontSize: "48px",
                          color: "var(--bd-theme-1)",
                          opacity: 0.15,
                          lineHeight: 1,
                        }}
                      >
                        &quot;
                      </div>

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
                          — {testimonial.author}
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#6B6B6B",
                            marginBottom: 0,
                          }}
                        >
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
