import Link from "next/link";
import { routes } from "@/lib/routes";

type YMYLDisclaimerVariant = "medical" | "sport" | "general";

interface YMYLDisclaimerProps {
  variant?: YMYLDisclaimerVariant;
  className?: string;
}

const copy: Record<YMYLDisclaimerVariant, { title: string; body: string }> = {
  medical: {
    title: "Disclaimer medical",
    body: "Informațiile de pe această pagină nu constituie sfat medical și nu înlocuiesc consultația unui medic pediatru. Yuvoo este o platformă de orientare sportivă. Consultă întotdeauna un specialist înainte de a lua decizii legate de sănătatea copilului tău.",
  },
  sport: {
    title: "Disclaimer sănătate și sport",
    body: "Informațiile despre acest sport au scop informativ și educativ. Nu constituie sfat medical. Consultă un medic pediatru înainte de a înscrie copilul la orice activitate sportivă, mai ales dacă are condiții de sănătate preexistente.",
  },
  general: {
    title: "Informații orientative",
    body: "Conținutul Yuvoo are scop informativ și nu înlocuiește evaluarea directă a unui antrenor, medic sau specialist. Decizia finală privind sportul potrivit aparține părintelui.",
  },
};

export default function YMYLDisclaimer({
  variant = "general",
  className = "",
}: YMYLDisclaimerProps) {
  const { title, body } = copy[variant];

  return (
    <div
      className={`card border-yuvoo-secondary bg-yuvoo-secondary-very-light mb-4 ${className}`.trim()}
      role="note"
    >
      <div className="card-body py-3 px-4">
        <p className="small mb-1 fw-semibold text-yuvoo-secondary">
          <i className="bi bi-exclamation-triangle-fill me-2" aria-hidden="true" />
          {title}
        </p>
        <p className="small text-muted mb-0">{body}</p>
        {(variant === "medical" || variant === "sport") && (
          <p className="small mb-0 mt-2">
            <Link
              href={routes.doctors.list}
              className="text-yuvoo-primary text-decoration-underline"
            >
              Vezi specialiști pediatri
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

/** Inline FAQ disclaimer paragraph for faq-data.tsx */
export const FAQ_YMYL_DISCLAIMER_TEXT =
  "Notă: Informațiile de pe Yuvoo nu constituie sfat medical. Yuvoo este o platformă de orientare sportivă. Consultă un medic pediatru înainte de decizii legate de sănătatea copilului tău.";

export function FaqYmylDisclaimer() {
  return (
    <p className="small text-muted mt-2 mb-0">
      <strong>Notă:</strong> {FAQ_YMYL_DISCLAIMER_TEXT.replace(/^Notă: /, "")}
    </p>
  );
}
