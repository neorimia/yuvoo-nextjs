/**
 * Quiz Results Email Template
 *
 * Extended quiz results email with comprehensive recommendations.
 * Includes all content from brief: child info, top 3 sports, detailed explanations,
 * less suitable sports, general recommendations, club previews, and account CTA.
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
import type { QuizResult } from "@/modules/quiz/quiz.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";
import type { Club } from "@/modules/clubs/clubs.types";
import { routes } from "@/lib/routes";

interface QuizResultsEmailProps {
  quizResult: QuizResult;
  child: Child;
  userEmail: string;
  user?: AuthUser;
  unsubscribeToken?: string;
  clubsBySport?: Map<string, Club[]>; // Clubs grouped by sport ID
}

/**
 * Quiz Results Email Component
 *
 * Comprehensive email with all quiz result information and recommendations.
 */
export const QuizResultsEmail = ({
  quizResult,
  child,
  userEmail: _userEmail,
  user,
  unsubscribeToken,
  clubsBySport = new Map(),
}: QuizResultsEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const userName = user?.firstName || user?.name?.split(" ")[0] || "Utilizator";
  const childName = `${child.firstName} ${child.lastName}`;
  const childAge = child.age;
  const childGender =
    child.gender === "male" ? "băiat" : child.gender === "female" ? "fată" : "copil";

  // Get top 3 recommendations (sorted by match score)
  const topRecommendations = [...quizResult.recommendations]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  // Primary recommendation (highest score)
  const primaryRecommendation = topRecommendations[0];

  // Less suitable sports (scores below 70)
  const lessSuitableSports = quizResult.recommendations
    .filter((rec) => rec.matchScore < 70)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  // Results URL
  const resultsUrl = `${appUrl}${routes.quiz.results(quizResult.id)}`;
  const clubsUrl = `${appUrl}${routes.clubs.list}`;
  const registerUrl = `${appUrl}${routes.register}`;

  // Preview text
  const previewText = `Rezultatele chestionarului pentru ${childName}: ${primaryRecommendation.sportName} este recomandarea noastră principală!`;

  return (
    <Html lang="ro">
      <Head>
        <title>Rezultatele Chestionarului AI - Yuvoo</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          {/* Greeting Section */}
          <EmailSection>
            <Heading style={heading}>Rezultatele Chestionarului AI</Heading>
            <Text style={body}>Salut {userName},</Text>
            <Text style={body}>
              Rezultatele chestionarului pentru <strong>{childName}</strong> sunt gata! Am analizat
              răspunsurile și am generat recomandări personalizate de sporturi care se potrivesc cel
              mai bine profilului copilului tău.
            </Text>
          </EmailSection>

          {/* Child Information Section */}
          <EmailSection>
            <Heading as="h2" style={sectionHeading}>
              Informații despre copil
            </Heading>
            <Text style={body}>
              <strong>Nume:</strong> {childName}
            </Text>
            <Text style={body}>
              <strong>Vârstă:</strong> {childAge} ani
            </Text>
            <Text style={body}>
              <strong>Gen:</strong> {childGender}
            </Text>
          </EmailSection>

          <Hr style={divider} />

          {/* Primary Sport Recommendation */}
          <EmailSection>
            <Heading as="h2" style={sectionHeading}>
              🏆 Recomandarea noastră principală
            </Heading>
            <Section style={primaryCard}>
              <Text style={matchScoreText}>{primaryRecommendation.matchScore}% potrivire</Text>
              <Heading as="h3" style={sportNameHeading}>
                {primaryRecommendation.sportName}
              </Heading>
              <Text style={body}>{primaryRecommendation.reasoning}</Text>
              {primaryRecommendation.benefits.length > 0 && (
                <>
                  <Text style={body}>
                    <strong>Beneficii:</strong>
                  </Text>
                  <ul style={listStyle}>
                    {primaryRecommendation.benefits.map((benefit, index) => (
                      <li key={index} style={listItem}>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {primaryRecommendation.considerations.length > 0 && (
                <>
                  <Text style={body}>
                    <strong>Considerații:</strong>
                  </Text>
                  <ul style={listStyle}>
                    {primaryRecommendation.considerations.map((consideration, index) => (
                      <li key={index} style={listItem}>
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Section>
          </EmailSection>

          <Hr style={divider} />

          {/* Top 3 Sports List */}
          <EmailSection>
            <Heading as="h2" style={sectionHeading}>
              Top 3 sporturi potrivite
            </Heading>
            <Text style={body}>
              Iată cele mai potrivite sporturi pentru {childName}, bazate pe profilul completat:
            </Text>
            {topRecommendations.map((rec, index) => (
              <Section key={rec.sportId} style={recommendationCard}>
                <Text style={sportRank}>#{index + 1}</Text>
                <Text style={matchScore}>{rec.matchScore}% potrivire</Text>
                <Heading as="h3" style={sportName}>
                  {rec.sportName}
                </Heading>
                <Text style={body}>
                  <strong>De ce este potrivit:</strong>
                </Text>
                <Text style={body}>{rec.reasoning}</Text>
                {rec.benefits.length > 0 && (
                  <>
                    <Text style={body}>
                      <strong>Beneficii principale:</strong>
                    </Text>
                    <ul style={listStyle}>
                      {rec.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} style={listItem}>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Section>
            ))}
          </EmailSection>

          {/* Less Suitable Sports (if any) */}
          {lessSuitableSports.length > 0 && (
            <>
              <Hr style={divider} />
              <EmailSection>
                <Heading as="h2" style={sectionHeading}>
                  Sporturi mai puțin potrivite
                </Heading>
                <Text style={body}>
                  Următoarele sporturi sunt mai puțin recomandate pentru {childName}, dar pot fi
                  considerate în viitor:
                </Text>
                {lessSuitableSports.map((rec) => (
                  <Section key={rec.sportId} style={lessSuitableCard}>
                    <Text style={sportName}>
                      {rec.sportName} ({rec.matchScore}% potrivire)
                    </Text>
                    <Text style={smallText}>{rec.reasoning}</Text>
                  </Section>
                ))}
              </EmailSection>
            </>
          )}

          <Hr style={divider} />

          {/* General Start Recommendations */}
          <EmailSection>
            <Heading as="h2" style={sectionHeading}>
              Recomandări generale de început
            </Heading>
            <Text style={body}>
              Iată câteva sfaturi pentru a începe călătoria sportivă a lui {childName}:
            </Text>
            <ul style={listStyle}>
              <li style={listItem}>
                <strong>Începeți gradual:</strong> Permiteți copilului să se adapteze la noul sport
                pas cu pas, fără presiune.
              </li>
              <li style={listItem}>
                <strong>Probați mai multe opțiuni:</strong> Rezervați probe gratuite la diferite
                cluburi pentru a găsi cel mai potrivit mediu.
              </li>
              <li style={listItem}>
                <strong>Comunicați cu antrenorii:</strong> Discutați despre nevoile și preferințele
                copilului pentru o experiență personalizată.
              </li>
              <li style={listItem}>
                <strong>Răbdare și susținere:</strong> Fiecare copil se dezvoltă în ritmul său.
                Susțineți-l în procesul de învățare.
              </li>
            </ul>
          </EmailSection>

          {/* Extended Club Previews */}
          {topRecommendations.length > 0 && (
            <>
              <Hr style={divider} />
              <EmailSection>
                <Heading as="h2" style={sectionHeading}>
                  Cluburi recomandate
                </Heading>
                <Text style={body}>
                  Iată câteva cluburi verificate care oferă sporturile recomandate:
                </Text>
                {topRecommendations.map((rec) => {
                  const clubs = clubsBySport.get(rec.sportId) || [];
                  const topClubs = clubs.slice(0, 3); // Show up to 3 clubs per sport

                  if (topClubs.length === 0) return null;

                  return (
                    <Section key={rec.sportId} style={clubSection}>
                      <Heading as="h3" style={clubSportHeading}>
                        {rec.sportName}
                      </Heading>
                      {topClubs.map((club) => (
                        <Section key={club.id} style={clubCard}>
                          <Text style={clubName}>{club.name}</Text>
                          <Text style={smallText}>
                            <strong>Locație:</strong> {club.location.city}
                            {club.location.district && `, ${club.location.district}`}
                          </Text>
                          {club.description && (
                            <Text style={smallText}>{club.description.substring(0, 150)}...</Text>
                          )}
                          <Link
                            href={`${appUrl}${routes.clubs.detail(club.slug)}`}
                            style={clubLink}
                          >
                            Vezi detalii club →
                          </Link>
                        </Section>
                      ))}
                    </Section>
                  );
                })}
                <Section style={ctaSection}>
                  <Button href={clubsUrl} style={buttonPrimary}>
                    Explorează toate cluburile
                  </Button>
                </Section>
              </EmailSection>
            </>
          )}

          {/* Specialist Recommendation (if needed) */}
          {quizResult.specialistRecommendation?.needed && (
            <>
              <Hr style={divider} />
              <EmailSection>
                <Section style={specialistWarning}>
                  <Heading as="h3" style={specialistHeading}>
                    ⚠️ Recomandare specialist
                  </Heading>
                  <Text style={body}>{quizResult.specialistRecommendation.reason}</Text>
                  <Text style={body}>
                    Recomandăm consultarea unui specialist în{" "}
                    {quizResult.specialistRecommendation.specialty === "orthopedist"
                      ? "ortopedie"
                      : quizResult.specialistRecommendation.specialty === "nutritionist"
                        ? "nutriție"
                        : quizResult.specialistRecommendation.specialty === "psychologist"
                          ? "psihologie"
                          : "medicină generală"}
                    .
                  </Text>
                  <Section style={ctaSection}>
                    <Button href={`${appUrl}${routes.doctors.list}`} style={buttonSecondary}>
                      Vezi specialiști recomandați
                    </Button>
                  </Section>
                </Section>
              </EmailSection>
            </>
          )}

          <Hr style={divider} />

          {/* Account Creation CTA */}
          <EmailSection>
            <Heading as="h2" style={sectionHeading}>
              Creează cont pentru mai multe beneficii
            </Heading>
            <Text style={body}>
              Poți crea un cont gratuit pentru a accesa funcționalități suplimentare:
            </Text>
            <ul style={listStyle}>
              <li style={listItem}>Salvează recomandările și accesează-le oricând</li>
              <li style={listItem}>Rezervă probe gratuite la cluburile preferate</li>
              <li style={listItem}>Gestionează profilul copilului și urmărește progresul</li>
              <li style={listItem}>Primește notificări despre evenimente și oferte speciale</li>
            </ul>
            <Section style={ctaSection}>
              <Button href={registerUrl} style={buttonPrimary}>
                Creează cont gratuit
              </Button>
            </Section>
            <Text style={smallText}>
              Sau accesează rezultatele complete:{" "}
              <Link href={resultsUrl} style={linkStyle}>
                Vezi toate recomandările
              </Link>
            </Text>
          </EmailSection>

          {/* GDPR Compliance Section */}
          <EmailSection>
            <Section style={gdprSection}>
              <Text style={smallText}>
                <strong>Consimțământ GDPR:</strong> Ai primit acest email pentru că ai solicitat
                raportul de recomandări sportive. Datele tale sunt procesate conform{" "}
                <Link href={`${appUrl}${routes.privacy}`} style={linkStyle}>
                  Politicii de confidențialitate
                </Link>
                . Poți să te dezabonezi oricând folosind link-ul din footer.
              </Text>
            </Section>
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
};

const sectionHeading = {
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: "28px",
  color: YuvooColors.primary,
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

const primaryCard = {
  backgroundColor: YuvooColors.backgroundCyanLight,
  padding: "20px",
  borderRadius: "8px",
  border: `2px solid ${YuvooColors.primary}`,
  marginBottom: "20px",
};

const matchScoreText = {
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

const recommendationCard = {
  backgroundColor: YuvooColors.backgroundWhite,
  border: `1px solid ${YuvooColors.borderGrey}`,
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "16px",
};

const sportRank = {
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

const matchScore = {
  display: "inline-block",
  color: YuvooColors.primary,
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "12px",
};

const sportName = {
  fontSize: "18px",
  fontWeight: "600",
  color: YuvooColors.textPrimary,
  marginTop: "0",
  marginBottom: "12px",
  fontFamily: EmailTypography.heading.fontFamily,
};

const lessSuitableCard = {
  backgroundColor: YuvooColors.backgroundLight,
  border: `1px solid ${YuvooColors.borderGrey}`,
  borderRadius: "6px",
  padding: "16px",
  marginBottom: "12px",
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

const clubSection = {
  marginBottom: "24px",
};

const clubSportHeading = {
  fontSize: "18px",
  fontWeight: "600",
  color: YuvooColors.textPrimary,
  marginTop: "0",
  marginBottom: "12px",
  fontFamily: EmailTypography.heading.fontFamily,
};

const clubCard = {
  backgroundColor: YuvooColors.backgroundLight,
  border: `1px solid ${YuvooColors.borderGrey}`,
  borderRadius: "6px",
  padding: "16px",
  marginBottom: "12px",
};

const clubName = {
  fontSize: "16px",
  fontWeight: "600",
  color: YuvooColors.textPrimary,
  marginTop: "0",
  marginBottom: "8px",
  fontFamily: EmailTypography.heading.fontFamily,
};

const clubLink = {
  color: YuvooColors.primary,
  textDecoration: "underline",
  fontSize: "14px",
};

const specialistWarning = {
  backgroundColor: YuvooColors.backgroundOrangeLight,
  border: `2px solid ${YuvooColors.secondary}`,
  borderRadius: "8px",
  padding: "20px",
};

const specialistHeading = {
  fontSize: "18px",
  fontWeight: "600",
  color: YuvooColors.textPrimary,
  marginTop: "0",
  marginBottom: "12px",
  fontFamily: EmailTypography.heading.fontFamily,
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

const buttonSecondary = {
  backgroundColor: YuvooColors.secondary,
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
};

const gdprSection = {
  backgroundColor: YuvooColors.backgroundLight,
  padding: "16px",
  borderRadius: "6px",
  border: `1px solid ${YuvooColors.borderGrey}`,
};
