/**
 * DoctorAvailabilityForm Component
 *
 * Client component for setting doctor availability during doctor onboarding.
 * Uses React Hook Form with Zod validation.
 *
 * Features:
 * - Romanian labels and error messages
 * - Accepting new patients checkbox
 * - Online consultations checkbox
 * - Optional schedule builder (day, startTime, endTime)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorAvailability } from "@/app/actions/onboarding";
import { doctorAvailabilitySchema, type DoctorAvailabilityInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
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

export function DoctorAvailabilityForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DoctorAvailabilityInput>({
    resolver: zodResolver(doctorAvailabilitySchema),
    defaultValues: {
      acceptingNewPatients: true,
      onlineConsultations: false,
      schedule: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

  const onSubmit = async (data: DoctorAvailabilityInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await updateDoctorAvailability(data);

      if (result.success) {
        // Navigate to next step (completion)
        router.push(routes.onboarding.doctor.complete);
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
    append({ day: "", startTime: "", endTime: "" });
  };

  const removeScheduleEntry = (index: number) => {
    remove(index);
  };

  return (
    <form id="doctor-availability-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Server Error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{serverError}</p>
        </div>
      )}

      {/* Accepting New Patients */}
      <div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="acceptingNewPatients"
            {...register("acceptingNewPatients")}
            disabled={isLoading}
            className="
              mt-1 w-5 h-5
              text-[#00BBAE] border-gray-300 rounded
              focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          />
          <div className="flex-1">
            <label
              htmlFor="acceptingNewPatients"
              className="block text-sm font-medium text-gray-900 cursor-pointer"
            >
              Accept pacienți noi
            </label>
            <p className="mt-1 text-sm text-gray-600">
              Activează această opțiune dacă accepți în prezent pacienți noi în cabinetul tău.
            </p>
          </div>
        </div>
      </div>

      {/* Online Consultations */}
      <div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="onlineConsultations"
            {...register("onlineConsultations")}
            disabled={isLoading}
            className="
              mt-1 w-5 h-5
              text-[#00BBAE] border-gray-300 rounded
              focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          />
          <div className="flex-1">
            <label
              htmlFor="onlineConsultations"
              className="block text-sm font-medium text-gray-900 cursor-pointer"
            >
              Consultații online disponibile
            </label>
            <p className="mt-1 text-sm text-gray-600">
              Activează această opțiune dacă oferi consultații online (video sau telefon).
            </p>
          </div>
        </div>
      </div>

      {/* Schedule Builder */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Program consultații <span className="text-gray-500 text-xs">(opțional)</span>
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
              Nu ai adăugat niciun interval de consultații.
            </p>
            <p className="text-xs text-gray-500">
              Apasă pe &ldquo;Adaugă interval&rdquo; pentru a adăuga programul tău de consultații.
              Acest câmp este opțional.
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

                {/* Start Time */}
                <div className="flex-1">
                  <label
                    htmlFor={`schedule.${index}.startTime`}
                    className="block text-xs font-medium text-gray-600 mb-1.5"
                  >
                    Ora început
                  </label>
                  <input
                    type="time"
                    {...register(`schedule.${index}.startTime` as const)}
                    disabled={isLoading}
                    className={`
                      w-full px-3 py-2 border rounded-lg text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
                      ${errors.schedule?.[index]?.startTime ? "border-red-500" : "border-gray-300"}
                      ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                    `}
                    aria-invalid={errors.schedule?.[index]?.startTime ? "true" : "false"}
                  />
                  {errors.schedule?.[index]?.startTime && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.schedule[index]?.startTime?.message}
                    </p>
                  )}
                </div>

                {/* End Time */}
                <div className="flex-1">
                  <label
                    htmlFor={`schedule.${index}.endTime`}
                    className="block text-xs font-medium text-gray-600 mb-1.5"
                  >
                    Ora sfârșit
                  </label>
                  <input
                    type="time"
                    {...register(`schedule.${index}.endTime` as const)}
                    disabled={isLoading}
                    className={`
                      w-full px-3 py-2 border rounded-lg text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
                      ${errors.schedule?.[index]?.endTime ? "border-red-500" : "border-gray-300"}
                      ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                    `}
                    aria-invalid={errors.schedule?.[index]?.endTime ? "true" : "false"}
                  />
                  {errors.schedule?.[index]?.endTime && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.schedule[index]?.endTime?.message}
                    </p>
                  )}
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
              Informațiile despre disponibilitatea ta vor fi afișate în profilul tău profesional,
              astfel încât părinții să știe dacă accepți pacienți noi și când ești disponibil pentru
              consultații. Poți actualiza aceste detalii oricând din dashboard-ul tău.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-6 border-t border-gray-200">
        <OnboardingNavigation
          backHref={routes.onboarding.doctor.verification}
          nextHref={null} // null means submit button
          formId="doctor-availability-form"
          isLoading={isLoading}
          isNextDisabled={isLoading}
          nextText="Continuă"
        />
      </div>
    </form>
  );
}
