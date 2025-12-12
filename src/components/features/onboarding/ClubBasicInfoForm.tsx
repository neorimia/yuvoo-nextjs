/**
 * ClubBasicInfoForm Component
 *
 * Client component for adding club basic information during club admin onboarding.
 * Uses React Hook Form with Zod validation.
 *
 * Features:
 * - Romanian labels and error messages
 * - Sport type selection
 * - City and district selection
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClubOnboarding } from "@/app/actions/onboarding";
import { clubBasicInfoSchema, type ClubBasicInfoInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { SPORT_TYPES } from "@/lib/utils/constants";
import { OnboardingNavigation } from "./OnboardingNavigation";

// Romanian cities (major cities)
const ROMANIAN_CITIES = [
  "București",
  "Cluj-Napoca",
  "Timișoara",
  "Iași",
  "Constanța",
  "Craiova",
  "Brașov",
  "Galați",
  "Ploiești",
  "Oradea",
  "Brăila",
  "Arad",
  "Pitești",
  "Sibiu",
  "Bacău",
  "Târgu Mureș",
  "Baia Mare",
  "Buzău",
  "Satu Mare",
  "Botoșani",
  "Râmnicu Vâlcea",
  "Suceava",
  "Piatra Neamț",
  "Drobeta-Turnu Severin",
  "Focșani",
  "Târgu Jiu",
  "Tulcea",
  "Târgoviște",
  "Reșița",
  "Călărași",
] as const;

export function ClubBasicInfoForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ClubBasicInfoInput>({
    resolver: zodResolver(clubBasicInfoSchema),
  });

  const description = watch("description");
  const descriptionLength = description?.length || 0;

  const onSubmit = async (data: ClubBasicInfoInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await createClubOnboarding(data);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.club.contactSchedule);
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
    <form id="club-basic-info-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      {/* Club Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nume club <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            ${errors.name ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          placeholder="ex. Fotbal Club Junior București"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Sport Type */}
      <div>
        <label htmlFor="sportType" className="block text-sm font-medium text-gray-700 mb-2">
          Sport principal <span className="text-red-500">*</span>
        </label>
        <select
          id="sportType"
          {...register("sportType")}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            ${errors.sportType ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          aria-invalid={errors.sportType ? "true" : "false"}
          aria-describedby={errors.sportType ? "sportType-error" : undefined}
        >
          <option value="">Selectează sportul principal</option>
          {SPORT_TYPES.map((sport) => (
            <option key={sport} value={sport}>
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </option>
          ))}
        </select>
        {errors.sportType && (
          <p id="sportType-error" className="mt-2 text-sm text-red-600">
            {errors.sportType.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Descriere club <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          {...register("description")}
          disabled={isLoading}
          rows={6}
          maxLength={1000}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            resize-y
            ${errors.description ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          placeholder="Descrie clubul tău, programele oferite, facilitățile și experiența antrenorilor. Minim 50 caractere."
          aria-invalid={errors.description ? "true" : "false"}
          aria-describedby={errors.description ? "description-error" : "description-help"}
        />
        <div className="mt-2 flex items-center justify-between">
          <div>
            {errors.description ? (
              <p id="description-error" className="text-sm text-red-600">
                {errors.description.message}
              </p>
            ) : (
              <p id="description-help" className="text-xs text-gray-500">
                Minim 50 caractere, maxim 1000 caractere
              </p>
            )}
          </div>
          <p className="text-xs text-gray-500">{descriptionLength}/1000 caractere</p>
        </div>
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
          Oraș <span className="text-red-500">*</span>
        </label>
        <select
          id="city"
          {...register("city")}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            ${errors.city ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          aria-invalid={errors.city ? "true" : "false"}
          aria-describedby={errors.city ? "city-error" : undefined}
        >
          <option value="">Selectează orașul</option>
          {ROMANIAN_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && (
          <p id="city-error" className="mt-2 text-sm text-red-600">
            {errors.city.message}
          </p>
        )}
      </div>

      {/* District (Optional) */}
      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
          District/Sector <span className="text-gray-500 text-xs">(opțional)</span>
        </label>
        <input
          id="district"
          type="text"
          {...register("district")}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            ${errors.district ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          placeholder="ex. Sector 1, Sector 2, etc."
          aria-invalid={errors.district ? "true" : "false"}
          aria-describedby={errors.district ? "district-error" : undefined}
        />
        {errors.district && (
          <p id="district-error" className="mt-2 text-sm text-red-600">
            {errors.district.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Adresă completă <span className="text-red-500">*</span>
        </label>
        <input
          id="address"
          type="text"
          {...register("address")}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            ${errors.address ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          placeholder="ex. Strada Sportului 10, Sector 1"
          aria-invalid={errors.address ? "true" : "false"}
          aria-describedby={errors.address ? "address-error" : undefined}
        />
        {errors.address && (
          <p id="address-error" className="mt-2 text-sm text-red-600">
            {errors.address.message}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          Adaugă adresa completă a clubului pentru ca părinții să te poată găsi ușor.
        </p>
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
              Aceste informații vor fi afișate în profilul clubului tău și vor ajuta părinții să te
              găsească și să înțeleagă ce oferi. Poți actualiza aceste detalii oricând din
              dashboard-ul tău.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-6 border-t border-gray-200">
        <OnboardingNavigation
          backHref={routes.onboarding.club.welcome}
          nextHref={null} // null means submit button
          formId="club-basic-info-form"
          isLoading={isLoading}
          isNextDisabled={isLoading}
          nextText="Continuă"
        />
      </div>
    </form>
  );
}
