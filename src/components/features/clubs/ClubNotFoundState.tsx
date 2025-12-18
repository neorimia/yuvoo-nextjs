/**
 * Club Not Found State Component
 *
 * Displays a message when a club profile is not found.
 * Used in dashboard when club admin doesn't have an associated club.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

const ClubNotFoundState: React.FC = () => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body text-center py-5">
        <i
          className="bi bi-exclamation-triangle"
          style={{ fontSize: "3rem", color: "#ffc107" }}
        ></i>
        <h3 className="mt-3 mb-3">Club-ul nu a fost găsit</h3>
        <p className="text-muted mb-4">
          Nu ai un profil de club asociat contului tău.
          <br />
          Completează procesul de onboarding pentru a crea un profil de club.
        </p>
        <Link href={routes.onboarding.club.welcome} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Creează profil club
        </Link>
      </div>
    </div>
  );
};

export default ClubNotFoundState;
