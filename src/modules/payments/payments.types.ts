/**
 * Payment Types
 *
 * TypeScript types for payment domain.
 */

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";
export type PaymentProvider = "stripe" | "paypal" | "netopia" | "payu";

export interface Payment {
  id: string;
  userId: string | null;
  quizId: string;
  amount: number; // Amount in smallest currency unit (lei * 100 = bani)
  currency: string; // "RON"
  status: PaymentStatus;
  paymentProvider: PaymentProvider;
  paymentProviderId: string | null;
  paymentProviderMetadata: Record<string, unknown> | null;
  createdAt: Date;
  completedAt: Date | null;
  updatedAt: Date;
}

export interface CreatePaymentInput {
  quizId: string;
  userId?: string; // Optional (for authenticated users)
  amount: number; // Amount in smallest currency unit
  currency?: string; // Default: "RON"
  paymentProvider: PaymentProvider;
}

export interface UpdatePaymentInput {
  status?: PaymentStatus;
  paymentProviderId?: string;
  paymentProviderMetadata?: Record<string, unknown>;
  completedAt?: Date;
}

export interface ReportAccess {
  id: string;
  quizId: string;
  paymentId: string;
  accessToken: string;
  expiresAt: Date | null;
  createdAt: Date;
  lastAccessedAt: Date | null;
}

export interface CreateReportAccessInput {
  quizId: string;
  paymentId: string;
  expiresAt?: Date; // Optional expiration (default: 10 years)
}
