import React from "react";
import Link from "next/link";

/**
 * TrustCard Component
 *
 * Reusable card component for displaying trust signals, benefits, or feature items.
 * Uses bd-trust styling classes for consistent appearance.
 * Used in HomeTrustSignals and ClubsLandingBenefits components.
 */

export interface TrustCardProps {
  /** Unique identifier */
  id: number;
  /** Font Awesome icon class (e.g., "fa-solid fa-certificate") */
  icon: string;
  /** Card title */
  title: string;
  /** Card description/text */
  description: string;
  /** Optional link URL (makes card clickable) */
  link?: string;
  /** Animation delay for WOW.js (e.g., "0.3s") */
  animationDelay?: string;
  /** Additional CSS classes for the card */
  className?: string;
  /** Column classes for grid layout (e.g., "col-lg-4 col-md-6") */
  columnClasses?: string;
}

const TrustCard: React.FC<TrustCardProps> = ({
  id,
  icon,
  title,
  description,
  link,
  animationDelay,
  className = "",
  columnClasses = "col-lg-4 col-md-6 col-sm-10",
}) => {
  // Card content
  const content = (
    <div
      className={`bd-trust-item wow fadeInUp ${className}`}
      data-wow-duration="1s"
      data-wow-delay={animationDelay || `${0.1 * id}s`}
    >
      <div className="bd-trust-icon">
        <i className={icon}></i>
      </div>
      <div className="bd-trust-content">
        <h4 className="bd-trust-title">{title}</h4>
        <p className="bd-trust-text">{description}</p>
      </div>
    </div>
  );

  // Card wrapper with styling
  const cardWrapper = (
    <div className={`bd-trust-card ${link ? "bd-trust-card-link" : ""} ${className}`}>
      {content}
    </div>
  );

  // If link is provided, wrap in Link component
  if (link) {
    return (
      <div className={`${columnClasses} bd-trust-card-col`}>
        <Link href={link} className="bd-trust-link">
          {cardWrapper}
        </Link>
      </div>
    );
  }

  // Return card without link
  return <div className={`${columnClasses} bd-trust-card-col`}>{cardWrapper}</div>;
};

export default TrustCard;
