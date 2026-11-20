"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Briefcase, MapPin, Info, ChevronDown } from "lucide-react";
import { PublicProfile } from "@/types";
import { SWIPE_DIRECTION, SwipeDirection } from "@/lib/constants";

interface SwipeCardProps {
  profile: PublicProfile;
  isTop: boolean;
  onSwipe: (direction: SwipeDirection) => void;
}

const SWIPE_THRESHOLD = 110;

export function SwipeCard({ profile, isTop, onSwipe }: SwipeCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-16, 0, 16]);
  const likeOpacity = useTransform(x, [25, 110], [0, 1]);
  const nopeOpacity = useTransform(x, [-110, -25], [1, 0]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (!isTop) return;
    if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 500) {
      onSwipe(SWIPE_DIRECTION.RIGHT);
    } else if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -500) {
      onSwipe(SWIPE_DIRECTION.LEFT);
    }
  };

  const handlePhotoTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (profile.photos.length <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const tapX = e.clientX - rect.left;
    if (tapX > rect.width / 2) {
      setPhotoIndex((prev) => (prev + 1) % profile.photos.length);
    } else {
      setPhotoIndex((prev) =>
        prev === 0 ? profile.photos.length - 1 : prev - 1,
      );
    }
  };

  return (
    <motion.div
      style={isTop ? { x, rotate } : undefined}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.96, opacity: isTop ? 1 : 0.85 }}
      animate={{ scale: isTop ? 1 : 0.96, opacity: 1 }}
      exit={{
        x: x.get() >= 0 ? 420 : -420,
        opacity: 0,
        transition: { duration: 0.22 },
      }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className={`coy-card-shadow absolute inset-0 select-none overflow-hidden rounded-3xl border-2 border-neutral-950 bg-neutral-900 ${
        isTop
          ? "z-20 cursor-grab active:cursor-grabbing"
          : "z-10 pointer-events-none"
      }`}>
      <div onClick={handlePhotoTap} className="relative h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.photos[photoIndex] ?? profile.photos[0]}
          alt={`${profile.name}, ${profile.age}`}
          draggable={false}
          className="h-full w-full object-cover"
        />

        {profile.photos.length > 1 && (
          <div className="absolute top-3 left-3 right-3 z-20 flex gap-1.5">
            {profile.photos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  idx === photoIndex ? "bg-white" : "bg-white/35"
                }`}
              />
            ))}
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/90 via-black/45 to-transparent" />
      </div>

      {isTop && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="pointer-events-none absolute top-8 left-6 z-30 -rotate-12 rounded-xl border-4 border-emerald-400 px-3.5 py-1 text-2xl font-extrabold tracking-widest text-emerald-400">
            LIKE
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="pointer-events-none absolute top-8 right-6 z-30 rotate-12 rounded-xl border-4 border-rose-500 px-3.5 py-1 text-2xl font-extrabold tracking-widest text-rose-500">
            NOPE
          </motion.div>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 z-20 p-5 text-white">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold tracking-tight">
                {profile.name}
              </h2>
              <span className="text-xl font-normal text-white/85">
                {profile.age}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {profile.occupation}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails((prev) => !prev);
            }}
            aria-label={showDetails ? "Hide details" : "Show details"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25">
            {showDetails ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <Info className="h-5 w-5" />
            )}
          </button>
        </div>

        <p
          className={`mt-2.5 text-sm leading-relaxed text-white/90 ${showDetails ? "" : "line-clamp-2"}`}>
          {profile.bio}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {(showDetails
            ? profile.interests
            : profile.interests.slice(0, 3)
          ).map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
