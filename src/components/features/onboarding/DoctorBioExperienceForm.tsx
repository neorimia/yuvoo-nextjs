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
 * - Secondary specialties multi-select (optional)
 * - Languages multi-select (required, minimum 1)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorBioExperience } from "@/app/actions/onboarding";
import { doctorBioExperienceSchema, type DoctorBioExperienceInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import {
  BootstrapInput,
  BootstrapTextarea,
  BootstrapButton,
} from "@/components/UI/bootstrap-index";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

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

// Secondary specialties (same as primary specialties for now, can be expanded)
const SECONDARY_SPECIALTIES = [
  { value: "orthopedist", label: "Ortopedie pediatrică" },
  { value: "nutritionist", label: "Nutriție pediatrică" },
  { value: "psychologist", label: "Psihologie sportivă" },
  { value: "sports_medicine", label: "Medicină sportivă pediatrică" },
  { value: "cardiology", label: "Cardiologie pediatrică" },
  { value: "physiotherapy", label: "Fizioterapie pediatrică" },
] as const;

export function DoctorBioExperienceForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSecondarySpecialties, setSelectedSecondarySpecialties] = useState<string[]>([]);
  const [customLanguage, setCustomLanguage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DoctorBioExperienceInput>({
    resolver: zodResolver(doctorBioExperienceSchema),
    defaultValues: {
      languages: [],
      secondarySpecialties: [],
    },
  });

  const bio = watch("bio");
  const bioLength = bio?.length || 0;

  // Sync languages with form state
  useEffect(() => {
    setValue("languages", selectedLanguages, { shouldValidate: true });
  }, [selectedLanguages, setValue]);

  // Sync secondary specialties with form state
  useEffect(() => {
    setValue("secondarySpecialties", selectedSecondarySpecialties, { shouldValidate: true });
  }, [selectedSecondarySpecialties, setValue]);

  // Toggle language selection
  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  // Add custom language
  const addCustomLanguage = () => {
    if (customLanguage.trim() && !selectedLanguages.includes(customLanguage.trim())) {
      setSelectedLanguages([...selectedLanguages, customLanguage.trim()]);
      setCustomLanguage("");
    }
  };

  // Toggle secondary specialty selection
  const toggleSecondarySpecialty = (specialty: string) => {
    if (selectedSecondarySpecialties.includes(specialty)) {
      setSelectedSecondarySpecialties(selectedSecondarySpecialties.filter((s) => s !== specialty));
    } else {
      setSelectedSecondarySpecialties([...selectedSecondarySpecialties, specialty]);
    }
  };

  const onSubmit = async (data: DoctorBioExperienceInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const formData: DoctorBioExperienceInput = {
        ...data,
        languages: selectedLanguages.length > 0 ? selectedLanguages : [],
        secondarySpecialties:
          selectedSecondarySpecialties.length > 0 ? selectedSecondarySpecialties : undefined,
      };

      const result = await updateDoctorBioExperience(formData);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.doctor.locationContact);
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

      {/* Bio */}
      <div className="mb-4">
        <label
          htmlFor="bio"
          className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
        >
          Bio profesional <span className="text-danger">*</span>
          <InfoTooltip
            content="Descrie experiența ta profesională, abordarea ta în lucrul cu copiii și de ce ești pasionat de medicina sportivă pediatrică. Un bio complet ajută părinții să te cunoască mai bine."
            size="sm"
          />
        </label>
        <p className="small text-secondary mb-2">
          Descrie experiența ta în lucrul cu copiii și sportul pediatric
        </p>
        <BootstrapTextarea
          id="bio"
          rows={8}
          {...register("bio")}
          error={!!errors.bio}
          className="w-100"
          style={{ resize: "vertical" }}
          placeholder="Descrie experiența ta profesională, abordarea ta în lucrul cu copiii, specializările tale și de ce ești pasionat de medicina sportivă pediatrică..."
        />
        <div className="d-flex justify-content-between align-items-center mt-1">
          <p className="text-xs text-secondary">Minim 100 caractere, maxim 2000 caractere</p>
          <p
            className={cn(
              "text-xs",
              bioLength < 100 || bioLength > 2000 ? "text-danger" : "text-secondary"
            )}
          >
            {bioLength} / 2000
          </p>
        </div>
        {errors.bio && <p className="mt-1 small text-danger">{errors.bio.message}</p>}
      </div>

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

      {/* Secondary Specialties (Optional) */}
      <div className="mb-4">
        <label className="d-block small fw-medium text-body mb-2">
          Specializări secundare (opțional)
        </label>
        <p className="small text-secondary mb-3">
          Selectează specializări suplimentare dacă ai experiență în alte domenii
        </p>
        <div className="mb-3">
          {SECONDARY_SPECIALTIES.map((specialty) => (
            <label
              key={specialty.value}
              className={cn(
                "d-flex align-items-center gap-3 p-3 border border-secondary rounded cursor-pointer",
                "text-secondary-hover"
              )}
              style={{
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bs-light)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              <input
                type="checkbox"
                checked={selectedSecondarySpecialties.includes(specialty.value)}
                onChange={() => toggleSecondarySpecialty(specialty.value)}
                className="form-check-input"
                style={{ width: "1rem", height: "1rem" }}
              />
              <span className="small text-body">{specialty.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-4">
        <label className="d-flex align-items-center gap-2 small fw-medium text-body mb-2">
          Limbi vorbite <span className="text-danger">*</span>
          <InfoTooltip
            content="Selectează toate limbile în care poți comunica confortabil cu părinții. Aceasta ajută părinții să te găsească și să știe că pot comunica cu tine în limba lor preferată."
            size="sm"
          />
        </label>
        <p className="small text-secondary mb-3">
          Selectează cel puțin o limbă în care poți comunica cu părinții
        </p>

        {/* Common languages */}
        <div className="mb-3">
          {COMMON_LANGUAGES.map((language) => (
            <label
              key={language}
              className={cn(
                "d-flex align-items-center gap-3 p-3 border border-secondary rounded cursor-pointer",
                "text-secondary-hover"
              )}
              style={{
                transition: "all 0.2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bs-light)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              <input
                type="checkbox"
                checked={selectedLanguages.includes(language)}
                onChange={() => toggleLanguage(language)}
                className="form-check-input"
                style={{ width: "1rem", height: "1rem" }}
              />
              <span className="small text-body">{language}</span>
            </label>
          ))}
        </div>

        {/* Custom language input */}
        <div className="d-flex flex-column flex-sm-row gap-2">
          <BootstrapInput
            type="text"
            value={customLanguage}
            onChange={(e) => setCustomLanguage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomLanguage();
              }
            }}
            placeholder="Adaugă altă limbă"
            className="flex-fill"
          />
          <BootstrapButton
            type="button"
            onClick={addCustomLanguage}
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

        {/* Selected languages display */}
        {selectedLanguages.length > 0 && (
          <div className="mt-3 d-flex flex-wrap gap-2">
            {selectedLanguages.map((language) => (
              <span
                key={language}
                className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-yuvoo-primary-light text-body rounded small"
              >
                {language}
                <button
                  type="button"
                  onClick={() => toggleLanguage(language)}
                  className="text-secondary text-danger-hover border-0 bg-transparent p-0"
                  style={{ transition: "color 0.2s ease-in-out" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}

        {errors.languages && <p className="mt-1 small text-danger">{errors.languages.message}</p>}
      </div>

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
