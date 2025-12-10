/**
 * Club Details Main Component
 *
 * Main component for displaying club details.
 * Adapted from Class/ClassDetailsMain.tsx
 */

"use client";

import React from "react";
import Image from "next/image";
import type { Club } from "@/modules/clubs/clubs.types";
import VerificationBadge from "./VerificationBadge";

interface ClubDetailsMainProps {
  club: Club;
}

const ClubDetailsMain: React.FC<ClubDetailsMainProps> = ({ club }) => {
  const mainImage = club.images?.[0] || "/assets/img/placeholder-club.jpg";
  const pricingDisplay = club.pricing
    ? `${club.pricing.amount} ${club.pricing.currency}/${club.pricing.type === "monthly" ? "lună" : club.pricing.type === "per_class" ? "ședință" : "semestru"}`
    : "Contactează pentru preț";

  return (
    <section className="bd-club-details-widget pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-12 mb-50">
            <div className="bd-club-details-thumb p-relative wow fadeInLeft">
              <Image
                src={mainImage}
                alt={club.name}
                width={600}
                height={400}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {club.verified && (
                <div className="position-absolute top-0 end-0 m-3">
                  <VerificationBadge verified={club.verified} />
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 mb-50">
            <div className="bd-club-details-widget-content theme-bg-6 wow fadeInRight">
              <h3 className="bd-club-details-widget-title mb-20">{club.name}</h3>
              <p className="mb-25">{club.description}</p>

              <div className="bd-club-details-info-wrapper mt-35">
                <div className="bd-club-details-info">
                  <div className="bd-club-details-sport">
                    <span>Sport</span>
                    <h5>{club.sportName}</h5>
                  </div>
                </div>
                <div className="bd-club-details-location">
                  <span>Locație</span>
                  <h5>
                    {club.location.city}
                    {club.location.district && `, ${club.location.district}`}
                  </h5>
                  {club.location.address && (
                    <p className="small text-muted">{club.location.address}</p>
                  )}
                </div>
                {club.pricing && (
                  <div className="bd-club-details-pricing">
                    <span>Preț</span>
                    <h5>{pricingDisplay}</h5>
                  </div>
                )}
                {club.ageGroups && club.ageGroups.length > 0 && (
                  <div className="bd-club-details-age">
                    <span>Vârste</span>
                    <h5>{club.ageGroups.join(", ")} ani</h5>
                  </div>
                )}
                {club.levels && club.levels.length > 0 && (
                  <div className="bd-club-details-levels">
                    <span>Niveluri</span>
                    <h5>{club.levels.join(", ")}</h5>
                  </div>
                )}
              </div>

              {club.contact && (
                <div className="bd-club-details-contact mt-4">
                  {club.contact.phone && (
                    <div className="mb-2">
                      <i className="flaticon-phone"></i>
                      <span className="ms-2">{club.contact.phone}</span>
                    </div>
                  )}
                  {club.contact.email && (
                    <div className="mb-2">
                      <i className="flaticon-email"></i>
                      <span className="ms-2">{club.contact.email}</span>
                    </div>
                  )}
                  {club.contact.website && (
                    <div>
                      <i className="flaticon-website"></i>
                      <a
                        href={club.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ms-2"
                      >
                        {club.contact.website}
                      </a>
                    </div>
                  )}
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
