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
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { InfoBox } from "./components/InfoBox";
import { cn } from "@/lib/utils";
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
    <form id="club-verification-form" onSubmit={handleSubmit(onSubmit)}>
      {/* Server error message */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Document Upload */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <label className="d-block small fw-medium text-body">
            Documente de verificare <span className="text-danger">*</span>
          </label>
          <span className="text-xs text-secondary">{documentUrls.length}/5 documente</span>
        </div>
        <p className="text-xs text-secondary mb-3">
          Încarcă cel puțin 2 documente (ex: certificat de înregistrare, asigurare). Acceptă PDF,
          DOC, DOCX, JPG, PNG (maxim 10MB fiecare).
        </p>

        {/* Documents List */}
        {documentUrls.length > 0 && (
          <div className="mb-4">
            {documentUrls.map((url, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-between p-3 border border-secondary rounded bg-light mb-3"
              >
                <div className="d-flex align-items-center gap-3 flex-fill" style={{ minWidth: 0 }}>
                  {getFileIcon(url)}
                  <div className="flex-fill" style={{ minWidth: 0 }}>
                    <p className="small fw-medium text-body text-truncate">{getFileName(url)}</p>
                    <p className="text-xs text-secondary text-truncate">{url}</p>
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
        {documentUrls.length < 5 && (
          <div
            onClick={() =>
              !isLoading &&
              uploadingDocument === null &&
              documentUrls.length < 5 &&
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
          className="visually-hidden"
          aria-label="Încarcă documente de verificare"
        />

        {errors.verificationDocuments && (
          <p className="mt-2 small text-danger">{errors.verificationDocuments.message}</p>
        )}
      </div>

      {/* Info box */}
      <InfoBox title="Ce documente ai nevoie pentru verificare?" className="mb-4">
        <ul className="small text-body mb-0" style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
          <li className="mb-2">
            <strong>Certificat de înregistrare</strong> - Document oficial care confirmă că clubul
            este înregistrat legal (ex: certificat ONRC pentru asociații, act constitutiv pentru
            ONG-uri)
          </li>
          <li className="mb-2">
            <strong>Asigurare</strong> - Poliță de asigurare pentru activitățile desfășurate
            (obligatorie pentru activități cu copii)
          </li>
          <li className="mb-2">
            <strong>Alte documente relevante</strong> (opțional) - Certificări, licențe, autorizații
            specifice sportului practicat
          </li>
        </ul>
        <p className="small text-body mt-3 mb-0">
          Documentele vor fi revizuite de echipa Yuvoo pentru a verifica autenticitatea și
          conformitatea. Procesul de verificare poate dura 1-3 zile lucrătoare.
        </p>
      </InfoBox>

      {/* Navigation */}
      <div className="pt-4 border-top border-secondary">
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
