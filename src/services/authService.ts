import { User } from "@/store/authStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async register(
    email: string,
    password: string,
    name: string,
    phone?: string
  ): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, phone }),
      });

      if (!response.ok) {
        try {
          const error = await response.json();
          throw new Error(error.error || `Registration failed: ${response.statusText}`);
        } catch {
          throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      return {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          phone: data.user.phone,
          createdAt: new Date().toISOString(),
        },
        token: data.token,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create account";
      console.error("Registration error:", message);
      throw new Error(message);
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        try {
          const error = await response.json();
          throw new Error(error.error || `Login failed: ${response.statusText}`);
        } catch {
          throw new Error(`Login failed: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      return {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          phone: data.user.phone,
          createdAt: new Date().toISOString(),
        },
        token: data.token,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign in";
      console.error("Login error:", message);
      throw new Error(message);
    }
  },

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign out";
      console.error("Logout error:", message);
      throw new Error(message);
    }
  },

  async getCurrentUser(): Promise<User | null> {
    // In a JWT-based system, we rely on the token stored in the store
    // If needed, you could add a /me endpoint to validate and get current user from token
    return null;
  },
};

