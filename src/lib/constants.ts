export const DEMO_USER_ID = "demo-user-001";

export const SWIPE_DIRECTION = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
} as const;

export type SwipeDirection = (typeof SWIPE_DIRECTION)[keyof typeof SWIPE_DIRECTION];