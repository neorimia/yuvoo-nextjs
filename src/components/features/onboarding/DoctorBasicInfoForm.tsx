/**
 * DoctorBasicInfoForm Component
 *
 * Client component for adding doctor basic information during doctor onboarding.
 * Uses React Hook Form with Zod validation.
 *
 * Features:
 * - Romanian labels and error messages
 * - Specialty selection
 * - Credentials multi-select
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDoctorOnboarding } from "@/app/actions/onboarding";
import { doctorBasicInfoSchema, type DoctorBasicInfoInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { TagInputField } from "./components";
import { BootstrapInput, BootstrapSelect } from "@/components/UI/bootstrap-index";
import { useOnboardingForm } from "./hooks/useOnboardingForm";

// Doctor specialties (matching validation enum)
const DOCTOR_SPECIALTIES = [
  { value: "orthopedist", label: "Ortopedie pediatrică" },
  { value: "nutritionist", label: "Nutriție pediatrică" },
  { value: "psychologist", label: "Psihologie sportivă" },
  { value: "sports_medicine", label: "Medicină sportivă pediatrică" },
] as const;

// Common credentials
const COMMON_CREDENTIALS = [
  "MD",
  "Dr.",
  "Conf. Dr.",
  "Prof. Dr.",
  "Specialist",
  "Primar",
  "Board Certified",
  "CMR",
] as const;

export function DoctorBasicInfoForm() {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DoctorBasicInfoInput>({
    resolver: zodResolver(doctorBasicInfoSchema),
    defaultValues: {
      credentials: [],
    },
  });

  const { handleSubmit, isLoading, serverError } = useOnboardingForm<DoctorBasicInfoInput>({
    onSubmitAction: createDoctorOnboarding,
    onSuccessRoute: routes.onboarding.doctor.bioExperience,
  });

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)} className="px-3 px-sm-0">
      {/* Server error */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* First Name */}
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
        >
          Prenume <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="firstName"
          type="text"
          {...register("firstName")}
          error={!!errors.firstName}
          className="w-100"
          placeholder="Ion"
        />
        {errors.firstName && <p className="mt-1 small text-danger">{errors.firstName.message}</p>}
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
        >
          Nume <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="lastName"
          type="text"
          {...register("lastName")}
          error={!!errors.lastName}
          className="w-100"
          placeholder="Popescu"
        />
        {errors.lastName && <p className="mt-1 small text-danger">{errors.lastName.message}</p>}
      </div>

      {/* Title (Optional) */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
        >
          Titlu profesional (opțional)
          <InfoTooltip
            content="Exemplu: Dr., Conf. Dr., Prof. Dr. Acest titlu va apărea în profilul tău profesional."
            size="sm"
          />
        </label>
        <BootstrapInput
          id="title"
          type="text"
          {...register("title")}
          error={!!errors.title}
          className="w-100"
          placeholder="Dr., Conf. Dr., Prof. Dr."
        />
        {errors.title && <p className="mt-1 small text-danger">{errors.title.message}</p>}
      </div>

      {/* Specialty */}
      <div className="mb-4">
        <label
          htmlFor="specialty"
          className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
        >
          Specializare <span className="text-danger">*</span>
          <InfoTooltip
            content="Selectează specialitatea ta principală. Aceasta va fi afișată în profilul tău și va ajuta părinții să te găsească."
            size="sm"
          />
        </label>
        <BootstrapSelect
          id="specialty"
          {...register("specialty")}
          error={!!errors.specialty}
          className="w-100"
          options={[
            { value: "", label: "Selectează specializarea" },
            ...DOCTOR_SPECIALTIES.map((spec) => ({ value: spec.value, label: spec.label })),
          ]}
        />
        {errors.specialty && <p className="mt-1 small text-danger">{errors.specialty.message}</p>}
      </div>

      {/* Credentials */}
      <TagInputField
        label="Credențiale"
        name="credentials"
        setValue={setValue}
        error={errors.credentials as FieldError | undefined}
        quickAddOptions={COMMON_CREDENTIALS}
        placeholder="Adaugă credențială personalizată"
        required
        helpText="Adaugă credențialele tale profesionale (ex: MD, Specialist, Primar, Board Certified, CMR). Acestea vor crește încrederea părinților în competența ta."
        description="Adaugă cel puțin o credențială (ex: MD, Specialist, etc.)"
        isLoading={isLoading}
      />

      {/* Navigation */}
      <OnboardingNavigation
        backHref={routes.onboarding.doctor.welcome}
        nextHref={null}
        nextText="Continuă"
        isLoading={isLoading}
        className="mt-5"
      />
    </form>
  );
}
