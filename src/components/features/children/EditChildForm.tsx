/**
 * Edit Child Form Component
 *
 * Client component for editing child profile.
 * Uses React Hook Form with Zod validation and custom date picker.
 *
 * Features:
 * - Romanian labels and error messages
 * - Date picker with age validation (4-14 years)
 * - Server action integration
 * - Loading states and error handling
 * - Responsive design
 */

"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateChildAction } from "@/app/actions/children";
import { updateChildSchema, type UpdateChildInput } from "@/lib/validations/child";
import { routes } from "@/lib/routes";
import {
  DatePickerWithAgeField,
  RadioButtonGroupField,
} from "@/components/features/onboarding/components";
import { BootstrapInput } from "@/components/UI/bootstrap-index";
import { BootstrapButton } from "@/components/UI/bootstrap-index";
import type { Child } from "@/modules/children/children.types";

interface EditChildFormProps {
  child: Child;
}

const EditChildForm: React.FC<EditChildFormProps> = ({ child }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateChildInput>({
    resolver: zodResolver(updateChildSchema),
    defaultValues: {
      firstName: child.firstName,
      lastName: child.lastName,
      dateOfBirth: child.dateOfBirth,
      gender: child.gender,
    },
  });

  const onSubmit = async (data: UpdateChildInput) => {
    setServerError(null);
    setSuccessMessage(null);

    startTransition(async () => {
      try {
        const result = await updateChildAction(child.id, data);

        if (result.success) {
          setSuccessMessage("Profilul copilului a fost actualizat cu succes!");
          // Redirect after 1.5 seconds
          setTimeout(() => {
            router.push(routes.parent.children.list);
            router.refresh();
          }, 1500);
        } else {
          setServerError(result.error || "Eroare la actualizarea profilului");
        }
      } catch (error) {
        console.error("Error updating child:", error);
        setServerError("Eroare la actualizarea profilului. Te rugăm să reîncerci.");
      }
    });
  };

  return (
    <form id="edit-child-form" onSubmit={handleSubmit(onSubmit)}>
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

      {/* Server error message */}
      {serverError && (
        <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i>
          {serverError}
          <button
            type="button"
            className="btn-close"
            onClick={() => setServerError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* First Name */}
      <div className="mb-4">
        <label htmlFor="firstName" className="d-block small fw-medium text-body mb-2">
          Prenume <span className="text-danger">*</span>
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
          Nume <span className="text-danger">*</span>
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

      {/* Date of Birth */}
      <DatePickerWithAgeField
        label="Data nașterii"
        name="dateOfBirth"
        setValue={setValue}
        currentValue={watch("dateOfBirth")}
        error={errors.dateOfBirth}
        required={false}
        description="Platforma Yuvoo este destinată copiilor cu vârste între 4 și 14 ani."
        minAge={4}
        maxAge={14}
        isLoading={isPending}
      />

      {/* Gender (Optional) */}
      <RadioButtonGroupField
        label="Gen"
        name="gender"
        register={register}
        error={errors.gender}
        options={[
          { value: "male", label: "Băiat", emoji: "👦" },
          { value: "female", label: "Fată", emoji: "👧" },
          { value: "other", label: "Altul", emoji: "👶" },
        ]}
        gridCols={{ xs: 4, sm: 4, md: 4 }}
        description="(opțional)"
        isLoading={isPending}
      />

      {/* Action Buttons */}
      <div className="pt-4 border-top border-secondary d-flex gap-3">
        <BootstrapButton
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isPending}
          className="flex-grow-1"
        >
          Anulează
        </BootstrapButton>
        <BootstrapButton
          type="submit"
          variant="primary"
          disabled={isPending}
          className="flex-grow-1"
        >
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

export default EditChildForm;
