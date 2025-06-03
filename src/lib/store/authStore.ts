import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  hasHydrated: boolean;
  setHasHydrated: () => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{ success: boolean; error?: string }>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      logout: () => {
        set({ user: null, token: null });
      },

      hasHydrated: false,
      setHasHydrated: () => set({ hasHydrated: true }),

      login: async (email, password) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );

          if (!res.ok) {
            const err = await res.json();
            return {
              success: false,
              error: err.message || "Invalid credentials",
            };
          }

          const data = await res.json();
          set({ user: data.user, token: data.token });
          return { success: true };
        } catch (err: unknown) {
          return { success: false, error: err || "Login failed" };
        }
      },

      signup: async (email, password, name) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password, name }),
            }
          );

          if (!res.ok) {
            const err = await res.json();
            return { success: false, error: err.message || "Signup failed" };
          }

          const data = await res.json();
          set({ user: data.user, token: data.token });
          return { success: true };
        } catch (err: unknown) {
          return { success: false, error: err || "Signup failed" };
        }
      },
    }),
    {
      name: "auth-storage", // stored in localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    }
  )
);
