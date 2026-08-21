import React from "react";

/**
 * SectionTitle Component
 *
 * Reusable section title component for consistent page sections.
 * Used across home page components (FeaturedSports, FeaturedClubs, HowItWorks, etc.)
 * Supports React.ReactNode for subtitle to enable internal linking.
 */

interface SectionTitleProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  animationDelay?: string;
  /** Semantic heading level for the title (default h2). Use 1 for page heroes without BreadcrumbOne. */
  headingLevel?: 1 | 2 | 3;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  animationDelay = ".3s",
  headingLevel = 2,
}) => {
  const TitleTag = headingLevel === 1 ? "h1" : headingLevel === 3 ? "h3" : "h2";

  return (
    <div
      className={`bd-section-title-wrapper text-center wow fadeInUp ${className}`}
      data-wow-duration="1s"
      data-wow-delay={animationDelay}
    >
      {typeof title === "string" ? (
        <TitleTag className={`bd-section-title mb-0 ${titleClassName}`}>{title}</TitleTag>
      ) : (
        <div className={`bd-section-title mb-0 ${titleClassName}`}>{title}</div>
      )}
      {subtitle &&
        (typeof subtitle === "string" ? (
          <p className={`mt-3 ${subtitleClassName}`}>{subtitle}</p>
        ) : (
          <div className={`mt-3 ${subtitleClassName}`}>{subtitle}</div>
        ))}
    </div>
  );
};

export default SectionTitle;
