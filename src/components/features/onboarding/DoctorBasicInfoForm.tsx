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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Server error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      {/* First Name */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
          Prenume <span className="text-red-500">*</span>
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ion"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
          Nume <span className="text-red-500">*</span>
        </label>
        <input
          id="lastName"
          type="text"
          {...register("lastName")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Popescu"
        />
        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
      </div>

      {/* Title (Optional) */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Titlu profesional (opțional)
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Dr., Conf. Dr., Prof. Dr."
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* Specialty */}
      <div>
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
          Specializare <span className="text-red-500">*</span>
        </label>
        <select
          id="specialty"
          {...register("specialty")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.specialty ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Selectează specializarea</option>
          {DOCTOR_SPECIALTIES.map((spec) => (
            <option key={spec.value} value={spec.value}>
              {spec.label}
            </option>
          ))}
        </select>
        {errors.specialty && (
          <p className="mt-1 text-sm text-red-600">{errors.specialty.message}</p>
        )}
      </div>

      {/* Credentials */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Credențiale <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Adaugă cel puțin o credențială (ex: MD, Specialist, etc.)
        </p>

        {/* Common credentials quick add */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-2">Adaugă rapid:</p>
          <div className="flex flex-wrap gap-2">
            {COMMON_CREDENTIALS.map((cred) => (
              <button
                key={cred}
                type="button"
                onClick={() => addCommonCredential(cred)}
                disabled={credentials.includes(cred)}
                className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                  credentials.includes(cred)
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {cred}
              </button>
            ))}
          </div>
        </div>

        {/* Custom credential input */}
        <div className="flex gap-2 mb-3">
          <input
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
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent"
          />
          <button
            type="button"
            onClick={addCredential}
            className="px-4 py-2 bg-[#00BBAE] text-white rounded-lg hover:bg-[#00998d] transition-colors"
          >
            Adaugă
          </button>
        </div>

        {/* Credentials list */}
        {credentials.length > 0 && (
          <div className="space-y-2">
            {credentials.map((cred) => (
              <div
                key={cred}
                className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-700">{cred}</span>
                <button
                  type="button"
                  onClick={() => removeCredential(cred)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Șterge
                </button>
              </div>
            ))}
          </div>
        )}

        {errors.credentials && (
          <p className="mt-1 text-sm text-red-600">{errors.credentials.message}</p>
        )}
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={routes.onboarding.doctor.welcome}
        nextHref={null}
        nextText="Continuă"
        isLoading={isLoading}
        className="mt-8"
      />
    </form>
  );
}
