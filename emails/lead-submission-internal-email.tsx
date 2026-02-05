/**
 * Lead Submission Internal Email
 *
 * Email sent to clubs-lead@yuvoo.ro when a parent submits a lead (expresses interest in a club).
 * Internal notification for Yuvoo team – includes parent contact and lead details.
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailDivider } from "./components/EmailDivider";
import { YuvooColors, EmailTypography } from "./utils/email-types";

export interface LeadSubmissionInternalEmailProps {
  parentEmail: string;
  parentName: string;
  parentPhone?: string | null;
  childAge: number;
  sportType?: string | null;
  locationId?: string | null;
  message?: string | null;
  clubId?: string;
}

export const LeadSubmissionInternalEmail = ({
  parentEmail,
  parentName,
  parentPhone,
  childAge,
  sportType,
  locationId,
  message,
  clubId,
}: LeadSubmissionInternalEmailProps) => {
  return (
    <Html lang="ro">
      <Head>
        <title>Cerere lead nou – {parentName}</title>
      </Head>
      <Preview>
        Lead nou: {parentName} – {parentEmail} – copil {String(childAge)} ani
        {sportType ? ` – ${sportType}` : ""}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader title="Yuvoo – Lead nou" />

          <Section style={section}>
            <Heading style={heading}>Cerere lead nou</Heading>
            <Text style={body}>O cerere nouă de lead a fost trimisă pe platformă.</Text>
          </Section>

          <EmailDivider />

          <Section style={section}>
            <Text style={label}>Contact părinte</Text>
            <Text style={body}>
              <strong>Nume:</strong> {parentName}
            </Text>
            <Text style={body}>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${parentEmail}`} style={link}>
                {parentEmail}
              </a>
            </Text>
            {parentPhone && (
              <Text style={body}>
                <strong>Telefon:</strong>{" "}
                <a href={`tel:${parentPhone}`} style={link}>
                  {parentPhone}
                </a>
              </Text>
            )}
          </Section>

          <Section style={section}>
            <Text style={label}>Detalii copil / preferințe</Text>
            <Text style={body}>
              <strong>Vârsta copilului:</strong> {String(childAge)} ani
            </Text>
            {sportType && (
              <Text style={body}>
                <strong>Sport:</strong> {sportType}
              </Text>
            )}
            {locationId && (
              <Text style={body}>
                <strong>Locație (ID):</strong> {locationId}
              </Text>
            )}
            {clubId && (
              <Text style={body}>
                <strong>Club (ID):</strong> {clubId}
              </Text>
            )}
          </Section>

          {message && message.trim() && (
            <>
              <EmailDivider />
              <Section style={section}>
                <Text style={label}>Mesaj de la părinte</Text>
                <Text style={body}>{message}</Text>
              </Section>
            </>
          )}

          <EmailDivider />

          <Section style={section}>
            <Text style={footer}>
              Răspunde direct la acest email pentru a contacta părintele. Acest mesaj este destinat
              echipei Yuvoo (clubs-lead@yuvoo.ro).
            </Text>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

export default LeadSubmissionInternalEmail;

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

const section = {
  padding: "24px 32px",
};

const heading = {
  ...EmailTypography.heading,
  marginBottom: "16px",
  color: YuvooColors.primary,
};

const label = {
  ...EmailTypography.small,
  fontWeight: "600",
  color: YuvooColors.textSecondary,
  marginBottom: "8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const body = {
  ...EmailTypography.body,
  marginBottom: "8px",
};

const link = {
  color: YuvooColors.primary,
  textDecoration: "underline",
};

const footer = {
  ...EmailTypography.small,
  color: YuvooColors.textMuted,
  marginBottom: "0",
};
