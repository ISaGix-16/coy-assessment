"use client";

import { Heart, X } from "lucide-react";
import { SWIPE_DIRECTION, SwipeDirection } from "@/lib/constants";

interface ActionButtonsProps {
  disabled: boolean;
  onSwipe: (direction: SwipeDirection) => void;
}

export function ActionButtons({ disabled, onSwipe }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-6 py-4">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSwipe(SWIPE_DIRECTION.LEFT)}
        aria-label="Pass"
        className="coy-btn-shadow flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-950 bg-white text-neutral-950 transition hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40">
        <X className="h-6 w-6 stroke-[2.75]" />
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onSwipe(SWIPE_DIRECTION.RIGHT)}
        aria-label="Like"
        className="coy-btn-shadow flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-950 bg-[#FF3B7F] text-neutral-950 transition hover:brightness-105 disabled:pointer-events-none disabled:opacity-40">
        <Heart className="h-6 w-6 fill-neutral-950 stroke-neutral-950 stroke-2" />
      </button>
    </div>
  );
}
