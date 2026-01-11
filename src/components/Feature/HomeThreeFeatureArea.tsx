import React from "react";
import Image from "next/image";
import shape from "../../../public/assets/img/shape/wave-section-break.png";

interface IFeatureItem {
  id: number;
  title: string;
  teaser: string;
  iconStyle: string;
  icon: string;
}

interface IHomeThreeFeatureAreaProps {
  wave?: boolean;
}

const features: IFeatureItem[] = [
  {
    id: 1,
    title: "Recomandări AI",
    teaser:
      "Recomandări personalizate bazate pe profilul copilului tău, generate de AI prin analiza pattern-urilor și a mii de profiluri similare pentru precizie mare.",
    iconStyle: "icon-1",
    icon: "flaticon-exclusive",
  },
  {
    id: 2,
    title: "Cluburi Sportive",
    teaser:
      "Bază de date cu peste 500 de cluburi sportive, cu informații complete despre facilități și antrenori.",
    iconStyle: "icon-2",
    icon: "flaticon-humanitarian-help",
  },
  // {
  //   id: 3,
  //   title: "Specialiști Pediatri",
  //   teaser:
  //     "Acces la rețeaua de specialiști pediatri pentru consultații legate de sport și dezvoltarea copilului.",
  //   iconStyle: "icon-3",
  //   icon: "flaticon-like-1",
  // },
  {
    id: 4,
    title: "Personalizat",
    teaser:
      "Fiecare copil este unic. Yuvoo oferă recomandări adaptate personalității, intereselor și ritmului de dezvoltare.",
    iconStyle: "icon-4",
    icon: "flaticon-delivery",
  },
];

const HomeThreeFeatureArea: React.FC<IHomeThreeFeatureAreaProps> = ({ wave }) => {
  return (
    <div className="bd-feature-area p-relative theme-bg pt-120 pb-120">
      {wave && (
        <div className="bd-feature-bottom-shape">
          <Image src={shape} style={{ width: "100%", height: "100%" }} alt="" />
        </div>
      )}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div
              className="bd-section-title-wrapper is-white text-center mb-55 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h2 className="bd-section-title mb-0">De ce Yuvoo</h2>
              <p>
                Platformă completă pentru descoperirea sporturilor potrivite copilului tău.
                <br />
                De la recomandări AI la cluburi sportive și specialiști pediatri.
              </p>
            </div>
          </div>
        </div>
        <div
          className="bd-feature-wrapper wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".4s"
        >
          <div className="row">
            <div className="col-12">
              <ul className="feature">
                {features.map((item, index) => (
                  <li className="feature-item" key={index}>
                    <div className="bd-feature">
                      <div className="bd-feature-content">
                        <div className={`bd-feature-icon ${item.iconStyle}`}>
                          <i className={item.icon}></i>
                        </div>
                        <h4 className="bd-feature-title">{item.title}</h4>
                        <p>{item.teaser}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeThreeFeatureArea;
