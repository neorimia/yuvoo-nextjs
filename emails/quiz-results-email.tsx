/**
 * Quiz Results Email Template
 *
 * Teaser email only: notifies that results are ready and links to the full report.
 * Does NOT include full report content (recommendations, explanations, clubs) – user must open the link.
 * Follows Yuvoo branding: short, clear, one primary CTA.
 */

import { Body, Container, Head, Heading, Html, Link, Preview, Text } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailSection } from "./components/EmailSection";
import { EmailButton } from "./components/EmailButton";
import { InfoCard } from "./components/InfoCard";
import { YuvooColors, EmailTypography } from "./utils/email-types";
import type { QuizResult } from "@/modules/quiz/quiz.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";
import { routes } from "@/lib/routes";

interface QuizResultsEmailProps {
  quizResult: QuizResult;
  child: Child;
  userEmail: string;
  user?: AuthUser;
  unsubscribeToken?: string;
  /** Optional: full report URL (e.g. with access token). If not set, uses results page. */
  reportUrl?: string;
}

/**
 * Quiz Results Email Component
 *
 * Teaser only: notifies that results are ready and links to the full report.
 * Full report (recommendations, explanations, clubs) is only on the site.
 */
export const QuizResultsEmail = ({
  quizResult,
  child,
  userEmail: _userEmail,
  user,
  unsubscribeToken,
  reportUrl,
}: QuizResultsEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const userName = user?.firstName || user?.name?.split(" ")[0] || "Utilizator";

  // Safety check for quizResult first
  if (!quizResult || !quizResult.id) {
    return (
      <Html lang="ro">
        <Head>
          <title>Eroare - Yuvoo</title>
        </Head>
        <Preview>Eroare la generarea emailului</Preview>
        <Body style={main}>
          <Container style={container}>
            <EmailHeader />
            <EmailSection>
              <Heading style={heading}>Eroare</Heading>
              <Text style={body}>
                Ne pare rău, dar a apărut o eroare la generarea emailului. Te rugăm să accesezi
                site-ul pentru a vedea rezultatele.
              </Text>
              <Text style={body}>
                <Link href={`${appUrl}${routes.quiz.intro}`} style={linkStyle}>
                  Accesează Yuvoo
                </Link>
              </Text>
            </EmailSection>
            <EmailFooter unsubscribeToken={unsubscribeToken} />
          </Container>
        </Body>
      </Html>
    );
  }

  if (!child || !child.firstName || !child.lastName) {
    return (
      <Html lang="ro">
        <Head>
          <title>Eroare - Yuvoo</title>
        </Head>
        <Preview>Eroare la generarea emailului</Preview>
        <Body style={main}>
          <Container style={container}>
            <EmailHeader />
            <EmailSection>
              <Heading style={heading}>Eroare</Heading>
              <Text style={body}>
                Ne pare rău, dar a apărut o eroare. Te rugăm să accesezi rezultatele direct pe site.
              </Text>
              <Text style={body}>
                <Link href={`${appUrl}${routes.quiz.results(quizResult.id)}`} style={linkStyle}>
                  Vezi rezultatele aici
                </Link>
              </Text>
            </EmailSection>
            <EmailFooter unsubscribeToken={unsubscribeToken} />
          </Container>
        </Body>
      </Html>
    );
  }

  const childName = `${child.firstName} ${child.lastName}`;
  const primaryRecommendation = [...(quizResult.recommendations || [])].sort(
    (a, b) => b.matchScore - a.matchScore
  )[0];
  const primarySportName = primaryRecommendation?.sportName ?? "sporturi potrivite";

  // Link to full report: use reportUrl if provided (e.g. with access token), otherwise results page
  const viewReportUrl = reportUrl ?? `${appUrl}${routes.quiz.results(quizResult.id)}`;

  const previewText = `Rezultatele chestionarului pentru ${childName} sunt gata! Vezi raportul complet pe Yuvoo.`;

  return (
    <Html lang="ro">
      <Head>
        <title>Rezultatele Chestionarului AI - Yuvoo</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          <EmailSection>
            <Heading style={heading}>Rezultatele chestionarului sunt gata</Heading>
            <Text style={body}>Salut {userName},</Text>
            <Text style={body}>
              Am generat recomandări personalizate de sporturi pentru <strong>{childName}</strong>.
              Recomandarea noastră principală: <strong>{primarySportName}</strong>.
            </Text>
            <Text style={body}>
              Pentru a vedea raportul complet (toate sporturile recomandate, explicații, cluburi și
              pași următori), deschide link-ul de mai jos.
            </Text>
            <div style={ctaSection}>
              <EmailButton href={viewReportUrl} variant="primary">
                Vezi raportul complet
              </EmailButton>
            </div>
            <Text style={smallText}>
              Sau copiază link-ul în browser:{" "}
              <Link href={viewReportUrl} style={linkStyle}>
                {viewReportUrl}
              </Link>
            </Text>
          </EmailSection>

          <EmailSection>
            <InfoCard variant="subtle">
              <Text style={smallText}>
                <strong>Consimțământ GDPR:</strong> Ai primit acest email pentru că ai solicitat
                raportul de recomandări sportive. Datele tale sunt procesate conform{" "}
                <Link href={`${appUrl}${routes.privacy}`} style={linkStyle}>
                  Politicii de confidențialitate
                </Link>
                . Poți să te dezabonezi oricând folosind link-ul din footer.
              </Text>
            </InfoCard>
          </EmailSection>

          <EmailFooter unsubscribeToken={unsubscribeToken} />
        </Container>
      </Body>
    </Html>
  );
};

export default QuizResultsEmail;

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
};

const ctaSection = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "16px",
};

const linkStyle = {
  color: YuvooColors.primary,
  textDecoration: "underline",
};
