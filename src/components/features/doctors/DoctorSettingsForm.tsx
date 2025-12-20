/**
 * Doctor Settings Form Component
 *
 * Wrapper component for doctor settings that uses the shared AccountSettingsForm.
 * Provides doctor-specific notification preferences configuration.
 */

"use client";

import React from "react";
import AccountSettingsForm, {
  type AccountSettingsInput,
  type NotificationPreferenceConfig,
} from "@/components/shared/AccountSettingsForm";
import { updateDoctorSettingsAction, getDoctorSettingsAction } from "@/app/actions/doctor-settings";
import type { DoctorEmailNotificationPreferences } from "@/lib/validations/doctor-settings";

interface DoctorSettingsFormProps {
  initialData?: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    emailNotificationPreferences: DoctorEmailNotificationPreferences;
  };
}

// Doctor-specific notification preferences configuration
const doctorNotificationPreferencesConfig: Record<string, NotificationPreferenceConfig> = {
  consultationCreated: {
    label: "Consultație nouă",
    description: "Primește notificări când un părinte rezervă o consultație nouă",
  },
  consultationConfirmed: {
    label: "Consultație confirmată",
    description: "Primește notificări când confirmi o consultație",
  },
  consultationCancelled: {
    label: "Consultație anulată",
    description: "Primește notificări când o consultație este anulată",
  },
  consultationReminder: {
    label: "Memento consultație",
    description: "Primește memento-uri pentru consultațiile viitoare",
  },
};

const DoctorSettingsForm: React.FC<DoctorSettingsFormProps> = ({ initialData }) => {
  const handleUpdate = async (data: AccountSettingsInput) => {
    // Type assertion is safe because AccountSettingsInput structure matches UpdateDoctorSettingsInput
    // Both have firstName, lastName, phone, and emailNotificationPreferences
    return await updateDoctorSettingsAction(data as unknown);
  };

  const handleLoadSettings = async () => {
    return await getDoctorSettingsAction();
  };

  return (
    <AccountSettingsForm
      initialData={initialData}
      notificationPreferencesConfig={doctorNotificationPreferencesConfig}
      onUpdate={handleUpdate}
      onLoadSettings={handleLoadSettings}
      className="bd-doctor-settings-form"
    />
  );
};

export default DoctorSettingsForm;
