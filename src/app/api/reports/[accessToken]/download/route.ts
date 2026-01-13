/**
 * PDF Download API Route
 *
 * Generates and downloads report PDF.
 * Verifies access token before generating PDF.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyReportAccess } from "@/modules/payments/payments.service";
import { getQuizResult } from "@/modules/quiz/quiz.service";
import { quizRepository } from "@/modules/quiz/quiz.repository";
import { generateReportPDF } from "@/modules/reports/pdf-generation.service";
import { reportAccessTokenSchema } from "@/lib/validations/payments";

/**
 * GET /api/reports/[accessToken]/download
 *
 * Generates PDF and returns as download.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ accessToken: string }> }
) {
  try {
    const { accessToken } = await params;

    // Step 1: Validate access token
    const validationResult = reportAccessTokenSchema.safeParse(accessToken);
    if (!validationResult.success) {
      return NextResponse.json({ error: "Token invalid" }, { status: 400 });
    }

    // Step 2: Verify access token and payment
    const { access, payment } = await verifyReportAccess(accessToken);

    if (!access || !payment) {
      return NextResponse.json({ error: "Acces refuzat" }, { status: 403 });
    }

    if (payment.status !== "completed") {
      return NextResponse.json({ error: "Plata nu este finalizată" }, { status: 403 });
    }

    // Step 3: Get quiz result and answers in parallel for better performance
    const [quizResult, quizAnswers] = await Promise.all([
      getQuizResult(access.quizId),
      quizRepository.getQuizAnswers(access.quizId),
    ]);

    if (!quizResult) {
      return NextResponse.json({ error: "Chestionarul nu a fost găsit" }, { status: 404 });
    }

    // Step 4: Generate PDF
    const pdfBuffer = await generateReportPDF(quizResult, quizAnswers, accessToken);

    // Step 5: Return PDF as download
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="raport-yuvoo-${quizResult.id.slice(0, 8)}.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("[PDF Download] Error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Eroare la generarea PDF-ului" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Eroare neașteptată la generarea PDF-ului" },
      { status: 500 }
    );
  }
}
