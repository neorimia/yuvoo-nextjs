/**
 * Doctor Profile Edit Form Component
 *
 * Comprehensive form for editing doctor profile information.
 * Includes all sections: basic info, bio & experience, location, contact, availability, photo.
 * Uses React Hook Form with Zod validation and Cloudinary integration.
 */

"use client";

import React, { useState, useTransition, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { updateDoctorProfileAction } from "@/app/actions/doctor-profile";
import { doctorProfileUpdateSchema, type DoctorProfileUpdateInput } from "@/lib/validations/doctor";
import { routes } from "@/lib/routes";
import { normalizePhoneNumber } from "@/lib/utils";
import type { Doctor } from "@/modules/doctors/doctors.types";
import {
  SingleImageUploadField,
  TagInputField,
  CharacterCounterTextarea,
} from "@/components/features/onboarding/components";
import {
  BootstrapInput,
  BootstrapSelect,
  BootstrapButton,
  BootstrapAlert,
} from "@/components/UI/bootstrap-index";
import { AlertCircle, Plus, X } from "lucide-react";
import type { FieldError } from "react-hook-form";

// Romanian cities (major cities)
const ROMANIAN_CITIES = [
  "București",
  "Cluj-Napoca",
  "Timișoara",
  "Iași",
  "Constanța",
  "Craiova",
  "Brașov",
  "Galați",
  "Ploiești",
  "Oradea",
  "Brăila",
  "Arad",
  "Pitești",
  "Sibiu",
  "Bacău",
  "Târgu Mureș",
  "Baia Mare",
  "Buzău",
  "Satu Mare",
  "Botoșani",
  "Râmnicu Vâlcea",
  "Suceava",
  "Piatra Neamț",
  "Drobeta-Turnu Severin",
  "Focșani",
  "Târgu Jiu",
  "Tulcea",
  "Târgoviște",
  "Reșița",
  "Călărași",
] as const;

// Days of the week in Romanian
const DAYS_OF_WEEK = [
  { value: "luni", label: "Luni" },
  { value: "marti", label: "Marți" },
  { value: "miercuri", label: "Miercuri" },
  { value: "joi", label: "Joi" },
  { value: "vineri", label: "Vineri" },
  { value: "sambata", label: "Sâmbătă" },
  { value: "duminica", label: "Duminică" },
] as const;

// Doctor specialties
const DOCTOR_SPECIALTIES = [
  { value: "orthopedist", label: "Ortoped pediatric" },
  { value: "nutritionist", label: "Nutriționist" },
  { value: "psychologist", label: "Psiholog" },
  { value: "sports_medicine", label: "Medicină sportivă" },
] as const;

interface DoctorProfileEditFormProps {
  doctor: Doctor;
}

const DoctorProfileEditForm: React.FC<DoctorProfileEditFormProps> = ({ doctor }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);
  const errorMessageRef = useRef<HTMLDivElement>(null);

  // Parse doctor name into firstName and lastName
  const nameParts = doctor.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Initialize form with doctor data
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DoctorProfileUpdateInput>({
    resolver: zodResolver(doctorProfileUpdateSchema),
    defaultValues: {
      firstName,
      lastName,
      title: doctor.name.includes("Dr.") ? "Dr." : "",
      specialty: doctor.specialty === "general" ? "sports_medicine" : doctor.specialty,
      secondarySpecialties: [],
      credentials: doctor.credentials || [],
      bio: doctor.description,
      yearsOfExperience: undefined,
      languages: [],
      city: doctor.location.city,
      district: doctor.location.district,
      address: doctor.location.address,
      phone: doctor.contact.phone,
      email: doctor.contact.email,
      website: doctor.contact.website,
      acceptingNewPatients: doctor.acceptingNewPatients ?? true,
      onlineConsultations: doctor.onlineConsultations || false,
      schedule: (doctor as unknown as { schedule?: unknown[] }).schedule || [],
      photoUrl: doctor.image || "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control,
    name: "schedule",
  });

  const photoUrl = watch("photoUrl");
  const credentials = watch("credentials") || [];

  const onSubmit = async (data: DoctorProfileUpdateInput) => {
    startTransition(async () => {
      try {
        setServerError(null);
        setSuccessMessage(null);

        // Transform data for submission
        const transformedData: DoctorProfileUpdateInput = {
          ...(data.firstName && { firstName: data.firstName }),
          ...(data.lastName && { lastName: data.lastName }),
          ...(data.title !== undefined && { title: data.title }),
          ...(data.specialty && { specialty: data.specialty }),
          ...(data.secondarySpecialties &&
            Array.isArray(data.secondarySpecialties) &&
            data.secondarySpecialties.length > 0 && {
              secondarySpecialties: data.secondarySpecialties,
            }),
          ...(data.credentials &&
            Array.isArray(data.credentials) &&
            data.credentials.length > 0 && { credentials: data.credentials }),
          ...(data.bio && { bio: data.bio }),
          ...(data.yearsOfExperience !== undefined && {
            yearsOfExperience: data.yearsOfExperience,
          }),
          ...(data.languages &&
            Array.isArray(data.languages) &&
            data.languages.length > 0 && { languages: data.languages }),
          ...(data.city && { city: data.city }),
          ...(data.district && { district: data.district }),
          ...(data.address && { address: data.address }),
          ...(data.phone && { phone: normalizePhoneNumber(data.phone) }),
          ...(data.email && { email: data.email }),
          ...(data.website && { website: data.website }),
          ...(data.acceptingNewPatients !== undefined && {
            acceptingNewPatients: data.acceptingNewPatients,
          }),
          ...(data.onlineConsultations !== undefined && {
            onlineConsultations: data.onlineConsultations,
          }),
          ...(data.schedule &&
            Array.isArray(data.schedule) &&
            data.schedule.length > 0 && {
              schedule: data.schedule
                .filter((entry) => entry && entry.day && entry.startTime && entry.endTime)
                .map((entry) => ({
                  day: entry.day?.trim() || "",
                  startTime: entry.startTime?.trim() || "",
                  endTime: entry.endTime?.trim() || "",
                }))
                .filter((entry) => entry.day && entry.startTime && entry.endTime),
            }),
          ...(data.photoUrl &&
            typeof data.photoUrl === "string" &&
            data.photoUrl.startsWith("http") && { photoUrl: data.photoUrl }),
        };

        const result = await updateDoctorProfileAction(transformedData);

        if (result.success) {
          setSuccessMessage("Profilul doctorului a fost actualizat cu succes!");
          setServerError(null);
          router.refresh();
          setTimeout(() => {
            successMessageRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        } else {
          console.error("Update failed:", result.error);
          setServerError(result.error || "Eroare la actualizarea profilului");
          setSuccessMessage(null);
          setTimeout(() => {
            errorMessageRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        }
      } catch (error) {
        console.error("Error updating doctor profile:", error);
        setServerError("Eroare la actualizarea profilului. Te rugăm să reîncerci.");
      }
    });
  };

  const addScheduleEntry = () => {
    appendSchedule({ day: "", startTime: "", endTime: "" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bd-doctor-profile-edit-form">
      {/* Success Message */}
      {successMessage && (
        <div ref={successMessageRef}>
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

      {/* Server Error Message */}
      {serverError && (
        <div ref={errorMessageRef}>
          <BootstrapAlert
            variant="danger"
            className="mb-4"
            dismissible
            onDismiss={() => setServerError(null)}
          >
            <AlertCircle className="h-4 w-4 me-2" />
            {serverError}
          </BootstrapAlert>
        </div>
      )}

      {/* Basic Information Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-info-circle me-2"></i>
            Informații de Bază
          </h5>

          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label">
                Prenume <span className="text-danger">*</span>
              </label>
              <BootstrapInput
                id="firstName"
                type="text"
                {...register("firstName")}
                disabled={isPending}
                error={!!errors.firstName}
                placeholder="Ex: Ion"
              />
              {errors.firstName && (
                <div className="text-danger small mt-1">{errors.firstName.message}</div>
              )}
            </div>

            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label">
                Nume <span className="text-danger">*</span>
              </label>
              <BootstrapInput
                id="lastName"
                type="text"
                {...register("lastName")}
                disabled={isPending}
                error={!!errors.lastName}
                placeholder="Ex: Popescu"
              />
              {errors.lastName && (
                <div className="text-danger small mt-1">{errors.lastName.message}</div>
              )}
            </div>

            <div className="col-md-4">
              <label htmlFor="title" className="form-label">
                Titlu
              </label>
              <BootstrapInput
                id="title"
                type="text"
                {...register("title")}
                disabled={isPending}
                error={!!errors.title}
                placeholder="Ex: Dr., Conf. Dr."
              />
              {errors.title && <div className="text-danger small mt-1">{errors.title.message}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="specialty" className="form-label">
                Specialitate principală <span className="text-danger">*</span>
              </label>
              <BootstrapSelect
                id="specialty"
                {...register("specialty")}
                disabled={isPending}
                error={!!errors.specialty}
                options={[
                  { value: "", label: "Selectează specialitatea" },
                  ...DOCTOR_SPECIALTIES.map((spec) => ({
                    value: spec.value,
                    label: spec.label,
                  })),
                ]}
              />
              {errors.specialty && (
                <div className="text-danger small mt-1">{errors.specialty.message}</div>
              )}
            </div>

            <div className="col-12">
              <CharacterCounterTextarea
                label="Descriere profesională"
                name="bio"
                register={register}
                minChars={100}
                maxChars={2000}
                rows={6}
                placeholder="Descrie experiența ta profesională, abordarea ta și de ce ești pasionat de medicina sportivă pediatrică..."
                isLoading={isPending}
                error={errors.bio}
                currentValue={watch("bio")}
                required={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Credentials Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-award me-2"></i>
            Calificări și Certificări
          </h5>

          <div className="row g-3">
            <div className="col-12">
              <TagInputField
                label="Credențiale"
                name="credentials"
                control={control}
                setValue={setValue}
                currentValues={credentials}
                error={errors.credentials as FieldError | undefined}
                quickAddOptions={["MD", "Specialist", "Conf. Dr.", "Dr.", "PhD"]}
                placeholder="Adaugă credențială (ex: MD, Specialist)"
                isLoading={isPending}
                required={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-geo-alt me-2"></i>
            Locație
          </h5>

          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="city" className="form-label">
                Oraș <span className="text-danger">*</span>
              </label>
              <BootstrapSelect
                id="city"
                {...register("city")}
                disabled={isPending}
                error={!!errors.city}
                options={[
                  { value: "", label: "Selectează orașul" },
                  ...ROMANIAN_CITIES.map((city) => ({
                    value: city,
                    label: city,
                  })),
                ]}
              />
              {errors.city && <div className="text-danger small mt-1">{errors.city.message}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="district" className="form-label">
                Sector/District
              </label>
              <BootstrapInput
                id="district"
                type="text"
                {...register("district")}
                disabled={isPending}
                error={!!errors.district}
                placeholder="Ex: Sector 1"
              />
              {errors.district && (
                <div className="text-danger small mt-1">{errors.district.message}</div>
              )}
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">
                Adresă completă <span className="text-danger">*</span>
              </label>
              <BootstrapInput
                id="address"
                type="text"
                {...register("address")}
                disabled={isPending}
                error={!!errors.address}
                placeholder="Ex: Strada Exemplu, Nr. 123"
              />
              {errors.address && (
                <div className="text-danger small mt-1">{errors.address.message}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-telephone me-2"></i>
            Contact
          </h5>

          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="phone" className="form-label">
                Telefon <span className="text-danger">*</span>
              </label>
              <BootstrapInput
                id="phone"
                type="tel"
                {...register("phone")}
                disabled={isPending}
                error={!!errors.phone}
                placeholder="+40721234567"
              />
              {errors.phone && <div className="text-danger small mt-1">{errors.phone.message}</div>}
            </div>

            <div className="col-md-4">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <BootstrapInput
                id="email"
                type="email"
                {...register("email")}
                disabled={isPending}
                error={!!errors.email}
                placeholder="contact@doctor.ro"
              />
              {errors.email && <div className="text-danger small mt-1">{errors.email.message}</div>}
            </div>

            <div className="col-md-4">
              <label htmlFor="website" className="form-label">
                Website
              </label>
              <BootstrapInput
                id="website"
                type="url"
                {...register("website")}
                disabled={isPending}
                error={!!errors.website}
                placeholder="https://www.doctor.ro"
              />
              {errors.website && (
                <div className="text-danger small mt-1">{errors.website.message}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Availability Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-calendar-check me-2"></i>
            Disponibilitate
          </h5>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="acceptingNewPatients"
                  {...register("acceptingNewPatients")}
                  disabled={isPending}
                />
                <label className="form-check-label" htmlFor="acceptingNewPatients">
                  Acceptă pacienți noi
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="onlineConsultations"
                  {...register("onlineConsultations")}
                  disabled={isPending}
                />
                <label className="form-check-label" htmlFor="onlineConsultations">
                  Consultații online
                </label>
              </div>
            </div>

            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="form-label mb-0">
                  <i className="bi bi-calendar-week me-2"></i>
                  Program (opțional - poate fi gestionat în pagina de disponibilitate)
                </label>
                <BootstrapButton
                  type="button"
                  size="sm"
                  onClick={addScheduleEntry}
                  disabled={isPending}
                >
                  <Plus className="h-4 w-4 me-1" />
                  Adaugă interval
                </BootstrapButton>
              </div>

              {scheduleFields.length === 0 ? (
                <p className="text-muted">
                  Nu există intervale de program. Poți adăuga intervale aici sau gestiona
                  disponibilitatea în pagina dedicată.
                </p>
              ) : (
                <div className="row g-3">
                  {scheduleFields.map((field, index) => (
                    <div key={field.id} className="col-12">
                      <div className="card border">
                        <div className="card-body">
                          <div className="row g-3">
                            <div className="col-md-4">
                              <label className="form-label">Zi</label>
                              <BootstrapSelect
                                {...register(`schedule.${index}.day`)}
                                disabled={isPending}
                                error={!!errors.schedule?.[index]?.day}
                                options={[
                                  { value: "", label: "Selectează ziua" },
                                  ...DAYS_OF_WEEK.map((day) => ({
                                    value: day.value,
                                    label: day.label,
                                  })),
                                ]}
                              />
                              {errors.schedule?.[index]?.day && (
                                <div className="text-danger small mt-1">
                                  {errors.schedule[index]?.day?.message}
                                </div>
                              )}
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Ora început</label>
                              <BootstrapInput
                                type="time"
                                {...register(`schedule.${index}.startTime`)}
                                disabled={isPending}
                                error={!!errors.schedule?.[index]?.startTime}
                              />
                              {errors.schedule?.[index]?.startTime && (
                                <div className="text-danger small mt-1">
                                  {errors.schedule[index]?.startTime?.message}
                                </div>
                              )}
                            </div>
                            <div className="col-md-3">
                              <label className="form-label">Ora sfârșit</label>
                              <BootstrapInput
                                type="time"
                                {...register(`schedule.${index}.endTime`)}
                                disabled={isPending}
                                error={!!errors.schedule?.[index]?.endTime}
                              />
                              {errors.schedule?.[index]?.endTime && (
                                <div className="text-danger small mt-1">
                                  {errors.schedule[index]?.endTime?.message}
                                </div>
                              )}
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                              <BootstrapButton
                                type="button"
                                variant="danger"
                                size="sm"
                                onClick={() => removeSchedule(index)}
                                disabled={isPending}
                              >
                                <X className="h-4 w-4" />
                              </BootstrapButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {errors.schedule &&
                typeof errors.schedule === "object" &&
                "message" in errors.schedule && (
                  <div className="text-danger small mt-2">{errors.schedule.message as string}</div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-image me-2"></i>
            Fotografie Profil
          </h5>

          <div className="row g-4">
            <div className="col-12">
              <SingleImageUploadField
                label="Fotografie profil"
                name="photoUrl"
                setValue={setValue}
                currentValue={photoUrl}
                error={errors.photoUrl}
                folder="yuvoo/doctors/photos"
                required={false}
                description="Încarcă fotografia ta de profil (JPG, PNG sau WebP, maxim 5MB)"
                isLoading={isPending}
                setServerError={setServerError}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="d-flex gap-3 justify-content-end mb-4">
        <BootstrapButton
          type="button"
          variant="danger"
          onClick={() => router.push(routes.doctor.dashboard)}
          disabled={isPending}
        >
          <i className="bi bi-x-circle me-2"></i>
          Anulează
        </BootstrapButton>
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

export default DoctorProfileEditForm;
