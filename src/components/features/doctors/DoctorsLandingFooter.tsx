import React from "react";

/**
 * Doctors Landing Footer Microcopy Section
 *
 * Displays footer microcopy that reinforces value proposition.
 * Part of the doctors landing page (/pentru-doctori).
 */
export default function DoctorsLandingFooter() {
  return (
    <section className="bd-doctors-landing-footer pt-50 pb-50">
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
                Yuvoo nu înlocuiește actul medical.
                <br />
                Yuvoo ajută părinții să ajungă la decizii mai bune, mai devreme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
