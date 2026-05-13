"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/use-auth";
import useGamification from "@/hooks/use-gamification";

export function UserStatsCards() {
  const user = useAuth((s) => s.user);
  const { profile, globalRank, loading, fetchUserData } = useGamification();

  useEffect(() => {
    if (user?.id) fetchUserData(user.id);
  }, [user?.id, fetchUserData]);

  return (
    <div className="col-span-1 flex flex-col gap-6">
      {/* Global Rank */}
      <Card className="flex-1 bg-[#121214] border-white/5 flex items-center justify-between p-6">
        <div>
          <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">
            GLOBAL RANK
          </p>
          {loading ? (
            <Skeleton className="h-7 w-20 mt-1" />
          ) : (
            <p className="text-2xl font-bold text-white">
              {globalRank != null ? `#${globalRank.toLocaleString()}` : "—"}
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ec4899"
            strokeWidth="2"
          >
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
        </div>
      </Card>

      {/* Total XP */}
      <Card className="flex-1 bg-[#121214] border-white/5 flex items-center justify-between p-6">
        <div>
          <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">
            TOTAL XP
          </p>
          {loading ? (
            <Skeleton className="h-7 w-24 mt-1" />
          ) : (
            <p className="text-2xl font-bold text-white">
              {profile?.xp != null ? profile.xp.toLocaleString() : "—"}
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#818cf8"
            strokeWidth="2"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
      </Card>
    </div>
  );
}
