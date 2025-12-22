/**
 * Club Preview Component
 *
 * Reusable component for displaying club previews in emails.
 */

import { Section, Text, Link } from "@react-email/components";
import * as React from "react";
import { YuvooColors, EmailTypography } from "../utils/email-types";
import { routes } from "@/lib/routes";
import type { Club } from "@/modules/clubs/clubs.types";

interface ClubPreviewProps {
  club: Club;
}

/**
 * Club preview card component
 */
export const ClubPreview = ({ club }: ClubPreviewProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const clubUrl = `${appUrl}${routes.clubs.detail(club.slug)}`;

  return (
    <Section style={clubCardStyle}>
      <Text style={clubNameStyle}>{club.name}</Text>
      <Text style={smallTextStyle}>
        <strong>Locație:</strong> {club.location.city}
        {club.location.district && `, ${club.location.district}`}
      </Text>
      {club.description && (
        <Text style={smallTextStyle}>{club.description.substring(0, 150)}...</Text>
      )}
      <Link href={clubUrl} style={clubLinkStyle}>
        Vezi detalii club →
      </Link>
    </Section>
  );
};

export default ClubPreview;

// Styles
const clubCardStyle = {
  backgroundColor: YuvooColors.backgroundLight,
  border: `1px solid ${YuvooColors.borderGrey}`,
  borderRadius: "6px",
  padding: "16px",
  marginBottom: "12px",
};

const clubNameStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: YuvooColors.textPrimary,
  marginTop: "0",
  marginBottom: "8px",
  fontFamily: EmailTypography.heading.fontFamily,
};

const smallTextStyle = {
  ...EmailTypography.small,
  marginBottom: "8px",
};

const clubLinkStyle = {
  color: YuvooColors.primary,
  textDecoration: "underline",
  fontSize: "14px",
};
