/**
 * Clubs Landing Testimonials Data
 *
 * Real testimonials from clubs using Yuvoo platform.
 * These testimonials include concrete metrics and results.
 *
 * IMPORTANT: Only add testimonials with:
 * - Written approval from the club
 * - Real club names (not generic descriptions)
 * - Concrete metrics (lead counts, conversion rates, ROI, etc.)
 * - Specific results and outcomes
 *
 * Format:
 * - clubName: Full official name of the club (with approval)
 * - author: Contact person name or role (optional, with approval)
 * - location: City/location
 * - sport: Sport type
 * - quote: Testimonial quote (in Romanian)
 * - metrics: Concrete metrics (lead counts, conversion rates, etc.)
 * - results: Specific results or outcomes
 * - logo: Path to club logo (if available, with approval)
 * - isVerified: Whether testimonial is verified by club
 * - approvalDate: Date when approval was received
 * - featured: Whether to feature prominently (best testimonials)
 */

export interface ClubTestimonial {
  id: string;
  clubName: string;
  author?: string; // Contact person name or role
  location: string;
  sport: string;
  quote: string;
  metrics?: string; // e.g., "15 lead-uri în prima lună, 12 s-au înscris (80% conversie)"
  results?: string; // e.g., "Conversie de 83% vs. 15% din Google Ads"
  logo?: string; // Path to club logo image
  isVerified: boolean;
  approvalDate?: string; // ISO date string
  featured: boolean; // Featured testimonials shown first
}

/**
 * Current testimonials (placeholder - replace with real data)
 *
 * TODO: Replace with real testimonials when collected:
 * 1. Contact Founding Clubs after they've been using Yuvoo for 1-2 months
 * 2. Request testimonials with specific metrics
 * 3. Get written approval for using club name and logo
 * 4. Add testimonials here with all required fields
 */
export const clubsLandingTestimonials: ClubTestimonial[] = [
  // Example structure (remove when adding real testimonials):
  // {
  //   id: "testimonial-1",
  //   clubName: "Clubul Sportiv AquaFit București",
  //   author: "Maria Popescu, Manager",
  //   location: "București",
  //   sport: "Înot",
  //   quote: "Părinții care au venit prin Yuvoo știau deja ce caută. Discuția a fost mult mai ușoară.",
  //   metrics: "15 lead-uri în prima lună, 12 s-au înscris (80% conversie)",
  //   results: "Conversie de 80% vs. 15% din Google Ads",
  //   logo: "/assets/img/clubs/aquafit-logo.png",
  //   isVerified: true,
  //   approvalDate: "2026-01-15",
  //   featured: true,
  // },
];

/**
 * Get featured testimonials (for prominent display)
 */
export function getFeaturedTestimonials(): ClubTestimonial[] {
  return clubsLandingTestimonials.filter((t) => t.featured && t.isVerified);
}

/**
 * Get all verified testimonials
 */
export function getVerifiedTestimonials(): ClubTestimonial[] {
  return clubsLandingTestimonials.filter((t) => t.isVerified);
}

/**
 * Get testimonials by sport
 */
export function getTestimonialsBySport(sport: string): ClubTestimonial[] {
  return clubsLandingTestimonials.filter(
    (t) => t.isVerified && t.sport.toLowerCase() === sport.toLowerCase()
  );
}
