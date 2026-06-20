"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/use-auth";
import { paths } from "@/lib/paths";
import { isTeacher } from "@/lib/roles";

/**
 * Gates teacher-only routes. Runs inside the dashboard layout, which already
 * guarantees authentication via AuthGuard, so here we only check the role.
 * Non-teachers are bounced back to the dashboard root.
 */
export function TeacherGuard({ children }: { children: React.ReactNode }) {
  const user = useAuth((s) => s.user);
  const hasHydrated = useAuth((s) => s._hasHydrated);
  const router = useRouter();

  const allowed = isTeacher(user?.role);

  useEffect(() => {
    if (hasHydrated && !allowed) {
      router.replace(paths.dashboard.root);
    }
  }, [hasHydrated, allowed, router]);

  if (!hasHydrated) return null;
  if (!allowed) return null;

  return <>{children}</>;
}
