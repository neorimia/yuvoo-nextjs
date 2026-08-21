/**
 * Daily IndexNow cron — ping Bing/Yandex with recently modified URLs.
 * Route: /api/cron/indexnow
 * Security: CRON_SECRET bearer token (same as other cron routes)
 */

import { NextRequest, NextResponse } from "next/server";
import { submitIndexNow } from "@/lib/seo/indexnow";
import { getRecentlyModifiedUrls } from "@/lib/seo/indexnow-urls";

function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("[Cron IndexNow] CRON_SECRET not set");
    return false;
  }

  return authHeader === `Bearer ${cronSecret}`;
}

export async function POST(request: NextRequest) {
  try {
    if (!verifyCronSecret(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const urls = await getRecentlyModifiedUrls(48);
    const result = await submitIndexNow(urls);

    return NextResponse.json(
      {
        success: result.ok,
        submitted: result.submitted,
        chunks: result.chunks,
        urlCount: urls.length,
        status: result.status,
        error: result.error,
        timestamp: new Date().toISOString(),
      },
      { status: result.ok ? 200 : 502 }
    );
  } catch (error) {
    console.error("[Cron IndexNow] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
