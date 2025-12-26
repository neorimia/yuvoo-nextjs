import React from "react";
import Image from "next/image";
import problem from "../../../../public/assets/img/doctor/problem.jpg";
import line from "../../../../public/assets/img/shape/tripple-line.png";

/**
 * Doctors Landing Problem Section
 *
 * Displays the real problems from the doctor's perspective.
 * Part of the doctors landing page (/pentru-doctori).
 * Styled to match HomePromotionArea component format.
 */
export default function DoctorsLandingProblem() {
  const problems = [
    "prea devreme",
    "pe baza informațiilor incomplete",
    "fără a ține cont de dezvoltarea fizică și emoțională",
  ];

  return (
    <section className="bd-promotion-area pt-120 pb-70">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5 order-2 order-xl-1 d-none d-xl-block">
            <div
              className="bd-promotion-thumb-wrapper mb-60 wow fadeInLeft"
              data-wow-duration="1s"
              data-wow-delay=".2s"
            >
              <div className="bd-promotion-thumb">
                <div
                  className="bd-promotion-thumb-mask p-relative wow fadeInLeft"
                  data-wow-duration="1s"
                  data-wow-delay=".3s"
                >
                  <Image
                    src={problem}
                    style={{ width: "100%", height: "100%" }}
                    quality={100}
                    height={600}
                    width={600}
                    alt="Problema reală: părinții aleg sporturi nepotrivite"
                  />
                  <div className="panel wow"></div>
                </div>
              </div>
              <div className="bd-promotion-shape d-none d-lg-block">
                <Image src={line} style={{ width: "100%", height: "100%" }} alt="" />
              </div>
            </div>
          </div>
          <div className="col-xl-7 order-1 order-xl-2">
            <div
              className="bd-promotion mb-60 wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <div className="bd-section-title-wrapper mb-35">
                <h2 className="bd-section-title mb-10">De ce este nevoie de expertiza ta</h2>
                <span className="mb-10 d-inline-block">
                  Tot mai mulți părinți aleg sportul copilului:
                </span>
              </div>

              <div className="bd-promotion-list mb-50">
                <ul>
                  {problems.map((problem, index) => (
                    <li key={index}>{problem}</li>
                  ))}
                </ul>
              </div>

              <div
                className="wow fadeInUp text-center"
                data-wow-duration="1s"
                data-wow-delay=".5s"
                style={{
                  padding: "30px",
                  backgroundColor: "#EBFFFE",
                  borderRadius: "16px",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#1B1B1B",
                    marginBottom: "10px",
                    lineHeight: "1.5",
                  }}
                >
                  Consecința?
                </p>
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#1B1B1B",
                    marginBottom: 0,
                    lineHeight: "1.5",
                  }}
                >
                  Medicul vede efectele după ce decizia a fost deja luată: accidentări,
                  suprasolicitare, anxietate sau abandon sportiv.
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "var(--bd-theme-1)",
                    marginTop: "15px",
                    marginBottom: 0,
                    lineHeight: "1.5",
                  }}
                >
                  Yuvoo intervine înainte de decizia greșită.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
