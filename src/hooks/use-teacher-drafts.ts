import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * The backend catalog endpoint (`GET /challenges`) only returns *published*
 * challenges, and there is no "list my challenges" endpoint. A teacher can,
 * however, fetch their own unpublished challenge by id (the owner check in
 * ChallengeQueryServiceImpl allows it). To let teachers find their drafts
 * again we remember the ids they create in this browser, keyed by user id.
 */
interface TeacherDraftsState {
  /** Map of userId -> challengeIds the user has authored from this device. */
  byUser: Record<string, string[]>;
  trackChallenge: (userId: string, challengeId: string) => void;
  untrackChallenge: (userId: string, challengeId: string) => void;
  getChallengeIds: (userId: string) => string[];
}

const useTeacherDrafts = create<TeacherDraftsState>()(
  persist(
    (set, get) => ({
      byUser: {},
      trackChallenge: (userId, challengeId) =>
        set((state) => {
          const current = state.byUser[userId] ?? [];
          if (current.includes(challengeId)) return state;
          return {
            byUser: { ...state.byUser, [userId]: [...current, challengeId] },
          };
        }),
      untrackChallenge: (userId, challengeId) =>
        set((state) => ({
          byUser: {
            ...state.byUser,
            [userId]: (state.byUser[userId] ?? []).filter(
              (id) => id !== challengeId,
            ),
          },
        })),
      getChallengeIds: (userId) => get().byUser[userId] ?? [],
    }),
    { name: "teacher-drafts-storage" },
  ),
);

export default useTeacherDrafts;
