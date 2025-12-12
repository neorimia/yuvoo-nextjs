/**
 * Doctor Onboarding - Step 8: Complete
 *
 * Final step - show success message and redirect to dashboard.
 */

import { requireRole } from "@/lib/auth/session";
import { completeDoctorOnboarding, getOnboardingProgress } from "@/app/actions/onboarding";
import {
  OnboardingLayout,
  OnboardingProgress,
  type OnboardingStep,
} from "@/components/features/onboarding";
import { DoctorCompletionContent } from "@/components/features/onboarding/DoctorCompletionContent";
import { db } from "@/lib/db";
import { doctors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const DOCTOR_STEPS: OnboardingStep[] = [
  { number: 1, label: "Bun venit", description: "Introducere" },
  { number: 2, label: "Informații profesionale", description: "Profil de bază" },
  { number: 3, label: "Bio & Experiență", description: "Despre tine" },
  { number: 4, label: "Cabinet & Contact", description: "Detalii contact" },
  { number: 5, label: "Fotografie", description: "Foto profesională" },
  { number: 6, label: "Verificare", description: "Documente" },
  { number: 7, label: "Disponibilitate", description: "Program" },
  { number: 8, label: "Finalizare", description: "Completare" },
];

export default async function DoctorCompletePage() {
  const _session = await requireRole("doctor");

  // Mark onboarding as complete
  const result = await completeDoctorOnboarding();

  // If completion failed, we should handle it
  // For now, we'll still show the page (component will handle redirect)
  if (!result.success) {
    console.error("Error completing onboarding:", result.error);
  }

  // Get doctor information for display
  const progressData = await getOnboardingProgress();
  let doctorName: string | null = null;
  let doctorTitle: string | null = null;

  if (progressData.success && progressData.data?.stepData?.doctor_id) {
    const doctorId = progressData.data.stepData.doctor_id as string;
    const doctor = await db.query.doctors.findFirst({
      where: eq(doctors.id, doctorId),
      columns: {
        firstName: true,
        lastName: true,
        title: true,
      },
    });

    if (doctor) {
      doctorName = doctor.lastName ? `${doctor.firstName} ${doctor.lastName}` : doctor.firstName;
      doctorTitle = doctor.title || null;
    }
  }

  return (
    <OnboardingLayout>
      <OnboardingProgress currentStep={8} steps={DOCTOR_STEPS} className="mb-8" />

      <div className="max-w-3xl mx-auto">
        <DoctorCompletionContent doctorName={doctorName} doctorTitle={doctorTitle} />
      </div>
    </OnboardingLayout>
  );
}
