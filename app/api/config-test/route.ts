import { get } from "@vercel/edge-config";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const checkedAt = new Date().toISOString();

  try {
    // Use a harmless marker value in the test Global Config Store.
    const value = await get("security_test");

    return NextResponse.json(
      {
        success: true,
        checkedAt,
        key: "security_test",
        valueFound: value !== undefined,
        // The test value is deliberately returned so you can compare
        // the before/after result. Never use a real secret as this value.
        value: value ?? null,
      },
      { status: 200, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        checkedAt,
        key: "security_test",
        error: message,
      },
      { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
