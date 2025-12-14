/**
 * Quiz Types
 *
 * TypeScript types for AI Coach Quiz domain.
 */

export interface QuizSubmission {
  id: string;
  childId: string;
  answers: QuizAnswers;
  submittedAt: Date;
}

export interface QuizAnswers {
  // Question 1: Age & Basic Info
  age: number; // 4-14 years
  gender?: "male" | "female" | "other"; // Optional

  // Question 2: Energy Level
  energyLevel: "low" | "medium" | "high" | "very_high";

  // Question 3: Personality Traits
  personality: string[]; // e.g., ["outgoing", "competitive", "cooperative"]

  // Question 4: Interests & Hobbies
  interests: string[]; // Current interests
  previousSports: string[]; // Previously tried sports

  // Question 5: Physical Build
  physicalBuild: "slim" | "average" | "athletic";
  physicalConsiderations?: string; // Optional notes about physical considerations

  // Question 6: Preferences
  preferences: {
    indoor: boolean; // Prefers indoor activities
    outdoor: boolean; // Prefers outdoor activities
    team: boolean; // Prefers team sports
    individual: boolean; // Prefers individual sports
    timeAvailability?: string; // Optional: time availability notes
    budgetConsiderations?: string; // Optional: budget notes
  };
}

export interface SportRecommendation {
  sportId: string;
  sportName: string;
  matchScore: number; // 0-100
  reasoning: string; // AI-generated explanation in Romanian
  benefits: string[];
  considerations: string[];
}

export interface QuizResult {
  id: string;
  childId: string;
  recommendations: SportRecommendation[];
  createdAt: Date;
}

export interface CreateQuizInput {
  childId: string;
  answers: QuizAnswers;
}
