/**
 * Report Loading Skeleton Component
 *
 * Displays skeleton loading state while report data is being fetched.
 * Improves perceived performance and user experience.
 */

import React from "react";

/**
 * Report Loading Skeleton
 *
 * Shows skeleton placeholders for report sections.
 */
export default function ReportLoadingSkeleton() {
  return (
    <div className="report-loading-skeleton">
      {/* Header Skeleton */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <div className="placeholder-glow">
            <span className="placeholder col-6 mb-3" style={{ height: "2rem" }}></span>
            <span className="placeholder col-8" style={{ height: "1rem" }}></span>
          </div>
        </div>
      </div>

      {/* Download Button Skeleton */}
      <div className="text-center mb-5">
        <div className="placeholder-glow">
          <span
            className="placeholder col-4"
            style={{ height: "3rem", borderRadius: "0.5rem" }}
          ></span>
        </div>
      </div>

      {/* Sections Skeleton */}
      {[1, 2, 3, 4, 5, 6, 7].map((section) => (
        <div key={section} className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <div className="placeholder-glow">
              <span className="placeholder col-4 mb-3" style={{ height: "1.5rem" }}></span>
              <span className="placeholder col-12 mb-2" style={{ height: "1rem" }}></span>
              <span className="placeholder col-11 mb-2" style={{ height: "1rem" }}></span>
              <span className="placeholder col-10" style={{ height: "1rem" }}></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
