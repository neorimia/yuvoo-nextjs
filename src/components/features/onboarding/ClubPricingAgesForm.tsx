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
    <form id="club-pricing-ages-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Server error message */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-red-500 text-xl">⚠️</span>
            <div>
              <h4 className="font-semibold text-red-900 mb-1">Eroare</h4>
              <p className="text-sm text-red-700">{serverError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Builder */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Prețuri <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={addPricingOption}
            disabled={isLoading}
            className="
              inline-flex items-center gap-2 px-3 py-1.5
              text-sm font-medium text-[#00BBAE]
              bg-[#EBFFFE] border border-[#00BBAE]/20 rounded-lg
              hover:bg-[#00BBAE] hover:text-white
              focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <Plus className="w-4 h-4" />
            <span>Adaugă preț</span>
          </button>
        </div>

        {pricingFields.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Nu ai adăugat niciun preț.</p>
            <p className="text-xs text-gray-500">
              Apasă pe &ldquo;Adaugă preț&rdquo; pentru a adăuga opțiunile de preț.
            </p>
          </div>
        )}

        {pricingFields.length > 0 && (
          <div className="space-y-3">
            {pricingFields.map((field, index) => (
              <div
                key={field.id}
                className="
                  bg-white border border-gray-200 rounded-lg p-4
                  flex items-start gap-4
                "
              >
                {/* Pricing Type */}
                <div className="flex-1">
                  <label
                    htmlFor={`pricing.${index}.type`}
                    className="block text-xs font-medium text-gray-600 mb-1.5"
                  >
                    Tip abonament
                  </label>
                  <select
                    {...register(`pricing.${index}.type` as const)}
                    disabled={isLoading}
                    className={`
                      w-full px-3 py-2 border rounded-lg text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
                      ${errors.pricing?.[index]?.type ? "border-red-500" : "border-gray-300"}
                      ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                    `}
                  >
                    {PRICING_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.pricing?.[index]?.type && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.pricing[index]?.type?.message}
                    </p>
                  )}
                </div>

                {/* Amount */}
                <div className="flex-1">
                  <label
                    htmlFor={`pricing.${index}.amount`}
                    className="block text-xs font-medium text-gray-600 mb-1.5"
                  >
                    Preț (RON)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10000"
                    {...register(`pricing.${index}.amount` as const, {
                      valueAsNumber: true,
                    })}
                    disabled={isLoading}
                    className={`
                      w-full px-3 py-2 border rounded-lg text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
                      ${errors.pricing?.[index]?.amount ? "border-red-500" : "border-gray-300"}
                      ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                    `}
                    placeholder="ex: 200"
                    aria-invalid={errors.pricing?.[index]?.amount ? "true" : "false"}
                  />
                  {errors.pricing?.[index]?.amount && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.pricing[index]?.amount?.message}
                    </p>
                  )}
                </div>

                {/* Remove Button */}
                <div className="shrink-0 pt-6">
                  <button
                    type="button"
                    onClick={() => removePricingOption(index)}
                    disabled={isLoading}
                    className="
                      p-2 text-gray-400 hover:text-red-600
                      hover:bg-red-50 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                      transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
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
          <p className="mt-2 text-sm text-red-600">{errors.pricing.message}</p>
        )}
      </div>

      {/* Age Groups */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Grupe de vârstă <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Selectează grupele de vârstă acceptate de club (4-14 ani)
        </p>

        <Controller
          name="ageGroups"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {AGE_GROUPS.map((age) => {
                const isSelected = field.value?.includes(age) || false;
                return (
                  <label
                    key={age}
                    className={`
                      flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer
                      transition-all duration-200
                      ${
                        isSelected
                          ? "border-[#00BBAE] bg-[#EBFFFE] text-[#00BBAE]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }
                      ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                    `}
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
                      className="sr-only"
                    />
                    <span className="font-medium">{age} ani</span>
                  </label>
                );
              })}
            </div>
          )}
        />

        {errors.ageGroups && (
          <p className="mt-2 text-sm text-red-600">{errors.ageGroups.message}</p>
        )}
      </div>

      {/* Experience Levels */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Niveluri de experiență <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Selectează nivelurile de experiență oferite de club
        </p>

        <Controller
          name="experienceLevels"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EXPERIENCE_LEVELS.map((level) => {
                const isSelected =
                  field.value?.includes(level.value as "beginner" | "intermediate" | "advanced") ||
                  false;
                return (
                  <label
                    key={level.value}
                    className={`
                      flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer
                      transition-all duration-200
                      ${
                        isSelected
                          ? "border-[#00BBAE] bg-[#EBFFFE] text-[#00BBAE]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }
                      ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    <input
                      type="checkbox"
                      value={level.value}
                      checked={isSelected}
                      onChange={() => {
                        const current = field.value || [];
                        const levelValue = level.value as "beginner" | "intermediate" | "advanced";
                        const newValue = isSelected
                          ? current.filter((l: string) => l !== levelValue)
                          : [...current, levelValue];
                        field.onChange(newValue);
                      }}
                      disabled={isLoading}
                      className="sr-only"
                    />
                    <span className="font-medium">{level.label}</span>
                  </label>
                );
              })}
            </div>
          )}
        />

        {errors.experienceLevels && (
          <p className="mt-2 text-sm text-red-600">{errors.experienceLevels.message}</p>
        )}
      </div>

      {/* Info box */}
      <div className="bg-[#EBFFFE] border border-[#00BBAE]/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              De ce avem nevoie de aceste informații?
            </h3>
            <p className="text-sm text-gray-700">
              Aceste informații vor ajuta părinții să găsească clubul potrivit pentru copilul lor.
              Prețurile, grupele de vârstă și nivelurile de experiență vor fi afișate în profilul
              clubului tău. Poți actualiza aceste detalii oricând din dashboard-ul tău.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-6 border-t border-gray-200">
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
