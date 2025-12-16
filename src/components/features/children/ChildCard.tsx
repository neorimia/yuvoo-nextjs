/**
 * Child Card Component
 *
 * Displays a child profile in a card format.
 */

"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { deleteChildAction } from "@/app/actions/children";
import type { Child } from "@/modules/children/children.types";

interface ChildCardProps {
  child: Child;
  onDelete?: () => void;
}

const ChildCard: React.FC<ChildCardProps> = ({ child, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [_isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      !confirm(`Ești sigur că vrei să ștergi profilul pentru ${child.firstName} ${child.lastName}?`)
    ) {
      return;
    }

    startTransition(async () => {
      try {
        setIsDeleting(true);
        const result = await deleteChildAction(child.id);

        if (result.success) {
          onDelete?.();
        } else {
          alert(result.error || "Eroare la ștergerea profilului");
        }
      } catch (error) {
        console.error("Error deleting child:", error);
        alert("Eroare la ștergerea profilului");
      } finally {
        setIsDeleting(false);
      }
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const genderLabel =
    {
      male: "Băiat",
      female: "Fată",
      other: "Altul",
    }[child.gender] || "Nespecificat";

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title mb-1">
              {child.firstName} {child.lastName}
            </h5>
            <p className="text-muted mb-0 small">
              {child.age} ani • {genderLabel}
            </p>
          </div>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Șterge profilul"
          >
            {isDeleting ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i className="bi bi-trash"></i>
            )}
          </button>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar-event text-primary me-2"></i>
              <div>
                <small className="text-muted d-block">Data nașterii</small>
                <strong>{formatDate(child.dateOfBirth)}</strong>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-person text-primary me-2"></i>
              <div>
                <small className="text-muted d-block">Vârstă</small>
                <strong>{child.age} ani</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
          <Link href={routes.parent.children.quizzes(child.id)} className="btn btn-primary btn-sm">
            <i className="bi bi-clipboard-check me-1"></i>
            Vezi chestionare
          </Link>
          <Link
            href={routes.parent.children.edit(child.id)}
            className="btn btn-outline-primary btn-sm"
          >
            <i className="bi bi-pencil me-1"></i>
            Editează
          </Link>
          <Link
            href={routes.parent.children.detail(child.id)}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="bi bi-eye me-1"></i>
            Detalii
          </Link>
        </div>

        <div className="mt-3 pt-3 border-top">
          <small className="text-muted">
            Adăugat: {new Date(child.createdAt).toLocaleDateString("ro-RO")}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
