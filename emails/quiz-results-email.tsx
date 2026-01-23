/**
 * Quiz Results Email Template
 *
 * Extended quiz results email with comprehensive recommendations.
 * Includes all content: child info, top 3 sports, detailed explanations,
 * less suitable sports, general recommendations, club previews, and account CTA.
 * Follows Yuvoo branding: comprehensive and helpful.
 */

import { Body, Container, Head, Heading, Html, Link, Preview, Text } from "@react-email/components";
import * as React from "react";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailSection } from "./components/EmailSection";
import { SportCard } from "./components/SportCard";
import { ClubPreview } from "./components/ClubPreview";
import { EmailButton } from "./components/EmailButton";
import { EmailDivider } from "./components/EmailDivider";
import { SectionHeading } from "./components/SectionHeading";
import { InfoCard } from "./components/InfoCard";
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

  // Safety check for quizResult first - must be valid before accessing properties
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
                Ne pare rău, dar a apărut o eroare la generarea emailului cu rezultatele
                chestionarului. Te rugăm să accesezi site-ul pentru a vedea rezultatele.
              </Text>
              <Text style={body}>
                <Link href={`${appUrl}${routes.quiz}`} style={linkStyle}>
                  Accesează site-ul Yuvoo
                </Link>
              </Text>
            </EmailSection>
            <EmailFooter unsubscribeToken={unsubscribeToken} />
          </Container>
        </Body>
      </Html>
    );
  }

  // Safety checks for child data
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
                Ne pare rău, dar a apărut o eroare la generarea emailului cu rezultatele
                chestionarului. Te rugăm să accesezi rezultatele direct pe site.
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
  const childAge = child.age || 0;
  const childGender =
    child.gender === "male" ? "băiat" : child.gender === "female" ? "fată" : "copil";

  // Get top 3 recommendations (sorted by match score)
  const topRecommendations = [...(quizResult.recommendations || [])]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  const primaryRecommendation = topRecommendations[0];

  // Safety check: handle missing recommendations gracefully
  if (
    !primaryRecommendation ||
    !quizResult.recommendations ||
    quizResult.recommendations.length === 0
  ) {
    return (
      <Html lang="ro">
        <Head>
          <title>Eroare - Yuvoo</title>
        </Head>
        <Preview>Eroare la generarea recomandărilor</Preview>
        <Body style={main}>
          <Container style={container}>
            <EmailHeader />
            <EmailSection>
              <Heading style={heading}>Eroare</Heading>
              <Text style={body}>
                Ne pare rău, dar nu am putut genera recomandările pentru {childName}. Te rugăm să
                accesezi rezultatele direct pe site.
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

  // Less suitable sports (scores below 70)
  const lessSuitableSports = quizResult.recommendations
    .filter((rec) => rec.matchScore < 70)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  // Results URL
  const resultsUrl = `${appUrl}${routes.quiz.results(quizResult.id)}`;
  const clubsUrl = `${appUrl}${routes.clubs.list}`;
  const registerUrl = `${appUrl}${routes.register}`;

  const previewText = primaryRecommendation
    ? `Rezultatele chestionarului pentru ${childName}: ${primaryRecommendation.sportName} este recomandarea noastră principală!`
    : `Rezultatele chestionarului pentru ${childName} sunt gata!`;

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
            <Heading style={heading}>Rezultatele Chestionarului AI</Heading>
            <Text style={body}>Salut {userName},</Text>
            <Text style={body}>
              Rezultatele chestionarului pentru <strong>{childName}</strong> sunt gata! Am analizat
              răspunsurile și am generat recomandări personalizate de sporturi care se potrivesc cel
              mai bine profilului copilului tău.
            </Text>
          </EmailSection>

          <EmailSection>
            <SectionHeading>Informații despre copil</SectionHeading>
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

          <EmailDivider />

          <EmailSection>
            <SectionHeading>🏆 Recomandarea noastră principală</SectionHeading>
            <SportCard recommendation={primaryRecommendation} variant="primary" />
          </EmailSection>

          <EmailDivider />

          {topRecommendations.length > 0 && (
            <EmailSection>
              <SectionHeading>Top 3 sporturi potrivite</SectionHeading>
              <Text style={body}>
                Iată cele mai potrivite sporturi pentru {childName}, bazate pe profilul completat:
              </Text>
              {topRecommendations.map((rec, index) => (
                <SportCard
                  key={rec.sportId}
                  recommendation={rec}
                  rank={index + 1}
                  variant="default"
                />
              ))}
            </EmailSection>
          )}

          {lessSuitableSports.length > 0 && (
            <>
              <EmailDivider />
              <EmailSection>
                <SectionHeading>Sporturi mai puțin potrivite</SectionHeading>
                <Text style={body}>
                  Următoarele sporturi sunt mai puțin recomandate pentru {childName}, dar pot fi
                  considerate în viitor:
                </Text>
                {lessSuitableSports.map((rec) => (
                  <SportCard key={rec.sportId} recommendation={rec} variant="less-suitable" />
                ))}
              </EmailSection>
            </>
          )}

          <EmailDivider />

          <EmailSection>
            <SectionHeading>Recomandări generale de început</SectionHeading>
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

          {topRecommendations.length > 0 && (
            <>
              <EmailDivider />
              <EmailSection>
                <SectionHeading>Cluburi recomandate</SectionHeading>
                <Text style={body}>
                  Iată câteva cluburi sportive care oferă sporturile recomandate:
                </Text>
                {topRecommendations.map((rec) => {
                  const clubs = clubsBySport.get(rec.sportId) || [];
                  const topClubs = clubs.slice(0, 3);

                  if (topClubs.length === 0) return null;

                  return (
                    <div key={rec.sportId} style={clubSection}>
                      <Heading as="h3" style={clubSportHeading}>
                        {rec.sportName}
                      </Heading>
                      {topClubs.map((club) => (
                        <ClubPreview key={club.id} club={club} />
                      ))}
                    </div>
                  );
                })}
                <div style={ctaSection}>
                  <EmailButton href={clubsUrl} variant="primary">
                    Explorează toate cluburile
                  </EmailButton>
                </div>
              </EmailSection>
            </>
          )}

          {quizResult.specialistRecommendation?.needed && (
            <>
              <EmailDivider />
              <EmailSection>
                <InfoCard variant="highlight" style={specialistWarning}>
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
                  <div style={ctaSection}>
                    <EmailButton href={`${appUrl}${routes.doctors.list}`} variant="secondary">
                      Vezi specialiști recomandați
                    </EmailButton>
                  </div>
                </InfoCard>
              </EmailSection>
            </>
          )}

          <EmailDivider />

          <EmailSection>
            <SectionHeading>Creează cont pentru mai multe beneficii</SectionHeading>
            <Text style={body}>
              Poți crea un cont gratuit pentru a accesa funcționalități suplimentare:
            </Text>
            <ul style={listStyle}>
              <li style={listItem}>Salvează recomandările și accesează-le oricând</li>
              <li style={listItem}>Rezervă probe gratuite la cluburile preferate</li>
              <li style={listItem}>Gestionează profilul copilului și urmărește progresul</li>
              <li style={listItem}>Primește notificări despre evenimente și oferte speciale</li>
            </ul>
            <div style={ctaSection}>
              <EmailButton href={registerUrl} variant="primary">
                Creează cont gratuit
              </EmailButton>
            </div>
            <Text style={smallText}>
              Sau accesează rezultatele complete:{" "}
              <Link href={resultsUrl} style={linkStyle}>
                Vezi toate recomandările
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

const specialistWarning = {
  backgroundColor: YuvooColors.backgroundOrangeLight,
  border: `2px solid ${YuvooColors.secondary}`,
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

const linkStyle = {
  color: YuvooColors.primary,
  textDecoration: "underline",
};
