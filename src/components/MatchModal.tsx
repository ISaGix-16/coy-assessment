"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, X } from "lucide-react";
import { PublicProfile } from "@/types";

interface MatchModalProps {
  matchedUser: PublicProfile | null;
  onClose: () => void;
  onViewMatches: () => void;
}

export function MatchModal({
  matchedUser,
  onClose,
  onViewMatches,
}: MatchModalProps) {
  return (
    <AnimatePresence>
      {matchedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 mx-auto flex max-w-md flex-col items-center justify-center bg-neutral-950/90 px-6 text-center text-white backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close match modal"
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>

          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex w-full flex-col items-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-neutral-950 bg-[#FFE4EC] px-3.5 py-1 text-xs font-extrabold text-neutral-950">
              <Heart className="h-3.5 w-3.5 fill-[#FF3B7F] text-[#FF3B7F]" />
              <span>Mutual Crush</span>
            </div>

            <h2 className="text-3xl font-black tracking-tight">
              It&apos;s a Match<span className="text-[#FF3B7F]">!</span>
            </h2>
            <p className="mt-2 max-w-xs text-sm text-neutral-300">
              You and{" "}
              <span className="font-bold text-white">{matchedUser.name}</span>{" "}
              both swiped right on each other.
            </p>

            {/* Avatar of matched User */}
            <div className="relative my-7">
              <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-[#FF3B7F] shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={matchedUser.photos[0]}
                  alt={matchedUser.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-neutral-950 bg-[#EDE9FE] px-3 py-0.5 text-xs font-extrabold text-neutral-950">
                {matchedUser.name}, {matchedUser.age}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3">
              <button
                type="button"
                onClick={onViewMatches}
                className="coy-btn-shadow flex w-full items-center justify-center gap-2 rounded-full border-2 border-neutral-950 bg-[#FF3B7F] py-3.5 text-sm font-extrabold text-neutral-950 transition hover:brightness-105">
                <MessageCircle className="h-4 w-4" />
                <span>View All Matches</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full border-2 border-white/25 bg-white/10 py-3 text-sm font-bold text-white transition hover:bg-white/15">
                Keep Swiping
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
