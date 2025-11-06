import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Loans from "./pages/Loans";
import LoanDetails from "./pages/LoanDetails";
import LoanApplication from "./pages/LoanApplication";
import LoanPolicy from "./pages/LoanPolicy";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Mentorship from "./pages/Mentorship";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/loan-details/:id" element={<LoanDetails />} />
          <Route path="/loan-application/:id" element={<LoanApplication />} />
          <Route path="/loan-policy" element={<LoanPolicy />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
