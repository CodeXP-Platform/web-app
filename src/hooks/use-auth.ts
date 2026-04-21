import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    jwt: string | null;
    setJwt: (jwt: string | null) => void;
}

const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            jwt: null,
            setJwt: (jwt: string | null) => set({ jwt }),
        }),
        {
            name: "auth-storage",
        },
    ),
);

export default useAuth;
