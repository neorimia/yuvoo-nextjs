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

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClubPricingAges } from "@/app/actions/onboarding";
import { clubPricingAgesSchema, type ClubPricingAgesInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { InfoBox } from "./components/InfoBox";
import { BootstrapInput, BootstrapSelect, BootstrapButton } from "@/components/UI/bootstrap-index";
import { cn } from "@/lib/utils";
import { X, Plus } from "lucide-react";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClubPricingAgesInput>({
    resolver: zodResolver(clubPricingAgesSchema),
    defaultValues: {
      pricing: [],
      ageGroups: [],
      experienceLevels: [],
    },
  });

  const {
    fields: pricingFields,
    append: appendPricing,
    remove: removePricing,
  } = useFieldArray({
    control,
    name: "pricing",
  });

  const onSubmit = async (data: ClubPricingAgesInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Ensure arrays are properly set
      const submitData = {
        ...data,
        ageGroups: Array.isArray(data.ageGroups) ? data.ageGroups : [],
        experienceLevels: Array.isArray(data.experienceLevels) ? data.experienceLevels : [],
      };

      const result = await updateClubPricingAges(submitData);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.club.photos);
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

  const addPricingOption = () => {
    appendPricing({ type: "monthly", amount: 0 });
  };

  const removePricingOption = (index: number) => {
    removePricing(index);
  };

  return (
    <form id="club-pricing-ages-form" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="mb-4">
        <label className="d-block small fw-medium text-body mb-3">
          Grupe de vârstă <span className="text-danger">*</span>
        </label>
        <p className="text-xs text-secondary mb-3">
          Selectează grupele de vârstă acceptate de club (4-14 ani)
        </p>

        <Controller
          name="ageGroups"
          control={control}
          render={({ field }) => (
            <div className="row g-3">
              {AGE_GROUPS.map((age) => {
                const isSelected = field.value?.includes(age) || false;
                return (
                  <div key={age} className="col-4 col-sm-3 col-md-2">
                    <label
                      className={cn(
                        "d-flex align-items-center justify-content-center p-3 border-2 rounded cursor-pointer",
                        isSelected
                          ? "border-yuvoo-primary bg-yuvoo-primary-light text-yuvoo-primary"
                          : "border-secondary bg-white text-body border-secondary-hover",
                        isLoading && "opacity-50"
                      )}
                      style={{
                        cursor: isLoading ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading && !isSelected) {
                          e.currentTarget.style.borderColor = "var(--bs-border-color)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoading && !isSelected) {
                          e.currentTarget.style.borderColor = "";
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        value={age}
                        checked={isSelected}
                        onChange={() => {
                          const current = field.value || [];
                          const newValue = isSelected
                            ? current.filter((a: number) => a !== age)
                            : [...current, age].sort((a: number, b: number) => a - b);
                          field.onChange(newValue);
                        }}
                        disabled={isLoading}
                        className="visually-hidden"
                      />
                      <span className="fw-medium">{age} ani</span>
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        />

        {errors.ageGroups && <p className="mt-2 small text-danger">{errors.ageGroups.message}</p>}
      </div>

      {/* Experience Levels */}
      <div className="mb-4">
        <label className="d-block small fw-medium text-body mb-3">
          Niveluri de experiență <span className="text-danger">*</span>
        </label>
        <p className="text-xs text-secondary mb-3">
          Selectează nivelurile de experiență oferite de club
        </p>

        <Controller
          name="experienceLevels"
          control={control}
          render={({ field }) => (
            <div className="row g-3">
              {EXPERIENCE_LEVELS.map((level) => {
                const isSelected =
                  field.value?.includes(level.value as "beginner" | "intermediate" | "advanced") ||
                  false;
                return (
                  <div key={level.value} className="col-12 col-sm-4">
                    <label
                      className={cn(
                        "d-flex align-items-center justify-content-center p-4 border-2 rounded cursor-pointer",
                        isSelected
                          ? "border-yuvoo-primary bg-yuvoo-primary-light text-yuvoo-primary"
                          : "border-secondary bg-white text-body border-secondary-hover",
                        isLoading && "opacity-50"
                      )}
                      style={{
                        cursor: isLoading ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        if (!isLoading && !isSelected) {
                          e.currentTarget.style.borderColor = "var(--bs-border-color)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLoading && !isSelected) {
                          e.currentTarget.style.borderColor = "";
                        }
                      }}
                    >
                      <input
                        type="checkbox"
                        value={level.value}
                        checked={isSelected}
                        onChange={() => {
                          const current = field.value || [];
                          const levelValue = level.value as
                            | "beginner"
                            | "intermediate"
                            | "advanced";
                          const newValue = isSelected
                            ? current.filter((l: string) => l !== levelValue)
                            : [...current, levelValue];
                          field.onChange(newValue);
                        }}
                        disabled={isLoading}
                        className="visually-hidden"
                      />
                      <span className="fw-medium">{level.label}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        />

        {errors.experienceLevels && (
          <p className="mt-2 small text-danger">{errors.experienceLevels.message}</p>
        )}
      </div>

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
