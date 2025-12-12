/**
 * DoctorVerificationForm Component
 *
 * Client component for uploading doctor verification documents during doctor onboarding.
 * Uses React Hook Form with Zod validation and Cloudinary upload.
 *
 * Features:
 * - Romanian labels and error messages
 * - Document upload (multiple documents, 4-10 required)
 * - Document preview and removal
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 * - Skip functionality (optional)
 */

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorVerification } from "@/app/actions/onboarding";
import { uploadDocumentAction, deleteDocumentAction } from "@/app/actions/uploads";
import { doctorVerificationSchema, type DoctorVerificationInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { InfoBox } from "./components";
import { X, Upload, FileText, File } from "lucide-react";

export function DoctorVerificationForm() {
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
  } = useForm<DoctorVerificationInput>({
    resolver: zodResolver(doctorVerificationSchema),
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

    // Get current document URLs
    let currentUrls = [...documentUrls];

    // Upload files sequentially to avoid overwhelming the server
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileIndex = currentUrls.length + i;
      setUploadingDocument(fileIndex);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "yuvoo/doctors/verification");

        const result = await uploadDocumentAction(formData);

        if (result.success && result.url) {
          currentUrls = [...currentUrls, result.url];
          setValue("verificationDocuments", currentUrls, { shouldValidate: true });
        } else {
          setServerError(result.error || `Eroare la încărcarea documentului ${i + 1}`);
          break; // Stop uploading remaining files on error
        }
      } catch (error) {
        console.error(`Error uploading document ${i + 1}:`, error);
        setServerError(`Eroare la încărcarea documentului ${i + 1}`);
        break; // Stop uploading remaining files on error
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

  const onSubmit = async (data: DoctorVerificationInput) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const result = await updateDoctorVerification(data);

      if (result.success) {
        // Navigate to next step
        router.push(routes.onboarding.doctor.availability);
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
    // Skip verification - submit empty array and proceed
    // Note: This will fail validation (min 4 required), so we'll need to handle this differently
    // Actually, skip should just navigate to next step without submitting
    router.push(routes.onboarding.doctor.availability);
  };

  return (
    <form
      id="doctor-verification-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 px-4 sm:px-0"
    >
      {/* Server error message */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
          <div className="flex items-start gap-3">
            <span className="text-red-500 text-xl" aria-hidden="true">
              ⚠️
            </span>
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
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            Documente de verificare <span className="text-red-500">*</span>
            <InfoTooltip
              content="Încarcă documentele tale profesionale pentru verificare. Documentele verificate îți vor oferi badge-ul de 'Verificat' și vor crește încrederea părinților. Verificarea durează 2-3 zile lucrătoare."
              size="sm"
            />
          </label>
          <span className="text-xs text-gray-500">
            {documentUrls.length}/10 documente (minim 4 obligatorii)
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3">
          Încarcă cel puțin 4 documente obligatorii. Acceptă PDF, JPG, PNG (maxim 10MB fiecare).
        </p>

        {/* Documents List */}
        {documentUrls.length > 0 && (
          <div className="space-y-3 mb-4">
            {documentUrls.map((url, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 p-3 border border-gray-200 rounded-lg bg-gray-50 group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0 w-full sm:w-auto">
                  {getFileIcon(url)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{getFileName(url)}</p>
                    <p className="text-xs text-gray-500 truncate hidden sm:block">{url}</p>
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
        {documentUrls.length < 10 && (
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
                  PDF, JPG, PNG (maxim {10 - documentUrls.length} restante)
                </p>
              </div>
            )}
          </div>
        )}

        <input
          ref={documentInputRef}
          type="file"
          accept=".pdf,image/jpeg,image/jpg,image/png"
          multiple
          onChange={handleDocumentUpload}
          disabled={isLoading || uploadingDocument !== null || documentUrls.length >= 10}
          className="hidden"
          aria-label="Încarcă documente de verificare"
        />

        {errors.verificationDocuments && (
          <p className="mt-2 text-sm text-red-600">{errors.verificationDocuments.message}</p>
        )}
      </div>

      {/* Info box */}
      <InfoBox title="Ce documente ai nevoie pentru verificare?" icon="ℹ️">
        <p className="text-sm text-gray-700 mb-3">
          Pentru a obține badge-ul de &apos;Verificat&apos;, încarcă cel puțin 4 documente
          obligatorii:
        </p>
        <ul className="text-sm text-gray-700 space-y-2 list-none">
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-semibold">*</span>
            <span>
              <strong>Diplomă de medic</strong> - Document oficial care confirmă calificarea de
              medic
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-semibold">*</span>
            <span>
              <strong>Certificat de specialist</strong> - Certificat care confirmă specializarea ta
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-semibold">*</span>
            <span>
              <strong>Licență de liberă practică</strong> - Autorizație pentru practica medicală
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 font-semibold">*</span>
            <span>
              <strong>Certificat Colegiul Medicilor din România</strong> - Membru activ al CMR
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400 font-semibold">○</span>
            <span>
              <strong>Asigurare malpraxis</strong> (opțional) - Poliță de asigurare pentru
              răspundere profesională
            </span>
          </li>
        </ul>
        <p className="text-sm text-gray-700 mt-4">
          ⏱️ <strong>Verificare:</strong> 2-3 zile lucrătoare. Documentele vor fi revizuite de
          echipa Yuvoo pentru a verifica autenticitatea și conformitatea.
        </p>
      </InfoBox>

      {/* Navigation */}
      <div className="pt-6 border-t border-gray-200 space-y-4">
        <OnboardingNavigation
          backHref={routes.onboarding.doctor.photo}
          nextHref={null} // null means submit button
          formId="doctor-verification-form"
          isLoading={isLoading}
          isNextDisabled={isLoading || uploadingDocument !== null}
          nextText="Trimite spre verificare"
        />
        {/* Skip button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleSkip}
            disabled={isLoading}
            className="text-sm text-gray-600 hover:text-[#00BBAE] hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sari acest pas - verific mai târziu
          </button>
        </div>
      </div>
    </form>
  );
}
