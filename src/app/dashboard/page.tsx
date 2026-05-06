import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Top Section */}
            <div className="grid grid-cols-3 gap-6">
                {/* Active Path Banner */}
                <div className="col-span-2 relative overflow-hidden rounded-xl bg-[#121214] border border-white/5 p-8 flex flex-col justify-between min-h-[240px]">
                    {/* Abstract background graphics */}
                    <div className="absolute inset-0 pointer-events-none opacity-50">
                        <div className="absolute right-0 top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.15)_0%,transparent_50%)]"></div>
                        {/* Simple lines background */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.02) 75%, transparent 75%, transparent)",
                                backgroundSize: "100px 100px",
                            }}
                        ></div>
                    </div>

                    <div className="relative z-10">
                        <p className="text-indigo-400 text-[10px] font-bold tracking-widest uppercase mb-3">
                            ACTIVE PATH
                        </p>
                        <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
                            Full-Stack Architect
                        </h1>
                        <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
                            Master the cosmic architecture of modern web systems
                            from reactive kernels to high-availability clusters.
                        </p>
                    </div>

                    <div className="relative z-10 mt-8">
                        <div className="flex items-end justify-between mb-3">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-indigo-400 leading-none">
                                    64%
                                </span>
                                <span className="text-zinc-400 text-xs">
                                    to Level 43
                                </span>
                            </div>
                            <span className="text-zinc-400 text-xs">
                                Next: Distributed Locking Systems
                            </span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden flex">
                            <div
                                className="bg-indigo-400 h-full rounded-r-full shadow-[0_0_10px_rgba(129,140,248,0.5)] relative"
                                style={{ width: "64%" }}
                            >
                                <div className="absolute inset-0 bg-white/20 w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="col-span-1 flex flex-col gap-6">
                    <Card className="flex-1 bg-[#121214] border-white/5 flex items-center justify-between p-6">
                        <div>
                            <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">
                                GLOBAL RANK
                            </p>
                            <p className="text-2xl font-bold text-white">
                                #1,402
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ec4899"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="8" r="7"></circle>
                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                            </svg>
                        </div>
                    </Card>
                    <Card className="flex-1 bg-[#121214] border-white/5 flex items-center justify-between p-6">
                        <div>
                            <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">
                                TOTAL XP
                            </p>
                            <p className="text-2xl font-bold text-white">
                                84,200
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#818cf8"
                                strokeWidth="2"
                            >
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                            </svg>
                        </div>
                    </Card>
                </div>
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
                    <button className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest flex items-center gap-1.5 pb-2 transition-colors">
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
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Challenge Card 1 */}
                    <Card className="bg-[#121214] border-white/5 overflow-hidden flex flex-col group hover:border-white/10 transition-colors h-[320px]">
                        <div className="h-36 w-full relative bg-gradient-to-br from-[#0c2e4e] to-[#0f172a] flex items-start p-4">
                            <div
                                className="absolute inset-0 opacity-30"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                                    backgroundSize: "20px 20px",
                                }}
                            ></div>
                            <div className="flex gap-2 relative z-10">
                                <Badge
                                    variant="secondary"
                                    className="bg-black/40 text-zinc-300 hover:bg-black/60 border border-white/5 text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5"
                                >
                                    JAVASCRIPT
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5"
                                >
                                    ADVANCED
                                </Badge>
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                                Recursive DOM Traverser
                            </h3>
                            <p className="text-xs text-zinc-400 mb-4 flex-1 line-clamp-3 leading-relaxed">
                                Engineer an optimized algorithm to traverse
                                complex nested shadow DOM structures...
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#818cf8"
                                        strokeWidth="2"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    1,200 XP
                                </div>
                                <Button className="h-7 bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 rounded text-[10px] font-bold tracking-widest px-4">
                                    START
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Challenge Card 2 */}
                    <Card className="bg-[#121214] border-white/5 overflow-hidden flex flex-col group hover:border-white/10 transition-colors h-[320px]">
                        <div className="h-36 w-full relative bg-[#041a15] flex items-start p-4">
                            <div className="absolute inset-0 flex items-center justify-center opacity-20 overflow-hidden">
                                <div className="text-[10px] leading-none text-emerald-500 font-mono tracking-widest flex flex-wrap gap-1 p-2">
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <span key={i}>
                                            {Math.random() > 0.5 ? "1" : "0"}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 relative z-10">
                                <Badge
                                    variant="secondary"
                                    className="bg-black/40 text-zinc-300 hover:bg-black/60 border border-white/5 text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5"
                                >
                                    PYTHON
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5"
                                >
                                    SECURITY
                                </Badge>
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                                Neural Link Validator
                            </h3>
                            <p className="text-xs text-zinc-400 mb-4 flex-1 line-clamp-3 leading-relaxed">
                                Build a cryptographic validation layer for
                                multi-agent neural transmissions...
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#818cf8"
                                        strokeWidth="2"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    950 XP
                                </div>
                                <Button className="h-7 bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 rounded text-[10px] font-bold tracking-widest px-4">
                                    START
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Challenge Card 3 */}
                    <Card className="bg-[#121214] border-white/5 overflow-hidden flex flex-col group hover:border-white/10 transition-colors h-[320px]">
                        <div className="h-36 w-full relative bg-gradient-to-b from-[#2a0e1b] to-[#1a0f18] flex items-start p-4">
                            <div
                                className="absolute inset-0 opacity-40"
                                style={{
                                    background:
                                        "repeating-radial-gradient(circle at center, transparent 0, transparent 4px, rgba(255,255,255,0.05) 5px, rgba(255,255,255,0.05) 6px)",
                                }}
                            ></div>
                            <div className="flex gap-2 relative z-10">
                                <Badge
                                    variant="secondary"
                                    className="bg-black/40 text-zinc-300 hover:bg-black/60 border border-white/5 text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5"
                                >
                                    REACT
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5"
                                >
                                    UI/UX
                                </Badge>
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                                Atomic State Manager
                            </h3>
                            <p className="text-xs text-zinc-400 mb-4 flex-1 line-clamp-3 leading-relaxed">
                                Construct a lightweight, dependency-free state
                                management system using React...
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#818cf8"
                                        strokeWidth="2"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                    2,500 XP
                                </div>
                                <Button className="h-7 bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 rounded text-[10px] font-bold tracking-widest px-4">
                                    START
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
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
