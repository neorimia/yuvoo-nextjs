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

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data: DoctorLocationContactInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Normalize phone number (remove spaces, ensure +40 format)
      const normalizedData = {
        ...data,
        phone: normalizePhoneNumber(data.phone),
      };

      const result = await updateDoctorLocationContact(normalizedData);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.doctor.photo);
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Server error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
          Oraș <span className="text-red-500">*</span>
        </label>
        <select
          id="city"
          {...register("city")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.city ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Selectează orașul</option>
          {ROMANIAN_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
      </div>

      {/* District/Sector (Optional) */}
      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
          District/Sector <span className="text-gray-500 text-xs">(opțional)</span>
        </label>
        <input
          id="district"
          type="text"
          {...register("district")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.district ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ex: Sector 1, Sector 2, etc."
        />
        {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Adresă cabinet <span className="text-red-500">*</span>
        </label>
        <input
          id="address"
          type="text"
          {...register("address")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Ex: Strada Exemplu, Nr. 10, Bloc A, Scara 1, Etaj 2, Ap. 5"
        />
        <p className="mt-1 text-xs text-gray-500">Minim 10 caractere</p>
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Telefon cabinet <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="+40721234567"
        />
        <p className="mt-1 text-xs text-gray-500">Format: +40XXXXXXXXX (ex: +40721234567)</p>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email profesional <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="contact@cabinet.ro"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      {/* Website (Optional) */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
          Website <span className="text-gray-500 text-xs">(opțional)</span>
        </label>
        <input
          id="website"
          type="url"
          {...register("website")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent ${
            errors.website ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="https://www.cabinet.ro"
        />
        {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>}
      </div>

      {/* Navigation */}
      <OnboardingNavigation
        backHref={routes.onboarding.doctor.bioExperience}
        nextHref={null}
        nextText="Continuă"
        isLoading={isLoading}
        className="mt-8"
      />
    </form>
  );
}
