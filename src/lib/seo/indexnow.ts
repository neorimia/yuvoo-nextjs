/**
 * IndexNow protocol — notify Bing, Yandex, and partners of URL changes.
 * @see https://www.indexnow.org/documentation
 */

import { getSiteUrl } from "@/lib/seo/site-url";
import { getIndexNowKey, getIndexNowKeyLocation } from "@/lib/seo/indexnow-key";

const INDEXNOW_API = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10_000;

export interface IndexNowSubmitResult {
  submitted: number;
  chunks: number;
  status?: number;
  ok: boolean;
  error?: string;
}

function normalizeAbsoluteUrl(url: string, baseUrl: string): string | null {
  try {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    const path = url.startsWith("/") ? url : `/${url}`;
    return new URL(path, baseUrl).toString();
  } catch {
    return null;
  }
}

/**
 * Submit URL list to IndexNow (batch, chunked).
 */
export async function submitIndexNow(urls: string[]): Promise<IndexNowSubmitResult> {
  const baseUrl = getSiteUrl();
  const key = getIndexNowKey();
  const host = new URL(baseUrl).host;
  const keyLocation = getIndexNowKeyLocation(baseUrl);

  const uniqueUrls = [
    ...new Set(
      urls.map((u) => normalizeAbsoluteUrl(u, baseUrl)).filter((u): u is string => Boolean(u))
    ),
  ];

  if (uniqueUrls.length === 0) {
    return { submitted: 0, chunks: 0, ok: true };
  }

  const chunks: string[][] = [];
  for (let i = 0; i < uniqueUrls.length; i += MAX_URLS_PER_REQUEST) {
    chunks.push(uniqueUrls.slice(i, i + MAX_URLS_PER_REQUEST));
  }

  let lastStatus: number | undefined;
  let lastError: string | undefined;

  for (const urlList of chunks) {
    try {
      const response = await fetch(INDEXNOW_API, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host, key, keyLocation, urlList }),
      });

      lastStatus = response.status;

      if (!response.ok && response.status !== 202) {
        const body = await response.text().catch(() => "");
        lastError = `IndexNow HTTP ${response.status}${body ? `: ${body.slice(0, 200)}` : ""}`;
        console.error("[IndexNow]", lastError);
        return {
          submitted: uniqueUrls.length,
          chunks: chunks.length,
          status: lastStatus,
          ok: false,
          error: lastError,
        };
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : "IndexNow request failed";
      console.error("[IndexNow]", lastError);
      return {
        submitted: uniqueUrls.length,
        chunks: chunks.length,
        ok: false,
        error: lastError,
      };
    }
  }

  console.log(`[IndexNow] Submitted ${uniqueUrls.length} URL(s) in ${chunks.length} chunk(s)`);

  return {
    submitted: uniqueUrls.length,
    chunks: chunks.length,
    status: lastStatus,
    ok: true,
  };
}

/**
 * Fire-and-forget IndexNow ping (mutations must not fail if ping fails).
 */
export function pingIndexNow(urls: string[]): void {
  void submitIndexNow(urls).catch((error) => {
    console.error("[IndexNow] Background ping failed:", error);
  });
}
