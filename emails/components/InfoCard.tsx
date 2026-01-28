/**
 * Info Card Component
 *
 * Reusable component for displaying information in cards.
 * Used for recommendations, highlights, etc.
 */

import { Section } from "@react-email/components";
import * as React from "react";
import { YuvooColors } from "../utils/email-types";

interface InfoCardProps {
  children: React.ReactNode;
  variant?: "default" | "highlight" | "subtle";
  style?: React.CSSProperties;
}

/**
 * Info card component with Yuvoo branding
 */
export const InfoCard = ({ children, variant = "default", style }: InfoCardProps) => {
  const cardStyle =
    variant === "highlight"
      ? highlightCardStyle
      : variant === "subtle"
        ? subtleCardStyle
        : defaultCardStyle;

  return <Section style={{ ...cardStyle, ...style }}>{children}</Section>;
};

export default InfoCard;

// Styles
const defaultCardStyle = {
  backgroundColor: YuvooColors.backgroundWhite,
  border: `1px solid ${YuvooColors.borderGrey}`,
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "16px",
};

const highlightCardStyle = {
  backgroundColor: YuvooColors.backgroundCyanLight,
  border: `2px solid ${YuvooColors.primary}`,
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "20px",
};

const subtleCardStyle = {
  backgroundColor: YuvooColors.backgroundLight,
  border: `1px solid ${YuvooColors.borderGrey}`,
  borderRadius: "6px",
  padding: "16px",
  marginBottom: "12px",
};
