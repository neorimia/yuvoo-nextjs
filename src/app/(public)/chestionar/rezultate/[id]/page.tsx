import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import BreadcrumbOne from "@/components/Breadcrumb/BreadcrumbOne";
import { getQuizResultAction } from "@/app/actions/quiz";
import SportRecommendationCard from "@/components/features/quiz/SportRecommendationCard";
import SpecialistRecommendationCard from "@/components/features/quiz/SpecialistRecommendationCard";
import ResultsActions from "@/components/features/quiz/ResultsActions";
import { routes } from "@/lib/routes";
import { getSession } from "@/lib/auth/session";

interface QuizResultsPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate static params for Cache Components compatibility
 *
 * Required for dynamic routes with [id] parameters.
 * Returns at least one value to satisfy Cache Components pattern.
 * Since quiz IDs are dynamic and unknown at build time, we return a placeholder.
 * Actual quiz results are fetched dynamically at request time.
 */
export async function generateStaticParams() {
  // Return placeholder to satisfy Cache Components requirement
  // Actual routes are generated dynamically at request time
  return [{ id: "placeholder" }];
}

/**
 * Generate metadata for quiz results page
 */
export async function generateMetadata({ params }: QuizResultsPageProps): Promise<Metadata> {
  const { id: _id } = await params; // ID not used in metadata, but required for type

  return {
    title: `Rezultate Chestionar - Recomandări Personalizate | Yuvoo`,
    description:
      "Vezi recomandările personalizate de sporturi pentru copilul tău, generate de AI pe baza răspunsurilor tale.",
    keywords: [
      "rezultate chestionar sporturi",
      "recomandări sport copii",
      "sporturi potrivite copil",
      "AI recomandări personalizate",
    ],
    openGraph: {
      title: `Rezultate Chestionar - Recomandări Personalizate | Yuvoo`,
      description: "Vezi recomandările personalizate de sporturi pentru copilul tău.",
      type: "website",
      locale: "ro_RO",
    },
    twitter: {
      card: "summary_large_image",
      title: `Rezultate Chestionar - Recomandări Personalizate | Yuvoo`,
      description: "Vezi recomandările personalizate de sporturi pentru copilul tău.",
    },
    robots: {
      index: false, // Private/personalized results - should not be indexed
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

/**
 * Quiz Results Page
 *
 * Displays AI-generated sport recommendations for a completed quiz.
 * Public route (no authentication required for viewing).
 * SEO-friendly route: /chestionar/rezultate/[id]
 */
export default async function QuizResultsPage({ params }: QuizResultsPageProps) {
  // Access dynamic data sources first to mark route as dynamic
  // This allows crypto.randomUUID() usage in downstream code
  const _cookies = await cookies(); // Mark route as dynamic
  const { id } = await params;

  // Fetch quiz results
  const quizResult = await getQuizResultAction(id);

  // Handle not found
  if (!quizResult) {
    notFound();
  }

  // Check authentication status (server-side)
  const session = await getSession();
  const isAuthenticated = !!session;

  // Sort recommendations by match score (highest first)
  const sortedRecommendations = [...quizResult.recommendations].sort(
    (a, b) => b.matchScore - a.matchScore
  );

  return (
    <>
      <BreadcrumbOne
        title="Rezultate Chestionar"
        subTitle="Rezultate"
        items={[
          { name: "Yuvoo", url: routes.home },
          { name: "Chestionar", url: routes.quiz.intro },
          { name: "Rezultate", url: routes.quiz.results(id) }, // Current page
        ]}
      />
      <section className="quiz-results-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* Header */}
              <div className="text-center mb-5">
                <h1 className="display-5 fw-bold mb-3">Recomandările Tale Personalizate</h1>
                <p className="lead text-muted">
                  Pe baza răspunsurilor tale, am generat următoarele recomandări de sporturi pentru
                  copilul tău.
                </p>
              </div>

              {/* Results Actions */}
              <ResultsActions
                quizId={quizResult.id}
                className="mb-4"
                isAuthenticated={isAuthenticated}
              />

              {/* Specialist Recommendation */}
              {quizResult.specialistRecommendation && (
                <div className="specialist-recommendation-section mb-5">
                  <h2 className="h4 mb-4">
                    <i className="bi bi-stethoscope text-primary me-2"></i>
                    Recomandare Specialist Medical
                  </h2>
                  <SpecialistRecommendationCard
                    recommendation={quizResult.specialistRecommendation}
                  />
                </div>
              )}

              {/* Sport Recommendations */}
              <div className="recommendations-list">
                <h2 className="h4 mb-4">
                  <i className="bi bi-star-fill text-warning me-2"></i>
                  Sporturi Recomandate
                </h2>

                {sortedRecommendations.length === 0 ? (
                  <div className="alert alert-info" role="alert">
                    <i className="bi bi-info-circle me-2"></i>
                    Nu s-au putut genera recomandări în acest moment. Te rugăm să încerci din nou.
                  </div>
                ) : (
                  <div className="row g-4">
                    {sortedRecommendations.map((recommendation, index) => (
                      <div key={recommendation.sportId} className="col-12">
                        <SportRecommendationCard recommendation={recommendation} rank={index + 1} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div className="mt-4 pt-4 border-top">
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="flex-shrink-0">
                        <i className="bi bi-lightbulb-fill text-warning fs-4"></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="h6 mb-2">Cum folosesc aceste recomandări?</h5>
                        <p className="text-muted small mb-0">
                          Aceste recomandări sunt personalizate pe baza răspunsurilor tale.
                          Explorează cluburile care oferă aceste sporturi și rezervă o probă
                          gratuită pentru copilul tău.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-start">
                      <div className="flex-shrink-0">
                        <i className="bi bi-arrow-repeat text-primary fs-4"></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="h6 mb-2">Vrei să repeți chestionarul?</h5>
                        <p className="text-muted small mb-0">
                          Poți completa chestionarul din nou oricând pentru a obține recomandări
                          actualizate sau pentru un alt copil.
                        </p>
                        <a href={routes.quiz.intro} className="btn btn-sm btn-outline-primary mt-2">
                          Repetă Chestionarul
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
