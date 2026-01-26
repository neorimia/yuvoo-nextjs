/**
 * Section Heading Component
 *
 * Reusable component for section headings in emails.
 * Consistent styling with Yuvoo branding.
 */

import { Heading } from "@react-email/components";
import * as React from "react";
import { YuvooColors, EmailTypography } from "../utils/email-types";

interface SectionHeadingProps {
  children: React.ReactNode;
  as?: "h2" | "h3" | "h4";
  style?: React.CSSProperties;
}

/**
 * Section heading component with Yuvoo branding
 */
export const SectionHeading = ({ children, as = "h2", style }: SectionHeadingProps) => {
  return (
    <Heading as={as} style={{ ...sectionHeadingStyle, ...style }}>
      {children}
    </Heading>
  );
};

export default SectionHeading;

// Styles
const sectionHeadingStyle = {
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "28px",
  color: YuvooColors.primary,
  marginTop: "0",
  marginBottom: "16px",
  fontFamily: EmailTypography.heading.fontFamily,
};
