/**
 * Home Doctor Area Component
 *
 * Homepage section displaying featured doctors in a slider.
 * Adapted from Teacher/HomeTeacherArea.tsx
 */

"use client";

import React from "react";
import type { Doctor } from "@/modules/doctors/doctors.types";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DoctorCard from "./DoctorCard";

interface HomeDoctorAreaProps {
  doctors: Doctor[];
}

const HomeDoctorArea: React.FC<HomeDoctorAreaProps> = ({ doctors }) => {
  if (!doctors || doctors.length === 0) {
    return null;
  }

  return (
    <section className="bd-teacher-area pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="bd-section-title-wrapper text-center mb-55 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h2 className="bd-section-title mb-0">Specialiștii Noștri Verificați</h2>
              <p>
                Conectăm părinții cu specialiști medicali verificați, dedicați dezvoltării optime a
                copiilor prin sport.
                <br />
                Fiecare doctor este verificat de echipa Yuvoo pentru a asigura calitatea
                serviciilor.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="bd-teacher-active wow fadeInLeft"
              data-wow-duration="1s"
              data-wow-delay=".4s"
            >
              <div>
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={24}
                  loop={false}
                  allowTouchMove={true}
                  observer={true}
                  speed={1000}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                  }}
                  pagination={{
                    clickable: true,
                    el: ".bd-teacher-pagination",
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                    },
                    576: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 3,
                    },
                    1200: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {doctors.map((doctor, index) => {
                    return (
                      <SwiperSlide key={doctor.id}>
                        <DoctorCard
                          doctor={doctor}
                          variant="listing"
                          delay={`.${(index + 1) * 2}s`}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <div className="bd-teacher-pagination bd-dots-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDoctorArea;
