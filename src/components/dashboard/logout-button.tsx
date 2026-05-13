"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { paths } from "@/lib/paths";

export function LogoutButton() {
    const clearAuth = useAuth((s) => s.clearAuth);
    const router = useRouter();

    function handleLogout() {
        clearAuth();
        router.push(paths.auth.login);
    }

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:text-red-400 text-xs font-medium uppercase tracking-wider transition-colors w-full"
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
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            LOGOUT
        </button>
    );
}
