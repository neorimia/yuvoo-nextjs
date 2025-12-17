#!/usr/bin/env tsx

/**
 * PostHog Events Test Script
 *
 * This script fires all custom PostHog events for testing purposes.
 * Use this to verify events are working and populate PostHog with test data.
 *
 * Usage:
 *   npm run test:posthog
 *   OR
 *   npx tsx scripts/test-posthog-events.ts
 *
 * Environment:
 *   - Requires NEXT_PUBLIC_POSTHOG_KEY to be set in .env.local
 *   - Requires NEXT_PUBLIC_POSTHOG_HOST to be set (optional, defaults to eu.i.posthog.com)
 *   - Should only be run in development
 */

import { config } from "dotenv";
import { resolve } from "path";
import { PostHog } from "posthog-node";
import { PostHogEvents, PostHogProperties } from "../src/lib/analytics/events";

// Load environment variables from .env.local FIRST
config({ path: resolve(process.cwd(), ".env.local") });

// Initialize PostHog client after loading env vars
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

let posthogClient: PostHog | null = null;

function getPostHogClient(): PostHog | null {
  if (!POSTHOG_KEY) {
    return null;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(POSTHOG_KEY, {
      host: POSTHOG_HOST,
    });
  }

  return posthogClient;
}

// Test user IDs (simulated)
const TEST_USERS = {
  parent: "test-parent-user-1221",
  clubAdmin: "test-club-admin-45632",
  doctor: "test-doctor-7894",
  anonymous: "anonymous-user-9992",
};

// Test entity IDs (simulated)
const TEST_ENTITIES = {
  clubId: "test-club-0012",
  clubSlug: "fotbal-club-bucuresti",
  doctorId: "test-doctor-0012",
  doctorSlug: "dr-ionescu-pediatru",
  childId: "test-child-0012",
  quizId: "test-quiz-0013",
  bookingId: "test-booking-0014",
};

/**
 * Wait for a specified number of milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fire a server-side event
 */
async function fireEvent(
  eventName: string,
  distinctId: string,
  properties: Record<string, string | number | boolean | null | undefined> = {}
): Promise<void> {
  const posthog = getPostHogClient();
  if (!posthog) {
    console.error("❌ PostHog server not initialized. Check environment variables.");
    return;
  }

  try {
    await posthog.capture({
      distinctId,
      event: eventName,
      properties,
    });
    console.log(`✅ Fired: ${eventName} (user: ${distinctId})`);
  } catch (error) {
    console.error(`❌ Error firing ${eventName}:`, error);
  }
}

/**
 * Test Authentication Events
 */
async function testAuthenticationEvents(): Promise<void> {
  console.log("\n📝 Testing Authentication Events...\n");

  // User signup
  await fireEvent(PostHogEvents.USER_SIGNED_UP, TEST_USERS.parent, {
    [PostHogProperties.USER_ID]: TEST_USERS.parent,
    [PostHogProperties.USER_ROLE]: "parent",
  });
  await sleep(500);

  // Email verification
  await fireEvent(PostHogEvents.EMAIL_VERIFIED, TEST_USERS.parent, {
    [PostHogProperties.USER_ID]: TEST_USERS.parent,
  });
  await sleep(500);

  // User login
  await fireEvent(PostHogEvents.USER_LOGGED_IN, TEST_USERS.parent, {
    [PostHogProperties.USER_ID]: TEST_USERS.parent,
    [PostHogProperties.USER_ROLE]: "parent",
  });
  await sleep(500);

  // Password reset requested
  await fireEvent(PostHogEvents.PASSWORD_RESET_REQUESTED, TEST_USERS.parent);
  await sleep(500);

  // Password reset completed
  await fireEvent(PostHogEvents.PASSWORD_RESET_COMPLETED, TEST_USERS.parent, {
    [PostHogProperties.USER_ID]: TEST_USERS.parent,
  });
  await sleep(500);
}

/**
 * Test Quiz Events
 */
async function testQuizEvents(): Promise<void> {
  console.log("\n📝 Testing Quiz Events...\n");

  // Quiz started
  await fireEvent(PostHogEvents.QUIZ_STARTED, TEST_USERS.parent, {
    [PostHogProperties.TOTAL_STEPS]: 6,
  });
  await sleep(500);

  // Quiz step completed (multiple steps)
  for (let step = 1; step <= 6; step++) {
    await fireEvent(PostHogEvents.QUIZ_STEP_COMPLETED, TEST_USERS.parent, {
      [PostHogProperties.QUIZ_STEP]: step,
      [PostHogProperties.TOTAL_STEPS]: 6,
    });
    await sleep(300);
  }

  // Quiz completed
  await fireEvent(PostHogEvents.QUIZ_COMPLETED, TEST_USERS.parent, {
    [PostHogProperties.QUIZ_ID]: TEST_ENTITIES.quizId,
    [PostHogProperties.CHILD_ID]: TEST_ENTITIES.childId,
    [PostHogProperties.CHILD_AGE]: 8,
    [PostHogProperties.RECOMMENDATIONS_COUNT]: 3,
  });
  await sleep(500);
}

/**
 * Test Discovery Events
 */
async function testDiscoveryEvents(): Promise<void> {
  console.log("\n📝 Testing Discovery Events...\n");

  // Club search
  await fireEvent(PostHogEvents.CLUB_SEARCHED, TEST_USERS.parent, {
    [PostHogProperties.CLUB_SPORT]: "fotbal",
    [PostHogProperties.CLUB_CITY]: "București",
  });
  await sleep(500);

  // Doctor search
  await fireEvent(PostHogEvents.DOCTOR_SEARCHED, TEST_USERS.parent, {
    [PostHogProperties.DOCTOR_SPECIALTY]: "pediatrie",
    [PostHogProperties.CLUB_CITY]: "București",
  });
  await sleep(500);

  // Club viewed
  await fireEvent(PostHogEvents.CLUB_VIEWED, TEST_USERS.parent, {
    [PostHogProperties.CLUB_ID]: TEST_ENTITIES.clubId,
    [PostHogProperties.CLUB_SLUG]: TEST_ENTITIES.clubSlug,
  });
  await sleep(500);

  // Doctor viewed
  await fireEvent(PostHogEvents.DOCTOR_VIEWED, TEST_USERS.parent, {
    [PostHogProperties.DOCTOR_ID]: TEST_ENTITIES.doctorId,
    [PostHogProperties.DOCTOR_SLUG]: TEST_ENTITIES.doctorSlug,
  });
  await sleep(500);

  // Club favorited
  await fireEvent(PostHogEvents.CLUB_FAVORITED, TEST_USERS.parent, {
    [PostHogProperties.CLUB_ID]: TEST_ENTITIES.clubId,
  });
  await sleep(500);

  // Doctor favorited
  await fireEvent(PostHogEvents.DOCTOR_FAVORITED, TEST_USERS.parent, {
    [PostHogProperties.DOCTOR_ID]: TEST_ENTITIES.doctorId,
  });
  await sleep(500);

  // Club unfavorited
  await fireEvent(PostHogEvents.CLUB_UNFAVORITED, TEST_USERS.parent, {
    [PostHogProperties.CLUB_ID]: TEST_ENTITIES.clubId,
  });
  await sleep(500);

  // Doctor unfavorited
  await fireEvent(PostHogEvents.DOCTOR_UNFAVORITED, TEST_USERS.parent, {
    [PostHogProperties.DOCTOR_ID]: TEST_ENTITIES.doctorId,
  });
  await sleep(500);
}

/**
 * Test Booking Events
 */
async function testBookingEvents(): Promise<void> {
  console.log("\n📝 Testing Booking Events...\n");

  // Club booking created
  await fireEvent(PostHogEvents.CLUB_BOOKING_CREATED, TEST_USERS.parent, {
    [PostHogProperties.BOOKING_ID]: TEST_ENTITIES.bookingId,
    [PostHogProperties.BOOKING_STATUS]: "pending",
    [PostHogProperties.CLUB_ID]: TEST_ENTITIES.clubId,
  });
  await sleep(500);

  // Club booking cancelled
  await fireEvent(PostHogEvents.CLUB_BOOKING_CANCELLED, TEST_USERS.parent, {
    [PostHogProperties.BOOKING_ID]: TEST_ENTITIES.bookingId,
    [PostHogProperties.BOOKING_STATUS]: "cancelled",
    [PostHogProperties.CLUB_ID]: TEST_ENTITIES.clubId,
  });
  await sleep(500);

  // Doctor consultation created
  await fireEvent(PostHogEvents.DOCTOR_CONSULTATION_CREATED, TEST_USERS.parent, {
    [PostHogProperties.CONSULTATION_ID]: TEST_ENTITIES.bookingId,
    [PostHogProperties.CONSULTATION_STATUS]: "pending",
    [PostHogProperties.DOCTOR_ID]: TEST_ENTITIES.doctorId,
  });
  await sleep(500);

  // Doctor consultation cancelled
  await fireEvent(PostHogEvents.DOCTOR_CONSULTATION_CANCELLED, TEST_USERS.parent, {
    [PostHogProperties.CONSULTATION_ID]: TEST_ENTITIES.bookingId,
    [PostHogProperties.CONSULTATION_STATUS]: "cancelled",
    [PostHogProperties.DOCTOR_ID]: TEST_ENTITIES.doctorId,
  });
  await sleep(500);
}

/**
 * Test Child Profile Events
 */
async function testChildProfileEvents(): Promise<void> {
  console.log("\n📝 Testing Child Profile Events...\n");

  // Child profile created
  await fireEvent(PostHogEvents.CHILD_PROFILE_CREATED, TEST_USERS.parent, {
    [PostHogProperties.CHILD_ID]: TEST_ENTITIES.childId,
    [PostHogProperties.CHILD_AGE]: 8,
  });
  await sleep(500);

  // Child profile updated
  await fireEvent(PostHogEvents.CHILD_PROFILE_UPDATED, TEST_USERS.parent, {
    [PostHogProperties.CHILD_ID]: TEST_ENTITIES.childId,
    [PostHogProperties.CHILD_AGE]: 9,
  });
  await sleep(500);

  // Child profile deleted
  await fireEvent(PostHogEvents.CHILD_PROFILE_DELETED, TEST_USERS.parent, {
    [PostHogProperties.CHILD_ID]: TEST_ENTITIES.childId,
  });
  await sleep(500);
}

/**
 * Test Onboarding Events
 */
async function testOnboardingEvents(): Promise<void> {
  console.log("\n📝 Testing Onboarding Events...\n");

  // Onboarding started
  await fireEvent(PostHogEvents.ONBOARDING_STARTED, TEST_USERS.parent, {
    [PostHogProperties.ONBOARDING_ROLE]: "parent",
  });
  await sleep(500);

  // Onboarding steps completed
  for (let step = 1; step <= 5; step++) {
    await fireEvent(PostHogEvents.ONBOARDING_STEP_COMPLETED, TEST_USERS.parent, {
      [PostHogProperties.ONBOARDING_STEP]: step,
      [PostHogProperties.ONBOARDING_TOTAL_STEPS]: 5,
      [PostHogProperties.ONBOARDING_ROLE]: "parent",
    });
    await sleep(300);
  }

  // Onboarding completed
  await fireEvent(PostHogEvents.ONBOARDING_COMPLETED, TEST_USERS.parent, {
    [PostHogProperties.ONBOARDING_ROLE]: "parent",
  });
  await sleep(500);
}

/**
 * Test Review Events
 */
async function testReviewEvents(): Promise<void> {
  console.log("\n📝 Testing Review Events...\n");

  // Review submitted
  await fireEvent(PostHogEvents.REVIEW_SUBMITTED, TEST_USERS.parent, {
    [PostHogProperties.REVIEW_ID]: "test-review-001",
    [PostHogProperties.REVIEW_RATING]: 5,
    [PostHogProperties.REVIEW_TYPE]: "club",
  });
  await sleep(500);

  // Review approved
  await fireEvent(PostHogEvents.REVIEW_APPROVED, TEST_USERS.parent, {
    [PostHogProperties.REVIEW_ID]: "test-review-001",
  });
  await sleep(500);
}

/**
 * Main function
 */
async function main(): Promise<void> {
  console.log("🚀 PostHog Events Test Script");
  console.log("============================\n");

  // Check environment
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    console.error("❌ ERROR: NEXT_PUBLIC_POSTHOG_KEY is not set in environment variables.");
    console.error("   Please set it in .env.local or .env file.");
    process.exit(1);
  }

  console.log("✅ PostHog key found");
  console.log(
    `📍 PostHog host: ${process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com"}`
  );
  console.log("\n⚠️  This script will fire test events to your PostHog project.");
  console.log("   Make sure you're running this in development mode.\n");

  // Wait a bit before starting
  await sleep(1000);

  try {
    // Test all event categories
    await testAuthenticationEvents();
    await testQuizEvents();
    await testDiscoveryEvents();
    await testBookingEvents();
    await testChildProfileEvents();
    await testOnboardingEvents();
    await testReviewEvents();

    console.log("\n✅ All events fired successfully!");
    console.log("\n📊 Next steps:");
    console.log("   1. Check your PostHog dashboard → Insights → Live Events");
    console.log("   2. Verify all events appear with correct properties");
    console.log("   3. Create funnels and cohorts using these events");
    console.log("\n💡 Tip: Events may take a few seconds to appear in PostHog.");
  } catch (error) {
    console.error("\n❌ Error running test script:", error);
    process.exit(1);
  } finally {
    // Shutdown PostHog client
    if (posthogClient) {
      await posthogClient.shutdown();
      console.log("\n🔌 PostHog client shut down.");
    }
    process.exit(0);
  }
}

// Run the script
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
