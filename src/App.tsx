/**
 * ============================================
 * MAIN APPLICATION COMPONENT
 * ============================================
 * Root component that sets up providers and routing
 * Organized by: Providers → Routes → Components
 */

import { useEffect } from "react";

// UI Providers
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";

// Data Providers
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// State Management
import { useAuthStore } from "@/store/authStore";

// Route Components
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Loans from "./pages/Loans";
import LoanDetails from "./pages/LoanDetails";
import LoanApplication from "./pages/LoanApplication";
import LoanPolicy from "./pages/LoanPolicy";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Mentorship from "./pages/Mentorship";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Diagnostic from "./pages/Diagnostic";

// New Feature Components
import LoanPackagesPage from "./pages/LoanPackagesPage";
import MarketplacePage from "./pages/MarketplacePage";
import AdminPanel from "./pages/AdminPanel";
import SecuritySettings from "./pages/SecuritySettings";
import AnalyticsPage from "./pages/AnalyticsPage";

// route guards
import { ProtectedRoute, AdminRoute } from "@/components/ProtectedRoute";

// Configuration
import { ROUTES } from "@/config/constants";

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

/**
 * App Content Component
 * Handles routing and authentication initialization
 */
const AppContent = () => {
  const initialize = useAuthStore((state) => state.initialize);

  // Initialize authentication on app load
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<Index />} />
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
        
        {/* Loan Routes (authenticated users only) */}
        <Route
          path={ROUTES.LOANS}
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loan-details/:id"
          element={
            <ProtectedRoute>
              <LoanDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loan-application/:id"
          element={
            <ProtectedRoute>
              <LoanApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.LOAN_POLICY}
          element={
            <ProtectedRoute>
              <LoanPolicy />
            </ProtectedRoute>
          }
        />
        
        {/* New Loan Features (authenticated) */}
        <Route
          path="/loan-packages"
          element={
            <ProtectedRoute>
              <LoanPackagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-tracker/:loanId"
          element={
            <ProtectedRoute>
              <LoanApplication />
            </ProtectedRoute>
          }
        />
        
        {/* Marketplace Routes (authenticated) */}
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <MarketplacePage />
            </ProtectedRoute>
          }
        />
        
        {/* Admin Routes */}
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path={ROUTES.ANALYTICS}
          element={
            <AdminRoute>
              <AnalyticsPage />
            </AdminRoute>
          }
        />

        {/* Protected / authenticated user routes */}
        <Route
          path={ROUTES.SECURITY_SETTINGS}
          element={
            <ProtectedRoute>
              <SecuritySettings />
            </ProtectedRoute>
          }
        />

        {/* Education Routes (authenticated) */}
        <Route
          path={ROUTES.COURSES}
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          }
        />
        
        {/* Community Routes (authenticated) */}
        <Route
          path={ROUTES.MENTORSHIP}
          element={
            <ProtectedRoute>
              <Mentorship />
            </ProtectedRoute>
          }
        />
        
        {/* User Routes (authenticated) */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        {/* Error Routes - Must be last */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

/**
 * Main App Component
 * Sets up all providers in the correct order
 * Provider hierarchy: QueryClient → Theme → Tooltip → Toast → App Content
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        {/* Toast Notifications */}
        <Toaster />
        <Sonner />
        
        {/* Main Application */}
        <AppContent />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
