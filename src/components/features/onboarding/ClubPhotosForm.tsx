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
    <form id="club-photos-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Logo club <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Încarcă logo-ul clubului (JPG, PNG sau WebP, maxim 5MB)
        </p>

        <div className="space-y-3">
          {logoUrl ? (
            <div className="relative inline-block">
              <div className="relative w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
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
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
                aria-label="Șterge logo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => logoInputRef.current?.click()}
              className={`
                w-full h-32 border-2 border-dashed rounded-lg
                flex items-center justify-center cursor-pointer
                transition-all duration-200
                ${
                  uploadingLogo
                    ? "border-[#00BBAE] bg-[#EBFFFE]"
                    : "border-gray-300 bg-gray-50 hover:border-[#00BBAE] hover:bg-[#EBFFFE]/50"
                }
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {uploadingLogo ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BBAE] mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Se încarcă...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Apasă pentru a încărca logo</p>
                  <p className="text-xs text-gray-500">JPG, PNG sau WebP</p>
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
            className="hidden"
            aria-label="Încarcă logo"
          />
        </div>

        {errors.logoUrl && <p className="mt-2 text-sm text-red-600">{errors.logoUrl.message}</p>}
      </div>

      {/* Gallery Upload */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Galerie fotografii <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-gray-500">{galleryUrls.length}/10 fotografii</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Încarcă cel puțin 3 fotografii ale clubului (JPG, PNG sau WebP, maxim 5MB fiecare)
        </p>

        {/* Gallery Grid */}
        {galleryUrls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {galleryUrls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={url}
                    alt={`Galerie ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  {uploadingGallery === index && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(index)}
                  disabled={isLoading || uploadingGallery === index}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all opacity-0 group-hover:opacity-100"
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
            onClick={() => galleryInputRef.current?.click()}
            className={`
              w-full h-32 border-2 border-dashed rounded-lg
              flex items-center justify-center cursor-pointer
              transition-all duration-200
              ${
                uploadingGallery !== null
                  ? "border-[#00BBAE] bg-[#EBFFFE]"
                  : "border-gray-300 bg-gray-50 hover:border-[#00BBAE] hover:bg-[#EBFFFE]/50"
              }
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {uploadingGallery !== null ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BBAE] mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Se încarcă...</p>
              </div>
            ) : (
              <div className="text-center">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Adaugă fotografii în galerie</p>
                <p className="text-xs text-gray-500">
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
          className="hidden"
          aria-label="Încarcă fotografii galerie"
        />

        {errors.galleryUrls && (
          <p className="mt-2 text-sm text-red-600">{errors.galleryUrls.message}</p>
        )}
      </div>

      {/* Info box */}
      <div className="bg-[#EBFFFE] border border-[#00BBAE]/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              De ce avem nevoie de aceste fotografii?
            </h3>
            <p className="text-sm text-gray-700">
              Fotografiile ajută părinții să înțeleagă mai bine clubul tău. Logo-ul va fi afișat în
              profilul clubului, iar galeria oferă o privire asupra facilităților și activităților.
              Poți actualiza aceste fotografii oricând din dashboard-ul tău.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-6 border-t border-gray-200">
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
