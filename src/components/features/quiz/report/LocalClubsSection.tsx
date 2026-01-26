/**
 * Local Clubs Section Component
 *
 * Displays suggestions for local clubs based on recommended sports.
 */

import React from "react";
import type { QuizResult } from "@/modules/quiz/quiz.types";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { getCityIdByName } from "@/lib/db/location-helpers";
import { normalizeSportName } from "@/lib/utils/sport-normalization";

interface LocalClubsSectionProps {
  quizResult: QuizResult;
}

/**
 * Local Clubs Section
 *
 * Displays club suggestions based on recommended sports.
 * Note: This is a placeholder - actual club data will be fetched in Phase 6.
 */
export default async function LocalClubsSection({ quizResult }: LocalClubsSectionProps) {
  const topRecommendations = [...quizResult.recommendations]
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  if (topRecommendations.length === 0) {
    return null;
  }

  // Parse location to extract city name and get cityId
  // Location format might be "Sector 1, București" or just "București"
  let cityId: string | null = null;
  if (quizResult.location) {
    // Extract city name (everything after the last comma, or the whole string if no comma)
    const locationParts = quizResult.location.split(",").map((part) => part.trim());
    const cityName = locationParts[locationParts.length - 1]; // Get last part (city name)
    cityId = await getCityIdByName(cityName);
  }

  return (
    <section className="mb-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light">
          <h2 className="h4 mb-0">
            <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
            Sugestii de cluburi locale
          </h2>
        </div>
        <div className="card-body p-4">
          <p className="text-muted mb-4">
            {quizResult.location ? (
              <>
                Pentru fiecare sport recomandat, poți găsi cluburi locale în{" "}
                <strong>{quizResult.location}</strong> care oferă programe pentru copii. Te
                încurajăm să explorezi opțiunile disponibile în zona ta și să programezi lecții de
                probă pentru a găsi cel mai potrivit club pentru copilul tău.
              </>
            ) : (
              <>
                Pentru fiecare sport recomandat, poți găsi cluburi locale care oferă programe pentru
                copii. Te încurajăm să explorezi opțiunile disponibile în zona ta și să programezi
                lecții de probă pentru a găsi cel mai potrivit club pentru copilul tău.
              </>
            )}
          </p>

          <div className="row gap-4">
            {topRecommendations.map((recommendation) => (
              <div key={recommendation.sportId} className="col-12">
                <div className="card border-0 bg-light h-100">
                  <div className="card-body p-4">
                    <h3 className="h5 fw-bold mb-3">{recommendation.sportName}</h3>
                    <p className="text-muted small mb-3">
                      Caută cluburi care oferă programe pentru copii de vârsta copilului tău și care
                      au experiență în lucrul cu începători.
                    </p>
                    <Link
                      href={`${routes.clubs.list}?sport=${encodeURIComponent(normalizeSportName(recommendation.sportName))}${cityId ? `&cityId=${encodeURIComponent(cityId)}` : ""}&quiz=true`}
                      className="btn btn-yuvoo-outline-primary btn-sm w-100"
                    >
                      <i className="bi bi-search me-2"></i>
                      Caută Cluburi{quizResult.location ? ` în ${quizResult.location}` : ""}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="alert alert-info mb-0" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Notă importantă:</strong> Aceste sugestii sunt bazate pe sporturile
              recomandate. Te rugăm să verifici disponibilitatea și programele actuale direct cu
              cluburile. Nu garantăm locuri disponibile sau programe specifice.
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link href={routes.clubs.list} className="btn btn-yuvoo-primary">
              <i className="bi bi-list-ul me-2"></i>
              Vezi Toate Cluburile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
