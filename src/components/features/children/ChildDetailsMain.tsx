/**
 * Child Details Main Component
 *
 * Displays comprehensive child profile information including:
 * - Basic profile information
 * - Quick stats (quizzes, bookings)
 * - Recent quizzes
 * - Recent bookings
 * - Action buttons
 */

"use client";

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Child } from "@/modules/children/children.types";
import type { QuizResult } from "@/modules/quiz/quiz.types";
import type { Booking } from "@/modules/bookings/bookings.types";

interface ChildDetailsMainProps {
  child: Child;
  quizzes: QuizResult[];
  bookings: Booking[];
}

const ChildDetailsMain: React.FC<ChildDetailsMainProps> = ({ child, quizzes, bookings }) => {
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

  const recentQuizzes = quizzes.slice(0, 3);
  const recentBookings = bookings.slice(0, 3);

  return (
    <div className="bd-child-details-main">
      {/* Profile Header */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="mb-2">
                {child.firstName} {child.lastName}
              </h2>
              <div className="d-flex flex-wrap gap-3 mb-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar-event text-yuvoo-primary me-2"></i>
                  <span className="text-muted">
                    <strong>{child.age} ani</strong> • {formatDate(child.dateOfBirth)}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-person text-yuvoo-primary me-2"></i>
                  <span className="text-muted">{genderLabel}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="d-flex gap-2 justify-content-md-end">
                <Link
                  href={routes.parent.children.edit(child.id)}
                  className="btn btn-primary btn-sm"
                >
                  <i className="bi bi-pencil me-1"></i>
                  Editează
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100 text-center">
            <div className="card-body">
              <div className="mb-2">
                <i
                  className="bi bi-clipboard-check"
                  style={{ fontSize: "2.5rem", color: "var(--bd-theme-1)" }}
                ></i>
              </div>
              <h3 className="mb-1">{quizzes.length}</h3>
              <p className="text-muted mb-0 small">
                {quizzes.length === 1 ? "Chestionar completat" : "Chestionare completate"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 text-center">
            <div className="card-body">
              <div className="mb-2">
                <i
                  className="bi bi-calendar-check"
                  style={{ fontSize: "2.5rem", color: "var(--bd-theme-1)" }}
                ></i>
              </div>
              <h3 className="mb-1">{bookings.length}</h3>
              <p className="text-muted mb-0 small">
                {bookings.length === 1 ? "Rezervare" : "Rezervări"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 text-center">
            <div className="card-body">
              <div className="mb-2">
                <i
                  className="bi bi-trophy"
                  style={{ fontSize: "2.5rem", color: "var(--bd-theme-1)" }}
                ></i>
              </div>
              <h3 className="mb-1">
                {quizzes.length > 0 ? quizzes[0].recommendations?.length || 0 : 0}
              </h3>
              <p className="text-muted mb-0 small">
                {quizzes.length > 0
                  ? quizzes[0].recommendations?.length === 1
                    ? "Sport recomandat"
                    : "Sporturi recomandate"
                  : "Fără recomandări"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Quizzes */}
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-clipboard-check me-2"></i>
            Chestionare Recente
          </h5>
          {quizzes.length > 0 && (
            <Link
              href={routes.parent.children.quizzes(child.id)}
              className="btn btn-sm btn-outline-primary"
            >
              Vezi toate ({quizzes.length})
            </Link>
          )}
        </div>
        <div className="card-body">
          {recentQuizzes.length === 0 ? (
            <div className="text-center py-4">
              <i className="bi bi-clipboard" style={{ fontSize: "3rem", color: "#ccc" }}></i>
              <p className="text-muted mt-3 mb-0">Nu există chestionare completate încă.</p>
              <Link href={routes.quiz.intro} className="btn btn-primary btn-sm mt-3">
                <i className="bi bi-plus-circle me-1"></i>
                Completează primul chestionar
              </Link>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {recentQuizzes.map((quiz) => (
                <Link
                  key={quiz.id}
                  href={routes.quiz.results(quiz.id)}
                  className="list-group-item list-group-item-action"
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1">
                        Chestionar din {new Date(quiz.createdAt).toLocaleDateString("ro-RO")}
                      </h6>
                      <p className="mb-1 small text-muted">
                        {quiz.recommendations?.length || 0}{" "}
                        {quiz.recommendations?.length === 1
                          ? "sport recomandat"
                          : "sporturi recomandate"}
                        {quiz.specialistRecommendation && " • Specialist recomandat"}
                      </p>
                    </div>
                    <i className="bi bi-chevron-right text-muted"></i>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings */}
      {bookings.length > 0 && (
        <div className="card shadow-sm mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="bi bi-calendar-check me-2"></i>
              Rezervări Recente
            </h5>
            <Link href={routes.parent.bookings} className="btn btn-sm btn-outline-primary">
              Vezi toate ({bookings.length})
            </Link>
          </div>
          <div className="card-body">
            <div className="list-group list-group-flush">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1">
                        {booking.type === "club_trial" ? "Ședință de probă" : "Consultație"}
                      </h6>
                      <p className="mb-1 small text-muted">
                        {new Date(booking.scheduledAt).toLocaleDateString("ro-RO", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        la{" "}
                        {new Date(booking.scheduledAt).toLocaleTimeString("ro-RO", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <span
                        className={`badge ${
                          booking.status === "confirmed"
                            ? "bg-success"
                            : booking.status === "cancelled"
                              ? "bg-secondary"
                              : booking.status === "completed"
                                ? "bg-info"
                                : "bg-warning"
                        }`}
                      >
                        {booking.status === "pending"
                          ? "În așteptare"
                          : booking.status === "confirmed"
                            ? "Confirmată"
                            : booking.status === "cancelled"
                              ? "Anulată"
                              : "Finalizată"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="d-flex gap-3 flex-wrap">
        <Link href={routes.quiz.intro} className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Completează Chestionar Nou
        </Link>
        <Link href={routes.parent.children.quizzes(child.id)} className="btn btn-outline-primary">
          <i className="bi bi-clipboard-check me-2"></i>
          Vezi Istoricul Chestionarelor
        </Link>
        <Link href={routes.clubs.list} className="btn btn-outline-primary">
          <i className="bi bi-building me-2"></i>
          Explorează Cluburi
        </Link>
      </div>
    </div>
  );
};

export default ChildDetailsMain;
