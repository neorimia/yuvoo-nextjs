/**
 * Audit Logger Service for Medical Safety
 *
 * Provides secure audit logging for medical decisions in the quiz system.
 * Logs are sanitized to prevent exposure of PII while maintaining
 * traceability for medical safety compliance.
 *
 * Features:
 * - Sanitized logging (no PII in logs)
 * - Structured audit entries
 * - Performance tracking
 * - Environment-aware logging levels
 */

/**
 * Audit log entry for medical decisions
 */
export interface AuditLogEntry {
  timestamp: string;
  eventType: AuditEventType;
  sessionId?: string;
  quizId?: string;
  details: Record<string, unknown>;
  performanceMs?: number;
}

/**
 * Supported audit event types
 */
export type AuditEventType =
  | "RISK_DETECTION_START"
  | "RISK_DETECTION_COMPLETE"
  | "RISK_SIGNAL_DETECTED"
  | "SPORT_EXCLUSION"
  | "SPORT_ALLOWED_WITH_MODIFICATIONS"
  | "SPECIALIST_RECOMMENDATION"
  | "FALLBACK_ACTIVATED"
  | "AI_GENERATION_START"
  | "AI_GENERATION_COMPLETE"
  | "AI_GENERATION_FAILED"
  | "QUIZ_ANALYSIS_START"
  | "QUIZ_ANALYSIS_COMPLETE"
  | "PERFORMANCE_WARNING";

/**
 * Log levels for different environments
 */
type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Configuration for audit logger
 */
interface AuditLoggerConfig {
  enabled: boolean;
  logLevel: LogLevel;
  includePerformance: boolean;
  performanceThresholdMs: number;
}

/**
 * Get logger configuration based on environment
 */
function getConfig(): AuditLoggerConfig {
  const isDev = process.env.NODE_ENV === "development";
  const isTest = process.env.NODE_ENV === "test";

  return {
    enabled: !isTest, // Disable in tests unless explicitly enabled
    logLevel: isDev ? "debug" : "info",
    includePerformance: true,
    performanceThresholdMs: 500, // Warn if operation takes > 500ms
  };
}

/**
 * Sanitize data to remove PII before logging
 *
 * Removes:
 * - Personal names
 * - Email addresses
 * - Phone numbers
 * - Addresses
 * - Free-text medical details (summarized instead)
 *
 * @param data - Data to sanitize
 * @returns Sanitized data safe for logging
 */
function sanitizeForLogging(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    // Skip sensitive fields entirely
    if (
      key.toLowerCase().includes("email") ||
      key.toLowerCase().includes("phone") ||
      key.toLowerCase().includes("name") ||
      key.toLowerCase().includes("address")
    ) {
      sanitized[key] = "[REDACTED]";
      continue;
    }

    // Summarize free-text fields instead of logging content
    if (key === "physicalConsiderations" && typeof value === "string") {
      sanitized[key] = `[TEXT: ${value.length} chars]`;
      continue;
    }

    // Recursively sanitize nested objects
    if (value && typeof value === "object" && !Array.isArray(value)) {
      sanitized[key] = sanitizeForLogging(value as Record<string, unknown>);
      continue;
    }

    // Arrays: sanitize each element if object
    if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? sanitizeForLogging(item as Record<string, unknown>)
          : item
      );
      continue;
    }

    // Pass through safe values
    sanitized[key] = value;
  }

  return sanitized;
}

/**
 * Format audit log entry for output
 */
function formatLogEntry(entry: AuditLogEntry): string {
  const parts = [
    `[AUDIT:${entry.eventType}]`,
    entry.sessionId ? `session=${entry.sessionId.substring(0, 8)}...` : null,
    entry.quizId ? `quiz=${entry.quizId.substring(0, 8)}...` : null,
    entry.performanceMs !== undefined ? `perf=${entry.performanceMs}ms` : null,
  ].filter(Boolean);

  return `${parts.join(" ")} ${JSON.stringify(entry.details)}`;
}

/**
 * Internal logging function
 */
function logInternal(level: LogLevel, entry: AuditLogEntry): void {
  const config = getConfig();

  if (!config.enabled) return;

  // Check log level
  const levels: LogLevel[] = ["debug", "info", "warn", "error"];
  if (levels.indexOf(level) < levels.indexOf(config.logLevel)) {
    return;
  }

  const formatted = formatLogEntry(entry);

  switch (level) {
    case "debug":
      // Use structured logging in production
      if (process.env.NODE_ENV === "production") {
        console.log(JSON.stringify({ level: "debug", ...entry }));
      } else {
        console.debug(formatted);
      }
      break;
    case "info":
      if (process.env.NODE_ENV === "production") {
        console.log(JSON.stringify({ level: "info", ...entry }));
      } else {
        console.info(formatted);
      }
      break;
    case "warn":
      if (process.env.NODE_ENV === "production") {
        console.log(JSON.stringify({ level: "warn", ...entry }));
      } else {
        console.warn(formatted);
      }
      break;
    case "error":
      if (process.env.NODE_ENV === "production") {
        console.log(JSON.stringify({ level: "error", ...entry }));
      } else {
        console.error(formatted);
      }
      break;
  }
}

/**
 * Create an audit log entry
 */
function createEntry(
  eventType: AuditEventType,
  details: Record<string, unknown>,
  options?: {
    sessionId?: string;
    quizId?: string;
    performanceMs?: number;
  }
): AuditLogEntry {
  return {
    timestamp: new Date().toISOString(),
    eventType,
    sessionId: options?.sessionId,
    quizId: options?.quizId,
    details: sanitizeForLogging(details),
    performanceMs: options?.performanceMs,
  };
}

/**
 * Audit Logger API
 */
export const auditLogger = {
  /**
   * Log risk detection start
   */
  riskDetectionStart(options?: { sessionId?: string; quizId?: string }): void {
    const entry = createEntry("RISK_DETECTION_START", {}, options);
    logInternal("debug", entry);
  },

  /**
   * Log risk detection completion
   */
  riskDetectionComplete(
    signalCount: number,
    hasHighRisk: boolean,
    performanceMs: number,
    options?: { sessionId?: string; quizId?: string }
  ): void {
    const config = getConfig();
    const entry = createEntry(
      "RISK_DETECTION_COMPLETE",
      {
        signalCount,
        hasHighRisk,
      },
      { ...options, performanceMs }
    );

    // Warn if performance exceeds threshold
    if (config.includePerformance && performanceMs > config.performanceThresholdMs) {
      logInternal("warn", {
        ...entry,
        eventType: "PERFORMANCE_WARNING",
        details: {
          ...entry.details,
          threshold: config.performanceThresholdMs,
          actual: performanceMs,
          operation: "riskDetection",
        },
      });
    }

    logInternal("info", entry);
  },

  /**
   * Log detected risk signal (sanitized)
   */
  riskSignalDetected(
    specialty: string,
    severity: string,
    indicatorCount: number,
    options?: { sessionId?: string; quizId?: string }
  ): void {
    const entry = createEntry(
      "RISK_SIGNAL_DETECTED",
      {
        specialty,
        severity,
        indicatorCount,
      },
      options
    );
    logInternal("info", entry);
  },

  /**
   * Log sport exclusion (without medical reason details)
   */
  sportExcluded(
    sportId: string,
    requiredSpecialist: string | undefined,
    options?: { sessionId?: string; quizId?: string }
  ): void {
    const entry = createEntry(
      "SPORT_EXCLUSION",
      {
        sportId,
        requiredSpecialist: requiredSpecialist || "none",
      },
      options
    );
    logInternal("info", entry);
  },

  /**
   * Log sport allowed with modifications
   */
  sportAllowedWithModifications(
    sportId: string,
    requiredSpecialist: string | undefined,
    options?: { sessionId?: string; quizId?: string }
  ): void {
    const entry = createEntry(
      "SPORT_ALLOWED_WITH_MODIFICATIONS",
      {
        sportId,
        requiredSpecialist: requiredSpecialist || "none",
      },
      options
    );
    logInternal("info", entry);
  },

  /**
   * Log specialist recommendation
   */
  specialistRecommended(
    specialty: string,
    priority: string | undefined,
    options?: { sessionId?: string; quizId?: string }
  ): void {
    const entry = createEntry(
      "SPECIALIST_RECOMMENDATION",
      {
        specialty,
        priority: priority ?? "medium", // Default to medium if not specified
      },
      options
    );
    logInternal("info", entry);
  },

  /**
   * Log fallback activation
   */
  fallbackActivated(
    reason: string,
    fallbackType: "age_based" | "low_impact_only",
    options?: { sessionId?: string; quizId?: string }
  ): void {
    const entry = createEntry(
      "FALLBACK_ACTIVATED",
      {
        reason,
        fallbackType,
      },
      options
    );
    logInternal("warn", entry);
  },

  /**
   * Log AI generation start
   */
  aiGenerationStart(options?: { sessionId?: string; quizId?: string }): void {
    const entry = createEntry("AI_GENERATION_START", {}, options);
    logInternal("debug", entry);
  },

  /**
   * Log AI generation completion
   */
  aiGenerationComplete(
    recommendationCount: number,
    cacheHit: boolean,
    performanceMs: number,
    options?: { sessionId?: string; quizId?: string }
  ): void {
    const config = getConfig();
    const entry = createEntry(
      "AI_GENERATION_COMPLETE",
      {
        recommendationCount,
        cacheHit,
      },
      { ...options, performanceMs }
    );

    // Warn if performance exceeds threshold
    if (config.includePerformance && performanceMs > config.performanceThresholdMs * 2) {
      logInternal("warn", {
        ...entry,
        eventType: "PERFORMANCE_WARNING",
        details: {
          ...entry.details,
          threshold: config.performanceThresholdMs * 2,
          actual: performanceMs,
          operation: "aiGeneration",
        },
      });
    }

    logInternal("info", entry);
  },

  /**
   * Log AI generation failure
   */
  aiGenerationFailed(errorType: string, options?: { sessionId?: string; quizId?: string }): void {
    const entry = createEntry(
      "AI_GENERATION_FAILED",
      {
        errorType,
      },
      options
    );
    logInternal("error", entry);
  },

  /**
   * Log quiz analysis start
   */
  quizAnalysisStart(options?: { sessionId?: string; quizId?: string }): void {
    const entry = createEntry("QUIZ_ANALYSIS_START", {}, options);
    logInternal("debug", entry);
  },

  /**
   * Log quiz analysis completion
   */
  quizAnalysisComplete(
    sportCount: number,
    hasSpecialist: boolean,
    excludedCount: number,
    performanceMs: number,
    options?: { sessionId?: string; quizId?: string }
  ): void {
    const config = getConfig();
    const entry = createEntry(
      "QUIZ_ANALYSIS_COMPLETE",
      {
        sportCount,
        hasSpecialist,
        excludedCount,
      },
      { ...options, performanceMs }
    );

    // Warn if performance exceeds threshold
    if (config.includePerformance && performanceMs > config.performanceThresholdMs * 3) {
      logInternal("warn", {
        ...entry,
        eventType: "PERFORMANCE_WARNING",
        details: {
          ...entry.details,
          threshold: config.performanceThresholdMs * 3,
          actual: performanceMs,
          operation: "quizAnalysis",
        },
      });
    }

    logInternal("info", entry);
  },
};

/**
 * Performance timer utility for audit logging
 */
export class PerformanceTimer {
  private startTime: number;
  private marks: Map<string, number> = new Map();

  constructor() {
    this.startTime = performance.now();
  }

  /**
   * Mark a point in time
   */
  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  /**
   * Get elapsed time since start
   */
  elapsed(): number {
    return Math.round(performance.now() - this.startTime);
  }

  /**
   * Get elapsed time since a mark
   */
  sinceMark(name: string): number | undefined {
    const mark = this.marks.get(name);
    if (mark === undefined) return undefined;
    return Math.round(performance.now() - mark);
  }

  /**
   * Get time between two marks
   */
  betweenMarks(start: string, end: string): number | undefined {
    const startMark = this.marks.get(start);
    const endMark = this.marks.get(end);
    if (startMark === undefined || endMark === undefined) return undefined;
    return Math.round(endMark - startMark);
  }
}
