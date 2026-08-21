import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getQuizResultAction } from "@/app/actions/quiz";
import { routes } from "@/lib/routes";
import {
  getPaymentByQuizId,
  getReportAccessByPaymentId,
} from "@/modules/payments/payments.repository";
import { db } from "@/lib/db";
import { quizzes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface QuizResultsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export async function generateMetadata({ params }: QuizResultsPageProps): Promise<Metadata> {
  const { id: _id } = await params;

  return {
    title: `Rezultate Chestionar - Recomandări Personalizate | Yuvoo`,
    description:
      "Vezi recomandările personalizate de sporturi pentru copilul tău, generate de AI pe baza răspunsurilor tale.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

/**
 * Quiz Results Page — monetization gate
 *
 * Legacy URL `/chestionar/rezultate/[id]` redirects into the paid funnel:
 * - Paid + token → full report
 * - Paid, token pending → payment success (polling)
 * - No email → email gate
 * - Otherwise → teaser
 */
export default async function QuizResultsPage({ params }: QuizResultsPageProps) {
  await cookies();
  const { id } = await params;

  const quizResult = await getQuizResultAction(id);
  if (!quizResult) {
    notFound();
  }

  const payment = await getPaymentByQuizId(id);
  if (payment?.status === "completed") {
    const reportAccess = await getReportAccessByPaymentId(payment.id);
    if (reportAccess?.accessToken) {
      redirect(routes.quiz.report(reportAccess.accessToken));
    }
    redirect(routes.quiz.paymentSuccess(id));
  }

  const quizRecord = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, id),
    columns: { email: true },
  });
  if (!quizRecord?.email) {
    redirect(routes.quiz.emailGate(id));
  }
  redirect(routes.quiz.teaser(id));
}
