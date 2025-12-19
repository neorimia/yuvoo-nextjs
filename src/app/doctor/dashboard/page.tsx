"use cache: private";

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/session";
import { getDoctorByUserId } from "@/modules/doctors/doctors.service";
import { routes } from "@/lib/routes";
import { cacheLife, cacheTag } from "next/cache";
import { redirect } from "next/navigation";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export const metadata: Metadata = {
  title: "Dashboard Doctor - Yuvoo",
  description: "Panoul de control pentru doctori pe Yuvoo.",
};

/**
 * Doctor Dashboard Page
 *
 * Protected page for doctor dashboard.
 * Shows profile status and quick links.
 * Route: /doctor/dashboard
 */
export default async function DoctorDashboardPage() {
  // Require authentication
  const session = await requireAuth();

  // Verify user is a doctor
  if (session.dbUser.role !== UserRoleEnum.DOCTOR) {
    redirect(routes.parent.dashboard);
  }

  // Cache configuration for private cache
  cacheLife("minutes");
  cacheTag(`user-${session.dbUser.id}`);
  cacheTag(`doctor-dashboard-${session.dbUser.id}`);

  // Fetch doctor profile for this user
  let doctor = null;
  try {
    doctor = await getDoctorByUserId(session.dbUser.id);
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
  }

  // Calculate profile completeness
  const calculateProfileCompleteness = (doctorProfile: typeof doctor) => {
    if (!doctorProfile) return 0;

    let completeness = 0;
    const fields = [
      doctorProfile.name,
      doctorProfile.specialty,
      doctorProfile.description,
      doctorProfile.credentials.length > 0,
      doctorProfile.location.city,
      doctorProfile.location.address,
      doctorProfile.contact.phone,
      doctorProfile.contact.email,
      doctorProfile.image,
    ];

    const totalFields = fields.length;
    const filledFields = fields.filter((field) => {
      if (typeof field === "string") return field.trim() !== "";
      if (typeof field === "boolean") return field;
      return field !== null && field !== undefined;
    }).length;

    completeness = Math.round((filledFields / totalFields) * 100);
    return completeness;
  };

  const profileCompleteness = calculateProfileCompleteness(doctor);

  return (
    <section className="bd-doctor-dashboard-area pt-120 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bd-doctor-dashboard-content">
              <h1 className="bd-section-title mb-30">Dashboard Doctor</h1>
              <p className="mb-40">
                Bun venit, Dr. {session.dbUser?.firstName || session.dbUser?.lastName || "Doctor"}!
              </p>

              {/* Profile Status Alert */}
              {!doctor && (
                <div className="alert alert-warning mb-4" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>Profil incomplet:</strong> Pentru a primi consultații, completează-ți
                  profilul medical.
                  <Link href={routes.doctor.profile} className="alert-link ms-2">
                    Completează profilul →
                  </Link>
                </div>
              )}

              {doctor && profileCompleteness < 100 && (
                <div className="alert alert-info mb-4" role="alert">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  <strong>Profil {profileCompleteness}% completat:</strong> Completează toate
                  informațiile pentru vizibilitate maximă.
                  <Link href={routes.doctor.profile} className="alert-link ms-2">
                    Actualizează profilul →
                  </Link>
                </div>
              )}

              {/* Quick Stats */}
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center">
                      <i
                        className="bi bi-person-check-fill text-primary"
                        style={{ fontSize: "2.5rem" }}
                      ></i>
                      <h3 className="mt-3 mb-0">{profileCompleteness}%</h3>
                      <p className="text-muted mb-0">Profil completat</p>
                      {profileCompleteness < 100 && (
                        <Link
                          href={routes.doctor.profile}
                          className="btn btn-sm btn-outline-primary mt-3"
                        >
                          Completează profilul
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center">
                      <i
                        className="bi bi-calendar-check text-success"
                        style={{ fontSize: "2.5rem" }}
                      ></i>
                      <h3 className="mt-3 mb-0">0</h3>
                      <p className="text-muted mb-0">Consultații totale</p>
                      <Link
                        href={routes.doctor.bookings}
                        className="btn btn-sm btn-outline-success mt-3"
                      >
                        Vezi consultațiile
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body text-center">
                      <i className="bi bi-gear-fill text-info" style={{ fontSize: "2.5rem" }}></i>
                      <h3 className="mt-3 mb-0">Setări</h3>
                      <p className="text-muted mb-0">Gestionează contul</p>
                      <Link
                        href={routes.doctor.settings}
                        className="btn btn-sm btn-outline-info mt-3"
                      >
                        Deschide setările
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="row">
                <div className="col-12">
                  <h2 className="h4 mb-4">
                    <i className="bi bi-lightning-fill me-2"></i>
                    Acțiuni Rapide
                  </h2>
                  <div className="list-group">
                    <Link
                      href={routes.doctor.profile}
                      className="list-group-item list-group-item-action d-flex align-items-center"
                    >
                      <i
                        className="bi bi-person-fill text-primary me-3"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <div>
                        <h5 className="mb-1">Gestionează Profilul</h5>
                        <p className="mb-0 text-muted">
                          Actualizează informațiile tale profesionale
                        </p>
                      </div>
                    </Link>
                    <Link
                      href={routes.doctor.bookings}
                      className="list-group-item list-group-item-action d-flex align-items-center"
                    >
                      <i
                        className="bi bi-calendar3 text-success me-3"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <div>
                        <h5 className="mb-1">Consultații</h5>
                        <p className="mb-0 text-muted">Vezi și gestionează consultațiile tale</p>
                      </div>
                    </Link>
                    <Link
                      href={routes.doctor.settings}
                      className="list-group-item list-group-item-action d-flex align-items-center"
                    >
                      <i
                        className="bi bi-gear-fill text-info me-3"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <div>
                        <h5 className="mb-1">Setări Cont</h5>
                        <p className="mb-0 text-muted">Configurează preferințele contului tău</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
