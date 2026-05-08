import { create } from "zustand";
import { GamificationController } from "@/services/gamification/controller";
import type { UserProfileResponse } from "@/services/gamification/types";

interface GamificationState {
  profile: UserProfileResponse | null;
  globalRank: number | null;
  loading: boolean;
  /** Fetch profile + leaderboard rank for a user. No-op if already loaded. */
  fetchUserData: (userId: string) => Promise<void>;
  clearUserData: () => void;
}

const useGamification = create<GamificationState>((set, get) => ({
  profile: null,
  globalRank: null,
  loading: false,

  fetchUserData: async (userId: string) => {
    const { loading, profile } = get();
    // Already loaded for this user or in flight — skip
    if (loading || profile?.userId === userId) return;

    set({ loading: true });

    try {
      const [profileData, leaderboard] = await Promise.all([
        GamificationController.getUserProfile(userId),
        GamificationController.getGlobalLeaderboard(),
      ]);

      const entry = leaderboard.find((e) => e.userId === userId);

      set({
        profile: profileData,
        globalRank: entry?.rank ?? null,
        loading: false,
      });
    } catch {
      set({ loading: false });
    }
  },

  clearUserData: () => set({ profile: null, globalRank: null, loading: false }),
}));

export default useGamification;
