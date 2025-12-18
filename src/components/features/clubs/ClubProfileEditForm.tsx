/**
 * Club Profile Edit Form Component
 *
 * Comprehensive form for editing club profile information.
 * Includes all sections: basic info, location, contact, schedule, pricing, age groups, gallery.
 * Uses React Hook Form with Zod validation and Cloudinary integration.
 */

"use client";

import React, { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { updateClubProfileAction } from "@/app/actions/clubs";
import { clubProfileUpdateSchema, type ClubProfileUpdateInput } from "@/lib/validations/club";
import { routes } from "@/lib/routes";
import { SPORT_TYPES } from "@/lib/utils/constants";
import { normalizePhoneNumber } from "@/lib/utils";
import type { Club } from "@/modules/clubs/clubs.types";
import {
  SingleImageUploadField,
  GalleryUploadField,
  MultiSelectCheckboxField,
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

// Age groups (4-14 years)
const AGE_GROUPS = Array.from({ length: 11 }, (_, i) => i + 4); // [4, 5, 6, ..., 14]

// Experience levels
const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Începător" },
  { value: "intermediate", label: "Intermediar" },
  { value: "advanced", label: "Avansat" },
] as const;

// Pricing types
const PRICING_TYPES = [
  { value: "monthly", label: "Lunar" },
  { value: "per_class", label: "Pe ședință" },
  { value: "per_semester", label: "Pe semestru" },
] as const;

interface ClubProfileEditFormProps {
  club: Club;
}

const ClubProfileEditForm: React.FC<ClubProfileEditFormProps> = ({ club }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Initialize form with club data
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClubProfileUpdateInput>({
    resolver: zodResolver(clubProfileUpdateSchema),
    defaultValues: {
      name: club.name,
      sportType: club.sportId || club.sportName, // Use sportId or sportName
      description: club.description,
      city: club.location.city,
      district: club.location.district,
      address: club.location.address,
      phone: club.contact.phone,
      email: club.contact.email,
      website: club.contact.website,
      schedule: club.schedule || [],
      pricing: club.pricing ? (Array.isArray(club.pricing) ? club.pricing : [club.pricing]) : [],
      ageGroups: club.ageGroups || [],
      experienceLevels: (club.levels || []) as ("beginner" | "intermediate" | "advanced")[],
      logoUrl: club.images?.[0] || "", // First image is typically logo
      galleryUrls: club.images?.slice(1) || [], // Rest are gallery images
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

  const {
    fields: pricingFields,
    append: appendPricing,
    remove: removePricing,
  } = useFieldArray({
    control,
    name: "pricing",
  });

  const logoUrl = watch("logoUrl");
  const galleryUrls = watch("galleryUrls") || [];

  const onSubmit = async (data: ClubProfileUpdateInput) => {
    startTransition(async () => {
      try {
        setServerError(null);
        setSuccessMessage(null);

        // Filter out any large data (ensure only URLs are sent, not base64 or file objects)
        // Images should already be uploaded to Cloudinary and only URLs should be in the form
        const transformedData: ClubProfileUpdateInput = {
          ...(data.name && { name: data.name }),
          ...(data.sportType && { sportType: data.sportType }),
          ...(data.description && { description: data.description }),
          ...(data.city && { city: data.city }),
          ...(data.district && { district: data.district }),
          ...(data.address && { address: data.address }),
          ...(data.phone && { phone: normalizePhoneNumber(data.phone) }),
          ...(data.email && { email: data.email }),
          ...(data.website && { website: data.website }),
          // Filter schedule to only include complete entries (all fields filled)
          // Only include schedule if there are valid entries after filtering
          ...(() => {
            if (!data.schedule || !Array.isArray(data.schedule) || data.schedule.length === 0) {
              return {};
            }
            const validSchedule = data.schedule
              .filter((entry) => entry.day && entry.startTime && entry.endTime)
              .map((entry) => ({
                day: entry.day.trim(),
                startTime: entry.startTime.trim(),
                endTime: entry.endTime.trim(),
              }));
            return validSchedule.length > 0 ? { schedule: validSchedule } : {};
          })(),
          // Filter pricing to only include complete entries (type and amount filled)
          // Only include pricing if there are valid entries after filtering
          ...(() => {
            if (!data.pricing || !Array.isArray(data.pricing) || data.pricing.length === 0) {
              return {};
            }
            const validPricing = data.pricing
              .filter((entry) => entry.type && entry.amount !== undefined && entry.amount > 0)
              .map((entry) => ({
                type: entry.type,
                amount: Number(entry.amount),
              }));
            return validPricing.length > 0 ? { pricing: validPricing } : {};
          })(),
          ...(data.ageGroups &&
            Array.isArray(data.ageGroups) &&
            data.ageGroups.length > 0 && { ageGroups: data.ageGroups }),
          ...(data.experienceLevels &&
            Array.isArray(data.experienceLevels) &&
            data.experienceLevels.length > 0 && { experienceLevels: data.experienceLevels }),
          // Only include image URLs (should be Cloudinary URLs, not base64 or file objects)
          ...(data.logoUrl &&
            typeof data.logoUrl === "string" &&
            data.logoUrl.startsWith("http") && { logoUrl: data.logoUrl }),
          ...(data.galleryUrls &&
            Array.isArray(data.galleryUrls) &&
            data.galleryUrls.length > 0 && {
              galleryUrls: data.galleryUrls.filter(
                (url): url is string => typeof url === "string" && url.startsWith("http")
              ),
            }),
        };

        // Debug: Log schedule and pricing data being sent
        if (transformedData.schedule) {
          console.log("Schedule being sent:", transformedData.schedule);
        }
        if (transformedData.pricing) {
          console.log("Pricing being sent:", transformedData.pricing);
        }

        const result = await updateClubProfileAction(transformedData);

        if (result.success) {
          setSuccessMessage("Profilul clubului a fost actualizat cu succes!");
          // Refresh router to show updated data
          router.refresh();
          // Scroll to top to show success message
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          console.error("Update failed:", result.error);
          setServerError(result.error || "Eroare la actualizarea profilului");
        }
      } catch (error) {
        console.error("Error updating club profile:", error);
        setServerError("Eroare la actualizarea profilului. Te rugăm să reîncerci.");
      }
    });
  };

  const addScheduleEntry = () => {
    appendSchedule({ day: "", startTime: "", endTime: "" });
  };

  const addPricingOption = () => {
    appendPricing({ type: "monthly", amount: 0 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bd-club-profile-edit-form">
      {/* Success Message */}
      {successMessage && (
        <BootstrapAlert
          variant="success"
          className="mb-4"
          dismissible
          onDismiss={() => setSuccessMessage(null)}
        >
          <i className="bi bi-check-circle me-2"></i>
          {successMessage}
        </BootstrapAlert>
      )}

      {/* Server Error Message */}
      {serverError && (
        <BootstrapAlert
          variant="danger"
          className="mb-4"
          dismissible
          onDismiss={() => setServerError(null)}
        >
          <AlertCircle className="h-4 w-4 me-2" />
          {serverError}
        </BootstrapAlert>
      )}

      {/* Basic Information Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-info-circle me-2"></i>
            Informații de Bază
          </h5>

          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Nume club <span className="text-danger">*</span>
              </label>
              <BootstrapInput
                id="name"
                type="text"
                {...register("name")}
                disabled={isPending}
                error={!!errors.name}
                placeholder="Ex: Club Sportiv Fotbal"
              />
              {errors.name && <div className="text-danger small mt-1">{errors.name.message}</div>}
            </div>

            <div className="col-md-6">
              <label htmlFor="sportType" className="form-label">
                Sport principal <span className="text-danger">*</span>
              </label>
              <BootstrapSelect
                id="sportType"
                {...register("sportType")}
                disabled={isPending}
                error={!!errors.sportType}
                options={[
                  { value: "", label: "Selectează sportul" },
                  ...SPORT_TYPES.map((sport) => ({
                    value: sport,
                    label: sport.charAt(0).toUpperCase() + sport.slice(1),
                  })),
                ]}
              />
              {errors.sportType && (
                <div className="text-danger small mt-1">{errors.sportType.message}</div>
              )}
            </div>

            <div className="col-12">
              <label htmlFor="description" className="form-label">
                Descriere <span className="text-danger">*</span>
              </label>
              <CharacterCounterTextarea
                label="Descriere"
                name="description"
                register={register}
                minChars={50}
                maxChars={1000}
                rows={5}
                placeholder="Descrie clubul tău, activitățile, facilitățile..."
                isLoading={isPending}
                error={errors.description}
                currentValue={watch("description")}
                required
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
                placeholder="contact@club.ro"
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
                placeholder="https://www.club.ro"
              />
              {errors.website && (
                <div className="text-danger small mt-1">{errors.website.message}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="bd-dashboard-section-title mb-0">
              <i className="bi bi-calendar-week me-2"></i>
              Program
            </h5>
            <BootstrapButton
              type="button"
              variant="outline"
              size="sm"
              onClick={addScheduleEntry}
              disabled={isPending}
              className="btn-outline-primary"
            >
              <Plus className="h-4 w-4 me-1" />
              Adaugă interval
            </BootstrapButton>
          </div>

          {scheduleFields.length === 0 ? (
            <p className="text-muted">
              Nu există intervale de program. Adaugă cel puțin un interval.
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
                            variant="outline"
                            size="sm"
                            onClick={() => removeSchedule(index)}
                            disabled={isPending}
                            className="w-100 btn-outline-danger"
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

      {/* Pricing Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="bd-dashboard-section-title mb-0">
              <i className="bi bi-currency-euro me-2"></i>
              Prețuri
            </h5>
            <BootstrapButton
              type="button"
              variant="outline"
              size="sm"
              onClick={addPricingOption}
              disabled={isPending}
              className="btn-outline-primary"
            >
              <Plus className="h-4 w-4 me-1" />
              Adaugă preț
            </BootstrapButton>
          </div>

          {pricingFields.length === 0 ? (
            <p className="text-muted">Nu există prețuri. Adaugă cel puțin un tip de abonament.</p>
          ) : (
            <div className="row g-3">
              {pricingFields.map((field, index) => (
                <div key={field.id} className="col-12">
                  <div className="card border">
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label">Tip abonament</label>
                          <BootstrapSelect
                            {...register(`pricing.${index}.type`)}
                            disabled={isPending}
                            error={!!errors.pricing?.[index]?.type}
                            options={PRICING_TYPES.map((type) => ({
                              value: type.value,
                              label: type.label,
                            }))}
                          />
                          {errors.pricing?.[index]?.type && (
                            <div className="text-danger small mt-1">
                              {errors.pricing[index]?.type?.message}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Preț (RON)</label>
                          <BootstrapInput
                            type="number"
                            step="0.01"
                            min="0"
                            {...register(`pricing.${index}.amount`, { valueAsNumber: true })}
                            disabled={isPending}
                            error={!!errors.pricing?.[index]?.amount}
                            placeholder="0.00"
                          />
                          {errors.pricing?.[index]?.amount && (
                            <div className="text-danger small mt-1">
                              {errors.pricing[index]?.amount?.message}
                            </div>
                          )}
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                          <BootstrapButton
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePricing(index)}
                            disabled={isPending}
                            className="w-100 btn-outline-danger"
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
          {errors.pricing && typeof errors.pricing === "object" && "message" in errors.pricing && (
            <div className="text-danger small mt-2">{errors.pricing.message as string}</div>
          )}
        </div>
      </div>

      {/* Age Groups & Experience Levels Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-people me-2"></i>
            Grupe de Vârstă și Niveluri
          </h5>

          <div className="row g-4">
            <div className="col-md-6">
              <MultiSelectCheckboxField
                label="Grupe de vârstă"
                name="ageGroups"
                control={control}
                options={AGE_GROUPS.map((age) => ({
                  value: age,
                  label: `${age} ani`,
                }))}
                error={errors.ageGroups as FieldError | undefined}
                isLoading={isPending}
                gridCols={{ xs: 6, sm: 4, md: 3 }}
              />
            </div>

            <div className="col-md-6">
              <MultiSelectCheckboxField
                label="Niveluri de experiență"
                name="experienceLevels"
                control={control}
                options={EXPERIENCE_LEVELS.map((level) => ({
                  value: level.value,
                  label: level.label,
                }))}
                error={errors.experienceLevels as FieldError | undefined}
                isLoading={isPending}
                gridCols={{ xs: 12, sm: 6, md: 4 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="bd-dashboard-section-title mb-4">
            <i className="bi bi-images me-2"></i>
            Logo și Galerie
          </h5>

          <div className="row g-4">
            <div className="col-12">
              <SingleImageUploadField
                label="Logo club"
                name="logoUrl"
                setValue={setValue}
                currentValue={logoUrl}
                error={errors.logoUrl}
                folder="yuvoo/clubs/logos"
                required={false}
                description="Încarcă logo-ul clubului (JPG, PNG sau WebP, maxim 5MB)"
                isLoading={isPending}
                setServerError={setServerError}
              />
            </div>

            <div className="col-12">
              <GalleryUploadField
                label="Galerie fotografii"
                name="galleryUrls"
                setValue={setValue}
                currentValues={galleryUrls}
                error={errors.galleryUrls as FieldError | undefined}
                folder="yuvoo/clubs/gallery"
                minImages={0}
                maxImages={10}
                required={false}
                description="Încarcă fotografii ale clubului (JPG, PNG sau WebP, maxim 5MB fiecare, maxim 10 fotografii)"
                gridCols={{ xs: 6, sm: 4, md: 3 }}
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
          variant="outline"
          onClick={() => router.push(routes.club.dashboard)}
          disabled={isPending}
          className="btn-outline-secondary"
        >
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

export default ClubProfileEditForm;
