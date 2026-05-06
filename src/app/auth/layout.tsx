import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans selection:bg-purple-500/30 flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-3 h-6 bg-blue-500 rounded-sm"></div>
          <span className="text-xl font-semibold tracking-tight text-white">
            CodeXP
          </span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        {children}
      </div>
    </div>
  );
}
