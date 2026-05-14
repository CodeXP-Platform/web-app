"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChallengeCard } from "@/components/challenges/challenge-card";
import { ChallengesController } from "@/services/challenges/controller";
import type { ChallengeResponse } from "@/services/challenges/types";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<ChallengeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await ChallengesController.getChallenges({ page, size: 9 });
        setChallenges(data.content);
        setTotalPages(data.totalPages);
      } catch {
        setError("Failed to load challenges. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Challenge Catalog</h1>
          <p className="text-zinc-400 text-sm">Explore and conquer challenges to earn XP and level up.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 bg-white/5 border-white/10 text-zinc-300 text-xs">All</Button>
          <Button variant="outline" className="h-9 bg-white/5 border-white/10 text-zinc-300 text-xs">Easy</Button>
          <Button variant="outline" className="h-9 bg-white/5 border-white/10 text-zinc-300 text-xs">Hard</Button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 text-center py-8">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="bg-[#121214] border-white/5 overflow-hidden h-[320px]">
                <Skeleton className="h-36 w-full rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </Card>
            ))
          : challenges.map((challenge, i) => (
              <ChallengeCard key={challenge.challengeId} challenge={challenge} index={i} />
            ))}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            className="h-8 bg-white/5 border-white/10 text-zinc-300 text-xs px-4"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-zinc-500 text-xs">
            {page + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            className="h-8 bg-white/5 border-white/10 text-zinc-300 text-xs px-4"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
