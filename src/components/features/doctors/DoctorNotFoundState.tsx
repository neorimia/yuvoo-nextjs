/**
 * Doctor Not Found State Component
 *
 * Displays a message when a doctor profile is not found.
 * Used in dashboard when doctor doesn't have an associated profile.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

const DoctorNotFoundState: React.FC = () => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body text-center py-5">
        <i
          className="bi bi-exclamation-triangle"
          style={{ fontSize: "3rem", color: "#ffc107" }}
        ></i>
        <h3 className="mt-3 mb-3">Profilul de doctor nu a fost găsit</h3>
        <p className="text-muted mb-4">
          Nu ai un profil de doctor asociat contului tău.
          <br />
          Completează procesul de onboarding pentru a crea un profil de doctor.
        </p>
        <Link href={routes.onboarding.doctor.welcome} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Creează profil doctor
        </Link>
      </div>
    </div>
  );
};

export default DoctorNotFoundState;
