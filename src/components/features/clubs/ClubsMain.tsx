/**
 * Clubs Main Component
 *
 * Main component for displaying a list of clubs.
 * Adapted from Class/ClassesMain.tsx
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Club } from "@/modules/clubs/clubs.types";
import VerificationBadge from "./VerificationBadge";

interface ClubsMainProps {
  clubs: Club[];
}

const ClubsMain: React.FC<ClubsMainProps> = ({ clubs }) => {
  return (
    <section className="bd-club-area pt-110 pb-70">
      <div className="container">
        <div className="row">
          {clubs.map((club) => {
            const mainImage = club.images?.[0] || "/assets/img/placeholder-club.jpg";
            const pricingDisplay = club.pricing
              ? `${club.pricing.amount} ${club.pricing.currency}/${club.pricing.type === "monthly" ? "lună" : club.pricing.type === "per_class" ? "ședință" : "semestru"}`
              : "Contactează pentru preț";

            return (
              <div className="col-xl-4 col-lg-6 col-md-6" key={club.id}>
                <div className="bd-club-3 fix radius-24 p-relative mb-50 wow fadeInUp">
                  <div className="bd-club-thumb position-relative">
                    {mainImage && (
                      <Image
                        src={mainImage}
                        alt={club.name}
                        width={400}
                        height={300}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                    {club.verified && (
                      <div className="position-absolute top-0 end-0 m-3">
                        <VerificationBadge verified={club.verified} />
                      </div>
                    )}
                  </div>
                  <div className="bd-club-content-3 theme-bg-6">
                    <h3 className="bd-club-title-3">
                      <Link href={routes.clubs.detail(club.slug)}>{club.name}</Link>
                    </h3>
                    <p className="mb-20">{club.description?.substring(0, 120)}...</p>
                    <div className="bd-club-meta-wrapper d-flex justify-content-between align-items-center flex-wrap">
                      <div className="bd-club-meta d-flex align-items-center flex-wrap">
                        <div className="bd-club-sport me-3">
                          <i className="flaticon-sports"></i>
                          <span>{club.sportName}</span>
                        </div>
                        <div className="bd-club-location">
                          <i className="flaticon-location"></i>
                          <span>{club.location.city}</span>
                        </div>
                      </div>
                      {club.pricing && (
                        <div className="bd-club-meta">
                          <div className="bd-club-meta-price">
                            <span>{pricingDisplay}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {club.ageGroups && club.ageGroups.length > 0 && (
                      <div className="bd-club-age-groups mt-2">
                        <small className="text-muted">
                          Vârste: {club.ageGroups.join(", ")} ani
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="bd-club-btn-3 theme-bg-2 text-center">
                    <Link href={routes.clubs.detail(club.slug)}>Vezi detalii</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClubsMain;
