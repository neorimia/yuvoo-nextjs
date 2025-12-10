"use client";

import { programData } from '@/data';
import Image from 'next/image';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import program_2 from "../../../public/assets/img/program/home-program-2.jpg";
import program_3 from "../../../public/assets/img/program/home-program-3.jpg";

const ProgramDetailsMain = ({ id }: { id: number }) => {
    const program = programData.find((item) => item.id == id);
    return (
        <section className="bd-program-details-widget pt-120 pb-70">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-12 mb-50">
                        <div className="bd-program-details-slider p-relative wow fadeInLeft" data-wow-duration="1s" data-wow-delay=".3s">
                            <div className="bd-program-details-active">
                                <div className='bd-h-full'>
                                    <Swiper
                                        modules={[Navigation]}
                                        spaceBetween={24}
                                        loop={false}
                                        allowTouchMove={true}
                                        observer={true}
                                        speed={1000}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: true
                                        }}
                                        navigation={{
                                            nextEl: '.bd-program-details-next',
                                            prevEl: '.bd-program-details-prev',
                                        }}
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 1,
                                            }
                                        }}
                                    >
                                        <SwiperSlide>
                                            <div className="bd-program-details-slider-thumb">
                                                {program?.img && <Image src={program?.img} style={{ width: "100%", height: "100%" }} alt="img not found" />}
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="bd-program-details-slider-thumb">
                                                <Image src={program_2} style={{ width: "100%", height: "100%" }} alt="img not found" />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="bd-program-details-slider-thumb">
                                                <Image src={program_3} style={{ width: "100%", height: "100%" }} alt="img not found" />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                            <div className="bd-program-details-navigation mb-15 d-none d-sm-flex">
                                <button className="bd-program-details-next">
                                    <i className="fa-regular fa-angle-right"></i>
                                </button>
                                <button className="bd-program-details-prev">
                                    <i className="fa-regular fa-angle-left"></i>
                                </button>
                            </div>
                            <div className="panel wow"></div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-50">
                        <div className="bd-program-details-widget-content theme-bg-6 wow fadeInRight" data-wow-duration="1s"
                            data-wow-delay=".3s">
                            <h3 className="bd-program-details-widget-title mb-20">{program?.title}</h3>
                            <p className="mb-25">
                                The foundation of the Montessori philosophy is based upon the idea that children should work at
                                their own pace, according to their own strengths in surroundings that help to develop their
                                intelligence, as well as social and physical abilities. </p>
                            <p className="mb-25">Observers of Montessori children note that they are confident, caring, independent
                                as well as enthusiastic and motivated learners what they learn years comes
                                from perceptive. </p>
                            <div className="bd-program-details-author-wrapper mt-35">
                                <div className="bd-program-details-author">
                                    <div className="bd-program-details-author-thumb">
                                        {program?.authorImg && <Image src={program?.authorImg} style={{ width: "100%", height: "100%" }} alt="img not found" />}
                                    </div>
                                    <div className="bd-program-details-author-name">
                                        <span>Settling Teacher</span>
                                        <h5>{program?.authorName}</h5>
                                    </div>
                                </div>
                                <div className="bd-program-details-cat">
                                    <span>Categories</span>
                                    <h5>{program?.title}</h5>
                                </div>
                                <div className="bd-program-details-cat">
                                    <span>Per/Month</span>
                                    <h5>${program?.price}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramDetailsMain;