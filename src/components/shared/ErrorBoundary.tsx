/**
 * Error Boundary Component
 *
 * Catches React errors and displays user-friendly error messages.
 * Used to handle unexpected errors in the payment flow and other critical areas.
 */

"use client";

import React, { Component, ReactNode } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console
    console.error("[Error Boundary] Caught error:", error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // TODO: Send error to error tracking service (e.g., Sentry)
    // if (process.env.NODE_ENV === "production") {
    //   Sentry.captureException(error, { contexts: { react: errorInfo } });
    // }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body p-5 text-center">
                  <div className="mb-4">
                    <div
                      className="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                      style={{ width: "80px", height: "80px" }}
                      role="img"
                      aria-label="Eroare"
                    >
                      <i
                        className="bi bi-exclamation-triangle-fill text-danger"
                        style={{ fontSize: "3rem" }}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>

                  <h2 className="h4 mb-3">Ceva nu a mers bine</h2>
                  <p className="text-muted mb-4">
                    A apărut o eroare neașteptată. Te rugăm să încerci din nou sau să contactezi
                    suportul dacă problema persistă.
                  </p>

                  {process.env.NODE_ENV === "development" && this.state.error && (
                    <div className="alert alert-danger text-start mb-4" role="alert">
                      <strong>Eroare (doar în dezvoltare):</strong>
                      <pre className="mb-0 mt-2 small" style={{ whiteSpace: "pre-wrap" }}>
                        {this.state.error.toString()}
                      </pre>
                    </div>
                  )}

                  <div className="d-flex gap-3 justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={this.handleReset}>
                      <i className="bi bi-arrow-clockwise me-2" aria-hidden="true"></i>
                      Încearcă din nou
                    </button>
                    <Link href={routes.home} className="btn btn-outline-primary">
                      <i className="bi bi-house-door me-2" aria-hidden="true"></i>
                      Acasă
                    </Link>
                    <Link href="mailto:support@yuvoo.com" className="btn btn-outline-secondary">
                      <i className="bi bi-envelope me-2" aria-hidden="true"></i>
                      Contactează suportul
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Payment Flow Error Boundary
 *
 * Specialized error boundary for payment flow with payment-specific messaging.
 */
export function PaymentErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log payment-specific errors
        console.error("[Payment Error Boundary] Payment flow error:", error, errorInfo);
      }}
      fallback={
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body p-5 text-center">
                  <div className="mb-4">
                    <div
                      className="rounded-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center"
                      style={{ width: "80px", height: "80px" }}
                      role="img"
                      aria-label="Eroare la plată"
                    >
                      <i
                        className="bi bi-credit-card text-warning"
                        style={{ fontSize: "3rem" }}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>

                  <h2 className="h4 mb-3">Eroare la procesarea plății</h2>
                  <p className="text-muted mb-4">
                    A apărut o problemă în timpul procesării plății. Plata ta nu a fost procesată.
                    Te rugăm să încerci din nou sau să contactezi suportul dacă problema persistă.
                  </p>

                  <div className="alert alert-info mb-4" role="alert">
                    <i className="bi bi-info-circle me-2" aria-hidden="true"></i>
                    <strong>Important:</strong> Dacă ai fost deja debitat, plata va fi procesată
                    automat. Vei primi un email de confirmare în câteva momente.
                  </div>

                  <div className="d-flex gap-3 justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => window.location.reload()}
                    >
                      <i className="bi bi-arrow-clockwise me-2" aria-hidden="true"></i>
                      Reîncarcă pagina
                    </button>
                    <Link href="mailto:support@yuvoo.com" className="btn btn-outline-primary">
                      <i className="bi bi-envelope me-2" aria-hidden="true"></i>
                      Contactează suportul
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
