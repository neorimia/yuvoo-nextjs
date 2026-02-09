/**
 * Data Export Server Actions
 *
 * GDPR Art. 15 (Right of Access) and Art. 20 (Right to Data Portability)
 *
 * Allows users to request and download all personal data we hold about them
 * in a structured, commonly used, machine-readable format (JSON).
 */

"use server";

import { headers } from "next/headers";
import { requireAuth } from "@/modules/auth/auth.service";
import { db } from "@/lib/db";
import {
  users,
  children,
  quizzes,
  userConsents,
  favorites,
  bookings,
  dataExportRequests,
} from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";

// ============================================================================
// Types
// ============================================================================

interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

interface DataExportResult {
  exportDate: string;
  exportFormat: string;
  gdprReference: string;
  requestId: string;
  userData: UserDataExport;
  children: ChildDataExport[];
  quizzes: QuizDataExport[];
  consents: ConsentDataExport[];
  favorites: FavoriteDataExport[];
  bookings: BookingDataExport[];
}

interface UserDataExport {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  role: string;
  onboardingCompleted: boolean;
  createdAt: string;
}

interface ChildDataExport {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string | null;
  createdAt: string;
}

interface QuizDataExport {
  id: string;
  childId: string;
  answers: unknown;
  recommendations: unknown;
  location: string | null;
  createdAt: string;
}

interface ConsentDataExport {
  type: string;
  status: string;
  grantedAt: string;
  withdrawnAt: string | null;
  consentVersion: string;
}

interface FavoriteDataExport {
  id: string;
  clubId: string | null;
  doctorId: string | null;
  createdAt: string;
}

interface BookingDataExport {
  id: string;
  childId: string | null;
  clubId: string | null;
  doctorId: string | null;
  status: string;
  scheduledAt: string | null;
  createdAt: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get client IP from request headers
 */
async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}

// ============================================================================
// Data Export Actions
// ============================================================================

/**
 * Request data export (GDPR Art. 15 - Access, Art. 20 - Portability)
 *
 * Gathers all user data and returns it in a structured JSON format.
 * Creates an audit trail via the dataExportRequests table.
 */
export async function requestDataExportAction(
  format: "json" = "json"
): Promise<ActionResult<DataExportResult>> {
  try {
    const user = await requireAuth();
    const userId = user.id;
    const ipAddress = await getClientIp();

    // Create export request record for audit trail
    const [request] = await db
      .insert(dataExportRequests)
      .values({
        userId,
        requestType: "portability",
        status: "processing",
        exportFormat: format,
        notes: `Request IP: ${ipAddress}`,
      })
      .returning();

    try {
      // Gather user data
      const userData = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      if (!userData) {
        throw new Error("User not found");
      }

      // Gather children data
      const childrenData = await db.query.children.findMany({
        where: eq(children.parentId, userId),
      });

      const childIds = childrenData.map((c) => c.id);

      // Gather quizzes data (for all children)
      let quizzesData: (typeof quizzes.$inferSelect)[] = [];
      if (childIds.length > 0) {
        quizzesData = await db.query.quizzes.findMany({
          where: inArray(quizzes.childId, childIds),
        });
      }

      // Gather consents data
      const consentsData = await db.query.userConsents.findMany({
        where: eq(userConsents.userId, userId),
      });

      // Gather favorites data
      const favoritesData = await db.query.favorites.findMany({
        where: eq(favorites.userId, userId),
      });

      // Gather bookings data
      const bookingsData = await db.query.bookings.findMany({
        where: eq(bookings.parentId, userId),
      });

      // Structure the export
      const exportData: DataExportResult = {
        exportDate: new Date().toISOString(),
        exportFormat: format,
        gdprReference: "GDPR Art. 15 (Right of Access) / Art. 20 (Right to Data Portability)",
        requestId: request.id,

        userData: {
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          role: userData.role,
          onboardingCompleted: userData.onboardingCompleted,
          createdAt: userData.createdAt.toISOString(),
        },

        children: childrenData.map((child) => ({
          id: child.id,
          firstName: child.firstName,
          lastName: child.lastName,
          dateOfBirth: child.dateOfBirth.toISOString(),
          gender: child.gender,
          createdAt: child.createdAt.toISOString(),
        })),

        quizzes: quizzesData.map((quiz) => ({
          id: quiz.id,
          childId: quiz.childId,
          answers: quiz.answers,
          recommendations: quiz.recommendations,
          location: quiz.location,
          createdAt: quiz.createdAt.toISOString(),
        })),

        consents: consentsData.map((consent) => ({
          type: consent.consentType,
          status: consent.status,
          grantedAt: consent.grantedAt.toISOString(),
          withdrawnAt: consent.withdrawnAt?.toISOString() ?? null,
          consentVersion: consent.consentVersion,
        })),

        favorites: favoritesData.map((fav) => ({
          id: fav.id,
          clubId: fav.clubId,
          doctorId: fav.doctorId,
          createdAt: fav.createdAt.toISOString(),
        })),

        bookings: bookingsData.map((booking) => ({
          id: booking.id,
          childId: booking.childId,
          clubId: booking.clubId,
          doctorId: booking.doctorId,
          status: booking.status,
          scheduledAt: booking.scheduledAt?.toISOString() ?? null,
          createdAt: booking.createdAt.toISOString(),
        })),
      };

      // Update request status to completed
      await db
        .update(dataExportRequests)
        .set({
          status: "completed",
          completedAt: new Date(),
        })
        .where(eq(dataExportRequests.id, request.id));

      return {
        success: true,
        data: exportData,
      };
    } catch (error) {
      // Update request status to failed
      await db
        .update(dataExportRequests)
        .set({
          status: "failed",
          notes: error instanceof Error ? error.message : "Unknown error",
        })
        .where(eq(dataExportRequests.id, request.id));

      throw error;
    }
  } catch (error) {
    console.error("Error exporting data:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Eroare la exportul datelor. Te rugăm să încerci din nou.",
    };
  }
}

/**
 * Get data export request history
 */
export async function getDataExportHistoryAction(): Promise<
  ActionResult<
    {
      id: string;
      requestType: string;
      status: string;
      exportFormat: string | null;
      requestedAt: string;
      completedAt: string | null;
    }[]
  >
> {
  try {
    const user = await requireAuth();

    const requests = await db.query.dataExportRequests.findMany({
      where: eq(dataExportRequests.userId, user.id),
      orderBy: (requests, { desc }) => [desc(requests.requestedAt)],
    });

    return {
      success: true,
      data: requests.map((req) => ({
        id: req.id,
        requestType: req.requestType,
        status: req.status,
        exportFormat: req.exportFormat,
        requestedAt: req.requestedAt.toISOString(),
        completedAt: req.completedAt?.toISOString() ?? null,
      })),
    };
  } catch (error) {
    console.error("Error getting export history:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Eroare la încărcarea istoricului",
    };
  }
}
