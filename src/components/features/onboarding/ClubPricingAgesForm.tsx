/**
 * ClubPricingAgesForm Component
 *
 * Client component for adding club pricing and age groups during club admin onboarding.
 * Uses React Hook Form with Zod validation.
 *
 * Features:
 * - Romanian labels and error messages
 * - Dynamic pricing builder (multiple pricing options)
 * - Age group selector (ages 4-14)
 * - Experience level selector (beginner, intermediate, advanced)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClubPricingAges } from "@/app/actions/onboarding";
import { clubPricingAgesSchema, type ClubPricingAgesInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { InfoBox } from "./components/InfoBox";
import { MultiSelectCheckboxField } from "./components";
import { BootstrapInput, BootstrapSelect, BootstrapButton } from "@/components/UI/bootstrap-index";
import { X, Plus } from "lucide-react";
import { useOnboardingForm } from "./hooks/useOnboardingForm";
import { saveFormData, getFormData } from "./hooks/useOnboardingLocalStorage";

// Age groups (4-14 years)
const AGE_GROUPS = Array.from({ length: 11 }, (_, i) => i + 4); // [4, 5, 6, ..., 14]

// Experience levels
const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Începător" },
  { value: "intermediate", label: "Intermediar" },
  { value: "advanced", label: "Avansat" },
] as const;

// Pricing types
const PRICING_TYPES = [
  { value: "monthly", label: "Lunar" },
  { value: "per_class", label: "Pe ședință" },
  { value: "per_semester", label: "Pe semestru" },
] as const;

export function ClubPricingAgesForm() {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ClubPricingAgesInput>({
    resolver: zodResolver(clubPricingAgesSchema),
    defaultValues: {
      pricing: [],
      ageGroups: [],
      experienceLevels: [],
    },
  });

  const role = "club_admin";
  const stepNumber = 4;

  const {
    fields: pricingFields,
    append: appendPricing,
    remove: removePricing,
    replace: replacePricing,
  } = useFieldArray({
    control,
    name: "pricing",
  });

  // Restore form data from localStorage on mount
  useEffect(() => {
    const saved = getFormData<ClubPricingAgesInput>(role, stepNumber);
    if (saved) {
      // Handle pricing array separately (useFieldArray requires replace)
      if (saved.pricing && Array.isArray(saved.pricing)) {
        replacePricing(saved.pricing);
      }

      // Restore other fields
      if (saved.ageGroups !== undefined && saved.ageGroups !== null) {
        setValue("ageGroups", saved.ageGroups, { shouldValidate: false });
      }
      if (saved.experienceLevels !== undefined && saved.experienceLevels !== null) {
        setValue("experienceLevels", saved.experienceLevels, { shouldValidate: false });
      }
    }
  }, [setValue, replacePricing]);

  // Save form data to localStorage on changes (debounced)
  const formValues = watch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveFormData(role, stepNumber, formValues);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formValues]);

  const { handleSubmit, isLoading, serverError } = useOnboardingForm<ClubPricingAgesInput>({
    onSubmitAction: updateClubPricingAges,
    onSuccessRoute: routes.onboarding.club.photos,
    role,
    stepNumber,
    transformData: (data) => ({
      ...data,
      ageGroups: Array.isArray(data.ageGroups) ? data.ageGroups : [],
      experienceLevels: Array.isArray(data.experienceLevels) ? data.experienceLevels : [],
    }),
  });

  const addPricingOption = () => {
    appendPricing({ type: "monthly", amount: 0 });
  };

  const removePricingOption = (index: number) => {
    removePricing(index);
  };

  return (
    <form id="club-pricing-ages-form" onSubmit={rhfHandleSubmit(handleSubmit)}>
      {/* Server error message */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Pricing Builder */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <label className="d-block small fw-medium text-body">
            Prețuri <span className="text-danger">*</span>
          </label>
          <BootstrapButton
            type="button"
            onClick={addPricingOption}
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
            <span>Adaugă preț</span>
          </BootstrapButton>
        </div>

        {pricingFields.length === 0 && (
          <div className="bg-light border border-secondary rounded p-4 text-center">
            <p className="small text-body mb-2">Nu ai adăugat niciun preț.</p>
            <p className="text-xs text-secondary">
              Apasă pe &ldquo;Adaugă preț&rdquo; pentru a adăuga opțiunile de preț.
            </p>
          </div>
        )}

        {pricingFields.length > 0 && (
          <div className="mb-3">
            {pricingFields.map((field, index) => (
              <div
                key={field.id}
                className="bg-white border border-secondary rounded p-4 d-flex align-items-start gap-3 mb-3"
              >
                {/* Pricing Type */}
                <div className="flex-fill">
                  <label
                    htmlFor={`pricing.${index}.type`}
                    className="d-block text-xs fw-medium text-body mb-2"
                  >
                    Tip abonament
                  </label>
                  <BootstrapSelect
                    {...register(`pricing.${index}.type` as const)}
                    disabled={isLoading}
                    error={!!errors.pricing?.[index]?.type}
                    className="w-100 small"
                    options={PRICING_TYPES.map((type) => ({
                      value: type.value,
                      label: type.label,
                    }))}
                  />
                  {errors.pricing?.[index]?.type && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.pricing[index]?.type?.message}
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div className="flex-fill">
                  <label
                    htmlFor={`pricing.${index}.amount`}
                    className="d-block text-xs fw-medium text-body mb-2"
                  >
                    Preț (RON)
                  </label>
                  <BootstrapInput
                    type="number"
                    step="0.01"
                    min="0"
                    max="10000"
                    {...register(`pricing.${index}.amount` as const, {
                      valueAsNumber: true,
                    })}
                    disabled={isLoading}
                    error={!!errors.pricing?.[index]?.amount}
                    className="w-100 small"
                    placeholder="ex: 200"
                    aria-invalid={errors.pricing?.[index]?.amount ? "true" : "false"}
                  />
                  {errors.pricing?.[index]?.amount && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.pricing[index]?.amount?.message}
                    </p>
                  )}
                </div>

                {/* Remove Button */}
                <div style={{ flexShrink: 0, paddingTop: "1.5rem" }}>
                  <button
                    type="button"
                    onClick={() => removePricingOption(index)}
                    disabled={isLoading}
                    className="p-2 text-secondary text-danger-hover bg-danger bg-opacity-10 rounded focus-danger"
                    style={{
                      transition: "all 0.2s ease-in-out",
                    }}
                    aria-label="Șterge preț"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {errors.pricing && typeof errors.pricing.message === "string" && (
          <p className="mt-2 small text-danger">{errors.pricing.message}</p>
        )}
      </div>

      {/* Age Groups */}
      <MultiSelectCheckboxField
        label="Grupe de vârstă"
        name="ageGroups"
        control={control}
        error={errors.ageGroups as FieldError | undefined}
        options={AGE_GROUPS.map((age) => ({
          value: age,
          label: `${age} ani`,
        }))}
        gridCols={{ xs: 4, sm: 3, md: 2 }}
        required
        description="Selectează grupele de vârstă acceptate de club (4-14 ani)"
        isLoading={isLoading}
      />

      {/* Experience Levels */}
      <MultiSelectCheckboxField
        label="Niveluri de experiență"
        name="experienceLevels"
        control={control}
        error={errors.experienceLevels as FieldError | undefined}
        options={EXPERIENCE_LEVELS.map((level) => ({
          value: level.value,
          label: level.label,
        }))}
        gridCols={{ xs: 12, sm: 4, md: 4 }}
        required
        description="Selectează nivelurile de experiență oferite de club"
        isLoading={isLoading}
      />

      {/* Info box */}
      <InfoBox title="De ce avem nevoie de aceste informații?" className="mb-4">
        Aceste informații vor ajuta părinții să găsească clubul potrivit pentru copilul lor.
        Prețurile, grupele de vârstă și nivelurile de experiență vor fi afișate în profilul clubului
        tău. Poți actualiza aceste detalii oricând din dashboard-ul tău.
      </InfoBox>

      {/* Navigation */}
      <div className="pt-4 border-top border-secondary">
        <OnboardingNavigation
          backHref={routes.onboarding.club.contactSchedule}
          nextHref={null} // null means submit button
          formId="club-pricing-ages-form"
          isLoading={isLoading}
          isNextDisabled={isLoading}
          nextText="Continuă"
        />
      </div>
    </form>
  );
}
