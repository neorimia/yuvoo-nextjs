"use client";

import { gallaryData } from "@/data";
import Image from "next/image";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";

const GalleryMain = () => {
  return (
    <PhotoProvider>
      <div className="bd-gallery-area p-relative pt-120 pb-95 p-relative">
        <div className="container">
          <div className="row">
            {gallaryData.slice(5, 11).map((item, index) => (
              <div className={item.wrap} key={index}>
                {!item.inners && (
                  <div
                    className="bd-gallery mb-25 wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay=".3s"
                  >
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
                )}

                {item.inners && (
                  <div className="row">
                    {item.inners.map((inner, index) => (
                      <div className="col-12" key={index}>
                        <div
                          className="bd-gallery mb-25 wow fadeInUp"
                          data-wow-duration="1s"
                          data-wow-delay=".3s"
                        >
                          <div className="bd-gallery-thumb-wrapper">
                            <PhotoView src={inner.img.src}>
                              <div className="bd-gallery-thumb">
                                <Image
                                  src={inner.img}
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhotoProvider>
  );
};

export default GalleryMain;
