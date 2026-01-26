/**
 * Guest Payment Success Email Template
 *
 * Email sent to guest clubs (without accounts) after successful payment.
 * Contains parent contact information (name, email, phone, child age, message).
 * Follows Yuvoo branding: warm but professional, clear and helpful.
 */

import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailSection } from "./components/EmailSection";
import { ContactCard } from "./components/ContactCard";
import { TipBox } from "./components/TipBox";
import { EmailDivider } from "./components/EmailDivider";
import { YuvooColors, EmailTypography } from "./utils/email-types";
import { routes } from "@/lib/routes";

interface GuestPaymentSuccessEmailProps {
  guestEmail: string;
  leadId: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string | null;
  childAge: number;
  message: string | null;
  sportType: string;
  clubName: string;
}

export const GuestPaymentSuccessEmail = ({
  parentName,
  parentEmail,
  parentPhone,
  childAge,
  message,
  sportType,
  clubName,
}: GuestPaymentSuccessEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const clubsUrl = `${appUrl}${routes.clubs.list}`;
  const premiumUrl = `${appUrl}${routes.clubs.premium}`;
  return (
    <Html lang="ro">
      <Head>
        <title>Informații părinte - Cerere {sportType} - Yuvoo</title>
      </Head>
      <Preview>
        Ai plătit cu succes pentru cererea de {sportType}. Iată informațiile de contact ale
        părintelui.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          <EmailSection>
            <Heading style={heading}>✅ Plată confirmată!</Heading>
            <Text style={body}>
              Mulțumim pentru plata de <strong>3€</strong> pentru cererea de{" "}
              <strong>{sportType}</strong> pentru clubul <strong>{clubName}</strong>.
            </Text>
            <Text style={body}>
              Mai jos găsești informațiile de contact ale părintelui care a făcut cererea.
            </Text>
          </EmailSection>

          <EmailDivider />

          <EmailSection>
            <Heading style={sectionHeading}>Informații părinte</Heading>
            <Text style={body}>
              <strong>Nume:</strong> {parentName}
            </Text>
            <ContactCard email={parentEmail} phone={parentPhone || undefined} />
          </EmailSection>

          <EmailSection>
            <Heading style={sectionHeading}>Detalii copil</Heading>
            <Text style={body}>
              <strong>Vârstă:</strong> {childAge} {childAge === 1 ? "an" : "ani"}
            </Text>
            <Text style={body}>
              <strong>Sport:</strong> {sportType}
            </Text>
          </EmailSection>

          {message && (
            <EmailSection>
              <Heading style={sectionHeading}>Mesaj de la părinte</Heading>
              <div style={messageBox}>
                <Text style={messageText}>{message}</Text>
              </div>
            </EmailSection>
          )}

          <EmailDivider />

          <EmailSection>
            <TipBox>
              <strong>Sfat:</strong> Contactează părintele cât mai curând posibil. Cererile expiră
              după <strong>5 zile</strong> dacă nu sunt acceptate.
            </TipBox>
          </EmailSection>

          <EmailSection>
            <Text style={body}>
              Dacă vrei să primești mai multe cereri și să beneficiezi de funcții premium, poți crea
              un cont pe platforma Yuvoo sau să te abonezi la planul Premium.
            </Text>
            <div style={ctaSection}>
              <div style={ctaButtons}>
                <a href={clubsUrl} style={linkButton}>
                  Explorează platforma Yuvoo
                </a>
                <a href={premiumUrl} style={linkButton}>
                  Detalii abonare Premium
                </a>
              </div>
            </div>
          </EmailSection>

          <EmailSection>
            <Text style={footerNote}>
              <strong>Notă:</strong> Această plată este pentru o singură cerere. Pentru acces
              nelimitat la cereri, consideră un abonament Premium.
            </Text>
          </EmailSection>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

export default GuestPaymentSuccessEmail;

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

const sectionHeading = {
  ...EmailTypography.heading,
  fontSize: "18px",
  marginBottom: "12px",
  color: YuvooColors.textPrimary,
};

const body = {
  ...EmailTypography.body,
  marginBottom: "16px",
};

const messageBox = {
  backgroundColor: YuvooColors.backgroundLight,
  border: `1px solid ${YuvooColors.borderGrey}`,
  borderRadius: "6px",
  padding: "16px",
  marginTop: "8px",
};

const messageText = {
  ...EmailTypography.body,
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const ctaSection = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "20px",
};

const ctaButtons = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
};

const linkButton = {
  display: "inline-block",
  padding: "12px 24px",
  backgroundColor: YuvooColors.primary,
  color: YuvooColors.backgroundWhite,
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "16px",
};

const footerNote = {
  ...EmailTypography.body,
  fontSize: "14px",
  color: YuvooColors.textSecondary,
  fontStyle: "italic",
  marginTop: "20px",
  padding: "12px",
  backgroundColor: YuvooColors.backgroundLight,
  borderRadius: "6px",
};
