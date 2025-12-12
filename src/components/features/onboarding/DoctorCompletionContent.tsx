/**
 * DoctorCompletionContent Component
 *
 * Client component that shows completion success message and redirects to dashboard.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { CheckCircle2, ArrowRight, FileText, Clock, User } from "lucide-react";
import Link from "next/link";

interface DoctorCompletionContentProps {
  doctorName?: string | null;
  doctorTitle?: string | null;
}

export function DoctorCompletionContent({ doctorName, doctorTitle }: DoctorCompletionContentProps) {
  const router = useRouter();

  // Auto-redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(routes.doctor.dashboard);
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const displayName =
    doctorTitle && doctorName ? `${doctorTitle} ${doctorName}` : doctorName || "Doctor";

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
      <h1 className="text-4xl font-bold text-gray-900 mb-4">✅ Profil complet!</h1>
      <p className="text-xl text-gray-600 mb-2">Felicitări, {displayName}!</p>
      <p className="text-lg text-gray-600 mb-8">
        Profilul tău profesional a fost creat cu succes și trimis spre verificare.
      </p>

      {/* Success Details */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-left">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Profilul profesional a fost creat
              </h3>
              <p className="text-sm text-gray-700">
                Toate informațiile introduse au fost salvate și sunt disponibile în profilul tău
                profesional.
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
                Verificarea documentelor poate dura 2-3 zile lucrătoare. Vei primi o notificare prin
                email când procesul este finalizat. După verificare, profilul tău va primi badge-ul
                de verificare și va fi vizibil în directorul de doctori.
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
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <span>
              <strong>Verificare documente (2-3 zile)</strong> - Echipa Yuvoo va revizui documentele
              încărcate
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <span>
              <strong>Notificare email la aprobare</strong> - Vei primi un email când profilul este
              verificat și aprobat
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <span>
              <strong>Profil vizibil pe platformă</strong> - După aprobare, profilul tău va apărea
              în directorul de doctori
            </span>
          </li>
        </ul>
      </div>

      {/* What You Can Do */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 text-left">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-[#00BBAE]" />
          Ce poți face acum?
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
          <li>
            <strong>Gestionează consultații</strong> - Vezi și gestionează solicitările de
            consultații de la părinți
          </li>
          <li>
            <strong>Editează profilul profesional</strong> - Actualizează informațiile despre
            specialitate, experiență și disponibilitate
          </li>
          <li>
            <strong>Vezi solicitări părinți</strong> - Părinții pot solicita consultații prin
            platformă
          </li>
          <li>
            <strong>Configurează programul</strong> - Actualizează disponibilitatea și programul de
            consultații
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href={routes.doctor.dashboard}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00BBAE] text-white font-semibold rounded-lg hover:bg-[#00A89B] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2"
        >
          Mergi la Dashboard
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          href={routes.doctors.list}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-[#00BBAE] hover:text-[#00BBAE] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00BBAE] focus:ring-offset-2"
        >
          Vezi Doctori
        </Link>
      </div>

      {/* Auto-redirect notice */}
      <p className="mt-6 text-sm text-gray-500">
        Vei fi redirecționat automat la dashboard în câteva secunde...
      </p>
    </div>
  );
}
