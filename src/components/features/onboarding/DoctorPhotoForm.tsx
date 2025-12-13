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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorPhoto } from "@/app/actions/onboarding";
import { doctorPhotoSchema, type DoctorPhotoInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { ServerErrorAlert, InfoBox, SingleImageUploadField } from "./components";
import { useOnboardingForm } from "./hooks/useOnboardingForm";

export function DoctorPhotoForm() {
  const {
    handleSubmit: rhfHandleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DoctorPhotoInput>({
    resolver: zodResolver(doctorPhotoSchema),
    defaultValues: {
      photoUrl: "",
    },
  });

  const { handleSubmit, isLoading, serverError, setServerError } =
    useOnboardingForm<DoctorPhotoInput>({
      onSubmitAction: updateDoctorPhoto,
      onSuccessRoute: routes.onboarding.doctor.verification,
    });

  const photoUrl = watch("photoUrl");

  const handleSkip = async () => {
    // Submit empty photo URL to proceed
    await handleSubmit({ photoUrl: "" });
  };

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)} className="px-3 px-sm-0">
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

        {/* Photo Upload */}
        <SingleImageUploadField
          label=""
          name="photoUrl"
          setValue={setValue}
          currentValue={photoUrl}
          error={errors.photoUrl}
          folder="yuvoo/doctors/photos"
          description="Format acceptat: JPG, PNG, WebP / Mărime max: 5MB"
          previewSize="12rem"
          objectFit="cover"
          isLoading={isLoading}
          setServerError={setServerError}
        />
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
