import React from "react";

/**
 * DistanceBadge Component
 *
 * Reusable badge component for displaying distance/location information.
 * Used in club cards and featured sections.
 */

interface DistanceBadgeProps {
  distance: number;
  unit?: "km" | "miles";
  className?: string;
  variant?: "default" | "dark" | "light";
}

const DistanceBadge: React.FC<DistanceBadgeProps> = ({
  distance,
  unit = "km",
  className = "",
  variant = "dark",
}) => {
  const variantClasses = {
    default: "bd-distance-badge",
    dark: "bd-distance-badge bd-distance-badge-dark",
    light: "bd-distance-badge bd-distance-badge-light",
  };

  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      <i className="fal fa-map-marker-alt"></i>
      {distance} {unit}
    </span>
  );
};

export default DistanceBadge;
