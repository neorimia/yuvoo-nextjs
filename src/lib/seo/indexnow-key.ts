/**
 * IndexNow API key (public verification token).
 * Served at https://yuvoo.ro/{key}.txt — not a secret.
 */
export const INDEXNOW_KEY_FALLBACK = "yuvoo-indexnow-key-2026";

export function getIndexNowKey(): string {
  return process.env.INDEXNOW_KEY?.trim() || INDEXNOW_KEY_FALLBACK;
}

export function getIndexNowKeyLocation(baseUrl: string): string {
  const key = getIndexNowKey();
  return `${baseUrl.replace(/\/$/, "")}/${key}.txt`;
}
