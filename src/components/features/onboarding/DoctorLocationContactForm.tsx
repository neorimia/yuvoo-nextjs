/**
 * DoctorLocationContactForm Component
 *
 * Client component for adding doctor location and contact information during doctor onboarding.
 * Uses React Hook Form with Zod validation.
 *
 * Features:
 * - Romanian labels and error messages
 * - Location dropdown (county → city/sector) - handles all Romanian cities and Bucharest sectors
 * - Address input (required, 10-300 characters)
 * - Phone input with Romanian format normalization
 * - Email input
 * - Website input (optional)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorLocationContact } from "@/app/actions/onboarding";
import {
  doctorLocationContactSchema,
  type DoctorLocationContactInput,
} from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { normalizePhoneNumber } from "@/lib/utils";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { BootstrapInput } from "@/components/UI/bootstrap-index";
import { LocationSelector } from "@/components/shared/LocationSelector";
import { useOnboardingForm } from "./hooks/useOnboardingForm";
import { saveFormData, getFormData } from "./hooks/useOnboardingLocalStorage";

export function DoctorLocationContactForm() {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DoctorLocationContactInput>({
    resolver: zodResolver(doctorLocationContactSchema),
    defaultValues: {
      cityId: "",
      sectorId: "",
      address: "",
      phone: "",
      email: "",
      website: "",
    },
  });

  const role = "doctor";
  const stepNumber = 4;

  // Restore form data from localStorage on mount
  useEffect(() => {
    const saved = getFormData<DoctorLocationContactInput>(role, stepNumber);
    if (saved) {
      // Restore all fields from saved data
      Object.keys(saved).forEach((key) => {
        const fieldKey = key as keyof DoctorLocationContactInput;
        const value = saved[fieldKey];
        if (value !== undefined && value !== null) {
          setValue(fieldKey, value, { shouldValidate: false });
        }
      });
    }
  }, [setValue]);

  // Save form data to localStorage on changes (debounced)
  const formValues = watch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveFormData(role, stepNumber, formValues);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formValues]);

  const { handleSubmit, isLoading, serverError } = useOnboardingForm<DoctorLocationContactInput>({
    onSubmitAction: updateDoctorLocationContact,
    onSuccessRoute: routes.onboarding.doctor.photo,
    role,
    stepNumber,
    transformData: (data) => ({
      ...data,
      phone: normalizePhoneNumber(data.phone),
    }),
  });

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)} className="px-3 px-sm-0">
      {/* Server error */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* City */}
      <div className="mb-4">
        <LocationSelector
          type="city"
          value={watch("cityId")}
          onChange={(cityId) => {
            setValue("cityId", cityId || "", { shouldValidate: true });
            // Clear sector when city changes
            if (!cityId) {
              setValue("sectorId", "");
            }
          }}
          label={
            <>
              Oraș <span className="text-danger">*</span>
            </>
          }
          id="cityId"
          disabled={isLoading}
          placeholder="Selectează orașul"
          error={errors.cityId?.message || null}
          required
        />
        <p className="mt-1 text-xs text-secondary">Selectează orașul unde se află cabinetul tău</p>
      </div>

      {/* Sector (Optional - only shows when city is selected) */}
      {watch("cityId") && (
        <div className="mb-4">
          <LocationSelector
            type="sector"
            value={watch("sectorId")}
            onChange={(sectorId) => setValue("sectorId", sectorId || "", { shouldValidate: true })}
            parentId={watch("cityId")}
            label={
              <>
                Sector <span className="text-secondary text-xs">(opțional)</span>
              </>
            }
            id="sectorId"
            disabled={isLoading}
            placeholder="Selectează sectorul (opțional)"
            error={errors.sectorId?.message || null}
          />
          <p className="mt-1 text-xs text-secondary">
            Selectează sectorul dacă cabinetul se află în București
          </p>
        </div>
      )}

      {/* Address */}
      <div className="mb-4">
        <label htmlFor="address" className="d-block small fw-medium text-body mb-2">
          Adresă cabinet <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="address"
          type="text"
          {...register("address")}
          error={!!errors.address}
          className="w-100"
          placeholder="Ex: Strada Exemplu, Nr. 10, Bloc A, Scara 1, Etaj 2, Ap. 5"
        />
        <p className="mt-1 text-xs text-secondary">Minim 10 caractere</p>
        {errors.address && <p className="mt-1 small text-danger">{errors.address.message}</p>}
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
        >
          Telefon cabinet <span className="text-danger">*</span>
          <InfoTooltip
            content="Numărul de telefon al cabinetului tău în format internațional (+40XXXXXXXXX). Acesta va fi afișat în profilul tău pentru ca părinții să te poată contacta."
            size="sm"
          />
        </label>
        <BootstrapInput
          id="phone"
          type="tel"
          {...register("phone")}
          error={!!errors.phone}
          className="w-100"
          placeholder="+40721234567"
        />
        <p className="mt-1 text-xs text-secondary">Format: +40XXXXXXXXX (ex: +40721234567)</p>
        {errors.phone && <p className="mt-1 small text-danger">{errors.phone.message}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
        >
          Email profesional <span className="text-danger">*</span>
          <InfoTooltip
            content="Adresa de email profesională a cabinetului. Părinții vor putea să te contacteze prin email pentru programări sau întrebări."
            size="sm"
          />
        </label>
        <BootstrapInput
          id="email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          className="w-100"
          placeholder="contact@cabinet.ro"
        />
        {errors.email && <p className="mt-1 small text-danger">{errors.email.message}</p>}
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
          error={!!errors.website}
          className="w-100"
          placeholder="https://www.cabinet.ro"
        />
        {errors.website && <p className="mt-1 small text-danger">{errors.website.message}</p>}
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={routes.onboarding.doctor.bioExperience}
        nextHref={null}
        nextText="Continuă"
        isLoading={isLoading}
        className="mt-5"
      />
    </form>
  );
}
