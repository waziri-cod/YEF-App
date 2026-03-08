import { LoanPackagesComponent } from "@/components/LoanPackagesDisplay";
import { Navigation } from "@/components/Navigation";

export default function LoanPackagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <LoanPackagesComponent />
      </div>
    </div>
  );
}
