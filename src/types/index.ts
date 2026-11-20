import { SwipeDirection } from "@/lib/constants";

export interface PublicProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  occupation: string;
  interests: string[];
  photos: string[];
}

export interface SwipeRequestPayload {
  swipedId: string;
  direction: SwipeDirection;
}

export interface SwipeResult {
  isMatch: boolean;
  matchedUser: PublicProfile | null;
}

export interface MatchItem {
  matchId: string;
  matchedAt: string;
  user: PublicProfile;
}