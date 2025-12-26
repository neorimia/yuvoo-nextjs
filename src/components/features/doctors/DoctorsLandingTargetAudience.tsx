import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * Doctors Landing Target Audience Section
 *
 * Displays who this page is for and who it's not for.
 * Part of the doctors landing page (/pentru-doctori).
 */
export default function DoctorsLandingTargetAudience() {
  const isFor = [
    "Medici pediatri",
    "Ortopezi pediatrici",
    "Medici de medicină sportivă pediatrică",
    "Psihologi pentru copii",
    "Nutriționiști pediatrici",
  ];

  const isNotFor = [
    "Promovare agresivă",
    "Lead selling",
    "Practici medicale neclare sau neconforme",
  ];

  return (
    <section className="bd-doctors-landing-target-audience pt-70 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            {/* Section Title */}
            <SectionTitle
              title="Cui se adresează această pagină"
              className="mb-50"
              animationDelay=".3s"
            />

            <div className="row g-4">
              {/* Is For Column */}
              <div className="col-lg-6 col-md-6">
                <div
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".4s"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "30px",
                    height: "100%",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                    border: "2px solid #00BBAE",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#1B1B1B",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-check-circle"
                      style={{ marginRight: "10px", fontSize: "24px", color: "#00BBAE" }}
                    ></i>
                    ✔ Este pentru:
                  </h4>
                  <ul
                    className="list-unstyled"
                    style={{
                      fontSize: "16px",
                      lineHeight: "28px",
                      color: "#424242",
                      marginBottom: 0,
                    }}
                  >
                    {isFor.map((item, index) => (
                      <li
                        key={index}
                        className="mb-2 d-flex align-items-start"
                        style={{ paddingLeft: "25px", position: "relative" }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "0",
                            color: "#00BBAE",
                            fontSize: "18px",
                            fontWeight: 600,
                          }}
                        >
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Is Not For Column */}
              <div className="col-lg-6 col-md-6">
                <div
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".5s"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "30px",
                    height: "100%",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                    border: "2px solid #E6E6E6",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#1B1B1B",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="fa-solid fa-times-circle"
                      style={{ marginRight: "10px", fontSize: "24px", color: "#999999" }}
                    ></i>
                    ❌ Nu este potrivit pentru:
                  </h4>
                  <ul
                    className="list-unstyled"
                    style={{
                      fontSize: "16px",
                      lineHeight: "28px",
                      color: "#6B6B6B",
                      marginBottom: 0,
                    }}
                  >
                    {isNotFor.map((item, index) => (
                      <li
                        key={index}
                        className="mb-2 d-flex align-items-start"
                        style={{ paddingLeft: "25px", position: "relative" }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: "0",
                            color: "#999999",
                            fontSize: "18px",
                            fontWeight: 600,
                          }}
                        >
                          ✗
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
