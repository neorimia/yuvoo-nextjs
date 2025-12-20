/**
 * Date Formatting Utility
 *
 * Provides consistent date and time formatting functions using Romanian locale.
 * All functions use "ro-RO" locale for consistent Romanian date/time display.
 */

/**
 * Format date as full date with weekday
 *
 * Returns a formatted date string in Romanian locale with weekday, day, month, and year.
 * Example: "luni, 1 ianuarie 2024"
 *
 * @param date - Date object or date string to format
 * @returns Formatted date string in Romanian
 *
 * @example
 * ```tsx
 * formatDate(new Date("2024-01-15"))
 * // Returns: "luni, 15 ianuarie 2024"
 * ```
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("ro-RO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format time only
 *
 * Returns a formatted time string in Romanian locale with hour and minute.
 * Example: "14:30"
 *
 * @param date - Date object or date string to format
 * @returns Formatted time string (HH:MM)
 *
 * @example
 * ```tsx
 * formatTime(new Date("2024-01-15T14:30:00"))
 * // Returns: "14:30"
 * ```
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format date and time together
 *
 * Returns a formatted date-time string in Romanian locale without weekday.
 * Example: "1 ianuarie 2024, 14:30"
 *
 * @param date - Date object or date string to format
 * @returns Formatted date-time string
 *
 * @example
 * ```tsx
 * formatDateTime(new Date("2024-01-15T14:30:00"))
 * // Returns: "15 ianuarie 2024, 14:30"
 * ```
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format date for activity feeds (compact format with time)
 *
 * Returns a formatted date-time string optimized for activity feeds.
 * Uses Intl.DateTimeFormat for consistent formatting.
 * Example: "1 ianuarie 2024, 14:30"
 *
 * @param date - Date object or date string to format
 * @returns Formatted date-time string for activity feeds
 *
 * @example
 * ```tsx
 * formatDateForActivityFeed(new Date("2024-01-15T14:30:00"))
 * // Returns: "15 ianuarie 2024, 14:30"
 * ```
 */
export function formatDateForActivityFeed(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
}

/**
 * Format date only (without weekday, without time)
 *
 * Returns a formatted date string in Romanian locale without weekday or time.
 * Example: "1 ianuarie 2024"
 *
 * @param date - Date object or date string to format
 * @returns Formatted date string (day, month, year)
 *
 * @example
 * ```tsx
 * formatDateOnly(new Date("2024-01-15"))
 * // Returns: "15 ianuarie 2024"
 * ```
 */
export function formatDateOnly(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
