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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { createClubOnboarding } from "@/app/actions/onboarding";
import { clubBasicInfoSchema, type ClubBasicInfoInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { SPORT_TYPES } from "@/lib/utils/constants";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { Alert, AlertDescription } from "@/components/UI/alert";
import { Input } from "@/components/UI/input";
import { Textarea } from "@/components/UI/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { cn } from "@/lib/utils";

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
    control,
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
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      {/* Club Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nume club <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          {...register("name")}
          disabled={isLoading}
          className={cn("w-full h-11", errors.name && "border-destructive")}
          placeholder="ex. Fotbal Club Junior București"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Sport Type */}
      <div>
        <label htmlFor="sportType" className="block text-sm font-medium text-gray-700 mb-2">
          Sport principal <span className="text-red-500">*</span>
        </label>
        <Controller
          name="sportType"
          control={control}
          render={({ field }) => (
            <Select value={field.value || ""} onValueChange={field.onChange} disabled={isLoading}>
              <SelectTrigger
                id="sportType"
                className={cn("w-full h-11", errors.sportType && "border-destructive")}
                aria-invalid={errors.sportType ? "true" : "false"}
                aria-describedby={errors.sportType ? "sportType-error" : undefined}
              >
                <SelectValue placeholder="Selectează sportul principal" />
              </SelectTrigger>
              <SelectContent>
                {SPORT_TYPES.map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport.charAt(0).toUpperCase() + sport.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.sportType && (
          <p id="sportType-error" className="mt-2 text-sm text-destructive">
            {errors.sportType.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Descriere club <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="description"
          {...register("description")}
          disabled={isLoading}
          rows={6}
          maxLength={1000}
          className={cn(
            "w-full min-h-[120px] resize-y",
            errors.description && "border-destructive"
          )}
          placeholder="Descrie clubul tău, programele oferite, facilitățile și experiența antrenorilor. Minim 50 caractere."
          aria-invalid={errors.description ? "true" : "false"}
          aria-describedby={errors.description ? "description-error" : "description-help"}
        />
        <div className="mt-2 flex items-center justify-between">
          <div>
            {errors.description ? (
              <p id="description-error" className="text-sm text-destructive">
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
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Select value={field.value || ""} onValueChange={field.onChange} disabled={isLoading}>
              <SelectTrigger
                id="city"
                className={cn(
                  "w-full h-11 border-border rounded-md focus:ring-0 focus:ring-offset-0",
                  errors.city && "border-destructive"
                )}
                aria-invalid={errors.city ? "true" : "false"}
                aria-describedby={errors.city ? "city-error" : undefined}
              >
                <SelectValue placeholder="Selectează orașul" />
              </SelectTrigger>
              <SelectContent>
                {ROMANIAN_CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.city && (
          <p id="city-error" className="mt-2 text-sm text-destructive">
            {errors.city.message}
          </p>
        )}
      </div>

      {/* District (Optional) */}
      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
          District/Sector <span className="text-gray-500 text-xs">(opțional)</span>
        </label>
        <Input
          id="district"
          type="text"
          {...register("district")}
          disabled={isLoading}
          className={cn("w-full h-11", errors.district && "border-destructive")}
          placeholder="ex. Sector 1, Sector 2, etc."
          aria-invalid={errors.district ? "true" : "false"}
          aria-describedby={errors.district ? "district-error" : undefined}
        />
        {errors.district && (
          <p id="district-error" className="mt-2 text-sm text-destructive">
            {errors.district.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Adresă completă <span className="text-red-500">*</span>
        </label>
        <Input
          id="address"
          type="text"
          {...register("address")}
          disabled={isLoading}
          className={cn("w-full h-11", errors.address && "border-destructive")}
          placeholder="ex. Strada Sportului 10, Sector 1"
          aria-invalid={errors.address ? "true" : "false"}
          aria-describedby={errors.address ? "address-error" : undefined}
        />
        {errors.address && (
          <p id="address-error" className="mt-2 text-sm text-destructive">
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
      <div className="mt-6 border-t border-gray-200">
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
