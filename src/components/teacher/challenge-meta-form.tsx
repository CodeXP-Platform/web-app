"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { MonacoEditor } from "@/components/teacher/monaco-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const INPUT_CN =
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
  const [descTab, setDescTab] = useState<"write" | "preview">("write");
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
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-start">
        {/* ── Left column: meta fields ────────────────────────────────── */}
        <div className="space-y-6">
          <div className="pb-1 border-b border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
              Challenge info
            </p>
          </div>

          {/* Title */}
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
              className={INPUT_CN}
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-zinc-300">
              Difficulty
            </span>
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

          {/* Reward XP */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-300"
              htmlFor="challenge-reward"
            >
              Reward points{" "}
              <span className="text-zinc-500 font-normal">(XP)</span>
            </label>
            <Input
              id="challenge-reward"
              type="number"
              min={0}
              value={rewardPoints}
              onChange={(e) => setRewardPoints(e.target.value)}
              className={INPUT_CN}
            />
          </div>

          {/* Errors */}
          {(error || serverError) && (
            <p className="text-sm text-red-400">{error ?? serverError}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? pendingLabel : submitLabel}
            </Button>
            {secondaryAction}
          </div>
        </div>

        {/* ── Right column: description ────────────────────────────────── */}
        <div className="space-y-3">
          {/* Header: label + Write/Preview toggle */}
          <div className="flex items-center justify-between pb-1 border-b border-white/5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
                Description
              </p>
              <p className="text-[11px] text-zinc-600 mt-0.5">
                Supports Markdown — GFM, tables, code blocks
              </p>
            </div>

            <div className="flex items-center bg-white/[0.04] border border-white/8 rounded-lg p-0.5 gap-0.5">
              <button
                type="button"
                onClick={() => setDescTab("write")}
                className={`px-3 py-1.5 rounded-md text-[11px] font-semibold tracking-wide transition-colors ${
                  descTab === "write"
                    ? "bg-white/10 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setDescTab("preview")}
                className={`px-3 py-1.5 rounded-md text-[11px] font-semibold tracking-wide transition-colors ${
                  descTab === "preview"
                    ? "bg-white/10 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          {/* Write: Monaco markdown editor */}
          {descTab === "write" && (
            <MonacoEditor
              language="markdown"
              value={description}
              onChange={setDescription}
              height={340}
              wordWrap="on"
              lineNumbers={false}
            />
          )}

          {/* Preview: rendered markdown, grows to natural height */}
          {descTab === "preview" && (
            <div className="rounded-lg border border-white/10 bg-[#0a0a0c] min-h-[340px] px-6 py-5">
              {description.trim() ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-xl font-bold text-white mb-3 mt-5 first:mt-0 pb-2 border-b border-white/8">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-lg font-bold text-white mb-2 mt-4 first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base font-semibold text-zinc-200 mb-2 mt-3 first:mt-0">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-sm text-zinc-300 leading-relaxed mb-3 last:mb-0">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1 mb-3 pl-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-sm text-zinc-300 space-y-1 mb-3 pl-2">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-white font-semibold">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-zinc-300 italic">{children}</em>
                    ),
                    code: ({ children, className }) => {
                      const isBlock = className?.includes("language-");
                      if (isBlock) {
                        return (
                          <code className="block bg-[#121214] border border-white/8 rounded-lg p-4 text-xs font-mono text-zinc-200 overflow-x-auto mb-3 whitespace-pre">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className="bg-white/8 text-purple-300 rounded px-1.5 py-0.5 text-xs font-mono">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="mb-3">{children}</pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-indigo-500/40 pl-4 text-sm text-zinc-400 italic mb-3">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-3">
                        <table className="w-full text-xs text-zinc-300 border border-white/8 rounded-lg overflow-hidden">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="text-left px-3 py-2 bg-white/5 font-semibold text-zinc-200 border-b border-white/8">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-3 py-2 border-b border-white/5 last:border-0">
                        {children}
                      </td>
                    ),
                    hr: () => <hr className="border-white/8 my-4" />,
                  }}
                >
                  {description}
                </ReactMarkdown>
              ) : (
                <p className="text-sm text-zinc-600 italic">
                  Nothing to preview yet. Switch to Write and add some content.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
