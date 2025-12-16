/**
 * Club Gallery Component
 *
 * Photo gallery component for displaying club images.
 * Adapted from Gallery/GalleryMain.tsx
 * Uses react-photo-view for lightbox functionality.
 */

"use client";

import React from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

interface ClubGalleryProps {
  images: string[];
  clubName: string;
}

const ClubGallery: React.FC<ClubGalleryProps> = ({ images, clubName }) => {
  // Don't render if no images
  if (!images || images.length === 0) {
    return null;
  }

  // Grid layout classes based on number of images
  const getGridClass = (index: number, total: number) => {
    if (total === 1) return "col-12";
    if (total === 2) return "col-lg-6 col-md-6";
    if (total === 3) return "col-lg-4 col-md-6";
    if (total === 4) {
      // First image takes 2 columns, others take 1
      return index === 0 ? "col-lg-6 col-md-6" : "col-lg-3 col-md-6";
    }
    // Default: responsive grid
    if (index === 0 && total > 4) {
      return "col-lg-6 col-md-6";
    }
    return "col-lg-3 col-md-6 col-sm-6";
  };

  return (
    <PhotoProvider>
      <section className="bd-gallery-area p-relative pt-120 pb-95">
        <div className="container">
          <div className="row justify-content-center mb-55">
            <div className="col-lg-8">
              <div
                className="bd-section-title-wrapper text-center wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".2s"
              >
                <h2 className="bd-section-title mb-0">Galerie Foto</h2>
                <p>
                  Descoperă facilitățile și activitățile clubului nostru prin aceste imagini
                  <br />
                  Click pe orice imagine pentru a o vedea în format mare
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {images.map((imageUrl, index) => (
              <div className={getGridClass(index, images.length)} key={index}>
                <div
                  className="bd-gallery mb-25 wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay={`.${(index + 1) * 2}s`}
                >
                  <div className="bd-gallery-thumb-wrapper">
                    <PhotoView src={imageUrl}>
                      <div className="bd-gallery-thumb">
                        <Image
                          src={imageUrl}
                          alt={`${clubName} - Imagine ${index + 1}`}
                          width={600}
                          height={400}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          unoptimized={isPlaceholderUrl(imageUrl)}
                        />
                      </div>
                    </PhotoView>
                    <div className="bd-gallery-icon">
                      <button type="button" className="popup-image">
                        <i className="flaticon-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PhotoProvider>
  );
};

export default ClubGallery;
