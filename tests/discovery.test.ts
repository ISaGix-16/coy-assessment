import { beforeEach, describe, expect, it } from "vitest";
import { seedDatabase } from "../prisma/seed";
import { DEMO_USER_ID, SWIPE_DIRECTION } from "@/lib/constants";
import {
  getFeed,
  getMatches,
  recordSwipe,
} from "@/lib/services/discovery.service";

describe("Coy Discovery & Privacy Guarantees", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  it("returns 32 unswiped profiles and strictly strips all incoming-like metadata", async () => {
    const feed = await getFeed(DEMO_USER_ID);
    expect(feed).toHaveLength(32);

    // For confirming that demo user is not in feed
    expect(feed.some((p) => p.id === DEMO_USER_ID)).toBe(false);

    // Privacy invariant: profiles with incoming likes (profile-001) and without (profile-015) must have identical public keys and zero swipe metadata
    const preLikedProfile = feed.find((p) => p.id === "profile-001")!;
    const unlikedProfile = feed.find((p) => p.id === "profile-015")!;

    const expectedKeys = [
      "id",
      "name",
      "age",
      "bio",
      "location",
      "occupation",
      "interests",
      "photos",
    ].sort();

    expect(Object.keys(preLikedProfile).sort()).toEqual(expectedKeys);
    expect(Object.keys(unlikedProfile).sort()).toEqual(expectedKeys);
    expect("receivedSwipes" in preLikedProfile).toBe(false);
    expect("hasLikedMe" in preLikedProfile).toBe(false);
  });

  it("removes swiped profiles from subsequent feed queries", async () => {
    await recordSwipe(DEMO_USER_ID, "profile-001", SWIPE_DIRECTION.LEFT);
    await recordSwipe(DEMO_USER_ID, "profile-012", SWIPE_DIRECTION.RIGHT);

    const feed = await getFeed(DEMO_USER_ID);
    expect(feed).toHaveLength(30);
    expect(feed.some((p) => p.id === "profile-001")).toBe(false);
    expect(feed.some((p) => p.id === "profile-012")).toBe(false);
  });

  it("does NOT create a match on a one-way RIGHT swipe", async () => {
    // profile-011 has not swiped right on demo-user-001
    const result = await recordSwipe(
      DEMO_USER_ID,
      "profile-011",
      SWIPE_DIRECTION.RIGHT
    );

    expect(result.isMatch).toBe(false);
    expect(result.matchedUser).toBeNull();

    const matches = await getMatches(DEMO_USER_ID);
    expect(matches).toHaveLength(0);
  });

  it("creates a confirmed mutual match ONLY when both users swipe RIGHT", async () => {
    // profile-001 pre-swiped RIGHT on demo-user-001 during seeding
    const result = await recordSwipe(
      DEMO_USER_ID,
      "profile-001",
      SWIPE_DIRECTION.RIGHT
    );

    expect(result.isMatch).toBe(true);
    expect(result.matchedUser?.id).toBe("profile-001");
    expect(result.matchedUser?.name).toBe("Aanya Sharma");

    const matches = await getMatches(DEMO_USER_ID);
    expect(matches).toHaveLength(1);
    expect(matches[0].user.id).toBe("profile-001");
  });

  it("prevents duplicate Match records if recordSwipe is called multiple times", async () => {
    await recordSwipe(DEMO_USER_ID, "profile-002", SWIPE_DIRECTION.RIGHT);
    await recordSwipe(DEMO_USER_ID, "profile-002", SWIPE_DIRECTION.RIGHT);

    const matches = await getMatches(DEMO_USER_ID);
    expect(matches).toHaveLength(1);
  });
});