"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { paths } from "@/lib/paths";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChallengesController } from "@/services/challenges/controller";
import { IamController } from "@/services/iam/controller";
import { SolutionsController } from "@/services/solutions/controller";
import type {
    ChallengeResponse,
    CodeTemplateResponse,
} from "@/services/challenges/types";

const DIFFICULTY_MAP: Record<number, { label: string; cn: string }> = {
    1: {
        label: "EASY",
        cn: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    2: {
        label: "MEDIUM",
        cn: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    3: { label: "HARD", cn: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
};

const HERO_GRADIENTS = [
    "bg-gradient-to-br from-[#0c2e4e] to-[#0f172a]",
    "bg-gradient-to-br from-[#1c1236] to-[#0e091b]",
    "bg-gradient-to-b from-[#2a0e1b] to-[#1a0f18]",
    "bg-gradient-to-r from-[#2c120c] to-[#1a0b08]",
];

const EDITOR_BASE_URL = "http://localhost:5173";

function getDifficulty(n: number) {
    return (
        DIFFICULTY_MAP[n] ?? {
            label: "EXPERT",
            cn: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        }
    );
}

export default function ChallengePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);

    const [challenge, setChallenge] = useState<ChallengeResponse | null>(null);
    const [templates, setTemplates] = useState<CodeTemplateResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<CodeTemplateResponse | null>(null);
    const [starting, setStarting] = useState(false);
    const [startError, setStartError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const [challengeData, templatesData] = await Promise.all([
                    ChallengesController.getChallengeById(id),
                    ChallengesController.getCodeTemplates(id),
                ]);
                setChallenge(challengeData);
                setTemplates(templatesData);
            } catch {
                setError("Failed to load challenge. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    async function handleStart() {
        if (!selected || !challenge) return;
        setStarting(true);
        setStartError(null);
        try {
            const [solution, { temporalToken }] = await Promise.all([
                SolutionsController.createSolution({
                    challengeId: challenge.challengeId,
                    codeTemplateId: selected.codeTemplateId,
                    language: selected.language,
                }),
                IamController.issueTemporalToken(),
            ]);
            window.location.href = `${EDITOR_BASE_URL}/start?access_token=${temporalToken}&challenge=${solution.challengeId}&code_template=${solution.codeTemplateId}`;
        } catch {
            setStartError("Could not start the challenge. Please try again.");
            setStarting(false);
        }
    }

    if (loading) return <ChallengeSkeleton />;

    if (error || !challenge) {
        return (
            <div className="max-w-5xl mx-auto">
                <Link
                    href={paths.dashboard.challenges}
                    className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-medium uppercase tracking-wider mb-6"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Challenges
                </Link>
                <p className="text-sm text-red-400">
                    {error ?? "Challenge not found."}
                </p>
            </div>
        );
    }

    const diff = getDifficulty(challenge.difficulty);
    const heroBg = HERO_GRADIENTS[challenge.difficulty % HERO_GRADIENTS.length];

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <Link
                href={paths.dashboard.challenges}
                className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-medium uppercase tracking-wider"
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                Challenges
            </Link>

            {/* Hero banner */}
            <div
                className={`rounded-xl overflow-hidden border border-white/5 ${heroBg}`}
            >
                <div className="relative p-8">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <div className="relative z-10 space-y-3">
                        <Badge
                            variant="secondary"
                            className={`${diff.cn} border text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5`}
                        >
                            {diff.label}
                        </Badge>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            {challenge.title}
                        </h1>
                        <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#818cf8"
                                strokeWidth="2"
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            {challenge.rewardPoints.toLocaleString()} XP
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Description */}
                <div className="lg:col-span-2 bg-[#121214] border border-white/5 rounded-xl p-6">
                    <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-4">
                        Description
                    </h2>
                    <div>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-xl font-bold text-white mb-3 mt-5 first:mt-0">
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
                                    <p className="text-sm text-zinc-400 leading-relaxed mb-3 last:mb-0">
                                        {children}
                                    </p>
                                ),
                                pre: ({ children }) => (
                                    <pre className="bg-[#0a0a0c] border border-white/5 rounded-lg p-4 overflow-x-auto mb-3 text-xs font-mono text-zinc-300">
                                        {children}
                                    </pre>
                                ),
                                code: ({ className, children }) => {
                                    const isBlock = Boolean(
                                        className?.startsWith("language-"),
                                    );
                                    if (isBlock)
                                        return (
                                            <code className="font-mono">
                                                {children}
                                            </code>
                                        );
                                    return (
                                        <code className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                                            {children}
                                        </code>
                                    );
                                },
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1 mb-3 pl-2">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside text-sm text-zinc-400 space-y-1 mb-3 pl-2">
                                        {children}
                                    </ol>
                                ),
                                li: ({ children }) => (
                                    <li className="leading-relaxed">
                                        {children}
                                    </li>
                                ),
                                strong: ({ children }) => (
                                    <strong className="text-zinc-200 font-semibold">
                                        {children}
                                    </strong>
                                ),
                                em: ({ children }) => (
                                    <em className="text-zinc-400 italic">
                                        {children}
                                    </em>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-2 border-indigo-500/40 pl-4 my-3 text-zinc-500 italic">
                                        {children}
                                    </blockquote>
                                ),
                                hr: () => (
                                    <hr className="border-white/5 my-4" />
                                ),
                                a: ({ href, children }) => (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
                                    >
                                        {children}
                                    </a>
                                ),
                            }}
                        >
                            {challenge.description}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    <div className="bg-[#121214] border border-white/5 rounded-xl p-6">
                        <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-4">
                            Choose Language
                        </h2>

                        {templates.length === 0 ? (
                            <p className="text-xs text-zinc-600">
                                No languages available for this challenge.
                            </p>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {templates.map((t) => (
                                    <button
                                        key={t.codeTemplateId}
                                        type="button"
                                        onClick={() => setSelected(t)}
                                        className={`px-3 py-2.5 rounded-lg border text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
                                            selected?.codeTemplateId ===
                                            t.codeTemplateId
                                                ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300"
                                                : "bg-white/[0.03] border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                                        }`}
                                    >
                                        {t.language}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Button
                            onClick={handleStart}
                            disabled={!selected || starting}
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-widest uppercase rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            {starting ? "Starting..." : "Start Challenge"}
                        </Button>
                        {!selected && (
                            <p className="text-[10px] text-zinc-600 text-center">
                                Select a language to continue
                            </p>
                        )}
                        {startError && (
                            <p className="text-[10px] text-red-400 text-center">
                                {startError}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChallengeSkeleton() {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-36 w-full rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 bg-[#121214] border border-white/5 rounded-xl p-6 space-y-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="bg-[#121214] border border-white/5 rounded-xl p-6 space-y-4">
                    <Skeleton className="h-3 w-28" />
                    <div className="grid grid-cols-2 gap-2">
                        <Skeleton className="h-10 rounded-lg" />
                        <Skeleton className="h-10 rounded-lg" />
                        <Skeleton className="h-10 rounded-lg" />
                    </div>
                    <Skeleton className="h-11 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}
