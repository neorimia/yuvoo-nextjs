/**
 * ClubPhotosForm Component
 *
 * Client component for uploading club logo and gallery photos during club admin onboarding.
 * Uses React Hook Form with Zod validation and Cloudinary upload.
 *
 * Features:
 * - Romanian labels and error messages
 * - Logo upload with preview
 * - Gallery upload (multiple images, 3-10 required)
 * - Image preview and removal
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useEffect } from "react";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClubPhotos } from "@/app/actions/onboarding";
import { clubPhotoSchema, type ClubPhotoInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { InfoBox } from "./components/InfoBox";
import { SingleImageUploadField, GalleryUploadField } from "./components";
import { useOnboardingForm } from "./hooks/useOnboardingForm";
import { saveFormData, getFormData } from "./hooks/useOnboardingLocalStorage";

export function ClubPhotosForm() {
  const {
    handleSubmit: rhfHandleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClubPhotoInput>({
    resolver: zodResolver(clubPhotoSchema),
    defaultValues: {
      logoUrl: "",
      galleryUrls: [],
    },
  });

  const role = "club_admin";
  const stepNumber = 5;

  // Restore form data from localStorage on mount
  useEffect(() => {
    const saved = getFormData<ClubPhotoInput>(role, stepNumber);
    if (saved) {
      // Restore all fields from saved data
      Object.keys(saved).forEach((key) => {
        const fieldKey = key as keyof ClubPhotoInput;
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

  const { handleSubmit, isLoading, serverError, setServerError } =
    useOnboardingForm<ClubPhotoInput>({
      onSubmitAction: updateClubPhotos,
      onSuccessRoute: routes.onboarding.club.verification,
      role,
      stepNumber,
    });

  const logoUrl = watch("logoUrl");
  const galleryUrls = watch("galleryUrls") || [];

  return (
    <form
      id="club-photos-form"
      onSubmit={rhfHandleSubmit(handleSubmit)}
      className="bd-onboarding-photos-form"
    >
      {/* Server error message */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Logo Upload Section */}
      <div className="bd-onboarding-photos-section mb-5">
        <SingleImageUploadField
          label="Logo club"
          name="logoUrl"
          setValue={setValue}
          currentValue={logoUrl}
          error={errors.logoUrl}
          folder="yuvoo/clubs/logos"
          required
          description="Încarcă logo-ul clubului (JPG, PNG sau WebP, maxim 5MB)"
          isLoading={isLoading}
          setServerError={setServerError}
        />
      </div>

      {/* Gallery Upload Section */}
      <div className="bd-onboarding-photos-section mb-5">
        <GalleryUploadField
          label="Galerie fotografii"
          name="galleryUrls"
          setValue={setValue}
          currentValues={galleryUrls}
          error={errors.galleryUrls as FieldError | undefined}
          folder="yuvoo/clubs/gallery"
          minImages={3}
          maxImages={10}
          required
          description="Încarcă cel puțin 3 fotografii ale clubului (JPG, PNG sau WebP, maxim 5MB fiecare)"
          gridCols={{ xs: 6, sm: 4, md: 3 }}
          isLoading={isLoading}
          setServerError={setServerError}
        />
      </div>

      {/* Info box */}
      <InfoBox title="De ce avem nevoie de aceste fotografii?" className="mb-4">
        Fotografiile ajută părinții să înțeleagă mai bine clubul tău. Logo-ul va fi afișat în
        profilul clubului, iar galeria oferă o privire asupra facilităților și activităților. Poți
        actualiza aceste fotografii oricând din dashboard-ul tău.
      </InfoBox>

      {/* Navigation */}
      <div className="pt-4 border-top border-secondary">
        <OnboardingNavigation
          backHref={routes.onboarding.club.pricingAges}
          nextHref={null} // null means submit button
          formId="club-photos-form"
          isLoading={isLoading}
          isNextDisabled={isLoading}
          nextText="Continuă"
        />
      </div>
    </form>
  );
}
