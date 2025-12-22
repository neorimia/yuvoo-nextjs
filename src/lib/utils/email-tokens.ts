/**
 * Email Token Utilities
 *
 * Secure token generation and validation for email-based actions
 * (unsubscription, email preferences, etc.)
 */

import { createHash, randomBytes } from "crypto";

/**
 * Generate a secure token for email actions
 *
 * @param email - User email address
 * @param secret - Secret key (from environment or default)
 * @returns Secure token string
 */
export function generateEmailToken(email: string, secret?: string): string {
  const secretKey =
    secret || process.env.EMAIL_TOKEN_SECRET || "default-secret-change-in-production";
  const random = randomBytes(32).toString("hex");
  const timestamp = Date.now().toString();
  const data = `${email}:${timestamp}:${random}`;

  // Create HMAC hash
  const hash = createHash("sha256").update(`${data}:${secretKey}`).digest("hex");

  // Combine: base64 encoded data + hash
  const tokenData = Buffer.from(`${data}:${hash}`).toString("base64url");

  return tokenData;
}

/**
 * Verify and extract email from token
 *
 * @param token - Token to verify
 * @param maxAge - Maximum age in milliseconds (default: 30 days)
 * @param secret - Secret key (from environment or default)
 * @returns Email address if token is valid, null otherwise
 */
export function verifyEmailToken(
  token: string,
  maxAge: number = 30 * 24 * 60 * 60 * 1000, // 30 days
  secret?: string
): string | null {
  try {
    const secretKey =
      secret || process.env.EMAIL_TOKEN_SECRET || "default-secret-change-in-production";

    // Decode token
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const [data, hash] = decoded.split(":");

    if (!data || !hash) {
      return null;
    }

    // Verify hash
    const expectedHash = createHash("sha256").update(`${data}:${secretKey}`).digest("hex");

    if (hash !== expectedHash) {
      return null; // Invalid token
    }

    // Extract email and timestamp
    const [email, timestamp] = data.split(":");

    if (!email || !timestamp) {
      return null;
    }

    // Check token age
    const tokenAge = Date.now() - parseInt(timestamp, 10);
    if (tokenAge > maxAge || tokenAge < 0) {
      return null; // Token expired
    }

    return email;
  } catch (error) {
    console.error("[Email Token] Verification error:", error);
    return null;
  }
}

/**
 * Generate unsubscribe URL with token
 *
 * @param email - User email address
 * @param baseUrl - Base URL of the application
 * @returns Unsubscribe URL with token
 */
export function generateUnsubscribeUrl(email: string, baseUrl?: string): string {
  const appUrl = baseUrl || process.env.NEXT_PUBLIC_APP_URL || "https://yuvoo.ro";
  const token = generateEmailToken(email);
  return `${appUrl}/dezabonare?token=${token}`;
}
