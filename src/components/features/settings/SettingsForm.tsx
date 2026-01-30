/**
 * Settings Form Component
 *
 * Client component for updating user profile settings.
 * Uses React Hook Form with Zod validation.
 */

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileAction, getProfileAction } from "@/app/actions/settings";
import { updateUserProfileSchema, type UpdateUserProfileInput } from "@/lib/validations/user";
import { BootstrapInput } from "@/components/UI/bootstrap-index";
import { BootstrapButton } from "@/components/UI/bootstrap-index";

interface SettingsFormProps {
  initialData?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserProfileInput>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  // Load profile data if not provided
  useEffect(() => {
    if (!initialData) {
      const loadProfile = async () => {
        try {
          setIsLoading(true);
          const result = await getProfileAction();
          if (result.success && result.profile) {
            reset({
              firstName: result.profile.firstName || "",
              lastName: result.profile.lastName || "",
              phone: result.profile.phone || "",
            });
          }
        } catch (error) {
          console.error("Error loading profile:", error);
          setErrorMessage("Eroare la încărcarea profilului");
        } finally {
          setIsLoading(false);
        }
      };
      loadProfile();
    }
  }, [initialData, reset]);

  const onSubmit = async (data: UpdateUserProfileInput) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    startTransition(async () => {
      const result = await updateProfileAction(data);

      if (result.success) {
        setSuccessMessage("Profilul a fost actualizat cu succes!");
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setErrorMessage(result.error || "Eroare la actualizarea profilului");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-yuvoo-primary" role="status">
          <span className="visually-hidden">Se încarcă...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bd-settings-form">
      {/* Success message */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i>
          {errorMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setErrorMessage(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Email (read-only) */}
      {initialData?.email && (
        <div className="mb-4">
          <label htmlFor="email" className="d-block small fw-medium text-body mb-2">
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
      <div className="mb-4">
        <label htmlFor="firstName" className="d-block small fw-medium text-body mb-2">
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
          <p id="firstName-error" className="mt-2 small text-danger">
            {errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label htmlFor="lastName" className="d-block small fw-medium text-body mb-2">
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
          <p id="lastName-error" className="mt-2 small text-danger">
            {errors.lastName.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label htmlFor="phone" className="d-block small fw-medium text-body mb-2">
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
        {errors.phone && (
          <p id="phone-error" className="mt-2 small text-danger">
            {errors.phone.message}
          </p>
        )}
        <p className="mt-1 small text-muted">Format: +40XXXXXXXXX (opțional)</p>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <BootstrapButton type="submit" variant="primary" disabled={isPending} className="w-100">
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
            "Salvează modificările"
          )}
        </BootstrapButton>
      </div>
    </form>
  );
};

export default SettingsForm;
