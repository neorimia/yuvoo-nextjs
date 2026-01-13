/**
 * Payment Success Email Template
 *
 * React Email template for payment confirmation email.
 * Sent after successful payment with report access link.
 */

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailSection } from "./components/EmailSection";
import { YuvooColors, EmailTypography } from "./utils/email-types";

interface PaymentSuccessEmailProps {
  reportUrl: string;
  accessToken: string;
}

/**
 * Payment Success Email Component
 *
 * Email sent after successful payment with report access link.
 */
export const PaymentSuccessEmail = ({
  reportUrl,
  accessToken: _accessToken,
}: PaymentSuccessEmailProps) => {
  return (
    <Html lang="ro">
      <Head>
        <title>Plata confirmată - Yuvoo</title>
      </Head>
      <Preview>
        Plata confirmată! Accesează raportul complet cu recomandările personalizate.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          {/* Success Message Section */}
          <EmailSection>
            <Heading style={heading}>Plata confirmată!</Heading>
            <Text style={body}>
              Mulțumim pentru plata ta. Poți acum accesa raportul complet cu recomandările
              personalizate pentru copilul tău.
            </Text>
          </EmailSection>

          <Hr style={divider} />

          {/* Report Content Section */}
          <EmailSection backgroundColor={YuvooColors.backgroundWhite}>
            <Heading as="h2" style={sectionHeading}>
              Raportul tău este gata
            </Heading>
            <Text style={body}>Raportul complet include:</Text>
            <ul style={listStyle}>
              <li style={listItem}>Top 2-3 sporturi recomandate cu scoruri de potrivire</li>
              <li style={listItem}>
                Explicații detaliate despre de ce aceste sporturi sunt potrivite
              </li>
              <li style={listItem}>Beneficii fizice și emoționale pentru fiecare sport</li>
              <li style={listItem}>Sporturi de evitat momentan</li>
              <li style={listItem}>Vârsta ideală pentru început</li>
              <li style={listItem}>Pașii următori recomandați</li>
              <li style={listItem}>Sugestii de cluburi locale</li>
            </ul>
          </EmailSection>

          {/* CTA Section */}
          <EmailSection>
            <Section style={ctaSection}>
              <Button href={reportUrl} style={buttonPrimary}>
                Vezi Raportul Complet
              </Button>
            </Section>
          </EmailSection>

          {/* Permanent Link Section */}
          <EmailSection backgroundColor={YuvooColors.backgroundLight}>
            <Text style={smallText}>
              <strong>Link permanent:</strong> Poți accesa raportul oricând folosind acest link.
              Linkul nu expiră.
            </Text>
            <Text style={smallText}>
              <Link href={reportUrl} style={linkStyle}>
                {reportUrl}
              </Link>
            </Text>
          </EmailSection>

          <Hr style={divider} />

          {/* Support Section */}
          <EmailSection>
            <Text style={{ ...smallText, textAlign: "center" }}>
              Dacă ai întrebări, te rugăm să ne contactezi la{" "}
              <Link href="mailto:support@yuvoo.com" style={linkStyle}>
                support@yuvoo.com
              </Link>
            </Text>
          </EmailSection>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

export default PaymentSuccessEmail;

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
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "28px",
  color: YuvooColors.textPrimary,
  marginTop: "0",
  marginBottom: "16px",
  fontFamily: EmailTypography.heading.fontFamily,
};

const body = {
  ...EmailTypography.body,
  marginBottom: "12px",
};

const smallText = {
  ...EmailTypography.small,
  marginBottom: "8px",
};

const divider = {
  borderColor: YuvooColors.borderGrey,
  margin: "30px 0",
};

const listStyle = {
  paddingLeft: "20px",
  marginBottom: "16px",
};

const listItem = {
  marginBottom: "8px",
  color: YuvooColors.textBody,
  fontSize: "16px",
  lineHeight: "24px",
};

const ctaSection = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "16px",
};

const buttonPrimary = {
  backgroundColor: YuvooColors.primary,
  color: "#FFFFFF",
  padding: "12px 32px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  display: "inline-block",
};

const linkStyle = {
  color: YuvooColors.primary,
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};
