"use client";

import {
    CommandLineIcon,
    DashboardSquare02Icon,
    User,
} from "@hugeicons/core-free-icons";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { paths } from "@/lib/pahts";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
    {
        label: "Dashboard",
        icon: DashboardSquare02Icon,
        path: paths.dashboard.root,
    },
    {
        label: "Challenges",
        icon: CommandLineIcon,
        path: paths.dashboard.challenges.root,
    },
];

export default function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-sm">
                            Code XP
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="gap-1">
                    {routes.map((route) => (
                        <Link href={route.path} key={route.label}>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    size={"lg"}
                                    className="text-sm"
                                    isActive={
                                        route.path === paths.dashboard.root
                                            ? pathname === route.path
                                            : pathname.startsWith(route.path)
                                    }
                                >
                                    <HugeiconsIcon
                                        icon={route.icon}
                                        size={36}
                                    />
                                    {route.label}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    ))}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <HugeiconsIcon icon={User} />
                            Username
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
