"use client";

import {
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  Rocket01Icon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { getDifficulty } from "@/components/challenges/challenge-card";
import {
  type ChallengeFormValues,
  ChallengeMetaForm,
} from "@/components/teacher/challenge-meta-form";
import { CodeTemplateManager } from "@/components/teacher/code-template-manager";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/use-auth";
import useTeacherDrafts from "@/hooks/use-teacher-drafts";
import { paths } from "@/lib/paths";
import { ChallengesController } from "@/services/challenges/controller";
import type { ChallengeResponse } from "@/services/challenges/types";
import type { ErrorResponse } from "@/services/iam/types";

function readError(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err) && err.response) {
    return (err.response.data as ErrorResponse).message ?? fallback;
  }
  return fallback;
}

export default function ManageChallengePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const userId = useAuth((s) => s.user?.id);
  const untrackChallenge = useTeacherDrafts((s) => s.untrackChallenge);

  const [challenge, setChallenge] = useState<ChallengeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [templateCount, setTemplateCount] = useState(0);

  const [metaError, setMetaError] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await ChallengesController.getChallengeById(id);
        if (active) setChallenge(data);
      } catch (err) {
        if (active)
          setError(
            readError(err, "Challenge not found, or you are not its author."),
          );
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  async function handleUpdateMeta(values: ChallengeFormValues) {
    setMetaError(null);
    try {
      const updated = await ChallengesController.updateChallenge(id, values);
      setChallenge(updated);
    } catch (err) {
      setMetaError(readError(err, "Could not save changes."));
    }
  }

  async function handlePublishToggle() {
    if (!challenge) return;
    setPublishing(true);
    setPublishError(null);
    try {
      const updated = challenge.isPublished
        ? await ChallengesController.updateChallenge(id, { isPublished: false })
        : await ChallengesController.publishChallenge(id);
      setChallenge(updated);
    } catch (err) {
      setPublishError(readError(err, "Could not update publish state."));
    } finally {
      setPublishing(false);
    }
  }

  async function handleDelete() {
    if (!challenge) return;
    const confirmed = window.confirm(
      `Delete "${challenge.title}"? This cannot be undone.`,
    );
    if (!confirmed) return;
    setDeleting(true);
    try {
      await ChallengesController.deleteChallenge(id);
      if (userId) untrackChallenge(userId, id);
      router.push(paths.dashboard.teacher.root);
    } catch (err) {
      setMetaError(readError(err, "Could not delete the challenge."));
      setDeleting(false);
    }
  }

  if (loading) return <ManageSkeleton />;

  if (error || !challenge) {
    return (
      <div className="max-w-4xl mx-auto">
        <Link
          href={paths.dashboard.teacher.root}
          className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-medium uppercase tracking-wider mb-6"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
          My Challenges
        </Link>
        <p className="text-sm text-red-400">
          {error ?? "Challenge not found."}
        </p>
      </div>
    );
  }

  const diff = getDifficulty(challenge.difficulty);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href={paths.dashboard.teacher.root}
        className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-medium uppercase tracking-wider"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        My Challenges
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          {challenge.title}
        </h1>
        <Badge
          variant="secondary"
          className={`${diff.cn} border text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5`}
        >
          {diff.label}
        </Badge>
        <Badge
          variant="secondary"
          className={`border text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5 ${
            challenge.isPublished
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
          }`}
        >
          {challenge.isPublished ? "Published" : "Draft"}
        </Badge>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="bg-transparent border-b border-white/5 rounded-none gap-6 w-full justify-start h-auto pb-0">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="templates">
            Code Templates{templateCount > 0 ? ` (${templateCount})` : ""}
          </TabsTrigger>
          <TabsTrigger value="publish">Publish</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="pt-6">
          <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
            <ChallengeMetaForm
              key={challenge.updatedAt}
              initialValues={challenge}
              submitLabel="Save Changes"
              pendingLabel="Saving…"
              onSubmit={handleUpdateMeta}
              serverError={metaError}
              secondaryAction={
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="h-11 text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm gap-2"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={16} />
                  {deleting ? "Deleting…" : "Delete"}
                </Button>
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="templates" className="pt-6">
          <CodeTemplateManager
            challengeId={id}
            onCountChange={setTemplateCount}
          />
        </TabsContent>

        <TabsContent value="publish" className="pt-6">
          <div className="bg-[#121214] border border-white/5 rounded-xl p-6 space-y-5">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  challenge.isPublished
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-amber-500/10 text-amber-400"
                }`}
              >
                <HugeiconsIcon
                  icon={
                    challenge.isPublished ? CheckmarkCircle02Icon : Rocket01Icon
                  }
                  size={20}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  {challenge.isPublished
                    ? "This challenge is live"
                    : "Ready to publish?"}
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  {challenge.isPublished
                    ? "Students can see and solve this challenge. Unpublish it to hide it from the catalog."
                    : "Once published, the challenge appears in the student catalog. Make sure it has at least one code template with test cases."}
                </p>
              </div>
            </div>

            {!challenge.isPublished && templateCount === 0 && (
              <p className="text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                Add at least one code template (in the Code Templates tab)
                before publishing.
              </p>
            )}

            {publishError && (
              <p className="text-sm text-red-400">{publishError}</p>
            )}

            <Button
              type="button"
              onClick={handlePublishToggle}
              disabled={
                publishing || (!challenge.isPublished && templateCount === 0)
              }
              className={`h-11 font-semibold text-sm px-6 rounded-lg gap-2 disabled:opacity-40 disabled:cursor-not-allowed ${
                challenge.isPublished
                  ? "bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
            >
              <HugeiconsIcon
                icon={challenge.isPublished ? ViewOffIcon : Rocket01Icon}
                size={16}
              />
              {publishing
                ? "Working…"
                : challenge.isPublished
                  ? "Unpublish"
                  : "Publish Challenge"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ManageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-9 w-1/2" />
      <Skeleton className="h-9 w-full max-w-md" />
      <div className="bg-[#121214] border border-white/5 rounded-xl p-6 space-y-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-11 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-11 w-40" />
      </div>
    </div>
  );
}
