/**
 * Email Section Component
 *
 * Reusable section wrapper for email content.
 * Provides consistent spacing and styling.
 */

import { Section } from "@react-email/components";
import * as React from "react";

interface EmailSectionProps {
  children: React.ReactNode;
  backgroundColor?: string;
  padding?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable email section with consistent styling
 */
export const EmailSection = ({
  children,
  backgroundColor = "#ffffff",
  padding = "30px 20px",
  style,
}: EmailSectionProps) => {
  return (
    <Section
      style={{
        ...sectionBase,
        backgroundColor,
        padding,
        ...style,
      }}
    >
      {children}
    </Section>
  );
};

export default EmailSection;

// Base styles
const sectionBase = {
  width: "100%",
};
