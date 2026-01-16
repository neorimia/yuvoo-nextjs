/**
 * PDF Generation Service
 *
 * Server-side PDF generation using Puppeteer.
 * Generates PDF from report page HTML.
 */

import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import type { QuizResult, QuizAnswers } from "@/modules/quiz/quiz.types";

/**
 * Get the appropriate Puppeteer instance based on environment
 *
 * In development, uses full puppeteer (includes Chromium).
 * In production, uses puppeteer-core with @sparticuz/chromium.
 */
function getPuppeteerInstance() {
  if (process.env.NODE_ENV === "development") {
    // Use full puppeteer in development (includes Chromium)
    return puppeteer;
  }
  // Use puppeteer-core in production (with @sparticuz/chromium)
  return puppeteerCore;
}

/**
 * Get browser executable path
 *
 * Returns the appropriate Chromium executable based on environment.
 * Only needed for puppeteer-core (production).
 */
async function getBrowserExecutablePath(): Promise<string | undefined> {
  // In development, full puppeteer includes Chromium, so no path needed
  if (process.env.NODE_ENV === "development") {
    return undefined;
  }

  // In production/serverless, use @sparticuz/chromium
  return process.env.CHROMIUM_PATH || (await chromium.executablePath());
}

/**
 * Generate PDF from report data
 *
 * Creates a PDF buffer from the report page HTML.
 * Uses Puppeteer to render the page and generate PDF.
 *
 * @param quizResult - Quiz result with recommendations
 * @param quizAnswers - Quiz answers (for age guidance)
 * @param accessToken - Access token for report URL
 * @returns PDF buffer
 */
export async function generateReportPDF(
  quizResult: QuizResult,
  quizAnswers: QuizAnswers | null,
  accessToken: string
): Promise<Buffer> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const reportUrl = `${baseUrl}/chestionar/raport/${accessToken}?pdf=true`;

  let browser;

  try {
    // Get the appropriate Puppeteer instance
    const puppeteerInstance = getPuppeteerInstance();

    // Launch browser
    const executablePath = await getBrowserExecutablePath();

    const launchOptions: Parameters<typeof puppeteerInstance.launch>[0] = {
      headless: true,
      args: process.env.NODE_ENV === "production" ? chromium.args : [],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      ...(process.env.NODE_ENV === "production" && {
        ignoreHTTPSErrors: true,
      }),
    };

    // Only set executablePath if we have one (production with puppeteer-core)
    if (executablePath) {
      launchOptions.executablePath = executablePath;
    }

    browser = await puppeteerInstance.launch(launchOptions);

    // Create new page
    const page = await browser.newPage();

    // Navigate to report page with PDF parameter
    // Use "domcontentloaded" instead of "networkidle0" for faster loading
    await page.goto(reportUrl, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Wait for content to load (with shorter timeout for better performance)
    await page.waitForSelector(".report-section", { timeout: 5000 });

    // Additional wait for fonts and images to load (if needed)
    // Note: Puppeteer doesn't have waitForLoadState, so we use a small delay
    // or wait for specific elements
    try {
      await page.waitForFunction(() => document.readyState === "complete", { timeout: 5000 });
    } catch {
      // Continue if timeout - content is likely loaded
    }

    // Generate PDF with optimized settings
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm",
      },
      preferCSSPageSize: true,
      // Optimize for faster generation
      displayHeaderFooter: false,
      scale: 1.0,
    });

    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("[PDF Generation] Error generating PDF:", error);
    throw new Error("Eroare la generarea PDF-ului. Te rugăm să încerci din nou.");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Generate PDF from HTML string (alternative method)
 *
 * Creates a PDF buffer from HTML string.
 * Useful when we want to generate PDF without navigating to a page.
 *
 * @param html - HTML content to convert to PDF
 * @returns PDF buffer
 */
export async function generatePDFFromHTML(html: string): Promise<Buffer> {
  let browser;

  try {
    // Get the appropriate Puppeteer instance
    const puppeteerInstance = getPuppeteerInstance();

    // Launch browser
    const executablePath = await getBrowserExecutablePath();

    const launchOptions: Parameters<typeof puppeteerInstance.launch>[0] = {
      headless: true,
      args: process.env.NODE_ENV === "production" ? chromium.args : [],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      ...(process.env.NODE_ENV === "production" && {
        ignoreHTTPSErrors: true,
      }),
    };

    // Only set executablePath if we have one (production with puppeteer-core)
    if (executablePath) {
      launchOptions.executablePath = executablePath;
    }

    browser = await puppeteerInstance.launch(launchOptions);

    // Create new page
    const page = await browser.newPage();

    // Set content
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    // Generate PDF with optimized settings
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm",
      },
      preferCSSPageSize: true,
      // Optimize for faster generation
      displayHeaderFooter: false,
      scale: 1.0,
    });

    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("[PDF Generation] Error generating PDF from HTML:", error);
    throw new Error("Eroare la generarea PDF-ului. Te rugăm să încerci din nou.");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
