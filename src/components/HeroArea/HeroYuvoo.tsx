import Image from "next/image";
import Link from "next/link";
import React from "react";
import { routes } from "@/lib/routes";
import { externalLinks } from "@/lib/routes";
import shape1 from "../../../public/assets/img/shape/curved-line-2.png";
import heroImg from "../../../public/assets/img/hero/hero-3.jpg";
import shape2 from "../../../public/assets/img/shape/home-3-shape-1.png";
import shape3 from "../../../public/assets/img/shape/home-3-shape-2.png";
import shape4 from "../../../public/assets/img/shape/home-3-shape-3.png";
import shape5 from "../../../public/assets/img/shape/hero-3-shape-4.png";

const HeroYuvoo = () => {
  return (
    <section className="bd-hero-area bd-hero-area-3 fix">
      <div className="bd-gradient-bg"></div>
      <div className="bd-hero-social-wrapper">
        <div className="bd-hero-social">
          <a href={externalLinks.facebook} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-facebook-f"></i>facebook
          </a>
        </div>
        <div className="bd-hero-social">
          <a href={externalLinks.twitter} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-twitter"></i>twitter
          </a>
        </div>
        <div className="bd-hero-social">
          <a href={externalLinks.instagram} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>instagram
          </a>
        </div>
      </div>
      <div className="container">
        <div className="bd-hero-inner-3">
          <div className="bd-hero-shape-wrapper d-none d-lg-block">
            <div className="bd-hero-3-shape-2">
              <Image src={shape1} style={{ width: "100%", height: "100%" }} alt="decoration" />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="bd-hero-content">
                <span className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                  Platformă pentru Sporturi pentru Copii
                </span>
                <h1
                  className="bd-hero-title wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".5s"
                >
                  Descoperă sportul potrivit copilului tău
                </h1>
                <p
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".6s"
                  style={{ fontSize: "18px", marginBottom: "30px", color: "#424242" }}
                >
                  Cu ajutorul AI Coach, găsește cel mai potrivit sport pentru copilul tău, descoperă
                  cluburi sportive verificate și consultează specialiști pediatri.
                </p>
                <div
                  className="bd-hero-btn wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".7s"
                >
                  <Link href={routes.quiz.intro} className="bd-btn">
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Începe Chestionarul AI</span>
                      <span className="bd-btn-hover">Începe Chestionarul AI</span>
                    </span>
                  </Link>
                  <Link href={routes.clubs.list} className="bd-btn bd-btn-grey ms-3">
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Explorează Cluburile</span>
                      <span className="bd-btn-hover">Explorează Cluburile</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div id="scene">
                <div className="bd-hero-thumb-3-wrapper p-relative z-index-1" data-depth=".4">
                  <div className="bd-hero-thumb-3 p-relative">
                    <div className="bd-hero-thumb-3-mask">
                      <Image
                        src={heroImg}
                        style={{ width: "auto", height: "100%" }}
                        alt="Copii practicând sport"
                      />
                    </div>
                  </div>
                  <div className="bd-hero-thumb-3-shape d-none d-md-block">
                    <div className="bd-hero-thumb-3-shape-1 p-absolute">
                      <Image
                        src={shape2}
                        style={{ width: "100%", height: "100%" }}
                        alt="decoration"
                      />
                    </div>
                    <div className="bd-hero-thumb-3-shape-2 p-absolute">
                      <Image
                        src={shape3}
                        style={{ width: "100%", height: "100%" }}
                        alt="decoration"
                      />
                    </div>
                    <div className="bd-hero-thumb-3-shape-3 p-absolute">
                      <Image
                        src={shape4}
                        style={{ width: "100%", height: "100%" }}
                        alt="decoration"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bd-hero-3-shape d-none d-lg-block" id="scene2">
        <Image
          data-depth=".5"
          src={shape5}
          style={{ width: "100%", height: "100%" }}
          alt="decoration"
        />
      </div>
    </section>
  );
};

export default HeroYuvoo;
