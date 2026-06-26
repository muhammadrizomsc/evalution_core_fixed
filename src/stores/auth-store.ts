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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  initialized: false,

  setUser: (user) => set({ user }),

  login: async (identifier, password) => {
    const { data } = await api.post("/auth/login", { identifier, password });
    const { accessToken, refreshToken, user } = data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    set({ user, initialized: true });
    return user;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch {}
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ user: null, initialized: true });
  },

  fetchMe: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      set({ user: null, initialized: true, loading: false });
      return;
    }
    set({ loading: true });
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data.data, initialized: true, loading: false });
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      set({ user: null, initialized: true, loading: false });
    }
  },
}));
