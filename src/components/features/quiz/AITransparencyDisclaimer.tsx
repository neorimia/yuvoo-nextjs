/**
 * AI Transparency Disclaimer Component
 *
 * GDPR Art. 22 & EU AI Act Compliance:
 * - Informs users that recommendations are AI-generated
 * - Explains the logic and significance of automated decisions
 * - Provides access to human review mechanism
 * - Displays medical disclaimer for health-related suggestions
 *
 * All text in Romanian as per project requirements.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface AITransparencyDisclaimerProps {
  /** Whether to show expanded details by default */
  expandedByDefault?: boolean;
  /** Optional class name for styling */
  className?: string;
  /** Show the medical disclaimer section */
  showMedicalDisclaimer?: boolean;
  /** Show the human review section with CTA */
  showHumanReviewCTA?: boolean;
  /** Quiz ID for human review request */
  quizId?: string;
  /** Callback when human review is requested */
  onHumanReviewRequest?: () => void;
}

/**
 * AITransparencyDisclaimer - GDPR Art. 22 & EU AI Act compliant transparency notice
 *
 * Provides:
 * - Clear disclosure that recommendations are AI-generated
 * - Explanation of how the AI makes decisions
 * - Information about data used for recommendations
 * - Access to human review mechanism
 * - Medical disclaimer for health-related content
 */
export function AITransparencyDisclaimer({
  expandedByDefault = false,
  className = "",
  showMedicalDisclaimer = true,
  showHumanReviewCTA = true,
  quizId,
  onHumanReviewRequest,
}: AITransparencyDisclaimerProps) {
  const [isExpanded, setIsExpanded] = useState(expandedByDefault);

  return (
    <div className={`ai-transparency-disclaimer ${className}`}>
      {/* Main AI Disclosure Card */}
      <div className="card border-info bg-info bg-opacity-10 mb-4">
        <div className="card-body">
          <div className="d-flex align-items-start gap-3">
            <div className="flex-shrink-0">
              <i className="bi bi-robot fs-3 text-info" />
            </div>
            <div className="flex-grow-1">
              <h5 className="card-title h6 mb-2 d-flex align-items-center gap-2">
                <span>Recomandări Generate cu Inteligență Artificială</span>
                <span className="badge bg-info text-dark">AI</span>
              </h5>
              <p className="card-text text-muted mb-2">
                Aceste recomandări au fost generate automat de un sistem de inteligență artificială
                (AI) pe baza răspunsurilor tale din chestionar. Sistemul analizează profilul
                copilului tău pentru a sugera sporturi potrivite.
              </p>

              {/* Toggle for detailed info */}
              <button
                type="button"
                className="btn btn-sm btn-link text-info p-0 text-decoration-none"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls="ai-transparency-details"
              >
                <i className={`bi bi-chevron-${isExpanded ? "up" : "down"} me-1`} />
                {isExpanded ? "Ascunde detalii" : "Află mai multe despre cum funcționează"}
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div id="ai-transparency-details" className="mt-3 pt-3 border-top">
                  {/* How AI works */}
                  <div className="mb-3">
                    <h6 className="fw-semibold mb-2">
                      <i className="bi bi-gear me-2 text-info" />
                      Cum funcționează recomandările
                    </h6>
                    <p className="small text-muted mb-0">
                      Sistemul AI analizează următoarele informații din chestionar pentru a genera
                      recomandări personalizate:
                    </p>
                    <ul className="small text-muted mb-0 mt-2">
                      <li>
                        <strong>Vârsta copilului</strong> - pentru a sugera sporturi potrivite
                        etapei de dezvoltare
                      </li>
                      <li>
                        <strong>Nivelul de energie și personalitatea</strong> - pentru a identifica
                        sporturi compatibile
                      </li>
                      <li>
                        <strong>Interesele și preferințele</strong> - pentru a maximiza motivația și
                        plăcerea
                      </li>
                      <li>
                        <strong>Caracteristici fizice</strong> - pentru a sugera sporturi în care
                        copilul poate excela
                      </li>
                      <li>
                        <strong>Informații despre sănătate</strong> - pentru a evita sporturi care
                        ar putea prezenta riscuri
                      </li>
                    </ul>
                  </div>

                  {/* Data processing info */}
                  <div className="mb-3">
                    <h6 className="fw-semibold mb-2">
                      <i className="bi bi-shield-check me-2 text-info" />
                      Protecția datelor
                    </h6>
                    <p className="small text-muted mb-0">
                      Datele copilului tău sunt procesate în conformitate cu GDPR. Folosim doar
                      informațiile necesare pentru a genera recomandări și nu partajăm date cu terți
                      fără consimțământul tău explicit. Citește{" "}
                      <Link href={routes.privacy} className="text-info">
                        Politica de Confidențialitate
                      </Link>{" "}
                      pentru detalii complete.
                    </p>
                  </div>

                  {/* Limitations */}
                  <div className="mb-0">
                    <h6 className="fw-semibold mb-2">
                      <i className="bi bi-exclamation-triangle me-2 text-warning" />
                      Limitări importante
                    </h6>
                    <ul className="small text-muted mb-0">
                      <li>
                        Recomandările sunt orientative și nu înlocuiesc evaluarea directă a unui
                        antrenor sau specialist
                      </li>
                      <li>
                        AI-ul nu poate lua în considerare toți factorii individuali ai copilului tău
                      </li>
                      <li>
                        Decizia finală privind sportul potrivit aparține întotdeauna părintelui
                      </li>
                      <li>
                        Recomandăm discutarea opțiunilor cu un medic pediatru, în special pentru
                        copiii cu condiții medicale
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      {showMedicalDisclaimer && (
        <div className="card border-warning bg-warning bg-opacity-10 mb-4">
          <div className="card-body">
            <div className="d-flex align-items-start gap-3">
              <div className="flex-shrink-0">
                <i className="bi bi-heart-pulse fs-3 text-warning" />
              </div>
              <div className="flex-grow-1">
                <h5 className="card-title h6 mb-2">
                  <i className="bi bi-exclamation-triangle-fill text-warning me-2" />
                  Disclaimer Medical
                </h5>
                <p className="card-text text-muted small mb-2">
                  <strong>Aceste recomandări NU constituie sfat medical.</strong> Yuvoo este o
                  platformă de orientare sportivă și nu oferă diagnostic sau tratament medical.
                </p>
                <ul className="small text-muted mb-0">
                  <li>
                    Consultă întotdeauna un <strong>medic pediatru</strong> înainte de a înscrie
                    copilul la orice activitate sportivă
                  </li>
                  <li>
                    Pentru copiii cu condiții medicale (astm, probleme cardiace, ortopedice, etc.),
                    este esențială aprobarea medicului
                  </li>
                  <li>
                    Informațiile despre sănătate din chestionar sunt folosite doar pentru a genera
                    sugestii orientative
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Human Review CTA */}
      {showHumanReviewCTA && (
        <div className="card border-secondary bg-secondary bg-opacity-5 mb-4">
          <div className="card-body">
            <div className="d-flex align-items-start gap-3">
              <div className="flex-shrink-0">
                <i className="bi bi-person-check fs-3 text-secondary" />
              </div>
              <div className="flex-grow-1">
                <h5 className="card-title h6 mb-2">Dreptul la Revizuire Umană (GDPR Art. 22)</h5>
                <p className="card-text text-muted small mb-3">
                  Ai dreptul să soliciți revizuirea recomandărilor de către o persoană umană. Echipa
                  noastră va analiza profilul copilului tău și va oferi clarificări sau recomandări
                  suplimentare.
                </p>
                {quizId && onHumanReviewRequest && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={onHumanReviewRequest}
                  >
                    <i className="bi bi-person-lines-fill me-2" />
                    Solicită Revizuire Umană
                  </button>
                )}
                {!onHumanReviewRequest && (
                  <a
                    href={`mailto:gdpr@yuvoo.ro?subject=Solicitare revizuire umană - Quiz ${quizId || ""}&body=Doresc să solicit revizuirea umană a recomandărilor generate pentru chestionarul cu ID: ${quizId || "[ID chestionar]"}%0A%0AMotivul solicitării:%0A%0A`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <i className="bi bi-envelope me-2" />
                    Solicită Revizuire Umană
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal links */}
      <div className="text-center">
        <small className="text-muted">
          Pentru informații complete despre drepturile tale, consultă{" "}
          <Link href={routes.privacy} className="text-decoration-none">
            Politica de Confidențialitate
          </Link>
          ,{" "}
          <Link href={routes.gdpr} className="text-decoration-none">
            GDPR pentru Părinți
          </Link>{" "}
          și{" "}
          <Link href={routes.terms} className="text-decoration-none">
            Termeni și Condiții
          </Link>
          .
        </small>
      </div>
    </div>
  );
}

export default AITransparencyDisclaimer;
