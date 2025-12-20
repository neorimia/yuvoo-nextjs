/**
 * Get User Profile Data Helper
 *
 * Fetches profile data (image, name, email) from database based on user role.
 * Used to populate user profile dropdown with database information.
 */

import { getDoctorByUserId } from "@/modules/doctors/doctors.service";
import { getClubByAdminUserId } from "@/modules/clubs/clubs.service";
import type { UserRole } from "@/modules/auth/auth.types";
import { UserRoleEnum } from "@/modules/auth/auth.types";

export interface UserProfileData {
  image?: string | null; // Doctor photoUrl or club logoUrl
  name?: string; // Doctor name or club name
  email?: string; // Doctor/club email if different from user email
}

/**
 * Get profile data for a user based on their role
 * @param userId - User ID from database
 * @param role - User role (parent, club_admin, doctor, admin)
 * @returns Profile data with image, name, and email, or null if not found
 */
export async function getUserProfileData(
  userId: string,
  role: UserRole
): Promise<UserProfileData | null> {
  try {
    switch (role) {
      case UserRoleEnum.DOCTOR: {
        const doctor = await getDoctorByUserId(userId);
        if (!doctor) return null;

        return {
          image: doctor.image || null, // photoUrl mapped to image
          name: doctor.name, // Computed from firstName + lastName + title
          email: doctor.contact.email || undefined,
        };
      }

      case UserRoleEnum.CLUB_ADMIN: {
        const club = await getClubByAdminUserId(userId);
        if (!club) return null;

        // Club images are in galleryUrls array, use first image as logo if available
        const clubImage = club?.logoUrl && club.images.length > 0 ? club.images[0] : null;

        return {
          image: clubImage || null,
          name: club.name,
          email: club.contact.email || undefined,
        };
      }

      case UserRoleEnum.PARENT:
      case UserRoleEnum.ADMIN:
      default:
        // Parents and admins don't have separate profile entities
        // They use user table data directly
        return null;
    }
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    return null;
  }
}
