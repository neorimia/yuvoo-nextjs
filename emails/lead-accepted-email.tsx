/**
 * Lead Accepted Email Template (for Parents)
 *
 * Email sent to parents when a club accepts their lead (after payment).
 * Follows Yuvoo branding: warm but professional, clear and helpful.
 */

import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailSection } from "./components/EmailSection";
import { ContactCard } from "./components/ContactCard";
import { TipBox } from "./components/TipBox";
import { EmailButton } from "./components/EmailButton";
import { EmailDivider } from "./components/EmailDivider";
import { YuvooColors, EmailTypography } from "./utils/email-types";
import { routes } from "@/lib/routes";

interface LeadAcceptedEmailProps {
  parentName: string;
  clubName: string;
  clubEmail?: string;
  clubPhone?: string;
  sportName: string;
}

export const LeadAcceptedEmail = ({
  parentName,
  clubName,
  clubEmail,
  clubPhone,
  sportName,
}: LeadAcceptedEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const clubsUrl = `${appUrl}${routes.clubs.list}`;

  return (
    <Html lang="ro">
      <Head>
        <title>Clubul a acceptat cererea ta - Yuvoo</title>
      </Head>
      <Preview>
        {clubName} a acceptat cererea ta pentru {sportName}. Poți contacta clubul acum!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          <EmailSection>
            <Heading style={heading}>🎉 Veste bună, {parentName}!</Heading>
            <Text style={body}>
              <strong>{clubName}</strong> a acceptat cererea ta pentru <strong>{sportName}</strong>.
            </Text>
            <Text style={body}>
              Acum poți contacta direct clubul pentru a discuta despre programe, program și toate
              detaliile de care ai nevoie.
            </Text>
          </EmailSection>

          {(clubEmail || clubPhone) && (
            <EmailSection>
              <ContactCard email={clubEmail} phone={clubPhone} />
            </EmailSection>
          )}

          <EmailDivider />

          <EmailSection>
            <TipBox>
              <strong>Sfat:</strong> Când contactezi clubul, menționează că ai găsit clubul prin{" "}
              <strong>Yuvoo</strong>. Multe cluburi apreciază părinții care folosesc platforma
              noastră!
            </TipBox>
          </EmailSection>

          <EmailSection>
            <Text style={body}>
              Dacă acest club nu este potrivit sau vrei să explorezi mai multe opțiuni, poți căuta
              alte cluburi pe platforma Yuvoo.
            </Text>
            <div style={ctaSection}>
              <EmailButton href={clubsUrl} variant="secondary">
                Explorează alte cluburi
              </EmailButton>
            </div>
          </EmailSection>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

export default LeadAcceptedEmail;

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
  marginBottom: "16px",
};

const ctaSection = {
  textAlign: "center" as const,
  marginTop: "28px",
  marginBottom: "20px",
};
