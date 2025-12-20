/**
 * Verification Badge Component
 *
 * Displays a verification badge for clubs and doctors.
 * Supports different verification statuses and visual variants.
 */

import React from "react";

export type VerificationStatus = "pending" | "in_review" | "approved" | "rejected";

export type BadgeVariant = "default" | "compact" | "icon-only";
export type BadgeSize = "sm" | "md" | "lg";

interface VerificationBadgeProps {
  /**
   * Verification status or boolean (for backward compatibility)
   * - true or "approved" = verified/approved
   * - false = not verified (returns null)
   * - "pending" = pending verification
   * - "in_review" = under review
   * - "rejected" = rejected
   */
  verified: boolean | VerificationStatus;
  /**
   * Badge variant style
   * - "default": Full badge with icon and text
   * - "compact": Smaller badge with icon and text
   * - "icon-only": Only icon, no text
   */
  variant?: BadgeVariant;
  /**
   * Badge size
   * - "sm": Small
   * - "md": Medium (default)
   * - "lg": Large
   */
  size?: BadgeSize;
  className?: string;
  /**
   * Show badge even if not verified (for pending/in_review states)
   */
  showUnverified?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  verified,
  variant = "default",
  size = "md",
  className = "",
  showUnverified = false,
}) => {
  // Handle boolean for backward compatibility
  const status: VerificationStatus | null =
    typeof verified === "boolean" ? (verified ? "approved" : null) : verified;

  // Don't show badge if not verified and showUnverified is false
  if (!status && !showUnverified) {
    return null;
  }

  // Don't show badge for rejected status (unless explicitly requested)
  if (status === "rejected" && !showUnverified) {
    return null;
  }

  // Get status configuration
  const getStatusConfig = (status: VerificationStatus | null) => {
    switch (status) {
      case "approved":
        return {
          label: "Verificat",
          icon: "flaticon-check",
          bgClass: "bg-success",
          textClass: "text-white",
          title: "Club verificat",
        };
      case "in_review":
        return {
          label: "În revizuire",
          icon: "flaticon-time",
          bgClass: "bg-warning",
          textClass: "text-dark",
          title: "Club în proces de verificare",
        };
      case "pending":
        return {
          label: "În așteptare",
          icon: "flaticon-clock",
          bgClass: "bg-warning",
          textClass: "text-dark",
          title: "Verificare în așteptare",
        };
      case "rejected":
        return {
          label: "Respinse",
          icon: "flaticon-close",
          bgClass: "bg-danger",
          textClass: "text-white",
          title: "Verificare respinsă",
        };
      default:
        return {
          label: "Neverificat",
          icon: "flaticon-info",
          bgClass: "bg-secondary",
          textClass: "text-white",
          title: "Club neverificat",
        };
    }
  };

  const config = getStatusConfig(status);

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
    "bd-verification-badge",
    config.bgClass,
    config.textClass,
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClasses} title={config.title} role="status" aria-label={config.title}>
      <i className={config.icon}></i>
      {variant !== "icon-only" && <span>{config.label}</span>}
    </span>
  );
};

export default VerificationBadge;
