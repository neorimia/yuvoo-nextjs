import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface IFeaturedDoctor {
  id: number;
  slug: string;
  name: string;
  specialty: string;
  image: string;
  verified: boolean;
}

const featuredDoctors: IFeaturedDoctor[] = [
  {
    id: 1,
    slug: "dr-raluca-ionescu",
    name: "Dr. Raluca Ionescu",
    specialty: "Pediatrie • Ortopedie sportivă",
    image: "/assets/img/teacher/1.jpg",
    verified: true,
  },
  {
    id: 2,
    slug: "dr-mihai-popescu",
    name: "Dr. Mihai Popescu",
    specialty: "Pediatrie • Nutriție sportivă",
    image: "/assets/img/teacher/2.jpg",
    verified: true,
  },
  {
    id: 3,
    slug: "dr-ana-stan",
    name: "Dr. Ana Stan",
    specialty: "Pediatrie • Psihologie sportivă",
    image: "/assets/img/teacher/3.jpg",
    verified: true,
  },
  {
    id: 4,
    slug: "dr-cristian-munteanu",
    name: "Dr. Cristian Munteanu",
    specialty: "Pediatrie • Cardiologie sportivă",
    image: "/assets/img/teacher/4.jpg",
    verified: true,
  },
];

const FeaturedDoctors = () => {
  return (
    <section className="bd-featured-doctors-area pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div
              className="bd-section-title-wrapper text-center mb-60 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h2 className="bd-section-title mb-0">
                Specialiști în dezvoltarea copiilor, verificați de Yuvoo
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {featuredDoctors.map((doctor, index) => (
            <div
              className="col-lg-3 col-md-6 mb-40 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay={`${0.4 + index * 0.1}s`}
              key={doctor.id}
            >
              <div className="bd-featured-doctor-card h-100 text-center">
                <Link href={routes.doctors.detail(doctor.slug)}>
                  <div className="bd-featured-doctor-thumb mb-20 position-relative">
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        margin: "0 auto",
                        border: "4px solid var(--bd-theme-1)",
                      }}
                    >
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={150}
                        height={150}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    {doctor.verified && (
                      <div
                        className="position-absolute"
                        style={{
                          bottom: "0",
                          left: "50%",
                          transform: "translateX(-50%)",
                          marginBottom: "-15px",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "var(--bd-theme-1)",
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <i className="fal fa-check-circle" style={{ fontSize: "12px" }}></i>
                          Verificat
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="bd-featured-doctor-content" style={{ marginTop: "25px" }}>
                    <h4 className="bd-featured-doctor-name mb-10" style={{ fontWeight: "600" }}>
                      {doctor.name}
                    </h4>
                    <p
                      className="bd-featured-doctor-specialty mb-20"
                      style={{ color: "#686868", fontSize: "14px" }}
                    >
                      {doctor.specialty}
                    </p>
                    <div className="bd-featured-doctor-link">
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
                        Vezi profilul{" "}
                        <i className="fal fa-arrow-right" style={{ fontSize: "12px" }}></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-end mt-20">
          <div className="col-auto">
            <Link
              href={routes.doctors.list}
              className="bd-secondary-link"
              style={{
                color: "var(--bd-theme-1)",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Vezi toți doctorii <i className="fal fa-arrow-right" style={{ fontSize: "14px" }}></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
