/**
 * Club Map Component
 *
 * Component for displaying club location on a map.
 * Uses Google Maps embed iframe (similar to ContactFormMain pattern).
 */

import React from "react";
import type { Club } from "@/modules/clubs/clubs.types";

interface ClubMapProps {
  club: Club;
}

const ClubMap: React.FC<ClubMapProps> = ({ club }) => {
  // Build Google Maps embed URL
  const buildMapUrl = (): string => {
    // If coordinates are available, use them for precise location
    if (club.location.coordinates) {
      const { lat, lng } = club.location.coordinates;
      // Use simple embed format with coordinates
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${lat}%2C${lng}!5e0!3m2!1sro!2sro!4v${Date.now()}!5m2!1sro!2sro`;
    }

    // Fallback to address-based search (no API key needed for embed)
    const address = encodeURIComponent(
      `${club.location.address}, ${club.location.city}${club.location.district ? `, ${club.location.district}` : ""}, România`
    );
    // Use search-based embed (works without API key)
    return `https://www.google.com/maps?q=${address}&output=embed`;
  };

  // Build Google Maps link for "View on Google Maps" button
  const buildMapLink = (): string => {
    if (club.location.coordinates) {
      const { lat, lng } = club.location.coordinates;
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }

    const address = encodeURIComponent(
      `${club.location.address}, ${club.location.city}${club.location.district ? `, ${club.location.district}` : ""}, România`
    );
    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  };

  return (
    <section className="bd-club-map-area pt-120 pb-70">
      <div className="container">
        <div className="row justify-content-center mb-55">
          <div className="col-lg-8">
            <div
              className="bd-section-title-wrapper text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".2s"
            >
              <h2 className="bd-section-title mb-0">Locație</h2>
              <p>
                Găsește-ne ușor folosind harta de mai jos
                <br />
                {club.location.address && (
                  <>
                    <i className="flaticon-location me-2"></i>
                    {club.location.address}, {club.location.city}
                    {club.location.district && `, ${club.location.district}`}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="bd-club-map wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
              <div className="bd-club-map-wrapper position-relative">
                <iframe
                  src={buildMapUrl()}
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Hartă - ${club.name}`}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        {/* Address Information */}
        {club.location.address && (
          <div className="row mt-4">
            <div className="col-12">
              <div
                className="bd-club-address-info text-center wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".4s"
              >
                <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
                  <div className="d-flex align-items-center">
                    <i className="flaticon-location text-primary me-2 fs-5"></i>
                    <div className="text-start">
                      <span className="d-block small text-muted">Adresă</span>
                      <strong>
                        {club.location.address}
                        <br />
                        {club.location.city}
                        {club.location.district && `, ${club.location.district}`}
                      </strong>
                    </div>
                  </div>
                  <div className="vr d-none d-md-block"></div>
                  <a
                    href={buildMapLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bd-btn bd-btn-grey"
                  >
                    <span className="bd-btn-inner">
                      <span className="bd-btn-normal">
                        <i className="flaticon-map me-2"></i>
                        Direcții
                      </span>
                      <span className="bd-btn-hover">
                        <i className="flaticon-map me-2"></i>
                        Direcții
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClubMap;
