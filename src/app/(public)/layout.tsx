import React from "react";

/**
 * Public Routes Layout
 *
 * Layout for public app pages (no authentication required).
 * Includes: quiz, clubs, doctors, search
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
