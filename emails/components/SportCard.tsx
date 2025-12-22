/**
 * Sport Card Component
 *
 * Reusable component for displaying sport recommendations in emails.
 */

import { Section, Text, Heading } from "@react-email/components";
import * as React from "react";
import { YuvooColors, EmailTypography } from "../utils/email-types";
import type { SportRecommendation } from "@/modules/quiz/quiz.types";

interface SportCardProps {
  recommendation: SportRecommendation;
  rank?: number; // Optional rank (1, 2, 3, etc.)
  variant?: "primary" | "default" | "less-suitable";
}

/**
 * Sport recommendation card component
 */
export const SportCard = ({ recommendation, rank, variant = "default" }: SportCardProps) => {
  const isPrimary = variant === "primary";
  const isLessSuitable = variant === "less-suitable";

  const cardStyle = isPrimary
    ? primaryCardStyle
    : isLessSuitable
      ? lessSuitableCardStyle
      : defaultCardStyle;

  return (
    <Section style={cardStyle}>
      {rank !== undefined && <Text style={rankStyle}>#{rank}</Text>}
      <Text style={matchScoreStyle}>{recommendation.matchScore}% potrivire</Text>
      <Heading as="h3" style={getSportNameStyle(isPrimary)}>
        {recommendation.sportName}
      </Heading>
      <Text style={bodyStyle}>
        <strong>De ce este potrivit:</strong>
      </Text>
      <Text style={bodyStyle}>{recommendation.reasoning}</Text>
      {recommendation.benefits.length > 0 && (
        <>
          <Text style={bodyStyle}>
            <strong>Beneficii principale:</strong>
          </Text>
          <ul style={listStyle}>
            {recommendation.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} style={listItemStyle}>
                {benefit}
              </li>
            ))}
          </ul>
        </>
      )}
      {recommendation.considerations.length > 0 && !isLessSuitable && (
        <>
          <Text style={bodyStyle}>
            <strong>Considerații:</strong>
          </Text>
          <ul style={listStyle}>
            {recommendation.considerations.map((consideration, index) => (
              <li key={index} style={listItemStyle}>
                {consideration}
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
};

export default SportCard;

// Styles
const defaultCardStyle = {
  backgroundColor: YuvooColors.backgroundWhite,
  border: `1px solid ${YuvooColors.borderGrey}`,
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "16px",
};

const primaryCardStyle = {
  backgroundColor: YuvooColors.backgroundCyanLight,
  border: `2px solid ${YuvooColors.primary}`,
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
};

const lessSuitableCardStyle = {
  backgroundColor: YuvooColors.backgroundLight,
  border: `1px solid ${YuvooColors.borderGrey}`,
  borderRadius: "6px",
  padding: "16px",
  marginBottom: "12px",
};

const rankStyle = {
  display: "inline-block",
  backgroundColor: YuvooColors.secondary,
  color: "#FFFFFF",
  padding: "4px 12px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "600",
  marginRight: "8px",
  marginBottom: "8px",
};

const matchScoreStyle = {
  display: "inline-block",
  backgroundColor: YuvooColors.primary,
  color: "#FFFFFF",
  padding: "6px 16px",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "12px",
};

const getSportNameStyle = (isPrimary: boolean) => ({
  fontSize: isPrimary ? "22px" : "18px",
  fontWeight: "600",
  color: YuvooColors.textPrimary,
  marginTop: "0",
  marginBottom: "12px",
  fontFamily: EmailTypography.heading.fontFamily,
});

const bodyStyle = {
  ...EmailTypography.body,
  marginBottom: "12px",
};

const listStyle = {
  paddingLeft: "20px",
  marginBottom: "16px",
};

const listItemStyle = {
  marginBottom: "8px",
  color: YuvooColors.textBody,
  fontSize: "16px",
  lineHeight: "24px",
};
