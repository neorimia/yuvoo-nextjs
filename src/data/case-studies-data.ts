/**
 * Case Studies Data
 *
 * Detailed case studies from clubs using Yuvoo platform.
 * These case studies include comprehensive metrics, before/after comparisons, and detailed results.
 *
 * IMPORTANT: Only add case studies with:
 * - Written approval from the club
 * - Real club names (not generic descriptions)
 * - Comprehensive metrics (lead counts, conversion rates, ROI, time savings, etc.)
 * - Before/after comparisons
 * - Specific results and outcomes
 * - Extended testimonials/stories
 *
 * Format:
 * - clubName: Full official name of the club (with approval)
 * - author: Contact person name or role (optional, with approval)
 * - location: City/location
 * - sport: Sport type
 * - logo: Path to club logo (if available, with approval)
 * - quote: Extended testimonial quote (in Romanian)
 * - metrics: Detailed metrics object
 * - beforeAfter: Before/after comparison
 * - results: Specific results achieved
 * - story: Extended story/narrative
 * - isVerified: Whether case study is verified by club
 * - approvalDate: Date when approval was received
 * - featured: Whether to feature prominently (best case studies)
 */

export interface CaseStudyMetrics {
  leadsPerMonth: number;
  conversionRate: number; // Percentage
  enrollmentsPerMonth: number;
  costPerLead: number; // In lei
  costPerEnrollment: number; // In lei
  monthlySavings?: number; // Compared to Google/Facebook ads
  timeSavedHours?: number; // Hours saved per month
  roi?: number; // ROI percentage
}

export interface BeforeAfterComparison {
  before: {
    leadsPerMonth: number;
    conversionRate: number;
    costPerMonth: number;
    costPerLead: number;
    source: string; // e.g., "Google Ads", "Facebook Ads", "Manual"
  };
  after: {
    leadsPerMonth: number;
    conversionRate: number;
    costPerMonth: number;
    costPerLead: number;
    source: string; // "Yuvoo Premium"
  };
}

export interface CaseStudy {
  id: string;
  clubName: string;
  author?: string; // Contact person name or role
  location: string;
  sport: string;
  logo?: string; // Path to club logo image
  quote: string; // Extended testimonial quote
  metrics: CaseStudyMetrics;
  beforeAfter?: BeforeAfterComparison;
  results: string[]; // Bullet points of specific results
  story?: string; // Extended narrative/story
  isVerified: boolean;
  approvalDate?: string; // ISO date string
  featured: boolean; // Featured case studies shown first
}

/**
 * Current case studies (placeholder - replace with real data)
 *
 * TODO: Replace with real case studies when collected:
 * 1. Contact Founding Clubs after they've been using Yuvoo for 2-3 months
 * 2. Request detailed case studies with specific metrics
 * 3. Get written approval for using club name, logo, and metrics
 * 4. Add case studies here with all required fields
 */
export const caseStudies: CaseStudy[] = [
  // Example structure (remove when adding real case studies):
  // {
  //   id: "case-study-1",
  //   clubName: "Clubul Sportiv AquaFit București",
  //   author: "Maria Popescu, Manager",
  //   location: "București",
  //   sport: "Înot",
  //   logo: "/assets/img/clubs/aquafit-logo.png",
  //   quote: "Yuvoo ne-a schimbat complet modul în care găsim părinți potriviți. Părinții care au venit prin Yuvoo știau deja ce caută, discuția a fost mult mai ușoară și conversia a fost incredibilă.",
  //   metrics: {
  //     leadsPerMonth: 15,
  //     conversionRate: 80,
  //     enrollmentsPerMonth: 12,
  //     costPerLead: 6.6, // 99 lei / 15 leads
  //     costPerEnrollment: 8.25, // 99 lei / 12 enrollments
  //     monthlySavings: 600, // Compared to Google Ads
  //     timeSavedHours: 7.5,
  //     roi: 1200, // Percentage
  //   },
  //   beforeAfter: {
  //     before: {
  //       leadsPerMonth: 20,
  //       conversionRate: 15,
  //       costPerMonth: 800,
  //       costPerLead: 40,
  //       source: "Google Ads",
  //     },
  //     after: {
  //       leadsPerMonth: 15,
  //       conversionRate: 80,
  //       costPerMonth: 99,
  //       costPerLead: 6.6,
  //       source: "Yuvoo Premium",
  //     },
  //   },
  //   results: [
  //     "Conversie de 80% vs. 15% din Google Ads",
  //     "Economisire de 600 lei/lună",
  //     "7.5 ore economisite pe lună",
  //     "12 înscrieri noi în prima lună",
  //   ],
  //   story: "Înainte de Yuvoo, foloseam Google Ads și primeam multe mesaje de la părinți care nu se potriveau cu vârsta sau nivelul copiilor. Cu Yuvoo, toți părinții care ne contactează au deja completat quiz-ul AI și știu că înotul este potrivit pentru copilul lor. Rezultatul? Conversie mult mai mare și mult mai puțin timp pierdut.",
  //   isVerified: true,
  //   approvalDate: "2026-01-15",
  //   featured: true,
  // },
];

/**
 * Get featured case studies (for prominent display)
 */
export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured && cs.isVerified);
}

/**
 * Get all verified case studies
 */
export function getVerifiedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.isVerified);
}

/**
 * Get case studies by sport
 */
export function getCaseStudiesBySport(sport: string): CaseStudy[] {
  return caseStudies.filter(
    (cs) => cs.isVerified && cs.sport.toLowerCase() === sport.toLowerCase()
  );
}

/**
 * Calculate aggregate metrics from all verified case studies
 */
export function getAggregateMetrics(): {
  avgLeadsPerMonth: number;
  avgConversionRate: number;
  avgEnrollmentsPerMonth: number;
  avgCostPerLead: number;
  avgCostPerEnrollment: number;
  totalMonthlySavings: number;
  totalTimeSavedHours: number;
  avgROI: number;
} {
  const verified = getVerifiedCaseStudies();
  if (verified.length === 0) {
    return {
      avgLeadsPerMonth: 0,
      avgConversionRate: 0,
      avgEnrollmentsPerMonth: 0,
      avgCostPerLead: 0,
      avgCostPerEnrollment: 0,
      totalMonthlySavings: 0,
      totalTimeSavedHours: 0,
      avgROI: 0,
    };
  }

  const totals = verified.reduce(
    (acc, cs) => ({
      leadsPerMonth: acc.leadsPerMonth + cs.metrics.leadsPerMonth,
      conversionRate: acc.conversionRate + cs.metrics.conversionRate,
      enrollmentsPerMonth: acc.enrollmentsPerMonth + cs.metrics.enrollmentsPerMonth,
      costPerLead: acc.costPerLead + cs.metrics.costPerLead,
      costPerEnrollment: acc.costPerEnrollment + cs.metrics.costPerEnrollment,
      monthlySavings: acc.monthlySavings + (cs.metrics.monthlySavings || 0),
      timeSavedHours: acc.timeSavedHours + (cs.metrics.timeSavedHours || 0),
      roi: acc.roi + (cs.metrics.roi || 0),
    }),
    {
      leadsPerMonth: 0,
      conversionRate: 0,
      enrollmentsPerMonth: 0,
      costPerLead: 0,
      costPerEnrollment: 0,
      monthlySavings: 0,
      timeSavedHours: 0,
      roi: 0,
    }
  );

  const count = verified.length;

  return {
    avgLeadsPerMonth: totals.leadsPerMonth / count,
    avgConversionRate: totals.conversionRate / count,
    avgEnrollmentsPerMonth: totals.enrollmentsPerMonth / count,
    avgCostPerLead: totals.costPerLead / count,
    avgCostPerEnrollment: totals.costPerEnrollment / count,
    totalMonthlySavings: totals.monthlySavings,
    totalTimeSavedHours: totals.timeSavedHours,
    avgROI: totals.roi / count,
  };
}
