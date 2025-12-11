"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import promotion from "../../../public/assets/img/promotion/1.png";
import line from "../../../public/assets/img/shape/tripple-line.png";
import { useVideoModal } from "@/provider/VideoProvider";
import factData from "@/data/fact-data";
import CountUpContent from "../Common/CounterUp/CountUpContent";
import { routes } from "@/lib/routes";

interface HomePromAreaProps {
  promoImg?: StaticImageData;
  promo_space?: string;
}

const HomePromotionArea: React.FC<HomePromAreaProps> = ({ promoImg, promo_space }) => {
  const { playVideo } = useVideoModal();
  return (
    <section
      className={`bd-promotion-area ${promo_space ? promo_space : "pb-60"}`}
      id="bd-promotion-area"
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 order-2 order-xl-1 d-none d-xl-block">
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
                    src={promoImg ? promoImg : promotion}
                    style={{ width: "100%", height: "100%" }}
                    alt="Copii practicând sport"
                  />
                  <div className="panel wow"></div>
                </div>
              </div>
              <div className="bd-promotion-shape d-none d-lg-block">
                <Image src={line} style={{ width: "100%", height: "100%" }} alt="" />
              </div>
            </div>
          </div>
          <div className="col-xl-6 order-1 order-xl-2">
            <div
              className="bd-promotion mb-60 wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <div className="bd-section-title-wrapper mb-35">
                <h2 className="bd-section-title mb-10">Cel mai bun pentru copilul tău</h2>
                {promo_space && (
                  <span>
                    Descoperă sportul potrivit pentru copilul tău cu ajutorul tehnologiei AI și al
                    expertizei specialiștilor pediatrici.
                  </span>
                )}
                <p>
                  Fiecare copil este unic și merită să găsească activitatea sportivă care îi
                  corespunde perfect. Yuvoo te ajută să descoperi sporturile ideale bazate pe
                  personalitatea, interesele și ritmul de dezvoltare al copilului tău.
                </p>
              </div>
              {!promo_space && (
                <div className="bd-promotion-counter-wrapper mb-40">
                  {factData.slice(0, 3).map((item, index) => (
                    <div
                      className="bd-promotion-counter d-flex align-items-center gap-3 flex-md-column"
                      key={index}
                    >
                      <div className="bd-promotion-counter-content min-w-[110px]">
                        <CountUpContent number={item?.count} add_style={false} text={item.text} />
                      </div>
                      <div className="bd-promotion-counter-text d-flex flex-column flex-md-row gap-1">
                        <span className=" fw-semibold">{item.title}</span>
                        <span className=" ">{item.subTitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="bd-promotion-list mb-50">
                <ul>
                  <li>
                    Recomandări personalizate bazate pe AI și validate de specialiști pediatrici.
                  </li>
                  <li>
                    Bază de date cu peste 500 de cluburi sportive verificate și specialiști
                    pediatri.
                  </li>
                </ul>
              </div>
              <div className="bd-promotion-btn-wrapper flex-wrap">
                <div className="bd-promotion-btn">
                  <Link href={routes.quiz.intro} className="bd-btn">
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Începe Quiz-ul</span>
                      <span className="bd-btn-hover">Începe Quiz-ul</span>
                    </span>
                  </Link>
                </div>
                <div className="bd-promotion-btn-2 bd-pulse-btn btn-2">
                  <button
                    type="button"
                    className="popup-video"
                    onClick={() => playVideo("go7QYaQR494", "youtube")}
                  >
                    <i className="flaticon-play-button"></i> Video Promoțional
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePromotionArea;
