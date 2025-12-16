/**
 * Home Two Doctor Area Component
 *
 * Alternative homepage section with background image.
 * Adapted from Teacher/HomeTwoTeacherArea.tsx
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import bg from "../../../public/assets/img/bg/teacher-bg.jpg";
import { routes } from "@/lib/routes";
import type { Doctor } from "@/modules/doctors/doctors.types";

interface HomeTwoDoctorAreaProps {
  doctors: Doctor[];
}

const HomeTwoDoctorArea: React.FC<HomeTwoDoctorAreaProps> = ({ doctors }) => {
  if (!doctors || doctors.length === 0) {
    return null;
  }

  // Limit to 4 doctors for this section
  const featuredDoctors = doctors.slice(0, 4);

  return (
    <section className="bd-teacher-area-2 theme-bg">
      <div className="container">
        <div className="bd-teacher-bg-wrapper pt-120 pb-120 p-relative">
          <div
            className="bd-teacher-bg d-none d-xl-block"
            style={{ backgroundImage: `url(${bg.src})` }}
          ></div>
          <div className="bd-teacher-overlay"></div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="bd-section-title-wrapper z-index-1 p-relative is-white text-center mb-55 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".2s"
              >
                <h2 className="bd-section-title mb-0">Specialiștii Noștri Verificați</h2>
                <p>
                  Conectăm părinții cu specialiști medicali verificați, dedicați dezvoltării optime
                  a copiilor prin sport.
                  <br />
                  Fiecare doctor este verificat de echipa Yuvoo pentru a asigura calitatea
                  serviciilor.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="bd-teacher-wrapper">
                <div className="row">
                  {featuredDoctors.map((doctor, index) => (
                    <div className="col-xl-3 col-lg-6 col-md-6" key={doctor.id}>
                      <div
                        className="bd-teacher-2 p-relative z-index-1 mb-40 wow fadeInUp"
                        data-wow-duration="1s"
                        data-wow-delay={`.${(index + 1) * 2}s`}
                      >
                        <Link href={routes.doctors.detail(doctor.slug)}>
                          <div className="bd-teacher-thumb-wrapper-2 mb-20 p-relative">
                            <div className="bd-teacher-thumb-2">
                              <Image
                                src={doctor.image || "/assets/img/placeholder-doctor.jpg"}
                                alt={doctor.name}
                                width={300}
                                height={350}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            </div>
                          </div>
                        </Link>
                        <div className="bd-teacher-content-wrapper-2">
                          <div className="bd-teacher-content-2 text-center">
                            <h4 className="bd-teacher-title-2 mb-5">
                              <Link href={routes.doctors.detail(doctor.slug)}>{doctor.name}</Link>
                            </h4>
                            <span className="bd-teacher-des is-white">
                              {doctor.specialty === "orthopedist"
                                ? "Ortopedie pediatrică"
                                : doctor.specialty === "nutritionist"
                                  ? "Nutriție pediatrică"
                                  : doctor.specialty === "psychologist"
                                    ? "Psihologie pediatrică"
                                    : "Medic pediatru"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bd-teacher-view-btn p-relative z-index-1 text-center mt-10">
                  <Link href={routes.doctors.list}>Vezi toți doctorii</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTwoDoctorArea;
