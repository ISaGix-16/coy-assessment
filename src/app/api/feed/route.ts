import { NextResponse } from "next/server";
import { DEMO_USER_ID } from "@/lib/constants";
import { getFeed } from "@/lib/services/discovery.service";

export async function GET() {
  try {
    const profiles = await getFeed(DEMO_USER_ID);
    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error) {
    console.error("GET /api/feed error:", error);
    return NextResponse.json(
      { error: "Failed to fetch discovery feed" },
      { status: 500 },
    );
  }
}
