/**
 * Lead Expired Email Template (for Parents)
 *
 * Email sent to parents when their lead expires.
 * Suggests alternative clubs with Yuvoo branding.
 */

import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailSection } from "./components/EmailSection";
import { ClubPreview } from "./components/ClubPreview";
import { EmailButton } from "./components/EmailButton";
import { EmailDivider } from "./components/EmailDivider";
import { SectionHeading } from "./components/SectionHeading";
import { YuvooColors, EmailTypography } from "./utils/email-types";
import type { Club } from "@/modules/clubs/clubs.types";
import { routes } from "@/lib/routes";

interface LeadExpiredEmailProps {
  parentName: string;
  clubName: string;
  sportName: string;
  alternativeClubs: Club[];
}

export const LeadExpiredEmail = ({
  parentName,
  clubName,
  sportName,
  alternativeClubs,
}: LeadExpiredEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const clubsUrl = `${appUrl}${routes.clubs.list}`;

  return (
    <Html lang="ro">
      <Head>
        <title>Îți recomandăm alte cluburi similare - Yuvoo</title>
      </Head>
      <Preview>
        Cererea ta către {clubName} a expirat. Îți recomandăm alte cluburi similare pentru{" "}
        {sportName}.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          <EmailSection>
            <Heading style={heading}>Îți recomandăm alte cluburi similare</Heading>
            <Text style={body}>Salut {parentName},</Text>
            <Text style={body}>
              Cererea ta către <strong>{clubName}</strong> pentru <strong>{sportName}</strong> a
              expirat fără răspuns.
            </Text>
            <Text style={body}>
              Nu te descuraja! Îți recomandăm următoarele cluburi similare care ar putea fi
              potrivite:
            </Text>
          </EmailSection>

          {alternativeClubs.length > 0 && (
            <>
              <EmailDivider />
              <EmailSection>
                <SectionHeading>Cluburi alternative</SectionHeading>
                {alternativeClubs.slice(0, 5).map((club) => (
                  <ClubPreview key={club.id} club={club} />
                ))}
              </EmailSection>
            </>
          )}

          <EmailDivider />

          <EmailSection>
            <div style={ctaSection}>
              <EmailButton href={clubsUrl} variant="primary">
                Explorează toate cluburile
              </EmailButton>
            </div>
            <Text style={smallText}>
              Sau caută cluburi pentru <strong>{sportName}</strong> în zona ta.
            </Text>
          </EmailSection>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

export default LeadExpiredEmail;

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

const smallText = {
  ...EmailTypography.small,
  marginBottom: "8px",
  textAlign: "center" as const,
};

const ctaSection = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "16px",
};
