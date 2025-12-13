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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addChildOnboarding } from "@/app/actions/onboarding";
import { createChildSchema, type CreateChildInput } from "@/lib/validations/child";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { DatePickerWithAgeField, RadioButtonGroupField } from "./components";
import { BootstrapInput } from "@/components/UI/bootstrap-index";
import { useOnboardingForm } from "./hooks/useOnboardingForm";

export function AddChildForm() {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateChildInput>({
    resolver: zodResolver(createChildSchema),
  });

  // Use onboarding form hook for submission logic
  const { handleSubmit, isLoading, serverError } = useOnboardingForm<CreateChildInput>({
    onSubmitAction: addChildOnboarding,
    onSuccessRoute: routes.onboarding.parent.tour,
  });

  return (
    <form id="add-child-form" onSubmit={rhfHandleSubmit(handleSubmit)}>
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
      <DatePickerWithAgeField
        label="Data nașterii"
        name="dateOfBirth"
        setValue={setValue}
        currentValue={watch("dateOfBirth")}
        error={errors.dateOfBirth}
        required
        description="Platforma Yuvoo este destinată copiilor cu vârste între 4 și 14 ani."
        minAge={4}
        maxAge={14}
        isLoading={isLoading}
      />

      {/* Gender (Optional) */}
      <RadioButtonGroupField
        label="Gen"
        name="gender"
        register={register}
        error={errors.gender}
        options={[
          { value: "male", label: "Băiat", emoji: "👦" },
          { value: "female", label: "Fată", emoji: "👧" },
          { value: "other", label: "Altul", emoji: "👶" },
        ]}
        gridCols={{ xs: 4, sm: 4, md: 4 }}
        description="(opțional)"
        isLoading={isLoading}
      />

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
