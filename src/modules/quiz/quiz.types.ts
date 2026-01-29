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
  childName?: string; // Optional: child's first name for personalization (e.g. in report)
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
  injuryDetails?: {
    // Optional: detailed information about injury (shown when "injury" selected in whyStoppedSports)
    type?: "fracture" | "growth-plate" | "dislocation" | "sprain" | "concussion" | "other";
    when?: "<1month" | "1-3months" | "3-6months" | "6-12months" | ">1year";
    healed?: boolean | null; // null = unknown/not sure
    restrictions?: boolean; // Current medical restrictions
  };

  // Question 5: Critical Health Screening (NEW)
  criticalHealth?: {
    cardiacSymptoms?: boolean; // Has cardiac symptoms during exercise
    cardiacFamilyHistory?: boolean; // Family history of sudden cardiac death under 50
    recentConcussion?: boolean; // Concussion in last 3 months
    multipleConcussions?: boolean; // 2+ concussions in last 2 years
  };

  // Question 6: Physical Build, Coordination & Health
  physicalBuild: "slim" | "average" | "athletic";
  coordinationLevel: "excellent" | "good" | "developing" | "challenges";
  healthConditions?: string[]; // Optional: medical conditions or safety concerns (kept for backward compatibility)
  // Enhanced health condition severity levels
  asthmaSeverity?: "none" | "mild" | "moderate" | "severe";
  inhalerUse?: "yes" | "no" | "sometimes"; // Follow-up question for asthma
  jointPainSeverity?: "none" | "mild" | "moderate" | "severe";
  physicalConsiderations?: string; // Optional notes about physical considerations

  // Question 7: Preferences
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
  specialty:
    | "orthopedist"
    | "nutritionist"
    | "psychologist"
    | "cardiologist"
    | "neurologist"
    | "pulmonologist" // Added in Task 1.4.2 for respiratory conditions
    | "general";
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
