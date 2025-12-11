import React from "react";

const HomeTestimonial = () => {
  return (
    <section className="bd-home-testimonial-area pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div
              className="bd-section-title-wrapper text-center mb-60 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h2 className="bd-section-title mb-0">Ce spun părinții din Yuvoo</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div
              className="bd-home-testimonial-card text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".4s"
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "50px 40px",
                boxShadow: "0px 16px 32px 0px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="bd-home-testimonial-avatar mb-30">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "0 auto",
                    border: "3px solid var(--bd-theme-1)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "var(--bd-theme-1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "32px",
                      fontWeight: "600",
                    }}
                  >
                    AM
                  </div>
                </div>
              </div>
              <div className="bd-home-testimonial-quote mb-25">
                <p
                  style={{
                    fontSize: "20px",
                    lineHeight: "1.6",
                    color: "#424242",
                    fontStyle: "italic",
                    margin: "0",
                  }}
                >
                  &ldquo;Yuvoo ne-a ajutat să găsim clubul perfect pentru fetița noastră. Quiz-ul
                  chiar a surprins personalitatea ei!&rdquo;
                </p>
              </div>
              <div className="bd-home-testimonial-rating mb-20">
                <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ fontSize: "20px", color: "#FFD700" }}>
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <div className="bd-home-testimonial-author">
                <h5 style={{ marginBottom: "8px", color: "#1b1b1b", fontWeight: "600" }}>
                  Andreea M.
                </h5>
                <p style={{ margin: "0", color: "#686868", fontSize: "14px" }}>
                  <i className="fal fa-map-marker-alt" style={{ marginRight: "6px" }}></i>
                  București
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonial;
