/**
 * Reviews repository — data access for club/doctor reviews
 */

import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";
import { and, avg, count, eq } from "drizzle-orm";

export interface ClubReviewAggregate {
  reviewCount: number;
  ratingValue: number;
}

/**
 * Aggregate moderated reviews for a club (for AggregateRating schema).
 * Returns null when no moderated reviews exist.
 */
export async function getClubReviewAggregate(clubId: string): Promise<ClubReviewAggregate | null> {
  try {
    const [row] = await db
      .select({
        reviewCount: count(),
        ratingValue: avg(reviews.rating),
      })
      .from(reviews)
      .where(and(eq(reviews.clubId, clubId), eq(reviews.moderated, true)));

    if (!row || Number(row.reviewCount) < 1 || row.ratingValue === null) {
      return null;
    }

    return {
      reviewCount: Number(row.reviewCount),
      ratingValue: Math.round(Number(row.ratingValue) * 10) / 10,
    };
  } catch (error) {
    console.error("[Reviews] getClubReviewAggregate failed:", error);
    return null;
  }
}
