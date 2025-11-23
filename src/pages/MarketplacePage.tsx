import { MarketplaceListing } from "@/components/MarketplaceListing";
import { Navigation } from "@/components/Navigation";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <MarketplaceListing />
      </div>
    </div>
  );
}
