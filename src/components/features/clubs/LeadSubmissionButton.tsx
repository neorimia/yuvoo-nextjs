/**
 * Lead Submission Button Component
 *
 * Client component that shows "Sunt interesat" button and opens lead submission modal.
 */

"use client";

import React, { useState } from "react";
import LeadSubmissionModal from "./LeadSubmissionModal";

interface LeadSubmissionButtonProps {
  clubId: string;
  clubName: string;
  sportType?: string | null;
  locationId?: string | null;
  variant?: "primary" | "secondary";
}

const LeadSubmissionButton: React.FC<LeadSubmissionButtonProps> = ({
  clubId,
  clubName,
  sportType,
  locationId,
  variant = "primary",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonClass =
    variant === "secondary"
      ? "btn btn-outline-yuvoo-primary w-100"
      : "btn btn-yuvoo-primary btn-lg w-100";

  return (
    <>
      <button type="button" className={buttonClass} onClick={() => setIsModalOpen(true)}>
        <i className="fa-regular fa-paper-plane me-2"></i>
        {variant === "secondary" ? "Trimite un mesaj prin Yuvoo" : "Sunt interesat"}
      </button>
      <LeadSubmissionModal
        clubId={clubId}
        clubName={clubName}
        sportType={sportType}
        locationId={locationId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant={variant}
      />
    </>
  );
};

export default LeadSubmissionButton;
