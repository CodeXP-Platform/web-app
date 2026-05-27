"use client";

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  type ChallengeFormValues,
  ChallengeMetaForm,
} from "@/components/teacher/challenge-meta-form";
import useAuth from "@/hooks/use-auth";
import useTeacherDrafts from "@/hooks/use-teacher-drafts";
import { paths } from "@/lib/paths";
import { ChallengesController } from "@/services/challenges/controller";
import type { ErrorResponse } from "@/services/iam/types";

export default function NewChallengePage() {
  const router = useRouter();
  const userId = useAuth((s) => s.user?.id);
  const trackChallenge = useTeacherDrafts((s) => s.trackChallenge);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleCreate(values: ChallengeFormValues) {
    setServerError(null);
    try {
      const challenge = await ChallengesController.createChallenge(values);
      if (userId) trackChallenge(userId, challenge.challengeId);
      router.push(
        paths.dashboard.teacher.challengeManage(challenge.challengeId),
      );
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setServerError((err.response.data as ErrorResponse).message);
      } else {
        setServerError("Could not create the challenge. Please try again.");
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page header */}
      <div className="space-y-3">
        <Link
          href={paths.dashboard.teacher.root}
          className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-medium uppercase tracking-wider"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
          My Challenges
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
            New Challenge
          </h1>
          <p className="text-zinc-500 text-sm">
            Define the basics. After creating it you&apos;ll add code templates
            and test cases, then publish it for students.
          </p>
        </div>
      </div>

      {/* Form — no card wrapper; the form handles its own two-column layout */}
      <div className="bg-[#121214] border border-white/5 rounded-2xl p-8">
        <ChallengeMetaForm
          submitLabel="Create Challenge"
          pendingLabel="Creating…"
          onSubmit={handleCreate}
          serverError={serverError}
        />
      </div>
    </div>
  );
}
