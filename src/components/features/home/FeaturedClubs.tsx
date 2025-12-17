import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import VerificationBadge from "@/components/features/clubs/VerificationBadge";
import DistanceBadge from "@/components/shared/DistanceBadge";
import SectionTitle from "@/components/shared/SectionTitle";
import ViewAllLink from "@/components/shared/ViewAllLink";

/**
 * FeaturedClubs Component
 *
 * Displays featured clubs on the home page with images, verification badges, distance, and descriptions.
 * Uses reusable components (VerificationBadge, DistanceBadge) and follows the design system.
 */

interface IFeaturedClub {
  id: number;
  slug: string;
  name: string;
  image: string;
  distance: number;
  ageGroups: string;
  tags: string[];
  microcopy: string;
  verified: boolean;
  sportName?: string;
}

const featuredClubs: IFeaturedClub[] = [
  {
    id: 1,
    slug: "blue-waves-swim-academy",
    name: "Blue Waves Swim Academy",
    image: "/assets/img/class/1.jpg",
    distance: 2.1,
    ageGroups: "5–12 ani",
    tags: ["Program intensiv", "Instructor acreditat"],
    microcopy:
      "Mediu prietenos și sigur, perfect pentru începători. Programe adaptate pentru toate nivelurile.",
    verified: true,
    sportName: "Înot",
  },
  {
    id: 2,
    slug: "sport-club-gimnastica",
    name: "Sport Club Gimnastică",
    image: "/assets/img/class/2.jpg",
    distance: 3.5,
    ageGroups: "4–10 ani",
    tags: ["Program flexibil", "Echipament modern"],
    microcopy:
      "Dezvoltă coordonarea și flexibilitatea într-un mediu sigur și profesional. Antrenori experimentați.",
    verified: true,
    sportName: "Gimnastică",
  },
  {
    id: 3,
    slug: "junior-football-academy",
    name: "Junior Football Academy",
    image: "/assets/img/class/3.jpg",
    distance: 1.8,
    ageGroups: "6–14 ani",
    tags: ["Echipă competitivă", "Antrenor licențiat"],
    microcopy:
      "Formare completă pentru viitorii fotbaliști. Programe de dezvoltare tehnică și tactică.",
    verified: true,
    sportName: "Fotbal",
  },
  {
    id: 4,
    slug: "karate-dojo-kids",
    name: "Karate Dojo Kids",
    image: "/assets/img/class/4.jpg",
    distance: 4.2,
    ageGroups: "7–14 ani",
    tags: ["Disciplină tradițională", "Certificare oficială"],
    microcopy:
      "Dezvoltă respectul și autocontrolul prin arte marțiale tradiționale. Metodologie dovedită.",
    verified: true,
    sportName: "Karate",
  },
  {
    id: 5,
    slug: "dance-studio-kids",
    name: "Dance Studio Kids",
    image: "/assets/img/class/5.jpg",
    distance: 2.9,
    ageGroups: "4–12 ani",
    tags: ["Multiple stiluri", "Spectacole anuale"],
    microcopy:
      "Exprimare artistică și dezvoltare a creativității. Oferim multiple stiluri de dans pentru toate preferințele.",
    verified: true,
    sportName: "Dans",
  },
  {
    id: 6,
    slug: "aqua-kids-swimming",
    name: "Aqua Kids Swimming",
    image: "/assets/img/class/6.jpg",
    distance: 3.1,
    ageGroups: "3–10 ani",
    tags: ["Bazin încălzit", "Grupuri mici"],
    microcopy:
      "Învățare progresivă într-un mediu sigur și distractiv. Bazin încălzit și grupuri mici pentru atenție individuală.",
    verified: true,
    sportName: "Înot",
  },
];

const FeaturedClubs = () => {
  // Show 3-6 random clubs (for now, showing all 6)
  const displayClubs = featuredClubs.slice(0, 6);

  return (
    <section className="bd-featured-clubs-area">
      <div className="container">
        <div className="row bd-featured-clubs-title-row">
          <div className="col-lg-8">
            <SectionTitle
              title="Cluburi verificate lângă tine"
              subtitle="Descoperă cele mai bune cluburi sportive verificate din apropierea ta. Toate cluburile sunt verificate de echipa noastră pentru siguranță și calitate."
              className="bd-featured-clubs-title-wrapper"
              titleClassName="bd-featured-clubs-section-title"
              subtitleClassName="bd-featured-clubs-section-text"
            />
          </div>
        </div>
        <div className="row bd-featured-clubs-cards-row">
          {displayClubs.map((club) => {
            const animationDelay = `${0.1 * club.id}s`;

            return (
              <div className="col-lg-4 col-md-6 col-sm-10 bd-featured-clubs-card-col" key={club.id}>
                <Link href={routes.clubs.detail(club.slug)} className="bd-featured-clubs-link">
                  <div
                    className="bd-featured-clubs-card wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay={animationDelay}
                  >
                    <div className="bd-featured-clubs-thumb">
                      <div className="bd-featured-clubs-image-wrapper">
                        <Image
                          src={club.image}
                          alt={club.name}
                          width={600}
                          height={338}
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          className="bd-featured-clubs-image"
                          quality={85}
                        />
                      </div>
                      {club.verified && (
                        <div className="bd-featured-clubs-badge">
                          <VerificationBadge verified={club.verified} variant="compact" />
                        </div>
                      )}
                      <div className="bd-featured-clubs-distance">
                        <DistanceBadge distance={club.distance} variant="dark" />
                      </div>
                    </div>
                    <div className="bd-featured-clubs-content">
                      <h4 className="bd-featured-clubs-title">{club.name}</h4>
                      <div className="bd-featured-clubs-meta">
                        <span className="bd-featured-clubs-age-groups">{club.ageGroups}</span>
                        {club.tags.map((tag, tagIndex) => (
                          <React.Fragment key={tagIndex}>
                            <span className="bd-featured-clubs-meta-separator">•</span>
                            <span className="bd-featured-clubs-tag">{tag}</span>
                          </React.Fragment>
                        ))}
                      </div>
                      <p className="bd-featured-clubs-microcopy">{club.microcopy}</p>
                      <div className="bd-featured-clubs-link-text">
                        <span>Vezi clubul</span>
                        <i className="fal fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="row justify-content-end bd-featured-clubs-view-all-row">
          <ViewAllLink href={routes.clubs.list} text="Vezi toate cluburile" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedClubs;
