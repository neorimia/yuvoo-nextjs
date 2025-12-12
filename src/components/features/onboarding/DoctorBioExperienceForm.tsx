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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4 sm:px-0">
      {/* Server error */}
      <ServerErrorAlert error={serverError} />

      {/* Bio */}
      <div>
        <label
          htmlFor="bio"
          className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
        >
          Bio profesional <span className="text-red-500">*</span>
          <InfoTooltip
            content="Descrie experiența ta profesională, abordarea ta în lucrul cu copiii și de ce ești pasionat de medicina sportivă pediatrică. Un bio complet ajută părinții să te cunoască mai bine."
            size="sm"
          />
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Descrie experiența ta în lucrul cu copiii și sportul pediatric
        </p>
        <textarea
          id="bio"
          rows={8}
          {...register("bio")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent resize-y ${
            errors.bio ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Descrie experiența ta profesională, abordarea ta în lucrul cu copiii, specializările tale și de ce ești pasionat de medicina sportivă pediatrică..."
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">Minim 100 caractere, maxim 2000 caractere</p>
          <p
            className={`text-xs ${
              bioLength < 100 ? "text-red-500" : bioLength > 2000 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {bioLength} / 2000
          </p>
        </div>
        {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>}
      </div>

      {/* Years of Experience */}
      <div>
        <label
          htmlFor="yearsOfExperience"
          className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
        >
          Ani de experiență <span className="text-red-500">*</span>
          <InfoTooltip
            content="Numărul de ani de experiență în practica medicală. Această informație ajută părinții să înțeleagă nivelul tău de experiență."
            size="sm"
          />
        </label>
        <input
          id="yearsOfExperience"
          type="number"
          min="1"
          max="50"
          {...register("yearsOfExperience", { valueAsNumber: true })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.yearsOfExperience ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ex: 5"
        />
        {errors.yearsOfExperience && (
          <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience.message}</p>
        )}
      </div>

      {/* Secondary Specialties (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specializări secundare (opțional)
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Selectează specializări suplimentare dacă ai experiență în alte domenii
        </p>
        <div className="space-y-2">
          {SECONDARY_SPECIALTIES.map((specialty) => (
            <label
              key={specialty.value}
              className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedSecondarySpecialties.includes(specialty.value)}
                onChange={() => toggleSecondarySpecialty(specialty.value)}
                className="w-4 h-4 text-[#00BBAE] border-gray-300 rounded focus:ring-[#00BBAE]"
              />
              <span className="text-sm text-gray-700">{specialty.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          Limbi vorbite <span className="text-red-500">*</span>
          <InfoTooltip
            content="Selectează toate limbile în care poți comunica confortabil cu părinții. Aceasta ajută părinții să te găsească și să știe că pot comunica cu tine în limba lor preferată."
            size="sm"
          />
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Selectează cel puțin o limbă în care poți comunica cu părinții
        </p>

        {/* Common languages */}
        <div className="space-y-2 mb-3">
          {COMMON_LANGUAGES.map((language) => (
            <label
              key={language}
              className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedLanguages.includes(language)}
                onChange={() => toggleLanguage(language)}
                className="w-4 h-4 text-[#00BBAE] border-gray-300 rounded focus:ring-[#00BBAE]"
              />
              <span className="text-sm text-gray-700">{language}</span>
            </label>
          ))}
        </div>

        {/* Custom language input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
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
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent"
          />
          <button
            type="button"
            onClick={addCustomLanguage}
            className="px-4 py-2 bg-[#00BBAE] text-white rounded-lg hover:bg-[#00998d] transition-colors whitespace-nowrap"
          >
            Adaugă
          </button>
        </div>

        {/* Selected languages display */}
        {selectedLanguages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedLanguages.map((language) => (
              <span
                key={language}
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#EBFFFE] text-gray-700 rounded-md text-sm"
              >
                {language}
                <button
                  type="button"
                  onClick={() => toggleLanguage(language)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {errors.languages && (
          <p className="mt-1 text-sm text-red-600">{errors.languages.message}</p>
        )}
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={routes.onboarding.doctor.basicInfo}
        nextHref={null}
        nextText="Continuă"
        isLoading={isLoading}
        className="mt-8"
      />
    </form>
  );
}
