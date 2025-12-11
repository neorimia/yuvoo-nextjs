/**
 * Club Card Component
 *
 * Reusable club card component for displaying club information.
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Club } from "@/modules/clubs/clubs.types";
import VerificationBadge from "./VerificationBadge";

interface ClubCardProps {
  club: Club;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, variant = "default", className = "" }) => {
  const mainImage = club.images?.[0] || "/assets/img/placeholder-club.jpg";
  const pricingDisplay = club.pricing
    ? `${club.pricing.amount} ${club.pricing.currency}/${club.pricing.type === "monthly" ? "lună" : club.pricing.type === "per_class" ? "ședință" : "semestru"}`
    : "Contactează pentru preț";

  return (
    <div className={`bd-club-card ${variant} ${className}`}>
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
          <div className="bd-club-badge position-absolute top-0 end-0 m-3">
            <VerificationBadge verified={club.verified} />
          </div>
        )}
      </div>
      <div className="bd-club-content theme-bg-6">
        <h3 className="bd-club-title">
          <Link href={routes.clubs.detail(club.slug)}>{club.name}</Link>
        </h3>
        <p className="bd-club-description mb-20">{club.description?.substring(0, 100)}...</p>
        <div className="bd-club-meta-wrapper d-flex justify-content-between align-items-center flex-wrap">
          <div className="bd-club-meta d-flex align-items-center flex-wrap">
            <div className="bd-club-sport">
              <i className="flaticon-sports"></i>
              <span>{club.sportName}</span>
            </div>
            <div className="bd-club-location ms-3">
              <i className="flaticon-location"></i>
              <span>{club.location.city}</span>
            </div>
          </div>
          {club.pricing && (
            <div className="bd-club-meta">
              <div className="bd-club-price">
                <span>{pricingDisplay}</span>
              </div>
            </div>
          )}
        </div>
        {club.ageGroups && club.ageGroups.length > 0 && (
          <div className="bd-club-age-groups mt-2">
            <small className="text-muted">Vârste: {club.ageGroups.join(", ")} ani</small>
          </div>
        )}
      </div>
      <div className="bd-club-btn theme-bg-2 text-center">
        <Link href={routes.clubs.detail(club.slug)}>Vezi detalii</Link>
      </div>
    </div>
  );
};

export default ClubCard;
