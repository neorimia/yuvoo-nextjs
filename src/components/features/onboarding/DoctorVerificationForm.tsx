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
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { InfoBox } from "./components";
import { cn } from "@/lib/utils";
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
      return <FileText className="w-8 h-8 text-danger" />;
    }
    if (url.toLowerCase().match(/\.(doc|docx)$/)) {
      return <File className="w-8 h-8 text-primary" />;
    }
    // Image or other
    return <File className="w-8 h-8 text-secondary" />;
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
    <form id="doctor-verification-form" onSubmit={handleSubmit(onSubmit)} className="px-3 px-sm-0">
      {/* Server error message */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Document Upload */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <label className="d-flex align-items-center gap-2 small fw-medium text-body">
            Documente de verificare <span className="text-danger">*</span>
            <InfoTooltip
              content="Încarcă documentele tale profesionale pentru verificare. Documentele verificate îți vor oferi badge-ul de 'Verificat' și vor crește încrederea părinților. Verificarea durează 2-3 zile lucrătoare."
              size="sm"
            />
          </label>
          <span className="text-xs text-secondary">
            {documentUrls.length}/10 documente (minim 4 obligatorii)
          </span>
        </div>
        <p className="text-xs text-secondary mb-3">
          Încarcă cel puțin 4 documente obligatorii. Acceptă PDF, JPG, PNG (maxim 10MB fiecare).
        </p>

        {/* Documents List */}
        {documentUrls.length > 0 && (
          <div className="mb-4">
            {documentUrls.map((url, index) => (
              <div
                key={index}
                className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2 p-3 border border-secondary rounded bg-light mb-3"
              >
                <div className="d-flex align-items-center gap-3 flex-fill" style={{ minWidth: 0 }}>
                  {getFileIcon(url)}
                  <div className="flex-fill" style={{ minWidth: 0 }}>
                    <p className="small fw-medium text-body text-truncate">{getFileName(url)}</p>
                    <p className="text-xs text-secondary text-truncate d-none d-sm-block">{url}</p>
                  </div>
                  {uploadingDocument === index && (
                    <div
                      className="spinner-border spinner-border-sm text-yuvoo-primary"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDocument(index)}
                  disabled={isLoading || uploadingDocument === index}
                  className="ms-3 p-2 text-danger text-danger-hover bg-danger bg-opacity-10 rounded focus-danger"
                  style={{
                    transition: "all 0.2s ease-in-out",
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
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
            onClick={() =>
              !isLoading &&
              uploadingDocument === null &&
              documentUrls.length < 10 &&
              documentInputRef.current?.click()
            }
            className={cn(
              "w-100 border-2 border-dashed rounded",
              "d-flex align-items-center justify-content-center",
              uploadingDocument !== null
                ? "border-yuvoo-primary bg-yuvoo-primary-light"
                : "border-secondary bg-light border-yuvoo-primary-hover bg-yuvoo-primary-light",
              isLoading && "opacity-50"
            )}
            style={{
              height: "8rem",
              cursor: isLoading || uploadingDocument !== null ? "not-allowed" : "pointer",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {uploadingDocument !== null ? (
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
                <p className="small fw-medium text-body">Adaugă documente de verificare</p>
                <p className="text-xs text-secondary">
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
          className="visually-hidden"
          aria-label="Încarcă documente de verificare"
        />

        {errors.verificationDocuments && (
          <p className="mt-2 small text-danger">{errors.verificationDocuments.message}</p>
        )}
      </div>

      {/* Info box */}
      <InfoBox title="Ce documente ai nevoie pentru verificare?" icon="ℹ️" className="mb-4">
        <p className="small text-body mb-3">
          Pentru a obține badge-ul de &apos;Verificat&apos;, încarcă cel puțin 4 documente
          obligatorii:
        </p>
        <ul className="small text-body mb-0" style={{ listStyle: "none", paddingLeft: 0 }}>
          <li className="d-flex align-items-start gap-2 mb-2">
            <span className="text-danger fw-semibold">*</span>
            <span>
              <strong>Diplomă de medic</strong> - Document oficial care confirmă calificarea de
              medic
            </span>
          </li>
          <li className="d-flex align-items-start gap-2 mb-2">
            <span className="text-danger fw-semibold">*</span>
            <span>
              <strong>Certificat de specialist</strong> - Certificat care confirmă specializarea ta
            </span>
          </li>
          <li className="d-flex align-items-start gap-2 mb-2">
            <span className="text-danger fw-semibold">*</span>
            <span>
              <strong>Licență de liberă practică</strong> - Autorizație pentru practica medicală
            </span>
          </li>
          <li className="d-flex align-items-start gap-2 mb-2">
            <span className="text-danger fw-semibold">*</span>
            <span>
              <strong>Certificat Colegiul Medicilor din România</strong> - Membru activ al CMR
            </span>
          </li>
          <li className="d-flex align-items-start gap-2 mb-2">
            <span className="text-secondary fw-semibold">○</span>
            <span>
              <strong>Asigurare malpraxis</strong> (opțional) - Poliță de asigurare pentru
              răspundere profesională
            </span>
          </li>
        </ul>
        <p className="small text-body mt-4 mb-0">
          ⏱️ <strong>Verificare:</strong> 2-3 zile lucrătoare. Documentele vor fi revizuite de
          echipa Yuvoo pentru a verifica autenticitatea și conformitatea.
        </p>
      </InfoBox>

      {/* Navigation */}
      <div className="pt-4 border-top border-secondary mb-4">
        <OnboardingNavigation
          backHref={routes.onboarding.doctor.photo}
          nextHref={null} // null means submit button
          formId="doctor-verification-form"
          isLoading={isLoading}
          isNextDisabled={isLoading || uploadingDocument !== null}
          nextText="Trimite spre verificare"
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
            Sari acest pas - verific mai târziu
          </button>
        </div>
      </div>
    </form>
  );
}
