/**
 * ClubContactScheduleForm Component
 *
 * Client component for adding club contact information and schedule during club admin onboarding.
 * Uses React Hook Form with Zod validation.
 *
 * Features:
 * - Romanian labels and error messages
 * - Phone number validation (Romanian format: +40XXXXXXXXX)
 * - Email validation
 * - Optional website URL
 * - Schedule builder (add/remove schedule entries)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClubContactSchedule } from "@/app/actions/onboarding";
import { clubContactScheduleSchema, type ClubContactScheduleInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { normalizePhoneNumber } from "@/lib/utils";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { X, Plus } from "lucide-react";

// Days of the week in Romanian
const DAYS_OF_WEEK = [
  { value: "luni", label: "Luni" },
  { value: "marti", label: "Marți" },
  { value: "miercuri", label: "Miercuri" },
  { value: "joi", label: "Joi" },
  { value: "vineri", label: "Vineri" },
  { value: "sambata", label: "Sâmbătă" },
  { value: "duminica", label: "Duminică" },
] as const;

export function ClubContactScheduleForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClubContactScheduleInput>({
    resolver: zodResolver(clubContactScheduleSchema),
    defaultValues: {
      phone: "",
      email: "",
      website: "",
      schedule: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

  const onSubmit = async (data: ClubContactScheduleInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      // Normalize phone number (remove spaces, ensure +40 format)
      const normalizedData = {
        ...data,
        phone: normalizePhoneNumber(data.phone),
      };

      const result = await updateClubContactSchedule(normalizedData);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.club.pricingAges);
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

  const addScheduleEntry = () => {
    append({ day: "", time: "" });
  };

  const removeScheduleEntry = (index: number) => {
    remove(index);
  };

  return (
    <form id="club-contact-schedule-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Telefon <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            ${errors.phone ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          placeholder="+40721234567"
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? "phone-error" : "phone-help"}
        />
        {errors.phone ? (
          <p id="phone-error" className="mt-2 text-sm text-red-600">
            {errors.phone.message}
          </p>
        ) : (
          <p id="phone-help" className="mt-2 text-xs text-gray-500">
            Format: +40XXXXXXXXX (ex: +40721234567)
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            ${errors.email ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          placeholder="contact@clubulmeu.ro"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
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
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            ${errors.website ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          placeholder="https://www.clubulmeu.ro"
          aria-invalid={errors.website ? "true" : "false"}
          aria-describedby={errors.website ? "website-error" : undefined}
        />
        {errors.website && (
          <p id="website-error" className="mt-2 text-sm text-red-600">
            {errors.website.message}
          </p>
        )}
      </div>

      {/* Schedule Builder */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Program antrenamente <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={addScheduleEntry}
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
            <span>Adaugă interval</span>
          </button>
        </div>

        {fields.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Nu ai adăugat niciun interval de antrenament.
            </p>
            <p className="text-xs text-gray-500">
              Apasă pe &ldquo;Adaugă interval&rdquo; pentru a adăuga programul clubului.
            </p>
          </div>
        )}

        {fields.length > 0 && (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="
                  bg-white border border-gray-200 rounded-lg p-4
                  flex items-start gap-4
                "
              >
                {/* Day Select */}
                <div className="flex-1">
                  <label
                    htmlFor={`schedule.${index}.day`}
                    className="block text-xs font-medium text-gray-600 mb-1.5"
                  >
                    Ziua
                  </label>
                  <select
                    {...register(`schedule.${index}.day` as const)}
                    disabled={isLoading}
                    className={`
                      w-full px-3 py-2 border rounded-lg text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
                      ${errors.schedule?.[index]?.day ? "border-red-500" : "border-gray-300"}
                      ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                    `}
                  >
                    <option value="">Selectează ziua</option>
                    {DAYS_OF_WEEK.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                  {errors.schedule?.[index]?.day && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.schedule[index]?.day?.message}
                    </p>
                  )}
                </div>

                {/* Time Input */}
                <div className="flex-1">
                  <label
                    htmlFor={`schedule.${index}.time`}
                    className="block text-xs font-medium text-gray-600 mb-1.5"
                  >
                    Interval orar
                  </label>
                  <input
                    type="text"
                    {...register(`schedule.${index}.time` as const)}
                    disabled={isLoading}
                    className={`
                      w-full px-3 py-2 border rounded-lg text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
                      ${errors.schedule?.[index]?.time ? "border-red-500" : "border-gray-300"}
                      ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                    `}
                    placeholder="ex: 17:00-18:30"
                    aria-invalid={errors.schedule?.[index]?.time ? "true" : "false"}
                  />
                  {errors.schedule?.[index]?.time && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.schedule[index]?.time?.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Format: HH:MM-HH:MM (ex: 17:00-18:30)
                  </p>
                </div>

                {/* Remove Button */}
                <div className="shrink-0 pt-6">
                  <button
                    type="button"
                    onClick={() => removeScheduleEntry(index)}
                    disabled={isLoading}
                    className="
                      p-2 text-gray-400 hover:text-red-600
                      hover:bg-red-50 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                      transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    aria-label="Șterge interval"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {errors.schedule && typeof errors.schedule.message === "string" && (
          <p className="mt-2 text-sm text-red-600">{errors.schedule.message}</p>
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
              Informațiile de contact și programul de antrenamente vor fi afișate în profilul
              clubului tău, astfel încât părinții să te poată contacta și să știe când se desfășoară
              antrenamentele. Poți actualiza aceste detalii oricând din dashboard-ul tău.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-6 border-t border-gray-200">
        <OnboardingNavigation
          backHref={routes.onboarding.club.basicInfo}
          nextHref={null} // null means submit button
          formId="club-contact-schedule-form"
          isLoading={isLoading}
          isNextDisabled={isLoading}
          nextText="Continuă"
        />
      </div>
    </form>
  );
}
