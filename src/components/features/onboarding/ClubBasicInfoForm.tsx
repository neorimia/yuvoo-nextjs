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

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { createClubOnboarding } from "@/app/actions/onboarding";
import { clubBasicInfoSchema, type ClubBasicInfoInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { SPORT_TYPES } from "@/lib/utils/constants";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { BootstrapAlert, BootstrapInput, BootstrapSelect } from "@/components/UI/bootstrap-index";
import { CharacterCounterTextarea } from "./components";
import { useOnboardingForm } from "./hooks/useOnboardingForm";
import { saveFormData, getFormData } from "./hooks/useOnboardingLocalStorage";

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
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    control,
    formState: { errors, touchedFields },
    watch,
    setValue,
  } = useForm<ClubBasicInfoInput>({
    resolver: zodResolver(clubBasicInfoSchema),
    mode: "onBlur", // Only validate on blur (after user leaves field)
    reValidateMode: "onChange", // Re-validate on change after first blur
  });

  const role = "club_admin";
  const stepNumber = 2;

  // Restore form data from localStorage on mount
  useEffect(() => {
    const saved = getFormData<ClubBasicInfoInput>(role, stepNumber);
    if (saved) {
      // Restore all fields from saved data
      Object.keys(saved).forEach((key) => {
        const fieldKey = key as keyof ClubBasicInfoInput;
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

  const { handleSubmit, isLoading, serverError } = useOnboardingForm<ClubBasicInfoInput>({
    onSubmitAction: createClubOnboarding,
    onSuccessRoute: routes.onboarding.club.contactSchedule,
    role,
    stepNumber,
  });

  return (
    <form
      id="club-basic-info-form"
      onSubmit={rhfHandleSubmit(handleSubmit)}
      className="bd-onboarding-form"
    >
      {/* Server error message */}
      {serverError && (
        <BootstrapAlert variant="danger" className="mb-4">
          <AlertCircle className="h-4 w-4 me-2" />
          {serverError}
        </BootstrapAlert>
      )}

      {/* Club Name */}
      <div className="bd-onboarding-form-group">
        <label htmlFor="name" className="bd-onboarding-form-label">
          Nume club <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="name"
          type="text"
          {...register("name")}
          disabled={isLoading}
          error={!!errors.name}
          className="w-100"
          placeholder="ex. Fotbal Club Junior București"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="bd-onboarding-form-error">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Sport Type */}
      <div className="bd-onboarding-form-group">
        <label htmlFor="sportType" className="bd-onboarding-form-label">
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
          <p id="sportType-error" className="bd-onboarding-form-error">
            {errors.sportType.message}
          </p>
        )}
      </div>

      {/* Description */}
      <CharacterCounterTextarea
        label="Descriere club"
        name="description"
        register={register}
        error={errors.description}
        touched={!!touchedFields.description}
        minChars={50}
        maxChars={1000}
        rows={6}
        placeholder="Descrie clubul tău, programele oferite, facilitățile și experiența antrenorilor. Minim 50 caractere."
        required
        isLoading={isLoading}
        currentValue={watch("description")}
      />

      {/* City */}
      <div className="bd-onboarding-form-group">
        <label htmlFor="city" className="bd-onboarding-form-label">
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
          <p id="city-error" className="bd-onboarding-form-error">
            {errors.city.message}
          </p>
        )}
      </div>

      {/* District (Optional) */}
      <div className="bd-onboarding-form-group">
        <label htmlFor="district" className="bd-onboarding-form-label">
          District/Sector <span className="text-secondary small">(opțional)</span>
        </label>
        <BootstrapInput
          id="district"
          type="text"
          {...register("district")}
          disabled={isLoading}
          error={!!errors.district}
          className="w-100"
          placeholder="ex. Sector 1, Sector 2, etc."
          aria-invalid={errors.district ? "true" : "false"}
          aria-describedby={errors.district ? "district-error" : undefined}
        />
        {errors.district && (
          <p id="district-error" className="bd-onboarding-form-error">
            {errors.district.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="bd-onboarding-form-group">
        <label htmlFor="address" className="bd-onboarding-form-label">
          Adresă completă <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="address"
          type="text"
          {...register("address")}
          disabled={isLoading}
          error={!!errors.address}
          className="w-100"
          placeholder="ex. Strada Sportului 10, Sector 1"
          aria-invalid={errors.address ? "true" : "false"}
          aria-describedby={errors.address ? "address-error" : undefined}
        />
        {errors.address && (
          <p id="address-error" className="bd-onboarding-form-error">
            {errors.address.message}
          </p>
        )}
        <p className="bd-onboarding-form-text">
          Adaugă adresa completă a clubului pentru ca părinții să te poată găsi ușor.
        </p>
      </div>

      {/* Info box */}
      <div className="bd-onboarding-form-info">
        <div className="d-flex align-items-start gap-3">
          <span className="bd-onboarding-form-info-icon">ℹ️</span>
          <div>
            <h3 className="bd-onboarding-form-info-title">
              De ce avem nevoie de aceste informații?
            </h3>
            <p className="bd-onboarding-form-info-text">
              Aceste informații vor fi afișate în profilul clubului tău și vor ajuta părinții să te
              găsească și să înțeleagă ce oferi. Poți actualiza aceste detalii oricând din
              dashboard-ul tău.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={routes.onboarding.club.welcome}
        nextHref={null} // null means submit button
        formId="club-basic-info-form"
        isLoading={isLoading}
        isNextDisabled={isLoading}
        nextText="Continuă"
      />
    </form>
  );
}
