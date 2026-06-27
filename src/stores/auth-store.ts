import { create } from "zustand";
import { api } from "@/lib/api";

export type UserRole = "super_admin" | "admin" | "teacher" | "student";

export interface AuthUser {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
  student?: { studentId: string };
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: AuthUser | null) => void;

  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
}

let fetchMeGeneration = 0;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  initialized: false,

  setUser: (user) => set({ user }),

  login: async (identifier, password) => {
    // Cancel any in-flight fetchMe
    fetchMeGeneration++;
    const { data } = await api.post("/auth/login", { identifier, password });
    const { user, tokens } = data.data;
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    set({ user, initialized: true, loading: false });
    return user;
  },

  logout: async () => {
    fetchMeGeneration++;
    try {
      await api.post("/auth/logout");
    } catch {}
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ user: null, initialized: true, loading: false });
  },

  fetchMe: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      set({ user: null, initialized: true, loading: false });
      return;
    }
    const gen = ++fetchMeGeneration;
    set({ loading: true });
    try {
      const { data } = await api.get("/auth/me");
      // Only apply result if no login/logout happened in the meantime
      if (gen === fetchMeGeneration) {
        set({ user: data.data, initialized: true, loading: false });
      }
    } catch {
      if (gen === fetchMeGeneration) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({ user: null, initialized: true, loading: false });
      }
    }
  },
}));
