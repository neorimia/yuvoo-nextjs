/**
 * Verification Badge Component
 *
 * Displays a verification badge for verified clubs.
 */

import React from "react";

interface VerificationBadgeProps {
  verified: boolean;
  className?: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ verified, className = "" }) => {
  if (!verified) {
    return null;
  }

  return (
    <span className={`bd-verification-badge ${className}`} title="Club verificat">
      <i className="flaticon-check"></i>
      <span>Verificat</span>
    </span>
  );
};

export default VerificationBadge;
