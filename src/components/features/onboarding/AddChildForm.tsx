/**
 * AddChildForm Component
 *
 * Client component for adding child profile during parent onboarding.
 * Uses React Hook Form with Zod validation and custom date picker.
 *
 * Features:
 * - Romanian labels and error messages
 * - Date picker with age validation (4-14 years)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "lucide-react";
import { addChildOnboarding } from "@/app/actions/onboarding";
import { createChildSchema, type CreateChildInput } from "@/lib/validations/child";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { BootstrapInput } from "@/components/UI/bootstrap-index";
import { cn } from "@/lib/utils";

export function AddChildForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateChildInput>({
    resolver: zodResolver(createChildSchema),
  });

  const dateOfBirth = watch("dateOfBirth");

  // Handle date input change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    if (dateString) {
      setValue("dateOfBirth", new Date(dateString), { shouldValidate: true });
    }
  };

  // Format date for input value (YYYY-MM-DD)
  const formatDateForInput = (date?: Date): string => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Calculate age from date of birth
  const calculateAge = (date?: Date): number | null => {
    if (!date) return null;
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(dateOfBirth);

  const onSubmit = async (data: CreateChildInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await addChildOnboarding(data);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.parent.tour);
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
    <form id="add-child-form" onSubmit={handleSubmit(onSubmit)}>
      {/* Server error message */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* First Name */}
      <div className="mb-4">
        <label htmlFor="firstName" className="d-block small fw-medium text-body mb-2">
          Prenume <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="firstName"
          type="text"
          {...register("firstName")}
          disabled={isLoading}
          error={!!errors.firstName}
          className="w-100"
          placeholder="ex. Maria"
          aria-invalid={errors.firstName ? "true" : "false"}
          aria-describedby={errors.firstName ? "firstName-error" : undefined}
        />
        {errors.firstName && (
          <p id="firstName-error" className="mt-2 small text-danger">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label htmlFor="lastName" className="d-block small fw-medium text-body mb-2">
          Nume <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="lastName"
          type="text"
          {...register("lastName")}
          disabled={isLoading}
          error={!!errors.lastName}
          className="w-100"
          placeholder="ex. Popescu"
          aria-invalid={errors.lastName ? "true" : "false"}
          aria-describedby={errors.lastName ? "lastName-error" : undefined}
        />
        {errors.lastName && (
          <p id="lastName-error" className="mt-2 small text-danger">
            {errors.lastName.message}
          </p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="mb-4">
        <label htmlFor="dateOfBirth" className="d-block small fw-medium text-body mb-2">
          Data nașterii <span className="text-danger">*</span>
        </label>
        <div className="position-relative">
          <BootstrapInput
            id="dateOfBirth"
            type="date"
            onChange={handleDateChange}
            value={formatDateForInput(dateOfBirth)}
            disabled={isLoading}
            max={new Date().toISOString().split("T")[0]}
            min={new Date(new Date().getFullYear() - 14, 0, 1).toISOString().split("T")[0]}
            error={!!errors.dateOfBirth}
            className="w-100"
            style={{ paddingRight: "2.5rem" }}
            aria-invalid={errors.dateOfBirth ? "true" : "false"}
            aria-describedby={errors.dateOfBirth ? "dateOfBirth-error" : "dateOfBirth-help"}
          />
          <Calendar
            className="position-absolute"
            style={{
              right: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "1.25rem",
              height: "1.25rem",
              color: "var(--bs-secondary)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
        </div>
        {age !== null && !errors.dateOfBirth && (
          <p id="dateOfBirth-help" className="mt-2 small text-body">
            Vârsta: {age} {age === 1 ? "an" : "ani"}
          </p>
        )}
        {errors.dateOfBirth && (
          <p id="dateOfBirth-error" className="mt-2 small text-danger">
            {errors.dateOfBirth.message}
          </p>
        )}
        <p className="mt-2 text-xs text-secondary">
          Platforma Yuvoo este destinată copiilor cu vârste între 4 și 14 ani.
        </p>
      </div>

      {/* Gender (Optional) */}
      <div className="mb-4">
        <label className="d-block small fw-medium text-body mb-3">
          Gen <span className="text-secondary text-xs">(opțional)</span>
        </label>
        <div className="row g-3">
          <div className="col-4">
            <label
              className={cn(
                "d-flex flex-column align-items-center justify-content-center p-4 border-2 rounded",
                isLoading && "opacity-50"
              )}
              style={{
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = "var(--bd-theme-1)";
                  e.currentTarget.style.backgroundColor = "var(--bd-theme-1-light)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.backgroundColor = "";
                }
              }}
            >
              <input
                type="radio"
                value="male"
                {...register("gender")}
                disabled={isLoading}
                className="visually-hidden"
              />
              <span className="fs-3 mb-2">👦</span>
              <span className="small fw-medium text-body">Băiat</span>
            </label>
          </div>

          <div className="col-4">
            <label
              className={cn(
                "d-flex flex-column align-items-center justify-content-center p-4 border-2 rounded",
                isLoading && "opacity-50"
              )}
              style={{
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = "var(--bd-theme-1)";
                  e.currentTarget.style.backgroundColor = "var(--bd-theme-1-light)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.backgroundColor = "";
                }
              }}
            >
              <input
                type="radio"
                value="female"
                {...register("gender")}
                disabled={isLoading}
                className="visually-hidden"
              />
              <span className="fs-3 mb-2">👧</span>
              <span className="small fw-medium text-body">Fată</span>
            </label>
          </div>

          <div className="col-4">
            <label
              className={cn(
                "d-flex flex-column align-items-center justify-content-center p-4 border-2 rounded",
                isLoading && "opacity-50"
              )}
              style={{
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = "var(--bd-theme-1)";
                  e.currentTarget.style.backgroundColor = "var(--bd-theme-1-light)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.backgroundColor = "";
                }
              }}
            >
              <input
                type="radio"
                value="other"
                {...register("gender")}
                disabled={isLoading}
                className="visually-hidden"
              />
              <span className="fs-3 mb-2">👶</span>
              <span className="small fw-medium text-body">Altul</span>
            </label>
          </div>
        </div>
        {errors.gender && <p className="mt-2 small text-danger">{errors.gender.message}</p>}
      </div>

      {/* Navigation */}
      <div className="pt-4 border-top border-secondary">
        <OnboardingNavigation
          backHref={routes.onboarding.parent.welcome}
          nextHref={null} // null means submit button
          formId="add-child-form"
          isLoading={isLoading}
          isNextDisabled={isLoading}
          nextText="Adaugă profil"
        />
      </div>
    </form>
  );
}
