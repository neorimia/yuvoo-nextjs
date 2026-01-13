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
  whyStoppedSports?: string[]; // Optional: reasons for stopping previous sports

  // Question 5: Physical Build, Coordination & Health
  physicalBuild: "slim" | "average" | "athletic";
  coordinationLevel: "excellent" | "good" | "developing" | "challenges";
  healthConditions?: string[]; // Optional: medical conditions or safety concerns
  physicalConsiderations?: string; // Optional notes about physical considerations

  // Question 6: Preferences
  preferences: {
    indoor: boolean; // Prefers indoor activities
    outdoor: boolean; // Prefers outdoor activities
    team: boolean; // Prefers team sports
    individual: boolean; // Prefers individual sports
    timeAvailability?: string; // Optional: time availability notes
    budgetConsiderations?: string; // Optional: budget notes
    parentInvolvement?: string; // Optional: parent involvement level (transport-only, attend, participate, minimal)
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

export interface SpecialistRecommendation {
  specialty: "orthopedist" | "nutritionist" | "psychologist" | "general";
  needed: boolean;
  reason: string; // AI-generated explanation in Romanian
  priority?: "high" | "medium" | "low"; // Priority level for consultation
}

export interface QuizResult {
  id: string;
  childId: string;
  recommendations: SportRecommendation[];
  specialistRecommendation?: SpecialistRecommendation;
  location?: string | null; // City/location for local club recommendations
  createdAt: Date;
}

export interface CreateQuizInput {
  childId: string;
  answers: QuizAnswers;
  email?: string; // Optional email for unauthenticated users to receive results
}
