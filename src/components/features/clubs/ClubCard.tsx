/**
 * Club Card Component
 *
 * Reusable club card component for displaying club information.
 * Adapted from Class card components (bd-class-3 structure).
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Club } from "@/modules/clubs/clubs.types";
import VerificationBadge from "./VerificationBadge";
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

interface ClubCardProps {
  club: Club;
  variant?: "default" | "compact" | "featured" | "listing"; // listing matches bd-class-3 style
  className?: string;
  recommended?: boolean; // Show recommended badge (from quiz)
  showAgeGroups?: boolean; // Show age groups info
  delay?: string; // Animation delay for wow.js
}

const ClubCard: React.FC<ClubCardProps> = ({
  club,
  variant = "listing",
  className = "",
  recommended = false,
  showAgeGroups = true,
  delay,
}) => {
  const mainImage = club.images?.[0] || "/assets/img/placeholder-club.jpg";
  const pricingDisplay = club.pricing
    ? `${club.pricing.amount} ${club.pricing.currency}/${club.pricing.type === "monthly" ? "lună" : club.pricing.type === "per_class" ? "ședință" : "semestru"}`
    : "Contactează pentru preț";

  // Listing variant matches bd-class-3 structure from ClassesMain
  if (variant === "listing") {
    return (
      <div
        className={`bd-club-3 fix radius-24 p-relative mb-50 ${className}`}
        data-wow-duration="1s"
        data-wow-delay={delay}
      >
        <div className="bd-club-thumb position-relative">
          {mainImage && (
            <Image
              src={mainImage}
              alt={club.name}
              width={400}
              height={300}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              unoptimized={isPlaceholderUrl(mainImage)}
            />
          )}
          {/* Badges: Recommended (from quiz) and Verified */}
          <div className="position-absolute top-0 end-0 m-3 d-flex flex-column gap-2">
            {recommended && (
              <span className="badge bg-warning text-dark">
                <i className="bi bi-star-fill me-1"></i>
                Recomandat
              </span>
            )}
            {club.verified && <VerificationBadge verified={club.verified} />}
          </div>
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
          {showAgeGroups && club.ageGroups && club.ageGroups.length > 0 && (
            <div className="bd-club-age-groups mt-2">
              <small className="text-muted">Vârste: {club.ageGroups.join(", ")} ani</small>
            </div>
          )}
        </div>
        <div className="bd-club-btn-3 theme-bg-2 text-center">
          <Link href={routes.clubs.detail(club.slug)}>Vezi detalii</Link>
        </div>
      </div>
    );
  }

  // Default/Compact/Featured variants (for other use cases)
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
            unoptimized={isPlaceholderUrl(mainImage)}
          />
        )}
        {club.verified && (
          <div className="bd-club-badge position-absolute top-0 end-0 m-3">
            <VerificationBadge verified={club.verified} />
          </div>
        )}
        {recommended && (
          <div className="position-absolute top-0 start-0 m-3">
            <span className="badge bg-warning text-dark">
              <i className="bi bi-star-fill me-1"></i>
              Recomandat
            </span>
          </div>
        )}
      </div>
      <div className="bd-club-content theme-bg-6">
        <h3 className="bd-club-title">
          <Link href={routes.clubs.detail(club.slug)}>{club.name}</Link>
        </h3>
        <p className="bd-club-description mb-20">
          {club.description?.substring(0, variant === "compact" ? 60 : 100)}...
        </p>
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
        {showAgeGroups && club.ageGroups && club.ageGroups.length > 0 && (
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
