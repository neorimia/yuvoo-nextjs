/**
 * Performance Monitor Service Tests
 *
 * Tests for performance baseline tracking and monitoring.
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  measurePerformance,
  calculateBaseline,
  performanceCollector,
  timeOperationSync,
  generatePerformanceReport,
  PERFORMANCE_THRESHOLDS,
} from "../performance-monitor.service";

describe("Performance Monitor", () => {
  beforeEach(() => {
    performanceCollector.clear();
  });

  describe("measurePerformance", () => {
    it("should rate fast operations as good", () => {
      const result = measurePerformance("riskDetection", 30);

      expect(result.rating).toBe("good");
      expect(result.durationMs).toBe(30);
      expect(result.recommendation).toBeUndefined();
    });

    it("should rate acceptable operations correctly", () => {
      const result = measurePerformance("riskDetection", 75);

      expect(result.rating).toBe("acceptable");
      expect(result.recommendation).toBeUndefined();
    });

    it("should rate slow operations as warning with recommendation", () => {
      const result = measurePerformance("riskDetection", 150);

      expect(result.rating).toBe("warning");
      expect(result.recommendation).toBeDefined();
      expect(result.recommendation).toContain("keyword");
    });

    it("should rate very slow operations as critical", () => {
      const result = measurePerformance("riskDetection", 300);

      expect(result.rating).toBe("critical");
      expect(result.recommendation).toBeDefined();
    });

    it("should handle AI generation thresholds", () => {
      // Fast AI response (cached)
      const fast = measurePerformance("aiGeneration", 1500);
      expect(fast.rating).toBe("good");

      // Slow but acceptable
      const slow = measurePerformance("aiGeneration", 4000);
      expect(slow.rating).toBe("acceptable");

      // Very slow
      const verySlow = measurePerformance("aiGeneration", 12000);
      expect(verySlow.rating).toBe("critical");
    });
  });

  describe("calculateBaseline", () => {
    it("should calculate correct statistics", () => {
      const measurements = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      const baseline = calculateBaseline("test", measurements);

      expect(baseline.operation).toBe("test");
      expect(baseline.sampleCount).toBe(10);
      expect(baseline.avgMs).toBe(55);
      expect(baseline.minMs).toBe(10);
      expect(baseline.maxMs).toBe(100);
      expect(baseline.p50Ms).toBe(50);
      expect(baseline.p95Ms).toBe(100);
      expect(baseline.p99Ms).toBe(100);
    });

    it("should handle empty measurements", () => {
      const baseline = calculateBaseline("empty", []);

      expect(baseline.sampleCount).toBe(0);
      expect(baseline.avgMs).toBe(0);
      expect(baseline.p50Ms).toBe(0);
    });

    it("should handle single measurement", () => {
      const baseline = calculateBaseline("single", [42]);

      expect(baseline.sampleCount).toBe(1);
      expect(baseline.avgMs).toBe(42);
      expect(baseline.minMs).toBe(42);
      expect(baseline.maxMs).toBe(42);
      expect(baseline.p50Ms).toBe(42);
    });
  });

  describe("performanceCollector", () => {
    it("should record measurements", () => {
      performanceCollector.record("test", 100);
      performanceCollector.record("test", 200);

      const measurements = performanceCollector.getMeasurements("test");
      expect(measurements).toEqual([100, 200]);
    });

    it("should calculate baseline from recorded data", () => {
      performanceCollector.record("myOp", 10);
      performanceCollector.record("myOp", 20);
      performanceCollector.record("myOp", 30);

      const baseline = performanceCollector.getBaseline("myOp");
      expect(baseline.sampleCount).toBe(3);
      expect(baseline.avgMs).toBe(20);
    });

    it("should return empty baseline for unknown operation", () => {
      const baseline = performanceCollector.getBaseline("unknown");
      expect(baseline.sampleCount).toBe(0);
    });

    it("should get all baselines", () => {
      performanceCollector.record("op1", 10);
      performanceCollector.record("op2", 20);

      const baselines = performanceCollector.getAllBaselines();
      expect(baselines.length).toBe(2);
    });

    it("should clear measurements", () => {
      performanceCollector.record("test", 100);
      performanceCollector.clear();

      const measurements = performanceCollector.getMeasurements("test");
      expect(measurements).toEqual([]);
    });
  });

  describe("timeOperationSync", () => {
    it("should time synchronous operations", () => {
      const { result, measurement } = timeOperationSync("sportExclusion", () => {
        // Simulate some work
        let sum = 0;
        for (let i = 0; i < 1000; i++) sum += i;
        return sum;
      });

      expect(result).toBe(499500);
      expect(measurement.operation).toBe("sportExclusion");
      expect(measurement.durationMs).toBeGreaterThanOrEqual(0);
    });

    it("should record to collector", () => {
      timeOperationSync("sportExclusion", () => 42);

      const measurements = performanceCollector.getMeasurements("sportExclusion");
      expect(measurements.length).toBe(1);
    });
  });

  describe("generatePerformanceReport", () => {
    it("should generate empty report when no data", () => {
      const report = generatePerformanceReport();
      expect(report).toContain("No performance data");
    });

    it("should generate report with data", () => {
      performanceCollector.record("riskDetection", 30);
      performanceCollector.record("riskDetection", 40);
      performanceCollector.record("sportExclusion", 5);

      const report = generatePerformanceReport();

      expect(report).toContain("Performance Report");
      expect(report).toContain("riskDetection");
      expect(report).toContain("sportExclusion");
      expect(report).toContain("| Operation");
    });

    it("should include recommendations for slow operations", () => {
      // Record many slow operations to get P95 above threshold
      for (let i = 0; i < 100; i++) {
        performanceCollector.record("riskDetection", 250);
      }

      const report = generatePerformanceReport();

      // 250ms is above the warning threshold (200ms), so it's critical
      expect(report).toMatch(/warning|critical/);
      expect(report).toContain("Recommendation");
    });
  });

  describe("threshold values", () => {
    it("should have sensible thresholds for all operations", () => {
      // Verify threshold hierarchy is correct
      for (const [_op, thresholds] of Object.entries(PERFORMANCE_THRESHOLDS)) {
        expect(thresholds.good).toBeLessThan(thresholds.acceptable);
        expect(thresholds.acceptable).toBeLessThan(thresholds.warning);
      }
    });

    it("should have thresholds for all main operations", () => {
      expect(PERFORMANCE_THRESHOLDS.riskDetection).toBeDefined();
      expect(PERFORMANCE_THRESHOLDS.sportExclusion).toBeDefined();
      expect(PERFORMANCE_THRESHOLDS.aiGeneration).toBeDefined();
      expect(PERFORMANCE_THRESHOLDS.fullAnalysis).toBeDefined();
      expect(PERFORMANCE_THRESHOLDS.keywordMatching).toBeDefined();
    });
  });
});
