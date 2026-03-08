import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  Briefcase,
  Leaf,
  Heart,
  Home,
  AlertCircle,
  Check,
  ChevronRight,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loanPackageService } from "@/services/mongodbService";

interface LoanPackage {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  duration: number;
  category: string;
  features: string[];
  requirements: string[];
  disbursementTime?: string;
  type?: string;
}

// Helper function to calculate monthly payment
const calculateMonthlyPayment = (principal: number, interestRate: number, months: number) => {
  const monthlyRate = interestRate / 100 / 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
};

const loanIcons: Record<string, React.ReactNode> = {
  education: <BookOpen className="w-6 h-6" />,
  entrepreneur: <Briefcase className="w-6 h-6" />,
  agriculture: <Leaf className="w-6 h-6" />,
  healthcare: <Heart className="w-6 h-6" />,
  housing: <Home className="w-6 h-6" />,
  emergency: <AlertCircle className="w-6 h-6" />,
};

export const LoanPackagesComponent = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<LoanPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<LoanPackage | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loanPackageService.getAllPackages();
        setPackages(data);
      } catch (err) {
        console.error("Failed to fetch loan packages:", err);
        setError("Failed to load loan packages. Please try again later.");
        toast.error("Failed to load loan packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleApplyNow = (packageItem: LoanPackage) => {
    setSelectedPackage(packageItem);
    toast.success(`Selected ${packageItem.name}. Let's proceed with your application!`);
    navigate(`/loan-application?packageId=${packageItem._id || packageItem.id}`);
  };

  const groupedPackages = {
    // include all known categories from seed data (startup, growth, etc.)
    startup: packages.filter(p => (p.category || p.type) === 'startup'),
    growth: packages.filter(p => (p.category || p.type) === 'growth'),
    education: packages.filter(p => (p.category || p.type) === 'education'),
    entrepreneur: packages.filter(p => (p.category || p.type) === 'entrepreneur'),
    agriculture: packages.filter(p => (p.category || p.type) === 'agriculture'),
    healthcare: packages.filter(p => (p.category || p.type) === 'healthcare'),
    housing: packages.filter(p => (p.category || p.type) === 'housing'),
    emergency: packages.filter(p => (p.category || p.type) === 'emergency'),
  };

  // Loading Skeleton
  const SkeletonCard = () => (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-20 w-full" />
      </CardContent>
    </Card>
  );

  const LoanPackageCard = ({ packageItem }: { packageItem: LoanPackage }) => {
    const monthlyPayment = calculateMonthlyPayment(
      packageItem.maxAmount,
      packageItem.interestRate,
      packageItem.duration
    );
    const category = packageItem.category || packageItem.type || 'education';

    return (
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {loanIcons[category]}
                </div>
                <Badge variant="outline">{category.charAt(0).toUpperCase() + category.slice(1)}</Badge>
              </div>
              <CardTitle className="text-xl">{packageItem.name}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">
                {packageItem.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          {/* Loan Amount Range */}
          <div className="p-3 bg-secondary/50 rounded-lg">
            <p className="text-sm font-medium text-muted-foreground mb-1">Loan Amount</p>
            <p className="text-lg font-bold">
              {(packageItem.minAmount / 1000000).toFixed(1)}M - {(packageItem.maxAmount / 1000000).toFixed(1)}M TZS
            </p>
          </div>

          {/* Key Terms */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Interest Rate</p>
              <p className="font-bold text-lg">{packageItem.interestRate}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-bold text-lg">{packageItem.duration} months</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Monthly Payment*</p>
              <p className="font-bold text-sm">{(monthlyPayment / 1000).toFixed(0)}K TZS</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Disbursement</p>
              <p className="font-bold text-sm">{packageItem.disbursementTime}</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Key Features:</p>
            <ul className="space-y-1">
              {(packageItem.features || []).slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
              {(packageItem.features || []).length > 3 && (
                <li className="text-sm text-blue-600">+{(packageItem.features || []).length - 3} more features</li>
              )}
            </ul>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Requirements:</p>
            <div className="flex flex-wrap gap-1">
              {(packageItem.requirements || []).slice(0, 2).map((req, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {req}
                </Badge>
              ))}
              {(packageItem.requirements || []).length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{(packageItem.requirements || []).length - 2} more
                </Badge>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">*Based on maximum loan amount</p>
        </CardContent>

        <CardFooter className="pt-0">
          <Button
            className="w-full gap-2"
            onClick={() => handleApplyNow(packageItem)}
          >
            Apply Now
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold mb-1">Our Loan Packages</h2>
            <p className="text-muted-foreground">
              Choose the loan package that best fits your needs. All loans come with flexible terms and professional support.
            </p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <p>Loading loan packages...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Packages Display */}
      {/* determine a sensible default tab based on available categories */}
      {!loading && !error && packages.length > 0 && (() => {
        const available = Object.entries(groupedPackages).filter(([, items]) => items.length > 0).map(([k]) => k);
        const defaultTab = available.length > 0 ? available[0] : 'education';

        return (
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {available.map((key) => (
                <TabsTrigger key={key} value={key} className="capitalize text-xs sm:text-sm">
                  {key.length > 8 ? key.substring(0, 5) + '.' : key}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(groupedPackages).map(([key, items]) =>
              items.length > 0 ? (
                <TabsContent key={key} value={key} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map(packageItem => (
                      <LoanPackageCard
                        key={packageItem._id || packageItem.id}
                        packageItem={packageItem}
                      />
                    ))}
                  </div>
                </TabsContent>
              ) : null
            )}
          </Tabs>
        );
      })()}

      {/* No Packages State */}
      {!loading && !error && packages.length === 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-600">No Loan Packages Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-600">
              Please try again later or contact support for assistance.
            </p>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-center gap-3">
              <Button onClick={() => window.location.reload()}>Try Again</Button>
              <Button variant="outline" asChild>
                <a href="/contact">Contact Support</a>
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Additional Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Choose Your Loan Package</p>
                <p className="text-sm text-muted-foreground">Select the package that matches your needs</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Complete Your Application</p>
                <p className="text-sm text-muted-foreground">Provide required documents and information</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Get Approved & Receive Funds</p>
                <p className="text-sm text-muted-foreground">Fast approval and quick disbursement</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanPackagesComponent;
