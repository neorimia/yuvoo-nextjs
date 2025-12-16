/**
 * Booking Validation Schemas
 *
 * Zod schemas for booking-related validation.
 */

import { z } from "zod";

/**
 * Create booking input schema
 */
export const createBookingSchema = z.object({
  entityId: z.string().min(1, "ID-ul entității este obligatoriu"),
  entityType: z.enum(["club", "doctor"], {
    errorMap: () => ({ message: "Tipul entității trebuie să fie 'club' sau 'doctor'" }),
  }),
  type: z.enum(["club_trial", "doctor_consultation"], {
    errorMap: () => ({
      message: "Tipul rezervării trebuie să fie 'club_trial' sau 'doctor_consultation'",
    }),
  }),
  childId: z.string().optional(),
  scheduledAt: z
    .date({
      required_error: "Data și ora programării sunt obligatorii",
      invalid_type_error: "Data și ora programării trebuie să fie o dată validă",
    })
    .refine((date) => date > new Date(), {
      message: "Data programării trebuie să fie în viitor",
    }),
  notes: z.string().max(1000, "Notițele nu pot depăși 1000 de caractere").optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
