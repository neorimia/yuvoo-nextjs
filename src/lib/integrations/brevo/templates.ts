/**
 * Brevo Email Templates
 *
 * HTML email templates for transactional emails.
 * All templates are responsive, Bootstrap-based, and use Romanian language.
 */

import { routes } from "@/lib/routes";
import type { Booking } from "@/modules/bookings/bookings.types";
import type { Club } from "@/modules/clubs/clubs.types";
import type { Doctor } from "@/modules/doctors/doctors.types";
import type { QuizResult, SportRecommendation } from "@/modules/quiz/quiz.types";
import type { Child } from "@/modules/children/children.types";
import type { AuthUser } from "@/modules/auth/auth.types";

/**
 * Base email template wrapper
 */
function baseEmailTemplate(content: string, title: string): { html: string; text: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "noreply@yuvoo.ro";

  const html = `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px 20px;
      text-align: center;
    }
    .email-header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 30px 20px;
    }
    .email-content {
      color: #333;
      font-size: 16px;
    }
    .email-content h2 {
      color: #667eea;
      font-size: 20px;
      margin-top: 0;
      margin-bottom: 20px;
    }
    .email-content p {
      margin-bottom: 15px;
    }
    .email-button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #667eea;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
    }
    .email-button:hover {
      background-color: #5568d3;
    }
    .email-footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
      border-top: 1px solid #e9ecef;
    }
    .email-footer a {
      color: #667eea;
      text-decoration: none;
    }
    .info-box {
      background-color: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .info-box strong {
      color: #667eea;
    }
    .recommendation-card {
      background-color: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 20px;
      margin: 15px 0;
    }
    .recommendation-card h3 {
      color: #667eea;
      margin-top: 0;
      margin-bottom: 10px;
    }
    .match-score {
      display: inline-block;
      padding: 5px 15px;
      background-color: #667eea;
      color: #ffffff;
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 10px;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
      .email-body {
        padding: 20px 15px !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Yuvoo</h1>
    </div>
    <div class="email-body">
      <div class="email-content">
        ${content}
      </div>
    </div>
    <div class="email-footer">
      <p>
        <strong>Yuvoo</strong> - Descoperă sportul potrivit pentru copilul tău<br>
        <a href="${appUrl}">${appUrl}</a>
      </p>
      <p style="margin-top: 10px; font-size: 11px; color: #999;">
        Acest email a fost trimis automat. Te rugăm să nu răspunzi la acest email.<br>
        Pentru întrebări, contactează-ne la <a href="mailto:${senderEmail}">${senderEmail}</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  // Plain text version (strip HTML)
  const text = content
    .replace(/<[^>]*>/g, "")
    .replace(/\n\s*\n/g, "\n\n")
    .trim();

  return { html, text };
}

/**
 * Contact form submission template
 *
 * Email template sent to Yuvoo team when a user submits the contact form.
 */
export function contactFormTemplate(data: {
  firstName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): { html: string; text: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "noreply@yuvoo.ro";

  const html = `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mesaj nou de la ${data.firstName}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px 20px;
      text-align: center;
    }
    .email-header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 30px 20px;
    }
    .email-content {
      color: #333;
      font-size: 16px;
      line-height: 1.8;
    }
    .contact-details {
      background-color: #f9f9f9;
      border-left: 4px solid #667eea;
      padding: 20px;
      margin: 20px 0;
    }
    .contact-details p {
      margin: 8px 0;
    }
    .contact-details strong {
      color: #667eea;
    }
    .message-box {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      white-space: pre-wrap;
    }
    .email-footer {
      background-color: #f9f9f9;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .email-footer a {
      color: #667eea;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Mesaj nou de la ${data.firstName}</h1>
    </div>
    <div class="email-body">
      <div class="email-content">
        <p>Ai primit un mesaj nou prin formularul de contact de pe platforma Yuvoo.</p>
        
        <div class="contact-details">
          <p><strong>Nume:</strong> ${data.firstName}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Telefon:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
          <p><strong>Subiect:</strong> ${data.subject}</p>
        </div>

        <p><strong>Mesaj:</strong></p>
        <div class="message-box">${data.message}</div>

        <p style="margin-top: 30px;">
          <strong>Acțiuni:</strong><br>
          • Răspunde direct la <a href="mailto:${data.email}">${data.email}</a><br>
          • Contactează utilizatorul la <a href="tel:${data.phone}">${data.phone}</a>
        </p>
      </div>
    </div>
    <div class="email-footer">
      <p>Acest email a fost trimis automat de la <a href="${appUrl}">Yuvoo</a></p>
      <p>Pentru întrebări, contactează-ne la <a href="mailto:${senderEmail}">${senderEmail}</a></p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Mesaj nou de la ${data.firstName}

Ai primit un mesaj nou prin formularul de contact de pe platforma Yuvoo.

Detalii contact:
- Nume: ${data.firstName}
- Email: ${data.email}
- Telefon: ${data.phone}
- Subiect: ${data.subject}

Mesaj:
${data.message}

Acțiuni:
- Răspunde direct la ${data.email}
- Contactează utilizatorul la ${data.phone}

---
Acest email a fost trimis automat de la Yuvoo (${appUrl})
Pentru întrebări, contactează-ne la ${senderEmail}
  `;

  return { html, text };
}

/**
 * Contact form confirmation template
 *
 * Email template sent to user confirming their contact form submission.
 */
export function contactFormConfirmationTemplate(data: { firstName: string; subject: string }): {
  html: string;
  text: string;
} {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "noreply@yuvoo.ro";

  const html = `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmare mesaj - Yuvoo</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px 20px;
      text-align: center;
    }
    .email-header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 30px 20px;
    }
    .email-content {
      color: #333;
      font-size: 16px;
      line-height: 1.8;
    }
    .success-box {
      background-color: #e8f5e9;
      border-left: 4px solid #4caf50;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .email-footer {
      background-color: #f9f9f9;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .email-footer a {
      color: #667eea;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Mesajul tău a fost trimis cu succes</h1>
    </div>
    <div class="email-body">
      <div class="email-content">
        <p>Bună ${data.firstName},</p>
        
        <div class="success-box">
          <p><strong>✓ Confirmare</strong></p>
          <p>Mesajul tău cu subiectul <strong>"${data.subject}"</strong> a fost trimis cu succes echipei Yuvoo.</p>
        </div>

        <p>Vom răspunde la mesajul tău în cel mai scurt timp posibil, de obicei în termen de 24-48 de ore.</p>

        <p>Dacă ai întrebări urgente, poți ne contacta direct la:</p>
        <ul>
          <li>Email: <a href="mailto:${senderEmail}">${senderEmail}</a></li>
          <li>Telefon: +40 700 000 000</li>
        </ul>

        <p style="margin-top: 30px;">
          Mulțumim că ai ales Yuvoo!<br>
          <strong>Echipa Yuvoo</strong>
        </p>
      </div>
    </div>
    <div class="email-footer">
      <p><a href="${appUrl}">Vizitează Yuvoo</a> | <a href="${appUrl}/ajutor">Ajutor</a></p>
      <p>Pentru întrebări, contactează-ne la <a href="mailto:${senderEmail}">${senderEmail}</a></p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Mesajul tău a fost trimis cu succes

Bună ${data.firstName},

Confirmare: Mesajul tău cu subiectul "${data.subject}" a fost trimis cu succes echipei Yuvoo.

Vom răspunde la mesajul tău în cel mai scurt timp posibil, de obicei în termen de 24-48 de ore.

Dacă ai întrebări urgente, poți ne contacta direct la:
- Email: ${senderEmail}
- Telefon: +40 700 000 000

Mulțumim că ai ales Yuvoo!
Echipa Yuvoo

---
Vizitează Yuvoo: ${appUrl}
Ajutor: ${appUrl}/ajutor
Pentru întrebări, contactează-ne la ${senderEmail}
  `;

  return { html, text };
}

/**
 * Format date in Romanian format
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ro-RO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Get user's first name or fallback
 */
function getUserFirstName(user: AuthUser | { name?: string | null }): string {
  if (user.name) {
    const firstName = user.name.split(" ")[0];
    return firstName;
  }
  return "Utilizator";
}

/**
 * Booking Confirmation Email Template
 */
export function bookingConfirmationTemplate(
  booking: Booking,
  user: AuthUser,
  entity: Club | Doctor,
  child?: Child
): { html: string; text: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const userName = getUserFirstName(user);
  const entityName = entity.name;
  const entityType = booking.entityType === "club" ? "club" : "doctor";
  const bookingType = booking.type === "club_trial" ? "probă gratuită" : "consultație";
  const bookingUrl =
    booking.entityType === "club"
      ? `${appUrl}${routes.clubs.detail((entity as Club).slug)}`
      : `${appUrl}${routes.doctors.detail((entity as Doctor).slug)}`;
  const bookingsUrl = `${appUrl}${routes.parent.bookings}`;

  const childInfo = child
    ? `<p><strong>Copil:</strong> ${child.firstName} ${child.lastName} (${child.age} ani)</p>`
    : "";

  const content = `
    <h2>Confirmare Rezervare</h2>
    <p>Salut ${userName},</p>
    <p>Rezervarea ta a fost confirmată cu succes!</p>
    
    <div class="info-box">
      <p><strong>Detalii Rezervare:</strong></p>
      ${childInfo}
      <p><strong>Tip:</strong> ${bookingType}</p>
      <p><strong>${entityType === "club" ? "Club" : "Doctor"}:</strong> ${entityName}</p>
      <p><strong>Data și ora:</strong> ${formatDate(booking.scheduledAt)}</p>
      ${booking.notes ? `<p><strong>Note:</strong> ${booking.notes}</p>` : ""}
    </div>

    <p><strong>Ce urmează?</strong></p>
    <ul>
      <li>Vei primi un reminder cu 24 de ore înainte de rezervare</li>
      <li>Poți anula sau modifica rezervarea din contul tău</li>
      <li>${entityType === "club" ? "Clubul" : "Doctorul"} te va contacta în scurt timp pentru confirmare</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${bookingUrl}" class="email-button">Vezi Detalii ${entityType === "club" ? "Club" : "Doctor"}</a>
      <a href="${bookingsUrl}" class="email-button" style="background-color: #6c757d; margin-left: 10px;">Vezi Toate Rezervările</a>
    </div>

    <p>Dacă ai întrebări sau dorești să anulezi rezervarea, poți face acest lucru din <a href="${bookingsUrl}">contul tău</a>.</p>
  `;

  return baseEmailTemplate(content, "Confirmare Rezervare - Yuvoo");
}

/**
 * Booking Cancellation Email Template
 */
export function bookingCancellationTemplate(
  booking: Booking,
  user: AuthUser,
  entity: Club | Doctor,
  child?: Child
): { html: string; text: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const userName = getUserFirstName(user);
  const entityName = entity.name;
  const entityType = booking.entityType === "club" ? "club" : "doctor";
  const bookingType = booking.type === "club_trial" ? "probă gratuită" : "consultație";
  const clubsUrl = `${appUrl}${routes.clubs.list}`;
  const doctorsUrl = `${appUrl}${routes.doctors.list}`;

  const childInfo = child
    ? `<p><strong>Copil:</strong> ${child.firstName} ${child.lastName} (${child.age} ani)</p>`
    : "";

  const content = `
    <h2>Anulare Rezervare</h2>
    <p>Salut ${userName},</p>
    <p>Rezervarea ta a fost anulată cu succes.</p>
    
    <div class="info-box">
      <p><strong>Detalii Rezervare Anulată:</strong></p>
      ${childInfo}
      <p><strong>Tip:</strong> ${bookingType}</p>
      <p><strong>${entityType === "club" ? "Club" : "Doctor"}:</strong> ${entityName}</p>
      <p><strong>Data și ora:</strong> ${formatDate(booking.scheduledAt)}</p>
    </div>

    <p>Dacă ai anulat din greșeală sau dorești să faci o nouă rezervare, poți explora opțiunile disponibile:</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${clubsUrl}" class="email-button">Vezi Cluburi</a>
      <a href="${doctorsUrl}" class="email-button" style="background-color: #6c757d; margin-left: 10px;">Vezi Doctori</a>
    </div>

    <p>Dacă ai întrebări sau ai nevoie de asistență, suntem aici să te ajutăm!</p>
  `;

  return baseEmailTemplate(content, "Anulare Rezervare - Yuvoo");
}

/**
 * Booking Reminder Email Template
 */
export function bookingReminderTemplate(
  booking: Booking,
  user: AuthUser,
  entity: Club | Doctor,
  child?: Child
): { html: string; text: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const userName = getUserFirstName(user);
  const entityName = entity.name;
  const entityType = booking.entityType === "club" ? "club" : "doctor";
  const bookingType = booking.type === "club_trial" ? "probă gratuită" : "consultație";
  const bookingUrl =
    booking.entityType === "club"
      ? `${appUrl}${routes.clubs.detail((entity as Club).slug)}`
      : `${appUrl}${routes.doctors.detail((entity as Doctor).slug)}`;
  const bookingsUrl = `${appUrl}${routes.parent.bookings}`;

  const childInfo = child
    ? `<p><strong>Copil:</strong> ${child.firstName} ${child.lastName} (${child.age} ani)</p>`
    : "";

  const locationInfo =
    booking.entityType === "club"
      ? (entity as Club).location.address
        ? `<p><strong>Locație:</strong> ${(entity as Club).location.address}, ${(entity as Club).location.city}</p>`
        : ""
      : (entity as Doctor).location.address
        ? `<p><strong>Locație:</strong> ${(entity as Doctor).location.address}, ${(entity as Doctor).location.city}</p>`
        : "";

  const content = `
    <h2>Reamintire Rezervare</h2>
    <p>Salut ${userName},</p>
    <p>Acest email este un reminder că ai o rezervare programată mâine!</p>
    
    <div class="info-box">
      <p><strong>Detalii Rezervare:</strong></p>
      ${childInfo}
      <p><strong>Tip:</strong> ${bookingType}</p>
      <p><strong>${entityType === "club" ? "Club" : "Doctor"}:</strong> ${entityName}</p>
      <p><strong>Data și ora:</strong> ${formatDate(booking.scheduledAt)}</p>
      ${locationInfo}
      ${booking.notes ? `<p><strong>Note:</strong> ${booking.notes}</p>` : ""}
    </div>

    <p><strong>Nu uita:</strong></p>
    <ul>
      <li>Să ajungi la timp la ${entityType === "club" ? "club" : "cabinet"}</li>
      <li>Să aduci echipamentul necesar (dacă este cazul)</li>
      <li>Dacă nu poți ajunge, anulează rezervarea din contul tău</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${bookingUrl}" class="email-button">Vezi Detalii ${entityType === "club" ? "Club" : "Doctor"}</a>
      <a href="${bookingsUrl}" class="email-button" style="background-color: #6c757d; margin-left: 10px;">Gestionează Rezervările</a>
    </div>

    <p>Ne vedem mâine! 🎉</p>
  `;

  return baseEmailTemplate(content, "Reamintire Rezervare - Yuvoo");
}

/**
 * Quiz Results Email Template
 */
export function quizResultsTemplate(
  quizResult: QuizResult,
  child: Child,
  user?: AuthUser
): { html: string; text: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const userName = user ? getUserFirstName(user) : "Utilizator";
  const childName = `${child.firstName} ${child.lastName}`;
  const resultsUrl = `${appUrl}${routes.quiz.results(quizResult.id)}`;
  const clubsUrl = `${appUrl}${routes.clubs.list}`;

  // Get top 3 recommendations
  const topRecommendations = quizResult.recommendations
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);

  // Build recommendations HTML
  const recommendationsHtml = topRecommendations
    .map((rec: SportRecommendation) => {
      const scoreColor =
        rec.matchScore >= 90 ? "#28a745" : rec.matchScore >= 80 ? "#007bff" : "#17a2b8";

      return `
        <div class="recommendation-card">
          <span class="match-score" style="background-color: ${scoreColor};">${rec.matchScore}% potrivire</span>
          <h3>${rec.sportName}</h3>
          <p><strong>De ce este potrivit:</strong></p>
          <p>${rec.reasoning}</p>
          ${rec.benefits.length > 0 ? `<p><strong>Beneficii:</strong> ${rec.benefits.join(", ")}</p>` : ""}
        </div>
      `;
    })
    .join("");

  // Specialist recommendation section
  const specialistSection = quizResult.specialistRecommendation?.needed
    ? `
      <div class="info-box" style="border-left-color: #dc3545;">
        <p><strong>⚠️ Recomandare Specialist:</strong></p>
        <p>${quizResult.specialistRecommendation.reason}</p>
        <p style="margin-top: 10px;">
          <a href="${appUrl}${routes.doctors.list}" style="color: #dc3545; font-weight: 600;">Vezi Doctori Recomandați →</a>
        </p>
      </div>
    `
    : "";

  const content = `
    <h2>Rezultatele Chestionarului AI</h2>
    <p>Salut ${userName},</p>
    <p>Rezultatele chestionarului pentru <strong>${childName}</strong> sunt gata!</p>
    
    <p>Am analizat răspunsurile și am generat recomandări personalizate de sporturi care se potrivesc cel mai bine profilului copilului tău.</p>

    <h3 style="color: #667eea; margin-top: 30px;">Top 3 Recomandări:</h3>
    ${recommendationsHtml}

    ${specialistSection}

    <p><strong>Ce urmează?</strong></p>
    <ul>
      <li>Vezi toate recomandările și explicațiile detaliate</li>
      <li>Explorează cluburile care oferă aceste sporturi</li>
      <li>Rezervă o probă gratuită la clubul preferat</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${resultsUrl}" class="email-button">Vezi Toate Recomandările</a>
      <a href="${clubsUrl}" class="email-button" style="background-color: #6c757d; margin-left: 10px;">Explorează Cluburi</a>
    </div>

    <p>Dacă ai întrebări sau dorești să completezi chestionarul din nou, poți face acest lucru oricând din contul tău.</p>
  `;

  return baseEmailTemplate(content, "Rezultatele Chestionarului AI - Yuvoo");
}

/**
 * Welcome Email Template (for new users)
 */
export function welcomeEmailTemplate(user: AuthUser): { html: string; text: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const userName = getUserFirstName(user);
  const quizUrl = `${appUrl}${routes.quiz.intro}`;
  const clubsUrl = `${appUrl}${routes.clubs.list}`;

  const content = `
    <h2>Bine ai venit la Yuvoo! 🎉</h2>
    <p>Salut ${userName},</p>
    <p>Îți mulțumim că te-ai alăturat comunității Yuvoo! Suntem încântați să te avem alături în călătoria de a găsi sportul perfect pentru copilul tău.</p>
    
    <p><strong>Ce poți face acum:</strong></p>
    <ul>
      <li>📋 Completează chestionarul AI pentru recomandări personalizate</li>
      <li>🏃 Explorează cluburile verificate din zona ta</li>
      <li>👨‍⚕️ Descoperă specialiști pediatri pentru consultații</li>
      <li>📅 Rezervă probe gratuite la cluburile preferate</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${quizUrl}" class="email-button">Începe Chestionarul AI</a>
      <a href="${clubsUrl}" class="email-button" style="background-color: #6c757d; margin-left: 10px;">Explorează Cluburi</a>
    </div>

    <p>Dacă ai întrebări sau ai nevoie de ajutor, echipa noastră este aici pentru tine!</p>
  `;

  return baseEmailTemplate(content, "Bine ai venit la Yuvoo!");
}

/**
 * Club Verification Status Update Email Template
 */
export function clubVerificationStatusTemplate(
  clubName: string,
  status: "approved" | "rejected" | "pending" | "in_review",
  user: AuthUser,
  rejectionReason?: string
): { html: string; text: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const userName = getUserFirstName(user);
  const clubDashboardUrl = `${appUrl}${routes.club.dashboard}`;
  const clubProfileUrl = `${appUrl}${routes.club.profile}`;

  let statusContent = "";

  if (status === "approved") {
    statusContent = `
      <div class="info-box" style="border-left-color: #28a745;">
        <p><strong>✅ Clubul tău a fost verificat și aprobat!</strong></p>
        <p>Felicitări! Clubul <strong>${clubName}</strong> a primit badge-ul de verificare și este acum vizibil în directorul de cluburi.</p>
        <p>Acest lucru va crește încrederea părinților și va atrage mai multe rezervări.</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${clubProfileUrl}" class="email-button">Vezi Profilul Clubului</a>
        <a href="${clubDashboardUrl}" class="email-button" style="background-color: #6c757d; margin-left: 10px;">Mergi la Dashboard</a>
      </div>
    `;
  } else if (status === "rejected") {
    statusContent = `
      <div class="info-box" style="border-left-color: #dc3545;">
        <p><strong>❌ Verificarea clubului a fost respinsă</strong></p>
        <p>Ne pare rău, dar verificarea pentru clubul <strong>${clubName}</strong> a fost respinsă.</p>
        ${rejectionReason ? `<p><strong>Motiv:</strong> ${rejectionReason}</p>` : ""}
        <p>Poți actualiza documentele și încerca din nou din dashboard-ul clubului.</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${clubProfileUrl}" class="email-button">Actualizează Documentele</a>
        <a href="${clubDashboardUrl}" class="email-button" style="background-color: #6c757d; margin-left: 10px;">Mergi la Dashboard</a>
      </div>
    `;
  } else if (status === "in_review") {
    // in_review
    statusContent = `
      <div class="info-box" style="border-left-color: #ffc107;">
        <p><strong>⏳ Verificarea clubului este în curs</strong></p>
        <p>Am primit documentele pentru clubul <strong>${clubName}</strong> și le revizuim.</p>
        <p>Procesul de verificare durează de obicei 1-3 zile lucrătoare. Vei primi o notificare când procesul este finalizat.</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${clubDashboardUrl}" class="email-button">Vezi Statusul</a>
      </div>
    `;
  } else {
    // pending (initial submission)
    statusContent = `
      <div class="info-box" style="border-left-color: #ffc107;">
        <p><strong>📋 Documentele au fost trimise pentru verificare</strong></p>
        <p>Am primit documentele pentru clubul <strong>${clubName}</strong> și le revizuim.</p>
        <p>Procesul de verificare durează de obicei 1-3 zile lucrătoare. Vei primi o notificare când procesul este finalizat.</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${clubDashboardUrl}" class="email-button">Vezi Statusul</a>
      </div>
    `;
  }

  const content = `
    <h2>Actualizare Status Verificare Club</h2>
    <p>Salut ${userName},</p>
    ${statusContent}
    <p>Dacă ai întrebări despre procesul de verificare, nu ezita să ne contactezi.</p>
  `;

  const title =
    status === "approved"
      ? "Club Verificat - Yuvoo"
      : status === "rejected"
        ? "Verificare Respinsă - Yuvoo"
        : status === "in_review"
          ? "Verificare în Curs - Yuvoo"
          : "Documente Trimise - Yuvoo";

  return baseEmailTemplate(content, title);
}

/**
 * Doctor Verification Status Update Email Template
 */
export function doctorVerificationStatusTemplate(
  doctorName: string,
  status: "approved" | "rejected" | "pending" | "in_review",
  user: AuthUser,
  rejectionReason?: string
): { html: string; text: string } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const userName = getUserFirstName(user);
  const doctorDashboardUrl = `${appUrl}${routes.doctor.dashboard}`;
  const doctorProfileUrl = `${appUrl}${routes.doctor.profile}`;

  let statusContent = "";

  if (status === "approved") {
    statusContent = `
      <div class="info-box" style="border-left-color: #28a745;">
        <p><strong>✅ Profilul tău a fost verificat și aprobat!</strong></p>
        <p>Felicitări! Profilul pentru <strong>${doctorName}</strong> a primit badge-ul de verificare și este acum vizibil în directorul de specialiști.</p>
        <p>Acest lucru va crește încrederea părinților și va atrage mai multe solicitări de consultații.</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${doctorProfileUrl}" class="email-button">Vezi Profilul</a>
        <a href="${doctorDashboardUrl}" class="email-button" style="background-color: #6c757d; margin-left: 10px;">Mergi la Dashboard</a>
      </div>
    `;
  } else if (status === "rejected") {
    statusContent = `
      <div class="info-box" style="border-left-color: #dc3545;">
        <p><strong>❌ Verificarea profilului a fost respinsă</strong></p>
        <p>Ne pare rău, dar verificarea pentru profilul <strong>${doctorName}</strong> a fost respinsă.</p>
        ${rejectionReason ? `<p><strong>Motiv:</strong> ${rejectionReason}</p>` : ""}
        <p>Poți actualiza documentele și încerca din nou din dashboard-ul tău.</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${doctorProfileUrl}" class="email-button">Actualizează Documentele</a>
        <a href="${doctorDashboardUrl}" class="email-button" style="background-color: #6c757d; margin-left: 10px;">Mergi la Dashboard</a>
      </div>
    `;
  } else if (status === "in_review") {
    // in_review
    statusContent = `
      <div class="info-box" style="border-left-color: #ffc107;">
        <p><strong>⏳ Verificarea profilului este în curs</strong></p>
        <p>Am primit documentele pentru profilul <strong>${doctorName}</strong> și le revizuim.</p>
        <p>Procesul de verificare durează de obicei 2-3 zile lucrătoare. Vei primi o notificare când procesul este finalizat.</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${doctorDashboardUrl}" class="email-button">Vezi Statusul</a>
      </div>
    `;
  } else {
    // pending (initial submission)
    statusContent = `
      <div class="info-box" style="border-left-color: #ffc107;">
        <p><strong>📋 Documentele au fost trimise pentru verificare</strong></p>
        <p>Am primit documentele pentru profilul <strong>${doctorName}</strong> și le revizuim.</p>
        <p>Procesul de verificare durează de obicei 2-3 zile lucrătoare. Vei primi o notificare când procesul este finalizat.</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${doctorDashboardUrl}" class="email-button">Vezi Statusul</a>
      </div>
    `;
  }

  const content = `
    <h2>Actualizare Status Verificare Profil</h2>
    <p>Salut ${userName},</p>
    ${statusContent}
    <p>Dacă ai întrebări despre procesul de verificare, nu ezita să ne contactezi.</p>
  `;

  const title =
    status === "approved"
      ? "Profil Verificat - Yuvoo"
      : status === "rejected"
        ? "Verificare Respinsă - Yuvoo"
        : status === "in_review"
          ? "Verificare în Curs - Yuvoo"
          : "Documente Trimise - Yuvoo";

  return baseEmailTemplate(content, title);
}
