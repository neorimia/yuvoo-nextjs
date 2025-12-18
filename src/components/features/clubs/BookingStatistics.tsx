/**
 * Booking Statistics Component
 *
 * Displays booking statistics cards with counts for different statuses.
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
      color: "primary",
      bgColor: "bg-primary",
      textColor: "text-white",
    },
    {
      label: "În așteptare",
      value: pending,
      icon: "bi-clock",
      color: "warning",
      bgColor: "bg-warning",
      textColor: "text-dark",
    },
    {
      label: "Confirmate",
      value: confirmed,
      icon: "bi-check-circle",
      color: "success",
      bgColor: "bg-success",
      textColor: "text-white",
    },
    {
      label: "Finalizate",
      value: completed,
      icon: "bi-check2-all",
      color: "info",
      bgColor: "bg-info",
      textColor: "text-white",
    },
    {
      label: "Anulate",
      value: cancelled,
      icon: "bi-x-circle",
      color: "danger",
      bgColor: "bg-danger",
      textColor: "text-white",
    },
  ];

  return (
    <div className="row g-4">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className={`card-body text-center ${stat.bgColor} ${stat.textColor}`}>
              <i className={`bi ${stat.icon}`} style={{ fontSize: "2.5rem" }}></i>
              <h3 className="mt-3 mb-0">{stat.value}</h3>
              <p className="mb-0 small">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="col-12 mt-3">
        <Link href={routes.club.bookings} className="btn btn-outline-primary w-100">
          <i className="bi bi-list-ul me-2"></i>
          Vezi toate rezervările
        </Link>
      </div>
    </div>
  );
};

export default BookingStatistics;
