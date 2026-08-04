/**
 * Lead Notification Email Template
 *
 * Email sent to clubs when a parent expresses interest.
 * Includes parent contact info — contact between parents and clubs is free.
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
  parentName: string;
  parentEmail: string;
  parentPhone: string | null;
}

export const LeadNotificationEmail = ({
  clubName,
  sportName,
  childAge,
  locationName,
  leadId,
  parentName,
  parentEmail,
  parentPhone,
}: LeadNotificationEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const leadUrl = `${appUrl}${routes.club.leads.detail(leadId)}`;
  const parentMailto = `mailto:${parentEmail}?subject=${encodeURIComponent(`Re: ${sportName} pentru copil de ${childAge} ani`)}`;

  return (
    <Html lang="ro">
      <Head>
        <title>
          Nou: Cerere {sportName} în {locationName} - Yuvoo
        </title>
      </Head>
      <Preview>
        {parentName} caută {sportName} pentru copil de {childAge.toString()} ani, în {locationName}.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          <EmailSection>
            <Heading style={heading}>Bună, {clubName}!</Heading>
            <Text style={body}>
              Un părinte a trimis o cerere pentru <strong>{sportName}</strong> (copil de{" "}
              <strong>{childAge.toString()} ani</strong>, în <strong>{locationName}</strong>).
            </Text>
            <Text style={body}>
              <strong>Date de contact părinte:</strong>
            </Text>
            <Text style={body}>
              Nume: {parentName}
              <br />
              Email: {parentEmail}
              {parentPhone ? (
                <>
                  <br />
                  Telefon: {parentPhone}
                </>
              ) : null}
            </Text>
            <div style={buttonContainer}>
              <EmailButton href={parentMailto} variant="primary">
                Contactează părintele
              </EmailButton>
            </div>
            <div style={buttonContainer}>
              <EmailButton href={leadUrl} variant="secondary">
                Vezi cererea în dashboard
              </EmailButton>
            </div>
          </EmailSection>

          <EmailDivider />

          <EmailSection>
            <Text style={footer}>
              Contactul cu părinții este gratuit. Această cerere expiră în 5 zile dacă nu răspunzi.
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
  marginTop: "16px",
  marginBottom: "8px",
};

const footer = {
  ...EmailTypography.small,
  color: YuvooColors.textMuted,
  marginBottom: "8px",
};
