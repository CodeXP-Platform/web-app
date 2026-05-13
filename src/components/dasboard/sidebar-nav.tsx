"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Code,
    DashboardSquare02Icon,
    UserIcon,
} from "@hugeicons/core-free-icons";

const navItems = [
    {
        href: paths.dashboard.root,
        icon: DashboardSquare02Icon,
        label: "Dashboard",
    },
    {
        href: paths.dashboard.challenges,
        icon: Code,
        label: "Challenges",
    },
    {
        href: paths.dashboard.profile,
        icon: UserIcon,
        label: "Profile",
    },
];

export function SidebarNav() {
    const pathname = usePathname();

    return (
        <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium border-l-2 transition-colors ${
                            isActive
                                ? "text-indigo-400"
                                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border-transparent"
                        }`}
                    >
                        <HugeiconsIcon icon={item.icon} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
