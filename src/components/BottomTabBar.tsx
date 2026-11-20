"use client";

import { Home, Flame } from "lucide-react";

export type ActiveTab = "home" | "discover";

interface BottomTabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <nav
      aria-label="Primary navigation"
      className="flex h-16 shrink-0 items-center justify-around border-t-2 border-neutral-950 bg-white px-6">
      <button
        type="button"
        onClick={() => onTabChange("home")}
        className={`flex flex-1 flex-col items-center justify-center gap-1 py-1 text-xs font-bold transition-colors ${
          activeTab === "home"
            ? "text-neutral-950"
            : "text-neutral-400 hover:text-neutral-700"
        }`}>
        <div
          className={`flex h-7 w-11 items-center justify-center rounded-full transition-colors ${
            activeTab === "home" ? "bg-[#EDE9FE]" : "bg-transparent"
          }`}>
          <Home className="h-4 w-4 stroke-[2.25]" />
        </div>
        <span>Home</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("discover")}
        className={`flex flex-1 flex-col items-center justify-center gap-1 py-1 text-xs font-bold transition-colors ${
          activeTab === "discover"
            ? "text-neutral-950"
            : "text-neutral-400 hover:text-neutral-700"
        }`}>
        <div
          className={`flex h-7 w-11 items-center justify-center rounded-full transition-colors ${
            activeTab === "discover"
              ? "bg-[#FFE4EC] text-[#FF3B7F]"
              : "bg-transparent"
          }`}>
          <Flame
            className={`h-4 w-4 stroke-[2.25] ${
              activeTab === "discover" ? "fill-[#FF3B7F]" : ""
            }`}
          />
        </div>
        <span>Discover</span>
      </button>
    </nav>
  );
}
