import React from "react";

/**
 * SectionTitle Component
 *
 * Reusable section title component for consistent page sections.
 * Used across home page components (FeaturedSports, FeaturedClubs, HowItWorks, etc.)
 */

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  animationDelay?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  animationDelay = ".3s",
}) => {
  return (
    <div
      className={`bd-section-title-wrapper text-center wow fadeInUp ${className}`}
      data-wow-duration="1s"
      data-wow-delay={animationDelay}
    >
      <h2 className={`bd-section-title mb-0 ${titleClassName}`}>{title}</h2>
      {subtitle && <p className={`mt-3 ${subtitleClassName}`}>{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
