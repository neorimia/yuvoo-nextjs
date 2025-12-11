/**
 * Stack Auth Error Message Mappings (Romanian)
 *
 * Maps Stack Auth error codes to user-friendly Romanian messages.
 */

export const errorMessages: Record<string, string> = {
  "invalid-credentials": "Email sau parolă incorectă. Te rugăm să încerci din nou.",
  "email-already-exists": "Acest email este deja înregistrat. Te rugăm să te autentifici.",
  "weak-password":
    "Parola este prea slabă. Folosește cel puțin 8 caractere, incluzând litere și cifre.",
  "invalid-email": "Adresa de email nu este validă.",
  "user-not-found": "Nu există un cont cu acest email.",
  "network-error": "Eroare de conexiune. Te rugăm să încerci din nou.",
  "too-many-requests": "Prea multe încercări. Te rugăm să aștepți câteva minute.",
  "email-not-verified": "Email-ul nu a fost verificat. Verifică căsuța poștală.",
  "account-disabled": "Contul tău a fost dezactivat. Contactează suportul.",
  "unknown-error": "A apărut o eroare. Te rugăm să încerci din nou mai târziu.",
};

/**
 * Get user-friendly error message from Stack Auth error
 */
export function getErrorMessage(error: unknown): string {
  if (!error) return errorMessages["unknown-error"];

  // Check if error is a string
  if (typeof error === "string") {
    return errorMessages[error] || error || errorMessages["unknown-error"];
  }

  // Check if error has a message property
  if (error && typeof error === "object" && "message" in error) {
    const message = String(error.message);
    // Try to match error message to known error codes
    for (const [key, value] of Object.entries(errorMessages)) {
      if (message.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    // Check for common error patterns
    if (message.toLowerCase().includes("invalid") && message.toLowerCase().includes("credential")) {
      return errorMessages["invalid-credentials"];
    }
    if (message.toLowerCase().includes("email") && message.toLowerCase().includes("exist")) {
      return errorMessages["email-already-exists"];
    }
    if (message.toLowerCase().includes("weak") || message.toLowerCase().includes("password")) {
      return errorMessages["weak-password"];
    }
    return message || errorMessages["unknown-error"];
  }

  return errorMessages["unknown-error"];
}
