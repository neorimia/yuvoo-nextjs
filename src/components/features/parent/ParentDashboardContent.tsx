/**
 * Parent Dashboard Content Component
 *
 * Orchestrates all dashboard sections for parent dashboard.
 * Includes: stats, recent bookings, quick actions, profile completeness,
 * getting started checklist, upcoming events, and activity feed.
 */

"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { Child } from "@/modules/children/children.types";
import type { QuizResult } from "@/modules/quiz/quiz.types";
import { formatDate, formatTime } from "@/lib/utils/date-formatting";
import { getStatusBadgeConfig } from "@/lib/utils/status-badges";

interface ParentDashboardContentProps {
  childrenList: Child[];
  bookings: Booking[];
  recentQuizzes: QuizResult[];
  profileCompleteness: {
    percentage: number;
    completedFields: number;
    totalFields: number;
    missingFields: string[];
  };
  savedItemsCount: number;
}

const ParentDashboardContent: React.FC<ParentDashboardContentProps> = ({
  childrenList,
  bookings,
  recentQuizzes,
  profileCompleteness,
  savedItemsCount,
}) => {
  // Calculate statistics
  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(
    (b) =>
      b.status !== "cancelled" && b.status !== "completed" && new Date(b.scheduledAt) >= new Date()
  );
  const completedBookings = bookings.filter((b) => b.status === "completed");
  const totalQuizzes = recentQuizzes.length;
  const totalRecommendations = recentQuizzes.reduce(
    (sum, quiz) => sum + quiz.recommendations.length,
    0
  );

  // Getting started checklist (for new parents)
  const hasChildren = childrenList.length > 0;

  // Get recent bookings (last 5)
  const recentBookings = bookings
    .filter((b) => b.status !== "cancelled")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Get upcoming events (next 7 days)
  const now = new Date();
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const upcomingEvents = bookings.filter(
    (b) =>
      b.status !== "cancelled" &&
      b.status !== "completed" &&
      new Date(b.scheduledAt) >= now &&
      new Date(b.scheduledAt) <= nextWeek
  );

  const hasCompletedQuiz = totalQuizzes > 0;
  const hasBooking = totalBookings > 0;
  const hasCompleteProfile = profileCompleteness.percentage >= 100;

  const checklistItems = [
    {
      id: "profile",
      label: "Completează profilul",
      completed: hasCompleteProfile,
      route: routes.parent.profile,
    },
    {
      id: "child",
      label: "Adaugă primul copil",
      completed: hasChildren,
      route: routes.parent.children.add,
    },
    {
      id: "quiz",
      label: "Completează primul chestionar",
      completed: hasCompletedQuiz,
      route: routes.quiz.intro,
    },
    {
      id: "booking",
      label: "Rezervă prima ședință de probă",
      completed: hasBooking,
      route: routes.clubs.list,
    },
  ];

  const allChecklistCompleted = checklistItems.every((item) => item.completed);

  return (
    <div className="bd-parent-dashboard-content">
      {/* Quick Stats */}
      <div className="row g-4 mb-5">
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i className="bi bi-people-fill text-primary" style={{ fontSize: "2.5rem" }}></i>
              <h3 className="mt-3 mb-0">{childrenList.length}</h3>
              <p className="text-muted mb-0">Copii înregistrați</p>
              <Link
                href={routes.parent.children.list}
                className="btn btn-sm btn-outline-primary mt-3"
              >
                Gestionează copiii
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i className="bi bi-clipboard-check text-success" style={{ fontSize: "2.5rem" }}></i>
              <h3 className="mt-3 mb-0">{totalQuizzes}</h3>
              <p className="text-muted mb-0">Chestionare completate</p>
              <Link href={routes.quiz.intro} className="btn btn-sm btn-outline-success mt-3">
                Completează un chestionar
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i className="bi bi-calendar-check text-info" style={{ fontSize: "2.5rem" }}></i>
              <h3 className="mt-3 mb-0">{totalBookings}</h3>
              <p className="text-muted mb-0">Total rezervări</p>
              <Link href={routes.parent.bookings} className="btn btn-sm btn-outline-info mt-3">
                Vezi rezervările
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i className="bi bi-star-fill text-warning" style={{ fontSize: "2.5rem" }}></i>
              <h3 className="mt-3 mb-0">{savedItemsCount}</h3>
              <p className="text-muted mb-0">Elemente salvate</p>
              <Link href={routes.parent.savedItems} className="btn btn-sm btn-outline-warning mt-3">
                Vezi favorite
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column */}
        <div className="col-lg-8">
          {/* Getting Started Checklist (for new parents) */}
          {!allChecklistCompleted && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">
                  <i className="bi bi-check-circle me-2"></i>
                  Începe aici
                </h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-3">
                  Completează aceste pași pentru a începe să folosești Yuvoo:
                </p>
                <ul className="list-unstyled mb-0">
                  {checklistItems.map((item) => (
                    <li key={item.id} className="mb-2">
                      <div className="d-flex align-items-center">
                        {item.completed ? (
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                        ) : (
                          <i className="bi bi-circle text-muted me-2"></i>
                        )}
                        <span
                          className={
                            item.completed ? "text-muted text-decoration-line-through" : ""
                          }
                        >
                          {item.label}
                        </span>
                        {!item.completed && (
                          <Link
                            href={item.route}
                            className="btn btn-sm btn-outline-primary ms-auto"
                          >
                            Începe
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Profile Completeness Indicator */}
          {profileCompleteness.percentage < 100 && (
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">
                    <i className="bi bi-person-check me-2 text-primary"></i>
                    Completarea profilului
                  </h5>
                  <span className="badge bg-primary">{profileCompleteness.percentage}%</span>
                </div>
                <div className="progress mb-3" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${profileCompleteness.percentage}%` }}
                    aria-valuenow={profileCompleteness.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
                {profileCompleteness.missingFields.length > 0 && (
                  <div>
                    <small className="text-muted d-block mb-2">Câmpuri lipsă:</small>
                    <ul className="list-unstyled mb-0">
                      {profileCompleteness.missingFields.slice(0, 3).map((field, index) => (
                        <li key={index} className="small text-muted">
                          <i className="bi bi-dash me-1"></i>
                          {field}
                        </li>
                      ))}
                    </ul>
                    <Link href={routes.parent.profile} className="btn btn-sm btn-primary mt-3">
                      Completează profilul
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recent Bookings */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  <i className="bi bi-calendar-event me-2"></i>
                  Rezervări Recente
                </h5>
                <Link href={routes.parent.bookings} className="btn btn-sm btn-outline-primary">
                  Vezi toate
                </Link>
              </div>
            </div>
            <div className="card-body">
              {recentBookings.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-calendar-x display-6 text-muted mb-3"></i>
                  <p className="text-muted mb-0">Nu ai rezervări recente</p>
                  <Link href={routes.clubs.list} className="btn btn-primary mt-3">
                    Rezervă o ședință de probă
                  </Link>
                </div>
              ) : (
                <div className="list-group list-group-flush">
                  {recentBookings.map((booking) => {
                    const statusBadge = getStatusBadgeConfig(booking.status);
                    return (
                      <div key={booking.id} className="list-group-item px-0">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center mb-1">
                              <strong>
                                {booking.type === "club_trial" ? "Ședință de probă" : "Consultație"}
                              </strong>
                              <span className={`badge ${statusBadge.class} ms-2`}>
                                {statusBadge.icon && <i className={`${statusBadge.icon} me-1`}></i>}
                                {statusBadge.label}
                              </span>
                            </div>
                            <small className="text-muted">
                              {formatDate(booking.scheduledAt)} la {formatTime(booking.scheduledAt)}
                            </small>
                          </div>
                          <Link
                            href={routes.parent.bookingsDetails(booking.id)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Detalii
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-warning bg-opacity-10">
                <h5 className="card-title mb-0">
                  <i className="bi bi-bell me-2"></i>
                  Evenimente Viitoare (Următoarele 7 zile)
                </h5>
              </div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {upcomingEvents.map((booking) => (
                    <div key={booking.id} className="list-group-item px-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <strong>
                            {booking.type === "club_trial" ? "Ședință de probă" : "Consultație"}
                          </strong>
                          <div className="small text-muted mt-1">
                            {formatDate(booking.scheduledAt)} la {formatTime(booking.scheduledAt)}
                          </div>
                        </div>
                        <Link
                          href={routes.parent.bookingsDetails(booking.id)}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Detalii
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          {/* Quick Actions */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">
                <i className="bi bi-lightning-charge me-2"></i>
                Acțiuni Rapide
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link href={routes.quiz.intro} className="btn btn-primary">
                  <i className="bi bi-clipboard-check me-2"></i>
                  Începe Chestionar
                </Link>
                <Link href={routes.parent.children.add} className="btn btn-outline-primary">
                  <i className="bi bi-person-plus me-2"></i>
                  Adaugă Copil
                </Link>
                <Link href={routes.clubs.list} className="btn btn-outline-primary">
                  <i className="bi bi-search me-2"></i>
                  Caută Cluburi
                </Link>
                <Link href={routes.doctors.list} className="btn btn-outline-primary">
                  <i className="bi bi-search me-2"></i>
                  Caută Doctori
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced Statistics */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">
                <i className="bi bi-bar-chart me-2"></i>
                Statistici
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3 text-center">
                <div className="col-6">
                  <div className="border-end">
                    <div className="h4 mb-0 text-primary">{upcomingBookings.length}</div>
                    <small className="text-muted d-block">Rezervări viitoare</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="h4 mb-0 text-success">{completedBookings.length}</div>
                  <small className="text-muted d-block">Rezervări finalizate</small>
                </div>
                <div className="col-6">
                  <div className="border-end">
                    <div className="h4 mb-0 text-info">{totalRecommendations}</div>
                    <small className="text-muted d-block">Recomandări primite</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="h4 mb-0 text-warning">{savedItemsCount}</div>
                  <small className="text-muted d-block">Elemente salvate</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboardContent;
