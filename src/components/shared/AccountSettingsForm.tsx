/**
 * Account Settings Form Component (Shared)
 *
 * Generic component for account settings and email notification preferences.
 * Supports configurable notification types for different user roles (club, doctor, etc.).
 * Uses React Hook Form with Zod validation.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BootstrapInput, BootstrapButton, BootstrapAlert } from "@/components/UI/bootstrap-index";
import { AlertCircle } from "lucide-react";
import { z } from "zod";
import { phoneSchema } from "@/lib/validations/common";
import type { EmailNotificationPreferences } from "@/modules/auth/auth.types";

/**
 * Base schema for account settings
 */
const accountSettingsBaseSchema = z.object({
  firstName: z
    .string()
    .min(1, "Prenumele este obligatoriu")
    .max(50, "Prenumele este prea lung")
    .optional(),
  lastName: z
    .string()
    .min(1, "Numele este obligatoriu")
    .max(50, "Numele este prea lung")
    .optional(),
  phone: phoneSchema.optional().or(z.literal("")),
});

export type AccountSettingsInput = z.infer<typeof accountSettingsBaseSchema> & {
  emailNotificationPreferences?: Record<string, boolean>;
};

export interface NotificationPreferenceConfig {
  label: string;
  description: string;
}

export interface AccountSettingsFormProps {
  /**
   * Initial form data (email, firstName, lastName, phone, emailNotificationPreferences)
   */
  initialData?: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    emailNotificationPreferences: EmailNotificationPreferences | Record<string, boolean>;
  };
  /**
   * Configuration for notification preferences (key -> {label, description})
   * Example: { bookingCreated: { label: "Rezervare nouă", description: "..." } }
   */
  notificationPreferencesConfig: Record<string, NotificationPreferenceConfig>;
  /**
   * Callback function to handle form submission
   */
  onUpdate: (data: AccountSettingsInput) => Promise<{ success: boolean; error?: string }>;
  /**
   * Optional callback to load settings data (if initialData not provided)
   */
  onLoadSettings?: () => Promise<{
    success: boolean;
    settings?: AccountSettingsFormProps["initialData"];
    error?: string;
  }>;
  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * AccountSettingsForm Component
 *
 * Generic form component for account settings and email notification preferences.
 * Supports configurable notification types for different user roles.
 *
 * @example
 * ```tsx
 * <AccountSettingsForm
 *   initialData={{
 *     email: "admin@club.com",
 *     firstName: "Maria",
 *     lastName: "Popescu",
 *     phone: "+40721234567",
 *     emailNotificationPreferences: {
 *       bookingCreated: true,
 *       bookingConfirmed: true,
 *       // ...
 *     },
 *   }}
 *   notificationPreferencesConfig={{
 *     bookingCreated: {
 *       label: "Rezervare nouă",
 *       description: "Primește notificări când un părinte face o rezervare nouă",
 *     },
 *     // ...
 *   }}
 *   onUpdate={handleUpdate}
 * />
 * ```
 */
const AccountSettingsForm: React.FC<AccountSettingsFormProps> = ({
  initialData,
  notificationPreferencesConfig,
  onUpdate,
  onLoadSettings,
  className,
}) => {
  const [isPending, setIsPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  // Create dynamic schema based on notification preferences config
  const notificationPreferencesSchema = z.object(
    Object.keys(notificationPreferencesConfig).reduce(
      (acc, key) => {
        acc[key] = z.boolean();
        return acc;
      },
      {} as Record<string, z.ZodBoolean>
    )
  );

  const formSchema = accountSettingsBaseSchema.extend({
    emailNotificationPreferences: notificationPreferencesSchema.optional(),
  });

  type FormInput = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          phone: initialData.phone,
          emailNotificationPreferences: initialData.emailNotificationPreferences as Record<
            string,
            boolean
          >,
        }
      : {
          firstName: "",
          lastName: "",
          phone: "",
          emailNotificationPreferences: Object.keys(notificationPreferencesConfig).reduce(
            (acc, key) => {
              acc[key] = true;
              return acc;
            },
            {} as Record<string, boolean>
          ),
        },
  });

  // Watch notification preferences for controlled checkboxes
  const notificationPrefs = watch("emailNotificationPreferences");

  // Load settings data if not provided
  useEffect(() => {
    if (!initialData && onLoadSettings) {
      const loadSettings = async () => {
        try {
          setIsLoading(true);
          const result = await onLoadSettings();
          if (result.success && result.settings) {
            reset({
              firstName: result.settings.firstName,
              lastName: result.settings.lastName,
              phone: result.settings.phone,
              emailNotificationPreferences: result.settings.emailNotificationPreferences as Record<
                string,
                boolean
              >,
            });
          } else if (result.error) {
            setErrorMessage(result.error);
          }
        } catch (error) {
          console.error("Error loading settings:", error);
          setErrorMessage("Eroare la încărcarea setărilor");
        } finally {
          setIsLoading(false);
        }
      };
      loadSettings();
    }
  }, [initialData, onLoadSettings, reset]);

  // Scroll to success/error messages
  useEffect(() => {
    if (successMessage && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    if (errorMessage && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [successMessage, errorMessage]);

  const onSubmit = async (data: FormInput) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsPending(true);

    try {
      const result = await onUpdate(data);

      if (result.success) {
        setSuccessMessage("Setările au fost actualizate cu succes!");
        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage(result.error || "Eroare la actualizarea setărilor");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      setErrorMessage("Eroare la actualizarea setărilor. Te rugăm să reîncerci.");
    } finally {
      setIsPending(false);
    }
  };

  const handleNotificationToggle = (key: string, value: boolean) => {
    if (notificationPrefs) {
      setValue("emailNotificationPreferences", {
        ...notificationPrefs,
        [key]: value,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Se încarcă...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className || ""}>
      {/* Success Message */}
      {successMessage && (
        <div ref={successRef}>
          <BootstrapAlert
            variant="success"
            className="mb-4"
            dismissible
            onDismiss={() => setSuccessMessage(null)}
          >
            <i className="bi bi-check-circle me-2"></i>
            {successMessage}
          </BootstrapAlert>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div ref={errorRef}>
          <BootstrapAlert
            variant="danger"
            className="mb-4"
            dismissible
            onDismiss={() => setErrorMessage(null)}
          >
            <AlertCircle className="h-4 w-4 me-2" />
            {errorMessage}
          </BootstrapAlert>
        </div>
      )}

      {/* Account Settings Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-person-circle me-2"></i>
            Setări Cont
          </h5>
          <div className="row g-3">
            {/* Email (read-only) */}
            {initialData?.email && (
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <BootstrapInput
                  id="email"
                  type="email"
                  value={initialData.email}
                  disabled
                  className="w-100 bg-light"
                />
                <p className="mt-1 small text-muted">Email-ul nu poate fi schimbat</p>
              </div>
            )}

            {/* First Name */}
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">
                Prenume
              </label>
              <BootstrapInput
                id="firstName"
                type="text"
                {...register("firstName")}
                disabled={isPending}
                error={!!errors.firstName}
                className="w-100"
                placeholder="ex. Maria"
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
              />
              {errors.firstName && (
                <div className="text-danger small mt-1">{errors.firstName.message}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">
                Nume
              </label>
              <BootstrapInput
                id="lastName"
                type="text"
                {...register("lastName")}
                disabled={isPending}
                error={!!errors.lastName}
                className="w-100"
                placeholder="ex. Popescu"
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
              />
              {errors.lastName && (
                <div className="text-danger small mt-1">{errors.lastName.message}</div>
              )}
            </div>

            {/* Phone */}
            <div className="col-12">
              <label htmlFor="phone" className="form-label">
                Telefon
              </label>
              <BootstrapInput
                id="phone"
                type="tel"
                {...register("phone")}
                disabled={isPending}
                error={!!errors.phone}
                className="w-100"
                placeholder="ex. +40721234567"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && <div className="text-danger small mt-1">{errors.phone.message}</div>}
              <p className="mt-1 small text-muted">Format: +40XXXXXXXXX (opțional)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Notification Preferences Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-envelope me-2"></i>
            Preferințe Notificări Email
          </h5>
          <p className="text-muted small mb-4">Alege ce notificări email dorești să primești.</p>

          {Object.entries(notificationPreferencesConfig).map(([key, config]) => (
            <div key={key} className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={key}
                  checked={notificationPrefs?.[key] ?? true}
                  onChange={(e) => handleNotificationToggle(key, e.target.checked)}
                  disabled={isPending}
                />
                <label className="form-check-label" htmlFor={key}>
                  <strong>{config.label}</strong>
                  <p className="small text-muted mb-0">{config.description}</p>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="d-flex gap-3 justify-content-end mb-4">
        <BootstrapButton type="submit" variant="primary" disabled={isPending}>
          {isPending ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Se salvează...
            </>
          ) : (
            <>
              <i className="bi bi-check-circle me-2"></i>
              Salvează modificările
            </>
          )}
        </BootstrapButton>
      </div>
    </form>
  );
};

export default AccountSettingsForm;
