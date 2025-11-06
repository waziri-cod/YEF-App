import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { loans } from "@/data/loansData";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const LoanApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loan = loans.find((l) => l.id === id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [creditScore, setCreditScore] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    phoneNumber: "",
    email: "",
    loanAmount: "",
    purpose: "",
    duration: "",
    businessType: "",
    monthlyIncome: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate AI credit scoring
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate random credit score between 60-95
    const score = Math.floor(Math.random() * 36) + 60;
    setCreditScore(score);
    setIsProcessing(false);

    if (score >= 70) {
      toast.success("Application Approved!", {
        description: "Your loan has been approved. Funds will be disbursed within 24 hours.",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      toast.warning("Application Under Review", {
        description: "Your application needs additional review. We'll contact you within 48 hours.",
      });
    }
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link to={`/loan-details/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Loan Details
            </Link>
          </Button>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8 gradient-card border-border">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Loan Application</h1>
                <p className="text-muted-foreground">
                  Applying for: <span className="font-semibold">{loan.name}</span>
                </p>
              </div>

              {!isProcessing && creditScore === null && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nationalId">National ID *</Label>
                      <Input
                        id="nationalId"
                        required
                        value={formData.nationalId}
                        onChange={(e) =>
                          setFormData({ ...formData, nationalId: e.target.value })
                        }
                        placeholder="1234567890"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, phoneNumber: e.target.value })
                        }
                        placeholder="+255 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="loanAmount">Loan Amount (TZS) *</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        required
                        min={loan.minAmount}
                        max={loan.maxAmount}
                        value={formData.loanAmount}
                        onChange={(e) =>
                          setFormData({ ...formData, loanAmount: e.target.value })
                        }
                        placeholder={`${loan.minAmount} - ${loan.maxAmount}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration *</Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) =>
                          setFormData({ ...formData, duration: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 months</SelectItem>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                          <SelectItem value="18">18 months</SelectItem>
                          <SelectItem value="24">24 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, businessType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="monthlyIncome">
                        Monthly Income (TZS) *
                      </Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        required
                        value={formData.monthlyIncome}
                        onChange={(e) =>
                          setFormData({ ...formData, monthlyIncome: e.target.value })
                        }
                        placeholder="500000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="purpose">Loan Purpose *</Label>
                    <Textarea
                      id="purpose"
                      required
                      value={formData.purpose}
                      onChange={(e) =>
                        setFormData({ ...formData, purpose: e.target.value })
                      }
                      placeholder="Describe how you will use this loan..."
                      rows={4}
                    />
                  </div>

                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Before You Submit</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ All information provided is accurate</li>
                      <li>✓ You meet the eligibility requirements</li>
                      <li>✓ You agree to complete the financial literacy course</li>
                      <li>✓ You understand the repayment terms</li>
                    </ul>
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Submit Application
                  </Button>
                </form>
              )}

              {isProcessing && (
                <div className="py-12 text-center">
                  <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-4">
                    AI Credit Assessment in Progress
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Analyzing your mobile money history and business viability...
                  </p>
                  <Progress value={66} className="w-full max-w-md mx-auto" />
                </div>
              )}

              {creditScore !== null && (
                <div className="py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-4">
                    Credit Assessment Complete
                  </h2>
                  <div className="max-w-md mx-auto mb-8">
                    <div className="bg-secondary/50 p-6 rounded-lg">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {creditScore}/100
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        Credit Score
                      </div>
                      <Progress value={creditScore} className="mb-4" />
                      {creditScore >= 70 ? (
                        <p className="text-success font-semibold">
                          Congratulations! You're eligible for the loan.
                        </p>
                      ) : (
                        <p className="text-accent font-semibold">
                          Your application needs additional review.
                        </p>
                      )}
                    </div>
                  </div>
                  <Button variant="hero" size="lg" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoanApplication;
