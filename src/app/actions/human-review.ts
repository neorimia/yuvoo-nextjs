/**
 * Human Review Request Server Actions
 *
 * GDPR Art. 22 (Automated Individual Decision-Making)
 *
 * Allows users to request human review of AI-generated recommendations.
 * The user has the right to:
 * - Obtain human intervention
 * - Express their point of view
 * - Contest the decision
 */

"use server";

import { headers } from "next/headers";
import { requireAuth } from "@/modules/auth/auth.service";
import { db } from "@/lib/db";
import { quizzes, children } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/integrations/brevo";

// ============================================================================
// Types
// ============================================================================

interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

interface HumanReviewResult {
  referenceId: string;
  message: string;
  expectedResponseDays: number;
}

interface ReviewRequestDetails {
  quizId: string;
  reason: string;
  additionalContext?: string;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Support email for human review requests
 */
const GDPR_EMAIL = "gdpr@yuvoo.ro";

/**
 * Maximum response time in days (GDPR requirement)
 */
const MAX_RESPONSE_DAYS = 30;

/**
 * Target response time for human review (internal SLA)
 */
const TARGET_RESPONSE_DAYS = 7;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get client info from request headers
 */
async function getClientInfo(): Promise<{ ipAddress: string; userAgent: string }> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";
  return { ipAddress, userAgent };
}

/**
 * Generate a unique reference ID for the review request
 */
function generateReferenceId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `HR-${timestamp}-${random}`;
}

// ============================================================================
// Human Review Actions
// ============================================================================

/**
 * Request human review of AI recommendation (GDPR Art. 22)
 *
 * Creates a support request for manual review of AI-generated
 * sport recommendations. The support team will:
 * 1. Review the quiz answers and AI recommendations
 * 2. Provide human assessment
 * 3. Respond to the user within the specified timeframe
 */
export async function requestHumanReviewAction(
  details: ReviewRequestDetails
): Promise<ActionResult<HumanReviewResult>> {
  try {
    const user = await requireAuth();
    const { ipAddress, userAgent } = await getClientInfo();

    const { quizId, reason, additionalContext } = details;

    // Validate reason
    if (!reason || reason.trim().length < 10) {
      return {
        success: false,
        error:
          "Te rugăm să oferi un motiv mai detaliat pentru cererea de revizuire (minim 10 caractere).",
      };
    }

    // Fetch quiz data
    const quiz = await db.query.quizzes.findFirst({
      where: eq(quizzes.id, quizId),
    });

    if (!quiz) {
      return {
        success: false,
        error: "Chestionarul nu a fost găsit.",
      };
    }

    // Fetch child data to verify ownership
    const child = await db.query.children.findFirst({
      where: eq(children.id, quiz.childId),
    });

    if (!child || child.parentId !== user.id) {
      return {
        success: false,
        error: "Nu ai permisiunea de a solicita revizuirea acestui chestionar.",
      };
    }

    // Generate reference ID
    const referenceId = generateReferenceId();

    // Prepare email content for support team
    const emailSubject = `[Art. 22] Cerere de revizuire umană - ${referenceId}`;
    const emailBody = `
      <h2>Cerere de revizuire umană a recomandărilor AI</h2>

      <p><strong>Referință:</strong> ${referenceId}</p>
      <p><strong>Data cererii:</strong> ${new Date().toLocaleString("ro-RO")}</p>
      <p><strong>Termen legal de răspuns:</strong> ${MAX_RESPONSE_DAYS} zile (GDPR Art. 22)</p>
      <p><strong>Termen intern recomandat:</strong> ${TARGET_RESPONSE_DAYS} zile lucrătoare</p>

      <hr />

      <h3>Detalii solicitare</h3>
      <p><strong>Utilizator ID:</strong> ${user.id}</p>
      <p><strong>Email utilizator:</strong> ${user.email}</p>
      <p><strong>Quiz ID:</strong> ${quizId}</p>
      <p><strong>Copil ID:</strong> ${child.id}</p>
      <p><strong>Vârsta copilului:</strong> ${calculateAge(child.dateOfBirth)} ani</p>

      <hr />

      <h3>Motivul cererii</h3>
      <p>${escapeHtml(reason)}</p>

      ${
        additionalContext
          ? `
      <h3>Context suplimentar</h3>
      <p>${escapeHtml(additionalContext)}</p>
      `
          : ""
      }

      <hr />

      <h3>Recomandări AI actuale</h3>
      <pre>${JSON.stringify(quiz.recommendations, null, 2)}</pre>

      <hr />

      <h3>Răspunsuri chestionar</h3>
      <pre>${JSON.stringify(quiz.answers, null, 2)}</pre>

      <hr />

      <h3>Metadate tehnice</h3>
      <p><strong>IP Address:</strong> ${ipAddress}</p>
      <p><strong>User Agent:</strong> ${userAgent}</p>

      <hr />

      <p><em>Aceasta este o cerere conformă cu GDPR Art. 22 pentru revizuirea umană
      a unei decizii automatizate. Utilizatorul are dreptul să primească o explicație
      și să conteste decizia.</em></p>

      <p><strong>Acțiuni necesare:</strong></p>
      <ol>
        <li>Revizuiește răspunsurile la chestionar și recomandările AI</li>
        <li>Evaluează dacă recomandările sunt potrivite pentru profilul copilului</li>
        <li>Pregătește un răspuns personalizat cu explicații</li>
        <li>Răspunde utilizatorului la ${user.email}</li>
        <li>Documentează revizuirea în sistemul de suport</li>
      </ol>
    `;

    // Send email to support team
    try {
      await sendEmail({
        to: GDPR_EMAIL,
        subject: emailSubject,
        htmlContent: emailBody,
        replyTo: user.email,
        tags: ["gdpr", "human-review"],
      });
    } catch (emailError) {
      // Log error but don't fail the request
      console.error("Failed to send human review email:", emailError);
      // In production, this should trigger an alert
    }

    // Send confirmation email to user
    try {
      await sendEmail({
        to: user.email,
        subject: `Cererea ta de revizuire a fost înregistrată - ${referenceId}`,
        htmlContent: `
          <h2>Cererea ta a fost înregistrată</h2>

          <p>Bună,</p>

          <p>Am primit cererea ta de revizuire umană a recomandărilor AI Coach.</p>

          <p><strong>Număr de referință:</strong> ${referenceId}</p>

          <p>Echipa noastră va analiza recomandările și îți va răspunde în maximum
          <strong>${TARGET_RESPONSE_DAYS} zile lucrătoare</strong>.</p>

          <p>Conform GDPR Art. 22, ai dreptul să:</p>
          <ul>
            <li>Primești o explicație detaliată a modului în care au fost generate recomandările</li>
            <li>Îți exprimi punctul de vedere</li>
            <li>Contești decizia și să soliciți o reevaluare</li>
          </ul>

          <p>Dacă ai întrebări suplimentare, te rugăm să răspunzi la acest email
          menționând numărul de referință ${referenceId}.</p>

          <p>Mulțumim pentru răbdare,<br />
          Echipa Yuvoo</p>
        `,
        tags: ["gdpr", "human-review", "confirmation"],
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return {
      success: true,
      data: {
        referenceId,
        message: `Cererea ta a fost înregistrată cu numărul de referință ${referenceId}. Vei primi un răspuns în maximum ${TARGET_RESPONSE_DAYS} zile lucrătoare.`,
        expectedResponseDays: TARGET_RESPONSE_DAYS,
      },
    };
  } catch (error) {
    console.error("Human review request failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Eroare la înregistrarea cererii. Te rugăm să încerci din nou sau să ne contactezi la gdpr@yuvoo.ro",
    };
  }
}

/**
 * Get available review reasons (for UI dropdown)
 */
export async function getReviewReasonsAction(): Promise<
  ActionResult<{ value: string; label: string }[]>
> {
  const reasons = [
    {
      value: "recommendations_not_suitable",
      label: "Recomandările nu sunt potrivite pentru copilul meu",
    },
    {
      value: "missing_considerations",
      label: "AI-ul nu a luat în considerare anumite aspecte importante",
    },
    {
      value: "health_concerns_ignored",
      label: "Condițiile de sănătate nu au fost luate în considerare corect",
    },
    {
      value: "want_explanation",
      label: "Doresc o explicație detaliată a modului de generare a recomandărilor",
    },
    {
      value: "disagree_with_scores",
      label: "Nu sunt de acord cu scorurile de potrivire",
    },
    {
      value: "other",
      label: "Alt motiv (specificați)",
    },
  ];

  return {
    success: true,
    data: reasons,
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Calculate age from date of birth
 */
function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/**
 * Escape HTML to prevent XSS in emails
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}
