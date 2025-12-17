import React from "react";
import Link from "next/link";

/**
 * ViewAllLink Component
 *
 * Reusable link component for "View All" patterns.
 * Used in featured sections (clubs, doctors, sports, etc.)
 */

interface ViewAllLinkProps {
  href: string;
  text: string;
  className?: string;
  animationDelay?: string;
}

const ViewAllLink: React.FC<ViewAllLinkProps> = ({
  href,
  text,
  className = "",
  animationDelay = ".5s",
}) => {
  return (
    <div
      className={`col-auto mt-20 wow fadeInUp ${className}`}
      data-wow-duration="1s"
      data-wow-delay={animationDelay}
    >
      <Link href={href} className="bd-view-all-link">
        <span>{text}</span>
        <i className="fal fa-arrow-right"></i>
      </Link>
    </div>
  );
};

export default ViewAllLink;
