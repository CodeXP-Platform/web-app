"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/use-auth";
import useGamification from "@/hooks/use-gamification";

export function SidebarUserLevel() {
  const user = useAuth((s) => s.user);
  const { profile, fetchUserData } = useGamification();

  useEffect(() => {
    if (user?.id) fetchUserData(user.id);
  }, [user?.id, fetchUserData]);

  return (
    <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">
      {profile ? `LEVEL ${profile.level} OPERATOR` : "OPERATOR"}
    </p>
  );
}
