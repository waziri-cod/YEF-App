import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { loans } from "@/data/loansData";
import { TrendingUp, Zap, Rocket, DollarSign, Clock, Percent } from "lucide-react";

const categoryIcons = {
  startup: Rocket,
  growth: TrendingUp,
  emergency: Zap,
};

const categoryColors = {
  startup: "bg-primary/10 text-primary",
  growth: "bg-success/10 text-success",
  emergency: "bg-accent/10 text-accent",
};

const Loans = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-TZ", {
      style: "currency",
      currency: "TZS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Available Loan Programs
            </h1>
            <p className="text-lg opacity-95">
              Choose the perfect loan for your business stage and needs. All
              loans come with mentorship and financial education.
            </p>
          </div>
        </div>
      </section>

      {/* Loans Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loans.map((loan) => {
              const Icon = categoryIcons[loan.category];
              return (
                <Card
                  key={loan.id}
                  className="p-6 hover-lift gradient-card border-border flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${categoryColors[loan.category]} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {loan.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{loan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {loan.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-semibold">
                        {formatCurrency(loan.minAmount)} -{" "}
                        {formatCurrency(loan.maxAmount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Percent className="w-4 h-4 text-success" />
                      <span className="text-muted-foreground">Interest:</span>
                      <span className="font-semibold">{loan.interestRate}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold">{loan.duration}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="hero" className="flex-1" asChild>
                      <Link to={`/loan-application/${loan.id}`}>Apply Now</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to={`/loan-details/${loan.id}`}>Details</Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 gradient-card border-border">
              <h2 className="text-2xl font-bold mb-6">
                Why Choose YEF Loans?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-primary">
                    No Collateral Required
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI-powered credit scoring uses your mobile money
                    transaction history instead of traditional collateral.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-success">
                    Fast Approval
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get a decision within 24 hours. Emergency loans can be
                    approved in as little as 1 hour.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-accent">
                    Flexible Terms
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Repayment schedules tailored to your business cash flow.
                    Early repayment discounts available.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-primary">
                    Full Support
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Every loan comes with free financial literacy training and
                    access to business mentors.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild className="flex-1">
                  <Link to="/loan-policy">View Loan Policies</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="flex-1">
                  <Link to="/courses">Learn Before Applying</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Loans;
