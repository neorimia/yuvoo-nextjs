/**
 * Premium Badge Component
 *
 * Displays a premium badge for clubs with premium subscriptions.
 * Shows "Verificat Yuvoo" badge with checkmark icon.
 */

import React from "react";

export type PremiumBadgeVariant = "default" | "compact" | "icon-only";
export type PremiumBadgeSize = "sm" | "md" | "lg";

interface PremiumBadgeProps {
  /**
   * Badge variant style
   * - "default": Full badge with icon and text
   * - "compact": Smaller badge with icon and text
   * - "icon-only": Only icon, no text
   */
  variant?: PremiumBadgeVariant;
  /**
   * Badge size
   * - "sm": Small
   * - "md": Medium (default)
   * - "lg": Large
   */
  size?: PremiumBadgeSize;
  className?: string;
  /**
   * Tooltip text (default: "Club Premium Yuvoo")
   */
  tooltip?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  variant = "default",
  size = "md",
  className = "",
  tooltip = "Club Premium Yuvoo",
}) => {
  // Size classes
  const sizeClasses = {
    sm: "badge-sm",
    md: "",
    lg: "badge-lg",
  };

  // Variant classes
  const variantClasses = {
    default: "",
    compact: "badge-compact",
    "icon-only": "badge-icon-only",
  };

  // Build classes
  const badgeClasses = [
    "bd-premium-badge",
    "badge",
    "bg-yuvoo-primary",
    "text-white",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={badgeClasses}
      title={tooltip}
      role="status"
      aria-label={tooltip}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
    >
      <i className="bi bi-check-circle-fill me-1"></i>
      {variant !== "icon-only" && <span>Verificat Yuvoo</span>}
    </span>
  );
};

export default PremiumBadge;
