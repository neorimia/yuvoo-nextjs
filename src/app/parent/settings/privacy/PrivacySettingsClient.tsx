"use client";

import React, { useState, useTransition } from "react";
import { toggleConsentAction } from "@/app/actions/consent";
import { requestDataExportAction } from "@/app/actions/data-export";
import {
  requestDataErasureAction,
  getErasureConfirmationPhraseAction,
} from "@/app/actions/data-erasure";
import type { ConsentType } from "@/lib/consent/constants";

// ============================================================================
// Types
// ============================================================================

interface ConsentStatus {
  type: ConsentType;
  label: string;
  description: string;
  legalBasis: string;
  isRequired: boolean;
  status: "granted" | "withdrawn" | "not_set";
  grantedAt?: string;
  withdrawnAt?: string;
}

interface PrivacySettingsClientProps {
  initialConsents: ConsentStatus[];
  userEmail: string;
}

// ============================================================================
// Component
// ============================================================================

export function PrivacySettingsClient({
  initialConsents,
  userEmail: _userEmail,
}: PrivacySettingsClientProps) {
  const [consents, setConsents] = useState(initialConsents);
  const [isPending, startTransition] = useTransition();
  const [togglingType, setTogglingType] = useState<ConsentType | null>(null);

  // Data export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<{
    success: boolean;
    data?: unknown;
    error?: string;
  } | null>(null);

  // Account deletion state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePhrase, setDeletePhrase] = useState("");
  const [requiredPhrase, setRequiredPhrase] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteResult, setDeleteResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  // ========== Consent Toggle ==========

  const handleConsentToggle = async (type: ConsentType, newStatus: boolean) => {
    setTogglingType(type);

    startTransition(async () => {
      const result = await toggleConsentAction(type, newStatus);

      if (result.success) {
        setConsents((prev) =>
          prev.map((consent) =>
            consent.type === type
              ? {
                  ...consent,
                  status: newStatus ? "granted" : "withdrawn",
                  grantedAt: newStatus ? new Date().toISOString() : consent.grantedAt,
                  withdrawnAt: newStatus ? undefined : new Date().toISOString(),
                }
              : consent
          )
        );
      } else {
        alert(result.error || "Eroare la actualizarea consimțământului");
      }

      setTogglingType(null);
    });
  };

  // ========== Data Export ==========

  const handleDataExport = async () => {
    setIsExporting(true);
    setExportResult(null);

    try {
      const result = await requestDataExportAction("json");

      if (result.success && result.data) {
        // Create downloadable JSON file
        const blob = new Blob([JSON.stringify(result.data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `yuvoo-data-export-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setExportResult({ success: true, data: result.data });
      } else {
        setExportResult({ success: false, error: result.error });
      }
    } catch (_error) {
      setExportResult({
        success: false,
        error: "Eroare la exportul datelor. Te rugăm să încerci din nou.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // ========== Account Deletion ==========

  const openDeleteModal = async () => {
    const phraseResult = await getErasureConfirmationPhraseAction();
    if (phraseResult.success && phraseResult.data) {
      setRequiredPhrase(phraseResult.data);
    }
    setShowDeleteModal(true);
    setDeletePhrase("");
    setDeleteResult(null);
  };

  const handleAccountDelete = async () => {
    if (deletePhrase !== requiredPhrase) {
      setDeleteResult({
        success: false,
        error: `Te rugăm să introduci exact '${requiredPhrase}'`,
      });
      return;
    }

    setIsDeleting(true);

    try {
      const result = await requestDataErasureAction(deletePhrase);

      if (result.success && result.data) {
        setDeleteResult({
          success: true,
          message: result.data.message,
        });
        // Redirect to logout after a delay
        setTimeout(() => {
          window.location.href = "/auth/logout";
        }, 3000);
      } else {
        setDeleteResult({ success: false, error: result.error });
      }
    } catch (_error) {
      setDeleteResult({
        success: false,
        error: "Eroare la ștergerea contului. Te rugăm să contactezi suportul.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // ========== Render ==========

  return (
    <div className="bd-privacy-settings">
      {/* Consent Management Section */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-check2-circle me-2" />
            Gestionare consimțământ
          </h5>
        </div>
        <div className="card-body">
          <p className="text-muted mb-4">
            Poți retrage oricând consimțământul pentru prelucrarea datelor tale. Retragerea nu
            afectează legalitatea prelucrării efectuate înainte de retragere.
          </p>

          {/* Required Consents */}
          <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
            Consimțământuri obligatorii
            <span className="badge bg-danger">Obligatoriu pentru serviciu</span>
          </h6>

          {consents
            .filter((c) => c.isRequired)
            .map((consent) => (
              <ConsentToggle
                key={consent.type}
                consent={consent}
                isToggling={togglingType === consent.type}
                isPending={isPending}
                onToggle={handleConsentToggle}
              />
            ))}

          {/* Optional Consents */}
          <h6 className="fw-semibold mb-3 mt-4 d-flex align-items-center gap-2">
            Consimțământuri opționale
            <span className="badge bg-secondary">Opțional</span>
          </h6>

          {consents
            .filter((c) => !c.isRequired)
            .map((consent) => (
              <ConsentToggle
                key={consent.type}
                consent={consent}
                isToggling={togglingType === consent.type}
                isPending={isPending}
                onToggle={handleConsentToggle}
              />
            ))}
        </div>
      </div>

      {/* Data Export Section */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-download me-2" />
            Exportă datele tale
          </h5>
        </div>
        <div className="card-body">
          <p className="text-muted mb-3">
            Conform GDPR Art. 15 și 20, ai dreptul să primești o copie a datelor tale într-un format
            structurat și portabil (JSON).
          </p>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleDataExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Se generează exportul...
              </>
            ) : (
              <>
                <i className="bi bi-download me-2" />
                Descarcă datele mele
              </>
            )}
          </button>

          {exportResult && (
            <div
              className={`alert ${
                exportResult.success ? "alert-success" : "alert-danger"
              } mt-3 mb-0`}
            >
              {exportResult.success
                ? "Datele tale au fost descărcate cu succes."
                : exportResult.error}
            </div>
          )}
        </div>
      </div>

      {/* Account Deletion Section */}
      <div className="card border-danger">
        <div className="card-header bg-danger text-white">
          <h5 className="mb-0">
            <i className="bi bi-trash me-2" />
            Ștergere cont
          </h5>
        </div>
        <div className="card-body">
          <p className="text-muted mb-3">
            Conform GDPR Art. 17, ai dreptul să soliciți ștergerea datelor tale. Această acțiune
            este <strong>permanentă</strong> și nu poate fi anulată.
          </p>

          <div className="alert alert-warning mb-3">
            <strong>Atenție:</strong> Ștergerea contului va elimina definitiv:
            <ul className="mb-0 mt-2">
              <li>Profilul tău și al copiilor</li>
              <li>Toate rezultatele quiz-urilor</li>
              <li>Favoritele și rezervările</li>
              <li>Istoricul consimțămintelor</li>
            </ul>
          </div>

          <button type="button" className="btn btn-outline-danger" onClick={openDeleteModal}>
            <i className="bi bi-trash me-2" />
            Șterge contul meu
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDeleting) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle me-2" />
                  Confirmare ștergere cont
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                />
              </div>
              <div className="modal-body">
                {deleteResult?.success ? (
                  <div className="alert alert-success">
                    <i className="bi bi-check-circle me-2" />
                    {deleteResult.message}
                    <p className="mb-0 mt-2 small">Vei fi redirecționat în câteva secunde...</p>
                  </div>
                ) : (
                  <>
                    <p className="mb-3">
                      Această acțiune este permanentă și nu poate fi anulată. Pentru a confirma
                      ștergerea, te rugăm să introduci:
                    </p>
                    <p className="text-center mb-3">
                      <code className="fs-5">{requiredPhrase}</code>
                    </p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Introdu textul de confirmare"
                      value={deletePhrase}
                      onChange={(e) => setDeletePhrase(e.target.value)}
                      disabled={isDeleting}
                    />
                    {deleteResult?.error && (
                      <div className="alert alert-danger mt-3 mb-0">{deleteResult.error}</div>
                    )}
                  </>
                )}
              </div>
              {!deleteResult?.success && (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={isDeleting}
                  >
                    Anulează
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleAccountDelete}
                    disabled={isDeleting || deletePhrase !== requiredPhrase}
                  >
                    {isDeleting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        />
                        Se șterge...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-trash me-2" />
                        Șterge contul definitiv
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

interface ConsentToggleProps {
  consent: ConsentStatus;
  isToggling: boolean;
  isPending: boolean;
  onToggle: (type: ConsentType, newStatus: boolean) => void;
}

function ConsentToggle({ consent, isToggling, isPending, onToggle }: ConsentToggleProps) {
  const isGranted = consent.status === "granted";

  return (
    <div className="consent-toggle-item border rounded p-3 mb-3">
      <div className="d-flex align-items-start justify-content-between gap-3">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2 mb-1">
            <strong>{consent.label}</strong>
            {consent.isRequired && (
              <span className="badge bg-danger-subtle text-danger">Obligatoriu</span>
            )}
          </div>
          <p className="text-muted small mb-2">{consent.description}</p>
          <p className="text-muted small mb-0">
            <em>Baza legală: {consent.legalBasis}</em>
          </p>
          {consent.grantedAt && (
            <p className="text-muted small mb-0 mt-1">
              {isGranted ? (
                <>
                  <i className="bi bi-check-circle text-success me-1" />
                  Acordat la: {new Date(consent.grantedAt).toLocaleDateString("ro-RO")}
                </>
              ) : (
                <>
                  <i className="bi bi-x-circle text-danger me-1" />
                  Retras la:{" "}
                  {consent.withdrawnAt
                    ? new Date(consent.withdrawnAt).toLocaleDateString("ro-RO")
                    : "-"}
                </>
              )}
            </p>
          )}
        </div>
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            role="switch"
            id={`consent-${consent.type}`}
            checked={isGranted}
            onChange={(e) => onToggle(consent.type, e.target.checked)}
            disabled={isToggling || isPending}
          />
          <label className="form-check-label visually-hidden" htmlFor={`consent-${consent.type}`}>
            {consent.label}
          </label>
        </div>
      </div>
    </div>
  );
}

export default PrivacySettingsClient;
