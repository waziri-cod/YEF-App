/**
 * ============================================
 * ANALYTICS PAGE
 * ============================================
 * Analytics and business insights page
 */

import { Navigation } from "@/components/Navigation";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-2">
            Real-time business metrics and performance analytics
          </p>
        </div>
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
