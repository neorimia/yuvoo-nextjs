/**
 * Club Settings Form Component
 *
 * Client component for updating club admin settings.
 * Uses React Hook Form with Zod validation.
 */

"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClubSettingsAction, getClubSettingsAction } from "@/app/actions/club-settings";
import {
  updateClubSettingsSchema,
  type UpdateClubSettingsInput,
  type EmailNotificationPreferences,
} from "@/lib/validations/club-settings";
import { BootstrapInput, BootstrapButton, BootstrapAlert } from "@/components/UI/bootstrap-index";
import { AlertCircle } from "lucide-react";

interface ClubSettingsFormProps {
  initialData?: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    emailNotificationPreferences: EmailNotificationPreferences;
  };
}

const ClubSettingsForm: React.FC<ClubSettingsFormProps> = ({ initialData }) => {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<UpdateClubSettingsInput>({
    resolver: zodResolver(updateClubSettingsSchema),
    defaultValues: initialData
      ? {
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          phone: initialData.phone,
          emailNotificationPreferences: initialData.emailNotificationPreferences,
        }
      : {
          firstName: "",
          lastName: "",
          phone: "",
          emailNotificationPreferences: {
            bookingCreated: true,
            bookingConfirmed: true,
            bookingCancelled: true,
            bookingCompleted: true,
            bookingReminder: true,
          },
        },
  });

  // Watch notification preferences for controlled checkboxes
  const notificationPrefs = watch("emailNotificationPreferences");

  // Load settings data if not provided
  useEffect(() => {
    if (!initialData) {
      const loadSettings = async () => {
        try {
          setIsLoading(true);
          const result = await getClubSettingsAction();
          if (result.success && result.settings) {
            reset({
              firstName: result.settings.firstName,
              lastName: result.settings.lastName,
              phone: result.settings.phone,
              emailNotificationPreferences: result.settings.emailNotificationPreferences,
            });
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
  }, [initialData, reset]);

  // Scroll to success/error messages
  useEffect(() => {
    if (successMessage && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    if (errorMessage && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [successMessage, errorMessage]);

  const onSubmit = async (data: UpdateClubSettingsInput) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    startTransition(async () => {
      const result = await updateClubSettingsAction(data);

      if (result.success) {
        setSuccessMessage("Setările au fost actualizate cu succes!");
        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage(result.error || "Eroare la actualizarea setărilor");
      }
    });
  };

  const handleNotificationToggle = (key: keyof EmailNotificationPreferences, value: boolean) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="bd-club-settings-form">
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
          <p className="text-muted small mb-4">
            Alege ce notificări email dorești să primești despre rezervările clubului tău.
          </p>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="bookingCreated"
                checked={notificationPrefs?.bookingCreated ?? true}
                onChange={(e) => handleNotificationToggle("bookingCreated", e.target.checked)}
                disabled={isPending}
              />
              <label className="form-check-label" htmlFor="bookingCreated">
                <strong>Rezervare nouă</strong>
                <p className="small text-muted mb-0">
                  Primește notificări când un părinte face o rezervare nouă
                </p>
              </label>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="bookingConfirmed"
                checked={notificationPrefs?.bookingConfirmed ?? true}
                onChange={(e) => handleNotificationToggle("bookingConfirmed", e.target.checked)}
                disabled={isPending}
              />
              <label className="form-check-label" htmlFor="bookingConfirmed">
                <strong>Rezervare confirmată</strong>
                <p className="small text-muted mb-0">
                  Primește notificări când confirmi o rezervare
                </p>
              </label>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="bookingCancelled"
                checked={notificationPrefs?.bookingCancelled ?? true}
                onChange={(e) => handleNotificationToggle("bookingCancelled", e.target.checked)}
                disabled={isPending}
              />
              <label className="form-check-label" htmlFor="bookingCancelled">
                <strong>Rezervare anulată</strong>
                <p className="small text-muted mb-0">
                  Primește notificări când o rezervare este anulată
                </p>
              </label>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="bookingCompleted"
                checked={notificationPrefs?.bookingCompleted ?? true}
                onChange={(e) => handleNotificationToggle("bookingCompleted", e.target.checked)}
                disabled={isPending}
              />
              <label className="form-check-label" htmlFor="bookingCompleted">
                <strong>Rezervare finalizată</strong>
                <p className="small text-muted mb-0">
                  Primește notificări când marchezi o rezervare ca finalizată
                </p>
              </label>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="bookingReminder"
                checked={notificationPrefs?.bookingReminder ?? true}
                onChange={(e) => handleNotificationToggle("bookingReminder", e.target.checked)}
                disabled={isPending}
              />
              <label className="form-check-label" htmlFor="bookingReminder">
                <strong>Memento rezervare</strong>
                <p className="small text-muted mb-0">
                  Primește notificări de memento înainte de rezervări
                </p>
              </label>
            </div>
          </div>
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

export default ClubSettingsForm;
