"use client";

import { Add01Icon, TeachingIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { TeacherChallengeCard } from "@/components/teacher/teacher-challenge-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/use-auth";
import useTeacherDrafts from "@/hooks/use-teacher-drafts";
import { paths } from "@/lib/paths";
import { ChallengesController } from "@/services/challenges/controller";
import type { ChallengeResponse } from "@/services/challenges/types";

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"];

export default function TeacherChallengesPage() {
  const userId = useAuth((s) => s.user?.id);
  const getChallengeIds = useTeacherDrafts((s) => s.getChallengeIds);
  const untrackChallenge = useTeacherDrafts((s) => s.untrackChallenge);

  const [challenges, setChallenges] = useState<ChallengeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      // The catalog only returns published challenges, so we filter the
      // teacher's own published ones and merge with locally-tracked drafts
      // (which can be fetched by id thanks to the owner exception).
      const trackedIds = getChallengeIds(userId);
      const [catalog, trackedResults] = await Promise.all([
        ChallengesController.getChallenges({ page: 0, size: 100 }),
        Promise.allSettled(
          trackedIds.map((id) => ChallengesController.getChallengeById(id)),
        ),
      ]);

      const mine = new Map<string, ChallengeResponse>();
      for (const c of catalog.content) {
        if (c.authorId === userId) mine.set(c.challengeId, c);
      }
      trackedResults.forEach((result, i) => {
        if (result.status === "fulfilled") {
          mine.set(result.value.challengeId, result.value);
        } else {
          // Challenge no longer reachable (deleted, or not owned) — forget it.
          untrackChallenge(userId, trackedIds[i]);
        }
      });

      const list = Array.from(mine.values()).sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
      setChallenges(list);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError("Failed to load your challenges. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [userId, getChallengeIds, untrackChallenge]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <HugeiconsIcon icon={TeachingIcon} size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Teaching
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            My Challenges
          </h1>
          <p className="text-zinc-400 text-sm">
            Author challenges, manage their code templates and test cases, and
            publish them for students.
          </p>
        </div>
        <Link href={paths.dashboard.teacher.newChallenge}>
          <Button className="h-10 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wider px-5 rounded-lg gap-2">
            <HugeiconsIcon icon={Add01Icon} size={16} />
            CREATE CHALLENGE
          </Button>
        </Link>
      </div>

      {error && <p className="text-sm text-red-400 py-4">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKELETON_KEYS.map((key) => (
            <Card
              key={key}
              className="bg-[#121214] border-white/5 p-5 space-y-4"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-28" />
            </Card>
          ))}
        </div>
      ) : challenges.length === 0 ? (
        <Card className="bg-[#121214] border-white/5 border-dashed py-16 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <HugeiconsIcon icon={TeachingIcon} size={24} />
          </div>
          <div>
            <p className="text-white font-semibold mb-1">No challenges yet</p>
            <p className="text-zinc-500 text-sm max-w-sm">
              Create your first challenge to start building problems for your
              students.
            </p>
          </div>
          <Link href={paths.dashboard.teacher.newChallenge}>
            <Button className="h-9 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wider px-5 rounded-lg gap-2">
              <HugeiconsIcon icon={Add01Icon} size={15} />
              CREATE CHALLENGE
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <TeacherChallengeCard
              key={challenge.challengeId}
              challenge={challenge}
            />
          ))}
        </div>
      )}
    </div>
  );
}
