/**
 * Teaser Page
 *
 * Displays single sport recommendation (minimal details) after email collection.
 * Includes CTA to unlock full report via payment.
 */

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { getQuizResultAction } from "@/app/actions/quiz";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { trackEventServer } from "@/lib/analytics/tracking-server";
import { PostHogEvents, PostHogProperties } from "@/lib/analytics/events";

interface TeaserPageProps {
  params: Promise<{ quizId: string }>;
}

/**
 * Generate static params for Cache Components compatibility
 */
export async function generateStaticParams() {
  return [{ quizId: "placeholder" }];
}

/**
 * Generate metadata for teaser page
 */
export async function generateMetadata({ params }: TeaserPageProps): Promise<Metadata> {
  const { quizId: _quizId } = await params;

  return {
    title: "Recomandarea ta personalizată | Yuvoo",
    description:
      "Vezi recomandarea noastră personalizată de sport pentru copilul tău. Deblochează raportul complet pentru detalii și plan de acțiune.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Teaser Page
 *
 * Displays single sport recommendation with minimal details.
 * Includes CTA to unlock full report.
 */
export default async function TeaserPage({ params }: TeaserPageProps) {
  // Access dynamic data sources first to mark route as dynamic
  const _cookies = await cookies();
  const { quizId } = await params;

  // Fetch quiz results
  const quizResult = await getQuizResultAction(quizId);

  if (!quizResult) {
    notFound();
  }

  // Verify quiz has recommendations
  if (!quizResult.recommendations || quizResult.recommendations.length === 0) {
    notFound();
  }

  // Get top recommendation (highest match score)
  const sortedRecommendations = [...quizResult.recommendations].sort(
    (a, b) => b.matchScore - a.matchScore
  );
  const topRecommendation = sortedRecommendations[0];

  // Track teaser view
  try {
    await trackEventServer(PostHogEvents.TEASER_VIEWED, {
      distinctId: "anonymous",
      [PostHogProperties.QUIZ_ID]: quizId,
      [PostHogProperties.SPORT_NAME]: topRecommendation.sportName,
      [PostHogProperties.MATCH_SCORE]: topRecommendation.matchScore,
    });
  } catch (error) {
    // Don't block page render if tracking fails
    console.error("[Teaser Page] Error tracking event:", error);
  }

  return (
    <>
      <BreadcrumbOne
        title="Recomandarea ta personalizată"
        subTitle="Teaser"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Chestionar", url: routes.quiz.intro },
          { name: "Recomandare", url: routes.quiz.teaser(quizId) },
        ]}
      />
      <section className="teaser-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* Header */}
              <div className="text-center mb-5">
                <h1 className="display-5 fw-bold mb-3">Am identificat sportul potrivit!</h1>
                <p className="lead text-muted">
                  Pe baza răspunsurilor tale, iată recomandarea noastră principală pentru copilul
                  tău.
                </p>
              </div>

              {/* Top Recommendation Card */}
              <div className="card shadow-lg border-0 mb-4 border-top border-5 border-primary">
                <div className="card-body p-4 p-md-5">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <span className="badge bg-primary fs-6 mb-2">
                        {topRecommendation.matchScore}% potrivire
                      </span>
                      <h2 className="h3 fw-bold mb-2">{topRecommendation.sportName}</h2>
                    </div>
                  </div>

                  {/* Minimal reasoning (truncated) */}
                  <p className="text-muted mb-4" style={{ fontStyle: "italic" }}>
                    {topRecommendation.reasoning.substring(0, 300)}
                    {topRecommendation.reasoning.length > 300 ? "..." : ""}
                  </p>

                  {/* Info box */}
                  <div className="alert alert-info mb-0" role="alert">
                    <i className="bi bi-info-circle me-2" aria-hidden="true"></i>
                    <strong>Recomandare parțială:</strong> Aceasta este doar o previzualizare.
                    Raportul complet include explicații detaliate, beneficiile fizice și emoționale,
                    sporturi de evitat, vârsta ideală pentru început, pașii următori și sugestii de
                    cluburi locale.
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center mb-5">
                <h3 className="h4 mb-3">Deblochează raportul complet</h3>
                <p className="text-muted mb-4">
                  Raportul complet include toate recomandările personalizate, explicații detaliate
                  și planul de acțiune pentru a începe călătoria sportivă a copilului tău.
                </p>
                <Link
                  href={routes.quiz.paywall(quizId)}
                  className="btn btn-primary btn-lg px-5 py-3"
                  aria-label="Deblochează raportul complet pentru a vedea toate recomandările"
                >
                  <i className="bi bi-unlock-fill me-2" aria-hidden="true"></i>
                  Deblochează Raportul Complet
                </Link>
              </div>

              {/* What's Included Preview */}
              <div className="card bg-light border-0 mb-4">
                <div className="card-body p-4">
                  <h4 className="h5 mb-3">Ce include raportul complet:</h4>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Top 2-3 sporturi recomandate cu scoruri de potrivire
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Explicații detaliate despre de ce aceste sporturi sunt potrivite
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Beneficii fizice și emoționale pentru fiecare sport
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-md-6">
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Sporturi de evitat momentan
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Vârsta ideală pentru început
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Pașii următori recomandați
                        </li>
                        <li className="mb-2">
                          <i
                            className="bi bi-check-circle-fill text-success me-2"
                            aria-hidden="true"
                          ></i>
                          Sugestii de cluburi locale
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Message */}
              <div className="text-center">
                <p className="text-muted small mb-0">
                  <i className="bi bi-shield-check text-success me-2" aria-hidden="true"></i>
                  Acces permanent • Fără abonament • Raport complet personalizat
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
