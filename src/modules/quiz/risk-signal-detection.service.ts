/**
 * Risk Signal Detection Service
 *
 * Programmatically detects risk signals from quiz answers that may indicate
 * the need for specialist consultation. Provides structured risk analysis
 * independent of AI recommendations for validation and tracking.
 *
 * Enhanced in Task 1.4.2 with:
 * - Context-aware detection to reduce false positives
 * - Severity-based specialist recommendations
 * - Pulmonologist specialist for respiratory conditions
 * - Negation detection in Romanian text
 */

import type { QuizAnswers } from "./quiz.types";
import type { SpecialistRecommendation } from "./quiz.types";

// ============================================================================
// Context-Aware Detection Utilities
// ============================================================================

/**
 * Romanian negation patterns - words/phrases that negate the meaning
 */
const NEGATION_PATTERNS = [
  "nu ",
  "fără ",
  "fara ",
  "nicio ",
  "nici o ",
  "nici un ",
  "niciun ",
  "niciodata",
  "niciodată",
  "nu are",
  "nu am",
  "nu a avut",
  "nu exista",
  "nu există",
  "nu mai",
  "nu prezinta",
  "nu prezintă",
  "nu s-a",
  "nu se",
  "nu sunt",
  "fără probleme",
  "fara probleme",
  "totul bine",
  "totul ok",
  "sanatos",
  "sănătos",
  "sanatoasa",
  "sănătoasă",
  "normal",
  "normală",
];

/**
 * Positive/confirming patterns - words that strengthen the meaning
 */
const CONFIRMATION_PATTERNS = [
  "are ",
  "am ",
  "a avut",
  "prezinta",
  "prezintă",
  "suferă",
  "sufera",
  "diagnosticat",
  "diagnostic",
  "problemă",
  "problema",
  "probleme",
  "dificultate",
  "dificultăți",
  "dificultati",
  "persistentă",
  "persistenta",
  "persistent",
  "cronică",
  "cronica",
  "cronic",
  "severă",
  "severa",
  "sever",
  "frecvent",
  "frecventă",
  "frecventa",
  "des ",
  "mereu",
  "constant",
  "întotdeauna",
  "intotdeauna",
];

/**
 * Check if a keyword match is negated in context
 *
 * @param text - The full text to analyze
 * @param keywordPosition - Position where keyword was found
 * @param windowSize - How many characters before the keyword to check (default 30)
 * @returns true if the keyword is negated in context
 */
function isNegatedInContext(
  text: string,
  keywordPosition: number,
  windowSize: number = 30
): boolean {
  // Get the text before the keyword (context window)
  const startPos = Math.max(0, keywordPosition - windowSize);
  const contextBefore = text.substring(startPos, keywordPosition).toLowerCase();

  // Check if any negation pattern appears in the context
  return NEGATION_PATTERNS.some((pattern) => contextBefore.includes(pattern));
}

/**
 * Check if a keyword match is confirmed/strengthened in context
 *
 * @param text - The full text to analyze
 * @param keywordPosition - Position where keyword was found
 * @param windowSize - How many characters before the keyword to check (default 30)
 * @returns true if the keyword is confirmed in context
 */
function isConfirmedInContext(
  text: string,
  keywordPosition: number,
  windowSize: number = 30
): boolean {
  // Get the text before the keyword (context window)
  const startPos = Math.max(0, keywordPosition - windowSize);
  const contextBefore = text.substring(startPos, keywordPosition).toLowerCase();

  // Check if any confirmation pattern appears in the context
  return CONFIRMATION_PATTERNS.some((pattern) => contextBefore.includes(pattern));
}

/**
 * Context-aware keyword detection result
 */
interface KeywordMatch {
  keyword: string;
  position: number;
  isNegated: boolean;
  isConfirmed: boolean;
}

/**
 * Find keywords in text with context awareness
 *
 * @param text - Text to search in
 * @param keywords - Keywords to search for
 * @returns Array of keyword matches with context information
 */
function findKeywordsWithContext(text: string, keywords: string[]): KeywordMatch[] {
  const lowerText = text.toLowerCase();
  const matches: KeywordMatch[] = [];

  for (const keyword of keywords) {
    let position = lowerText.indexOf(keyword);
    while (position !== -1) {
      matches.push({
        keyword,
        position,
        isNegated: isNegatedInContext(lowerText, position),
        isConfirmed: isConfirmedInContext(lowerText, position),
      });
      position = lowerText.indexOf(keyword, position + 1);
    }
  }

  return matches;
}

/**
 * Check if any keyword matches are pathological (not negated, or confirmed)
 *
 * @param matches - Array of keyword matches
 * @returns true if at least one match indicates a real concern
 */
function hasPathologicalMatch(matches: KeywordMatch[]): boolean {
  // A match is pathological if:
  // 1. It's confirmed (has positive context), OR
  // 2. It's not negated (neutral context, could still be a concern)
  return matches.some((m) => m.isConfirmed || !m.isNegated);
}

/**
 * Get the most relevant pathological match for reporting
 *
 * @param matches - Array of keyword matches
 * @returns The most relevant match (confirmed > not negated)
 */
function getMostRelevantMatch(matches: KeywordMatch[]): KeywordMatch | undefined {
  // Prioritize confirmed matches
  const confirmed = matches.filter((m) => m.isConfirmed);
  if (confirmed.length > 0) return confirmed[0];

  // Then non-negated matches
  const notNegated = matches.filter((m) => !m.isNegated);
  if (notNegated.length > 0) return notNegated[0];

  return undefined;
}

/**
 * Risk signal severity levels
 */
export type RiskSeverity = "high" | "medium" | "low";

/**
 * Detected risk signal with context
 */
export interface RiskSignal {
  specialty: SpecialistRecommendation["specialty"];
  severity: RiskSeverity;
  reason: string; // Romanian explanation
  indicators: string[]; // Specific indicators that triggered this signal
}

/**
 * Risk detection result
 */
export interface RiskDetectionResult {
  signals: RiskSignal[];
  hasHighRisk: boolean;
  hasMediumRisk: boolean;
  hasLowRisk: boolean;
  recommendedSpecialist?: SpecialistRecommendation["specialty"];
}

/**
 * Detect risk signals from quiz answers
 *
 * Analyzes quiz answers programmatically to identify potential health,
 * developmental, or behavioral concerns that may require specialist consultation.
 *
 * Enhanced in Task 1.4.2:
 * - Added pulmonologist detection for respiratory conditions
 * - Improved context-aware detection
 * - Reduced false positives through negation detection
 *
 * @param answers - Complete quiz answers
 * @returns Risk detection result with identified signals
 */
export function detectRiskSignals(answers: QuizAnswers): RiskDetectionResult {
  const signals: RiskSignal[] = [];

  // 1. Critical Health Risk Signals (HIGHEST PRIORITY - Life-threatening)
  const cardiacSignals = detectCardiacRisks(answers);
  signals.push(...cardiacSignals);

  const concussionSignals = detectConcussionRisks(answers);
  signals.push(...concussionSignals);

  // 2. Pulmonologist Risk Signals (Respiratory - can be life-threatening)
  const pulmonologistSignals = detectPulmonologistRisks(answers);
  signals.push(...pulmonologistSignals);

  // 3. Orthopedist Risk Signals
  const orthopedistSignals = detectOrthopedistRisks(answers);
  signals.push(...orthopedistSignals);

  // 4. Nutritionist Risk Signals
  const nutritionistSignals = detectNutritionistRisks(answers);
  signals.push(...nutritionistSignals);

  // 5. Psychologist Risk Signals
  const psychologistSignals = detectPsychologistRisks(answers);
  signals.push(...psychologistSignals);

  // 6. General Pediatrician Risk Signals
  const generalSignals = detectGeneralPediatricianRisks(answers);
  signals.push(...generalSignals);

  // Determine overall risk levels
  const hasHighRisk = signals.some((s) => s.severity === "high");
  const hasMediumRisk = signals.some((s) => s.severity === "medium");
  const hasLowRisk = signals.some((s) => s.severity === "low");

  // Recommend highest priority specialist
  const recommendedSpecialist = determineRecommendedSpecialist(signals);

  return {
    signals,
    hasHighRisk,
    hasMediumRisk,
    hasLowRisk,
    recommendedSpecialist,
  };
}

/**
 * Detect cardiac-related risk signals (CRITICAL)
 */
function detectCardiacRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];
  const indicators: string[] = [];

  // Check critical health screening for cardiac symptoms
  if (answers.criticalHealth?.cardiacSymptoms === true) {
    indicators.push("Simptome cardiace la efort detectate");
    signals.push({
      specialty: "cardiologist",
      severity: "high",
      reason:
        "Simptome cardiace detectate necesită evaluare cardiologică urgentă înainte de orice sport. Acesta este un risc potențial de viață.",
      indicators: [...indicators],
    });
  }

  // Check critical health screening for cardiac family history
  if (answers.criticalHealth?.cardiacFamilyHistory === true) {
    indicators.push("Istoric familial moarte cardiacă sub 50 ani");
    signals.push({
      specialty: "cardiologist",
      severity: "high",
      reason:
        "Istoric familial de moarte cardiacă necesită evaluare cardiologică înainte de sporturi competitive sau de intensitate ridicată.",
      indicators: [...indicators],
    });
  }

  // Check physical considerations text for cardiac keywords
  if (answers.physicalConsiderations) {
    const cardiacKeywords = [
      "durere piept",
      "palpitații",
      "palpitatii",
      "leșin",
      "lesin",
      "sincopă",
      "sincopa",
      "cardiac",
      "inima",
      "bătăi",
      "batai",
      "aritmie",
    ];
    const considerations = answers.physicalConsiderations.toLowerCase();

    if (cardiacKeywords.some((kw) => considerations.includes(kw))) {
      indicators.push("Mențiuni cardiace în considerații fizice");
      signals.push({
        specialty: "cardiologist",
        severity: "high",
        reason:
          "Mențiuni despre simptome cardiace în considerațiile fizice necesită evaluare cardiologică înainte de orice sport.",
        indicators: [...indicators],
      });
    }
  }

  return signals;
}

/**
 * Detect concussion-related risk signals (CRITICAL)
 */
function detectConcussionRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];
  const indicators: string[] = [];

  // Check critical health screening for recent concussion
  if (answers.criticalHealth?.recentConcussion === true) {
    indicators.push("Concuzie recentă (<3 luni)");
    signals.push({
      specialty: "neurologist",
      severity: "high",
      reason:
        "Concuzie recentă necesită evaluare neurologică și vindecare completă înainte de sporturi de contact sau cu risc de impact la cap.",
      indicators: [...indicators],
    });
  }

  // Check critical health screening for multiple concussions
  if (answers.criticalHealth?.multipleConcussions === true) {
    indicators.push("Concuzii multiple (2+ în 2 ani)");
    signals.push({
      specialty: "neurologist",
      severity: "high",
      reason:
        "Concuzii multiple cresc semnificativ riscul de sindrom post-concuzional și necesită evaluare neurologică specializată înainte de orice sport.",
      indicators: [...indicators],
    });
  }

  // Check injury details for concussion
  if (answers.injuryDetails?.type === "concussion") {
    const when = answers.injuryDetails.when;
    if (when === "<1month" || when === "1-3months") {
      indicators.push("Concuzie în istoricul de accidentări (recentă)");
      signals.push({
        specialty: "neurologist",
        severity: "high",
        reason:
          "Concuzie recentă în istoricul de accidentări necesită evaluare neurologică înainte de sporturi de contact.",
        indicators: [...indicators],
      });
    } else if (when === "3-6months") {
      indicators.push("Concuzie în istoricul de accidentări (3-6 luni)");
      signals.push({
        specialty: "neurologist",
        severity: "medium",
        reason:
          "Concuzie în ultimele 3-6 luni necesită evaluare neurologică pentru a confirma vindecarea completă înainte de sporturi de contact.",
        indicators: [...indicators],
      });
    }
  }

  // Check physical considerations text for concussion keywords
  if (answers.physicalConsiderations) {
    const concussionKeywords = [
      "concuzie",
      "concuzii",
      "traumatism cranian",
      "traumatism cap",
      "amnezie",
      "confuzie",
      "dureri cap",
      "cefalee",
      "vertij",
      "vertijuri",
      "sensibilitate lumină",
      "sensibilitate sunet",
    ];
    const considerations = answers.physicalConsiderations.toLowerCase();

    if (concussionKeywords.some((kw) => considerations.includes(kw))) {
      indicators.push("Mențiuni despre concuzie în considerații fizice");
      signals.push({
        specialty: "neurologist",
        severity: "high",
        reason:
          "Mențiuni despre concuzie sau simptome post-concuzionale necesită evaluare neurologică înainte de sporturi de contact.",
        indicators: [...indicators],
      });
    }
  }

  return signals;
}

/**
 * Detect orthopedist-related risk signals
 *
 * Enhanced with context-aware detection (Task 1.4.2):
 * - Distinguishes normal vs pathological contexts
 * - Reduces false positives from negated statements
 * - Uses severity levels for graduated risk assessment
 */
function detectOrthopedistRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];

  // 1. Check coordination level (structured data - no context needed)
  if (answers.coordinationLevel === "challenges") {
    signals.push({
      specialty: "orthopedist",
      severity: "high",
      reason:
        "Nivelul scăzut de coordonare poate indica probleme de dezvoltare motorie care necesită evaluare ortopedică.",
      indicators: ["Nivel de coordonare: Provocări"],
    });
  } else if (answers.coordinationLevel === "developing") {
    // Only flag "developing" coordination for younger children (4-6) as it's normal
    // For older children (7+), it may indicate delayed motor development
    if (answers.age >= 7) {
      signals.push({
        specialty: "orthopedist",
        severity: "medium",
        reason:
          "Coordonarea încă în dezvoltare la această vârstă poate beneficia de evaluare pentru a identifica sporturi potrivite.",
        indicators: ["Nivel de coordonare: În dezvoltare (vârstă 7+)"],
      });
    }
    // For ages 4-6, "developing" is normal - no signal needed
  }

  // 2. Check joint pain severity (structured data - no context needed)
  if (answers.jointPainSeverity === "severe") {
    signals.push({
      specialty: "orthopedist",
      severity: "high",
      reason:
        "Dureri articulare severe necesită evaluare ortopedică urgentă înainte de orice sport.",
      indicators: ["Dureri articulare severe"],
    });
  } else if (answers.jointPainSeverity === "moderate") {
    signals.push({
      specialty: "orthopedist",
      severity: "medium",
      reason:
        "Dureri articulare moderate necesită evaluare ortopedică pentru identificarea sporturilor potrivite.",
      indicators: ["Dureri articulare moderate"],
    });
  } else if (answers.jointPainSeverity === "mild") {
    // Mild joint pain - low priority, monitor
    signals.push({
      specialty: "orthopedist",
      severity: "low",
      reason:
        "Dureri articulare ușoare. Monitorizare recomandată, iar sporturi cu impact redus sunt preferate.",
      indicators: ["Dureri articulare ușoare"],
    });
  }

  // 3. Check physical considerations with CONTEXT-AWARE detection
  if (answers.physicalConsiderations) {
    const orthopedicKeywords = [
      "dureri",
      "durere",
      "articulație",
      "articulații",
      "articulatii",
      "articulatie",
      "postură",
      "postura",
      "echilibru",
      "mobilitate",
      "accidentare",
      "accidentări",
      "accidentari",
      "fractură",
      "fractura",
      "fracturi",
      "luxație",
      "luxatie",
      "luxații",
      "luxatii",
      "scolioză",
      "scolioza",
      "cifoza",
      "cifoză",
      "lordoză",
      "lordoza",
      "platfus",
      "picioare plate",
      "genunchi",
      "gleznă",
      "glezna",
      "șold",
      "sold",
      "umăr",
      "umar",
    ];

    // Use context-aware matching
    const matches = findKeywordsWithContext(answers.physicalConsiderations, orthopedicKeywords);

    if (matches.length > 0 && hasPathologicalMatch(matches)) {
      const relevantMatch = getMostRelevantMatch(matches);
      const matchedKeyword = relevantMatch?.keyword || "probleme fizice";

      // Determine severity based on whether match is confirmed
      const severity: RiskSeverity = relevantMatch?.isConfirmed ? "high" : "medium";

      signals.push({
        specialty: "orthopedist",
        severity,
        reason:
          severity === "high"
            ? `Mențiunile despre "${matchedKeyword}" necesită evaluare ortopedică înainte de începerea unui sport.`
            : `Considerații fizice detectate ("${matchedKeyword}"). Evaluare ortopedică recomandată pentru a selecta sporturi potrivite.`,
        indicators: [`Considerații fizice: ${matchedKeyword}`],
      });
    }
    // If all matches are negated, no signal is generated (reduced false positives)
  }

  // 4. Check health conditions (structured data from checkboxes)
  if (answers.healthConditions && answers.healthConditions.length > 0) {
    const orthopedicConditions = answers.healthConditions.filter((condition) => {
      const lower = condition.toLowerCase();
      return (
        lower.includes("ortoped") ||
        lower.includes("articula") ||
        lower.includes("os") ||
        lower.includes("coloană") ||
        lower.includes("coloana") ||
        lower.includes("spate") ||
        lower.includes("joint") || // English fallback
        lower.includes("bone")
      );
    });

    if (orthopedicConditions.length > 0) {
      signals.push({
        specialty: "orthopedist",
        severity: "high",
        reason: "Condițiile de sănătate menționate necesită evaluare ortopedică specializată.",
        indicators: [`Condiții de sănătate: ${orthopedicConditions.join(", ")}`],
      });
    }
  }

  // 5. Check injury details for orthopedic injuries
  if (answers.injuryDetails) {
    const orthopedicInjuryTypes: Array<typeof answers.injuryDetails.type> = [
      "fracture",
      "growth-plate",
      "dislocation",
      "sprain",
    ];

    if (answers.injuryDetails.type && orthopedicInjuryTypes.includes(answers.injuryDetails.type)) {
      const when = answers.injuryDetails.when;
      const healed = answers.injuryDetails.healed;
      const restrictions = answers.injuryDetails.restrictions;

      // Determine severity based on timing and healing status
      let severity: RiskSeverity = "medium";
      let reason = "";

      if (restrictions === true) {
        severity = "high";
        reason =
          "Restricții medicale active din cauza accidentării. Evaluare ortopedică obligatorie înainte de orice sport.";
      } else if (healed === false || when === "<1month" || when === "1-3months") {
        severity = "high";
        reason =
          "Accidentare recentă care nu este complet vindecată. Evaluare ortopedică necesară pentru a determina când poate relua activitatea sportivă.";
      } else if (when === "3-6months") {
        severity = "medium";
        reason =
          "Accidentare în ultimele 3-6 luni. Evaluare ortopedică recomandată pentru a confirma vindecarea completă.";
      } else {
        severity = "low";
        reason =
          "Accidentare în antecedente. Evaluare ortopedică recomandată pentru sporturi de contact sau cu impact ridicat.";
      }

      const injuryTypeLabels: Record<string, string> = {
        fracture: "fractură",
        "growth-plate": "accidentare placă de creștere",
        dislocation: "luxație",
        sprain: "entorsă",
      };

      signals.push({
        specialty: "orthopedist",
        severity,
        reason,
        indicators: [
          `Accidentare: ${injuryTypeLabels[answers.injuryDetails.type] || answers.injuryDetails.type}`,
        ],
      });
    }
  }

  return signals;
}

/**
 * Detect nutritionist-related risk signals
 *
 * Enhanced in Task 1.4.2 with context-aware detection
 */
function detectNutritionistRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];

  // Check health conditions related to nutrition (structured data)
  if (answers.healthConditions && answers.healthConditions.length > 0) {
    const nutritionConditions = answers.healthConditions.filter((condition) => {
      const lower = condition.toLowerCase();
      return (
        lower.includes("greutate") ||
        lower.includes("obez") ||
        lower.includes("subponderal") ||
        lower.includes("supraponderal") ||
        lower.includes("alimentație") ||
        lower.includes("alimentatie") ||
        lower.includes("dietă") ||
        lower.includes("dieta") ||
        lower.includes("intoleranță") ||
        lower.includes("intoleranta") ||
        lower.includes("alergie alimentară") ||
        lower.includes("alergie alimentara") ||
        lower.includes("celiac") ||
        lower.includes("diabet")
      );
    });

    if (nutritionConditions.length > 0) {
      signals.push({
        specialty: "nutritionist",
        severity: "high",
        reason:
          "Condițiile de sănătate legate de nutriție necesită consultare cu un nutriționist pediatric pentru a stabili recomandări alimentare adaptate activității sportive.",
        indicators: [`Condiții de sănătate: ${nutritionConditions.join(", ")}`],
      });
    }
  }

  // Check physical considerations for nutrition-related keywords with context awareness
  if (answers.physicalConsiderations) {
    const nutritionKeywords = [
      "greutate",
      "obez",
      "obezitate",
      "subponderal",
      "supraponderal",
      "alimentație",
      "alimentatie",
      "dietă",
      "dieta",
      "nutriție",
      "nutritie",
      "mănâncă",
      "mananca",
      "poftă de mâncare",
      "pofta de mancare",
      "slăbit",
      "slabit",
      "îngrășat",
      "ingrasat",
    ];

    const matches = findKeywordsWithContext(answers.physicalConsiderations, nutritionKeywords);

    if (matches.length > 0 && hasPathologicalMatch(matches)) {
      const relevantMatch = getMostRelevantMatch(matches);
      const severity: RiskSeverity = relevantMatch?.isConfirmed ? "high" : "medium";

      signals.push({
        specialty: "nutritionist",
        severity,
        reason:
          "Considerațiile legate de greutate sau nutriție ar putea beneficia de consultare cu un nutriționist pediatric pentru recomandări personalizate.",
        indicators: [
          `Considerații nutriționale: ${relevantMatch?.keyword || "probleme de nutriție"}`,
        ],
      });
    }
  }

  // Note: "slim" physical build alone is NOT a risk signal
  // It only becomes relevant with additional context (low energy, eating concerns, etc.)
  if (answers.physicalBuild === "slim" && answers.energyLevel === "low") {
    signals.push({
      specialty: "nutritionist",
      severity: "medium",
      reason:
        "Combinația de constituție subțire și nivel scăzut de energie poate indica nevoia de evaluare nutrițională pentru a asigura aportul energetic adecvat pentru sport.",
      indicators: ["Constituție subțire cu energie scăzută"],
    });
  }

  return signals;
}

/**
 * Detect psychologist-related risk signals
 *
 * Enhanced in Task 1.4.2:
 * - More nuanced personality trait analysis
 * - Context-aware text detection
 * - Better differentiation between normal shyness and concerning behavior
 */
function detectPsychologistRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];

  // Check personality traits for social/emotional concerns
  // But be careful - some traits are normal and not concerning
  const concerningTraits = answers.personality.filter((trait) => {
    const lower = trait.toLowerCase();
    return (
      lower.includes("anxios") ||
      lower.includes("temător") ||
      lower.includes("temator") ||
      lower.includes("izolat") ||
      lower.includes("frică") ||
      lower.includes("frica") ||
      lower.includes("nesigur") ||
      lower.includes("tensionat")
    );
  });

  // "rezervat" alone is not concerning - it's a normal personality trait
  // Only flag if combined with other concerning traits
  const hasReservat = answers.personality.some((t) => t.toLowerCase().includes("rezervat"));

  if (concerningTraits.length > 0) {
    // Multiple concerning traits = higher severity
    const severity: RiskSeverity = concerningTraits.length >= 2 ? "high" : "medium";

    signals.push({
      specialty: "psychologist",
      severity,
      reason:
        severity === "high"
          ? "Multiple trăsături de personalitate indică nevoia de evaluare psihologică pentru a asigura o experiență sportivă pozitivă și sănătoasă."
          : "Trăsăturile de personalitate menționate pot beneficia de suport psihologic pentru dezvoltarea încrederii în context sportiv.",
      indicators: [`Trăsături de personalitate: ${concerningTraits.join(", ")}`],
    });
  } else if (hasReservat && answers.energyLevel === "low") {
    // Reserved + low energy might indicate something more
    signals.push({
      specialty: "psychologist",
      severity: "low",
      reason:
        "Combinația de personalitate rezervată și energie scăzută poate beneficia de evaluare pentru a identifica sporturile care oferă cel mai bun mediu de dezvoltare.",
      indicators: ["Personalitate rezervată cu energie scăzută"],
    });
  }

  // Check why stopped previous sports
  if (answers.whyStoppedSports && answers.whyStoppedSports.length > 0) {
    const highPriorityReasons = answers.whyStoppedSports.filter((reason) => {
      const lower = reason.toLowerCase();
      return (
        lower.includes("bullying") ||
        lower.includes("hărțuit") ||
        lower.includes("hartuit") ||
        lower.includes("traumă") ||
        lower.includes("trauma") ||
        lower.includes("abuz")
      );
    });

    const mediumPriorityReasons = answers.whyStoppedSports.filter((reason) => {
      const lower = reason.toLowerCase();
      return (
        lower.includes("frică") ||
        lower.includes("frica") ||
        lower.includes("anxietate") ||
        lower.includes("neplăcut") ||
        lower.includes("neplacut") ||
        lower.includes("izolat") ||
        lower.includes("motivație") ||
        lower.includes("motivatie") ||
        lower.includes("încredere") ||
        lower.includes("incredere") ||
        lower.includes("presiune") ||
        lower.includes("stres")
      );
    });

    if (highPriorityReasons.length > 0) {
      signals.push({
        specialty: "psychologist",
        severity: "high",
        reason:
          "Experiențe negative anterioare (bullying, hărțuire) necesită suport psihologic înainte de reîntoarcerea la sport pentru a asigura o tranziție pozitivă.",
        indicators: [`Experiențe negative: ${highPriorityReasons.join(", ")}`],
      });
    } else if (mediumPriorityReasons.length > 0) {
      signals.push({
        specialty: "psychologist",
        severity: "medium",
        reason:
          "Motivele pentru oprirea sporturilor anterioare indică nevoia de suport pentru a depăși barierele emoționale și a găsi un sport potrivit.",
        indicators: [`Motive oprire sport: ${mediumPriorityReasons.join(", ")}`],
      });
    }
  }

  // Check health conditions for psychological concerns
  if (answers.healthConditions && answers.healthConditions.length > 0) {
    const psychologicalConditions = answers.healthConditions.filter((condition) => {
      const lower = condition.toLowerCase();
      return (
        lower.includes("anxietate") ||
        lower.includes("depresie") ||
        lower.includes("adhd") ||
        lower.includes("autism") ||
        lower.includes("tsa") || // Tulburare de spectru autist
        lower.includes("psiholog") ||
        lower.includes("psihiatru") ||
        lower.includes("tulburare") ||
        lower.includes("comportament")
      );
    });

    if (psychologicalConditions.length > 0) {
      signals.push({
        specialty: "psychologist",
        severity: "high",
        reason:
          "Condițiile de sănătate mintală menționate necesită coordonare cu un psiholog pentru a selecta sporturi care sprijină dezvoltarea copilului.",
        indicators: [`Condiții de sănătate mintală: ${psychologicalConditions.join(", ")}`],
      });
    }
  }

  // Check physical considerations for psychological keywords with context awareness
  if (answers.physicalConsiderations) {
    const psychKeywords = [
      "anxietate",
      "anxios",
      "depresie",
      "deprimat",
      "frică",
      "frica",
      "fobic",
      "panică",
      "panica",
      "stres",
      "tensiune",
      "nervos",
      "agitat",
      "comportament",
      "atenție",
      "atentie",
      "concentrare",
      "hiperactivitate",
    ];

    const matches = findKeywordsWithContext(answers.physicalConsiderations, psychKeywords);

    if (matches.length > 0 && hasPathologicalMatch(matches)) {
      const relevantMatch = getMostRelevantMatch(matches);
      const severity: RiskSeverity = relevantMatch?.isConfirmed ? "high" : "medium";

      signals.push({
        specialty: "psychologist",
        severity,
        reason:
          "Considerații privind sănătatea mintală detectate. Recomandăm evaluare psihologică pentru a identifica sporturile care oferă cel mai bun sprijin pentru dezvoltare.",
        indicators: [
          `Considerații psihologice: ${relevantMatch?.keyword || "aspecte comportamentale"}`,
        ],
      });
    }
  }

  return signals;
}

/**
 * Detect pulmonologist/respiratory risk signals
 *
 * Added in Task 1.4.2 for severity-based asthma detection
 */
function detectPulmonologistRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];

  // Check asthma severity (structured data)
  if (answers.asthmaSeverity === "severe") {
    signals.push({
      specialty: "pulmonologist",
      severity: "high",
      reason:
        "Astm sever sau necontrolat necesită evaluare pulmonară obligatorie înainte de orice sport. " +
        "Sporturile de intensitate ridicată și cele în condiții extreme (frig, praf) trebuie evitate până la stabilizare.",
      indicators: ["Astm sever necontrolat"],
    });
  } else if (answers.asthmaSeverity === "moderate") {
    // Check if inhaler is used
    const inhalerNote =
      answers.inhalerUse === "yes"
        ? " Utilizarea preventivă a inhalerului este pozitivă."
        : answers.inhalerUse === "sometimes"
          ? " Utilizarea inconsistentă a inhalerului necesită discuție cu medicul."
          : "";

    signals.push({
      specialty: "pulmonologist",
      severity: "medium",
      reason:
        `Astm moderat necesită evaluare pulmonară pentru a stabili sporturile potrivite și protocoale de siguranță.${inhalerNote} ` +
        "Înotul este adesea recomandat pentru copiii cu astm.",
      indicators: ["Astm moderat"],
    });
  } else if (answers.asthmaSeverity === "mild") {
    // Mild asthma - low priority, but still note it
    if (answers.inhalerUse !== "yes") {
      signals.push({
        specialty: "pulmonologist",
        severity: "low",
        reason:
          "Astm ușor controlat. Recomandăm discuție cu medicul despre utilizarea preventivă a inhalerului înainte de sport și alegerea sporturilor potrivite.",
        indicators: ["Astm ușor"],
      });
    }
    // If mild asthma with proper inhaler use, no signal needed
  }

  // Check physical considerations for respiratory keywords with context awareness
  if (answers.physicalConsiderations) {
    const respiratoryKeywords = [
      "respirație",
      "respiratie",
      "respirator",
      "astm",
      "bronșită",
      "bronsita",
      "bronșic",
      "bronsic",
      "tuse",
      "wheezing",
      "respiră greu",
      "respira greu",
      "gâfâie",
      "gafaie",
      "sufocă",
      "sufoca",
      "dispnee",
      "plămâni",
      "plamani",
      "pulmonar",
    ];

    const matches = findKeywordsWithContext(answers.physicalConsiderations, respiratoryKeywords);

    if (matches.length > 0 && hasPathologicalMatch(matches)) {
      const relevantMatch = getMostRelevantMatch(matches);
      const severity: RiskSeverity = relevantMatch?.isConfirmed ? "high" : "medium";

      signals.push({
        specialty: "pulmonologist",
        severity,
        reason:
          "Mențiuni despre probleme respiratorii în considerațiile fizice. Evaluare pulmonară recomandată pentru a selecta sporturi potrivite.",
        indicators: [
          `Considerații respiratorii: ${relevantMatch?.keyword || "probleme respiratorii"}`,
        ],
      });
    }
  }

  return signals;
}

/**
 * Detect general pediatrician risk signals
 *
 * Enhanced in Task 1.4.2:
 * - Removed asthma detection (moved to pulmonologist)
 * - Added context-aware detection for health conditions
 * - Improved age-based risk assessment
 */
function detectGeneralPediatricianRisks(answers: QuizAnswers): RiskSignal[] {
  const signals: RiskSignal[] = [];

  // Check for very low energy level with context
  if (answers.energyLevel === "low") {
    // Low energy is more concerning for older children
    const severity: RiskSeverity = answers.age >= 8 ? "high" : "medium";
    signals.push({
      specialty: "general",
      severity,
      reason:
        answers.age >= 8
          ? "Nivelul scăzut de energie la un copil de această vârstă poate indica probleme de sănătate care necesită evaluare medicală."
          : "Nivelul scăzut de energie poate indica probleme de sănătate sau poate fi normal pentru vârstă. Evaluare medicală recomandată.",
      indicators: ["Nivel de energie: Scăzut"],
    });
  }

  // Check for multiple health conditions
  if (answers.healthConditions && answers.healthConditions.length >= 2) {
    signals.push({
      specialty: "general",
      severity: "high",
      reason:
        "Prezența mai multor condiții de sănătate necesită evaluare medicală generală înainte de începerea unui sport nou pentru a coordona recomandările.",
      indicators: [`Multiple condiții de sănătate: ${answers.healthConditions.length}`],
    });
  }

  // Check for specific health conditions that need general pediatric evaluation
  if (answers.healthConditions && answers.healthConditions.length > 0) {
    // Filter out conditions already handled by specific specialists
    const generalConditions = answers.healthConditions.filter((condition) => {
      const lower = condition.toLowerCase();
      // Exclude conditions handled by other specialists
      const handledByOthers =
        lower.includes("ortoped") ||
        lower.includes("articula") ||
        lower.includes("os") ||
        lower.includes("coloană") ||
        lower.includes("coloana") ||
        lower.includes("spate") ||
        lower.includes("greutate") ||
        lower.includes("obez") ||
        lower.includes("nutriție") ||
        lower.includes("nutritie") ||
        lower.includes("anxietate") ||
        lower.includes("depresie") ||
        lower.includes("ADHD") ||
        lower.includes("autism") ||
        lower.includes("psiholog") ||
        lower.includes("cardiac") ||
        lower.includes("inimă") ||
        lower.includes("inima") ||
        lower.includes("astm") ||
        lower.includes("respirator") ||
        lower.includes("concuzie");

      return !handledByOthers;
    });

    if (generalConditions.length > 0) {
      signals.push({
        specialty: "general",
        severity: "medium",
        reason:
          "Condițiile de sănătate menționate necesită evaluare medicală generală pentru a determina sporturile potrivite și eventualele precauții necesare.",
        indicators: [`Condiții de sănătate: ${generalConditions.join(", ")}`],
      });
    }
  }

  // Check for very young age with concerns (4-5 years)
  if (answers.age <= 5 && (answers.healthConditions?.length || answers.physicalConsiderations)) {
    signals.push({
      specialty: "general",
      severity: "low",
      reason:
        "Pentru copiii sub 6 ani cu considerații de sănătate, este recomandată o verificare medicală generală înainte de începerea unui program sportiv structurat.",
      indicators: ["Vârstă tânără (≤5 ani) cu considerații de sănătate"],
    });
  }

  // Check for doctor restrictions checkbox
  if (
    answers.healthConditions?.some(
      (c) => c.toLowerCase().includes("doctor") || c.toLowerCase().includes("medic")
    )
  ) {
    signals.push({
      specialty: "general",
      severity: "high",
      reason:
        "Restricții medicale menționate. Evaluare cu medicul curant este obligatorie înainte de începerea oricărui sport pentru a clarifica limitările.",
      indicators: ["Restricții medicale existente"],
    });
  }

  return signals;
}

/**
 * Determine recommended specialist based on risk signals
 *
 * Prioritizes specialists by severity and specialty type.
 * Updated in Task 1.4.2 to include pulmonologist.
 */
function determineRecommendedSpecialist(
  signals: RiskSignal[]
): SpecialistRecommendation["specialty"] | undefined {
  if (signals.length === 0) {
    return undefined;
  }

  // Sort by severity (high > medium > low)
  const severityOrder: Record<RiskSeverity, number> = {
    high: 3,
    medium: 2,
    low: 1,
  };

  const sortedSignals = [...signals].sort(
    (a, b) => severityOrder[b.severity] - severityOrder[a.severity]
  );

  // Priority order: Critical specialists first, then others
  // cardiologist > neurologist > pulmonologist > orthopedist > psychologist > nutritionist > general
  const specialtyPriority: Record<SpecialistRecommendation["specialty"], number> = {
    cardiologist: 7, // Highest priority - life-threatening cardiac conditions
    neurologist: 6, // High priority - serious brain injury risk
    pulmonologist: 5, // High priority - severe respiratory conditions can be life-threatening
    orthopedist: 4, // Important for injury prevention
    psychologist: 3, // Mental health support
    nutritionist: 2, // Nutritional concerns
    general: 1, // General pediatric evaluation
  };

  // Find highest priority specialist among high/medium severity signals
  const highPrioritySignals = sortedSignals.filter(
    (s) => s.severity === "high" || s.severity === "medium"
  );

  if (highPrioritySignals.length > 0) {
    return highPrioritySignals.sort(
      (a, b) => specialtyPriority[b.specialty] - specialtyPriority[a.specialty]
    )[0].specialty;
  }

  // If no high/medium, return highest priority from low severity
  return sortedSignals.sort(
    (a, b) => specialtyPriority[b.specialty] - specialtyPriority[a.specialty]
  )[0].specialty;
}

/**
 * Convert risk detection result to specialist recommendation
 *
 * Transforms programmatic risk detection into a specialist recommendation
 * format compatible with the quiz system.
 */
export function riskSignalsToSpecialistRecommendation(
  result: RiskDetectionResult
): SpecialistRecommendation | undefined {
  if (!result.recommendedSpecialist || result.signals.length === 0) {
    return undefined;
  }

  // Find the primary signal for the recommended specialist
  const primarySignal = result.signals.find((s) => s.specialty === result.recommendedSpecialist);

  if (!primarySignal) {
    return undefined;
  }

  // Determine priority based on severity
  const priority: SpecialistRecommendation["priority"] =
    primarySignal.severity === "high"
      ? "high"
      : primarySignal.severity === "medium"
        ? "medium"
        : "low";

  return {
    specialty: result.recommendedSpecialist,
    needed: true,
    reason: primarySignal.reason,
    priority,
  };
}
