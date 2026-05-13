import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponse, User } from "@/services/iam/types";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  _hasHydrated: boolean;
  setAuth: (response: AuthResponse) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  setHasHydrated: (value: boolean) => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      _hasHydrated: false,
      setAuth: (response: AuthResponse) =>
        set({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user,
        }),
      setUser: (user: User) => set({ user }),
      clearAuth: () =>
        set({ accessToken: null, refreshToken: null, user: null }),
      setHasHydrated: (value: boolean) => set({ _hasHydrated: value }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useAuth;
