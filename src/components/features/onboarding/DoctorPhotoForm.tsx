/**
 * DoctorPhotoForm Component
 *
 * Client component for uploading doctor professional photo during doctor onboarding.
 * Uses React Hook Form with Zod validation and Cloudinary upload.
 *
 * Features:
 * - Romanian labels and error messages
 * - Single professional photo upload (optional)
 * - Image preview and removal
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 * - Skip functionality (optional step)
 */

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorPhoto } from "@/app/actions/onboarding";
import { uploadImageAction, deleteImageAction } from "@/app/actions/uploads";
import { doctorPhotoSchema, type DoctorPhotoInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { X, Upload } from "lucide-react";
import Image from "next/image";

export function DoctorPhotoForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DoctorPhotoInput>({
    resolver: zodResolver(doctorPhotoSchema),
    defaultValues: {
      photoUrl: "",
    },
  });

  const photoUrl = watch("photoUrl");

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    setServerError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "yuvoo/doctors/photos");

      const result = await uploadImageAction(formData);

      if (result.success && result.url) {
        // Delete old photo if exists
        if (photoUrl) {
          try {
            await deleteImageAction(photoUrl);
          } catch (error) {
            console.error("Error deleting old photo:", error);
            // Continue even if deletion fails
          }
        }

        setValue("photoUrl", result.url, { shouldValidate: true });
      } else {
        setServerError(result.error || "Eroare la încărcarea fotografiei");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      setServerError("A apărut o eroare neașteptată la încărcarea fotografiei");
    } finally {
      setUploadingPhoto(false);
      if (photoInputRef.current) {
        photoInputRef.current.value = "";
      }
    }
  };

  const handleRemovePhoto = async () => {
    if (photoUrl) {
      try {
        await deleteImageAction(photoUrl);
        setValue("photoUrl", "", { shouldValidate: true });
      } catch (error) {
        console.error("Error deleting photo:", error);
        setServerError("Eroare la ștergerea fotografiei");
      }
    }
  };

  const onSubmit = async (data: DoctorPhotoInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await updateDoctorPhoto(data);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.doctor.verification);
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

  const handleSkip = async () => {
    // Submit empty photo URL to proceed
    await onSubmit({ photoUrl: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Server error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      {/* Photo Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fotografie profesională <span className="text-gray-500 text-xs">(opțional)</span>
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Încarcă o fotografie profesională pentru profilul tău
        </p>

        {/* Recommendations */}
        <div className="bg-[#EBFFFE] rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-gray-900 mb-2">Recomandări:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Fundal profesional</li>
            <li>• Îmbrăcăminte profesională</li>
            <li>• Imagine clară, frontală</li>
          </ul>
        </div>

        {/* Photo Preview or Upload Area */}
        {photoUrl ? (
          <div className="relative inline-block">
            <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-gray-300">
              <Image
                src={photoUrl}
                alt="Foto profesională"
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
              aria-label="Șterge fotografia"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#00BBAE] transition-colors">
            <input
              ref={photoInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handlePhotoUpload}
              disabled={uploadingPhoto || isLoading}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className={`cursor-pointer flex flex-col items-center gap-3 ${
                uploadingPhoto || isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {uploadingPhoto ? (
                <>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BBAE]"></div>
                  <p className="text-sm text-gray-600">Se încarcă...</p>
                </>
              ) : (
                <>
                  <div className="bg-[#EBFFFE] rounded-full p-4">
                    <Upload className="w-8 h-8 text-[#00BBAE]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Click pentru a încărca fotografie
                    </p>
                    <p className="text-xs text-gray-500">
                      Format acceptat: JPG, PNG, WebP / Mărime max: 5MB
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>
        )}

        {errors.photoUrl && <p className="mt-2 text-sm text-red-600">{errors.photoUrl.message}</p>}
      </div>

      {/* Navigation */}
      <div className="mt-8 space-y-4">
        <OnboardingNavigation
          backHref={routes.onboarding.doctor.locationContact}
          nextHref={null}
          nextText="Continuă"
          isLoading={isLoading}
        />
        {/* Skip button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleSkip}
            disabled={isLoading}
            className="text-sm text-gray-600 hover:text-[#00BBAE] hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sari acest pas - adaug mai târziu
          </button>
        </div>
      </div>
    </form>
  );
}
