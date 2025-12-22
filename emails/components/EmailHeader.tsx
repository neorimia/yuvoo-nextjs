/**
 * Email Header Component
 *
 * Yuvoo-branded header for email templates.
 * Uses primary brand color (#00BBAE) and includes logo/branding.
 */

import { Heading, Section } from "@react-email/components";
import * as React from "react";

interface EmailHeaderProps {
  title?: string;
}

/**
 * Yuvoo email header with brand colors
 */
export const EmailHeader = ({ title = "Yuvoo" }: EmailHeaderProps) => {
  return (
    <Section style={header}>
      <Heading style={heading}>{title}</Heading>
    </Section>
  );
};

export default EmailHeader;

// Styles
const header = {
  backgroundColor: "#00BBAE",
  padding: "30px 20px",
  textAlign: "center" as const,
};

const heading = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
