import { NextResponse } from "next/server";
import { DEMO_USER_ID } from "@/lib/constants";
import { getMatches } from "@/lib/services/discovery.service";

export async function GET() {
  try {
    const matches = await getMatches(DEMO_USER_ID);
    return NextResponse.json({ matches }, { status: 200 });
  } catch (error) {
    console.error("GET /api/matches error:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 },
    );
  }
}
