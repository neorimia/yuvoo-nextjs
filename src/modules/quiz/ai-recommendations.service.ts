/**
 * AI Recommendations Service
 *
 * Generates personalized sport recommendations using OpenAI GPT-4 Turbo.
 *
 * CRITICAL: All AI-generated content MUST be in Romanian language.
 */

import { openai, AI_MODEL, AI_TEMPERATURE, AI_MAX_TOKENS } from "@/lib/integrations/openai/client";
import type { QuizAnswers, SportRecommendation, SpecialistRecommendation } from "./quiz.types";

/**
 * Romanian System Prompt for AI Coach
 *
 * Defines the AI's role, expertise, and output requirements.
 * CRITICAL: Instructs AI to generate ALL content in Romanian.
 */
const SYSTEM_PROMPT = `
Ești un asistent AI specializat în recomandări de sporturi pentru copii din România, cu vârste între 4 și 14 ani.

IMPORTANT: Generează TOATE răspunsurile EXCLUSIV în limba română. Nu folosi nicio altă limbă.

EXPERTIZA TA:
- Psihologie sportivă pediatrică și dezvoltarea copilului
- Dezvoltarea fizică și mentală a copiilor de diferite vârste
- Sporturi populare și disponibile în România (fotbal, baschet, înot, tenis, gimnastică, dans, arte marțiale, atletism, etc.)
- Adaptarea recomandărilor la contextul cultural și geographic românesc
- Identificarea de semnale de risc care necesită consultarea unui specialist

SARCINA TA:
1. Analizează cu atenție răspunsurile părintelui despre copilul lor
2. Recomandă între 3 și 5 sporturi potrivite pentru copil
3. Oferă un scor de potrivire realist (0-100) pentru fiecare sport recomandat
4. Explică CLAR, EMPATIC și DETALIAT de ce recomanzi fiecare sport
5. Menționează beneficiile SPECIFICE pentru acest copil particular
6. Notează eventuale considerente practice (echipament, timp, cost, disponibilitate în România)

CRITERII DE RECOMANDARE:
- **Vârsta**: Adaptează recomandările la dezvoltarea fizică și cognitivă specifică vârstei
- **Nivel de energie**: Potrivește intensitatea sportului cu energia copilului
- **Personalitate**: Consideră dacă copilul este extrovert/introvert, competitiv/cooperant
- **Interese actuale**: Caută legături între hobby-urile copilului și sporturile recomandate
- **Constituție fizică**: Recomandă sporturi potrivite pentru tipul fizic al copilului
- **Preferințe**: Respectă preferințele pentru interior/exterior, echipă/individual
- **Experiență anterioară**: Ia în considerare sporturile încercate anterior

SCORUL DE POTRIVIRE (0-100):
- **90-100**: Potrivire excelentă - sportul se aliniază perfect cu toate caracteristicile copilului
- **80-89**: Potrivire foarte bună - sportul se aliniază cu majoritatea caracteristicilor
- **70-79**: Potrivire bună - sportul este potrivit dar cu unele rezerve minore
- **60-69**: Potrivire acceptabilă - sportul poate fi o opțiune, dar nu ideal
- Sub 60: Nu recomanda (nu include în listă)

STIL DE COMUNICARE:
- Ton: 70% Cald și Suportiv, 30% Expert și Încrezător
- Limbaj: Accesibil, empatic, pozitiv, fără jargon tehnic excesiv
- Lungime raționament: 100-200 cuvinte per sport
- Beneficii: 2-4 beneficii specifice și concrete
- Considerente: 1-3 aspecte practice de luat în considerare

IDENTIFICAREA SEMNALELOR DE RISC ȘI RECOMANDAREA SPECIALIȘTILOR:
Dacă observi urmatoarele semnale în răspunsuri, recomandă consultarea unui specialist:

**Ortopedie pediatrică** (orthopedist):
- Mențiuni despre limitări fizice, probleme de coordonare sau dezvoltare motorie
- Dureri articulare sau probleme de postură
- Accidentări anterioare care necesită monitorizare
- Probleme de echilibru sau mobilitate

**Nutriție pediatrică** (nutritionist):
- Probleme de greutate (subponderal sau supraponderal)
- Alimentație neechilibrată sau restricții alimentare
- Necesități nutriționale speciale pentru sport
- Optimizarea performanței sportive prin nutriție

**Psihologie pediatrică** (psychologist):
- Anxietate socială severă sau izolare
- Probleme de motivație sau încredere în sine
- Dificultăți de concentrare sau comportament
- Frică excesivă sau rezistență față de activități fizice

**Medic pediatru general** (general):
- Copil foarte inactiv sau cu nivel de energie extrem de scăzut
- Condiții de sănătate generale care necesită evaluare
- Verificare generală înainte de începerea unui sport nou

FORMAT RĂSPUNS:
Returnează DOAR un obiect JSON valid (fără text suplimentar) în următorul format:

{
  "recommendations": [
    {
      "sportId": "fotbal",
      "sportName": "Fotbal",
      "matchScore": 95,
      "reasoning": "Explicație detaliată în română despre de ce acest sport este potrivit pentru copil...",
      "benefits": [
        "Beneficiu specific 1 pentru acest copil",
        "Beneficiu specific 2 pentru acest copil",
        "Beneficiu specific 3 pentru acest copil"
      ],
      "considerations": [
        "Considerent practic 1 (echipament, cost, disponibilitate)",
        "Considerent practic 2"
      ]
    }
  ],
  "specialistRecommendation": {
    "needed": false,
    "specialty": "orthopedist" | "nutritionist" | "psychologist" | "general",
    "reason": "Explicație detaliată în română despre de ce este recomandat acest specialist (sau null dacă nu este necesar)",
    "priority": "high" | "medium" | "low"
  }
}

SPORTURI DISPONIBILE ÎN ROMÂNIA (folosește ID-urile exacte):
- fotbal, baschet, volei, handbal (sporturi de echipă)
- tenis, tenis-de-masa, badminton (sporturi cu rachetă)
- inot, polo (sporturi acvatice)
- atletism, alergare (sporturi de alergare)
- gimnastica, dans, balet (activități expresive)
- arte-martiale, judo, karate, taekwondo (arte marțiale)
- ciclism, patinaj, skateboarding (sporturi cu roți)
- escalada, alpinism (sporturi de aventură)
- golf, sah, tir-cu-arcul (sporturi de concentrare)

Asigură-te că toate recomandările sunt relevante pentru România și că sporturile sunt disponibile în cluburi din țară.
`.trim();

/**
 * Sport ID to Romanian name mapping
 *
 * Ensures consistent sport naming across the platform.
 */
const SPORT_NAMES: Record<string, string> = {
  fotbal: "Fotbal",
  baschet: "Baschet",
  volei: "Volei",
  handbal: "Handbal",
  tenis: "Tenis",
  "tenis-de-masa": "Tenis de masă",
  badminton: "Badminton",
  inot: "Înot",
  polo: "Polo",
  atletism: "Atletism",
  alergare: "Alergare",
  gimnastica: "Gimnastică",
  dans: "Dans",
  balet: "Balet",
  "arte-martiale": "Arte marțiale",
  judo: "Judo",
  karate: "Karate",
  taekwondo: "Taekwondo",
  ciclism: "Ciclism",
  patinaj: "Patinaj",
  skateboarding: "Skateboarding",
  escalada: "Escaladă",
  alpinism: "Alpinism",
  golf: "Golf",
  sah: "Șah",
  "tir-cu-arcul": "Tir cu arcul",
};

/**
 * Build user prompt from quiz answers
 *
 * Transforms quiz answers into a structured prompt for the AI.
 */
function buildUserPrompt(answers: QuizAnswers): string {
  const energyLevelMap = {
    low: "Scăzut",
    medium: "Mediu",
    high: "Ridicat",
    very_high: "Foarte ridicat",
  };

  const physicalBuildMap = {
    slim: "Subțire",
    average: "Mediu",
    athletic: "Atletic",
  };

  return `
ANALIZA COPILULUI:

Vârstă: ${answers.age} ani
${answers.gender ? `Gen: ${answers.gender === "male" ? "Băiat" : answers.gender === "female" ? "Fată" : "Altul"}` : ""}

Nivel de energie: ${energyLevelMap[answers.energyLevel]}

Trăsături de personalitate: ${answers.personality.join(", ")}

Interese și hobby-uri: ${answers.interests.join(", ")}

Sporturi încercate anterior: ${answers.previousSports.length > 0 ? answers.previousSports.join(", ") : "Niciunul"}

Constituție fizică: ${physicalBuildMap[answers.physicalBuild]}
${answers.physicalConsiderations ? `Considerații fizice: ${answers.physicalConsiderations}` : ""}

Preferințe:
- Activități interioare: ${answers.preferences.indoor ? "Da" : "Nu"}
- Activități exterioare: ${answers.preferences.outdoor ? "Da" : "Nu"}
- Sporturi de echipă: ${answers.preferences.team ? "Da" : "Nu"}
- Sporturi individuale: ${answers.preferences.individual ? "Da" : "Nu"}
${answers.preferences.timeAvailability ? `- Disponibilitate timp: ${answers.preferences.timeAvailability}` : ""}
${answers.preferences.budgetConsiderations ? `- Considerații buget: ${answers.preferences.budgetConsiderations}` : ""}

Pe baza acestor informații, recomandă 3-5 sporturi potrivite pentru acest copil. Asigură-te că recomandările sunt personalizate și relevante pentru contextul românesc.
  `.trim();
}

/**
 * AI Response Interface
 *
 * Expected structure from OpenAI API response.
 */
interface AIResponse {
  recommendations: SportRecommendation[];
  specialistRecommendation?: {
    needed: boolean;
    reason?: string;
    specialty?: "orthopedist" | "nutritionist" | "psychologist" | "general";
    priority?: "high" | "medium" | "low";
  };
}

/**
 * Generate sport and specialist recommendations using OpenAI
 *
 * Main function that calls OpenAI API and processes the response.
 *
 * @param answers - Complete quiz answers from parent
 * @returns Object containing sport recommendations and optional specialist recommendation
 * @throws Error if AI generation fails or returns invalid data
 */
export interface RecommendationResult {
  sportRecommendations: SportRecommendation[];
  specialistRecommendation?: SpecialistRecommendation;
}

export async function generateRecommendations(answers: QuizAnswers): Promise<RecommendationResult> {
  try {
    // Build prompt from quiz answers
    const userPrompt = buildUserPrompt(answers);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      temperature: AI_TEMPERATURE,
      max_tokens: AI_MAX_TOKENS,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" }, // Ensure JSON response
    });

    // Extract and parse AI response
    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("Empty response from OpenAI API");
    }

    const aiResponse: AIResponse = JSON.parse(responseContent);

    // Validate response structure
    if (!aiResponse.recommendations || !Array.isArray(aiResponse.recommendations)) {
      throw new Error("Invalid AI response structure: missing recommendations array");
    }

    // Validate and normalize sport recommendations
    const recommendations = aiResponse.recommendations
      .filter((rec) => {
        // Filter out recommendations with low match scores
        return rec.matchScore >= 60;
      })
      .map((rec) => {
        // Ensure sport name is in Romanian
        const sportName = SPORT_NAMES[rec.sportId] || rec.sportName;

        return {
          sportId: rec.sportId,
          sportName,
          matchScore: Math.min(100, Math.max(0, rec.matchScore)), // Clamp 0-100
          reasoning: rec.reasoning,
          benefits: rec.benefits || [],
          considerations: rec.considerations || [],
        };
      })
      .slice(0, 5); // Maximum 5 recommendations

    // Ensure at least 1 recommendation
    if (recommendations.length === 0) {
      throw new Error("AI generated no valid recommendations");
    }

    // Process specialist recommendation if present
    let specialistRecommendation: SpecialistRecommendation | undefined;
    if (aiResponse.specialistRecommendation?.needed) {
      const specialty = aiResponse.specialistRecommendation.specialty || "general";
      const priority = aiResponse.specialistRecommendation.priority || "medium";

      // Validate specialty
      const validSpecialties = ["orthopedist", "nutritionist", "psychologist", "general"];
      const validatedSpecialty = validSpecialties.includes(specialty)
        ? (specialty as SpecialistRecommendation["specialty"])
        : "general";

      specialistRecommendation = {
        specialty: validatedSpecialty,
        needed: true,
        reason:
          aiResponse.specialistRecommendation.reason ||
          "Consultare recomandată pentru evaluare suplimentară.",
        priority: priority as "high" | "medium" | "low",
      };
    }

    return {
      sportRecommendations: recommendations,
      specialistRecommendation,
    };
  } catch (error) {
    // Enhanced error handling
    if (error instanceof Error) {
      console.error("AI recommendation generation failed:", error.message);

      // Check for specific OpenAI errors
      if (error.message.includes("API key")) {
        throw new Error("Eroare de configurare AI. Contactează echipa de suport.");
      }

      if (error.message.includes("rate limit")) {
        throw new Error(
          "Serviciul AI este temporar indisponibil. Te rugăm să încerci din nou în câteva momente."
        );
      }

      if (error.message.includes("timeout")) {
        throw new Error("Generarea recomandărilor durează prea mult. Te rugăm să încerci din nou.");
      }
    }

    // Generic error message in Romanian
    throw new Error(
      "Nu am putut genera recomandări în acest moment. Te rugăm să încerci din nou sau contactează echipa de suport."
    );
  }
}

/**
 * Generate fallback recommendations
 *
 * Provides generic recommendations based on age when AI fails.
 * Used as a safety fallback to prevent complete service failure.
 */
export function generateFallbackRecommendations(answers: QuizAnswers): SportRecommendation[] {
  // Age-based fallback recommendations
  const age = answers.age;

  const fallbacks: SportRecommendation[] = [];

  // Young children (4-6 years)
  if (age >= 4 && age <= 6) {
    fallbacks.push({
      sportId: "inot",
      sportName: "Înot",
      matchScore: 75,
      reasoning:
        "Înotul este un sport excelent pentru copiii mici, dezvoltând coordonarea și rezistența. Este sigur, distractiv și oferă o bază solidă pentru alte sporturi.",
      benefits: [
        "Dezvoltă coordonarea și echilibrul",
        "Sigur pentru toate vârstele",
        "Activitate plăcută pentru copii",
      ],
      considerations: ["Necesită echipament minim", "Disponibil în multe locații din România"],
    });
  }

  // Middle childhood (7-10 years)
  if (age >= 7 && age <= 10) {
    if (answers.preferences.team) {
      fallbacks.push({
        sportId: "fotbal",
        sportName: "Fotbal",
        matchScore: 80,
        reasoning:
          "Fotbalul este cel mai popular sport în România și oferă oportunități excelente de socializare și dezvoltare fizică pentru copiii acestei vârste.",
        benefits: [
          "Sport popular cu multe cluburi disponibile",
          "Dezvoltă abilitățile sociale și de echipă",
          "Îmbunătățește coordonarea și rezistența",
        ],
        considerations: ["Echipament accesibil", "Disponibil în majoritatea orașelor"],
      });
    }
  }

  // Older children (11-14 years)
  if (age >= 11 && age <= 14) {
    fallbacks.push({
      sportId: "baschet",
      sportName: "Baschet",
      matchScore: 75,
      reasoning:
        "Baschetul este perfect pentru pre-adolescenți, combinând lucrul în echipă cu dezvoltarea abilităților individuale și gândirea strategică.",
      benefits: [
        "Dezvoltă înălțimea și coordonarea",
        "Îmbunătățește gândirea strategică",
        "Oportunități de socializare excelente",
      ],
      considerations: ["Disponibil în școli și cluburi", "Echipament minim necesar"],
    });
  }

  // Always include a versatile option
  fallbacks.push({
    sportId: "atletism",
    sportName: "Atletism",
    matchScore: 70,
    reasoning:
      "Atletismul dezvoltă abilitățile fundamentale de mișcare și oferă o bază excelentă pentru orice alt sport. Este potrivit pentru toate vârstele și nivelurile de fitness.",
    benefits: [
      "Dezvoltă abilitățile fundamentale de mișcare",
      "Flexibil - poate fi practicat individual sau în echipă",
      "Îmbunătățește sănătatea cardiovasculară",
    ],
    considerations: ["Echipament minimal", "Disponibil în majoritatea orașelor"],
  });

  return fallbacks.slice(0, 3); // Return top 3 fallback recommendations
}
