import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/authService";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(email, password);
          localStorage.setItem("authToken", response.token);
          set({
            user: response.user,
            token: response.token,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      register: async (email: string, password: string, name: string, phone?: string) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(email, password, name, phone);
          localStorage.setItem("authToken", response.token);
          set({
            user: response.user,
            token: response.token,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
          localStorage.removeItem("authToken");
          set({
            user: null,
            token: null,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      setUser: (user: User | null) => set({ user }),
      setToken: (token: string | null) => set({ token }),
      initialize: () => {
        // With JWT in localStorage (via persist), initialization happens automatically
        // No need for onAuthStateChanged listener
      },
    }),
    {
      name: "auth-store",
    }
  )
);

