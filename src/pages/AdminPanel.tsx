import { AdminDashboard } from "@/components/AdminDashboard";
import { Navigation } from "@/components/Navigation";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <AdminDashboard />
      </div>
    </div>
  );
}
