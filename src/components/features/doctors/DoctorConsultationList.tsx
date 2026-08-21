/**
 * Doctor Consultation List Component
 *
 * Displays a list of consultations for a doctor with filtering by status and date.
 * Handles consultation confirmation, cancellation, and completion by doctor.
 */

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import BookingCard from "@/components/shared/BookingCard";
import BookingDetailModal from "@/components/shared/BookingDetailModal";
import ConfirmActionModal from "@/components/shared/ConfirmActionModal";
import { useEntityFilters, type StatusFilter, type DateFilter } from "@/hooks/useEntityFilters";
import {
  getDoctorConsultationsAction,
  confirmConsultationAction,
  cancelConsultationAction,
  completeConsultationAction,
  getParentUserForConsultationAction,
} from "@/app/actions/consultations";
import { getChildAction } from "@/app/actions/children";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";

interface ConsultationWithDetails extends Booking {
  child?: Child;
}

type ConsultationActionType = "confirm" | "cancel" | "complete";

interface PendingConsultationAction {
  consultationId: string;
  type: ConsultationActionType;
}

const CONSULTATION_ACTION_CONFIG: Record<
  ConsultationActionType,
  {
    title: string;
    message: string;
    confirmLabel: string;
    confirmVariant: "primary" | "danger" | "success";
  }
> = {
  confirm: {
    title: "Confirmă consultația",
    message: "Ești sigur că vrei să confirmi această consultație?",
    confirmLabel: "Confirmă",
    confirmVariant: "primary",
  },
  cancel: {
    title: "Anulează consultația",
    message: "Ești sigur că vrei să anulezi această consultație?",
    confirmLabel: "Anulează consultația",
    confirmVariant: "danger",
  },
  complete: {
    title: "Finalizează consultația",
    message: "Ești sigur că vrei să marchezi această consultație ca finalizată?",
    confirmLabel: "Marchează finalizată",
    confirmVariant: "success",
  },
};

const DoctorConsultationList: React.FC = () => {
  const [consultations, setConsultations] = useState<ConsultationWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<Booking | null>(null);
  const [selectedParent, setSelectedParent] = useState<AuthUser | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingConsultationAction | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();

  // Use entity filters hook
  const {
    statusFilter,
    dateFilter,
    filteredItems: filteredConsultations,
    setStatusFilter,
    setDateFilter,
    statusCounts,
  } = useEntityFilters({
    items: consultations,
    getStatus: (consultation) => consultation.status,
    getDate: (consultation) => consultation.scheduledAt,
  });

  // Fetch consultations and related data
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const consultationsData = await getDoctorConsultationsAction();

        // Fetch child details for each consultation
        const consultationsWithDetails = await Promise.all(
          consultationsData.map(async (consultation) => {
            const child = consultation.childId
              ? await getChildAction(consultation.childId).catch(() => null)
              : null;

            return {
              ...consultation,
              child: child || undefined,
            };
          })
        );

        // Sort consultations by scheduled date (upcoming first)
        consultationsWithDetails.sort((a, b) => {
          const dateA = new Date(a.scheduledAt).getTime();
          const dateB = new Date(b.scheduledAt).getTime();
          return dateA - dateB;
        });

        setConsultations(consultationsWithDetails);
      } catch (err) {
        console.error("Error fetching consultations:", err);
        setError("Eroare la încărcarea consultațiilor. Te rugăm să reîncerci.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const handleConfirm = (consultationId: string) => {
    setActionError(null);
    setPendingAction({ consultationId, type: "confirm" });
  };

  const handleCancel = (consultationId: string) => {
    setActionError(null);
    setPendingAction({ consultationId, type: "cancel" });
  };

  const handleViewDetails = async (consultation: Booking) => {
    setSelectedConsultation(consultation);

    // Fetch parent information
    try {
      const parent = await getParentUserForConsultationAction(consultation.userId);
      setSelectedParent(parent);
    } catch (err) {
      console.error("Error fetching parent info:", err);
      setSelectedParent(null);
    }
  };

  const handleComplete = (consultationId: string) => {
    setActionError(null);
    setPendingAction({ consultationId, type: "complete" });
  };

  const executePendingAction = () => {
    if (!pendingAction) {
      return;
    }

    const { consultationId, type } = pendingAction;

    startTransition(async () => {
      try {
        setProcessingId(consultationId);
        setActionError(null);

        let result: { success: boolean; error?: string };
        let nextStatus: Booking["status"];

        if (type === "confirm") {
          result = await confirmConsultationAction(consultationId);
          nextStatus = "confirmed";
        } else if (type === "cancel") {
          result = await cancelConsultationAction(consultationId);
          nextStatus = "cancelled";
        } else {
          result = await completeConsultationAction(consultationId);
          nextStatus = "completed";
        }

        if (result.success) {
          setConsultations((prev) =>
            prev.map((c) => (c.id === consultationId ? { ...c, status: nextStatus } : c))
          );
          setPendingAction(null);
          router.refresh();
        } else {
          setActionError(
            result.error ||
              (type === "confirm"
                ? "Eroare la confirmarea consultației"
                : type === "cancel"
                  ? "Eroare la anularea consultației"
                  : "Eroare la finalizarea consultației")
          );
        }
      } catch (err) {
        console.error("Error processing consultation action:", err);
        setActionError("Eroare la procesarea consultației. Te rugăm să reîncerci.");
      } finally {
        setProcessingId(null);
      }
    });
  };

  const pendingActionConfig = pendingAction ? CONSULTATION_ACTION_CONFIG[pendingAction.type] : null;

  if (isLoading) {
    return (
      <div className="bd-doctor-consultation-list-loading text-center py-5">
        <div className="spinner-border text-yuvoo-primary" role="status">
          <span className="visually-hidden">Se încarcă...</span>
        </div>
        <p className="mt-3 text-muted">Se încarcă consultațiile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bd-doctor-consultation-list-error alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle me-2"></i>
        <strong>Eroare:</strong> {error}
      </div>
    );
  }

  return (
    <div className="bd-doctor-consultation-list">
      {actionError && (
        <div className="alert alert-danger mb-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {actionError}
        </div>
      )}
      {/* Filters */}
      <div className="bd-doctor-consultation-filters card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h6 className="bd-doctor-consultation-filters-title mb-3">
            <i className="bi bi-funnel me-2 text-yuvoo-primary"></i>
            Filtrează consultațiile
          </h6>
          <div className="row g-3">
            <div className="col-md-6">
              <label
                htmlFor="statusFilter"
                className="bd-doctor-consultation-filter-label form-label"
              >
                <i className="bi bi-tag me-2"></i>
                Status
              </label>
              <select
                id="statusFilter"
                className="bd-doctor-consultation-filter-select form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              >
                <option value="all">Toate ({statusCounts.all})</option>
                <option value="pending">În așteptare ({statusCounts.pending})</option>
                <option value="confirmed">Confirmate ({statusCounts.confirmed})</option>
                <option value="completed">Finalizate ({statusCounts.completed})</option>
                <option value="cancelled">Anulate ({statusCounts.cancelled})</option>
              </select>
            </div>
            <div className="col-md-6">
              <label
                htmlFor="dateFilter"
                className="bd-doctor-consultation-filter-label form-label"
              >
                <i className="bi bi-calendar me-2"></i>
                Perioadă
              </label>
              <select
                id="dateFilter"
                className="bd-doctor-consultation-filter-select form-select"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              >
                <option value="all">Toate</option>
                <option value="upcoming">Viitoare</option>
                <option value="past">Trecute</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="bd-doctor-consultation-results-count mb-4">
        <p className="bd-doctor-consultation-results-text mb-0">
          <i className="bi bi-list-check me-2 text-yuvoo-primary"></i>
          Afișare <strong>{filteredConsultations.length}</strong> din{" "}
          <strong>{consultations.length}</strong> consultații
        </p>
      </div>

      {/* Consultations list */}
      {filteredConsultations.length === 0 ? (
        <div className="bd-doctor-consultation-empty text-center py-5">
          <div className="bd-doctor-consultation-empty-icon mb-4">
            <i className="bi bi-calendar-x"></i>
          </div>
          <h4 className="bd-doctor-consultation-empty-title mb-3">Nu există consultații</h4>
          <p className="bd-doctor-consultation-empty-text text-muted">
            {statusFilter !== "all" || dateFilter !== "all"
              ? "Nu există consultații care să corespundă filtrelor selectate."
              : "Nu există consultații pentru acest doctor."}
          </p>
        </div>
      ) : (
        <div className="bd-doctor-consultation-cards">
          {filteredConsultations.map((consultation) => (
            <BookingCard
              key={consultation.id}
              id={consultation.id}
              scheduledAt={consultation.scheduledAt}
              status={consultation.status}
              type="doctor_consultation"
              notes={consultation.notes}
              child={
                consultation.child
                  ? {
                      firstName: consultation.child.firstName,
                      lastName: consultation.child.lastName,
                      age: consultation.child.age,
                    }
                  : undefined
              }
              createdAt={consultation.createdAt}
              updatedAt={consultation.updatedAt}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              onComplete={handleComplete}
              onViewDetails={() => handleViewDetails(consultation)}
              isProcessing={processingId === consultation.id}
            />
          ))}
        </div>
      )}

      {/* Consultation Detail Modal */}
      <BookingDetailModal
        booking={
          selectedConsultation
            ? {
                id: selectedConsultation.id,
                scheduledAt: selectedConsultation.scheduledAt,
                status: selectedConsultation.status,
                type: "doctor_consultation",
                notes: selectedConsultation.notes,
                createdAt: selectedConsultation.createdAt,
                updatedAt: selectedConsultation.updatedAt,
              }
            : null
        }
        child={
          selectedConsultation
            ? consultations.find((c) => c.id === selectedConsultation.id)?.child
              ? {
                  firstName: consultations.find((c) => c.id === selectedConsultation.id)!.child!
                    .firstName,
                  lastName: consultations.find((c) => c.id === selectedConsultation.id)!.child!
                    .lastName,
                  age: consultations.find((c) => c.id === selectedConsultation.id)!.child!.age,
                  gender: consultations.find((c) => c.id === selectedConsultation.id)!.child!
                    .gender,
                  dateOfBirth: consultations.find((c) => c.id === selectedConsultation.id)!.child!
                    .dateOfBirth,
                }
              : undefined
            : undefined
        }
        parent={
          selectedParent
            ? {
                email: selectedParent.email,
                name: selectedParent.name,
                firstName: selectedParent.firstName,
                lastName: selectedParent.lastName,
                phone: selectedParent.phone,
              }
            : null
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onComplete={handleComplete}
        isProcessing={processingId === selectedConsultation?.id}
      />

      {pendingAction && pendingActionConfig && (
        <ConfirmActionModal
          show
          title={pendingActionConfig.title}
          message={pendingActionConfig.message}
          confirmLabel={pendingActionConfig.confirmLabel}
          confirmVariant={pendingActionConfig.confirmVariant}
          isLoading={processingId === pendingAction.consultationId}
          onConfirm={executePendingAction}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  );
};

export default DoctorConsultationList;
