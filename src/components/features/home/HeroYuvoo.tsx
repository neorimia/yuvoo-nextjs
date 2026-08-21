import Image from "next/image";
import Link from "next/link";
import React from "react";
import { routes } from "@/lib/routes";
import { externalLinks } from "@/lib/routes";
import shape1 from "../../../../public/assets/img/shape/curved-line-2.png";
import heroImg from "../../../../public/assets/img/hero/hero-3.jpg";
import shape2 from "../../../../public/assets/img/shape/home-3-shape-1.png";
import shape3 from "../../../../public/assets/img/shape/home-3-shape-2.png";
import shape4 from "../../../../public/assets/img/shape/home-3-shape-3.png";
import shape5 from "../../../../public/assets/img/shape/hero-3-shape-4.png";

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
          <a href={externalLinks.instagram} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>instagram
          </a>
        </div>
        <div className="bd-hero-social">
          <a href={externalLinks.tiktok} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-tiktok"></i>tiktok
          </a>
        </div>
        <div className="bd-hero-social">
          <a href={externalLinks.twitter} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-twitter"></i>twitter
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
                <h1
                  className="bd-hero-title wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".5s"
                >
                  Găsește sportul potrivit pentru copilul tău
                </h1>
                <p
                  className="wow fadeInUp text-yuvoo-body"
                  data-wow-duration="1s"
                  data-wow-delay=".6s"
                  style={{ fontSize: "18px", marginBottom: "30px" }}
                >
                  Recomandări personalizate bazate pe personalitatea, interesul și ritmul de
                  dezvoltare al copilului, generate de AI prin analiza pattern-urilor și profilului
                  unic al fiecărui copil.
                </p>
                <div
                  className="bd-hero-btn wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".7s"
                >
                  <Link href={routes.quiz.intro} className="bd-btn">
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Începe Quiz-ul</span>
                      <span className="bd-btn-hover">Începe Quiz-ul</span>
                    </span>
                  </Link>
                  <Link href={routes.clubs.list} className="bd-hero-secondary-link">
                    Vreau doar să explorez cluburile
                  </Link>
                </div>
                {/*<div*/}
                {/*  className="bd-hero-trust-tag wow fadeInUp"*/}
                {/*  data-wow-duration="1s"*/}
                {/*  data-wow-delay=".8s"*/}
                {/*  style={{*/}
                {/*    marginTop: "30px",*/}
                {/*    fontSize: "14px",*/}
                {/*    color: "#6B6B6B",*/}
                {/*    fontWeight: 400,*/}
                {/*  }}*/}
                {/*>*/}
                {/*  Peste 5.000 de familii au folosit deja Yuvoo*/}
                {/*</div>*/}
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
                        alt="Copil zâmbind la un sport"
                        priority
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
