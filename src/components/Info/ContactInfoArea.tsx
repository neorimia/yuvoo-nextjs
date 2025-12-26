import React from "react";
import { externalLinks } from "@/lib/routes";

const ContactInfoArea = () => {
  return (
    <section className="bd-contact-info-area pt-120 pb-95">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div
              className="bd-contact-info-wrap mb-30 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <div className="bd-contact-info">
                <div className="bd-contact-info-content">
                  <div className="bd-contact-info-icon cat-1">
                    <a href="tel:+40746385038">
                      <i className="fa-solid fa-phone"></i>
                    </a>
                  </div>
                  <h6>
                    <a href="tel:+40746385038">+40 746 385 038</a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div
              className="bd-contact-info-wrap mb-30 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".4s"
            >
              <div className="bd-contact-info">
                <div className="bd-contact-info-content">
                  <div className="bd-contact-info-icon cat-2">
                    <a
                      href="https://www.google.com/maps/place/București"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="flaticon-location-pin"></i>
                    </a>
                  </div>
                  <h6>
                    <a
                      href="https://www.google.com/maps/place/București"
                      target="_blank"
                      rel="noreferrer"
                    >
                      București, România
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div
              className="bd-contact-info-wrap mb-30 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".5s"
            >
              <div className="bd-contact-info">
                <div className="bd-contact-info-content">
                  <div className="bd-contact-info-icon cat-3">
                    <a href={externalLinks.contactEmail}>
                      <i className="fa-solid fa-envelope"></i>
                    </a>
                  </div>
                  <h6>
                    <a href={externalLinks.contactEmail}>
                      {externalLinks.contactEmail.replace("mailto:", "")}
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoArea;
