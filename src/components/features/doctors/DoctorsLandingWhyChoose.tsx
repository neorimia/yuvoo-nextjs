import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * Doctors Landing Why Choose Section
 *
 * Displays why doctors choose Yuvoo using proof logic (not commercial testimonials).
 * Part of the doctors landing page (/pentru-doctori).
 */
export default function DoctorsLandingWhyChoose() {
  const reasons = [
    "Asociere cu o platformă responsabilă pentru părinți",
    "Impact real în prevenția problemelor sportive la copii",
    "Vizibilitate profesională, nu publicitate",
    "Cadru clar, etic, transparent",
  ];

  return (
    <section className="bd-doctors-landing-why-choose pt-120 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Section Title */}
            <SectionTitle title="De ce medicii aleg Yuvoo" className="mb-50" animationDelay=".3s" />

            {/* Reasons List */}
            <div className="row g-4 mb-30">
              {reasons.map((reason, index) => (
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
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "24px",
                          marginRight: "15px",
                          color: "var(--bd-theme-1)",
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      <p
                        style={{
                          fontSize: "18px",
                          lineHeight: "28px",
                          color: "#1B1B1B",
                          marginBottom: 0,
                          fontWeight: 500,
                        }}
                      >
                        {reason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div
              className="wow fadeInUp text-center"
              data-wow-duration="1s"
              data-wow-delay=".6s"
              style={{
                padding: "30px",
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "2px solid var(--bd-theme-1)",
                marginTop: "30px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  fontStyle: "italic",
                  color: "#424242",
                  marginBottom: 0,
                  lineHeight: "1.6",
                }}
              >
                &quot;Yuvoo creează un spațiu în care expertiza medicală este folosită corect, nu
                exploatată.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
