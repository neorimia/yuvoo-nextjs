/**
 * Booking Statistics Component
 *
 * Wrapper component for club booking statistics.
 * Uses the shared StatisticsCards component with booking-specific configuration.
 */

import React from "react";
import StatisticsCards, { type StatItem } from "@/components/shared/StatisticsCards";
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
  const stats: StatItem[] = [
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
    <StatisticsCards
      stats={stats}
      viewAllRoute={routes.club.bookings}
      viewAllLabel="Vezi toate rezervările"
    />
  );
};

export default BookingStatistics;
