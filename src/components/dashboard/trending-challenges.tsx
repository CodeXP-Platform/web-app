"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChallengesController } from "@/services/challenges/controller";
import type { ChallengeResponse } from "@/services/challenges/types";

const CARD_GRADIENTS = [
  "bg-gradient-to-br from-[#0c2e4e] to-[#0f172a]",
  "bg-gradient-to-br from-[#1c1236] to-[#0e091b]",
  "bg-gradient-to-b from-[#2a0e1b] to-[#1a0f18]",
];

const DIFFICULTY_MAP: Record<number, { label: string; cn: string }> = {
  1: { label: "EASY", cn: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  2: { label: "MEDIUM", cn: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  3: { label: "HARD", cn: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
};

function getDifficulty(n: number) {
  return DIFFICULTY_MAP[n] ?? { label: "EXPERT", cn: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
}

export function TrendingChallenges() {
  const [challenges, setChallenges] = useState<ChallengeResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ChallengesController.getChallenges({ page: 0, size: 3 })
      .then((data) => setChallenges(data.content))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="bg-[#121214] border-white/5 overflow-hidden h-[320px]">
            <Skeleton className="h-36 w-full rounded-none" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <p className="text-zinc-600 text-sm text-center py-8">No challenges available yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {challenges.map((challenge, i) => {
        const diff = getDifficulty(challenge.difficulty);
        const bg = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
        return (
          <Card key={challenge.challengeId} className="bg-[#121214] border-white/5 overflow-hidden flex flex-col group hover:border-white/10 transition-colors h-[320px]">
            <div className={`h-36 w-full relative ${bg} flex items-start p-4`}>
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="flex gap-2 relative z-10">
                <Badge variant="secondary" className={`${diff.cn} border text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5`}>
                  {diff.label}
                </Badge>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-base font-bold text-white mb-2 tracking-tight">{challenge.title}</h3>
              <p className="text-xs text-zinc-400 mb-4 flex-1 line-clamp-3 leading-relaxed">{challenge.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {challenge.rewardPoints.toLocaleString()} XP
                </div>
                <Button className="h-7 bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 rounded text-[10px] font-bold tracking-widest px-4">
                  START
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
