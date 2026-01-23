/**
 * Quiz Teaser Email Template
 *
 * React Email template for teaser email sent after email collection.
 * Shows single sport recommendation with minimal details.
 * Follows Yuvoo branding: warm and engaging.
 */

import { Body, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailSection } from "./components/EmailSection";
import { EmailButton } from "./components/EmailButton";
import { EmailDivider } from "./components/EmailDivider";
import { InfoCard } from "./components/InfoCard";
import { YuvooColors, EmailTypography } from "./utils/email-types";
import type { QuizResult } from "@/modules/quiz/quiz.types";
import type { Child } from "@/modules/children/children.types";

interface QuizTeaserEmailProps {
  quizResult: QuizResult;
  child: Child;
  teaserUrl: string;
}

/**
 * Quiz Teaser Email Component
 *
 * Email sent after email collection with single sport recommendation.
 */
export const QuizTeaserEmail = ({ quizResult, child, teaserUrl }: QuizTeaserEmailProps) => {
  // Get top recommendation (highest match score)
  const sortedRecommendations = [...(quizResult.recommendations || [])].sort(
    (a, b) => b.matchScore - a.matchScore
  );
  const topRecommendation = sortedRecommendations[0];

  if (!topRecommendation) {
    // Fallback if no recommendations
    return (
      <Html lang="ro">
        <Head>
          <title>Recomandare - Yuvoo</title>
        </Head>
        <Preview>Recomandarea ta personalizată este gata!</Preview>
        <Body style={main}>
          <Container style={container}>
            <EmailHeader />
            <EmailSection>
              <Heading style={heading}>Recomandarea ta personalizată</Heading>
              <Text style={body}>
                Mulțumim că ai completat chestionarul! Accesează link-ul de mai jos pentru a vedea
                recomandarea.
              </Text>
              <div style={ctaSection}>
                <EmailButton href={teaserUrl} variant="primary">
                  Vezi Recomandarea
                </EmailButton>
              </div>
            </EmailSection>
            <EmailFooter />
          </Container>
        </Body>
      </Html>
    );
  }

  const truncatedReasoning =
    topRecommendation.reasoning.length > 200
      ? `${topRecommendation.reasoning.substring(0, 200)}...`
      : topRecommendation.reasoning;

  return (
    <Html lang="ro">
      <Head>
        <title>{`Recomandarea noastră pentru ${child.firstName} - Yuvoo`}</title>
      </Head>
      <Preview>
        {`Recomandarea noastră pentru ${child.firstName}: ${topRecommendation.sportName} - ${String(topRecommendation.matchScore)}% potrivire`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          <EmailSection>
            <Heading style={heading}>Recomandarea noastră pentru {child.firstName}</Heading>
            <Text style={body}>
              Mulțumim că ai completat chestionarul! Am analizat răspunsurile și am identificat un
              sport care se potrivește perfect profilului copilului tău.
            </Text>
          </EmailSection>

          <EmailDivider />

          <EmailSection>
            <InfoCard variant="highlight">
              <Text style={matchScoreBadge}>{String(topRecommendation.matchScore)}% potrivire</Text>
              <Heading as="h2" style={sportNameHeading}>
                {topRecommendation.sportName}
              </Heading>
              <Text style={reasoningText}>{truncatedReasoning}</Text>
            </InfoCard>
          </EmailSection>

          <EmailSection>
            <Text style={body}>
              Pentru a vedea toate recomandările, explicații detaliate și planul de acțiune,
              deblochează raportul complet.
            </Text>
            <div style={ctaSection}>
              <EmailButton href={teaserUrl} variant="primary">
                Vezi Recomandarea
              </EmailButton>
            </div>
          </EmailSection>

          <EmailDivider />

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

export default QuizTeaserEmail;

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

const matchScoreBadge = {
  display: "inline-block",
  backgroundColor: YuvooColors.primary,
  color: "#FFFFFF",
  padding: "6px 16px",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "12px",
};

const sportNameHeading = {
  fontSize: "22px",
  fontWeight: "600",
  color: YuvooColors.textPrimary,
  marginTop: "0",
  marginBottom: "12px",
  fontFamily: EmailTypography.heading.fontFamily,
};

const reasoningText = {
  ...EmailTypography.body,
  color: YuvooColors.textSecondary,
  fontStyle: "italic",
  marginBottom: "0",
};

const ctaSection = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "16px",
};
