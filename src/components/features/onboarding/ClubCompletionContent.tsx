/**
 * ClubCompletionContent Component
 *
 * Client component that shows completion success message and redirects to dashboard.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { CheckCircle2, ArrowRight, FileText, Clock } from "lucide-react";
import Link from "next/link";

interface ClubCompletionContentProps {
  userName?: string | null;
}

export function ClubCompletionContent({ userName }: ClubCompletionContentProps) {
  const router = useRouter();

  // Auto-redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(routes.club.dashboard);
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="text-center">
      {/* Success Icon */}
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[#00BBAE]/20 rounded-full animate-ping"></div>
          <div className="relative bg-[#00BBAE] rounded-full p-6">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>

      {/* Success Message */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Felicitări! 🎉</h1>
      <p className="text-xl text-gray-600 mb-2">
        {userName ? `Bună, ${userName}!` : "Clubul tău a fost creat cu succes!"}
      </p>
      <p className="text-lg text-gray-600 mb-8">
        Ai finalizat procesul de onboarding pentru clubul tău.
      </p>

      {/* Success Details */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-left">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Profilul clubului a fost creat</h3>
              <p className="text-sm text-gray-700">
                Toate informațiile introduse au fost salvate și sunt disponibile în profilul
                clubului.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Documentele au fost încărcate</h3>
              <p className="text-sm text-gray-700">
                Documentele de verificare au fost primite și vor fi revizuite de echipa Yuvoo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Procesul de verificare</h3>
              <p className="text-sm text-gray-700">
                Verificarea documentelor poate dura 1-3 zile lucrătoare. Vei primi o notificare prin
                email când procesul este finalizat. După verificare, clubul tău va primi badge-ul de
                verificare și va fi vizibil în directorul de cluburi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-[#EBFFFE] border border-[#00BBAE]/20 rounded-xl p-6 mb-8 text-left">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-[#00BBAE]" />
          Ce urmează?
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
          <li>
            <strong>Explorează dashboard-ul</strong> - Accesează panoul de control al clubului
            pentru a gestiona profilul și setările
          </li>
          <li>
            <strong>Completează profilul</strong> - Adaugă informații suplimentare despre
            facilitățile și activitățile clubului
          </li>
          <li>
            <strong>Așteaptă verificarea</strong> - Echipa Yuvoo va revizui documentele în cel mai
            scurt timp posibil
          </li>
          <li>
            <strong>Primește rezervări</strong> - După verificare, clubul tău va apărea în director
            și părinții vor putea rezerva probe
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href={routes.club.dashboard}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00BBAE] text-white font-semibold rounded-lg hover:bg-[#00A89B] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2"
        >
          Mergi la Dashboard
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          href={routes.clubs.list}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-[#00BBAE] hover:text-[#00BBAE] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2"
        >
          Vezi Cluburi
        </Link>
      </div>

      {/* Auto-redirect notice */}
      <p className="mt-6 text-sm text-gray-500">
        Vei fi redirecționat automat la dashboard în câteva secunde...
      </p>
    </div>
  );
}
