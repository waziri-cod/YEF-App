import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthStore, User } from "@/store/authStore";

interface GuardProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: GuardProps) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  if (!user) {
    // not logged in -> redirect to sign in and preserve destination
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }
  return <>{children}</>;
}

export function AdminRoute({ children }: GuardProps) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  if (!user) {
    // unauthenticated users go to login
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }
  if (user.role !== "admin") {
    // logged-in non-admins go home
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
