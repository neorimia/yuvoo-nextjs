import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";

/**
 * Doctors Landing Role Section
 *
 * Displays the doctor's role in Yuvoo (expert, not commercial provider).
 * Part of the doctors landing page (/pentru-doctori).
 */
export default function DoctorsLandingRole() {
  const rolePoints = [
    "să contribui la validarea responsabilă a recomandărilor",
    "să oferi context medical pentru părinți",
    "să ajuți la prevenirea deciziilor greșite în sportul copiilor",
  ];

  const platformAppearance = [
    "ca expert recomandat",
    "citat în conținut educațional",
    "asociat cu anumite tipuri de activități sportive",
  ];

  return (
    <section className="bd-doctors-landing-role pt-120 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            {/* Section Title */}
            <SectionTitle
              title="Rolul tău în Yuvoo"
              subtitle={
                <>
                  <strong style={{ color: "var(--bd-theme-1)" }}>
                    Expert pediatric, nu furnizor comercial
                  </strong>
                </>
              }
              className="mb-50"
              animationDelay=".3s"
            />

            {/* Role Description */}
            <div
              className="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".4s"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "30px",
                marginBottom: "30px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
                border: "1px solid #E6E6E6",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1B1B1B",
                  marginBottom: "20px",
                }}
              >
                Ca Expert Pediatric Verificat, rolul tău este:
              </h3>
              <ul
                className="list-unstyled"
                style={{
                  fontSize: "16px",
                  lineHeight: "28px",
                  color: "#424242",
                  marginBottom: 0,
                }}
              >
                {rolePoints.map((point, index) => (
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
                        color: "var(--bd-theme-1)",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      •
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform Appearance */}
            <div
              className="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".5s"
              style={{
                backgroundColor: "#EBFFFE",
                borderRadius: "16px",
                padding: "30px",
                marginBottom: "30px",
              }}
            >
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1B1B1B",
                  marginBottom: "20px",
                }}
              >
                Poți apărea în platformă:
              </h3>
              <ul
                className="list-unstyled"
                style={{
                  fontSize: "16px",
                  lineHeight: "28px",
                  color: "#424242",
                  marginBottom: 0,
                }}
              >
                {platformAppearance.map((item, index) => (
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
                        color: "var(--bd-theme-1)",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    >
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* No Obligation Callouts */}
            <div
              className="wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".6s"
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "20px 30px",
                  border: "2px solid var(--bd-theme-1)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#1B1B1B",
                    marginBottom: 0,
                  }}
                >
                  Fără obligația de a oferi consultații.
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "20px 30px",
                  border: "2px solid var(--bd-theme-1)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#1B1B1B",
                    marginBottom: 0,
                  }}
                >
                  Fără presiune comercială.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
