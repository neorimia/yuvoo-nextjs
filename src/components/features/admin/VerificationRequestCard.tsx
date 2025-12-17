"use client";

/**
 * Verification Request Card Component
 *
 * Displays a club or doctor verification request with actions to approve/reject.
 */

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import VerificationBadge from "../clubs/VerificationBadge";
import {
  updateClubVerificationStatusAction,
  updateDoctorVerificationStatusAction,
} from "@/app/actions/verifications";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";

interface VerificationRequestCardProps {
  type: "club" | "doctor";
  entity: Club | Doctor;
}

export default function VerificationRequestCard({ type, entity }: VerificationRequestCardProps) {
  const [isPending, startTransition] = useTransition();
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const club = type === "club" ? (entity as Club) : null;
  const doctor = type === "doctor" ? (entity as Doctor) : null;

  const handleApprove = () => {
    if (isPending) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", entity.id);
      formData.append("status", "approved");

      const result =
        type === "club"
          ? await updateClubVerificationStatusAction(formData)
          : await updateDoctorVerificationStatusAction(formData);

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Status actualizat cu succes" });
        setShowRejectForm(false);
        // Refresh page after 1 second
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage({ type: "error", text: result.error || "Eroare la actualizare" });
      }
    });
  };

  const handleReject = () => {
    if (isPending) return;

    if (!showRejectForm) {
      setShowRejectForm(true);
      return;
    }

    if (!rejectionReason.trim()) {
      setMessage({ type: "error", text: "Te rugăm să introduci un motiv pentru respingere" });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", entity.id);
      formData.append("status", "rejected");
      formData.append("reason", rejectionReason);

      const result =
        type === "club"
          ? await updateClubVerificationStatusAction(formData)
          : await updateDoctorVerificationStatusAction(formData);

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Status actualizat cu succes" });
        setShowRejectForm(false);
        setRejectionReason("");
        // Refresh page after 1 second
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage({ type: "error", text: result.error || "Eroare la actualizare" });
      }
    });
  };

  const handleSetInReview = () => {
    if (isPending) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("id", entity.id);
      formData.append("status", "in_review");

      const result =
        type === "club"
          ? await updateClubVerificationStatusAction(formData)
          : await updateDoctorVerificationStatusAction(formData);

      if (result.success) {
        setMessage({ type: "success", text: result.message || "Status actualizat cu succes" });
        // Refresh page after 1 second
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage({ type: "error", text: result.error || "Eroare la actualizare" });
      }
    });
  };

  const imageUrl =
    type === "club"
      ? club?.images?.[0] || "/assets/img/placeholder-club.jpg"
      : doctor?.image || "/assets/img/placeholder-doctor.jpg";

  const name = type === "club" ? club?.name : doctor?.name;
  const location = type === "club" ? club?.location : doctor?.location;
  const verificationDocuments =
    type === "club" ? club?.verificationDocuments || [] : doctor?.verificationDocuments || [];

  return (
    <div className="bd-verification-card card mb-4">
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <div className="bd-verification-image position-relative">
              <Image
                src={imageUrl}
                alt={name || "Image"}
                width={200}
                height={150}
                className="img-fluid rounded"
                style={{ objectFit: "cover", width: "100%", height: "150px" }}
              />
              <div className="position-absolute top-0 end-0 m-2">
                <VerificationBadge
                  verified={
                    (club?.verificationStatus || doctor?.verificationStatus || "pending") as
                      | "pending"
                      | "in_review"
                      | "approved"
                      | "rejected"
                  }
                  size="sm"
                  showUnverified={true}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="card-title mb-2">
              {type === "club" ? "🏢" : "👨‍⚕️"} {name}
            </h5>
            <p className="text-muted mb-2">
              <i className="flaticon-location me-2"></i>
              {location?.city}
              {location?.district && `, ${location.district}`}
            </p>
            {type === "club" && club && (
              <p className="mb-2">
                <strong>Sport:</strong> {club.sportName}
              </p>
            )}
            {type === "doctor" && doctor && (
              <p className="mb-2">
                <strong>Specialitate:</strong> {doctor.specialty}
              </p>
            )}
            {verificationDocuments.length > 0 && (
              <div className="mt-3">
                <strong>Documente trimise ({verificationDocuments.length}):</strong>
                <div className="mt-2">
                  {verificationDocuments.slice(0, 3).map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-secondary me-2 mb-2"
                    >
                      <i className="bi bi-file-earmark-pdf me-1"></i>
                      Document {idx + 1}
                    </a>
                  ))}
                  {verificationDocuments.length > 3 && (
                    <span className="text-muted">
                      +{verificationDocuments.length - 3} mai multe
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="col-md-3">
            <div className="d-flex flex-column gap-2">
              {(club?.verificationStatus === "pending" ||
                doctor?.verificationStatus === "pending") && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleSetInReview}
                  disabled={isPending}
                >
                  <i className="bi bi-eye me-1"></i>
                  Marchează ca în revizuire
                </button>
              )}
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={handleApprove}
                disabled={isPending}
              >
                <i className="bi bi-check-circle me-1"></i>
                Aprobă
              </button>
              {!showRejectForm ? (
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={handleReject}
                  disabled={isPending}
                >
                  <i className="bi bi-x-circle me-1"></i>
                  Respinge
                </button>
              ) : (
                <div className="mt-2">
                  <textarea
                    className="form-control form-control-sm mb-2"
                    rows={3}
                    placeholder="Motivul respingerii..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    disabled={isPending}
                  />
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={handleReject}
                      disabled={isPending}
                    >
                      Confirmă respingerea
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => {
                        setShowRejectForm(false);
                        setRejectionReason("");
                      }}
                      disabled={isPending}
                    >
                      Anulează
                    </button>
                  </div>
                </div>
              )}
              <Link
                href={
                  type === "club"
                    ? routes.clubs.detail(club?.slug || "")
                    : routes.doctors.detail(doctor?.slug || "")
                }
                className="btn btn-sm btn-outline-secondary"
                target="_blank"
              >
                <i className="bi bi-box-arrow-up-right me-1"></i>
                Vezi profil
              </Link>
            </div>
          </div>
        </div>

        {message && (
          <div
            className={`alert alert-${message.type === "success" ? "success" : "danger"} mt-3 mb-0`}
            role="alert"
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
