/**
 * Statistics Cards Component
 *
 * Reusable component for displaying statistics in card format.
 * Works for bookings, consultations, or any other statistics display.
 * Follows Yuvoo design system with proper typography, colors, and spacing.
 */

import React from "react";
import Link from "next/link";

export type StatVariant = "total" | "pending" | "confirmed" | "completed" | "cancelled";

export interface StatItem {
  /**
   * Label text for the statistic
   */
  label: string;
  /**
   * Numeric value to display
   */
  value: number;
  /**
   * Bootstrap icon class (e.g., "bi-calendar-check")
   */
  icon: string;
  /**
   * Variant type for styling
   */
  variant: StatVariant;
}

export interface StatisticsCardsProps {
  /**
   * Array of statistics to display
   */
  stats: StatItem[];
  /**
   * Optional route for "View All" button
   */
  viewAllRoute?: string;
  /**
   * Optional label for "View All" button
   */
  viewAllLabel?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * CSS class prefix for card styling (default: "bd-booking-stat")
   */
  cardClassPrefix?: string;
}

/**
 * StatisticsCards Component
 *
 * Displays statistics in a responsive grid of cards with:
 * - Icon, value, and label for each statistic
 * - Variant-based styling (total, pending, confirmed, completed, cancelled)
 * - Optional "View All" button
 *
 * @example
 * ```tsx
 * <StatisticsCards
 *   stats={[
 *     { label: "Total", value: 10, icon: "bi-calendar-check", variant: "total" },
 *     { label: "Pending", value: 3, icon: "bi-clock", variant: "pending" }
 *   ]}
 *   viewAllRoute={routes.club.bookings}
 *   viewAllLabel="Vezi toate rezervările"
 * />
 * ```
 */
const StatisticsCards: React.FC<StatisticsCardsProps> = ({
  stats,
  viewAllRoute,
  viewAllLabel,
  className = "",
  cardClassPrefix = "bd-booking-stat",
}) => {
  return (
    <div className={`row g-4 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="col-md-6 col-lg-4">
          <div className={`${cardClassPrefix}-card card border-0 shadow-sm h-100`}>
            <div
              className={`card-body ${cardClassPrefix}-card-body ${cardClassPrefix}-${stat.variant} text-center`}
            >
              <i className={`bi ${stat.icon} ${cardClassPrefix}-icon`}></i>
              <h3 className={`${cardClassPrefix}-value mt-3 mb-0`}>{stat.value}</h3>
              <p className={`${cardClassPrefix}-label mb-0`}>{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
      {viewAllRoute && viewAllLabel && (
        <div className="col-12 mt-3">
          <Link
            href={viewAllRoute}
            className={`btn btn-outline-primary ${cardClassPrefix}-cta-btn w-100`}
          >
            <i className="bi bi-list-ul me-2"></i>
            {viewAllLabel}
          </Link>
        </div>
      )}
    </div>
  );
};

export default StatisticsCards;
