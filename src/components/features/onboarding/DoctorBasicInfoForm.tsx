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

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDoctorOnboarding } from "@/app/actions/onboarding";
import { doctorBasicInfoSchema, type DoctorBasicInfoInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { BootstrapInput, BootstrapSelect, BootstrapButton } from "@/components/UI/bootstrap-index";
import { cn } from "@/lib/utils";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<string[]>([]);
  const [newCredential, setNewCredential] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DoctorBasicInfoInput>({
    resolver: zodResolver(doctorBasicInfoSchema),
    defaultValues: {
      credentials: [],
    },
  });

  // Sync credentials with form state
  useEffect(() => {
    setValue("credentials", credentials, { shouldValidate: true });
  }, [credentials, setValue]);

  // Add credential
  const addCredential = () => {
    if (newCredential.trim() && !credentials.includes(newCredential.trim())) {
      const updated = [...credentials, newCredential.trim()];
      setCredentials(updated);
      setValue("credentials", updated, { shouldValidate: true });
      setNewCredential("");
    }
  };

  // Remove credential
  const removeCredential = (credential: string) => {
    const updated = credentials.filter((c) => c !== credential);
    setCredentials(updated);
    setValue("credentials", updated, { shouldValidate: true });
  };

  // Add common credential
  const addCommonCredential = (credential: string) => {
    if (!credentials.includes(credential)) {
      const updated = [...credentials, credential];
      setCredentials(updated);
      setValue("credentials", updated, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: DoctorBasicInfoInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Ensure credentials are included from state
      const formData: DoctorBasicInfoInput = {
        ...data,
        credentials: credentials.length > 0 ? credentials : [],
      };

      const result = await createDoctorOnboarding(formData);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.doctor.bioExperience);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-3 px-sm-0">
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
      <div className="mb-4">
        <label className="d-flex align-items-center gap-2 small fw-medium text-body mb-2">
          Credențiale <span className="text-danger">*</span>
          <InfoTooltip
            content="Adaugă credențialele tale profesionale (ex: MD, Specialist, Primar, Board Certified, CMR). Acestea vor crește încrederea părinților în competența ta."
            size="sm"
          />
        </label>
        <p className="small text-secondary mb-3">
          Adaugă cel puțin o credențială (ex: MD, Specialist, etc.)
        </p>

        {/* Common credentials quick add */}
        <div className="mb-3">
          <p className="text-xs text-secondary mb-2">Adaugă rapid:</p>
          <div className="d-flex flex-wrap gap-2">
            {COMMON_CREDENTIALS.map((cred) => (
              <button
                key={cred}
                type="button"
                onClick={() => addCommonCredential(cred)}
                disabled={credentials.includes(cred)}
                className={cn(
                  "px-3 py-1 small rounded border",
                  credentials.includes(cred)
                    ? "bg-light text-secondary border-secondary"
                    : "bg-white text-body border-secondary text-secondary-hover"
                )}
                style={{
                  cursor: credentials.includes(cred) ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {cred}
              </button>
            ))}
          </div>
        </div>

        {/* Custom credential input */}
        <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
          <BootstrapInput
            type="text"
            value={newCredential}
            onChange={(e) => setNewCredential(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCredential();
              }
            }}
            placeholder="Adaugă credențială personalizată"
            className="flex-fill"
          />
          <BootstrapButton
            type="button"
            onClick={addCredential}
            variant="primary"
            className="bg-yuvoo-primary text-white text-yuvoo-primary-hover"
            style={{ whiteSpace: "nowrap" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bd-theme-1-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bd-theme-1)";
            }}
          >
            Adaugă
          </BootstrapButton>
        </div>

        {/* Credentials list */}
        {credentials.length > 0 && (
          <div className="mb-3">
            {credentials.map((cred) => (
              <div
                key={cred}
                className="d-flex align-items-center justify-content-between px-3 py-2 bg-light rounded mb-2"
              >
                <span className="small text-body">{cred}</span>
                <button
                  type="button"
                  onClick={() => removeCredential(cred)}
                  className="text-danger text-danger-hover small"
                  style={{ transition: "color 0.2s ease-in-out" }}
                >
                  Șterge
                </button>
              </div>
            ))}
          </div>
        )}

        {errors.credentials && (
          <p className="mt-1 small text-danger">{errors.credentials.message}</p>
        )}
      </div>

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
