"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { paths } from "@/lib/paths";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const accessToken = useAuth((s) => s.accessToken);
    const hasHydrated = useAuth((s) => s._hasHydrated);
    const router = useRouter();

    useEffect(() => {
        if (hasHydrated && !accessToken) {
            router.replace(paths.auth.login);
        }
    }, [accessToken, hasHydrated, router]);

    if (!hasHydrated) return null;
    if (!accessToken) return null;

    return <>{children}</>;
}
