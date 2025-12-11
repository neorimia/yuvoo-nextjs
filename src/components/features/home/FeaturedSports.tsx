import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface IFeaturedSport {
  id: number;
  slug: string;
  title: string;
  clubCount: number;
  microcopy: string;
  image: string;
}

const featuredSports: IFeaturedSport[] = [
  {
    id: 1,
    slug: "inot",
    title: "Înot",
    clubCount: 120,
    microcopy: "Perfect pentru dezvoltarea armonioasă și siguranță în apă.",
    image: "/assets/img/program/home-program-1.jpg",
  },
  {
    id: 2,
    slug: "gimnastica",
    title: "Gimnastică",
    clubCount: 85,
    microcopy: "Dezvoltă flexibilitatea, coordonarea și disciplina.",
    image: "/assets/img/program/home-program-2.jpg",
  },
  {
    id: 3,
    slug: "fotbal",
    title: "Fotbal",
    clubCount: 200,
    microcopy: "Cel mai popular sport de echipă pentru copii.",
    image: "/assets/img/program/home-program-3.jpg",
  },
  {
    id: 4,
    slug: "karate",
    title: "Karate",
    clubCount: 65,
    microcopy: "Dezvoltă respectul, disciplina și autocontrolul.",
    image: "/assets/img/program/home-program-4.jpg",
  },
  {
    id: 5,
    slug: "dans",
    title: "Dans",
    clubCount: 95,
    microcopy: "Exprimare artistică și dezvoltare a coordonării.",
    image: "/assets/img/program/home-program-5.jpg",
  },
  {
    id: 6,
    slug: "baschet",
    title: "Baschet",
    clubCount: 110,
    microcopy: "Dezvoltă coordonarea, strategia și echipa.",
    image: "/assets/img/program/home-program-5.jpg",
  },
];

const FeaturedSports = () => {
  return (
    <section className="bd-featured-sports-area pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div
              className="bd-section-title-wrapper text-center mb-60 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h2 className="bd-section-title mb-0">Sporturile preferate de părinți</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {featuredSports.map((sport, index) => (
            <div
              className="col-lg-4 col-md-6 mb-40 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay={`${0.4 + index * 0.1}s`}
              key={sport.id}
            >
              <div className="bd-featured-sport-card h-100">
                <Link href={routes.sports.detail(sport.slug)}>
                  <div className="bd-featured-sport-thumb position-relative mb-20">
                    <div
                      className="bd-featured-sport-image-wrapper"
                      style={{ aspectRatio: "4/3", overflow: "hidden", borderRadius: "12px" }}
                    >
                      <Image
                        src={sport.image}
                        alt={`Copil practicând ${sport.title.toLowerCase()}`}
                        width={400}
                        height={300}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className="bd-featured-sport-chip position-absolute top-0 end-0 m-3">
                      <span
                        className="bd-chip"
                        style={{
                          backgroundColor: "var(--bd-theme-1)",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {sport.clubCount} cluburi
                      </span>
                    </div>
                  </div>
                  <div className="bd-featured-sport-content">
                    <h4 className="bd-featured-sport-title mb-15">{sport.title}</h4>
                    <p
                      className="bd-featured-sport-microcopy mb-20"
                      style={{ color: "#424242", fontSize: "16px" }}
                    >
                      {sport.microcopy}
                    </p>
                    <div className="bd-featured-sport-link">
                      <span
                        style={{
                          color: "var(--bd-theme-1)",
                          fontSize: "14px",
                          fontWeight: "600",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        Vezi cluburile{" "}
                        <i className="fal fa-arrow-right" style={{ fontSize: "12px" }}></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSports;
