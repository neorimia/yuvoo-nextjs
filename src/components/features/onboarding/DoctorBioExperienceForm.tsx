/**
 * DoctorBioExperienceForm Component
 *
 * Client component for adding doctor bio and experience during doctor onboarding.
 * Uses React Hook Form with Zod validation.
 *
 * Features:
 * - Romanian labels and error messages
 * - Bio textarea with character counter (100-2000 characters)
 * - Years of experience input (1-50)
 * - Languages multi-select (required, minimum 1)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useEffect } from "react";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorBioExperience } from "@/app/actions/onboarding";
import { doctorBioExperienceSchema, type DoctorBioExperienceInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { CharacterCounterTextarea, TagInputField } from "./components";
import { BootstrapInput } from "@/components/UI/bootstrap-index";
import { useOnboardingForm } from "./hooks/useOnboardingForm";
import { saveFormData, getFormData } from "./hooks/useOnboardingLocalStorage";

// Common languages in Romania
const COMMON_LANGUAGES = [
  "Română",
  "Engleză",
  "Maghiară",
  "Germană",
  "Franceză",
  "Italiană",
  "Spaniolă",
] as const;

export function DoctorBioExperienceForm() {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DoctorBioExperienceInput>({
    resolver: zodResolver(doctorBioExperienceSchema),
    defaultValues: {
      languages: [],
    },
  });

  const role = "doctor";
  const stepNumber = 3;

  // Restore form data from localStorage on mount
  useEffect(() => {
    const saved = getFormData<DoctorBioExperienceInput>(role, stepNumber);
    if (saved) {
      // Restore all fields from saved data
      Object.keys(saved).forEach((key) => {
        const fieldKey = key as keyof DoctorBioExperienceInput;
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

  const { handleSubmit, isLoading, serverError } = useOnboardingForm<DoctorBioExperienceInput>({
    onSubmitAction: updateDoctorBioExperience,
    onSuccessRoute: routes.onboarding.doctor.locationContact,
    role,
    stepNumber,
  });

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)} className="px-3 px-sm-0">
      {/* Server error */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Bio */}
      <CharacterCounterTextarea
        label="Bio profesional"
        name="bio"
        register={register}
        error={errors.bio}
        minChars={100}
        maxChars={2000}
        rows={8}
        placeholder="Descrie experiența ta profesională, abordarea ta în lucrul cu copiii, specializările tale și de ce ești pasionat de medicina sportivă pediatrică..."
        required
        helpText="Descrie experiența ta profesională, abordarea ta în lucrul cu copiii și de ce ești pasionat de medicina sportivă pediatrică. Un bio complet ajută părinții să te cunoască mai bine."
        description="Descrie experiența ta în lucrul cu copiii și sportul pediatric"
        isLoading={isLoading}
        currentValue={watch("bio")}
      />

      {/* Years of Experience */}
      <div className="mb-4">
        <label
          htmlFor="yearsOfExperience"
          className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
        >
          Ani de experiență <span className="text-danger">*</span>
          <InfoTooltip
            content="Numărul de ani de experiență în practica medicală. Această informație ajută părinții să înțeleagă nivelul tău de experiență."
            size="sm"
          />
        </label>
        <BootstrapInput
          id="yearsOfExperience"
          type="number"
          min="1"
          max="50"
          {...register("yearsOfExperience", { valueAsNumber: true })}
          error={!!errors.yearsOfExperience}
          className="w-100"
          placeholder="Ex: 5"
        />
        {errors.yearsOfExperience && (
          <p className="mt-1 small text-danger">{errors.yearsOfExperience.message}</p>
        )}
      </div>

      {/* Languages */}
      <TagInputField
        label="Limbi vorbite"
        name="languages"
        setValue={setValue}
        currentValue={watch("languages")}
        error={errors.languages as FieldError | undefined}
        quickAddOptions={COMMON_LANGUAGES}
        placeholder="Adaugă altă limbă"
        required
        helpText="Selectează toate limbile în care poți comunica confortabil cu părinții. Aceasta ajută părinții să te găsească și să știe că pot comunica cu tine în limba lor preferată."
        description="Selectează cel puțin o limbă în care poți comunica cu părinții"
        isLoading={isLoading}
      />

      {/* Navigation */}
      <OnboardingNavigation
        backHref={routes.onboarding.doctor.basicInfo}
        nextHref={null}
        nextText="Continuă"
        isLoading={isLoading}
        className="mt-5"
      />
    </form>
  );
}
