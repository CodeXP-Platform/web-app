import Link from "next/link";
import { paths } from "@/lib/paths";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-3 h-6 bg-blue-500 rounded-sm"></div>
            <span className="text-xl font-semibold tracking-tight text-white">CodeXP</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#" className="hover:text-white transition-colors">Platform</Link>
            <Link href="#" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="#" className="hover:text-white transition-colors">Resources</Link>
            <Link href="#" className="hover:text-white transition-colors">Enterprise</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href={paths.auth.login} className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Log In
          </Link>
          <Link href={paths.auth.register}>
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md px-5 h-9 text-sm font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 mt-12 mb-24">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 uppercase tracking-wider backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></div>
            NOW INTEGRATED WITH CODEXP LLM-4
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
            Master the{" "}
            <AnimatedGradientText 
              speed={1.5} 
              colorFrom="#818cf8" 
              colorTo="#c084fc"
              className="block sm:inline"
            >
              Machine.
            </AnimatedGradientText>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light">
            The ultra-fast, AI-native IDE designed to augment your intelligence and ship production-grade software in record time.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href={paths.auth.register}>
              <Button className="bg-white text-black hover:bg-zinc-200 h-12 px-8 text-base font-semibold rounded-md">
                Start Building Free
              </Button>
            </Link>
            <Link href={paths.dashboard.root}>
              <Button variant="outline" className="h-12 px-8 text-base font-medium rounded-md border-white/10 hover:bg-white/5 text-white bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
                Live Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full mt-32 mb-24 space-y-12">
          <div className="text-left max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Engineered for{" "}
              <AnimatedGradientText speed={1} colorFrom="#818cf8" colorTo="#c084fc">
                Performance.
              </AnimatedGradientText>
            </h2>
            <p className="text-lg text-zinc-400">
              Tools that feel like an extension of your thought process.<br className="hidden md:block" />
              Lightweight yet infinitely powerful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="md:col-span-2 bg-[#121214] border-white/5 overflow-hidden flex flex-col justify-between group/card">
              <CardHeader className="p-8 pb-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <CardTitle className="text-2xl font-semibold text-white">Neural Architecture Context</CardTitle>
                <CardDescription className="text-base text-zinc-400 mt-2 max-w-md">
                  Our AI doesn't just read files; it understands your entire system architecture. Ask complex questions across service boundaries and get precise, contextual answers.
                </CardDescription>
              </CardHeader>
              <div className="h-48 mt-8 bg-gradient-to-t from-indigo-500/20 to-transparent flex items-end">
                 {/* Decorative background element mimicking the code matrix */}
                 <div className="w-full h-full opacity-30" style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)", backgroundSize: "20px 100%" }}></div>
              </div>
            </Card>

            <div className="flex flex-col gap-6 md:col-span-1">
              {/* Feature 2 */}
              <Card className="flex-1 bg-[#121214] border-white/5 p-8 flex flex-col group/card">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Pair Programming</h3>
                <p className="text-sm text-zinc-400">Ultra-low latency collaboration. Code together as if you were on the same machine.</p>
              </Card>

              {/* Feature 3 */}
              <Card className="flex-1 bg-[#121214] border-white/5 p-8 flex flex-col group/card">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Skill Progression</h3>
                <p className="text-sm text-zinc-400">Turn mastery into a quest. Earn badges and track your technical growth across languages.</p>
              </Card>
            </div>

            {/* Feature 4 (Full Width) */}
            <Card className="md:col-span-3 bg-[#121214] border-white/5 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group/card">
              <div className="max-w-2xl">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Enterprise-Grade Security</h3>
                <p className="text-base text-zinc-400">
                  Your code remains yours. CodeXP features local-only inference options, air-gapped deployments, and zero-knowledge data retention policies. SOC2 Type II compliant by default.
                </p>
              </div>
              <div className="flex gap-8 mt-6 md:mt-0 shrink-0">
                <div className="text-center md:text-right">
                  <p className="text-3xl font-bold text-white mb-1">99.9%</p>
                  <p className="text-xs font-semibold text-zinc-500 tracking-wider">UPTIME</p>
                </div>
                <div className="w-px bg-white/10 h-12 self-center hidden sm:block"></div>
                <div className="text-center md:text-right">
                  <p className="text-3xl font-bold text-white mb-1">256-bit</p>
                  <p className="text-xs font-semibold text-zinc-500 tracking-wider">ENCRYPTION</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full py-16 border-y border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center my-12">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">10M+</p>
            <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase">Developers</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">350k</p>
            <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase">Organizations</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-white mb-2">2.5B</p>
            <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase">Lines Written</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 mb-2">15ms</p>
            <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase">Avg. Latency</p>
          </div>
        </div>

        {/* Higher Education B2B Section */}
        <div className="w-full mt-32 flex flex-col items-center">
          <div className="text-center max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              CodeXP for{" "}
              <AnimatedGradientText speed={1} colorFrom="#3b82f6" colorTo="#8b5cf6">
                Higher Education.
              </AnimatedGradientText>
            </h2>
            <p className="text-lg text-zinc-400">
              Transform your computer science curriculum. Deploy a gamified, AI-driven software engineering lab that bridges the gap between theory and industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12">
            <Card className="bg-[#121214] border-white/5 p-8 flex flex-col hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Teaching Assistant 24/7</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Our Socratic AI mentor guides students through complex architectural decisions and debugging without just handing them the answers, drastically reducing professor grading loads.
              </p>
            </Card>

            <Card className="bg-[#121214] border-white/5 p-8 flex flex-col hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Industry-Ready Architecture</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Move beyond console scripts. Students learn to build production-grade microservices, atomic state managers, and distributed systems directly within our sandboxed cloud environments.
              </p>
            </Card>

            <Card className="bg-[#121214] border-white/5 p-8 flex flex-col hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-6 border border-pink-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10"></path><path d="M17 4v8a5 5 0 0 1-10 0V4"></path><path d="M4 4h3v3H4z"></path><path d="M17 4h3v3h-3z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Gamified Retention</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Built-in XP systems, custom quests, and university-wide leaderboards keep engineering students highly engaged and coding consistently every single day.
              </p>
            </Card>

            <Card className="bg-[#121214] border-white/5 p-8 flex flex-col hover:border-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Zero Configuration Deployments</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Say goodbye to "it works on my machine" issues. Our cloud instances provision instantly, allowing students to start coding on day one without complex local setups.
              </p>
            </Card>
          </div>
          
          <Button className="h-12 px-8 text-base font-semibold rounded-md bg-white text-black hover:bg-zinc-200">
            Request University Demo
          </Button>
        </div>

        {/* Testimonials Section */}
        <div className="w-full mt-32 mb-32 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-16 text-center">
            Operator{" "}
            <AnimatedGradientText speed={1} colorFrom="#818cf8" colorTo="#c084fc">
              Feedback.
            </AnimatedGradientText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <Card className="bg-[#121214] border-white/5 p-8 flex flex-col justify-between min-h-[250px]">
              <div>
                <svg className="w-8 h-8 text-indigo-500/30 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                <p className="text-base text-zinc-300 italic mb-8">
                  "CodeXP doesn't just help me write code; it helps me think. The AI context is so deep it feels like collaborating with a senior architect who knows my whole stack."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500"></div>
                <div>
                  <p className="text-sm font-semibold text-white">Sarah Chen</p>
                  <p className="text-xs text-zinc-500">Principal Engineer, Synthetix</p>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121214] border-white/5 p-8 flex flex-col justify-between min-h-[250px]">
              <div>
                <svg className="w-8 h-8 text-purple-500/30 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                <p className="text-base text-zinc-300 italic mb-8">
                  "The transition from VS Code was seamless, but the productivity gain was immediate. We've reduced our sprint cycles by 30% since adopting the CodeXP framework."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-400"></div>
                <div>
                  <p className="text-sm font-semibold text-white">Marcus Thorne</p>
                  <p className="text-xs text-zinc-500">CTO, Orbit Aerospace</p>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121214] border-white/5 p-8 flex flex-col justify-between min-h-[250px]">
              <div>
                <svg className="w-8 h-8 text-pink-500/30 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                <p className="text-base text-zinc-300 italic mb-8">
                  "Security was our main concern with AI. CodeXP's local-inference mode gave our compliance team peace of mind while giving our devs superpowers."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-400"></div>
                <div>
                  <p className="text-sm font-semibold text-white">Elena Rodriguez</p>
                  <p className="text-xs text-zinc-500">Head of Security, FinTech Global</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#121214] to-[#0a0a0c] border border-white/10 p-12 md:p-24 text-center my-12">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
           
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to evolve?</h2>
           <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto relative z-10">
              Join the next generation of engineers building the world's most complex software at the speed of thought.
           </p>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href={paths.auth.register}>
                <Button className="bg-indigo-400 hover:bg-indigo-500 text-black h-12 px-8 text-base font-semibold rounded-md w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Button variant="outline" className="h-12 px-8 text-base font-medium rounded-md border-white/10 hover:bg-white/5 text-white bg-transparent w-full sm:w-auto">
                Contact Sales
              </Button>
           </div>
           
           <p className="mt-8 text-xs font-semibold text-zinc-500 tracking-widest uppercase relative z-10">
             NO CREDIT CARD REQUIRED • 14-DAY PRO TRIAL
           </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 pt-20 pb-10 px-6 md:px-12 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-3 h-6 bg-blue-500 rounded-sm"></div>
              <span className="text-xl font-semibold tracking-tight text-white">CodeXP</span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
              The world's most advanced AI-integrated coding environment. Built for the future of engineering.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">Downloads</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Extensions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Showcase</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
          <p className="text-sm text-zinc-500 mb-4 md:mb-0">
            © 2026 Kinetic CodeXP Framework. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-zinc-400">All Systems Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
