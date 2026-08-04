/**
 * Lead Reminder Email Template
 *
 * Email sent to clubs 48 hours after lead creation if not yet accepted.
 * Reminds club about pending lead with Yuvoo branding.
 */

import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailSection } from "./components/EmailSection";
import { EmailButton } from "./components/EmailButton";
import { EmailDivider } from "./components/EmailDivider";
import { TipBox } from "./components/TipBox";
import { YuvooColors, EmailTypography } from "./utils/email-types";

interface LeadReminderEmailProps {
  clubName: string;
  sportName: string;
  childAge: number;
  locationName: string;
  leadId: string;
}

export const LeadReminderEmail = ({
  clubName,
  sportName,
  childAge,
  locationName,
  leadId,
}: LeadReminderEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const leadUrl = `${appUrl}/club/dashboard/leaduri/${leadId}`;

  return (
    <Html lang="ro">
      <Head>
        <title>Ai o cerere în așteptare - Yuvoo</title>
      </Head>
      <Preview>
        Ai o cerere în așteptare: {sportName} pentru copil de {childAge.toString()} ani, în{" "}
        {locationName}.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          <EmailSection>
            <Heading style={heading}>Ai o cerere în așteptare</Heading>
            <Text style={body}>Salut {clubName},</Text>
            <Text style={body}>
              Ai o cerere în așteptare pentru <strong>{sportName}</strong> pentru copil de{" "}
              <strong>{childAge.toString()} ani</strong>, în <strong>{locationName}</strong>.
            </Text>
            <Text style={body}>
              Această cerere a fost creată acum 48 de ore. Nu uita să o accesezi înainte să expire!
            </Text>
            <Text style={body}>
              <strong>💡 Sfat:</strong> Alte cluburi similare au deja acceptat cereri în ultimele
              24h. Nu rata șansa!
            </Text>
            <div style={buttonContainer}>
              <EmailButton href={leadUrl} variant="primary">
                Vezi cererea
              </EmailButton>
            </div>
          </EmailSection>

          <EmailDivider />

          <EmailSection>
            <TipBox variant="warning">
              Această cerere expiră în 3 zile. Contactează părintele cât timp cererea este activă.
            </TipBox>
          </EmailSection>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

export default LeadReminderEmail;

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
