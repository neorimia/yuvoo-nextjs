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
import { InfoBox } from "./components/InfoBox";

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
      <div className="mb-5 d-flex justify-content-center">
        <div className="position-relative">
          <div
            className="position-absolute top-0 start-0 w-100 h-100 bg-yuvoo-primary rounded-circle"
            style={{
              opacity: 0.2,
              animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
          <div className="position-relative bg-yuvoo-primary rounded-circle p-4">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>

      {/* Success Message */}
      <h1 className="display-4 fw-bold text-body mb-4">Felicitări! 🎉</h1>
      <p className="h4 text-body mb-2">
        {userName ? `Bună, ${userName}!` : "Clubul tău a fost creat cu succes!"}
      </p>
      <p className="h5 text-body mb-5">Ai finalizat procesul de onboarding pentru clubul tău.</p>

      {/* Success Details */}
      <div className="bg-success bg-opacity-10 border border-success rounded p-4 mb-5 text-start">
        <div className="mb-4">
          <div className="d-flex align-items-start gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-success mt-1" style={{ flexShrink: 0 }} />
            <div>
              <h3 className="fw-semibold text-body mb-1">Profilul clubului a fost creat</h3>
              <p className="small text-body">
                Toate informațiile introduse au fost salvate și sunt disponibile în profilul
                clubului.
              </p>
            </div>
          </div>

          <div className="d-flex align-items-start gap-3 mb-4">
            <FileText className="w-6 h-6 text-success mt-1" style={{ flexShrink: 0 }} />
            <div>
              <h3 className="fw-semibold text-body mb-1">Documentele au fost încărcate</h3>
              <p className="small text-body">
                Documentele de verificare au fost primite și vor fi revizuite de echipa Yuvoo.
              </p>
            </div>
          </div>

          <div className="d-flex align-items-start gap-3">
            <Clock className="w-6 h-6 text-warning mt-1" style={{ flexShrink: 0 }} />
            <div>
              <h3 className="fw-semibold text-body mb-1">Procesul de verificare</h3>
              <p className="small text-body">
                Verificarea documentelor poate dura 1-3 zile lucrătoare. Vei primi o notificare prin
                email când procesul este finalizat. După verificare, clubul tău va primi badge-ul de
                verificare și va fi vizibil în directorul de cluburi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <InfoBox
        title="Ce urmează?"
        icon={<ArrowRight className="w-5 h-5 text-yuvoo-primary" />}
        className="mb-5 text-start"
      >
        <ul className="small text-body mb-0" style={{ listStyle: "disc", paddingLeft: "1.5rem" }}>
          <li className="mb-2">
            <strong>Explorează dashboard-ul</strong> - Accesează panoul de control al clubului
            pentru a gestiona profilul și setările
          </li>
          <li className="mb-2">
            <strong>Completează profilul</strong> - Adaugă informații suplimentare despre
            facilitățile și activitățile clubului
          </li>
          <li className="mb-2">
            <strong>Așteaptă verificarea</strong> - Echipa Yuvoo va revizui documentele în cel mai
            scurt timp posibil
          </li>
          <li>
            <strong>Primește rezervări</strong> - După verificare, clubul tău va apărea în director
            și părinții vor putea rezerva probe
          </li>
        </ul>
      </InfoBox>

      {/* Actions */}
      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
        <Link
          href={routes.club.dashboard}
          className="d-inline-flex align-items-center justify-content-center gap-2 px-4 py-3 bg-yuvoo-primary text-white fw-semibold rounded text-yuvoo-primary-hover focus-yuvoo-primary"
          style={{
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bd-theme-1-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bd-theme-1)";
          }}
        >
          Mergi la Dashboard
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          href={routes.clubs.list}
          className="d-inline-flex align-items-center justify-content-center gap-2 px-4 py-3 bg-white text-body fw-semibold rounded border-2 border-secondary text-yuvoo-primary-hover border-yuvoo-primary-hover focus-yuvoo-primary"
          style={{
            transition: "all 0.2s ease-in-out",
          }}
        >
          Vezi Cluburi
        </Link>
      </div>

      {/* Auto-redirect notice */}
      <p className="mt-4 small text-secondary">
        Vei fi redirecționat automat la dashboard în câteva secunde...
      </p>
    </div>
  );
}
