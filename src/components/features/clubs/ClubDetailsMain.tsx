/**
 * Club Details Main Component
 *
 * Main component for displaying club details.
 * Adapted from Class/ClassDetailsMain.tsx
 * Server Component - can be used in SSG pages.
 */

import React from "react";
import Image from "next/image";
import type { Club } from "@/modules/clubs/clubs.types";
import VerificationBadge from "./VerificationBadge";

interface ClubDetailsMainProps {
  club: Club;
}

const ClubDetailsMain: React.FC<ClubDetailsMainProps> = ({ club }) => {
  const mainImage = club.images?.[0] || "/assets/img/placeholder-club.jpg";
  const pricingDisplay = club.pricing?.amount
    ? `${club.pricing.amount} ${club.pricing.currency}/${club.pricing.type === "monthly" ? "lună" : club.pricing.type === "per_class" ? "ședință" : "semestru"}`
    : "Contactează pentru preț";

  return (
    <section className="bd-club-details-widget pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-12 mb-50">
            <div
              className="bd-club-details-thumb p-relative wow fadeInLeft"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <Image
                src={mainImage}
                alt={club.name}
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="panel wow"></div>
              {club.verified && (
                <div className="position-absolute top-0 end-0 m-3">
                  <VerificationBadge verified={club.verified} />
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 mb-50">
            <div
              className="bd-club-details-widget-content theme-bg-6 wow fadeInRight"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              <h3 className="bd-club-details-widget-title mb-20">{club.name}</h3>
              <p className="mb-25">{club.description}</p>
              {club.description && club.description.length > 200 && (
                <p className="mb-25">
                  Clubul nostru oferă un mediu sigur și stimulativ pentru dezvoltarea copiilor prin
                  sport. Programele noastre sunt adaptate vârstei și nivelului fiecărui copil,
                  asigurând o experiență plăcută și educativă.
                </p>
              )}

              <div className="bd-club-details-info-wrapper mt-35">
                {/* Sport Information */}
                <div className="bd-club-details-info">
                  <div className="bd-club-details-sport">
                    <span>
                      <i className="fa-regular fa-football me-2"></i>Sport
                    </span>
                    <h5>
                      {club.sportName
                        .split(" ")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(" ")}
                    </h5>
                  </div>
                </div>

                {/* Location Information */}
                <div className="bd-club-details-location">
                  <span>
                    <i className="fa-regular fa-location me-2"></i>Locație
                  </span>
                  <h5>
                    {club.location.city}
                    {club.location.district && `, ${club.location.district}`}
                  </h5>
                  {club.location.address && (
                    <p className="small text-muted mt-1">
                      <i className="flaticon-map me-1"></i>
                      {club.location.address}
                    </p>
                  )}
                </div>

                {/* Pricing Information */}
                {club.pricing && (
                  <div className="bd-club-details-pricing">
                    <span>
                      <i className="fa-regular fa-money-bill-wave me-2"></i>Preț
                    </span>
                    <h5>{pricingDisplay}</h5>
                  </div>
                )}

                {/* Age Groups Information */}
                {club.ageGroups && club.ageGroups.length > 0 && (
                  <div className="bd-club-details-age">
                    <span>
                      <i className="fa-regular fa-calendar me-2"></i>Vârste
                    </span>
                    <h5>
                      {club.ageGroups.length === 1
                        ? `${club.ageGroups[0]} ani`
                        : `${club.ageGroups[0]}-${club.ageGroups[club.ageGroups.length - 1]} ani`}
                    </h5>
                    {club.ageGroups.length > 2 && (
                      <p className="small text-muted mt-1">
                        Grupe: {club.ageGroups.join(", ")} ani
                      </p>
                    )}
                  </div>
                )}

                {/* Skill Levels Information */}
                {club.levels && club.levels.length > 0 && (
                  <div className="bd-club-details-levels">
                    <span>
                      <i className="fa-regular fa-star me-2"></i>Niveluri
                    </span>
                    <h5>
                      {club.levels
                        .map((level) => {
                          const levelMap: Record<string, string> = {
                            beginner: "Începător",
                            intermediate: "Intermediar",
                            advanced: "Avansat",
                          };
                          return levelMap[level.toLowerCase()] || level;
                        })
                        .join(", ")}
                    </h5>
                  </div>
                )}

                {/* Verification Status */}
                {club.verified && (
                  <div className="bd-club-details-verified">
                    <span>
                      <i className="fa-regular fa-check me-2"></i>Status
                    </span>
                    <h5>
                      <VerificationBadge verified={club.verified} />
                    </h5>
                  </div>
                )}
              </div>

              {/* Contact Information Section */}
              {club.contact &&
                (club.contact.phone || club.contact.email || club.contact.website) && (
                  <div className="bd-club-details-contact mt-4 pt-4 border-top">
                    <h5 className="mb-3">
                      <i className="fa-regular fa-phone me-2"></i>Informații de Contact
                    </h5>
                    <div className="d-flex flex-column gap-3">
                      {club.contact.phone && (
                        <div className="d-flex align-items-center">
                          <i className="fa-regular fa-phone text-primary me-3 fs-5"></i>
                          <div>
                            <span className="d-block small text-muted">Telefon</span>
                            <a href={`tel:${club.contact.phone}`} className="text-decoration-none">
                              {club.contact.phone}
                            </a>
                          </div>
                        </div>
                      )}
                      {club.contact.email && (
                        <div className="d-flex align-items-center">
                          <i className="fa-regular fa-envelope text-primary me-3 fs-5"></i>
                          <div>
                            <span className="d-block small text-muted">Email</span>
                            <a
                              href={`mailto:${club.contact.email}`}
                              className="text-decoration-none"
                            >
                              {club.contact.email}
                            </a>
                          </div>
                        </div>
                      )}
                      {club.contact.website && (
                        <div className="d-flex align-items-center">
                          <i className="fa-regular fa-globe text-primary me-3 fs-5"></i>
                          <div>
                            <span className="d-block small text-muted">Website</span>
                            <a
                              href={club.contact.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              {club.contact.website.replace(/^https?:\/\//, "")}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubDetailsMain;
