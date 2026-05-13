"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/use-auth";
import useGamification from "@/hooks/use-gamification";
import { paths } from "@/lib/paths";

function formatMemberSince(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function ProfilePage() {
  const user = useAuth((s) => s.user);
  const { profile, globalRank, loading, fetchUserData } = useGamification();

  useEffect(() => {
    if (user?.id) fetchUserData(user.id);
  }, [user?.id, fetchUserData]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="relative rounded-2xl bg-[#121214] border border-white/5 p-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-r from-indigo-500/20 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 overflow-hidden flex items-center justify-center shrink-0">
            {user?.picture ? (
              <img src={user.picture} alt={user.nickname} className="w-full h-full object-cover" />
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {user?.nickname ?? "—"}
              </h1>
              <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold uppercase tracking-wider text-[10px] w-fit mx-auto md:mx-0">
                {profile ? `Level ${profile.level} Operator` : "Operator"}
              </Badge>
            </div>
            <p className="text-zinc-400 text-sm mb-4">
              {user?.createdAt ? `Joined ${formatMemberSince(user.createdAt)}` : ""}
              {user?.email ? ` · ${user.email}` : ""}
            </p>
            <Link
              href={paths.dashboard.profileEdit}
              className="inline-flex items-center justify-center rounded-md text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white h-8 px-4 transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#121214] border-white/5 p-6 flex flex-col items-center justify-center text-center">
          <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">GLOBAL RANK</p>
          {loading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <p className="text-3xl font-bold text-white">
              {globalRank != null ? `#${globalRank.toLocaleString()}` : "—"}
            </p>
          )}
        </Card>
        <Card className="bg-[#121214] border-white/5 p-6 flex flex-col items-center justify-center text-center">
          <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">TOTAL XP</p>
          {loading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <p className="text-3xl font-bold text-white">
              {profile?.xp != null ? profile.xp.toLocaleString() : "—"}
            </p>
          )}
        </Card>
        <Card className="bg-[#121214] border-white/5 p-6 flex flex-col items-center justify-center text-center">
          <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">ACHIEVEMENTS</p>
          {loading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <p className="text-3xl font-bold text-white">
              {profile?.achievements.length ?? "—"}
            </p>
          )}
        </Card>
        <Card className="bg-[#121214] border-white/5 p-6 flex flex-col items-center justify-center text-center">
          <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">LEVEL</p>
          {loading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <p className="text-3xl font-bold text-emerald-400">
              {profile?.level ?? "—"}
            </p>
          )}
        </Card>
      </div>

      {/* Trophies & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Badges */}
        <Card className="bg-[#121214] border-white/5 p-8 h-[300px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white tracking-tight">Badges & Trophies</h3>
            {!loading && (
              <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
                {profile ? `${profile.achievements.length} EARNED` : "0 EARNED"}
              </span>
            )}
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="w-14 h-14 rounded-xl" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            ) : profile && profile.achievements.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {profile.achievements.map((a) => (
                  <div key={a.achievementId} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center overflow-hidden">
                      {a.badgeImageUrl ? (
                        <img src={a.badgeImageUrl} alt={a.achievementName} className="w-full h-full object-cover" />
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium text-center leading-tight">{a.achievementName}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-600 text-xs text-center mt-8">No achievements yet. Start solving challenges!</p>
            )}
          </div>
        </Card>

        {/* Activity (static placeholder — no activity endpoint) */}
        <Card className="bg-[#121214] border-white/5 p-8 h-[300px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white tracking-tight">Activity Pulse</h3>
            <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">LAST 7 DAYS</span>
          </div>
          <div className="flex-1 flex items-end gap-2 mt-auto">
            {[30, 40, 20, 60, 50, 80, 90].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm hover:bg-white/10 transition-colors ${i === 6 ? "bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.2)]" : "bg-white/[0.03]"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
