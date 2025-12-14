/**
 * Quiz Context
 *
 * Manages quiz state across all steps using React Context.
 * Includes localStorage persistence to prevent data loss.
 */

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { QuizAnswers } from "@/modules/quiz/quiz.types";

// Partial quiz answers (some fields may be incomplete during the quiz)
type PartialQuizAnswers = Partial<QuizAnswers>;

interface QuizContextValue {
  // State
  currentStep: number; // Current step (1-6)
  answers: PartialQuizAnswers; // Current quiz answers
  errors: Record<string, string>; // Validation errors by field

  // Actions
  setAnswer: <K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => void;
  setAnswers: (answers: PartialQuizAnswers) => void;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetQuiz: () => void;

  // Validation
  canGoNext: boolean; // Can navigate to next step
  isComplete: boolean; // All required fields filled
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

const TOTAL_STEPS = 6;
const STORAGE_KEY = "yuvoo_quiz_progress";

interface QuizProviderProps {
  children: React.ReactNode;
  childId?: string; // Optional: link quiz to specific child
}

export function QuizProvider({ children, childId }: QuizProviderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswersState] = useState<PartialQuizAnswers>({});
  const [errors, setErrorsState] = useState<Record<string, string>>({});

  // Load quiz progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.answers) {
          setAnswersState(data.answers);
        }
        if (data.step && data.step >= 1 && data.step <= TOTAL_STEPS) {
          setCurrentStep(data.step);
        }
      }
    } catch (error) {
      console.error("Failed to load quiz progress:", error);
    }
  }, []);

  // Save quiz progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step: currentStep,
          answers,
          childId,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error("Failed to save quiz progress:", error);
    }
  }, [currentStep, answers, childId]);

  // Set individual answer field
  const setAnswer = useCallback(<K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => {
    setAnswersState((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    setErrorsState((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  // Set multiple answers at once
  const setAnswers = useCallback((newAnswers: PartialQuizAnswers) => {
    setAnswersState((prev) => ({
      ...prev,
      ...newAnswers,
    }));
  }, []);

  // Set validation error
  const setError = useCallback((field: string, error: string) => {
    setErrorsState((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  // Clear validation error
  const clearError = useCallback((field: string) => {
    setErrorsState((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Navigate to next step
  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  // Navigate to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  // Go to specific step
  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Reset quiz (clear all data)
  const resetQuiz = useCallback(() => {
    setCurrentStep(1);
    setAnswersState({});
    setErrorsState({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear quiz progress:", error);
    }
  }, []);

  // Check if current step is valid (basic validation)
  const canGoNext = useCallback(() => {
    // Step-specific validation
    switch (currentStep) {
      case 1: // Age
        return answers.age !== undefined && answers.age >= 4 && answers.age <= 14;
      case 2: // Energy Level
        return answers.energyLevel !== undefined;
      case 3: // Personality
        return answers.personality !== undefined && answers.personality.length > 0;
      case 4: // Interests
        return answers.interests !== undefined && answers.interests.length > 0;
      case 5: // Physical Build
        return answers.physicalBuild !== undefined;
      case 6: // Preferences
        return (
          answers.preferences !== undefined &&
          (answers.preferences.indoor || answers.preferences.outdoor) &&
          (answers.preferences.team || answers.preferences.individual)
        );
      default:
        return false;
    }
  }, [currentStep, answers]);

  // Check if quiz is complete (all required fields filled)
  const isComplete = useCallback(() => {
    return (
      answers.age !== undefined &&
      answers.energyLevel !== undefined &&
      answers.personality !== undefined &&
      answers.personality.length > 0 &&
      answers.interests !== undefined &&
      answers.interests.length > 0 &&
      answers.physicalBuild !== undefined &&
      answers.preferences !== undefined &&
      (answers.preferences.indoor || answers.preferences.outdoor) &&
      (answers.preferences.team || answers.preferences.individual)
    );
  }, [answers]);

  const value: QuizContextValue = {
    currentStep,
    answers,
    errors,
    setAnswer,
    setAnswers,
    setError,
    clearError,
    nextStep,
    prevStep,
    goToStep,
    resetQuiz,
    canGoNext: canGoNext(),
    isComplete: isComplete(),
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

// Custom hook to use quiz context
export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
