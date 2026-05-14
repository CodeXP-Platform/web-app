import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserLevelBanner } from "@/components/dashboard/user-level-banner";
import { UserStatsCards } from "@/components/dashboard/user-stats-cards";
import { TrendingChallenges } from "@/components/dashboard/trending-challenges";
import { paths } from "@/lib/paths";

export default function DashboardPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Top Section */}
            <div className="grid grid-cols-3 gap-6">
                <UserLevelBanner />
                <UserStatsCards />
            </div>

            {/* Challenges Section */}
            <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between border-b border-white/5">
                    <Tabs defaultValue="trending" className="w-auto">
                        <TabsList className="bg-transparent border-none gap-6">
                            <TabsTrigger value="trending">
                                Trending Challenges
                            </TabsTrigger>
                            <TabsTrigger value="mypaths">My Paths</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Link
                        href={paths.dashboard.challenges}
                        className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest flex items-center gap-1.5 pb-2 transition-colors"
                    >
                        VIEW ALL CHALLENGES{" "}
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>

                <TrendingChallenges />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-3 gap-6 pt-2 pb-8">
                <Card className="col-span-2 bg-[#121214] border-white/5 p-8 flex flex-col h-[280px]">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-white tracking-tight">
                            Activity Pulse
                        </h3>
                        <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
                            LAST 7 DAYS
                        </span>
                    </div>

                    {/* Mock Bar Chart */}
                    <div className="flex-1 flex items-end gap-1 mt-auto">
                        <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[30%]"></div>
                        <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[40%]"></div>
                        <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[20%]"></div>
                        <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[60%]"></div>
                        <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[50%]"></div>
                        <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[80%] relative group">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2a2a35] text-[10px] font-medium text-white px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                Today: 450 XP
                            </div>
                        </div>
                        <div className="flex-1 bg-indigo-400 rounded-t-sm h-[90%] shadow-[0_0_20px_rgba(129,140,248,0.2)]"></div>
                    </div>
                </Card>

                <Card className="col-span-1 bg-[#121214] border-white/5 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden h-[280px]">
                    <div className="absolute top-4 right-4 text-zinc-700">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                            <line x1="4" y1="22" x2="4" y2="15"></line>
                        </svg>
                    </div>

                    <div className="w-20 h-20 bg-pink-400 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(244,114,182,0.2)]">
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#121214"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M8 21h8"></path>
                            <path d="M12 17v4"></path>
                            <path d="M7 4h10"></path>
                            <path d="M17 4v8a5 5 0 0 1-10 0V4"></path>
                            <path d="M4 4h3v3H4z"></path>
                            <path d="M17 4h3v3h-3z"></path>
                        </svg>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">
                        Pathfinder Elite
                    </h3>
                    <p className="text-xs text-zinc-400 mb-6 max-w-[200px] leading-relaxed">
                        Unlocked for completing 5 paths in under 30 days.
                    </p>

                    <button className="text-pink-400 hover:text-pink-300 text-[10px] font-bold uppercase tracking-widest transition-colors">
                        SHARE TROPHY
                    </button>
                </Card>
            </div>
        </div>
    );
}
