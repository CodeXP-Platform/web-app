"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChallengeCard } from "@/components/challenges/challenge-card";
import { ChallengesController } from "@/services/challenges/controller";
import type { ChallengeResponse } from "@/services/challenges/types";

export default function ChallengesPage() {
  const searchParams = useSearchParams();
  const title      = searchParams.get("title")      ?? undefined;
  const difficulty = searchParams.get("difficulty") ?? undefined;
  const language   = searchParams.get("language")   ?? undefined;

  const [challenges, setChallenges] = useState<ChallengeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [title, difficulty, language]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await ChallengesController.getChallenges({ page, size: 9, title, difficulty, language });
        setChallenges(data.content);
        setTotalPages(data.totalPages);
      } catch {
        setError("Failed to load challenges. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, title, difficulty, language]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Challenge Catalog</h1>
        <p className="text-zinc-400 text-sm">Explore and conquer challenges to earn XP and level up.</p>
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

      {!loading && challenges.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#121214] border border-white/5 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <div className="text-center space-y-1">
            <p className="text-zinc-200 text-sm font-medium">No challenges match your search</p>
            <p className="text-zinc-600 text-xs">Try adjusting your filters or search term</p>
          </div>
        </div>
      )}

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
