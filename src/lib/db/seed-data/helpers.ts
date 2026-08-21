/**
 * Seed Data Helper Functions
 *
 * Utility functions for generating seed data.
 */

import { countyCapitals, bucharestSectors, majorCities } from "@/lib/db/locations-data";

/**
 * Map city names to location IDs
 * Handles variations and matches city names to location IDs
 */
const CITY_TO_LOCATION_ID: Record<string, string> = {};

// Build city to location ID mapping
[...countyCapitals, ...majorCities].forEach((city) => {
  CITY_TO_LOCATION_ID[city.name] = city.id;
  // Also add normalized version (without diacritics) for fuzzy matching
  const normalized = city.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (normalized !== city.name.toLowerCase()) {
    CITY_TO_LOCATION_ID[normalized] = city.id;
  }
});

/**
 * Map sector names to location IDs (Bucharest only)
 */
const SECTOR_TO_LOCATION_ID: Record<string, string> = {};

bucharestSectors.forEach((sector) => {
  SECTOR_TO_LOCATION_ID[sector.name] = sector.id;
  // Also add variations
  SECTOR_TO_LOCATION_ID[`Sectorul ${sector.name.split(" ")[1]}`] = sector.id;
  SECTOR_TO_LOCATION_ID[`Sector ${sector.name.split(" ")[1]}`] = sector.id;
});

/**
 * Get city location ID from city name
 */
export function getCityLocationId(cityName: string): string | undefined {
  if (!cityName) return undefined;

  // Try exact match first
  if (CITY_TO_LOCATION_ID[cityName]) {
    return CITY_TO_LOCATION_ID[cityName];
  }

  // Try normalized match
  const normalized = cityName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (CITY_TO_LOCATION_ID[normalized]) {
    return CITY_TO_LOCATION_ID[normalized];
  }

  // Try case-insensitive match
  for (const [name, id] of Object.entries(CITY_TO_LOCATION_ID)) {
    if (name.toLowerCase() === cityName.toLowerCase()) {
      return id;
    }
  }

  return undefined;
}

/**
 * Get sector location ID from sector/district name (Bucharest only)
 */
export function getSectorLocationId(districtName: string): string | undefined {
  if (!districtName) return undefined;

  // Try exact match first
  if (SECTOR_TO_LOCATION_ID[districtName]) {
    return SECTOR_TO_LOCATION_ID[districtName];
  }

  // Try normalized match
  const normalized = districtName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  for (const [name, id] of Object.entries(SECTOR_TO_LOCATION_ID)) {
    const normalizedName = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    if (normalizedName === normalized) {
      return id;
    }
  }

  return undefined;
}

/**
 * Get county location ID from city location ID
 * Derives county from city's parent relationship
 */
export function getCountyLocationId(cityId: string | undefined): string | undefined {
  if (!cityId) return undefined;

  // Find city in locations data
  const city = [...countyCapitals, ...majorCities].find((c) => c.id === cityId);
  if (!city || !city.parentId) return undefined;

  // parentId of a city is the county ID
  return city.parentId;
}

/**
 * Generate URL-friendly slug from Romanian text
 * Converts: "Fotbal Club Junior București" -> "fotbal-club-junior-bucuresti"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Decompose characters with diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Romanian city coordinates (approximate city centers)
 * Used for generating realistic club/doctor locations
 */
export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  București: { lat: 44.4268, lng: 26.1025 },
  "Cluj-Napoca": { lat: 46.7712, lng: 23.6236 },
  Timișoara: { lat: 45.7489, lng: 21.2087 },
  Iași: { lat: 47.1585, lng: 27.6014 },
  Constanța: { lat: 44.1598, lng: 28.6348 },
  Craiova: { lat: 44.3302, lng: 23.7949 },
  Brașov: { lat: 45.6427, lng: 25.5887 },
  Galați: { lat: 45.4353, lng: 28.008 },
  Ploiești: { lat: 44.9469, lng: 26.0365 },
  Oradea: { lat: 47.0465, lng: 21.919 },
  Brăila: { lat: 45.2692, lng: 27.9574 },
  Arad: { lat: 46.1866, lng: 21.3123 },
  Bacău: { lat: 46.5662, lng: 26.9098 },
  Pitești: { lat: 44.8565, lng: 24.8687 },
  Sibiu: { lat: 45.7983, lng: 24.1253 },
  "Târgu Mureș": { lat: 46.5425, lng: 24.5576 },
  "Baia Mare": { lat: 47.6574, lng: 23.5681 },
  Buzău: { lat: 45.1517, lng: 26.8185 },
  "Satu Mare": { lat: 47.8017, lng: 22.8575 },
  Botoșani: { lat: 47.7486, lng: 26.6694 },
  "Râmnicu Vâlcea": { lat: 45.1, lng: 24.3667 },
  "Drobeta-Turnu Severin": { lat: 44.6319, lng: 22.6567 },
  Suceava: { lat: 47.6514, lng: 26.2556 },
  "Piatra Neamț": { lat: 46.9275, lng: 26.3708 },
  Târgoviște: { lat: 44.9244, lng: 25.4572 },
  Focșani: { lat: 45.7, lng: 27.1833 },
  "Târgu Jiu": { lat: 45.0333, lng: 23.2667 },
  Bistrița: { lat: 47.1333, lng: 24.4833 },
  Reșița: { lat: 45.3, lng: 21.8833 },
};

/**
 * Get coordinates for a city with slight randomization
 * Adds small random offset to simulate different addresses within the city
 */
export function getCityCoordinates(
  city: string,
  randomize: boolean = true
): { lat: number; lng: number } | undefined {
  const baseCoords = CITY_COORDINATES[city];
  if (!baseCoords) {
    return undefined;
  }

  if (!randomize) {
    return baseCoords;
  }

  // Add small random offset (±0.01 degrees ≈ ±1km)
  const offset = 0.01;
  return {
    lat: baseCoords.lat + (Math.random() * 2 - 1) * offset,
    lng: baseCoords.lng + (Math.random() * 2 - 1) * offset,
  };
}

/**
 * Generate age groups based on sport type
 * Returns array of ages appropriate for the sport
 */
export function generateAgeGroups(
  sportType: string,
  minAge: number = 4,
  maxAge: number = 14
): number[] {
  // Some sports have specific age requirements
  const sportAgeRanges: Record<string, { min: number; max: number }> = {
    fotbal: { min: 5, max: 14 },
    baschet: { min: 6, max: 14 },
    tenis: { min: 4, max: 14 },
    inot: { min: 4, max: 14 },
    gimnastica: { min: 4, max: 14 },
    dans: { min: 4, max: 14 },
    karate: { min: 5, max: 14 },
    judo: { min: 5, max: 14 },
    volei: { min: 8, max: 14 },
    handbal: { min: 8, max: 14 },
    atletism: { min: 6, max: 14 },
    ciclism: { min: 6, max: 14 },
    echitatie: { min: 6, max: 14 },
    schi: { min: 5, max: 14 },
    patinaj: { min: 4, max: 14 },
    hochei: { min: 6, max: 14 },
    scrima: { min: 6, max: 14 },
    "tenis-de-masa": { min: 6, max: 14 },
    badminton: { min: 6, max: 14 },
    rugby: { min: 8, max: 14 },
  };

  const range = sportAgeRanges[sportType] || { min: minAge, max: maxAge };
  const ages: number[] = [];
  for (let age = range.min; age <= range.max; age++) {
    ages.push(age);
  }
  return ages;
}

/**
 * Generate experience levels
 * Returns array of levels offered by the club
 */
export function generateLevels(
  includeBeginner: boolean = true,
  includeIntermediate: boolean = true,
  includeAdvanced: boolean = false
): string[] {
  const levels: string[] = [];
  if (includeBeginner) levels.push("beginner");
  if (includeIntermediate) levels.push("intermediate");
  if (includeAdvanced) levels.push("advanced");
  return levels;
}

/**
 * Generate training schedule
 * Returns array of schedule entries for typical training sessions
 */
export function generateSchedule(
  daysPerWeek: number = 3,
  startTime: string = "16:00",
  duration: number = 90
): { day: string; time: string }[] {
  const weekDays = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"];
  const selectedDays = weekDays.slice(0, daysPerWeek);

  const startHour = parseInt(startTime.split(":")[0]);
  const startMinute = parseInt(startTime.split(":")[1]);
  const endHour = startHour + Math.floor(duration / 60);
  const endMinute = startMinute + (duration % 60);
  const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;

  return selectedDays.map((day) => ({
    day,
    time: `${startTime}-${endTime}`,
  }));
}

/**
 * Generate pricing options
 * Returns realistic Romanian pricing for sports clubs
 */
export function generatePricing(
  type: "monthly" | "per_class" | "per_semester" = "monthly",
  amount?: number
): { type: "monthly" | "per_class" | "per_semester"; amount: number; currency: "RON" } {
  // Default amounts based on type
  const defaultAmounts = {
    monthly: 250 + Math.floor(Math.random() * 250), // 250-500 RON
    per_class: 30 + Math.floor(Math.random() * 20), // 30-50 RON
    per_semester: 1000 + Math.floor(Math.random() * 500), // 1000-1500 RON
  };

  return {
    type,
    amount: amount || defaultAmounts[type],
    currency: "RON",
  };
}

/**
 * Generate placeholder image URLs
 * Returns array of placeholder image URLs (can be replaced with actual Cloudinary URLs later)
 */
export function generateImageUrls(count: number = 3): string[] {
  // Use placeholder service that works well with Next.js Image optimization
  // Using picsum.photos which provides random images without query parameters
  const urls: string[] = [];
  for (let i = 0; i < count; i++) {
    urls.push("/assets/img/placeholders/profile.svg");
  }
  return urls;
}

// Generate the club image by type of sport
/**
 * Generate club image path based on sport type
 * Maps sport types to available images in /public/assets/img/sports/
 * Includes fallbacks for variants and sports without specific images
 */
export function generateClubImage(sportType: string): string {
  switch (sportType) {
    // Ball sports
    case "fotbal":
      return "/assets/img/sports/fotbal.jpg";
    case "baschet":
      return "/assets/img/sports/baschet.jpg";
    case "volei":
      return "/assets/img/sports/volei.jpg";
    case "handbal":
      return "/assets/img/sports/handbal.jpg";
    case "tenis":
      return "/assets/img/sports/tenis.jpg";
    case "tenis-de-masa":
      return "/assets/img/sports/tenis-de-masa.jpg";
    case "badminton":
      return "/assets/img/sports/badminton.jpg";
    case "rugby":
    case "rugbi": // Variant spelling
      return "/assets/img/sports/rugby.jpg";

    // Water sports
    case "inot":
      return "/assets/img/sports/inot.jpg";
    case "polo-apa":
    case "polo-aquatic":
    case "polo":
      // Use inot.jpg as fallback for water polo (no specific image available)
      return "/assets/img/sports/inot.jpg";
    case "polo-terrestru":
      // Use fotbal.jpg as fallback for field polo (no specific image available)
      return "/assets/img/sports/fotbal.jpg";

    // Winter sports
    case "schi":
      return "/assets/img/sports/schi.jpg";
    case "snowboard":
      // Use schi.jpg as fallback (similar winter sport)
      return "/assets/img/sports/schi.jpg";
    case "patinaj":
      return "/assets/img/sports/patinaj.jpg";
    case "patinaj-artistic":
      return "/assets/img/sports/patinaj-artistic.jpg";
    case "patinaj-ghata":
      // Use patinaj.jpg as fallback
      return "/assets/img/sports/patinaj.jpg";
    case "hochei":
      return "/assets/img/sports/hochei.jpg";
    case "hochei-ghata":
      // Use hochei.jpg as fallback
      return "/assets/img/sports/hochei.jpg";

    // Combat sports
    case "karate":
      return "/assets/img/sports/karate.jpg";
    case "judo":
      return "/assets/img/sports/judo.jpg";
    case "taekwondo":
      return "/assets/img/sports/taekwondo.jpg";
    case "box":
      return "/assets/img/sports/box.jpg";
    case "lupte":
      // Use judo.jpg as fallback for wrestling (no specific image available)
      return "/assets/img/sports/judo.jpg";
    case "scrima":
      return "/assets/img/sports/scrima.jpg";

    // Gymnastics & Dance
    case "gimnastica":
      // Use artistic gymnastics as default (most common)
      return "/assets/img/sports/gimnastica-artistica.jpg";
    case "gimnastica-artistica":
      return "/assets/img/sports/gimnastica-artistica.jpg";
    case "gimnastica-ritmica":
      return "/assets/img/sports/gimnastica-ritmica.jpg";
    case "dans":
      return "/assets/img/sports/dans.jpg";

    // Athletics & Outdoor
    case "atletism":
      return "/assets/img/sports/atletism.jpg";
    case "ciclism":
      return "/assets/img/sports/ciclism.jpg";
    case "echitatie":
      return "/assets/img/sports/echitatie.jpg";
    case "escalada":
    case "alpinism":
      return "/assets/img/sports/alpinism.jpg";
    case "tiro-cu-arcul":
      return "/assets/img/sports/tiro-cu-arcul.jpg";

    // Multi-sport clubs
    case "multi-sport":
      // Use a generic sport image (fotbal is most common)
      return "/assets/img/sports/fotbal.jpg";

    // Default fallback
    default:
      return "/assets/img/sports/fotbal.jpg";
  }
}

/**
 * Generate doctor schedule (availability)
 * Returns JSONB-compatible schedule for doctors
 */
export function generateDoctorSchedule(
  days: string[] = ["Luni", "Marți", "Miercuri", "Joi", "Vineri"],
  startTime: string = "09:00",
  endTime: string = "17:00"
): { day: string; time: string }[] {
  return days.map((day) => ({
    day,
    time: `${startTime}-${endTime}`,
  }));
}
