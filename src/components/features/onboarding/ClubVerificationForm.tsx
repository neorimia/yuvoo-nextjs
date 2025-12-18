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

import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClubVerification } from "@/app/actions/onboarding";
import { clubVerificationSchema, type ClubVerificationInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { ServerErrorAlert } from "./components/ServerErrorAlert";
import { InfoBox } from "./components/InfoBox";
import { DocumentUploadField } from "./components";
import { useOnboardingForm } from "./hooks/useOnboardingForm";

export function ClubVerificationForm() {
  const {
    handleSubmit: rhfHandleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClubVerificationInput>({
    resolver: zodResolver(clubVerificationSchema),
    defaultValues: {
      verificationDocuments: [],
    },
  });

  const { handleSubmit, isLoading, serverError, setServerError } =
    useOnboardingForm<ClubVerificationInput>({
      onSubmitAction: updateClubVerification,
      onSuccessRoute: routes.onboarding.club.complete,
    });

  const documentUrls = watch("verificationDocuments") || [];

  return (
    <form
      id="club-verification-form"
      onSubmit={rhfHandleSubmit(handleSubmit)}
      className="bd-onboarding-verification-form"
    >
      {/* Server error message */}
      <ServerErrorAlert error={serverError} className="mb-4" />

      {/* Document Upload Section */}
      <div className="bd-onboarding-verification-section mb-5">
        <DocumentUploadField
          label="Documente de verificare"
          name="verificationDocuments"
          setValue={setValue}
          currentValues={documentUrls}
          error={errors.verificationDocuments as unknown as FieldError}
          folder="yuvoo/clubs/verification"
          minDocuments={2}
          maxDocuments={5}
          required
          description="Încarcă cel puțin 2 documente (ex: certificat de înregistrare, asigurare). Acceptă PDF, DOC, DOCX, JPG, PNG (maxim 10MB fiecare)."
          isLoading={isLoading}
          setServerError={setServerError}
        />
      </div>

      {/* Info box */}
      <InfoBox title="Ce documente ai nevoie pentru verificare?" className="mb-4">
        <ul
          className="bd-onboarding-verification-list small text-body mb-0"
          style={{ listStyle: "disc", paddingLeft: "1.5rem" }}
        >
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
          isNextDisabled={isLoading}
          nextText="Finalizează"
        />
      </div>
    </form>
  );
}
