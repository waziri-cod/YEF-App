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
        
        {/* Loan Routes */}
        <Route path={ROUTES.LOANS} element={<Loans />} />
        <Route path="/loan-details/:id" element={<LoanDetails />} />
        <Route path="/loan-application/:id" element={<LoanApplication />} />
        <Route path={ROUTES.LOAN_POLICY} element={<LoanPolicy />} />
        
        {/* New Loan Features */}
        <Route path="/loan-packages" element={<LoanPackagesPage />} />
        <Route path="/payment-tracker/:loanId" element={<LoanApplication />} />
        
        {/* Marketplace Routes */}
        <Route path="/marketplace" element={<MarketplacePage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminPanel />} />
        <Route path="/security-settings" element={<SecuritySettings />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        
        {/* Education Routes */}
        <Route path={ROUTES.COURSES} element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        
        {/* Community Routes */}
        <Route path={ROUTES.MENTORSHIP} element={<Mentorship />} />
        
        {/* User Routes */}
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        
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
