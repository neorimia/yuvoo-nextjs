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
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-title"
      aria-describedby="loading-description"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <div className="text-center">
              {/* Animated Spinner */}
              <div className="mb-4">
                <div
                  className="spinner-border text-yuvoo-primary"
                  role="status"
                  style={{
                    width: "5rem",
                    height: "5rem",
                    borderWidth: "0.5rem",
                  }}
                >
                  <span className="visually-hidden">Se procesează...</span>
                </div>
              </div>

              {/* Main Loading Message */}
              <h2 id="loading-title" className="h4 fw-bold mb-3" style={{ color: "#1B1B1B" }}>
                Generăm recomandările tale personalizate
              </h2>

              {/* Progress Bar */}
              <div className="mb-5">
                <div
                  className="progress"
                  style={{
                    height: "8px",
                    backgroundColor: "#e6e6e6",
                    borderRadius: "8px",
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
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className="mt-2">
                  <small className="text-muted fw-semibold">
                    {Math.round(simulatedProgress)}% Completat
                  </small>
                </div>
              </div>

              {/* Rotating Content Card */}
              <div
                className="card border-0 shadow-sm mb-4"
                style={{
                  backgroundColor: "#ffffff",
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <div className="card-body p-4">
                  {/* Message Icon */}
                  <div className="mb-3">
                    <i
                      className={`bi ${currentMessage.icon} fs-1`}
                      style={{ color: "#FF9B24" }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Message Title */}
                  <h3 className="h5 fw-bold mb-3" style={{ color: "#1B1B1B" }}>
                    {currentMessage.title}
                  </h3>

                  {/* Message Description */}
                  <p
                    id="loading-description"
                    className="mb-0"
                    style={{ color: "#424242", lineHeight: "1.6" }}
                  >
                    {currentMessage.description}
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="row g-3 mt-3">
                {TRUST_INDICATORS.map((indicator) => (
                  <div key={indicator.label} className="col-12 col-md-4">
                    <div
                      className="d-flex align-items-center justify-content-center gap-2 p-3 rounded"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        border: "1px solid #e6e6e6",
                      }}
                    >
                      <span className="fs-4" aria-hidden="true">
                        {indicator.icon}
                      </span>
                      <div className="text-start">
                        <div className="fw-semibold small" style={{ color: "#1B1B1B" }}>
                          {indicator.label}
                        </div>
                        <div className="small" style={{ color: "#6B6B6B" }}>
                          {indicator.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeout Warning (shown after 25 seconds) */}
              {elapsedTime > 25000 && (
                <div
                  className="alert alert-warning mt-4 d-flex align-items-start gap-3"
                  role="alert"
                  style={{
                    backgroundColor: "#FFF6EB",
                    borderLeft: "4px solid #FF9B24",
                    animation: "fadeIn 0.3s ease-in",
                  }}
                >
                  <i
                    className="bi bi-clock-history fs-4 flex-shrink-0"
                    style={{ color: "#FF9B24" }}
                  />
                  <div className="text-start">
                    <strong className="d-block mb-1">
                      Procesarea durează mai mult decât de obicei
                    </strong>
                    <small className="text-muted">
                      Încă lucrăm la generarea recomandărilor tale. Te rugăm să aștepți încă puțin.
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for fade in */}
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
      `}</style>
    </div>
  );
}
