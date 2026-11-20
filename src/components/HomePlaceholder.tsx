"use client";

import { Flame } from "lucide-react";

interface HomePlaceholderProps {
  onGoToDiscover: () => void;
}

export function HomePlaceholder({ onGoToDiscover }: HomePlaceholderProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        <Flame className="h-6 w-6" />
      </div>
      <h1 className="text-lg font-semibold tracking-tight text-neutral-900">
        Home
      </h1>
      <p className="mt-1.5 text-sm text-neutral-500">
        Your crushes and invites live here. Head over to Discover to explore
        people nearby.
      </p>
      <button
        type="button"
        onClick={onGoToDiscover}
        className="mt-6 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800 active:scale-95">
        Open Discover
      </button>
    </div>
  );
}
