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

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClubPhotos } from "@/app/actions/onboarding";
import { uploadImageAction, deleteImageAction } from "@/app/actions/uploads";
import { clubPhotoSchema, type ClubPhotoInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { InfoBox } from "./components/InfoBox";
import { cn } from "@/lib/utils";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function ClubPhotosForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState<number | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
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

  const logoUrl = watch("logoUrl");
  const galleryUrls = watch("galleryUrls") || [];

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    setServerError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "yuvoo/clubs/logos");

      const result = await uploadImageAction(formData);

      if (result.success && result.url) {
        // Delete old logo if exists
        if (logoUrl) {
          try {
            await deleteImageAction(logoUrl);
          } catch (error) {
            console.error("Error deleting old logo:", error);
            // Continue even if deletion fails
          }
        }

        setValue("logoUrl", result.url, { shouldValidate: true });
      } else {
        setServerError(result.error || "Eroare la încărcarea logo-ului");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      setServerError("A apărut o eroare neașteptată la încărcarea logo-ului");
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) {
        logoInputRef.current.value = "";
      }
    }
  };

  const handleRemoveLogo = async () => {
    if (logoUrl) {
      try {
        await deleteImageAction(logoUrl);
      } catch (error) {
        console.error("Error deleting logo:", error);
      }
    }
    setValue("logoUrl", "", { shouldValidate: true });
  };

  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setServerError(null);

    // Upload files sequentially to avoid overwhelming the server
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileIndex = galleryUrls.length + i;
      setUploadingGallery(fileIndex);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "yuvoo/clubs/gallery");

        const result = await uploadImageAction(formData);

        if (result.success && result.url) {
          const newGalleryUrls = [...galleryUrls, result.url];
          setValue("galleryUrls", newGalleryUrls, { shouldValidate: true });
        } else {
          setServerError(result.error || `Eroare la încărcarea imaginii ${i + 1}`);
        }
      } catch (error) {
        console.error(`Error uploading gallery image ${i + 1}:`, error);
        setServerError(`Eroare la încărcarea imaginii ${i + 1}`);
      } finally {
        setUploadingGallery(null);
      }
    }

    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };

  const handleRemoveGalleryImage = async (index: number) => {
    const urlToRemove = galleryUrls[index];
    const newGalleryUrls = galleryUrls.filter((_, i) => i !== index);
    setValue("galleryUrls", newGalleryUrls, { shouldValidate: true });

    // Delete from Cloudinary
    if (urlToRemove) {
      try {
        await deleteImageAction(urlToRemove);
      } catch (error) {
        console.error("Error deleting gallery image:", error);
        // Continue even if deletion fails
      }
    }
  };

  const onSubmit = async (data: ClubPhotoInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await updateClubPhotos(data);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.club.verification);
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
    <form id="club-photos-form" onSubmit={handleSubmit(onSubmit)}>
      {/* Server error message */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Logo Upload */}
      <div className="mb-4">
        <label className="d-block small fw-medium text-body mb-3">
          Logo club <span className="text-danger">*</span>
        </label>
        <p className="text-xs text-secondary mb-3">
          Încarcă logo-ul clubului (JPG, PNG sau WebP, maxim 5MB)
        </p>

        <div className="mb-3">
          {logoUrl ? (
            <div className="position-relative d-inline-block">
              <div
                className="position-relative border-2 border-secondary rounded overflow-hidden bg-light"
                style={{ width: "8rem", height: "8rem" }}
              >
                <Image
                  src={logoUrl}
                  alt="Club logo"
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
              <button
                type="button"
                onClick={handleRemoveLogo}
                disabled={isLoading || uploadingLogo}
                className="position-absolute top-0 end-0 p-1 bg-danger text-white rounded-circle text-danger-hover focus-danger"
                style={{
                  transform: "translate(25%, -25%)",
                  transition: "all 0.2s ease-in-out",
                }}
                aria-label="Șterge logo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => !isLoading && !uploadingLogo && logoInputRef.current?.click()}
              className={cn(
                "w-100 border-2 border-dashed rounded",
                "d-flex align-items-center justify-content-center",
                uploadingLogo
                  ? "border-yuvoo-primary bg-yuvoo-primary-light"
                  : "border-secondary bg-light border-yuvoo-primary-hover bg-yuvoo-primary-light",
                isLoading && "opacity-50"
              )}
              style={{
                height: "8rem",
                cursor: isLoading || uploadingLogo ? "not-allowed" : "pointer",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {uploadingLogo ? (
                <div className="text-center">
                  <div
                    className="spinner-border spinner-border-sm text-yuvoo-primary mb-2"
                    role="status"
                    aria-hidden="true"
                  />
                  <p className="small text-body">Se încarcă...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="small fw-medium text-body">Apasă pentru a încărca logo</p>
                  <p className="text-xs text-secondary">JPG, PNG sau WebP</p>
                </div>
              )}
            </div>
          )}

          <input
            ref={logoInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleLogoUpload}
            disabled={isLoading || uploadingLogo}
            className="visually-hidden"
            aria-label="Încarcă logo"
          />
        </div>

        {errors.logoUrl && <p className="mt-2 small text-danger">{errors.logoUrl.message}</p>}
      </div>

      {/* Gallery Upload */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <label className="d-block small fw-medium text-body">
            Galerie fotografii <span className="text-danger">*</span>
          </label>
          <span className="text-xs text-secondary">{galleryUrls.length}/10 fotografii</span>
        </div>
        <p className="text-xs text-secondary mb-3">
          Încarcă cel puțin 3 fotografii ale clubului (JPG, PNG sau WebP, maxim 5MB fiecare)
        </p>

        {/* Gallery Grid */}
        {galleryUrls.length > 0 && (
          <div className="row g-3 mb-4">
            {galleryUrls.map((url, index) => (
              <div key={index} className="col-6 col-sm-4 col-md-3 position-relative">
                <div
                  className="position-relative border-2 border-secondary rounded overflow-hidden bg-light"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <Image
                    src={url}
                    alt={`Galerie ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  {uploadingGallery === index && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
                      <div
                        className="spinner-border spinner-border-sm text-white"
                        role="status"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(index)}
                  disabled={isLoading || uploadingGallery === index}
                  className="position-absolute top-0 end-0 p-1 bg-danger text-white rounded-circle text-danger-hover focus-danger"
                  style={{
                    transform: "translate(25%, -25%)",
                    transition: "all 0.2s ease-in-out",
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                  aria-label={`Șterge imagine ${index + 1}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        {galleryUrls.length < 10 && (
          <div
            onClick={() =>
              !isLoading &&
              uploadingGallery === null &&
              galleryUrls.length < 10 &&
              galleryInputRef.current?.click()
            }
            className={cn(
              "w-100 border-2 border-dashed rounded",
              "d-flex align-items-center justify-content-center",
              uploadingGallery !== null
                ? "border-yuvoo-primary bg-yuvoo-primary-light"
                : "border-secondary bg-light border-yuvoo-primary-hover bg-yuvoo-primary-light",
              isLoading && "opacity-50"
            )}
            style={{
              height: "8rem",
              cursor: isLoading || uploadingGallery !== null ? "not-allowed" : "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {uploadingGallery !== null ? (
              <div className="text-center">
                <div
                  className="spinner-border spinner-border-sm text-yuvoo-primary mb-2"
                  role="status"
                  aria-hidden="true"
                />
                <p className="small text-body">Se încarcă...</p>
              </div>
            ) : (
              <div className="text-center">
                <ImageIcon className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="small fw-medium text-body">Adaugă fotografii în galerie</p>
                <p className="text-xs text-secondary">
                  JPG, PNG sau WebP (maxim {10 - galleryUrls.length} restante)
                </p>
              </div>
            )}
          </div>
        )}

        <input
          ref={galleryInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          onChange={handleGalleryUpload}
          disabled={isLoading || uploadingGallery !== null || galleryUrls.length >= 10}
          className="visually-hidden"
          aria-label="Încarcă fotografii galerie"
        />

        {errors.galleryUrls && (
          <p className="mt-2 small text-danger">{errors.galleryUrls.message}</p>
        )}
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
          isNextDisabled={isLoading || uploadingLogo || uploadingGallery !== null}
          nextText="Continuă"
        />
      </div>
    </form>
  );
}
