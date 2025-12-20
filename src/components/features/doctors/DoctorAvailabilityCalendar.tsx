/**
 * Doctor Availability Calendar Component
 *
 * Displays a weekly schedule editor for doctors to manage their availability.
 * Supports weekly schedule and recurring patterns.
 */

"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAvailabilityAction } from "@/app/actions/doctor-availability";
import { doctorAvailabilitySchema, type DoctorAvailabilityInput } from "@/lib/validations/doctor";
import {
  BootstrapInput,
  BootstrapSelect,
  BootstrapButton,
  BootstrapAlert,
} from "@/components/UI/bootstrap-index";
import { Plus, X, AlertCircle } from "lucide-react";

// Days of the week in Romanian
const DAYS_OF_WEEK = [
  { value: "luni", label: "Luni" },
  { value: "marti", label: "Marți" },
  { value: "miercuri", label: "Miercuri" },
  { value: "joi", label: "Joi" },
  { value: "vineri", label: "Vineri" },
  { value: "sambata", label: "Sâmbătă" },
  { value: "duminica", label: "Duminică" },
] as const;

interface DoctorAvailabilityCalendarProps {
  doctorId: string;
  currentAvailability: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
}

const DoctorAvailabilityCalendar: React.FC<DoctorAvailabilityCalendarProps> = ({
  currentAvailability,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DoctorAvailabilityInput>({
    resolver: zodResolver(doctorAvailabilitySchema),
    defaultValues: {
      schedule: currentAvailability.length > 0 ? currentAvailability : [],
      acceptingNewPatients: true,
      onlineConsultations: false,
    },
    mode: "onBlur",
  });

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control,
    name: "schedule",
  });

  const onSubmit = async (data: DoctorAvailabilityInput) => {
    startTransition(async () => {
      try {
        setServerError(null);
        setSuccessMessage(null);

        // Filter schedule to only include complete entries
        const validSchedule =
          data.schedule
            ?.filter((entry) => entry && entry.day && entry.startTime && entry.endTime)
            .map((entry) => ({
              day: entry.day?.trim() || "",
              startTime: entry.startTime?.trim() || "",
              endTime: entry.endTime?.trim() || "",
            }))
            .filter((entry) => entry.day && entry.startTime && entry.endTime) || [];

        const result = await updateAvailabilityAction({
          schedule: validSchedule,
          acceptingNewPatients: data.acceptingNewPatients ?? true,
          onlineConsultations: data.onlineConsultations || false,
        });

        if (result.success) {
          setSuccessMessage("Disponibilitatea a fost actualizată cu succes!");
          setServerError(null);
          router.refresh();
        } else {
          setServerError(result.error || "Eroare la actualizarea disponibilității");
          setSuccessMessage(null);
        }
      } catch (error) {
        console.error("Error updating availability:", error);
        setServerError("Eroare la actualizarea disponibilității. Te rugăm să reîncerci.");
      }
    });
  };

  const addScheduleEntry = () => {
    appendSchedule({ day: "", startTime: "", endTime: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bd-doctor-availability-calendar-form">
      {/* Success Message */}
      {successMessage && (
        <BootstrapAlert
          variant="success"
          className="mb-4"
          dismissible
          onDismiss={() => setSuccessMessage(null)}
        >
          <i className="bi bi-check-circle me-2"></i>
          {successMessage}
        </BootstrapAlert>
      )}

      {/* Server Error Message */}
      {serverError && (
        <BootstrapAlert
          variant="danger"
          className="mb-4"
          dismissible
          onDismiss={() => setServerError(null)}
        >
          <AlertCircle className="h-4 w-4 me-2" />
          {serverError}
        </BootstrapAlert>
      )}

      {/* Availability Options */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-person-check me-2"></i>
            Opțiuni Disponibilitate
          </h5>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="acceptingNewPatients"
                  {...register("acceptingNewPatients")}
                  disabled={isPending}
                />
                <label className="form-check-label" htmlFor="acceptingNewPatients">
                  Acceptă pacienți noi
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="onlineConsultations"
                  {...register("onlineConsultations")}
                  disabled={isPending}
                />
                <label className="form-check-label" htmlFor="onlineConsultations">
                  Oferă consultații online
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="bd-dashboard-section-title mb-0">
              <i className="bi bi-calendar-week me-2"></i>
              Program Săptămânal
            </h5>
            <BootstrapButton
              type="button"
              size="sm"
              onClick={addScheduleEntry}
              disabled={isPending}
            >
              <Plus className="h-4 w-4 me-1" />
              Adaugă interval
            </BootstrapButton>
          </div>

          {scheduleFields.length === 0 ? (
            <p className="text-muted">
              Nu există intervale de program. Adaugă cel puțin un interval pentru a seta
              disponibilitatea ta.
            </p>
          ) : (
            <div className="row g-3">
              {scheduleFields.map((field, index) => (
                <div key={field.id} className="col-12">
                  <div className="card border">
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label">Zi</label>
                          <BootstrapSelect
                            {...register(`schedule.${index}.day`)}
                            disabled={isPending}
                            error={!!errors.schedule?.[index]?.day}
                            options={[
                              { value: "", label: "Selectează ziua" },
                              ...DAYS_OF_WEEK.map((day) => ({
                                value: day.value,
                                label: day.label,
                              })),
                            ]}
                          />
                          {errors.schedule?.[index]?.day && (
                            <div className="text-danger small mt-1">
                              {errors.schedule[index]?.day?.message}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Ora început</label>
                          <BootstrapInput
                            type="time"
                            {...register(`schedule.${index}.startTime`)}
                            disabled={isPending}
                            error={!!errors.schedule?.[index]?.startTime}
                          />
                          {errors.schedule?.[index]?.startTime && (
                            <div className="text-danger small mt-1">
                              {errors.schedule[index]?.startTime?.message}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3">
                          <label className="form-label">Ora sfârșit</label>
                          <BootstrapInput
                            type="time"
                            {...register(`schedule.${index}.endTime`)}
                            disabled={isPending}
                            error={!!errors.schedule?.[index]?.endTime}
                          />
                          {errors.schedule?.[index]?.endTime && (
                            <div className="text-danger small mt-1">
                              {errors.schedule[index]?.endTime?.message}
                            </div>
                          )}
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                          <BootstrapButton
                            type="button"
                            variant="danger"
                            size="sm"
                            onClick={() => removeSchedule(index)}
                            disabled={isPending}
                          >
                            <X className="h-4 w-4" />
                          </BootstrapButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {errors.schedule &&
            typeof errors.schedule === "object" &&
            "message" in errors.schedule && (
              <div className="text-danger small mt-2">{errors.schedule.message as string}</div>
            )}
        </div>
      </div>

      {/* Info Box */}
      <div className="alert alert-info mb-4" role="alert">
        <i className="bi bi-info-circle me-2"></i>
        <strong>Notă:</strong> Programul setat aici va fi folosit pentru a determina
        disponibilitatea ta pentru consultații. Părinții vor putea rezerva consultații doar în
        intervalele de timp pe care le-ai setat ca fiind disponibile.
      </div>

      {/* Form Actions */}
      <div className="d-flex gap-3 justify-content-end mb-4">
        <BootstrapButton
          type="button"
          variant="danger"
          onClick={() => router.back()}
          disabled={isPending}
        >
          <i className="bi bi-x-circle me-2"></i>
          Anulează
        </BootstrapButton>
        <BootstrapButton type="submit" variant="primary" disabled={isPending}>
          {isPending ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Se salvează...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i>
              Salvează disponibilitatea
            </>
          )}
        </BootstrapButton>
      </div>
    </form>
  );
};

export default DoctorAvailabilityCalendar;
