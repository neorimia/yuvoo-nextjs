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
}

const LeadSubmissionButton: React.FC<LeadSubmissionButtonProps> = ({
  clubId,
  clubName,
  sportType,
  locationId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-lg w-100"
        onClick={() => setIsModalOpen(true)}
      >
        <i className="fa-regular fa-hand-pointer me-2"></i>
        Sunt interesat
      </button>
      <LeadSubmissionModal
        clubId={clubId}
        clubName={clubName}
        sportType={sportType}
        locationId={locationId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default LeadSubmissionButton;
