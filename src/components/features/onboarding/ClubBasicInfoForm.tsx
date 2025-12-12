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
import {
  BootstrapAlert,
  BootstrapInput,
  BootstrapTextarea,
  BootstrapSelect,
} from "@/components/UI/bootstrap-index";
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
    <form id="club-basic-info-form" onSubmit={handleSubmit(onSubmit)} className="mb-4">
      {/* Server error message */}
      {serverError && (
        <BootstrapAlert variant="danger" className="mb-4">
          <AlertCircle className="h-4 w-4 me-2" />
          {serverError}
        </BootstrapAlert>
      )}

      {/* Club Name */}
      <div className="mb-4">
        <label htmlFor="name" className="d-block small fw-medium text-body mb-2">
          Nume club <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="name"
          type="text"
          {...register("name")}
          disabled={isLoading}
          error={!!errors.name}
          className={cn("w-100")}
          style={{ height: "44px" }}
          placeholder="ex. Fotbal Club Junior București"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 small text-danger">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Sport Type */}
      <div className="mb-4">
        <label htmlFor="sportType" className="d-block small fw-medium text-body mb-2">
          Sport principal <span className="text-danger">*</span>
        </label>
        <Controller
          name="sportType"
          control={control}
          render={({ field }) => (
            <BootstrapSelect
              id="sportType"
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={isLoading}
              error={!!errors.sportType}
              className="w-100"
              style={{ height: "44px" }}
              options={[
                { value: "", label: "Selectează sportul principal" },
                ...SPORT_TYPES.map((sport) => ({
                  value: sport,
                  label: sport.charAt(0).toUpperCase() + sport.slice(1),
                })),
              ]}
              aria-invalid={errors.sportType ? "true" : "false"}
              aria-describedby={errors.sportType ? "sportType-error" : undefined}
            />
          )}
        />
        {errors.sportType && (
          <p id="sportType-error" className="mt-2 small text-danger">
            {errors.sportType.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="d-block small fw-medium text-body mb-2">
          Descriere club <span className="text-danger">*</span>
        </label>
        <BootstrapTextarea
          id="description"
          {...register("description")}
          disabled={isLoading}
          rows={6}
          maxLength={1000}
          error={!!errors.description}
          className="w-100"
          style={{ minHeight: "120px", resize: "vertical" }}
          placeholder="Descrie clubul tău, programele oferite, facilitățile și experiența antrenorilor. Minim 50 caractere."
          aria-invalid={errors.description ? "true" : "false"}
          aria-describedby={errors.description ? "description-error" : "description-help"}
        />
        <div className="mt-2 d-flex align-items-center justify-content-between">
          <div>
            {errors.description ? (
              <p id="description-error" className="small text-danger">
                {errors.description.message}
              </p>
            ) : (
              <p id="description-help" className="text-xs text-secondary">
                Minim 50 caractere, maxim 1000 caractere
              </p>
            )}
          </div>
          <p className="text-xs text-secondary">{descriptionLength}/1000 caractere</p>
        </div>
      </div>

      {/* City */}
      <div className="mb-4">
        <label htmlFor="city" className="d-block small fw-medium text-body mb-2">
          Oraș <span className="text-danger">*</span>
        </label>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <BootstrapSelect
              id="city"
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={isLoading}
              error={!!errors.city}
              className="w-100"
              style={{ height: "44px" }}
              options={[
                { value: "", label: "Selectează orașul" },
                ...ROMANIAN_CITIES.map((city) => ({
                  value: city,
                  label: city,
                })),
              ]}
              aria-invalid={errors.city ? "true" : "false"}
              aria-describedby={errors.city ? "city-error" : undefined}
            />
          )}
        />
        {errors.city && (
          <p id="city-error" className="mt-2 small text-danger">
            {errors.city.message}
          </p>
        )}
      </div>

      {/* District (Optional) */}
      <div className="mb-4">
        <label htmlFor="district" className="d-block small fw-medium text-body mb-2">
          District/Sector <span className="text-secondary small">(opțional)</span>
        </label>
        <BootstrapInput
          id="district"
          type="text"
          {...register("district")}
          disabled={isLoading}
          error={!!errors.district}
          className="w-100"
          style={{ height: "44px" }}
          placeholder="ex. Sector 1, Sector 2, etc."
          aria-invalid={errors.district ? "true" : "false"}
          aria-describedby={errors.district ? "district-error" : undefined}
        />
        {errors.district && (
          <p id="district-error" className="mt-2 small text-danger">
            {errors.district.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="mb-4">
        <label htmlFor="address" className="d-block small fw-medium text-body mb-2">
          Adresă completă <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="address"
          type="text"
          {...register("address")}
          disabled={isLoading}
          error={!!errors.address}
          className="w-100"
          style={{ height: "44px" }}
          placeholder="ex. Strada Sportului 10, Sector 1"
          aria-invalid={errors.address ? "true" : "false"}
          aria-describedby={errors.address ? "address-error" : undefined}
        />
        {errors.address && (
          <p id="address-error" className="mt-2 small text-danger">
            {errors.address.message}
          </p>
        )}
        <p className="mt-2 text-xs text-secondary">
          Adaugă adresa completă a clubului pentru ca părinții să te poată găsi ușor.
        </p>
      </div>

      {/* Info box */}
      <div
        className="bg-yuvoo-primary-light border rounded p-4 mb-4"
        style={{ borderColor: "rgba(0, 187, 174, 0.2)" }}
      >
        <div className="d-flex align-items-start gap-3">
          <span className="fs-4">ℹ️</span>
          <div>
            <h3 className="fw-semibold text-body mb-2">De ce avem nevoie de aceste informații?</h3>
            <p className="small text-body">
              Aceste informații vor fi afișate în profilul clubului tău și vor ajuta părinții să te
              găsească și să înțeleagă ce oferi. Poți actualiza aceste detalii oricând din
              dashboard-ul tău.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 border-top border-secondary">
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
