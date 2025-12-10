/**
 * Home Club Area Component
 *
 * Homepage section displaying featured clubs.
 * Adapted from Class/HomeClassArea.tsx
 */

"use client";

import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Club } from "@/modules/clubs/clubs.types";
import VerificationBadge from "./VerificationBadge";

interface HomeClubAreaProps {
  clubs: Club[];
}

const HomeClubArea: React.FC<HomeClubAreaProps> = ({ clubs }) => {
  const featuredClubs = clubs.slice(0, 6); // Show first 6 clubs

  return (
    <section className="bd-club-area pt-110 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="bd-section-title-wrapper text-center mb-55 wow fadeInUp">
              <h2 className="bd-section-title mb-0">Cluburi Sportive Verificate</h2>
              <p>
                Descoperă cele mai bune cluburi sportive pentru copiii tăi
                <br />
                Verificate și recomandate de specialiști
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="bd-club-active wow fadeInUp">
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
                    slidesPerView: 3,
                  },
                }}
              >
                {featuredClubs.map((club) => {
                  const mainImage = club.images?.[0] || "/assets/img/placeholder-club.jpg";

                  return (
                    <SwiperSlide key={club.id}>
                      <div className="bd-club-wrapper text-center">
                        <div className="bd-club">
                          <div className="bd-club-thumb position-relative">
                            {mainImage && (
                              <Image
                                src={mainImage}
                                alt={club.name}
                                width={400}
                                height={300}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                            {club.verified && (
                              <div className="position-absolute top-0 end-0 m-3">
                                <VerificationBadge verified={club.verified} />
                              </div>
                            )}
                          </div>
                          <div className="bd-club-content">
                            <div className="bd-club-sport-icon mb-3">
                              <i className="flaticon-sports"></i>
                            </div>
                            <h3 className="bd-club-title">
                              <Link href={routes.clubs.detail(club.slug)}>{club.name}</Link>
                            </h3>
                            <p className="mb-3">{club.description?.substring(0, 80)}...</p>
                            <div className="bd-club-meta mb-3">
                              <div className="bd-club-location">
                                <i className="flaticon-location"></i>
                                <span className="ms-2">{club.location.city}</span>
                              </div>
                              {club.ageGroups && club.ageGroups.length > 0 && (
                                <div className="bd-club-age ms-3">
                                  <i className="flaticon-calendar"></i>
                                  <span className="ms-2">
                                    {club.ageGroups[0]}-{club.ageGroups[club.ageGroups.length - 1]}{" "}
                                    ani
                                  </span>
                                </div>
                              )}
                            </div>
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
            <div className="bd-club-pagination bd-dots-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeClubArea;
