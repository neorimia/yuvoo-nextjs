import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

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
    microcopy: "Mediu prietenos, perfect pentru începători.",
    verified: true,
  },
  {
    id: 2,
    slug: "sport-club-gimnastica",
    name: "Sport Club Gimnastică",
    image: "/assets/img/class/2.jpg",
    distance: 3.5,
    ageGroups: "4–10 ani",
    tags: ["Program flexibil", "Echipament modern"],
    microcopy: "Dezvoltă coordonarea și flexibilitatea într-un mediu sigur.",
    verified: true,
  },
  {
    id: 3,
    slug: "junior-football-academy",
    name: "Junior Football Academy",
    image: "/assets/img/class/3.jpg",
    distance: 1.8,
    ageGroups: "6–14 ani",
    tags: ["Echipă competitivă", "Antrenor licențiat"],
    microcopy: "Formare completă pentru viitorii fotbaliști.",
    verified: true,
  },
  {
    id: 4,
    slug: "karate-dojo-kids",
    name: "Karate Dojo Kids",
    image: "/assets/img/class/4.jpg",
    distance: 4.2,
    ageGroups: "7–14 ani",
    tags: ["Disciplină tradițională", "Certificare oficială"],
    microcopy: "Dezvoltă respectul și autocontrolul prin arte marțiale.",
    verified: true,
  },
  {
    id: 5,
    slug: "dance-studio-kids",
    name: "Dance Studio Kids",
    image: "/assets/img/class/5.jpg",
    distance: 2.9,
    ageGroups: "4–12 ani",
    tags: ["Multiple stiluri", "Spectacole anuale"],
    microcopy: "Exprimare artistică și dezvoltare a creativității.",
    verified: true,
  },
  {
    id: 6,
    slug: "aqua-kids-swimming",
    name: "Aqua Kids Swimming",
    image: "/assets/img/class/6.jpg",
    distance: 3.1,
    ageGroups: "3–10 ani",
    tags: ["Bazin încălzit", "Grupuri mici"],
    microcopy: "Învățare progresivă într-un mediu sigur și distractiv.",
    verified: true,
  },
];

const FeaturedClubs = () => {
  // Show 3-6 random clubs (for now, showing all 6)
  const displayClubs = featuredClubs.slice(0, 6);

  return (
    <section className="bd-featured-clubs-area pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div
              className="bd-section-title-wrapper text-center mb-60 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h2 className="bd-section-title mb-0">Cluburi verificate lângă tine</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {displayClubs.map((club, index) => (
            <div
              className="col-lg-4 col-md-6 mb-40 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay={`${0.4 + index * 0.1}s`}
              key={club.id}
            >
              <div className="bd-featured-club-card h-100">
                <Link href={routes.clubs.detail(club.slug)}>
                  <div className="bd-featured-club-thumb position-relative mb-20">
                    <div
                      className="bd-featured-club-image-wrapper"
                      style={{ aspectRatio: "16/9", overflow: "hidden", borderRadius: "12px" }}
                    >
                      <Image
                        src={club.image}
                        alt={club.name}
                        width={600}
                        height={338}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        quality={85}
                      />
                    </div>
                    {club.verified && (
                      <div className="bd-featured-club-badge position-absolute top-0 start-0 m-3">
                        <span
                          className="bd-verified-badge"
                          style={{
                            backgroundColor: "var(--bd-theme-1)",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "600",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <i className="fal fa-check-circle" style={{ fontSize: "14px" }}></i>
                          Verificat
                        </span>
                      </div>
                    )}
                    <div className="bd-featured-club-distance position-absolute top-0 end-0 m-3">
                      <span
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "500",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <i className="fal fa-map-marker-alt" style={{ fontSize: "12px" }}></i>
                        {club.distance} km
                      </span>
                    </div>
                  </div>
                  <div className="bd-featured-club-content">
                    <h4 className="bd-featured-club-title mb-15">{club.name}</h4>
                    <div className="bd-featured-club-tags mb-15">
                      <span
                        style={{
                          color: "#424242",
                          fontSize: "14px",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>{club.ageGroups}</span>
                        {club.tags.map((tag, tagIndex) => (
                          <React.Fragment key={tagIndex}>
                            <span style={{ color: "#999" }}>•</span>
                            <span>{tag}</span>
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                    <p
                      className="bd-featured-club-microcopy mb-20"
                      style={{ color: "#424242", fontSize: "16px" }}
                    >
                      {club.microcopy}
                    </p>
                    <div className="bd-featured-club-link">
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
                        Vezi clubul{" "}
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

export default FeaturedClubs;
