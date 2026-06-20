"use client";

import {
  Code,
  DashboardSquare02Icon,
  TeacherIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { paths } from "@/lib/paths";
import { isTeacher } from "@/lib/roles";

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

const teacherNavItem = {
  href: paths.dashboard.teacher.root,
  icon: TeacherIcon,
  label: "Teaching",
};

export function SidebarNav() {
  const pathname = usePathname();
  const role = useAuth((s) => s.user?.role);

  const items = isTeacher(role) ? [...navItems, teacherNavItem] : navItems;

  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href === paths.dashboard.teacher.root &&
            pathname.startsWith(paths.dashboard.teacher.root));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "text-indigo-400"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
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
