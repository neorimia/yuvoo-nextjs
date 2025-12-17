import React from "react";

/**
 * StarRating Component
 *
 * Reusable component for displaying star ratings.
 * Used in testimonials, reviews, and ratings throughout the application.
 */

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "bd-star-rating-sm",
    md: "bd-star-rating-md",
    lg: "bd-star-rating-lg",
  };

  return (
    <div className={`bd-star-rating ${sizeClasses[size]} ${className}`}>
      <div className="bd-star-rating-stars">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= rating;
          return (
            <span
              key={index}
              className={`bd-star-rating-star ${isFilled ? "bd-star-filled" : "bd-star-empty"}`}
            >
              <i className="fa-solid fa-star"></i>
            </span>
          );
        })}
      </div>
      {showNumber && <span className="bd-star-rating-number">{rating}</span>}
    </div>
  );
};

export default StarRating;
