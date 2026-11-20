"use client";

import { AnimatePresence } from "framer-motion";
import { HeartHandshake, RotateCcw, Sparkles } from "lucide-react";
import { MatchItem, PublicProfile } from "@/types";
import { SwipeDirection } from "@/lib/constants";
import { SwipeCard } from "./SwipeCard";
import { ActionButtons } from "./ActionButtons";

interface DiscoverViewProps {
  profiles: PublicProfile[];
  matches: MatchItem[];
  loading: boolean;
  swiping: boolean;
  resetting: boolean;
  onSwipe: (direction: SwipeDirection) => void;
  onReset: () => void;
  onOpenMatches: () => void;
}

export function DiscoverView({
  profiles,
  matches,
  loading,
  swiping,
  resetting,
  onSwipe,
  onReset,
  onOpenMatches,
}: DiscoverViewProps) {
  const visibleCards = profiles.slice(0, 2);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      {/* Header */}
      <header className="flex h-15 shrink-0 items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl font-black tracking-tight text-neutral-950">
            coy<span className="text-[#FF3B7F]">.</span>
          </span>
          <span className="rounded-full border border-neutral-950 bg-[#EDE9FE] px-2.5 py-0.5 text-[11px] font-bold text-neutral-950">
            Discover
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenMatches}
          className="coy-btn-shadow flex items-center gap-1.5 rounded-full border-2 border-neutral-950 bg-white px-3.5 py-1.5 text-xs font-bold text-neutral-950 transition hover:bg-neutral-50">
          <HeartHandshake className="h-4 w-4 text-[#FF3B7F]" />
          <span>Matches</span>
          <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF3B7F] px-1 text-[10px] font-extrabold text-white">
            {matches.length}
          </span>
        </button>
      </header>

      {/* Container with cards */}
      <div className="relative mx-4 flex-1">
        {loading ? (
          <div className="coy-card-shadow flex h-full w-full animate-pulse flex-col justify-end rounded-3xl border-2 border-neutral-950 bg-[#EDE9FE]/50 p-6">
            <div className="h-6 w-40 rounded-lg bg-neutral-300" />
            <div className="mt-2 h-4 w-28 rounded-lg bg-neutral-300" />
            <div className="mt-4 h-12 w-full rounded-lg bg-neutral-300" />
          </div>
        ) : visibleCards.length > 0 ? (
          <AnimatePresence>
            {[...visibleCards].reverse().map((profile, idx) => {
              const isTop = idx === visibleCards.length - 1;
              return (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  isTop={isTop}
                  onSwipe={onSwipe}
                />
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="coy-card-shadow flex h-full flex-col items-center justify-center rounded-3xl border-2 border-neutral-950 bg-[#EDE9FE]/40 px-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-neutral-950 bg-[#FFE4EC] text-[#FF3B7F]">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-neutral-950">
              You&apos;re all caught up
            </h2>
            <p className="mt-1.5 text-sm text-neutral-600">
              You&apos;ve seen everyone in your circle. Reset the demo deck to
              test swiping and mutual matches again.
            </p>
            <button
              type="button"
              disabled={resetting}
              onClick={onReset}
              className="coy-btn-shadow mt-5 inline-flex items-center gap-2 rounded-full border-2 border-neutral-950 bg-[#FF3B7F] px-5 py-2.5 text-xs font-extrabold text-neutral-950 transition hover:brightness-105 disabled:opacity-50">
              <RotateCcw
                className={`h-3.5 w-3.5 ${resetting ? "animate-spin" : ""}`}
              />
              <span>{resetting ? "Resetting..." : "Reset Demo Deck"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Action buttons for swipe */}
      <ActionButtons
        disabled={loading || swiping || visibleCards.length === 0}
        onSwipe={onSwipe}
      />
    </div>
  );
}
