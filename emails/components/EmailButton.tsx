/**
 * Email Button Component
 *
 * Reusable button component for emails with Yuvoo branding.
 * Supports primary and secondary variants.
 */

import { Button } from "@react-email/components";
import * as React from "react";
import { YuvooColors } from "../utils/email-types";

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  style?: React.CSSProperties;
}

/**
 * Email button component with Yuvoo branding
 */
export const EmailButton = ({ href, children, variant = "primary", style }: EmailButtonProps) => {
  const buttonStyle = variant === "primary" ? buttonPrimaryStyle : buttonSecondaryStyle;

  return (
    <Button href={href} style={{ ...buttonStyle, ...style }}>
      {children}
    </Button>
  );
};

export default EmailButton;

// Styles
const buttonPrimaryStyle = {
  backgroundColor: YuvooColors.primary,
  color: "#FFFFFF",
  padding: "14px 36px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  display: "inline-block",
  boxShadow: "0 2px 4px rgba(0, 187, 174, 0.2)",
};

const buttonSecondaryStyle = {
  backgroundColor: YuvooColors.secondary,
  color: "#FFFFFF",
  padding: "14px 36px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  display: "inline-block",
  boxShadow: "0 2px 4px rgba(255, 155, 36, 0.2)",
};
