/**
 * Sport Name Normalization Utility
 *
 * Normalizes sport names to match database format.
 * Handles variations and Romanian character differences (e.g., "înot" → "inot").
 */

import { SPORT_TYPES } from "./constants";

/**
 * Normalize sport name to match SPORT_TYPES format
 * Converts to lowercase and handles common variations
 *
 * @param sportName - The sport name to normalize
 * @returns Normalized sport name matching SPORT_TYPES format
 *
 * @example
 * normalizeSportName("înot") // Returns "inot"
 * normalizeSportName("Înot") // Returns "inot"
 * normalizeSportName("fotbal de câmp") // Returns "fotbal"
 */
export function normalizeSportName(sportName: string): string {
  const normalized = sportName.toLowerCase().trim();

  // Check if it matches any SPORT_TYPES exactly
  if (SPORT_TYPES.includes(normalized as (typeof SPORT_TYPES)[number])) {
    return normalized;
  }

  // Handle common variations
  // Note: Database uses "inot" (without î), but user input might have "înot" (with î)
  const variations: Record<string, string> = {
    // Swimming variations
    înot: "inot",
    "înot sincron": "inot",
    "inot sincron": "inot",
    // Football variations
    "fotbal de câmp": "fotbal",
    "fotbal de camp": "fotbal",
    "fotbal de teren": "fotbal",
    // Basketball variations
    baschetbal: "baschet",
    basket: "baschet",
    // Tennis variations
    "tenis de câmp": "tenis",
    "tenis de camp": "tenis",
    "tenis de masă": "tenis",
    "tenis de masa": "tenis",
    // Gymnastics variations
    // Note: Database uses "gimnastica" (without ă), but user input might have "gimnastică" (with ă)
    gimnastică: "gimnastica",
    "gimnastică artistică": "gimnastica",
    "gimnastica artistica": "gimnastica",
    // Karate variations
    "karate-do": "karate",
    "karate do": "karate",
    // Volleyball variations
    "volei de plajă": "volei",
    "volei de plaja": "volei",
    // Handball variations
    "handbal de sală": "handbal",
    "handbal de sala": "handbal",
  };

  return variations[normalized] || normalized;
}

/**
 * Get display name for a sport
 * Capitalizes the first letter and adds proper Romanian diacritics
 *
 * @param sportId - The normalized sport ID (database format)
 * @returns Display name with proper Romanian diacritics and capitalization
 *
 * @example
 * getSportDisplayName("inot") // Returns "Înot"
 * getSportDisplayName("gimnastica") // Returns "Gimnastică"
 * getSportDisplayName("tenis-de-masa") // Returns "Tenis de masă"
 * getSportDisplayName("fotbal") // Returns "Fotbal"
 */
export function getSportDisplayName(sportId: string): string {
  // Mapping from database format (without diacritics) to display format (with diacritics)
  const displayNames: Record<string, string> = {
    // Sports with diacritics
    inot: "Înot",
    gimnastica: "Gimnastică",
    scrima: "Scrimă",
    echitatie: "Echitație",
    "tenis-de-masa": "Tenis de masă",
    "hochei-ghata": "Hochei pe gheață",
    "patinaj-ghata": "Patinaj pe gheață",
    "polo-apa": "Polo pe apă",
    // Sports without diacritics (just capitalize first letter)
    atletism: "Atletism",
    badminton: "Badminton",
    baschet: "Baschet",
    baseball: "Baseball",
    box: "Box",
    ciclism: "Ciclism",
    dans: "Dans",
    escalada: "Escaladă",
    fotbal: "Fotbal",
    handbal: "Handbal",
    hochei: "Hochei",
    judo: "Judo",
    karate: "Karate",
    karting: "Karting",
    kickboxing: "Kickboxing",
    lupte: "Lupte",
    "multi-sport": "Multi sport",
    patinaj: "Patinaj",
    rugby: "Rugby",
    schi: "Schi",
    snowboard: "Snowboard",
    taekwondo: "Taekwondo",
    tenis: "Tenis",
    volei: "Volei",
  };

  // Return mapped display name if available, otherwise capitalize first letter
  return displayNames[sportId] || sportId.charAt(0).toUpperCase() + sportId.slice(1);
}
