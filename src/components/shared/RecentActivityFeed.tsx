/**
 * Recent Activity Feed Component (Shared)
 *
 * Generic component for displaying recent activity items (bookings, consultations, etc.).
 * Supports custom item rendering through renderItem prop.
 * Follows Yuvoo design system with proper typography, colors, and spacing.
 *
 * @template T - The type of activity items
 */

import React from "react";
import Link from "next/link";

export interface RecentActivityFeedProps<T> {
  /** Array of activity items to display */
  items: T[];
  /** Optional title for the feed (default: "Activitate Recentă") */
  title?: string;
  /** Optional empty state message (default: "Nu există activitate recentă") */
  emptyMessage?: string;
  /** Optional route for "View All" button */
  viewAllRoute?: string;
  /** Optional label for "View All" button (default: "Vezi toate") */
  viewAllLabel?: string;
  /** Function to render each activity item */
  renderItem: (item: T) => React.ReactNode;
  /** Function to get unique ID from item */
  getItemId: (item: T) => string;
  /** Function to get date from item */
  getItemDate: (item: T) => Date;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Generic Recent Activity Feed Component
 *
 * Displays a list of recent activity items with optional "View All" button.
 * Supports custom rendering through renderItem prop for maximum flexibility.
 *
 * @example
 * ```tsx
 * <RecentActivityFeed
 *   items={bookings}
 *   title="Activitate Recentă"
 *   viewAllRoute={routes.club.bookings}
 *   renderItem={(booking) => (
 *     <div>
 *       <h6>Rezervare #{booking.id.slice(0, 8)}</h6>
 *       <p>{formatDate(booking.scheduledAt)}</p>
 *     </div>
 *   )}
 *   getItemId={(booking) => booking.id}
 *   getItemDate={(booking) => booking.scheduledAt}
 * />
 * ```
 */
function RecentActivityFeed<T>({
  items,
  title = "Activitate Recentă",
  emptyMessage = "Nu există activitate recentă",
  viewAllRoute,
  viewAllLabel = "Vezi toate",
  renderItem,
  getItemId,
  getItemDate,
  className,
}: RecentActivityFeedProps<T>): React.ReactElement {
  // Sort items by date (most recent first)
  const sortedItems = [...items].sort((a, b) => {
    const dateA = getItemDate(a).getTime();
    const dateB = getItemDate(b).getTime();
    return dateB - dateA; // Descending order (newest first)
  });

  if (sortedItems.length === 0) {
    return (
      <div className={`card border-0 shadow-sm bd-activity-feed-card ${className || ""}`}>
        <div className="card-body text-center py-5 bd-activity-feed-empty">
          <i className="bi bi-inbox bd-activity-feed-empty-icon"></i>
          <p className="bd-activity-feed-empty-text mt-3 mb-0">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`card border-0 shadow-sm bd-activity-feed-card ${className || ""}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="bd-activity-feed-title mb-0">
            <i className="bi bi-clock-history me-2 text-yuvoo-primary"></i>
            {title}
          </h5>
          {viewAllRoute && (
            <Link
              href={viewAllRoute}
              className="btn btn-sm btn-outline-primary bd-activity-feed-view-all-btn"
            >
              {viewAllLabel}
            </Link>
          )}
        </div>

        <div className="list-group list-group-flush bd-recent-activity-feed">
          {sortedItems.map((item) => (
            <div
              key={getItemId(item)}
              className="list-group-item border-0 border-bottom px-0 py-3 bd-activity-feed-item"
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentActivityFeed;
