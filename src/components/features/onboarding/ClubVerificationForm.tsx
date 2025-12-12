/**
 * ClubVerificationForm Component
 *
 * Client component for uploading club verification documents during club admin onboarding.
 * Uses React Hook Form with Zod validation and Cloudinary upload.
 *
 * Features:
 * - Romanian labels and error messages
 * - Document upload (multiple documents, 2-5 required)
 * - Document preview and removal
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClubVerification } from "@/app/actions/onboarding";
import { uploadDocumentAction, deleteDocumentAction } from "@/app/actions/uploads";
import { clubVerificationSchema, type ClubVerificationInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { X, Upload, FileText, File } from "lucide-react";

export function ClubVerificationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState<number | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const documentInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClubVerificationInput>({
    resolver: zodResolver(clubVerificationSchema),
    defaultValues: {
      verificationDocuments: [],
    },
  });

  const documentUrls = watch("verificationDocuments") || [];

  const getFileIcon = (url: string) => {
    if (url.toLowerCase().endsWith(".pdf")) {
      return <FileText className="w-8 h-8 text-red-500" />;
    }
    if (url.toLowerCase().match(/\.(doc|docx)$/)) {
      return <File className="w-8 h-8 text-blue-500" />;
    }
    // Image or other
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const getFileName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.split("/").pop() || "document";
      // Decode URL encoding
      return decodeURIComponent(filename);
    } catch {
      return "document";
    }
  };

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setServerError(null);

    // Upload files sequentially to avoid overwhelming the server
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileIndex = documentUrls.length + i;
      setUploadingDocument(fileIndex);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "yuvoo/clubs/verification");

        const result = await uploadDocumentAction(formData);

        if (result.success && result.url) {
          const newDocumentUrls = [...documentUrls, result.url];
          setValue("verificationDocuments", newDocumentUrls, { shouldValidate: true });
        } else {
          setServerError(result.error || `Eroare la încărcarea documentului ${i + 1}`);
        }
      } catch (error) {
        console.error(`Error uploading document ${i + 1}:`, error);
        setServerError(`Eroare la încărcarea documentului ${i + 1}`);
      } finally {
        setUploadingDocument(null);
      }
    }

    if (documentInputRef.current) {
      documentInputRef.current.value = "";
    }
  };

  const handleRemoveDocument = async (index: number) => {
    const urlToRemove = documentUrls[index];
    const newDocumentUrls = documentUrls.filter((_, i) => i !== index);
    setValue("verificationDocuments", newDocumentUrls, { shouldValidate: true });

    // Delete from Cloudinary
    if (urlToRemove) {
      try {
        await deleteDocumentAction(urlToRemove);
      } catch (error) {
        console.error("Error deleting document:", error);
        // Continue even if deletion fails
      }
    }
  };

  const onSubmit = async (data: ClubVerificationInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await updateClubVerification(data);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.club.complete);
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
    <form id="club-verification-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      {/* Document Upload */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Documente de verificare <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-gray-500">{documentUrls.length}/5 documente</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Încarcă cel puțin 2 documente (ex: certificat de înregistrare, asigurare). Acceptă PDF,
          DOC, DOCX, JPG, PNG (maxim 10MB fiecare).
        </p>

        {/* Documents List */}
        {documentUrls.length > 0 && (
          <div className="space-y-3 mb-4">
            {documentUrls.map((url, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getFileIcon(url)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{getFileName(url)}</p>
                    <p className="text-xs text-gray-500 truncate">{url}</p>
                  </div>
                  {uploadingDocument === index && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#00BBAE]"></div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDocument(index)}
                  disabled={isLoading || uploadingDocument === index}
                  className="ml-3 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label={`Șterge document ${index + 1}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        {documentUrls.length < 5 && (
          <div
            onClick={() => documentInputRef.current?.click()}
            className={`
              w-full h-32 border-2 border-dashed rounded-lg
              flex items-center justify-center cursor-pointer
              transition-all duration-200
              ${
                uploadingDocument !== null
                  ? "border-[#00BBAE] bg-[#EBFFFE]"
                  : "border-gray-300 bg-gray-50 hover:border-[#00BBAE] hover:bg-[#EBFFFE]/50"
              }
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {uploadingDocument !== null ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BBAE] mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Se încarcă...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Adaugă documente de verificare</p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, JPG, PNG (maxim {5 - documentUrls.length} restante)
                </p>
              </div>
            )}
          </div>
        )}

        <input
          ref={documentInputRef}
          type="file"
          accept=".pdf,.doc,.docx,image/jpeg,image/jpg,image/png"
          multiple
          onChange={handleDocumentUpload}
          disabled={isLoading || uploadingDocument !== null || documentUrls.length >= 5}
          className="hidden"
          aria-label="Încarcă documente de verificare"
        />

        {errors.verificationDocuments && (
          <p className="mt-2 text-sm text-red-600">{errors.verificationDocuments.message}</p>
        )}
      </div>

      {/* Info box */}
      <div className="bg-[#EBFFFE] border border-[#00BBAE]/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Ce documente ai nevoie pentru verificare?
            </h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>
                <strong>Certificat de înregistrare</strong> - Document oficial care confirmă că
                clubul este înregistrat legal (ex: certificat ONRC pentru asociații, act constitutiv
                pentru ONG-uri)
              </li>
              <li>
                <strong>Asigurare</strong> - Poliță de asigurare pentru activitățile desfășurate
                (obligatorie pentru activități cu copii)
              </li>
              <li>
                <strong>Alte documente relevante</strong> (opțional) - Certificări, licențe,
                autorizații specifice sportului practicat
              </li>
            </ul>
            <p className="text-sm text-gray-700 mt-3">
              Documentele vor fi revizuite de echipa Yuvoo pentru a verifica autenticitatea și
              conformitatea. Procesul de verificare poate dura 1-3 zile lucrătoare.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-6 border-t border-gray-200">
        <OnboardingNavigation
          backHref={routes.onboarding.club.photos}
          nextHref={null} // null means submit button
          formId="club-verification-form"
          isLoading={isLoading}
          isNextDisabled={isLoading || uploadingDocument !== null}
          nextText="Finalizează"
        />
      </div>
    </form>
  );
}
