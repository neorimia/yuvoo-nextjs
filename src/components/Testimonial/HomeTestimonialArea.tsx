"use client";

import Image from 'next/image';
import React from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import shape1 from "../../../public/assets/img/bg/bg-shape.jpg";
import bg from "../../../public/assets/img/bg/testimonail-bg.png";
import testimonialData from '@/data/testimonial-data';
import { useVideoModal } from '@/provider/VideoProvider';

const HomeTestimonialArea = () => {
    const { playVideo } = useVideoModal();
    return (
        <section className="bd-testimonial-area theme-bg">
            <div className="bd-testimonial-video" style={{ backgroundImage: `url(${bg.src})` }}>
                <div className="bd-testimonial-video-btn bd-pulse-btn">
                    <button type='button' className="popup-video" onClick={() => playVideo("haHjGehC1dg?list=PLgGbWId6zgaVDej_n7pE_GcswMMpNN--N", "youtube")}><i className="flaticon-play-button"></i></button>
                </div>
            </div>
            <div className="bd-testimonial-bg d-none d-lg-block" style={{ backgroundImage: `url(${shape1.src})` }}></div>
            <div className="container">
                <div className="row justify-content-end align-items-center">
                    <div className="col-lg-6">
                        <div className="bd-testimonial-wrapper pt-120 pb-120">
                            <div className="bd-section-title-wrapper is-white mb-20 wow fadeInUp" data-wow-duration="1s"
                                data-wow-delay=".3s">
                                <h2 className="bd-section-title mb-0">Parents Says</h2>
                            </div>
                            <div className="bd-testimonial-active wow fadeInUp" data-wow-duration="1s"
                                data-wow-delay=".5s">
                                <div>
                                    <Swiper
                                        modules={[Pagination, Navigation]}
                                        spaceBetween={24}
                                        loop={false}
                                        allowTouchMove={true}
                                        observer={true}
                                        speed={1000}
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: true
                                        }}
                                        pagination={{
                                            clickable: true,
                                            el: '.bd-testimonial-pagination',
                                        }}
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 1,
                                            }
                                        }}
                                    >
                                        {testimonialData.slice(0,3).map((item, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <div className="bd-testimonial">
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
                                                        <div className="bd-testimonial-content mb-55">
                                                            <p>{item.review}</p>
                                                        </div>
                                                        <div className="bd-testimonial-avatar d-flex align-items-center">
                                                            <div className="bd-testimonial-avatar-thumb">
                                                                <Image src={item.authorImg} style={{ width: "100%", height: "100%" }} alt="img not found" />
                                                            </div>
                                                            <h6 className="bd-testimonial-avatar-title mb-0">{item.author}</h6>
                                                            <div className="bd-testimonial-quote">
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
                            <div className="bd-testimonial-pagination bd-dots-pagination justify-content-start wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeTestimonialArea;