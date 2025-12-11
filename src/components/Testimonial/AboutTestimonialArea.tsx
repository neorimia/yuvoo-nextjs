"use client";

import Image from 'next/image';
import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import wave from "../../../public/assets/img/shape/wave-section-break.png";
import testimonialData from '@/data/testimonial-data';

const AboutTestimonialArea = () => {
    return (
        <section className="bd-testimonial-area-2 pb-120 p-relative pt-120 theme-bg">
            <div className="bd-testimonial-bottom-shape">
                <Image src={wave} style={{ width: "100%", height: "100%" }} alt="img not found" />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="bd-section-title-wrapper is-white z-index-1 p-relative text-center mb-55 wow fadeInUp"
                            data-wow-duration="1s" data-wow-delay=".3s">
                            <h2 className="bd-section-title mb-0">Parents Says</h2>
                            <p>With the help of teachers and the environment as the third teacher, students<br /> have
                                opportunities to confidently take risks.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="bd-testimonial-active-2 wow fadeInUp" data-wow-duration="1s"
                            data-wow-delay=".5s">
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
                                        disableOnInteraction: true
                                    }}
                                    pagination={{
                                        clickable: true,
                                        el: '.bd-testimonial-pagination-2',
                                    }}
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 1,
                                        },
                                        992: {
                                            slidesPerView: 2,
                                        }
                                    }}
                                >
                                    {testimonialData.slice(5, 8).map((item, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <div className={`bd-testimonial-2 mr-5 mb-25 ${item.clrClass ? item.clrClass : ''}`}>
                                                    <div className="bd-testimonial-rating mb-30">
                                                        {[...Array(5)].map((_, i) => (
                                                            <i
                                                                key={i}
                                                                className={
                                                                    i < Math.floor(item.rating)
                                                                        ? "fas fa-star"
                                                                        : item.rating > i && item.rating < i + 1
                                                                            ? "fas fa-star-half-alt"
                                                                            : "far fa-star"
                                                                }
                                                            ></i>
                                                        ))}
                                                    </div>
                                                    <div className="bd-testimonial-content-2 mb-35">
                                                        <p>{item.review}</p>
                                                    </div>
                                                    <div className="bd-testimonial-avatar d-flex align-items-center">
                                                        <div className="bd-testimonial-avatar-thumb">
                                                            <Image src={item.authorImg} style={{ width: "100%", height: "100%" }} alt="img not found" />
                                                        </div>
                                                        <h6 className="bd-testimonial-avatar-title-2 mb-0">{item.author}</h6>
                                                        <div className="bd-testimonial-quote d-none d-sm-block clr-2">
                                                            <i className="flaticon-quote"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>
                        </div>
                        <div className="bd-testimonial-pagination-2 bd-dots-pagination justify-content-center wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTestimonialArea;