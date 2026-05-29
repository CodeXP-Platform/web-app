"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { paths } from "@/lib/paths";

const DIFFICULTIES = [
    { label: "All difficulties", value: "" },
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
];

const LANGUAGES = [
    { label: "All languages", value: "" },
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
];

function FilterDropdown({
    options,
    value,
    onChange,
}: {
    options: { label: string; value: string }[];
    value: string;
    onChange: (v: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selected = options.find((o) => o.value === value) ?? options[0];

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className={`flex items-center gap-2 text-xs font-medium rounded-md px-3 h-9 border transition-colors
                    ${value
                        ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                        : "bg-[#121214] border-white/5 text-zinc-400 hover:bg-white/5"
                    }`}
            >
                {selected.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <div className="absolute top-full mt-1 left-0 min-w-[160px] bg-[#1a1a1d] border border-white/10 rounded-md shadow-xl z-50 py-1">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-xs transition-colors
                                ${opt.value === value
                                    ? "text-indigo-300 bg-indigo-500/10"
                                    : "text-zinc-300 hover:bg-white/5"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export function DashboardHeaderSearch() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [title, setTitle] = useState(searchParams.get("title") ?? "");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setTitle(searchParams.get("title") ?? "");
    }, [searchParams]);

    if (pathname !== paths.dashboard.challenges) return null;

    const difficulty = searchParams.get("difficulty") ?? "";
    const language = searchParams.get("language") ?? "";

    function pushParams(updates: Record<string, string>) {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, val] of Object.entries(updates)) {
            if (val) params.set(key, val);
            else params.delete(key);
        }
        params.delete("page");
        router.push(`${paths.dashboard.challenges}?${params.toString()}`);
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const next = e.target.value;
        setTitle(next);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            pushParams({ title: next.trim() });
        }, 400);
    }

    return (
        <div className="flex items-center gap-3">
            <div className="relative flex items-center">
                <svg
                    className="absolute left-3 w-4 h-4 text-zinc-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Search challenges..."
                    className="w-52 bg-[#121214] border border-white/5 rounded-md h-9 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/50"
                />
            </div>

            <FilterDropdown
                options={DIFFICULTIES}
                value={difficulty}
                onChange={(v) => pushParams({ difficulty: v })}
            />

            <FilterDropdown
                options={LANGUAGES}
                value={language}
                onChange={(v) => pushParams({ language: v })}
            />

            {(title || difficulty || language) && (
                <button
                    onClick={() => { setTitle(""); pushParams({ title: "", difficulty: "", language: "" }); }}
                    className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-1"
                >
                    Clear
                </button>
            )}
        </div>
    );
}
