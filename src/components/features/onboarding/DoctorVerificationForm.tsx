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

import { useEffect, useRef, useMemo } from "react";
import { useForm, useWatch, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDoctorVerification } from "@/app/actions/onboarding";
import { doctorVerificationSchema, type DoctorVerificationInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { InfoBox, DocumentUploadField } from "./components";
import { useOnboardingForm } from "./hooks/useOnboardingForm";
import { saveFormData, getFormData } from "./hooks/useOnboardingLocalStorage";

export function DoctorVerificationForm() {
  const {
    handleSubmit: rhfHandleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<DoctorVerificationInput>({
    resolver: zodResolver(doctorVerificationSchema),
    defaultValues: {
      verificationDocuments: [],
    },
  });

  const role = "doctor";
  const stepNumber = 6;

  // Restore form data from localStorage on mount
  useEffect(() => {
    const saved = getFormData<DoctorVerificationInput>(role, stepNumber);
    if (saved) {
      // Restore all fields from saved data
      Object.keys(saved).forEach((key) => {
        const fieldKey = key as keyof DoctorVerificationInput;
        const value = saved[fieldKey];
        if (value !== undefined && value !== null) {
          setValue(fieldKey, value, { shouldValidate: false });
        }
      });
    }
  }, [setValue]);

  // Use useWatch for reactive document URLs
  // Wrap in useMemo to ensure stable array reference (prevents infinite loops)
  const watchedDocuments = useWatch({ control, name: "verificationDocuments" });
  const documentUrls = useMemo(() => watchedDocuments || [], [watchedDocuments]);

  // Save form data to localStorage on changes (debounced)
  // Use ref to track previous value and prevent infinite loops
  const prevDocumentUrlsRef = useRef<string>("");
  useEffect(() => {
    const currentString = JSON.stringify(documentUrls);
    // Only save if the value actually changed
    if (currentString !== prevDocumentUrlsRef.current) {
      prevDocumentUrlsRef.current = currentString;
      const timeoutId = setTimeout(() => {
        saveFormData(role, stepNumber, { verificationDocuments: documentUrls });
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [documentUrls, role, stepNumber]);

  const { handleSubmit, isLoading, serverError, setServerError } =
    useOnboardingForm<DoctorVerificationInput>({
      onSubmitAction: updateDoctorVerification,
      onSuccessRoute: routes.onboarding.doctor.availability,
      role,
      stepNumber,
    });

  const handleSkip = async () => {
    // Skip verification - navigate to next step without submitting
    window.location.href = routes.onboarding.doctor.availability;
  };

  return (
    <form
      id="doctor-verification-form"
      onSubmit={rhfHandleSubmit(handleSubmit)}
      className="px-3 px-sm-0"
    >
      {/* Server error message */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Document Upload */}
      <DocumentUploadField
        label="Documente de verificare"
        name="verificationDocuments"
        setValue={setValue}
        currentValues={documentUrls}
        error={errors.verificationDocuments as FieldError | undefined}
        folder="yuvoo/doctors/verification"
        minDocuments={4}
        maxDocuments={10}
        required
        helpText="Încarcă documentele tale profesionale pentru verificare. Documentele verificate îți vor oferi badge-ul de 'Verificat' și vor crește încrederea părinților. Verificarea durează 2-3 zile lucrătoare."
        description="Încarcă cel puțin 4 documente obligatorii. Acceptă PDF, JPG, PNG (maxim 10MB fiecare)."
        acceptedFormats={["application/pdf", "image/jpeg", "image/jpg", "image/png"]}
        isLoading={isLoading}
        setServerError={setServerError}
      />

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
          isNextDisabled={isLoading}
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
