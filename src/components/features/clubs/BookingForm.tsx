/**
 * Booking Form Component
 *
 * Form for booking a club trial session.
 * Client component that handles user input and submission.
 */

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ErrorMsg from "@/components/Form/ErrorMassage";
import { createBookingAction } from "@/app/actions/bookings";
import { getChildrenAction } from "@/app/actions/children";
import type { Child } from "@/modules/children/children.types";
import type { BookingType, CreateBookingInput } from "@/modules/bookings/bookings.types";
import { routes } from "@/lib/routes";

interface BookingFormData {
  childId: string;
  scheduledDate: string;
  scheduledTime: string;
  notes?: string;
}

interface BookingFormProps {
  clubId: string;
  clubName: string;
  bookingType?: BookingType;
  onSuccess?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  clubId,
  clubName,
  bookingType = "club_trial",
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
  } = useForm<BookingFormData>();

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

  const onSubmit = async (data: BookingFormData) => {
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
          childId: data.childId || undefined,
          type: bookingType,
          entityId: clubId,
          entityType: "club",
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
          setSubmitError(result.error || "Eroare la crearea rezervării");
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
        setSubmitError(error instanceof Error ? error.message : "Eroare la crearea rezervării");
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

  // Show message if no children found
  if (children.length === 0) {
    return (
      <div className="bd-booking-form">
        <div className="alert alert-info">
          <h5 className="alert-heading">
            <i className="flaticon-info me-2"></i>
            Adaugă un copil
          </h5>
          <p className="mb-3">
            Pentru a face o rezervare, trebuie să adaugi cel puțin un copil în profilul tău.
          </p>
          <a href={routes.parent.children.add} className="btn btn-primary">
            <i className="flaticon-plus me-2"></i>
            Adaugă copil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bd-booking-form">
      <div className="bd-booking-form-header mb-4">
        <h4 className="mb-2">
          <i className="flaticon-calendar me-2"></i>
          Rezervă o ședință de probă
        </h4>
        <p className="text-muted mb-0">
          Completează formularul de mai jos pentru a rezerva o ședință de probă la{" "}
          <strong>{clubName}</strong>.
        </p>
      </div>

      {submitSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="flaticon-check me-2"></i>
          <strong>Rezervare creată cu succes!</strong> Vei fi redirecționat către pagina de
          rezervări.
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

      <form id="booking-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {/* Child Selection */}
          <div className="col-lg-12">
            <div className="bd-booking-input mb-30">
              <label htmlFor="childId" className="form-label">
                Copil <span className="text-danger">*</span>
              </label>
              <select
                {...register("childId", {
                  required: "Selectează un copil",
                })}
                id="childId"
                className="form-select"
                disabled={isPending}
              >
                <option value="">Selectează un copil</option>
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.firstName} {child.lastName} ({child.age} ani)
                  </option>
                ))}
              </select>
              <ErrorMsg error={errors?.childId?.message} />
            </div>
          </div>

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
                placeholder="Adaugă orice informații suplimentare despre rezervare..."
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
                        Confirmă rezervarea
                      </>
                    )}
                  </span>
                  <span className="bd-btn-hover">
                    {isPending ? "Se procesează..." : "Confirmă rezervarea"}
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

export default BookingForm;
