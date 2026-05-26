"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DIFFICULTY_OPTIONS } from "@/lib/roles";

export interface ChallengeFormValues {
  title: string;
  description: string;
  difficulty: number;
  rewardPoints: number;
}

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title must be at most 120 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
  difficulty: z.number().int().min(1, "Pick a difficulty"),
  rewardPoints: z
    .number()
    .int("Reward must be a whole number")
    .min(0, "Reward cannot be negative")
    .max(100000, "Reward is too large"),
});

const FIELD_CN =
  "h-11 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500";

interface ChallengeMetaFormProps {
  initialValues?: Partial<ChallengeFormValues>;
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (values: ChallengeFormValues) => Promise<void> | void;
  /** Server-side error message to surface above the submit button. */
  serverError?: string | null;
  /** Optional secondary action rendered next to the submit button. */
  secondaryAction?: React.ReactNode;
}

export function ChallengeMetaForm({
  initialValues,
  submitLabel,
  pendingLabel,
  onSubmit,
  serverError,
  secondaryAction,
}: ChallengeMetaFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [difficulty, setDifficulty] = useState(initialValues?.difficulty ?? 1);
  const [rewardPoints, setRewardPoints] = useState(
    String(initialValues?.rewardPoints ?? 100),
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const result = schema.safeParse({
      title,
      description,
      difficulty,
      rewardPoints: Number(rewardPoints),
    });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(result.data);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label
          className="text-sm font-medium text-zinc-300"
          htmlFor="challenge-title"
        >
          Title
        </label>
        <Input
          id="challenge-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Two Sum"
          className={FIELD_CN}
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-zinc-300"
          htmlFor="challenge-description"
        >
          Description{" "}
          <span className="text-zinc-500 font-normal">
            (Markdown supported)
          </span>
        </label>
        <Textarea
          id="challenge-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={"## Problem\n\nGiven an array of integers..."}
          className="min-h-48 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <span className="text-sm font-medium text-zinc-300">Difficulty</span>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDifficulty(opt.value)}
                className={`px-3.5 py-2 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-colors ${
                  difficulty === opt.value
                    ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300"
                    : "bg-white/[0.03] border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-zinc-300"
            htmlFor="challenge-reward"
          >
            Reward points (XP)
          </label>
          <Input
            id="challenge-reward"
            type="number"
            min={0}
            value={rewardPoints}
            onChange={(e) => setRewardPoints(e.target.value)}
            className={FIELD_CN}
          />
        </div>
      </div>

      {(error || serverError) && (
        <p className="text-sm text-red-400">{error ?? serverError}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={submitting}
          className="h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? pendingLabel : submitLabel}
        </Button>
        {secondaryAction}
      </div>
    </form>
  );
}
