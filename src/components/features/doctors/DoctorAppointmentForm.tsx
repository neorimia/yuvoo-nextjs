/**
 * Doctor Appointment Form Component
 *
 * Form for booking a doctor consultation appointment.
 * Client component that handles user input and submission.
 * Adapted from Club BookingForm.tsx
 */

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ErrorMsg from "@/components/Form/ErrorMassage";
import { createBookingAction } from "@/app/actions/bookings";
import { getChildrenAction } from "@/app/actions/children";
import type { Child } from "@/modules/children/children.types";
import type { CreateBookingInput } from "@/modules/bookings/bookings.types";
import { routes } from "@/lib/routes";

interface AppointmentFormData {
  childId?: string;
  scheduledDate: string;
  scheduledTime: string;
  consultationType: "in_person" | "online";
  notes?: string;
}

interface DoctorAppointmentFormProps {
  doctorId: string;
  doctorName: string;
  onlineConsultations?: boolean;
  onSuccess?: () => void;
}

const DoctorAppointmentForm: React.FC<DoctorAppointmentFormProps> = ({
  doctorId,
  doctorName,
  onlineConsultations = false,
  onSuccess,
}) => {
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoadingChildren, setIsLoadingChildren] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AppointmentFormData>({
    defaultValues: {
      consultationType: "in_person",
    },
  });

  const selectedDate = watch("scheduledDate");

  // Fetch children on mount
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const childrenData = await getChildrenAction();
        setChildren(childrenData);
      } catch (error) {
        console.error("Error fetching children:", error);
      } finally {
        setIsLoadingChildren(false);
      }
    };

    fetchChildren();
  }, []);

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split("T")[0];
  };

  // Get minimum time (current time if today, or 00:00 if future date)
  const getMinTime = () => {
    if (!selectedDate) return "00:00";
    const today = new Date();
    const selected = new Date(selectedDate);
    const isToday = selected.toDateString() === today.toDateString();

    if (isToday) {
      const hours = today.getHours().toString().padStart(2, "0");
      const minutes = (today.getMinutes() + 1).toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return "00:00";
  };

  const onSubmit = async (data: AppointmentFormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    // Combine date and time into scheduledAt
    const scheduledDateTime = new Date(`${data.scheduledDate}T${data.scheduledTime}`);

    // Validate that the date/time is in the future
    if (scheduledDateTime <= new Date()) {
      setSubmitError("Data și ora trebuie să fie în viitor");
      return;
    }

    startTransition(async () => {
      try {
        // userId will be added by createBookingAction (it overrides the value)
        const result = await createBookingAction({
          userId: "", // Placeholder - will be overridden by action
          childId: data.childId || undefined, // Optional for doctor consultations
          type: "doctor_consultation",
          entityId: doctorId,
          entityType: "doctor",
          scheduledAt: scheduledDateTime,
          notes: data.notes || undefined,
        } as CreateBookingInput);

        if (result.success && result.booking) {
          setSubmitSuccess(true);

          // Call success callback if provided
          if (onSuccess) {
            onSuccess();
          }

          // Redirect to bookings page after a short delay
          setTimeout(() => {
            router.push(routes.parent.bookings);
            router.refresh();
          }, 2000);
        } else {
          setSubmitError(result.error || "Eroare la crearea programării");
        }
      } catch (error) {
        console.error("Error submitting appointment:", error);
        setSubmitError(error instanceof Error ? error.message : "Eroare la crearea programării");
      }
    });
  };

  // Show loading state while fetching children
  if (isLoadingChildren) {
    return (
      <div className="bd-booking-form">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Se încarcă...</span>
          </div>
          <p className="mt-3 text-muted">Se încarcă datele...</p>
        </div>
      </div>
    );
  }

  // Show helpful message if no children but allow booking anyway (child is optional for doctor consultations)
  const showNoChildrenInfo = children.length === 0;

  return (
    <div className="bd-booking-form">
      <div className="bd-booking-form-header mb-4">
        <h4 className="mb-2">
          <i className="flaticon-calendar me-2"></i>
          Programează o consultație
        </h4>
        <p className="text-muted mb-0">
          Completează formularul de mai jos pentru a programa o consultație cu{" "}
          <strong>{doctorName}</strong>.
        </p>
      </div>

      {submitSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="flaticon-check me-2"></i>
          <strong>Programare creată cu succes!</strong> Vei fi redirecționat către pagina de
          programări.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {submitError && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="flaticon-warning me-2"></i>
          <strong>Eroare:</strong> {submitError}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setSubmitError(null)}
          ></button>
        </div>
      )}

      {showNoChildrenInfo && (
        <div className="alert alert-info mb-4">
          <h6 className="alert-heading">
            <i className="bi bi-info-circle me-2"></i>
            Informație
          </h6>
          <p className="mb-2">
            Nu ai adăugat încă copii în profilul tău. Poți programa consultația fără să selectezi un
            copil, sau poți adăuga un copil pentru a asocia consultația cu profilul lui.
          </p>
          <a href={routes.parent.children.add} className="btn btn-sm btn-outline-primary">
            <i className="bi bi-plus-circle me-1"></i>
            Adaugă copil
          </a>
        </div>
      )}

      <form id="appointment-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {/* Child Selection (Optional) */}
          <div className="col-lg-12">
            <div className="bd-booking-input mb-30">
              <label htmlFor="childId" className="form-label">
                Copil (opțional)
              </label>
              <select
                {...register("childId")}
                id="childId"
                className="form-select"
                disabled={isPending}
              >
                <option value="">Fără copil specificat</option>
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.firstName} {child.lastName} ({child.age} ani)
                  </option>
                ))}
              </select>
              <small className="form-text text-muted">
                Selectează un copil dacă consultația este pentru un copil specific
              </small>
              <ErrorMsg error={errors?.childId?.message} />
            </div>
          </div>

          {/* Consultation Type */}
          {onlineConsultations && (
            <div className="col-lg-12">
              <div className="bd-booking-input mb-30">
                <label className="form-label">
                  Tip consultație <span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      {...register("consultationType", {
                        required: "Selectează tipul de consultație",
                      })}
                      className="form-check-input"
                      type="radio"
                      id="consultation-in-person"
                      value="in_person"
                      disabled={isPending}
                    />
                    <label className="form-check-label" htmlFor="consultation-in-person">
                      <i className="flaticon-location me-2"></i>
                      La cabinet
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      {...register("consultationType")}
                      className="form-check-input"
                      type="radio"
                      id="consultation-online"
                      value="online"
                      disabled={isPending}
                    />
                    <label className="form-check-label" htmlFor="consultation-online">
                      <i className="flaticon-video me-2"></i>
                      Online
                    </label>
                  </div>
                </div>
                <ErrorMsg error={errors?.consultationType?.message} />
              </div>
            </div>
          )}

          {/* Date Selection */}
          <div className="col-lg-6">
            <div className="bd-booking-input mb-30">
              <label htmlFor="scheduledDate" className="form-label">
                Data <span className="text-danger">*</span>
              </label>
              <input
                {...register("scheduledDate", {
                  required: "Selectează o dată",
                  validate: (value) => {
                    const selected = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (selected < today) {
                      return "Data trebuie să fie în viitor";
                    }
                    return true;
                  },
                })}
                id="scheduledDate"
                type="date"
                className="form-control"
                min={getMinDate()}
                disabled={isPending}
              />
              <ErrorMsg error={errors?.scheduledDate?.message} />
            </div>
          </div>

          {/* Time Selection */}
          <div className="col-lg-6">
            <div className="bd-booking-input mb-30">
              <label htmlFor="scheduledTime" className="form-label">
                Ora <span className="text-danger">*</span>
              </label>
              <input
                {...register("scheduledTime", {
                  required: "Selectează o oră",
                })}
                id="scheduledTime"
                type="time"
                className="form-control"
                min={getMinTime()}
                disabled={isPending || !selectedDate}
              />
              <ErrorMsg error={errors?.scheduledTime?.message} />
              {!selectedDate && (
                <small className="form-text text-muted">Selectează mai întâi o dată</small>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="col-lg-12">
            <div className="bd-booking-input mb-30">
              <label htmlFor="notes" className="form-label">
                Observații (opțional)
              </label>
              <textarea
                {...register("notes")}
                id="notes"
                className="form-control"
                rows={4}
                placeholder="Adaugă orice informații suplimentare despre consultație (simptome, întrebări, etc.)..."
                disabled={isPending}
              ></textarea>
              <ErrorMsg error={errors?.notes?.message} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-lg-12">
            <div className="bd-booking-submit">
              <button type="submit" className="bd-btn w-100" disabled={isPending}>
                <span className="bd-btn-inner">
                  <span className="bd-btn-normal">
                    {isPending ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Se procesează...
                      </>
                    ) : (
                      <>
                        <i className="flaticon-check me-2"></i>
                        Confirmă programarea
                      </>
                    )}
                  </span>
                  <span className="bd-btn-hover">
                    {isPending ? "Se procesează..." : "Confirmă programarea"}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorAppointmentForm;
