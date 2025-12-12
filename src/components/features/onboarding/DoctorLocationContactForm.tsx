/**
 * DoctorLocationContactForm Component
 *
 * Client component for adding doctor location and contact information during doctor onboarding.
 * Uses React Hook Form with Zod validation.
 *
 * Features:
 * - Romanian labels and error messages
 * - City dropdown (30 major Romanian cities)
 * - District/Sector input (optional)
 * - Address input (required, 10-300 characters)
 * - Phone input with Romanian format normalization
 * - Email input
 * - Website input (optional)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorLocationContact } from "@/app/actions/onboarding";
import {
  doctorLocationContactSchema,
  type DoctorLocationContactInput,
} from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { normalizePhoneNumber } from "@/lib/utils";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { BootstrapInput, BootstrapSelect } from "@/components/UI/bootstrap-index";
import { useOnboardingForm } from "./hooks/useOnboardingForm";

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

export function DoctorLocationContactForm() {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm<DoctorLocationContactInput>({
    resolver: zodResolver(doctorLocationContactSchema),
    defaultValues: {
      city: "",
      district: "",
      address: "",
      phone: "",
      email: "",
      website: "",
    },
  });

  const { handleSubmit, isLoading, serverError } = useOnboardingForm<DoctorLocationContactInput>({
    onSubmitAction: updateDoctorLocationContact,
    onSuccessRoute: routes.onboarding.doctor.photo,
    transformData: (data) => ({
      ...data,
      phone: normalizePhoneNumber(data.phone),
    }),
  });

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)} className="px-3 px-sm-0">
      {/* Server error */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* City */}
      <div className="mb-4">
        <label htmlFor="city" className="d-block small fw-medium text-body mb-2">
          Oraș <span className="text-danger">*</span>
        </label>
        <BootstrapSelect
          id="city"
          {...register("city")}
          error={!!errors.city}
          className="w-100"
          options={[
            { value: "", label: "Selectează orașul" },
            ...ROMANIAN_CITIES.map((city) => ({ value: city, label: city })),
          ]}
        />
        {errors.city && <p className="mt-1 small text-danger">{errors.city.message}</p>}
      </div>

      {/* District/Sector (Optional) */}
      <div className="mb-4">
        <label htmlFor="district" className="d-block small fw-medium text-body mb-2">
          District/Sector <span className="text-secondary text-xs">(opțional)</span>
        </label>
        <BootstrapInput
          id="district"
          type="text"
          {...register("district")}
          error={!!errors.district}
          className="w-100"
          placeholder="Ex: Sector 1, Sector 2, etc."
        />
        {errors.district && <p className="mt-1 small text-danger">{errors.district.message}</p>}
      </div>

      {/* Address */}
      <div className="mb-4">
        <label htmlFor="address" className="d-block small fw-medium text-body mb-2">
          Adresă cabinet <span className="text-danger">*</span>
        </label>
        <BootstrapInput
          id="address"
          type="text"
          {...register("address")}
          error={!!errors.address}
          className="w-100"
          placeholder="Ex: Strada Exemplu, Nr. 10, Bloc A, Scara 1, Etaj 2, Ap. 5"
        />
        <p className="mt-1 text-xs text-secondary">Minim 10 caractere</p>
        {errors.address && <p className="mt-1 small text-danger">{errors.address.message}</p>}
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
        >
          Telefon cabinet <span className="text-danger">*</span>
          <InfoTooltip
            content="Numărul de telefon al cabinetului tău în format internațional (+40XXXXXXXXX). Acesta va fi afișat în profilul tău pentru ca părinții să te poată contacta."
            size="sm"
          />
        </label>
        <BootstrapInput
          id="phone"
          type="tel"
          {...register("phone")}
          error={!!errors.phone}
          className="w-100"
          placeholder="+40721234567"
        />
        <p className="mt-1 text-xs text-secondary">Format: +40XXXXXXXXX (ex: +40721234567)</p>
        {errors.phone && <p className="mt-1 small text-danger">{errors.phone.message}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="d-flex align-items-center gap-2 small fw-medium text-body mb-2"
        >
          Email profesional <span className="text-danger">*</span>
          <InfoTooltip
            content="Adresa de email profesională a cabinetului. Părinții vor putea să te contacteze prin email pentru programări sau întrebări."
            size="sm"
          />
        </label>
        <BootstrapInput
          id="email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          className="w-100"
          placeholder="contact@cabinet.ro"
        />
        {errors.email && <p className="mt-1 small text-danger">{errors.email.message}</p>}
      </div>

      {/* Website (Optional) */}
      <div className="mb-4">
        <label htmlFor="website" className="d-block small fw-medium text-body mb-2">
          Website <span className="text-secondary text-xs">(opțional)</span>
        </label>
        <BootstrapInput
          id="website"
          type="url"
          {...register("website")}
          error={!!errors.website}
          className="w-100"
          placeholder="https://www.cabinet.ro"
        />
        {errors.website && <p className="mt-1 small text-danger">{errors.website.message}</p>}
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={routes.onboarding.doctor.bioExperience}
        nextHref={null}
        nextText="Continuă"
        isLoading={isLoading}
        className="mt-5"
      />
    </form>
  );
}
