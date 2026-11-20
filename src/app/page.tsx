"use client";

import { useCallback, useEffect, useState } from "react";
import { MatchItem, PublicProfile, SwipeResult } from "@/types";
import { SwipeDirection } from "@/lib/constants";
import { BottomTabBar, ActiveTab } from "@/components/BottomTabBar";
import { HomePlaceholder } from "@/components/HomePlaceholder";
import { DiscoverView } from "@/components/DiscoverView";
import { MatchModal } from "@/components/MatchModal";
import { MatchesList } from "@/components/MatchesList";

export default function CoyAppPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("discover");
  const [profiles, setProfiles] = useState<PublicProfile[]>([]);
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [matchedUser, setMatchedUser] = useState<PublicProfile | null>(null);
  const [matchesOpen, setMatchesOpen] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [feedRes, matchesRes] = await Promise.all([
        fetch("/api/feed", { cache: "no-store" }),
        fetch("/api/matches", { cache: "no-store" }),
      ]);
      const feedData = await feedRes.json();
      const matchesData = await matchesRes.json();

      setProfiles(feedData.profiles ?? []);
      setMatches(matchesData.matches ?? []);
    } catch (error) {
      console.error("Failed to load discovery data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const handleSwipe = async (direction: SwipeDirection) => {
    if (swiping || profiles.length === 0) return;

    const currentCard = profiles[0];
    setSwiping(true);

    // Optimistically remove top card from deck
    setProfiles((prev) => prev.slice(1));

    try {
      const res = await fetch("/api/swipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ swipedId: currentCard.id, direction }),
      });

      if (!res.ok) {
        throw new Error("Swipe request failed");
      }

      const result: SwipeResult = await res.json();

      if (result.isMatch && result.matchedUser) {
        setMatchedUser(result.matchedUser);
        const matchesRes = await fetch("/api/matches", { cache: "no-store" });
        const matchesData = await matchesRes.json();
        setMatches(matchesData.matches ?? []);
      }
    } catch (error) {
      console.error("Swipe error:", error);
      // Roll back card on failure
      setProfiles((prev) => [currentCard, ...prev]);
    } finally {
      setSwiping(false);
    }
  };

  const handleReset = async () => {
    if (resetting) return;
    setResetting(true);
    try {
      await fetch("/api/reset", { method: "POST" });
      await loadData();
    } catch (error) {
      console.error("Reset error:", error);
    } finally {
      setResetting(false);
    }
  };

  return (
    <>
      {activeTab === "home" ? (
        <HomePlaceholder onGoToDiscover={() => setActiveTab("discover")} />
      ) : (
        <DiscoverView
          profiles={profiles}
          matches={matches}
          loading={loading}
          swiping={swiping}
          resetting={resetting}
          onSwipe={handleSwipe}
          onReset={handleReset}
          onOpenMatches={() => setMatchesOpen(true)}
        />
      )}

      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <MatchModal
        matchedUser={matchedUser}
        onClose={() => setMatchedUser(null)}
        onViewMatches={() => {
          setMatchedUser(null);
          setMatchesOpen(true);
        }}
      />

      <MatchesList
        open={matchesOpen}
        matches={matches}
        resetting={resetting}
        onClose={() => setMatchesOpen(false)}
        onReset={handleReset}
      />
    </>
  );
}