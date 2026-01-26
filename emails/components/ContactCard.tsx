/**
 * Contact Card Component
 *
 * Reusable component for displaying contact information in emails.
 * Used for club contact details, support info, etc.
 */

import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import { YuvooColors, EmailTypography } from "../utils/email-types";

interface ContactCardProps {
  title?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  style?: React.CSSProperties;
}

/**
 * Contact card component with Yuvoo branding
 */
export const ContactCard = ({
  title = "📞 Date de contact",
  email,
  phone,
  website,
  address,
  style,
}: ContactCardProps) => {
  const hasContactInfo = email || phone || website || address;

  if (!hasContactInfo) {
    return null;
  }

  return (
    <Section style={{ ...contactCardStyle, ...style }}>
      <Text style={contactCardTitle}>{title}</Text>
      {email && (
        <Text style={contactItem}>
          <strong style={contactLabel}>Email:</strong>{" "}
          <Link href={`mailto:${email}`} style={linkStyle}>
            {email}
          </Link>
        </Text>
      )}
      {phone && (
        <Text style={contactItem}>
          <strong style={contactLabel}>Telefon:</strong>{" "}
          <Link href={`tel:${phone}`} style={linkStyle}>
            {phone}
          </Link>
        </Text>
      )}
      {website && (
        <Text style={contactItem}>
          <strong style={contactLabel}>Website:</strong>{" "}
          <Link href={website} style={linkStyle}>
            {website}
          </Link>
        </Text>
      )}
      {address && (
        <Text style={contactItem}>
          <strong style={contactLabel}>Adresă:</strong> {address}
        </Text>
      )}
    </Section>
  );
};

export default ContactCard;

// Styles
const contactCardStyle = {
  backgroundColor: YuvooColors.backgroundCyanLight,
  border: `2px solid ${YuvooColors.primary}`,
  borderRadius: "8px",
  padding: "24px",
  marginTop: "24px",
  marginBottom: "24px",
};

const contactCardTitle = {
  ...EmailTypography.heading,
  fontSize: "18px",
  marginBottom: "16px",
  color: YuvooColors.textPrimary,
};

const contactItem = {
  ...EmailTypography.body,
  marginBottom: "12px",
  fontSize: "16px",
};

const contactLabel = {
  color: YuvooColors.textPrimary,
  fontWeight: "600",
};

const linkStyle = {
  color: YuvooColors.primary,
  textDecoration: "none",
  fontWeight: "500",
};
