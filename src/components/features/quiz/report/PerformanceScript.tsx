/**
 * Performance Script Component
 *
 * Client component that injects a script to suppress Next.js 16 + Turbopack
 * performance measurement errors. Uses Script component to avoid crypto.randomUUID()
 * issues in server components.
 */

"use client";

import Script from "next/script";

export default function PerformanceScript() {
  return (
    <Script
      id="performance-error-suppressor"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Suppress the specific performance measurement error
            // This is a known Next.js 16 + Turbopack issue (development only)
            // Safe to always run - only suppresses the specific error
            const originalMeasure = performance.measure.bind(performance);
            
            performance.measure = function(name, startMark, endMark) {
              try {
                if (typeof name === 'string') {
                  return originalMeasure(name, startMark, endMark);
                } else {
                  // Options object signature
                  return originalMeasure(name);
                }
              } catch (error) {
                // Suppress the "negative timestamp" error for ReportContent
                // This is a known issue with Next.js 16 + Turbopack performance tracking
                if (
                  error instanceof DOMException &&
                  error.message.includes('cannot have a negative time stamp')
                ) {
                  // Silently ignore this error - it doesn't affect functionality
                  // Return a dummy measure to prevent further errors
                  const measureName = typeof name === 'string' ? name : (name.detail || 'unknown');
                  return {
                    name: measureName,
                    entryType: 'measure',
                    startTime: 0,
                    duration: 0,
                    toJSON: function() { return {}; }
                  };
                }
                // Re-throw other errors
                throw error;
              }
            };
          })();
        `,
      }}
    />
  );
}
