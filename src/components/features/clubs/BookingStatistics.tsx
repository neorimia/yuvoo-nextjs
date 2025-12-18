/**
 * Booking Statistics Component
 *
 * Displays booking statistics cards with counts for different statuses.
 * Follows Yuvoo design system with proper typography, colors, and spacing.
 */

import React from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface BookingStatisticsProps {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

const BookingStatistics: React.FC<BookingStatisticsProps> = ({
  total,
  pending,
  confirmed,
  completed,
  cancelled,
}) => {
  const stats = [
    {
      label: "Total",
      value: total,
      icon: "bi-calendar-check",
      variant: "total",
    },
    {
      label: "În așteptare",
      value: pending,
      icon: "bi-clock",
      variant: "pending",
    },
    {
      label: "Confirmate",
      value: confirmed,
      icon: "bi-check-circle",
      variant: "confirmed",
    },
    {
      label: "Finalizate",
      value: completed,
      icon: "bi-check2-all",
      variant: "completed",
    },
    {
      label: "Anulate",
      value: cancelled,
      icon: "bi-x-circle",
      variant: "cancelled",
    },
  ];

  return (
    <div className="row g-4">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-6 col-lg-4">
          <div className="bd-booking-stat-card card border-0 shadow-sm h-100">
            <div
              className={`card-body bd-booking-stat-card-body bd-booking-stat-${stat.variant} text-center`}
            >
              <i className={`bi ${stat.icon} bd-booking-stat-icon`}></i>
              <h3 className="bd-booking-stat-value mt-3 mb-0">{stat.value}</h3>
              <p className="bd-booking-stat-label mb-0">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="col-12 mt-3">
        <Link
          href={routes.club.bookings}
          className="btn btn-outline-primary bd-booking-statistics-cta-btn w-100"
        >
          <i className="bi bi-list-ul me-2"></i>
          Vezi toate rezervările
        </Link>
      </div>
    </div>
  );
};

export default BookingStatistics;
