import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Profile Section */}
      <div className="relative rounded-2xl bg-[#121214] border border-white/5 p-8 overflow-hidden">
         <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-r from-indigo-500/20 via-transparent to-transparent"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center shrink-0">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div className="text-center md:text-left flex-1">
               <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white tracking-tight">Alex Developer</h1>
                  <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold uppercase tracking-wider text-[10px] w-fit mx-auto md:mx-0">Level 42 Operator</Badge>
               </div>
               <p className="text-zinc-400 text-sm mb-4">Joined May 2026 • Full-Stack Focus</p>
               <div className="flex justify-center md:justify-start">
                  <a href="/dashboard/profile/edit" className="inline-flex items-center justify-center rounded-md text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-white h-8 px-4 transition-colors">
                     Edit Profile
                  </a>
               </div>
            </div>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <Card className="bg-[#121214] border-white/5 p-6 flex flex-col items-center justify-center text-center">
            <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">GLOBAL RANK</p>
            <p className="text-3xl font-bold text-white">#1,402</p>
         </Card>
         <Card className="bg-[#121214] border-white/5 p-6 flex flex-col items-center justify-center text-center">
            <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">TOTAL XP</p>
            <p className="text-3xl font-bold text-white">84,200</p>
         </Card>
         <Card className="bg-[#121214] border-white/5 p-6 flex flex-col items-center justify-center text-center">
            <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">COMPLETED</p>
            <p className="text-3xl font-bold text-white">47</p>
         </Card>
         <Card className="bg-[#121214] border-white/5 p-6 flex flex-col items-center justify-center text-center">
            <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-2">DAY STREAK</p>
            <p className="text-3xl font-bold text-emerald-400">14</p>
         </Card>
      </div>

      {/* Trophies & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Trophies */}
         <Card className="bg-[#121214] border-white/5 p-8 h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-white tracking-tight">Badges & Trophies</h3>
               <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">8 EARNED</span>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-4 overflow-y-auto pr-2">
               <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-pink-500/10 rounded-xl border border-pink-500/20 flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10"></path><path d="M17 4v8a5 5 0 0 1-10 0V4"></path><path d="M4 4h3v3H4z"></path><path d="M17 4h3v3h-3z"></path></svg>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium text-center leading-tight">Pathfinder Elite</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl border border-blue-500/20 flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium text-center leading-tight">First Star</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium text-center leading-tight">Algo Master</span>
               </div>
               <div className="flex flex-col items-center gap-2 opacity-40">
                  <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-medium text-center leading-tight">Locked</span>
               </div>
            </div>
         </Card>

         {/* Activity */}
         <Card className="bg-[#121214] border-white/5 p-8 h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-white tracking-tight">Activity Pulse</h3>
               <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">LAST 7 DAYS</span>
            </div>
            
            <div className="flex-1 flex items-end gap-2 mt-auto">
               <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[30%] hover:bg-white/10 transition-colors"></div>
               <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[40%] hover:bg-white/10 transition-colors"></div>
               <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[20%] hover:bg-white/10 transition-colors"></div>
               <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[60%] hover:bg-white/10 transition-colors"></div>
               <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[50%] hover:bg-white/10 transition-colors"></div>
               <div className="flex-1 bg-white/[0.03] rounded-t-sm h-[80%] hover:bg-white/10 transition-colors"></div>
               <div className="flex-1 bg-indigo-400 rounded-t-sm h-[90%] shadow-[0_0_20px_rgba(129,140,248,0.2)]"></div>
            </div>
         </Card>
      </div>

    </div>
  );
}
