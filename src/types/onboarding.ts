/**
 * Onboarding TypeScript Types
 *
 * Type definitions for onboarding state, progress, and data structures.
 */

// Enums
export type UserRole = "parent" | "club_admin" | "doctor" | "admin";
export type VerificationStatus = "pending" | "in_review" | "approved" | "rejected";
export type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// Onboarding Progress
export interface OnboardingProgress {
  id: string;
  userId: string;
  role: UserRole;
  currentStep: OnboardingStep;
  totalSteps: number;
  completedSteps: string[];
  stepData: OnboardingStepData;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// JSONB stepData structure
export interface OnboardingStepData {
  // Parent onboarding
  child_id?: string;

  // Club admin onboarding
  club_id?: string;
  club_basic_info?: {
    name: string;
    sportType: string;
    description: string;
    city: string;
    district?: string;
    address: string;
  };
  club_contact_schedule?: {
    phone: string;
    email: string;
    website?: string;
    schedule: ScheduleEntry[];
  };
  club_pricing_ages?: {
    pricing: PricingOption[];
    ageGroups: number[];
    experienceLevels: string[];
  };
  club_photos?: {
    logoUrl: string;
    galleryUrls: string[];
  };

  // Doctor onboarding
  doctor_id?: string;
  doctor_basic_info?: {
    firstName: string;
    lastName: string;
    title?: string;
    specialty: string;
    credentials: string[];
  };
  doctor_bio_experience?: {
    bio: string;
    yearsOfExperience: number;
    secondarySpecialties?: string[];
    languages: string[];
  };
  doctor_location_contact?: {
    city: string;
    district?: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
  };
  doctor_photo?: {
    photoUrl?: string;
  };
  doctor_availability?: {
    acceptingNewPatients: boolean;
    onlineConsultations: boolean;
    schedule?: ScheduleEntry[];
  };
}

// Shared Types
export interface ScheduleEntry {
  day: string;
  time?: string; // For clubs: "17:00-18:30"
  startTime?: string; // For doctors: "09:00"
  endTime?: string; // For doctors: "17:00"
}

export interface PricingOption {
  type: "monthly" | "per_class" | "per_semester";
  amount: number;
}

// Component Props
export interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  role: UserRole;
}

export interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

export interface OnboardingNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  isLoading?: boolean;
}

export interface ProfileImageUploadProps {
  type: "logo" | "photo" | "gallery";
  onUpload: (url: string) => void;
  onRemove?: () => void;
  maxSize?: number; // in MB
  accept?: string;
  preview?: string;
  multiple?: boolean;
}

export interface DocumentUploadProps {
  documentType: string;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  required?: boolean;
  maxSize?: number; // in MB
  accept?: string;
}
