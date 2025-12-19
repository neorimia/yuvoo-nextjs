/**
 * useEntityFilters Hook
 *
 * Generic hook for filtering entities by status and date.
 * Supports filtering any entity type with configurable accessor functions.
 *
 * @template T - The type of entity to filter
 */

import { useState, useMemo } from "react";

export type StatusFilter = "all" | "pending" | "confirmed" | "completed" | "cancelled";
export type DateFilter = "all" | "upcoming" | "past";

export interface UseEntityFiltersOptions<T> {
  /**
   * Array of entities to filter
   */
  items: T[];
  /**
   * Function to get status from entity
   */
  getStatus: (item: T) => string;
  /**
   * Function to get date from entity
   */
  getDate: (item: T) => Date;
  /**
   * Initial status filter value (default: "all")
   */
  initialStatusFilter?: StatusFilter;
  /**
   * Initial date filter value (default: "all")
   */
  initialDateFilter?: DateFilter;
}

export interface UseEntityFiltersReturn<T> {
  /**
   * Current status filter value
   */
  statusFilter: StatusFilter;
  /**
   * Current date filter value
   */
  dateFilter: DateFilter;
  /**
   * Filtered items based on current filters
   */
  filteredItems: T[];
  /**
   * Function to update status filter
   */
  setStatusFilter: (filter: StatusFilter) => void;
  /**
   * Function to update date filter
   */
  setDateFilter: (filter: DateFilter) => void;
  /**
   * Count of items by status
   */
  statusCounts: {
    all: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

/**
 * useEntityFilters Hook
 *
 * Generic hook for filtering entities by status and date.
 * Automatically filters items based on status and date filters.
 *
 * @example
 * ```tsx
 * const {
 *   statusFilter,
 *   dateFilter,
 *   filteredItems,
 *   setStatusFilter,
 *   setDateFilter,
 *   statusCounts,
 * } = useEntityFilters({
 *   items: bookings,
 *   getStatus: (booking) => booking.status,
 *   getDate: (booking) => booking.scheduledAt,
 * });
 * ```
 */
export function useEntityFilters<T>({
  items,
  getStatus,
  getDate,
  initialStatusFilter = "all",
  initialDateFilter = "all",
}: UseEntityFiltersOptions<T>): UseEntityFiltersReturn<T> {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(initialStatusFilter);
  const [dateFilter, setDateFilter] = useState<DateFilter>(initialDateFilter);

  // Calculate status counts
  const statusCounts = useMemo(() => {
    return {
      all: items.length,
      pending: items.filter((item) => getStatus(item) === "pending").length,
      confirmed: items.filter((item) => getStatus(item) === "confirmed").length,
      completed: items.filter((item) => getStatus(item) === "completed").length,
      cancelled: items.filter((item) => getStatus(item) === "cancelled").length,
    };
  }, [items, getStatus]);

  // Filter items based on status and date filters
  const filteredItems = useMemo(() => {
    let filtered = [...items];

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => getStatus(item) === statusFilter);
    }

    // Apply date filter
    if (dateFilter === "upcoming") {
      const now = new Date();
      filtered = filtered.filter((item) => {
        const itemDate = getDate(item);
        return itemDate >= now;
      });
    } else if (dateFilter === "past") {
      const now = new Date();
      filtered = filtered.filter((item) => {
        const itemDate = getDate(item);
        return itemDate < now;
      });
    }

    return filtered;
  }, [items, statusFilter, dateFilter, getStatus, getDate]);

  return {
    statusFilter,
    dateFilter,
    filteredItems,
    setStatusFilter,
    setDateFilter,
    statusCounts,
  };
}
