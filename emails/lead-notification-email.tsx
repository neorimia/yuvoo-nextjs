/**
 * Lead Notification Email Template
 *
 * Email sent to clubs when a parent expresses interest.
 * CRITICAL: NO parent contact info (name, email, phone) in email.
 * Only shows: sport, child age, location.
 * Follows Yuvoo branding: professional and clear.
 */

import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailSection } from "./components/EmailSection";
import { EmailButton } from "./components/EmailButton";
import { EmailDivider } from "./components/EmailDivider";
import { YuvooColors, EmailTypography } from "./utils/email-types";
import { routes } from "@/lib/routes";

interface LeadNotificationEmailProps {
  clubName: string;
  sportName: string;
  childAge: number;
  locationName: string;
  leadId: string;
}

export const LeadNotificationEmail = ({
  clubName,
  sportName,
  childAge,
  locationName,
  leadId,
}: LeadNotificationEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const leadUrl = `${appUrl}${routes.leads.guestPayment(leadId)}`;

  return (
    <Html lang="ro">
      <Head>
        <title>
          🎯 Părinte pre-calificat caută {sportName} în {locationName} - Yuvoo
        </title>
      </Head>
      <Preview>
        Părinte pre-calificat prin quiz AI caută {sportName} pentru copil de {childAge.toString()}{" "}
        ani, în {locationName}.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          <EmailSection>
            <Heading style={heading}>Bună, {clubName}!</Heading>
            <Text style={body}>
              Un <strong>părinte pre-calificat</strong> (prin quiz AI) caută{" "}
              <strong>{sportName}</strong> pentru copil de{" "}
              <strong>{childAge.toString()} ani</strong>, în <strong>{locationName}</strong>.
            </Text>
            <Text style={body}>Vrei să vezi datele de contact?</Text>
            <div style={buttonContainer}>
              <EmailButton href={leadUrl} variant="primary">
                Vezi cererea
              </EmailButton>
            </div>
          </EmailSection>

          <EmailDivider />

          <EmailSection>
            <Text style={footer}>
              Această cerere expiră în 5 zile. Vei primi un reminder după 48 de ore dacă nu o
              accesezi.
            </Text>
          </EmailSection>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

export default LeadNotificationEmail;

// Styles
const main = {
  backgroundColor: YuvooColors.backgroundLight,
  fontFamily: EmailTypography.body.fontFamily,
};

const container = {
  backgroundColor: YuvooColors.backgroundWhite,
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  border: `1px solid ${YuvooColors.borderGrey}`,
  borderRadius: "8px",
  overflow: "hidden",
};

const heading = {
  ...EmailTypography.heading,
  marginBottom: "20px",
  color: YuvooColors.primary,
};

const body = {
  ...EmailTypography.body,
  marginBottom: "12px",
};

const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "16px",
};

const footer = {
  ...EmailTypography.small,
  color: YuvooColors.textMuted,
  marginBottom: "8px",
};
