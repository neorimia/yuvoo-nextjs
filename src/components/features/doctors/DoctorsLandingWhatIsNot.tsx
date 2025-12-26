import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * Doctors Landing What Is / Is Not Section
 *
 * Displays what Yuvoo is and what it is not.
 * Part of the doctors landing page (/pentru-doctori).
 * Two-column layout with checkmarks (✓) for "What Is" and X marks (✗) for "What Is Not".
 */
export default function DoctorsLandingWhatIsNot() {
  const whatIs = [
    "Platformă de educație și ghidare pentru părinți",
    "Strat de validare medicală pentru recomandările sportive",
    "Cadru în care expertiza pediatrică este citata și respectată",
    "Proiect construit cu focus pe prevenție, nu pe corecție",
  ];

  const whatIsNot = [
    "Nu este marketplace de pacienți",
    "Nu este platformă de vânzare de servicii medicale",
    "Nu promovează agresiv specialiști",
    "Nu afectează autonomia profesională",
  ];

  return (
    <section
      className="bd-doctors-landing-what-is-not pt-120 pb-70"
      style={{ backgroundColor: "#FFF6EB" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Section Title */}
            <SectionTitle
              title="Ce este (și ce NU este) Yuvoo"
              className="mb-50"
              animationDelay=".3s"
            />

            <div className="row g-4">
              {/* What Is Column */}
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
                    ✔️ Ce este Yuvoo
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
                    {whatIs.map((item, index) => (
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

              {/* What Is Not Column */}
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
                    ❌ Ce NU este Yuvoo
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
                    {whatIsNot.map((item, index) => (
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
