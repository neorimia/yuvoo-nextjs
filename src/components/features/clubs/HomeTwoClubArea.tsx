/**
 * Home Two Club Area Component
 *
 * Alternative homepage section displaying clubs in a carousel format.
 * Adapted from Class/HomeTwoClassArea.tsx
 */

"use client";

import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Club } from "@/modules/clubs/clubs.types";

interface HomeTwoClubAreaProps {
  clubs: Club[];
}

const HomeTwoClubArea: React.FC<HomeTwoClubAreaProps> = ({ clubs }) => {
  const featuredClubs = clubs?.slice(0, 4) || []; // Show first 4 clubs

  // If no clubs, show a message
  if (featuredClubs.length === 0) {
    return (
      <section className="bd-club-area pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="bd-section-title-wrapper text-center mb-55 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".2s"
              >
                <h2 className="bd-section-title mb-0">Ofertele Noastre</h2>
                <p>
                  Descoperă cele mai bune cluburi sportive pentru copiii tăi
                  <br />
                  Programe adaptate pentru vârstele 4-14 ani
                </p>
                <div className="mt-4">
                  <Link href={routes.clubs.list} className="bd-btn">
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">Vezi toate cluburile</span>
                      <span className="bd-btn-hover">Vezi toate cluburile</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bd-club-area pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="bd-section-title-wrapper text-center mb-55 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".2s"
            >
              <h2 className="bd-section-title mb-0">Ofertele Noastre</h2>
              <p>
                Descoperă cele mai bune cluburi sportive pentru copiii tăi
                <br />
                Programe adaptate pentru vârstele 4-14 ani
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="bd-club-active-2 wow fadeInUp"
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
                    delay: 3000,
                    disableOnInteraction: true,
                  }}
                  pagination={{
                    clickable: true,
                    el: ".bd-club-pagination",
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 2,
                    },
                    1200: {
                      slidesPerView: 2,
                    },
                  }}
                >
                  {featuredClubs.map((club) => {
                    return (
                      <SwiperSlide key={club.id}>
                        <div className="bd-club-wrapper-2 text-center">
                          <div className="bd-club-2">
                            <div className="bd-club-icon-wrapper">
                              <div className="bd-club-icon-2">
                                <i className="flaticon-sports"></i>
                              </div>
                            </div>
                            <div className="bd-club-content">
                              <h3 className="bd-club-title">
                                <Link href={routes.clubs.detail(club.slug)}>{club.name}</Link>
                              </h3>
                              <p>
                                {club.description?.substring(0, 55) || "Club sportiv pentru copii"}
                                {club.description && club.description.length > 55 ? "..." : ""}
                              </p>
                              <div className="bd-club-btn">
                                <Link
                                  href={routes.clubs.detail(club.slug)}
                                  className="bd-btn bd-btn-grey"
                                >
                                  <span className="bd-btn-inner">
                                    <span className="bd-btn-normal">Vezi detalii</span>
                                    <span className="bd-btn-hover">Vezi detalii</span>
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            <div className="bd-club-pagination bd-dots-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTwoClubArea;
