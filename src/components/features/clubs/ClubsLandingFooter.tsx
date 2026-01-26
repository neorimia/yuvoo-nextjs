import React from "react";

/**
 * Clubs Landing Footer Microcopy Section
 *
 * Displays footer microcopy that reinforces value proposition.
 * Part of the clubs landing page (/pentru-cluburi).
 */
export default function ClubsLandingFooter() {
  return (
    <section className="bd-clubs-landing-footer pb-50">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <div className="wow fadeInUp text-center" data-wow-duration="1s" data-wow-delay=".3s">
              <p
                style={{
                  fontSize: "16px",
                  color: "#6B6B6B",
                  lineHeight: "1.6",
                  marginBottom: 0,
                  fontStyle: "italic",
                }}
              >
                Yuvoo nu este un marketplace de reclame.
                <br />
                Este un sistem de potrivire între copii, părinți și cluburi responsabile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
