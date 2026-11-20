import { prisma } from "@/lib/prisma";
import { SWIPE_DIRECTION, SwipeDirection } from "@/lib/constants";
import { MatchItem, PublicProfile, SwipeResult } from "@/types";

function toPublicProfile(user: {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  occupation: string;
  interests: string;
  photos: string;
}): PublicProfile {
  return {
    id: user.id,
    name: user.name,
    age: user.age,
    bio: user.bio,
    location: user.location,
    occupation: user.occupation,
    interests: JSON.parse(user.interests) as string[],
    photos: JSON.parse(user.photos) as string[],
  };
}

/* Returns unswiped (`public`) profiles for the given user and never join or exposes incoming swipe records(`receivedSwipes`)*/

export async function getFeed(userId: string): Promise<PublicProfile[]> {
  const existingSwipes = await prisma.swipe.findMany({
    where: { swiperId: userId },
    select: { swipedId: true },
  });

  const excludedIds = [userId, ...existingSwipes.map((s) => s.swipedId)];

  const candidates = await prisma.user.findMany({
    where: {
      id: { notIn: excludedIds },
    },
    select: {
      id: true,
      name: true,
      age: true,
      bio: true,
      location: true,
      occupation: true,
      interests: true,
      photos: true,
    },
    orderBy: { id: "asc" },
  });

  return candidates.map(toPublicProfile);
}

/* Records a LEFT or RIGHT swipe and checks for a mutual match*/

export async function recordSwipe(
  swiperId: string,
  swipedId: string,
  direction: SwipeDirection,
): Promise<SwipeResult> {
  if (swiperId === swipedId) {
    throw new Error("Users cannot swipe on themselves.");
  }

  return prisma.$transaction(async (tx) => {
    const targetUser = await tx.user.findUnique({
      where: { id: swipedId },
      select: {
        id: true,
        name: true,
        age: true,
        bio: true,
        location: true,
        occupation: true,
        interests: true,
        photos: true,
      },
    });

    if (!targetUser) {
      throw new Error("Target user not found.");
    }

    await tx.swipe.upsert({
      where: {
        swiperId_swipedId: { swiperId, swipedId },
      },
      update: { direction },
      create: { swiperId, swipedId, direction },
    });

    if (direction !== SWIPE_DIRECTION.RIGHT) {
      return { isMatch: false, matchedUser: null };
    }

    const reciprocalLike = await tx.swipe.findUnique({
      where: {
        swiperId_swipedId: {
          swiperId: swipedId,
          swipedId: swiperId,
        },
      },
      select: { direction: true },
    });

    if (reciprocalLike?.direction !== SWIPE_DIRECTION.RIGHT) {
      return { isMatch: false, matchedUser: null };
    }

    const [user1Id, user2Id] = [swiperId, swipedId].sort();

    await tx.match.upsert({
      where: {
        user1Id_user2Id: { user1Id, user2Id },
      },
      update: {},
      create: { user1Id, user2Id },
    });

    return {
      isMatch: true,
      matchedUser: toPublicProfile(targetUser),
    };
  });
}

/* Returns all confirmed mutual matches for the given user.*/

export async function getMatches(userId: string): Promise<MatchItem[]> {
  const matches = await prisma.match.findMany({
    where: {
      OR: [{ user1Id: userId }, { user2Id: userId }],
    },
    include: {
      user1: {
        select: {
          id: true,
          name: true,
          age: true,
          bio: true,
          location: true,
          occupation: true,
          interests: true,
          photos: true,
        },
      },
      user2: {
        select: {
          id: true,
          name: true,
          age: true,
          bio: true,
          location: true,
          occupation: true,
          interests: true,
          photos: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return matches.map((m) => {
    const otherUser = m.user1Id === userId ? m.user2 : m.user1;
    return {
      matchId: m.id,
      matchedAt: m.createdAt.toISOString(),
      user: toPublicProfile(otherUser),
    };
  });
}
