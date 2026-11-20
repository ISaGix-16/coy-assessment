"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, HeartHandshake, MapPin, RotateCcw } from "lucide-react";
import { MatchItem } from "@/types";

interface MatchesListProps {
  open: boolean;
  matches: MatchItem[];
  resetting: boolean;
  onClose: () => void;
  onReset: () => void;
}

export function MatchesList({
  open,
  matches,
  resetting,
  onClose,
  onReset,
}: MatchesListProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed inset-0 z-40 mx-auto flex max-w-md flex-col bg-white">
          {/* Header */}
          <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
            <button
              type="button"
              onClick={onClose}
              aria-label="Back to Discover"
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100">
              <ArrowLeft className="h-5 w-5" />
            </button>

            <h2 className="text-base font-bold text-neutral-900">
              Matches ({matches.length})
            </h2>

            <button
              type="button"
              disabled={resetting}
              onClick={onReset}
              title="Reset demo swipes & matches"
              className="flex items-center gap-1 rounded-full border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-50">
              <RotateCcw
                className={`h-3 w-3 ${resetting ? "animate-spin" : ""}`}
              />
              <span>Reset</span>
            </button>
          </header>

          {/* Container for lists of matches */}
          <div className="flex-1 overflow-y-auto p-4">
            {matches.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-neutral-900">
                  No mutual matches yet
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Swipe right on people in Discover. When the feeling is mutual,
                  they&apos;ll appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {matches.map(({ matchId, matchedAt, user }) => (
                  <div
                    key={matchId}
                    className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-white p-3 shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.photos[0]}
                      alt={user.name}
                      className="h-16 w-16 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-1.5">
                        <h3 className="truncate text-sm font-bold text-neutral-900">
                          {user.name}, {user.age}
                        </h3>
                      </div>
                      <p className="truncate text-xs text-neutral-600">
                        {user.occupation}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-neutral-400">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span>{user.location}</span>
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-semibold text-rose-600">
                      {new Date(matchedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
