/**
 * Club Settings Form Component
 *
 * Wrapper component for club admin settings that uses the shared AccountSettingsForm.
 * Provides club-specific notification preferences configuration.
 */

"use client";

import React from "react";
import AccountSettingsForm, {
  type AccountSettingsInput,
  type NotificationPreferenceConfig,
} from "@/components/shared/AccountSettingsForm";
import { updateClubSettingsAction, getClubSettingsAction } from "@/app/actions/club-settings";
import type { EmailNotificationPreferences } from "@/lib/validations/club-settings";

interface ClubSettingsFormProps {
  initialData?: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    emailNotificationPreferences: EmailNotificationPreferences;
  };
}

// Club-specific notification preferences configuration
const clubNotificationPreferencesConfig: Record<string, NotificationPreferenceConfig> = {
  bookingCreated: {
    label: "Rezervare nouă",
    description: "Primește notificări când un părinte face o rezervare nouă",
  },
  bookingConfirmed: {
    label: "Rezervare confirmată",
    description: "Primește notificări când confirmi o rezervare",
  },
  bookingCancelled: {
    label: "Rezervare anulată",
    description: "Primește notificări când o rezervare este anulată",
  },
  bookingCompleted: {
    label: "Rezervare finalizată",
    description: "Primește notificări când marchezi o rezervare ca finalizată",
  },
  bookingReminder: {
    label: "Memento rezervare",
    description: "Primește notificări de memento înainte de rezervări",
  },
};

const ClubSettingsForm: React.FC<ClubSettingsFormProps> = ({ initialData }) => {
  const handleUpdate = async (data: AccountSettingsInput) => {
    // Type assertion is safe because AccountSettingsInput structure matches UpdateClubSettingsInput
    // Both have firstName, lastName, phone, and emailNotificationPreferences
    return await updateClubSettingsAction(data as unknown);
  };

  const handleLoadSettings = async () => {
    return await getClubSettingsAction();
  };

  return (
    <AccountSettingsForm
      initialData={initialData}
      notificationPreferencesConfig={clubNotificationPreferencesConfig}
      onUpdate={handleUpdate}
      onLoadSettings={handleLoadSettings}
      className="bd-club-settings-form"
    />
  );
};

export default ClubSettingsForm;
