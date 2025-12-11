import React from "react";
import { externalLinks } from "@/lib/routes";

const TopbarTwo = () => {
  return (
    <div className="bd-header-top bd-header-top-2 d-none d-xl-block">
      <div className="bd-header-top-clip-shape"></div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-header-top-wrapper d-flex justify-content-between">
              <div className="bd-header-top-left">
                <div className="bd-header-meta-items-2  d-flex align-items-center">
                  <div className="bd-header-meta-item is-white d-flex align-items-center">
                    <div className="bd-header-meta-icon">
                      <i className="fa-sharp fa-solid fa-flag"></i>
                    </div>
                    <div className="bd-header-meta-text">
                      <p>Platformă pentru copii</p>
                    </div>
                  </div>
                  <div className="bd-header-meta-item d-flex align-items-center">
                    <div className="bd-header-meta-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="bd-header-meta-text">
                      <p>
                        <a
                          href="https://www.google.com/maps/place/București"
                          target="_blank"
                          rel="noreferrer"
                        >
                          București, România
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bd-header-top-right d-flex align-items-center">
                <div className="bd-header-meta-items d-flex align-items-center">
                  <div className="bd-header-meta-item d-flex align-items-center">
                    <div className="bd-header-meta-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="bd-header-meta-text">
                      <p>
                        <a href={externalLinks.contactEmail}>
                          {externalLinks.contactEmail.replace("mailto:", "")}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="bd-header-meta-item d-flex align-items-center">
                    <div className="bd-header-meta-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="bd-header-meta-text">
                      <p>Luni-Vineri: 9:00-18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopbarTwo;
