/**
 * DoctorAvailabilityForm Component
 *
 * Client component for setting doctor availability during doctor onboarding.
 * Uses React Hook Form with Zod validation.
 *
 * Features:
 * - Romanian labels and error messages
 * - Accepting new patients checkbox
 * - Online consultations checkbox
 * - Optional schedule builder (day, startTime, endTime)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorAvailability } from "@/app/actions/onboarding";
import { doctorAvailabilitySchema, type DoctorAvailabilityInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { BootstrapInput, BootstrapSelect, BootstrapButton } from "@/components/UI/bootstrap-index";
import { InfoBox } from "./components/InfoBox";
import { X, Plus } from "lucide-react";

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

export function DoctorAvailabilityForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DoctorAvailabilityInput>({
    resolver: zodResolver(doctorAvailabilitySchema),
    defaultValues: {
      acceptingNewPatients: true,
      onlineConsultations: false,
      schedule: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

  const onSubmit = async (data: DoctorAvailabilityInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await updateDoctorAvailability(data);

      if (result.success) {
        // Navigate to next step (completion)
        router.push(routes.onboarding.doctor.complete);
      } else {
        setServerError(result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError("A apărut o eroare neașteptată. Te rugăm să încerci din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  const addScheduleEntry = () => {
    append({ day: "", startTime: "", endTime: "" });
  };

  const removeScheduleEntry = (index: number) => {
    remove(index);
  };

  return (
    <form id="doctor-availability-form" onSubmit={handleSubmit(onSubmit)} className="px-3 px-sm-0">
      {/* Server Error */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Accepting New Patients */}
      <div className="mb-4">
        <div className="d-flex align-items-start gap-3">
          <input
            type="checkbox"
            id="acceptingNewPatients"
            {...register("acceptingNewPatients")}
            disabled={isLoading}
            className="form-check-input mt-1"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
          <div className="flex-fill">
            <label
              htmlFor="acceptingNewPatients"
              className="d-flex align-items-center gap-2 small fw-medium text-body cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              Accept pacienți noi
              <InfoTooltip
                content="Dacă activezi această opțiune, părinții vor ști că poți accepta pacienți noi și vor putea rezerva consultații pentru copiii lor."
                size="sm"
              />
            </label>
            <p className="mt-1 small text-body">
              Activează această opțiune dacă accepți în prezent pacienți noi în cabinetul tău.
            </p>
          </div>
        </div>
      </div>

      {/* Online Consultations */}
      <div className="mb-4">
        <div className="d-flex align-items-start gap-3">
          <input
            type="checkbox"
            id="onlineConsultations"
            {...register("onlineConsultations")}
            disabled={isLoading}
            className="form-check-input mt-1"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
          <div className="flex-fill">
            <label
              htmlFor="onlineConsultations"
              className="d-flex align-items-center gap-2 small fw-medium text-body cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              Consultații online disponibile
              <InfoTooltip
                content="Dacă oferi consultații online (video sau telefon), activează această opțiune. Părinții vor putea vedea că oferi această opțiune și vor putea rezerva consultații online."
                size="sm"
              />
            </label>
            <p className="mt-1 small text-body">
              Activează această opțiune dacă oferi consultații online (video sau telefon).
            </p>
          </div>
        </div>
      </div>

      {/* Schedule Builder */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <label className="d-block small fw-medium text-body">
            Program consultații <span className="text-secondary text-xs">(opțional)</span>
          </label>
          <BootstrapButton
            type="button"
            onClick={addScheduleEntry}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="d-inline-flex align-items-center gap-2 text-yuvoo-primary bg-yuvoo-primary-light border-yuvoo-primary text-yuvoo-primary-hover"
            style={{
              borderColor: "rgba(0, 187, 174, 0.2)",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = "var(--bd-theme-1)";
                e.currentTarget.style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = "var(--bd-theme-1-light)";
                e.currentTarget.style.color = "var(--bd-theme-1)";
              }
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Adaugă interval</span>
          </BootstrapButton>
        </div>

        {fields.length === 0 && (
          <div className="bg-light border border-secondary rounded p-4 text-center">
            <p className="small text-body mb-2">Nu ai adăugat niciun interval de consultații.</p>
            <p className="text-xs text-secondary">
              Apasă pe &ldquo;Adaugă interval&rdquo; pentru a adăuga programul tău de consultații.
              Acest câmp este opțional.
            </p>
          </div>
        )}

        {fields.length > 0 && (
          <div className="mb-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-white border border-secondary rounded p-4 d-flex flex-column flex-sm-row align-items-start gap-3 mb-3"
              >
                {/* Day Select */}
                <div className="flex-fill w-100 w-sm-auto">
                  <label
                    htmlFor={`schedule.${index}.day`}
                    className="d-block text-xs fw-medium text-body mb-2"
                  >
                    Ziua
                  </label>
                  <BootstrapSelect
                    {...register(`schedule.${index}.day` as const)}
                    disabled={isLoading}
                    error={!!errors.schedule?.[index]?.day}
                    className="w-100 small"
                    options={[
                      { value: "", label: "Selectează ziua" },
                      ...DAYS_OF_WEEK.map((day) => ({ value: day.value, label: day.label })),
                    ]}
                  />
                  {errors.schedule?.[index]?.day && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.schedule[index]?.day?.message}
                    </p>
                  )}
                </div>

                {/* Start Time */}
                <div className="flex-fill w-100 w-sm-auto">
                  <label
                    htmlFor={`schedule.${index}.startTime`}
                    className="d-block text-xs fw-medium text-body mb-2"
                  >
                    Ora început
                  </label>
                  <BootstrapInput
                    type="time"
                    {...register(`schedule.${index}.startTime` as const)}
                    disabled={isLoading}
                    error={!!errors.schedule?.[index]?.startTime}
                    className="w-100 small"
                    aria-invalid={errors.schedule?.[index]?.startTime ? "true" : "false"}
                  />
                  {errors.schedule?.[index]?.startTime && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.schedule[index]?.startTime?.message}
                    </p>
                  )}
                </div>

                {/* End Time */}
                <div className="flex-fill w-100 w-sm-auto">
                  <label
                    htmlFor={`schedule.${index}.endTime`}
                    className="d-block text-xs fw-medium text-body mb-2"
                  >
                    Ora sfârșit
                  </label>
                  <BootstrapInput
                    type="time"
                    {...register(`schedule.${index}.endTime` as const)}
                    disabled={isLoading}
                    error={!!errors.schedule?.[index]?.endTime}
                    className="w-100 small"
                    aria-invalid={errors.schedule?.[index]?.endTime ? "true" : "false"}
                  />
                  {errors.schedule?.[index]?.endTime && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.schedule[index]?.endTime?.message}
                    </p>
                  )}
                </div>

                {/* Remove Button */}
                <div
                  style={{ flexShrink: 0 }}
                  className="pt-0 pt-sm-4 w-100 w-sm-auto d-flex justify-content-end justify-content-sm-start"
                >
                  <button
                    type="button"
                    onClick={() => removeScheduleEntry(index)}
                    disabled={isLoading}
                    className="p-2 text-secondary text-danger-hover bg-danger bg-opacity-10 rounded focus-danger"
                    style={{
                      transition: "all 0.2s ease-in-out",
                    }}
                    aria-label="Șterge interval"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {errors.schedule && typeof errors.schedule.message === "string" && (
          <p className="mt-2 small text-danger">{errors.schedule.message}</p>
        )}
      </div>

      {/* Info box */}
      <InfoBox title="De ce avem nevoie de aceste informații?" icon="ℹ️" className="mb-4">
        <p className="small text-body mb-0">
          Informațiile despre disponibilitatea ta vor fi afișate în profilul tău profesional, astfel
          încât părinții să știe dacă accepți pacienți noi și când ești disponibil pentru
          consultații. Poți actualiza aceste detalii oricând din dashboard-ul tău.
        </p>
      </InfoBox>

      {/* Navigation */}
      <div className="pt-4 border-top border-secondary">
        <OnboardingNavigation
          backHref={routes.onboarding.doctor.verification}
          nextHref={null} // null means submit button
          formId="doctor-availability-form"
          isLoading={isLoading}
          isNextDisabled={isLoading}
          nextText="Continuă"
        />
      </div>
    </form>
  );
}
