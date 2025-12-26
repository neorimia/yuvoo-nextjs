import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";
import { getFeaturedSports, SportData } from "@/lib/db/seed-data/sports";

/**
 * FeaturedSports Component
 *
 * Displays featured sports on the home page with images, club counts, and descriptions.
 * Uses Flaticon icons and follows the design system.
 */

interface IFeaturedSport {
  id: string;
  slug: string;
  title: string;
  clubCount: number;
  microcopy: string;
  image: string;
  icon: string;
}

const featuredSports: IFeaturedSport[] = getFeaturedSports()
  .slice(0, 6)
  .map(
    (sport: SportData) =>
      ({
        id: sport.id,
        slug: sport.slug,
        title: sport.name,
        clubCount: 0,
        microcopy: sport.description,
        image: sport.image || "",
        icon: sport.icon || "",
      }) as IFeaturedSport
  );

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
                    className="text-yuvoo-primary text-decoration-underline"
                  >
                    toate sporturile disponibile
                  </Link>{" "}
                  și{" "}
                  <Link
                    href={routes.clubs.list}
                    className="text-yuvoo-primary text-decoration-underline"
                  >
                    găsește cluburi verificate
                  </Link>{" "}
                  în apropierea ta. Sau începe cu{" "}
                  <Link
                    href={routes.quiz.intro}
                    className="text-yuvoo-primary text-decoration-underline"
                  >
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
            const animationDelay = `${0.1 * Number(sport.id)}s`;

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
                      {/* TODO: Add club count */}
                      {/* <div className="bd-featured-sports-chip">
                        <span className="bd-featured-sports-chip-text">
                          {sport.clubCount} cluburi
                        </span>
                      </div> */}
                      <div className="bd-featured-sports-icon">
                        <i className={sport.icon}></i>
                      </div>
                    </div>
                    <div className="bd-featured-sports-content">
                      <h4 className="bd-featured-sports-title">{sport.title}</h4>
                      <p className="bd-featured-sports-microcopy">{sport.microcopy}</p>
                      <div className="bd-featured-sports-link-text">
                        <span>Vezi detalii</span>
                        <i className="fal fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSports;
