"use client";

import { useEffect, useRef } from "react";
import { trackEvent, PostHogProperties } from "@/lib/analytics/tracking";

interface PostHogViewTrackingProps {
  eventName: string;
  entityId: string;
  entityType: "club" | "doctor";
  entitySlug?: string;
}

/**
 * PostHog View Tracking Component
 *
 * Tracks when a user views a club or doctor detail page.
 * Should be used in detail pages to track view events.
 *
 * @example
 * // In a club detail page:
 * import { PostHogEvents } from "@/lib/analytics/events";
 * <PostHogViewTracking
 *   eventName={PostHogEvents.CLUB_VIEWED}
 *   entityId={club.id}
 *   entityType="club"
 *   entitySlug={club.slug}
 * />
 */
export default function PostHogViewTracking({
  eventName,
  entityId,
  entityType,
  entitySlug,
}: PostHogViewTrackingProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per component mount
    if (hasTracked.current) return;

    // Track view event
    trackEvent(eventName, {
      ...(entityType === "club"
        ? { [PostHogProperties.CLUB_ID]: entityId }
        : { [PostHogProperties.DOCTOR_ID]: entityId }),
      ...(entitySlug && {
        [entityType === "club" ? PostHogProperties.CLUB_SLUG : PostHogProperties.DOCTOR_SLUG]:
          entitySlug,
      }),
    });

    hasTracked.current = true;
  }, [eventName, entityId, entityType, entitySlug]);

  // This component doesn't render anything
  return null;
}
