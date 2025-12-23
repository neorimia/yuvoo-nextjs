import React from "react";
import Link from "next/link";

/**
 * StepCard Component
 *
 * Reusable card component for displaying steps/process items.
 * Supports icons (Flaticon), emojis, step numbers, and optional links.
 * Used in HowItWorks and ClubsLandingSolution components.
 */

export interface StepCardProps {
  /** Step number (optional, displayed in a badge) */
  stepNumber?: number;
  /** Flaticon class name (e.g., "flaticon-reading") */
  icon?: string;
  /** Emoji character (alternative to icon) */
  emoji?: string;
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
  /** Variant: "how-it-works" uses bd-how-it-works classes, "custom" uses inline styles */
  variant?: "how-it-works" | "custom";
}

const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  icon,
  emoji,
  title,
  description,
  link,
  animationDelay = "0.3s",
  className = "",
  columnClasses = "col-lg-4 col-md-6 col-sm-10",
  variant = "how-it-works",
}) => {
  // Render icon or emoji
  const renderIcon = () => {
    if (variant === "how-it-works" && icon) {
      return (
        <div className="bd-how-it-works-icon">
          <i className={icon}></i>
        </div>
      );
    }

    if (variant === "custom") {
      if (emoji) {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            {stepNumber !== undefined && (
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bd-theme-1)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: 700,
                  marginRight: "15px",
                  flexShrink: 0,
                }}
              >
                {stepNumber}
              </div>
            )}
            <div
              style={{
                fontSize: "40px",
                lineHeight: 1,
              }}
            >
              {emoji}
            </div>
          </div>
        );
      }
    }

    return null;
  };

  // Card content
  const content = (
    <>
      {renderIcon()}
      <div className={variant === "how-it-works" ? "bd-how-it-works-content" : ""}>
        <h4
          className={variant === "how-it-works" ? "bd-how-it-works-title" : ""}
          style={
            variant === "custom"
              ? {
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1B1B1B",
                  marginBottom: "10px",
                  lineHeight: "1.4",
                }
              : undefined
          }
        >
          {title}
        </h4>
        <p
          className={variant === "how-it-works" ? "bd-how-it-works-text" : ""}
          style={
            variant === "custom"
              ? {
                  fontSize: "16px",
                  color: "#6B6B6B",
                  marginBottom: 0,
                  lineHeight: "1.5",
                }
              : undefined
          }
        >
          {description}
        </p>
      </div>
    </>
  );

  // Card wrapper with styling
  const cardWrapper = (
    <div
      className={
        variant === "how-it-works"
          ? `bd-how-it-works-card ${link ? "bd-how-it-works-card-link" : ""} wow fadeInUp ${className}`
          : `wow fadeInUp h-100 ${className}`
      }
      data-wow-duration="1s"
      data-wow-delay={animationDelay}
      style={
        variant === "custom"
          ? {
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              padding: "30px",
              height: "100%",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
              border: "1px solid #E6E6E6",
            }
          : undefined
      }
    >
      {content}
    </div>
  );

  // If link is provided, wrap in Link component
  if (link) {
    return (
      <div
        className={`${columnClasses} ${variant === "how-it-works" ? "bd-how-it-works-card-col" : ""}`}
      >
        <Link href={link} className={variant === "how-it-works" ? "bd-how-it-works-link" : ""}>
          {cardWrapper}
        </Link>
      </div>
    );
  }

  // Return card without link
  return <div className={columnClasses}>{cardWrapper}</div>;
};

export default StepCard;
