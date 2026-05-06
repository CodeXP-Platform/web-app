import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ChallengesPage() {
  const challenges = [
    {
      id: 1,
      title: "Recursive DOM Traverser",
      description: "Engineer an optimized algorithm to traverse complex nested shadow DOM structures...",
      xp: "1,200",
      tags: [{ label: "JAVASCRIPT", color: "bg-black/40 text-zinc-300", border: "border-white/5" }, { label: "ADVANCED", color: "bg-rose-500/10 text-rose-400", border: "border-rose-500/20" }],
      bgHeader: "bg-gradient-to-br from-[#0c2e4e] to-[#0f172a]",
      bgPattern: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
    },
    {
      id: 2,
      title: "Neural Link Validator",
      description: "Build a cryptographic validation layer for multi-agent neural transmissions...",
      xp: "950",
      tags: [{ label: "PYTHON", color: "bg-black/40 text-zinc-300", border: "border-white/5" }, { label: "SECURITY", color: "bg-emerald-500/10 text-emerald-400", border: "border-emerald-500/20" }],
      bgHeader: "bg-[#041a15]",
      isBinaryPattern: true
    },
    {
      id: 3,
      title: "Atomic State Manager",
      description: "Construct a lightweight, dependency-free state management system using React...",
      xp: "2,500",
      tags: [{ label: "REACT", color: "bg-black/40 text-zinc-300", border: "border-white/5" }, { label: "UI/UX", color: "bg-blue-500/10 text-blue-400", border: "border-blue-500/20" }],
      bgHeader: "bg-gradient-to-b from-[#2a0e1b] to-[#1a0f18]",
      bgPattern: "repeating-radial-gradient(circle at center, transparent 0, transparent 4px, rgba(255,255,255,0.05) 5px, rgba(255,255,255,0.05) 6px)"
    },
    {
      id: 4,
      title: "Distributed Lock Architect",
      description: "Design a fault-tolerant distributed locking mechanism using Redis and Lua scripting...",
      xp: "3,200",
      tags: [{ label: "REDIS", color: "bg-black/40 text-zinc-300", border: "border-white/5" }, { label: "ARCHITECTURE", color: "bg-orange-500/10 text-orange-400", border: "border-orange-500/20" }],
      bgHeader: "bg-gradient-to-r from-[#2c120c] to-[#1a0b08]",
      bgPattern: "linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.03) 75%, transparent 75%, transparent)"
    },
    {
      id: 5,
      title: "WebAssembly Image Processor",
      description: "Compile a C++ image processing library to WebAssembly and interface with JavaScript...",
      xp: "1,800",
      tags: [{ label: "WASM", color: "bg-black/40 text-zinc-300", border: "border-white/5" }, { label: "C++", color: "bg-indigo-500/10 text-indigo-400", border: "border-indigo-500/20" }],
      bgHeader: "bg-gradient-to-br from-[#1c1236] to-[#0e091b]",
      bgPattern: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 1px, transparent 1px)"
    },
    {
      id: 6,
      title: "Zero-Knowledge Auth Flow",
      description: "Implement a zero-knowledge proof authentication protocol to verify users securely...",
      xp: "4,500",
      tags: [{ label: "CRYPTOGRAPHY", color: "bg-black/40 text-zinc-300", border: "border-white/5" }, { label: "HARD", color: "bg-rose-500/10 text-rose-400", border: "border-rose-500/20" }],
      bgHeader: "bg-gradient-to-tr from-[#111114] to-[#1f1f2e]",
      bgPattern: "linear-gradient(135deg, rgba(255,255,255,0.03) 10%, transparent 10%, transparent 50%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.03) 60%, transparent 60%, transparent)"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Challenge Catalog</h1>
          <p className="text-zinc-400 text-sm">Explore and conquer challenges to earn XP and level up.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 bg-white/5 border-white/10 text-zinc-300 text-xs">All Categories</Button>
           <Button variant="outline" className="h-9 bg-white/5 border-white/10 text-zinc-300 text-xs">In Progress</Button>
           <Button variant="outline" className="h-9 bg-white/5 border-white/10 text-zinc-300 text-xs">Completed</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="bg-[#121214] border-white/5 overflow-hidden flex flex-col group hover:border-white/10 transition-colors h-[320px]">
             <div className={`h-36 w-full relative ${challenge.bgHeader} flex items-start p-4`}>
                {challenge.isBinaryPattern ? (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 overflow-hidden">
                     <div className="text-[10px] leading-none text-emerald-500 font-mono tracking-widest flex flex-wrap gap-1 p-2">
                        {Array.from({length: 40}).map((_, i) => (
                           <span key={i}>{Math.random() > 0.5 ? '1' : '0'}</span>
                        ))}
                     </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 opacity-30" style={challenge.bgPattern ? { backgroundImage: challenge.bgPattern, backgroundSize: '20px 20px' } : {}}></div>
                )}
                <div className="flex gap-2 relative z-10">
                   {challenge.tags.map((tag, i) => (
                     <Badge key={i} variant="secondary" className={`${tag.color} ${tag.border} border text-[9px] font-bold uppercase tracking-wider rounded-sm px-2 py-0.5`}>
                       {tag.label}
                     </Badge>
                   ))}
                </div>
             </div>
             <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-white mb-2 tracking-tight">{challenge.title}</h3>
                <p className="text-xs text-zinc-400 mb-4 flex-1 line-clamp-3 leading-relaxed">{challenge.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                   <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      {challenge.xp} XP
                   </div>
                   <Button className="h-7 bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 rounded text-[10px] font-bold tracking-widest px-4">START</Button>
                </div>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
