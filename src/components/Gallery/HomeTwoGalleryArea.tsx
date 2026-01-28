"use client";

import { gallaryData } from "@/data";
import Image from "next/image";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeTwoGalleryArea = () => {
  return (
    <PhotoProvider>
      <section className="bd-gallery-area p-relative pt-120 pb-60 theme-bg-6 p-relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="bd-section-title-wrapper mb-55 text-center wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".3s"
              >
                <h2 className="bd-section-title mb-0">See our gallery</h2>
                <p>
                  It is our goal to provide age appropriate opportuniy for every child enrolled in
                  Kindedo Kids Club enrichment classes.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div
                className="bd-gallery-active wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".5s"
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
                      el: ".bd-gallery-pagination",
                    }}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
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
                    {gallaryData.slice(0, 5).map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="bd-gallery">
                            <div className="bd-gallery-thumb-wrapper">
                              <PhotoView src={item.img.src}>
                                <div className="bd-gallery-thumb">
                                  <Image
                                    src={item.img}
                                    style={{ width: "100%", height: "100%" }}
                                    alt="img not found"
                                  />
                                </div>
                              </PhotoView>
                              <div className="bd-gallery-icon d-none">
                                <button type="button" className="popup-image">
                                  <i className="flaticon-eye"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
              <div
                className="bd-gallery-pagination bd-dots-pagination fill-pagination wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".4s"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </PhotoProvider>
  );
};

export default HomeTwoGalleryArea;
