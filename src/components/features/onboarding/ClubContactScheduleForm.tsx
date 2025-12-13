/**
 * ClubContactScheduleForm Component
 *
 * Client component for adding club contact information and schedule during club admin onboarding.
 * Uses React Hook Form with Zod validation.
 *
 * Features:
 * - Romanian labels and error messages
 * - Phone number validation (Romanian format: +40XXXXXXXXX)
 * - Email validation
 * - Optional website URL
 * - Schedule builder (add/remove schedule entries)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClubContactSchedule } from "@/app/actions/onboarding";
import { clubContactScheduleSchema, type ClubContactScheduleInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { normalizePhoneNumber } from "@/lib/utils";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { InfoBox } from "./components/InfoBox";
import { BootstrapInput, BootstrapSelect, BootstrapButton } from "@/components/UI/bootstrap-index";
import { X, Plus } from "lucide-react";
import { useOnboardingForm } from "./hooks/useOnboardingForm";

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

export function ClubContactScheduleForm() {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    control,
    formState: { errors },
  } = useForm<ClubContactScheduleInput>({
    resolver: zodResolver(clubContactScheduleSchema),
    defaultValues: {
      phone: "",
      email: "",
      website: "",
      schedule: [],
    },
  });

  const { handleSubmit, isLoading, serverError } = useOnboardingForm<ClubContactScheduleInput>({
    onSubmitAction: updateClubContactSchedule,
    onSuccessRoute: routes.onboarding.club.pricingAges,
    transformData: (data) => ({
      ...data,
      phone: normalizePhoneNumber(data.phone),
    }),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

  const addScheduleEntry = () => {
    append({ day: "", time: "" });
  };

  const removeScheduleEntry = (index: number) => {
    remove(index);
  };

  return (
    <form id="club-contact-schedule-form" onSubmit={rhfHandleSubmit(handleSubmit)}>
      {/* Server error message */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Phone */}
      <div className="mb-4">
        <label htmlFor="phone" className="d-block small fw-medium text-body mb-2">
          Telefon <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="phone"
          type="tel"
          {...register("phone")}
          disabled={isLoading}
          error={!!errors.phone}
          className="w-100"
          placeholder="+40721234567"
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? "phone-error" : "phone-help"}
        />
        {errors.phone ? (
          <p id="phone-error" className="mt-2 small text-danger">
            {errors.phone.message}
          </p>
        ) : (
          <p id="phone-help" className="mt-2 text-xs text-secondary">
            Format: +40XXXXXXXXX (ex: +40721234567)
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="d-block small fw-medium text-body mb-2">
          Email <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="email"
          type="email"
          {...register("email")}
          disabled={isLoading}
          error={!!errors.email}
          className="w-100"
          placeholder="contact@clubulmeu.ro"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 small text-danger">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Website (Optional) */}
      <div className="mb-4">
        <label htmlFor="website" className="d-block small fw-medium text-body mb-2">
          Website <span className="text-secondary text-xs">(opțional)</span>
        </label>
        <BootstrapInput
          id="website"
          type="url"
          {...register("website")}
          disabled={isLoading}
          error={!!errors.website}
          className="w-100"
          placeholder="https://www.clubulmeu.ro"
          aria-invalid={errors.website ? "true" : "false"}
          aria-describedby={errors.website ? "website-error" : undefined}
        />
        {errors.website && (
          <p id="website-error" className="mt-2 small text-danger">
            {errors.website.message}
          </p>
        )}
      </div>

      {/* Schedule Builder */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <label className="d-block small fw-medium text-body">
            Program antrenamente <span className="text-danger">*</span>
          </label>
          <BootstrapButton
            type="button"
            onClick={addScheduleEntry}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="d-inline-flex align-items-center gap-2 "
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
            <span className="d-inline-flex align-items-center justify-content-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Adaugă interval</span>
            </span>
          </BootstrapButton>
        </div>

        {fields.length === 0 && (
          <div className="bg-light border border-secondary rounded p-4 text-center">
            <p className="small text-body mb-2">Nu ai adăugat niciun interval de antrenament.</p>
            <p className="text-xs text-secondary">
              Apasă pe &ldquo;Adaugă interval&rdquo; pentru a adăuga programul clubului.
            </p>
          </div>
        )}

        {fields.length > 0 && (
          <div className="mb-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-white border border-secondary rounded p-4 d-flex align-items-start gap-3 mb-3"
              >
                {/* Day Select */}
                <div className="flex-fill">
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

                {/* Time Input */}
                <div className="flex-fill">
                  <label
                    htmlFor={`schedule.${index}.time`}
                    className="d-block text-xs fw-medium text-body mb-2"
                  >
                    Interval orar
                  </label>
                  <BootstrapInput
                    type="text"
                    {...register(`schedule.${index}.time` as const)}
                    disabled={isLoading}
                    error={!!errors.schedule?.[index]?.time}
                    className="w-100 small"
                    placeholder="ex: 17:00-18:30"
                    aria-invalid={errors.schedule?.[index]?.time ? "true" : "false"}
                  />
                  {errors.schedule?.[index]?.time && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.schedule[index]?.time?.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-secondary">
                    Format: HH:MM-HH:MM (ex: 17:00-18:30)
                  </p>
                </div>

                {/* Remove Button */}
                <div style={{ flexShrink: 0, paddingTop: "1.5rem" }}>
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
      <InfoBox title="De ce avem nevoie de aceste informații?" className="mb-4">
        Informațiile de contact și programul de antrenamente vor fi afișate în profilul clubului
        tău, astfel încât părinții să te poată contacta și să știe când se desfășoară
        antrenamentele. Poți actualiza aceste detalii oricând din dashboard-ul tău.
      </InfoBox>

      {/* Navigation */}
      <div className="pt-4 border-top border-secondary">
        <OnboardingNavigation
          backHref={routes.onboarding.club.basicInfo}
          nextHref={null} // null means submit button
          formId="club-contact-schedule-form"
          isLoading={isLoading}
          isNextDisabled={isLoading}
          nextText="Continuă"
        />
      </div>
    </form>
  );
}
