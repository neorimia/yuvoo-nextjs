import testimonialData from "@/data/testimonial-data";
import Image from "next/image";
import React from "react";

const TestimonialMain = () => {
  return (
    <section className="bd-testimonial-area pt-120 pb-80">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="bd-section-title-wrapper z-index-1 p-relative text-center mb-55 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".2s"
            >
              <h2 className="bd-section-title mb-0">Parents Says</h2>
              <p>
                With the help of teachers and the environment as the third teacher, students
                <br /> have opportunities to confidently take risks.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {testimonialData.slice(8, 14).map((item, index) => (
            <div className="col-xl-4 col-md-6" key={index}>
              <div
                className="bd-testimonial-3 mb-40 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay={item.delay}
              >
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
                    <Image
                      src={item.authorImg}
                      style={{ width: "100%", height: "100%" }}
                      alt="img not found"
                    />
                  </div>
                  <h6 className="bd-testimonial-avatar-title-2 mb-0">{item.author}</h6>
                  <div className="bd-testimonial-quote d-none d-sm-block clr-2">
                    <i className="flaticon-quote"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialMain;
