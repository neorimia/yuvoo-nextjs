/**
 * Admin Verifications Page
 *
 * Admin dashboard for reviewing and approving/rejecting club and doctor verification requests.
 */

import { requireRole } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { clubsRepository } from "@/modules/clubs/clubs.repository";
import { doctorsRepository } from "@/modules/doctors/doctors.repository";
import VerificationRequestCard from "@/components/features/admin/VerificationRequestCard";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";

export const metadata = {
  title: "Verificări - Admin | Yuvoo",
  description: "Panou de administrare pentru verificarea cluburilor și doctorilor",
};

export default async function AdminVerificationsPage() {
  // Require admin role
  try {
    await requireRole("admin");
  } catch (_error) {
    redirect(routes.login);
  }

  // Get pending verification requests
  const [pendingClubs, pendingDoctors] = await Promise.all([
    clubsRepository.getClubsPendingVerification(),
    doctorsRepository.getDoctorsPendingVerification(),
  ]);

  // Get all verification statuses for statistics
  const [
    inReviewClubs,
    inReviewDoctors,
    approvedClubs,
    approvedDoctors,
    rejectedClubs,
    rejectedDoctors,
  ] = await Promise.all([
    clubsRepository.getClubsByVerificationStatus("in_review"),
    doctorsRepository.getDoctorsByVerificationStatus("in_review"),
    clubsRepository.getClubsByVerificationStatus("approved"),
    doctorsRepository.getDoctorsByVerificationStatus("approved"),
    clubsRepository.getClubsByVerificationStatus("rejected"),
    doctorsRepository.getDoctorsByVerificationStatus("rejected"),
  ]);

  const totalPending = pendingClubs.length + pendingDoctors.length;
  const totalInReview = inReviewClubs.length + inReviewDoctors.length;

  return (
    <div className="bd-admin-verifications-page">
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="mb-3">Verificări - Panou Admin</h1>
            <p className="text-muted">
              Revizuiește și aprobă/respinge cererile de verificare pentru cluburi și doctori.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-primary">{totalPending}</h3>
                <p className="text-muted mb-0">În așteptare</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-warning">{totalInReview}</h3>
                <p className="text-muted mb-0">În revizuire</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-success">{approvedClubs.length + approvedDoctors.length}</h3>
                <p className="text-muted mb-0">Aprobate</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h3 className="text-danger">{rejectedClubs.length + rejectedDoctors.length}</h3>
                <p className="text-muted mb-0">Respinse</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Verifications */}
        {totalPending === 0 && totalInReview === 0 ? (
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            Nu există cereri de verificare în așteptare sau în revizuire.
          </div>
        ) : (
          <>
            {/* Pending Clubs */}
            {pendingClubs.length > 0 && (
              <div className="mb-5">
                <h2 className="mb-3">
                  <i className="bi bi-building me-2"></i>
                  Cluburi în așteptare ({pendingClubs.length})
                </h2>
                {pendingClubs.map((club) => (
                  <VerificationRequestCard key={club.id} type="club" entity={club as Club} />
                ))}
              </div>
            )}

            {/* Pending Doctors */}
            {pendingDoctors.length > 0 && (
              <div className="mb-5">
                <h2 className="mb-3">
                  <i className="bi bi-person-badge me-2"></i>
                  Doctori în așteptare ({pendingDoctors.length})
                </h2>
                {pendingDoctors.map((doctor) => (
                  <VerificationRequestCard
                    key={doctor.id}
                    type="doctor"
                    entity={doctor as Doctor}
                  />
                ))}
              </div>
            )}

            {/* In Review Clubs */}
            {inReviewClubs.length > 0 && (
              <div className="mb-5">
                <h2 className="mb-3">
                  <i className="bi bi-eye me-2"></i>
                  Cluburi în revizuire ({inReviewClubs.length})
                </h2>
                {inReviewClubs.map((club) => (
                  <VerificationRequestCard key={club.id} type="club" entity={club as Club} />
                ))}
              </div>
            )}

            {/* In Review Doctors */}
            {inReviewDoctors.length > 0 && (
              <div className="mb-5">
                <h2 className="mb-3">
                  <i className="bi bi-eye me-2"></i>
                  Doctori în revizuire ({inReviewDoctors.length})
                </h2>
                {inReviewDoctors.map((doctor) => (
                  <VerificationRequestCard
                    key={doctor.id}
                    type="doctor"
                    entity={doctor as Doctor}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
