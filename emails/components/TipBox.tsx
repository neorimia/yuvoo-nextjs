/**
 * Tip Box Component
 *
 * Reusable component for displaying tips, warnings, or informational messages.
 * Uses Yuvoo branding with beige/orange accent colors.
 */

import { Section, Text } from "@react-email/components";
import * as React from "react";
import { YuvooColors, EmailTypography } from "../utils/email-types";

interface TipBoxProps {
  children: React.ReactNode;
  variant?: "tip" | "warning" | "info";
  icon?: string;
  style?: React.CSSProperties;
}

/**
 * Tip box component with Yuvoo branding
 */
export const TipBox = ({ children, variant = "tip", icon, style }: TipBoxProps) => {
  const defaultIcon = variant === "tip" ? "💡" : variant === "warning" ? "⚠️" : "ℹ️";

  const boxStyle =
    variant === "warning" ? warningBoxStyle : variant === "info" ? infoBoxStyle : tipBoxStyle;

  return (
    <Section style={{ ...boxStyle, ...style }}>
      <Text style={tipText}>
        {icon || defaultIcon} {children}
      </Text>
    </Section>
  );
};

export default TipBox;

// Styles
const tipBoxStyle = {
  ...EmailTypography.body,
  backgroundColor: YuvooColors.backgroundBeigeLight,
  borderLeft: `4px solid ${YuvooColors.secondary}`,
  padding: "16px 20px",
  borderRadius: "6px",
  marginBottom: "20px",
  fontSize: "15px",
  lineHeight: "24px",
};

const warningBoxStyle = {
  ...EmailTypography.body,
  backgroundColor: YuvooColors.backgroundOrangeLight,
  borderLeft: `4px solid ${YuvooColors.secondary}`,
  padding: "16px 20px",
  borderRadius: "6px",
  marginBottom: "20px",
  fontSize: "15px",
  lineHeight: "24px",
};

const infoBoxStyle = {
  ...EmailTypography.body,
  backgroundColor: YuvooColors.backgroundCyanLight,
  borderLeft: `4px solid ${YuvooColors.primary}`,
  padding: "16px 20px",
  borderRadius: "6px",
  marginBottom: "20px",
  fontSize: "15px",
  lineHeight: "24px",
};

const tipText = {
  ...EmailTypography.body,
  margin: "0",
  fontSize: "15px",
  lineHeight: "24px",
};
