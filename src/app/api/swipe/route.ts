import { NextRequest, NextResponse } from "next/server";
import { DEMO_USER_ID, SWIPE_DIRECTION, SwipeDirection } from "@/lib/constants";
import { recordSwipe } from "@/lib/services/discovery.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { swipedId, direction } = body ?? {};

    if (!swipedId || typeof swipedId !== "string") {
      return NextResponse.json(
        { error: "Valid swipedId is required" },
        { status: 400 },
      );
    }

    if (
      direction !== SWIPE_DIRECTION.LEFT &&
      direction !== SWIPE_DIRECTION.RIGHT
    ) {
      return NextResponse.json(
        { error: "direction must be 'LEFT' or 'RIGHT'" },
        { status: 400 },
      );
    }

    const result = await recordSwipe(
      DEMO_USER_ID,
      swipedId,
      direction as SwipeDirection,
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("POST /api/swipe error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to record swipe";
    const status = message === "Target user not found." ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
