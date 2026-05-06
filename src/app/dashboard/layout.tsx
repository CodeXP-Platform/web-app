import Link from "next/link";
import { paths } from "@/lib/paths";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/dasboard/sidebar-nav";
import { SourceCodeIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#0c0c0e] text-zinc-100 font-sans selection:bg-indigo-500/30">
            {/* Sidebar */}
            <aside className="w-64 bg-[#121214] border-r border-white/5 flex flex-col shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <Link
                            href={paths.home}
                            className="w-8 h-8 rounded bg-indigo-500 flex items-center justify-center hover:opacity-90 transition-opacity"
                        >
                            <HugeiconsIcon icon={SourceCodeIcon} />
                        </Link>
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-tight leading-tight">
                                CodeXP
                            </h2>
                            <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">
                                LEVEL 42 OPERATOR
                            </p>
                        </div>
                    </div>
                </div>

                <SidebarNav />

                <div className="p-4 space-y-4 border-t border-white/5">
                    <div className="space-y-1 pb-2">
                        <Link
                            href={paths.dashboard.support}
                            className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:text-zinc-300 text-xs font-medium uppercase tracking-wider transition-colors"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            SUPPORT
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#0a0a0c]">
                {/* Top Navbar */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 shrink-0 bg-[#0a0a0c]">
                    <div className="flex items-center flex-1 max-w-2xl gap-4">
                        <div className="relative w-full max-w-md flex items-center">
                            <svg
                                className="absolute left-3 w-4 h-4 text-zinc-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line
                                    x1="21"
                                    y1="21"
                                    x2="16.65"
                                    y2="16.65"
                                ></line>
                            </svg>
                            <input
                                type="text"
                                placeholder="Search challenges, paths, or users..."
                                className="w-full bg-[#121214] border border-white/5 rounded-md h-9 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500/50"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 text-xs font-medium text-zinc-400 bg-[#121214] border border-white/5 rounded-md px-3 h-9 hover:bg-white/5 transition-colors">
                                LANGUAGE{" "}
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            <button className="flex items-center gap-2 text-xs font-medium text-zinc-400 bg-[#121214] border border-white/5 rounded-md px-3 h-9 hover:bg-white/5 transition-colors">
                                DIFFICULTY{" "}
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <button className="text-zinc-400 hover:text-white transition-colors relative">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border border-[#0a0a0c]"></span>
                        </button>
                        <button className="text-zinc-400 hover:text-white transition-colors">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-[#121214] border border-white/10 overflow-hidden flex items-center justify-center">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#a1a1aa"
                                strokeWidth="2"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                </header>

                {/* Dashboard Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">{children}</div>
            </main>
        </div>
    );
}
