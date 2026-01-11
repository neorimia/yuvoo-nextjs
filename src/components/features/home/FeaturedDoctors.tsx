import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import SectionTitle from "@/components/shared/SectionTitle";
import VerificationBadge from "@/components/features/clubs/VerificationBadge";
import ViewAllLink from "@/components/shared/ViewAllLink";

/**
 * FeaturedDoctors Component
 *
 * Displays featured doctors on the home page with images, verification badges, and specialties.
 * Uses reusable components and follows the design system.
 */

interface IFeaturedDoctor {
  id: number;
  slug: string;
  name: string;
  specialty: string;
  image: string;
  verified: boolean;
  description?: string;
}

const featuredDoctors: IFeaturedDoctor[] = [
  {
    id: 1,
    slug: "dr-raluca-ionescu",
    name: "Dr. Raluca Ionescu",
    specialty: "Pediatrie • Ortopedie sportivă",
    image: "/assets/img/teacher/1.jpg",
    verified: true,
    description: "Specialistă în dezvoltarea fizică a copiilor și prevenirea accidentelor sportive",
  },
  {
    id: 2,
    slug: "dr-mihai-popescu",
    name: "Dr. Mihai Popescu",
    specialty: "Pediatrie • Nutriție sportivă",
    image: "/assets/img/teacher/2.jpg",
    verified: true,
    description: "Expert în nutriție pentru copiii activi și optimizarea performanței sportive",
  },
  {
    id: 3,
    slug: "dr-ana-stan",
    name: "Dr. Ana Stan",
    specialty: "Pediatrie • Psihologie sportivă",
    image: "/assets/img/teacher/3.jpg",
    verified: true,
    description: "Specialistă în dezvoltarea emoțională și motivația copiilor în sport",
  },
  {
    id: 4,
    slug: "dr-cristian-munteanu",
    name: "Dr. Cristian Munteanu",
    specialty: "Pediatrie • Cardiologie sportivă",
    image: "/assets/img/teacher/4.jpg",
    verified: true,
    description: "Expert în evaluarea cardiovasculară pentru copiii care practică sport",
  },
];

const FeaturedDoctors = () => {
  return (
    <section className="bd-featured-doctors-area">
      <div className="container">
        <div className="row bd-featured-doctors-title-row">
          <div className="col-lg-8">
            <SectionTitle
              title="Specialiști în dezvoltarea copiilor, verificați de Yuvoo"
              subtitle={
                <>
                  Conectează-te cu{" "}
                  <Link
                    href={routes.doctors.list}
                    className="text-primary text-decoration-underline"
                  >
                    doctori pediatri verificați
                  </Link>
                  , specializați în dezvoltarea și sănătatea copiilor care practică sport.{" "}
                  <Link href={routes.quiz.intro} className="text-primary text-decoration-underline">
                    Chestionarul AI
                  </Link>{" "}
                  îți va recomanda specialiști când este necesar. Explorează și{" "}
                  <Link
                    href={routes.sports.list}
                    className="text-primary text-decoration-underline"
                  >
                    sporturile disponibile
                  </Link>{" "}
                  și{" "}
                  <Link href={routes.clubs.list} className="text-primary text-decoration-underline">
                    cluburile
                  </Link>
                  .
                </>
              }
              className="bd-featured-doctors-title-wrapper"
              titleClassName="bd-featured-doctors-section-title"
              subtitleClassName="bd-featured-doctors-section-text"
            />
          </div>
        </div>
        <div className="row bd-featured-doctors-cards-row">
          {featuredDoctors.map((doctor) => {
            const animationDelay = `${0.1 * doctor.id}s`;

            return (
              <div
                className="col-lg-3 col-md-6 col-sm-10 bd-featured-doctors-card-col"
                key={doctor.id}
              >
                <Link
                  href={routes.doctors.detail(doctor.slug)}
                  className="bd-featured-doctors-link"
                >
                  <div
                    className="bd-featured-doctors-card wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay={animationDelay}
                  >
                    <div className="bd-featured-doctors-thumb">
                      <div className="bd-featured-doctors-avatar-wrapper">
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          width={150}
                          height={150}
                          className="bd-featured-doctors-avatar"
                        />
                      </div>
                      {doctor.verified && (
                        <div className="bd-featured-doctors-badge">
                          <VerificationBadge verified={doctor.verified} variant="compact" />
                        </div>
                      )}
                    </div>
                    <div className="bd-featured-doctors-content">
                      <h4 className="bd-featured-doctors-name">{doctor.name}</h4>
                      <p className="bd-featured-doctors-specialty">{doctor.specialty}</p>
                      {doctor.description && (
                        <p className="bd-featured-doctors-description">{doctor.description}</p>
                      )}
                      <div className="bd-featured-doctors-link-text">
                        <span>Vezi profilul</span>
                        <i className="fal fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="row justify-content-end bd-featured-doctors-view-all-row">
          <ViewAllLink href={routes.doctors.list} text="Vezi toți doctorii" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
