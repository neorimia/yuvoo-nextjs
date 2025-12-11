import React from 'react';
import Image from "next/image";
import big_image from "../../../public/assets/img/testimonials/big-1.jpg";
import testimonialData from '@/data/testimonial-data';


const HomeTwoTestimonialArea = () => {
    return (
        <section className="bd-testimonial-area-2 pb-120 pt-120">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="bd-section-title-wrapper z-index-1 p-relative text-center mb-55">
                            <h2 className="bd-section-title mb-0">Parents Says</h2>
                            <p>With the help of teachers and the environment as the third teacher, students<br /> have
                                opportunities to confidently take risks.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <div className="bd-testimonial-thumb-2 wow fadeInLeft p-relative" data-wow-duration="1s"
                            data-wow-delay=".3s">
                            <Image src={big_image} style={{ width: "100%", height: "100%" }} alt="img not found" />
                            <div className="panel wow"></div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="bd-testimonial-2-wrap">
                            {testimonialData.slice(3,5).map((item) => (
                                <div className={`bd-testimonial-2 mb-25 wow fadeInUp ${item.clrClass ? item.clrClass : ''}`} data-wow-duration="1s"
                                    data-wow-delay={item.delay} key={item.id}>
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
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeTwoTestimonialArea;