"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChallengeCard } from "@/components/challenges/challenge-card";
import { ChallengesController } from "@/services/challenges/controller";
import type { ChallengeResponse } from "@/services/challenges/types";

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
      {challenges.map((challenge, i) => (
        <ChallengeCard key={challenge.challengeId} challenge={challenge} index={i} />
      ))}
    </div>
  );
}
