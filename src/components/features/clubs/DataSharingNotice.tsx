"use client";

import React, { useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

/**
 * Data categories that can be shared with clubs
 */
export interface DataCategory {
  key: string;
  label: string;
  description?: string;
}

/**
 * Default data categories shared when contacting a club
 */
export const DEFAULT_SHARED_DATA: DataCategory[] = [
  {
    key: "childAge",
    label: "Vârsta copilului",
    description: "Pentru a determina grupele potrivite",
  },
  {
    key: "childGender",
    label: "Genul copilului",
    description: "Pentru organizarea antrenamentelor",
  },
  {
    key: "preferredSport",
    label: "Sportul preferat",
    description: "Pe baza recomandărilor quiz-ului",
  },
  {
    key: "parentContact",
    label: "Datele tale de contact",
    description: "Pentru a te contacta înapoi",
  },
];

interface DataSharingNoticeProps {
  /** Name of the club receiving the data */
  clubName: string;
  /** Name of the child whose data is being shared */
  childName: string;
  /** List of data categories to be shared */
  dataShared?: DataCategory[];
  /** Callback when user confirms sharing */
  onConfirm: () => void;
  /** Callback when user cancels */
  onCancel: () => void;
  /** Whether the confirmation is in progress */
  isLoading?: boolean;
}

/**
 * DataSharingNotice - GDPR-compliant notice shown before sharing child data with clubs
 *
 * This component implements GDPR transparency requirements by:
 * - Clearly showing what data will be shared
 * - Explaining who will receive the data
 * - Informing that the club becomes an independent data controller
 * - Requiring explicit confirmation
 *
 * GDPR Requirements:
 * - Art. 13: Information to be provided when data is collected
 * - Art. 6(1)(a): Consent as legal basis for data transfer
 */
export function DataSharingNotice({
  clubName,
  childName,
  dataShared = DEFAULT_SHARED_DATA,
  onConfirm,
  onCancel,
  isLoading = false,
}: DataSharingNoticeProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="data-sharing-notice p-4 border rounded bg-white shadow-sm">
      {/* Header */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <i className="bi bi-shield-lock text-primary fs-4" />
        <h5 className="mb-0">Partajare date cu {clubName}</h5>
      </div>

      {/* Explanation */}
      <p className="text-muted mb-3">
        Pentru a facilita contactul cu clubul, următoarele date ale lui <strong>{childName}</strong>{" "}
        vor fi trimise către <strong>{clubName}</strong>:
      </p>

      {/* Data list */}
      <div className="bg-light rounded p-3 mb-3">
        <ul className="mb-0 list-unstyled">
          {dataShared.map((item, index) => (
            <li key={item.key} className={index > 0 ? "mt-2" : ""}>
              <div className="d-flex align-items-start gap-2">
                <i className="bi bi-check-circle text-success mt-1" />
                <div>
                  <strong>{item.label}</strong>
                  {item.description && (
                    <small className="d-block text-muted">{item.description}</small>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Important notice about independent controller */}
      <div className="alert alert-warning mb-3 py-2 px-3" role="alert">
        <div className="d-flex align-items-start gap-2">
          <i className="bi bi-info-circle mt-1" />
          <div>
            <strong className="d-block mb-1">Important</strong>
            <small>
              După partajare, <strong>{clubName}</strong> devine operator independent pentru aceste
              date conform GDPR. Clubul are propria politică de confidențialitate și trebuie să îți
              ofere informații despre cum procesează datele tale. Yuvoo nu este responsabil pentru
              prelucrarea datelor de către club după transfer.
            </small>
          </div>
        </div>
      </div>

      {/* Acknowledgment checkbox */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="acknowledge-sharing"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
          disabled={isLoading}
        />
        <label className="form-check-label" htmlFor="acknowledge-sharing">
          <small>
            Înțeleg că datele vor fi partajate cu {clubName} și că acest club va deveni operator
            independent pentru datele primite.
          </small>
        </label>
      </div>

      {/* Privacy links */}
      <div className="text-muted small mb-3">
        <i className="bi bi-question-circle me-1" />
        Citește mai multe în{" "}
        <Link
          href={routes.privacy}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          Politica de confidențialitate
        </Link>{" "}
        și{" "}
        <Link
          href={routes.gdpr}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          GDPR pentru părinți
        </Link>
        .
      </div>

      {/* Action buttons */}
      <div className="d-flex gap-2 justify-content-end">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Anulează
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onConfirm}
          disabled={!acknowledged || isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              />
              Se trimite...
            </>
          ) : (
            <>
              <i className="bi bi-send me-2" />
              Confirmă partajarea
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/**
 * Modal wrapper for DataSharingNotice
 * Can be used with Bootstrap modal or custom modal implementation
 */
interface DataSharingModalProps extends DataSharingNoticeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataSharingModal({ isOpen, onClose, ...noticeProps }: DataSharingModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content border-0">
          <DataSharingNotice {...noticeProps} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
}

export default DataSharingNotice;
