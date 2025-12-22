/**
 * CTA Section Component
 *
 * Reusable component for call-to-action sections in emails.
 */

import { Section, Button, Text, Link } from "@react-email/components";
import * as React from "react";
import { YuvooColors } from "../utils/email-types";

interface CTASectionProps {
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  link?: {
    text: string;
    href: string;
    description?: string;
  };
}

/**
 * Call-to-action section component
 */
export const CTASection = ({ primaryButton, secondaryButton, link }: CTASectionProps) => {
  return (
    <Section style={ctaSectionStyle}>
      {primaryButton && (
        <Button href={primaryButton.href} style={buttonPrimaryStyle}>
          {primaryButton.text}
        </Button>
      )}
      {secondaryButton && (
        <Button href={secondaryButton.href} style={buttonSecondaryStyle}>
          {secondaryButton.text}
        </Button>
      )}
      {link && (
        <Text style={linkTextStyle}>
          {link.description && `${link.description} `}
          <Link href={link.href} style={linkStyle}>
            {link.text}
          </Link>
        </Text>
      )}
    </Section>
  );
};

export default CTASection;

// Styles
const ctaSectionStyle = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "16px",
};

const buttonPrimaryStyle = {
  backgroundColor: YuvooColors.primary,
  color: "#FFFFFF",
  padding: "12px 32px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  display: "inline-block",
  marginRight: "10px",
};

const buttonSecondaryStyle = {
  backgroundColor: YuvooColors.secondary,
  color: "#FFFFFF",
  padding: "12px 32px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  display: "inline-block",
};

const linkTextStyle = {
  fontSize: "14px",
  color: YuvooColors.textSecondary,
  marginTop: "12px",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const linkStyle = {
  color: YuvooColors.primary,
  textDecoration: "underline",
};
