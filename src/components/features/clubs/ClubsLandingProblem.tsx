import React from "react";
import Image from "next/image";
import problem from "../../../../public/assets/img/promotion/1.png";
import line from "../../../../public/assets/img/shape/tripple-line.png";

/**
 * Clubs Landing Problem Section
 *
 * Displays the real problems that children's sports clubs face.
 * Part of the clubs landing page (/pentru-cluburi).
 * Styled to match HomePromotionArea component format.
 */
export default function ClubsLandingProblem() {
  const problems = [
    "Primești zeci de mesaje de la părinți care „nu sunt siguri”",
    "Organizezi probe care nu se concretizează",
    "Pierzi timp explicând de ce un copil nu este încă pregătit",
    "Google & Facebook aduc volum, dar nu potrivire",
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
                    alt="Problema reală a cluburilor pentru copii"
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
                <h2 className="bd-section-title mb-10">Problema reală a cluburilor pentru copii</h2>
                <span className="mb-10 d-inline-block">
                  Dacă administrezi un club pentru copii (4–14 ani), probabil recunoști asta:
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
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#1B1B1B",
                    marginBottom: 0,
                    lineHeight: "1.5",
                  }}
                >
                  Nu ai o problemă de vizibilitate. Ai o problemă de calitate a lead-urilor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
