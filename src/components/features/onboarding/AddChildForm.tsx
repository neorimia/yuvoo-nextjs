/**
 * AddChildForm Component
 *
 * Client component for adding child profile during parent onboarding.
 * Uses React Hook Form with Zod validation and custom date picker.
 *
 * Features:
 * - Romanian labels and error messages
 * - Date picker with age validation (4-14 years)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "lucide-react";
import { addChildOnboarding } from "@/app/actions/onboarding";
import { createChildSchema, type CreateChildInput } from "@/lib/validations/child";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";

export function AddChildForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateChildInput>({
    resolver: zodResolver(createChildSchema),
  });

  const dateOfBirth = watch("dateOfBirth");

  // Handle date input change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    if (dateString) {
      setValue("dateOfBirth", new Date(dateString), { shouldValidate: true });
    }
  };

  // Format date for input value (YYYY-MM-DD)
  const formatDateForInput = (date?: Date): string => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Calculate age from date of birth
  const calculateAge = (date?: Date): number | null => {
    if (!date) return null;
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(dateOfBirth);

  const onSubmit = async (data: CreateChildInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await addChildOnboarding(data);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.parent.tour);
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
    <form id="add-child-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      {/* First Name */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
          Prenume <span className="text-red-500">*</span>
        </label>
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            ${errors.firstName ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          placeholder="ex. Maria"
          aria-invalid={errors.firstName ? "true" : "false"}
          aria-describedby={errors.firstName ? "firstName-error" : undefined}
        />
        {errors.firstName && (
          <p id="firstName-error" className="mt-2 text-sm text-red-600">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
          Nume <span className="text-red-500">*</span>
        </label>
        <input
          id="lastName"
          type="text"
          {...register("lastName")}
          disabled={isLoading}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
            transition-all duration-200
            ${errors.lastName ? "border-red-500" : "border-gray-300"}
            ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
          placeholder="ex. Popescu"
          aria-invalid={errors.lastName ? "true" : "false"}
          aria-describedby={errors.lastName ? "lastName-error" : undefined}
        />
        {errors.lastName && (
          <p id="lastName-error" className="mt-2 text-sm text-red-600">
            {errors.lastName.message}
          </p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
          Data nașterii <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="dateOfBirth"
            type="date"
            onChange={handleDateChange}
            value={formatDateForInput(dateOfBirth)}
            disabled={isLoading}
            max={new Date().toISOString().split("T")[0]}
            min={new Date(new Date().getFullYear() - 14, 0, 1).toISOString().split("T")[0]}
            className={`
              w-full px-4 py-3 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:border-transparent
              transition-all duration-200
              ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"}
              ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            `}
            aria-invalid={errors.dateOfBirth ? "true" : "false"}
            aria-describedby={errors.dateOfBirth ? "dateOfBirth-error" : "dateOfBirth-help"}
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        {age !== null && !errors.dateOfBirth && (
          <p id="dateOfBirth-help" className="mt-2 text-sm text-gray-600">
            Vârsta: {age} {age === 1 ? "an" : "ani"}
          </p>
        )}
        {errors.dateOfBirth && (
          <p id="dateOfBirth-error" className="mt-2 text-sm text-red-600">
            {errors.dateOfBirth.message}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          Platforma Yuvoo este destinată copiilor cu vârste între 4 și 14 ani.
        </p>
      </div>

      {/* Gender (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Gen <span className="text-gray-500 text-xs">(opțional)</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          <label
            className={`
              flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer
              transition-all duration-200
              ${isLoading ? "cursor-not-allowed opacity-50" : "hover:border-[#00BBAE] hover:bg-[#EBFFFE]"}
            `}
          >
            <input
              type="radio"
              value="male"
              {...register("gender")}
              disabled={isLoading}
              className="sr-only"
            />
            <span className="text-3xl mb-2">👦</span>
            <span className="text-sm font-medium text-gray-700">Băiat</span>
          </label>

          <label
            className={`
              flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer
              transition-all duration-200
              ${isLoading ? "cursor-not-allowed opacity-50" : "hover:border-[#00BBAE] hover:bg-[#EBFFFE]"}
            `}
          >
            <input
              type="radio"
              value="female"
              {...register("gender")}
              disabled={isLoading}
              className="sr-only"
            />
            <span className="text-3xl mb-2">👧</span>
            <span className="text-sm font-medium text-gray-700">Fată</span>
          </label>

          <label
            className={`
              flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer
              transition-all duration-200
              ${isLoading ? "cursor-not-allowed opacity-50" : "hover:border-[#00BBAE] hover:bg-[#EBFFFE]"}
            `}
          >
            <input
              type="radio"
              value="other"
              {...register("gender")}
              disabled={isLoading}
              className="sr-only"
            />
            <span className="text-3xl mb-2">👶</span>
            <span className="text-sm font-medium text-gray-700">Altul</span>
          </label>
        </div>
        {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender.message}</p>}
      </div>

      {/* Navigation */}
      <div className="pt-6 border-t border-gray-200">
        <OnboardingNavigation
          backHref={routes.onboarding.parent.welcome}
          nextHref={null} // null means submit button
          formId="add-child-form"
          isLoading={isLoading}
          isNextDisabled={isLoading}
          nextText="Adaugă profil"
        />
      </div>
    </form>
  );
}
