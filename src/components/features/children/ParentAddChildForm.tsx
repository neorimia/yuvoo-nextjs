"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createChildAction } from "@/app/actions/children";
import { createChildSchema, type CreateChildInput } from "@/lib/validations/child";
import { routes } from "@/lib/routes";
import {
  DatePickerWithAgeField,
  RadioButtonGroupField,
} from "@/components/features/onboarding/components";
import { BootstrapInput } from "@/components/UI/bootstrap-index";

export default function ParentAddChildForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateChildInput>({
    resolver: zodResolver(createChildSchema),
  });

  const onSubmit = (data: CreateChildInput) => {
    setServerError(null);
    startTransition(async () => {
      const result = await createChildAction(data);
      if (result.success && result.child) {
        router.push(routes.parent.children.list);
        router.refresh();
      } else {
        setServerError(result.error || "Eroare la crearea profilului copilului");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bd-parent-add-child-form">
      {serverError && (
        <div className="alert alert-danger mb-4" role="alert">
          {serverError}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="firstName" className="form-label">
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
        />
        {errors.firstName && <p className="mt-2 small text-danger">{errors.firstName.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="form-label">
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
        />
        {errors.lastName && <p className="mt-2 small text-danger">{errors.lastName.message}</p>}
      </div>

      <DatePickerWithAgeField
        label="Data nașterii"
        name="dateOfBirth"
        setValue={setValue}
        currentValue={watch("dateOfBirth")}
        error={errors.dateOfBirth}
        required
        description="Platforma Yuvoo este destinată copiilor cu vârste între 4 și 14 ani."
        minAge={4}
        maxAge={14}
        isLoading={isPending}
      />

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

      <div className="d-flex gap-2 flex-wrap pt-3 border-top">
        <button type="submit" className="btn btn-yuvoo-primary" disabled={isPending}>
          {isPending ? "Se salvează..." : "Adaugă copil"}
        </button>
        <a href={routes.parent.children.list} className="btn btn-outline-secondary">
          Anulează
        </a>
      </div>
    </form>
  );
}
