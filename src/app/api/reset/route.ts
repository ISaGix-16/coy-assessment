import { NextResponse } from "next/server";
import { seedDatabase } from "../../../../prisma/seed";

export async function POST() {
  try {
    await seedDatabase();
    return NextResponse.json(
      { message: "Demo database reset successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST /api/reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset demo database" },
      { status: 500 },
    );
  }
}
