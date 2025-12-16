/**
 * Doctor Card Component
 *
 * Reusable doctor card component for displaying doctor information.
 * Adapted from Teacher card components (bd-teacher structure).
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Doctor } from "@/modules/doctors/doctors.types";
import VerificationBadge from "../clubs/VerificationBadge";
import { isPlaceholderUrl } from "@/lib/utils/image-helpers";

interface DoctorCardProps {
  doctor: Doctor;
  variant?: "default" | "compact" | "featured" | "listing"; // listing matches bd-teacher style
  className?: string;
  delay?: string; // Animation delay for wow.js
}

/**
 * Get Romanian display name for specialty
 */
function getSpecialtyDisplayName(specialty: string): string {
  const specialtyMap: Record<string, string> = {
    orthopedist: "Ortopedie pediatrică",
    nutritionist: "Nutriție pediatrică",
    psychologist: "Psihologie pediatrică",
    general: "Medic pediatru",
  };
  return specialtyMap[specialty] || specialty;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  variant = "listing",
  className = "",
  delay,
}) => {
  const doctorImage = doctor.image || "/assets/img/placeholder-doctor.jpg";
  const specialtyDisplay = getSpecialtyDisplayName(doctor.specialty);

  // Listing variant matches bd-teacher structure from TeachersMain
  if (variant === "listing") {
    return (
      <div
        className={`bd-teacher mb-40 wow fadeInUp ${className}`}
        data-wow-duration="1s"
        data-wow-delay={delay}
      >
        <Link href={routes.doctors.detail(doctor.slug)}>
          <div className="bd-teacher-thumb position-relative">
            <Image
              src={doctorImage}
              alt={doctor.name}
              width={300}
              height={350}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              unoptimized={isPlaceholderUrl(doctorImage)}
            />
            {doctor.verified && (
              <div className="position-absolute top-0 end-0 m-3">
                <VerificationBadge verified={doctor.verified} />
              </div>
            )}
          </div>
        </Link>
        <div className="bd-teacher-content-wrapper">
          <div className="bd-teacher-content">
            <h4 className="bd-teacher-title">
              <Link href={routes.doctors.detail(doctor.slug)}>{doctor.name}</Link>
            </h4>
            <span className="bd-teacher-des">{specialtyDisplay}</span>
            {doctor.credentials && doctor.credentials.length > 0 && (
              <p className="bd-teacher-credentials small text-muted mt-2 mb-0">
                {doctor.credentials.join(", ")}
              </p>
            )}
          </div>
          {doctor.location && (
            <div className="bd-teacher-location mt-2">
              <i className="flaticon-location me-1"></i>
              <span className="small">{doctor.location.city}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default/Compact/Featured variants (for other use cases)
  return (
    <div className={`bd-doctor-card ${variant} ${className}`}>
      <div className="bd-doctor-thumb position-relative">
        {doctorImage && (
          <Image
            src={doctorImage}
            alt={doctor.name}
            width={300}
            height={350}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            unoptimized={isPlaceholderUrl(doctorImage)}
          />
        )}
        {doctor.verified && (
          <div className="bd-doctor-badge position-absolute top-0 end-0 m-3">
            <VerificationBadge verified={doctor.verified} />
          </div>
        )}
      </div>
      <div className="bd-doctor-content theme-bg-6">
        <h3 className="bd-doctor-title">
          <Link href={routes.doctors.detail(doctor.slug)}>{doctor.name}</Link>
        </h3>
        <p className="bd-doctor-specialty mb-20">{specialtyDisplay}</p>
        {doctor.description && (
          <p className="bd-doctor-description mb-20">
            {doctor.description.substring(0, variant === "compact" ? 60 : 100)}...
          </p>
        )}
        {doctor.location && (
          <div className="bd-doctor-meta d-flex align-items-center">
            <i className="flaticon-location me-2"></i>
            <span>{doctor.location.city}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
