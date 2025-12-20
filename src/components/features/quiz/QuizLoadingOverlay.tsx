/**
 * Quiz Loading Overlay
 *
 * Full-screen loading overlay shown during quiz submission and AI processing.
 * Displays animated progress, rotating educational messages, and trust indicators.
 */

"use client";

import React, { useState, useEffect } from "react";

// Loading messages that rotate during processing
const LOADING_MESSAGES = [
  {
    icon: "bi-cpu",
    title: "Analizăm răspunsurile tale",
    description:
      "AI-ul nostru analizează vârsta, personalitatea și preferințele copilului tău pentru a genera recomandări personalizate.",
  },
  {
    icon: "bi-stars",
    title: "Creăm recomandări personalizate",
    description:
      "Pe baza a 6 factori cheie, generăm o listă de sporturi care se potrivesc perfect copilului tău.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Evaluăm compatibilitatea sporturilor",
    description:
      "Analizăm fiecare sport în raport cu nivelul de energie, tipul de personalitate și interesele copilului.",
  },
  {
    icon: "bi-shield-check",
    title: "Verificăm recomandările",
    description:
      "Ne asigurăm că fiecare recomandare este sigură, potrivită pentru vârstă și aliniată cu preferințele tale.",
  },
  {
    icon: "bi-lightbulb",
    title: "Pregătim rezultatele",
    description:
      "În câteva secunde vei vedea o listă detaliată cu sporturi recomandate și explicații clare pentru fiecare.",
  },
] as const;

// Trust indicators shown at bottom
const TRUST_INDICATORS = [
  {
    icon: "🔒",
    label: "Date Securizate",
    description: "GDPR compliant",
  },
  {
    icon: "🤖",
    label: "AI Avansat",
    description: "GPT-4 Turbo",
  },
  {
    icon: "⚡",
    label: "Procesare Rapidă",
    description: "10-20 secunde",
  },
] as const;

interface QuizLoadingOverlayProps {
  isVisible: boolean;
}

export default function QuizLoadingOverlay({ isVisible }: QuizLoadingOverlayProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Initialize start time when overlay becomes visible
  useEffect(() => {
    if (isVisible) {
      setStartTime(Date.now());
      setCurrentMessageIndex(0);
      setElapsedTime(0);
    } else {
      setStartTime(null);
    }
  }, [isVisible]);

  // Update elapsed time every 100ms
  useEffect(() => {
    if (!isVisible || !startTime) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible, startTime]);

  // Rotate messages every 4 seconds
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Simulate progress: 0% -> 90% over 20 seconds (final 10% when response arrives)
  const simulatedProgress = Math.min(90, (elapsedTime / 20000) * 90);
  const currentMessage = LOADING_MESSAGES[currentMessageIndex];

  if (!isVisible) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        zIndex: 9999,
        backgroundColor: "rgba(235, 255, 254, 0.98)", // #EBFFFE with opacity
        backdropFilter: "blur(8px)",
        overflowY: "auto", // Allow scrolling on mobile
        padding: "1rem", // Mobile padding
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-title"
      aria-describedby="loading-description"
    >
      <div className="container px-2 px-md-3">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <div className="text-center">
              {/* Animated Spinner - Smaller on mobile */}
              <div className="mb-3 mb-md-4">
                <div
                  className="spinner-border text-yuvoo-primary"
                  role="status"
                  style={{
                    width: "3.5rem", // Smaller on mobile
                    height: "3.5rem",
                    borderWidth: "0.4rem",
                  }}
                >
                  <span className="visually-hidden">Se procesează...</span>
                </div>
              </div>

              {/* Main Loading Message - Responsive font size */}
              <h2
                id="loading-title"
                className="fw-bold mb-2 mb-md-3"
                style={{ color: "#1B1B1B", fontSize: "1.1rem" }}
              >
                Generăm recomandările tale personalizate
              </h2>

              {/* Progress Bar */}
              <div className="mb-4 mb-md-5 px-2 px-md-0">
                <div
                  className="progress"
                  style={{
                    height: "6px", // Thinner on mobile
                    backgroundColor: "#e6e6e6",
                    borderRadius: "6px",
                  }}
                  role="progressbar"
                  aria-valuenow={Math.round(simulatedProgress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: `${simulatedProgress}%`,
                      backgroundColor: "#00BBAE",
                      transition: "width 0.3s ease-out",
                      borderRadius: "6px",
                    }}
                  />
                </div>
                <div className="mt-2">
                  <small className="text-muted fw-semibold" style={{ fontSize: "0.75rem" }}>
                    {Math.round(simulatedProgress)}% Completat
                  </small>
                </div>
              </div>

              {/* Rotating Content Card - Reduced padding on mobile */}
              <div
                className="card border-0 shadow-sm mb-3 mb-md-4"
                style={{
                  backgroundColor: "#ffffff",
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <div className="card-body p-3 p-md-4">
                  {/* Message Icon - Smaller on mobile */}
                  <div className="mb-2 mb-md-3">
                    <i
                      className={`bi ${currentMessage.icon}`}
                      style={{
                        color: "#FF9B24",
                        fontSize: "2rem", // Smaller on mobile
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Message Title - Responsive font size */}
                  <h3
                    className="fw-bold mb-2 mb-md-3"
                    style={{ color: "#1B1B1B", fontSize: "1rem" }}
                  >
                    {currentMessage.title}
                  </h3>

                  {/* Message Description - Better line height for mobile */}
                  <p
                    id="loading-description"
                    className="mb-0"
                    style={{
                      color: "#424242",
                      lineHeight: "1.5",
                      fontSize: "0.875rem", // Slightly smaller on mobile
                    }}
                  >
                    {currentMessage.description}
                  </p>
                </div>
              </div>

              {/* Trust Indicators - Stack on mobile, row on desktop */}
              <div className="row g-2 g-md-3 mt-2 mt-md-3">
                {TRUST_INDICATORS.map((indicator) => (
                  <div key={indicator.label} className="col-12 col-md-4">
                    <div
                      className="d-flex align-items-center justify-content-center gap-2 p-2 p-md-3 rounded"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        border: "1px solid #e6e6e6",
                      }}
                    >
                      <span
                        className="d-inline-block"
                        style={{ fontSize: "1.5rem" }}
                        aria-hidden="true"
                      >
                        {indicator.icon}
                      </span>
                      <div className="text-start flex-grow-1">
                        <div
                          className="fw-semibold"
                          style={{ color: "#1B1B1B", fontSize: "0.8rem" }}
                        >
                          {indicator.label}
                        </div>
                        <div style={{ color: "#6B6B6B", fontSize: "0.7rem" }}>
                          {indicator.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeout Warning (shown after 25 seconds) - Mobile optimized */}
              {elapsedTime > 25000 && (
                <div
                  className="alert alert-warning mt-3 mt-md-4 d-flex align-items-start gap-2 gap-md-3"
                  role="alert"
                  style={{
                    backgroundColor: "#FFF6EB",
                    borderLeft: "4px solid #FF9B24",
                    animation: "fadeIn 0.3s ease-in",
                    padding: "0.75rem",
                  }}
                >
                  <i
                    className="bi bi-clock-history flex-shrink-0"
                    style={{ color: "#FF9B24", fontSize: "1.25rem" }}
                  />
                  <div className="text-start flex-grow-1">
                    <strong className="d-block mb-1" style={{ fontSize: "0.875rem" }}>
                      Procesarea durează mai mult decât de obicei
                    </strong>
                    <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                      Încă lucrăm la generarea recomandărilor tale. Te rugăm să aștepți încă puțin.
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for fade in + Mobile responsive styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile-first responsive font sizes */
        @media (min-width: 768px) {
          #loading-title {
            font-size: 1.5rem !important;
          }
          .card-body h3 {
            font-size: 1.25rem !important;
          }
          .card-body .bi {
            font-size: 2.5rem !important;
          }
          .spinner-border {
            width: 5rem !important;
            height: 5rem !important;
            border-width: 0.5rem !important;
          }
        }

        /* Ensure content fits on small screens */
        @media (max-width: 575.98px) {
          .container {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
