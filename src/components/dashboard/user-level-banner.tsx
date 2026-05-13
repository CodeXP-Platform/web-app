"use client";

import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/use-auth";
import useGamification from "@/hooks/use-gamification";

/** XP within the current level (0–99) and % progress to next level. */
function levelProgress(xp: number) {
  const xpInLevel = xp % 100;
  return { xpInLevel, percent: xpInLevel };
}

export function UserLevelBanner() {
  const user = useAuth((s) => s.user);
  const { profile, loading, fetchUserData } = useGamification();

  useEffect(() => {
    if (user?.id) fetchUserData(user.id);
  }, [user?.id, fetchUserData]);

  const { xpInLevel, percent } = profile
    ? levelProgress(profile.xp)
    : { xpInLevel: 0, percent: 0 };

  const nextLevelXp = profile ? profile.level * 100 : 100;

  return (
    <div className="col-span-2 relative overflow-hidden rounded-xl bg-[#121214] border border-white/5 p-8 flex flex-col justify-between min-h-[240px]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute right-0 top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.15)_0%,transparent_50%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.02) 75%, transparent 75%, transparent)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="relative z-10">
        <p className="text-indigo-400 text-[10px] font-bold tracking-widest uppercase mb-3">
          YOUR PROGRESS
        </p>

        {loading ? (
          <>
            <Skeleton className="h-9 w-48 mb-3" />
            <Skeleton className="h-4 w-64" />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
              {profile
                ? `Level ${profile.level} Operator`
                : "Level — Operator"}
            </h1>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              {profile
                ? `${profile.totalPoints.toLocaleString()} total points · ${profile.achievements.length} achievement${profile.achievements.length !== 1 ? "s" : ""} unlocked`
                : "Connect to load your stats."}
            </p>
          </>
        )}
      </div>

      <div className="relative z-10 mt-8">
        <div className="flex items-end justify-between mb-3">
          <div className="flex items-baseline gap-2">
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <span className="text-3xl font-bold text-indigo-400 leading-none">
                {profile ? `${percent}%` : "—"}
              </span>
            )}
            <span className="text-zinc-400 text-xs">
              {profile
                ? `to Level ${profile.level + 1}`
                : ""}
            </span>
          </div>
          <span className="text-zinc-400 text-xs">
            {profile
              ? `${xpInLevel} / 100 XP`
              : ""}
          </span>
        </div>

        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden flex">
          <div
            className="bg-indigo-400 h-full rounded-r-full shadow-[0_0_10px_rgba(129,140,248,0.5)] relative transition-all duration-700"
            style={{ width: `${loading ? 0 : percent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
