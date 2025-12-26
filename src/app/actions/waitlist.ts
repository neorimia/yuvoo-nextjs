"use server";

import { db } from "@/lib/db";
import { waitlistEmails } from "@/lib/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

/**
 * Waitlist signup schema
 */
const waitlistSchema = z.object({
  email: z.string().email("Email invalid").min(1, "Email este obligatoriu"),
  name: z.string().optional(),
  userType: z.enum(["parent", "club", "doctor"]).optional(),
  source: z.string().optional(),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

/**
 * Submit Waitlist Action
 *
 * Saves email to waitlist_emails table for early access signup.
 * Used in pre-launch pages and early access modals.
 */
export async function submitWaitlistAction(formData: FormData) {
  const data: WaitlistFormData = {
    email: (formData.get("email") as string) || "",
    name: (formData.get("name") as string) || undefined,
    userType: (formData.get("userType") as "parent" | "club" | "doctor") || undefined,
    source: (formData.get("source") as string) || undefined,
  };

  // Validate input
  const validated = waitlistSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.errors[0]?.message || "Date invalide",
    };
  }

  try {
    // Check if email already exists
    const existing = await db
      .select()
      .from(waitlistEmails)
      .where(eq(waitlistEmails.email, validated.data.email))
      .limit(1);

    if (existing.length > 0) {
      return {
        success: true,
        message: "Mulțumim! Email-ul tău este deja în lista noastră. Te vom contacta în curând.",
      };
    }

    // Insert new waitlist entry
    await db.insert(waitlistEmails).values({
      email: validated.data.email,
      name: validated.data.name || null,
      userType: validated.data.userType || null,
      source: validated.data.source || null,
    });

    return {
      success: true,
      message: "Mulțumim! Te vom contacta în curând.",
    };
  } catch (error) {
    console.error("Waitlist signup error:", error);
    return {
      success: false,
      error: "A apărut o eroare. Te rugăm să încerci din nou.",
    };
  }
}
