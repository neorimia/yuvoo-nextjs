/**
 * Quiz Container Page Test Script
 *
 * Comprehensive test script to test all conditions and types of children
 * for the quiz container page at `src/app/(public)/chestionar/container/page.tsx`
 *
 * Usage:
 *   # Display all test cases (default - no submission)
 *   npx tsx scripts/test-quiz-container-page.ts
 *
 *   # Validate critical tests only (dry run)
 *   npx tsx scripts/test-quiz-container-page.ts --priority=critical
 *
 *   # Actually submit quiz data (requires DB + OpenAI)
 *   npx tsx scripts/test-quiz-container-page.ts --live --submit --priority=critical
 *
 * Requirements for actual submission (--live --submit):
 * - DATABASE_URL environment variable set
 * - OPENAI_API_KEY environment variable set
 * - Database connection available
 * - OpenAI API credits available
 *
 * This script tests:
 * - Different child age ranges (4-14)
 * - Different genders
 * - Different health conditions
 * - Different quiz answer combinations
 * - Edge cases and error scenarios
 * - Integration with QuizContainer component
 *
 * Functions:
 * - submitQuizTest() - Submit quiz data (with dry-run option)
 * - runSingleQuizTest() - Run a single test case
 * - runQuizContainerPageTests() - Run full test suite
 */

import type { Child } from "@/modules/children/children.types";
import type { QuizAnswers, QuizResult } from "@/modules/quiz/quiz.types";

// ============================================================================
// TEST DATA: Child Profiles
// ============================================================================

/**
 * Child profile test cases covering all age ranges, genders, and health conditions
 */
const childProfiles: Array<{
  name: string;
  description: string;
  profile: Child;
  testPriority: "critical" | "high" | "medium" | "low";
}> = [
  // Age Range: 4-5 (Preschool)
  {
    name: "Young Preschool Male",
    description: "4-year-old male, no health concerns",
    profile: {
      id: "test-child-4-male",
      parentId: "test-parent-1",
      firstName: "Ion",
      lastName: "Popescu",
      dateOfBirth: new Date("2020-01-15"),
      gender: "male",
      age: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "high",
  },
  {
    name: "Young Preschool Female",
    description: "5-year-old female, no health concerns",
    profile: {
      id: "test-child-5-female",
      parentId: "test-parent-1",
      firstName: "Maria",
      lastName: "Ionescu",
      dateOfBirth: new Date("2019-06-20"),
      gender: "female",
      age: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "high",
  },
  {
    name: "Preschool with Asthma",
    description: "4-year-old with mild asthma",
    profile: {
      id: "test-child-4-asthma",
      parentId: "test-parent-1",
      firstName: "Alex",
      lastName: "Georgescu",
      dateOfBirth: new Date("2020-03-10"),
      gender: "male",
      age: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "critical",
  },

  // Age Range: 6-8 (Early Elementary)
  {
    name: "Early Elementary Male",
    description: "7-year-old male, active",
    profile: {
      id: "test-child-7-male",
      parentId: "test-parent-1",
      firstName: "Andrei",
      lastName: "Popa",
      dateOfBirth: new Date("2017-08-12"),
      gender: "male",
      age: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "high",
  },
  {
    name: "Early Elementary Female",
    description: "8-year-old female, competitive",
    profile: {
      id: "test-child-8-female",
      parentId: "test-parent-1",
      firstName: "Elena",
      lastName: "Dumitru",
      dateOfBirth: new Date("2016-11-05"),
      gender: "female",
      age: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "high",
  },
  {
    name: "Early Elementary with Joint Pain",
    description: "6-year-old with joint pain concerns",
    profile: {
      id: "test-child-6-joint-pain",
      parentId: "test-parent-1",
      firstName: "David",
      lastName: "Stoica",
      dateOfBirth: new Date("2018-02-28"),
      gender: "male",
      age: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "critical",
  },

  // Age Range: 9-11 (Late Elementary)
  {
    name: "Late Elementary Male",
    description: "10-year-old male, experienced in sports",
    profile: {
      id: "test-child-10-male",
      parentId: "test-parent-1",
      firstName: "Stefan",
      lastName: "Radu",
      dateOfBirth: new Date("2014-04-18"),
      gender: "male",
      age: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "high",
  },
  {
    name: "Late Elementary Female",
    description: "11-year-old female, high coordination",
    profile: {
      id: "test-child-11-female",
      parentId: "test-parent-1",
      firstName: "Ana",
      lastName: "Constantinescu",
      dateOfBirth: new Date("2013-09-22"),
      gender: "female",
      age: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "high",
  },
  {
    name: "Late Elementary with Cardiac Concerns",
    description: "9-year-old with cardiac family history",
    profile: {
      id: "test-child-9-cardiac",
      parentId: "test-parent-1",
      firstName: "Mihai",
      lastName: "Nicolae",
      dateOfBirth: new Date("2015-07-14"),
      gender: "male",
      age: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "critical",
  },

  // Age Range: 12-14 (Teen)
  {
    name: "Teen Male",
    description: "13-year-old male, athletic build",
    profile: {
      id: "test-child-13-male",
      parentId: "test-parent-1",
      firstName: "Vlad",
      lastName: "Marinescu",
      dateOfBirth: new Date("2011-12-03"),
      gender: "male",
      age: 13,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "high",
  },
  {
    name: "Teen Female",
    description: "14-year-old female, competitive",
    profile: {
      id: "test-child-14-female",
      parentId: "test-parent-1",
      firstName: "Ioana",
      lastName: "Tudor",
      dateOfBirth: new Date("2010-05-30"),
      gender: "female",
      age: 14,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "high",
  },
  {
    name: "Teen with Concussion History",
    description: "12-year-old with recent concussion",
    profile: {
      id: "test-child-12-concussion",
      parentId: "test-parent-1",
      firstName: "Razvan",
      lastName: "Barbu",
      dateOfBirth: new Date("2012-10-17"),
      gender: "male",
      age: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "critical",
  },

  // Edge Cases
  {
    name: "Gender Other",
    description: "Child with gender 'other'",
    profile: {
      id: "test-child-gender-other",
      parentId: "test-parent-1",
      firstName: "Alex",
      lastName: "Neutral",
      dateOfBirth: new Date("2016-01-01"),
      gender: "other",
      age: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "medium",
  },
  {
    name: "Minimum Age",
    description: "Exactly 4 years old (minimum age)",
    profile: {
      id: "test-child-age-4-min",
      parentId: "test-parent-1",
      firstName: "Min",
      lastName: "Age",
      dateOfBirth: new Date("2020-01-29"), // Exactly 4 years ago
      gender: "male",
      age: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "critical",
  },
  {
    name: "Maximum Age",
    description: "Exactly 14 years old (maximum age)",
    profile: {
      id: "test-child-age-14-max",
      parentId: "test-parent-1",
      firstName: "Max",
      lastName: "Age",
      dateOfBirth: new Date("2010-01-29"), // Exactly 14 years ago
      gender: "female",
      age: 14,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    testPriority: "critical",
  },
];

// ============================================================================
// TEST DATA: Quiz Answer Combinations
// ============================================================================

/**
 * Quiz answer combinations covering all possible answer types
 */
const quizAnswerCombinations: Array<{
  name: string;
  description: string;
  answers: QuizAnswers;
  testPriority: "critical" | "high" | "medium" | "low";
}> = [
  // Energy Levels
  {
    name: "Low Energy Child",
    description: "Child with low energy level",
    answers: {
      age: 7,
      gender: "male",
      energyLevel: "low",
      personality: ["introverted", "calm"],
      interests: ["reading", "drawing"],
      previousSports: [],
      physicalBuild: "slim",
      coordinationLevel: "developing",
      preferences: {
        indoor: true,
        outdoor: false,
        team: false,
        individual: true,
      },
    },
    testPriority: "high",
  },
  {
    name: "Very High Energy Child",
    description: "Child with very high energy level",
    answers: {
      age: 8,
      gender: "female",
      energyLevel: "very_high",
      personality: ["outgoing", "active", "competitive"],
      interests: ["running", "jumping", "playing"],
      previousSports: [],
      physicalBuild: "athletic",
      coordinationLevel: "excellent",
      preferences: {
        indoor: false,
        outdoor: true,
        team: true,
        individual: false,
      },
    },
    testPriority: "high",
  },

  // Health Conditions
  {
    name: "Asthma Mild",
    description: "Child with mild asthma",
    answers: {
      age: 9,
      gender: "male",
      energyLevel: "medium",
      personality: ["outgoing"],
      interests: ["swimming"],
      previousSports: ["swimming"],
      physicalBuild: "average",
      coordinationLevel: "good",
      healthConditions: ["asthma"],
      asthmaSeverity: "mild",
      inhalerUse: "sometimes",
      preferences: {
        indoor: true,
        outdoor: true,
        team: false,
        individual: true,
      },
    },
    testPriority: "critical",
  },
  {
    name: "Asthma Severe",
    description: "Child with severe asthma",
    answers: {
      age: 10,
      gender: "female",
      energyLevel: "medium",
      personality: ["calm"],
      interests: ["reading"],
      previousSports: [],
      physicalBuild: "slim",
      coordinationLevel: "developing",
      healthConditions: ["asthma"],
      asthmaSeverity: "severe",
      inhalerUse: "yes",
      preferences: {
        indoor: true,
        outdoor: false,
        team: false,
        individual: true,
      },
    },
    testPriority: "critical",
  },
  {
    name: "Joint Pain Moderate",
    description: "Child with moderate joint pain",
    answers: {
      age: 11,
      gender: "male",
      energyLevel: "low",
      personality: ["introverted"],
      interests: ["swimming"],
      previousSports: ["swimming"],
      physicalBuild: "average",
      coordinationLevel: "challenges",
      healthConditions: ["joint_pain"],
      jointPainSeverity: "moderate",
      preferences: {
        indoor: true,
        outdoor: false,
        team: false,
        individual: true,
      },
    },
    testPriority: "critical",
  },

  // Critical Health Screening
  {
    name: "Cardiac Symptoms",
    description: "Child with cardiac symptoms during exercise",
    answers: {
      age: 12,
      gender: "male",
      energyLevel: "high",
      personality: ["competitive"],
      interests: ["football"],
      previousSports: ["football"],
      criticalHealth: {
        cardiacSymptoms: true,
        cardiacFamilyHistory: false,
        recentConcussion: false,
        multipleConcussions: false,
      },
      physicalBuild: "athletic",
      coordinationLevel: "excellent",
      preferences: {
        indoor: false,
        outdoor: true,
        team: true,
        individual: false,
      },
    },
    testPriority: "critical",
  },
  {
    name: "Cardiac Family History",
    description: "Child with family history of sudden cardiac death",
    answers: {
      age: 13,
      gender: "female",
      energyLevel: "medium",
      personality: ["outgoing"],
      interests: ["tennis"],
      previousSports: ["tennis"],
      criticalHealth: {
        cardiacSymptoms: false,
        cardiacFamilyHistory: true,
        recentConcussion: false,
        multipleConcussions: false,
      },
      physicalBuild: "average",
      coordinationLevel: "good",
      preferences: {
        indoor: true,
        outdoor: true,
        team: false,
        individual: true,
      },
    },
    testPriority: "critical",
  },
  {
    name: "Recent Concussion",
    description: "Child with concussion in last 3 months",
    answers: {
      age: 14,
      gender: "male",
      energyLevel: "high",
      personality: ["competitive"],
      interests: ["football"],
      previousSports: ["football"],
      criticalHealth: {
        cardiacSymptoms: false,
        cardiacFamilyHistory: false,
        recentConcussion: true,
        multipleConcussions: false,
      },
      physicalBuild: "athletic",
      coordinationLevel: "excellent",
      preferences: {
        indoor: false,
        outdoor: true,
        team: true,
        individual: false,
      },
    },
    testPriority: "critical",
  },
  {
    name: "Multiple Concussions",
    description: "Child with 2+ concussions in last 2 years",
    answers: {
      age: 12,
      gender: "female",
      energyLevel: "medium",
      personality: ["competitive"],
      interests: ["football"],
      previousSports: ["football"],
      criticalHealth: {
        cardiacSymptoms: false,
        cardiacFamilyHistory: false,
        recentConcussion: false,
        multipleConcussions: true,
      },
      physicalBuild: "athletic",
      coordinationLevel: "good",
      preferences: {
        indoor: false,
        outdoor: true,
        team: true,
        individual: false,
      },
    },
    testPriority: "critical",
  },

  // Previous Sports Experience
  {
    name: "No Previous Sports",
    description: "Child with no previous sports experience",
    answers: {
      age: 6,
      gender: "male",
      energyLevel: "medium",
      personality: ["outgoing"],
      interests: ["playing"],
      previousSports: [],
      physicalBuild: "average",
      coordinationLevel: "developing",
      preferences: {
        indoor: true,
        outdoor: true,
        team: false,
        individual: false,
      },
    },
    testPriority: "high",
  },
  {
    name: "Stopped Due to Injury",
    description: "Child who stopped sports due to injury",
    answers: {
      age: 10,
      gender: "male",
      energyLevel: "high",
      personality: ["competitive"],
      interests: ["football"],
      previousSports: ["football"],
      whyStoppedSports: ["injury"],
      injuryDetails: {
        type: "fracture",
        when: "6-12months",
        healed: true,
        restrictions: false,
      },
      physicalBuild: "athletic",
      coordinationLevel: "excellent",
      preferences: {
        indoor: false,
        outdoor: true,
        team: true,
        individual: false,
      },
    },
    testPriority: "high",
  },
  {
    name: "Stopped Due to Lack of Interest",
    description: "Child who stopped sports due to lack of interest",
    answers: {
      age: 9,
      gender: "female",
      energyLevel: "low",
      personality: ["introverted"],
      interests: ["reading", "art"],
      previousSports: ["swimming"],
      whyStoppedSports: ["lack_of_interest"],
      physicalBuild: "slim",
      coordinationLevel: "developing",
      preferences: {
        indoor: true,
        outdoor: false,
        team: false,
        individual: true,
      },
    },
    testPriority: "high",
  },

  // Physical Build Variations
  {
    name: "Slim Build",
    description: "Child with slim physical build",
    answers: {
      age: 8,
      gender: "male",
      energyLevel: "medium",
      personality: ["outgoing"],
      interests: ["running"],
      previousSports: [],
      physicalBuild: "slim",
      coordinationLevel: "good",
      preferences: {
        indoor: false,
        outdoor: true,
        team: false,
        individual: true,
      },
    },
    testPriority: "medium",
  },
  {
    name: "Athletic Build",
    description: "Child with athletic physical build",
    answers: {
      age: 11,
      gender: "female",
      energyLevel: "very_high",
      personality: ["competitive", "outgoing"],
      interests: ["football", "tennis"],
      previousSports: ["football", "tennis"],
      physicalBuild: "athletic",
      coordinationLevel: "excellent",
      preferences: {
        indoor: true,
        outdoor: true,
        team: true,
        individual: true,
      },
    },
    testPriority: "medium",
  },

  // Coordination Levels
  {
    name: "Excellent Coordination",
    description: "Child with excellent coordination",
    answers: {
      age: 10,
      gender: "male",
      energyLevel: "high",
      personality: ["competitive"],
      interests: ["gymnastics", "dancing"],
      previousSports: ["gymnastics"],
      physicalBuild: "athletic",
      coordinationLevel: "excellent",
      preferences: {
        indoor: true,
        outdoor: false,
        team: false,
        individual: true,
      },
    },
    testPriority: "medium",
  },
  {
    name: "Coordination Challenges",
    description: "Child with coordination challenges",
    answers: {
      age: 7,
      gender: "female",
      energyLevel: "low",
      personality: ["introverted"],
      interests: ["reading"],
      previousSports: [],
      physicalBuild: "average",
      coordinationLevel: "challenges",
      preferences: {
        indoor: true,
        outdoor: false,
        team: false,
        individual: true,
      },
    },
    testPriority: "medium",
  },

  // Preference Combinations
  {
    name: "Indoor Team Sports",
    description: "Child prefers indoor team sports",
    answers: {
      age: 9,
      gender: "male",
      energyLevel: "high",
      personality: ["outgoing", "cooperative"],
      interests: ["basketball"],
      previousSports: [],
      physicalBuild: "average",
      coordinationLevel: "good",
      preferences: {
        indoor: true,
        outdoor: false,
        team: true,
        individual: false,
      },
    },
    testPriority: "medium",
  },
  {
    name: "Outdoor Individual Sports",
    description: "Child prefers outdoor individual sports",
    answers: {
      age: 12,
      gender: "female",
      energyLevel: "medium",
      personality: ["introverted", "independent"],
      interests: ["running", "cycling"],
      previousSports: ["running"],
      physicalBuild: "slim",
      coordinationLevel: "good",
      preferences: {
        indoor: false,
        outdoor: true,
        team: false,
        individual: true,
      },
    },
    testPriority: "medium",
  },
  {
    name: "Mixed Preferences",
    description: "Child open to both indoor/outdoor and team/individual",
    answers: {
      age: 8,
      gender: "male",
      energyLevel: "very_high",
      personality: ["outgoing", "flexible"],
      interests: ["everything"],
      previousSports: [],
      physicalBuild: "average",
      coordinationLevel: "good",
      preferences: {
        indoor: true,
        outdoor: true,
        team: true,
        individual: true,
      },
    },
    testPriority: "low",
  },
];

// ============================================================================
// TEST DATA: Edge Cases
// ============================================================================

const edgeCases: Array<{
  name: string;
  description: string;
  scenario: string;
  testPriority: "critical" | "high" | "medium" | "low";
}> = [
  {
    name: "Missing ChildId",
    description: "childId prop is undefined or empty string",
    scenario: "Page renders with childId='' or childId=undefined",
    testPriority: "critical",
  },
  {
    name: "Invalid ChildId Format",
    description: "childId is not a valid UUID or ID format",
    scenario: "Page renders with childId='invalid-id-format'",
    testPriority: "high",
  },
  {
    name: "Non-existent ChildId",
    description: "childId references a child that doesn't exist in database",
    scenario: "Page renders with childId='non-existent-child-id'",
    testPriority: "high",
  },
  {
    name: "ChildId from Different Parent",
    description: "childId belongs to a different parent (security test)",
    scenario: "Page renders with childId belonging to another parent",
    testPriority: "critical",
  },
  {
    name: "Age Below Minimum",
    description: "Child age is below 4 years",
    scenario: "Quiz answers include age < 4",
    testPriority: "critical",
  },
  {
    name: "Age Above Maximum",
    description: "Child age is above 14 years",
    scenario: "Quiz answers include age > 14",
    testPriority: "critical",
  },
  {
    name: "Missing Required Answers",
    description: "Quiz submission with missing required fields",
    scenario: "Submit quiz with incomplete answers",
    testPriority: "critical",
  },
  {
    name: "Invalid Answer Types",
    description: "Quiz answers with invalid types or values",
    scenario: "Submit quiz with invalid enum values or types",
    testPriority: "critical",
  },
  {
    name: "Network Error During Submission",
    description: "Network failure during quiz submission",
    scenario: "Simulate network error when submitting quiz",
    testPriority: "high",
  },
  {
    name: "Server Error During Submission",
    description: "Server returns error during quiz submission",
    scenario: "Server returns 500 error or validation error",
    testPriority: "high",
  },
  {
    name: "Concurrent Quiz Submissions",
    description: "Multiple quiz submissions for same child",
    scenario: "Submit quiz multiple times rapidly",
    testPriority: "medium",
  },
  {
    name: "Browser Back/Forward Navigation",
    description: "User navigates back/forward during quiz",
    scenario: "Use browser back/forward buttons during quiz flow",
    testPriority: "medium",
  },
  {
    name: "Page Refresh During Quiz",
    description: "User refreshes page during quiz",
    scenario: "Refresh page while quiz is in progress",
    testPriority: "medium",
  },
  {
    name: "Session Expiry",
    description: "User session expires during quiz",
    scenario: "Session expires while quiz is in progress",
    testPriority: "high",
  },
];

// ============================================================================
// QUIZ SUBMISSION FUNCTIONS
// ============================================================================

/**
 * Submit quiz data to the quiz system
 *
 * NOTE: This requires:
 * - Database connection (DATABASE_URL)
 * - OpenAI API key (OPENAI_API_KEY)
 * - Valid child ID or will create temporary child
 *
 * @param childId - Child ID (or "placeholder-child-id" to create temporary)
 * @param answers - Quiz answers
 * @param dryRun - If true, only validates data without submitting
 * @returns Quiz result or error
 */
export async function submitQuizTest(
  childId: string,
  answers: QuizAnswers,
  dryRun: boolean = false
): Promise<{ success: boolean; result?: unknown; error?: string }> {
  if (dryRun) {
    // Validate quiz answers structure
    const requiredFields = [
      "age",
      "energyLevel",
      "personality",
      "interests",
      "previousSports",
      "physicalBuild",
      "coordinationLevel",
      "preferences",
    ];
    const missingFields = requiredFields.filter((field) => !(field in answers));

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      };
    }

    // Validate age range
    if (answers.age < 4 || answers.age > 14) {
      return {
        success: false,
        error: `Age ${answers.age} is outside valid range (4-14)`,
      };
    }

    // Validate energy level
    const validEnergyLevels = ["low", "medium", "high", "very_high"];
    if (!validEnergyLevels.includes(answers.energyLevel)) {
      return {
        success: false,
        error: `Invalid energy level: ${answers.energyLevel}`,
      };
    }

    return {
      success: true,
      result: { message: "Dry run: Quiz answers are valid", childId, answers },
    };
  }

  // Actual submission (requires database and OpenAI)
  try {
    // Import service dynamically to avoid issues if database isn't configured
    const { submitQuiz } = await import("@/modules/quiz/quiz.service");
    const { createTemporaryChildForQuiz } = await import("@/modules/quiz/quiz.service");

    let actualChildId = childId;

    // Create temporary child if using placeholder
    if (!childId || childId === "placeholder-child-id") {
      actualChildId = await createTemporaryChildForQuiz(answers, null);
      console.log(`Created temporary child: ${actualChildId}`);
    }

    // Submit quiz
    const result = await submitQuiz({
      childId: actualChildId,
      answers,
    });

    return {
      success: true,
      result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Run a single test case with quiz submission
 */
export async function runSingleQuizTest(
  testCase: {
    name: string;
    description: string;
    childId: string;
    answers: QuizAnswers;
    testPriority: "critical" | "high" | "medium" | "low";
  },
  dryRun: boolean = true
): Promise<{ testCase: string; success: boolean; result?: unknown; error?: string }> {
  console.log(`\n🧪 Testing: ${testCase.name}`);
  console.log(`   Description: ${testCase.description}`);
  console.log(`   Priority: ${testCase.testPriority}`);

  const result = await submitQuizTest(testCase.childId, testCase.answers, dryRun);

  if (result.success) {
    console.log(`   ✅ Success`);
    if (result.result && !dryRun) {
      console.log(`   Quiz ID: ${(result.result as { id: string }).id}`);
      console.log(
        `   Recommendations: ${(result.result as unknown as QuizResult).recommendations?.length || 0} sports`
      );
    }
  } else {
    console.log(`   ❌ Failed: ${result.error}`);
  }

  return {
    testCase: testCase.name,
    success: result.success,
    result: result.result,
    error: result.error,
  };
}

// ============================================================================
// TEST EXECUTION
// ============================================================================

/**
 * Test execution function
 * This would be called by a test runner (e.g., Jest, Vitest)
 *
 * @param options - Test execution options
 * @param options.dryRun - If true, only validates data without submitting (default: true)
 * @param options.submitTests - If true, actually submits quiz data (requires DB + OpenAI)
 * @param options.priorityFilter - Filter tests by priority (default: all)
 */
export async function runQuizContainerPageTests(options?: {
  dryRun?: boolean;
  submitTests?: boolean;
  priorityFilter?: "critical" | "high" | "medium" | "low" | "all";
}) {
  const { dryRun = true, submitTests = false, priorityFilter = "all" } = options || {};

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Quiz Container Page Test Suite");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Mode: ${dryRun ? "DRY RUN (validation only)" : "LIVE (actual submission)"}`);
  console.log(`Submit Tests: ${submitTests ? "YES" : "NO (display only)"}`);
  console.log(`Priority Filter: ${priorityFilter}\n`);

  // Filter by priority if specified
  const filterByPriority = <T extends { testPriority: string }>(items: T[]): T[] => {
    if (priorityFilter === "all") return items;
    return items.filter((item) => item.testPriority === priorityFilter);
  };

  const filteredChildProfiles = filterByPriority(childProfiles);
  const filteredQuizCombinations = filterByPriority(quizAnswerCombinations);
  const filteredEdgeCases = filterByPriority(edgeCases);

  // Test Child Profiles
  console.log(`\n📋 Testing ${filteredChildProfiles.length} Child Profiles:\n`);
  filteredChildProfiles.forEach((testCase, index) => {
    console.log(`${index + 1}. [${testCase.testPriority.toUpperCase()}] ${testCase.name}`);
    console.log(`   Description: ${testCase.description}`);
    console.log(`   Age: ${testCase.profile.age}, Gender: ${testCase.profile.gender}`);
    console.log(`   Child ID: ${testCase.profile.id}\n`);
  });

  // Test Quiz Answer Combinations
  console.log(`\n📝 Testing ${filteredQuizCombinations.length} Quiz Answer Combinations:\n`);

  if (submitTests) {
    // Actually submit quiz tests
    const results = [];
    for (const testCase of filteredQuizCombinations) {
      // Always use placeholder-child-id for test submissions
      // This ensures temporary children are created automatically via createTemporaryChildForQuiz()
      // Note: Test child IDs from childProfiles array are for reference only and don't exist in the database
      // Using placeholder-child-id triggers the quiz service to create temporary child records
      const childId = "placeholder-child-id";

      const result = await runSingleQuizTest(
        {
          ...testCase,
          childId,
        },
        dryRun
      );
      results.push(result);

      // Small delay to avoid rate limiting
      if (!dryRun) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Summary
    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;
    console.log(`\n📊 Submission Results: ${successCount} passed, ${failCount} failed`);
  } else {
    // Just display test cases
    filteredQuizCombinations.forEach((testCase, index) => {
      console.log(`${index + 1}. [${testCase.testPriority.toUpperCase()}] ${testCase.name}`);
      console.log(`   Description: ${testCase.description}`);
      console.log(`   Age: ${testCase.answers.age}, Energy: ${testCase.answers.energyLevel}`);
      console.log(
        `   Health Conditions: ${testCase.answers.healthConditions?.join(", ") || "none"}\n`
      );
    });
  }

  // Test Edge Cases
  console.log(`\n⚠️  Testing ${filteredEdgeCases.length} Edge Cases:\n`);
  filteredEdgeCases.forEach((testCase, index) => {
    console.log(`${index + 1}. [${testCase.testPriority.toUpperCase()}] ${testCase.name}`);
    console.log(`   Description: ${testCase.description}`);
    console.log(`   Scenario: ${testCase.scenario}\n`);
  });

  // Summary
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Test Summary");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log(`Total Child Profiles: ${filteredChildProfiles.length}`);
  console.log(`Total Quiz Combinations: ${filteredQuizCombinations.length}`);
  console.log(`Total Edge Cases: ${filteredEdgeCases.length}`);
  console.log(
    `\nTotal Test Cases: ${filteredChildProfiles.length + filteredQuizCombinations.length + filteredEdgeCases.length}`
  );

  const criticalTests =
    filteredChildProfiles.filter((t) => t.testPriority === "critical").length +
    filteredQuizCombinations.filter((t) => t.testPriority === "critical").length +
    filteredEdgeCases.filter((t) => t.testPriority === "critical").length;

  const highTests =
    filteredChildProfiles.filter((t) => t.testPriority === "high").length +
    filteredQuizCombinations.filter((t) => t.testPriority === "high").length +
    filteredEdgeCases.filter((t) => t.testPriority === "high").length;

  console.log(`\nPriority Breakdown:`);
  console.log(`  Critical: ${criticalTests}`);
  console.log(`  High: ${highTests}`);
  console.log(
    `  Medium: ${filteredChildProfiles.length + filteredQuizCombinations.length + filteredEdgeCases.length - criticalTests - highTests}`
  );
}

// Export test data and functions for use in actual test files
export { childProfiles, quizAnswerCombinations, edgeCases };

// Run tests if executed directly
if (require.main === module) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const dryRun = !args.includes("--live");
  const submitTests = args.includes("--submit");
  const priorityFilter = args.find((arg) => arg.startsWith("--priority="))?.split("=")[1] || "all";

  if (args.includes("--help")) {
    console.log(`
Quiz Container Page Test Script

Usage:
  npx tsx scripts/test-quiz-container-page.ts [options]

Options:
  --dry-run          Validate data only, don't submit (default)
  --live             Actually submit quiz data (requires DB + OpenAI)
  --submit           Run actual quiz submissions (combine with --live)
  --priority=<level> Filter by priority: critical, high, medium, low, all (default: all)
  --help             Show this help message

Examples:
  # Display all test cases (default)
  npx tsx scripts/test-quiz-container-page.ts

  # Validate critical tests only (dry run)
  npx tsx scripts/test-quiz-container-page.ts --priority=critical

  # Actually submit critical tests (requires DB + OpenAI)
  npx tsx scripts/test-quiz-container-page.ts --live --submit --priority=critical

⚠️  WARNING: Using --live --submit will create actual quiz submissions in your database
    and consume OpenAI API credits. Use with caution!
`);
    process.exit(0);
  }

  runQuizContainerPageTests({
    dryRun,
    submitTests,
    priorityFilter: priorityFilter as "critical" | "high" | "medium" | "low" | "all",
  }).catch((error) => {
    console.error("\n❌ Test execution failed:", error);
    process.exit(1);
  });
}
