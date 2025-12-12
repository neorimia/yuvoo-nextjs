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
import { ServerErrorAlert, InfoBox } from "./components";
import { cn } from "@/lib/utils";
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
    <form onSubmit={handleSubmit(onSubmit)} className="px-3 px-sm-0">
      {/* Server error */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Photo Upload Section */}
      <div className="mb-4">
        <label className="d-block small fw-medium text-body mb-2">
          Fotografie profesională <span className="text-secondary text-xs">(opțional)</span>
        </label>
        <p className="small text-secondary mb-4">
          Încarcă o fotografie profesională pentru profilul tău
        </p>

        {/* Recommendations */}
        <InfoBox icon="💡" className="mb-4">
          <p className="small fw-medium text-body mb-2">Recomandări:</p>
          <ul className="small text-body mb-0" style={{ listStyle: "none", paddingLeft: 0 }}>
            <li>• Fundal profesional</li>
            <li>• Îmbrăcăminte profesională</li>
            <li>• Imagine clară, frontală</li>
          </ul>
        </InfoBox>

        {/* Photo Preview or Upload Area */}
        {photoUrl ? (
          <div className="position-relative d-inline-block">
            <div
              className="position-relative rounded overflow-hidden border-2 border-secondary"
              style={{ width: "12rem", height: "12rem" }}
            >
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
              className="position-absolute top-0 end-0 bg-danger text-white rounded-circle p-2 text-danger-hover shadow-lg"
              style={{
                transform: "translate(25%, -25%)",
                transition: "all 0.2s ease-in-out",
              }}
              aria-label="Șterge fotografia"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "border-2 border-dashed border-secondary rounded p-5 text-center",
              "border-yuvoo-primary-hover"
            )}
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          >
            <input
              ref={photoInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handlePhotoUpload}
              disabled={uploadingPhoto || isLoading}
              className="visually-hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className={cn(
                "cursor-pointer d-flex flex-column align-items-center gap-3",
                (uploadingPhoto || isLoading) && "opacity-50"
              )}
              style={{
                cursor: uploadingPhoto || isLoading ? "not-allowed" : "pointer",
              }}
            >
              {uploadingPhoto ? (
                <>
                  <div
                    className="spinner-border spinner-border-lg text-yuvoo-primary"
                    role="status"
                    aria-hidden="true"
                  />
                  <p className="small text-body">Se încarcă...</p>
                </>
              ) : (
                <>
                  <div className="bg-yuvoo-primary-light rounded-circle p-4">
                    <Upload className="w-8 h-8 text-yuvoo-primary" />
                  </div>
                  <div>
                    <p className="small fw-medium text-body mb-1">
                      Click pentru a încărca fotografie
                    </p>
                    <p className="text-xs text-secondary">
                      Format acceptat: JPG, PNG, WebP / Mărime max: 5MB
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>
        )}

        {errors.photoUrl && <p className="mt-2 small text-danger">{errors.photoUrl.message}</p>}
      </div>

      {/* Navigation */}
      <div className="mt-5 mb-4">
        <OnboardingNavigation
          backHref={routes.onboarding.doctor.locationContact}
          nextHref={null}
          nextText="Continuă"
          isLoading={isLoading}
        />
        {/* Skip button */}
        <div className="text-center mt-3">
          <button
            type="button"
            onClick={handleSkip}
            disabled={isLoading}
            className="small text-secondary text-yuvoo-primary-hover border-0 bg-transparent p-0"
            style={{
              textDecoration: "none",
              transition: "color 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            Sari acest pas - adaug mai târziu
          </button>
        </div>
      </div>
    </form>
  );
}
