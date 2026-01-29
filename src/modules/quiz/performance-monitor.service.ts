/**
 * Performance Monitor Service
 *
 * Provides performance monitoring and baseline tracking for quiz medical safety services.
 * Used to establish performance baselines and detect regressions.
 *
 * Features:
 * - Operation timing with thresholds
 * - Performance baseline tracking
 * - Optimization recommendations
 */

/**
 * Performance thresholds for quiz operations (in milliseconds)
 */
export const PERFORMANCE_THRESHOLDS = {
  // Risk detection should be fast as it's synchronous
  riskDetection: {
    good: 50, // < 50ms is good
    acceptable: 100, // < 100ms is acceptable
    warning: 200, // > 200ms needs attention
  },

  // Sport exclusion is simple logic
  sportExclusion: {
    good: 10,
    acceptable: 25,
    warning: 50,
  },

  // AI generation can be slow due to API calls
  aiGeneration: {
    good: 2000, // < 2s with cache miss
    acceptable: 5000, // < 5s is acceptable
    warning: 10000, // > 10s needs attention
  },

  // Full analysis includes all steps
  fullAnalysis: {
    good: 3000, // < 3s total
    acceptable: 7000, // < 7s is acceptable
    warning: 15000, // > 15s needs attention
  },

  // Keyword matching in risk detection
  keywordMatching: {
    good: 5, // < 5ms per text field
    acceptable: 15, // < 15ms is acceptable
    warning: 30, // > 30ms needs optimization
  },
} as const;

/**
 * Performance rating
 */
export type PerformanceRating = "good" | "acceptable" | "warning" | "critical";

/**
 * Performance measurement result
 */
export interface PerformanceMeasurement {
  operation: string;
  durationMs: number;
  rating: PerformanceRating;
  threshold: {
    good: number;
    acceptable: number;
    warning: number;
  };
  recommendation?: string;
}

/**
 * Get performance rating based on duration and thresholds
 */
function getRating(
  durationMs: number,
  thresholds: { good: number; acceptable: number; warning: number }
): PerformanceRating {
  if (durationMs <= thresholds.good) return "good";
  if (durationMs <= thresholds.acceptable) return "acceptable";
  if (durationMs <= thresholds.warning) return "warning";
  return "critical";
}

/**
 * Get optimization recommendation based on operation and duration
 */
function getRecommendation(operation: string, rating: PerformanceRating): string | undefined {
  if (rating === "good" || rating === "acceptable") {
    return undefined;
  }

  const recommendations: Record<string, string> = {
    riskDetection:
      "Consider caching keyword lists, pre-compiling regex patterns, or reducing text analysis scope",
    sportExclusion: "Review category lookup logic, consider using a Map for O(1) lookups",
    aiGeneration:
      "Implement caching, use streaming responses, or consider edge caching for common queries",
    fullAnalysis: "Profile individual operations to identify bottlenecks",
    keywordMatching:
      "Use pre-compiled patterns, consider Aho-Corasick algorithm for multiple keyword matching",
  };

  return recommendations[operation];
}

/**
 * Measure operation performance
 */
export function measurePerformance(
  operation: keyof typeof PERFORMANCE_THRESHOLDS,
  durationMs: number
): PerformanceMeasurement {
  const thresholds = PERFORMANCE_THRESHOLDS[operation];
  const rating = getRating(durationMs, thresholds);
  const recommendation = getRecommendation(operation, rating);

  return {
    operation,
    durationMs,
    rating,
    threshold: thresholds,
    recommendation,
  };
}

/**
 * Performance baseline data
 */
export interface PerformanceBaseline {
  operation: string;
  sampleCount: number;
  avgMs: number;
  minMs: number;
  maxMs: number;
  p50Ms: number;
  p95Ms: number;
  p99Ms: number;
  lastUpdated: string;
}

/**
 * Calculate percentile from sorted array
 */
function percentile(sortedArr: number[], p: number): number {
  if (sortedArr.length === 0) return 0;
  const index = Math.ceil((p / 100) * sortedArr.length) - 1;
  return sortedArr[Math.max(0, index)];
}

/**
 * Calculate baseline statistics from measurements
 */
export function calculateBaseline(operation: string, measurements: number[]): PerformanceBaseline {
  if (measurements.length === 0) {
    return {
      operation,
      sampleCount: 0,
      avgMs: 0,
      minMs: 0,
      maxMs: 0,
      p50Ms: 0,
      p95Ms: 0,
      p99Ms: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  const sorted = [...measurements].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);

  return {
    operation,
    sampleCount: sorted.length,
    avgMs: Math.round(sum / sorted.length),
    minMs: sorted[0],
    maxMs: sorted[sorted.length - 1],
    p50Ms: percentile(sorted, 50),
    p95Ms: percentile(sorted, 95),
    p99Ms: percentile(sorted, 99),
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * In-memory performance collector for development/testing
 */
class PerformanceCollector {
  private measurements: Map<string, number[]> = new Map();
  private maxSamples = 1000;

  /**
   * Record a measurement
   */
  record(operation: string, durationMs: number): void {
    if (!this.measurements.has(operation)) {
      this.measurements.set(operation, []);
    }

    const samples = this.measurements.get(operation)!;
    samples.push(durationMs);

    // Keep only last N samples
    if (samples.length > this.maxSamples) {
      samples.shift();
    }
  }

  /**
   * Get baseline for an operation
   */
  getBaseline(operation: string): PerformanceBaseline {
    const measurements = this.measurements.get(operation) ?? [];
    return calculateBaseline(operation, measurements);
  }

  /**
   * Get all baselines
   */
  getAllBaselines(): PerformanceBaseline[] {
    const baselines: PerformanceBaseline[] = [];
    for (const [operation, measurements] of this.measurements) {
      baselines.push(calculateBaseline(operation, measurements));
    }
    return baselines;
  }

  /**
   * Clear all measurements
   */
  clear(): void {
    this.measurements.clear();
  }

  /**
   * Get raw measurements for an operation
   */
  getMeasurements(operation: string): number[] {
    return this.measurements.get(operation) ?? [];
  }
}

/**
 * Global performance collector instance
 */
export const performanceCollector = new PerformanceCollector();

/**
 * Time an async operation and record performance
 */
export async function timeOperation<T>(
  operation: keyof typeof PERFORMANCE_THRESHOLDS,
  fn: () => Promise<T>
): Promise<{ result: T; measurement: PerformanceMeasurement }> {
  const start = performance.now();
  const result = await fn();
  const durationMs = Math.round(performance.now() - start);

  performanceCollector.record(operation, durationMs);
  const measurement = measurePerformance(operation, durationMs);

  return { result, measurement };
}

/**
 * Time a sync operation and record performance
 */
export function timeOperationSync<T>(
  operation: keyof typeof PERFORMANCE_THRESHOLDS,
  fn: () => T
): { result: T; measurement: PerformanceMeasurement } {
  const start = performance.now();
  const result = fn();
  const durationMs = Math.round(performance.now() - start);

  performanceCollector.record(operation, durationMs);
  const measurement = measurePerformance(operation, durationMs);

  return { result, measurement };
}

/**
 * Generate performance report
 */
export function generatePerformanceReport(): string {
  const baselines = performanceCollector.getAllBaselines();

  if (baselines.length === 0) {
    return "No performance data collected yet.";
  }

  const lines: string[] = [
    "# Quiz Medical Safety - Performance Report",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Operation Baselines",
    "",
    "| Operation | Samples | Avg (ms) | P50 | P95 | P99 | Min | Max |",
    "|-----------|---------|----------|-----|-----|-----|-----|-----|",
  ];

  for (const baseline of baselines) {
    lines.push(
      `| ${baseline.operation} | ${baseline.sampleCount} | ${baseline.avgMs} | ${baseline.p50Ms} | ${baseline.p95Ms} | ${baseline.p99Ms} | ${baseline.minMs} | ${baseline.maxMs} |`
    );
  }

  lines.push("");
  lines.push("## Threshold Comparison");
  lines.push("");

  for (const baseline of baselines) {
    const thresholds =
      PERFORMANCE_THRESHOLDS[baseline.operation as keyof typeof PERFORMANCE_THRESHOLDS];
    if (thresholds) {
      const rating = getRating(baseline.p95Ms, thresholds);
      const emoji =
        rating === "good"
          ? "✅"
          : rating === "acceptable"
            ? "⚡"
            : rating === "warning"
              ? "⚠️"
              : "🔴";
      lines.push(`${emoji} **${baseline.operation}**: P95=${baseline.p95Ms}ms (${rating})`);

      if (rating === "warning" || rating === "critical") {
        const rec = getRecommendation(baseline.operation, rating);
        if (rec) {
          lines.push(`   - Recommendation: ${rec}`);
        }
      }
    }
  }

  return lines.join("\n");
}
