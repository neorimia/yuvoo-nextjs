/**
 * Seed Data Helper Functions
 *
 * Utility functions for generating seed data.
 */

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
    // Use different seed for each image to get variety
    urls.push(`https://picsum.photos/seed/club-${i}/800/600`);
  }
  return urls;
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
