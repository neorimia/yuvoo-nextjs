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
  age: number;
  energyLevel: "low" | "medium" | "high";
  personality: string[];
  interests: string[];
  physicalBuild: "slim" | "average" | "athletic";
  previousSports: string[];
  preferences: {
    indoor: boolean;
    outdoor: boolean;
    team: boolean;
    individual: boolean;
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
