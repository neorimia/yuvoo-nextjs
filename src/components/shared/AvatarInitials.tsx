import React from "react";

/**
 * AvatarInitials Component
 *
 * Reusable component for displaying user initials in a circular avatar.
 * Used in testimonials, user profiles, and comments.
 */

interface AvatarInitialsProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  backgroundColor?: string;
  textColor?: string;
}

const AvatarInitials: React.FC<AvatarInitialsProps> = ({
  initials,
  size = "md",
  className = "",
  backgroundColor,
  textColor,
}) => {
  const sizeClasses = {
    sm: "bd-avatar-initials-sm",
    md: "bd-avatar-initials-md",
    lg: "bd-avatar-initials-lg",
  };

  const style: React.CSSProperties = {};
  if (backgroundColor) style.backgroundColor = backgroundColor;
  if (textColor) style.color = textColor;

  return (
    <div
      className={`bd-avatar-initials ${sizeClasses[size]} ${className}`}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      <span className="bd-avatar-initials-text">{initials}</span>
    </div>
  );
};

export default AvatarInitials;
