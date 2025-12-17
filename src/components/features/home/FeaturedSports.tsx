import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";
import ViewAllLink from "@/components/shared/ViewAllLink";

/**
 * FeaturedSports Component
 *
 * Displays featured sports on the home page with images, club counts, and descriptions.
 * Uses Flaticon icons and follows the design system.
 */

interface IFeaturedSport {
  id: number;
  slug: string;
  title: string;
  clubCount: number;
  microcopy: string;
  image: string;
  icon: string;
}

const featuredSports: IFeaturedSport[] = [
  {
    id: 1,
    slug: "inot",
    title: "Înot",
    clubCount: 120,
    microcopy:
      "Dezvoltă coordonarea, rezistența și siguranța în apă. Perfect pentru copiii de toate vârstele.",
    image: "/assets/img/program/home-program-1.jpg",
    icon: "flaticon-sports",
  },
  {
    id: 2,
    slug: "gimnastica",
    title: "Gimnastică",
    clubCount: 85,
    microcopy:
      "Dezvoltă flexibilitatea, forța, coordonarea și disciplina. Ideal pentru copiii activi și energici.",
    image: "/assets/img/program/home-program-2.jpg",
    icon: "flaticon-sports",
  },
  {
    id: 3,
    slug: "fotbal",
    title: "Fotbal",
    clubCount: 200,
    microcopy:
      "Cel mai popular sport de echipă. Dezvoltă spiritul de echipă, strategia și coordonarea.",
    image: "/assets/img/program/home-program-3.jpg",
    icon: "flaticon-sports",
  },
  {
    id: 4,
    slug: "karate",
    title: "Karate",
    clubCount: 65,
    microcopy:
      "Dezvoltă respectul, disciplina, autocontrolul și încrederea în sine. Excelent pentru concentrare.",
    image: "/assets/img/program/home-program-4.jpg",
    icon: "flaticon-sports",
  },
  {
    id: 5,
    slug: "dans",
    title: "Dans",
    clubCount: 95,
    microcopy:
      "Exprimare artistică, creativitate și dezvoltare a coordonării. Perfect pentru copiii creativi.",
    image: "/assets/img/program/home-program-5.jpg",
    icon: "flaticon-color-palette",
  },
  {
    id: 6,
    slug: "baschet",
    title: "Baschet",
    clubCount: 110,
    microcopy:
      "Dezvoltă coordonarea, strategia, spiritul de echipă și agilitatea. Sport dinamic și captivant.",
    image: "/assets/img/program/home-program-5.jpg",
    icon: "flaticon-sports",
  },
];

const FeaturedSports = () => {
  return (
    <section className="bd-featured-sports-area">
      <div className="container">
        <div className="row bd-featured-sports-title-row">
          <div className="col-lg-8">
            <SectionTitle
              title="Sporturile preferate de părinți"
              subtitle={
                <>
                  Descoperă cele mai populare sporturi pentru copiii tăi. Explorează{" "}
                  <Link
                    href={routes.sports.list}
                    className="text-primary text-decoration-underline"
                  >
                    toate sporturile disponibile
                  </Link>{" "}
                  și{" "}
                  <Link href={routes.clubs.list} className="text-primary text-decoration-underline">
                    găsește cluburi verificate
                  </Link>{" "}
                  în apropierea ta. Sau începe cu{" "}
                  <Link href={routes.quiz.intro} className="text-primary text-decoration-underline">
                    chestionarul AI
                  </Link>{" "}
                  pentru recomandări personalizate.
                </>
              }
              className="bd-featured-sports-title-wrapper"
              titleClassName="bd-featured-sports-section-title"
              subtitleClassName="bd-featured-sports-section-text"
            />
          </div>
        </div>
        <div className="row bd-featured-sports-cards-row">
          {featuredSports.map((sport) => {
            const animationDelay = `${0.1 * sport.id}s`;

            return (
              <div
                className="col-lg-4 col-md-6 col-sm-10 bd-featured-sports-card-col"
                key={sport.id}
              >
                <Link href={routes.sports.detail(sport.slug)} className="bd-featured-sports-link">
                  <div
                    className="bd-featured-sports-card wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay={animationDelay}
                  >
                    <div className="bd-featured-sports-thumb">
                      <div className="bd-featured-sports-image-wrapper">
                        <Image
                          src={sport.image}
                          alt={`Copil practicând ${sport.title.toLowerCase()}`}
                          width={400}
                          height={300}
                          className="bd-featured-sports-image"
                        />
                      </div>
                      <div className="bd-featured-sports-chip">
                        <span className="bd-featured-sports-chip-text">
                          {sport.clubCount} cluburi
                        </span>
                      </div>
                      <div className="bd-featured-sports-icon">
                        <i className={sport.icon}></i>
                      </div>
                    </div>
                    <div className="bd-featured-sports-content">
                      <h4 className="bd-featured-sports-title">{sport.title}</h4>
                      <p className="bd-featured-sports-microcopy">{sport.microcopy}</p>
                      <div className="bd-featured-sports-link-text">
                        <span>Vezi cluburile</span>
                        <i className="fal fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="row justify-content-end bd-featured-sports-view-all-row">
          <ViewAllLink href={routes.sports.list} text="Vezi toate sporturile" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedSports;
