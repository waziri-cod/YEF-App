import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { loans } from "@/data/loansData";
import {
  DollarSign,
  Clock,
  Percent,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

const LoanDetails = () => {
  const { id } = useParams();
  const loan = loans.find((l) => l.id === id);

  if (!loan) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Loan Not Found</h1>
          <Button asChild>
            <Link to="/loans">Back to Loans</Link>
          </Button>
        </div>
      </div>
    );
  }

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

      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/loans">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Loans
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 gradient-card border-border">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <Badge variant="secondary" className="mb-4 capitalize">
                      {loan.category}
                    </Badge>
                    <h1 className="text-3xl font-bold mb-2">{loan.name}</h1>
                    <p className="text-lg text-muted-foreground">
                      {loan.description}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <DollarSign className="w-5 h-5 text-primary mb-2" />
                    <div className="text-sm text-muted-foreground mb-1">
                      Loan Range
                    </div>
                    <div className="font-semibold">
                      {formatCurrency(loan.minAmount)} -{" "}
                      {formatCurrency(loan.maxAmount)}
                    </div>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <Percent className="w-5 h-5 text-success mb-2" />
                    <div className="text-sm text-muted-foreground mb-1">
                      Interest Rate
                    </div>
                    <div className="font-semibold">{loan.interestRate}% p.a.</div>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <Clock className="w-5 h-5 text-accent mb-2" />
                    <div className="text-sm text-muted-foreground mb-1">
                      Duration
                    </div>
                    <div className="font-semibold">{loan.duration}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      Features & Benefits
                    </h2>
                    <ul className="space-y-3">
                      {loan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      Requirements
                    </h2>
                    <ul className="space-y-3">
                      {loan.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold text-primary">
                              {index + 1}
                            </span>
                          </div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Example Calculation */}
              <Card className="p-6 gradient-card border-border">
                <h2 className="text-xl font-semibold mb-4">
                  Example Repayment Calculation
                </h2>
                <div className="bg-secondary/50 p-6 rounded-lg space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span className="font-semibold">
                      {formatCurrency((loan.minAmount + loan.maxAmount) / 2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interest Rate:</span>
                    <span className="font-semibold">{loan.interestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-semibold">{loan.duration}</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-semibold">
                      Est. Monthly Payment:
                    </span>
                    <span className="font-bold text-primary text-lg">
                      {formatCurrency(
                        ((loan.minAmount + loan.maxAmount) / 2) *
                          (1 + loan.interestRate / 100) /
                          12
                      )}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  * This is an estimate. Actual payment may vary based on
                  approval amount and terms.
                </p>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 gradient-card border-border sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Ready to Apply?</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Start your application now and get a decision within 24 hours.
                </p>
                <Button variant="hero" size="lg" className="w-full mb-3" asChild>
                  <Link to={`/loan-application/${loan.id}`}>Apply Now</Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/loan-policy">View Loan Policy</Link>
                </Button>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3 text-sm">Need Help?</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>📞 Call: +255 123 456 789</p>
                    <p>📧 Email: loans@yef.co.tz</p>
                    <p>💬 Chat: Available 24/7</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoanDetails;
