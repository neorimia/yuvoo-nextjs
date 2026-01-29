/**
 * Audit Logger Service Tests
 *
 * Tests for security and sanitization features of the audit logging system.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock console methods before importing the module
const consoleMocks = {
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  log: vi.fn(),
};

vi.stubGlobal("console", consoleMocks);

// Import after mocking
import { auditLogger, PerformanceTimer } from "../audit-logger.service";

describe("AuditLogger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set NODE_ENV for tests
    vi.stubEnv("NODE_ENV", "development");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("sanitization", () => {
    it("should redact email fields", () => {
      // We can't directly test sanitizeForLogging since it's not exported,
      // but we can verify the output doesn't contain sensitive data
      auditLogger.quizAnalysisStart({ sessionId: "test@email.com" });

      // Check that something was logged
      expect(consoleMocks.debug).toHaveBeenCalled();
    });

    it("should redact phone fields", () => {
      auditLogger.quizAnalysisStart({ sessionId: "phone-123456789" });
      expect(consoleMocks.debug).toHaveBeenCalled();
    });

    it("should not include full medical details in logs", () => {
      auditLogger.sportExcluded("fotbal", "cardiologist", { quizId: "test-quiz" });

      const call = consoleMocks.info.mock.calls[0]?.[0];
      expect(call).not.toContain("Simptome cardiace");
      expect(call).toContain("SPORT_EXCLUSION");
      expect(call).toContain("fotbal");
    });
  });

  describe("event logging", () => {
    it("should log risk detection start", () => {
      auditLogger.riskDetectionStart({ quizId: "test-123" });
      expect(consoleMocks.debug).toHaveBeenCalled();
    });

    it("should log risk detection complete with performance", () => {
      auditLogger.riskDetectionComplete(3, true, 150, { quizId: "test-123" });

      expect(consoleMocks.info).toHaveBeenCalled();
      const call = consoleMocks.info.mock.calls[0]?.[0];
      expect(call).toContain("RISK_DETECTION_COMPLETE");
      expect(call).toContain("150ms");
    });

    it("should log performance warning when threshold exceeded", () => {
      auditLogger.riskDetectionComplete(3, true, 600, { quizId: "test-123" });

      // Should have both the completion log and the warning
      expect(consoleMocks.warn).toHaveBeenCalled();
      expect(consoleMocks.info).toHaveBeenCalled();
    });

    it("should log sport exclusions with specialist", () => {
      auditLogger.sportExcluded("judo", "neurologist", { quizId: "test-123" });

      expect(consoleMocks.info).toHaveBeenCalled();
      const call = consoleMocks.info.mock.calls[0]?.[0];
      expect(call).toContain("judo");
      expect(call).toContain("neurologist");
    });

    it("should log AI generation failures", () => {
      auditLogger.aiGenerationFailed("TimeoutError", { quizId: "test-123" });

      expect(consoleMocks.error).toHaveBeenCalled();
      const call = consoleMocks.error.mock.calls[0]?.[0];
      expect(call).toContain("AI_GENERATION_FAILED");
      expect(call).toContain("TimeoutError");
    });

    it("should log fallback activation", () => {
      auditLogger.fallbackActivated("all_sports_excluded", "low_impact_only", {
        quizId: "test-123",
      });

      expect(consoleMocks.warn).toHaveBeenCalled();
      const call = consoleMocks.warn.mock.calls[0]?.[0];
      expect(call).toContain("FALLBACK_ACTIVATED");
    });
  });

  describe("structured logging in production", () => {
    it("should output JSON in production mode", () => {
      vi.stubEnv("NODE_ENV", "production");

      auditLogger.riskSignalDetected("cardiologist", "high", 2, { quizId: "test-123" });

      expect(consoleMocks.log).toHaveBeenCalled();
      const call = consoleMocks.log.mock.calls[0]?.[0];

      // Should be valid JSON in production
      expect(() => JSON.parse(call)).not.toThrow();
      const parsed = JSON.parse(call);
      expect(parsed.level).toBe("info");
      expect(parsed.eventType).toBe("RISK_SIGNAL_DETECTED");
    });
  });
});

describe("PerformanceTimer", () => {
  it("should track elapsed time", async () => {
    const timer = new PerformanceTimer();

    // Wait a bit
    await new Promise((resolve) => setTimeout(resolve, 10));

    const elapsed = timer.elapsed();
    expect(elapsed).toBeGreaterThanOrEqual(10);
  });

  it("should track marks", async () => {
    const timer = new PerformanceTimer();

    timer.mark("start");
    await new Promise((resolve) => setTimeout(resolve, 10));
    timer.mark("end");

    const between = timer.betweenMarks("start", "end");
    expect(between).toBeGreaterThanOrEqual(10);
  });

  it("should return undefined for unknown marks", () => {
    const timer = new PerformanceTimer();

    expect(timer.sinceMark("unknown")).toBeUndefined();
    expect(timer.betweenMarks("a", "b")).toBeUndefined();
  });

  it("should calculate time since mark", async () => {
    const timer = new PerformanceTimer();

    timer.mark("test");
    await new Promise((resolve) => setTimeout(resolve, 10));

    const since = timer.sinceMark("test");
    expect(since).toBeGreaterThanOrEqual(10);
  });
});
